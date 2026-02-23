---
title: Spring AI 1.1.0-M3 Available Now
source: https://spring.io/blog/2025/10/06/spring-ai-1-1-0-M3-available-now
scraped: 2026-02-23T07:28:00.092Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  October 06, 2025 | 0 Comments
---

# Spring AI 1.1.0-M3 Available Now

_Releases | Mark Pollack |  October 06, 2025 | 0 Comments_

On behalf of the Spring AI engineering team and everyone who has contributed, I'm happy to announce that Spring AI `1.1.0-M3` has been released and is now available from Maven Central.

This milestone release focuses primarily on **Model Context Protocol (MCP) enhancements**, incorporating the [MCP Java SDK v0.14.0](https://github.com/modelcontextprotocol/java-sdk/releases/tag/v0.14.0) upgrade along with new resource template capabilities and security documentation.

## [](#release-summary)Release Summary

This release includes [46 improvements, bug fixes, and documentation updates](https://github.com/spring-projects/spring-ai/releases/tag/v1.1.0-M3). Key focus areas include:

-   **Model Context Protocol**: Upgraded to MCP Java SDK 0.14.0 with resource template support and security best practices
-   **New Features**: 7 capabilities including Azure Cosmos DB chat memory and GemFire metadata filtering
-   **Stability**: 11 bug fixes addressing community-reported issues
-   **Documentation**: 9 improvements including MCP security guidance
-   **Dependency Upgrades**: 3 updates including security fixes (CVE-2025-54988)

## [](#-model-context-protocol-improvements)🔧 Model Context Protocol Improvements

This release brings **enhanced MCP integration** to Spring AI, motivated by significant improvements in the MCP Java SDK v0.14.0:

### [](#core-mcp-enhancements)**Core MCP Enhancements**

-   **Updated [MCP Java SDK](https://modelcontextprotocol.io/sdk/java/mcp-overview)**: Enhanced resource template management and API consistency
-   **[Security Documentation](https://docs.spring.io/spring-ai/reference/1.1/api/mcp/mcp-security.html)**: Added MCP security reference documentation for secure deployment configurations
-   **Resource Template Support**: Added parameterized resource template capabilities for both sync and async MCP servers, enabling flexible resource provisioning with dynamic parameters
-   **Client-Side Validation**: New tool output schema validation and caching capabilities for improved reliability
-   **Robust Error Handling**: Better resilience for MCP server interactions with proper handling of non-compliant notification responses and Content-Length: 0 scenarios
-   **Spec Compliance**: Proper resource not found handling according to MCP specification
-   **API Refinements**: Improved JSON type handling, consistent naming conventions (MCP\_SESSION\_ID), and optional lastModified field support in Annotations

For developers using MCP in Spring AI applications, this release provides a more stable and feature-rich foundation for tool integration workflows.

**Special thanks to the [MCP Java SDK](https://github.com/modelcontextprotocol/java-sdk/releases/tag/v0.14.0) community** for their exceptional work on the underlying SDK improvements that made this Spring AI release possible:

**Broadcom**: [Christian Tzolov (@tzolov)](https://github.com/tzolov), [Daniel Garnier-Moiroux (@Kehrlann)](https://github.com/Kehrlann), [Dariusz Jędrzejczyk (@chemicL)](https://github.com/chemicL)  
**Oracle**: [Sergio del Amo (@sdelamo)](https://github.com/sdelamo)  
**Confluent**: [Pascal Vantrepote (@pascalconfluent)](https://github.com/pascalconfluent)  
**Amazon Web Services**: [Anurag Pant (@pantanurag555)](https://github.com/pantanurag555)  
**Open Source Community**: [Liujunjie (@JunJieLiu51520)](https://github.com/JunJieLiu51520) - First-time contributor to MCP Java SDK

## [](#additional-functional-areas-enhanced)Additional Functional Areas Enhanced

Beyond MCP improvements, this release brings enhancements across major functional areas of Spring AI:

-   **[Azure Cosmos DB Chat Memory](https://docs.spring.io/spring-ai/reference/1.1/api/chat-memory.html)** - Added Azure Cosmos DB integration for chat memory storage, expanding beyond existing Cassandra support
-   **[Anthropic Prompt Caching](https://docs.spring.io/spring-ai/reference/1.1/api/chat/anthropic-chat.html#_prompt_caching)** - Updated Anthropic integration with prompt caching strategies (system-only, system-and-tools, conversation-history) and support for the latest Claude models (Sonnet 4.5, Opus 4.1) with consistent naming conventions
-   **[GemFire Vector Search](https://docs.spring.io/spring-ai/reference/1.1/api/vectordbs/gemfire.html)** - Added metadata filtering for GemFireVectorStore enabling similarity search queries with filtering conditions for RAG applications
-   **[MarkdownDocumentReader](https://docs.spring.io/spring-ai/reference/1.1/api/etl-pipeline.html#_markdown)** - Now processes multiple documents in a single operation for batch document ingestion
-   **[Mistral AI Improvements](https://docs.spring.io/spring-ai/reference/1.1/api/chat/mistralai-chat.html)** - Builder pattern support across the Mistral module plus improved JsonSchemaGenerator handling for function calling parameters

## [](#looking-ahead-spring-ai-11-ga)Looking Ahead: Spring AI 1.1 GA

As we progress toward the Spring AI 1.1 General Availability release, the team is focused on three key areas:

**Model Context Protocol (MCP)** - Continued MCP enhancements

**Chat Model Features** - Expanding prompt caching and thinking/reasoning mode support across model providers

**Chat Memory** - Addressing community-reported chat memory issues

For the latest updates and to contribute to the project, visit our [GitHub repository](https://github.com/spring-projects/spring-ai) or join the discussion in our community channels.

## [](#resources)Resources

[Project Page](https://spring.io/projects/spring-ai/) | [GitHub](https://github.com/spring-projects/spring-ai) | [Issues](https://github.com/spring-projects/spring-ai/issues) | [Documentation](https://docs.spring.io/spring-ai/reference/1.1.0-M3/) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-ai)

## [](#-contributors)🙏 Contributors

Thanks to all contributors who made this release possible:

-   [ashakirin (@andrei.shakirin)](https://github.com/andrei.shakirin)
-   [Cameron Kirk (@kirkster96)](https://github.com/kirkster96)
-   [cho-thinkfree-com (@cho)](https://github.com/cho)
-   [Christian Tzolov (@tzolov)](https://github.com/tzolov)
-   [codeboyzhou (@imzhouchen)](https://github.com/imzhouchen)
-   [Daniel Garnier-Moiroux (@git)](https://github.com/git)
-   [David Frizelle (@dafriz)](https://github.com/dafriz)
-   [Dmitrii Chechetkin (@dmitrii.chechetkin)](https://github.com/dmitrii.chechetkin)
-   [Eric Bottard (@bottarde)](https://github.com/bottarde)
-   [Hyoseop Song (@crad\_on25)](https://github.com/crad_on25)
-   [Ilayaperumal Gopinathan (@ilayaperumalg)](https://github.com/ilayaperumalg)
-   [James Ward (@james)](https://github.com/james)
-   [Jason Huynh (@jason.huynh)](https://github.com/jason.huynh)
-   [Jason Smith (@jasonparallel)](https://github.com/jasonparallel)
-   [lance (@leehaut)](https://github.com/leehaut)
-   [Mark Pollack (@markpollack)](https://github.com/markpollack)
-   [NathanGrand (@nathangrand)](https://github.com/nathangrand)
-   [Nils Breunese (@nils)](https://github.com/nils)
-   [Oleksandr Klymenko (@alexanderklmn)](https://github.com/alexanderklmn)
-   [Soby Chacko (@soby.chacko)](https://github.com/soby.chacko)
-   [Sun Yuhan (@sunyuhan1998)](https://github.com/sunyuhan1998)
-   [Theo van Kraay (@theo.van)](https://github.com/theo.van)
-   [Tran Ngoc Nhan (@ngocnhan.tran1996)](https://github.com/ngocnhan.tran1996)
-   [Yanming Zhou (@quaff)](https://github.com/quaff)
-   [YuJie Wan (@eeaters)](https://github.com/eeaters)
-   [YunKui Lu (@luyunkui95)](https://github.com/luyunkui95)