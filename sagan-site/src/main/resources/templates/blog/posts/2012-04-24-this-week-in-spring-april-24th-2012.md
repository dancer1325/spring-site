---
title: This Week in Spring - April 24th, 2012
source: https://spring.io/blog/2012/04/24/this-week-in-spring-april-24th-2012
scraped: 2026-02-24T08:23:41.365Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  April 24, 2012 | 0 Comments
---

# This Week in Spring - April 24th, 2012

_Engineering | Josh Long |  April 24, 2012 | 0 Comments_

![](http://www.springsource.org/files/cfot-ukraine-keynote.jpg)  
![](http://www.springsource.org/files/cfot-ukraine-sightseeing.jpg)

Welcome back to another installment of *This Week in Spring*! As I compile this, I'm eagerly waiting for Costin Leau to begin his talk on NOSQL with Spring here in sunny, and beautiful Kiev, Ukraine, the first stop in the European leg of the [Cloud Foundry Open Tour](http://opentour.cloudfoundry.com/2012/kiev). The turnout for this event's been staggering! If you're reading this, then you've already missed out on the chance to attend the Kiev event, but be sure to register for the upcoming [Moscow](http://opentour.cloudfoundry.com/2012/moscow) and [London](http://opentour.cloudfoundry.com/2012/london) events.

1.  In this SpringOne 2GX 2011 session, Mark Fisher and Thomas Risberg [transform a monolithic enterprise application](http://www.springsource.org/node/3533) by changing its relational DB with a NoSQL one, introducing modularity, adding polyglot support and incorporating message queuing and event driven request processing using common enterprise integration patterns.
2.  Did you guys notice that the final edition of the ***excellent** [Spring Roo in Action](http://www.manning.com/rimple/)* has just been published?
    
    ```
    Copy    This book is, as Ben Alex (Spring Roo project founder) put it, "an insightful and comprehensive treatment." I (personally) can't recommend it enough. Ken Rimple and Srini Penchikala, as long time readers of this roundup will know, are frequent Spring community bloggers and 
    ```
    
    routinely provide amazing content on all things Spring.  
    

```
Copy			 <LI>  
		Blogger Billy Sj&ouml;berg on DZone has a great post on how <a href = "http://www.dzone.com/links/r/bridging_between_jms_and_rabbitmq_amqp_using_spri.html">to bridge JMS and RabbitMQ</A>. 
		 This example uses <a href = "http://www.springsource.org/spring-integration">Spring Integration</A>, and provides a very powerful example of how to use the Spring Integration JMS adapter and the AMQP adapter. 
		
		
		</LI>

 <LI>
	
	 The <em>doanduyhai</em> blog 
	has a great entry on how to use Spring Security to solve a common problem: how do I <a href = "http://doanduyhai.wordpress.com/2012/04/21/spring-security-part-vi-session-timeout-handling-for-ajax-calls/">detect a user session timeout with an Ajax request</A>?  The example comes complete with an introduction and a lot of sample code. 
		 </LI>
		
		
```

5.  The *furiousbob* blog has a great post introducing how to use [Scala to build a RESTful service with Spring MVC](http://blog.furiousbob.com/2012/03/29/scala-rest-service-with-spring/).
6.  Blogger *Carlo Scarioni* has a great blog introducing how to create [custom Spring 3 XML namespaces](http://cscarioni.blogspot.com/2012/04/creating-custom-spring-3-xml-namespace.html).
7.  Blogger *Duck Ranger* follows with the second part of his series [introducing how to setup Spring MVC applications](http://duckranger.com/2012/04/spring-mvc-3-x-with-sts-tutorial-part-ii) with [SpringSource Tool Suite](http://www.springsource.com/developer/sts). This blog goes beyond relying on the built-in templates, and looks at tailoring the Spring MVC request mapping.
    
    ```
    Copy </LI>     
    ```
    
8.  [`simple-spring-memcached client`](http://code.google.com/p/simple-spring-memcached/wiki/ReleaseNotes), version 2.0, is out. The project is a Spring integration for the Memcached caching server. It provides a way to configure the behavior of the cache. This API's pretty awesome, but I (personally) would *love* to see a Spring 3.1 `CacheManager` and `Cache` implementation.
    
    ```
    Copy</LI>
    ```
    
9.  Blogger *benkiew* has put together a blog that explains how to [retrieve references to a `prototype`\-scoped bean](http://benkiew.wordpress.com/2012/04/22/spring-2-5-x-create-prototype-instances-from-code/) that's been injected using some of the supported Spring annotations ( `@Resource`, `@Autowired`, or `@Inject`). The problem's easy to imagine: suppose I have a bean that's bound to the HTTP scope. It will be recreated each time it's accessed in a unique HTTP request. Scoping works to ensure that a bean is only uniquely recreated once per scope. So, ten accesses of the same HTTP-request-scoped bean during a single HTTP request will result in the same reference, but separate accesses across two different requests will result in the creation of two beans. So far, this maps nicely with what we would expect. What happens when I inject a reference to a bean that is *not* scoped - or, it's scope is longer lived than the bean that's scoped? In this instance, you need a *scoped proxy* - a proxy object that manages (and refreshes, as appropriate) accesses to a bean.
    
    ```
    Copy Here's a very simple <a href = "https://raw.github.com/gist/2478860/2f736a21a97649c2c1a60c8780c546d4fe62d90c/gistfile1.java">example of injecting a <em>scoped proxy</EM> that is recreated each time the bean is used</A> (e.g., it's recreated each time it's accessed). 
    	
    	</LI>
    <LI>  The Java Code Geeks has a great blog that <a href = "http://www.javacodegeeks.com/2012/04/aop-made-easy-with-aspectj-and-spring.html ">introduces AOP</A> (drawing inspiration from  <a href = "http://blog.springsource.org/author/ramnivasl/">Ramnivas Laddad's</A> excellent book <EM>AspectJ in Action</EM>).   </LI>
    
    
    
    <LI>  The <EM>Hot Java</EM> blog has a step-by-step recipe for <a href = "http://javabrowsers.blogspot.com/2012/04/spring-mvc-in-netbeans.html">creating a Spring MVC project using Netbeans</A>.  </LI>
    
    <LI>  Blogger <em>Petri Kainulainen</em> has put together the next installment of a series of blogs focused on Spring Data, this time introducing the <a href = "http://www.petrikainulainen.net/programming/spring-framework/spring-data-jpa-tutorial-part-seven-pagination/">pagination and <CODE>Pageable</CODE> support</A>. 
    	 </LI>
    <LI>
    	
    	  The <em>prabinhada</em> blog has a  great look 
    	  <a href = "http://prabinhada.blogspot.com/2012/04/how-to-integrate-jsf20-with-spring-30.html">at how to setup JSF and Spring</A>. The Spring-JSF integration provides the ability to reference and rely on  Spring beans from JSF. Spring 
    	can also manage backing beans. This example gives all the painstaking details of the integration. 
    	Another approach is to <a href = "http://www.springsource.org/roo">use Spring Roo 1.2</A> or later , to create a simple JSF application with <CODE>web jsf setup</CODE> command.
    	This approach will let you choose one of two JSF implementations, setup a theme, setup the internationalization, and much more, all for a few minutes of banging around on the shell.
    	 
    	 </LI>
    	 
    ```