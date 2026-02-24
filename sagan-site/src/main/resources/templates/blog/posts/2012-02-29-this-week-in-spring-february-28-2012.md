---
title: This Week in Spring, February 28, 2012
source: https://spring.io/blog/2012/02/29/this-week-in-spring-february-28-2012
scraped: 2026-02-24T08:25:46.569Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  February 29, 2012 | 0 Comments
---

# This Week in Spring, February 28, 2012

_Engineering | Josh Long |  February 29, 2012 | 0 Comments_

Welcome to another installment of *This Week in Spring*. We've got a lot of good stuff to look at, as usual.

```
Copy  Since you&#39;re here, though, let&#39;s talk about the <a href="http://blog.cloudfoundry.com/post/13481010905/cloud-foundry-open-tour-2012" target="_blank">Cloud Foundry Open Tour</a>, which is an event bringing the industry&#39;s best talent and speakers on Spring, Cloud Foundry, and much more  to a town near you in America, Asia and Europe.  The full itinerary&#39;s provided on the linked page, but if you&#39;re in (or near) Shanhai, Beijing, Tokyo, London, Moscow, Kiev, San Francisco, Portland, Austin, and Washington D.C., then you should not  miss this event - <a href="http://opentour.cloudfoundry.com/" target="_blank">the tour will be in your backyard!</A> 
 I hope to see you there, as always. 
```

```
Copy<LI> Spring Social  lead Craig Walls&#39; video from SpringOne2GX 2011, <a href="http://www.infoq.com/presentations/Spring-Social-For-the-New-Web-of-APIs" target="_blank">Spring Social for the New Web of APIs</A>,  is up on InfoQ. The video introduces the challenges of secure RESTful web services, OAuth, and the myriad of implementations across the various, popular <EM>social</EM> APIs, and then he introduces the <a href="http://www.springsource.org/spring-social" target="_blank">Spring Social</a> project, which provides the   solution to these problems.  </LI> 

<LI> My SpringOne2GX 2011 talk,  on <a href="http://www.infoq.com/presentations/Tailoring-Spring-for-Custom-Usage" target="_blank">Tailoring Spring for Custom Usage</A>, is up on InfoQ, along with a lot of <a href="http://www.infoq.com/springone_2gx_2011/" target="_blank">other great SpringOne 2GX content</a>. The idea is that  while most of us are familiar with the surface level component model, Spring&#39;s real power lies just underneath that component model, in the numerous SPIs and extension hooks. The other Spring projects, including Spring Integration, Spring Batch and Spring MVC, all build on top of these slightly lower level framework hooks, and  you can too. The deck is available for download <a href="http://www.slideshare.net/joshlong/extending-spring-for-custom-usage" target="_blank">from my presentations page</A>, as well.  </LI> 

<LI>In the recent <a href="http://www.springsource.org/node/3486" target="_blank">Messaging for Modern Applications webinar</A>,  <a href="http://www.springone2gx.com/conference/chicago/2011/10/speakers/tom_mccuch" target="_blank">Tom McCuch</A> explained how the landscape of enterprise messaging has changed and discusses what new styles of solutions are emerging. It&#39;s a great video by an industry legend, and definitely worth a watch.   </li> 
	
<LI> Over on the Xebia blog,  Shekhar Gulati talks about how to use <a href="http://xebee.xebia.in/2012/02/27/using-spring-3-1-profiles-to-achieve-paas-portability/" target="_blank">Spring 3.1&#39;s profile features to build PaaS-portable Spring applications</A>. In the example, he uses Spring Roo and MongoDB.   </LI> 
```

2.  [Tomcat 7.0.26 has been released](http://www.tomcatexpert.com/blog/2012/02/23/apache-tomcat-7026-released). The new release includes new features and bug fixes.
    
    ```
    Copy     </LI>
    
    <LI> Mark Baars put together a more comprehensive outline of some great tutorials that are available on YouTube.com    <a href="http://www.springsource.org/vfabric-tutorials" target="_blank">introducing Hyperic, tcServer, and GemFire, all part of the vFabric stack</A>.</LI> 
    ```
    
3.  This blog from Java Code Geeks introduces [how to manage thread pools using Spring.](http://www.javacodegeeks.com/2012/02/spring-thread-pool-services.html) Thread Pools are very important to execute synchronous and asynchronous processes, and Spring enjoys good support for thread pools (as modeled and exposed by the `TaskExecutor` SPI) This blog seems needlessly verbose, however; the takeaway should be that, with Spring's `TaskExecutor` SPI, you can choose the implementation that's appropriate to your needs and use it in lots of different places, including in Java SE, Java EE, and [on the cloud](http://www.cloudfoundry.org).
    
    ```
    Copy</LI>
    ```
    
4.  Willie Wheeler's back, this time with another great post on Spring MVC (3.1). In this post, Willie introduces Spring's `@ResponseBody` annotation, and describes how to get [Jackson and JAXB annotation-based marshaling in Spring MVC](http://springinpractice.com/2012/02/22/supporting-xml-and-json-web-service-endpoints-in-spring-3-1-using-responsebody/) for the cost of just one mapping on the entities.
5.  Tobias Trelle is at it again, this time with [an introduction to using Spring Data Neo4j.](http://blog.codecentric.de/en/2012/02/spring-data-neo4j/) The post is a good introduction to using [Neo4J](http://www.neo4j.org), providing a step by step guide to getting the libraries, configuring them, and building your API with Spring Data Neo4J's mapping capabilities.
6.  The Rai Studies blog has an interesting post on [building ajax forms with Spring MVC and jQuery](http://www.raistudies.com/spring/spring-mvc/ajax-form-validation-using-spring-mvc-and-jquery/). This is pretty standard stuff, but it's nice to have a reference. If you're doing this today, consider using Spring 3.1.
7.  Hawk Chen, on the ZK framework's site, has an interesting blog [introducing how to work with Spring from ZK6](http://books.zkoss.org/wiki/Small_Talks/2012/February/MVVM_in_ZK6:_Work_with_Spring)