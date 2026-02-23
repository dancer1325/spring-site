---
title: Spring Cloud 1.0.0.RC3 Available Now
source: https://spring.io/blog/2015/02/13/spring-cloud-1-0-0-rc3-available-now
scraped: 2026-02-23T21:55:20.257Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Dave Syer |  February 13, 2015 | 6 Comments
---

# Spring Cloud 1.0.0.RC3 Available Now

_Releases | Dave Syer |  February 13, 2015 | 6 Comments_

Spring Cloud 1.0.0.RC3 is available now from [https://repo.spring.io/libs-milestone-local](https://repo.spring.io/libs-milestone-local). This is (hopefully) the last milestone release before 1.0.0. There were some bug fixes since 1.0.0.RC2 and also a few small new features:

-   Refactored the Feign support to look a bit more like Spring Data (so `@EnableFeignClients` instead of `@FeignClientScan`).
-   Support for multipart/form-data in the Zuul proxy
-   Support for including and excluding remote services in the automatic route registration in Zuul
-   Support for declarative Ribbon retry in Zuul
-   Cleaned up of a lot of dependencies. If you use the spring-cloud-starters you should get a nice consistent experience of adding and subtracting features. Gradle users need to use the [dependency management plugin](https://github.com/spring-gradle-plugins/dependency-management-plugin) for the same experience.
-   Added small, bite-sized [sample projects](https://github.com/spring-cloud-samples/tests) for integration testing of classpath isolation issues.