---
title: This Week in Spring - September 16th, 2014
source: https://spring.io/blog/2014/09/16/this-week-in-spring-september-16th-2014
scraped: 2026-02-23T22:14:21.613Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  September 16, 2014 | 0 Comments
---

# This Week in Spring - September 16th, 2014

_Engineering | Josh Long |  September 16, 2014 | 0 Comments_

Welcome to another installment of *This Week in Spring!* We're all back from last week's *epic* [SpringOne2GX 2014](http://springone2gx.com), but not resting on our laurels! As soon as I returned from SpringOne2GX, I set about preparing for this morning's webinar, [*Bootiful Microservices with Spring Boot*](http://spring.io/blog/2014/07/29/webinar-microservices-with-spring-boot-sept-16th). That seems to have really resonated well and this is, principally, because \[Spring Boot\]([http://spring.io/projects/spring-boot](http://spring.io/projects%10/spring-boot)) and [Spring Cloud](http://spring.io/projects/spring-cloud) are *awesome*! I can't until all the amazing videos on the topic from SpringOne2GX and this webinar itself are available to share with you. To me it feels like a way for

1.  Spring for Android lead and mobile ninja Roy Clarkson announced [Spring for Android 2.0.0.M1 has been released](http://spring.io/blog/2014/09/16/spring-for-android-2-0-0-m1-released). The new release supports OkHttp (via the `OkHttpRequestFactory`), updates the included `RestTemplate` implementation to be on parity with the `RestTemplate` included with the Spring framework (including support for marshalling responses with a `ParameterizedTypeReference`). It raises the baseline to Android 2.2 (effectively), and includes numerous bug fixes and other improvements. This is the first new release in a long time - I'd recommend getting and trying these bits ASAP!
2.  I don't mean to tease, but you should at least read the good Dr. Syer and Spencer Gibb's slides to their [Spring Cloud talk at SpringOne2GX](http://speakerdeck.com/dsyer/spring-cloud-spring-boot-and-netflix-oss). Great stuff.

-   Spring Security lead Rob Winch has written up a nice post [on using Spring Security with the Spring Session project and websockets](http://spring.io/blog/2014/09/16/preview-spring-security-websocket-support-sessions). Basically, if you're using JSR 356 (the websocket JSR), it's possible to need access to the HTTP session only to have it expire because the web-socket API doesn't keep it alive or make access easy. It's now possible to fix all that!
-   Speaking of Rob, a recording of a talk he gave - [*Spring Boot ... Tweeting Complete Spring Applications Since 2013*](http://www.infoq.com/presentations/spring-boot-hello-world) - is now available on InfoQ! Check it out!
-   Did you miss last week's *epic* **SpringOne2GX 2014**? Have no fear! As usual, the videos will be available on [Spring.io](http://spring.io/blog/2014/09/15/springone2gx-2014-day-2) in a trickle over the next few months, *and*, in the meantime, you can read the [day 1](http://spring.io/blog/2014/09/10/springone2gx-2014-day-1) and [day 2](http://spring.io/blog/2014/09/15/springone2gx-2014-day-2) recap posts.
-   ADTMag has a quick (albeit non-technical) news item [on the recently released Spring framework 4.1](http://adtmag.com/articles/2014/09/09/spring-framework-upgraded.aspx)
-   I just happened upon this [amazing interview of Spring framework lead Juergen Hoeller from QCon 2014 this year](http://www.infoq.com/interviews/Juergen-Hoeller-QConNY-2014-Interview) on all manner of topics. Really good interview!
-   Nguyen Anh Tuan has an interesting post on [how his group went about building a stateless and session-free, multi-tenant Spring Security implementation](http://sgdev-blog.blogspot.sg/2014/09/stateless-session-for-multi-tenant.html)
-   A promisingly named blog, *TheSpringWay*, has a nice post on the [convenient Spring MVC 4.1 improvements to response-code handling](http://thespringway.info/spring-web/dynamically-change-response-status-code/). Did you know the historically slightly kludgy `ResponseEntity` has a nice builder API now?
-   the *JavaCodeGeeks* blog has a nice post on using [Spring Batch with Spring Boot](http://www.javacodegeeks.com/2014/09/spring-batch-tutorial-with-spring-boot-and-java-configuration.html). It's an interesting post for lots of reasons, not the least of which is that it also captures a user's first steps in Java configuration (which runs rampant in Spring Boot).
-   I had a lot of fun giving this morning's webinar. Join me next week for a webinar with my pal [Joram Barrez on building process-centric Spring Boot and Activiti BPMN2 workflow engine](http://spring.io/blog/2014/07/29/webinar-process-driven-spring-applications-with-activiti-sept-23rd)!