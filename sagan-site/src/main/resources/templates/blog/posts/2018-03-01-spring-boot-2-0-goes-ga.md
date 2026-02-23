---
title: Spring Boot 2.0 goes GA
source: https://spring.io/blog/2018/03/01/spring-boot-2-0-goes-ga
scraped: 2026-02-23T16:07:00.967Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Phil Webb |  March 01, 2018 | 56 Comments
---

# Spring Boot 2.0 goes GA

_Releases | Phil Webb |  March 01, 2018 | 56 Comments_

On behalf of the team, it is my very great pleasure to announce that Spring Boot 2.0 is now generally available as `2.0.0.RELEASE` from [repo.spring.io](http://repo.spring.io/release/) and [Maven Central](https://search.maven.org/#search%7Cga%7C1%7Cg%3A%22org.springframework.boot%22)!

This release is the culmination of 17 months work and over [6800 commits](https://github.com/spring-projects/spring-boot/compare/6643ec37130ad589b03d747aa6171fc5e8652e08...7d7cf6aa35b872596b6dd2078dc3682e41e25a2a) by 215 different individuals. A massive thank you to everyone that has contributed, and to all the early adopters that have been providing vital feedback on the milestones.

This is the first major revision of Spring Boot since 1.0 was released almost 4 years ago. It's also the first GA version of Spring Boot that provides support for [Spring Framework 5.0](https://spring.io/blog/2017/09/28/spring-framework-5-0-goes-ga).

Highlights of the new release include:

-   A Java 8 baseline, and Java 9 support.
-   Reactive web programming support with Spring WebFlux/WebFlux.fn.
-   Auto-configuration and starter POMs for reactive Spring Data Cassandra, MongoDB, Couchbase and Redis.
-   Support for embedded Netty.
-   HTTP/2 for Tomcat, Undertow and Jetty.
-   Kotlin support.
-   A brand new actuator architecture, with support for Spring MVC, WebFlux and Jersey.
-   [Micrometer](http://micrometer.io/) based metrics with exporters for Atlas, Datadog, Ganglia, Graphite, Influx, JMX, New Relic, Prometheus, SignalFx, StatsD and Wavefront.
-   Quartz scheduler support.
-   Greatly simplified security auto-configuration.

There's far too many features to list them all here in detail, so head over to the [release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.0-Release-Notes) page on our wiki, or the [launch blog on Pivotal.io](https://content.pivotal.io/blog/opening-doors-with-spring-boot-2-0) to find out more. If you're upgrading an existing Spring Boot application you'll also want to check out the [migration guide](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.0-Migration-Guide). If you just want to get started, you can easily bootstrap a new project on [start.spring.io](https://start.spring.io).

Over the next couple of weeks we'll be publishing blog posts that cover some Spring Boot 2.0 features in detail. You should also join us for [a webinar on March 13th](https://content.pivotal.io/webinars/mar-13-introducing-reactive-spring-boot-2-0-webinar) where we'll dive deeper into what upgrading looks like.

Thanks again to everyone that has contributed to Spring and Spring Boot over the years! A special thank you also to the developers of the other projects in the Spring portfolio, without whom there would be no Spring Boot.

[Project Page](http://projects.spring.io/spring-boot/) | [GitHub](https://github.com/spring-projects/spring-boot) | [Issues](https://github.com/spring-projects/spring-boot/issues) | [Documentation](http://docs.spring.io/spring-boot/docs/2.0.0.RELEASE/reference/htmlsingle) | [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-boot) | [Gitter](https://gitter.im/spring-projects/spring-boot)