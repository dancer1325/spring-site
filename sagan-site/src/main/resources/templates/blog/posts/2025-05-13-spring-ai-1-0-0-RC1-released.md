---
title: Spring AI 1.0.0 RC1 Released
source: https://spring.io/blog/2025/05/13/spring-ai-1-0-0-RC1-released
scraped: 2026-02-23T07:43:21.587Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  May 13, 2025 | 0 Comments
---

# Spring AI 1.0.0 RC1 Released

_Releases | Mark Pollack |  May 13, 2025 | 0 Comments_

We're excited to announce Spring AI 1.0.0 RC1, marking the final set of breaking changes, bug fixes, and new functionality before the stable release! The GA version is scheduled for May 20th, 2025 - just one week away. During this time, we'll be focusing on improving documentation and addressing any reported bugs.

To celebrate this release, we have added a new song to our [AI-generated music playlist](https://suno.com/playlist/321b61a4-201d-4404-9335-bf909250b0e3) Check out the [latest track](https://suno.com/s/CyLqAKEHbu0u7uvj) to enhance your blog reading and coding experience.

## [](#important-links)Important Links

-   [Upgrade Notes](https://docs.spring.io/spring-ai/reference/upgrade-notes.html#upgrading-to-1-0-0-RC1)
-   You can automate the upgrade process to 1.0.0-RC1 using an OpenRewrite recipe. This recipe helps apply many of the necessary code changes for this version. Find the recipe and usage instructions at [Arconia Spring AI Migrations](https://github.com/arconia-io/arconia-migrations/blob/main/docs/spring-ai.md).

# [](#key-breaking-changes)Key Breaking Changes

## [](#chat-client-and-advisors)Chat Client and Advisors

-   In `VectorStoreChatMemoryAdvisor`:
    
    -   `CHAT_MEMORY_RETRIEVE_SIZE_KEY` → `TOP_K`
    -   `DEFAULT_CHAT_MEMORY_RESPONSE_SIZE` (100) → `DEFAULT_TOP_K` (20)
-   `CHAT_MEMORY_CONVERSATION_ID_KEY` → `CONVERSATION_ID` (moved to `ChatMemory` interface)
    
    -   Update imports to: `org.springframework.ai.chat.memory.ChatMemory.CONVERSATION_ID`

## [](#self-contained-templates-in-advisors)Self-contained Templates in Advisors

Advisors now use independent templates with specific required placeholders:

-   `QuestionAnswerAdvisor`: `query`, `question_answer_context`
-   `PromptChatMemoryAdvisor`: `instructions`, `memory`
-   `VectorStoreChatMemoryAdvisor`: `instructions`, `long_term_memory`

## [](#chat-memory-repository-naming-standardization)Chat Memory Repository Naming Standardization

In 1.0.0-RC1, we've standardized the naming pattern for chat memory components by adding the `repository` suffix throughout the codebase. This change affects Cassandra, JDBC, and Neo4j implementations:

### [](#artifact-ids)Artifact IDs

All memory-related artifacts now follow a consistent pattern:

-   `spring-ai-model-chat-memory-*` → `spring-ai-model-chat-memory-repository-*`
-   `spring-ai-autoconfigure-model-chat-memory-*` → `spring-ai-autoconfigure-model-chat-memory-repository-*`
-   `spring-ai-starter-model-chat-memory-*` → `spring-ai-starter-model-chat-memory-repository-*`

### [](#java-packages)Java Packages

-   Package paths now include `.repository.` segment
-   Example: `org.springframework.ai.chat.memory.jdbc` → `org.springframework.ai.chat.memory.repository.jdbc`

### [](#configuration-classes)Configuration Classes

-   Main autoconfiguration classes now use the `Repository` suffix
-   Example: `JdbcChatMemoryAutoConfiguration` → `JdbcChatMemoryRepositoryAutoConfiguration`

### [](#properties)Properties

-   Configuration properties renamed from `spring.ai.chat.memory.<storage>...` to `spring.ai.chat.memory.repository.<storage>...`

## [](#observability-changes)Observability Changes

-   Switched from tracing to logging
-   Properties renamed (e.g., `include-prompt` → `log-prompt`)
-   Removed OTel SDK dependency

All deprecations have been removed for a cleaner API. For complete details, see the [Spring AI Upgrade Notes](https://docs.spring.io/spring-ai/reference/upgrade-notes.html#upgrading-to-1-0-0-RC1).

# [](#new-features)New Features

## [](#model-enhancements)Model Enhancements

### [](#deepseek-integration)DeepSeek Integration

Added dedicated DeepSeek model support with core classes and starter, accommodating its divergence from the OpenAI API.

### [](#azure-openai)Azure OpenAI

-   JSON schema support with builder pattern in AzureOpenAiResponseFormat
-   Entra ID identity management for simplified authentication
-   Stream usage support for efficient response handling
-   reasoning\_effort parameter in AzureOpenAiChatOptions

### [](#openai)OpenAI

-   Mutate functionality for OpenAiApi and OpenAiChatModel builders
-   Web Search Annotations for improved search integration
-   Configurable imagesPath in OpenAiImageModel

### [](#vertex-ai-gemini)Vertex AI Gemini

-   Parameter warnings and penalty options for better output quality
-   JSON array support in jsonToStruct

## [](#rag-and-document-processing)RAG and Document Processing

-   DocumentPostProcessors in RAG Advisor for sophisticated transformation pipelines
-   Customizable text property name with backward compatibility

## [](#tool-calling)Tool Calling

-   Generic argument type support in tool callbacks

## [](#memory-management)Memory Management

-   Flexible database support in JdbcChatMemory
-   Cassandra support via CassandraChatMemoryRepository

## [](#observability)Observability

-   Enhanced logging for content observation
-   Observability support for Bedrock Titan Embedding model

## [](#contributors)Contributors

There were other refactoring, bug fixing, documentation enhancements across the board by a wide range of contributors. If we haven't gotten to your PR yet, we will, please be patient. Thanks to

-   [Alexandros Pappas (apappascs)](https://github.com/apappascs)
-   [Ana Maria Mihalceanu (ammbra)](https://github.com/ammbra)
-   [Andres da Silva Santos (andresssantos)](https://github.com/andresssantos)
-   [Barsha Ghosh (barsha-ghosh721)](https://github.com/barsha-ghosh721)
-   [Bart Veenstra (bart.veenstra)](https://github.com/bart.veenstra)
-   [BeomSeogKim (BeomSeogKim)](https://github.com/BeomSeogKim)
-   [Chengcheng Wu (AntonyCheng)](https://github.com/AntonyCheng)
-   [Claudio Silva Junior (Claudio-code)](https://github.com/Claudio-code)
-   [Dariusz Jędrzejczyk (chemicL)](https://github.com/chemicL)
-   [ddobrin (ddobrin)](https://github.com/ddobrin)
-   [Enrico Rampazzo (enrico.rampazzo)](https://github.com/enrico.rampazzo)
-   [g00glen00b (g00glen00b)](https://github.com/g00glen00b)
-   [GR (mxsl-gr)](https://github.com/mxsl-gr)
-   [HYUNSANG HAN (HyunSangHan)](https://github.com/HyunSangHan)
-   [Jakub (jpomykala)](https://github.com/jpomykala)
-   [Jemin Huh (JM-Lab)](https://github.com/JM-Lab)
-   [Jonatan Ivanov (jonatan-ivanov)](https://github.com/jonatan-ivanov)
-   [Jonghoon Park (dev-jonghoonpark)](https://github.com/dev-jonghoonpark)
-   [Lambochen (lambochen)](https://github.com/lambochen)
-   [Linar Abzaltdinov (linarkou)](https://github.com/linarkou)
-   [Łukasz Jernaś (deejay1)](https://github.com/deejay1)
-   [Mark Heckler (mkheck)](https://github.com/mkheck)
-   [mck (michaelsembwever)](https://github.com/michaelsembwever)
-   [Michael Simons (michael-simons)](https://github.com/michael-simons)
-   [Mikhail Mazurkevich (mmazurkevich)](https://github.com/mmazurkevich)
-   [ndoe (ndoe)](https://github.com/ndoe)
-   [Ngoc Nhan Tran (ngocnhan-tran1996)](https://github.com/ngocnhan-tran1996)
-   [nlinhvu (nlinhvu)](https://github.com/nlinhvu)
-   [Poonam Parhar (poonamparhar)](https://github.com/poonamparhar)
-   [PSriVarshan (PSriVarshan)](https://github.com/PSriVarshan)
-   [Solomon Hsu (solnone)](https://github.com/solnone)
-   [Temuu-jin (Temuu-jin)](https://github.com/Temuu-jin)
-   [The-Gamer-01 (The-Gamer-01)](https://github.com/The-Gamer-01)
-   [Thomas Vitale (ThomasVitale)](https://github.com/ThomasVitale)
-   [Vinay Balamuru (balamuru)](https://github.com/balamuru)
-   [Wenli Tian (jamespud)](https://github.com/jamespud)
-   [Yanming Zhou (quaff)](https://github.com/quaff)
-   [ykoh42 (ykoh42)](https://github.com/ykoh42)
-   [YunKui Lu (YunKuiLu)](https://github.com/YunKuiLu)