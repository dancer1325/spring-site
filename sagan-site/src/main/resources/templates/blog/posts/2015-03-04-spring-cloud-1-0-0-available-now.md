---
title: Spring Cloud 1.0.0 Available Now
source: https://spring.io/blog/2015/03/04/spring-cloud-1-0-0-available-now
scraped: 2026-02-23T21:52:23.248Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Dave Syer |  March 04, 2015 | 13 Comments
---

# Spring Cloud 1.0.0 Available Now

_Releases | Dave Syer |  March 04, 2015 | 13 Comments_

Spring Cloud 1.0.0.RELEASE is available now in Maven Central (and repo.spring.io). Not too many changes since RC3 but we did find a few bugs, thanks largely to community involvement, so thanks to all who tried it out up to now. Here is a reminder of the goals of Spring Cloud:

> Spring Cloud provides tools for developers to quickly build some of the common patterns in distributed systems (e.g. configuration management, service discovery, circuit breakers, intelligent routing, micro-proxy, control bus, one-time tokens, global locks, leadership election, distributed sessions, cluster state). Coordination of distributed systems leads to boiler plate patterns, and using Spring Cloud developers can quickly stand up services and applications that implement those patterns. They will work well in any distributed environment, including the developer's own laptop, bare metal data centres, and managed platforms such as Cloud Foundry.

and a quick summary of the content of 1.0:

-   Config server with git backend
-   Config client featuring refresh and encryption/decryption as well as the bootstrap phase in Spring application lifecycle
-   Common abstractions for load balancer, service discovery and circuit breaker
-   Security integrations: declarative SSO and proxy authentication strategies
-   Eureka for service discovery: client and server (with UI)
-   Eureka sidecar for non-JVM clients
-   Automatic reverse proxy using Zuul
-   Spring configuration model for Zuul filters
-   Spring configuration model for Ribbon load balancer
-   Feign declarative web service clients (with Ribbon integration)
-   RestTemplate integration with Ribbon
-   Hystrix for circuit breaker: client and dashboard (UI)
-   Turbine for circuit breaker aggregation, pull over HTTP and push over AMQP
-   AWS integration: relational databases, messaging and EC2 metadata
-   AMQP bus for a defined set of operational events like config changes
-   Groovy CLI with support for most of the above

Find out more at [http://cloud.spring.io](http://cloud.spring.io) and in [Github](https://github.com/spring-cloud).