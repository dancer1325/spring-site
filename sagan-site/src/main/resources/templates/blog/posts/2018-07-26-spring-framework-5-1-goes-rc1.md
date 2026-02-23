---
title: Spring Framework 5.1 goes RC1
source: https://spring.io/blog/2018/07/26/spring-framework-5-1-goes-rc1
scraped: 2026-02-23T15:18:10.403Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  July 26, 2018 | 2 Comments
---

# Spring Framework 5.1 goes RC1

_Releases | Juergen Hoeller |  July 26, 2018 | 2 Comments_

Dear Spring community,

It is my pleasure to announce that a feature-complete Spring Framework 5.1 release candidate is available from our [milestone repository](https://repo.spring.io/milestone/org/springframework/spring-framework-bom/5.1.0.RC1/) now! Find a comprehensive list of [new features and refinements](https://github.com/spring-projects/spring-framework/wiki/What's-New-in-Spring-Framework-5.x) and corresponding [upgrade notes](https://github.com/spring-projects/spring-framework/wiki/Upgrading-to-Spring-Framework-5.x) on our GitHub wiki.

Spring Framework 5.1 requires JDK 8 or higher and specifically supports [JDK 11](http://openjdk.java.net/projects/jdk/11/) as the next long-term support release. We strongly recommend an upgrade to 5.1 for any applications targeting JDK 11, delivering a warning-free experience on the classpath as well as the module path. Beyond that, initial refinements for [GraalVM](https://www.graalvm.org/) compatibility made it into this release, automatically adapting to the runtime constraints of native images in core Spring facilities.

Along the lines of 5.0's functional bean definition theme, the core container provides refined retrieval APIs in 5.1: [ObjectProvider](https://docs.spring.io/spring/docs/5.1.0.BUILD-SNAPSHOT/javadoc-api/org/springframework/beans/factory/ObjectProvider.html), as known from annotation-based injection points, is programmatically accessible through the [BeanFactory API](https://docs.spring.io/spring/docs/5.1.0.BUILD-SNAPSHOT/javadoc-api/org/springframework/beans/factory/BeanFactory.html#getBeanProvider-java.lang.Class-) and capable of stream access for beans-of-type resolution now. Furthermore, Spring allows for the injection of empty collections into single constructor scenarios when no corresponding target beans have been found.

Spring Framework 5.1 comes with updated web defaults (e.g. for cookies) and a human-friendly debug log experience in web applications. The Spring WebFlux stack is based on [Reactor Californium](https://projectreactor.io/docs) now. Spring also embraces the recently released [Hibernate ORM 5.3](http://hibernate.org/orm/releases/5.3/), integrating with its bean container SPI, and allows for mixing native Hibernate SessionFactory and standard JPA EntityManagerFactory access within the same transaction.

We are working towards [5.1 RC2](https://jira.spring.io/projects/SPR/versions/16853) with fine-tuning and performance improvements in August, preparing for 5.1’s general availability in mid September. And as of next week's Spring Boot 2.1 M1 release, you'll be able to consume Spring Framework 5.1 RCs through [start.spring.io](https://start.spring.io)!

Cheers, Juergen