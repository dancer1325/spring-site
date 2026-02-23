---
title: Understanding Reactive types
source: https://spring.io/blog/2016/04/19/understanding-reactive-types
scraped: 2026-02-23T19:18:45.202Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Sébastien Deleuze |  April 19, 2016 | 8 Comments
---

# Understanding Reactive types

_Engineering | Sébastien Deleuze |  April 19, 2016 | 8 Comments_

Following previous [Reactive Spring](https://spring.io/blog/2016/02/09/reactive-spring) and [Reactor Core 3.0](https://spring.io/blog/2016/03/11/reactor-core-3-0-becomes-a-unified-reactive-foundation-on-java-8) blog posts, I would like to explain why Reactive types are useful and how they compare to other asynchronous types, based on what we have learned while working on the Spring Framework 5 upcoming Reactive support.

## [](#why-using-reactive-types)Why using Reactive types?

Reactive types are not intended to allow you to process your requests or data faster, in fact they will introduce a small overhead compared to regular blocking processing. Their strength lies in their capacity to serve more request concurrently, and to handle operations with latency, such as requesting data from a remote server, more efficiently. They allow you to provide a better quality of service and a predictable capacity planning by dealing natively with time and latency without consuming more resources. Unlike traditional processing that blocks the current thread while waiting a result, a Reactive API that waits costs nothing, requests only the amount of data it is able to process and bring new capabilities since it deals with stream of data, not only with individual elements one by one.

## [](#before-java-8)Before Java 8

Before Java 8, asynchronous non-blocking behavior was not obvious to implement for at least two reasons. The first reason is that callback based API required verbose anonymous classes and are not easy to chain. The second reason is that [`Future`](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/Future.html) type is asynchronous **but** blocks the current thread until the computation completes when you try to get the result with the [`get()`](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/Future.html#get--) method. That's why Spring Framework 4.0 introduced [`ListenableFuture`](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/util/concurrent/ListenableFuture.html), a `Future` implementation that adds non-blocking callback-based capabilities.

## [](#lambdas-completablefuture-and-stream)Lambdas, CompletableFuture and Stream

Then Java 8 introduced lambdas and [`CompletableFuture`](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/CompletableFuture.html). Lambdas allow to write concise callbacks, while [`CompletionStage`](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/CompletionStage.html) interface and [`CompletableFuture`](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/CompletableFuture.html) class finally allows to deal with future in a non-blocking way and push-based fashion, while providing capabilities to chain such deferred result processing.

Java 8 also introduced [`Stream`](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html), which has been designed to deal efficiently with stream of data (including primitive types) that can be accessed with no or very little latency. It is pull-based, can only be used once, lacks time-related operations and can perform parallel computations but without being able to specify the thread pool to use. As explained by [Brian Goetz](http://stackoverflow.com/questions/17960656/is-it-possible-to-use-java-8-streams-api-for-asynchronous-processing/18826615#comment36545451_18826615), it has not been designed to deal with operation with latency, such as I/O operations. And that is where Reactive APIs like Reactor or RxJava come in.

## [](#reactive-apis)Reactive APIs

Reactive APIs such as [Reactor](https://projectreactor.io/) also provide operators like Java 8 Stream, but they work more generally with any stream sequence (not just Collections) and allow to define a pipeline of transforming operations that will apply to the data passing through it thanks to a handy fluent API and using lambdas. They are designed to handle both synchronous or asynchronous operations, and allow you to buffer, merge, concatenate, or apply a wide range of transformations to your data.

Initially Reactive APIs were only designed to deal with streams of data, i.e. N elements, for example, using Reactor's [`Flux`](http://projectreactor.io/core/docs/api/reactor/core/publisher/Flux.html):

```java
CopyreactiveService.getResults()
    .mergeWith(Flux.interval(100))
    .doOnNext(serviceA::someObserver)
    .map(d -> d * 2)
    .take(3)
    .onErrorResumeWith(errorHandler::fallback)
    .doAfterTerminate(serviceM::incrementTerminate)
    .consume(System.out::println);
```

But during our work on Spring Framework 5, it became apparent that there was a clear need to distinguish between streams of 1 or N elements, and that is why Reactor provides the [`Mono`](http://projectreactor.io/core/docs/api/reactor/core/publisher/Mono.html) type. `Mono` is the Reactive equivalent of `CompletableFuture` type, and allow to provide a consistent API for handling single and multiple elements in a Reactive way.

```java
CopyMono.any(reactiveServiceA.findRecent(time), reactiveServiceB.findRecent(time)
    .timeout(Duration.ofSeconds(3), errorHandler::fallback)
    .doOnSuccess(r -> reactiveServiceC.incrementSuccess())
    .consume(System.out::println);
```

If you have a deeper look to [`Flux`](http://projectreactor.io/core/docs/api/reactor/core/publisher/Flux.html) and [`Mono`](http://projectreactor.io/core/docs/api/reactor/core/publisher/Mono.html), you will notice these types implement the `Publisher` interface from the Reactive Streams specification.

## [](#reactive-streams)Reactive Streams

Reactor is built on the [Reactive Streams](http://www.reactive-streams.org) specification. Reactive Streams is composed of [4 simple Java interfaces](http://www.reactive-streams.org/reactive-streams-1.0.0-javadoc/) (`Publisher`, `Subscriber`, `Subscription` and `Processor`), a [textual specification](https://github.com/reactive-streams/reactive-streams-jvm/blob/v1.0.0/README.md#specification) and a [TCK](http://www.reactive-streams.org/reactive-streams-tck-1.0.0-javadoc/). It is the cornerstone of every modern Reactive library and a must have for interoperability purpose.

The core concern of Reactive Streams is handling backpressure. In a nutshell, backpressure is a mechanism that permits a receiver to ask how much data it wants to receive from the emitter. It allows:

-   The receiver to start receiving data only when it is ready to process it
-   To control the inflight amount of data
-   Efficient handling of slow emitter/fast receiver or fast emitter/slow receiver use cases
-   To switch from a dynamic push-pull strategy to a push-based only strategy if you request `Long.MAX_VALUE` elements

At first glance, the [`Publisher`](http://www.reactive-streams.org/reactive-streams-1.0.0-javadoc/org/reactivestreams/Publisher.html) interface seems deceivingly simple to implement; but doing so in complete conformance with the specification turns out to be pretty hard, and users can't do anything with raw `Publisher` except subscribing to it! That’s why it’s typically a better idea to rely on a Reactive Streams implementation, such as Reactor, to help you out with this.

Note that Java 9 [will include](http://cs.oswego.edu/pipermail/concurrency-interest/2015-January/013641.html) the Reactive Streams interfaces in the `java.util.concurrent.Flow` container class, further showing the relevance of Reactive Streams within the JDK.

It is also important to notice that convergence toward Reactive Streams and [Reactor conversion capabilities](https://github.com/reactor/reactor-core/tree/master/src/main/java/reactor/core/converter) allow easy and efficient conversion from one Reactive type to another at runtime.

## [](#conclusion)Conclusion

I hope this blog post will help you to have a better understanding of Reactive types.

We are working on Reactive support with types like Reactor `Mono` and `Flux` in various Spring projects like Spring Framework, Spring Boot, Spring Data, Spring Security and Spring Cloud.

But your upcoming Reactive application will also use directly these types too, for example at `@Repository`, `@Service` or `@Controller` methods level, because building a Reactive application means using Reactive semantics where you have to deal with latency or streams (we will also provide some guidance to integrate blocking API).

We will post additional Reactive blog posts in the upcoming months. Feel free to familiarize yourself with [this test-driven Lite Rx API Hands-On](https://github.com/reactor/lite-rx-api-hands-on/) that will teach you how to use `Flux` and `Mono`, and as usual your feedbacks are welcome!

If you happen to be in Barcelona mid May (never a bad time to be in Barcelona anyway!), don’t miss the chance to join the [Spring I/O conference](http://www.springio.net/). Also, the registration for [SpringOne Platform](http://springoneplatform.io/) (early August, Las Vegas) has opened recently, in case you want to benefit from early bird ticket pricing.