---
title: Spring Tips: Hedging Client Requests with the Reactive WebClient and a service registry
source: https://spring.io/blog/2019/01/23/spring-tips-hedging-client-requests-with-the-reactive-webclient-and-a-service-registry
scraped: 2026-02-23T14:59:41.512Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  January 23, 2019 | 2 Comments
---

# Spring Tips: Hedging Client Requests with the Reactive WebClient and a service registry

_Engineering | Josh Long |  January 23, 2019 | 2 Comments_

Hi Spring fans! In this installment of Spring Tips we look at how to use the reactive `WebFlux` client to make a number of concurrent requests to distinct service instances (discovered using a service registry like Netflix Eureka or Consul through the Spring Cloud `DiscoveryClient` abstraction) and meet SLAs by using the fastest request to return.

speaker: [Josh Long](http://twitter.com/Starbuxman)