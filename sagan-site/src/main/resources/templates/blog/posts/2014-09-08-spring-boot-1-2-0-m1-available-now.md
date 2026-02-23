---
title: Spring Boot 1.2.0.M1 Available Now
source: http://spring.io/blog/2014/09/08/spring-boot-1-2-0-m1-available-now
scraped: 2026-02-23T22:15:02.804Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Phil Webb |  September 08, 2014 | 2 Comments
---

# Spring Boot 1.2.0.M1 Available Now

_Releases | Phil Webb |  September 08, 2014 | 2 Comments_

I am pleased to announce that Spring Boot 1.2.0.M1 is available now in the [Spring milestone repository](http://repo.springsource.org/milestone). This release builds on [Spring Framework 4.1](http://spring.io/blog/2014/09/04/spring-framework-4-1-ga-is-here) and provides a number of improvements and new features. Highlights include:

-   Support for distributed JTA transactions across multiple XA resources using either an Atomkos or Bitronix embedded transaction manager or a full Java EE Application Server.
-   Easier configuration of JNDI bound `DataSource` and `ConnectionFactory` beans.
-   Improved JMS support, including auto-configuration for the Spring Framework 4.1 `@EnableJms` annotation.
-   Auto-configuration support for `spring-cloud`.
-   Easier SSL configuration for both Tomcat and Jetty.
-   Improved `DataSource` Metrics and Health Indicators.

For a complete list of changes, and for upgrade instructions, see the [Spring Boot 1.2 Release Notes](http://github.com/spring-projects/spring-boot/wiki/Spring-Boot-1.2-Release-Notes) on the WIKI. The [reference documentation](http://docs.spring.io/spring-boot/docs/1.2.0.M1/reference/htmlsingle/) as also been updated to cover the new features.

Thanks again to everyone that has contributed to the release! Please give it a go and report any problems using [the project Issue tracker](http://github.com/spring-projects/spring-boot/issues) page.