---
title: This week in Spring: August 30th, 2011
source: https://spring.io/blog/2011/08/31/this-week-in-spring-august-30th-2011
scraped: 2026-02-24T08:35:25.148Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  August 31, 2011 | 0 Comments
---

# This week in Spring: August 30th, 2011

_Engineering | Josh Long |  August 31, 2011 | 0 Comments_

Welcome to another edition of *"This Week in Spring"* There's a lot to get to, so we'll get to it. A quick note: if you're at VMworld 2011 in sunny Las Vegas, come on over to the Cloud Application Platform booth and say hi.

1.  What a week for [CloudFoundry](http://www.cloudfoundry.org)! The week saw the release and availability of [Micro Cloud Foundry,](https://www.cloudfoundry.com/micro) the freely downloadable *"PaaS-on-a-stick."* Micro Cloud Foundry is a complete, local version of the popular, open source Platform as a Service that lets developers run a full featured cloud on their Mac or PC. Using Micro Cloud Foundry developers can build end-to-end cloud applications locally, without the hassles of configuring middleware while preserving the choice of where to deploy and the ability to scale their applications without changing a line of code.
    
    To learn more about the Micro Cloud Foundry, check out these three blog posts introducing Micro Cloud Foundry to [Spring developers](http://blog.springsource.com/2011/08/24/micro-cloud-foundry-for-spring-developers/) and [Grails developers](http://blog.springsource.com/2011/08/24/using-micro-cloud-foundry-from-grails/), and introducing the [support for Micro CloudFoundry in SpringSource Tool Suite](http://www.springsource.org/node/3215).
    
    ```
    Copy	</li> 
    	
    	<LI>Thomas Risberg blogged today about <A HREF="http://blog.springsource.com/2011/08/30/using-postgres-on-cloud-foundry/">using PostgreSQL on Cloud Foundry</a>. The recently announced  PostgreSQL support   makes CloudFoundry the natural place to deploy your enterprise applications: between MySQL and PostgreSQL there's very likely few speed or feature that you can't match on CloudFoundry. <a href="http://www.cloudfoundry.com">Try it out today!</a>  
    		
    	 </LI><LI> Mark Thomas had an article on <a href="http://tomcatexpert.com">Tomcat Expert</a> last week about  <A href="http://www.tomcatexpert.com/blog/2011/08/25/apache-tomcat-8-and-java-7-will-they-work-together">Tomcat 8 and Java 7</a>, answering the  question: <EM>will they work together</EM>? 
    	 
    	</LI>
    	 <LI>Roy Clarkson, lead of the Spring Android project, <a href="http://blog.springsource.com/2011/08/26/clean-code-with-android/">recently blogged about the various dependency injection options for Android</A> and how to write cleaner code. Check it out for a look at the modern Android developers toolkit. 
    		
    		</LI>
    	<LI> Spring provides many ways to support configuration. Spring 2.5 enhanced the options available with <EM>stereotypes</EM>, which let you 
    			specify a marker annotation as a way to define an injection site.
    			This <a href="http://code-on.blogspot.com/2011/08/how-to-use-type-safe-dependency.html">very nice blog post</a> first introduces some of the earlier ways to make maximum use of the type system with <CODE>@Autowired</CODE>, then introduces the <EM>stereotype</EM> model, cleanly and consistently. 
    			I wholly recommend it for a great look at an easy way to achieve  
    			cleaner code.
    		</LI> 
    	<LI> 
    	   In addition to the MicroCloud, last week saw <A HREF="http://blog.cloudfoundry.com/post/9374366916/cloud-foundry-adds-php-and-python-through-community">the announcement</A> of the availability of <a href="http://www.appfog.com/">PHP</a> and <a href="http://www.activestate.com/">Python</a> support through    community CloudFoundry providers. 
    		 This is an ideal situation for developers on those platforms and if you've always wanted first-class support for Python and PHP on a cloud, this release is for you! And, of course, if you're a Python developer, you should no  doubt be looking at <a href="http://springpython.webfactional.com/">Spring Python</a>, the <EM>Pythonic</EM>		port of the Spring framework. 
    	</LI>
    	<LI> Last week, Alan Stewart, lead of the Spring Roo project, <a href="http://www.springsource.org/node/3217">announced the availability</a> of the O'REILLY book, <EM>Getting Started with Spring Roo</EM>, that my co-author Steve Mayzak and I put together. O'REILLY worked closely with us to help make the book concise, and useful. O'REILLY have graciously agreed to make the book  <a HREf= "http://spring-roo-repository.springsource.org/Getting_Started_with_Roo.pdf">available for free download here</a>, as a <CODE>.PDF</CODE>. 
    		 Readers who want an alternative e-reader-specific format or want to get a print copy of the book on-demand may of course pursue those options at the <a href="http://oreilly.com/catalog/0636920020981">O'Reilly page for the book</a>. 
    		The book features an introduction to Spring Roo as well as an introduction to two of the many powerful, new addons being developed for Spring Roo: the Spring Data Neo4j addon, and the Vaadin web framework addon. 			 
    		</li>
    		<LI>
    			<A href ="http://www.springsource.org/node/3218">Virgo 3.0 and Gemini Web 2.0</a> have been released. 
    				The theme of Virgo 3.0 is better integration with EclipseRT technologies. To that end, we have created a Jetty variant of the Virgo web server and have switched from Felix to Equinox implementations of some OSGi services. 
    				Gemini Web and the Tomcat variant of the Virgo web server have been upgraded to Tomcat 7 and Servlet 3.0.			 
    		</LI>
    		<LI> 
    		 <A href="http://www.springsource.org/node/3219">Spring AMQP 1.0 GA has been released!</A> 
    		 I don't know about you guys, but I've been waiting for this one for a <EM>looong</EM> time. RabbitMQ  is one of the  most powerful messaging options available to enterprise Java developers today in traditional Spring applications <A href="http://blog.springsource.com/2011/08/16/chatting-in-the-cloud-part-1/">as well as in the cloud.</a>  
    			 Spring AMQP provides the idiomatic Spring support for RabbitMQ, including support for a <CODE>PlatformTransactionManager</CODE> abstraction, 
    			and a message listener container abstraction similar to the support available for JMS.
    			The GA release of the Spring AMQP integration clears the way for the inclusion of the Spring Integration AMQP support in the imminent  Spring Integration 2.1. Powerful stuff! Developers looking to get started with messaging in Spring might take a look at <a href="http://blog.springsource.com/2011/01/25/green-beans-getting-started-with-enterprise-messaging-and-spring/">this GreenBeans post ("Getting Started with Enterprise Messaging with Spring")</a>, which may be a bit out of date but provides a clear, concise introduction to the relevant concepts and options for both AMQP and JMS integration with Spring. 
    		</LI>
    		
    		<LI><A href="http://www.springsource.org/node/3221">Spring GemFire 1.1.0.M2 has been released!</a>
    			
    			This new release includes dedicated support for continuous query (Message Driven POJOs for GemFire), extensive client cache support,
    			and namespace support for region expiration. Very cool release, and users are highly encouraged to check it out. The continuous query support underlies the new Spring Integration Gemfire adapter that's expected to be in Spring Integration 2.1, as well: very powerful stuff! </LI>
    			
    		
    <li> <a href="http://www.springsource.org/spring-social/news/1.0.0.rc3-released">Spring Social 1.0.0.RC3 has just been released.</A> 
    	This release includes fixes for bugs reported since 1.0.0.RC2 and  tweaks to the API:  <CODE>ConnectInterceptor</CODE> implementations can now add parameters to the authorization URL, 		Twitter <CODE>TimelineOperations.updateStatus()</CODE>  can now post a photo, along with the status, returns a Tweet object, and can also be used to post a <EM>reply</EM> to an existing status. 
    	  
    	The set of sample applications has been updated, including two new examples: One to demonstrate a popup-based connection flow and another to demonstrate using Spring Social within a Facebook Canvas application.
    
    	</li>	<LI> 
    	Adobe Technical Evangelist Christophe Coenraets
    	<a href= "http://coenraets.org/blog/2011/08/flex-spring-mobile-test-drive-learn-the-best-way-to-build-java-backed-ios-android-and-playbook-apps/">
    	  has updated the Flex / Spring Mobile Test Drive. 
    	</a>   
    
    	The new code is available on <a href="https://github.com/ccoenraets/flex-spring-mobile-testdrive">GitHub.com</a>. 		</li>
    	<LI>
    	This <a href="http://java.dzone.com/articles/spring-data-mongodb">post, by Artur Mkrtchyan</a>, does a nice job providing an introduction to writing a MongoDB client using regular Java and then taking it a step further and using the Spring Data project to talk to MongoDB. Good stuff, Artur!
    	</LI>
    ```
    
2.  Job scheduling support in Spring's always been pretty robust, historically supporting Quartz, and - from Spring 3.0 and later - supporting the `@Scheduled` annotation. However, there is always room for improvement, [and this blog](http://techblog.bozho.net/?p=452) explores this, even [linking to code](http://stackoverflow.com/questions/6788811/taskscheduler-scheduled-and-quartz/6840970#6840970) that would allow you to build on core Spring, and get `@Scheduled`\-like ease-of-use while delegating to Quartz's power. Even if you're not interested in job scheduling, this post serves as a fine example of how anybody can build on the rich lifecycle hooks and component model to extend Spring's API for your own application using the same hooks as the framework itself uses. Good stuff!

```
Copy<LI> <a href ="http://community.jboss.org/people/johnnyren/blog/2011/08/26/understanding-spring-web-service-and-jaxb-integration">
  This post on community.jboss.org</A> about using Spring Web Services with JAXB is both concise and useful. It introduces the data modeling approach for  
    contract-first web services using Spring Web Services and JAXB, the Java API for XML binding. 		 
</LI>
```

4.  A blogger, Roger Hughes, has written up a string of blogs recently that are really insightful! The [first post](http://www.captaindebug.com/2011/08/using-spring-3-numberformat-annotation.html) introduces Spring 3's `@NumberFormat`. The [second](http://www.captaindebug.com/2011/08/using-spring-3-datetimeformat.html) introduces Spring 3's `@DateTimeFormat` annotation. The [third post](http://www.captaindebug.com/2011/08/is-convention-over-configuration-going.html) introduces Spring MVC's `Conventions` class, which is at the heart of some of the major convention-over-configuration centric changes seen in recent Spring MVC releases that let you, for example, add any object to the `Model` that is made available to the view and omit the name used to store that model attribute, deferring to the `Conventions` class to provide a sane name based on the [JavaBeans specification](http://www.scribd.com/doc/52811942/53/Capitalization-of-inferred-names).
    
    In this latest post, he cautions that while using the conventions in some cases can be very helpful (such as with `<mvc:annotation-driven/>`), using some defaults can cause confusion. This is a fair point, and it's nice to have the choice, either way. Nice work, Roger!
    
5.  [This blog post highlights the fact that Spring.NET supports bi-direction injection](http://jee-bpel-soa.blogspot.com/2011/08/springnet-superiority-over-ms-unity-and.html), a feature that distinguishes it from Ninject and MS Unity.
6.  Want to run multiple Tomcat instances on one machine? [This blog post explains the nitty gritty details. Good stuff.](http://www.javacodegeeks.com/2011/08/multiple-tomcat-instances-on-single.html)