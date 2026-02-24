---
title: This week in Spring: July 26th, 2011
source: https://spring.io/blog/2011/07/26/this-week-in-spring-july-26th-2011
scraped: 2026-02-24T08:38:02.083Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  July 26, 2011 | 0 Comments
---

# This week in Spring: July 26th, 2011

_Engineering | Josh Long |  July 26, 2011 | 0 Comments_

Welcome back to another installment of *This Week in Spring*! This week finds [@springsource](http://www.twitter.com/SpringSource) at OSCON (and OSCON Java and OSCON Data) in Portland, OR. If you're here, come visit our booth in the exhibition hall or check the schedule for any of the numerous Spring-talks!

If you missed us at OSCON, or if you're simply looking for an even better Spring experience, [be sure to register for SpringOne 2GX 2011](http://www.springone2gx.com/conference/chicago/2011/10/home), the premier event for Spring, Grails and CloudFoundry developers. SpringOne 2GX is a one-of-a-kind conference for application developers, solution architects, web operations and IT teams who develop business applications, create multi-device aware web applications, design cloud architectures, and manage high performance infrastructure. The sessions are specifically tailored for developers using the hugely popular open source Spring technologies, Groovy & Grails, and Tomcat. Whether you're building and running mission-critical business applications or designing the next killer cloud application, SpringOne 2GX will keep you up to date with the latest enterprise technology.

1.  OSCON's great, but I will be taking an hour to watch the webinar, *Getting Started with Spring Data Redis* for [North America](http://www.springsource.org/node/3177), and [Europe](http://www.springsource.org/node/3176).
    
    ```
    CopyYou should too: <a href="http://redis.io/">Redis</a> is an open source, advanced key-value store known for its excellent performance, its small footprint and embed-ability. <a href="http://www.springsource.org/spring-data/redis">The Spring Data</a> project makes it easier to build Spring-powered applications that use new data access technologies such as non-relational "NOSQL" databases and cloud based data services. Check it out!  </li>
    ```
    
2.  ```
    Copy<a href= "http://www.springsource.org/node/3189">Spring Data Graph 1.1.0.RC1 with Neo4j support Released</a>
    The key changes in the Spring Data Graph 1.1.0.RC1 release candidate include:
    ```
    
    -   Added Gremlin support (embedded & REST)
    -   QueryEngine.query method now takes a parameter map (for cypher and gremlin)
    -   documentation updates
3.  [Spring Android 1.0.0.M4](http://www.springsource.org/spring-android/news/1.0.0.m4-released) Released! Spring Android supports usage of the Spring Framework in a Android environment. The 1.0.0.M4 release focuses on updating support for the latest Spring Social release in native Android applications, as well as providing enhancements to `RestTemplate`.
    
    -   Support for Spring Social 1.0.0.RC1, and Spring Security 3.1.0.RC2 through the Spring Android Auth module, which includes a SQLite datastore for persisting OAuth API connections.
    -   Updated RestTemplate (client) support, now at the level of Spring Framework 3.1.0.M2.
    -   Added gzip compression support in RestTemplate
    -   Added support for Google's Gson JSON parsing library. The Gson library is smaller than Jackson, however Jackson has faster performance.
    
    ```
    Copy	 </li>
    ```
    
4.  [Spring GemFire 1.1.0.M1 Has Been Released](http://www.springsource.org/node/3186) .
    
    ```
    CopyThe new milestone updates include:
    <UL>
    	
    	<LI>Native support for the upcoming GemFire 6.6</LI>
    	<LI>CacheServer support</LI>
    	<LI>GemFire implementation for Spring 3.1 cache abstraction</LI>
    	<LI>Support for queries with variable parameters</LI>
    	</UL>
    
    
    <LI> 
    	
    	<A HREF ="http://www.springsource.org/node/3187">Spring Data JPA 1.0</a> GA's been released! This powerful framework makes it easy to build JPA-driven repository objects.
    ```
    
    It's been a long road, but it's great to see this powerful framework reach 1.0 GA.
    

```
Copy	 <LI>
		
	Kal Wahner 
			has written an overview of 	<a href= "http://java.dzone.com/articles/rapid-cloud-development-spring"> the deployment of Spring Roo applications to Google App Engine</a>, another cloud environment that Spring supports readily.  
		 He indicates his intention to write up another post, next week, on CloudFoundry, which I would love to see! Good stuff, too. NB: this isn't very technical; e.g., it's more of a a discussion of the broad strokes than a recipe, but he links to a more technical post that might help, too.  
	</LI>
  <LI>
	
	<DIV><A href="http://www.tomcatexpert.com/blog/2011/07/20/apache-tomcat-7019-released">Apache Tomcat 7.0.19 has been released!</a>  
	Apache Tomcat 7.0.19 includes security fixes, bug fixes and the following new features compared to version 7.0.16:
	 </DIV>
```

-   JSP recompilation is now triggered by any change (backwards as well as forwards) in the last modified time of the JSP or any of its dependencies
-   Support for installing multiple instances with the Windows Installer
-   Include ` jdbc-pool` (an alternative database connection pool)

8.  Oleg Zhurakousky's written a very interesting post [on using Scala functions as Spring beans, complete with source code!](http://olegzk.blogspot.com/2011/07/scala-function-as-spring-bean-spring.html?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+blogspot%2FZAFvF+%28Oleg%27s+Blog%29) Very cool stuff!
9.  Your humble editor was asked recently about Spring's `FactoryBean<T>` interface: what's it for? and why? I've written a two part post on the specifics of the [interface](http://joshlong.com/jl/blogPost/spring_corner_whats_a_factory_bean.html) as well as the often [more suitable alternatives in Spring 3.0 and Spring 3.1.](http://joshlong.com/jl/blogPost/spring_corner_beyond_the_factorybean.html)
10.  Continuing with his Scala and Spring integration theme - Oleg Zhurakousky has written up a post on implementing a `FactoryBean` with Spring in Scala. This is absolutely great, as it opens up a powerful part of the Spring framework to Scala development. Check it out!
11.  Loiane Groner - the ESJUG (Espirito Santo Java Users Group) and CampinasJUG (Campinas Java Users Group) leader and coordinator - has written this fantastic post explaining how to use [the ExtJS 4 upload component on the frontend with a Spring MVC 3](http://java.dzone.com/articles/extjs-4-file-upload-spring-mvc) backend. Very pragmatic, cool stuff, and complete with lots of code!

```
Copy	<LI> Marco Tedone has written up a wonderful post on using an 	<A  href="http://tedone.typepad.com/blog/2011/07/outofmemoryerror-warning-system-with-spring.html">OutOfMemoryError warning system  - as described in issue #92 of Dr. Heinz Kabutz's wonderful newsletter - 
 with Spring</a>
		  This is fantastic, and useful!  
	</LI> 
	<LI> Spring MVC is very powerful and easily  employed in your application (in Spring 3.0, you need only specify <CODE>&lt;mvc:annotation-driven /&gt;</CODE> to enable it; alternatively in Spring 3.1, you need only specify  <CODE>@EnableWebMvc</CODE> to enable it). It's also very flexible, and can be configured in many ways. One of the pluggability planes is the view technology: there are common recipes for using JSP, Tiles, Velocity, FreeMarker, XML, JSON, PDFs, Excel spreadsheets and much more for Spring MVCs. If none of these meet your requirements, you can look to the open source community to leverage others, <a href="http://www.thymeleaf.org/"> including one called Thymeleaf.</a>  Here's <a href="http://www.thymeleaf.org/thvsjsp.html">a comparison of Thymeleaf to JSP<a> as a Spring MVC view technology.  Here's a tutorial on <a href=  "http://www.thymeleaf.org/thymeleafspring3.html">  setting up the view technology in Spring MVC.</a> Powerful, and simple!  
```

Check it out! Users of Tapestry's templates as well as JSF's Facelets will see a lot to like in this view template technology - check it out!

14.  [TomcatExpert.com](http://www.tomcatexpert.com) has a great post on the [Security Lifecycle listener.](http://www.tomcatexpert.com/blog/2011/07/20/security-lifecycle-listener)
     
     ```
     Copy	Apache Tomcat 7 includes several security updates that further harden the application server that came directly from the Bugzilla queue. One new feature, the Security Lifecycle Listener, helps ensure that Tomcat is started in a reasonably secure way.
     
     
     
     
     </LI>
     ```