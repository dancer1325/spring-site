---
title: Spring AI 1.0 GA Released
source: https://spring.io/blog/2025/05/20/spring-ai-1-0-GA-released
scraped: 2026-02-23T07:41:35.884Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  May 20, 2025 | 2 Comments
---

# Spring AI 1.0 GA Released

_Releases | Mark Pollack |  May 20, 2025 | 2 Comments_

On behalf of the Spring AI engineering team and everyone who contributed to this release, I am very excited to announce the general availability of Spring AI 1.0. We have a great release blog lined up for you.

## [](#getting-started)Getting Started

All the new bits are in maven central. Use the provided bom to import the dependencies.

```xml
Copy<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.ai</groupId>
            <artifactId>spring-ai-bom</artifactId>
            <version>1.0.0</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

Checkout the [Upgrade Notes](https://docs.spring.io/spring-ai/reference/upgrade-notes.html#upgrading-to-1-0-0-GA) for the latest breaking changes and how to upgrade. NOTE: You can automate the upgrade process to 1.0.0-GA using an OpenRewrite recipe. This recipe helps apply many of the necessary code changes for this version. Find the recipe and usage instructions at [Arconia Spring AI Migrations](https://github.com/arconia-io/arconia-migrations/blob/main/docs/spring-ai.md).

You can get started creating 1.0 GA apps on the [Intialzr website](https://start.spring.io) and read our [Getting Started](https://docs.spring.io/spring-ai/reference/getting-started.html) section in the reference documentation.

## [](#friends-and-family)Friends and Family

Second are a selection of blogs created for the 1.0 GA release from the many friends and family we have been working with over the past two years, showing how to use Spring AI in various ways:

-   Microsoft Azure [Blog](https://techcommunity.microsoft.com/blog/appsonazureblog/spring-ai-1-0-ga-is-here---build-java-ai-apps-end-to-end-on-azure-today/4414763) and [Video](https://youtu.be/nkB2fnq-HOg). A special thanks to [Asir Selvasingh](https://www.linkedin.com/in/asir-architect-javaonazure) who helped us [launch Spring AI](https://youtu.be/zIYmgEbUl4U?feature=shared&t=4970) back at the Spring One conference in Vegas in 2023.
-   AWS - [Blog](https://community.aws/content/2xLkItwKHrZ5EweKTz9uPpYHyPk/spring-ai-1-0-brings-ai-to-the-developer-masses) - Spring AI 1.0 Brings AI to the Developer Masses
-   Google - [Blog](https://cloud.google.com/blog/topics/developers-practitioners/google-cloud-and-spring-ai-10) - Google Cloud and Spring AI 1.0
-   Cloud Foundry - [Video](https://youtu.be/mBMq2BqfjyA) - Spring AI and CloudFoundry: Bootiful, Agentic, Production-Worthy, Cloud-Native Systems and Services
-   Elastic - [Blog](https://www.elastic.co/search-labs/blog/spring-ai-elasticsearch-application) - Spring AI and Elasticsearch as your vector database
-   Redis [Blog](https://redis.io/blog/build-fast-production-worthy-ai-apps-with-spring-ai-and-redis/) - Build fast, production-worthy AI apps with Spring AI and Redis
-   MongoDB - [Blog](https://dev.to/mongodb/how-to-build-rag-applications-with-spring-ai-and-mongodb-5gaj) - Spring AI and MongoDB: How to Build RAG Applications
-   Oracle - [Blog](https://blogs.oracle.com/developers/post/spring-ai-10-ga-released-with-oracle-vector-database-support) - Spring AI 1.0 GA released with Oracle Vector Database support
-   InfoQ [Article](https://www.infoq.com/news/2025/05/spring-ai-1-0-streamlines-apps/) - Spring AI 1.0 Released, Streamlines AI Application Development with Broad Model Support
-   The New Stack [Article](https://thenewstack.io/production-worthy-ai-with-spring-ai-1-0/) - Production-Worthy AI With Spring AI 1.0

Additionally, there is a comprehensive article from Josh Long demonstrating how to use [Spring AI with Anthropic's Claude](https://spring.io/blog/2025/05/20/your-first-spring-ai-1), as well as an article from Daniel Garnier-Moiroux in his blog [MCP Authorization in practice with Spring AI and OAuth2](https://spring.io/blog/2025/05/19/spring-ai-mcp-client-oauth2).

## [](#new-song)New Song

First up, of course, is a new song. Check out the [latest track](https://suno.com/s/b0y64IKfpE5m3akD) in the [Spring AI play list](https://suno.com/playlist/321b61a4-201d-4404-9335-bf909250b0e3) - it will make you [happy](https://www.youtube.com/watch?v=ZbZSe6N_BXs).

## [](#new-logo)New Logo

Third, we have a new Spring AI logo! Many thanks to [Sergi Almar](https://x.com/sergialmar), the organizer of the [Spring IO conference](https://2025.springio.net/), and designer [Jorge Rigabert](https://x.com/jrigabert) for creating such a nice logo. The modifications possible with the lowercase letter 'i' are fascinating to see.

![](https://raw.githubusercontent.com/spring-io/spring-io-static/refs/heads/main/blog/tzolov/20250520/spring-ai-logo.png)

## [](#spring-ai-10-ga-tour)Spring AI 1.0 GA Tour

Let's take a tour of the Spring AI 1.0 GA feature set.

At the heart of Spring AI is the `ChatClient` , a **portable and easy to use API** that is the primary interface for interacting with AI models.

Spring AI’s ChatClient supports invoking **20** AI Models, from Anthropic to ZhiPu. It supports multi-modal inputs and output (when supported by the underlying model) and structured responses - most often in JSON for easier processing of output in your application.

For a detailed comparsion of the feature set for AI models, visit the [Chat Models Comparison](https://docs.spring.io/spring-ai/reference/api/chat/comparison.html) in our reference docs.

Read our [reference docs for more information on `ChatClient`](https://docs.spring.io/spring-ai/reference/api/chatclient.html). You can see it in action in [Josh's blog](https://spring.io/blog/2025/05/20/your-first-spring-ai-1#the-assistant)

### [](#prompts)Prompts

Creating the right prompts, what you pass to the model, is an important skill. There are several patterns to get the most out of the AI model to get the best results.  
You can [find example usage of prompt in the reference docs](https://docs.spring.io/spring-ai/reference/api/prompt.html). Spring AI’s reference documentationa also covers [Prompt Engineering techniques](https://docs.spring.io/spring-ai/reference/api/chat/prompt-engineering-patterns.html) with example code based on the comprehensive Prompt Engineering Guide.

## [](#the-augmented-llm)The Augmented LLM

However, real-world AI applications go beyond simple request/response interactions with a stateless AI Model API.

To build effective AI applications, a supporting cast of features is essential. This is where the concept of the [Augmented LLM](https://www.anthropic.com/engineering/building-effective-agents) , depicted below, adds to the base model interaction with capabilities such as data retrieval, conversational memory, and tool calling. These capabilities allow you to bring your own data and external APIs directly into the model’s reasoning process.

![Augmented LLM](https://raw.githubusercontent.com/spring-io/spring-io-static/refs/heads/main/blog/tzolov/20250520/anthropic-augmented-llm-concept.png)

Key to implementing this pattern in Spring AI are Advisors

## [](#advisors)Advisors

A key feature of Spring AI’s ChatClient is the Advisor API. This is an interceptor chain that allows you to modify the ingoing prompt by injecting retrieve data and conversation memory.

You can read more about them in the [section in the reference documentation](https://docs.spring.io/spring-ai/reference/api/advisors.html).

Let’s now dive into each component of the Augmented LLM.

## [](#retrieval)Retrieval

At the heart of retrieving data in AI applications is a database and vector databases in particular are the most common for this purpose. Spring AI provides a portable vetor store abstraction that supports **20** different vector databases, for Azure Cosmos DB to Weaviate.

A common challenge working with these databases is that each has its own unique query language for metadata filtering. Spring AI solves this with a portable filter expression language that uses a familiar SQL-like syntax. If you every reach the limits of this abstraction, you can fall back to native queries

Spring AI includes a lightweight, configurable **ETL (Extract, Transform, Load) framework** to streamline the process of importing your data into a vector store. It supports a wide range of input sources through pluggable `DocumentReader` components, including **local file systems**, **web pages**, **GitHub repositories**, **AWS S3**, **Azure Blob Storage**, **Google Cloud Storage**, **Kafka**, **MongoDB**, and **JDBC-compatible databases**. This makes it easy to bring content from virtually anywhere into your RAG pipeline, with built-in support for chunking, metadata enrichment, and embedding generation. You can read more about the ETL features in the [section in the reference documentation](https://docs.spring.io/spring-ai/reference/api/etl-pipeline.html).

Spring AI also comes with extensive support for the pattern of Retrieval Augmented Generation, or RAG, that enables the AI models to ground their responses based on the data you pass into it. You can start simple with `QuestionAnswerAdvisor` to inject relevant context into prompts, or scale up to a more sophisticated, modular RAG pipeline tailored to your application with the `RetrievalAugmentationAdvisor`.

You can read more about them in the [section in the reference documentation](https://docs.spring.io/spring-ai/reference/api/retrieval-augmented-generation.html).

For a tutorial on implementing RAG in your Spring AI applications, explore our [guide to Retrieval Augmented Generation](https://spring.io/blog/2025/05/20/your-first-spring-ai-1#retrieval-augmented-generation-rag-with-vector-stores) which walks through setting up vector stores, embedding documents, and creating effective retrieval pipelines with practical code samples.

## [](#memory)Memory

Conversational history is an essential ingredient in creating an AI chat application. Spring AI supports this with the `ChatMemory` interface, which manages the storing and retrieving of messages. The `MessageWindowChatMemory` implementation maintains the last N messages in a sliding windows, updating itself as the conversation progresses. It delegates to a `ChatMemoryRepository` and we currently provide repository implementations for JDBC, Cassandra, and Neo4j, with more on the way.

An alternative is to use the `VectorStoreChatMemoryAdvisor`. Instead of just remembering the most recent messages, it uses vector search to retrieve the most semantically similar messages from past conversations.

You can read more about them in the [section in the reference documentation](https://docs.spring.io/spring-ai/reference/api/chat-memory.html).

For a walkthrough on implementing chat memory in your Spring AI applications, check out our [guide to chat memory implementation](https://spring.io/blog/2025/05/20/your-first-spring-ai-1#chat-memory) which covers both basic and advanced memory patterns, including code examples for persistent storage options.

## [](#tools)Tools

Spring AI makes it easy to extend what models can do through **tools** — custom functions that let AI retrieve external information or take real-world actions. Tool calling\*\* (also referred to as **function calling**) was first widely introduced by OpenAI in June 2023 with the release of their function calling feature in the `gpt-4` and `gpt-3.5-turbo` models.

Tools can fetch current weather, query databases, or return the latest news, helping models answer questions beyond their training data. They can also trigger workflows, send emails, or update systems—turning the model into an active participant in your application. Defining tools is simple: use the `@Tool` annotation for declarative methods, register beans dynamically with `@Bean`, or create them programmatically for full control.

You can read more about them in the [section in the reference documentation](https://docs.spring.io/spring-ai/reference/api/tools.html).

For a walkthough on implementing tool calling in your Spring AI applications, see our [guide to local tool calling](https://spring.io/blog/2025/05/20/your-first-spring-ai-1#local-tool-calling) which demonstrates how to create, register, and use tools with practical examples and best practices.

## [](#evaluation)Evaluation

Using this technology to create an application is all fun and games, but how do you know it is working? Unfortunately, it isn’t as straightforward as writing traditional unit or integration tests and seeing if the tests are green. One needs to evaluate the response for the AI Model across a range of criteria. For example, is the answer relevant to the question asked? Did it hallucinate? Was the answer based on the provided facts?

To get a handle on this, one should start off doing so-called 'vibe checks'. As the name implies, this is manually reviewing the responses and using your own judgment to determine if the answer is correct. Of course, this is time-consuming, so there is an evolving set of techniques to help automate this process.

Spring AI makes it easy to check how accurate and relevant your AI-generated content is. It comes with a flexible `Evaluator` interface and two handy built-in evaluators:

-   **RelevancyEvaluator** – Helps you figure out if the AI's response actually matches the user’s question and the retrieved context. It’s perfect for testing RAG flows and uses a customizable prompt to ask another model, “Does this response make sense based on what was retrieved?”
    
-   **FactCheckingEvaluator** – Verifies whether the AI’s response is factually accurate based on the context provided. It works by asking the model to judge if a statement is logically supported by a document. You can run this using smaller models like Bespoke’s Minicheck (via Ollama), making it way cheaper than using something like GPT-4 for every check.
    

However, this isn’t a silver bullet. [Clémentine Fourrier](https://clefourrier.github.io/), lead maintainer of Hugging Face's Open LLM Leaderboard, warns that **"LLMs as judges" are not a silver bullet**. In her interview on the [Latent Space Podcast](https://deepcast.fm/episode/benchmarks-201-why-leaderboards-arenas-llm-as-judge) she outlines key issues:

-   **Mode collapse and positional bias**: LLM judges often favor answers from models in the same family or the first response shown.
-   **Verbose bias**: Models rate longer answers more favorably, regardless of accuracy.
-   **Poor at scoring**: Ranking is more reliable than assigning scores; even then, reproducibility is weak.
-   **Overconfidence bias**: People—and models—often prefer assertive answers, even when wrong.

You can read more about Evaluation in the [section in the reference documentation](https://docs.spring.io/spring-ai/reference/api/testing.html).

So best of luck! To get started, check out [some](https://www.baeldung.com/spring-ai-testing-ai-evaluators) [nice](https://medium.com/@udayani.vaka/evaluating-llm-responses-with-spring-ai-evaluator-and-deepeval-3df6e32d806c) [articles](https://www.javacodegeeks.com/spring-ai-testing-ai-evaluators-example.html) that show the use of these evaluators.

## [](#observability)Observability

When you're running AI in production, you need more than hope and good vibes—you need **observability**. Spring AI makes it easy to observe what your models are doing, how they’re performing, and what it’s all costing you.

Spring AI integrates with **Micrometer** to provide detailed telemetry on key metrics like:

-   **Model latency** – How long it takes for your model to respond (not just emotionally).
    
-   **Token usage** – Input/output tokens per request, so you can track and optimize costs.
    
-   **Tool calls and retrievals** – Know when your model is acting like a helpful assistant vs. just freeloading on your vector store.
    

You also get full tracing support via **Micrometer Tracing**, with spans for each major step in a model interaction. You can also get log messages that can be helpful for troubleshooting so that you can see what was the user prompt or the vector store response.

You can read more about Evaluation in the [section in the reference documentation](https://docs.spring.io/spring-ai/reference/observability/index.html).

## [](#model-context-protocol)Model Context Protocol

The [Model Context Protocol](https://modelcontextprotocol.io/introduction) (MCP) came on the scene in November of 2024. It took off like wildfire because it provides a standardized way for AI models to interact with external tools, prompts, and resources. MCP is a client-server oriented protocol and once you build an MCP server, you can easily adopt it in your application, no matter what programming language the MCP server was written in or what programming language the MCP client is written in.

This has really taken off in the tool space, though MCP isn't limited to tools. Now you can use 'out of the box' MCP servers for specific functionality like interacting with GitHub, without having to write that code yourself. From the AI tool perspective, it is like a class library of tools that you can easily add to your application.

The Spring AI team started support for MCP shortly after the specification was released and this code was then [donated to Anthropic](https://spring.io/blog/2025/02/14/mcp-java-sdk-released-2) as the basis for the [MCP Java SDK](https://github.com/modelcontextprotocol/java-sdk). Spring AI provides a [rich set of features](https://docs.spring.io/spring-ai/reference/api/mcp/mcp-overview.html) around this foundation.

### [](#mcp-clients)MCP Clients

Spring AI makes consuming Model Context Protocol (MCP) tools straightforward through its client-side starter module. By adding the \`spring-ai-starter-mcp-client\` dependency, you'll quickly connect with remote MCP servers. Spring Boot's auto-configuration handles the heavy lifting, so your client can invoke tools exposed by an MCP server without excessive boilerplate - letting you focus on building effective AI workflows. Spring makes it easy to connect to both stdio and HTTP-based SSE endpoints provided by MCP servers.

For a practical introduction, check out the [MCP Client Example](https://github.com/spring-projects/spring-ai-examples/tree/main/model-context-protocol/client-starter/starter-default-client) which demonstrates connecting to an MCP server that provides Brave web search - so you can add powerful search features right in your Spring app.

For a walkthrough on implementing Model Context Protocol in your Spring AI applications, see our [guide to MCP](https://spring.io/blog/2025/05/20/your-first-spring-ai-1#model-context-protocol) which explains how to set up both client and server components, connect to external tools, and leverage the protocol for enhanced AI capabilities.

### [](#mcp-servers)MCP Servers

Spring AI simplifies creating MCP servers with its dedicated starter module and intuitive annotation-based approach. Add the `spring-ai-starter-mcp-server` dependency, and you can quickly transform Spring components into MCP-compliant servers.

The framework offers a clean syntax using the @Tool annotation to expose methods as tools. Parameters are automatically converted to the appropriate MCP format, and the framework handles all the underlying protocol details - transport, serialization, and error handling With minimal configuration, your Spring application can expose its functionality as both stdio and HTTP-based SSE endpoints.

You'll find several helpful examples in the spring-ai-examples repository - a good one to start with is the [Spring AI MCP Weather STDIO Server](https://github.com/spring-projects/spring-ai-examples/tree/main/model-context-protocol/weather/starter-stdio-server).

Also check out projects in the Spring ecosystem that have started to embrace MCP with specialized servers:

-   [Spring Batch MCP Server](https://github.com/fmbenhassine/spring-batch-lab/tree/main/sandbox/spring-batch-mcp-server) exposes batch processing operations, allowing AI assistants to query job status, view step details, and analyze metrics to optimize workflows.
-   [Spring Cloud Config MCP Server](https://github.com/ryanjbaxter/spring-cloud-config/tree/mcp-server) enables AI-accessible configuration management with tools to retrieve, update, and refresh configurations across environments and handle sensitive value encryption.

These servers bring Spring's enterprise capabilities into the growing MCP ecosystem

### [](#mcp-and-security)MCP and Security

It should come as no surprise that in an enterprise environment you want to have a measure of control over what data is presented to the LLM as context and what APIs are made available, especially those that modify data/state. The MCP spec addresses these concerns via OAuth. Spring Security and the Spring Authorization Server have got you covered. Spring Security Guru Daniel goes into detail into Securing MCP applications in his blog [MCP Authorization in practice with Spring AI and OAuth2](https://spring.io/blog/2025/05/19/spring-ai-mcp-client-oauth2).

## [](#agents)Agents

2025 is the year of the Agents.. The million-dollar question is 'define agent', well here is a shot at it :). At its core, an agent "leverages an AI model to interact with its environment in order to solve a user-defined task." Effective agents combine planning, memory, and actions to fulfill tasks assigned by users.

There are two broad categories of agents,

**Workflows** represent a more controlled approach where LLMs and tools are orchestrated through predefined paths. These workflows are prescriptive, guiding the AI through established sequences of operations to achieve predictable outcomes.

**Autonomous Agents**, by contrast, allow LLMs to autonomously plan and execute processing steps toward accomplishing tasks. These agents determine their own path, deciding which tools to use and in what order without explicit instruction.

While fully autonomous agents are appealing for their flexibility, workflows offer better predictability and consistency for well-defined tasks. The choice between these approaches depends on your specific requirements and risk tolerance.

### [](#workflow-driven-agents)Workflow Driven Agents

Spring AI supports several workflow patterns that structure agent behavior: In the diagram below, each llm box is the "augmented llm" diagram shown earlier.

1.  [**Evaluator Optimizer**](https://github.com/spring-projects/spring-ai-examples/tree/main/agentic-patterns/evaluator-optimizer) – The model analyzes its own responses and refines them through a structured process of self-evaluation.

![Augmented LLM](https://raw.githubusercontent.com/spring-io/spring-io-static/refs/heads/main/blog/tzolov/20250520/anthropic-augmented-llm-agents.png)

2.  [**Routing**](https://github.com/spring-projects/spring-ai-examples/tree/main/agentic-patterns/routing-workflow) – This pattern enables intelligent routing of inputs to specialized handlers based on classification of the user request and context.
    
3.  [**Orchestrator Workers**](https://github.com/spring-projects/spring-ai-examples/tree/main/agentic-patterns/orchestrator-workers) – This pattern is a flexible approach for handling complex tasks that require dynamic task decomposition and specialized processing
    
4.  [**Chaining**](https://github.com/spring-projects/spring-ai-examples/tree/main/agentic-patterns/chain-workflow) – The pattern decomposes complex tasks into a sequence of steps, where each LLM call processes the output of the previous one.
    
5.  [**Parallelization**](https://github.com/spring-projects/spring-ai-examples/tree/main/agentic-patterns/parallelization-worflow) – The pattern is useful for scenarios requiring parallel execution of LLM calls with automated output aggregation.
    

These patterns can be implemented using Spring AI's chat model and tool execution capabilities, with the framework handling much of the underlying complexity.

You can find out more in the [Spring AI Examples repository](https://github.com/spring-projects/spring-ai-examples/tree/main/agentic-patterns) and in the [Building Effective Agents](https://docs.spring.io/spring-ai/reference/api/effective-agents.html) section of our reference documentation.

### [](#autonomously-driven-agents)Autonomously Driven Agents

Spring AI also supports the development of autonomous agents through the Model Context Protocol. The incubating [Spring MCP Agent](https://github.com/tzolov/spring-mcp-agent) project demonstrates how to create agents that:

1.  Accept user instructions and autonomously determine the best approach
2.  Dynamically discover and utilize available tools through MCP
3.  Maintain an execution memory to track progress and decisions
4.  Recursively refine strategies based on outcomes

## [](#tanzu-ai-solutions-in-tanzu-platform)Tanzu AI Solutions in Tanzu Platform

[Tanzu AI Solutions](https://www.vmware.com/solutions/app-platform/ai) is available in Tanzu Platform 10 and above, and works best with Spring AI Apps:

-   **Enterprise-Grade AI Deployment**: Production-ready solution for deploying AI applications with enterprise-level security controls
-   **Simplified, Self-Service Model Access**: Streamlined access to AI models through unified marketplace with curated AI models
-   **Security and Governance**: AI middleware that enhances control with observability, token-based rate limiting, audit, metrics, logs, and journaling
-   **Scalable Infrastructure**: Built on Spring AI, the integration supports scalable deployment of AI applications while maintaining high performance

For more information about deploying AI applications with Tanzu AI Server, visit the [VMware Tanzu AI documentation](https://techdocs.broadcom.com/us/en/vmware-tanzu/platform-services/genai-on-tanzu-platform-for-cloud-foundry/10-0/ai-cf/reference-architecture.html) and for more information on building Agentic AI applications, checkout the blogs

Recommended Reading on Agentic AI

-   [**Agentic AI: A New AI Paradigm Driving Business Success** – Broadcom](https://news.broadcom.com/leadership/agentic-ai-a-new-ai-paradigm-driving-business-success)  
    Explores how agentic AI is redefining enterprise strategy by enabling autonomous decision-making, reducing friction, and driving business transformation.
    
-   [**AI Agents: Why Workflows Are the LLM Use Case to Watch** – VMware Tanzu](https://blogs.vmware.com/tanzu/ai-agents-why-workflows-are-the-llm-use-case-to-watch/)  
    Discusses why LLM-powered workflows represent a compelling real-world use case for AI agents, especially in enterprise software development and operations.
    

## [](#contributors)Contributors

It has been truly gratifying to see the level of interest from the community to not only use Spring AI but to contribute back to it. The entire team is deeply humbled by the experience. A big shoutout to - [Thomas Vitale (ThomasVitale)](https://github.com/ThomasVitale). He has driven core features such as `@Tools` and RAG among other great contributions and bug fixes. Bravo!

I've curated the list of contributors, it is long. I'd like to make a geo-map showing the many people from so many parts of the world. Thanks!

# [](#merged-contributors)Merged Contributors

-   [abel533](https://github.com/abel533)
-   [ahewer](https://github.com/ahewer)
-   [Ahoo Wang (Ahoo-Wang)](https://github.com/Ahoo-Wang)
-   [Aleks Seovic (aseovic)](https://github.com/aseovic)
-   [Alexandre Roman (alexandreroman)](https://github.com/alexandreroman)
-   [Alexandros Pappas (apappascs)](https://github.com/apappascs)
-   [alexcheng1982](https://github.com/alexcheng1982)
-   [Ana Maria Mihalceanu (ammbra)](https://github.com/ammbra)
-   [Anders Swanson (anders-swanson)](https://github.com/anders-swanson)
-   [Andres da Silva Santos (andresssantos)](https://github.com/andresssantos)
-   [ashni-mongodb](https://github.com/ashni-mongodb)
-   [Ashwin Krishna K](https://github.com/AshwinKrishnaK)
-   [Barsha Ghosh (barsha-ghosh721)](https://github.com/barsha-ghosh721)
-   [Bart Veenstra (bart.veenstra)](https://github.com/bart.veenstra)
-   [Beksultan (bmamatkadyr)](https://github.com/bmamatkadyr)
-   [Benoit Moussaud (bmoussaud)](https://github.com/bmoussaud)
-   [BeomSeogKim (BeomSeogKim)](https://github.com/BeomSeogKim)
-   [Berjan Jonker (berjanjonker)](https://github.com/berjanjonker)
-   [birariro (birariro)](https://github.com/birariro)
-   [BlackBean99](https://github.com/BlackBean99)
-   [bottlerocketjonny](https://github.com/bottlerocketjonny)
-   [Bruno Oliveira (bruno-oliveira)](https://github.com/bruno-oliveira)
-   [cboy (yuhangbin)](https://github.com/yuhangbin)
-   [cc0824 (cc0824)](https://github.com/cc0824)
-   [CChuYong (CChuYong)](https://github.com/CChuYong)
-   [Changho Kim (ohiomanbo)](https://github.com/ohiomanbo)
-   [Chengcheng Wu (AntonyCheng)](https://github.com/AntonyCheng)
-   [chenwei (codetheory)](https://github.com/codetheory)
-   [Cho-D-YoungRae](https://github.com/Cho-D-YoungRae)
-   [Christian Tzolov (tzolov)](https://github.com/tzolov)
-   [Claudio Silva Junior (Claudio-code)](https://github.com/Claudio-code)
-   [cocomongg](https://github.com/cocomongg)
-   [cosmin-ionita](https://github.com/cosmin-ionita)
-   [Craig Walls (habuma)](https://github.com/habuma)
-   [cyPark95](https://github.com/cyPark95)
-   [DadySu](https://github.com/DadySu)
-   [danvega](https://github.com/danvega)
-   [Dariusz Jędrzejczyk (chemicL)](https://github.com/chemicL)
-   [David Frizelle (dafriz)](https://github.com/dafriz)
-   [ddobrin (ddobrin)](https://github.com/ddobrin)
-   [deepakn27](https://github.com/deepakn27)
-   [Dennys Fredericci (dennysfredericci)](https://github.com/dennysfredericci)
-   [devcrocod (devcrocod)](https://github.com/devcrocod)
-   [devholic22](https://github.com/devholic22)
-   [diego (rusher)](https://github.com/rusher)
-   [Dimibe](https://github.com/Dimibe)
-   [dongfeng3692](https://github.com/dongfeng3692)
-   [dperezcabrera](https://github.com/dperezcabrera)
-   [dsyer](https://github.com/dsyer)
-   [Eddú Meléndez (eddumelendez)](https://github.com/eddumelendez)
-   [elmahdi43](https://github.com/elmahdi43)
-   [eltociear](https://github.com/eltociear)
-   [Emmanuel Ferdman (emmanuel-ferdman)](https://github.com/emmanuel-ferdman)
-   [Enrico Rampazzo (enrico.rampazzo)](https://github.com/enrico.rampazzo)
-   [Eray Ocak (threos)](https://github.com/threos)
-   [fing9](https://github.com/fing9)
-   [fjtorres-zerocopy](https://github.com/fjtorres-zerocopy)
-   [Flyingblu](https://github.com/Flyingblu)
-   [g00glen00b (g00glen00b)](https://github.com/g00glen00b)
-   [gabriel duncan (gabrielduncan)](https://github.com/gabrielduncan)
-   [Gareth Evans (garethjevans)](https://github.com/garethjevans)
-   [geetrawat](https://github.com/geetrawat)
-   [ghdcksgml1 (ghdcksgml1)](https://github.com/ghdcksgml1)
-   [gongzhongqiang (GOODBOY008)](https://github.com/GOODBOY008)
-   [GR (mxsl-gr)](https://github.com/mxsl-gr)
-   [Grogdunn](https://github.com/Grogdunn)
-   [hakusai22](https://github.com/hakusai22)
-   [He Qiang (1993heqiang)](https://github.com/1993heqiang)
-   [He-Pin (He-Pin)](https://github.com/He-Pin)
-   [Hu Shihao (Hushihaoooooo)](https://github.com/Hushihaoooooo)
-   [hungrytech (hungrytech)](https://github.com/hungrytech)
-   [hygl](https://github.com/hygl)
-   [Hyune-c](https://github.com/Hyune-c)
-   [HYUNSANG HAN (HyunSangHan)](https://github.com/HyunSangHan)
-   [iAMSagar44](https://github.com/iAMSagar44)
-   [Ignasi (ilopezluna)](https://github.com/ilopezluna)
-   [Ilayaperumal Gopinathan (ilayaperumalg)](https://github.com/ilayaperumalg)
-   [impactCn](https://github.com/impactCn)
-   [inpink (inpink)](https://github.com/inpink)
-   [Ivan97 (Ivan97)](https://github.com/Ivan97)
-   [ivy (Fj-ivy)](https://github.com/Fj-ivy)
-   [izeye](https://github.com/izeye)
-   [JabezBrew](https://github.com/JabezBrew)
-   [Jackie Gleason (jrgleason)](https://github.com/jrgleason)
-   [Jaeyeon Kim (jaeyeonling)](https://github.com/jaeyeonling)
-   [jakkaz](https://github.com/jakkaz)
-   [Jakub (jpomykala)](https://github.com/jpomykala)
-   [James Ward (jamesward)](https://github.com/jamesward)
-   [Jang990 (Jang990)](https://github.com/Jang990)
-   [JavaProgrammerLB](https://github.com/JavaProgrammerLB)
-   [JayPark7821](https://github.com/JayPark7821)
-   [Jemin Huh (JM-Lab)](https://github.com/JM-Lab)
-   [jiacheo](https://github.com/jiacheo)
-   [Jiseung Hyeon (jee14)](https://github.com/jee14)
-   [Jito Kim (jitokim)](https://github.com/jitokim)
-   [jo-kim](https://github.com/jo-kim)
-   [Jobmission (jobmission)](https://github.com/jobmission)
-   [John Blum (jxblum)](https://github.com/jxblum)
-   [John Silverman (jsilverman26)](https://github.com/jsilverman26)
-   [Jonas Muribø (jonasmuriboe)](https://github.com/jonasmuriboe)
-   [Jonatan Ivanov (jonatan-ivanov)](https://github.com/jonatan-ivanov)
-   [Jonghoon Park (dev-jonghoonpark)](https://github.com/dev-jonghoonpark)
-   [JongIn Won (JongInWon)](https://github.com/JongInWon)
-   [Josh Long (joshlong)](https://github.com/joshlong)
-   [Justin Martz (JustinMartz)](https://github.com/JustinMartz)
-   [jyami-kim](https://github.com/jyami-kim)
-   [KAMO030](https://github.com/KAMO030)
-   [Kimsunghyun1995 (kimsunghyun1995)](https://github.com/kimsunghyun1995)
-   [Kirboyyy](https://github.com/Kirboyyy)
-   [kirkster96](https://github.com/kirkster96)
-   [koloyyee](https://github.com/koloyyee)
-   [ktm (ktm)](https://github.com/ktm)
-   [Kushagra Thapar (kushagraThapar)](https://github.com/kushagraThapar)
-   [l-trotta](https://github.com/l-trotta)
-   [Lambochen (lambochen)](https://github.com/lambochen)
-   [Laurent Doguin (ldoguin)](https://github.com/ldoguin)
-   [Lee-ChungMu](https://github.com/Lee-ChungMu)
-   [leijendary (leijendary)](https://github.com/leijendary)
-   [lgxisbb](https://github.com/lgxisbb)
-   [Linar Abzaltdinov (linarkou)](https://github.com/linarkou)
-   [Liu Guodong (liugddx)](https://github.com/liugddx)
-   [LiujunjieALiling (smartliujunjie)](https://github.com/smartliujunjie)
-   [loiclefevre](https://github.com/loiclefevre)
-   [loveysuby](https://github.com/loveysuby)
-   [Lukas (Waischbrot)](https://github.com/Waischbrot)
-   [luocongqiu](https://github.com/luocongqiu)
-   [m3ss0](https://github.com/m3ss0)
-   [mackey0225](https://github.com/mackey0225)
-   [MagicalConch (git102347501)](https://github.com/git102347501)
-   [magicgone (magicgone-cn)](https://github.com/magicgone-cn)
-   [Manuel Andreo Garcia (magware-dev)](https://github.com/magware-dev)
-   [Mariusz Bernacki](https://github.com/didalgolab)
-   [Mark Heckler (mkheck)](https://github.com/mkheck)
-   [Mark Pollack (markpollack)](https://github.com/markpollack)
-   [Max Jiang (maxjiang153)](https://github.com/maxjiang153)
-   [mck (michaelsembwever)](https://github.com/michaelsembwever)
-   [Michael J. Simons (michael-simons)](https://github.com/michael-simons)
-   [MikeLaptev](https://github.com/MikeLaptev)
-   [Mikhail Mazurkevich (mmazurkevich)](https://github.com/mmazurkevich)
-   [Miloš Havránek (MilosHavranek)](https://github.com/MilosHavranek)
-   [Mohammed, Ahmed Yousri Salama](https://github.com/N/A)
-   [moon0cean](https://github.com/moon0cean)
-   [Mudabir Hussain (mudabirhussain)](https://github.com/mudabirhussain)
-   [muthuishere](https://github.com/muthuishere)
-   [ndoe (ndoe)](https://github.com/ndoe)
-   [Nermin Karapandzic (NerminKarapandzic)](https://github.com/NerminKarapandzic)
-   [Ngoc Nhan Tran (ngocnhan-tran1996)](https://github.com/ngocnhan-tran1996)
-   [nichozhan](https://github.com/nichozhan)
-   [Nicolas Krier (nicolaskrier)](https://github.com/nicolaskrier)
-   [Nikolai Kulagin (zzzadruga)](https://github.com/zzzadruga)
-   [nlinhvu (nlinhvu)](https://github.com/nlinhvu)
-   [ochnios](https://github.com/ochnios)
-   [Oganes Bozoyan (oganes.bozoyan)](https://github.com/oganes.bozoyan)
-   [omarmahamid](https://github.com/omarmahamid)
-   [PabloSanchi](https://github.com/PabloSanchi)
-   [Paoxia (paoxia)](https://github.com/paoxia)
-   [PARK-afk (PARK-afk)](https://github.com/PARK-afk)
-   [pavel (ppjgit)](https://github.com/ppjgit)
-   Peter Dolukhanov
-   [pgerhard](https://github.com/pgerhard)
-   [piotrooo](https://github.com/piotrooo)
-   [Poonam Parhar (poonamparhar)](https://github.com/poonamparhar)
-   [pradipkhomane](https://github.com/pradipkhomane)
-   [PSriVarshan (PSriVarshan)](https://github.com/PSriVarshan)
-   [rapenumaka](https://github.com/rapenumaka)
-   [Ricken Bazolo (ricken07)](https://github.com/ricken07)
-   [rivkode](https://github.com/rivkode)
-   [rmalara (rmalara)](https://github.com/rmalara)
-   [Robin Elysia (RobinElysia)](https://github.com/RobinElysia)
-   [rozza](https://github.com/rozza)
-   [rubin0](https://github.com/rubin0)
-   [samuel-taleez (krsamuel)](https://github.com/krsamuel)
-   [samzhu](https://github.com/samzhu)
-   [scionaltera](https://github.com/scionaltera)
-   [Seol-JY](https://github.com/Seol-JY)
-   [shahbazaamir (shahbazaamir)](https://github.com/shahbazaamir)
-   [Shishuiwuhen2009 (shishuiwuhen2009)](https://github.com/shishuiwuhen2009)
-   [shown (yuluo-yx)](https://github.com/yuluo-yx)
-   [skewgod](https://github.com/skewgod)
-   [Soby Chacko (sobychacko)](https://github.com/sobychacko)
-   [Solomon Hsu (solnone)](https://github.com/solnone)
-   [status2xx](https://github.com/status2xx)
-   [stefanvassilev](https://github.com/stefanvassilev)
-   [StudiousXiaoYu (StudiousXiaoYu)](https://github.com/StudiousXiaoYu)
-   [Sujin Kim (cowboysj)](https://github.com/cowboysj)
-   [Sun Yuhan (sunyuhan1998)](https://github.com/sunyuhan1998)
-   [swapy-27](https://github.com/swapy-27)
-   [Sylvain Blanc (LaSylv)](https://github.com/LaSylv)
-   [Sébastien Deleuze (sdeleuze)](https://github.com/sdeleuze)
-   [TarasVovk669](https://github.com/TarasVovk669)
-   [Temuu-jin (Temuu-jin)](https://github.com/Temuu-jin)
-   [tenthe](https://github.com/tenthe)
-   [TeslaCN (TeslaCN)](https://github.com/TeslaCN)
-   [The-Gamer-01 (The-Gamer-01)](https://github.com/The-Gamer-01)
-   [Theo van Kraay (TheovanKraay)](https://github.com/TheovanKraay)
-   [thesurlydev](https://github.com/thesurlydev)
-   [Thomas Vitale (ThomasVitale)](https://github.com/ThomasVitale)
-   [TimJ0212](https://github.com/TimJ0212)
-   [Timo Salm (timosalm)](https://github.com/timosalm)
-   [timotheekelly](https://github.com/timotheekelly)
-   [Toshiaki Maki (making)](https://github.com/making)
-   [turchinc](https://github.com/turchinc)
-   [Tyler Russell (terussell85)](https://github.com/terussell85)
-   [uzhuraul](https://github.com/uzhuraul)
-   [v891](https://github.com/v891)
-   [vbartacek](https://github.com/vbartacek)
-   [Viacheslav Dobrynin (viacheslav-dobrynin)](https://github.com/viacheslav-dobrynin)
-   [Victor Zalevski (VictorZZZZ)](https://github.com/VictorZZZZ)
-   [Vinay Balamuru (balamuru)](https://github.com/balamuru)
-   [Virle (geyingauv)](https://github.com/geyingauv)
-   [vker (91wangmeng)](https://github.com/91wangmeng)
-   [Vrryou](https://github.com/Vrryou)
-   [waileong (waileong)](https://github.com/waileong)
-   [Wandile (wandile-gim)](https://github.com/wandile-gim)
-   [Wang Lei (csuwl)](https://github.com/csuwl)
-   [wb04307201](https://github.com/wb04307201)
-   [Wenhao Ma (yangtuooc)](https://github.com/yangtuooc)
-   [Wenli Tian (jamespud)](https://github.com/jamespud)
-   [WonJun Lee (Lee-WonJun)](https://github.com/Lee-WonJun)
-   [wstever (wstever)](https://github.com/wstever)
-   [xieyucan](https://github.com/xieyucan)
-   [xsg22](https://github.com/xsg22)
-   [xuweidong (xuweidong253)](https://github.com/xuweidong253)
-   [Xwh (xwh1108)](https://github.com/xwh1108)
-   [Yanming Zhou (quaff)](https://github.com/quaff)
-   [ykoh42 (ykoh42)](https://github.com/ykoh42)
-   [yoobin\_mion (yybmion)](https://github.com/yybmion)
-   [youngmoneee](https://github.com/youngmoneee)
-   [Yufeng (Yufeng0918)](https://github.com/Yufeng0918)
-   [yulshi](https://github.com/yulshi)
-   [YunKui Lu (YunKuiLu)](https://github.com/YunKuiLu)
-   [zbqmgldjfh](https://github.com/zbqmgldjfh)
-   [zhangqian9158](https://github.com/zhangqian9158)
-   [Zhao Jianying (zhaojy01)](https://github.com/zhaojy01)
-   [Zhou Bo (cycle2zhou)](https://github.com/cycle2zhou)
-   [zlzzlzz2l](https://github.com/zlzzlzz2l)
-   [zucchivan](https://github.com/zucchivan)
-   [Łukasz Jernaś (deejay1)](https://github.com/deejay1)
-   [蕭洛 (799332391)](https://github.com/799332391)
-   [박준서 (junsepar)](https://github.com/junsepar)
-   [양예성 (yeseong0412)](https://github.com/yeseong0412)

AI merged the authors mentioned from the previous blogs, if I missed someone, I (and not the AI) apologize.

## [](#whats-next)What's next?

Spring AI 1.1 of course! Stay tuned!