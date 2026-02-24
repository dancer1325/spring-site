---
title: Spring GemFire 1.0.0 Released for Java and .NET
source: https://spring.io/blog/2011/02/02/spring-gemfire-1-0-0-released-for-java-and-net
scraped: 2026-02-24T08:47:52.739Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Costin Leau |  February 02, 2011 | 0 Comments
---

# Spring GemFire 1.0.0 Released for Java and .NET

_Releases | Costin Leau |  February 02, 2011 | 0 Comments_

Dear Spring Community,

We are pleased to announce that the first GA release of the Spring GemFire 1.0 project is now available for both Java and .NET! The Spring GemFire project aims to make it easier to build Spring-powered highly scalable applications using GemFire as distributed data management platform.

**Download it now**: [Spring GemFire for Java](http://www.springsource.com/download/community?project=Spring%20GemFire) | [Spring GemFire for .NET](http://www.springsource.com/download/community?project=Spring%20GemFire%20for%20.NET)

This release features:

-   Declarative dependency injection style configurations for the GemFire infrastructure (such as Cache, Region, Interest, etc)
-   Extensive namespace support for configuring all the major GemFire components: cache, replicated, partitioned and client regions and many more
-   Exception translation to Spring's portable DataAccess exception hierarchy
-   Template and callback support for easy native API access
-   Transaction management support
-   Spring-backed wiring for GemFire managed objects
-   Auto-generation of non-reflection based Instantiators
-   Native support for GemFire 6.5 (besides 6.0)
-   Declarative Caching Advice (for .NET)

Through Spring GemFire, Spring users should feel right at home when interacting with GemFire while developers familiar with GemFire will see the benefits and flexibility of the Spring container, its powerful AOP integration, and versatile service abstractions.

To learn more about the project, visit the Spring GemFire [homepage](http://www.springsource.org/spring-gemfire).

Looking forward to your feedback!

P.S. Please use **maven.springframework.org** as artifact repository until the technical [problems](https://sourceforge.net/blog/update-on-the-sourceforgenet-attack/ ) that affect the publication to Maven central are fixed.