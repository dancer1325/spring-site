---
title: This week in Spring: June 14th, 2011
source: https://spring.io/blog/2011/06/14/this-week-in-spring-june-14th-2011
scraped: 2026-02-24T08:39:58.505Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  June 14, 2011 | 0 Comments
---

# This week in Spring: June 14th, 2011

_Engineering | Josh Long |  June 14, 2011 | 0 Comments_

Welcome back to another installment of "This Week in Spring," and what a week it's been! This last week saw the release of the **Spring 3.1 M2** *and* **vFabric 5**! Lots of exciting stuff to talk about there, as well as general community news, so let's get to it!

1.  Today VMware [announced](http://www.marketwire.com/press-release/vmware-introduces-vfabric-5-integrated-application-platform-virtual-cloud-environments-nyse-vmw-1526312.htm) the release of [VMware vFabric 5](http://www.vmware.com/products/datacenter-virtualization/vfabric/overview.html), the application platform that defines the future of enterprise Java for cloud and virtualized execution environments. vFabric 5 contains many of the technologies that the Spring community is already familiar with including [tc Server](http://www.vmware.com/products/data-center-virtualization/vfabric-tcserver/overview.html), [Hyperic](http://www.vmware.com/products/datacenter-virtualization/vfabric-hyperic/overview.html), [GemFire](http://www.vmware.com/products/datacenter-virtualization/vfabric-gemfire/overview.html), and [RabbitMQ](http://www.vmware.com/products/datacenter-virtualization/vfabric-rabbitmq/overview.html), but now adds some new technology.
    
    -   **Elastic Memory for Java** (EM4J): a new capability for tc Server that provides a completely new level of coordination between the application server and the underlying virtual machine. EM4J uses the underlying vSphere virtualization to overcome some of the limitations of the Java's static memory heap.
    -   **Spring Insight Operations**: leverages the same code-level tracing technology from the [Spring Insight](/insight) project but pulls together information from multiple application servers into a single console with roll-up views, drill downs, and historical comparisons ready for production systems.
    -   **SQLFire**: [vFabric SQLFire](http://communities.vmware.com/community/vmtn/appplatform/vfabric_sqlfire) leverages the time-tested vFabric GemFire underpinnings providing data at memory speed and horizontal scale but vFabric SQLFire adds familiar and standard SQL and JDBC interfaces to the service.
    
    [Rod Johnson](http://blog.springsource.com/author/rodj/) discusses all the details of the release in his [latest blog](http://blog.springsource.com/2011/06/14/announcing-vfabric-5/). Be sure to check out the latest release and try it out.
    
2.  [Spring core lead Juergen Hoeller has announced that Spring 3.1.0 M2 has been released](http://blog.springsource.com/2011/06/09/spring-framework-3-1-m2-released/)! At long last, the next step on the steady march to Spring 3.1 GA! The new release is as feature-packed as the last one, with a long list of major new features including (but definitely not limited to!) improved Java configuration support, XML-free and hassle-free Servlet 3.0-based Spring MVC application bootstrapping, new `Builder` APIs for JPA and Hibernate, and much, much more! Check out the [release announcement here](http://www.springsource.org/node/3149) and get the bits from your build dependency management tool of choice or [the download page](http://www.springsource.com/download/community)

```
Copy<LI> Hot on the heels of the Spring 3.1 release announcement, <a href="http://blog.springsource.com/2011/06/10/spring-3-1-m2-configuration-enhancements/">Chris Beams chimes in</a> on the much-improved Java-centric configuration model in Spring 3.1, M2, even as compared to M1! The features are really starting to come together to make this one of the smoothest, well arranged releases, yet! </LI> 

<lI> 
```

[Spring 3.1 M2 represents a marked improvement in core Spring, as well as Spring MVC!](http://blog.springsource.com/2011/06/13/spring-3-1-m2-spring-mvc-enhancements-2/) Rossen Stoyanchev chimes in to introduce the numerous (truly, you'll need to read the detailed blog to get an idea - I won't even bother trying to enumerate them all here!) new features in Spring MVC 3.1 M2, including XML-free web applications on Servlet 3.0 containers. Check it out!

5.  [SpringSource Tool Suite 2.7.0.M2 has been released](http://www.springsource.org/node/3151)! The new release boasts improved CloudFoundry support and many Grails features, including Grails 1.4 support, Grails-aware Rename Type refactoring, improved content-assist for GSPs, and improved Gradle support. Check it out!

```
Copy <LI>Using Spring Roo? Want to shape it's future? Now's a good time to provide input! The Spring Roo team wants you to fill out a <a href="http://www.springsource.org/node/3150">quick survey on the direction of Spring Roo.</a></LI>
```

7.  [Spring Data Document with MongoDB Support, 1.0.0.M3, has been released!](http://forum.springsource.org/showthread.php?110163-Spring-Data-Document-with-MongoDB-Support-1.0.0.M3-Released) From the announcement,
    
    > The changes and new features in Spring Data Document 1.0.0.M3 includes much improved mapping and conversion support. The `MappingMongoConverter` is now the default converter used by the `MongoTemplate ` and the `SimpleMongoConverter` has been deprecated and will be removed. The concept of a default collection name has also been removed and all operations of the `MongoTemplate` are based on the collection name used for the entity class that is the target of the operation. The collection name used for an entity class defaults to the class name starting with a lower-case letter but it can be customized using the `@Document` annotation.
    

```
Copy    <LI>
<a href="http://www.springsource.org/node/3152">Spring Data Graph 1.1.0.M1 with Neo4j Support</a> has been released! As the announcement summarizes, <blockquote>The Graph Neo4j module provides integration with the Neo4j graph database. Back in 2010, Rod Johnson and Emil Eifrem started brainstorming about Spring and Neo4j integration including transparent persistence and cross-store support. After an initial prototype it has been further developed in close cooperation between the VMware and Neo Technology development teams.</blockquote> The new release includes dependency updates, support for the Neo4J query language called Cypher, self-relationships and much more! Check it out!
```

9.  Using Spring? Want to build Swing applications, or at least, to build Swing applications with some data-driven content and to manage those interactions with Spring? Check out [JDAL](http://www.jdal.org/), a library with utilities geared towards doing just that! According to the website, JDAL is "is built on top of Hibernate ORM and Spring framework and provides you with a set of core database services and UI Components ready to be used via configuration on Spring context configuration files." Very interesting! Some of you will no doubt know about the [Spring Rich project](http://www.springsource.org/spring-rcp), which hasn't been very active of late. It's great to see the community filling in the gaps!
10.  Securing an application using Spring Security and Active Directory is feasible, but the specifics stumped me until just recently when I did some quick Googling and found [this post from the SpringSource forums.](http://forum.springsource.org/showthread.php?110284-Error-using-LDAP-Authentication-with-Microsoft-ADAM) The solution's spelled out in explicit detail in the response. Convenient!

```
Copy<li>Looking for a good matrix comparing Spring versus Java EE? One manager, a Bergisch Gladbach, <a href="http://niklasschlimm.blogspot.com/2011/06/spring-vs-java-ee-comparison-matrix.html">shares his</a>. Very interesting read, and one that reflects the norm for an increasingly large number of users today, I find. Check it out!  
  
</li>
```

12.  [A blog, by Loiane Groner, describes how to use custom dates with JAXB](http://loianegroner.com/2011/06/jaxb-custom-binding-java-util-date-spring-3-serialization/). Admittedly, this blog is not very Spring specific, but it's something that you might face when using Spring's JAXB2 `Marshaller` with a client that doesn't support the same data serialization. One example of this? Spring Android's Simple XML `Marshaller` doesn't support JAXB2 dates, by default! This is also a good blog to read for the links to the other, more Spring-specific and useful content. If only I'd known this sooner! I can think of at least one code base that will benefit from this recipe...
13.  [Blog Java-Kata takes a look at building a multi-row, dynamic form-based web application](http://javakata6425.appspot.com/#goToPageIIIarticleIIISpring%20MVC,%20GWT,%20Wicket,%20%20dynamic%20form%20comparison) using Spring MVC, Wicket, and GWT. This first installment introduces the code (which is useful in of itself) and then the Spring MVC iteration. Good stuff, with details for those who've wondered the same thing. Spring MVC is not a component-oriented web framework like Wicket and GWT, so it's nice to see it still fares so well on this complex task.