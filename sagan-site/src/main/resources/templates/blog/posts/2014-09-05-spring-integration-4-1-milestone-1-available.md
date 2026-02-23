---
title: Spring Integration 4.1 Milestone 1 Available
source: http://spring.io/blog/2014/09/05/spring-integration-4-1-milestone-1-available
scraped: 2026-02-23T22:15:41.849Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  September 05, 2014 | 2 Comments
---

# Spring Integration 4.1 Milestone 1 Available

_Releases | Artem Bilan |  September 05, 2014 | 2 Comments_

Dear Spring community,

We are pleased to announce that Spring Integration 4.1 Milestone 1 has been released. Please use the [Milestone Repository](http://repo.springsource.org/milestone) with Maven or Gradle, download a [distribution archive](http://repo.spring.io/milestone/org/springframework/integration/spring-integration/4.1.0.M1), or see the project [home page](http://projects.spring.io/spring-integration) for links to the updated documentation, and Maven/Gradle configuration details.

The release includes some new features and further improvements, as well as a number of bug fixes, with the GA release due around the end of October.

Here is a summary of major changes:

**Spring Framework 4.1**

Spring Integration takes advantage of a number of new features in Spring Framework 4.1 and requires that release.

The changes include:

-   migration of additional Spring Integration APIs to the Core Spring Messaging module and the Spring Integration equivalents are deprecated

or removed to avoid confusion in the target applications;

-   a number of Messaging performance improvements have been included in Spring Framework 4.1.
    
-   Spring Framework 4.1 introduced the \[SpEL Compiler\]([http://docs.spring](http://docs.spring)
    

.io/spring/docs/current/spring-framework-reference/html/expressions.html#expressions-spel-compilation). It is very useful for Spring Integration, which extensively uses SpEL at runtime. You can enable the SpEL Compiler using the `spring.expression.compiler.mode` System Property with a value of `IMMEDIATE` or `MIXED`.

**WebSocket Adapters**

WebSocket Inbound and Outbound Channel Adapters have been introduced. They are built on the Spring WebSocket and Messaging foundation.

One of the key feature of WebSockets that it is a `streaming` protocol and from Java perspective it is based on the same API as from server side as well as from client side, so, we can build integration flows using similar components on both sides:

*Server side*

```java
Copy@Configuration
@EnableIntegration
public class ServerConfig {

	@Bean
	public ServerWebSocketContainer serverWebSocketContainer() {
		return new ServerWebSocketContainer("/ws").withSockJs();
	}

	@Bean
	public MessageProducer webSocketInboundChannelAdapter() {
		WebSocketInboundChannelAdapter webSocketInboundChannelAdapter = 
					new WebSocketInboundChannelAdapter(serverWebSocketContainer());
		webSocketInboundChannelAdapter.setOutputChannel(webSocketInputChannel());
		return webSocketInboundChannelAdapter;
	}

	@Bean
	@Transformer(inputChannel = "webSocketInputChannel", outputChannel = "webSocketOutputChannel")
	public ExpressionEvaluatingTransformer transformer() {
		return new ExpressionEvaluatingTransformer(PARSER.parseExpression("'Hello ' + payload"));
	}

	@Bean
	@ServiceActivator(inputChannel = "webSocketOutputChannel")
	public MessageHandler webSocketOutboundMessageHandler() {
		return new WebSocketOutboundMessageHandler(serverWebSocketContainer());
	}

}
```

*Client side*

```java
Copy@Configuration
@EnableIntegration
public class ClientConfig {
	@Bean
	public WebSocketClient webSocketClient() {
		return new SockJsClient(Collections.<Transport>singletonList(
						new WebSocketTransport(new JettyWebSocketClient())));
	}

	@Bean
	public IntegrationWebSocketContainer clientWebSocketContainer() {
		return new ClientWebSocketContainer(webSocketClient(), "ws://host:port/ws");
	}

	@Bean
	public MessageProducer webSocketInboundChannelAdapter() {
		WebSocketInboundChannelAdapter webSocketInboundChannelAdapter =
				new WebSocketInboundChannelAdapter(clientWebSocketContainer());
		webSocketInboundChannelAdapter.setOutputChannel(webSocketInputChannel());
		return webSocketInboundChannelAdapter;
	}

	@Bean
	@ServiceActivator(inputChannel = "webSocketOutputChannel")
	public MessageHandler webSocketOutboundMessageHandler() {
		return new WebSocketOutboundMessageHandler(clientWebSocketContainer());
	}

}
```

Another simple way to integrate with Spring WebSockets and STOMP sub-protocol but use integration flows to process requests and send responses is based on `@MessageMapping` annotation, but on the `@MessagingGateway` interface:

```java
Copy@MessagingGateway
@Controller
public interface WebSocketGateway {

	@MessageMapping("/greeting")
	@SendToUser("/queue/answer")
	@Gateway(requestChannel = "greetingChannel")
	String greeting(String payload);

}
```

**Reactor support**

The `Promise<?>` Gateway has been added to support [Project Reactor](https://github.com/reactor/reactor/wiki). Now Spring Integration message flows can be used as a part of `Reactive Streams`:

```java
Copy@MessagingGateway(reactorEnvironment = "reactorEnv")
public interface PromiseGateway {

	@Gateway(requestChannel = "promiseChannel")
	Promise<Integer> multiply(Integer value);

}

	    ...

@ServiceActivator(inputChannel = "promiseChannel")
public Integer multiply(Integer value) {
	return value * 2;
}

		...

Streams.defer(Arrays.asList("1", "2", "3", "4", "5"))
	.env(this.environment)
	.get()
	.map(Integer::parseInt)
	.mapMany(integer -> promiseGateway.multiply(integer))
	.collect()
	.consume(integers -> ...)
	.flush();
```

In addition, support of Spring Framework `ListenableFuture<?>` gateway method return types has been added.

**Boon JSON mapper**

The [Boon](https://github.com/RichardHightower/boon/wiki) `JsonObjectMapper` implementation has been added for the JSON Transformers. Boon has been shown to have better JSON mapping performance than Jackson. It is enabled in Spring Integration automatically by detection of its jar in the classpath.

**Splitter Iterator**

`<splitter>`s now can return `Iterator<?>` and `Iterable<?>` as a `payload` to achieve `streaming` behaviour, when each item is emitted as reply message using `Iterator.next()`.

In addition we have released two maintenance versions [3.0.5](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10121&version=14666) and [4.0.4](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10121&version=14665). It's strongly recommended to upgrade to the latest versions as they include some critical fixes.

**Wrapping up**

For a complete list of changes refer to the [release notes](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10121&version=14513), [What's New](http://docs.spring.io/spring-integration/docs/4.1.0.M1/reference/html/whats-new.html) and [Java Docs](http://docs.spring.io/spring-integration/docs/4.1.0.M1/api) of the new components.

Don't miss, of course, the [Migration Guild](https://github.com/spring-projects/spring-integration/wiki/Spring-Integration-4.0-to-4.1-Migration-Guide).

We look forward to your comments and feedback ([StackOverflow](http://stackoverflow.com) (`spring-integration` tag), [Spring JIRA](https://jira.spring.io/browse/INT)) as soon as possible and report issues you find before we GA towards over a couple months.

**SpringOne 2GX 2014**

Some of those mentioned topics are being covered at SpringOne next week. Please attend \[Gary Russell's Session\] ([https://2014.event.springone2gx.com/schedule/sessions/spring\_integration\_java\_configuration\_and\_more.html](https://2014.event.springone2gx.com/schedule/sessions/spring_integration_java_configuration_and_more.html)) to learn more about these and other Spring Integration improvements added in the last 12 months.