---
title: This Week in Spring - May 22nd, 2012
source: https://spring.io/blog/2012/05/22/this-week-in-spring-may-22nd-2012
scraped: 2026-02-24T08:21:38.381Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  May 22, 2012 | 0 Comments
---

# This Week in Spring - May 22nd, 2012

_Engineering | Josh Long |  May 22, 2012 | 0 Comments_

Welcome back to another installment of *This Week in Spring*. We have a lot of great content this week, as usual!

1.  [Rossen Stoyanchev](http://blog.springsource.org/author/rstoyanchev/) has put up another blog in his series on Spring MVC 3.2 Preview. This latest installment introduces [a Spring MVC chat example](http://blog.springsource.org/2012/05/16/spring-mvc-3-2-preview-chat-sample/).
2.  [Oliver Gierke](http://blog.springsource.org/author/ogierke/) has announced the [1.1.0 GA version of Spring Data JPA](http://www.springsource.org/node/3552). Spring Data JPA makes it very simple to build JPA-based repositories, saving you from the tedious boiler plate code. This new release includes new keywords for query generation (`LessThanEqual`, `GreaterThanEqual`, `Before`, `After`, `StartsWith`, `EndsWith`, and `Contains`), a handy `PersistenceUnitPostProcessor` to scan for JPA entities (to be used in Spring versions before 3.1), support for native queries in `@Query`, and support for declarative locking.
3.  [Jonathan Brisbin](http://blog.springsource.org/author/jBrisbin/) announced the [1.0.0.M2 release of Spring Data REST](http://www.springsource.org/node/3553). Spring Data REST let's you easily export your Spring repository objects as RESTful endpoints. The new release includes support for invoking query methods of `Repository` interfaces, support for JSR 303 and Spring Validator validations, and improved support for Spring `ApplicationEvent`s that are emitted before and after each save or delete, and annotation-based configuration.
4.  [Oleg Zhurakousky](http://blog.springsource.org/author/ozhurakousky/) has announced the [first milestone release of Spring Integration 2.2](http://www.springsource.org/node/3555). This release includes dependency upgrades, JPA support, and support for "publisher confirms and returns," which are newly supported in Spring AMQP.
5.  [Gary Russell](http://blog.springsource.org/author/grussell/) has announced version [1.1.0 of Spring AMQP](http://www.springsource.org/node/3554) that includes support for the RabbitMQ 2.8.x client, which in turn supports mirrored queues, broker failover, publisher confirms, returns, federated exchanges, and much more.
6.  Matt Vickery has a great post introducing [the Spring Integration splitter-aggregator pattern](http://java.dzone.com/articles/spring-integration-splitter).
7.  Willie Wheeler has a great post up on his [custom configuration management database (a CMDB)](http://architects.dzone.com/articles/why-im-excited-about-using). The post details the project, and then talks about his use of Spring Data's repositories in rebuilding the backend for CMDB. Nice post, Willie!
8.  Doug Haber put *together* a wonderful post on [handling paging using Spring Data and the REST support in Spring 3.1](http://blog.fawnanddoug.com/2012/05/pagination-with-spring-mvc-spring-data.html).
9.  Blogger *panbhatt* has a detailed post on using [Spring MVC's REST support](http://panbhatt.blogspot.in/2012/05/spring-mvc-rest-jsonxml-configuration.html) to solve a particular set of problems he was having.
10.  Blogger *OBSERWATORZY* described his particular thought process [when trying to consume a RESTful service](http://lkonopski.blogspot.com/2012/05/using-spring-resttemplate-with.html), and wondering if Spring provided an answer (of course it did!). Read on for his resolution.
11.  Vishal Biyani has put together a nice introduction to [getting started with Spring Roo and Cloud Foundry](http://cloudspring.com/get-in-the-cloud-with-cloudfoundry/).
12.  The RabbitMQ blog has an amazing article [introducing queueing theory (with an introduction to throughput, latency and bandwidth.](http://www.rabbitmq.com/blog/2012/05/11/some-queuing-theory-throughput-latency-and-bandwidth/)
13.  JAXEnter has [a nice roundup of some of the news](http://jaxenter.com/spring-data-jpa-and-amqp-reach-1-1-0-releases-42752.html) releases described in this very post, including the Spring AMQP and Spring Data JPA's GAs.