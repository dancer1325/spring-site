---
title: This Week in Spring - February 17th, 2015
source: https://spring.io/blog/2015/02/17/this-week-in-spring-february-17th-2015
scraped: 2026-02-23T21:55:15.827Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  February 17, 2015 | 0 Comments
---

# This Week in Spring - February 17th, 2015

_Engineering | Josh Long |  February 17, 2015 | 0 Comments_

Welcome to another installment of *This Week in Spring*! This week I've been in studio recording the next iteration of the Spring Livelessons series, this one on building cloud-native applications (microservices) with Spring Boot, Spring Cloud, and Cloud Foundry. It's been a lot of fun, and - this morning - I took a break to do two 1.5 hour webinars for O'Reilly on building Spring Boot applications and Spring Cloud microservices, both entirely live coded! It's been a fun week for me, and I hope it has for you, as well.

This Thursday the 19th marks the culmination of this year's *Lunar New Year*, or [*Chinese new year*](http://en.wikipedia.org/wiki/Chinese_New_Year) or ***Spring festival***. What's this to do with Spring (the technology)? Not much, besides being a celebration of better things to come and a great name! So happy new year (新年快乐) to readers all around the world!

Anyway, without further ado, let's get to it!

-   The good Dr. Mark Pollack just [announced Spring XD 1.1](http://spring.io/blog/2015/02/12/spring-xd-1-1-ga-and-1-0-4-released)! The new release is *incredible*: stream processing based on Reactor, RxJava, and Spark; Sqoop and Spark batch jobs (in addition to Spring Batch and Hadoop); Python processor modules; a Java configuration model for custom processor modules; integration with a myriad backends, including Kafka, and *much* more! Get the bits, get your data processing pipelines done faster and more reliably, and get home in time to celebrate!
-   The good Dr. Dave Syer just announced [Spring Cloud 1.0.0.RC3 is now available](http://spring.io/blog/2015/02/13/spring-cloud-1-0-0-rc3-available-now)! This is *hopefully* the last milestone before 1.0.0, so be sure to get the bits and try it out!
-   Spring XD ninja Sabby Anandan put together a nice post [looking at some of the *many* new features in Spring XD 1.1](http://spring.io/blog/2015/02/12/spring-xd-data-driven-connectivity-within-a-unified-platform)
-   Spring ninja Stephane Nicoll put together a nice post that [looks at the new events support in Spring framework 4.2](http://spring.io/blog/2015/02/11/better-application-events-in-spring-framework-4-2)
-   Benjamin Winterberg put together a lovely piece on building Isomorphic (JavaScript views rendered on both the client and the server with React.js) [applications with Spring Boot and Nashorn](http://winterbe.com/posts/2015/02/16/isomorphic-react-webapps-on-the-jvm/)! This is so cool!
-   Spring (and Spring Boot) make it super simple to put together a headless processing application - you know, one that doesn't have an HTTP endpoint? So, naturally, [I smiled when I saw this Spring Boot `init.d` script](https://github.com/rburgst/spring-boot-initscript)!
-   This Do-It-Yourself example of [running Spring Boot on OpenShift is interesting](http://blog.codeleak.pl/2015/02/openshift-diy-build-spring-boot.html). OpenShift has a concept of cartridges. I think - but am not 100% sure - that they provide map logically to the concept of buildpacks on Cloud Foundry and Heroku. Except, apparently, the DIY cartridge can't be scaled up.. so this isn't exactly recommended for any sort of real use.
-   Our pal Dan Woods put together another [stellar look at Spring Boot for microservices for InfoQ](http://www.infoq.com/articles/boot-microservices)
-   The amazing [Brian Dussault](http://twitter.com/bdussault) put together [a nice follow-up post](http://spring.io/blog/2015/02/11/java-doesn-t-suck-rockin-the-jvm) to our pal \[James Wards' post, [*Java Doesn't Suck, You're Just Doing it Wrong*](http://www.jamesward.com/2014/12/03/java-doesnt-suck-youre-just-using-it-wrong).
-   Check out this replay to Andy Wilkinson's talk, [*Documenting REST APIs*](http://spring.io/blog/2015/02/10/webinar-replay-documenting-rest-ful-apis)
-   Want to learn more about the Spring Integration Java configuration DSL (that was rhetorical! Of course you do!), then check out [the replay of Gary Russell's awesome webinar on the subject](http://spring.io/blog/2015/02/10/webinar-replay-introducing-the-java-dsl-for-spring-integration).
-   Speaking of Dan Woods, check out the replay [of his SpringOne2GX 2014 talk introducing RatPack](http://spring.io/blog/2015/02/10/springone2gx-2014-replay-ratpack-web-framework)
-   Groovy-language ninja Cédric Champeau's SpringOne2GX 2014 talk, [*Rethinking API Design with Traits*](http://spring.io/blog/2015/02/10/springone2gx-2014-replay-rethinking-api-design-with-traits) is available!
-   Kenneth Kousen's SpringOne2GX 2014 talk introducing the various [approaches to unit-testing in Grails is now available online](http://spring.io/blog/2015/02/10/springone2gx-2014-replay-testing-grails)
-   Ryan Vanderwerf's SpringOne2GX 2014 talk introducing [web clustering with Terracotta and Grails is now available online](http://spring.io/blog/2015/02/10/springone2gx-2014-replay-web-clustering-integration-with-terracotta-bigmemory-quartz-grails)
-   Peter Niederwieser's SpringOne2GX 2014 talk, [*Building a Continuous Delivery Pipeline with Gradle and Jenkins*, is now available](http://spring.io/blog/2015/02/10/springone2gx-2014-replay-building-a-continuous-delivery-pipeline-with-gradle-and-jenkins)!
-   Colin Harrington's SpringOne2GX 2014 talk on securing [Grails apps is now available](http://spring.io/blog/2015/02/10/springone2gx-2014-replay-securing-your-grails-app-beyond-authentication-authorization)
-   Also, [HTTP 2 is final](http://thenextweb.com/insider/2015/02/18/http2-first-major-update-http-sixteen-years-finalized/)!