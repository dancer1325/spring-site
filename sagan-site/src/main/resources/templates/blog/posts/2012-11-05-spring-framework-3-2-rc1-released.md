---
title: Spring Framework 3.2 RC1 released
source: https://spring.io/blog/2012/11/05/spring-framework-3-2-rc1-released
scraped: 2026-02-24T08:14:07.955Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Juergen Hoeller |  November 05, 2012 | 0 Comments
---

# Spring Framework 3.2 RC1 released

_Engineering | Juergen Hoeller |  November 05, 2012 | 0 Comments_

Dear Spring community,

I'm pleased to announce that the first Spring Framework 3.2 release candidate is now [available](http://www.springsource.org/node/3721).

This generation of the core framework is a straightforward next step after last year's Spring Framework 3.1, continuing several well-established themes. Key features in Spring Framework 3.2 include:

-   A new **Gradle-based framework build**, making it easier than ever to contribute to the Spring Framework project on GitHub
-   **Inlined CGLIB 3.0 and ASM 4.0**, fully supporting Java 7 byte code and making CGLIB-based functionality available without explicit declaration of a CGLIB dependency
-   Allowing for **@Autowired and @Value to be used as meta-annotations**, e.g. to build custom injection annotations in combination with specific qualifiers
-   Support for **custom @Bean definition annotations in @Configuration classes**, e.g. in combination with specific qualifiers, @Lazy, @Primary, etc
-   **Asynchronous MVC processing on Servlet 3.0**, with Spring MVC handler methods being able to return Callables and DeferredResults (see Rossen's series of blog posts)
-   Inclusion of the formerly-standalone **Spring MVC Test** project, allowing for first-class testing of Spring MVC applications (stay tuned for Rossen's blog post on this)
-   Support for **loading WebApplicationContexts in the TestContext framework** (stay tuned for Sam's blog post on this)
-   Early support for **JCache 0.5 (JSR-107)** as a backend for Spring's cache abstraction

We are working towards the 3.2 GA release now, with a further release candidate - based on community feedback as well as remaining refinements on our side - coming in late November. We've received many pull requests in the course of the milestone phase already, so keep them coming on the way to GA (and beyond)!

Cheers,

Juergen

P.S.: Due to ongoing delays in Java EE 7 land (it's scheduled for Q2 2013 now), we've decided to move forward with our core 3.2 features first, dealing with EE 7 spec updates in the Spring Framework 3.3 generation. In particular, expect full JCache, JPA 2.1, Bean Validation 1.1 and JMS 2.0 support in a timely Spring Framework 3.3 milestone next year.