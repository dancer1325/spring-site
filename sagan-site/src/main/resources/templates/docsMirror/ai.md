---
title: Spring | Generative AI
source: https://spring.io/ai
scraped: 2026-02-19T07:46:31.902Z
description: Level up your Java code and explore what Spring can do for you.
---

![](/img/extra/microservices-4.svg)

# [](#generative-ai)Generative AI

Businesses everywhere are looking to transform their applications by adding Gen AI capabilities to them. Conversational chatbots, code assistance, healthcare diagnostics are some of the use cases for Gen AI.

### What is Generative AI?

Generative AI is a type of Artificial Intelligence that can create new content such as text, images, videos and more. Things that make Gen AI unique are human language as the interface, contextually relevant output, pre-trained models, and accessibility via Web APIs.

### Why Java developers should care?

Java remains one of the most popular programming languages in the enterprise. Its stability, security, and scalability are unmatched. However, integrating AI capabilities such as retrieval-augmented generation (RAG), multimodal use cases like image recognition, as well as predictive analytics, has often required that teams learn new skills or switch to different platforms.

# Generative AI with Spring

Spring AI is a robust extension of the Spring Framework. It’s designed to empower Java developers to create AI-capable applications without the need for extensive reskilling. By leveraging the familiarity and strengths of the Spring Framework, Spring AI democratizes access to sophisticated AI features, making it easier for developers to build intelligent apps.

```
@Servicepublic class SpringAI {private final ChatClient chatClient;public SpringAI(ChatClient.Builder builder) {this.chatClient = builder.build();}public String tellMeAJoke()return chatClient.prompt().user("Tell me a joke").call().content());}}
```

[Get started with ChatClients](https://docs.spring.io/spring-ai/reference/api/multimodality.html)

[Portable Chat Models](https://docs.spring.io/spring-ai/reference/api/chat/comparison.html)

# Tool Calling

Tool calling allows you to register your own functions to connect the LLMs to the APIs of external systems. These systems can provide LLMs with real-time data and perform data processing actions on their behalf. Spring AI greatly simplifies code you need to write to support function invocation. It handles the function invocation conversation for you. You can provide your function as a @Bean and then provide the bean name of the function in your prompt options to activate that function. Additionally, you can define and reference multiple functions in a single prompt.

[Get started with Tool Calling](https://docs.spring.io/spring-ai/reference/api/tools.html)

# Model Context Protocol (MCP)

Standardized protocol that enables AI models and Agents to interact with external tools and resources in a structured way. It supports multiple transport mechanisms to provide flexibility across different environments.

[Get started with MCP](https://docs.spring.io/spring-ai/reference/api/mcp/mcp-overview.html)

# Retrieval Augmented Generation

At its core, Spring AI addresses the fundamental challenge of AI integration - Connecting your enterprise Data and APIs with the AI Models. A technique termed Retrieval Augmented Generation (RAG) has emerged to address the challenge of incorporating relevant data into prompts for accurate AI model responses.Spring AI greatly simplifies code you need to write to support RAG pipelines.

![](/img/extra/ai-1.png)![](/img/extra/ai-1-dark.png)

[Get started with RAG](https://docs.spring.io/spring-ai/reference/api/retrieval-augmented-generation.html)

# Spring AI supported patterns

Generative AI brings with it it's own set of challenges. Spring AI supports the following patterns to address these challenges.

Challenges

Patterns

Align responses to goals

System prompt

No structured output

Output converters

Not trained on your data

Prompt Stuffing

Limited Context Size

RAG

Stateless APIs

Chat memory

Not aware of your APIs

Function calling

Hallucinations

Evaluators

# Integration with common technologies

Spring AI provides abstractions that serve as the foundation for developing AI applications. These abstractions have multiple implementations, enabling easy component swapping with minimal code changes. Spring AI has support for all major Model providers such as OpenAI, Microsoft, Amazon, Google, and Hugging Face. It also supports all major Vector Database providers such as Apache Cassandra, Azure Vector Search, Chroma, Milvus, MongoDB Atlas, Neo4j, Oracle, PostgreSQL/PGVector, PineCone, Qdrant, Redis, and Weaviate.

## Ready to get started?

## More resources

[![AI Powered Flight booking system](/img/extra/ai-2.svg)![AI Powered Flight booking system](/img/extra/ai-2-dark.svg)](https://github.com/tzolov/playground-flight-booking)

# [AI Powered Flight booking system](https://github.com/tzolov/playground-flight-booking)

Christian Tzolov

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