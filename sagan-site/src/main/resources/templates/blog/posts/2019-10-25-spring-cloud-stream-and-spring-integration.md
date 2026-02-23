---
title: Spring Cloud Stream - and Spring Integration.
source: https://spring.io/blog/2019/10/25/spring-cloud-stream-and-spring-integration
scraped: 2026-02-23T14:25:06.351Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Artem Bilan |  October 25, 2019 | 0 Comments
---

# Spring Cloud Stream - and Spring Integration.

_Engineering | Artem Bilan |  October 25, 2019 | 0 Comments_

If you listened to [Oleg Zhurakousky](https://spring.io/team/olegz)'s talk at Spring One Platform 2019 about [Spring Cloud Stream & Functions](https://springoneplatform.io/2019/sessions/event-driven-with-spring) or read his recent blog posts about [Simplified Spring Cloud Stream](https://spring.io/blog/2019/10/14/spring-cloud-stream-demystified-and-simplified) and [Functional Spring Cloud Stream](https://spring.io/blog/2019/10/17/spring-cloud-stream-functional-and-reactive), you may want to say: "Wait! What happened with Spring Integration support? What do I now do with my `@ServiceActivator` or `IntegrationFlow`? I used to deal with the `Sink.input()` as a channel to consume binder destination with some Spring Integration logic!" As Oleg mentions in his blog post, it is still possible with existing `@EnableBinding` and so on, but we are moving away from that model, so how can we still benefit from all the features of Spring Integration in the world of *functional* Spring Cloud Stream?

In this blog post, I expand on the functional features of Spring Cloud Stream in the context of Spring Integration and its importance in the modern function-based streams!

## [](#spring-integration-as-a-function)[](#spring-integration-as-a-function)Spring Integration as a Function?!

Yes, we can indeed make a simple `Function` bridge, which would call a `MessageChannel.send()`, but we can also do it with Messaging Gateway abstraction in Spring Integration, as follows:

```
Copy@MessagingGateway(defaultRequestChannel = "myIntegrationServiceChannel")
public interface MessageFunction
                  extends Function<Message<InputData>, Message<OutputData>> { }
```

Given that the resulting bean is an extension to `java.util.function.Function`, it is a fully valid Spring Cloud Function and Spring Cloud Stream binding candidate. Its generic input/output argument types are used by Spring Cloud Stream to perform a proper payload conversion before and after. Also, headers are carried from the binder to the downstream integration flow and back. This is good, but we still need to be aware of channels and provide a few SI-specific annotations to connect such a gateway with our flow (boilerplate).

With Java DSL for Spring Integration, we can go further and take away more boilerplate code while gaining the benefit of using functional Spring Cloud Stream. What we need is the same `gateway` approach but in DSL style. The `uppercase` sample in Oleg’s blog post would be as follows with Spring Integration:

```
Copy@SpringBootApplication
public class SampleApplication  {

    @Bean
    public IntegrationFlow uppercaseFlow() {
        return IntegrationFlows.from(Function.class,
                             gateway -> gateway.beanName("uppercase"))
                   .<String, String>transform(String::toUpperCase)
                   .get();
    }
}
```

An uppercase conversion use-case is silly enough to implement with Spring Integration, but imagine that we need to do some hard logic like `split`, `scatter-gather` with parallel calls to external services, and then `aggregate`, do some auditing, and, only in the end, return a result from our function to an output destination. All of that and more can be implemented with Spring Integration, its EIP support, Java DSL abstraction and, of course, the aforementioned function wrapper.

The `java.util.function.Consumer` and `java.util.function.Supplier` interfaces can be used in a similar way with appropriate logic in the gateway proxy around them according to their contract.

You can see more information about function support in the Spring Integration [Reference Manual](https://docs.spring.io/spring-integration/docs/current/reference/html/messaging-endpoints.html#functions-support).

## [](#what-about-reactive-streams)[](#what-about-reactive-streams)What about Reactive Streams?

Everything we have showed before was about **imperative** functions, which are triggered per event. The **reactive** functions are triggered only once by passing an entire stream of events as a `Flux` into a function. The Reactive Streams support in Spring Integration helps you to write reactive Spring Integration flows, which can be exposed as functions within Spring Cloud Stream.

The following sample shows how to build a reactive function wrapper around a reactive Spring Integration call:

```
Copypublic interface FluxFunction extends Function<Flux<String>, Flux<String>> { }

@Bean
public IntegrationFlow rsocketUpperCaseRequestFlow(
                           ClientRSocketConnector clientRSocketConnector) {
    return IntegrationFlows.from(FluxFunction.class,
                        gateway -> gateway.beanName("uppercase"))
            .handle(RSockets.outboundGateway("/uppercase")
                    .command(RSocketOutboundGateway.Command.requestStreamOrChannel)
                    .expectedResponseType(String.class)
                    .clientRSocketConnector(clientRSocketConnector))
            .get();
}
```

While it is still that silly to implement `uppercase` over RSocket, the goal of this sample is to give you an idea of how more complex use cases can be addressed with Spring Integration.

Here, we get a `Flux` passed into a function and propagate it into an RSocket requester for a `request channel` interaction model. A result `Flux` is passed back to the function return through a `replyChannel` header internally in Spring Integration.

Another reactive sample might be like transferring data from a **push** model to a **pull** model. In other words represent a stream of event as a `Supplier`:

```
Copy@Bean
public Publisher<Message<byte[]>> httpSupplierFlow() {
    return IntegrationFlows.from(WebFlux.inboundChannelAdapter("/requests"))
            .toReactivePublisher();
}

@Bean
public Supplier<Flux<Message<byte[]>>> httpSupplier(
                    Publisher<Message<byte[]>> httpRequestPublisher) {
    return () -> Flux.from(httpRequestPublisher);
}
```

This way, incoming HTTP requests land in a source `Flux` for pulling downstream by the output binder destination, honoring back-pressure and other Reactive Streams requirements.

For more information about Reactive Streams support in Spring Integration, see the [Reference Manual](https://docs.spring.io/spring-integration/docs/current/reference/html/reactive-streams.html#reactive-streams).

## [](#summary)[](#summary)Summary

Spring Integration is still a vital part of Spring Cloud Stream microservices development. Its functional support allows complex use cases that fall into the category of Enterprise Integration Patterns to be exposed as Java functions, providing for a consistent execution model within Spring Cloud Stream. In fact, by using this foundation, [Spring Cloud Stream App Starters](https://github.com/spring-cloud/spring-cloud-stream-app-starters) will eventually be replaced with function implementations.

Please feel free to provide any feedback!

P.S. For those who are impatient about Kotlin, I would like to share a recently started [Spring Integration Kotlin DSL](https://github.com/spring-projects/spring-integration-extensions/tree/master/spring-integration-kotlin-dsl) project.