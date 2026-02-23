---
title: SpringOne Platform 2016 Replay: An Introduction to Distributed Tracing and Zipkin
source: https://spring.io/blog/2017/01/23/springone-platform-2016-replay-an-introduction-to-distributed-tracing-and-zipkin
scraped: 2026-02-23T18:42:26.835Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Pieter Humphrey |  January 23, 2017 | 0 Comments
---

# SpringOne Platform 2016 Replay: An Introduction to Distributed Tracing and Zipkin

_News | Pieter Humphrey |  January 23, 2017 | 0 Comments_

Recorded at SpringOne Platform 2016. Slides: [http://www.slideshare.net/SpringCentral/how-to-properly-blame-things-for-causing-latency](http://www.slideshare.net/SpringCentral/how-to-properly-blame-things-for-causing-latency)

Latency analysis is the act of blaming components for causing user perceptible delay. In today's world of microservices, this can be tricky as requests can fan out across polyglot components and even data-centers. In many cases, the root source of latency isn't a component, but rather a link between components.

This session will overview how to debug latency problems, using call graphs created by Zipkin. We'll use trace zipkin itself, setting up from scratch using docker. While we're at it, we'll discuss how the model works, and how to safely trace production. Finally, we'll overview the ecosystem, including tools to trace ruby, c#, java and spring boot apps.

When you leave, you'll at least know something about distributed tracing, and hopefully be on your way to blaming things for causing latency!