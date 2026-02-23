---
title: Spring AI 2.0.0-M2 Available Now
source: https://spring.io/blog/2026/01/23/spring-ai-2-0-0-M2-available-now
scraped: 2026-02-22T22:00:33.078Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  January 23, 2026 | 1 Comment
---

# Spring AI 2.0.0-M2 Available Now

_Releases | Mark Pollack |  January 23, 2026 | 1 Comment_

On behalf of the Spring AI team, I'm happy to announce that Spring AI `2.0.0-M2` is now available from Maven Central.

## [](#release-summary)Release Summary

This release includes [94 changes](https://github.com/spring-projects/spring-ai/releases/tag/v2.0.0-M2): 36 improvements, 16 bug fixes, 38 documentation updates, and 4 dependency upgrades.

Thanks to all contributors.

## [](#null-safety)Null Safety

Spring AI 2.0 will join the Spring Portfolio effort to provide a null-safe API, as documented in this [original blog post](https://spring.io/blog/2025/11/12/null-safe-applications-with-spring-boot-4). What this means is that the whole Spring AI codebase needs to be reviewed and converted to [JSpecify](https://jspecify.dev/), which is no small endeavor!

The benefits are a better documented API but also one we can trust because thanks to JSpecify and [NullAway](https://github.com/uber/NullAway), all of this is now enforced at compile time. Moreover, for Kotlin users, this translates to true nullable and non-nullable types in the Kotlin language.

Work has started to achieve full coverage by 2.0 GA, and M2 already delivers annotated packages for all of the core Spring AI APIs, memory implementations, document readers and all vector stores!

There could be changes in the near future as we discover real usage of APIs by each vendor implementation, but we appreciate the community understanding that this is an ongoing effort. This also means that future contributions will not only benefit from this, but should also properly consider marking code for null safety. Please refer to this [user guide](https://jspecify.dev/docs/user-guide/) to get started.

## [](#functional-areas)Functional Areas

-   **Model Context Protocol SDK** - Updated to MCP SDK 0.17.2 with new Mcp\*ServerCustomizer interfaces for configuration customization. Fixed auto-configuration for non-web application contexts.
-   **Vector Store Integrations** - Added Amazon S3, Infinispan, and Amazon Bedrock Knowledge Base as vector store backends.
-   **Redis Semantic Cache** - Added Redis-based semantic cache advisor for caching semantically similar queries. SemanticCache interface relocated to generic package.
-   **Mistral AI Structured Outputs** - Native JSON schema validation support for type-safe responses.
-   **Ollama Structured Output Support** - OllamaChatOptions now implements StructuredOutputChatOptions with configurable dimensions parameter for embedding models.
-   **Tool Calling** - Dynamic tool schema enhancement for runtime modification of argument definitions. Added conversationHistoryEnabled option to ToolCallAdvisor.

## [](#whats-next)What's Next

Work continues toward 2.0.0 GA. Follow progress on [GitHub](https://github.com/spring-projects/spring-ai).

## [](#resources)Resources

[Project Page](https://spring.io/projects/spring-ai/) | [GitHub](https://github.com/spring-projects/spring-ai) | [Issues](https://github.com/spring-projects/spring-ai/issues) | [Documentation](https://docs.spring.io/spring-ai/docs/2.0.0-M2/reference/html) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-ai)

## [](#-contributors)🙏 Contributors

Thanks to all the community contributors who made this release possible:

-   [Arjen Poutsma (@poutsma)](https://github.com/poutsma)
-   [chabinhwang (@chabinhwang)](https://github.com/chabinhwang)
-   [Daniel Garnier-Moiroux (@Kehrlann)](https://github.com/Kehrlann)
-   [Eddú Meléndez (@eddumelendez)](https://github.com/eddumelendez)
-   [Eric Bottard (@ericbottard)](https://github.com/ericbottard)
-   [guanxu (@guanxuc)](https://github.com/guanxuc)
-   [han-gyeong (@han-gyeong)](https://github.com/han-gyeong)
-   [Harrison (@HarrisonC118)](https://github.com/HarrisonC118)
-   [HartLi (@Hart-Li)](https://github.com/Hart-Li)
-   [jiho lee (@destiny3912)](https://github.com/destiny3912)
-   [Joey Surls (@jsurls)](https://github.com/jsurls)
-   [Julien Dubois (@jdubois)](https://github.com/jdubois)
-   [JunSeop (@LoperLee)](https://github.com/LoperLee)
-   [Katia Aresti (@karesti)](https://github.com/karesti)
-   [Kyle Kreuter (@KyleKreuter)](https://github.com/KyleKreuter)
-   [lance (@leehaut)](https://github.com/leehaut)
-   [Manideepok (@Manideepok)](https://github.com/Manideepok)
-   [matejnedic (@MatejNedic)](https://github.com/MatejNedic)
-   [Nicolas Krier (@nicolaskrier)](https://github.com/nicolaskrier)
-   [Pilhwan Choi (@thisishwan2)](https://github.com/thisishwan2)
-   [sebin1213 (@sebin1213)](https://github.com/sebin1213)
-   [Thomas Vitale (@ThomasVitale)](https://github.com/ThomasVitale)
-   [Viacheslav Dobrynin (@viacheslav-dobrynin)](https://github.com/viacheslav-dobrynin)
-   [Wenli Tian (@jamespud)](https://github.com/jamespud)
-   [Yanming Zhou (@quaff)](https://github.com/quaff)
-   [Yokior (@Yokior)](https://github.com/Yokior)
-   [Yuriy Bezsonov (@ybezsonov)](https://github.com/ybezsonov)