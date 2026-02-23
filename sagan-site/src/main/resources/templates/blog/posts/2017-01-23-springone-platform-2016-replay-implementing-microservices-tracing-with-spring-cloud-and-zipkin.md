---
title: SpringOne Platform 2016 Replay: Implementing Microservices tracing with Spring Cloud and Zipkin
source: https://spring.io/blog/2017/01/23/springone-platform-2016-replay-implementing-microservices-tracing-with-spring-cloud-and-zipkin
scraped: 2026-02-23T18:42:22.045Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Pieter Humphrey |  January 23, 2017 | 0 Comments
---

# SpringOne Platform 2016 Replay: Implementing Microservices tracing with Spring Cloud and Zipkin

_News | Pieter Humphrey |  January 23, 2017 | 0 Comments_

Recorded at SpringOne Platform 2016. Speakers: Marcin Grzejszczak, Reshmi Krishna Slides: [http://www.slideshare.net/SpringCentral/implementing-microservices-tracing-with-spring-cloud-and-zipkin](http://www.slideshare.net/SpringCentral/implementing-microservices-tracing-with-spring-cloud-and-zipkin)

2015 was the year of microservices. It’s already common knowledge that creating distributed systems is not easy. It’s 2016 and it’s time to show how that complexity can be contained.

Service Discovery and Registry (Zookeeper / Consul / Eureka), easy request sending with client side load balancing (Feign + Ribbon), request proxying with Zuul. Everything is easy with Spring Cloud. Just add a dependency, a couple of lines of configuration and you’re ready to go.

That’s fixing difficulties related to writing code - what about solving the complexity of debugging distributed systems? Log correlation and visualizing latency of parts of the system? Spring Cloud Sleuth to the rescue!

In this presentation, we’ll describe how to do distributed tracing with Spring Cloud Sleuth and Zipkin. Additionally, we'll show a demo of incorporating these technologies into an existing stock trading application. By the end, you should feel empowered to add distributed tracing into your own applications!