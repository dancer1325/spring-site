---
title: Spring AI 0.8.1 Released
source: https://spring.io/blog/2024/03/12/spring-ai-0-8-1-released
scraped: 2026-02-23T08:52:29.839Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  March 12, 2024 | 1 Comment
---

# Spring AI 0.8.1 Released

_Releases | Mark Pollack |  March 12, 2024 | 1 Comment_

We are happy to announce the milestone 0.8.1 release of Spring AI. Thanks for all the community contributions and great discussion on GitHub issues.

This release has the following new features and improvements.

## [](#google-gemini)Google Gemini

Google recently released its Gemini AI Model. It has many exciting features and functionalities; check their [release blog](https://blog.google/technology/ai/google-gemini-ai/) for an overview.

Features supported in Spring AI are:

-   One of Gemini's marquee features is its multimodal support. This lets you chat with the model using images, videos, and text. For example, you can send the model a photo of a plate of cookies and ask it to give you a recipe for those cookies. Spring AI supports this feature; [read more about it here](https://docs.spring.io/spring-ai/reference/api/clients/vertexai-gemini-chat.html#_multimodal) and take a look at the [sample application](https://github.com/tzolov/spring-ai-aot-tests/blob/main/vertexai-gemini-aot-demo/src/main/java/org/springframework/ai/aot/test/vertexai/gemini/VertexAiGeminiAotDemoApplication.java) that showcases many Gemini features.
-   [Streaming and Non-Streaming chat clients](https://docs.spring.io/spring-ai/reference/api/clients/vertexai-gemini-chat.html)
-   [Function Calling](https://docs.spring.io/spring-ai/reference/api/clients/functions/vertexai-gemini-chat-functions.html)
-   Native compilation of Gemini applications

Note that the Google Vertex Palm2 support will be removed in a future release of Spring AI as [Google is decommissioning this model in 6 months](https://ai.google.dev/palm_docs/deprecation).

## [](#mistral-ai)Mistral AI

[Mistral AI](https://mistral.ai/) stands out for its development of fast, secure, open-source large language models. Take a look at the [sample application](https://github.com/tzolov/spring-ai-aot-tests/blob/main/mistralai-aot-demo/src/main/java/org/springframework/ai/aot/test/mistralai/MistralAiAotDemoApplication.java).

Features supported in Spring AI are

-   [Streaming and Non-Streaming chat clients with retry](https://docs.spring.io/spring-ai/reference/api/clients/mistralai-chat.html)
-   [Function Calling](https://docs.spring.io/spring-ai/reference/api/clients/functions/mistralai-chat-functions.html)
-   Native compilation of Mistral applications

## [](#function-calling-improvements)Function Calling Improvements

We have made several improvements under the hood for Function Calling and created a [sample application that demonstrates the portability of Spring AI’s support for functions](https://github.com/tzolov/spring-ai-function-calling-portability) across OpenAI, Azure OpenAI, Google Gemini, and Mistral AI.

## [](#openai-improvements)OpenAI Improvements

-   Added support for [Audio Transcriptions](https://docs.spring.io/spring-ai/reference/api/transcriptions/openai-transcriptions.html).
-   Added support for [retrying requests](https://docs.spring.io/spring-ai/reference/api/clients/openai-chat.html#_retry_properties) due to transient errors.

## [](#azure-improvements)Azure Improvements

-   Added support for [function calling](https://docs.spring.io/spring-ai/reference/api/clients/functions/azure-open-ai-chat-functions.html).
-   Native compilation of Azure AI applications
-   A new [sample application](https://github.com/tzolov/spring-ai-aot-tests/blob/main/azure-openai-aot-demo/src/main/java/org/springframework/ai/aot/test/azure/openai/AzureOpenaiAotDemoApplication.java) shows these features.
-   Note that the autoconfiguration properties have changed. The property named "spring.ai.azure.openai.chat.options.model" is now "spring.ai.azure.openai.chat.options.deployment-name".

## [](#qdrant-vector-database)Qdrant Vector Database

[Qdrant](https://qdrant.tech/) is an open-source vector database and search engine written in Rust, known for its fast, scalable vector similarity search service. Many thanks to Qdrant for providing this [new implementation](https://docs.spring.io/spring-ai/reference/api/vectordbs/qdrant.html).

## [](#spring-intializr)Spring Intializr

You can create new Spring AI applications for different AI models and Vector Databases at [https://start.spring.io](https://start.spring.io)

Thanks to everyone who has helped make this release possible.