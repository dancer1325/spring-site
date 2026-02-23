---
title: Spring Framework 4.2 goes RC1
source: http://spring.io/blog/2015/05/26/spring-framework-4-2-goes-rc1
scraped: 2026-02-23T19:51:32.198Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  May 26, 2015 | 9 Comments
---

# Spring Framework 4.2 goes RC1

_Releases | Juergen Hoeller |  May 26, 2015 | 9 Comments_

Dear Spring community,

It's my pleasure to announce that Spring Framework 4.2 RC1 is now available from our [milestone repository](http://repo.spring.io/milestone/). This is a feature release in the 4.x line with a focus on core refinements and modern web capabilities:

-   Annotation detection on Java 8 default methods (e.g. `@Bean`)
-   Annotation-based application events (`@EventListener`)
-   First-class support for annotation attribute aliases
-   Full nested path processing for direct field binding
-   Data binding and conversion for JSR-354 Money & Currency
-   Integration with Hibernate ORM 5.0 (natively and via JPA)
-   Rich support for CORS and declarative HTTP caching
-   First-class support for HTTP Streaming and Server-Sent Events
-   Listenable/CompletableFuture as message handler return value
-   A STOMP client for use over TCP and WebSocket channels

Check out [the full changelog](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10000&version=14754) and the [New Features and Enhancements in Spring Framework 4.2](https://docs.spring.io/spring-framework/docs/4.2.x/spring-framework-reference/htmlsingle/#new-in-4.2) in the reference documentation for a more detailed overview. We'll be publishing in-depth blog posts for specific feature areas in the course of the next few weeks; stay tuned!

There is an RC2 planned for mid June before we go GA in mid July. Note that the 4.2 line will supersede 4.1 immediately, with further 4.1.x maintenance only to be provided for a few months after the 4.2 GA release. Development towards 4.3 will commence soon afterwards.

We're looking forward to getting in touch via [Twitter](https://twitter.com/springcentral), [StackOverflow](http://stackoverflow.com/tags/spring) or [JIRA](https://jira.spring.io/browse/SPR).

Cheers,

Juergen

#SpringOne 2GX 2015 is around the corner! Book your place at [SpringOne2GX in Washington, DC soon](http://www.springone2gx.com). Super Early Bird Price expires June 12th! It's simply the best opportunity to find out first hand all that's going on and to provide direct feedback. Join Stéphane and myself for a session on [modern Java component design for Spring 4.2](https://2015.event.springone2gx.com/schedule/sessions/modern_java_component_design_with_spring_4_2.html).

#Discounts

-   The Super Early Bird price tier ($300 discount) expires June 12th. The Early Bird price tier (June 13th - August 14th) is discounted $150.
-   Register 4 and get the 5th pass free. Contact us with the names of your first 4 registrants for your complimentary pass code (conference admission only).
-   Alumni, contact us for your discount code ($150 off any option).