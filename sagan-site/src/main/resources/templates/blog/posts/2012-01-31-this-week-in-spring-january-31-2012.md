---
title: This Week in Spring, January 31, 2012
source: https://spring.io/blog/2012/01/31/this-week-in-spring-january-31-2012
scraped: 2026-02-24T08:27:32.368Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  January 31, 2012 | 0 Comments
---

# This Week in Spring, January 31, 2012

_Engineering | Josh Long |  January 31, 2012 | 0 Comments_

Welcome back to another installment of *This Week in Spring*.

```
Copy Seems like we were just staring down the holiday season a minute ago, doesn't it? Here we are a month on into the new year, already. Time sure does fly. 
```

We've got lots of exciting new content, and a *lot* of it is either videos or full texts that you can read, be sure to skim through this roundup and then find yourself a nice cozy chair to absorb the rest of it and enjoy!

1.  [Spring.NET Social 1.0.0 Has Been Released!](http://www.springsource.org/node/3382) Hot on the heels of [Spring Social 1.0 (for Java)](http://www.springsource.org/spring-social/news/1.0.0-released)'s release late last year, [Spring.NET](http://www.springframework.net) Social 1.0.0 has been released with the foundation API as well as API implementations for Dropbox, LinkedIn and Twitter.

```
Copy<LI>Speaking of Spring Social, <A href = "http://www.springone2gx.com/conference/speaker/craig_walls">Craig Walls</a>' SpringOne2GX talk,  <a href ="http://www.springsource.org/node/3380">The Rise of OAuth</A>,
	 is now available on <A href = "http://www.infoq.com">InfoQ.com</a>. The talk introduces the nuanced world of OAuth, and then introduces how Spring Social and Spring Security can make interoperating with, and providing, OAuth-based services easier.    </LI> 

	
<LI> <a href = "http://www.springone2gx.com/conference/chicago/2011/10/speakers/michael_hunger">Michael Hunger</a>, <a href = "http://www.springsource.org/spring-data/neo4j">Spring Data Neo4J</A> contributor and Neo4J ninja, has put together a <EM>very</EM> good guide on the <a href = "http://www.springsource.org/spring-data">Spring Data</A> projects called 
```

*Good Relationships*. [*Good Relationships* is available as a free download from our friends at InfoQ](http://www.infoq.com/minibooks/good-relationships-spring-data). Michael, besides being a prolific coder (I'm still not convinced the man sleeps...), is a very good writer. He contributed the amazing content (not to mention the addon itself!) regarding the Spring Roo Neo4J addon to the book that co-author Steve Mayzak and I wrote about Spring Roo for O'Reilly last year (which is *also* [available as a free download!](http://spring-roo-repository.springsource.org/Getting_Started_with_Roo.pdf). Thanks, O'Reilly, and Michael!).

I recommend this book - Michael's a NoSQL ninja, and an inspirational voice in the community.

Incidentally, this is a fine time to revisit Michael's SpringOne2GX 2011 talk, [Introduction to Spring Data Neo4j](http://www.infoq.com/presentations/Introduction-to-Spring-Data-Neo4j), *also* on InfoQ!

```
Copy</LI>

<LI>  <a href = "http://www.springone2gx.com/conference/speaker/roy_clarkson">Roy Clarkson</A> and <A href ="http://www.springone2gx.com/conference/speaker/josh_long">Josh Long</A>'s (that's me!) <a href = "http://www.springone2gx.com">SpringOne2GX</a> 2011 talk, <a href = "http://www.springsource.org/node/3381"> Mobile Web Development with HTML 5</A> is also on InfoQ. This talk introduces mobile application development techniques using HTML5. </LI>

	 <LI> Frequent blogger Alex Soto has a blog on <a href = "http://www.thymeleaf.org">Thymeleaf</a>, the powerful templating 

		 library that works marvelously with Spring MVC. Alex introduces <a href= "	http://www.lordofthejars.com/2012/01/once-upon-time-and-long-ago-i-heard.html">Thymeleaf, and a simple Spring MVC and HTML5 Maven archetype</a>, which you can use to bootstrap your own Spring MVC project.
	 </LI>	

<LI> In large teams with many modules, it is helpful to decouple implementations of services from their interface contracts. Dependency injection, and Spring in particular, make this trivial.   Tobias Flohre  outlines a structure for building loosely coupled business components  with a minimal of fuss. <a href = "http://blog.codecentric.de/en/2012/01/a-business-component-architecture-with-spring-3-03-1-part-1-structure">Tobias employs Spring's Java configuration support to achieve the loose coupling of contracts and implementations</A>  - extricating the knowledge about which implementation is being used to the configuration. </LI>
	
	
<LI> 
 In his blog,	Brian Du Preez talks about his latest project and how he got it to work with <a href = "http://www.briandupreez.net/2012/01/spring-3-string-web-services-2-ldap.html">	Spring 3.0, Spring Web Services 2.0 and Spring   Security LDAP</a>.  Nice job, Brian! Thanks for sharing the details on this - it'll benefit numerous others who are no doubt doing the same sort of thing in their own environments.   
	
	</LI>
<LI> This blog demonstrates <A href ="http://www.jroller.com/ejboy/entry/using_h2_connection_pool_in">how to configure a connection pool in Spring that connects to the in-memory database, H2.</a>   </LI>
<LI> Geraint Jones has a nice blog introducing <a href = "http://city81.blogspot.com/2012/01/spring-mvc-and-restful-web-services.html">how to setup RESTful services using Spring MVC</A>.  </LI>
<LI> Jeff Zapotoczny details his <a href = "http://www.summa-tech.com/blog/2012/01/23/spring-batch-imperfect-yet-worthwhile/">first steps with Spring Batch and Spring Batch Admin</a>. Jeff felt that <a href = "http://www.springsource.org/spring-batch">Spring Batch</A> was a bit heavy-handed at first (it's easy to get that impression on first blush - it has <EM>so</EM> many features!)  but on consulting with his team members he realized that Spring Batch, and <a href ="http://static.springsource.org/spring-batch-admin/getting-started.html">Spring Batch Admin</A>, were just right.  
	I'll be looking for more of Jeff's journey, and in the meantime, if you've got a batch problem to solve, why don't you take your first steps with Spring Batch?
	  </LI>
<LI> The TechArtifact  blog has a 
	 complete 
	 <a href = "http://www.techartifact.com/blogs/2012/01/springmvc-example-with-maven.html">Spring MVC example that uses Maven</a>.  </LI>

<LI> Lucas Jellema, on the AMIS blog has two interesting Tomcat blogs. The first one <a href = "http://technology.amis.nl/blog/14688/installing-tomcat-7-and-configuring-as-server-in-netbeans">details how to setup Tomcat 7 as a server in Netbeans</a>. 
	The second 
	details how to run <A href = "http://technology.amis.nl/blog/14709/running-cometd-2-examples-locally-on-tomcat-using-maven-and-netbeans">CometD examples on Tomcat, also  using Maven and NetBeans</A>. 
	 Nice job, Lucas!    </LI>
```