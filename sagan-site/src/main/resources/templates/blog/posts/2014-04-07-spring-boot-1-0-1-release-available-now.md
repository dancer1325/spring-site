---
title: Spring Boot 1.0.1.RELEASE Available Now
source: https://spring.io/blog/2014/04/07/spring-boot-1-0-1-release-available-now
scraped: 2026-02-24T07:33:47.768Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Dave Syer |  April 07, 2014 | 1 Comment
---

# Spring Boot 1.0.1.RELEASE Available Now

_Releases | Dave Syer |  April 07, 2014 | 1 Comment_

Spring Boot 1.0.1.RELEASE is available in Maven Central and the repo.spring.io repository. This is a [bug fix release](https://github.com/spring-projects/spring-boot/issues?milestone=8&page=1&state=closed), although a couple of new features have been added:

-   `MessageSource` caching can be specified in `application.properties`
-   ActiveMQ connection credentials can be externalized to `application.properties`
-   There is a new section on Security auto configuration in the [reference guide](http://docs.spring.io/spring-boot/docs/1.0.1.RELEASE/reference/htmlsingle/#boot-features-security)

There was a security bug-fix for the Actuator, so anyone using Spring Security and the Actuator endpoints should upgrade. No backwards compatibility problems or changes to existing functionality are anticipated.