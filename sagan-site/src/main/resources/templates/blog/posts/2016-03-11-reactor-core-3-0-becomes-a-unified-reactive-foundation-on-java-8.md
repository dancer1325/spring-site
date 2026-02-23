---
title: Reactor Core 3.0 becomes a unified Reactive Foundation on Java 8
source: https://spring.io/blog/2016/03/11/reactor-core-3-0-becomes-a-unified-reactive-foundation-on-java-8
scraped: 2026-02-23T19:02:53.230Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Stephane Maldini |  March 11, 2016 | 11 Comments
---

# Reactor Core 3.0 becomes a unified Reactive Foundation on Java 8

_Releases | Stephane Maldini |  March 11, 2016 | 11 Comments_

\[Update\] Following our [Reactor 2.5 introduction](https://spring.io/blog/2016/02/16/reactor-2-5-a-second-generation-reactive-foundation-for-the-jvm), we shifted the version to 3.0 to reflect better the major redesign effort overtaken.

# [](#a-meaningful-composition-api)A meaningful composition API

The former **reactor-stream** module has been merged into Reactor Core 3.0. [Flux](http://projectreactor.io/core/docs/api/reactor/core/publisher/Flux.html) and [Mono](http://projectreactor.io/core/docs/api/reactor/core/publisher/Mono.html) respectively representing **0..N** and **0..1** sequence types now cover a solid range of operations for the following categories:

-   Cold-to-Hot or Multicasting : `publish`, `publishNext`, `cache`, `multicast`...
-   Aggregating/Reducing (Transforming) : `buffer`, `reduce`, `scan`, `window`, `sample`...
-   Filtering : `filter`, `exists`, `single`...
-   Conditioning : `timeout`, `take`, `takeUntil`, `skip`, `skipUntil`...
-   Combining : `withLatestFrom`, `combineLatest`
-   Backpressuring : `onBackpressureDrop`, `onBackpressureLatest`...

While the capabilities existed, we are now using the hyper efficient [Reactive Streams Commons](http://github.com/reactor/reactive-streams-commons) operator implementations.

![](https://raw.githubusercontent.com/reactor/projectreactor.io/c67e756cc8e17cc52b6845d216645a4f81571fc0/src/main/static/assets/img/org3.png)

# [](#designed-for-java-8-and-beyond)Designed for Java 8 and beyond

**[All Reactor 3.0 projects](http://projectreactor.io) have been upgraded to Java 8**. While the JVM market is getting standardized on Java 8, we see no reason to delay further our transition. Let's enumerate the benefits :

-   All "backported" functional callbacks in `reactor.fn` have been replaced by `java.util.function`. As a result Reactor offers a standard interactive contract and a competitive surface API.
-   Convert `Flux` to/from `java.util.stream.Stream`
-   Convert `Mono` to/from `CompletableFuture`
-   Safely create `Mono` from `Optional`
-   Sane time period support with `Duration`
-   Dropped shadowed JSR 166 backport for ConcurrentHashMap use specially affecting [Reactor Addons](http://github.com/reactor/reactor-addons)
-   A massive step closer to the programming experience delivered by Spring Framework 5, itself building on Java 8.

Some Java 8 extractors and generators in action:

```
Copyjava.util.stream.Stream<String> stream = 
    Mono.fromFuture(someCompletableFuture)
        .timeout(Duration.ofSeconds(30))
        .log("hello")
        .flatMap( pojo -> Flux.just(pojo.getId(), pojo.getName())
        .toStream();

Flux.fromStream(stream)
    .delayMillis(1000L)
    .subscribe(System.out::println);
```

We could envision a backport for Android compatibility later, still our focus for now is on Java 8 applications and onward.

# [](#highlights)Highlights

-   Updated [Javadoc](http://projectreactor.io/core/docs/api/) with more Marble Diagram illustrations.
-   100% `Flux` and `Mono` operational design based on the collaboration effort [Reactive Streams Commons](http://github.com/reactor/reactive-streams-commons)

\-- [Build on years of experience](http://akarnokd.blogspot.co.uk/2016/03/rxjava-design-retrospect.html) from `Reactive4Java`, `RxJava` and `Reactor` -- Efficient, really efficient, supports even further efficiency with operation fusion -- More Performance benchmarks from [Reactive Streams Commons](https://github.com/reactor/reactive-streams-commons/tree/master/src/jmh/java/reactivestreams/commons)

-   Available concurrency and prefetch arguments for operators with queue
-   `Mono` publish-subscribe : `MonoProcessor<T>`
-   More tests : combining current Reactive Streams Commons **(879)** and Core **(1153**) plus our internal early adopters such as Spring Framework 5 and Cloud Foundry Java Client.

Refer to the [issues tracker](http://github.com/reactor/reactor-core) for more details.

# [](#whats-onnext-)What's (on)Next ?

With this release we have a foundation we think will be useful for library and application developers alike. We are ready to collect more feedbacks while our next stop will be on [Reactor IPC](http://github.com/reactor/reactor-ipc) : Reactor Aeron and Reactor Netty. There are great plans stirring for months now for these two Reactor IPC modules to help you cross network boundaries with backpressure factored-in ! The two inspiring traits are the same as in Reactor Core : Focus on API and Efficiency, no extra ceremony or academic background required.

In parallel we are doubling our effort on creating various *starting experiences*, expect some blogging, guides and close collaboration with the Spring Boot team to get this awesomeness right at your fingertip with little fuss.