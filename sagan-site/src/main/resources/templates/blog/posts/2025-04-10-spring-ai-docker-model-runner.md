---
title: Spring AI with Docker Model Runner
source: https://spring.io/blog/2025/04/10/spring-ai-docker-model-runner
scraped: 2026-02-23T07:47:17.970Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  April 10, 2025 | 0 Comments
---

# Spring AI with Docker Model Runner

_Releases | Mark Pollack |  April 10, 2025 | 0 Comments_

> This blog post is authored by [Eddú Meléndez](https://github.com/eddumelendez).

Docker recently [released a Model Runner in Docker Desktop for Mac 4.40.0](https://www.docker.com/blog/docker-desktop-4-40/) on Apple silicon. The Docker Model Runner provides a local Inference API designed to be compatible with the OpenAI API, enabling easy integration with [Spring AI](https://docs.spring.io/spring-ai/reference/api/chat/dmr-chat.html) as part of the Spring AI 1.0.0-M7 release. Models are distributed as standard OCI artifacts on Docker Hub under the [ai namespace](https://hub.docker.com/u/ai).

## [](#prerequisites)Prerequisites

-   Download Docker Desktop for Mac 4.40.0.
    
-   Choose one of the following options to enable the Model Runner:
    
    Option 1:
    
-   Enable Model Runner \`docker desktop enable model-runner --tcp 12434\`.
    
-   Set the base-url to \`[http://localhost:12434/engines\\\`](http://localhost:12434/engines%5C%60)
    
    Option 2:
    
-   Enable Model Runner \`docker desktop enable model-runner\`.
    
-   Use [Testcontainers](https://testcontainers.com/) and set the base-url as follows:
    

```java
Copy@Container
private static final SocatContainer socat = new SocatContainer().withTarget(80, "model-runner.docker.internal");

@Bean
public OpenAiApi chatCompletionApi() {
	var baseUrl = "http://%s:%d/engines".formatted(socat.getHost(), socat.getMappedPort(80));
	return OpenAiApi.builder().baseUrl(baseUrl).apiKey("test").build();
}
```

Next, pull the model \`docker model pull ai/gemma3\` and confirm it is available locally \`docker model list\`

## [](#dependencies)Dependencies

Go to start.spring.io, select Spring Web, OpenAI and Testcontainers and generate the project.

The following dependencies must be listed

```
Copy<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
	<groupId>org.springframework.ai</groupId>
	<artifactId>spring-ai-openai-spring-boot-starter</artifactId>
</dependency>

<dependency>
	<groupId>org.springframework.ai</groupId>
	<artifactId>spring-ai-spring-boot-testcontainers</artifactId>
	<scope>test</scope>
</dependency>
```

Also, make sure the Spring AI BOM is present

```
Copy<dependencyManagement>
	<dependencies>
		<dependency>
			<groupId>org.springframework.ai</groupId>
			<artifactId>spring-ai-bom</artifactId>
			<version>${spring-ai.version}</version>
			<type>pom</type>
			<scope>import</scope>
		</dependency>
	</dependencies>
</dependencyManagement>
```

Configuring Spring AI

To use Docker Model Runner, we need to configure the OpenAI client to point to the right endpoint and use the model pulled earlier

For Option 1: Let’s configure the src/main/resources/application.properties

```
Copyspring.ai.openai.api-key=ignored
spring.ai.openai.base-url=http://localhost:12434/engines
spring.ai.openai.chat.options.model=ai/gemma3
```

For Option 2 (Using Testcontainers): Let’s go to \`TestcontainersConfiguration\`, define the SocatContainer bean and register the properties with \`DynamicPropertyRegistrar\` bean.

```java
Copy@TestConfiguration(proxyBeanMethods = false)
class TestcontainersConfiguration {

    @Bean
    SocatContainer socat() {
        return new SocatContainer(DockerImageName.parse("alpine/socat:1.8.0.1"))
                .withTarget(80, "model-runner.docker.internal");
    }
    
    @Bean
    DynamicPropertyRegistrar properties(SocatContainer socat) {
        return (registrar) -> {
            registrar.add("spring.ai.openai.base-url", () -> "http://%s:%d/engines".formatted(socat.getHost(), socat.getMappedPort(80)));
            registrar.add("spring.ai.openai.api-key", () -> "test-api-key");
            registrar.add("spring.ai.openai.chat.options.model", () -> "ai/gemma3");
        };
    }
}
```

## [](#chat-example)Chat example

Now, let’s create a simple controller

```java
Copy@RestController
public class ChatController {

    private final ChatClient chatClient;

    public ChatController(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    @GetMapping("/chat")
    public String chat(@RequestParam String message) {
        return this.chatClient.prompt()
                .user(message)
                .call()
                .content();
    }

   @GetMapping("/chat-stream")
    public Flux<String> chatStream(@RequestParam String message) {
        return this.chatClient.prompt()
                .user(message)
                .stream()
                .content();
    }

}
```

Run the application with \`./mvnw spring-boot:test-run\`

Using [httpie](https://httpie.io/), let’s call to the \`/chat\` endpoint

```
Copyhttp :8080/chat message=="tell me a joke"
```

We can also call to the \`/chat-stream\` endpoint

```
Copyhttp :8080/chat-stream message=="tell me a haiku about docker containers"
```

## [](#tool-example)Tool example

Docker Model Runner of course supports tool calling if used with a model that supports tool calling.

Create a \`FunctionCallConfig\` class and add a simple function

```java
Copy@Configuration(proxyBeanMethods = false)
class FunctionCallConfig {

    @Bean
    @Description("Get the stock price")
    public Function<MockStockService.StockRequest, MockStockService.StockResponse> stockFunction() {
        return new MockStockService();
    }

    static class MockStockService implements Function<MockStockService.StockRequest, MockStockService.StockResponse> {

        public record StockRequest(String symbol) {}
        public record StockResponse(double price) {}

        @Override
        public StockResponse apply(StockRequest request) {
            double price = request.symbol().contains("AAPL") ? 198 : 114;
            return new StockResponse(price);
        }
    }
    
}
```

Now, let’s register \`stockFunction\` function

```java
Copy@GetMapping("/stocks")
public String stocks(@RequestParam String message) {
    return this.chatClient.prompt()
            .user(message)
            .tools("stockFunction")
            .call()
            .content();
}
```

Run the application \`./mvnw spring-boot:test-run\` and call the \`/stocks\` endpoint

```
Copyhttp :8080/stocks message=="What's AAPL and NVDA stock price?"
```

The response should be something like \`AAPL stock price is 198.0 and NVDA stock price is 114.0.\` based on the hardcoded values we set.

## [](#references)References

-   # [](#introducing-docker-model-runner-httpswwwdockercomblogintroducing-docker-model-runner)Introducing Docker Model Runner [https://www.docker.com/blog/introducing-docker-model-runner/](https://www.docker.com/blog/introducing-docker-model-runner/)
    
-   Run LLMs Locally with Docker: A Quickstart Guide to Model Runner [https://www.docker.com/blog/run-llms-locally/](https://www.docker.com/blog/run-llms-locally/)
    
-   Docker Model Runner docs [https://docs.docker.com/desktop/features/model-runner/](https://docs.docker.com/desktop/features/model-runner/)
    
-   Spring AI Docker Model Runner Example [https://github.com/eddumelendez/spring-ai-dmr](https://github.com/eddumelendez/spring-ai-dmr)
    

## [](#conclusion)Conclusion

Docker Model Runner allows you to iterate faster, stay local and access an OpenAI-compatible API. It streamlines the development experience by enabling seamless integration with Spring AI’s OpenAI module, letting developers stay within their familiar inner-loop tooling. This empowers teams to build and test AI applications at their own pace—locally, securely, and efficiently. In the future, integration with Testcontainers will make it even easier to pull and run models on demand, further simplifying setup and testing workflows.Docker Model Runner allows you to iterate faster, stay local and access an OpenAI-compatible API. It streamlines the development experience by enabling seamless integration with Spring AI’s OpenAI module, letting developers stay within their familiar inner-loop tooling. This empowers teams to build and test AI applications at their own pace—locally, securely, and efficiently.