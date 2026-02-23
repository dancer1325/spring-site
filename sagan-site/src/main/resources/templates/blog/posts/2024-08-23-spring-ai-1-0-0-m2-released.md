---
title: Spring AI 1.0.0 M2 released
source: https://spring.io/blog/2024/08/23/spring-ai-1-0-0-m2-released
scraped: 2026-02-23T08:19:39.483Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  August 23, 2024 | 3 Comments
---

# Spring AI 1.0.0 M2 released

_Releases | Mark Pollack |  August 23, 2024 | 3 Comments_

We are happy to announce the 1.0.0 Milestone 2 release of Spring AI.

This release brings significant enhancements and new features across various areas.

## [](#key-focus-observability)Key Focus: Observability

A major emphasis for this release has been on observability functionality, crucial for monitoring, debugging, and optimizing AI applications. Comprehensive observability features have been introduced for:

-   `ChatClient` (including Advisors)
-   Chat Models (OpenAI, Ollama, Mistral, Anthropic)
-   Embedding Models
-   Image Generation Models
-   Vector Stores

**Note**: Support for additional `ChatModel` implementation will be added in future releases.

Here are some samples showcasing this functionality to get started

-   [Observability Demo](https://github.com/tzolov/ai-observability-demo) from Christian Tzolov
-   [Observability Demos](https://github.com/ThomasVitale/llm-apps-java-spring-ai/tree/main/14-observability) from Thomas Vitale

Grazie mille (a thousand thanks ;) to Thomas Vitale for his significant efforts in contributing to the Observability feature!

Here is a screenshot showing the tracing of the following code

```
Copyvar response = chatClient.prompt()
	.user("How does Carina work?")
	.advisors(new QuestionAnswerAdvisor(vectorStore, SearchRequest.defaults()))
	.advisors(new PromptChatMemoryAdvisor(chatMemory))
	.call()
	.chatResponse();
```

![Grafana view of Spring AI Trace](https://static.spring.io/blog/contentful/20240923/spring-ai-blog-observability3.png)

In the trace view, you can see the nesting of the `ChatClient` call which first passes through two advisors, the `QuestionAnswerAdvisor` that does an embedding request and a query to the PGVector database. Then it passes through the `PromptChatMemoryAdvisor`, which takes very little time, and then finally to the calling of the OpenAI `gpt-4o` model.

You can find all the details what metrics are available in the [Observability Documentation](https://docs.spring.io/spring-ai/reference/observabilty/index.html)

## [](#core-improvements)Core improvements

-   **New:** [MarkdownDocumentReader](https://docs.spring.io/spring-ai/reference/api/etl-pipeline.html#_markdown) for ETL pipelines
-   **New:** Cassandra-backed [chat memory](https://docs.spring.io/spring-ai/reference/api/chatclient.html#_chat_memory)
-   **New:** Typesense testcontainer integration
-   ChatClient enhancements
    -   Function registration with explicit input type
    -   Dynamic filter expressions for QuestionAnswerAdvisor
    -   Customizable logger advisor
-   Improved API design of ResponseMetadata and the Message object hierarchy
-   Embedding format changed from List to float\[\]
-   Added JSON array handling to JsonReader
-   Options improvements
    -   ChatOptions: Enhanced metadata configuration for defined models
    -   EmbeddingOptions: Added model and dimensions options
    -   ImageOptions: Added style option
-   ChatOptions added to PromptTemplate create methods

## [](#chatmodel-enhancements)ChatModel Enhancements

General improvements have been made across the chat model infrastructure classes. Key feature enhancements for specific models include:

-   Anthropic: Added Function calling support
-   Azure Open AI
    -   Function calling integration
    -   Updated to Azure OpenAI Client library 1.0 beta-10
    -   **New:** [Transcription support](https://docs.spring.io/spring-ai/reference/api/audio/transcriptions/azure-openai-transcriptions.html)
    -   Added image handling for byte arrays
    -   Added Multimodality support
    -   Added OpenAI API key and MS-Entra authentication options
-   Amazon Bedrock: Updated `bedrockruntime` version to 2.26.7
-   HuggingFace: Added Boot starter
-   Minimax
    -   Improved function calling
    -   Added Web search tool support
    -   Introduced sensitive information masking option
-   Mistral
    -   Added function calling support
    -   Documentation for using Mistral AI via Spring AI's OpenAI client
-   **New:** [Moonshot chat model with function calling](https://docs.spring.io/spring-ai/reference/api/chat/moonshot-chat.html)
-   Ollama
    -   Function calling support
    -   Batch embedding request functionality
-   OpenAI
    -   **New:** [Moderation API support](https://docs.spring.io/spring-ai/reference/api/moderation/openai-moderation.html)
    -   Updates for partially compliant OpenAI model providers
    -   Usage statistics for streaming chat responses
    -   [Groq model provider integration with documentation](https://docs.spring.io/spring-ai/reference/api/chat/groq-chat.html)
    -   Configurable URL paths for Chat and Embedding models
    -   Documentation for using [Mistral AI](https://docs.spring.io/spring-ai/reference/api/chat/mistralai-chat.html#_openai_api_compatibility) and [NVIDIA LLM API](https://docs.spring.io/spring-ai/reference/api/chat/nvidia-chat.html) via Spring AI's OpenAI client
    -   Parallel function calling support
    -   Organization ID and Project ID authentication options
-   **New:** QianFan model for [chat](https://docs.spring.io/spring-ai/reference/api/chat/qianfan-chat.html), [embeddings](https://docs.spring.io/spring-ai/reference/api/embeddings/qianfan-embeddings.html), and [image](https://docs.spring.io/spring-ai/reference/api/image/qianfan-image.html) generation.
-   ONNX - Improved transformer embedding model
-   Google Vertex AI
    -   Add [Embedding model](https://docs.spring.io/spring-ai/reference/api/embeddings/vertexai-embeddings-text.html) support
    -   Updated Google Vertex SDK to 26.41.0
    -   Resolved parallel function calling
    -   Added system message support
    -   Added ResponeMimeType in chat options
    -   Added Google search retrieval tool support
-   ZhiPu: Added function calling support

Thanks for [Geng Rong](https://github.com/mxsl-gr) for the Moonshot, QianFan, and ZhiPu model support.

## [](#vector-store-improvements)Vector Store improvements

-   **Breaking Change**: Default value for vector store configuration property `initialize-schema` changed to false.
-   Introduced `BatchingStrategy` for efficient document embedding operations
    -   Added `TokenCountBatchingStrategy` implementation
-   Cassandra: Added `CassandraChatMemory`
-   Chroma:
    -   Upgraded from use of `RestTemplate` to `RestClient`
    -   Integrated ChromaDB's `CHROMA_SERVER_AUTHN_CREDENTIALS` environment variable for Docker Compose and Testcontainers
-   Gemfire: Enhanced functionality
-   Milvus: Removed flush operations to prevent excessive segment creation
-   MongoDB: Improved efficiency using `org.bson.Documents`
-   Neo4j - Updated to latest Cypher-DSL
-   **New:** [Opensearch VectorStore implementation](https://docs.spring.io/spring-ai/reference/api/vectordbs/opensearch.html) Thanks [Jemin Huh](https://github.com/JM-Lab)!
-   **New:** [Oracle 23ai VectorStore implementation](https://docs.spring.io/spring-ai/reference/api/vectordbs/oracle.html) Thanks [Loïc Lefèvre](https://github.com/loiclefevre)!
-   PGVector
    -   Introduced customizable schema, table, and index names
    -   Fixed IN/NOT IN filters for JSON queries
-   Pinecone
    -   Added configurable content and distance metadata fields
    -   Added AOT hints
-   Redis: Enabled use of standard `RedisAutoConfiguration`
-   **New:** [Typesense support](https://docs.spring.io/spring-ai/reference/api/vectordbs/typesense.html)

## [](#general-improvements)General improvements

Many refactoring, bug fixing, documentation enhancements across the board by a wide range of contributors. If we haven’t gotten to your PR yet, we will, please be patient. Thanks to

[Mohammed, Ahmed Yousri Salama](https://github.com/N/A), [Ashwin Krishna K](https://github.com/AshwinKrishnaK), [blackbean99](https://github.com/BlackBean99), [Youngrae Cho](https://github.com/Cho-D-YoungRae), [DadySu](https://github.com/DadySu), [Jerry (Flyingblu)](https://github.com/Flyingblu), [Lorenzo Caenazzo](https://github.com/Grogdunn), [Jemin Huh](https://github.com/JM-Lab), [Bill Lau](https://github.com/JavaProgrammerLB), [JayPark7821](https://github.com/JayPark7821), [KAMOsama](https://github.com/KAMO030), [David Caudill](https://github.com/Kirboyyy), [Lee-ChungMu](https://github.com/Lee-ChungMu), [Pablo Sanchi](https://github.com/PabloSanchi), [Seol\_JY](https://github.com/Seol-JY), [TarasVovk669](https://github.com/TarasVovk669), [Thomas Vitale](https://github.com/ThomasVitale), [TimJ0212](https://github.com/TimJ0212), [Fu Cheng](https://github.com/alexcheng1982), [ashni](https://github.com/ashni-mongodb), [Benoit Moussaud](https://github.com/bmoussaud), [Dariusz Jędrzejczyk](https://github.com/chemicL), [cocomongg](https://github.com/cocomongg), [ChanYeong](https://github.com/cyPark95), [David Afriz](https://github.com/dafriz), [devholic22](https://github.com/devholic22), [Mariusz Bernacki](https://github.com/didalgolab), [dongfeng3692](https://github.com/dongfeng3692), [Dave Syer](https://github.com/dsyer), [Eddú Meléndez](https://github.com/eddumelendez), [El Mahdi Oukhamou](https://github.com/elmahdi43), [Seongmin Kim](https://github.com/fing9), [Francisco Javier Torres](https://github.com/fjtorres-zerocopy), [geetrawat](https://github.com/geetrawat), [Craig Walls](https://github.com/habuma), [yinpeng](https://github.com/hakusai22), [Sinsy](https://github.com/impactCn), [Johnny Lim](https://github.com/izeye), [jo-kim](https://github.com/jo-kim), [Josh Long](https://github.com/joshlong), [KimMinjeong](https://github.com/jyami-kim), [Cameron Kirk](https://github.com/kirkster96), [Laura Trotta](https://github.com/l-trotta), [Loïc Lefèvre](https://github.com/loiclefevre), [Hyoseop Song](https://github.com/loveysuby), [luocq3](https://github.com/luocongqiu), [Michael Simons](https://github.com/michael-simons), [mck](https://github.com/michaelsembwever), [Jonatan Soto](https://github.com/moon0cean), [Muthukumaran Navaneethakrishnan](https://github.com/muthuishere), [Geng Rong](https://github.com/mxsl-gr), [Nicholas Zhan](https://github.com/nichozhan), [Szymon Ochnio](https://github.com/ochnios), [Philipp Gerhard](https://github.com/pgerhard), [Piotr Olaszewski](https://github.com/piotrooo), [rapenumaka](https://github.com/rapenumaka), [rivkode](https://github.com/rivkode), [Ross Lawley](https://github.com/rozza), [Andrea Rubino](https://github.com/rubin0), [Soby Chacko](https://github.com/sobychacko), [xiaoxin](https://github.com/status2xx), [Stefan Vassilev](https://github.com/stefanvassilev), [Tim Kelly](https://github.com/timotheekelly), [Chris Turchin](https://github.com/turchinc), [uzhuraul](https://github.com/uzhuraul), [Veerendra Vellanki](https://github.com/v891), [吴博](https://github.com/wb04307201), [xiehui1956](https://github.com/xieyucan), [xsg22](https://github.com/xsg22), [양예성](https://github.com/yeseong0412), [Yulong Shi](https://github.com/yulshi), [jiwoo](https://github.com/zbqmgldjfh), [zlzzlzz2l](https://github.com/zlzzlzz2l)