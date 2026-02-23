---
title: Spring AI 1.0.0 M4 Release
source: https://spring.io/blog/2024/11/20/spring-ai-1-0-0-m4-released
scraped: 2026-02-23T08:03:58.249Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  November 20, 2024 | 1 Comment
---

# Spring AI 1.0.0 M4 Release

_Releases | Mark Pollack |  November 20, 2024 | 1 Comment_

We are happy to announce the 1.0.0 Milestone 4 release of Spring AI.

This release has squashed most of the reported bugs and brings significant enhancements across various areas.

## [](#amazon-bedrock-converse)Amazon Bedrock Converse

Spring AI now supports the [Amazon Bedrock Converse API](https://docs.spring.io/spring-ai/reference/api/chat/bedrock-converse.html), which provides a unified interface for the AI chat models that Amazon offers. Unlike the older Bedrock Invoke API, Converse introduces exciting new features such as **Tool Calling** and **Multimodality/Visual capabilities** (for models that support these features). This makes it a more powerful and versatile option for working with Amazon’s chat models.

In many ways, the Converse API serves a role similar to Spring AI itself, offering portability across model APIs but limited to Amazon's chat models. We recommend transitioning to the Converse module for chat models. Note that embedding models remain unaffected.

For details on this new capability, refer to the Spring AI Bedrock Converse documentation. You can also follow [upcoming improvements](https://github.com/spring-projects/spring-ai/issues/1758) for future enhancements. Many thanks to [Max Jiang](https://github.com/maxjiang153) for starting this large undertaking.

## [](#function-calling-improvements)Function Calling improvements

### [](#function-types-and-methods)Function Types and Methods

Recent improvements expand support for various Function types and methods through the `FunctionCallback` Builder class. This allows invocation of `java.util.Function`, `Supplier`, and `Consumer` interfaces.

#### [](#basic-function-callback)Basic Function Callback

```
CopyFunctionCallback callback = FunctionCallback.builder()
    .description("Process a new order")
    .function("processOrder", (Order order) -> processOrderLogic(order))
    .inputType(Order.class)
    .build();
```

#### [](#using-toolcontext-using-toolcontext)Using ToolContext {#using-toolcontext}

Access additional state or context using `ToolContext` with `BiFunction<I, ToolContext, O>`

```
Copy@Bean
@Description("Get the weather in location")
public BiFunction<WeatherService.Request, ToolContext, WeatherService.Response> weatherFunctionWithContext() {
    return (request, context) -> new MockWeatherService().apply(request);
}
```

#### [](#method-invocation)Method Invocation

Method invocation support provides the foundation for the upcoming `@ToolMapping` annotation in M5:

```
Copypublic static class LightControl {
    private static final Logger logger = LoggerFactory.getLogger(LightControl.class);
    private final Map<String, Object> arguments = new HashMap<>();

    public void controlLight(String roomName, boolean on) {
        arguments.put("roomName", roomName);
        arguments.put("on", on);
        logger.info("Setting light in room '{}' to: {}", roomName, on ? "ON" : "OFF");
    }
}
```

Usage:

```
CopyLightControl lightControl = new LightControl();

String response = ChatClient.create(this.chatModel)
    .prompt("Turn light on in the living room.")
    .functions(
        FunctionCallback.builder()
            .description("Controls lights by room name, allowing them to be turned on or off.")
            .method("controlLight", String.class, boolean.class)
            .targetObject(lightControl)
            .build()
    )
    .call()
    .content();

```

For additional features, consult the [FunctionCallback documentation](https://docs.spring.io/spring-ai/reference/api/function-callback.html) which covers:

-   Schema type configuration (JSON Schema and OpenAPI Schema support)
-   Custom response handling and object mapping
-   Support for generic input types using `ParameterizedTypeReference`
-   Automatic schema generation from Java types, including Jackson annotation support
-   Guidelines for writing effective function descriptions and error handling

## [](#kotlin-support)Kotlin Support

Spring AI introduces support for Kotlin, making it even easier for Kotlin developers to integrate AI capabilities into their applications. This release introduces idiomatic Kotlin extensions and type-safe APIs. Many thanks to Sebastien Deleuze for taking on this work.

#### [](#type-safe-response-handling)Type-Safe Response Handling

The new Kotlin extensions enable more concise and type-safe ways to handle AI responses. Instead of using Java-style type declarations, you can now use Kotlin's reified generics:

```
Copyimport org.springframework.ai.chat.client.entity

data class Joke(val setup: String, val punchline: String)

@SpringBootApplication
class KotlinHelloWorldApplication {

   @Bean
   fun jokeRunner(chatModel: ChatModel) = CommandLineRunner {
      val response = ChatClient.create(chatModel).prompt().user("Tell me a joke").call().entity<Joke>()

      println("\nJoke:")
      println("Setup: ${response.setup}")
      println("Punchline: ${response.punchline}")
   }
}

fun main(args: Array<String>) {
   runApplication<KotlinHelloWorldApplication>(*args)
}

```

#### [](#function-registration)Function Registration

Kotlin functions can now be directly registered as AI tools. The syntax is straightforward:

```
Copy@Configuration
class Config {

   @Bean
   fun weatherFunctionInfo(currentWeather: (WeatherRequest) -> WeatherResponse): FunctionCallback {
      return FunctionCallback.builder()
         .description(
            "Find the weather conditions, forecasts, and temperatures for a location, like a city or state."
         )
         .function("WeatherInfo", currentWeather)
         .inputType(WeatherRequest::class.java)
         .build()
   }

   @Bean
   @Description("Get current weather")
   fun currentWeather(): (WeatherRequest) -> WeatherResponse = { request ->
      MockKotlinWeatherService().invoke(request)
   }
}
```

Then, it can be used as below.

```
Copy@Bean
open fun init(chatModel: ChatModel) = CommandLineRunner {

   try {
      val userMessage = UserMessage(
         "What are the weather conditions in San Francisco, Tokyo, and Paris? Find the temperature in Celsius for each of the three locations."
      )

      val response = chatModel.call(
         Prompt(
            listOf(userMessage),
            OpenAiChatOptions.builder().withFunction("WeatherInfo").build()
         )
      )

      println("Response: $response")
   } 
   catch (e: Exception) {
      println("Error during weather check: ${e.message}")
   }
}
```

The reference documentation has been updated to include Kotlin examples, and you can find other examples in the [spring-ai-examples](https://github.com/spring-projects/spring-ai-examples) repository.

## [](#additional-project-resources)Additional Project Resources

The repository [awesome-spring-ai](https://github.com/danvega/awesome-spring-ai) keeps the theme of other “awseome” repositories and collects community related resources for Spring AI such as book, presentation, example code and so on. Please make PRs to the repository for any useful material you a have found.

The repository [spring-ai-integration-tests](http://spring-ai-integration-tests) is now available and is making progress to run all the integration tests for the entire project twice daily.

The repository [spring-ai-examples](https://github.com/spring-projects/spring-ai-examples) is now available for hosting “official” examples. Check out the reflection agent example!

Also, as an introduction to the project, check out the blog post [Why Spring AI](https://spring.io/blog/2024/11/19/why-spring-ai)

## [](#advanced-and-modular-rag)Advanced and Modular RAG

Spring AI introduces experimental support for advanced Retrieval Augmented Generation (RAG) based on recent research in modular RAG system design, in particular the papers [Modular RAG: Transforming RAG Systems into LEGO-like Reconfigurable Frameworks](https://export.arxiv.org/abs/2407.21059) and [Retrieval-Augmented Generation for Large Language Models: A Survey](https://arxiv.org/abs/2312.10997). A big thanks to Thomas Vittale for leading this effort.

Here are the key building blocks:

Pre-retrieval Components

-   `QueryTransformer`: Transforms queries to improve retrieval effectiveness (e.g., translation, rewrites)
-   `QueryExpander`: Expands single queries into multiple variations for broader context capture

Orchestration Components

-   `QueryRouter`: Routes queries to appropriate retrievers based on metadata or semantic analysis

Retrieval Components

-   `DocumentRetriever`: Core interface for retrieving relevant documents
-   `DocumentJoiner`: Combines results from multiple retrievers/queries

Post-retrieval Components

-   `DocumentCompressor`: Reduces document content while preserving key information
-   `DocumentRanker`: Reorders documents by relevance
-   `DocumentSelector`: Filters retrieved documents based on criteria

Augmentation Components

-   `QueryAugmenter`: Enhances queries with retrieved context
-   `ContextualQueryAugmenter`: Default implementation focused on document context integration

Building on our modular RAG components, the `RetrievalAugmentationAdvisor` provides an implementation to get you started and provides a linear RAG flow:

1.  Query Creation: Creates Query from user text using PromptTemplate
2.  Query Transformation: Applies QueryTransformers chain
3.  Query Expansion: Creates multiple queries via QueryExpander
4.  Document Retrieval: Routes and executes parallel retrievals
5.  Document Integration: Joins results from all sources
6.  Context Augmentation: Enhances query with retrieved context

You stitch together these collaborating building block components in a bean definition such as

```
Copy@Bean
public RetrievalAugmentationAdvisor customRagAdvisor(VectorStore vectorStore) {
    return RetrievalAugmentationAdvisor.builder()
        .queryTransformers(List.of(new TranslationQueryTransformer(...)))
        .queryExpander(new MultiQueryExpander(...))
        .queryRouter(
            AllRetrieversQueryRouter.builder()
                .documentRetrievers(new VectorStoreDocumentRetriever(...))
                .build()
        )
        .documentJoiner(new ConcatenationDocumentJoiner())
        .queryAugmenter(new ContextualQueryAugmenter(...))
        .build();
}

```

While RetrievalAugmentationAdvisor implements a linear flow, users can implement custom `Advisor`s for advanced patterns like conditional, branching, recursive, and adaptive flows. More documentation is to come and we encourage you to send feedback on our github issue tracker.

## [](#other-improvements)Other improvements

There were a few locations where Spring Boot being used in the model modules. This is no longer the case. The only dependencies on Spring Boot are not isolated to the autoconfigure module.

Azure OpenAI SDK upgraded to version 12 beta.

### [](#documentation)Documentation

-   Added a comprehensive Chat Model comparison page
-   Restructured documentation navigation for better accessibility
-   Updated diagrams for chat model architecture
-   Added guide for programmatic configuration of Vertex embeddings with service accounts
-   Enhanced integration guides:
-   Ollama updates:
    -   New auto-pull functionality
    -   Llama32-Vision support
-   Spring AI features:
    -   Out-of-the-box support for Llama32-Vision
    -   Portable multimodality API
-   Vector database configuration:
    -   Milvus
    -   Chroma
    -   OpenSearch

Expanded configuration and setup documentation, focusing on:

-   Property overrides
-   Code examples
-   Integration patterns across different model types

### [](#vector-store--embedding-improvements)Vector Store & Embedding Improvements

-   Added new vector store implementations for Oracle Coherence and Azure Cosmos
-   Enhanced existing vector stores:
    -   Azure: Provided ability to match pre-existing field names and use of keyless authentication
    -   Milvus: Added support for non-default databases
    -   Chroma: Introduced builder pattern for better initialization
    -   OpenSearch: Improved configuration structure
-   Introduced builder pattern for TokenTextSplitter

## [](#contributors)Contributors

There were other refactoring, bug fixing, documentation enhancements across the board by a wide range of contributors. If we haven’t gotten to your PR yet, we will, please be patient. Thanks to

-   [Aleks Seovic (aseovic)](https://github.com/aseovic)
-   [Alexandros Pappas (apappascs)](https://github.com/apappascs)
-   [Anders Swanson (anders-swanson)](https://github.com/anders-swanson)
-   [Benoit Moussaud (bmoussaud)](https://github.com/bmoussaud)
-   [Christian Tzolov (tzolov)](https://github.com/tzolov)
-   [Craig Walls (habuma)](https://github.com/habuma)
-   [Eddú Meléndez (eddumelendez)](https://github.com/eddumelendez)
-   [Emmanuel Ferdman (emmanuel-ferdman)](https://github.com/emmanuel-ferdman)
-   [Gareth Evans (garethjevans)](https://github.com/garethjevans)
-   [He Qiang (1993heqiang)](https://github.com/1993heqiang)
-   [Ilayaperumal Gopinathan (ilayaperumalg)](https://github.com/ilayaperumalg)
-   [Jemin Huh (JM-Lab)](https://github.com/JM-Lab)
-   [Jiseung Hyeon (jee14)](https://github.com/jee14)
-   [Jito Kim (jitokim)](https://github.com/jitokim)
-   [John Blum (jxblum)](https://github.com/jxblum)
-   [John Silverman (jsilverman26)](https://github.com/jsilverman26)
-   [Josh Long (joshlong)](https://github.com/joshlong)
-   [Liu Guodong (liugddx)](https://github.com/liugddx)
-   [Lukas (Waischbrot)](https://github.com/Waischbrot)
-   [Max Jiang (maxjiang153)](https://github.com/maxjiang153)
-   [Michael J. Simons (michael-simons)](https://github.com/michael-simons)
-   [Nermin Karapandzic (NerminKarapandzic)](https://github.com/NerminKarapandzic)
-   [Nikolai Kulagin (zzzadruga)](https://github.com/zzzadruga)
-   [Oganes Bozoyan (oganes.bozoyan)](https://github.com/oganes.bozoyan)
-   [Ricken Bazolo (ricken07)](https://github.com/ricken07)
-   [Sébastien Deleuze (sdeleuze)](https://github.com/sdeleuze)
-   [Soby Chacko (sobychacko)](https://github.com/sobychacko)
-   [Sujin Kim (cowboysj)](https://github.com/cowboysj)
-   [Theo van Kraay (TheovanKraay)](https://github.com/TheovanKraay)
-   [Thomas Vitale (ThomasVitale)](https://github.com/ThomasVitale)
-   [Timo Salm (timosalm)](https://github.com/timosalm)
-   [Toshiaki Maki (making)](https://github.com/making)
-   [Victor Zalevski (VictorZZZZ)](https://github.com/VictorZZZZ)
-   [Wang Lei (csuwl)](https://github.com/csuwl)
-   [Zhao Jianying (zhaojy01)](https://github.com/zhaojy01)
-   [Zhou Bo (cycle2zhou)](https://github.com/cycle2zhou)

## [](#roadmap)Roadmap

We are planning to have one more milestone release, 1.0.0 M5 targeted for late December that focuses on design issues, for example returning more information in the ChatResponse, overhaul the VectorStore API to add/delete and support different query types, unify the API styles of various builders, and more. Then in January we will make a 1.0.0 RC1 release followed quickly by a 1.0.0 GA release.