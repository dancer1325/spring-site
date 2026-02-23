---
title: Spring Integration Java DSL Milestone 2 Released
source: https://spring.io/blog/2014/06/18/spring-integration-java-dsl-milestone-2-released
scraped: 2026-02-23T22:15:58.772Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  June 18, 2014 | 0 Comments
---

# Spring Integration Java DSL Milestone 2 Released

_Releases | Artem Bilan |  June 18, 2014 | 0 Comments_

We are pleased to announce the release of the **Second Milestone of the Java DSL extension for [Spring Integration](http://projects.spring.io/spring-integration)**!

The `org.springframework.integration:spring-integration-java-dsl:1.0.0.M2` artifact is available from the [Spring IO Milestone Repository](http://repo.spring.io/libs-milestone).

Milestone 2 includes several bug fixes, some new features and further improvements.

Thank you to all who tried milestone 1, provided feedback, raised issues, and shared their thoughts.

Here is a summary of major changes since [Milestone 1](https://spring.io/blog/2014/05/08/spring-integration-java-dsl-milestone-1-released):

**Lambda Handler**

As you may have noticed, the use of Java 8 Lambdas is the power tool to make this DSL convenient and readable. One community request we received was to allow the declaration of a Lambda for the `.handle()` EIP-method instead of having to declare a POJO and use it as a method invocation. But one concern was to not lose "runtime type conversion". However, you [can't get the generic type for Lambdas](http://stackoverflow.com/questions/23865950/java-get-actual-type-of-generic-method-with-lambda-parameter). After some investigation we found the solution by additing a `type` argument. Hence, several new methods have been added to the `IntegrationFlowBuilder`:

```java
Copy
<P> IntegrationFlowBuilder handle(GenericHandler<P> handler)

<P> IntegrationFlowBuilder handle(GenericHandler<P> handler,
		EndpointConfigurer<GenericEndpointSpec<ServiceActivatingHandler>> endpointConfigurer) 

<P> IntegrationFlowBuilder handle(Class<P> payloadType, GenericHandler<P> handler)

<P> IntegrationFlowBuilder handle(Class<P> payloadType, GenericHandler<P> handler,
		EndpointConfigurer<GenericEndpointSpec<ServiceActivatingHandler>> endpointConfigurer)

```

If you use the method variant with explicit `payloadType` argument and `handler` is a Lambda, the last argument will be wrapper to the `LambdaMessageProcessor` with a `ConversionService`. And the message `payload` will be converted to the appropriate `type` at runtime. With that, we achieve better loose coupling. Here is a simple sample to demonstrate:

```java
Copy@Bean
public IntegrationFlow integerFlow() {
	return IntegrationFlows.from("input")
			.<byte[], String>transform(p - > new String(p, "UTF-8"))
			.handle(Integer.class, (p, h) -> p * 2)
			.get();
}
```

The `ConversionService` prevents a `ClassCastException: String cannot be cast to Integer`.

The same additional type argument has been added to other EIP-methods with Lambdas: `.transform()`, `.filter()`, `.split()` etc.

**Transformers Factory**

The convenient, fluent `Transformers` factory has been added to be used as inline target object definition within `.transform()` EIP-method:

```java
Copy@Bean
public IntegrationFlow transformFlow() {
	return IntegrationFlows.from("input")
			.transform(Transformers.xpath("/root/myJson", XPathEvaluationType.STRING_RESULT))
			.transform(Transformers.fromJson(MyPojo.class))
			.transform(Transformers.serializer())
			.get();
}
```

It avoids inconvenient coding using setters and makes the flow definition more straightforward. Note that `Transformers` can be use to declare target `Transformer`s as `@Bean`s and, again, use them from `IntegrationFlow` definition. Nevertheless, the DSL parser takes care about bean declarations for inline objects, if they aren't defined as beans yet.

**.gateway() EIP-method**

Because the `IntegrationFlow` definition looks similar to a `<chain>` from Spring Integration XML, we have introduced the `.gateway()` EIP-method, which plays the same role as `<gateway>` within a `<chain>` - sending a message to the `requestChannel` of some another message flow and waiting for the result from its `replyChannel`, or `TemporaryReplyChannel` by default:

```java
Copy@Bean
@DependsOn("gatewayRequestFlow")
public IntegrationFlow gatewayFlow() {
	return IntegrationFlows.from("gatewayInput")
			.gateway("gatewayRequest", g -> g.errorChannel("gatewayError").replyTimeout(10L))
			.get();
}

@Bean
public IntegrationFlow gatewayRequestFlow() {
	return IntegrationFlows.from("gatewayRequest")
			.filter("foo"::equals, f -> f.throwExceptionOnRejection(true))
			.<String, String>transform(String::toUpperCase)
			.get();
}
```

**Protocol-specific Adapters**

Of course, much of Spring Integration's value is provided by interaction with some external system, where Protocol Adapters provide that functionality. With Spring Integration Java DSL, we can continue to use generic bean definitions (`@Bean`) for any end-system adapter (e.g. `MarshallingWebServiceInboundGateway`), but the intent of the DSL is to provide a higher-level API to declare components in a similar manner to that provided by Spring Integration XML configuration.

Since you now are familiar with our `Builder` and `Lambda` capabilities, we build upon those techniques. Classes have been introduced with a set of static methods to delegate to some underlying `IntegrationComponentSpec<S, P>` implementation. The classes can be considered "Namespace Factories", because they play the same role as XML namespace for components from the concrete protocol-specific Spring Integration modules. Currently, Spring Integration Java DSL supports only `Amqp` and `Jms` namespace factories:

```java
Copy@Bean
public IntegrationFlow amqpFlow() {
	return IntegrationFlows.from(Amqp.inboundGateway(this.rabbitConnectionFactory, queue()))
			.transform("hello "::concat)
			.transform(String.class, String::toUpperCase)
			.get();
}

@Bean
public IntegrationFlow amqpOutboundFlow() {
	return IntegrationFlows.from("amqpOutboundInput")
            .handle(Amqp.outboundAdapter(this.amqpTemplate).routingKeyExpression("headers.routingKey"))
			.get();
}

@Bean
public IntegrationFlow jmsInboundFlow() {
	return IntegrationFlows
			.from(Jms.inboundAdapter(this.jmsConnectionFactory)
					.configureJmsTemplate(t ->
							t.deliveryPersistent(true)
									.jmsMessageConverter(myMessageConverter()))
					.destination("jmsInbound"))
			.<String, String>transform(String::toUpperCase)
			.channel(this.jmsOutboundInboundReplyChannel())
			.get();
}

@Bean
public IntegrationFlow jmsOutboundGatewayFlow() {
	return IntegrationFlows.from("jmsOutboundGatewayChannel")
			.handle(Jms.outboundGateway(this.jmsConnectionFactory)
						.replyContainer(c ->
									c.concurrentConsumers(3)
											.sessionTransacted(true))
						.requestDestination("jmsPipelineTest"))
			.get();
}
```

We show here the usage of namespace factories as inline adapters declarations, however they can be used from `@Bean` definitions to make the `IntegrationFlow` method-chain more readable.

We are soliciting community feedback on these namespace factories before we spend effort on others; we'd also appreciate some prioritization for which adapters/gateways we should support next.

Be sure to have concrete `spring-integration-[PROTOCOL].jar` and its required dependencies on the classpath, because the `spring-integration-java-dsl` declares them as `optional` to avoid unnecessary end-application overhead.

**The DSL Parser changes**

Nevertheless the general purpose of this M2 release has been about a critical issue with wrong place for DSL parser. Now it was moved from `IntegrationConfigurationBeanFactoryPostProcessor` to the `IntegrationFlowBeanPostProcessor` and the Spring Integration Java DSL does not impact the Application context anymore - it just follows the standard Spring bean definition lifecycle. You may need to make some changes to existing DSL applications to use this version.

In most cases this is limited to `channel auto-declaration`, when we don't define the explicit `MessageChannel` bean definition, but refer to it from integration components. If you noticed in `.gateway()` sample above we use `@DependsOn` annotation. That's because beans are registered and initialized one by one as they are declared in the `@Configuration` classes. Since we don't use bean definitions for `MessageChannel`s, the application context can't automatically declare `dependsOn` for bean, which uses a channel, and, from the other side, we don't declare `MessageChannel` bean at all, we have only one choice to depend on `IntegrationFlow` bean.

So, it's up to you declare `MessageChannel` beans explicitly, or use `@DependsOn` on the appropriate `IntegrationFlow` bean definition for a downstream `IntegrationFlow` which declares implicit channels.

**Wrapping up**

Please refer to the [Reference Manual](https://github.com/spring-projects/spring-integration-extensions/wiki/Spring-Integration-Java-DSL-Reference) mentioned above for more information. And take a look into \[Webinar Replay: Spring Integration 4.0 - The New Frontier\] ([https://spring.io/blog/2014/05/15/webinar-replay-spring-integration-4-0-the-new-frontier](https://spring.io/blog/2014/05/15/webinar-replay-spring-integration-4-0-the-new-frontier)), where the Spring Integration Java DSL has been introduced via "live coding".

As usual: please don't hesitate to share your thoughts and feedback: [StackOverflow](http://stackoverflow.com) (`spring-integration` tag), [Spring JIRA](https://jira.spring.io/browse/INT).

**SpringOne 2GX 2014 is around the corner**

Book your place at [SpringOne2GX in Dallas, TX](http://www.springone2gx.com/) for Sept 8-11 soon. It's simply the best opportunity to find out first hand all that's going on and to provide direct feedback. Expect a number of significant new announcements this year. We are anticipating that several in-depth Spring-Integration sessions will be presented.