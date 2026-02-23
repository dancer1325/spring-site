---
title: Spring | Reactive
source: https://spring.io/reactive
scraped: 2026-02-19T07:46:57.702Z
description: Level up your Java code and explore what Spring can do for you.
---

![](/img/extra/reactive-6.svg)

# [](#reactive)Reactive

Reactive systems have certain characteristics that make them ideal for low-latency, high-throughput workloads. Project Reactor and the Spring portfolio work together to enable developers to build enterprise-grade reactive systems that are responsive, resilient, elastic, and message-driven.

### What is reactive processing?

Reactive processing is a paradigm that enables developers build non-blocking, asynchronous applications that can handle back-pressure (flow control).

### Why use reactive processing?

Reactive systems better utilize modern processors. Also, the inclusion of back-pressure in reactive programming ensures better resilience between decoupled components.

![](/img/extra/reactive-2.svg)![](/img/extra/reactive-2-dark.svg)

# Project Reactor

Project Reactor is a fully non-blocking foundation with back-pressure support included. It’s the foundation of the reactive stack in the Spring ecosystem and is featured in projects such as Spring WebFlux, Spring Data, and Spring Cloud Gateway.

[Learn more](https://projectreactor.io/)

# Reactive Microservices

![](/img/extra/reactive-4.svg)![](/img/extra/reactive-4-dark.svg)

One of the main reasons developers move from blocking to non-blocking code is efficiency. Reactive code does more work with fewer resources. Project Reactor and Spring WebFlux let developers take advantage of multi-core, next-generation processors—handling potentially massive numbers of concurrent connections. With reactive processing, you can satisfy more concurrent users with fewer microservice instances.

# Reactive Microservices With Spring Boot

The Spring portfolio provides two parallel stacks. One is based on a Servlet API with Spring MVC and Spring Data constructs. The other is a fully reactive stack that takes advantage of Spring WebFlux and Spring Data’s reactive repositories. In both cases, Spring Security has you covered with native support for both stacks.

![](/img/extra/reactive-5.svg)![](/img/extra/reactive-5-dark.svg)

# Integration with common technologies

Accessing and processing data in a reactive way is important. MongoDB, Redis, and Cassandra all have native reactive support in [Spring Data](/projects/spring-data). Many relational databases (Postgres, Microsoft SQL Server, MySQL, H2, and Google Spanner) have reactive support via [R2DBC](https://github.com/r2dbc). In the world of messaging, [Spring Cloud Stream](/projects/spring-cloud-stream) also supports reactive access to platforms like RabbitMQ and Kafka.

## Ready to get started?

## More resources

[![Reactive Relational Database Connectivity with Spring](/img/extra/reactive-1.png)](https://youtube.com/watch?v=xQEJFUPeQ_8)

# [Reactive Relational Database Connectivity with Spring](https://youtube.com/watch?v=xQEJFUPeQ_8)

Mark Paluch

[![Main Stage Presentation at SpringOne 2019](/img/extra/reactive-2.png)](https://youtube.com/watch?v=Tr04KiJdAXQ)

# [Main Stage Presentation at SpringOne 2019](https://youtube.com/watch?v=Tr04KiJdAXQ)

Stephane Maldini and Violeta Georgieva

[![Spring Tips &colon; Debugging Reactive Applications](/img/extra/reactive-3.png)](https://www.youtube.com/watch?v=0oI_-xBhAK8)

# [Spring Tips &colon; Debugging Reactive Applications](https://www.youtube.com/watch?v=0oI_-xBhAK8)

Josh Long

![](/img/extra/footer.svg)

## Get ahead

VMware offers training and certification to turbo-charge your progress.

[Learn more](https://spring.academy/)

## Get support

Tanzu Spring offers support and binaries for OpenJDK™, Spring, and Apache Tomcat® in one simple subscription.

[Learn more](/support)

## Upcoming events

Check out all the upcoming events in the Spring community.

[View all](/events)