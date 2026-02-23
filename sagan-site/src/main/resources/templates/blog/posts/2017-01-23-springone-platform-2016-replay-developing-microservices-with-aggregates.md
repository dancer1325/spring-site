---
title: SpringOne Platform 2016 Replay: Developing microservices with aggregates
source: https://spring.io/blog/2017/01/23/springone-platform-2016-replay-developing-microservices-with-aggregates
scraped: 2026-02-23T18:42:13.379Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Pieter Humphrey |  January 23, 2017 | 0 Comments
---

# SpringOne Platform 2016 Replay: Developing microservices with aggregates

_News | Pieter Humphrey |  January 23, 2017 | 0 Comments_

Recorded at SpringOne Platform 2016. Speaker: Chris Richardson Slides: [http://www.slideshare.net/SpringCentral/developing-microservices-with-aggregates](http://www.slideshare.net/SpringCentral/developing-microservices-with-aggregates)

The Domain Model pattern is a great way to develop complex business logic. Unfortunately, a typical domain model is a tangled, birds nest of classes. It can’t be decomposed into microservices. Moreover, business logic often relies on ACID transactions to maintain consistency. Fortunately, there is a solution to this problem: aggregates. An aggregate is an often overlooked modeling concept from the must read book Domain Driven Design. In this talk you will learn how aggregates enable you to develop business logic for the modern world of microservices and NoSQL.

We will describe how to use aggregates to design modular business logic that can be partitioned into microservices. You will learn how aggregates enable you to use eventual consistency instead of ACID.

We will describe the design of a microservice that is built using aggregates, and Spring Cloud.