---
title: This week in Spring: March 29th, 2011
source: https://spring.io/blog/2011/03/30/this-week-in-spring-march-29th-2011
scraped: 2026-02-24T08:44:11.278Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  March 30, 2011 | 0 Comments
---

# This week in Spring: March 29th, 2011

_Engineering | Josh Long |  March 30, 2011 | 0 Comments_

Well, *that* was a good week! Lots of good stuff coming out of both the community and of course out of SpringSource itself.

This week reminded I was reminded that the Spring framework *usually* has something that could go a long way in simplifying or alleviating a challenge at hand if you just know where to look. Often, I'll check the [SpringSource Forums](http://forum.springsource.org/), the [JIRA instance](http://jira.springsource.org), and - if I'm sufficiently convinced it's not already resolved or accounted for in the forums or in JIRA - in the [StackOverflow category](http://stackoverflow.com/tags/spring) for Spring. SpringSource engineers try to monitor both the forums and - less ocassionally - the StackOverflow forums, as well. Additionally, I like to learn as I go - it's a "cinch by the inch, hard by the yard," as my father always says. Ever since the [SpringSource YouTube channel](http://www.youtube.com/SpringSourceDev) came online a few weeks ago, I've been taking advantage of it - letting a presentation play in the background while I work - to learn new and interesting things.

1.  [](http://www.infoq.com/presentations/Concurrent-Distributed-Applications-Spring)
    
    [Mark Fisher and David Syer's talk](http://www.infoq.com/presentations/Concurrent-Distributed-Applications-Spring) from SpringOne2GX last October is up at InfoQ.com. The talk introduces Spring as the programming model for building concurrent, distributed applications.
    
2.  Last week, your humble correspondant was bemoaning the lack of a good, concise option for type-safe criteria queries that was well integrated with my API stack. About an hour later, as if by magic or some kind of sorcery, Spring Data JPA lead [Oliver Gierke](http://blog.springsource.com/author/ogierke/) announced [Spring Data JPA 1.0.0.M2,](http://www.springsource.org/node/3074) which features - among other things - (*tada!*) a type safe criteria query option called *QueryDSL*. So, problem solved! The lesson here is that it's *shocking* how many features the Spring projects have if you *just* know where to look! :-)
3.  RabbitMQ 2.4, the latest version of the popular open-source AMQP message broker, [is now available](http://www.springsource.org/node/3073) featuring a battery of enhancements including updates to the Java and .NET clients.
    
4.  The latest release of the [Spring Data](http://www.springsource.org/spring-data) project featuring support for Neo4j has been released. No, this is *not* a repeat from last week - it really is coming along quite nicely, and quickly! The [new version includes](http://www.springsource.org/node/3066) many new features and tracks the latest version of Neo4j, itself. Neo4j is one of the many new specialized datastores available to developers today. Neo4j models data as relationships and nodes. It's optimized for fast node traversal, as in a Facebook friend-graph, for example.  
    
    Additionally, SpringSource is producing a webinar on Spring Data (and specifically, the Spring Data Graph subprojct encompassing the Neo4j support) on April 20th. The presentation will be presented for both [North America](https://vmwareevents.webex.com/vmwareevents/onstage/g.php?t=a&d=939437675) and for [Europe.](https://vmwareevents.webex.com/vmwareevents/onstage/g.php?t=a&d=931308698) Register now!
    
5.  [SpringSource Tool Suite lead Martin Lippert](http://www.springsource.com/developer/sts) blogged about[](http://blog.springsource.com/2011/03/25/early-access-springsource-tool-suite-for-eclipse-indigo-3-7/)
    
    [](http://blog.springsource.com/2011/03/25/early-access-springsource-tool-suite-for-eclipse-indigo-3-7/)
    
    [early access support](http://blog.springsource.com/2011/03/25/early-access-springsource-tool-suite-for-eclipse-indigo-3-7/) for a SpringSource Tool Suite build tracking the latest Eclipse distribution - Indigo (specifically, version 3.7, M6a, for Java EE developers, for those not keeping score).  
    
    This is an early access version of STS, and users are encouraged to try it out and [feedback on the STS JIRA.](https://issuetracker.springsource.com/browse/STS)
    
6.  Using the Eclipse Virgo project or SpringSource dm Server? SpringSource [would like to know](http://www.springsource.org/node/3076) about it in this [quick survey](https://spreadsheets.google.com/viewform?formkey=dEp0dGszMDZMX0Y0WXFybEhRMkEzT0E6MQ) which will help in planning.
7.  [Spring is all about choice.](http://www.mkyong.com/webservices/jax-ws/jax-ws-spring-integration-example/) While the Spring framework provides first class support for both SOAP-based, contract-first web services with Spring WS and for RESTful web services in Spring core, it also enjoys the unique position of being the easiest approach to using alterntive APIs like JAX-WS and JAX-RS because all of the major implementations of those standards also bundle Spring integrations. [In this post](http://www.mkyong.com/webservices/jax-ws/jax-ws-spring-integration-example/), blogger Mkyong introduces using Spring and JAX-WS together.
8.  Want to use JSR303-based validation control groups and don't want to use the 3.1 milestones of Spring MVC?
    
    [This blog post](http://blog.codeleak.pl/2011/03/how-to-jsr303-validation-groups-in.html) explores an alternative in Spring 3.0.