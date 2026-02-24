---
title: This Week in Spring - February 4th, 2014
source: https://spring.io/blog/2014/02/04/this-week-in-spring-february-4th-2014
scraped: 2026-02-24T07:43:23.656Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  February 04, 2014 | 2 Comments
---

# This Week in Spring - February 4th, 2014

_Engineering | Josh Long |  February 04, 2014 | 2 Comments_

Welcome back to another installment of *This Week in Spring*! There's a lot to cover so let's get to it.

1.  Spring Integration 3.0.1 maintenance release is now available, with lots of good bug fixes, and we encourage 3.0.0 users to upgrade now. Check out [Gary Russell's blog](https://spring.io/blog/2013/11/27/spring-integration-3-0-release-candidate-1-is-now-available) about what's new in 3.0.0 if you haven't seen it yet, lots of new features.
2.  Spring Data's [first release candidate of their "Codd" release train](https://spring.io/blog/2014/01/29/first-release-candidate-of-spring-data-release-train-codd-released) is now available!
3.  Join Spring Data project leads Oliver Geirke and Thomas Darimont on Feb 18th as they school us on [Spring Data Repositories - Best Practices](http://spring.io/blog/2014/01/21/webinar-spring-data-repositories-best-practices).
4.  On Feb 11th, don't miss an [Intro to Apache Tomcat 8](http://spring.io/blog/2014/01/21/webinar-intro-to-apache-tomcat-8) Webinar with Apache committer [Stuart Williams](http://www.twitter.com/pidster) and Daniel Mikusa
5.  In other Apache Tomcat news, the [maintenance release for Apache Tomcat 6.0.39](http://www.tomcatexpert.com/blog/2014/02/04/apache-tomcat-6039-released) is now available. Head over to the TomcatExpert blog to check out the details.
6.  *Zoltan's blog* has [a very nice post on building and deploying a Spring Boot application to Heroku](http://altfatterz.blogspot.com/2014/02/spring-boot-application-on-heroku.html)! Check it out!
7.  Spring Batch lead Michael Minella gave a nice talk [on Spring Batch and the Batch JSR, JSR 352](http://spring.io/blog/2014/02/03/jsr-352-spring-batch-and-you) from SpringOne2GX, replay now available!
8.  Another SpringOne2GX replay this week, a fantastic talk from E\*Trade architect Durai Arasan, on [Real life use of Spring Integration with RabbitMQ](https://spring.io/blog/2014/02/03/real-life-use-of-spring-integration-with-rabbitmq) at E\*Trade. One of the best talks of SpringOne2GX 2013!
9.  [spring.io](http://spring.io) lead and Spring ninja [Chris Beams](http://twitter.com/cbeams) has put together [a great post](http://blog.gopivotal.com/products/open-source-is-pivotal) on what open-source means for all of us here at Pivotal. Check it out, and spread the word!
10.  Our pals at Neo4J got some great TechCrunch [coverage](http://techcrunch.com/2014/02/02/neo4j-a-graph-database-for-building-recommendation-engines-gets-a-visual-overhaul/) about how Neo Technologies is changing the world of Graph databases!
11.  Blogger Brian put together a neat look at one way to handle common web development tasks like resource optimization (JavaScript transpilation, JavaScript and CSS minification, etc. ) [with WRO4J and Spring](http://briansjavablog.blogspot.com/2014/01/web-resource-optimisation-with-wro4j.html). Check it out!
12.  Spring lead Juergen Hoeller put up a nice post on how to migrate from [Spring 3.2 to Spring 4.0.(1)](http://spring.io/blog/2014/01/30/migrating-from-spring-framework-3-2-to-4-0-1).
13.  The *Cygnet Infotech* blog put together a neat infographic about Grails titled [*6 Reasons Why Grails is an Awesome Java Web Framework*](http://www.cygnet-infotech.com/infographic-6-reasons-why-grails-is-an-awesome-java-web-framework). I have no idea what the infographic means by "Java" web framework, but it's certainly an epic JVM web framework, and the rest of it is as true as can be!
14.  The *Programming Free* blog has a post [on building RESTful services with Spring MVC 4.0](http://www.programming-free.com/2014/01/spring-mvc-40-restful-web-services.html). This post is technically correct, but could stand to be even simpler! (See below)
15.  [Fred George](https://twitter.com/fgeorge52), who I had the pleasure of meeting last year (when I spoke at Oredev) through our mutual pal [Chris Richardson](https://twitter.com/crichardson), did a great talk in 2012 about building micro services which you can watch [here](http://java.dzone.com/articles/micro-service-architecture). This video has nothing, specifically, to do with Spring. It instead focuses on building loosely coupled, discrete, *micro services* that - taken together - describe a *system*. Why do I mention this? Because Spring Boot makes it dead simple to build such services! Check out the [Spring Initializr](http://start.spring.io), select the functionality you need (perhaps *web* and *JPA*), open up `Application.java`, and then add a REST endpoint! [Here's an example of a complete, working REST service powered by Spring Boot](https://gist.github.com/joshlong/8822368). The only thing I omit is the Maven (or Gradle) build file.