---
title: This Week in Spring - June 26th, 2012
source: https://spring.io/blog/2012/06/27/this-week-in-spring-june-26th-2012
scraped: 2026-02-24T08:20:09.347Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  June 27, 2012 | 0 Comments
---

# This Week in Spring - June 26th, 2012

_Engineering | Josh Long |  June 27, 2012 | 0 Comments_

```
Copy<P> What a week! So much to talk about and scarcely enough minutes in the day to manage.   
Without any further ado, let's get on to it!	</P> 
```

1.  [Jonathan Brisbin has announced the availability of Spring Data REST 1.0.0.RC1](http://www.springsource.org/node/3578) . Spring Data REST helps you provide a RESTful interface for your JPA-based repositories.
2.  [Oliver Gierke has announced Spring Data MongoDB 1.0.2.GA](http://www.springsource.org/node/3576). The new release has plenty of bugfixes and improvements, so check [the changelog for more](http://static.springsource.org/spring-data/data-mongodb/docs/1.0.2.RELEASE/changelog.txt).
3.  Wonder what happened to the RabbitMQ webinar that was briefly on the SpringSource [events calendar](http://www.springsource.org/news-events)? It was rescheduled (slight schedule mishap), [but it's back](http://www.springsource.org/node/3577) and you should definitely mark your calendars with the updated dates. It figures to be an amazing event.
4.  Our pal [Gordon Dickens - a world class trainer and engineer](http://www.linkedin.com/in/gordondickens) - has been *very* busy recently.
    
    ```
    Copy	 If you haven't been following his blog recently, you missed an 
    	  <a href ="http://gordondickens.com/wordpress/2012/06/12/springsource_tool_suite_faq/"> introduction to the SpringSource Tool Suite  -  including its composition and value-added features,  and  answers some common questions</A>.
    		
    		 Besides the great post <a href= "http://gordondickens.com/wordpress/2012/06/12/spring-3-1-constructor-namespace">on Spring 3.1's constructor namespace  that we saw earlier this month</A>, 
    		 he also had a great post on converting  
    		 <a href = "http://gordondickens.com/wordpress/2012/06/13/gemini-blueprint-converting-from-spring-osgi/">
    		from Spring OSGi projects to the Eclipse Gemini Blueprint namespaces for bundles</A>.   Nice job, as usual, Gordon!
    		
    	    </LI>
        
    	   <Li>
    		Andy Chan has a nice  post <a href = "http://www.iceycake.com/2012/06/microsoft-active-directory-ms-ad-authentication-with-java-spring-security-3-1-0/">introducing how to use Spring Security 3.1.0 to talk to Microsoft Active Directory for authentication</A>.
    	 Nice job, Andy!	</LI>
    
    <LI> Ben O' Day has put together a wonderful post on using Spring AOP to implement 
    ```
    
    [basic performance monitoring](http://architects.dzone.com/articles/monitoring-performance-spring).
    

```
Copy<LI> The Keyhole Software blog has a couple of very interesting blogs introducing <A href = "http://www.springsource.org/spring-batch">Spring Batch</A>: the first introduces <a href  = "http://keyholesoftware.wordpress.com/2012/06/22/introducing-spring-batch/">the high level concepts</A> and <a href = "http://keyholesoftware.wordpress.com/2012/06/25/getting-started-with-spring-batch-part-two/">the second introduces some actual code.</A> Definitely worth a read.  </LI>
```

7.  The Stardog blog (merely *uttering* that is fun..) has a
    
    ```
    Copy  a very cool example introducing how the  <a href = "http://linkedjava.blogspot.com/2012/06/stardog-and-spring-framework-example.html">Stardog RDF database server could work with Spring by way of an example: the Stardog Petstore</A>! <EM>So</EM> cool...
     </LI>
    ```
    
8.  ```
    CopyAndriy Redko  has a nice post <a href = "http://aredko.blogspot.com/2012/06/using-redis-with-spring.html">on using Redis with Spring Data Redis</A>.
      </LI> 
    ```
    
9.  Ken Rimple, co-author of Manning's *Spring Roo in Action*, has put together a [nice post on using Spring Roo and Spring Webflow](http://today.java.net/article/2012/06/19/spring-roo-and-webflow-ken-rimple-co-author-spring-roo-action?force=551).

```
Copy	 <LI>

		Michal Letynski has a nice post on using 
		<a href = "http://java.dzone.com/articles/spring-31-valid-requestbody">
		Spring 3.1's support for the <CODE>@Valid</CODE> annotation on <CODE>@RequestBody</CODE> controller method arguments</A>.

		  </LI>
 <LI> I suspect we probably covered some of these before, but just to be sure, I wanted to point everybody to this series of blogs introducing the concepts of <a href = "http://biju-allandsundry.blogspot.com/2011/08/simple-introduction-to-aop-session-1.html">AOP, and how they're implemented in practice using the raw JDK, Spring's AOP and AspectJ, which Spring has fantastic support for</a>. For the other blogs, simply scroll to the bottom of the page and you'll find links.  </LI> 
 <LI>  
	Madhusudhan Konda, author of O'Reilly's <em>Just Spring</em> and <em>Just Spring Integration,</em> has a new book - this one, called <a href = "http://shop.oreilly.com/product/0636920025405.do"> <em>Just Spring Data Access</em></A>, which introduces the nitty gritty of the core data-access technologies in the Spring framework (it does not, however, introduce the  <a href = "http://www.springsource.org/spring-data">Spring Data</A> technologies).  While I haven't read it (though I'll be sure to read it eventually and  possibly write a book review!), it looks interesting.
</LI> 
	<LI>  Arnon Rotem-gal-oz has <a href = "http://java.dzone.com/articles/rabbitmq-and-short-intro-amqp">written a good over-coffee introduction to AMQP and RabbitMQ terminology</A> (if not their application. For that, you might check out this blog <a href = "http://blog.springsource.org/2011/01/25/green-beans-getting-started-with-enterprise-messaging-and-spring/">introducing the Spring support for JMS and AMQP</A> ). 
		  </LI> 

	 <LI>
		
```

The VoltDB blog has a pretty nice writeup of how to implement repositories with [Spring and VoltDB to build high throughput web applications](http://voltdb.com/company/blog/building-high-throughput-web-app-spring-mvc-and-voltdb).

```
Copy		Another great post from the VoltDB blog talks about using the Spring Converter API with VoltDB's Data Objects.  The idea is a bit unusual, but pretty slick when you think about it: <a href = "http://voltdb.com/company/blog/using-spring-converter-api-voltdb-data-objects">let Spring's generic <EM>converter</EM> registry handle converting Volt's notion of record sets (objects of type <CODE>VoltTable</CODE>) into regular, domain-specific objects</A>. You codify the recipe once - as a Spring <CODE>Converter</CODE>, and then simply reuse it later.  
			 In other data-access strategies, this same effect is achieved using, for example, the <CODE>RowMapper</CODE> callback interface, which lets you codify and reuse the recipe for converting a JDBC <CODE>ResultSet</CODE> into a domain-specific object.
			
	 Finally, all of these blogs come to a head in this <a href = "http://voltdb.com/company/blog/686k-tps-spring-framework-web-app-and-voltdb">blog introducing the performance tests done against the previous application</A>.	</LI>
```