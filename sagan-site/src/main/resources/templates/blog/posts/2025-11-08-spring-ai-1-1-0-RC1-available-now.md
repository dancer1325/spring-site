---
title: Spring AI 1.1.0-RC1 Available Now
source: https://spring.io/blog/2025/11/08/spring-ai-1-1-0-RC1-available-now
scraped: 2026-02-23T07:22:46.001Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ilayaperumal Gopinathan |  November 08, 2025 | 0 Comments
---

# Spring AI 1.1.0-RC1 Available Now

_Releases | Ilayaperumal Gopinathan |  November 08, 2025 | 0 Comments_

On behalf of the Spring AI engineering team and everyone who has contributed, we are happy to announce that Spring AI `1.1.0-RC1` has been released and is now available from Maven Central.

This patch release delivers important stability improvements and bug fixes.

## [](#release-summary)Release Summary

This release includes [40 improvements, bug fixes, and documentation updates](https://github.com/spring-projects/spring-ai/releases/tag/v1.1.0-RC1). The focus of this patch release is on:

-   **Improvements**: 12 enhancements to expand capabilities and functionality
-   **Stability**: 10 bug fixes addressing community-reported issues
-   **Documentation**: 12 improvements to help developers
-   **Security**: 6 dependency upgrades for enhanced security

Thanks to all those who have contributed with issue reports and pull requests.

## [](#key-highlights)Key Highlights

-   Enhanced functionality with 12 improvements
-   Updated dependencies for better security and performance

## [](#key-functional-areas-enhanced)Key Functional Areas Enhanced

This release brings significant improvements across major functional areas of Spring AI:

-   **OpenAI Reasoning Content Access** - Added extraBody and reasoningContent support in OpenAI API, allowing access to reasoning chains and custom model parameters
-   **MongoDB Chat Memory** - Added MongoDB repository implementation for storing conversation history in MongoDB databases
-   **Model Context Protocol Tool Caching** - Event-driven caching mechanism for MCP tool callbacks reduces redundant operations
-   **Ollama Thinking Mode** - Added thinking mode support for Ollama reasoning models with reasoning\_effort parameter control
-   **Automatic Network Retry** - Network exception retry configuration improves resilience in distributed deployments
-   **OpenAI Text-to-Speech Interface** - Migrated OpenAI TTS to shared TextToSpeechModel interface with standardized Double speed parameter

These enhancements strengthen Spring AI's capabilities across the entire AI application development lifecycle.

## [](#whats-next)What's Next

The Spring AI team continues to focus on improving AI application development with Spring Boot. Based on the momentum from 1.1.0-RC1, we are excited to release 1.1.0 GA pretty soon.

For the latest updates and to contribute to the project, visit our [GitHub repository](https://github.com/spring-projects/spring-ai) or join the discussion in our community channels.

## [](#resources)Resources

[Project Page](https://spring.io/projects/spring-ai/) | [GitHub](https://github.com/spring-projects/spring-ai) | [Issues](https://github.com/spring-projects/spring-ai/issues) | [Documentation](https://docs.spring.io/spring-ai/docs/1.1.0-RC1/reference/html) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-ai)

🙏 Contributors

Thanks to all contributors who made this release possible:

-   [Alexandros Pappas (@apappascs)](https://github.com/apappascs)
-   [Christian Tzolov (@tzolov)](https://github.com/tzolov)
-   [Daniel Garnier-Moiroux (@Kehrlann)](https://github.com/Kehrlann)
-   [Eric Bottard (@ericbottard)](https://github.com/ericbottard)
-   [guanxu (@guanxuc)](https://github.com/guanxuc)
-   [Ilayaperumal Gopinathan (@ilayaperumalg)](https://github.com/ilayaperumalg)
-   [Issam El-atif (@ielatif)](https://github.com/ielatif)
-   [James Ward (@jamesward)](https://github.com/jamesward)
-   [liugddx (@liugddx)](https://github.com/liugddx)
-   [Mark Pollack (@markpollack)](https://github.com/markpollack)
-   [Martin Kamp Jensen (@mkjensen)](https://github.com/mkjensen)
-   [Nguyen Tran (Mark) (@nguyen.trantrung)](https://github.com/nguyen.trantrung)
-   [Philip I. Thomas (@philipithomas)](https://github.com/philipithomas)
-   [Senrey\_Song (@SenreySong)](https://github.com/SenreySong)
-   [Thorben Janssen (@thjanssen)](https://github.com/thjanssen)
-   [Tran Ngoc Nhan (@ngocnhan-tran1996)](https://github.com/ngocnhan-tran1996)
-   [vdm24 (@vdm24)](https://github.com/vdm24)
-   [Viacheslav Dobrynin (@viacheslav-dobrynin)](https://github.com/viacheslav-dobrynin)
-   [Wenli Tian (@jamespud)](https://github.com/jamespud)
-   [Yanming Zhou (@quaff)](https://github.com/quaff)
-   [Łukasz Jernaś (@deejay1)](https://github.com/deejay1)