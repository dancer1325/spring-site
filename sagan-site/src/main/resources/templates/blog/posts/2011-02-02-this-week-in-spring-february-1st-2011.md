---
title: This week in Spring: February 1st, 2011
source: https://spring.io/blog/2011/02/02/this-week-in-spring-february-1st-2011
scraped: 2026-02-24T08:47:39.145Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  February 02, 2011 | 0 Comments
---

# This week in Spring: February 1st, 2011

_Engineering | Josh Long |  February 02, 2011 | 0 Comments_

This week's been a fascinating rush of developments in the community. Depending on where you look, the excitement is behind the newer, more cutting edge stuff like Spring Data, Gemfire, and Virgo, or it's behind the wonderful refinements to technologies like Tomcat and SpringSource Tool Suite. Either way, there's a lot to take in this week, so let's get started!

1.  [SpringSource Tool Suite 2.6.0.M1](http://www.springsource.org/sts-260M1) has been released. This new version features improved content-assist and quick fixes, new wizards and views for Spring MVC @RequestMapping-based applications. It also features improved content-assist performance for Groovy, and improved syntax highlighting for Groovy.
2.  [Spring Data Graph - Neo4j Support 1.0.0.M2 Released](http://www.springsource.org/node/3012). The new release has many new features, including improved indexing support - full, named index support for nodes and relationships, removal of node and relationship entities, strict type checking on entity instantiation from framework methods (according to type strategy), support for dynamic projection to arbitrary graph entities, and new updated support for Neo4j 1.2.
3.  Shekhar Gulati has posted an introduction to [Spring Roo (part 1, building from source) on IBM's DeveloperWorks](http://www.ibm.com/developerworks/opensource/library/os-springroo1/index.html).
4.  Mark Thomas, a senior contributor to the Tomcat project, [has written about preventing Cross-Site Scripting attacks in Tomcat 7](http://www.tomcatexpert.com/blog/2011/01/26/cross-site-scripting-xss-prevention-tomcat-7)
5.  The VMWare vFabric GemFire team has just put together a video demonstrating how to setup the [GemFire's Hibernate Cache Module](http://www.youtube.com/watch?v=g9z5s8f9Kis&feature=youtube_gdata). The video demonstrates how to configure the module in Maven and then demonstrates its use in a Spring-DAO based implementation. Finally, the use of Spring Insight to monitor the application's performance is demonstrated. Cool video for an even cooler technology!
6.  Sebastian Pietrowski [has published a good introduction to Spring Data Redis](http://pietrowski.info/2011/01/spring-data-redis-tutorial/).
7.  Shekhar Gulati contributed *another* great post - also on [Spring Data and Redis](http://java.dzone.com/articles/creating-an-application-using-spring-data-with-redis-as-datastore-part-1). [Spring Data](http://www.springsource.org/spring-data) is the umbrella name for a slew of technologies designed to support more specialized data persistence needs. A large part of this is the deep support for many of the NoSQL data stores available today, as well as more specialized support for JDBC-based persistence.
8.  The Java Code Geeks have written up a good post on [Aspect Oriented Programming with Spring AOP](http://www.javacodegeeks.com/2011/01/aspect-oriented-programming-spring-aop.html)
9.  Jose Delgado wrote up a good post on [how to configure an application to handle two databases in Spring Roo.](http://viralpatel.net/blogs/2011/01/spring-roo-two-database-configuration.html)
10.  Sivaprasadreddy Katamreddy is at it again, [this time on applying Inversion of Control and Dependency Injection to method design](http://www.dzone.com/links/rss/applying_iocdi_to_method_design.html)
11.  Glyn Normington tweets [that the Eclipse Virgo kernel is now running successfully](http://twitter.com/glynnormington/status/32550191043186688) for the first time on a directed graph of regions implemented using OSGi 4.3 framework hooks. Congratulations! [Eclipse Virgo](http://www.eclipse.org/virgo/) is the name of the new-and-improved version of what was formerly the SpringSource dm Server.
12.  David Dossot retweeted an interesting post that explores
     
     [the Activiti BPMN 2 engine](http://nurkiewicz.blogspot.com/2011/01/activiti-processes-and-executions.html) using Spring from earlier last month.
     
13.  With all the exciting news of Tomcat 6 and 7, it's easy to forget that Tomcat 5 is still being updated and supported. [Tomcat 5.5.32 has also just been released!](http://tomcat.apache.org/tomcat-5.5-doc/changelog.html#Tomcat%205.5.32%20%28jim%29)