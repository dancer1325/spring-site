---
title: Ready your Java 8 Reactive apps now, Reactor 3.0 GA is out !
source: https://spring.io/blog/2016/09/27/ready-your-java-8-reactive-apps-now-reactor-3-0-ga-is-out
scraped: 2026-02-23T19:02:43.073Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Stephane Maldini |  September 27, 2016 | 6 Comments
---

# Ready your Java 8 Reactive apps now, Reactor 3.0 GA is out !

_Releases | Stephane Maldini |  September 27, 2016 | 6 Comments_

After more [than a year of work](https://spring.io/blog/2016/02/16/reactor-2-5-a-second-generation-reactive-foundation-for-the-jvm), [multiple milestones](https://spring.io/blog/2016/03/11/reactor-core-3-0-becomes-a-unified-reactive-foundation-on-java-8) and fine tuning based on much feedback, I have the pleasure of announcing Reactor 3 General Availability. You will find Reactor Core 3.0.2.RELEASE on Maven Central.

[![Join the chat at https://gitter.im/reactor/reactor](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/reactor/reactor?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Reactor Core](https://maven-badges.herokuapp.com/maven-central/io.projectreactor/reactor-core/badge.svg?style=plastic)](http://mvnrepository.com/artifact/io.projectreactor/reactor-core)

## [](#what-is-reactor-3-)What is Reactor 3 ?

Reactor 3 provides a powerful and efficient [reactive](http://reactive-streams.org) programming model for Java 8 based applications. The model builds upon the experience of both *Reactor 2* and *RxJava 1* and introduces a fluent way to compose asynchronous backpressure-ready event processing. [Spring Framework 5 uses Reactor 3](https://spring.io/blog/2016/07/28/reactive-programming-with-spring-5-0-m1) to build and eventually expose a [complete reactive story](https://spring.io/blog/2016/09/22/new-in-spring-5-functional-web-framework).

Its design relies on an extensible execution model that favors event processing colocation. Typically, Reactor will be jumping threads between event flow stages only when explicitly asked so. For instance, in-memory operations such as list access or payload transformation do not usually require a thread boundary. If the operation producer or receiver might take time, users are expected to operate their flow with `Flux#publishOn` / `Mono#publishOn` or `Flux#subscribeOn` / `Mono#subscribeOn` and choose a [Scheduler](http://projectreactor.io/core/docs/api/reactor/core/scheduler/Schedulers.html) to run on. Alternatively, if a user is combining the results of many `Publisher` as with *merge* or *concat*, Reactor will implicitly deal in a thread-safe way with various potential thread boundaries. In effect a flow stage hosted by a `Publisher` might be traversed by a producing and a receiving thread at least.

All of this is implemented in compliance with the behaviors defined by the [Reactive Streams specification](https://github.com/reactive-streams/reactive-streams-jvm). Reactor works at making the spec a commodity for library writers or Spring developers with pre-made operators you would apply in a streaming and/or asynchronous scenario.

## [](#mono-and-flux)Mono and Flux

A flow definition is what Reactor calls a chain of [Flux](http://projectreactor.io/core/docs/api/reactor/core/publisher/Flux.html) or [Mono](http://projectreactor.io/core/docs/api/reactor/core/publisher/Mono.html) depending on the volume flowing into the defined stream. These types implement Reactive Streams `Publisher` at every stage and can be passed around generically. Why *two* reactive types then ? Because the cardinality matters to Reactor. A `Flux` will observe 0 to N items and eventually terminate successfully or not. A `Mono` will observe 0 or 1 item, with `Mono<Void>` hinting at most 0 item.

Let's look at the following blocking API :

```java
Copyinterface BlockingUserRepository {
     User get(String id);
     List<User> findAll();
     void save(User data) throws RepositoryException;
     List<User> findAllByUsernameLike(String s);
}
```

Using plain Reactive Streams `Publisher`, we would get the following contract :

```java
Copyinterface ReactiveUserRepository {
     Publisher<User> get(String id);
     Publisher<User> findAll();
     Publisher<Void> save(Publisher<? extends User> source);
     Publisher<User> findAllByUsernameLike(String s);
}
```

But with Reactor we can keep semantic evidence of the intended cardinality :

```java
Copyinterface ReactorUserRepository {
     Mono<User> get(String id);
     Flux<User> findAll();
     Mono<Void> save(Publisher<? extends User> source);
     Flux<User> findAllByUsernameLike(String s);
}
```

Since both `Mono` and `Flux` implement `Publisher` we can easily pass any reference of them as *Reactive data source* while returning explicit semantics with `Mono<Void>` fluent API :

```java
Copy// ReactorUserRepository userRepository;

userRepository.save(Mono.fromCallable(() -> new User("thomas")))
              .doOnSuccess(res -> success())
              .subscribe();

userRepository.save(Flux.just(new User("bob"), new User("robert")))
              .doOnSuccess(res -> success())
              .subscribe();
```

Keep in mind that `Flux` and `Mono` are meant for data producers that might take time. To manage reentrance and thread safety, operators must sometimes add some overhead in the executed flow. Still, efficiency is a core focus and we are getting regular reports from our engine contributor David Karnok. Reactor 3 is currenly one of the most [efficient](https://github.com/akarnokd/akarnokd-misc/issues/2) reactive library on the JVM. In addition to these directly related benchmarks, we now benefit from RxJava 2 community feedback as well since it conceptually derives from the same smith and forge: [Reactive Streams Commons](http://github.com/reactor/reactive-streams-commons).

## [](#whats-next-)What's next ?

We are working on 3.0.3 for the next immediate weeks and we keep in sync with the latest needs from Spring 5, CloudFoundry and latest research from Reactive Streams Commons.

In priority we will address:

-   New Testing support: Reactor 3 was scheduled with testing support, however initial feedbacks raised a few user experience issues. We are now working on delivering that missing bit. Meanwhile, users can easily duplicate the isolated [TestSubscriber](https://github.com/reactor/reactor-core/blob/master/src/test/java/reactor/test/TestSubscriber.java) from our test for their needs.
    
-   Guidance: While Reactor 3 is becoming increasingly popular, we are still working with a lot of human interaction internally or externally, power user with Rx knowledge and the [quick tutorial](https://github.com/reactor/lite-rx-api-hands-on) contributed by [Sebastien Deleuze](https://twitter.com/sdeleuze). You will find more resources at the end of this post but we have started establishing some end-to-end scenarios that we find concrete, valuable and will help shaping an official reference reactor guide.
    

## [](#reactor-ipc)Reactor IPC

IPC stands for Inter-Process Communication and Reactor IPC is an ongoing initiative to answer the question "how to get away from the JVM in a Reactive Streams fashion". We are working on an initial set of implementations with [Reactor Kafka](https://github.com/reactor/reactor-kafka), [Reactor Aeron](https://github.com/reactor/reactor-aeron) & [Reactor Netty](https://github.com/reactor/reactor-netty). In fact a lot of things is going on right now with contract redesign and Reactor Kafka/Netty work that support some of the new Spring reactive stories. The intent of the IPC umbrella is not to create new web or messaging frameworks but reactive drivers applications or libraries alike can build on. They transform a given runtime input/output in `Flux` and `Mono` or `Subscriber`, propagating reactive backpressure up to the IO access layer. Expect a lot of news about these initiatives over the coming months.

## [](#credits)Credits

Let's take some time to credit the people behind this release. [David Karnok](http://twitter.com/akarnokd) is the main architect of the new Reactor engine and leads [Reactive Streams Commons](http://github.com/reactor/reactive-streams-commons) research effort. Spring, Eclipse STS and CloudFoundry Client teams were instrumental in contributing design improvements and feedbacks as well. Beyond Pivotal, MuleSoft has been massively helpful and proactive about the latest development.

[RxJava 1](http://reactivex.io) brought mainstream Reactive to the JVM and its complete functional Rx algebra has become an industrial-standard which we align with. It inspired the game-changing specification we implement with [Reactive Streams](http://reactive-streams.org) and brought together JVM key players such as Netflix, Oracle, Pivotal, Typesafe, Red Hat and many more.

## [](#resources)Resources

-   [Reactor 3 overview](http://www.slideshare.net/StphaneMaldini/reactor-30-a-reactive-foundation-for-java-8-and-spring)
-   [Hands-On](https://github.com/reactor/lite-rx-api-hands-on)
-   [Understanding Reactive Types](https://spring.io/blog/2016/04/19/understanding-reactive-types)
-   [Reactor + Spring 5](https://github.com/sdeleuze/spring-reactive-playground)
-   [Reactor + Spring Cloud Stream](https://github.com/viniciusccarvalho/spring-cloud-stream-ema-processor)
-   [Dave Syer](https://spring.io/team/dsyer) reactive series [part I](https://spring.io/blog/2016/06/07/notes-on-reactive-programming-part-i-the-reactive-landscape), [part II](https://spring.io/blog/2016/06/13/notes-on-reactive-programming-part-ii-writing-some-code) & [part III](https://spring.io/blog/2016/07/20/notes-on-reactive-programming-part-iii-a-simple-http-server-application)
-   Implementor Use Case : [CloudFoundry Java Client](https://github.com/cloudfoundry/cf-java-client)
-   [Public site](http://projectreactor.io)
-   [Github Org](http://github.com/reactor)

Stay tuned for more reactive stories ! The Reactor journey at Pivotal is only getting started, after much effort and research these past years we are excited to deliver a new experience. Our value proposition is directly correlated to Spring OSS, we have a unique opportunity to deliver reactive pipelines in an end-to-end fashion across all Spring portfolio.

To conclude, Spring and Reactor are praising our community, you, for the enormous support, encouragements and feedbacks. The feedback loop we have established for years is more than a nice pragmatic collaboration, it's what we all need to transform our industry step by step.