---
title: Spring Framework 5.0 RC2 available now
source: https://spring.io/blog/2017/06/14/spring-framework-5-0-rc2-available-now
scraped: 2026-02-23T16:28:36.222Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  June 14, 2017 | 9 Comments
---

# Spring Framework 5.0 RC2 available now

_Releases | Juergen Hoeller |  June 14, 2017 | 9 Comments_

Dear Spring community,

It is my pleasure to announce that our second Spring Framework 5.0 release candidate is [available](http://projects.spring.io/spring-framework/) now. This is a major revision of RC1, with refactorings in our new reactive facilities and in our new path pattern parser, as well as code style refinements all over the framework.

This release introduces a formal non-null API declaration for all of our packages, with explicitly nullable arguments and return values annotated as such now (instead of just javadoc'ed). Our nullability annotations are compliant with JSR 305 and specifically supported by IntelliJ IDEA and upcoming versions of Kotlin, with the potential to deliver particularly strong benefits for Kotlin users (which is why we've rolled them into 5.0 still). Note that we apply stronger null enforcement in some Spring APIs now, superseding our previously lenient null handling.

Please give RC2 a try and let us know how it goes! Next up is an RC3 in July, shortly before we go GA, so there is still an opportunity for further refinements based on your feedback. Beyond a few remaining loose ends in the codebase, we are also going to pick up the final releases of Reactor 3.1 and Jackson 2.9 and wrap up our compatibility story with Servlet 4.0 and JPA 2.2.

Cheers, Juergen