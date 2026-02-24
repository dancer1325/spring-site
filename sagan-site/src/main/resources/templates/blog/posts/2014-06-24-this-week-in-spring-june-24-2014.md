---
title: This Week in Spring - June 24, 2014
source: https://spring.io/blog/2014/06/24/this-week-in-spring-june-24-2014
scraped: 2026-02-23T22:23:17.746Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  June 24, 2014 | 2 Comments
---

# This Week in Spring - June 24, 2014

_Engineering | Josh Long |  June 24, 2014 | 2 Comments_

Welcome to another installment of *This Week in Spring* - this week I'm working with the amazing Vaadin team on building some ridiculously fun applications. Be ready for more on that soon! Also, the [SpringOne2GX 2014 early bird has been extended to June 30th](http://www.springone2gx.com), so register now! Without further ado, onward:

-   [Spring Boot 1.1.2 is now available](http://spring.io/blog/2014/06/24/spring-boot-1-1-2-release-available-now)! The new release features mainly bug fixes and more. Check it out!
    
-   Adib Saikali gave a nice talk introducing where the rest of the [Spring IO platform benefits from Java 8](http://spring.io/blog/2014/06/23/meetup-replay-using-spring-framework-4-0-and-java-8), above and beyond the uses we've previously described in Spring framework.
    
-   Check out this [replay of Spring Batch lead Michael Minella's webinar introducing Spring Batch 3.0](http://spring.io/blog/2014/06/19/webinar-replay-spring-batch-3-0-0)
    
-   Check out Glenn Renfro's introduction [to using Spring Integration in an internet-of-things world](http://spring.io/blog/2014/06/23/webinar-replay-spring-integration-done-booti-fully)
    
-   Spring Data lead Oliver Gierke has announced the [final service release for Spring Data Codd](http://spring.io/blog/2014/06/18/final-service-release-for-spring-data-release-train-codd-available). This release contains bug-fixes that were already in the RC and GA releases of the Dijkstra release train.
    
-   The amazing Artem Bilan has just announced the M2 release of the Spring Integration Java DSL announced on the tail of the [recent Spring Integration 4 release](http://spring.io/blog/2014/06/18/spring-integration-java-dsl-milestone-2-released). The new release features many refinements and bug fixes. Check it out, kick the tires, and [make sure to let us know](http://twitter.com/springcentral)!
    
-   I enjoyed this nice, Spanish-language, [high-level, introduction to Spring Data](http://blog.gfi.es/mongodb-cassandra-oracle-y-spring-data-juntos-pero-no-muy-revueltos/).
    
-   Spring has always provided a sort of event internal to the Spring `ApplicationContext`. The events provide a way for one part of the system to communicate with other parts. Spring Boot goes a step further and provides events for things like Spring Security authentication, and authentication failure. Tim on the HoserDude blog has [a nice introduction to some of the ways you can use events in Spring](http://hoserdude.com/2014/06/21/leveraging-spring-container-events/)
    
-   Ever wanted to centralize your Spring MVC route definitions in an external file? Me either... but, many others seem to want to! I happened [upon this project](https://github.com/resthub/springmvc-router) by our very own Brian Clozel which provides exactly this. Check it out!
    
-   Check out this replay of [C24's bombastic CEO introducing distributed rules engines and complex-event processing](http://spring.io/blog/2014/06/24/springone2gx-2013-replay-distributed-rules-engines-and-cep) from SpringOne2GX 2013.
    
-   Spring Data Gemfire and of course Gemfire itself represent a one-two punch for scale: horizontal scale-out combined with memory-based reads and writes. This talk, by Lyndon Adams from SpringOne2GX 2013, offers a very nice look at how [to use Gemfire and Spring to contend with tidal data deluge that is the internet-of-things](http://spring.io/blog/2014/06/24/springone2gx-2013-replay-real-time-event-processing-and-decision-making)
    
-   Want to use GORM from Spring Boot? Check out this [example by Grails-lead Graeme Rocher](https://gist.github.com/graemerocher/9683543): so succinct!
    
-   Using the backbutton in a Spring Security-powered integration got you down? Check [out this post by Pham Thai Thinh](http://devjav.com/spring-security-browser-back-button/). This blog introduces ways that you can fast-expire resources which shouldn't be accessible from the browser history. Nice post! I'd perhaps revise the example to use Java configuration, but it's a nice example, either way. It's worth noting that in Spring Security 3.2+ this can be done with the built in Spring Security headers support.
    
-   Pham Thai Thinh *also* did a nice post on using an existing JDBC-based table as [the backend identity provider for Spring Security](http://devjav.com/spring-security-using-jdbc-authentication/).
    
-   Gretty, which seems to be like the Maven ecosystem plugin Cargo for running web applications as part of the build, [except for Gradle, now supports Spring Boot applications, as well](http://akhikhl.github.io/gretty-doc/Feature-overview.html)
    
-   Daniel Bryant has put [together a nice post on implementing correlation IDs across (micro-)services powered by Spring Boot](http://www.javacodegeeks.com/2014/05/implementing-correlation-ids-in-spring-boot-for-distributed-tracing-in-soamicroservices.html). This is a very handy thing to understand when dealing with, and tracking, state across multiple distributed components.