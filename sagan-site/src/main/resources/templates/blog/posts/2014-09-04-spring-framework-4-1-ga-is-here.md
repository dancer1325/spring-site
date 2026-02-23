---
title: Spring Framework 4.1 GA is here!
source: http://spring.io/blog/2014/09/04/spring-framework-4-1-ga-is-here
scraped: 2026-02-23T22:14:58.492Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  September 04, 2014 | 27 Comments
---

# Spring Framework 4.1 GA is here!

_Releases | Juergen Hoeller |  September 04, 2014 | 27 Comments_

Dear Spring community,

I'm pleased to announce that after an intense release candidate phase, the Spring Framework 4.1 GA release is now available!

Our 4.1 generation delivers **major new features along several themes:**

-   Annotated JMS listener methods
-   Comprehensive support for JCache (JSR-107) annotations
-   Flexible resolution and transformation of static web resources
-   MVC views: declarative resolution, Groovy markup templates, Jackson's JsonView
-   WebSocket refinements: WebSocket scope, SockJS client support, WebSocket stats
-   Performance: SpEL compiler mode, concurrency fine-tuning across the container

And as always, 4.1 also comes with **a lot of enhancements in the details**, for example:

-   Direct field binding support with auto-growing for nested fields
-   Java 8's Optional for injection points and MVC handler parameters
-   Support for the standard @Priority annotation for dependency ordering and selection
-   Annotated @Lookup methods with support for provided constructor arguments
-   Declarative SQL scripts and programmatic transactions in the TestContext framework
-   Enhanced Hibernate JPA setup: isolation levels, discovery of managed packages

Many of those topics have been covered in recent blog posts already and will also be prominently featured at our **[SpringOne2GX 2014](http://www.springone2gx.com/) show in Dallas next week!**

We recommend an early upgrade since the 4.1 line is the primary maintenance branch now, immediately superseding the 4.0.x line. For a more conservative upgrade path, we have co-released 4.0.7 with 4.1 GA - as an intermediate step on your way to 4.1 proper.

Note that Spring Framework 4.1 does not raise the fundamental system requirements: It is still **Java 6+, Servlet 2.5+, JPA 2.0+** as outlined for the original Spring Framework 4.0 release, which means it happily runs even on WebSphere 7!

Cheers,

Juergen