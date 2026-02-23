---
title: Spring Integration Java DSL 1.0 RC1 Released
source: http://spring.io/blog/2014/10/31/spring-integration-java-dsl-1-0-rc1-released
scraped: 2026-02-23T22:09:37.124Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  October 31, 2014 | 0 Comments
---

# Spring Integration Java DSL 1.0 RC1 Released

_Releases | Artem Bilan |  October 31, 2014 | 0 Comments_

Dear Spring community,

We are pleased to announce that soon after the [Spring Integration 4.1 Release Candidate](https://spring.io/blog/2014/10/27/spring-integration-4-1-rc1-released) the Spring Integration Java DSL 1.0 Release Candidate is now available. Please use the [Milestone Repository](http://repo.springsource.org/milestone) with Maven or Gradle, or download a [distribution archive](http://repo.spring.io/milestone/org/springframework/integration/spring-integration-java-dsl/1.0.0.RC1), to give it a spin.

See the project [home page](https://github.com/spring-projects/spring-integration-extensions/wiki/Spring-Integration-Java-DSL-Reference) for more information.

The release includes many new features and improvements, as well as a number of bug fixes. The GA release is planned for the middle of November.

Here is a summary of major changes since the [last milestone](https://spring.io/blog/2014/09/07/spring-integration-java-dsl-1-0-milestone-3-available):

**Refactoring and Breaking Changes**

While still supporting earlier Java versions, the Spring Integration Java DSL is primarily positioned for Java 8 and its Lambda support. We have removed several `functional interfaces` in favor of similar interfaces from Java 8: `Consumer<T>`, `Function<T, R>` etc. Of course, to support backward compatibility with older Java version we have implemented similar interfaces in the DSL source code. Users that are using the changed interfaces with with Java versions less than 8 will need to make changes to fix their compilation errors. For example:

From this:

```java
Copy.handle(Integer.class, (p, h) -> p * 2,
		new EndpointConfigurer<GenericEndpointSpec<ServiceActivatingHandler>>() {
				@Override
				public void accept(GenericEndpointSpec<ServiceActivatingHandler> spec) {
					spec.poller(Pollers.cron("7 * * * * ?"));
				}
		})
```

To this:

```java
Copy.handle(Integer.class, (p, h) -> p * 2,
		new Consumer<GenericEndpointSpec<ServiceActivatingHandler>>() {
				@Override
				public void accept(GenericEndpointSpec<ServiceActivatingHandler> spec) {
					spec.poller(Pollers.cron("7 * * * * ?"));
				}
		})
```

Of course if you use a Java 8 Lambda here, the code will not require changes:

```java
Copy.handle(Integer.class, (p, h) -> p * 2, e -> e.poller(Pollers.cron("7 * * * * ?")))
```

The `IntegrationFlows` now contains only `from(...)` methods. the `.fromFixedMessageChannel()` has been replaced with `.from(String messageChannelName, boolean fixedSubscriber)`.

In addition, to fix some package tangle issues, we have moved some classes to different packages.

**Method Scope Functions**

To simplify the code completion from an IDE and allow avoiding redundant searches for a desired `Namespace Factory` we added overloaded methods with `Function<T, R>` argument. For example these code snippets are equal:

```java
Copy.....
.channel(Amqp.pollableChannel(this.rabbitConnectionFactory)
							.queueName("amqpReplyChannel")
							.channelTransacted(true))
....
.channel(c -> c.amqpPollable(this.rabbitConnectionFactory)
							.queueName("amqpReplyChannel")
							.channelTransacted(true))
....
```

Where the `c` variable is the `Channel`'s "method-aggregator" object, which delegates to the appropriate `Namespace Factory`. Other similar Lambda methods are:

-   `IntegrationFlows.from(MessageSourcesFunction sources)`
-   `IntegrationFlows.from(MessageProducersFunction producers)`
-   `IntegrationFlows.from(MessagingGatewaysFunction gateways)`
-   `IntegrationFlowDefinition.handleWithAdapter(Function<Adapters, MessageHandlerSpec<?, H>> adapters)`
-   `EndpointSpec.poller(Function<PollerFactory, PollerSpec> pollers)`

**FunctionExpression**

Spring Integration has amazing Spring Expression Language (SpEL) support. Since the Java DSL is pure (eh!) Java, it does not really make sense to specify some business logic in a long String for an `expression` property. Being inspired by Java 8 Lambda support, and pursuing the aim of minimal changes we have introduced the `FunctionExpression` - an implementation of the SpEL `Expression` interface - which accepts a `Function<T, R>` and delegates to it on the each `getValue()`. Now, many components in the DSL provide `(Function<T, R> function)` methods as an alternative to the similar SpEL method. Here is an example for the `localFilename` property for the `FtpInboundFileSynchronizingMessageSource`:

With SpEL:

```java
Copy@Bean
public IntegrationFlow ftpInboundFlow() {
	return IntegrationFlows
			.from(s -> s.ftp(this.ftpSessionFactory)
							.remoteDirectory("ftpSource")
							.localFilenameExpression("payload.toUpperCase() + '.a'")
			.channel(c -> c.queue("ftpInboundResultChannel"))
			.get();
}
```

With Lambda:

```java
Copy@Bean
public IntegrationFlow ftpInboundFlow() {
	return IntegrationFlows
			.from(s -> s.ftp(this.ftpSessionFactory)
							.remoteDirectory("ftpSource")
							.localFilename(f -> f.toUpperCase() + ".a")))
			.channel(c -> c.queue("ftpInboundResultChannel"))
			.get();
}
```

Other interesting uses of the `FunctionExpression` are the `Enricher` and `HeaderEnricher`:

```java
Copy.enrich(e -> e.requestChannel("enrichChannel")
			.requestPayload(Message::getPayload)
			.propertyFunction("date", m -> new Date()))
```

The `FunctionExpression` also supports runtime type conversion as is done in the standard `SpelExpression`.

**SubFlows**

We have introduced `SubFlow` support for some `if...else` and `publish-subscribe` components. The simplest example is `.publishSubscribeChannel()`:

```java
Copy@Bean
public IntegrationFlow subscribersFlow() {
	return flow -> flow
			.publishSubscribeChannel(Executors.newCachedThreadPool(), s -> s
					.subscribe(f -> f
							.<Integer>handle((p, h) -> p / 2)
							.channel(c -> c.queue("subscriber1Results")))
					.subscribe(f -> f
							.<Integer>handle((p, h) -> p * 2)
							.channel(c -> c.queue("subscriber2Results"))))
			.<Integer>handle((p, h) -> p * 3)
			.channel(c -> c.queue("subscriber3Results"));
}
```

Of course the same result we can be achieved with separate `IntegrationFlow` `@Bean` definitions, but we hope you'll find the subflow style of logic composition useful.

Similar `publish-subscribe` subflow composition is provided by `.routeToRecipients()`.

Another example is `.discardFlow()` instead of `.discardChannel()` on `.filter()`.

`.route()` deserves special attention:

```java
Copy@Bean
public IntegrationFlow routeFlow() {
	return f -> f
			.<Integer, Boolean>route(p -> p % 2 == 0,
					m -> m.channelMapping("true", "evenChannel")
							.subFlowMapping("false", sf ->
									sf.<Integer>handle((p, h) -> p * 3)))
			.transform(Object::toString)
			.channel(c -> c.queue("oddChannel"));
}
```

The `.channelMapping()` continues to work as in regular `Router` mapping, but the `.subFlowMapping()` tied that subflow with main flow. In other words, any router's subflow returns to the main flow after `.route()`.

Similar "return-to-main-flow" subflow is supported by `.gateway()`:

```java
Copy@Bean
public IntegrationFlow gatewayFlow() {
        return f -> 
                   f.gateway("gatewayRequest", g -> g.errorChannel("gatewayError").replyTimeout(10L))
			.gateway(gf -> gf.transform("From Gateway SubFlow: "::concat));
}
```

However this Gateway SubFlow is just wired with main flow through the explicit `DirectChannel` and wrapped to the regular `GatewayMessageHandler` using that channel as a `requestChannel` option.

Of course, subflows can be nested with any depth, but we don't recommend to do that because, in fact, even in the router case, adding complex subflows within a flow would quickly begin to be difficult for a human to parse.

**Conclusion**

We haven't added more `protocol specific adapters` since the last milestone. Not all adapters will be supported directly by the DSL although the most commonly used ones have first class support. However, those that don't have first class support can easily be wired in using `.handle()`. As we have discussed previously, we are looking for input to prioritize the implementations of the remaining adapters so, don't be shy to share your thoughts and ideas!

You can obtain more information about these and existing classes from their [source code](https://github.com/spring-projects/spring-integration-extensions/tree/master/spring-integration-java-dsl) and from [Reference Manual](https://github.com/spring-projects/spring-integration-extensions/wiki/Spring-Integration-Java-DSL-Reference).

We look forward to your comments and feedback ([StackOverflow](http://stackoverflow.com) (`spring-integration` tag), [Spring JIRA](https://jira.spring.io/browse/INTEXT), [GitHub](https://github.com/spring-projects/spring-integration-extensions/issues)) as soon as possible and report issues you find before we GA towards over a couple weeks.

As always, we very much welcome [contributions](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.md).