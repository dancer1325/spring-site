---
title: Spring Integration 5.0 Milestone 5 Available
source: https://spring.io/blog/2017/06/16/spring-integration-5-0-milestone-5-available
scraped: 2026-02-23T16:28:49.349Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  June 16, 2017 | 0 Comments
---

# Spring Integration 5.0 Milestone 5 Available

_Releases | Artem Bilan |  June 16, 2017 | 0 Comments_

On behalf of the Spring Integration team I am pleased to announce that the fifth milestone for the Spring Integration 5.0 release (`5.0.0.M5`) is now available.

[21 JIRAs](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10121&version=15858) (and some GitHub issues) made into this release, including bug fixes and a number of new features. Some highlights of features in M4 and M5, since the previously announced [Milestone 3](https://spring.io/blog/2017/04/05/spring-integration-5-0-milestone-3-available):

-   The `Splitter` now can deal with the Java `Stream` and Reactor `Flux` payloads. If the output channel is a `ReactiveStreamsSubscribableChannel`, splitting supports back-pressure.
    
-   A `ErrorMessagePublisher` together with the `ErrorMessageStrategy` have been introduced to pursue better error handling experience with the inception message for the `ErrorMessage`. The `MessageListenerContainer` in Spring Kafka 2.0 and Spring AMQP 2.0 are supplied with their own `ErrorMessageStrategy` to represent the original data in the `ErrorMessage` for the error handling flow.
    
-   The new `MockMessageHandler` has been added to Spring Integration Test framework for replacing real \`MessageHandler\`s for unit testing:
    
    MessageHandler mockMessageHandler = mockMessageHandler() .handleNextAndReply(m -> m.getPayload().toString().toUpperCase());
    
    this.mockIntegrationContext .substituteMessageHandlerFor("myServiceActivator", mockMessageHandler);
    
    this.pojoServiceChannel.send(new GenericMessage<>("foo")); receive = this.results.receive(10000);
    
    assertEquals("FOO", receive.getPayload());
    
-   The Java DSL now provides a more flexible router API via `routeByException()`:
    

@Bean public IntegrationFlow exceptionTypeRouteFlow() { return f -> f .routeByException(r -> r .channelMapping(IllegalArgumentException.class, "illegalArgumentChannel") .channelMapping(RuntimeException.class, "runtimeExceptionChannel") .subFlowMapping(MessageHandlingException.class, sf -> sf.channel("messageHandlingExceptionChannel")) .defaultOutputChannel("exceptionRouterDefaultChannel")); }

-   A customized Jackson `ObjectMapper` is provided which is aware of `Message` and `MessageHeaders` serialization/deserialization to/from JSON. This functionality is useful in those components which allow the configuration of custom serializer/deserializers, for example `RedisMessageStore`:
    
    RedisMessageStore store = new RedisMessageStore(redisConnectionFactory);
    
    ObjectMapper mapper = JacksonJsonUtils.messagingAwareMapper();
    
    GenericJackson2JsonRedisSerializer serializer = new GenericJackson2JsonRedisSerializer(mapper); store.setValueSerializer(serializer);
    

And messages and message groups will be stored in Redis in the JSON format.

Also this `JacksonJsonUtils.messagingAwareMapper()` provides an argument to configure `trustedPackages` to provide a protection for the [CVE-2017-4995](https://pivotal.io/security/cve-2017-4995) vulnerability. The default list is:

```
Copyjava.util
java.lang
org.springframework.messaging.support
org.springframework.integration.support
org.springframework.integration.message
org.springframework.integration.store
```

It can be configured with `*` (asterisk), meaning trust all packages.

-   The new `ThreadAffinityClientConnectionFactory` is added to the TCP/IP module to bind a client connections to a thread.
    
-   The `ReactiveChannel` has been renamed to `FluxMessageChannel` for better reflection of its implementation.
    

We would like to thank several community members for their ongoing active contributions to the framework; scan [the commits](https://github.com/spring-projects/spring-integration/commits/v5.0.0.M5) and give them some kudos!

For a complete list of changes in `5.0`, also see the [What’s New](http://docs.spring.io/spring-integration/docs/5.0.0.M5/reference/html/whats-new.html) chapter in the reference manual.

[Project Page](http://projects.spring.io/spring-integration/) | [JIRA](https://jira.spring.io/browse/INT) | [Contributing](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)