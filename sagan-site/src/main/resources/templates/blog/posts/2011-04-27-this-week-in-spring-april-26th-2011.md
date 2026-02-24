---
title: This week in Spring: April 26th, 2011
source: https://spring.io/blog/2011/04/27/this-week-in-spring-april-26th-2011
scraped: 2026-02-24T08:41:55.144Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  April 27, 2011 | 0 Comments
---

# This week in Spring: April 26th, 2011

_Engineering | Josh Long |  April 27, 2011 | 0 Comments_

Another week, another great allotment of new content that - as usual - draws from the community and from SpringSource. The enthusiasm for CloudFoundry continues unabated this week, with some interesting content in this week's roundup. For more content on CloudFoundry, you might consult the [CloudFoundry.com](http://www.CloudFoundry.com) and [CloudFoundry.org](http://www.CloudFoundry.org) sites. In particular, the slides from the Cloud user group held the day after the announcement are [available here.](http://www.slideshare.net/mccrory-me/cloud-foundry-a-developers-perspective)

1.  Oliver Gierke has posted a blog on [Advanced Spring Data JPA](http://www.dzone.com/links/r/advanced_spring_data_jpa.html) which explains how to use the features in the Spring Data JPA project that elevate the art of JPA programming, like the integration of the QueryDSL library. This post - and the library - speak to the ongoing, first-class support in the Spring frameworks for all data access technologies, be they RDBMS, NoSQL, or anything else.
2.  Peter Ledbrook, Grails Developer Advocate, has recently expanded on his original blog on using Grails and CloudFoundry.
    
    This blog provides a detailed look at [using Grails' GORM support with the various data stores](http://blog.springsource.com/2011/04/21/deeper-into-grails-cloud-foundry/) available on CloudFoundry. Check it out!
    
3.  Alex Popescu's MyNoSQL portal, [MyNoSQL](http://nosql.mypopescu.com), has some interesting comments about the [NoSQL options supported in CloudFoundry.](http://nosql.mypopescu.com/post/4753608254/cloud-foundry-nosql-databases-and-polyglot) He comments that *"From a storage perspective, Cloud Foundry is encouraging polyglot persistence right from the start offering access to a relational database (MySQL), a super-fast smart key-value store (Redis), and a popular document database (MongoDB)."*  
    This post - and indeed the entire site - is a very valuable resource for CloudFoundry users that want to exploit the NoSQL options, but don't understand the use cases yet. There's a lot of good content on both MongoDB and Redis, for example.
4.  [Mark Thomas](http://blog.springsource.com/author/mthomas/), Apache Tomcat 7 release manager and engineer, has written up a post on [Apache Tomcat 7's session fixation protection](http://www.tomcatexpert.com/blog/2011/04/25/session-fixation-protection) security feature on the [TomcatExpert.com](http://www.tomcatexpert.com) website. Keeping on top of the latest Tomcat security features is important if you are, like the majority of developers, using Tomcat (or hardened, ops-friendly derivatives like [SpringSource's tcServer](http://www.springsource.com/products/tcserver)) as a production server for your Java (and often Spring) applications. Additionally, Tomcat's bundled with several application servers. Either way, knowing about Tomcat's industry-leading features can only help.
5.  Costin Leau has announced the [Spring GemFire 1.0.1 release](http://www.springsource.org/node/3117), which incorporates bug fixes and promotes stability.

```
Copy<li>Just a reminder to our European community members, the S2G Forum Series will be held in <a href="http://www.springsource.com/events/s2gforum-5-26-2011-amsterdam">Amsterdam (May 26th)</a> and <a href="http://www.springsource.com/events/s2gforum-5-31-2011-london">London (May 31st)</a>. There will be tons of great sessions about Spring, Groovy and Grails as well as talks focused specifically on CloudFoundry, Tomcat and Gemfire so be sure to <a href="http://www.springsource.org/s2gforum2011">register for the event</a> closest to you. 
</li>
```

7.  The [Eclipse Virgo 2.1.1 and SpringSource dm Server 2.0.5](http://www.springsource.org/node/3113) projects have just been released.
8.  Jon Brisbin has recently blogged about integrating [RabbitMQ](http://www.rabbitmq.org) with Riak to build a [highly scalable eventing model.](http://blog.springsource.com/2011/04/21/eventing-data-with-rabbitmq-and-riak/)
9.  Gordon Dickens is at it again! He's written a blog post, [Don't Use the `JmsTemplate` in Spring!](http://java.dzone.com/articles/dont-use-jmstemplate-spring) Once you get past the headline and read the post, I think you'll agree it might be better titled "Don't Use the `JmsTemplate` in Spring, Use Spring Integration!"  
    It's a great post and it captures the thought trail that leads people to Spring Integration: they like the simplicity and power of Spring's `JmsTemplate,` but want to enjoy the same programming paradigm in other challenges.
10.  [What's in My Spring Context?](http://java.dzone.com/articles/what%E2%80%99s-my-spring-context) Gordon Dickens writes what amounts to a conversation between him and the Spring ApplicationContext - the keeper of all beans. The Spring *ApplicationContext* is very powerful, and can be interrogated to understand the structure and shape of your object graph. Great post, with easy-to-use code!
11.  ThoughtWorks employee Mark Needham has written [HTML encoding/escaping with StringTemplate and Spring MVC](http://www.dzone.com/links/r/html_encodingescaping_with_stringtemplate_and_spr.html), which provides a recipe to write a custom view resolver in Spring MVC. Spring MVC's strikes the nearly perfect balance between convenience and power in this case. Spring MVC, of course, has several good, pre-provided options for view resolution, but is flexible enough to support new ones.
12.  David Salter has written a post introducing [deployment of a database-centric application to CloudFoundry.](http://www.cloudfoundry.com) His example includes deployment tips and information on how to use Spring 3.1 profiles to let the application use the correct, environment-specific `DataSource`. Nice article!
13.  David Salter has written a follow up blog on migrating older [Spring MVC `Controller`\-hierarchy based applications](http://java.dzone.com/articles/converting-spring) to the annotation-centric model introduced in Spring MVC 2.5, four years ago. In this blog, he talks about converting form-processing controllers, of type `FormController`. Check it out! A fascinating read and it's nice to see how much configuration and Java code just falls away in the new programming paradigm!
14.  [Nicolas Frankel](http://java.dzone.com/articles/first-try-cloudfoundry-0) has written about his experiences using the [CloudFoundry](http://www.cloudfoundry.org) public cloud and project. He writes in terms of a developer that has used the Google App Engine, so it's a particularly compelling story with lots of details.