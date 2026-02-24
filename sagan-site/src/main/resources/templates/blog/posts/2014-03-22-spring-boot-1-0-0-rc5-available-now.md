---
title: Spring Boot 1.0.0.RC5 Available Now
source: https://spring.io/blog/2014/03/22/spring-boot-1-0-0-rc5-available-now
scraped: 2026-02-24T07:35:41.817Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Phil Webb |  March 22, 2014 | 0 Comments
---

# Spring Boot 1.0.0.RC5 Available Now

_Releases | Phil Webb |  March 22, 2014 | 0 Comments_

Spring Boot 1.0.0.RC5 has been released and is available in the [repo.spring.io](http://repo.spring.io) repository. This is mainly a [bug fix](https://github.com/spring-projects/spring-boot/issues?milestone=6&state=closed) release, although a couple of new features have been added:

-   A new [`@IntegrationTest`](https://github.com/spring-projects/spring-boot/blob/v1.0.0.RC5/spring-boot/src/main/java/org/springframework/boot/test/IntegrationTest.java) annotation has been added to help when writing integration tests for Spring Boot.
-   The CRaSH shell now exposes an [`endpoint`](https://github.com/spring-projects/spring-boot/blob/v1.0.0.RC5/spring-boot-starters/spring-boot-starter-remote-shell/src/main/resources/commands/crash/endpoint.groovy) command that can be used to obtain actuator information.

We now also have a fairly comprehensive [reference manual](http://docs.spring.io/spring-boot/docs/1.0.0.RC5/reference/htmlsingle/).

This is the last planned release candidate, so please give it a try and [report any bugs](https://github.com/spring-projects/spring-boot/issues). We plan to release GA **very** soon.