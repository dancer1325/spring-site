---
title: Spring Boot for Apache Geode & Pivotal GemFire 1.1.0.RC2 Released!
source: https://spring.io/blog/2019/08/14/spring-boot-for-apache-geode-pivotal-gemfire-1-1-0-rc2-released
scraped: 2026-02-23T14:38:55.594Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | John Blum |  August 14, 2019 | 0 Comments
---

# Spring Boot for Apache Geode & Pivotal GemFire 1.1.0.RC2 Released!

_Releases | John Blum |  August 14, 2019 | 0 Comments_

On behalf of the Spring and Apache Geode communities, I am pleased to announce the release of *Spring Boot for Apache Geode & Pivotal GemFire* (SBDG) `1.1.0.RC2`.

SBDG `1.1.0.RC2` can be obtained from [repo.spring.io/libs-miletone](https://repo.spring.io/libs-milestone/org/springframework/geode/spring-geode-starter/), or declared as a dependency in either your Maven POM or Gradle build files:

`org.springframework.geode:spring-geode-starter:1.1.0.RC2`.

## [](#whats-new)[](#whats-new)What’s New

As with the [previous release, 1.1.0.RC1](https://spring.io/blog/2019/08/02/spring-boot-for-apache-geode-pivotal-gemfire-1-1-0-rc1-released), we continue our story on *caching* using [Apache Geode](https://geode.apache.org/) as a caching provider in [Spring’s Cache Abstraction](https://docs.spring.io/spring/docs/current/spring-framework-reference/integration.html#cache) for ***Near Caching***.

This release contains a Sample [Guide](https://docs.spring.io/spring-boot-data-geode-build/1.1.x/reference/html5/guides/caching-near.html) along with [Code Example](https://github.com/spring-projects/spring-boot-data-geode/tree/1.1.0.RC2/spring-geode-samples/caching/near), a *Spring Boot* application, to help you better understand the *Near Caching* pattern applied and its concepts.

This completes our coverage of the predominant caching patterns applied to modern, *Cloud-Native*, *Microservices* architectures and applications in practice today:

-   [*Look-Aside Caching*](https://docs.spring.io/spring-boot-data-geode-build/1.1.x/reference/html5/guides/caching-look-aside.html)
    
-   [*Inline Caching*](https://docs.spring.io/spring-boot-data-geode-build/1.1.x/reference/html5/guides/caching-inline.html)
    
-   [*Near Caching*](https://docs.spring.io/spring-boot-data-geode-build/1.1.x/reference/html5/guides/caching-near.html)
    

## [](#whats-next)[](#whats-next)What’s Next

SBDG 1.1.0.RELEASE (final GA), tentatively scheduled for [**Wednesday, August 21st**](https://github.com/spring-projects/spring-boot-data-geode/milestone/14). See the [Spring Release Calendar](https://spring-calendar.cfapps.io/) for schedule updates.

We will include 1 more Sample Guide and Code Example to cover HTTP Session state caching using [Spring Session](https://spring.io/projects/spring-session), and specifically, [Spring Session for Apache Geode](https://github.com/spring-projects/spring-session-data-geode).

(HTTP) Session state caching is 1 of the most popular applications of caching in a Spring Boot, Microservices-based application, particularly in a Cloud environment where high availability and resiliency to failure are critically important.

## [](#feedback)[](#feedback)Feedback

As always, any feedback is welcomed and highly appreciated!

[Issues](https://github.com/spring-projects/spring-boot-data-geode/issues) | [PR](https://github.com/spring-projects/spring-boot-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-boot)

P.S. Don’t miss your opportunity to learn from the very best at this year’s [SpringOne Platform 2019](https://springoneplatform.io/) in **Austin, TX** from **October 7th to the 10th**. Looking forward to seeing all of you there!