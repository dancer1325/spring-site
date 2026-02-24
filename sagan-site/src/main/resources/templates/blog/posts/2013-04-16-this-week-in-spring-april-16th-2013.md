---
title: This Week in Spring - April 16th, 2013
source: https://spring.io/blog/2013/04/16/this-week-in-spring-april-16th-2013
scraped: 2026-02-24T08:06:05.303Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  April 16, 2013 | 0 Comments
---

# This Week in Spring - April 16th, 2013

_Engineering | Josh Long |  April 16, 2013 | 0 Comments_

Welcome to another installment of *This Week in Spring*! It's been an exciting week for Spring at Pivotal, which you can hear more about at the re-scheduled Pivotal [launch event](http://www.gopivotal.com) on April 24th.

1.  In case you are reading too fast, Pivotal has re-scheduled the launch event to April 24th. [Register here](http://www.gopivotal.com)!
2.  Arjen Poutsma has [announced Spring Web Services 2.1.3.RELEASE](http://forum.springsource.org/showthread.php?136351-Spring-Web-Services-2-1-3-RELEASE-released). The new release mainly consists of bug fixes, for the full details [check out the changelog](http://static.springsource.org/spring-ws/docs/2.1.3.RELEASE/changelog.txt).
3.  Don't miss the upcoming Webinar with Donald Miner and Mark Pollack discussing [Pivotal HD and Spring Hadoop](http://www.springsource.org/node/4306), a good introductory webinar for those that are Pivotal HD-curious.
4.  New SpringOne2GX replays now available in HD on YouTube: [Cloud Foundry Architecture](http://www.springsource.org/node/22417), [Effective Design Patterns in NewSQL](http://www.springsource.org/node/22417)
5.  There was a great post on Reddit the other day that explains the difference between [REST and SOAP in terms of Martin Lawrence](http://stackoverflow.com/questions/209905/rest-and-soap). This has *nothing* to do with Spring, but was droll enough that it's worth sharing.
    
    ```
    Copy  Spring, of course, has an amazing REST stack and I highly encourage people to check out how to build consolidated, streamlined REST services with Spring! Moving on... :) 
    ```
    
6.  James Rossiter has a good post on how to use a Spring ` InitBinder` to Resolve Type Mismatch and bind Exceptions in `POST` from Spring MVC to Controller Actions.
7.  [@olivergierke](http://twitter.com/olivergierke) brings up a great point on Twitter: how much code does it take to add the JTA 1.2 JSR `javax.transaction.Transactional` annotation to Spring? [Almost nothing](https://github.com/SpringSource/spring-framework/commit/52fd84bb577296f78881388ff72b383a4e4808a3)! Most of the code here is just unit tests. Otherwise, this is just a dead simple mapping of the JTA annotation to Spring's already supported engine, which also currently supports the native Spring `@Transactional` and `@javax.ejb.TransactionAttribute` annotation.
8.  Are you looking into Gradle and want to get started with Spring, quickly? Giancarlo Frison has put together a nice post with a bootstrap [Gradle build that can be used with Spring applications](http://www.javacodegeeks.com/2012/05/gradle-archetype-for-spring.html).
9.  Eugen Paraschiv has put together a nice post on how to use `RestTemplate` to do [HTTP BASIC authentication](http://www.javacodegeeks.com/2012/05/how-to-use-resttemplate-with-basic.html).
10.  Spring has long supported a utility class, called the `org.springframework.util.StopWatch`, which can be used to measure the execution of method invocations. The Javarevisited blog has a
     
     ```
     Copy  <a href="http://www.stumbleupon.com/su/1rKtfP/javarevisited.blogspot.com.au/2012/04/how-to-measure-elapsed-execution-time.html">nice post on how to use the <CODE>StopWatch</code> class</a>.
     </LI>
     ```
     
11.  This post is fairly old, but I just stumbled upon it and thought it was a well thought out [presentation introducing Aspect Oriented Programming (AOP) in Spring](http://www.slideshare.net/analizator/spring-framework-aop).