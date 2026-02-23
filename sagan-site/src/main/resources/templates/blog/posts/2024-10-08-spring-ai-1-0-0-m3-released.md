---
title: Spring AI 1.0.0 M3 Released
source: https://spring.io/blog/2024/10/08/spring-ai-1-0-0-m3-released
scraped: 2026-02-23T08:13:28.077Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  October 08, 2024 | 0 Comments
---

# Spring AI 1.0.0 M3 Released

_Releases | Mark Pollack |  October 08, 2024 | 0 Comments_

We are happy to announce the 1.0.0 Milestone 3 release of Spring AI.

This release brings significant enhancements and new features across various areas.

## [](#observability)Observability

This release introduces many refinements to the observability stack, particularly for streaming responses from Chat Models. Many thanks to Thomas Vitale and Dariusz Jedrzejczyk for all their help in this area!

Observability covers the ChatClient, ChatModel, Embedding Models and Vector stores enabling you to view all touchpoints with your AI infrstructure in fine grained detail..

In the M2 release we introduced observability support for OpenAI, OIlama, Mistral and Anthropic models. Now we have expanded this to include support for

-   Azure OpenAI
-   Google Vertex AI
-   Transformers (ONNX)
-   MiniMax
-   Moonshot
-   Baidu QianFan
-   Zhipu AI

Thanks to Geng Rong for implementing observability to the Chinese models.

You can find more detailed information on the available metrics and traces that are available in the [observability reference documentation](https://docs.spring.io/spring-ai/reference/observabilty/index.html). Here are some graphs to demonstrate what's possible.

### [](#grafana-dashboard)Grafana Dashboard

![Grafana Dashboard](https://static.spring.io/blog/contentful/20240923/grafana-spring-ai.png)

### [](#tracing-dashboard)Tracing Dashboard

![Tempo Dashboard](https://static.spring.io/blog/contentful/20240923/tempo-spring-ai.png)

## [](#advisor-improvements)Advisor Improvements

[Spring AI Advisors](https://docs.spring.io/spring-ai/reference/api/advisors.html) are components that intercept and potentially modify the flow of chat-completion requests and responses in your AI applications. Advisors can also choose to block the request by not making the call to invoke the next advisor in the chain.

The key player in this system is the AroundAdvisor, which allows developers to dynamically transform or utilize information within these interactions.

The main benefits of using Advisors include:

-   **Encapsulation of Recurring Tasks:** Package common GenAI patterns into reusable units.
-   **Transformation:** Augment data sent to Language Models (LLMs) and format responses sent back to clients.
-   **Portability:** Create reusable transformation components that work across various models and use cases.

We have revisited the Advisor API model and made many design changes and improved it's ability to apply to streaming request and responses. You can also explicitly define the order of the advisor's using Spring's `Ordered` interface.

Depending on what areas of the API you have used, there can be breaking changes, see the [docs](https://docs.spring.io/spring-ai/reference/api/advisors.html#_breaking_api_changes) for more details.

The flow of the around advisor is depicted below.

![Advisor Flow](https://static.spring.io/blog/contentful/20240923/spring-ai-advisors-flow.svg)

You can read Christian Tzolov's recent blog [Supercharging Your AI Applications with Spring AI Advisors](https://spring.io/blog/2024/10/02/supercharging-your-ai-applications-with-spring-ai-advisors) for more detials.

## [](#function-calling-improvements)Function calling improvements

Spring AI now supports passing additional contextual information to function callbacks through a `ToolContext` class that contains key-value pairs. This feature allows you to provide extra data that can be used within the function execution.

In this example we are passing in a `sessionId`, so that the context is aware of that value:

```
CopyString content = chatClient.prompt("What's the weather like in San Francisco, Tokyo, and Paris?")
    .functions("weatherFunctionWithContext")
    .toolContext(Map.of("sessionId", "123"))
    .call()
    .content();
```

Also note that you can pass the user text in the `prompt` method as an alternative to using the `user` method.

The `ToolContext` is available by using a java.util.BiFunction. Here is the bean definition:

```
Copy@Bean
@Description("Get the weather in location")
public BiFunction<WeatherService.Request, ToolContext, WeatherService.Response> weatherFunctionWithContext() {
    return (request, toolContext) -> {
        String sessionId = (String) toolContext.getContext().get("sessionId");

        // use session id as appropriate...
        System.out.println(sessionId);

        return new WeatherService().apply(request);
    };
}
```

## [](#fine-grained-control-over-function-calling)Fine grained control over function calling

If you prefer to handle the function calling conversation yourself, you can set the `proxyToolCalls` option.

```
CopyPortableFunctionCallingOptions functionOptions = FunctionCallingOptions.builder()
    .withFunction("weatherFunction")
    .withProxyToolCalls(true)
    .build();
```

And passing these optionsa call to the model via a ChatModel or ChatClient will return a ChatResponse that contains the first message sent at the start of the AI model’s function calling conversation.

## [](#fact-based-evaluation)Fact-based Evaluation

There have been some notable innovations in the area of factual evaluation with a new leaderboard named [LLM-AggreFact](https://llm-aggrefact.github.io/). A model currently leading the benchmark is “bespoke-minicheck” developed by [Bespoke Labs](https://bespokelabs.ai/). Part of what makes this model compelling is that is much smaller and cheaper to run as compared to so called “flagship” models such as GPT4o. You can read more into the research behind this model in the paper “[MiniCheck: Efficient Fact-Checking of LLMs of Grounding Documents](https://arxiv.org/pdf/2404.10774).

The Spring AI FactCheckingEvaluator is based on that work and can be used with the [Bespoke-minicheck model deployed on Ollama](https://ollama.com/blog/reduce-hallucinations-with-bespoke-minicheck). See the [documentation](https://docs.spring.io/spring-ai/reference/api/testing.html#_factcheckingevaluator) for more information. Thanks to Eddú Meléndez for his work in this area.

## [](#embedding-model-batch-processing)Embedding Model Batch Processing

Previously, embedding a list of documents required making calls item by item, which was not very performant. Spring AI now supports batching multiple documents together so that multiple embeddings can be computed in a single call to the model. Since embedding models have token limits, documents are grouped such that each batch doesn't exceed the token limit for the embedding model.

The new class TokenCountingBatchingStrategy takes into account the token size and allocates a 10% reserve buffer, as token estimation isn't an exact science. You can customize your own implementations of the BatchingStrategy interface.

Additionally, JDBC-based embedding models can now more easily customize the batch size to use when doing bulk inserts.

Thanks to Soby Chacko for his work in this area and other contributions as a new member of the Spring AI team.

## [](#some-model-providers-specific-details)Some model providers specific details

Azure AI

-   Added Observability
-   Fixed streaming responses
-   Enabled custom HTTP headers
-   Added previously missing calling options

Vertex AI

-   Added Observability
-   Added support for Google Search as a tool
-   Implemented retry support

## [](#general-improvements)General improvements

Many refactoring, bug fixing, documentation enhancements across the board by a wide range of contributors. If we haven’t gotten to your PR yet, we will, please be patient. Thanks to

-   [Mudabir Hussain (mudabirhussain)](https://github.com/mudabirhussain)
-   [Laura Trotta (l-trotta)](https://github.com/l-trotta)
-   [Jang990 (Jang990)](https://github.com/Jang990)
-   [ktm (ktm)](https://github.com/ktm)
-   [Eray Ocak (threos)](https://github.com/threos)
-   [claudio-code (Claudio-code)](https://github.com/Claudio-code)
-   [Fu Cheng (alexcheng1982)](https://github.com/alexcheng1982)
-   [Craig Walls (habuma)](https://github.com/habuma)
-   [Hyune-c (Hyune-c)](https://github.com/Hyune-c)
-   [PARK-afk (PARK-afk)](https://github.com/PARK-afk)
-   [Anders Swanson (anders-swanson)](https://github.com/anders-swanson)
-   [Ricken Bazolo (ricken07)](https://github.com/ricken07)
-   [Ignasi (ilopezluna)](https://github.com/ilopezluna)
-   [Soby Chacko (sobychacko)](https://github.com/sobychacko)
-   [John Blum (jxblum)](https://github.com/jxblum)
-   [dafriz (dafriz)](https://github.com/dafriz)
-   [Eddú Meléndez (eddumelendez)](https://github.com/eddumelendez)
-   [PabloSanchi (PabloSanchi)](https://github.com/PabloSanchi)
-   [박준서 (junsepar)](https://github.com/junsepar)
-   [cboy (yuhangbin)](https://github.com/yuhangbin)
-   [ashni (ashni-mongodb)](https://github.com/ashni-mongodb)
-   [Bruno Oliveira (bruno-oliveira)](https://github.com/bruno-oliveira)
-   [Christian Tzolov (tzolov)](https://github.com/tzolov)
-   [Thomas Vitale (ThomasVitale)](https://github.com/ThomasVitale)
-   [Johnny Lim (izeye)](https://github.com/izeye)
-   Peter Dolukhanov
-   [inpink (inpink)](https://github.com/inpink)
-   [努力的小雨 (StudiousXiaoYu)](https://github.com/StudiousXiaoYu)