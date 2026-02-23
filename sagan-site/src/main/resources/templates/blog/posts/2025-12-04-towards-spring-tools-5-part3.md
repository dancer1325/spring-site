---
title: Towards Spring Tools 5 - Ready for AI
source: https://spring.io/blog/2025/12/04/towards-spring-tools-5-part3
scraped: 2026-02-22T22:07:17.654Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Martin Lippert |  December 04, 2025 | 0 Comments
---

# Towards Spring Tools 5 - Ready for AI

_Engineering | Martin Lippert |  December 04, 2025 | 0 Comments_

There is no doubt that AI-based coding assistants are already or will be widely used by developers and within organizations. While the overall outlook is pretty certain, the exact way when and how to use those tools might vary, ranging from extensions for existing IDEs (e.g. Copilot for Visual Studio Code) to entirely AI-focused environments (e.g. Cursor) or pure command-line interfaces (e.g. Claude Code).

The upcoming new major version 5 of the Spring Tools is ready for this new era in two different dimensions:

-   we make sure that you can install and use the Spring Tools in as many AI-extended or AI-focused environments as possible, enhancing your AI-powered developer experience with the traditional Spring support that the Spring Tools bring to the table (ranging from specific validations, quick fixes, quick navigation and understanding, and more).
-   we integrate the Spring Tools with the surrounding AI-powered environment to improve the AI coding experience itself.

## [](#spring-tools-in-ai-coding-environments)Spring Tools in AI coding environments

How do we integrate the Spring Tools with the surrounding AI assistant? The first things that will jump to your eye are very specific, carefully crafted, and AI-backed actions showing up in the code. Those actions use predefined prompts, mix them with the code at hand, and allow you to quickly hand them over to the AI assistant.

For example, when you use database query statements in your Spring Data query annotations, a codelens enables you to quickly let the AI assistant explain the query statement in all the details. The same appears in code for SpEL expressions or pointcut expressions. They all can be quickly handed over to the AI assistant for a detailed explanation.

![Explain Query SQL statement with AI](https://static.spring.io/blog/mlippert/20251204/01-explain-query-with-ai.png)

Another example of a pre-defined AI action appears when you use static methods to define web routes in a functional style. The codelens then allows you to switch to the newer builder pattern to define those routes by asking the AI assistant to create the necessary changes for you.

![Convert webflux route definition to builder pattern with AI](https://static.spring.io/blog/mlippert/20251204/02-convert-to-builder-pattern-with-ai.png)

## [](#support-for-agentic-coding)Support for agentic coding

Pre-defined actions are - of course - nice and handy, but also limited and very specific. If you are all in on agentic coding in your AI-powered environment, the Spring Tools help you with that as well.

Spring Tools 5 comes with an embedded MCP server that you can connect to your coding agent (like a typical MCP server). Once the embedded MCP server is connected, it will provide the coding agent with additional information about the projects in your workspace, including the resolved classpath, the version of Spring Boot that each project uses, detailed information about the beans you defined in your source code and their dependencies, the defined components together with their stereotypes, and more.

All these Spring insights will help the coding agent to work on your Spring projects in a more precise and efficient way.

## [](#configuration)Configuration

The embedded MCP server is an experimental feature at the moment, so you have to enable it explicitly in the preferences (in the “AI” section of the Spring Tools preferences). Once you enable it (and restart your IDE or editor), you can configure your AI coding assistant to use the MCP server. The exact mechanics of this configuration depends on the AI coding assistant that you use, do please refer to the documentaton and help for your environment here. Usually, it boils down to add an entry to some MCP json configuration file. If so, you can use this snippet for the Spring Tools MCP server:

```json
Copy"spring-tools-mcp": {
    "url": "http://localhost:50627/sse",
    "type": "http"
}
```

Unlike other MCP servers, the Spring Tools MCP server is not started on demand by the AI assistant, but runs inside of the Spring Tools language server process, so that AI assistants can connect to the running MCP server using HTTP.

## [](#supported-ai-assistants)Supported AI assistants

As a starting point, the Spring Tools will recognize and automatically use one of these AI coding assistants and environments:

-   Cursor
-   GitHub Copilot for Visual Studio Code
-   GitHub Copilot for Eclipse

Following our overall strategy to make you as productive as possible when working on Spring applications in the coding environment of your choice, we do not require you to use a specific AI coding assistant. You should choose the environment that fits best your needs, and add the Spring Tools to it to make your coding environment even more powerful.

In case you prefer a CLI-based AI assistant, you can configure that to use the MCP server of the Spring Tools as well. But you need to keep in mind that the Spring Tools MCP server runs inside of the Spring Tools and gets its information from the surrounding IDE. This means that you can’t use the Spring Tools MCP server in an isolated way. You have to have your project opened in your Spring Tools powered IDE in parallel in order to use the embedded MCP server together with your CLI based AI assistant - or use the CLI based AI assistant from the terminal right inside your IDE.

One note to avoid confusion: The Spring Tools project does not ship its own large language model and does not require you to authenticate against a specific LLM provider. The integration happens purely via the existing AI coding assistants that you have configured in one of the above mentioned environments.

## [](#we-are-looking-for-your-feedback)We are looking for your feedback

This landscape is an extremely fast changing environment. New AI-powered coding tools emerge almost on a daily basis and the Spring Tools integration with AI tools is just the starting point. Let us know if you find this useful, whether you are missing a specific environment from this list of supported AI tools above, how you use AI-powered tools to boost your experience implementing Spring applications, and let us know if you have any feedback and/or suggestions in this space. Your feedback is more than welcome.

## [](#looking-forward)Looking forward

If you want to try the latest release candidates of Spring Tools 5, please go to the [tools preview page](https://spring.io/tools5) or switch to the pre-releases of the extensions in Visual Studio Code.

This wraps up the three part series around the upcoming Spring Tools 5 release:

-   [Towards Spring Tools 5 - Ready for Boot 4 and Framework 7](https://spring.io/blog/2025/11/24/towards-spring-tools-5-part1)
-   [Towards Spring Tools 5 - Stereotypes and a new Structural View](https://spring.io/blog/2025/11/28/towards-spring-tools-5-part2)
-   [Towards Spring Tools 5 - Ready for AI](https://spring.io/blog/2025/12/04/towards-spring-tools-5-part3)

Next up is the release of the Spring Tools version 5.0.0 GA on Dec 10. See you there.