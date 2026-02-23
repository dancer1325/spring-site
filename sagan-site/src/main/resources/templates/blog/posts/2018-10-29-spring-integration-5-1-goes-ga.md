---
title: Spring Integration 5.1 goes GA!
source: https://spring.io/blog/2018/10/29/spring-integration-5-1-goes-ga
scraped: 2026-02-23T15:09:03.183Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  October 29, 2018 | 0 Comments
---

# Spring Integration 5.1 goes GA!

_Releases | Artem Bilan |  October 29, 2018 | 0 Comments_

On behalf of Spring Integration team I am pleased to announce that the `5.1.0.RELEASE` for the Spring Integration is available.

It can be downloaded from Maven Central, JCenter, and our [release repository](https://repo.spring.io/release):

```
Copycompile "org.springframework.integration:spring-integration-core:5.1.0.RELEASE"
```

First of all I would like to thank all community members for their ongoing active contributions to the framework!

Besides the regular dependencies upgrades, bug fixes and internal performance improvements here are some notable new features introduced in this version:

### [](#boundrabbitchanneladvice)[](#boundrabbitchanneladvice)BoundRabbitChannelAdvice

For strict ordering of messages publishing a `BoundRabbitChannelAdvice` can be used as a `MessageHandler` advice to allow to perform all the downstream AMQP operations in the same thread-bound `Channel`. Typically used with a splitter or some other mechanism that would cause multiple messages to be sent:

```
Copy@Bean
public IntegrationFlow flow(RabbitTemplate template) {
    return IntegrationFlows.from(Gateway.class)
            .split(s -> s.delimiters(",")
                    .advice(new BoundRabbitChannelAdvice(template))
            .<String, String>transform(String::toUpperCase)
            .handle(Amqp.outboundAdapter(template).routingKey("rk"))
            .get();
}
```

### [](#reactive-polling)[](#reactive-polling)Reactive Polling

If `SourcePollingChannelAdapter` or `PollingConsumer` is configured with the `outputChannel` as a `FluxMessageChannel`, the polling task is not performed by the scheduler, but as a `Flux.generate()` with a subsequent `Mono.delay()` based on the `trigger.nextExecutionTime()`. This way the real source polling is performed on demand honoring a downstream back-pressure propagated by the `FluxMessageChannel`. The `PollerMetadata` options remain the same and transparent for end configuration.

### [](#java-dsl-fluxtransform)[](#java-dsl-code-fluxtransform-code)Java DSL `fluxTransform()`

The `IntegrationFlowDefinition` is now supplied with new `fluxTransform()` operator which accepts a `Function` for transforming a `Flux` of incoming message via reactive manner. Underneath the `fluxTransform()` is fully based on the Reactor’s `Flux.transform()` operator and copies request headers to the reply message if function doesn’t produce one already. The call is wrapped with input and output `FluxMessageChannel` instances internally:

```
CopyIntegrationFlow integrationFlow = f -> f
        .split()
        .<String, String>fluxTransform(flux -> flux
                .map(Message::getPayload)
                .map(String::toUpperCase))
        .aggregate(a -> a
                .outputProcessor(group -> group
                        .getMessages()
                        .stream()
                        .map(Message::getPayload)
                        .map(String.class::cast)
                        .collect(Collectors.joining(","))))
        .channel(resultChannel);
```

Also Java DSL provides more operators for convenience: `nullChannel()`, `convert(Class<?>)` and `logAndReply()`. See their Javadocs for more information.

### [](#java-functions-improvements)[](#java-functions-improvements)Java Functions Improvements

The `java.util.function` interfaces now serve as a first class citizens for messaging endpoints. The `Function<?, ?>` and `Consumer<?>` can directly be used from the `@ServiceActivator` or `@Transformer` definition, for example:

```
Copy@Bean
@Transformer(inputChannel = "functionServiceChannel")
public Function<String, String> functionAsService() {
    return String::toUpperCase;
}
```

The `Supplier<?>` interface can simply be used together with the `@InboundChannelAdapter` annotation, or as a `ref` in an `<int:inbound-channel-adapter>`:

```
Copy@Bean
@InboundChannelAdapter(value = "inputChannel", poller = @Poller(fixedDelay = "1000"))
public Supplier<String> pojoSupplier() {
    return () -> "foo";
}
```

The Kotlin lambdas can now also be used directly in the messaging endpoint definitions:

```
Copy@Bean
@Transformer(inputChannel = "functionServiceChannel")
fun kotlinFunction(): (String) -> String {
    return { it.toUpperCase() }
}

@Bean
@ServiceActivator(inputChannel = "messageConsumerServiceChannel")
fun kotlinConsumer(): (Message<Any>) -> Unit {
    return { print(it) }
}

@Bean
@InboundChannelAdapter(value = "counterChannel",
        poller = [Poller(fixedRate = "10", maxMessagesPerPoll = "1")])
fun kotlinSupplier(): () -> String {
    return { "baz" }
}
```

### [](#micrometer)[](#micrometer)Micrometer

Together with an upgrade to Micrometer `1.1` the Framework now automatically removes registered meters from the `MeterRegistry`. This becomes very handy when we develop dynamic `IntegrationFlow` s and register and remove them at runtime.

### [](#jmx-mbeans-removal)[](#jmx-mbeans-removal)JMX MBeans removal

Now MBeans registered at runtime (e.g. via dynamic `IntegrationFlow` s) removed from the JMX server registration automatically when beans for them are destroyed at runtime.

### [](#http-dynamic-mapping)[](#http-dynamic-mapping)HTTP Dynamic Mapping

The HTTP (and WebFlux) inbound endpoints, declared at runtime (e.g. via dynamic `IntegrationFlow` s), now register their request mapping in the `HandlerMapping` and also remove it automatically, when their bean is destroyed.

### [](#spring-social-twitter-support)[](#spring-social-twitter-support)Spring Social Twitter Support

Since Spring Social project is heading to its [End of Life](https://spring.io/blog/2018/07/03/spring-social-end-of-life-announcement), we have moved `spring-integration-twitter` module to separate project under [Spring Integration Extensions](https://github.com/spring-projects/spring-integration-extensions) umbrella and have just released a `org.springframework.integration:spring-integration-social-twitter:1.0.0.RELEASE` as well, which is fully based on Spring Integration `5.1`.

### [](#summary)[](#summary)Summary

For more changes, please, take a look into the [What’s New](https://docs.spring.io/spring-integration/docs/5.1.0.RELEASE/reference/html/whats-new.html) chapter of the reference manual. Also see a [Migration Guide](https://github.com/spring-projects/spring-integration/wiki/Spring-Integration-5.0-to-5.1-Migration-Guide) for breaking changes in this version and how to cope with them.

This version is a foundation for Spring Boot `2.1 GA`.

From here we are looking forward to switch the `master` to the `5.2` version to start working on new features and valuable improvements!

Any feedback, feature ideas, critics, bug reports and questions are welcome via appropriate communication channels:

[Project Page](http://projects.spring.io/spring-integration/) | [JIRA](https://jira.spring.io/browse/INT) | [Contributing](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)