---
title: Spring Boot for Apache Geode & Pivotal GemFire 1.0.0.M3 Released!
source: https://spring.io/blog/2018/09/22/spring-boot-for-apache-geode-pivotal-gemfire-1-0-0-m3-released
scraped: 2026-02-23T15:13:10.803Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | John Blum |  September 22, 2018 | 1 Comment
---

# Spring Boot for Apache Geode & Pivotal GemFire 1.0.0.M3 Released!

_Engineering | John Blum |  September 22, 2018 | 1 Comment_

On behalf of the Spring and Apache Geode communities, I am pleased to announce the third milestone release of *Spring Boot for Apache Geode & Pivotal GemFire* (SBDG), version `1.0.0.M3`.

The bits for 1.0 final GA are nearly complete. There will be 1 more development milestone (RC1) before final GA. The new `1.0.0.M3` bits can be acquired from the Spring [libs-milestone](http://repo.spring.io/libs-milestone/org/springframework/geode/spring-geode-starter/1.0.0.M3/) repo.

# [](#whats-new)[](#whats-new)What’s New

SBDG `1.0.0.M3` adds support for using [Spring Boot’s Actuator](https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready.html) feature with Apache Geode & Pivotal GemFire (and, by extension, Pivotal Cloud Cache, which is backed by Pivotal GemFire).

Specifically, this support includes Spring Boot `HealthIndicators` to assess the state and health of the following GemFire/Geode components:

-   Cache
    
-   DistributedSystem / DistributedMember
    
-   ResourceManager
    
-   Regions
    
-   Indexes
    
-   DiskStores
    
-   Continuous Queries
    
-   CacheServers
    
-   Pools
    
-   AsyncEventQueues
    
-   GatewaySenders
    
-   GatewayReceivers
    

In addition to basic status information, the GemFire/Geode `HealthIndicators` provide essential configuration meta-data details along with runtime characteristics/behavior of the GemFire/Geode components themselves. This includes simple metrics like the cache Region hit/miss counts or the connection load between clients and servers, and so on.

"Essential" configuration meta-data details are provided in 1 convenient location so that you don’t have to sift through all the command-line arguments, log files, property files and other configuration files just to find the configuration of each GemFire/Geode object used in your application architecture.

More details about the provided `HealthIndicators` is available [here](https://docs.spring.io/autorepo/docs/spring-boot-data-geode-build/1.0.0.BUILD-SNAPSHOT/reference/htmlsingle/#actuator).

### [](#example)[](#example)Example

There is even an undocumented example (already) that you can play with on the `samples` branch, [here](https://github.com/spring-projects/spring-boot-data-geode/tree/samples/samples/boot/actuator). The example Spring Boot app is a simple little temperature monitoring service for a temperature sensor, and uses Apache Geode CQ functionality to send temperature events to the client (monitor). It uses enough Geode components to make the Actuator `health` endpoints interesting.

# [](#whats-next)[](#whats-next)What’s Next

By RC1, we intend to complete the following:

-   (More) Samples, complete with documentation
    
-   Amp up test coverage covering all manners of UCs
    
-   Review the docs for correctness and conciseness.
    

As always feedback is welcomed!

[Issues](https://github.com/spring-projects/spring-boot-data-geode/issues) | [PR](https://github.com/spring-projects/spring-boot-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-boot)

### [](#springone-platform-2018)[](#springone-platform-2018)SpringOne Platform 2018

Also, don’t forget about SpringOne Platform 2018 this year! There is a lot of great [speakers](https://springoneplatform.io/2018/speakers) and [content](https://springoneplatform.io/2018/sessions) that you won’t want to miss. **Luke Shannon** and I will be using SBDG in our session, [*Scaling Spring Boot Application in Real-Time*](https://springoneplatform.io/2018/sessions/scaling-spring-boot-applications-in-real-time), to show you how to apply distributed system patterns and principles to your Spring Boot apps at scale.