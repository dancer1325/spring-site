---
title: Spring AI 1.0.0 M8 Released
source: https://spring.io/blog/2025/04/30/spring-ai-1-0-0-m8-released
scraped: 2026-02-23T07:44:06.507Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  April 30, 2025 | 0 Comments
---

# Spring AI 1.0.0 M8 Released

_Releases | Mark Pollack |  April 30, 2025 | 0 Comments_

After reviewing our API design and deprecations post M7, we determined that several significant changes would become breaking changes in an RC1 release. Therefore, we've introduced this additional milestone to provide developers with a transitional release where deprecated APIs coexist alongside their replacements, enabling a smoother upgrade experience before RC1.

Here are the key changes in this release.

## [](#important-links)Important Links

-   [Upgrade Notes](https://docs.spring.io/spring-ai/reference/upgrade-notes.html#upgrading-to-1-0-0-m7)
-   You can automate the upgrade process to 1.0.0-M8 using an OpenRewrite recipe. This recipe helps apply many of the necessary code changes for this version. Find the recipe and usage instructions at [Arconia Spring AI Migrations](https://github.com/arconia-io/arconia-migrations/blob/main/docs/spring-ai.md).

## [](#breaking-changes)Breaking Changes

When upgrading from Spring AI 1.0 M7 to 1.0 M8, users who previously registered tool callbacks are encountering breaking changes that cause tool calling functionality to silently fail. This is specifically impacting code that used the deprecated `tools()` method.

### [](#example)Example

Here's an example of code that worked in M7 but no longer functions as expected in M8:

```java
Copy// Old code in M7 - no longer works correctly in M8
chatClient.prompt("What day is tomorrow?")
    .tools(toolCallback)
    .call()
    .content();
```

### [](#how-to-adapt-your-code)How to Adapt Your Code

To fix this issue when upgrading to M8, you need to update your code to use the new `toolCallbacks()` method:

```java
Copy// Updated code for M8
chatClient.prompt("What day is tomorrow?")
    .toolCallbacks(toolCallback)
    .call()
    .content();
```

### [](#why-this-change-was-made)Why This Change Was Made

The Spring AI team renamed the overloaded `tools()` methods to improve clarity and prevent ambiguity in method dispatching. The previous API design led to confusion when the Java compiler needed to select between multiple overloaded methods based on parameter types.

### [](#method-mapping-from-m7-to-m8)Method Mapping from M7 to M8

Here's how the old methods map to their new counterparts:

1.  `tools(String... toolNames)` → `toolNames(String... toolNames)`
    
    -   Use when referring to tools registered elsewhere (e.g., via `@Bean` with `@Description`)
2.  `tools(ToolCallback... toolCallbacks)` → `toolCallbacks(ToolCallback... toolCallbacks)`
    
    -   Use for inline tool callback registration
3.  `tools(List<ToolCallback> toolCallbacks)` → `toolCallbacks(List<ToolCallback> toolCallbacks)`
    
    -   Use when you have a collection of tool callbacks
4.  `tools(ToolCallbackProvider... toolCallbackProviders)` → `toolCallbacks(ToolCallbackProvider... toolCallbackProviders)`
    
    -   Use for objects implementing the `ToolCallbackProvider` interface
5.  `tools(Object... toolObjects)` remains unchanged
    
    -   Use only for objects with methods annotated with `@Tool`

### [](#improved-error-handling)Improved Error Handling

In the [latest PR (spring-projects/spring-ai#2964)](https://github.com/spring-projects/spring-ai/pull/2964), the `tools(Object... toolObjects)` method will now throw an exception when no `@Tool` methods are found on the provided objects, rather than silently failing. This helps developers identify migration issues immediately.

### [](#migration-summary)Migration Summary

If you're upgrading from M7 to M8:

1.  Replace all calls to `.tools(toolCallback)` with `.toolCallbacks(toolCallback)`
2.  Replace all calls to `.tools(toolCallbackProvider)` with `.toolCallbacks(toolCallbackProvider)`
3.  Replace all calls to `.tools("toolName")` with `.toolNames("toolName")`

These changes will ensure your tool calling functionality continues to work correctly after upgrading to Spring AI 1.0 M8.

## [](#new-features)New Features

1.  Chat Memory Enhancements

-   **Enhanced Chat Memory Architecture**
    -   Improved `ChatMemory` API for more flexible conversation history management
    -   New `ChatMemoryRepository` interface allows different storage strategies
    -   Added `MessageWindowChatMemory` for maintaining a window of messages
    -   Improved property naming for consistency across implementations
    -   Support for various storage backends:
        -   `InMemoryChatMemoryRepository` (default)
        -   `JdbcChatMemoryRepository` for relational databases
    -   Refer to [Memory Types](https://docs.spring.io/spring-ai/reference/api/chat-memory.html#_memory_types) and [Memory Storage](https://docs.spring.io/spring-ai/reference/api/chat-memory.html#_memory_storage) for more details on chat memory configurations.

2.  [Template Rendering](https://docs.spring.io/spring-ai/reference/upgrade-notes.html#prompt-templating)\*

-   **Introduce TemplateRenderer for prompt templating**
    -   A flexible new API for template rendering that provides a consistent interface across different template engines
    -   Includes the new `StTemplateRenderer` with support for built-in functions and custom validation options. See how to use it [here](https://docs.spring.io/spring-ai/reference/api/prompt.html#_using_a_custom_template_renderer).
    -   Integrated directly into the ChatClient for streamlined prompt templating
    -   Added `NoOpTemplateRenderer` for cases where templating is not needed
    -   Related: "Configure TemplateRenderer in ChatClient", "Update docs to mention NoOpTemplateRenderer"

3.  MCP Improvements

-   **Enhanced MCP tool callback configuration**
    -   Added tool callback configuration to MCP client properties
    -   Support for completion specifications in MCP server
    -   Added instructions support to MCP server
    -   Added SSE endpoint parameter to WebFlux and WebMvc transport providers

4.  [Prompt Engineering Patterns](https://docs.spring.io/spring-ai/reference/api/chat/prompt-engineering-patterns.html)

-   **Add Prompt Engineering Patterns documentation**
    -   New comprehensive documentation on advanced prompt engineering techniques
    -   Provides developers with best practices for effective prompt design
    -   Includes examples and patterns for various use cases

6.  Vector Store Enhancements

-   **Cosmos DB Entra ID support and fixes**
    -   Added Azure Entra ID (formerly Azure AD) authentication for Cosmos DB
    -   Improves security and authentication options for Azure deployments
-   **Cassandra Vector Store improvements**
    -   Fixed message order in Cassandra chat memory
    -   Added better error messages and fixed various issues

## [](#deprecations)Deprecations

The important deprecations to take note of are:

1.  **[Chat Client Enhancements](https://docs.spring.io/spring-ai/reference/upgrade-notes.html#chat-client)**:
    
    -   The `ChatClient` has been updated to ensure user and system prompts are always rendered before advisor execution. This change replaces the `AdvisedRequest` and `AdvisedResponse` APIs with `ChatClientRequest` and `ChatClientResponse`.
2.  **[Prompt Templating and Advisors](https://docs.spring.io/spring-ai/reference/upgrade-notes.html#prompt-templating-and-advisors)**:
    
    -   Classes and methods related to prompt creation and advisor customization are deprecated in favor of the builder pattern and the `TemplateRenderer` interface.
3.  **[QuestionAnswerAdvisor Deprecations](https://docs.spring.io/spring-ai/reference/upgrade-notes.html#questionansweradvisor-deprecations)**:
    
    -   Deprecated constructors and builder methods that relied on a simple `userTextAdvise` string.
4.  **[Chat Memory Configuration](https://docs.spring.io/spring-ai/reference/upgrade-notes.html#chat-memory)**:
    
    -   The `spring.ai.chat.memory.jdbc.initialize-schema` property is deprecated in favor of `spring.ai.chat.memory.repository.jdbc.initialize-schema`.
5.  **[Document Processing](https://docs.spring.io/spring-ai/reference/upgrade-notes.html#document-processing)**:
    
    -   The `DocumentPostProcessor` API replaces deprecated APIs like `DocumentCompressor`, `DocumentRanker`, and `DocumentSelector`.
6.  **Chat Memory Deprecations**:
    
    -   `@Deprecated List<Message> get(String conversationId, int lastN);` is deprecated in `ChatMemory`.

## [](#contributors)Contributors

There were other refactoring, bug fixing, documentation enhancements across the board by a wide range of contributors. If we haven't gotten to your PR yet, we will, please be patient. Thanks to

-   [Alexandros Pappas (apappascs)](https://github.com/apappascs)
-   [Berjan Jonker (berjanjonker)](https://github.com/berjanjonker)
-   [Changho Kim (ohiomanbo)](https://github.com/ohiomanbo)
-   [claudio-code (Claudio-code)](https://github.com/Claudio-code)
-   [David Frizelle (dafriz)](https://github.com/dafriz)
-   [ddobrin (ddobrin)](https://github.com/ddobrin)
-   [Eddú Meléndez (eddumelendez)](https://github.com/eddumelendez)
-   [Gareth Evans (garethjevans)](https://github.com/garethjevans)
-   [He-Pin (He-Pin)](https://github.com/He-Pin)
-   [Ivan97 (Ivan97)](https://github.com/Ivan97)
-   [James Ward (jamesward)](https://github.com/jamesward)
-   [Jee14 (jee14)](https://github.com/jee14)
-   [Jito Kim (jitokim)](https://github.com/jitokim)
-   [Jobmission (jobmission)](https://github.com/jobmission)
-   [Jackie Gleason (jrgleason)](https://github.com/jrgleason)
-   [Kimsunghyun1995 (kimsunghyun1995)](https://github.com/kimsunghyun1995)
-   [Kushagra Thapar (kushagraThapar)](https://github.com/kushagraThapar)
-   [Linar Abzaltdinov (linarkou)](https://github.com/linarkou)
-   [LiujunjieALiling (smartliujunjie)](https://github.com/smartliujunjie)
-   [Łukasz Jernaś (deejay1)](https://github.com/deejay1)
-   [Miloš Havránek (MilosHavranek)](https://github.com/MilosHavranek)
-   [Nicolas Krier (nicolaskrier)](https://github.com/nicolaskrier)
-   [Ngoc Nhan Tran (ngocnhan-tran1996)](https://github.com/ngocnhan-tran1996)
-   [Paoxia (paoxia)](https://github.com/paoxia)
-   [Ricken Bazolo (ricken07)](https://github.com/ricken07)
-   [Robin Elysia (RobinElysia)](https://github.com/RobinElysia)
-   [Seunghyeon Ji (jee14)](https://github.com/jee14)
-   [Shishuiwuhen2009 (shishuiwuhen2009)](https://github.com/shishuiwuhen2009)
-   [StudiousXiaoYu (StudiousXiaoYu)](https://github.com/StudiousXiaoYu)
-   [Sun Yuhan (sunyuhan1998)](https://github.com/sunyuhan1998)
-   [TeslaCN (TeslaCN)](https://github.com/TeslaCN)
-   [Theo van Kraay (TheovanKraay)](https://github.com/TheovanKraay)
-   [Thomas Vitale (ThomasVitale)](https://github.com/ThomasVitale)
-   [Wenhao Ma (yangtuooc)](https://github.com/yangtuooc)
-   [YunKui Lu (YunKuiLu)](https://github.com/YunKuiLu)