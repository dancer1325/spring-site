---
title: This Week in Spring - 18th September, 2012
source: https://spring.io/blog/2012/09/19/this-week-in-spring-18th-september-2012
scraped: 2026-02-24T08:16:41.938Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  September 19, 2012 | 0 Comments
---

# This Week in Spring - 18th September, 2012

_Engineering | Josh Long |  September 19, 2012 | 0 Comments_

Welcome to another installation of *This Week in Spring*! This week I'm in Bloomington-Normal, Illinois talking to StateFarm about Spring Projects: MVC, REST, Mobile, and Android. The developers here are code ninjas. Listening to their internal talks over the course of the day has been eye opening, to say the least. Don't miss the Spring, Groovy and Grails event of the year in Washington, DC: [SpringOne2GX](http://www.springone2gx.com/conference/washington/2012/10/home). If you haven't already registered, now's the time! Oh, and don't forget, if you're in the United States, today is [national cheeseburger day](http://www.huffingtonpost.com/2012/09/18/national-cheeseburger-day-la_n_1892385.html)! So... bon appetit!

```
Copy<LI> Chris Beams has announced the availability of <a href ="http://www.springsource.org/node/3654">Spring Framework 3.2 M2</a>, which features many new features including improved <CODE>TestContext</CODE> support, Spring MVC improvements, asynchronous <CODE>@Controllers</CODE>, and lots of bug-fixes and improvements.  </LI>
<LI> This month's SpringSource webinar is coming fast - <a href ="http://www.springsource.org/node/3653"> Spring Security with Rob Winch</a>. Be sure to register now! </LI>
<li> Martin Lippert has announced the availability  of the <a href="http://www.springsource.org/node/3658">3.1.0.M1 update for the Spring and Grails Tool Suites</a>.
The new release includes integrations built on top of Eclipse 3.8 and Eclipse 4.2, updated support for Mylyn 3.8.1, Maven support for Grails projects, and Mac OSX 10.8's Gatekeeper support. </li>
<li><a href = "http://twitter.com/m_f_">Mark Fisher's</a> epic tome <a href = "http://www.springsource.org/node/3659"><em>Spring Integration in Action</em> is available</a>! </li>
<li>  Broadleaf Commerce published  <a href="http://www.broadleafcommerce.com/post/why-broadleaf-continues-to-choose-spring">a great blog</a> post about why their project continues to choose Spring over Java EE.</li>
<li> Jonathan Brisbin has announced the availability of <a href ="http://www.springsource.org/node/3657">the Spring Data REST project, 1.0.0.RC3</a>, which includes a significant number of bug fixes, adds improved JSON representation, better integration of Jackson user-defined <code>Module</code>s, and support for the <a href="https://github.com/SpringSource/spring-hateoas">Spring HATEOAS project</a>.</li>
<LI> The TomcatExpert portal has announced the availability of <a href  ="http://www.tomcatexpert.com/blog/2012/09/18/apache-tomcat-maven-plugin-20">the Apache Tomcat Maven Plugin, version 2.0</a>, which supports deploying to - and embedding instances of - Apache Tomcat from the Maven build tool. </LI>

<LI> 
  Spring Data ninja Oliver Gierke tweeted the availability <a href ="https://github.com/SpringSource/spring-hateoas/commit/9e728b4660238f96a6ab25a4d63fe443a1c187eb">of JAX-RS support in Spring HATEOAS</a>. Spring HATEOAS, named for the pattern ("HTTP-as-the-engine-of-application-state"), makes it dead simple to build links to other RESTful resources based on the classes that host those resources. In a sense,
   you get type safety when building RESTful URLs.  You build an HTTP URL reference to a Spring MVC <CODE>@Controller</CODE> based on its class. Now, you can do the same for <CODE>@Path</CODE>-annotated JAX-RS classes thanks to this novel pull request. Nice! 
```

2.  The RabbitMQ blog announces the availability of [a new MQTT adapter for RabbitMQ](https://www.rabbitmq.com/blog/2012/09/12/mqtt-adapter/). MQTT, to quote [the MQTT website](http://mqtt.org), "A lightweight messaging protocol for small sensors and mobile devices, optimized for high-latency or unreliable networks." Really cool!
3.  Nicolas Frankel has an interesting post [about his experience jBPM 4 and Spring](http://java.dzone.com/articles/lessons-learned-integrating). Normally, at this point, I'd forward people to the [Activiti](http://www.activi.org) open-source BPMNS 2 workflow engine, which enjoys a very powerful Spring integration, but Nicolas has already tried it and couldn't adapt it because of organizational pressures! So, it's nice to at least see how to integrate jBPM.
4.  Christian Posta has a nice post on how to handle routes with Spring Integration, [delegating to an ActiveMQ broker for durable exchanges](http://architects.dzone.com/articles/backing-spring-integration-0).
5.  Julio de Jesus has put together a nice blog on using [Spring 3.1's bean profiles feature to describe environment-specific beans in a Spring application](http://ykchee.blogspot.com/2012/09/spring-31-bean-profiles.html).
6.  The Thymeleaf project has just announced [new support for Spring Security integration](http://forum.thymeleaf.org/Thymeleaf-now-has-Spring-Security-integration-td4025044.html) with the Thymeleaf view template technology.

```
Copy<LI> The Technical Notes blog has a great post describing how to <a href = " http://tshikatshikaaa.blogspot.com/2012/09/spring-sitemesh-integration-example.html">integrate Sitemesh with your Spring applications</a>. </LI>
<LI> Our pal Roger Hughes is back at it, this time with a lovely post on <a href="http://java.dzone.com/articles/spring-31-caching-and">using Spring 3.1's <CODE>@Cacheable</CODE> annotation and the <CODE>CacheManager</CODE> API</a>. </LI> 
<LI> A new version of the <a href="http://t.co/ltm7fgbo">C24 Spring Components has been released</a>.  </lI>
```