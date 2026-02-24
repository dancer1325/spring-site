---
title: This Week in Spring, August 14th, 2012
source: https://spring.io/blog/2012/08/15/this-week-in-spring-august-14th-2012
scraped: 2026-02-24T08:18:23.202Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  August 15, 2012 | 0 Comments
---

# This Week in Spring, August 14th, 2012

_Engineering | Josh Long |  August 15, 2012 | 0 Comments_

Welcome to another installment of *This Week in Spring*! As usual, we've got a lot to cover, so let's get to it.

1.  The [SpringSource Tool Suite has been open sourced](http://blog.springsource.org/2012/08/13/springsource-tool-suites-3-0-0-released-reorganized-open-sourced-and-at-github/)! And, two different versions of it are now available, supporting two different developers: the Spring developer, served by the Spring Tool Suite, and the Groovy and Grails developer, served by the Groovy/Grails Tool Suite. For more on this fantastic news, check out Tool Suites-lead Martin Lippert's blog.
2.  Spring Security lead Rob Winch announced the latest version of [Spring Security, version 3.1.2, has been released](http://www.springsource.org/node/3625).
    
    ```
    Copy	 </a>
    <LI> The ZeroTurnaround blog has a <EM> really</EM> cool little blog on rapid development with Spring and Hibernate. 
    	 Of course, Zero Turnaround has a handy little software agent that lets you reload Java classes on the fly. So that's a <EM>huge</EM> gain in productivity right there. That, coupled with XML-free Spring 3.1 and Hibernate 4.1, and you have yourself a <Em>really</EM> awesome combination. To learn more, check out the blog!  The example he illustrates are also well <a href = "http://github.com/cloudfoundry-samples/springmvc-hibernate-template">represented in this sample project on GitHub</A>. The example even  includes <CODE>web.xml</CODE>, even though it isn't required, just as was done in that blog post, specifically because it's more reliable on the buggy versions of JBoss 7 and Servlet 3 environments aren't ubiquitous, yet. 
    		 This is a seriously cool blog post, be sure to read the followups!
    
    	</LI>
    ```
    
3.  Joseph Kulandai [has a nice, introductory blog post on the Spring `ApplicationContext`](http://javapapers.com/spring/spring-applicationcontext/), including some tidbits about it that I'd long since forgotten! Very nicely done, Joseph!
4.  We talked about this before, but InfoQ's coverage is pretty awesome, too. [IG Group Open-Sources RESTdoclet](http://www.infoq.com/news/2012/08/RESTDocletOpenSource), which makes it dead simple to generate documentation for Spring-based RESTful services. REST, for better or for worse, does not have something like SOAP's WSDL, which enumerates the interface contract for clients connecting to SOAP-based web services. This technology fills that gap.
5.  Paxcel Labs has an interesting blog post on [that attempts to demystify IoC (inversion of control) and how Spring supports the concept](http://blog.paxcel.net/blog/spring-dependency-injection/).
    
    ```
    Copy	</LI> 
    ```
    
6.  The Hybris blog has been on a roll recently with their posts on consuming OAuth from the client perspective, but [*this* post, in particular, introducing how to setup Spring Security OAuth](http://techblog.hybris.com/2012/08/10/oauth2-server-side-implementation-using-spring-security-oauth2-module/)
    
    ```
    Copyis the one I've been waiting for!  It's a very nice read, and I'm glad they've shared it with us, complete with working code and a blow-by-blow breakdown of the pieces. OAuth is complex, Spring Security OAuth (not yet GA!) makes it much simpler, but it's still nice to have guidance.
    </LI> 
    ```
    
7.  Speaking of Spring Security, the Java Code Geeks have a blog post with a classic recipe (an oldie but a goodie): [how to implement a `UserDetails` object backed by Hibernate](http://www.javacodegeeks.com/2012/08/spring-security-implementing-custom.html) entities (of your own design).
8.  Biju Kunjummen has a great blog post introducing
    
    ```
    Copy<a href = "http://biju-allandsundry.blogspot.hk/2012/08/spring-configuration-and-factorybean.html">
    	 some of the nuances of using Java-based configuration 
    </a>. Specifically, he reminds us to let Spring provide the lifecycle callbacks by routing things through @Bean methods, instead of instatiating the objects directly. 
    </LI> 
    ```
    
9.  If you use [Spring.NET, and want to take advantage of AOP method interception](http://www.agile-code.com/blog/aop-method-interception-with-spring-net/), check out this post!
10.  Spring Data Neo4j lead Michael Hunger, fresh off his very cool [Spring Data Neo4J webinar](http://www.youtube.com/watch?v=heC-8Pq2exQ&feature=plcp) (find more great content like that on our [YouTube channel](http://www.youtube.com/SpringSourceDev)!), has put together [a followup blog with helpful resources like the location of the slides](http://java.dzone.com/articles/spring-data-neo4j-webinar). Thanks, Michael!
11.  Partha Bhattacharjee continues his blog series introducing Spring Integration. This time, he talks about [Spring Integration's gateways, which make request/reply semantic exchanges dead simple](http://java.dzone.com/articles/spring-integration-gateways-1)!
     
     ```
     Copy</LI> 
     ```
     
12.  Captain Debug has a wonderful post on using [Spring 3.1's profiles to define environment-specific beans in XML](http://www.captaindebug.com/2012/08/using-spring-profiles-in-xml-config.html).
13.  The Halycon code blog has a post on using Spring's sub-contexts to let you take advantage of Spring's property-placeholder resolution in `  import  ` statements. Normally, these statements are not able to *see* the property placeholders of the current application context, but nested contexts *can* see the property placeholders of the parent contexts. Solution? Simply instantiate [everything in a child context so that the `import` statement can use the parent context's properties](http://bottlenet.blogspot.hk/2012/08/spring-dynamic-import-with-properties.html)! This trick's kind of sneaky! I like it.
     
     Remember, child contexts provide scoping - beans defined in one child can't see beans defined in another. This makes it very useful for things like Spring Batch Admin, which lets you upload and launch new Spring Batch jobs (which themselves are based on Spring configuration) on the fly.
     
14.  The Java Assist blog has a nice post on [using Spring MVC bean validation in 3.0 or later](http://java-assist.blogspot.hk/2012/08/spring-mvc-validation.html). Cool!
15.  The Intelligrape blog has a quick post about using Grails' support for Spring beans, [and exploiting Spring's lifecycle callbacks, particularly `InitializingBean#afterPropertiesSet`.](http://www.intelligrape.com/blog/2012/08/14/using-initialization-bean-to-set-properties/)

```
Copy<LI>   The Middleware magic blog has a nice, complete post on configuring <A href = "http://middlewaremagic.com/weblogic/?p=8092"> Spring to talk to a JBoss AS 7-managed JMS instance</A>. The  example is particularly involved because of all the work required to setup JBoss and to build up a client connection to it.  </LI>
```