---
title: Reactive Spring
source: https://spring.io/blog/2016/02/09/reactive-spring
scraped: 2026-02-23T19:14:37.659Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rossen Stoyanchev |  February 09, 2016 | 18 Comments
---

# Reactive Spring

_Engineering | Rossen Stoyanchev |  February 09, 2016 | 18 Comments_

At SpringOne2GX 2015, Juergen [announced plans](http://www.infoq.com/news/2015/09/spring-43-5) for Spring Framework 5 with a major focus on reactive architectures. Concrete efforts are already underway and a lot has happened since!

At the most basic level, reactive programming models allow for writing non-blocking services and applications. This requires a fundamental shift from writing imperative logic to async, non-blocking, functional-style code, in particular when interacting with external resources.

### [](#reactive-web-applications)Reactive Web Applications

Most Java web applications are built on the Servlet API which was originally created with synchronous and blocking semantics. Over the years, support for asynchronous requests (Servlet 3.0) and non-blocking I/O (Servlet 3.1) was added. In Spring MVC, we've found that it is feasible to add selective async HTTP request handling to existing applications. However, we've also found that it is very hard to introduce non-blocking I/O within an existing ecosystem of web frameworks and applications. Doing so requires very deep change all the way to the core contracts which need to switch from blocking to async semantics.

One reason for the continued popularity of Spring MVC is its intuitive, annotation-based programming model based on flexible controller method signatures. Fortunately, the same can continue to serve as a foundation for reactive web applications. This is the direction for the Spring Reactive effort where you will find a [TestController](https://github.com/spring-projects/spring-framework/blob/2d7742b2145833dfbf6e107d8427724b26120ae9/spring-webflux/src/test/java/org/springframework/web/reactive/result/method/annotation/RequestMappingMessageConversionIntegrationTests.java#L425) that looks like any Spring MVC controller but runs on a new reactive engine with integration tests against Tomcat, Jetty, Undertow, and Netty. Note that this project will get merged into the Spring Framework master branch shortly after the 4.3 release in May, in preparation for the 5.0 M1 release in June.

### [](#reactive-foundation)Reactive Foundation

A key ingredient to this effort is the [Reactive Streams spec](https://github.com/reactive-streams/reactive-streams-jvm/blob/v1.0.0/README.md#specification) whose purpose is to provide a *"standard for asynchronous stream processing with non-blocking backpressure"*. The spec enables interop among disparate async component providers: from HTTP servers to web frameworks, database drivers, etc. It will be included in JDK 9 as [java.util.concurrent.Flow](http://download.java.net/jdk9/docs/api/java/util/concurrent/Flow.html).

The spec is small and consists of 4 interfaces, some rules, and a TCK. To expose it as an API however requires infrastructure around it for composing asynchronous logic. Spring Reactive uses [Reactor Core](https://github.com/reactor/reactor-core), a small and focused library which serves as a foundation for libraries and frameworks that want to build on Reactive Streams. For those who may be familiar with [Project Reactor](http://projectreactor.io/), a lot has happened over the past 6-8 months leading up to this week's release of Reactor Core 2.5 M1, which [Stephane Maldini](https://twitter.com/smaldini) will provide a full update on soon.

Stay tuned for further blog posts on reactive programming from different Spring projects. Also, expect some reactive buzz at this year's [Spring I/O](http://www.springio.net/) conference in beautiful Barcelona!