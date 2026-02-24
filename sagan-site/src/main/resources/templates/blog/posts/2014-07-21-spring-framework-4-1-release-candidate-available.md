---
title: Spring Framework 4.1 release candidate available
source: http://spring.io/blog/2014/07/21/spring-framework-4-1-release-candidate-available
scraped: 2026-02-23T22:19:28.196Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  July 21, 2014 | 7 Comments
---

# Spring Framework 4.1 release candidate available

_Releases | Juergen Hoeller |  July 21, 2014 | 7 Comments_

Dear Spring community,

It's my pleasure to announce that the first Spring Framework 4.1 release candidate is available now. Our 4.1 delivers a wide range of new features along the following themes:

**Annotated JMS listener methods and support for JMS 2.0's shared subscriptions**

****

As well as general alignment of Spring's JMS support with our spring-messaging module. [https://spring.io/blog/2014/04/30/spring-4-1-s-upcoming-jms-improvements](https://spring.io/blog/2014/04/30/spring-4-1-s-upcoming-jms-improvements)

**Comprehensive support for JCache (JSR-107) annotations and related features**

[https://spring.io/blog/2014/04/14/cache-abstraction-jcache-jsr-107-annotations-support](https://spring.io/blog/2014/04/14/cache-abstraction-jcache-jsr-107-annotations-support) [https://spring.io/blog/2014/06/16/further-cache-improvements-in-spring-4-1](https://spring.io/blog/2014/06/16/further-cache-improvements-in-spring-4-1)

**A compiler mode for the Spring Expression Language (SpEL)**

SpEL allows for selective compilation of hotspot expressions into Java bytecode at runtime. Set the "spring.expression.compiler.mode" property to "immediate" or "mixed" and see...

**Flexible resolution and transformation of static web resources**

See the [package javadocs of org.springframework.web.servlet.resource](http://docs.spring.io/spring-framework/docs/4.1.0.RC1/javadoc-api/org/springframework/web/servlet/resource/package-summary.html) for an initial overview. Stay tuned for further coverage later this week...

**Web MVC support for Groovy markup templates**

A Spring MVC View implementation based on [http://jira.codehaus.org/browse/GROOVY-6596](http://jira.codehaus.org/browse/GROOVY-6596). Further coverage to follow...

**And many refinements in other areas, for example:**

-   Java 8's Optional type for injection points and MVC handler method parameters
-   Direct field binding support for nested fields and auto-growing of nested field paths
-   Declarative MVC view resolution setup, support for Jackson's JsonView mechanism
-   A WebSocket scope, SockJS client support, and exposing STOMP/WebSocket stats
-   Declarative SQL scripts and programmatic transactions in the TestContext framework

Please give 4.1 RC1 a try! Explore the new features or do some regression testing - we'd like to know how it goes. RC2 is then planned for mid August; GA for the first week of September.

Cheers,

Juergen

****