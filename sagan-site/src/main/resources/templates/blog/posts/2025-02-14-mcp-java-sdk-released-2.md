---
title: Introducing the Model Context Protocol Java SDK
source: https://spring.io/blog/2025/02/14/mcp-java-sdk-released-2
scraped: 2026-02-23T07:52:57.136Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  February 14, 2025 | 0 Comments
---

# Introducing the Model Context Protocol Java SDK

_Releases | Mark Pollack |  February 14, 2025 | 0 Comments_

> This blog post is co-authored with [David Soria Parra](https://github.com/dsp-ant), [Christian Tzolov](https://github.com/tzolov), and [Dariusz Jędrzejczyk](https://github.com/chemicL).

# [](#what-is-mcp)What is MCP

The Model Context Protocol (MCP), an open protocol developed by [Anthropic](https://www.anthropic.com/), is transforming the way AI applications connect and share context. It has garnered extensive support across AI applications, functioning as a standardized interface for Large Language Models (LLMs) to interact with data sources, tools, and AI agents. Whether you're building autonomous systems that need to access databases, orchestrating complex AI workflows, or creating systems where multiple agents collaborate, MCP provides the foundational layer that makes these integrations seamless.

What sets MCP apart is its focus on composability and interoperability. Beyond just connecting to data sources, MCP enables developers to build rich, interactive AI systems where agents can share context, access tools, and work together through a consistent interface. This means you can quickly plug into a growing ecosystem of pre-built integrations while maintaining the flexibility to switch between different LLM providers, making it an ideal foundation for building sophisticated AI applications.

# [](#introducing-the-mcp-java-sdk)Introducing the MCP Java SDK

What began as an experimental project last November has turned into an exciting collaboration with the Spring AI team and Anthropic. We're thrilled to announce that the experimental project has been moved into the official MCP Java SDK.  
This SDK is the latest language binding of the protocol, alongside the Python, TypeScript, and Kotlin SDKs, on [modelcontextprotocol.io](https://modelcontextprotocol.io). Java has long been the language of the enterprise, and the MCP Java SDK makes it easier for organizations to develop cutting-edge AI applications.

The MCP Java SDK provides a comprehensive foundation for integrating AI models with external tools and data sources. Key features of the SDK include:

### [](#client-and-server-implementations)Client and Server Implementations

-   Supports both synchronous and asynchronous MCP communication.
-   Enables protocol version compatibility negotiation for smooth interoperability.

### [](#tool-and-resource-management)Tool and Resource Management

-   Discover, register, and execute tools dynamically.
-   Receive real-time list change notifications for tools and resources.
-   Manage resources using URI templates for structured access and subscriptions.

### [](#prompt-handling-and-ai-sampling-support)Prompt Handling and AI Sampling Support

-   Retrieve and manage prompts to customize AI model behavior.
-   Supports sampling strategies to fine-tune AI interactions.

### [](#multiple-transport-implementations)Multiple Transport Implementations

-   Stdio-based transport for direct process communication.
-   Java HttpClient-based SSE client transport for HTTP-based streaming.
-   Servlet-based SSE server transport for streaming over HTTP in a traditional server environment.
-   Spring-based transports for seamless Spring Boot integration:
    -   Spring WebFlux-based SSE transport for reactive applications.
        
    -   Spring WebMVC-based SSE transport for servlet-based applications.
        

Please check out the [documentation](https://modelcontextprotocol.io/sdk/java/mcp-overview) for more information on getting started, and visit the [GitHub repository](https://github.com/modelcontextprotocol/java-sdk) to open issues and join discussions.

# [](#spring-ai-and-mcp)Spring AI and MCP

The Spring AI project extends the MCP Java SDK by adding developer productivity enhancements for integration with Spring Boot applications. With Spring Boot starters, developers can quickly configure MCP clients and servers using Spring’s dependency injection and configuration management, making it easier to integrate AI-driven workflows into their applications.

#### [](#client-starters)Client Starters

-   `spring-ai-mcp-client-spring-boot-starter` – Core client starter supporting STDIO and HTTP-based SSE transport.
-   `spring-ai-mcp-client-webflux-spring-boot-starter` – WebFlux-based SSE transport implementation for reactive applications.

#### [](#server-starters)Server Starters

-   `spring-ai-mcp-server-spring-boot-starter` – Core server starter supporting STDIO transport.
-   `spring-ai-mcp-server-webmvc-spring-boot-starter` – Spring MVC-based SSE transport implementation for servlet-based applications.
-   `spring-ai-mcp-server-webflux-spring-boot-starter` – WebFlux-based SSE transport implementation for reactive applications.

Here’s an example of how to declaratively configure an STDIO-transported client application. In `application.yml`, define the following configuration:

```yaml
Copyspring:
  ai:
    mcp:
      client:
        stdio:
          servers-configuration: classpath:mcp-servers.json
```

And the referenced JSON file defines the server to connect to in the Claude Desktop format.

```json
Copy{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/username/Desktop",
        "/Users/username/Downloads"
      ]
    }
  }
}
```

When the client application starts, it will launch the MCP server, establish STDIO communication channels, and manage the server lifecycle.

Spring AI M6 also introduces the `@Tool` annotation, which simplifies the creation of MCP servers. For more information, please read the [Spring AI Reference documentation on MCP.](https://docs.spring.io/spring-ai/reference/api/mcp/mcp-overview.html)

# [](#next-steps)Next Steps

We look forward to feedback on GitHub and are very grateful for the support of the Anthropic team.