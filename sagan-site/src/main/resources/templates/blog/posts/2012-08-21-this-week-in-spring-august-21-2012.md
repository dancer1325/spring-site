---
title: This Week in Spring - August 21, 2012
source: https://spring.io/blog/2012/08/21/this-week-in-spring-august-21-2012
scraped: 2026-02-24T08:18:04.845Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  August 21, 2012 | 0 Comments
---

# This Week in Spring - August 21, 2012

_Engineering | Josh Long |  August 21, 2012 | 0 Comments_

Welcome to another installment of *This Week in Spring*! This roundup is put together by aggregating lots of great content from all around the web. If you have content suggestions, or if you simply want a direct line to some of the content that we post, check us out on [Twitter](http://www.twitter.com/springsource), and [Google+](http://www.springsource.org/node/3632). As usual, we've got a lot to go over, so let's dive into it.

1.  Up first this week, there is a lot of new content available on the [SpringSource Dev YouTube channel](http://youtube.com/SpringSourceDev).
    
    ```
    Copy	The video from  Spring Data Neo4J lead Michael Hunger's excellent webinar <a href = "http://www.springsource.org/node/3632">introducing Spring Data Neo4j</a> is also available. 
    ```
    
    The video from VMWare engineer Jerry Kuch's webinar providing an update on the [new features in RabbitMQ](http://www.springsource.org/node/3629) is also available. Finally, the video from the webinar that Ken Rimple, Srini Penchikala, and I did [introducing how to more fully exploit Spring Roo's interactive add-on mechanism](http://www.springsource.org/node/3633) is available.
    
2.  Spring Security OAuth lead Dr. David Syer has announced that [Spring Security OAuth 1.0.0.RC2](http://www.springsource.org/node/3634) is now available.

```
Copy	<LI> Remember our pal Tobias Trelle? He's got another fantastic article that's been published on InfoQ called <a href = "http://www.infoq.com/articles/spring-data-intro"><EM>Spring Data - One API to Rule Them All?</EM></a></LI>
```

4.  Stephen Chin, the Oracle JavaFX evangelist, has posted an initial blog and a slide deck on the work he's done [to integrate Spring and Java FX](http://javafx.steveonjava.com/javafx-and-spring-day-1/) based on a talk he's done at the Dallas Spring User Group. Nice work, Stephen! I'm looking forward to the subsequent blog posts he's promised us!
5.  Zemian Deng has a nice post on how to use [the TimeMachine scheduler with Spring](http://saltnlight5.blogspot.com/2012/08/how-to-integrate-timemachine-scheduler.html).
6.  The Java Code Geeks blog is at it again, this time with a post on how to measure [the execution time of a method call](http://www.javacodegeeks.com/2012/08/measure-execution-time-in-java-spring.html) using the Spring [StopWatch](http://static.springsource.org/spring/docs/2.0.x/api/org/springframework/util/StopWatch.html) class.
    
    ```
    Copy Note that  this sort of code is ideal for delivery as a AOP Aspect. 
     </LI>
    ```
    
7.  René van Wijk has a nice post on how to integrate Spring's Hibernate support with the [JBoss AS 7-specific integration for Hibernate](http://middlewaremagic.com/weblogic/?p=8104).
8.  [This blog looks at how to use the `HibernateTemplate` to work with Hibernate's lazy initialization feature](http://dinukaroshan.blogspot.com/2012/08/lazyeager-loading-using-hibernate-by.html). It's a nice post, but it's worth mentioning that the `HibernateTemplate`'s no longer the preferred way of working with Hibernate. Instead, simply create a `HibernateTransactionManager` instance, and build a `SessionFactory` using the `LocalSessionFactoryBean` (available for both Hibernate 3 and Hibernate 4) and then you're done. For a good example, [check out this sample application](http://github.com/cloudfoundry-samples/springmvc-hibernate-template) which demonstrates Hibernate 4. You can use the Hibernate thread-local session API (which has been available since later iterations of Hibernate 3.x). To specifically handle lazy initialization, look at `Hibernate.initialize(Object)`.
9.  Spring's configuration support is very rich, and handily supports declaring many convenience objects. This blog introduces [how to configure lists and maps](http://myjavaswtech.blogspot.com/2012/08/spring-collections-map-properties.html) using the Spring XML namespace support. Convenient!
10.  The [Pables64 blog has a nice post on how to use the SpringSource Tool Suite Spring MVC template](http://pables64.wordpress.com/2012/08/16/spring-mvc-template/) to build a Spring MVC-based web application in no time flat.
11.  [This post enumerates some of the open source projects that themselves embed or rely on the Spring framework](http://www.programcreek.com/2012/08/open-source-projects-that-use-spring-framework/). This list is by no means comprehensive, but it *is* very interesting!
12.  Blogger *zws1987211* has an interesting post on how to [use Spring with ActiveMQ](http://blog.csdn.net/zws1987211/article/details/7889240). A lot of the confusion comes from reading the ActiveMQ documentation and articles. Using Spring with JMS (and ActiveMQ in particular) is quite straight forward. `JmsTemplate` makes it quite simple to `send` and ` receive` messages using JMS. If you want to asynchronously receive messages, then you should consider the `MessageListenerContainer` implementations. If you're going to use `JmsTemplate` to receive messages outside of a Java EE application server (which typically provide connection factory pooling), consider using the `CachingConnectionFactory` implementations to wrap the *raw* JMS connection factories. By default the `JmsTemplate` handles all the tedious resource acquisition and destruction logic involved in working with the JMS API. This includes shutting down connection factories and sessions, which can be expensive if the resources are *actually* closed, and not simply returned to a pool where they're subsequently reused.
     
     ```
     Copy You know what I love the most about this post, though? Not only does the post articulate the correct strategies for working with Spring, but the blogger even went to the Apache Wiki's and corrected them where appropriate! Nice job, great post, and even greater initiative!
     ```
     
13.  Boris Lam has a nice post on using the [Spring Expression language for convenient, annotation-driven security constraint declarations](http://borislam.blogspot.com/2012/08/writing-your-spring-security-expression_17.html) in Spring Security. Nice job!
14.  Blogger Brian has an introduction [to building RESTful web services with Spring MVC](http://briansjavablog.blogspot.com/2012/08/rest-services-with-spring.html). The post introduces how Spring's REST support builds on top of core Spring MVC.
15.  Want to see one possible approach for building [a complete, secured, Spring and Struts web application, complete with objects exposed over JavaScript for asynchronous, Ajax-client-enabled communication using DWR](http://www.cnblogs.com/smile361/archive/2012/08/16/2641855.html)? That blog's short on narrative, but jam-packed with code! Definitely worth a look. You're bound to find *something* of interest!