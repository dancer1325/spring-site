---
title: Spring Framework 3.2 goes GA
source: https://spring.io/blog/2012/12/13/spring-framework-3-2-goes-ga
scraped: 2026-02-24T08:11:53.102Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Juergen Hoeller |  December 13, 2012 | 0 Comments
---

# Spring Framework 3.2 goes GA

_Engineering | Juergen Hoeller |  December 13, 2012 | 0 Comments_

Dear Spring community,

Exactly one year after the Spring Framework 3.1 release, I'm pleased to announce that Spring Framework 3.2 is generally available now!

We recommend an upgrade from all previous Spring releases, in particular from Spring Framework 3.1.x which this is a direct successor for.

As previously discussed, key features in Spring Framework 3.2 include:

-   **Refined Java SE 7 support** within the framework as well as through upgrades to CGLIB 3.0, ASM 4.0 (both of which we're inlining now) and AspectJ 1.7
-   **Concurrency refinements across the framework**, avoiding the use of synchronization wherever possible - in particular for scoped/prototype beans
-   Allowing for **@Autowired and @Value to be used as meta-annotations**, e.g. to build custom injection annotations in combination with specific qualifiers
-   Support for **custom @Bean definition annotations in @Configuration classes**, e.g. in combination with specific qualifiers, @Lazy, @Primary, etc
-   **Asynchronous MVC processing on Servlet 3.0**, with Spring MVC handler methods being able to return Callables and DeferredResults
-   Inclusion of the formerly-standalone **Spring MVC Test** project, allowing for first-class testing of Spring MVC applications
-   Support for **loading WebApplicationContexts in the TestContext framework**, and further improvements for web application testing
-   Early support for **JCache 0.5 (JSR-107)** as a backend for Spring's cache abstraction

For further details, in particular the many enhancements in Spring MVC, have a look at the [New Features and Enhancements in Spring Framework 3.2](http://static.springsource.org/spring-framework/docs/3.2.0.RELEASE/spring-framework-reference/html/new-in-3.2.html) section in our documentation.

This release incorporates a lot of community feedback, so let me take the opportunity to say thank you to all reporters and contributors! Keep it coming as we're moving into 2013, working on the next generation of the framework...

Cheers,

Juergen