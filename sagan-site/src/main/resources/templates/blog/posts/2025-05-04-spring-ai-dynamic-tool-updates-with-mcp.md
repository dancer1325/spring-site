---
title: Dynamic Tool Updates in Spring AI\'s Model Context Protocol
source: https://spring.io/blog/2025/05/04/spring-ai-dynamic-tool-updates-with-mcp
scraped: 2026-02-23T07:43:53.256Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Christian Tzolov |  May 04, 2025 | 4 Comments
---

# Dynamic Tool Updates in Spring AI's Model Context Protocol

_Engineering | Christian Tzolov |  May 04, 2025 | 4 Comments_

The Model Context Protocol (MCP) is a powerful feature in Spring AI that enables AI models to access external tools and resources through a standardized interface. One interesting capabilities of MCP is its ability to dynamically update available tools at runtime.

This blog post explores how Spring AI implements dynamic tool updates in MCP, providing flexibility and extensibility to AI-powered applications.

The related example code is available here: [Dynamic Tool Update Example](https://github.com/spring-projects/spring-ai-examples/tree/main/model-context-protocol/dynamic-tool-update)

## [](#understanding-the-model-context-protocol)Understanding the Model Context Protocol

![](https://raw.githubusercontent.com/spring-io/spring-io-static/refs/heads/main/blog/tzolov/20250504/mcp-tools-notifications.png)

Before diving into dynamic tool updates, let's understand what MCP is and why it matters:

[The Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) is a standardized interface that allows AI applicaitons and Agents to: **Access external tools** , **Retrieve resources** , **Use prompt templates** .

MCP follows a [client-server architecture](https://modelcontextprotocol.io/docs/concepts/architecture): **MCP Servers** - expose tools, resources, and prompts; **MCP Clients** - connect to servers and use their capabilities; **AI Models** - interact with the world through these clients

Spring AI provides a comprehensive implementation of MCP with both [client](https://docs.spring.io/spring-ai/reference/api/mcp/mcp-client-boot-starter-docs.html) and [server](https://docs.spring.io/spring-ai/reference/api/mcp/mcp-server-boot-starter-docs.html) components, making it easy to integrate AI capabilities into Spring applications.

### [](#the-dynamic-tool-update-feature)The Dynamic Tool Update Feature

One powerful aspects of the MCP is the ability to dynamically update the available tools at runtime. This means:

-   MCP Servers can add or remove tools without restarting
-   MCP Clients can detect these changes
-   AI models can immediately use the new capabilities

## [](#how-dynamic-tool-updates-work)How Dynamic Tool Updates Work

The dynamic tool update process involves several components working together:

### [](#server-side-implementation)Server-Side Implementation

Spring AI's `@Tool` annotation makes it easy to expose methods as MCP tools:

```java
Copypublic class MathTools {

    @Tool(description = "Adds two numbers")
    public int sumNumbers(int number1, int number2) {
        return number1 + number2;
    }

    // ...
}
```

The framework automatically:

1.  Extracts method parameters as tool inputs
2.  Generates appropriate JSON schemas
3.  Handles parameter validation and conversion

On the server side, Spring AI's MCP implementation provides a straightforward way to add MCP tools at start time and dynamically at runtime:

```java
Copy@SpringBootApplication
public class ServerApplication {

    //1. Tools added at start time by the Spring AI MCP Server Boot starter
    @Bean
    public ToolCallbackProvider weatherTools(WeatherService weatherService) {
        return MethodToolCallbackProvider.builder().toolObjects(weatherService).build();
    }

    //2. Runtime tool addition
    @Bean
    public CommandLineRunner commandRunner(McpSyncServer mcpSyncServer) {
        return args -> {

            // Wait for some tool update signal

            // Add math tools dynamically
            List<SyncToolSpecification> newTools = McpToolUtils
                    .toSyncToolSpecifications(ToolCallbacks.from(new MathTools()));

            for (SyncToolSpecification newTool : newTools) {
				mcpSyncServer.addTool(newTool);
			}
        };
    }
}
```

In this example:

1.  The server initially exposes only weather forecast tools
2.  When a custom tool-update signal is received the `McpSyncServer.addTool()` method is used to dynamically register new tools

The `McpSyncServer` class provides methods for tool management:

-   `addTool(SyncToolSpecification)` - Adds a new tool
-   `removeTool(String)` - Removes a tool by name
-   `notifyToolsListChanged()` - Notifies clients about tool changes

> **NOTE:** you can add and/or remove Tools only after the Clinet/Server connection has been initialized.

### [](#client-side-implementation)Client-Side Implementation

The MCP protocol includes a notification system that allows servers to inform clients about changes to available tools. This notification system ensures that clients always have an up-to-date view of the server's capabilities.

On the client side, Spring AI provides mechanisms to detect and react to tool changes:

```java
Copy@Bean
McpSyncClientCustomizer customizeMcpClient() {
    return (name, mcpClientSpec) -> {
        mcpClientSpec.toolsChangeConsumer(tv -> {
            logger.info("\nMCP TOOLS CHANGE: " + tv);
            latch.countDown();
        });
    };
}
```

The client registers a listener that is invoked whenever the server's available tools change. This allows the client to:

1.  Be notified when tools are added or removed
2.  Update its internal state accordingly
3.  Make the new tools immediately available to the AI model

Currently Spring AI doesn't maintain internal state about the updated tools, but you can use the customization listener to implement smart tool caching or similar.

### [](#tool-discovery-and-usage)Tool Discovery and Usage

The client can discover available tools at any time:

```java
CopyList<ToolDescription> toolDescriptions = chatClientBuilder.build()
        .prompt("What tools are available?")
        .toolCallbacks(tools)
        .call()
        .entity(new ParameterizedTypeReference<List<ToolDescription>>() {});
```

A key insight from the Spring AI MCP implementation is:

> **TIP**: The client implementation relies on the fact that the [ToolCallbackProvider#getToolCallbacks](https://github.com/spring-projects/spring-ai/blob/9e71b163e315199fe7b46495d87a0828a807b88f/mcp/common/src/main/java/org/springframework/ai/mcp/SyncMcpToolCallbackProvider.java#L132) implementation for MCP will always retrieves the current list of MCP tools from the server.

This means that whenever a client requests the available tools, it will always get the most up-to-date list from the server, without needing to restart or reinitialize the client.

## [](#practical-applications)Practical Applications

Dynamic tool updates in MCP enable several powerful use cases:

### [](#1-feature-flags-for-ai-capabilities)1\. Feature Flags for AI Capabilities

You can implement feature flags that control which AI capabilities are available:

```java
Copyif (featureFlags.isEnabled("advanced-math")) {
    mcpSyncServer.addTool(advancedMathTools);
}
```

### [](#2-context-aware-tool-loading)2\. Context-Aware Tool Loading

Load tools based on the current context or user permissions:

```java
Copyif (userHasPermission(currentUser, "admin-tools")) {
    mcpSyncServer.addTool(adminTools);
}
```

### [](#3-progressive-enhancement)3\. Progressive Enhancement

Start with basic tools and add more advanced capabilities as needed:

```java
Copy// Start with basic tools
mcpSyncServer.addTool(basicTools);

// Add advanced tools when the user reaches a certain level
userService.onUserLevelUp(user -> {
    if (user.getLevel() >= 5) {
        mcpSyncServer.addTool(advancedTools);
    }
});
```

### [](#4-dynamic-plugin-architecture)4\. Dynamic Plugin Architecture

Implement a plugin system where new capabilities can be added at runtime:

```java
CopypluginRegistry.onPluginLoaded(plugin -> {
    if (plugin.hasMcpTools()) {
        mcpSyncServer.addTool(plugin.getMcpTools());
    }
});
```

## [](#conclusion)Conclusion

Spring AI's handling of dynamic tool updates in the Model Context Protocol provides a mechanism for extending AI capabilities at runtime. This feature enables more flexible, extensible, and resource-efficient AI applications.

Key takeaways:

1.  **Standardized Interface**: MCP provides a consistent way for AI models to interact with external tools and resources.
    
2.  **Dynamic Updates**: Tools can be added or removed at runtime without requiring application restarts.
    
3.  **Automatic Discovery**: Clients can detect changes to available tools and make them immediately available to AI models.
    
4.  **Simple API**: Spring AI provides a clean, annotation-based API for defining and managing MCP tools.
    

By leveraging dynamic tool updates in Spring AI's MCP implementation, developers can create more adaptable AI applications that can evolve their capabilities based on runtime conditions, user needs, and system requirements.

## [](#resources)Resources

-   [Spring AI Documentation](https://docs.spring.io/spring-ai/reference/)
-   [Model Context Protocol Tools Specification](http://localhost:3000/specification/2024-11-05/server/tools)
-   [Spring AI Examples Repository](https://github.com/spring-projects/spring-ai-examples)