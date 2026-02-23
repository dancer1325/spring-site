---
title: SpringOne2GX 2015 replay: Introducing CallTracing(tm), based on RabbitMQ, Spring and Zipkin
source: https://spring.io/blog/2016/03/15/springone2gx-2015-replay-introducing-calltracing-tm-based-on-rabbitmq-spring-and-zipkin
scraped: 2026-02-23T19:23:41.290Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Pieter Humphrey |  March 15, 2016 | 0 Comments
---

# SpringOne2GX 2015 replay: Introducing CallTracing(tm), based on RabbitMQ, Spring and Zipkin

_News | Pieter Humphrey |  March 15, 2016 | 0 Comments_

Recorded at SpringOne2GX 2015. Speaker: Monish Unni Data / Integration Track Slides: [http://www.slideshare.net/SpringCentral/introducing-calltracing-tm-based-on-rabbitmq-spring-and-zipkin](http://www.slideshare.net/SpringCentral/introducing-calltracing-tm-based-on-rabbitmq-spring-and-zipkin) Do you live in a world where StackTraces aren’t quite enough? There is no easy way for you to predict how a certain set of services might be called or what their usage patterns are? Does everything work in DIT/SIT/UAT/PELT until you hit production and strange things start to happen due to distribution of services? Solution: Use RabbitMQ (AMQP protocol) and spring proxies/interceptors to enable an out-of-band instrumentation to trace requests and gain deep knowledge about how certain requests perform in a distributed system. In 2014, as part of infrastructure wide changes, I introduced calltracing(tm) as a way to correlate requests from a single user across E*Trade's heterogeneous systems. This ""trace"" is then consumed by various big-data analytic tools to produce aggregated reports. Zipkin(tm) is a collector, digester and a visualization front-end for the aggregated data. in other words, it’s a distributed tracing system that can show timing data for services that are on various nodes. Zipkin manages both collection and lookup of data through a collector and a query service. In this session, i will discuss specifically how E*Trade’s disparate services are stitched together using RabbitMQ(AMQP protocol) and Spring Proxies to form the enablement tier to provide data to Zipkin.