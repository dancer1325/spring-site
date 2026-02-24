---
title: SpringOne2GX 2013 Replay: Futures and Rx Observables: powerful abstractions for consuming web services asynchronously
source: http://spring.io/blog/2014/04/29/springone2gx-2013-replay-futures-and-rx-observables-powerful-abstractions-for-consuming-web-services-asynchronously
scraped: 2026-02-24T07:26:35.376Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Pieter Humphrey |  April 29, 2014 | 0 Comments
---

# SpringOne2GX 2013 Replay: Futures and Rx Observables: powerful abstractions for consuming web services asynchronously

_News | Pieter Humphrey |  April 29, 2014 | 0 Comments_

Recorded at SpringOne2GX 2013 in Santa Clara, CA

Speaker: Chris Richardson

A modular, polyglot architecture has many advantages but it also adds complexity since each incoming request typically fans out to multiple distributed services. For example, in an online store application the information on a product details page - description, price, recommendations, etc - comes from numerous services. To minimize response time and improve scalability, these services must be invoked concurrently. However, traditional concurrency mechanisms are low-level, painful to use and error-prone. In this talk you will learn about some powerful yet easy to use abstractions for consuming web services asynchronously. We will compare the various implementations of futures that are available in Java, Scala and JavaScript. You will learn how to use reactive observables, which are asynchronous data streams, to access web services from both Java and JavaScript. We will describe how these mechanisms let you write asynchronous code in a very straightforward, declarative fashion.

!{iframe width="560" height="315" src="//www.youtube.com/embed/aZkwIA4k2xU" frameborder="0" allowfullscreen}{/iframe}