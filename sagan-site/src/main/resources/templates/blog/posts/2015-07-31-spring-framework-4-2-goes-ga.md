---
title: Spring Framework 4.2 goes GA
source: https://spring.io/blog/2015/07/31/spring-framework-4-2-goes-ga
scraped: 2026-02-23T19:45:39.923Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  July 31, 2015 | 15 Comments
---

# Spring Framework 4.2 goes GA

_Releases | Juergen Hoeller |  July 31, 2015 | 15 Comments_

Dear Spring community,

It's my pleasure to announce that Spring Framework 4.2 is now generally available from [repo.spring.io](https://repo.spring.io) as well as Maven Central! This is a feature release in the 4.x line, compatible with Java 6 and 7 as well as Java 8, with a focus on core refinements and modern web capabilities:

-   Annotation detection on Java 8 default methods (e.g. `@Bean`)
-   Annotation-based application events (`@EventListener`)
-   First-class support for annotation attribute aliases (`@AliasFor`)
-   Full nested path processing for direct field binding
-   Data binding and conversion for JSR-354 Money & Currency
-   Integration with Hibernate ORM 5.0 (natively and via JPA)
-   Standards-based bean scripting via JSR-223 (JRuby, JavaScript)
-   JSR-223 based web views (with a focus on JavaScript on Nashorn)
-   Rich support for CORS and declarative HTTP caching
-   First-class support for HTTP Streaming and Server-Sent Events
-   CompletableFuture for handler methods and `@Async` methods
-   Support for Jackson's `@JsonView` on STOMP endpoint methods
-   A STOMP client for use over TCP and WebSocket channels
-   MockMvc HtmlUnit integration for easy local testing of web pages
-   Integration tests can alternatively be executed with JUnit rules
-   *And, as always, many further refinements in the details.*

Check out [New Features and Enhancements in Spring Framework 4.2](https://docs.spring.io/spring-framework/docs/4.2.x/spring-framework-reference/htmlsingle/#new-in-4.2) in the reference documentation for a more detailed overview. Stay tuned for the 4.2-based [Spring Boot 1.3](http://projects.spring.io/spring-boot/), with a release candidate expected in time for SpringOne in September...

Please note that Spring Framework 4.2 is a recommended upgrade for all 4.x users, immediately superseding the 4.1 line. The final 4.1.x maintenance release is expected by December; for any remaining issues, you'll have to upgrade to 4.2.x at that point.

Our next feature release will be [Spring Framework 4.3](https://jira.spring.io/issues/?jql=fixVersion%20%3D%20%224.3%20Backlog%22%20AND%20project%20%3D%20SPR%20ORDER%20BY%20issuetype%20DESC), with a release candidate expected in March 2016. This will be the final generation within the general Spring 4 system requirements (Java 6+, Servlet 2.5+), getting prepared for an extended 4.3.x support life until 2019.

Cheers, Juergen

#SpringOne 2GX 2015 is around the corner! Book your place at [SpringOne2GX in Washington, DC](http://www.springone2gx.com) soon. It's simply the best opportunity to find out first hand all that's going on and to provide direct feedback. Join Stéphane and myself for a session on [modern Java component design with Spring 4.2](https://2015.event.springone2gx.com/schedule/sessions/modern_java_component_design_with_spring_framework_4_2.html).