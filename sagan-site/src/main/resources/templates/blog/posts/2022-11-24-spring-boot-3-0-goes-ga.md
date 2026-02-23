---
title: Spring Boot 3.0 Goes GA
source: https://spring.io/blog/2022/11/24/spring-boot-3-0-goes-ga
scraped: 2026-02-23T10:25:17.902Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Andy Wilkinson |  November 24, 2022 | 63 Comments
---

# Spring Boot 3.0 Goes GA

_Releases | Andy Wilkinson |  November 24, 2022 | 63 Comments_

On behalf of the team, it is my very great pleasure to announce that Spring Boot 3.0 is now generally available and `3.0.0` can be found in Maven Central.

This release is the culmination of 12 months work and over [5700 commits](https://github.com/spring-projects/spring-boot/compare/e06b0d97f7c7881fac6008e8046ca511195d505e..14ba9b18dfa94155cc27ec964eae2d020fb3e305) by 151 different individuals. A massive thank you to everyone that has contributed, and to all the early adopters that have been providing vital feedback on the milestones.

This is the first major revision of Spring Boot since 2.0 was released 4.5 years ago. It's also the first GA version of Spring Boot that provides support for [Spring Framework 6.0](https://spring.io/blog/2022/11/16/spring-framework-6-0-goes-ga) and GraalVM.

Highlights of the new release include:

-   A Java 17 baseline
-   [Support for generating native images with GraalVM](https://docs.spring.io/spring-boot/docs/3.0.0/reference/html/native-image.html#native-image), superseding the experimental Spring Native project
-   Improved observability with Micrometer and Micrometer Tracing
-   Support for Jakarta EE 10 with an EE 9 baseline

There's far too many features to list them all here in detail, so head over to the [release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0-Release-Notes) page on our wiki to find out more. If you just want to get started, you can easily bootstrap a new project on [start.spring.io](https://start.spring.io). If you'd like to try out the GraalVM support, [start.spring.io can help with that too](https://start.spring.io/#!platformVersion=3.0.0&dependencies=native).

Over the coming weeks we'll be publishing blog posts that cover some Spring Boot 3.0 features in detail.

Thanks again to everyone that has contributed to Spring and Spring Boot over the years! Supporting Jakarta EE 9 and 10, the observability enhancements, and GraalVM support has been a huge team effort that has left no corner of the Spring portfolio untouched. A special thank you to the developers of the other projects in the Spring portfolio, without whom this release would not have been possible.

[Project Page](http://projects.spring.io/spring-boot/) | [GitHub](https://github.com/spring-projects/spring-boot) | [Issues](https://github.com/spring-projects/spring-boot/issues) | [Documentation](http://docs.spring.io/spring-boot/docs/3.0.0/reference/htmlsingle) | [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-boot) | [Gitter](https://gitter.im/spring-projects/spring-boot)