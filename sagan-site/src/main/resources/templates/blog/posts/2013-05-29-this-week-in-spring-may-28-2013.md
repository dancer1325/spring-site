---
title: This Week in Spring - May 28, 2013
source: https://spring.io/blog/2013/05/29/this-week-in-spring-may-28-2013
scraped: 2026-02-24T08:04:46.295Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  May 29, 2013 | 0 Comments
---

# This Week in Spring - May 28, 2013

_Engineering | Josh Long |  May 29, 2013 | 0 Comments_

Welcome to another installment of *This Week in Spring*. In case you missed it last week, the vast majorty of the [SpringOne2GX 2013 agenda](http://www.springone2gx.com/conference/santa_clara/2013/09/springone/event_schedule) has been published, so book now and get the [early bird rate on the conference, and airfare](http://www.springone2gx.com/conference/santa_clara/2013/09/register)! As usual, we've got a *lot* to cover this week, so let's get to it!

1.  Spring Batch lead [Michael Minella](http://twitter.com/michaelminella) announced [Spring Batch 2.2.0 RC2](http://static.springsource.org/spring-batch/index.html). The new release is chalk full of great new features including support for the Spring Batch Java configuration API and a [Spring Data GemFire](http://www.springsource.org/spring-gemfire) `ItemReader` and `ItemWriter`.
2.  [Gary Russell](http://twitter.com/gprussell) just announced [Spring Integration 3.0 milestone 2](http://www.springsource.org/node/22613). Be sure to check out the new features and kick the tires!
3.  Join me for a webinar on [Building REST-ful Services with Spring](http://www.springsource.org/node/22612) - June 13th, 2013. I'll discuss OAUTH, Spring MVC and Spring HATEOAS as it relates to REST.
4.  [Rossen Stoyanchev](http://twitter.com/rstoya05)'s blogged about the upcoming [support for WebSockets in Spring 4](http://blog.springsource.org/2013/05/22/spring-framework-4-0-m1-websocket-support/) and it looks *very* compelling!
5.  [Gary Russell](http://twitter.com/gprussell) also just [announced the Spring Integration MQTT](https://twitter.com/gprussell/status/338031704033857537) extension adapter, milestone 1, that makes it easy to work with MQTT - a messaging technology that lends itself to lightweight messaging - from Spring Integration.
6.  [Oliver Gierke](http://twitter.com/olivergierke) has written up a great response to the question, [*how do I return a Spring Data page as JSON*](http://stackoverflow.com/questions/16790371/spring-mvc-3-return-a-spring-data-page-as-json/16794740#16794740) on Stack Overflow.
7.  Long-time readers of this roundup will know about Thymeleaf, the templating engine that breathes new life into your web application view templates and that works really well with Spring. The first, stable 2.0.0 version [of Thymeleaf-testing has just been released](http://forum.thymeleaf.org/New-thymeleaf-testing-library-td4026109.html).
8.  Joris Kuipers, on the Trifork blog, has announced a new set of macros for doing [form inputs with Spring applications using Freemarker](http://blog.trifork.com/2013/05/27/bootstrap-spring-mvc-form-input-freemarker-macros/), an alternative - and very powerful - templating engine.
9.  Oleg Tsal-Tsalko put together a [talk on the new bits in Spring 4](http://www.slideshare.net/olegtsaltsalko9/next-stop-spring-4). Nicely done, Oleg!
10.  Johnathan Mark Smith is back at it again, this time with a video on how to do [Java configuration with Spring. Check it out](http://www.youtube.com/watch?v=cfTY4LpZtf4&feature=youtu.be)!
11.  Maciej Walkowiak put together a great post on how to [audit entities using Spring Data MongoDB](http://maciejwalkowiak.pl/blog/2013/05/24/auditing-entities-in-spring-data-mongodb/).
12.  The poorly-named *Java2J2EE* blog has a great, short-and-sweet post on how to [setup JPA and Spring MVC with Spring's Java configuration style](http://javaj2ee.com/node/25). I would however discourage users from calling the lifecycle methods on a Spring `FactoryBean` directly, and instead choose to dereference the configured result:
     
     ```
     Copy@Bean public EntityManagerFactory emf(){
        LocalContainerEntityManagerFactoryBean lcemfb = ..
        return lcemfb;
     } 
     
     @Bean public PlatformTransactionManager transactionManager(){
       EntityManagerFactory emf = emf().getObject();
       return new JpaTransactionManager( emf );
     } 
     
     ```