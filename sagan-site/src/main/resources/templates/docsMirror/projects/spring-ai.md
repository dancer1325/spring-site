---
title: Spring AI
source: https://spring.io/projects/spring-ai
scraped: 2026-02-19T07:51:15.703Z
description: Level up your Java code and explore what Spring can do for you.
---

[All projects](/projects)

-   [Spring Boot](/projects/spring-boot)
-   [Spring Framework](/projects/spring-framework)
-   [Spring Data](/projects/spring-data)
-   [Spring Cloud](/projects/spring-cloud)
-   [Spring Cloud Data Flow](/projects/spring-cloud-dataflow)
-   [Spring gRPC](/projects/spring-grpc)
-   [Spring Security](/projects/spring-security)
-   [Spring Authorization Server](/projects/spring-authorization-server)
-   [Spring for GraphQL](/projects/spring-graphql)
-   [Spring Session](/projects/spring-session)
-   [Spring Integration](/projects/spring-integration)
-   [Spring HATEOAS](/projects/spring-hateoas)
-   [Spring Modulith](/projects/spring-modulith)
-   [Spring REST Docs](/projects/spring-restdocs)
-   [Spring AI](/projects/spring-ai)
-   [Spring Batch](/projects/spring-batch)
-   [Spring AMQP](/projects/spring-amqp)
-   [Spring CredHub](/projects/spring-credhub)
-   [Spring for Apache Kafka](/projects/spring-kafka)
-   [Spring LDAP](/projects/spring-ldap)
-   [Spring for Apache Pulsar](/projects/spring-pulsar)
-   [Spring Shell](/projects/spring-shell)
-   [Spring Statemachine](/projects/spring-statemachine)
-   [Spring Vault](/projects/spring-vault)
-   [Spring Web Flow](/projects/spring-webflow)
-   [Spring Web Services](/projects/spring-ws)

# ![Spring AI](/img/projects/spring-ai.svg)Spring AI1.1.2[](https://github.com/spring-projects/spring-ai "Github")

-   [Overview](#overview)
-   [Learn](#learn)
-   [Support](#support)

Spring AI is an application framework for AI engineering. Its goal is to apply to the AI domain Spring ecosystem design principles such as portability and modular design and promote using POJOs as the building blocks of an application to the AI domain.

![spring-ai-integration-diagram-3](//images.ctfassets.net/mnrwi97vnhts/4mda205vy509Dx3vGkMwFr/af520e66dc79fb80cd1bc129a11d6d23/spring-ai-integration-diagram-3.svg)

> At its core, Spring AI addresses the fundamental challenge of AI integration: Connecting your enterprise **Data** and **APIs** with the **AI Models**.

## [](#features)Features

Spring AI provides the following features:

-   Support for all major [AI Model providers](https://docs.spring.io/spring-ai/reference/api/index.html) such as Anthropic, OpenAI, Microsoft, Amazon, Google, and Ollama. Supported model types include:
    -   [Chat Completion](https://docs.spring.io/spring-ai/reference/api/chatmodel.html)
    -   [Embedding](https://docs.spring.io/spring-ai/reference/api/embeddings.html)
    -   [Text to Image](https://docs.spring.io/spring-ai/reference/api/imageclient.html)
    -   [Audio Transcription](https://docs.spring.io/spring-ai/reference/api/audio/transcriptions.html)
    -   [Text to Speech](https://docs.spring.io/spring-ai/reference/api/audio/speech.html)
    -   [Moderation](https://docs.spring.io/spring-ai/reference/api/index.html#api/moderation)
-   Portable API support across AI providers for both synchronous and streaming API options are supported. Access to [model-specific features](https://docs.spring.io/spring-ai/reference/api/chatmodel.html#_chat_options) is also available.
-   [Structured Outputs](https://docs.spring.io/spring-ai/reference/api/structured-output-converter.html) - Mapping of AI Model output to POJOs.
-   Support for all major [Vector Database providers](https://docs.spring.io/spring-ai/reference/api/vectordbs.html) such as *Apache Cassandra, Azure Vector Search, Chroma, Milvus, MongoDB Atlas, Neo4j, Oracle, PostgreSQL/PGVector, PineCone, Qdrant, Redis, and Weaviate*.
-   Portable API across Vector Store providers, including a novel SQL-like [metadata filter API](https://docs.spring.io/spring-ai/reference/api/vectordbs.html#metadata-filters).
-   [Tools/Function Calling](https://docs.spring.io/spring-ai/reference/api/functions.html) - permits the model to request the execution of client-side tools and functions, thereby accessing necessary real-time information as required.
-   [Observability](https://docs.spring.io/spring-ai/reference/observability/index.html) - Provides insights into AI-related operations.
-   Document injection [ETL framework](https://docs.spring.io/spring-ai/reference/api/etl-pipeline.html) for Data Engineering.
-   [AI Model Evaluation](https://docs.spring.io/spring-ai/reference/api/testing.html) - Utilities to help evaluate generated content and protect against hallucinated response.
-   [ChatClient API](https://docs.spring.io/spring-ai/reference/api/chatclient.html) - Fluent API for communicating with AI Chat Models, idiomatically similar to the WebClient and RestClient APIs.
-   [Advisors API](https://docs.spring.io/spring-ai/reference/api/advisors.html) - Encapsulates recurring Generative AI patterns, transforms data sent to and from Language Models (LLMs), and provides portability across various models and use cases.
-   Support for [Chat Conversation Memory](https://docs.spring.io/spring-ai/reference/api/chatclient.html#_chat_memory) and [Retrieval Augmented Generation (RAG)](https://docs.spring.io/spring-ai/reference/api/chatclient.html#_retrieval_augmented_generation).
-   Spring Boot Auto Configuration and Starters for all AI Models and Vector Stores - use the [start.spring.io](https://start.spring.io/) to select the Model or Vector-store of choice.

This feature set lets you implement common use cases such as "`Q&A over your documentation`" or "`Chat with your documentation.`"

## [](#documentation)Documentation

Extensive [reference documentation](https://docs.spring.io/spring-ai/reference/index.html), sample applications, and workshop/course material.

## [](#getting-started)Getting Started

You can get started in a few simple steps:

1.  Create a Spring Boot Web application with a Spring AI OpenAI boot starter dependency. This [Spring Initializr link](https://start.spring.io/#!type=maven-project&language=java&platformVersion=3.3.4&packaging=jar&jvmVersion=17&groupId=spring.ai.example&artifactId=spring-ai-demo&name=spring-ai-demo&description=Spring%20AI%20%2C%20getting%20started%20example%2C%20using%20Open%20AI&packageName=spring.ai.example.spring-ai-demo&dependencies=web,spring-ai-openai) can help you bootstrap the application. (*With [start.spring.io](https://start.spring.io/) you can select any AI Models or Vector Stores that you want to use in your new applications*).
    
2.  Add your OpenAI key to the `application.properties`:
    
    ```
    Copyspring.ai.openai.api-key=<YOUR OPENAI KEY>
    ```
    
3.  Add the following snippet to your `SpringAiDemoApplication` class:
    
    ```java
    Copy@Bean
    public CommandLineRunner runner(ChatClient.Builder builder) {
        return args -> {
            ChatClient chatClient = builder.build();
            String response = chatClient.prompt("Tell me a joke").call().content();							
            System.out.println(response);
        };
    }
    ```
    
4.  Run the application:
    
    ```console
    Copy./mvnw spring-boot:run
    ```
    

Want to get started in another way? View the [Getting Started section](https://docs.spring.io/spring-ai/reference/getting-started.html) in the reference documentation.

![Spring Initializr](/img/logos/spring-initializr.svg)

## Quickstart Your Project

Bootstrap your application with [Spring Initializr](https://start.spring.io/).

![](/img/extra/footer.svg)

## Get ahead

VMware offers training and certification to turbo-charge your progress.

[Learn more](https://spring.academy/)

## Get support

Tanzu Spring offers support and binaries for OpenJDK™, Spring, and Apache Tomcat® in one simple subscription.

[Learn more](/support)

## Upcoming events

Check out all the upcoming events in the Spring community.

[View all](/events)