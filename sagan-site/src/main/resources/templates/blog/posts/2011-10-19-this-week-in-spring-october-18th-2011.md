---
title: This Week in Spring, October 18th, 2011
source: https://spring.io/blog/2011/10/19/this-week-in-spring-october-18th-2011
scraped: 2026-02-24T08:33:30.154Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  October 19, 2011 | 0 Comments
---

# This Week in Spring, October 18th, 2011

_Engineering | Josh Long |  October 19, 2011 | 0 Comments_

What a week! If you're an enterprise Java developer, then you've no doubt heard the news - Spring 3.1 RC1 has just been released! Read on for more details and be sure to sound off on the [forums](http://forums.springsource.org) if you have questions or feedback!

And, of course, if you're at [SpringOne2GX 2011](http://www.springone.com) next week, you can look forward to hearing a *lot* more on Spring 3.1 as well as the latest and greatest from all the Spring technologies. We look forward to seeing you all there!

```
Copy </P>  

  
```

1.  Spring 3.1.0.RC1 was released last week! And so begins the march to Spring 3.1 GA. Chris Beams kicked things off with this [announcement](http://www.springsource.org/node/3279). Then, Juergen Hoeller, Spring project lead, followed up [with this blog post detailing the new features.](http://blog.springsource.com/2011/10/12/spring-framework-3-1-rc1-released/) The first release candidate of Spring 3.1 is now available from the Spring [milestone repository](http://maven.springframework.org/milestone) or for direct download [via community download page](http://www.springsource.com/download/community). This release includes new features such as:
    
    ```
    CopySupport for Hibernate 4.0 (up to date with 4.0 CR4), 
    Complete <CODE>TestContext</CODE> framework support for <CODE>@Configuration</CODE> classes,
    Flash scope for Spring MVC, 
    Support for Quartz 2.0,  
    77 bug fixes, 16 new features, and 66 improvements. Wow! To learn more about what's new in Spring 3.1, be sure to <a href="http://static.springsource.org/spring/docs/3.1.0.RC1/spring-framework-reference/html/new-in-3.1.html">check out this document.</a>
     </LI> 
      <LI> 
      Martin Lippert today announced the <a  href="http://www.springsource.org/node/3287">release of SpringSource Tool Suite 2.8</a>. The new IDE contains all sorts of features, and updates. It's built on top of  Eclipse Indigo SR1, it
    	includes full IDE support for Java 7 (coming with the Eclipse 3.7.1 update),
    	support for Spring 3.1 bean profiles, including validation and navigation,  
    	support for Spring 3.1 c-namespace including quick-fixes, validation and content-assist,  
    	improved constructor-arg validation and quick-fixes, 
    	updated Eclipse Maven integration (m2e 1.0.100), including migration assistance,  
    	support for Groovy 1.8.2, and 
    	support for Grails 2.0.0.M2. As this  new release bundles m2e (the Eclipse plugin formerly known as <em>m2eclipse</em>), there are <a  href="http://blog.springsource.com/2011/10/18/upgrading-maven-integration-for-springsource-tool-suite-2-8-0/">some steps</A> you'll need to be aware of when upgrading. 
    ```
    
    As usual, visit the community download [page to get the latest bits.](http://www.springsource.com/landing/best-development-tool-enterprise-java)
    
2.  [Spring Integration 2.1 M2 Has Been Released](http://www.springsource.org/node/3280). It includes numerous fixes and new features, including a refactored (simpler and more flexible) aggregator and resequencer, an XPath filter, JDBC stored procedure adapters, and AMQP-backed Message Channels. Be sure to get the bits from [the community download page](http://www.springsource.com/download/community).
    
    ```
    Copy</LI> 
     <LI>  
    ```
    
    Readers of this column will remember that [InfoQ](http://www.infoq.com) recorded sessions from the Paris "What's Next," and we got to see Adrian Colyer's [keynote on cloud computing in the enterprise](http://www.springsource.org/node/3200). InfoQ's just released two more videos from Rob Harrop, a core Spring developer and an engineer on RabbitMQ, and Jags Ramnarayan, chief architect at GemFire. [Rob introduced polyglot messaging with RabbitMQ](http://www.infoq.com/presentations/Multi-Platform-Messaging-with-RabbitMQ), and [Jags Ramnaraya introduced SQLFire](http://www.infoq.com/presentations/SQLFire-Scalable-SQL-instead-of-NoSQL), the scalable SQL database that offers a compelling alternative to a NOSQL store.
    
3.  Chris Harris, of the RabbitMQ team, has just published a great post [demonstrating how to use MongoDB's continuous query mechanism](http://cjharris5.blogspot.com/2011/10/mongodb-rabbitmq-continuous-query.html) with RabbitMQ. Great stuff from a great author. Readers that wish to learn more about RabbitMQ, the open source messaging broker from SpringSource, should check out this webinar from the SpringSourceDev YouTube channel.

```
Copy	 <LI> Ramnivas Laddad, from the CloudFoundry team,  <a href= "http://feedproxy.google.com/~r/SpringSourceTeamBlog/~3/td3vscam9RA/">introduces the numerous services available on CloudFoundry</a> for Spring developers.
		   Services offered in Cloud Foundry make writing efficient and effective applications possible. When you're writing an application for CloudFoundry, don't worry about <em>whether</EM> there's a service available -   instead focus on  <em>which</EM> service  you'll use. 
 	 </lI> 
 <LI>This new post introduces one of the more intriguing tricks you can play with the Spring application context: <a href="http://java.dzone.com/articles/spring-make-externally-created">Spring: Make an Externally Created Object Available to Beans in applicationContext.xml</A>  If your Spring beans need access to an object that is not created by Spring itself, you can  "inject" it into the context by using a static parent context and registering the object with it. Beans can then reference it just as if it was defined in the application context file.
 </LI>
 <LI>Micro Cloud Foundry has been updated, and now offers more supported services - including RabbitMQ and PostgreSQL support - which is identical to the <a href="http://www.cloudfoundry.com">publicly hosted CloudFoundry.com</A>
	<a href = "http://www.h-online.com/open/news/item/VMware-Micro-Cloud-Factory-now-includes-PostgreSQL-and-RabbitMQ-1359716.html">This  post introduces some of the changes in the update.</a>  If you're a Spring developer, consult <A href= "http://blog.springsource.com/2011/08/24/micro-cloud-foundry-for-spring-developers/">this video</A> on getting started with the Micro Cloud Foundry.
	 
	</LI>  
 <LI> 
	 Spring Data JDBC Extensions with <a href="http://www.springsource.org/node/3286">Oracle Database Support 1.0.0.RC1</a>  has just been released.  Among the many improvements, there is better documentation chapter for QueryDSL SQL module,
	 OSGi manifests, and updated  slf4j/log4j and other dependencies.
	 </lI>
 <LI> Spring's Message Listener container has been, and remains, one of the most powerful ways to build JMS applications.  In order to receive JMS messages, Spring provides the concept of message listener containers. These are beans that can be configured to receive messages that arrive on specified <code>javax.jms.Destination</code>s  asynchronously - that is, you don't wait for the messages.   
	<a href= "http://city81.blogspot.com/2011/10/spring-jms-listener-adapters-and.html">This post does a fine job</a> introducing the concepts and configuration required to have your application  notified when a message is received from a JMS broker. 
 
</li> <LI> Ken Rimple, co-author of Manning's <EM>"Spring Roo in Action,"</Em>  M 
	 <a href ="http://www.rimple.com/tech/2011/10/18/roo-in-the-corner-new-features-in-trunk.html">writes about all the  great changes in Spring Roo 1.2</A>. As he notes in the article, some break things and some are great. Either way, these are all <em>in-flight</EM> changes and are subject to change. There's a reason why working off of trunk is called <EM>living on the edge</EM>!  Check it out!  </li>
```

6.  Sergi Almar is putting together "Spring puzzles" - little trivia questions related to Spring. I thought these were pretty fun. Do you know the answers? [Here's the first puzzle](http://sergialmar.wordpress.com/2011/09/29/spring-puzzler-01-welcome/), and here's [the second](http://sergialmar.wordpress.com/2011/10/12/spring-puzzlers-02-the-happy-traveler/), published just last week. Nice job, Sergi!
7.  Stuck on JBoss AS but want things to be a bit more comfortable for your Spring applications? JBoss has just released version 2.0 of their Spring-JBoss integration library, [SnowDrop](http://community.jboss.org/en/snowdrop/blog/2011/10/19/snowdrop-200final-released).
8.  And of course, I'm sure that you noticed, we have spruced up the [SpringSource.org](http://www.springsource.org) website a little. Everything is in the same place it always was so all your bookmarks and feeds still work, but we have rearranged some of the structure to make it easier to find the things you need. We hope you like it and if you have any feedback or comments start a thread on the [Meta forum](http://forum.springsource.org/forumdisplay.php?34-Meta).