---
title: This Week in Spring  - Tuesday October 14th, 2014
source: https://spring.io/blog/2014/10/14/this-week-in-spring-tuesday-october-14th-2014
scraped: 2026-02-23T22:11:42.222Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  October 14, 2014 | 0 Comments
---

# This Week in Spring  - Tuesday October 14th, 2014

_Engineering | Josh Long |  October 14, 2014 | 0 Comments_

Welcome to another installment of *This Week in Spring*! This week I've been at Silicon Valley Code Camp, JAX London and Geekout UK talking to developers about how to build scalable, microservice-centric [Spring Boot](http://start.spring.io) applications on [Cloud Foundry](http://cloudfoundry.org/index.html). It's been a lot fun talking to enthusiastic developers (on both sides of the Atlantic!).

Without further ado, let's get on with the roundup!

-   Spring Boot co-lead Phil Webb just announced the availability of [Spring Boot 1.2.0.M2](https://spring.io/blog/2014/10/11/spring-boot-1-2-0-m2-available-now) which includes, among other things, auto-configuration for Jersey, log4j, `commons-dbcp` support, a smarter *disk usage* health indicator and improved RabbitMQ support
-   Spring and Groovy Tool Suite lead Martin Lippert [has just announced the latest and greatest release, 3.6.2](https://spring.io/blog/2014/10/13/spring-tool-suite-and-groovy-grails-tool-suite-3-6-2-released), which is a maintenance release that includes an update to the latest Eclipse Luna SR1 installation.
-   Also, Spring Boot co-lead [Phil Webb just announced the 1.1.8 release of the 1.1x line of Spring Boot](https://spring.io/blog/2014/10/11/spring-boot-1-1-8-released) which includes a fix for the white-label error page cross-site scripting attack.
-   Federated security is an important part of any distributed, multi-client, (micro)service-oriented system. Spring Security and Spring Security OAuth, in particular, provide a compelling solution. Join the good Dr. Dave Syer for this [upcoming webinar on microservice security using OAuth2](https://spring.io/blog/2014/10/01/webinar-security-for-microservices-with-spring-and-oauth2)
-   Matt Stine will be doing a webinar introducing [how Pivotal Cloud Foundry and Spring Cloud make for a natural solution to building microservices](https://spring.io/blog/2014/10/01/webinar-architecting-for-continuous-delivery-microservices-with-pivotal-cf-and-spring-cloud). Don't miss this one!
-   Atlanta, GA, USA Tuesday Oct 21, Learn about Spring, Microservices, and Cloud Foundry at a [one day roadshow event](http://www.pivotal.io/platform-as-a-service/cloud-platform-roadshow/atlanta#cities) at Cox communications.
-   Munich, Germany, GA, Thursday Oct 23, Learn about Spring, Microservices, and Cloud Foundry at a [one day roadshow event](http://www.pivotal.io/platform-as-a-service/cloud-platform-roadshow/munich) at EMC's office in Ismaning, Germany.
-   I hope you'll join the Vaadin team and I on October 23rd for a [look how to build Spring Boot-powered Vaadin applications](http://spring.io/blog/2014/10/01/webinar-building-bootful-uis-with-spring-boot-and-vaadin).
-   The *Java et Moi* blog has a nice (French language) post [on using Spring MVC's `@SessionAttribute` annotation](http://javaetmoi.com/2014/10/annotation-sessionattributes-modelattribute-spring-mvc/)
-   I *really* enjoyed this [very thorough look at contributing configuration property values](http://altfatterz.blogspot.com/2014/10/software-configuration-with-spring-boot.html) to a Spring Boot application (as `--D` arguments, environment variables, values in a property file, and values inside of JNDI)
-   Sudhir Dharmadhikari has done a *very* [nice job introducing the `yeoman` code-generator based JHipster](http://iwaow.blogspot.com/2014/10/jhipster-super-baby-in-springroos-pouch.html), which builds on top of [Spring Boot](http://spring.io/projects/spring-boot).
-   Our pal Miroslav Kopecky is back, this [time with a nice post on using Spring MVC (in Spring 4) using Java configuration](http://java.dzone.com/articles/scala-4-spring-mvc-without-0) (through Scala!)
-   [Redis Cluster is no longer vaporware](http://antirez.com/news/79)! Check out the details.
-   Biju Kunjummen has put together [a very nice post on the two styles of Java configuration](http://java.dzone.com/articles/spring-configuration-and): one where you declare dependencies as parameters to the `@Bean`\-annotated bean definition method, and one where you simply reference the other bean by calling a method.
-   Check out this post on [avoiding dependency conflicts between Log4j2 and SLF4J](http://architects.dzone.com/articles/using-log4j2-slf4j-spring-4) in a Spring application.
-   Check out this post by Daniel Murygin which includes a detailed walk-through [on building a fairly non-trivial REST service (that even handles file-uploads!) and client application using Spring Boot](http://murygin.wordpress.com/2014/10/13/rest-web-service-file-uploads-spring-boot/)?