---
title: Reactive Programming with Spring 5.0 M1
source: https://spring.io/blog/2016/07/28/reactive-programming-with-spring-5-0-m1
scraped: 2026-02-23T19:02:57.601Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rossen Stoyanchev |  July 28, 2016 | 43 Comments
---

# Reactive Programming with Spring 5.0 M1

_Engineering | Rossen Stoyanchev |  July 28, 2016 | 43 Comments_

As Juergen mentioned in his Spring Framework 5 M1 [release announcement](https://spring.io/blog/2016/07/28/spring-framework-5-0-m1-released) our Spring Reactive initiative has been merged into Spring Framework proper preserving all contributions and its full history over more than a year.

## [](#what-is-it)What is it?

In a nutshell reactive programming is about non-blocking, event-driven applications that scale with a small number of threads with backpressure as a key ingredient that aims to ensure producers do not overwhelm consumers. The [Reactive Streams specification](https://github.com/reactive-streams/reactive-streams-jvm) (also adopted in Java 9) enables the ability to communicate demand across layers and libraries from different providers. For example an HTTP connection writing to a client can communicate its availability to write all the way upstream to a data repository fetching data from a database so that given a slow HTTP client the repository can slow down too or even pause. For a more extensive introduction to reactive programming check Dave Syer's multipart series ["Notes on Reactive Programming"](https://spring.io/blog/2016/06/07/notes-on-reactive-programming-part-i-the-reactive-landscape).

A practical challenge when switching from imperative-style logic to non-blocking is the ability to compose async logic without getting lost in "callback hell". A good example of the kind of API we need are the `CompletionStage` and `Stream` API in Java 8. However `Stream` was really built for Collections and is not well suited for infinite or latency sensitive sequences such as we often have with non-blocking I/O and event-driven applications. [Reactor](https://projectreactor.io/) and its upcoming 3.0 GA release is a Reactive Streams implementation that extends a Reactive Streams `Publisher` with the `Flux` and `Mono` API types providing a declarative composition API similar to that of Java 8 Stream but more extensive and more comparable with the [ReactiveX](http://reactivex.io/) patterns. For more on this check Sebastien Deleuze's ["Understanding Reactive Types"](https://spring.io/blog/2016/04/19/understanding-reactive-types).

## [](#whats-in-the-box)What's in the box?

Spring Framework 5 embraces Reactive Streams and Reactor for its own reactive use as well as in many of its core APIs. The M1 release provides reactive serialization and deserialization to and from JSON (Jackson) and XML (JAXB), a reactive web framework that supports the `@Controller` programming model, and a reactive `WebClient`. It becomes easy to support input and output streaming scenarios for microservices, scatter/gather, data ingestion, and so on.

Below is a controller that obtains and streams data from a remote server in a completely non-blocking and reactive manner:

```java
Copy@GetMapping("/accounts/{id}/alerts")
public Flux<Alert> getAccountAlerts(@PathVariable Long id) {

  return this.repository.getAccount(id)
      .flatMap(account ->
          this.webClient
              .perform(get("/alerts/{key}", account.getKey()))
              .extract(bodyStream(Alert.class)));
}
```

What is the reactive stack that supports this? Spring Web Reactive lives in the new `spring-web-reactive` module next to the existing (and popular!) Spring Web MVC that lives in the `spring-webmvc` module. The two modules share many algorithms and mechanisms but cannot actually share any code. This is because Spring Web Reactive runs on a Reactive Streams HTTP adapter layer that's fully non-blocking and reactive all the way down to the HTTP runtime. So while Spring MVC is built for and runs on Servlet containers, Spring Web Reactive runs also on non-Servlet runtimes such as on Netty and Undertow

## [](#spring-web-reactive-vs-spring-web-mvc)Spring Web Reactive vs Spring Web MVC

How does the Spring Framework team view these two frameworks you might wonder at this point and what do we recommend that you use? First and foremost we aim for the greatest possible consistency within reason. There is nothing fundamentally incompatible between the `@Controller` programming model and the reactive ways. It's all about what happens underneath to support that model so on the surface there is no difference except for the full support for reactive types such as `Flux` and `Mono` and `Observable` and `Single` from RxJava both for input and for output.

Is Spring Web Reactive better than Spring MVC? The greatest value proposition of the Spring Framework reactive support and our unique positioning is that we don't leave existing applications behind. In Spring 5, traditional Spring MVC keeps running on any Servlet 3.1 stack, including Java EE 7 servers. For Spring Web Reactive, we support Tomcat, Jetty, Undertow, and Netty without a compromise and can also adapt to any Servlet 3.1 container. We plan to continue the synergy between Spring MVC and Spring Web Reactive in terms of shared algorithms and mechanisms in support of the same programming model on top. Improvement requests or bug reports on the Spring MVC side will benefit Spring Web Reactive and vice versa.

That means you the developer can choose what’s better for your purposes. If anyone tells you that synchronous or blocking is evil look the other way. It's not and in reality it is a trade-off. Imperative style logic is simple to write and simpler to debug. Sure it doesn't scale as well or as efficiently but that's where the trade-off comes. There will always be many cases where imperative is just fine for the task at hand and others where reactive and non-blocking are a must. In a microservices scenario, you may even choose the implementation style per individual service, all within the same consistent programming model.

## [](#giving-it-a-try)Giving it a try

For more details and to get started see the Spring Boot [reactive web starter](https://github.com/bclozel/spring-boot-web-reactive) and the [new chapter](http://docs.spring.io/spring/docs/5.0.0.BUILD-SNAPSHOT/spring-framework-reference/htmlsingle/#web-reactive) in the reference documentation.

Last but not least I hope you are joining us at [SpringOne Platform 2016](https://springoneplatform.io/) where we have a keynote and numerous sessions on this topic. See you in Las Vegas!