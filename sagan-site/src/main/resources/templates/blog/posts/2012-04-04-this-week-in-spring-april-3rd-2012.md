---
title: This Week in Spring - April 3rd, 2012
source: https://spring.io/blog/2012/04/04/this-week-in-spring-april-3rd-2012
scraped: 2026-02-24T08:24:13.339Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  April 04, 2012 | 0 Comments
---

# This Week in Spring - April 3rd, 2012

_Engineering | Josh Long |  April 04, 2012 | 0 Comments_

Welcome to another Installment of *This Week in Spring* The [Cloud Foundry Open Tour is well underway](http://opentour.cloudfoundry.com/), and have been thus far very good events to attract community.

```
CopyThere are still some (well, there were yesterday!) early bird spots in the upcoming shows in <a href = "http://opentour.cloudfoundry.com/2012/austin">Austin</A>, <a href = "http://opentour.cloudfoundry.com/2012/washington">Washington D.C.</a>, <a href = "http://opentour.cloudfoundry.com/2012/kiev">Kiev</A>, <a href = "http://opentour.cloudfoundry.com/2012/moscow">Moscow</A>, and <a href  = "http://opentour.cloudfoundry.com/2012/london">London</A>, so book now. 
```

1.  Some of the wonderful content [from the Spring I/O conference is now available online](http://www.youtube.com/user/videosatsistemas?feature=watch)! The [conference](http://springio.net/), held in Spain in February of this year, is conducted in both Spanish and English, so there's a lot to like no matter which language you speak. [Adrian Colyer's keynote session is super](http://www.youtube.com/watch?v=axOPJbrIjkY#t=6m55s), once you get past the audio problems at the beginning. I couldn't find a SpringIO-specific hash tag, but you can pick them out of the other videos pretty easily by scrolling down. Stay tuned, there should be even more content posted, soon.

```
Copy <LI> Tobias Fiohre (who  seemingly lives  <EM>only</Em> to please us, the lucky developers in the  Spring community!)  has put up the third installment of his blogs  on <a href = "http://blog.codecentric.de/en/2012/03/transactions-in-spring-batch-part-3-skip-and-retry/">Spring Batch and transactions</A>. 
	The first <a href = "http://blog.codecentric.de/en/2012/03/transactions-in-spring-batch-part-1-the-basics/">one introduced the basics</A>, and the <A href ="http://blog.codecentric.de/en/2012/03/transactions-in-spring-batch-part-2-restart-cursor-based-reading-and-listeners/">second one introduced restart and cursor-based readers and writers</A>.
	
	</LI>

 <LI> The Cake Solutions gang has two wonderful posts on the nuances of using  <a href = "http://www.cakesolutions.net/teamblogs/2012/03/29/neo4j-spring-data-scala/">Spring Data Neo4j from Scala</A>.  Confusingly, there is a subsequent blog, called <a href = "http://www.cakesolutions.net/teamblogs/2012/04/03/spring-data-neo4j-and-mongodb/">Spring Data Neo4j and MongoDB</A> which has more to do with how to write a domain model using the Spring Data Neo4J and MongoDB annotations together, in Scala, than on how to actually use Spring Data MongoDB. But, knowing them, I trust that just means we'll have something wonderful to look forward to next week! </LI>

		<li> The NovoJ blog has a great look <a href = "http://blog.novoj.net/2012/03/27/combining-custom-annotations-for-securing-methods-with-spring-security/">at composing custom security annotations in Spring Security</a> with a bit of <em>help</EM>. </LI>
			
			
<LI> I've had a few people ask me how to modularly turn on runtime features exposed as aspects in Spring. The answer's usually  <a href = "http://stackoverflow.com/questions/9998350/how-to-disable-method-interceptor-at-runtime">to conditionally enable or  disable the feature at the proxy or aspect level</A>, as described in this StackOverflow post.  For extra points, you might <a href = "http://static.springsource.org/spring/docs/3.1.x/spring-framework-reference/html/jmx.html">wire that property up to JMX</a> so that it can be easily changed from an operations console.   </LI>
<LI>
	Blogger Eren   has an interesting post explaining how to integrate <a href = "http://www.onlinetechvision.com/?p=566">JSF 2.1, Hibernate 4.1.0, Primefaces 3.1.1, Tomcat 7.0, and Spring 3.1.1</A>. It's got a lot of the moving parts correctly lined up, which is nice, and a testament to how far Spring can take you. But, I would suggest a few updates: first, you can use Spring to manage your JSF beans with the <a href = "http://static.springsource.org/spring/docs/3.1.x/spring-framework-reference/html/web-integration.html#jsf-springbeanfaceselresolver"><CODE>SpringBeanFacesELResolver</CODE></a>, making them fully managed components in Spring, and giving them access to all the benefits other Spring components benefit from.  
	 Additionally, I'd  probably use Java-style configuration, and avoid the extra layering imposed by having a DAO and a Service, which essentially just delegates to the DAO. These are, of course, just a matter of taste. Either way, good post! 
</LI>

<LI> The <a href = "http://voltdb.com/company/blog/integrating-voltdb-spring-framework">VoltDB</A> blog has a fantastic post on how to  integrate VoltDB - an in-memory distributed database - with the Spring framework. The blog sketches the outlines of a simple Spring integration. I'd recommend wrapping up the client creation login in a <CODE>FactoryBean</CODE>, which would let  people inject the <CODE>Client</CODE> directly. That said, this is a cool look at a cool technology. </LI>
```

3.  The *Java Revisited* blog has a great look at [how to limit the number of sessions in an application from Spring Security](http://javarevisited.blogspot.com/2012/03/spring-security-example-tutorial-how-to.html), which is the first point of entry in secured Spring applications.

```
Copy<LI>The Safari books blog has an interesting tip about using <a href = "http://blog.safaribooksonline.com/2012/03/28/spring-mvc-tip-returning-json-from-a-spring-controller/">JSON views from Spring MVC controllers</A>. The tip is over-specific, however. If you're using Spring MVC 3, or Spring 3.1, you don't need to actually use that configuration. You can simply setup a simple Spring MVC <CODE>@Controller</CODE> class with a method annotated with <CODE>@ResponseBody</CODE> on the return type  and - assuming your requests have an <CODE>Accept</CODE> header (<CODE>Accept: application/json</CODE>) in the request, and that you have Jackson (for JSON), or JAXB (for XML) on the class path  - then the response will be a JSON response.
	
	 </LI> 
	
	<LI>  Blogger Duck Ranger has an amazing post on the nitty gritty of <a href = "http://duckranger.com/2012/04/spring-mvc-dispatcherservlet/">what the  Spring <CODE>DispatcherServlet</CODE> does as the core  of Spring's web machinery</A>. Great post, and worth a read. So is <a href = "http://duckranger.com/2011/07/spring-mvc-3-0-with-sts-tutorial-part-i/">her previous post  introducing Spring Source Tool Suite, from last year</a>. 
		</LI>
		<LI> Blogger Tomasz Nurkiewicz  has a great post that explains how to <a href = "http://nurkiewicz.blogspot.com/2012/04/configuring-quartz-with-jdbcjobstore-in.html">setup a <CODE>JDBCJobStore</CODE> with Spring and Quartz</A>, the job scheduling engine.
			</LI>
			 <LI> The Java Code Geeks blog has a great roundup of the <a href = "http://www.javacodegeeks.com/2012/04/spring-remoting-support-and-developing.html">various remoting technologies supported by Spring</a>, including RMI, the HTTP Invoker, Hessian, Burlap, JAX-WS, JMS, and JAX-RPC complete with example RMI code.  
				 Developers who like the remoting  hierarchies in Spring core might also be interested in my repository on GitHub that I created several months ago to  <a href = "https://github.com/joshlong/spring-advanced-marhshallers-and-service-exporters">demonstrate how to provide Spring <CODE>ServiceExporter</CODE> and marshalling <code>HttpMessageConverter</CODE></a> (so that you can use these marshalling technologies with Spring MVC's REST support) implementations for Avro, Thrift, MessagePack, and Google Protocol Buffers, among others. 
				   </LI>
			<LI> Using Java FX? You'll need to secure it to do anything useful in a large deployment. The ZenJava explains <a href = "http://www.zenjava.com/2012/03/27/javafx-and-spring-security/">how to use Spring Security to secure your Java FX applications</a>. </LI>  
```