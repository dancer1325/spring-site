---
title: Using Spring AI 1.0.0 M7 Released
source: https://spring.io/blog/2025/04/10/spring-ai-1-0-0-m7-released
scraped: 2026-02-23T07:47:04.344Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  April 10, 2025 | 1 Comment
---

# Using Spring AI 1.0.0 M7 Released

_Releases | Mark Pollack |  April 10, 2025 | 1 Comment_

We are excited to announce the release of Spring AI 1.0.0 Milestone 7. This will be the last milestone release. Next month will be the RC1 release followed quickly by a GA release in time for the Spring IO conference in Barcelona.

To celebrate this release, we have added a new song to our [AI-generated music playlist](https://suno.com/playlist/321b61a4-201d-4404-9335-bf909250b0e3) featuring lyrics by Josh Long and Claude! Check out the [latest track](https://suno.com/song/4bb83777-94e1-4599-87a9-f82dfad9ae39?sh=EKOSdjJKcfhCBApi) to enhance your blog reading and coding experience.

Here are the key changes in this release. Note, there are breaking changes!

## [](#breaking-changes)Breaking Changes

Spring AI 1.0.0-M7 introduces several important changes that align with the structural improvements previously introduced in the SNAPSHOT versions. These changes create a more modular and maintainable codebase while reducing unnecessary dependencies in your applications.

## [](#artifact-id-changes)Artifact ID Changes

The most significant change is the naming pattern for Spring AI starter artifacts:

-   Model starters: `spring-ai-{model}-spring-boot-starter` → `spring-ai-starter-model-{model}`
-   Vector Store starters: `spring-ai-{store}-store-spring-boot-starter` → `spring-ai-starter-vector-store-{store}`
-   MCP starters: `spring-ai-mcp-{type}-spring-boot-starter` → `spring-ai-starter-mcp-{type}`

## [](#package-changes)Package Changes

Some classes have moved to new packages to better reflect their domain responsibilities:

-   `KeywordMetadataEnricher` and `SummaryMetadataEnricher` moved from `org.springframework.ai.transformer` to `org.springframework.ai.chat.transformer`
-   `Content`, `MediaContent`, and `Media` moved from `org.springframework.ai.model` to `org.springframework.ai.content`

Your IDE should easily be able to handle these refactorings.

## [](#new-module-structure)New Module Structure

As detailed in the Core Architecture Improvements section above, the project has been restructured from a monolithic core into specialized domain modules.

This modular approach allows you to include only the functionality you need, resulting in smaller deployments and clearer boundaries between components.

Importantly, **this change should not be a breaking change if you use the Spring AI starters** since they now import the new modular dependencies automatically. Only applications that directly referenced the previous monolithic artifacts will need to update their dependencies.

## [](#toolcontext-changes)ToolContext Changes

The `ToolContext` class has been enhanced to support both explicit and implicit tool resolution, with tools only included in model calls when explicitly requested.

## [](#additional-resources)Additional Resources

For more details on these changes, refer to:

-   [Spring AI Update to Snapshots](https://spring.io/blog/2025/03/25/spring-ai-update-to-snapshots) - Initial announcement of structural changes
-   [Spring AI Using Snapshots Part 2](https://spring.io/blog/2025/04/04/spring-ai-using-snapshots-part-2) - Detailed explanation of module restructuring
-   [Upgrade Notes](https://docs.spring.io/spring-ai/reference/upgrade-notes.html#upgrading-to-1-0-0-m7) in the reference guide

There are two ways to update your projects to Spring AI 1.0.0-M7:

1.  Use the [Claude Code CLI tool](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview) tool with this [prompt](https://github.com/spring-projects/spring-ai/blob/main/src/prompts/update-to-m7.txt). You can use other AI assistant tools as well, but we have only tested using Claude Code. Note that this automated approach handles artifact ID changes, package relocations, and module structure changes, but does not yet include automatic changes for upgrading to MCP 0.9.0.
    
2.  Refer to the [Upgrade Notes](https://docs.spring.io/spring-ai/reference/upgrade-notes.html#upgrading-to-1-0-0-m7) for detailed instructions, including guidance on manually updating MCP-related code.
    

## [](#core-architecture-improvements)Core Architecture Improvements

1.  **Comprehensive Modular Architecture**
    
    -   Completely restructured the project from a monolithic core into specialized domain modules, providing:
        -   **Reduced Dependency Footprint**: Applications only need to include the modules they actually use
        -   **Minimized Transitive Dependencies**: Fewer conflicts with third-party libraries
        -   **Cleaner Separation of Concerns**: Each module has a well-defined responsibility
    
    ![Spring AI Dependencies](https://static.spring.io/blog/tzolov/20250410/spring-ai-module-dependencies.png)
    
    -   `spring-ai-commons`: Foundation module with no dependencies on other Spring AI modules
        -   Core domain models (`Document`, `TextSplitter`, etc.)
        -   JSON utilities and resource handling
        -   Structured logging and observability support
    -   `spring-ai-model`: Builds on commons to provide AI capability abstractions
        -   Interfaces like `ChatModel`, `EmbeddingModel`, and `ImageModel`
        -   Message types and prompt templates
        -   Function-calling framework (`ToolDefinition`, `ToolCallback`)
        -   Content filtering and observation support
    -   `spring-ai-vector-store`: Unified vector database abstraction
        -   `VectorStore` interface for similarity search
        -   Advanced filtering with SQL-like expressions
        -   `SimpleVectorStore` for in-memory usage
        -   Batching support for embeddings
    -   `spring-ai-client-chat`: High-level conversational AI APIs
        -   `ChatClient` interface
        -   Conversation persistence via `ChatMemory`
        -   Response conversion with `OutputConverter`
        -   Advisor-based interception
        -   Synchronous and reactive streaming support
    -   `spring-ai-advisors-vector-store`: Bridges chat with vector stores for RAG
        -   `QuestionAnswerAdvisor`: injects context into prompts
        -   `VectorStoreChatMemoryAdvisor`: stores/retrieves conversation history
    -   `spring-ai-model-chat-memory-*`: Specialized persistence implementations
        -   Cassandra, Neo4j, and JDBC implementations
    -   `spring-ai-rag`: Comprehensive framework for Retrieval Augmented Generation
        -   Modular architecture for RAG pipelines
        -   `RetrievalAugmentationAdvisor` as main entry point
        -   Functional programming principles with composable components
2.  **Modular Autoconfiguration**
    
    -   Replaced the single monolithic autoconfiguration artifact with individual autoconfiguration artifacts per component:
        -   Model autoconfiguration: `spring-ai-autoconfigure-model-{model}`
        -   Vector Store autoconfiguration: `spring-ai-autoconfigure-vector-store-{store}`
        -   MCP autoconfiguration: `spring-ai-autoconfigure-mcp-{type}`
    -   This change minimizes dependency conflicts with libraries like Google Protocol Buffers and gRPC
    -   Applications now only include the autoconfiguration for components they actually use
    -   These autoconfiguration artifacts are included transitively when using the corresponding starter dependencies
3.  **Package Reorganization**
    
    -   Strategic relocation of classes to better reflect their domain responsibilities:
        -   `KeywordMetadataEnricher` and `SummaryMetadataEnricher` moved from `org.springframework.ai.transformer` to `org.springframework.ai.chat.transformer`
        -   `Content`, `MediaContent`, and `Media` moved from `org.springframework.ai.model` to `org.springframework.ai.content`
    -   Improved package naming conventions for better discoverability and organization
4.  **Framework Enhancements**
    
    -   Added AOP proxy support to MethodToolCallbackProvider for more flexible integration
    -   Enhanced runtime hints configuration for JSON serialization to improve native image support
    -   Improved Spring Boot integration with standardized configurations
    -   Enhanced observability and metrics collection across all modules

## [](#upgrade-to-mcp-090)Upgrade to MCP 0.9.0

Spring AI 1.0.0-M7 integrates the latest MCP reference implementation Java SDK version 0.9.0, bringing significant architectural improvements:

-   **Session-Based Architecture**: Improved handling of multiple concurrent client connections with better isolation between sessions
-   **Exchange-Based Interactions**: New exchange objects provide context-aware interactions between clients and servers
-   **Enhanced Transport Provider Abstraction**: Cleaner separation between connection management and communication handling
-   **Improved Tool Management**: Better tool name handling and de-duplication to avoid conflicts in complex scenarios
-   **Simplified Server Configuration**: Streamlined API for configuring and managing MCP servers
-   **Comprehensive WebFlux and WebMvc Support**: Enhanced transport providers for both reactive and servlet-based applications

These improvements result in a more robust, scalable MCP implementation that better aligns with the MCP specification. For detailed migration guidance, refer to the [Upgrade Notes](https://docs.spring.io/spring-ai/reference/upgrade-notes.html#upgrading-to-1-0-0-m7) section on MCP Java SDK changes.

All examples in the [Spring AI Examples repository](https://github.com/spring-projects/spring-ai-examples/tree/main/model-context-protocol) have been updated to work with the latest MCP implementation.

## [](#new-and-enhanced-model-integrations)New and Enhanced Model Integrations

1.  **Anthropic Claude Updates**
    
    -   Added support for Claude 3.7 Sonnet model and made it the default
    -   Enhanced with "thinking" capability (THINKING and REDACTED\_THINKING blocks)
    -   Renamed function-related APIs to tool-related APIs for consistency
    -   Added support for custom HTTP headers in Anthropic API requests
    -   Improved options with equals, hashCode, and deep copy support
2.  **Mistral AI Enhancements**
    
    -   Added moderation model support for detecting potentially harmful content
    -   Implemented custom structured output with JSON schema capabilities
    -   Enhanced safety features and content filtering
3.  **Ollama Improvements**
    
    -   Added min\_p parameter for improved sampling control
    -   Added support for qwq model
    -   Added support for LLAMA3\_2\_3B model
4.  **Azure OpenAI Updates**
    
    -   Enhanced AzureOpenAiChatOptions
    -   Fixed auto-configuration opt-in behavior
    -   Improved integration with Azure services
5.  **OpenAI Enhancements**
    
    -   Changed voice parameter to string in OpenAI Audio Speech API
    -   Added missing audio formats for OpenAI Audio API
    -   Enhanced OpenAiChatOptions with equals, hashCode, and deep copy features

## [](#docker-model-runner-support)Docker Model Runner Support

Spring AI 1.0.0-M7 adds support for Docker Desktop 4.40's Model Runner, providing a seamless integration with locally running AI models:

-   **OpenAI-Compatible API**: Docker Model Runner provides a local Inference API designed to be compatible with the OpenAI API, enabling easy integration with Spring AI
-   **Standard OCI Artifacts**: Models are distributed as standard OCI artifacts on Docker Hub under the [ai namespace](https://hub.docker.com/u/ai)
-   **Multiple Configuration Options**:
    -   Direct TCP connection to the Model Runner
    -   Integration via Testcontainers for development and testing
-   **Simple Configuration**: Just configure the OpenAI client with a custom base URL:
    
    ```properties
    Copyspring.ai.openai.api-key=ignored
    spring.ai.openai.base-url=http://localhost:12434/engines
    spring.ai.openai.chat.options.model=ai/gemma3
    ```
    
-   **Full Feature Support**: All Spring AI features including function calling, streaming, and more work with Docker Model Runner
-   **Local Model Execution**: Run models locally on Apple Silicon without sending data to external services

For detailed information, check out the [Spring AI Docker Model Runner documentation](https://docs.spring.io/spring-ai/reference/api/chat/dmr-chat.html) and our accompanying blog post [Spring AI with Docker Model Runner](https://spring.io/blog/2025/04/10/spring-ai-docker-model-runner) that dives deeper into this integration.

Special thanks to [Eddú Meléndez](https://github.com/eddumelendez) for his significant contributions to this feature.

## [](#tool-and-multimodal-capabilities)Tool and Multimodal Capabilities

1.  **Tool Execution Framework**
    
    -   Introduced ToolExecutionEligibilityPredicate interface
    -   Improved tool de-duplication by name in MCP server
    -   Enhanced error handling in MCP tool callbacks
    -   Standardized MCP tool name formatting
2.  **Multimodality Support**
    
    -   Support for base64-encoded images in tool call results
    -   Handling of base64-encoded images in JSON responses
    -   Enhanced image conversion capabilities
    -   Support for custom MIME types in tool responses
3.  **Document Processing**
    
    -   Added JSoup HTML document reader for web content parsing
    -   Enhanced document formatting capabilities
    -   Added documentFormatter parameter to ContextualQueryAugmenter

## [](#memory-and-storage)Memory and Storage

1.  **Chat Memory Implementations**
    
    -   Added JDBC implementation of ChatMemory
    -   Migrated Cassandra chat memory implementation to its own module
    -   Added Neo4j chat memory implementation
2.  **Vector Store Enhancements**
    
    -   Added Couchbase vector store support
    -   Removed assertions on partition key path in CosmosDBVectorStore
    -   Enhanced Milvus vector store with native expressions
    -   Added configuration options for database collections in Milvus
    -   Conditional enablement of individual vector store implementations
    -   Enhanced PgVectorStore with PgIdType based schema generation

## [](#query-processing)Query Processing

1.  **Retrieval Augmentation**
    -   Added Context Support to Query in RetrievalAugmentationAdvisor
    -   Removed default temperature on all QueryTransformer implementations
    -   Enhanced context handling for improved relevance

## [](#developer-experience)Developer Experience

1.  **Spring Boot Integration**
    
    -   Updated supported Spring Boot versions
    -   Improved auto-configuration patterns
    -   Added boot configuration processor to MCP autoconfiguration
2.  **AOT and Native Image Support**
    
    -   Improved ahead-of-time compilation support
    -   Enhanced runtime hints for native image compatibility
    -   Comprehensive scan for JsonInclude annotations
3.  **Documentation**
    
    -   Added upgrade notes for migrating to M7
    -   Improved module documentation with architectural diagrams
    -   Enhanced API documentation for new features

## [](#contributors)Contributors

There were other refactoring, bug fixing, documentation enhancements across the board by a wide range of contributors. If we haven't gotten to your PR yet, we will, please be patient. Thanks to

-   [Ahoo Wang (Ahoo-Wang)](https://github.com/Ahoo-Wang)
-   [Alexandre Roman (alexandreroman)](https://github.com/alexandreroman)
-   [Alexandros Pappas (apappascs)](https://github.com/apappascs)
-   [Beksultan (bmamatkadyr)](https://github.com/bmamatkadyr)
-   [birariro (birariro)](https://github.com/birariro)
-   [cc0824 (cc0824)](https://github.com/cc0824)
-   [CChuYong (CChuYong)](https://github.com/CChuYong)
-   [Christian Tzolov (tzolov)](https://github.com/tzolov)
-   [Dariusz Jędrzejczyk (chemicL)](https://github.com/chemicL)
-   [Eddú Meléndez (eddumelendez)](https://github.com/eddumelendez)
-   [Emmanuel Ferdman (emmanuel-ferdman)](https://github.com/emmanuel-ferdman)
-   [Enrico Rampazzo (enrico.rampazzo)](https://github.com/enrico.rampazzo)
-   [gabriel duncan (gabrielduncan)](https://github.com/gabrielduncan)
-   [Gareth Evans (garethjevans)](https://github.com/garethjevans)
-   [ghdcksgml1 (ghdcksgml1)](https://github.com/ghdcksgml1)
-   [gongzhongqiang (GOODBOY008)](https://github.com/GOODBOY008)
-   [Hu Shihao (Hushihaoooooo)](https://github.com/Hushihaoooooo)
-   [hungrytech (hungrytech)](https://github.com/hungrytech)
-   [Ilayaperumal Gopinathan (ilayaperumalg)](https://github.com/ilayaperumalg)
-   [ivy (Fj-ivy)](https://github.com/Fj-ivy)
-   [Jaeyeon Kim (jaeyeonling)](https://github.com/jaeyeonling)
-   [jito (jitokim)](https://github.com/jitokim)
-   [Jonas Muribø (jonasmuriboe)](https://github.com/jonasmuriboe)
-   [jonghoon park (dev-jonghoonpark)](https://github.com/dev-jonghoonpark)
-   [jonghoonpark (dev-jonghoonpark)](https://github.com/dev-jonghoonpark)
-   [JongIn Won (JongInWon)](https://github.com/JongInWon)
-   [Josh Long (joshlong)](https://github.com/joshlong)
-   [Justin Martz (JustinMartz)](https://github.com/JustinMartz)
-   [Laurent Doguin (ldoguin)](https://github.com/ldoguin)
-   [leijendary (leijendary)](https://github.com/leijendary)
-   [MagicalConch (git102347501)](https://github.com/git102347501)
-   [magicgone (magicgone-cn)](https://github.com/magicgone-cn)
-   [Manuel Andreo Garcia (magware-dev)](https://github.com/magware-dev)
-   [Mark Pollack (markpollack)](https://github.com/markpollack)
-   [mawenhao (yangtuooc)](https://github.com/yangtuooc)
-   [P.Sri Varshan (PSriVarshan)](https://github.com/PSriVarshan)
-   [pavel (ppjgit)](https://github.com/ppjgit)
-   [Ricken Bazolo (ricken07)](https://github.com/ricken07)
-   [rmalara (rmalara)](https://github.com/rmalara)
-   [samuel-taleez (krsamuel)](https://github.com/krsamuel)
-   [shahbazaamir (shahbazaamir)](https://github.com/shahbazaamir)
-   [shown (yuluo-yx)](https://github.com/yuluo-yx)
-   [Soby Chacko (sobychacko)](https://github.com/sobychacko)
-   [Thomas Vitale (ThomasVitale)](https://github.com/ThomasVitale)
-   [Timo Salm (timosalm)](https://github.com/timosalm)
-   [Viacheslav Dobrynin (viacheslav-dobrynin)](https://github.com/viacheslav-dobrynin)
-   [vker (91wangmeng)](https://github.com/91wangmeng)
-   [waileong (waileong)](https://github.com/waileong)
-   [Wandile (wandile-gim)](https://github.com/wandile-gim)
-   [xuweidong (xuweidong253)](https://github.com/xuweidong253)
-   [Xwh (xwh1108)](https://github.com/xwh1108)
-   [yangtuooc (yangtuooc)](https://github.com/yangtuooc)
-   [Yanming Zhou (quaff)](https://github.com/quaff)
-   [yoobin\_mion (yybmion)](https://github.com/yybmion)
-   [Yufeng (Yufeng0918)](https://github.com/Yufeng0918)
-   [양예성 (yeseong0412)](https://github.com/yeseong0412)
-   [蕭洛 (799332391)](https://github.com/799332391)
-   [虎鸣 (He-Pin)](https://github.com/He-Pin)