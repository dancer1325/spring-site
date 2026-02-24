---
title: Spring Framework 4.0 RC1 available
source: https://spring.io/blog/2013/11/01/spring-framework-4-0-rc1-available
scraped: 2026-02-24T07:53:56.586Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  November 01, 2013 | 0 Comments
---

# Spring Framework 4.0 RC1 available

_Releases | Juergen Hoeller |  November 01, 2013 | 0 Comments_

Dear Spring community,

I'm pleased to announce the availability of our first Spring Framework 4.0 release candidate. This release completes our 4.0 feature set with several new features since M3:

-   full compatibility with recent OpenJDK 8 Developer Preview builds
-   first-class support for Groovy-based bean definitions (as known from Grails)
-   autowiring based on generic types (e.g. MyRepository<Customer>)
-   using Objenesis to create CGLIB proxy instances (allowing for constructor injection)
-   the introduction of a ScriptEvaluator mechanism (including JSR-223 support)
-   time zone resolution in Spring MVC (connected to JSR-310 and Joda-Time)
-   finer-grained configuration options for Spring MVC's @ControllerAdvice
-   the introduction of MvcUriComponentsBuilder (inspired by Spring HATEOAS)
-   and last but not least, a lot of fine-tuning in Spring's new WebSocket support

Overall, this is the perfect time to give Spring Framework 4.0 an early try! We'll make sure to incorporate your feedback in a timely fashion on our way to 4.0 GA in December.

Note: We are aware that current Spring Web Flow and Spring Web Services are not working with Spring Framework 4.0 RC1 at this point, due to dependencies on deprecated classes which got removed in 4.0. We are in the process of addressing this in time for 4.0 GA.

Enjoy!

Juergen

**P.S.: If you happen to be in the London area or with easy access to it, check out the [Spring eXchange](http://skillsmatter.com/event/java-jee/spring-exchange-1724): a packed two-day show on Nov 14/15, with key Spring engineers presenting the latest and greatest - of course including Spring Framework 4.0!**