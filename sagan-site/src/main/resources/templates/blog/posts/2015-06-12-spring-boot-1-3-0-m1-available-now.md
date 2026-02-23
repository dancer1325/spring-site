---
title: Spring Boot 1.3.0.M1 Available Now
source: https://spring.io/blog/2015/06/12/spring-boot-1-3-0-m1-available-now
scraped: 2026-02-23T19:49:52.748Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Phil Webb |  June 12, 2015 | 11 Comments
---

# Spring Boot 1.3.0.M1 Available Now

_Releases | Phil Webb |  June 12, 2015 | 11 Comments_

I'm pleased to announce that Spring Boot v1.3.0.M1 is available now from the [Spring milestone repository](http://repo.springsource.org/milestone/). This release builds on [Spring Framework 4.2.0.RC1](https://spring.io/blog/2015/05/26/spring-framework-4-2-goes-rc1) and provides a number of [improvements and new features](https://github.com/spring-projects/spring-boot/issues?q=milestone%3A1.3.0.M1+is%3Aclosed) over Spring Boot 1.2. Highlights include:

-   A new `spring-boot-devtools` module with support for automatic restart, LiveReload and remote update.
-   Extensive caching support for EhCache, Hazelcast, Infinispan, Redis, Guava or any compliant JSR-107 (JCache) implementation. Cache metric information is now also exposed via the actuator (when the underlying technology supports it).
-   Improved metrics support, include export and aggregation features and big performance improvements if you're using Java 8.
-   Fully executable JARs for Linux based operating systems, including "service" support. Starting a Boot application as a Linux service is now as easy as typing: `sudo ln -s /var/myapp/myapp.jar /etc/init.d/myapp`.
-   Additional OAuth2 Support, including `@EnableAuthorizationServer`, `@EnableResourceServer` and `@EnableOAuth2Client` annotations.
-   New `HealthEndpoints` for Elasticsearch, Email and JMS.
-   Maven `start` and `stop` goals to help with integration testing.

For a complete list of changes, and upgrade instructions, see the [Spring Boot 1.3 Release Notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-1.3-Release-Notes) on the WIKI and the updated [reference documentation](http://docs.spring.io/spring-boot/docs/1.3.0.M1/reference/htmlsingle/).

We'll be releasing milestones at a fairly regular cadence from now on, with an aim to publish `1.3.0.RELEASE` in September (sometime around [Spring One](http://springone2gx.com/)). As always, early feedback and [bug reports](https://github.com/spring-projects/spring-boot/issues) are extremely valuable to us and very welcome.

Thanks again to everyone that has contributed to the release and supported the project.