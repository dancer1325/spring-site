---
title: Spring Integration Java DSL 1.1 M2 is Available
source: https://spring.io/blog/2015/09/10/spring-integration-java-dsl-1-1-m2-is-available
scraped: 2026-02-23T19:43:05.058Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  September 10, 2015 | 0 Comments
---

# Spring Integration Java DSL 1.1 M2 is Available

_Releases | Artem Bilan |  September 10, 2015 | 0 Comments_

We are pleased to announce that the Milestone 2 of Spring Integration Java DSL is now available from the [Milestone Repository](https://repo.spring.io/milestone/):

For Gradle use this:

```
Copycompile "org.springframework.integration:spring-integration-java-dsl:1.1.0.M2"
```

For Maven this:

```
Copy<dependency>
     <groupId>org.springframework.integration</groupId>
     <artifactId>spring-integration-java-dsl</artifactId>
     <version>1.1.0.M2</version>
</dependency>
```

There are not many new features since [Milestone 1](https://spring.io/blog/2015/04/15/spring-integration-java-dsl-1-1-m1-is-available), but here are the most important things to which to pay attention:

## [](#spring-integration-42-foundation)Spring Integration 4.2 foundation

The Spring Integration Java DSL 1.1 is now based on [Spring Integration 4.2](https://spring.io/blog/2015/09/10/spring-integration-4-2-release-is-available) to become part of the upcoming [Spring IO 2.0](http://platform.spring.io/platform/). The 1.1 version of the Java DSL is no longer compatible with Spring Integration 4.1.x.

## [](#spring-integration-kafka-12x-upgrade)Spring Integration Kafka 1.2.x upgrade

We now provide the `Kafka` Namespace Factory for the Spring Integration Kafka Adapters. The new Spring Integration Kafka 1.2 [release](https://spring.io/blog/2015/06/19/spring-integration-kafka-1-2-is-available-with-0-8-2-support-and-performance-enhancements) together with the upgrade to Apache Kafka `0.8.2` brings a number of breaking changes. Hence this Java DSL Milestone 2 of 1.1 is no longer compatible with the previous version of Spring Integration Kafka and Apache Kafka respectively.

## [](#http-namespace-factory)HTTP Namespace Factory

The Spring Integration HTTP Adapters are now covered with their specific `Http` Namespace Factory. Please, meet our classical HTTP Proxy sample, but on Java DSL already:

```java
Copy@Bean
public IntegrationFlow httpProxyFlow() {
    return IntegrationFlows
        .from((MessagingGateways g) ->
               g.httpGateway("/proxy")
                     .requestMapping(r -> r.params("name"))
                     .payloadFunction(httpEntity ->
                           ((ServletRequestAttributes) RequestContextHolder
                                                     .currentRequestAttributes())
						.getRequest()
						.getQueryString()))
        .handleWithAdapter(a ->
              a.httpGateway(m ->
                   String.format("http://target/service?%s", m.getPayload()))
                              .expectedResponseType(String.class))
        .get();
}
```

## [](#reactive-streams-support)Reactive Streams Support

We are pleased to announce that Spring Integration is beginning to provide integration with [Reactive Streams](http://www.reactive-streams.org/) and support for `Publisher` is presented in the Java DSL directly:

```java
Copy@Bean
public Publisher<Message<String>> reactiveFlow() {
	return IntegrationFlows
		.from(() -> new GenericMessage<>("a,b,c,d,e,f"))
		.split(String.class, p -> p.split(","))
		.toReactivePublisher();
}
```

As you see it is simple to go from the Spring Integration world to the Reactive Streams world. The `org.reactivestreams.Publisher` bean can be used afterwards as an event source for the Reactive program, e.g. using the [Project Reactor](http://projectreactor.io/) implementation:

```java
Copy@Autowired
@Qualifier("reactiveFlow")
private Publisher<Message<String>> publisher;
....
List<String> results = new ArrayList<>();
CountDownLatch latch = new CountDownLatch(6);
Streams.wrap(this.publisher)
	.map(m -> m.getPayload().toUpperCase())
	.consume(p -> {
			results.add(p);
			latch.countDown();
		});
```

The other direction - from Reactive Stream to the Spring Integration - is simple enough, too (from Reactor perspective):

```java
Copy.consume(v -> messagingTemplate().convertAndSend(reactorStreamResult(), v));
```

We will consider some `org.reactivestreams.Subscriber` option for the `MessageChannel` implementation in the future release.

## [](#other-changes)Other changes

There have been done other important refactoring and deprecations to make the DSL more fluent, convenient and flexible, such as:

-   The `Files.splitter()` factory method for the `FileSplitter` component;
-   The `(S)Ftp.outboundGateway()` for new `MessageSessionCallback` (a Spring Integration 4.2 feature);
-   Refactored and improved `.aggregate()` and `.resequence()` EIP-methods etc.

##SpringOne 2GX 2015 is around the corner! Book your place at [SpringOne2GX in Washington, DC next week](http://www.springone2gx.com/). It’s simply the best opportunity to find out first hand all that’s going on and to provide direct feedback.

Come to my [talk](https://2015.event.springone2gx.com/schedule/sessions/spring_integration_java_dsl.html) to get more information from the first hands of Spring Integration Java DSL and help me to make this Framework better!

[Project Page](https://github.com/spring-projects/spring-integration-java-dsl) | [JIRA](https://jira.spring.io/browse/INTEXT) | [Issues](https://github.com/spring-projects/spring-integration-java-dsl/issues) | \[Contributions\] ([https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.md](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.md)) | [StackOverflow](http://stackoverflow.com) (`spring-integration` tag)