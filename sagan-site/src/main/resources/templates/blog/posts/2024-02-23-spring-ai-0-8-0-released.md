---
title: Spring AI 0.8.0 Released
source: https://spring.io/blog/2024/02/23/spring-ai-0-8-0-released
scraped: 2026-02-23T08:53:54.363Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  February 23, 2024 | 5 Comments
---

# Spring AI 0.8.0 Released

_Releases | Mark Pollack |  February 23, 2024 | 5 Comments_

We are happy to announce the first milestone release of Spring AI, version 0.8.0. A big thanks to the over [50 community members and employees](https://github.com/spring-projects/spring-ai/graphs/contributors) in other companies who have contributed to the project. Your work is very much appreciated!

The Spring AI project was founded based on the realization that creating AI applications was no longer the sole domain of Machine Learning or AI Specialists, who typically use Python. With the meteoric rise in popularity of ChatGPT, which provides a simple Web API to access pre-trained models, creating compelling AI applications has become accessible to software developers across many languages and their ecosystems.

In this first release, we provide the foundations for creating AI applications with the following high level features.

-   Portable API support across AI providers for Chat, text-to-image, and Embedding models. Both synchronous and stream API options are supported. Dropping down to access model-specific features is also supported. We support AI Models from OpenAI, Microsoft, Amazon, Google, Huggingface, and more.
    
-   The Vector Store API provides portability across different providers, featuring a novel SQL-like metadata filtering API that maintains portability. Support for eight vector databases is available.
    
-   Function calling in AI Models. You can declare `java.util.Function` implementations to OpenAI models for use in their prompt responses. You can directly provide these functions as objects or refer to their names if registered as a `@Bean` within the application context. This feature minimizes unnecessary code and enables the AI model to ask for more information to fulfill its response. Additionally, there will soon be support for more AI models.
    
-   Spring Boot Auto Configuration and Starters for AI Models and Vector Stores.
    
-   ETL framework for Data Engineering. This framework provides the basis for loading data into a vector database, helping implement the Retrieval Augmented Generation pattern that enables you to bring your data to the AI model to incorporate into its response.
    
-   [Reference Documentation](https://docs.spring.io/spring-ai/reference/)
    

The [Getting Started section](https://docs.spring.io/spring-ai/reference/getting-started.html) of the reference guide will guide you to create your first AI application. However, I’d like to highlight a new project in the Spring portfolio, the Spring CLI. Note, that the "Spring CLI" is a distinct project from the "Spring Boot CLI", each with its own set of functionalities.

Follow these steps and you will be up and running in no time.

1.  Download the latest [Spring CLI Release](https://github.com/spring-projects/spring-cli/releases) and follow the [installation instructions](https://docs.spring.io/spring-cli/reference/installation.html#_setting_up_your_path_or_alias).
2.  To create a simple OpenAI-based application, use the command:

```
Copyspring boot new --from ai --name myai
```

3.  Consult the generated `README.md` file for guidance on obtaining an OpenAI API Key and running your first AI application.

Future releases will build upon this foundation to provide access to additional AI Models, for example, the Gemini multi-modal just released by Google, a framework for evaluating the effectiveness of your AI application, more convenience APIs, and features to help solve the “query/summarize my documents” use cases. Check the [Spring AI GitHub project](https://github.com/spring-projects/spring-ai/) for details on upcoming releases.

Once again, thanks to everyone who has helped make this release possible.