---
title: Java DSL for Spring Integration 1.2 M1 and 1.1.3 are available
source: https://spring.io/blog/2016/07/08/java-dsl-for-spring-integration-1-2-m1-and-1-1-3-are-available
scraped: 2026-02-23T19:05:04.380Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  July 08, 2016 | 5 Comments
---

# Java DSL for Spring Integration 1.2 M1 and 1.1.3 are available

_Releases | Artem Bilan |  July 08, 2016 | 5 Comments_

I’m pleased to announce that the Java DSL for Spring Integration `1.2 M1` is available now!

First of I’d like to thank everyone who created issues, raised Pull Requests, provided feedback or just asked questions on StackOverflow. Without the community we couldn’t be the successful project we are today!

The artifact `org.springframework.integration:spring-integration-java-dsl:1.2.0.M1` is available in the [Milestone repo](http://repo.spring.io/milestone). So, give it a shot and don’t hesitate to raise a [GH issue](https://github.com/spring-projects/spring-integration-java-dsl/issues) for any feedback!

Some highlights of the current iteration:

# [](#apache-kafka-09-support)[](#apache-kafka-0-9-support)Apache Kafka 0.9 support

Based on the recently released [Spring for Apache Kafka](https://spring.io/blog/2016/07/04/spring-for-apache-kafka-1-0-and-spring-integration-kafka-2-0-go-ga) project, a new `Kafka09` factory has been introduced. This is straightforward Java DSL factory for producing `IntegrationComponentSpec` fluent API builders for adapters based on the a Spring for Apache Kafka foundation. An existing `Kafka` factory for Apache Kafka `0.8` support is still present for backward compatibility.

# [](#runtime-flow-registration)[](#runtime-flow-registration)Runtime flow registration

In many cases it would be better to specify an integration flow based on the system state or even during some business function invocation. Or even make it volatile after execution. For this purpose an `IntegrationFlowContext` component has been introduced to let the manual `IntegrationFlow` control.

```
Copy@Autowired
private IntegrationFlowContext context;
...

IntegrationFlow myFlow = f -> f
  			.<String, String>transform(String::toUpperCase)
   			.transform("Hello, "::concat);

String flowId = this.context.register(myFlow);
MessagingTemplate messagingTemplate = this.context.messagingTemplateFor(flowId);

assertEquals("Hello, SPRING",
            messagingTemplate.convertSendAndReceive("spring", String.class));

this.context.remove(flowId);
```

See `IntegrationFlowContext` JavaDocs for more information.

# [](#operator-log)[](#operator-log)Operator log()

For convenience to log the message journey Spring Integration manner (a-la `<logging-channel-adapter>`), a new `log()` operator has been introduced. Underneath it is represented just by `WireTap` `ChannelInterceptor` and `LoggingHandler` as subscriber. It is responsible to log message incoming into the next endpoint:

```
Copy.filter(...)
.log(LoggingHandler.Level.ERROR, "test.category", m -> m.getHeaders().getId())
.route(...)
```

In this example an `id` header will be logged with `ERROR` level onto "test.category" only for messages passed the filter and before routing.

# [](#messagechannelspecwiretap)[](#messagechannelspec-wiretap)MessageChannelSpec.wireTap()

A `.wireTap()` fluent API has been introduced for `MessageChannelSpec` builders. Now a target configuration gains much more from Java DSL usage:

```
Copy@Bean
public QueueChannelSpec myChannel() {
    return MessageChannels
            .queue()
            .wireTap("loggingFlow.input");
}

@Bean
public IntegrationFlow loggingFlow() {
    return f -> f.log();
}
```

# [](#typed-routers)[](#typed-routers)Typed routers

Having a pure Java instantiation for beans it really looks enough organic to have routing keys as any desired type and avoid converting to `String` everything. Plus the type relaxing let us have configuration as generic-aware:

```
Copy@Bean
public IntegrationFlow payloadTypeRouteFlow() {
    return f -> f
          .<Object, Class>route(Object::getClass, m -> m
                         .channelMapping(String.class, "stringsChannel")
                         .channelMapping(Integer.class, "integersChannel"));
}
```

See [commit history](https://github.com/spring-projects/spring-integration-java-dsl/commits/v1.2.0.M1) for `1.2.0.M1` version for more information.

# [](#bug-fixes)[](#bug-fixes)Bug Fixes

The maintenance version `1.1.3` has been also release with several nasty bug fixes and Spring Integration 4.3 compatibility. The `org.springframework.integration:spring-integration-java-dsl:1.1.3.RELEASE` artifact is available in the [repo.spring.io](http://repo.spring.io/release) and [Maven Central](http://search.maven.org/#search%7Cga%7C1%7Cspring-integration-java-dsl). It is recommended to upgrade for everyone, especially if you use `JMS` factory and beans which implement `ApplicationListener`.

# [](#next-steps)[](#next-steps)Next Steps

We expect the next Milestone 2 for version `1.2` enough soon, over a couple weeks, with an RC and release somewhere in the middle of August. At the same time we are going to absorb `spring-integration-java-dsl` project into [Spring Integration Core](http://projects.spring.io/spring-integration/) with version `5.0` and Java 8 code base. The current `1.2` version will be still supported, but just for bug fixes.

[Project Page](https://github.com/spring-projects/spring-integration-java-dsl) | [Documentation](https://github.com/spring-projects/spring-integration-java-dsl/wiki/Spring-Integration-Java-DSL-Reference) | [Issues](https://github.com/spring-projects/spring-integration-java-dsl/issues) | [Help](http://stackoverflow.com/questions/tagged/spring-integration)