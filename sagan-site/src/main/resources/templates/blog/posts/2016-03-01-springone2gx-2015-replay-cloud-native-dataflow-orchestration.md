---
title: SpringOne2GX 2015 replay: Cloud Native Dataflow Orchestration
source: https://spring.io/blog/2016/03/01/springone2gx-2015-replay-cloud-native-dataflow-orchestration
scraped: 2026-02-23T19:25:35.128Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Pieter Humphrey |  March 01, 2016 | 0 Comments
---

# SpringOne2GX 2015 replay: Cloud Native Dataflow Orchestration

_News | Pieter Humphrey |  March 01, 2016 | 0 Comments_

Recorded at SpringOne2GX 2015. Speakers: Mark Fisher & Patrick Peralta Big Data Track Slides: [http://www.slideshare.net/SpringCentral/cloud-native-data-flow-orchestration](http://www.slideshare.net/SpringCentral/cloud-native-data-flow-orchestration)

The Spring Cloud Stream and Spring Cloud Task projects provide a simple and powerful framework for creating cloud native data microservices for stream and batch processing. Each microservice in these distributed systems consists of a stand-alone Spring Boot application.

While it is possible to define data pipelines across these microservice apps manually, Spring Cloud Data Flow is an integrated orchestration layer that provides a highly productive deployment and management experience for development and ops. Streams and tasks are defined using the same DSL and shell/UI introduced with Spring XD. Furthermore, a pluggable runtime SPI allows Spring Cloud Data Flow to coordinate these applications across a variety of distributed runtime platforms including Apache YARN, Lattice, and Cloud Foundry.

This session will provide an overview of the Spring Cloud Data Flow architecture – including how it evolved out of Spring XD. Additionally, a streaming application will be deployed on each of the supported runtimes in a live demo.