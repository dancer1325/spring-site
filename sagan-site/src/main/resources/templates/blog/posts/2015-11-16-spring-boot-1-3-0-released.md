---
title: Spring Boot 1.3.0 released
source: https://spring.io/blog/2015/11/16/spring-boot-1-3-0-released
scraped: 2026-02-23T19:35:47.351Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Phil Webb |  November 16, 2015 | 17 Comments
---

# Spring Boot 1.3.0 released

_Releases | Phil Webb |  November 16, 2015 | 17 Comments_

One behalf of the Spring Boot team, and everyone that has contributed, I am pleased to announce that Spring Boot 1.3.0 has been released and is available now from [repo.spring.io](http://repo.spring.io/release/), [Maven Central](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22org.springframework.boot%22) and [Bintray](https://bintray.com/bintray/jcenter/org.springframework.boot%3Aspring-boot/view). This release adds a significant number of new features and improvements and builds on the latest release of the Spring Framework. For full [upgrade instructions](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-1.3-Release-Notes#upgrading-from-spring-boot-12) and ["new and noteworthy"](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-1.3-Release-Notes#new-and-noteworthy) features please see the [release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-1.3-Release-Notes).

Here are some of the highlights of v1.3:

## [](#developer-tools)Developer Tools

A new `spring-boot-devtools` module has been added which aims to improve the development-time experience. The module provides:

-   Sensible property defaults (for example disabling template caches)
-   Automatic application restarts
-   LiveReload support
-   Remote development support (including remote updates and remote debug via an HTTP tunnel).
-   Persistent HTTP sessions across restarts

If you've got 10 minutes to spare, here's a [short introductory video](https://www.youtube.com/watch?v=A70NMxV13TI).

## [](#caching-auto-configuration)Caching Auto-configuration

We now provide auto configuration for EhCache, Hazelcast, Infinispan, JCache (JSR 107) implementations, Redis and Guava.

In addition, simple Map based in-memory caching is also supported

## [](#fully-executable-jars-and-service-support)Fully executable JARs and service support

The Maven and Gradle plugins can now generate fully executable archives for Linux/Unix that can be run by just typing:

```
Copy$ ./myapp.jar
```

Even better, they work as `init.d` or `systemd` services. To install as an `init.d` service just create a symlink:

```
Copy$ sudo link -s /var/myapp/myapp.jar /etc/init.d/myapp
```

## [](#color-banners)Color banners

Your `banner.txt` files can now include ANSI color codes. You can do crazy things like this:

![Color Banner](https://raw.githubusercontent.com/philwebb/media/master/boot13/colorbanner.png)

## [](#support-for-webservlet-webfilter-and-weblistener-annotations)Support for @WebServlet, @WebFilter and @WebListener annotations

When using an embedded servlet container, automatic registration of `@WebServlet`, `@WebFilter` and `@WebListener` annotated classes can now be enabled using `@ServletComponentScan`.

## [](#additional-auto-configurations)Additional auto-configurations

Out-of-the-box auto-configurations are now provided for:

-   Cassandra
-   OAuth2
-   Spring Session
-   jOOQ
-   SendGrid
-   Artemis

## [](#actuator-metrics)Actuator Metrics

Metrics support has been extended to support export and aggregation. In addition, Java 8 specific `GaugeService` and `CounterService` implementations are now provided (and used when possible) which offer improved performance.

## [](#update-endpoints-and-health-indicators)Update Endpoints and Health Indicators

We now include `/logfile`, `/flyway` and `/liquibase` actuator endpoints as well as support for Elasticsearch, Email and JMS health indicators.

## [](#other-changes)Other changes

There's a whole host of other changes and improvements that are documented in the [Release Notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-1.3-Release-Notes). You can also find a list of deprecated classes and methods that we plan to remove in the next version.

  
  

Thanks so much to everyone that has supported Spring Boot. This release alone has seen 128 contributors join the effort. If you're interested in helping out check out the ["ideal for contribution" tag](https://github.com/spring-projects/spring-boot/issues?q=is%3Aopen+is%3Aissue+label%3A%22ideal+for+contribution%22) in the issue repository. If you have general questions, please ask at [stackoverflow.com](http://stackoverflow.com) using the [`spring-boot` tag](http://stackoverflow.com/tags/spring-boot).

Finally, if you've yet to see Spring Boot in action, you might want to check out [this Devoxx talk](https://www.youtube.com/watch?v=7cemYpV1fNI) by [Stéphane Nicoll](https://spring.io/team/snicoll) and [Brian Clozel](https://spring.io/team/bclozel).

[Project Page](http://projects.spring.io/spring-boot/) | [GitHub](https://github.com/spring-projects/spring-boot) | [Issues](https://github.com/spring-projects/spring-boot/issues) | [Documentation](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle)