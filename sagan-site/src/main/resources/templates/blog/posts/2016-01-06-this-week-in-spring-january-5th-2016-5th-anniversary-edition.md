---
title: This Week in Spring - January 5th, 2016 (5th Anniversary Edition!)
source: https://spring.io/blog/2016/01/06/this-week-in-spring-january-5th-2016-5th-anniversary-edition
scraped: 2026-02-23T19:31:37.327Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  January 06, 2016 | 2 Comments
---

# This Week in Spring - January 5th, 2016 (5th Anniversary Edition!)

_Engineering | Josh Long |  January 06, 2016 | 2 Comments_

Welcome to another installment of *This Week in Spring* and welcome back from what I hope was a restive, fun new year!

This week, we mark the fifth anniversary of *This Week in Spring* which [Adam Fitzgerald](https://twitter.com/devrelchap) and I started (based on some discussion with [Keith Donald](https://twitter.com/kdonald) in January 2011) fresh from the 2010 holidays.

Since then I've done my level-headed best to publish it *every week* (no exceptions! no missed weeks!) before midnight in Hawaii on Tuesday, *every week*, no matter what timezone I find myself in for that week! The world's a big place, so from the perspective of someone sitting in, say, New York City, it may seem sometimes like this blog goes up midday Monday (00:00AM in various Asian countries) or early morning Wednesday (23:59 in Hawaii) - that's a *lot* of variability! But I assure, you it's *always* Tuesday when I post it!

I post whenever I can get around to it. If I know I'll be on a long 10-20hr plane ride I'll make sure to pre-publish it or to schedule it if it's still Monday wherever I am.

In the beginning, [Adam Fitzgerald](http://twitter.com/devrelchap) and, in the last few years, [Pieter Humphrey](http://twitter.com/PieterHumphrey) have been invaluable in, among *many* other things, making sure that the post isn't missing a link or that I - in haste - didn't fat finger something. Thanks gents, I truly couldn't have done it without you!

Of course, the biggest contributors to *This Week in Spring* - and the reason I love doing it - is all of *you*, the community, whose energy and enthusiasm drives you to go above and beyond; to write blogs, record talks, present slidedecks, and generally help spread mastery worldwide. THANK YOU SO MUCH!

Here's to many more installments and as always [don't hesitate to ping me on Twitter (@starbuxman)](http://twitter.com/starbuxman) with contributions, feedback or anything else.

And now, with that out of the way, let's get onto another content-packed roundup!

-   Spring Cloud's very own Marcin Grzejszczak has just posted a very nice piece on [testing Spring Cloud-based microservices](http://spring.io/blog/2016/01/04/testing-spring-cloud-projects)
-   Spring XD and Spring Cloud Data Flow lead Dr. Mark Pollack just [announced Spring Cloud Stream 1.0 M3 and Spring Cloud Data Flow 1.0 M2](http://spring.io/blog/2015/12/29/spring-cloud-stream-1-0-m3-and-data-flow-1-0-m2-released)
-   Our pal [Pieter Humphrey](http://twitter.com/PieterHumphrey)'s at it again and has thrown a lot of great content up from last year's SpringOne2GX 2015. Let's start with an introduction by Drs. Syer and Pollack to [message-driven microservices using Spring Cloud Stream, which underpins Spring Cloud Data Flow](http://spring.io/blog/2016/01/04/springone2gx-2015-replay-message-driven-microservices-in-the-cloud).
-   Want to learn Java 8 from a true master? Check out Dr. Venkat Subramaniam's talk [on Transforming Code to Java 8](http://spring.io/blog/2016/01/04/springone2gx-2015-replay-transforming-code-to-java-8)
-   This talk introduces [how to think about RxJava with Spring Boot-based applications](http://spring.io/blog/2016/01/04/springone2gx-2015-replay-introducing-rxjava-into-a-spring-boot-rest-api)
-   let Spring Data ninja Christoph Strobl teach you how to [introduce search functionality into your Spring Boot applications](http://spring.io/blog/2016/01/04/springone2gx-2015-replay-boot-your-search-with-spring)
-   check out Sarah Aerni, Srivatsan Ramanujam, and Jarrod Vawdrey's talk on how to [react to events in a data science solution](http://spring.io/blog/2016/01/04/springone2gx-2015-replay-data-driven-action-a-primer-on-data-science)
-   Adam Koblentz and I did [a talk introducing how to use Spring Boot and JRebel](http://spring.io/blog/2016/01/04/springone2gx-2015-replay-spring-boot-and-jrebel)
-   Check out our very own [Kenny Bastani's introduction to using Neo4J and Spring to create a page rank engine to rank Twitter followers](http://www.kennybastani.com/2016/01/spring-boot-graph-processing-microservices.html)
-   I really dig this French-language slide deck from [Anwar Ziani introducing how to use Spring Boot and Maven](https://speakerdeck.com/zianwar/introduction-to-maven-spring-and-spring-boot). I got to the end of it only to realize he and I had met! (SMALL WORLD!) The one thing I'd change from the deck is the subtle implication that Spring (before Spring Boot) required XML, which is simply not true. It supported Java configuration. I haven't used XML much at all in *years*.
-   Mert Caliskan has put together [a nice post on deploying Spring Boot applications onto the Payara Micro application server](https://dzone.com/articles/bootiful-enterprise-applications-powered-by-spring). Payara is a GlassFish variant. It's a good post but also mistakenly implies that Spring requires XML, which is just not true. Indeed, you can use Servlet 3.0, JPA, dependency injection and a slew of other Java EE technologies *without* requisite Java EE XML files (why does this article have an emtpy `web.xml`?) in basic Spring and Spring itself certainly doesn't require XML. I'm also a little confused why this application didn't simply use the typical Maven `pom.xml` as generated from the Spring Initializr which, among other things, pre-configures Java 1.8 support. All that aside, it's a nice article and interesting if you're going that way!

(I *almost* dated the post *2015* by accident!)