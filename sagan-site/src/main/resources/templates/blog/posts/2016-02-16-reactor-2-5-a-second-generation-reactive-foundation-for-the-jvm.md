---
title: Reactor 2.5 : A Second Generation Reactive Foundation for the JVM
source: https://spring.io/blog/2016/02/16/reactor-2-5-a-second-generation-reactive-foundation-for-the-jvm
scraped: 2026-02-23T19:02:48.127Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Stephane Maldini |  February 16, 2016 | 9 Comments
---

# Reactor 2.5 : A Second Generation Reactive Foundation for the JVM

_Releases | Stephane Maldini |  February 16, 2016 | 9 Comments_

## [](#entering-reactive-streams-era)Entering Reactive Streams Era

Reactor 2.0 development started by the end of 2014, around the same time as [Reactive Streams](http://reactive-streams.org). We were keen on joining the effort and early adopt a [backpressure protocol](https://github.com/reactive-streams/reactive-streams-jvm) to mitigate our main message-passing limitation: *bounded capacity*. We delivered in Reactor 2.0 the first attempt to make Reactive Streams implementations of [RingBuffer-based](https://en.wikipedia.org/wiki/Circular_buffer) schedulers and derived an increasingly popular reactive pattern: [Reactive Extensions](https://msdn.microsoft.com/en-gb/data/gg577609.aspx).

Meanwhile, Reactive Streams started getting traction and an entire ecosystem of libraries discussed this transition. The regular concern ? Implementing Reactive Streams semantics is all but an easy task. We observed an increasing need for a reactive foundation to solve message-passing and implement common streaming operators. We therefore created a dedicated project space for Reactor Core and started a focused effort [with Spring Framework team](https://spring.io/blog/2016/02/09/reactive-spring).

Starting from 2.5, Reactor is now [organized into multiple projects](https://github.com/reactor/reactor/blob/master/README.md), maintenance branches such as [2.0.x](https://github.com/reactor/reactor/tree/2.0.x) are left unaltered. This is reflected in release management, for instance [Reactor Core 2.5 M1](https://github.com/reactor/reactor-core) is the only milestone available and other projects will follow with their exclusive versioning.

[![](https://raw.githubusercontent.com/reactor/projectreactor.io/4f70afd5091502565cb8540a7c8195195f3e8801/src/main/static/assets/img/modules.png)](http://projectreactor.io/docs) To support this new project model, we deployed a new and hopefully more welcoming site on [http://projectreactor.io](http://projectreactor.io).

## [](#a-collaborative-new-take-on-reactive-streams)A collaborative new take on Reactive Streams

This new organization unlocked a far cheaper ticket price to get involved with the project activities. The project benefits from Spring API design collaboration and direct contributions notably from [Sébastien Deleuze](http://twitter.com/sdeleuze) and [Brian Clozel](http://twitter.com/brianclozel). Reactor also welcomes the help of new external contributors and reviewers :

-   [Alex Petrov](http://twitter.com/ifesdjeen) re-inventing the popular Reactor [event routing](http://github.com/reactor/reactor-addons) features.
-   [Anatoly Kadyshev](http://twitter.com/akadyshev) who works on the amazingly efficient [Aeron](https://gitter.im/real-logic/Aeron) Reactive Streams bridge for [Reactor IO](http://github.com/reactor/reactor-io).
-   [Ben Hale](http://twitter.com/nebhale) and his team working on the new [Reactive Cloud Foundry Client API](https://github.com/cloudfoundry/cf-java-client). More than early adopting Reactor 2.5 Core and Stream, Ben keeps iterating with us on his real-world use cases.
-   [Damien Vitrac](http://twitter.com/oodamien) contributing the new [project site](http://projectreactor.io) style and preparing the Reactor Console user experience.
-   [Dávid Karnok](http://twitter.com/akarnokd), researcher, main active [RxJava committer](https://github.com/ReactiveX/RxJava) and author of the excellent [Advanced RxJava blog](http://akarnokd.blogspot.com), strongly influenced our internal operational model. Our shared passion for efficiency and reactive patterns led us to create a research space, Reactive Streams Commons.

[

Dependencies and Collaborations at play with Reactor 2.5

![Reactor 2.5](http://raw.githubusercontent.com/reactor/projectreactor.io/9b16855da55e82cff4186fc088f900a284c015d8/src/main/static/assets/img/org3.png)

](http://raw.githubusercontent.com/reactor/projectreactor.io/9b16855da55e82cff4186fc088f900a284c015d8/src/main/static/assets/img/org3.png)

### [](#reactive-streams-commons)Reactive Streams Commons

[The Reactive Streams Commons repository](https://github.com/reactor/reactive-streams-commons) is an open research effort focusing on efficiency with [Reactive Extensions](http://reactivex.io) and more, for the [Reactive Streams specification](http://reactive-streams.org). It is fully inlined by Reactor Core and Stream which operate as contract gates for the many revolutions the effort focuses on.

"RSC" is therefore a freeform project similar to the [JCTools](https://github.com/JCTools/JCTools) take on concurrent queues. One of its biggest progress is a form of "Fusion" protocol to reduce overhead of most synchronous and some asynchronous stages in a reactive processing chain. Finally, the effort helped fixing more than a hundred of streaming bugs and our testing process now involves RSC unit/integration testing and [JMH benchmarks](https://github.com/reactor/reactive-streams-commons/tree/master/src/jmh/) combined with Reactor own integration testing and [benchmarks](https://github.com/reactor/reactor-benchmarks).

## [](#reactor-core-250m1)Reactor Core 2.5.0.M1

Today's Reactor blog series starts with a joyful event, Reactor Core 2.5.0.M1 release ! Under its new scope and close ties with Reactive Streams Commons, Reactor Core offers just enough Rx coverage to build reactive apps or libraries alike , e.g. [Spring Reactive Web support](https://github.com/spring-projects/spring-reactive). For the impatient reader, have a look at the already [available quickstart on github](https://github.com/reactor/lite-rx-api-hands-on).

A quick glance at a *scatter-gather* scenario:

```
CopyMono.from(userRequestPublisher)
    .then(userRepository::findUserProfile, 
          userRepository::findUserPaymentMethod)
    .log("user.requests")
    .or(Mono.delay(5)
            .then(n -> Mono.error(new TimeoutException()))
    .mergeWith(userRepository::findSimilarUserDetails)
    .map(userDetailsTuple -> userDetailsTuple.t1.username)
    .publishOn(SchedulerGroup.io())
    .subscribe(responseSubscriber);
```

In details :

-   [Flux](http://projectreactor.io/core/docs/api/reactor/core/publisher/Flux.html), a [Publisher](http://www.reactive-streams.org/reactive-streams-1.0.0-javadoc/org/reactivestreams/Publisher.html?is-external=true) of **0 to N** data signals with a lite Rx scope. Operators include `create()`, `interval()`, `merge()`, `zip()`, `concat()`, `switchOnError()` and `switchOnEmpty()`

![Flux in action](https://raw.githubusercontent.com/reactor/projectreactor.io/master/src/main/static/assets/img/marble/flatmap.png)

-   [Mono](http://projectreactor.io/core/docs/api/reactor/core/publisher/Mono.html), a [Publisher](http://www.reactive-streams.org/reactive-streams-1.0.0-javadoc/org/reactivestreams/Publisher.html?is-external=true) of **0 or 1** data signal with a lite Rx derived scope adapted to strongly type this specific volume nature. Operators include `delay()`, `then()`, `any()`, `and()`, `or()`, `otherwise()`, `otherwiseIfEmpty()`, `where()` and a blocking `get()`.

![Mono in action](https://raw.githubusercontent.com/reactor/projectreactor.io/master/src/main/static/assets/img/marble/then.png)

-   New simple scheduling contract based on plain Java interfaces (Runnable, Callable).

\-- Featuring [SchedulerGroup](http://projectreactor.io/core/docs/api/reactor/core/publisher/SchedulerGroup.html), [TopicProcessor](http://projectreactor.io/core/docs/api/reactor/core/publisher/TopicProcessor.html) and [WorkQueueProcessor](http://projectreactor.io/core/docs/api/reactor/core/publisher/WorkQueueProcessor.html). -- Superseed the former `Enviroment`/`Dispatcher` couple while answering the same needs and a simple migration path will shortly be documented. No more static state holding references of dispatchers. -- Linked operators : `publishOn()` and `dispatchOn()`

-   Test support for `Publisher` sources with [TestSubscriber](http://projectreactor.io/core/docs/api/reactor/core/test/TestSubscriber.html).
-   Convert `Callable`, `Runnable`, `Iterable`, Java 8 `CompletableFuture`, Java 9 `Flow.Publisher`, RxJava 1 `Observable` and `Single` to Reactive Streams ready `Flux` and `Mono`, no extra bridge dependency required.
-   Fully revamped and integrated [Javadoc](http://projectreactor.io/core/docs/api/), including slightly adjusted marble diagrams.
-   A micro toolkit of utils and base [Subscriber](http://www.reactive-streams.org/reactive-streams-1.0.0-javadoc/org/reactivestreams/Subscriber.html?is-external=true) to reuse at will to implement your own Reactive components.

\-- A cost-efficient Timer API and implementation (hash-wheel timer). -- New Fusion API to virtually conflate 2 or more stages from a reactive chain -- An adapted `QueueSupplier` that will provide the right queue for the right capacity

-   New Introspection API based on [state](http://projectreactor.io/core/docs/api/index.html?reactor/core/state/package-summary.html) and [flow](http://projectreactor.io/core/docs/api/index.html?reactor/core/state/package-summary.html) representations.

\-- `Publisher` Logging with fallback to `java.util.logging` or SLF4J if available. Can directly be used on `Flux` and `Mono` with [log()](http://projectreactor.io/core/docs/api/reactor/core/publisher/Flux.html#log--) operator. -- Orthogonal to any other contract including Reactive Streams, everything can be `Backpressurable` , a `Completable` or be a `Receiver` producing to a generic `Object` (possibly a Subscriber), which in return allows us to trace down the full graph of a flow and augment it with state indicators: ![](https://raw.githubusercontent.com/reactor/projectreactor.io/27f2d8e3cbbed8f8e0d8d27f9c423c906adbbaa4/src/main/static/assets/img/reactor.gif)

# [](#whats-onnext-)What's (on)Next ?

We'd like to collect your very feedback, you can assault the respective issues repository or join our recently created [Gitter channel](http://gitter.im/reactor/reactor). Stay tuned for the next entry about Reactor Stream 2.5.0.M1, the complete Rx over Reactive Streams implementation.