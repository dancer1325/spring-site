---
title: This Week in Spring  - Feb 26th, 2013
source: https://spring.io/blog/2013/02/27/this-week-in-spring-feb-26th-2013
scraped: 2026-02-24T08:08:33.459Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  February 27, 2013 | 0 Comments
---

# This Week in Spring  - Feb 26th, 2013

_Engineering | Josh Long |  February 27, 2013 | 0 Comments_

Welcome to another installment of *This Week in Spring!* It's been an exciting two weeks for Hadoop content - Hadoop enthusiasts should check last week's post for an HD quality replay of [Building Big Data Pipelines with Spring Hadoop](http://www.springsource.org/node/3814) from SpringOne 2GX 2012.

1.  [Costin Leau has announced that Spring for Apache Hadoop 1.0 has gone GA!](http://blog.springsource.org/2013/02/26/shdp-1-0-goes-ga/)
    
    ```
    Copy	This marks the end of a year in development from the time of the first betas.  There's a lot in this release. For  more information, check out  the blog. </LI>
    
    <LI>Did you guys hear about yesterday's announcement from <A href="http://www.greenplum.com/blog/topics/hadoop/introducing-pivotal-hd">about Pivotal HD, a Hadoop distribution which performs better than the competition, provides a true SQL interface, and features extra tools</a> (like an admin console and an installation, configuration and management facility) and is bundled with Spring for Apache Hadoop? 
    ```
    
    The release was in the news a lot yesterday. Here's a nice post [on GigaOm](http://gigaom.com/2013/02/25/emc-to-hadoop-competition-see-ya-wouldnt-wanna-be-ya/), another on  
    [CIO](http://www.cio.com/article/729451/EMC_Greenplum_Tackles_Big_Data_With_Hadoop_Distribution) , and yet another on [CRN](http://www.crn.com/news/applications-os/240149346/emc-greenplums-pivotal-hd-aims-to-bring-sql-ease-to-hadoop-big-data.htm) and another still on [*Silicon Angle*](http://siliconangle.com/blog/2013/02/25/does-the-world-need-another-hadoop-distro-greenplum-says-yes/).
    
2.  [SpringOne2GX 2013 has been announced](http://www.springone2gx.com/conference/santa_clara/2013/09/home)! This year, SpringOne will occur in Santa Clara, California, on September 9-12th, 2013. I hope to see you there!

```
Copy <LI> Join me, Josh Long, for  the upcoming webinar - <A href="http://www.springsource.org/node/4033"><EM>Multi Client Development with Spring</EM></a> - on March 14th. The webinar will introduce how to build RESTful, Spring-based applications using Spring MVC, REST and mobile technologies like Spring Mobile and Spring Android and HTML5.
```

```
Copy	<LI>Join Damien Dallimore (Splunk) and David Turanski (SpringSource) on March28th for a webinar, and hear them introduce the <a href="http://www.springsource.org/node/4036">Spring Integration Channel Adapter for Splunk</a>!</LI>
	<LI>Are you a JPA user? <a href ="http://bit.ly/ZETxN6">Weigh in on the JPA TCK Access debate</a> and help improve TCK quality!</LI>
	<LI>Three new SpringOne2GX 2012 recordings available on YoutTube in HD this week: <a href="http://www.springsource.org/node/4034">Getting started with Spring Data and Distributed Database Grid</a>, <a href="http://www.springsource.org/node/4034">Whoops, Where did my architecture go?</a> and <a href="http://www.springsource.org/node/3814"> Monitoring and Managing Spring Integration</a>.</LI>
	<LI>If you missed the Testing Web Applications with Spring 3.2 Webinar with  Sam Brannen and Rossen Stoyanchev, <a href="http://www.youtube.com/watch?v=K6x8LE7Qd1Q">you can see it in HD</a> on YouTube.</LI>
```

5.  Nicolas Frankel put together a post that demonstrates how to change the default scope of beans. Beans are singleton scoped if no scope is otherwise specified. This example uses a Spring framework `BeanFactoryPostProcessor` to achieve the effect. NB: this is *not* something I'd recommend doing! This is *super* hackety. It is, however, a nice illustration of just how flexible Spring is.
6.  Petri Kainulainen put together [a nice tutorial on configuring Spring Data Solr](http://t.co/vsZ13ubt).
7.  CORS, or cross-origin resource sharing is a technique for communicating across hosts, sidestepping the single-host policy limitations typical of Ajax communication. Spring MVC doesn't support it out of the box, but [it's easy to add to an existing application, as this tutorial explains](http://extjs-tutorials.blogspot.com/2013/02/enable-cors-in-spring-mvc-rest-api-for.html).
8.  The [Agitech Limited blog has an introduction to Spring MVC tutorial](http://www.agitech.co.uk/quickly-creating-a-simple-spring-mvc-application/) that you might find interesting.

```
Copy<LI> 
```

Pas Apicella has written a *very* nice post [on using Spring and MyBatis, along with VMware SQLFire](http://theblasfrompas.blogspot.com/2013/02/mybatis-spring-with-vfabric-sqlfire.html) .

11.  The *Cloud Counselor* blog has a nice post on [how to use Spring and GemFire together](http://cloudcounselor.com/2013/02/25/spring-bootloader-part-1/), complete with the working GemFire configuration files.
12.  Vincent Devillers introduces the `cloudfoundry-runtime`'s Java types, letting [you configure Cloud Foundry applications in Spring using Java (and Java configuration)](http://vincentdevillers.blogspot.com/2013/02/use-cloudfoundry-in-spring-without.html)
13.  The *Java Journal* blog has put together a nice post [on using JDBC from Spring](http://java-journal.blogspot.com/2013/02/spring-jdbc-integration.html). Spring's long since featured the support described in this blog, so hopefully you've at least heard about these facilities in the core Spring framework before! If you haven't, then check out this post.
14.  The *all and sundry* blog is back, this time with a
     
     ```
     Copy<A href="http://www.java-allandsundry.com/2013/02/test-fixtures-using-spring-bean.html">post on XML vs. Java-based configuration styles in Spring</a>.</LI>
     <LI> The <EM>VmwareNews.de</EM> blog has a nice  post <A href="http://vmwarenews.de/2013/02/26/vmware-vfabric-blog-introducing-a-new-reference-architecture-that-will-speed-knowledge-development-of-modern-cloud-applications">on  the new VMWare vFabric reference architecture</a>.
     ```
     
15.  The aptly-named *Solutions to basic IT problems* blog has a [nice post on Spring Data JPA](http://it4beginners.wordpress.com/2013/02/20/spring-data-jpa-my-first-steps/). This is a follow-up from his previous post, which introduced the Spring and Hibernate combination.
16.  The *ComSysto* blog has a [nice post specifically on visualizing Spring Data Neo4j nodes in JavaFX](http://blog.comsysto.com/2013/02/21/how-to-present-spring-data-neo4j-nodes-in-a-javafx-tableview/)
17.  *Krishna's Blog* has a nice [post on JUnit testing Spring MVC applications](http://krishnasblog.com/2013/02/22/junit-testing-of-spring-mvc-application-introduction/).

```
Copy	<LI>  
		The <EM>Techi Ghost</EM> blog has an interesting post <A href="http://techighost.com/event-handling-with-spring-framework/"> on how Spring's  <CODE>ApplicationContext</CODE>-wide eventing mechanism works</a>.
		 The event mechanism, by the way, is one of the things that  <A href="http://blog.springsource.org/2013/01/16/next-stop-spring-framework-4-0/">should be greatly improved in the upcoming Spring 4.0 release</a>, due at the end of this year. 
```