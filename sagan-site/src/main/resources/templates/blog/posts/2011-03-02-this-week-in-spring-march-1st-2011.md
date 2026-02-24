---
title: This week in Spring: March 1st, 2011
source: https://spring.io/blog/2011/03/02/this-week-in-spring-march-1st-2011
scraped: 2026-02-24T08:45:05.798Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  March 02, 2011 | 0 Comments
---

# This week in Spring: March 1st, 2011

_Engineering | Josh Long |  March 02, 2011 | 0 Comments_

This week has seen yet another flurry of exciting new releases and updates *and* great community content.

Hold on to your hats!

Let's get right to it.

1.  [Spring Roo 1.1.2 has been released.](http://www.springsource.org/node/3039) This new release contains over 200 enhancements, new features and fixes since the 1.1.1 release last month. Some of the highlights include enhanced tool usability, persistence enhancements, GWT and Spring MVC enhancements, and library upgrades.
2.  Martin Lippet has just announced the [2.5.2.SR1 and 2.6.0.M2 releases of SpringSource Tool Suite](http://www.springsource.org/node/3046).
    
    The 2.5.2.SR1 "refresh" has updated support for Groovy 1.7.8, Grails 1.3.7, an update to Eclipse Helios SR2 (3.2.6), and the just-released Spring Roo 1.1.2. The 2.6.0.M2 mileston also includes a Roo plugin manager, improved support for `@RequestMapping`, and tons of improvements to the Groovy and Grails tooling.
    
3.  Martin Lippet has also put together information on the oft-asked and newly answered question: how do
    
    I [contribute custom Project Templates in SpringSource Tool Suite?](http://blog.springsource.com/2011/02/24/custom-project-templates-in-springsource-tool-suite/)
    
    Have a cool project setup recipe and want to codify it and share it easily with other STS users in your company, or indeed, the community? Now you can!
    
4.  Continuing the [series introducing Spring 3.1](http://blog.springsource.com/category/spring/31/), Costin Leau wrote up an introduction to [the caching abstraction](http://blog.springsource.com/2011/02/23/spring-3-1-m1-caching/) that will let you integrate a cache like GemFire, Ehcache, basic JDK ConcurrentMap-based caches, and numerous other caches that implement the SPI with your application.
5.  A new entry in the [Green Beans](http://blog.springsource.com/category/green-beans/) series is up, this one on [Getting Started with Spring Integration](http://blog.springsource.com/2011/02/23/green-beans-getting-started-with-spring-integration/). Check it out to learn all about how you can use Spring to solve your integration problems with Spring Integration
    
6.  [Spring Web Flow 2.3.0 has been released](http://www.springsource.org/node/3044). The new release features many new features: JSR 303 bean validation support, embedded flows (ie, you might imagine a modal dialog on a page with its own flow entirely unto itself - the enclosing page need not be refreshed so that the embedded flowa can continue through Ajax.), automatic propagation of flow-managed PersistenceContext to sub-flows, support for Portlet 2.0 resource requests, and much more.
7.  [Spring Social 1.0.0.M2 has been released](http://www.springsource.org/spring-social/news/1.0.0.m2-released).
    
    The new milestone is *packed* with new features along several themes. The new release splits apart the concepts of connection and authentication from the APIs for the various software-as-a-service providers, so now you can leverage both peices together, or independantly. The new release also expands the initial support for Saas offerings, including Github. [Check it out](http://www.springsource.org/spring-social) and provide [feedback!](http://forum.springsource.org/forumdisplay.php?f=82)
    
8.  Speaking of Spring Social, Craig Walls - Spring Social project lead - did a talk on developing social-ready web applications [at SpringOne2GX 2010 last October.](http://www.springsource.org/node/3041) You can watch [it on InfoQ.com](http://www.infoq.com/presentations/Developing-Social-Ready-Web-Apps)
9.  [Blogger Matt Raible has written up a post exploring Ajax authentication using Spring Security, HTTPS and jQuery.](http://java.dzone.com/articles/implementing-ajax) Very cool. and detailed! Check it out!
    
10.  The latest release of the [Spring Data Graph project, version 1.0.0.M3,](http://www.springsource.org/node/3040) supporting Neo4j has just been released. This release brings with it many new features, including an update to Neo4j-1.3.M03, AspectJ 1.6.11.M2, explicit support for detachable entities, bean vaidation, Java config simplifications, a full-featured Neo4jTemplate, and much more!
11.  [](http://www.springsource.org/node/3045)
     
     [Eclipse Virgo, 3.0.0.M2, is now available for download!](http://www.springsource.org/node/3045) The new release features bug fixes on top of a substantial collection of changes from the
     
     recent M01 milestone.
     

13.  Want to work with RESTful services, but don't want the verbose XML payload slowing down your communication? REST is just an application of HTTP, and HTTP provides us with an amazing arsenal of tried and true tools and techniques to scale HTTP based applications. One common approach is to use GZip compression. In this post, blogger Stephan Oudmaijer introduces an [approach for using Spring's `RestTemplate` with GZIP compressed payloads to support just that use case!](http://www.oudmaijer.com/2011/02/23/spring-resttemplate-and-gzip-compression-continued/)
14.  Sivaprasadreddy Katamreddy is at it again, this time with a [good look at how to write a Spring / Hibernate application with no XML](http://java.dzone.com/articles/springhibernate-application) leveraging the Spring 3.0 Java configuration model. Always handy to have a recipe like this book marked for next time!
15.  Ever needed to interface with LDAP from Java? Search no further than the Spring LDAP project, which provides a clean, comprehensive facility for just that. This post on [using Active Directory (AD Windows](http://www.agile-works.com/blog/?p=447)
     
     [Server 2008) from Java and Spring LDAP](http://www.agile-works.com/blog/?p=447) provides a great introduction.
     

17.  There's always some great new use of the Java-based configuration mechanism in Spring 3.0. This time, blogger [Jason Stillwell writes about how to
     
     use Spring Java configuration to handle
     
     ](http://blog.jason-stillwell.com/2011/02/spring-java-based-configuration-and.html)
     
     [injection in a `public static void main()` method.](http://blog.jason-stillwell.com/2011/02/spring-java-based-configuration-and.html)