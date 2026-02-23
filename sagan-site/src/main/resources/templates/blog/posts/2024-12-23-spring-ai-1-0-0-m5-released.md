---
title: Spring AI 1.0.0 M5 Release
source: https://spring.io/blog/2024/12/23/spring-ai-1-0-0-m5-released
scraped: 2026-02-23T07:56:46.532Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  December 23, 2024 | 0 Comments
---

# Spring AI 1.0.0 M5 Release

_Releases | Mark Pollack |  December 23, 2024 | 0 Comments_

We are happy to announce the 1.0.0 Milestone 5 release of Spring AI

As usual, this release has had several new features and bug fixes, however we have put a focus on reviewing the code base from a design perspective with the aim to go GA in early 2025. While we have tried to make this transition smooth, by deprecating methods and classes for one release cycle, there are some breaking changes we know about and perhaps some that we don’t, so please bear with us. See the section on Breaking Changes below.

## [](#new-features)New Features

### [](#model-context-protocol-mcp-support---incubating)Model Context Protocol (MCP) Support - Incubating

MCP is a game-changer for building interactive applications with AI tools and resources. It enables you to create applications that are both fast and flexible, leveraging AI to act on your local data as well as services hosted in the cloud.

While currently incubating outside of Spring AI, we're excited to announce the experimental release of [Spring AI MCP](https://github.com/spring-projects-experimental/spring-ai-mcp) version 0.20, a Java SDK for the [Model Context Protocol](https://modelcontextprotocol.io/introduction) (MCP). This project provides seamless integration between Java/Spring applications and MCP-compliant AI resources and tools.

For more details on the architecture and implementation, visit the [Model Context Protocol documentation](https://modelcontextprotocol.org/docs/concepts/architecture). Examples of using MCP with Spring can be found in our [spring-ai-examples repository](https://github.com/spring-projects/spring-ai-examples/tree/main/model-context-protocol).

### [](#major-model-enhancements)Major Model Enhancements

-   Added OpenAI audio capabilities via Voice-to-Text and Text-to-Speech (TTS) with gpt-4-audio-preview model support ([#1842](https://github.com/spring-projects/spring-ai/pull/1842)). [Check out the blog post featuring a Marvin the Paranoid Android chatbot](https://spring.io/blog/2024/12/05/spring-ai-audio-modality). The guide demonstrates building an interactive chatbot that supports both audio input and output, showing how to process MP3/WAV files and generate natural-sounding responses. Here's how to send audio input to the model:
    
    ```java
    Copy// Prepare the audio resource
    var audioResource = new ClassPathResource("speech1.mp3");
    
    // Create a user message with audio and send it to the chat model
    String response = chatClient.prompt()
            .user(u -> u.text("What is this recording about?")
                        .media(MimeTypeUtils.parseMimeType("audio/mp3"), audioResource))                    
            .options(OpenAiChatOptions.builder()
                .withModel(OpenAiApi.ChatModel.GPT_4_O_AUDIO_PREVIEW).build())
            .call()
            .content();
    ```
    
    And here's how to generate audio output from text:
    
    ```java
    Copy// Generate an audio response
    ChatResponse response = chatClient
        .prompt("Tell me a joke about the Spring Framework")
        .options(OpenAiChatOptions.builder()
            .withModel(OpenAiApi.ChatModel.GPT_4_O_AUDIO_PREVIEW)
            .withOutputModalities(List.of("text", "audio"))
            .withOutputAudio(new AudioParameters(Voice.ALLOY, AudioResponseFormat.WAV))
            .build())
        .call()
        .chatResponse();
    
    // Access the audio transcript
    String audioTranscript = response.getResult().getOutput().getContent();
    
    // Retrieve the generated audio
    byte[] generatedAudio = response.getResult().getOutput().getMedia().get(0).getDataAsByteArray();
    ```
    
-   Added support for Amazon Bedrock Nova models - a new generation of foundation models. [See our detailed guide with examples](https://spring.io/blog/2024/12/10/spring-ai-amazon-bedrock-nova):
    -   Nova Pro (amazon.nova-pro-v1:0): High-performance model supporting text, image, and video-to-text processing with 300K token context
    -   Nova Lite (amazon.nova-lite-v1:0): Balanced performance model supporting text, image, and video-to-text processing with 300K token context
    -   Nova Micro (amazon.nova-micro-v1:0): Cost-optimized text-only model with 128K token context Integration provides developers seamless access to build sophisticated conversational applications with minimal effort.
-   Added support for Amazon Bedrock Converse API with Claude 3 models, including tool/function calling, system messages, stream responses, and image input support ([#1650](https://github.com/spring-projects/spring-ai/pull/1650))
-   Added support for PDF and document content types in Anthropic ChatModel ([#1821](https://github.com/spring-projects/spring-ai/pull/1821))

### [](#new-model-support)New Model Support

-   Added Zhipuai Embedding-3 model with configurable dimensions ([#1880](https://github.com/spring-projects/spring-ai/pull/1880))
-   Added Ollama models: QWEN\_2\_5\_7B, LLAMA3\_2\_VISION\_11b, LLAMA3\_2\_VISION\_90b ([#1783](https://github.com/spring-projects/spring-ai/pull/1783))
-   Added Pixtral models to MistralAi: PIXTRAL and PIXTRAL\_LARGE ([#1783](https://github.com/spring-projects/spring-ai/pull/1783))
-   Added Claude 3.5 Sonnet V2 model to Bedrock ([#1586](https://github.com/spring-projects/spring-ai/pull/1586))

### [](#vector-stores)Vector Stores

-   Added support for MariaDB vector store ([#1830](https://github.com/spring-projects/spring-ai/pull/1830))
-   Added Oracle Coherence vector store implementation ([#1627](https://github.com/spring-projects/spring-ai/pull/1627))
-   Added Azure Cosmos DB vector store support ([#1580](https://github.com/spring-projects/spring-ai/pull/1580))
-   Improved Milvus vector store with custom field name support ([#1616](https://github.com/spring-projects/spring-ai/pull/1616))

### [](#rag-retrieval-augmented-generation)RAG (Retrieval Augmented Generation)

-   Introduced modular RAG architecture with new components:
    -   Query Analysis Module with QueryTransformer API ([#1703](https://github.com/spring-projects/spring-ai/pull/1703))
    -   Retrieval Module with DocumentRetriever interface ([#1604](https://github.com/spring-projects/spring-ai/pull/1604))
    -   Query Augmentor API for contextual data enhancement ([#1644](https://github.com/spring-projects/spring-ai/pull/1644))
    -   Enhanced RetrievalAugmentationAdvisor ([#1704](https://github.com/spring-projects/spring-ai/pull/1704))

For comprehensive information about the new RAG architecture and implementation details, check out our [updated documentation](https://docs.spring.io/spring-ai/reference/api/retrieval-augmented-generation.html). For hands-on experience, explore practical RAG implementations in these [example applications](https://github.com/ThomasVitale/llm-apps-java-spring-ai/tree/main/rag).

### [](#kotlin-support)Kotlin Support

-   Implement KotlinModule for JSON schema generation: Implemented com.github.victools.jsonschema.generator.Module for Kotlin. This adds support for generating JSON schemas from Kotlin classes by leveraging Kotlin reflection. The module handles nullability, default values, and required properties based on Kotlin's types ([#1766](https://github.com/spring-projects/spring-ai/pull/1766))
-   Added Kotlin support for `ChatClient` with typesafe responses ([#1729](https://github.com/spring-projects/spring-ai/pull/1729))

Check out our [Kotlin examples](https://github.com/spring-projects/spring-ai-examples/tree/main/kotlin) to see these features in action.

### [](#other-features)Other Features

-   Improved token usage calculation and tracking across multiple responses ([#1905](https://github.com/spring-projects/spring-ai/pull/1905))
-   Added support for Ollama JSON Structured Output ([#1937](https://github.com/spring-projects/spring-ai/pull/1937))
-   Enhanced multimodality support for Mistral AI ([#1930](https://github.com/spring-projects/spring-ai/pull/1930))

## [](#improvements)Improvements

### [](#code-quality--architecture)Code Quality & Architecture

-   Enhanced `ChatClient` APIs for null-safety and predictability ([#1651](https://github.com/spring-projects/spring-ai/pull/1651))
-   Improved inheritance hierarchy of `ChatOptions`/`FunctionCallingOptions` ([#1994](https://github.com/spring-projects/spring-ai/pull/1994))
-   Introduced `FunctionCallback.Builder` interface ([#1732](https://github.com/spring-projects/spring-ai/pull/1732))
-   Standardized builder class names across vector store implementations ([#1993](https://github.com/spring-projects/spring-ai/pull/1993))
-   Added support for `BiFunction` class type resolution ([#1588](https://github.com/spring-projects/spring-ai/pull/1588))

### [](#documentation--examples)Documentation & Examples

-   Updated vector database providers list ([#1639](https://github.com/spring-projects/spring-ai/pull/1639))
-   Improved OpenSearch documentation ([#1598](https://github.com/spring-projects/spring-ai/pull/1598))

### [](#testing--infrastructure)Testing & Infrastructure

-   Added integration tests for RAG modules ([#1703](https://github.com/spring-projects/spring-ai/pull/1703))
-   Improved Ollama test container management ([#1693](https://github.com/spring-projects/spring-ai/pull/1693))
-   Enhanced test coverage for both modules ([#1794](https://github.com/spring-projects/spring-ai/pull/1794))

## [](#bug-fixes)Bug Fixes

-   Fixed Azure OpenAI chat model function calling token usage ([#1916](https://github.com/spring-projects/spring-ai/pull/1916))
-   Fixed incorrect parameter type for KnnSearch in ElasticsearchVectorStore ([#1915](https://github.com/spring-projects/spring-ai/pull/1915))
-   Fixed Chroma query/delete operation ([#1779](https://github.com/spring-projects/spring-ai/pull/1779))
-   Fixed OpenSearch client indices mapping ([#1725](https://github.com/spring-projects/spring-ai/pull/1725))
-   Fixed incorrect @ConditionalOnClass condition in SpringAiRetryAutoConfiguration ([#1657](https://github.com/spring-projects/spring-ai/pull/1657))

## [](#deprecations--removals)Deprecations & Removals

-   Deprecated PaLM API support in favor of newer alternatives ([#1664](https://github.com/spring-projects/spring-ai/pull/1664))
-   Removed deprecated output parser in favor of converters ([#1596](https://github.com/spring-projects/spring-ai/pull/1596))
-   Removed unnecessary dependencies from core modules ([#1891](https://github.com/spring-projects/spring-ai/pull/1891))

## [](#breaking-changes)Breaking Changes

The most blatant breaking change is changing the package name for each vector store implementation. Unfortunately, they were all using the same package name but were in different independent artifacts which is a no-no.

So, `MilvusVectorStore` has moved from `org.springframework.ai.vectorstore` to `org.springframework.ai.vectorstore.milvus`

There has been an alignment in the use of the builder pattern across many classes, but focused on the vector stores and chat options.

```
CopyMilvusVectorStore vectorStore = MilvusVectorStore.builder(milvusServiceClient, embeddingModel)
  .initializeSchema(true)
  .build();
```

Other breaking changes include:

-   `Document` now supports only a single instance of text or media content. This makes the flow of the injection pipeline with embedding simpler ot reason about. Similarly, the previously deprecated embedding field of `Document` has been removed. ([#1883](https://github.com/spring-projects/spring-ai/pull/1883))
    
-   Changed `TokenCountBatchingStrategy` constructor parameters ([#1670](https://github.com/spring-projects/spring-ai/pull/1670))
    

## [](#contributors)Contributors

There were other refactoring, bug fixing, documentation enhancements across the board by a wide range of contributors. If we haven’t gotten to your PR yet, we will, please be patient. Thanks to

-   [Alexandros Pappas (apappascs)](https://github.com/apappascs)
-   [Bruno Oliveira (bruno-oliveira)](https://github.com/bruno-oliveira)
-   [chenwei (codetheory)](https://github.com/codetheory)
-   [Christian Tzolov (tzolov)](https://github.com/tzolov)
-   [dafriz (dafriz)](https://github.com/dafriz)
-   [Dennys Fredericci (dennysfredericci)](https://github.com/dennysfredericci)
-   [devcrocod (devcrocod)](https://github.com/devcrocod)
-   [diego (rusher)](https://github.com/rusher)
-   [Eddú Meléndez (eddumelendez)](https://github.com/eddumelendez)
-   [Gareth Evans (garethjevans)](https://github.com/garethjevans)
-   [GR (mxsl-gr)](https://github.com/mxsl-gr)
-   [Ilayaperumal Gopinathan (ilayaperumalg)](https://github.com/ilayaperumalg)
-   [Jemin Huh (JM-Lab)](https://github.com/JM-Lab)
-   [jitokim (jitokim)](https://github.com/jitokim)
-   [shown (yuluo-yx)](https://github.com/yuluo-yx)
-   [Soby Chacko (sobychacko)](https://github.com/sobychacko)
-   [Sylvain Blanc (LaSylv)](https://github.com/LaSylv)
-   [Thomas Vitale (ThomasVitale)](https://github.com/ThomasVitale)
-   [Tyler Russell (terussell85)](https://github.com/terussell85)
-   [Virle (geyingauv)](https://github.com/geyingauv)
-   [WonJun Lee (Lee-WonJun)](https://github.com/Lee-WonJun)
-   [wstever (wstever)](https://github.com/wstever)

# [](#roadamp)Roadamp

We did not get to all the design refactoring we wanted in the M5 release, so are going to create one last M6 release in early January2025 to address those issues, followed by a 1.0.0 RC1 and a 1.0.0 GA release as soon as possiblle.

Design areas of focus are

-   Breaking up the project structure into finer grained artifacts, for example moving VectorStore into its own artifact.
-   VectorStore API: The current API should accomodate delete and update operations as well as be able to access the underlying vector store client API, should there be one available. Also, better parameterization of search, similarity search can have several options and that should be selectable at runtime, not configuration time.

-   Chat Memory: The current impelementation do not integrate with Spring's Caching abstraction and retrieval should be based on a strategy such as the amount of tokens, not number of messages.

# [](#welcoming-2025)Welcoming 2025

This has been an amazing year for Spring AI. We are grateful to our community for their support and contributions. Looking forward to an even more exciting year in 2025!