---
title: Spring AI 1.1.1 Available Now
source: https://spring.io/blog/2025/12/05/spring-ai-1-1-1-available-now
scraped: 2026-02-22T22:07:42.873Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  December 05, 2025 | 2 Comments
---

# Spring AI 1.1.1 Available Now

_Releases | Mark Pollack |  December 05, 2025 | 2 Comments_

On behalf of the Spring AI team, I'm pleased to announce the availability of Spring AI 1.1.1!

This release brings 13 new features, 16 bug fixes, and important dependency updates including security patches. Thanks to the community contributors who helped make this release possible.

## [](#release-summary)Release Summary

Spring AI 1.1.1 includes:

-   **13 new features** expanding capabilities across model providers
-   **16 bug fixes** for improved stability
-   **3 documentation improvements**
-   **5 dependency upgrades** including 2 CVE security fixes

([GitHub Release](https://github.com/spring-projects/spring-ai/releases/tag/v1.1.1))

## [](#openai-java-sdk-integration)OpenAI Java SDK Integration

Thanks to [Julien Dubois (@jdubois)](https://github.com/jdubois) from Microsoft, Spring AI now offers native integration with the official OpenAI Java SDK. This provides improved type safety and comprehensive API coverage for OpenAI model interactions.

## [](#chatclient-structured-output)ChatClient Structured Output

ChatClient now supports native structured output, enabling more reliable and type-safe extraction of structured data from model responses. This improvement simplifies working with AI-generated structured content in your applications.

## [](#claude-integration-enhancements)Claude Integration Enhancements

This release adds support for Claude Skills API with Files API integration, enabling file-based interactions and enhanced Claude model capabilities. We've also added support for the latest Claude 4.5 models including Opus and Haiku variants.

## [](#google-gemini-improvements)Google Gemini Improvements

Thanks to [Dan Dobrin (@ddobrin)](https://github.com/ddobrin) from Google:

-   **ThinkingLevel Configuration** - Added ThinkingLevel support in ThinkingConfig for more control over reasoning processes
-   **Safety Ratings** - Enhanced Vertex Gemini integration to include safety ratings in response metadata
-   **Gemini 3 Pro** - Added thought signatures support for function calling

## [](#mcp-fixes)MCP Fixes

Important MCP stability fixes in this release:

-   MCP client auto-configuration now supports optional handlers registry configuration ([#4920](https://github.com/spring-projects/spring-ai/pull/4920))
-   ClientMcp handlers registry now properly handles beans with unresolvable types ([#4918](https://github.com/spring-projects/spring-ai/pull/4918))

Special thanks to [Vadym Kazulkin](https://www.linkedin.com/in/vadymkazulkin/) for his help debugging some tricky MCP related issues.

## [](#bug-fixes)Bug Fixes

Notable fixes in this release:

-   **OpenAI extraBody** - Fixed issue where the `extraBody` parameter was not being properly included in OpenAI API requests. Thanks to [CorgiBoyG (@CorgiBoyG)](https://github.com/CorgiBoyG).
-   **TokenTextSplitter** - Corrected behavior when handling punctuation marks for proper text segmentation
-   **MongoDB Vector Store** - Fixed index creation to work across different Spring Data MongoDB versions
-   **OpenSearch Serverless** - Improved AWS Serverless compatibility. Thanks to [sanghun (@lsh1215)](https://github.com/lsh1215).
-   **GraalVM Native** - Resolved compilation issues when using Java 22

## [](#security-updates)Security Updates

Thanks to [Sandra Ahlgrimm (@SandraAhlgrimm)](https://github.com/SandraAhlgrimm) from Microsoft for contributing security patches:

-   Updated Apache Commons Lang to 3.18.0 (CVE: Uncontrolled Recursion)
-   Updated Apache Commons Compress to 1.28.0 (CVE: Infinite Loop, Resource Allocation)

## [](#other-enhancements)Other Enhancements

-   **Azure Cosmos DB Chat Memory** - New Spring Boot starter with auto-configuration for using Azure Cosmos DB as a chat memory repository
-   **GemFire Vector Store** - Added username and password authentication support
-   **Vector Store Filters** - Added ISNULL and ISNOTNULL filter expressions for null value checks. Thanks to [jonghoon park (@dev-jonghoonpark)](https://github.com/dev-jonghoonpark).
-   **ToolCallAdvisor** - Now supports extensibility through hook methods for customizing tool call behavior

## [](#whats-next)What's Next

Spring AI 2.0.0-M1 will be released next week.

## [](#resources)Resources

-   [Project Page](https://spring.io/projects/spring-ai)
-   [GitHub Repository](https://github.com/spring-projects/spring-ai)
-   [Issues](https://github.com/spring-projects/spring-ai/issues)
-   [Documentation](https://docs.spring.io/spring-ai/reference/)
-   [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-ai)

## [](#contributors)Contributors

Thanks to all the community contributors who made this release possible:

-   [academey (@academey)](https://github.com/academey)
-   [Andy (@andy1199)](https://github.com/andy1199)
-   [CorgiBoyG (@CorgiBoyG)](https://github.com/CorgiBoyG)
-   [Daniel Garnier-Moiroux (@Kehrlann)](https://github.com/Kehrlann)
-   [David Frizelle (@dafriz)](https://github.com/dafriz)
-   [Dan Dobrin (@ddobrin)](https://github.com/ddobrin)
-   [Eric Bottard (@ericbottard)](https://github.com/ericbottard)
-   [Jason Huynh (@jhuynh1)](https://github.com/jhuynh1)
-   [jonghoon park (@dev-jonghoonpark)](https://github.com/dev-jonghoonpark)
-   [Julien Dubois (@jdubois)](https://github.com/jdubois)
-   [lance (@leehaut)](https://github.com/leehaut)
-   [MohammadAli Jalalkamali (@parazit-IR)](https://github.com/parazit-IR)
-   [Nils Breunese (@nbreunese)](https://github.com/nbreunese)
-   [Sandra Ahlgrimm (@SandraAhlgrimm)](https://github.com/SandraAhlgrimm)
-   [sanghun (@lsh1215)](https://github.com/lsh1215)
-   [shaojie (@JGoP-L)](https://github.com/JGoP-L)
-   [YunKui Lu (@YunKuiLu)](https://github.com/YunKuiLu)
-   [Yuriy Bezsonov (@ybezsonov)](https://github.com/ybezsonov)
-   [wilocu (@wilocu)](https://github.com/wilocu)