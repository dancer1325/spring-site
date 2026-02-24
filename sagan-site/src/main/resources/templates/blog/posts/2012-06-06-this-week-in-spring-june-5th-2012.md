---
title: This Week in Spring, June 5th, 2012
source: https://spring.io/blog/2012/06/06/this-week-in-spring-june-5th-2012
scraped: 2026-02-24T08:20:53.641Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  June 06, 2012 | 0 Comments
---

# This Week in Spring, June 5th, 2012

_Engineering | Josh Long |  June 06, 2012 | 0 Comments_

Welcome back to another installment of *This Week in Spring*. As usual, we've got a lot to look at this week so let's get to it..

1.  The video from Chris Beams's recent webinar on the [various styles of dependency injection that Spring supports](http://www.springsource.org/node/3567) is up. Chris is a core Spring framework engineer (and all around good guy). This video is definitely worth a watch especially if you still think Spring configurations requires XML.
    
    ```
    Copy	  </LI> 
     <LI> Oleg Zhurakousky announced the availability of 
    	 <a href = "http://www.springsource.org/node/3569">
    	 Spring Integration 2.1.2 RELEASE and 2.2.0M2</A>. The new releases are filled with many important bug fixes as well as several  
    	
    	 new features.  
    	 </LI>
    	<LI>  Roy Clarkson has announced the availability of <a href= "http://www.springsource.org/spring-android/news/1.0.0-released">Spring Android 1.0.0.RELEASE</A>! The project is an extension of the Spring Framework that aims to simplify the development of native Android applications by providing RESTTemplate support for mobile clients. 
    		 
    		 
    	</LI>  
    	<LI> The  Birds and Bytes blog has an interesting approach to exposing  <a href = "http://birds-and-bytes.tumblr.com/post/24068122981/sharing-spring-mvc-localization-with-the-client-side">Spring MVC internationalized messages  to JavaScript code by using Jackson to write them to a JavaScript-consumable dictionary</A>. This is pretty slick, <EM>and</EM> simple!
    		
    		   </LI>
    	 <LI> After you've watched Chris Beams' amazing webinar, you might check out Steve Schols' blog, which  
    offers a perspective on 
    		 <a href = "http://steveschols.wordpress.com/2012/06/05/i-was-wrong-constructor-vs-setter-injection/">which approach to dependency injection (constructor- or setter-based injection) to take</A>, and relates them to 
    		  relevant support in the Spring framework. The Spring framework, of course, supports both setter- and constructor-based injection, but it's nonetheless interesting to see one person's perspective of the tradeoffs in using one or the other.
    		 </LI>
    ```
    
2.  Carlo Scarioni has put together a great post introducing how [to create custom Spring 3 XML namespaces](http://java.dzone.com/articles/creating-custom-spring-3-xml). The XML namespace mechanism is one that is available for public consumption: you don't have to be a SpringSource engineer to wrap your API in an XML namespace and make it available for consumption by other engineers. XML namespaces can pack a lot of punch! It is common to see open source, third party APIs also expose an XML namespace, and it's easy enough to do that every team should consider exposing one of their own.
3.  Ken Rimple, co-author of *Spring Roo in Action*, has put together a wonderful blog on how [to unit-test Spring Roo addons.](http://java.dzone.com/articles/roo-add-development-testing)
4.  Matt Vickery is at it again, this time with an amazing post on [how to use the dynamic duo of Spring Integration's `splitter` and `aggregator`.](http://java.dzone.com/articles/spring-integration-robust)
5.  Avner has written a post about [sharing Spring MVC localization with the client side](http://birds-and-bytes.tumblr.com/post/24068122981/sharing-spring-mvc-localization-with-the-client-side).

```
Copy	 </LI>
```

7.  The VoltDB blog has a great post on using Spring's [`@Scheduled` annotation to run scheduled tasks](http://voltdb.com/company/blog/using-spring-schedule-annotation).
8.  Arjen Poutsma has announced the [availability of Spring Web Services 2.1.0.RELEASE.](http://forum.springsource.org/showthread.php?126957-Spring-Web-Services-2-1-0-RELEASE-released) The new release includes many updates to third party dependencies, and mainly marks the stabilization point of the 2.1 line.
9.  The Hyperic blog has an interesting post on the [updates to Hyperic as part of the larger, recent vFabric 5.1 line that
    
    ```
    Copy     support Tomcat 7</A>.
      </LI> 
    
     
    ```](http://blog.hyperic.com/hyperic-gives-managing-apache-tomcat-an-upgrade/)