---
title: Spring AI 1.1.0-M1 Available Now
source: https://spring.io/blog/2025/09/09/spring-ai-1-1-0-M1-available-now
scraped: 2026-02-23T07:31:43.229Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  September 09, 2025 | 0 Comments
---

# Spring AI 1.1.0-M1 Available Now

_Releases | Mark Pollack |  September 09, 2025 | 0 Comments_

On behalf of the Spring AI engineering team and everyone who has contributed, I'm happy to announce that Spring AI `1.1.0-M1` has been released and is now available from Maven Central.

This milestone release delivers important stability improvements and bug fixes.

## [](#release-summary)Release Summary

This release includes [391 improvements, bug fixes, and documentation updates](https://github.com/spring-projects/spring-ai/releases/tag/v1.1.0-M1). The focus of this milestone release is on:

-   **Improvements**: 271 enhancements to expand capabilities and functionality
-   **Stability**: 76 bug fixes addressing community-reported issues
-   **Documentation**: 32 improvements to help developers
-   **Security**: 12 dependency upgrades for enhanced security

Thanks to all those who have contributed with issue reports and pull requests.

## [](#key-highlights)Key Highlights

-   **Model Context Protocol Integration** - Comprehensive MCP support for AI agent development:
    
    -   **MCP Java SDK v0.12.1 Foundation** ([SDK docs](https://modelcontextprotocol.io/sdk/java/mcp-overview)) - Upgraded from v0.10.0 with support for MCP specification versions 2025-3-26 (Streamable HTTP) and 2024-11-05 (SSE) and including some features from the latest 2025-06-18, bringing Streamable HTTP transport, HttpClient/WebClient, WebMVC/WebFlux/Servlet support, Transport Context APIs, enhanced resource template filtering, and MCP-compliant protocol version headers
    -   **Spring AI Auto-Configuration & Annotations** ([client docs](https://docs.spring.io/spring-ai/reference/1.1-SNAPSHOT/api/mcp/mcp-client-boot-starter-docs.html), [server docs](https://docs.spring.io/spring-ai/reference/1.1-SNAPSHOT/api/mcp/mcp-server-boot-starter-docs.html), [annotations](https://docs.spring.io/spring-ai/reference/1.1-SNAPSHOT/api/mcp/mcp-annotations-overview.html)) - Complete Spring Boot integration with multiple [MCP Client](https://docs.spring.io/spring-ai/reference/1.1-SNAPSHOT/api/mcp/mcp-client-boot-starter-docs.html#_starters) and [MCP Server](https://docs.spring.io/spring-ai/reference/1.1-SNAPSHOT/api/mcp/mcp-server-boot-starter-docs.html#_mcp_server_boot_starters) Boot Starters, automatic client/server lifecycle management, and new annotation-based programming model with `@McpTool`, `@McpResource`, `@McpPrompt`, etc. for declarative MCP development.
-   **Expanded Model Support** - Comprehensive integration for next-generation AI models:
    
    -   **Google GenAI SDK Integration** ([documentation](https://docs.spring.io/spring-ai/reference/1.1.0-M1/api/chat/google-genai-chat.html)) - Thanks to [Dan Dobrin's](https://github.com/ddobrin) outstanding contribution, Spring AI now includes Google's unified GenAI SDK with dual authentication support (API keys for prototyping, Google Cloud credentials for production), covering Gemini Pro, 1.5 Pro, and 2.0 Flash models with full tool calling and multimodal capabilities
    -   **Anthropic Claude Prompt Caching** ([documentation](https://docs.spring.io/spring-ai/reference/1.1-SNAPSHOT/api/chat/anthropic-chat.html#_prompt_caching)) - Prompt caching support with four cache strategies (`NONE`, `SYSTEM_ONLY`, `SYSTEM_AND_TOOLS`, `CONVERSATION_HISTORY`) offering 5-minute and 1-hour TTL options, delivering up to 90% cost reduction and improved latency for autonomous agent workflows
    -   **OpenAI GPT-5 Model Support** - Added support for the new GPT-5 model family (gpt-5, gpt-5-mini, gpt-5-nano, gpt-5-chat-latest) with verbosity parameter configuration and proper temperature constraint handling
    -   **ElevenLabs Text-to-Speech** ([documentation](https://docs.spring.io/spring-ai/reference/1.1-SNAPSHOT/api/audio/speech/elevenlabs-speech.html)) - Complete text-to-speech integration thanks to [Alexandros Pappas](https://github.com/apappascs), featuring `ElevenLabsTextToSpeechModel` with streaming support, configurable voice selection, multiple audio formats, and `spring-ai-starter-model-elevenlabs` for seamless Spring Boot integration
-   **Advanced Vector Store and RAG Capabilities** - Improved similarity scoring in MariaDB ([891ef2a](https://github.com/spring-projects/spring-ai/commit/891ef2aad29e8c4767eeab3a9f1e670949472102)), enhanced Weaviate configuration ([#3585](https://github.com/spring-projects/spring-ai/pull/3585)), and new VectorStoreRetriever interface ([#3827](https://github.com/spring-projects/spring-ai/pull/3827), [docs](https://docs.spring.io/spring-ai/reference/1.1-SNAPSHOT/api/vectordbs.html#_vectorstoreretriever_interface)) - a read-only functional interface following the principle of least privilege for document retrieval operations
    
-   **Enhanced Multimodal Processing** - PDF document support for OpenAI chat models, standardized audio transcription interface across providers, and robust document validation for vector store operations enabling rich multimedia AI experiences
    
-   **Production-Ready Stability** - 76 critical bug fixes addressing community-reported issues, plus 32 documentation improvements and 12 security-focused dependency upgrades
    

These improvements ensure that Spring AI continues to provide a robust and reliable foundation for building production-ready AI applications, with particular focus on the enhanced MCP integration that enables advanced AI agent capabilities.

## [](#-model-context-protocol-deep-dive)🚀 Model Context Protocol Deep Dive

Spring AI 1.1.0-M1 includes significant improvements to AI agent capabilities through enhanced Model Context Protocol (MCP) integration. This release upgrades from MCP Java SDK v0.10.0 to v0.12.1, delivering highly requested features and important architectural improvements.

### [](#streamable-http-transport-support)Streamable HTTP Transport Support

Introduces **[Streamable HTTP](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports#streamable-http)** Client and Server transports, which are highly requested capabilities since the MCP 2025-03-26 specification was released.

The Streamable HTTP support enables:

-   **[Stateful Session Management](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports#session-management)** - Supports servers to establish stateful sessions
-   **[Resumability and Redelivery](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports#resumability-and-redelivery)** - Stateful session management resumes broken connections, and redelivers messages that might otherwise be lost
-   **Stateless Streamable HTTP** - Subset of the Streamable-HTTP specification that returns `application/json`responses. Designed for simplified deployments where session state is not maintained between requests. The stateless transport is ideal for scaling microservices.
-   **[Multiple Transport Implementations](https://docs.spring.io/spring-ai/reference/1.1-SNAPSHOT/api/mcp/mcp-server-boot-starter-docs.html#_mcp_server_boot_starters)** - JDK-based Servlet and Spring-based WebMVC and WebFlux Streamable-HTTP transport implementations:
-   **Protocol compliance** with MCP-Protocol-Version headers (2025-06-18 for streamable HTTP, 2024-11-05 for SSE)

### [](#spring-boot-auto-configuration--annotation-programming-model)Spring Boot Auto-Configuration & Annotation Programming Model

Spring AI provides comprehensive Spring Boot integration for MCP through multiple specialized starters:

-   **Client Starters**
    -   `spring-ai-starter-mcp-client-webflux` Spring-based WebClient, STDIO, Streamable HTTP and SSE client transports
    -   `spring-ai-starter-mcp-client` JDK-based HttpClient, STDIO, Streamable HTTP and SSE client transports
-   **Server Starters** - Multiple transport options including `spring-ai-starter-mcp-server` (STDIO), `spring-ai-starter-mcp-server-webflux` (reactive), `spring-ai-starter-mcp-server-webmvc` (servlet-based)
-   **Annotation Programming Model** - New declarative approach with `@McpTool`, `@McpResource`, `@McpPrompt`, `@McpComplete` for servers and `@McpLogging`, `@McpSampling`, `@McpElicitation`, `@McpProgress` for clients, eliminating boilerplate code
-   **Automatic Lifecycle Management** - Client/server initialization, resource cleanup, and configuration through Spring properties

### [](#enhanced-connection-management--customization)Enhanced Connection Management & Customization

-   **MCP-Compliant Keep-Alive** - Configurable periodic session pings with `KeepAliveScheduler` utility for reliable long-running connections
-   **HTTP Request Customization APIs** - Built-in support for OAuth2 tokens, API keys, and custom request modifications through `HttpRequestCustomizer`
-   **Transport Context Support** - Unified API for request context propagation between clients and servers, enabling authentication token flow and correlation ID tracking

### [](#production-ready-features)Production-Ready Features

-   **Improved Error Handling** - Better compatibility with non-compliant servers and detailed error reporting
-   **Connection Reliability** - Enhanced session management, resumability, redelivery, automatic retries, and graceful degradation

This MCP integration enhances Spring AI's capabilities for AI agent development, enabling developers to build sophisticated, tool-enabled AI applications with reliable patterns familiar to Spring developers.

### [](#mcp-security-features-in-spring-ai-110-m1)MCP Security Features in Spring AI 1.1.0-M1

#### [](#current-security-state)Current Security State

Spring AI 1.1.0-M1 introduces foundational security capabilities for Model Context Protocol implementations. For WebMVC-based MCP servers, Spring AI provides full thread local support, enabling seamless integration with Spring Security's method-level annotations like @PreAuthorize across MCP tools, resources, and prompts. The framework includes OAuth2 integration patterns and HTTP request customization abstractions (McpSyncHttpRequestCustomizer and McpAsyncHttpRequestCustomizer) for secure client communications, with an [OAuth2 server example](https://github.com/spring-projects/spring-ai-examples/tree/main/model-context-protocol/weather/starter-webmvc-oauth2-server) demonstrating JWT-based authentication.

#### [](#future-security-development)Future Security Development

While the foundational security infrastructure is in place, comprehensive security documentation and examples are still in active development. The [Spring AI Community MCP Security project](https://github.com/spring-ai-community/mcp-security) will provide additional security tooling and simplified configuration patterns. Detailed security guides, best practices documentation, and expanded examples will be released in upcoming blog posts and documentation updates. WebFlux security integration for reactive MCP servers is planned for future releases.

**Special thanks to the [MCP Java SDK](https://github.com/modelcontextprotocol/java-sdk) community** for their exceptional work on the underlying SDK that makes this integration possible:

[Christian Tzolov (@tzolov)](https://github.com/tzolov), [Dariusz Jędrzejczyk (@chemicL)](https://github.com/chemicL), [Daniel Garnier-Moiroux (@Kehrlann)](https://github.com/Kehrlann), [Mark Pollack (@markpollack)](https://github.com/markpollack), [Richie Caputo (@arcaputo3)](https://github.com/arcaputo3), [Ilayaperumal Gopinathan (@ilayaperumalg)](https://github.com/ilayaperumalg), [James Ward (@jamesward)](https://github.com/jamesward), [Zachary German (@ZachGerman)](https://github.com/ZachGerman), [@zekozhang](https://github.com/zekozhang), [@denniskawurek](https://github.com/denniskawurek), [@CrazyHZM](https://github.com/CrazyHZM), [@marianogonzalez](https://github.com/marianogonzalez), [@konczdev](https://github.com/konczdev), [@He-Pin](https://github.com/He-Pin), [@codeboyzhou](https://github.com/codeboyzhou), [@codezjx](https://github.com/codezjx), [@DamonBao](https://github.com/DamonBao), [@jitokim](https://github.com/jitokim), [@xiaowangzhixiao](https://github.com/xiaowangzhixiao), [@FH-30](https://github.com/FH-30), [@LucaButBoring](https://github.com/LucaButBoring), [@epaga](https://github.com/epaga)

## [](#-new-examples-and-enhanced-repository)📚 New Examples and Enhanced Repository

The [Spring AI Examples repository](https://github.com/spring-projects/spring-ai-examples) has been significantly enhanced since the 1.0.1 release with comprehensive new examples and improved testing infrastructure. The repository now contains **37 total modules** with **24 modules featuring integration tests** and AI-powered validation.

### [](#major-updates-since-101)**Major Updates Since 1.0.1**

-   **Comprehensive MCP Examples** - Extensive Model Context Protocol examples showcasing v0.12.1 capabilities
-   **AI-Powered Validation** - New integration testing framework with intelligent output validation
-   **Enhanced Documentation** - Improved setup instructions and example explanations
-   **Production Patterns** - Docker deployment examples and OAuth2 authentication patterns

### [](#new-mcp-examples-highlight)**New MCP Examples Highlight**

### [](#mcp-annotations-framework)**MCP Annotations Framework**

**[mcp-annotations](https://github.com/spring-projects/spring-ai-examples/tree/main/model-context-protocol/mcp-annotations)** - Complete annotation-driven MCP development examples featuring:

-   **Server Implementation** - Weather tools, user profile resources, greeting prompts, and auto-completion using `@McpTool`, `@McpResource`, `@McpPrompt`, `@McpComplete`
-   **Client Implementation** - Progress tracking, logging, and sampling handlers using `@McpProgress`, `@McpLogging`, `@McpSampling`
-   **Mixed Annotation Patterns** - Both MCP annotations and Spring AI `@Tool` annotations working together

**[sampling/annotations](https://github.com/spring-projects/spring-ai-examples/tree/main/model-context-protocol/mcp-annotations)** - Demonstrate the Model Context Protocol (MCP) Sampling capability in Spring AI using the annotation-based approach.

### [](#dynamic-tool-management)**Dynamic Tool Management**

**[dynamic-tool-update](https://github.com/spring-projects/spring-ai-examples/tree/main/model-context-protocol/dynamic-tool-update)** - Demonstrates runtime tool registration and client detection:

-   **Runtime Tool Addition** - Server dynamically exposes new mathematical operations alongside existing weather tools
-   **Client Tool Discovery** - Automatic detection and utilization of newly available tools
-   **Notification System** - Real-time updates when tool capabilities change

### [](#docker-mcp-gateway-integration)**Docker MCP Gateway Integration**

**[brave-docker-agents-gateway](https://github.com/spring-projects/spring-ai-examples/tree/main/model-context-protocol/brave-docker-agents-gateway)** - Production deployment using Docker's MCP Gateway:

-   **Docker Agents Gateway** - Uses Docker's `docker/agents_gateway:v2` image for MCP server orchestration
-   **Brave Search Integration** - Natural language internet search through conversational interface using MCP protocol
-   **Containerized Architecture** - Complete Docker Compose setup with secrets management and SSE transport
-   **Spring Boot MCP Client** - Simplified client configuration connecting to dockerized MCP services

### [](#multiple-transport-examples)**Multiple Transport Examples**

The examples showcase all supported MCP transports:

-   **STDIO** - Process-based communication for local tool execution
-   **HTTP SSE** - Server-sent events for web-based real-time updates
-   **Streamable HTTP** - Modern HTTP streaming for scalable deployments
-   **Stateless Streamable HTTP** - Modern HTTP streaming for scalable deployments
-   **WebMVC & WebFlux** - Both traditional servlet and reactive implementations

These examples provide practical guidance for implementing MCP in production applications, from simple annotation-based tools to sophisticated dynamic agent systems. Each example includes comprehensive documentation, setup instructions, and integration tests.

## [](#community)Community

The Spring AI community continues to grow and contribute in meaningful ways. This release includes contributions from community members who reported issues, submitted fixes, and provided valuable feedback.

🙏 **Contributors**

Thanks to all contributors who made this release possible:

-   [Alexandros Pappas (apappascs)](https://github.com/apappascs)
-   [asw12 (asw12)](https://github.com/asw12)
-   [chani (csbiy)](https://github.com/csbiy)
-   [Christian Tzolov (tzolov)](https://github.com/tzolov)
-   [Daniel Garnier-Moiroux (Kehrlann)](https://github.com/Kehrlann)
-   [David Frizelle (dafriz)](https://github.com/dafriz)
-   [ddobrin (ddobrin)](https://github.com/ddobrin)
-   [Gareth Evans (garethjevans)](https://github.com/garethjevans)
-   [heechann (HeeChanN)](https://github.com/HeeChanN)
-   [Hyeri1ee (Hyeri1ee)](https://github.com/Hyeri1ee)
-   [Ilayaperumal Gopinathan (ilayaperumalg)](https://github.com/ilayaperumalg)
-   [Jinwoo Lee (jinlee1703)](https://github.com/jinlee1703)
-   [Laura Trotta (l-trotta)](https://github.com/l-trotta)
-   [Link (eeaters)](https://github.com/eeaters)
-   [little\_huang (little-huang)](https://github.com/little-huang)
-   [Mark Pollack (markpollack)](https://github.com/markpollack)
-   [MartinDai (MartinDai)](https://github.com/MartinDai)
-   [Nicolas Krier (nicolaskrier)](https://github.com/nicolaskrier)
-   [Oleksandr Klymenko (alxkm)](https://github.com/alxkm)
-   [Oskar Drozda (Hiosdra)](https://github.com/Hiosdra)
-   [Rafael Cunha (rafaelrddc)](https://github.com/rafaelrddc)
-   [robinmayerhofer (robinmayerhofer)](https://github.com/robinmayerhofer)
-   [seongm1n (seongm1n)](https://github.com/seongm1n)
-   [Shahbaz Aamir (shahbazaamir)](https://github.com/shahbazaamir)
-   [shishuiwuhen2009 (shishuiwuhen2009)](https://github.com/shishuiwuhen2009)
-   [Soby Chacko (sobychacko)](https://github.com/sobychacko)
-   [Sun Yuhan (sunyuhan1998)](https://github.com/sunyuhan1998)
-   [wilocu (wilocu)](https://github.com/wilocu)
-   [Yang Li (Yornii)](https://github.com/Yornii)
-   [Yanming Zhou (quaff)](https://github.com/quaff)
-   [YunKui Lu (YunKuiLu)](https://github.com/YunKuiLu)

### [](#how-can-you-help)How can you help?

If you're interested in contributing, check out the ["ideal for contribution" tag](https://github.com/spring-projects/spring-ai/labels/ideal-for-contribution) in our issue repository. For general questions, please ask on [Stack Overflow](https://stackoverflow.com) using the [`spring-ai` tag](https://stackoverflow.com/tags/spring-ai).

## [](#whats-next)What's Next

The Spring AI team continues to focus on improving AI application development with Spring Boot. Based on the momentum from 1.1.0-M1, upcoming releases will build on these foundations with enhanced capabilities and developer experience improvements.

For the latest updates and to contribute to the project, visit our [GitHub repository](https://github.com/spring-projects/spring-ai) or join the discussion in our community channels.

## [](#resources)Resources

[Project Page](https://spring.io/projects/spring-ai/) | [GitHub](https://github.com/spring-projects/spring-ai) | [Issues](https://github.com/spring-projects/spring-ai/issues) | [Documentation](https://docs.spring.io/spring-ai/docs/1.1.0-M1/reference/html) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-ai)