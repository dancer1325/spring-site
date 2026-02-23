---
title: Spring AI 1.0.0 M1 released
source: https://spring.io/blog/2024/05/30/spring-ai-1-0-0-m1-released
scraped: 2026-02-23T08:35:45.698Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  May 30, 2024 | ...
---

# Spring AI 1.0.0 M1 released

_Releases | Mark Pollack |  May 30, 2024 | ..._

We are happy to announce the 1.0.0 Milestone 1 release of Spring AI.

This release has the following new features an improvements.

# [](#chatclient-fluent-api)ChatClient Fluent API

The fluent API provides methods to construct a Prompt, which is then passed as input to the AI model. You create a `ChatClient` using the `ChatClient.Builder` object. You can obtain an auto-configured `ChatClient.Builder` from Spring Boot autoconfiguration or create one programmatically.

If you're familiar with other Spring client classes like `WebClient`, `RestClient`, and `JdbcClient`, this will feel familiar.

Here is a simple usage example

```
@RestController
class MyController {

    private final ChatClient chatClient;

    MyController(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    @GetMapping("/ai")
    String generation(String userInput) {
        return this.chatClient.prompt()
            .user(userInput)
            .call()
            .content();
    }
}
```

The `user` method sets the user text of the prompt. The `call` method invokes the AI model, offering various overloads to return a response. In this case, the `content` method returns a String.

You can also call the AI model reactively (using WebClient under the covers) as shown below.

```
Flux<String> output = chatClient.prompt()
    .user("Tell me a joke")
    .stream()
    .content();
```

A common use case is to return JSON from the call to the AI Model. This is made simple using the `entity` method.

```
record ActorFilms(String actor, List<String> movies) {
}

ActorFilms actorFilms = chatClient.prompt()
    .user("Generate the filmography for a random actor.")
    .call()
    .entity(ActorFilms.class);
```

You can specify default values, such as the system text, when creating a `ChatClient` in an `@Configuration` class. This separation of design time and runtime allows the runtime code to be minimal, requiring only property placeholder values. For example:

```
@Configuration
class Config {

    @Bean
    ChatClient chatClient(ChatClient.Builder builder) {
        return builder.defaultSystem("You are a friendly chat bot that answers question in the voice of a {voice}")
                .build();
    }

}

@RestController
class AIController {
	private final ChatClient chatClient
	AIController(ChatClient chatClient) {
		this.chatClient = chatClient;
	}
	@GetMapping("/ai")
	Map<String, String> completion(@RequestParam(value = "message", defaultValue = "Tell me a joke") String message, String voice) {
		return Map.of(
				"completion",
				chatClient.prompt()
						.system(sp -> sp.param("voice", voice))
						.user(message)
						.call()
						.content());
	}
}

```

There are many more options available. Explore the API in your IDE and refer to the documentation for more details.

A common pattern when calling an AI model with user text is to append or augment the prompt with contextual data. This is similar to aspect-oriented programming (AOP) advice, where method arguments can be modified before and after invocation. The Advisor in Spring AI allows you to specify this behavior around the AI model call.

This contextual data can be of different types, including:

-   Your own data: This is data the AI model hasn’t been trained on. Even if the model has seen similar data, the appended contextual data takes precedence in generating the response. The data is first retrieved from a vector store and then added to the prompt. The AI model then generates a response. This is known as the Retrieval Augmented Generation (RAG) pattern.
    
-   Conversational history: The chat model’s API is stateless. If you tell the AI model your name, it won’t remember it in subsequent interactions. Conversational history must be sent with each request to ensure previous interactions are considered when generating a response.
    

Assuming you have already loaded data into a `VectorStore`, you can perform Retrieval Augmented Generation (RAG) by providing an instance of `QuestionAnswerAdvisor` to the `ChatClient`.

```
ChatResponse response = ChatClient.builder(chatModel)
        .build().prompt()
        .advisors(new QuestionAnswerAdvisor(vectorStore, SearchRequest.defaults()))
        .user(userText)
        .call()
        .chatResponse();
```

The `ChatResponse` return value contains the generated content as well as other metadata about the request, such as how many token were used by the AI Model to generating the response.

There are also built-in Advisors for conversational history that store the conversation in-memory or in a vector store.

While the Advisor model is not the be-all and end-all of creating RAG applications, it provides significant additional functionality with just one line of code in your `ChatClient` calls. This simple, but powerful approach offers a lot of potential for further exploration.

# [](#evaluation)Evaluation

Often, people are so pleased with receiving a response from an AI model that sounds human-like that they assume it is accurate. Unfortunately, this is not always the case. Generative AI is prone to hallucination, meaning it can produce false information. Unless you are a domain expert, it can be difficult to distinguish fact from fiction.

Evaluators help solve this problem. You can use an AI model to assess whether the response from another AI model is accurate. We have only just started down this path with a simple `RelevancyEvaluator`, but even this basic tool has proven to be very helpful.

Here is a sample JUnit test you can use to invoke the RelevancyEvaluator after performing RAG.

@Test void testEvaluation() {

```
dataController.delete();
dataController.load();

String userText = "What is the purpose of Carina?";

ChatResponse response = ChatClient.builder(chatModel)
        .build().prompt()
        .advisors(new QuestionAnswerAdvisor(vectorStore, SearchRequest.defaults()))
        .user(userText)
        .call()
        .chatResponse();

var relevancyEvaluator = new RelevancyEvaluator(ChatClient.builder(chatModel));

EvaluationRequest evaluationRequest = new EvaluationRequest(userText,
        (List<Content>) response.getMetadata().get(QuestionAnswerAdvisor.RETRIEVED_DOCUMENTS), response);

EvaluationResponse evaluationResponse = relevancyEvaluator.evaluate(evaluationRequest);

assertTrue(evaluationResponse.isPass(), "Response is not relevant to the question");
```

}

Additional evaluators will be coming in 1.0 M2.

# [](#new-ai-models)New AI Models

Sevreal new models were added in 1.0 M1, thanks to all the contributors who helped in this effort.

-   Bedrock Anthropic Claude 3 - [ben-gineer](https://github.com/ben-gineer)
-   Watson AI - [PabloSanchi](https://github.com/PabloSanchi)
-   OpenAI Speech - [hemeda3](https://github.com/hemeda3)
-   Multi-modality support for OpenAI
-   AWS Bedrock claude3
-   MiniMax - [mxsl-gr](https://github.com/mxsl-gr)
-   ZhiPu - [mxsl-gr](https://github.com/mxsl-gr)
-   Azure Open AI image generation - [bmoussaud](https://github.com/bmoussaud)

# [](#updated-models)Updated Models

-   OpenAI - Support for GPT4o and Multimodality
-   Google Gemini Pro 1.5 pro, flash, etc.
-   Anthropic function calling
-   Ollama multimodality support
-   Improved streaming function calling support - [Grogdunn](https://github.com/Grogdunn)

# [](#new-vector-stores)New Vector Stores

-   Apache Cassandra - [michaelsembwever](https://github.com/michaelsembwever)
-   Elastic Search - [JM-Lab](https://github.com/JM-Lab)
-   MongoDB Atlas - [Kirbstomper](https://github.com/Kirbstomper)
-   SAP HanaDB - [rahulmitt](https://github.com/rahulmitt)

# [](#test-container-support)Test Container support

Spring AI provides Testcontainer support for starting a vector store database in [your tests](https://docs.spring.io/spring-ai/reference/1.0/api/testcontainers.html) or via [docker compose](https://docs.spring.io/spring-ai/reference/1.0/api/docker-compose.html) Thanks to [Eddú Meléndez Gonzales](https://github.com/eddumelendez) for this contribution.

# [](#general-improvements)General improvements

Many refactoring, bug fixing, documentation enhancements across the board by a wide range of contributors. If we haven’t gotten to your PR yet, we will, please be patient. Thanks to

[abel533](https://github.com/abel533), [pradipkhomane](https://github.com/pradipkhomane), [bottlerocketjonny](https://github.com/bottlerocketjonny), [mackey0225](https://github.com/mackey0225), [izeye](https://github.com/izeye), [lgxisbb](https://github.com/lgxisbb), [jakkaz](https://github.com/jakkaz), [yuluo-yx](https://github.com/yuluo-yx), [zhangqian9158](https://github.com/zhangqian9158), [ricken07](https://github.com/ricken07), [iAMSagar44](https://github.com/iAMSagar44), [youngmoneee](https://github.com/youngmoneee), [cosmin-ionita](https://github.com/cosmin-ionita), [koloyyee](https://github.com/koloyyee), [ThomasVitale](https://github.com/ThomasVitale), [PabloSanchi](https://github.com/PabloSanchi), [iAMSagar44](https://github.com/iAMSagar44), [MikeLaptev](https://github.com/MikeLaptev), [m3ss0](https://github.com/m3ss0), [alexcheng1982](https://github.com/alexcheng1982), [Hyune-c](https://github.com/Hyune-c), [zucchivan](https://github.com/zucchivan), [scionaltera](https://github.com/scionaltera), [JabezBrew](https://github.com/JabezBrew), [impactCn](https://github.com/impactCn), [dperezcabrera](https://github.com/dperezcabrera), [omarmahamid](https://github.com/omarmahamid), [tenthe](https://github.com/tenthe), [hygl](https://github.com/hygl), [Vrryou](https://github.com/Vrryou), [thesurlydev](https://github.com/thesurlydev), [jiacheo](https://github.com/jiacheo), [danvega](https://github.com/danvega), [izeye](https://github.com/izeye), [eltociear](https://github.com/eltociear), [vbartacek](https://github.com/vbartacek), [Grogdunn](https://github.com/Grogdunn), [samzhu](https://github.com/samzhu), [habuma](https://github.com/habuma), [devholic22](https://github.com/devholic22), [Dimibe](https://github.com/Dimibe), [deepakn27](https://github.com/deepakn27), [swapy-27](https://github.com/swapy-27), [ahewer](https://github.com/ahewer), [skewgod](https://github.com/skewgod)

# [](#example-app)Example app

An [example application](https://github.com/tzolov/playground-flight-booking) that covers retrieval augmented generation and function calling in the context of a chatbot for a Flight Booking agency.

# [](#next-steps)Next Steps

For M2, our focus is on a thorough design review of the APIs, expanding AI model type coverage, exploring the Advisor feature further, adding more Evaluators, and conducting thorough integration testing. We plan to release one RC after M2 and then go GA in about two months.