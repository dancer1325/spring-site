---
title: Spring AI 2.0.0-M1 Available Now
source: https://spring.io/blog/2025/12/11/spring-ai-2-0-0-M1-available-now
scraped: 2026-02-22T22:05:52.400Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  December 11, 2025 | 0 Comments
---

# Spring AI 2.0.0-M1 Available Now

_Releases | Mark Pollack |  December 11, 2025 | 0 Comments_

On behalf of the Spring AI engineering team and everyone who has contributed, I'm happy to announce that Spring AI `2.0.0-M1` has been released and is now available from Maven Central.

Spring AI 2.0.0-M1 represents the first milestone of the 2.x series, built on **Spring Boot 4.0 and Spring Framework 7.0** with a Jakarta EE 11 baseline. This major platform upgrade, contributed by Dmitry Bedrin with Paul Bakker from Netflix ([#4774](https://github.com/spring-projects/spring-ai/pull/4774)), aligns Spring AI with the latest Spring ecosystem.

## [](#release-summary)Release Summary

This release includes [67 improvements, bug fixes, and documentation updates](https://github.com/spring-projects/spring-ai/releases/tag/v2.0.0-M1). Key focus areas include:

-   **Improvements**: 25 enhancements to expand capabilities and functionality
-   **Stability**: 7 bug fixes addressing community-reported issues
-   **Documentation**: 32 improvements to help developers
-   **Security**: 3 dependency upgrades for enhanced security

Thanks to all those who have contributed with issue reports and pull requests.

## [](#key-highlights)Key Highlights

-   Significant functionality enhancements with 25 improvements
-   Documentation updates with 32 improvements
-   Updated dependencies for better security and performance

## [](#key-functional-areas-enhanced)Key Functional Areas Enhanced

This release brings significant improvements across major functional areas of Spring AI:

-   **Spring Boot 4.0 and Spring Framework 7.0 Upgrade** - Updated platform foundation from Spring Boot 3.x to Spring Boot 4.0 GA and Spring Framework 7.0, requiring Java 21 for development. Thanks to Dmitry Bedrin ([@bedrin](https://github.com/bedrin)) and Paul Bakker from Netflix ([@paulbakker](https://github.com/paulbakker)) for the comprehensive upgrade effort ([#4774](https://github.com/spring-projects/spring-ai/pull/4774))
-   **Redis Chat Memory Repository** - Added Redis-based chat memory implementation with Spring Boot starter for persistent conversation storage across sessions, including text search capabilities, range query support, and HNSW index parameter tuning for improved vector search performance. Thanks to Brian Sam-Bodden ([@bsbodden](https://github.com/bsbodden)) from Redis for the original Redis chat memory contribution
-   **Redis Vector Store Enhancements** - Enhanced Redis vector store with text search capabilities, range-based vector queries, and HNSW index tuning (M, efConstruction, efRuntime parameters) for optimized similarity search performance. Thanks to Brian Sam-Bodden ([@bsbodden](https://github.com/bsbodden)) again.
-   **Google GenAI and Gemini Enhancements** - Added ThinkingLevel support in ThinkingConfig for Gemini models and updated Google GenAI SDK to 1.30.0. Thanks to Dan Dobrin ([@ddobrin](https://github.com/ddobrin)) from Google for his contributions to Google AI integration ([#4984](https://github.com/spring-projects/spring-ai/pull/4984))
-   **Official OpenAI Java SDK Integration** - Integrated native support for the official OpenAI Java SDK, with default chat model updated to gpt-5-mini. Thanks to Julien Dubois ([@jdubois](https://github.com/jdubois)) from Microsoft for the SDK integration ([#4688](https://github.com/spring-projects/spring-ai/pull/4688))
-   **Anthropic Claude Enhancements** - Comprehensive updates to Claude integration:
    -   **Claude 4.5 Models**: Added support for the latest Claude 4.5 Opus and Haiku model variants ([01ace16](https://github.com/spring-projects/spring-ai/commit/01ace16e5cd366f88014dd64b14facac1b21f684))
    -   **Citations API**: New Citations API support enabling Claude to reference specific parts of provided documents (plain text, PDF, custom content blocks) when generating responses. Supported on Claude 3.7 Sonnet and Claude 4 models ([e91eda9](https://github.com/spring-projects/spring-ai/commit/e91eda9))
    -   **Claude Skills with Files API**: Comprehensive integration with Anthropic's pre-built Skills for document generation, enabling Claude to create downloadable files ([bd90625](https://github.com/spring-projects/spring-ai/commit/bd906255bbd6bdc8bee0d526e0265728cd149c61))
    -   **Tool Choice Support**: Fine-grained control over how Claude uses tools with four modes (Auto, Any, Tool, None). Thanks to Austin Dase ([@adase11](https://github.com/adase11)) for the contribution ([#4637](https://github.com/spring-projects/spring-ai/pull/4637))
    -   **Prompt Caching Improvements**: Bug fixes for SYSTEM\_ONLY and CONVERSATION\_HISTORY cache strategies aligned with Anthropic's recommended incremental caching patterns
-   **Azure Cosmos DB Chat Memory** - Added Spring Boot starter for Azure Cosmos DB chat memory repository for conversation history storage
-   **Model Context Protocol (MCP) Updates** - Enhanced MCP client auto-configuration with optional handlers registry support and improved compatibility with beans having unresolvable types
-   **GemFire Vector Store Authentication** - Added username and password authentication support for GemFire Vector Store

## [](#whats-next)What's Next

We will be taking some time to figure out the scope and timing of the 2.0 GA release. Will keep everyone posted!

## [](#resources)Resources

[Project Page](https://spring.io/projects/spring-ai/) | [GitHub](https://github.com/spring-projects/spring-ai) | [Issues](https://github.com/spring-projects/spring-ai/issues) | [Documentation](https://docs.spring.io/spring-ai/docs/2.0.0-M1/reference/html) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-ai)

## [](#-contributors)🙏 Contributors

Thanks to all the community contributors who made this release possible:

-   [academey (@academey)](https://github.com/academey)
-   [Alexandros Pappas (@apappascs)](https://github.com/apappascs)
-   [Andy (@andy1199)](https://github.com/andy1199)
-   [Baojun Jiang (@jiangbaojun)](https://github.com/jiangbaojun)
-   [CorgiBoyG (@CorgiBoyG)](https://github.com/CorgiBoyG)
-   [Brian Sam-Bodden (@bsbodden)](https://github.com/bsbodden)
-   [David Frizelle (@dafriz)](https://github.com/dafriz)
-   [Dan Dobrin (@ddobrin)](https://github.com/ddobrin)
-   [Dmitry Bedrin (@bedrin)](https://github.com/bedrin)
-   [Eric Bottard (@ericbottard)](https://github.com/ericbottard)
-   [Jason Huynh (@jhuynh1)](https://github.com/jhuynh1)
-   [jonghoon park (@dev-jonghoonpark)](https://github.com/dev-jonghoonpark)
-   [Julien Dubois (@jdubois)](https://github.com/jdubois)
-   [lance (@leehaut)](https://github.com/leehaut)
-   [MohammadAli Jalalkamali (@parazit-IR)](https://github.com/parazit-IR)
-   [NathanGrand (@q-nathangrand)](https://github.com/q-nathangrand)
-   [Nicolas Krier (@nicolaskrier)](https://github.com/nicolaskrier)
-   [Nils Breunese (@nbreunese)](https://github.com/nbreunese)
-   [oneby-wang (@onebywang)](https://github.com/onebywang)
-   [Paul Bakker, Netflix (@paulbakker)](https://github.com/paulbakker)
-   [Rory Preddy (@roryp)](https://github.com/roryp)
-   [sanghun (@lsh1215)](https://github.com/lsh1215)
-   [shaojie (@JGoP-L)](https://github.com/JGoP-L)
-   [YunKui Lu (@YunKuiLu)](https://github.com/YunKuiLu)
-   [Yuriy Bezsonov (@ybezsonov)](https://github.com/ybezsonov)