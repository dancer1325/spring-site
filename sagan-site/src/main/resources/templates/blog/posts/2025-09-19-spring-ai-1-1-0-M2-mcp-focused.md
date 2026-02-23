---
title: Spring AI 1.1.0-M2 Available Now: Enhanced Model Context Protocol Support
source: https://spring.io/blog/2025/09/19/spring-ai-1-1-0-M2-mcp-focused
scraped: 2026-02-23T07:28:55.584Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  September 19, 2025 | 0 Comments
---

# Spring AI 1.1.0-M2 Available Now: Enhanced Model Context Protocol Support

_Releases | Mark Pollack |  September 19, 2025 | 0 Comments_

On behalf of the Spring AI engineering team and everyone who has contributed, I'm happy to announce that Spring AI `1.1.0-M2` has been released and is now available from Maven Central.

This milestone release focuses primarily on **enhanced Model Context Protocol (MCP) support**, incorporating critical fixes and improvements from the [MCP Java SDK v0.13.0 release](https://github.com/modelcontextprotocol/java-sdk/releases/tag/v0.13.0), along with significant updates across many areas of Spring AI.

## [](#release-summary)Release Summary

This release includes [56 improvements, bug fixes, and documentation updates](https://github.com/spring-projects/spring-ai/releases/tag/v1.1.0-M2). The primary focus areas include:

-   **Model Context Protocol Enhancements**: Updated to MCP Java SDK v0.13.1 with mcp-annotations v0.4.1 and protocol version 2025-06-18 support
-   **MCP Integration Fixes**: Resolved critical stateless server registration issues with AOT compilation support
-   **New Features**: 16 new capabilities and functionality additions
-   **Stability**: 12 bug fixes addressing community-reported issues
-   **Documentation**: 6 improvements including comprehensive MCP getting started guide
-   **Other Improvements**: 22 enhancements including performance optimizations and dependency upgrades

## [](#-model-context-protocol-improvements)🔧 Model Context Protocol Improvements

This release brings many MCP improvements, motivated by significant improvements in the latest version of MCP Java SDK.

### [](#core-mcp-enhancements)**Core MCP Enhancements**

-   **Updated MCP Java SDK**: Upgraded from v0.12.1 to v0.13.1, incorporating protocol version 2025-06-18 support
-   **Enhanced MCP Annotations**: Updated to mcp-annotations v0.4.1 with AOT (Ahead-of-Time) compilation support for native image compatibility
-   **Stateless Server Registration**: Fixed critical issues with MCP server connection handling for reliable production deployments
-   **Enhanced Tool Management**: Improved tool name prefix generation with automatic duplicate handling
-   **Configuration Improvements**: Streamlined MCP configuration properties for better Spring Boot integration
-   **Comprehensive Documentation**: Added improved MCP documentation and getting started guide for developers
-   **Dependency Management**: Leverages the new `mcp-core` module with reduced Jackson dependencies

### [](#integration)**Integration**

-   **Docker Compose Support**: Native service connection support for MCP Gateway in containerized environments
-   **Testcontainers Integration**: Seamless testing capabilities for Docker-based MCP gateway deployments

### [](#breaking-changes--migration)**Breaking Changes & Migration**

The MCP Java SDK v0.13.0 includes breaking changes that Spring AI now handles:

-   Updated `CallToolResult.structuredContent()` API for better array-type content support
-   Module restructuring for improved dependency management
-   Enhanced error recovery in `LifecycleInitializer`

For developers using MCP in Spring AI applications, this release provides a more stable and feature-rich foundation for tool integration workflows.

**Special thanks to the [MCP Java SDK v0.13.0](https://github.com/modelcontextprotocol/java-sdk/releases/tag/v0.13.0) community** for their exceptional work on the underlying SDK improvements that made this Spring AI release possible:

**Broadcom**: [Christian Tzolov (@tzolov)](https://github.com/tzolov), [Daniel Garnier-Moiroux (@Kehrlann)](https://github.com/Kehrlann)  
**Oracle**: [Graeme Rocher (@graemerocher)](https://github.com/graemerocher), [Sergio del Amo (@sdelamo)](https://github.com/sdelamo)  
**Google**: [Yanming Zhou (@quaff)](https://github.com/quaff)  
**Open Source Community**: [@He-Pin](https://github.com/He-Pin) - Apache Pekko PMC member and active Project Reactor contributor

## [](#additional-functional-areas-enhanced)Additional Functional Areas Enhanced

Beyond MCP improvements, this release includes:

-   **Improved Structured Output**: VertexAI Gemini response schema validation for guaranteed JSON/XML generation
-   **Chinese AI Model Expansion**: ZhipuAI integration with GLM-4.5, GLM-Z1, and GLM-4.1v-thinking-flash models
-   **New OCR Model support**: Mistral AI OCR API for document and image text extraction
-   **Ollama Enterprise Features**: Updated hardware, memory, and performance configuration options
-   **API Consistency**: Unified builder patterns across EmbeddingOptions, ChatOptions, and AssistantMessage
-   **Anthropic Cache Management**: Implemented cache management for Anthropic API with eligibility tracking for improved performance and resource optimization
-   **Google GenAI Enhancements**: Added extended token usage metadata and Cached Content API support to Google GenAI (Gemini) for enhanced performance monitoring and content caching capabilities

## [](#contributors-and-community)Contributors and Community

A big thank-you to everyone who reported issues, submitted fixes, and contributed features in this milestone. Your work directly strengthens the project and is greatly appreciated.

We also know there are still community pull requests waiting to be reviewed and merged. We appreciate your patience and want you to know we are actively working through the backlog to give contributions the attention they deserve.

🙏 **Contributors**

Thanks to all contributors who made this release possible:

-   [Alexandros Pappas (@apappascs)](https://github.com/apappascs)
-   [Andrei Sumin (@andrei.sumin)](https://github.com/andrei.sumin)
-   [Christian Tzolov (@tzolov)](https://github.com/tzolov)
-   [Dan Dobrin (@ddobrin)](https://github.com/ddobrin)
-   [Daniel Garnier-Moiroux (@git)](https://github.com/git)
-   [Eddú Meléndez (@eddu.melendez)](https://github.com/eddu.melendez)
-   [Gareth Evans (@gareth)](https://github.com/gareth)
-   [Ilayaperumal Gopinathan (@ilayaperumalg)](https://github.com/ilayaperumalg)
-   [Josh Long (@joshlong)](https://github.com/joshlong)
-   [leeyazhou (@bytesgo)](https://github.com/bytesgo)
-   [Li Huagang-简放视野 (@bert825\_work)](https://github.com/bert825_work)
-   [Nicolas Krier (@nicolaskrier)](https://github.com/nicolaskrier)
-   [Oleksandr Klymenko (@alexanderklmn)](https://github.com/alexanderklmn)
-   [SiBo Ai (@ai-afk)](https://github.com/ai-afk)
-   [Stuart Loxton (@stuart.loxton)](https://github.com/stuart.loxton)
-   [Sun Yuhan (@sunyuhan1998)](https://github.com/sunyuhan1998)
-   [Thomas Vitale (@ThomasVitale)](https://github.com/ThomasVitale)
-   [Toshiaki Maki (@makingx)](https://github.com/makingx)
-   [Waldemar Panas (@waldemar.panas)](https://github.com/waldemar.panas)
-   [xfl12345 (@xfl12345)](https://github.com/xfl12345)
-   [Yanming Zhou (@zhouyanming)](https://github.com/zhouyanming)
-   [YuJie Wan (@eeaters)](https://github.com/eeaters)
-   [YunKui Lu (@luyunkui95)](https://github.com/luyunkui95)

[Project Page](https://spring.io/projects/spring-ai/) | [GitHub](https://github.com/spring-projects/spring-ai) | [Issues](https://github.com/spring-projects/spring-ai/issues) | [Documentation](https://docs.spring.io/spring-ai/docs/1.1.0-M2/reference/html) | [MCP Java SDK](https://github.com/modelcontextprotocol/java-sdk) | [Blog Tutorial: Connect Your AI to Everything](https://spring.io/blog/2025/09/16/spring-ai-mcp-intro-blog) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-ai)