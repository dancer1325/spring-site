---
title: Introducing Microservices Patterns with Spring Integration
source: https://spring.io/blog/2023/01/25/introducing-microservices-patterns-with-spring-integration
scraped: 2026-02-23T10:15:05.939Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Artem Bilan |  January 25, 2023 | 1 Comment
---

# Introducing Microservices Patterns with Spring Integration

_Engineering | Artem Bilan |  January 25, 2023 | 1 Comment_

Hey Spring Community!

I hope you are enjoying [Spring One Essentials](https://springone.io/) these days. The most exciting feature for me is an [Observability](https://springone.io/sessions/observability-of-your-application) which is spread throughout the Spring portfolio from now on. Nevertheless, today I’d like to share with a project I’m working on since holidays, where the mentioned observability makes a perfect sense, too.

I’ll start from the far. Let’s imagine we are learning a new programming language! I do learn [Go](https://go.dev/tour/welcome/1) to better understand Kubernetes, for example. Of course, we deal with some primitives and basic structures, first of all. Then we implement some well-known algorithms like bubble sort, Fibonacci number or sqrt function to get used to the language style and expectations. And now what? We have some real use-cases where this or that functionality can be covered by some patterns. So, we go and learn those patterns(or we know them already) and trying to implement them ourselves to meet our project requirements. But mostly (like me) we search for already existing solutions for the frameworks and tools we are using all the time to minimize our own code base and maintenance burden. Plus such a catalog (or library) of ready to use pattern implementations helps developers to communicate each other in the same concise language.

Now to the ground. The tool and framework for me which I use and develop on daily basis, of course, is [Spring Integration](https://spring.io/projects/spring-integration) which is already a reference implementation of well-know [Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com). At the same time a messaging model as a core feature of this project allows to implement easily scaled loosely-coupled architecture not only between services, but even within one application context. In addition, it comes with many ready-to-use components and utilities, such as retry advice, SpEL evaluation and scripting languages support. Or distributed locks and leader election. Of course, I can go on and go on talking about various channel adapters, DSLs or even Reactive Streams support. But the goal of this blog post is to share with you something which would make your experience with modern cloud and microservices applications development easier when you are already familiar with Spring Integration.

So, please, meet a [Microservices Patterns with Spring Integration](https://github.com/artembilan/microservices-patterns-spring-integration) project which, essentially, is a set (catalog) of working samples for Microservices Patterns described on [Microservice Architecture](https://microservices.io/index.html). In addition, since Spring Integration is fully based on messaging, which can be distributed, we also include some [Event Streaming Patterns](https://iwringer.wordpress.com/2015/08/03/patterns-for-streaming-realtime-analytics) implementations. Every module of this project is a self-containing Spring Boot application, which in most cases should be verified through provided tests because some features may require a real environment. The solutions presented in this project cannot be moved as out-of-the-box components to any framework(Spring Integration, Spring Cloud Stream etc.) because they require some code adjustments according to the target project you develop. For example the current `Normalizer` pattern has only HTTP and directory poller as entry points, and can convert from limited number of types; the `Outbox` pattern deals with JDBC and Apache Kafka, and so on.

The project is on its early stage, and I’m going to come back to it when I read [Microservices patterns](https://microservices.io/book) and [Streaming Systems](https://www.oreilly.com/library/view/streaming-systems/9781491983867/) books. Please, reach us out with any feedback and if you have some use-case ([Watermarks?](https://vldb.org/pvldb/vol14/p3135-begoli.pdf)) which fits to Microservices or Streaming Systems architecture, don’t hesitate to share your thoughts and possible solution with Spring Integration! And right: the next pattern I’m looking at to add is a [Distributed Tracing](https://microservices.io/patterns/observability/distributed-tracing.html) based on a [Micrometer Observation](https://micrometer.io/docs/observation) mentioned before.

Cheers,   
Artem