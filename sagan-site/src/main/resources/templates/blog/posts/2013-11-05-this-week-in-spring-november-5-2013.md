---
title: This Week in Spring - November 5, 2013
source: https://spring.io/blog/2013/11/05/this-week-in-spring-november-5-2013
scraped: 2026-02-24T07:53:52.223Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  November 05, 2013 | 0 Comments
---

# This Week in Spring - November 5, 2013

_Engineering | Josh Long |  November 05, 2013 | 0 Comments_

Welcome to another installment of *This Week in Spring*! I'm in Malmo, Sweden at the fantastic [Øredev conference](http://oredev.org), talking to developers about [Spring](http://spring.io), [Cloud Foundry](http://cloudfoundry.org), and more! I'll be at [JMaghreb](http://www.jmaghreb.org/jmag20/) next week and then at [Devoxx 2013](http://devoxx.be) where I'll be talking to developers about Spring, [Cloud Foundry](http://cloudfoundry.org), [RabbitMQ](http://rabbitmq.com) and more along with my pals [Dr. Dave Syer](https://twitter.com/david_syer), [Alvaro Videla](http://twitter.com/old_sound), and [Andy Piper](https://twitter.com/andypiper). Looking forward to seeing you at any of these places! Ping me [on Twitter (@starbuxman)](http://twitter.com/starbuxman) if you want to talk Spring, the cloud, big data and anyting else!

With that, we've got a lot of really great stuff this week so let's get to it!

1.  First, the big news: [Spring Framework 4.0 RC1](https://spring.io/blog/2013/11/01/spring-framework-4-0-rc1-available) has been released! The new release includes full compatability with OpenJDK 8 developer previews, Groovy configured beans, improvements to Spring MVC, smarter proxies, time zone resolution (connected to JSR 310 and Joda-Time), Spring HATEOAS-inspired link-building, improved websocket support, and a *lot* more! Get the bits, test your apps, and be sure to let us know how you like it!
2.  Spring Security lead Rob Winch is at it again, this time [with a Spring Security 3.2.0 RC2 release](http://spring.io/blog/2013/11/01/spring-security-3-2-0-rc2-released) which includes resolutions for 80+ issues, and a slew of upates - some breaking, so to be sure to update and verify everything.
3.  Additionally, Rob's just [released Spring LDAP 2.0.0.M1](http://spring.io/blog/2013/11/01/spring-ldap-2-0-0-m1-released), which adds a *lot* of new functionality including Spring Data repository and QueryDSL support, a fluent LDAP query builder, a custom XML namespace for LDAP, Java 5 featues, and some restructuring
4.  P.S.: If you happen to be in the London area or with easy access to it, check out the [Spring eXchange](http://skillsmatter.com/event/java-jee/spring-exchange-1724): a packed two-day show on Nov 14/15, with key Spring engineers presenting the latest and greatest - of course including **Spring Framework 4.0**!
5.  I gave a talk at JavaOne called [*the Spring Update*](http://www.parleys.com/share_channel.html#play/525070b1e4b0a43ac121241a) that looks at a lot of the cool new things coming out of the Spring division at Pivotal. The talk is now online at Parleys.com so check it out!
6.  Paul Chapman's put together a *very* good post explaining [error handling strategies in Spring MVC](http://spring.io/blog/2013/11/01/exception-handling-in-spring-mvc)
7.  Daniel Lipp and Tobias Mattsson, from Magnolia, did a nice webinar introducing how [to integrate the Magnolia CMS with Spring and Grails based applications](http://spring.io/blog/2013/10/31/springone2gx2013-replay-spring-and-web-content-management). Cool stuff!
8.  [Greg Turnquist](https://twitter.com/gregturn) continues the narrative on Spring Boot and talks about how to add [property support to a custom Spring Boot module](http://spring.io/blog/2013/10/30/empowering-your-apps-with-spring-boot-s-property-support).
9.  Blogger [Hébert Oliveira](http://twitter.com/uaiHebert) has put together an *epic* post on [using Spring MVC, Spring Data, Spring Security, Bootstrap, and Angular.js together](http://uaihebert.com/complete-web-application-angular-twitter-bootstrap-spring-mvc-data-and-security/). Definitely worth a look!
10.  I'm excited to see Thymeleaf 2.1 support [for automatic Spring Security CSRF integration](https://github.com/thymeleaf/thymeleaf-spring3/issues/7). Nice job!
11.  [Spring's documentation is now moving to Asciidoc](https://github.com/spring-projects/spring-framework/commit/fd0b6caf)! This is interesting mostly because it'll be easier to update and maintain the documentation now, and you can expect even *better* docs as a result!
12.  Spring Boot tip thanks to Dr. Dave Syer: any bean of type `TomcatConnectorCustomizer` in a Spring Boot application will give you a callback reference to the `Connector` which you can then use to customize the embedded Tomcat instance. One possible application of this is [applying SSL to the embedded Tomcat instance](http://www.copperykeenclaws.com/adding-an-https-connector-to-embedded-tomcat-7/).
13.  Speaking of Spring Boot, check [out this Spring Boot Java app](http://ow.ly/q4uAc), a "full-featured" reference app that runs on [@CloudFoundry](http://twitter.com/cloudfoundry) that's designed to monitor builds. Nice job, [Ben Hale](https://twitter.com/nebhale)!