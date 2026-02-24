---
title: This Week in Spring, December 20th, 2011 (Holiday Edition)
source: https://spring.io/blog/2011/12/20/this-week-in-spring-december-20th-2011-holiday-edition
scraped: 2026-02-24T08:29:37.330Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  December 20, 2011 | 0 Comments
---

# This Week in Spring, December 20th, 2011 (Holiday Edition)

_Engineering | Josh Long |  December 20, 2011 | 0 Comments_

```
Copy<IMG src = "http://www.springsource.org/files/rod-holidays.png" width = "300" style = " float : right;  margin-left : 10px;  " />
	<P> 
		Well, it's that time of the year again!  
```

The holiday season is upon us and many people will be celebrating! No matter what holiday you're celebrating (or if you're celebrating at all), let me wish you a wonderful week and the happiest of holidays.  
To tide you over we've packed this week's roundup to the brim.  
Enjoy!

  

  
2.  Santa's elves could learn a thing or two from the SpringSource engineers! [Alan Stewart announced Spring Roo 1.2.0 GA](http://blog.springsource.org/2011/12/17/spring-roo-1-2-0-release-available/) on *Saturday*. This version of Roo has caught the attention of a *lot* of people. While there are many new features, some of my favorites are the multi-module Maven project support (which lets you, for example, build your model classes in a separate project from your web application), support JSF / PrimeFaces scaffolding (as opposed to just GWT, Spring MVC, Vaadin, and Flex), support for services / repositories (using Spring Data JPA and Spring Data MongoDB; this is in addition to the Active record style data-access objects already available), and (more) flexible GWT support.
    
    ```
    Copy			  </LI>
    		<LI>  When Spring 3.1 was released last week, I imagine <a href= "http://www.springsource.org/spring-gemfire">Spring Data Gemfire</a> and <a href = "http://www.springsource.org/spring-data/redis">Spring Data Redis</a> lead Costin Leau hit a big red button that he had prepared for just this occasion. 
    		First, Costin released <a href ="http://www.springsource.org/node/3336">Spring Data Gemfire 1.1.0</a> , 
    			which has <EM>numerous</EM> features!  
    			 Besides supporting Spring 3.1 (including a 3.1-compatible implementation of the Spring Cache API), Spring Data Gemfire 1.1.0  supports PDX (the binary object serialization type supported by Gemfire) attributes on the <CODE>&lt;cache/&gt;</code>, <CODE>&lt;client-cache/&gt;</CODE> namespace, it provides dedicated support for indices, better support for <CODE>Region</CODE> creation, <CODE>CacheServer</CODE> support, queries with variable parameters, and a <code>MessageListenerContainer</CODE> like abstraction that works with Gemfire's continuous queries (CQs). The CQ support is the basis of the GemFire inbound adapter support available in Spring Integration 2.1, due any minute now.. 
    			
    			   </LI>
    		<LI> Then, Costin released <a href ="http://www.springsource.org/node/3337">Spring Data Redis 1.0.0</a>, a major milestone in of itself!   
    			
    				This release, besides being compatible with Spring 3.1, supports atomic counters, a <CODE>RedisTemplate</CODE>, data access exception translation (consistent with the support you expect from all of Spring's data access technologies), a <CODE>MessageListenerContainer</CODE> abstraction that builds on Redis' pub-sub support, and much more!
    			</LI>
     	
    		<LI> But Costin wasn't the only one sitting on a Spring 3.1 compatible release. <a href ="http://www.springsource.org/spring-social">Spring Social</a>   lead Craig Walls    <a href= "http://www.springsource.org/spring-social/news/1.0.1-released">announced Spring Social 1.0.1</a>, which, besides being Spring 3.1- and Spring Security 3.1-compatible, also provides numerous bug fixes and updates.  </LI>
    		
    		 <LI>  
    				Did you guys miss <a href= "http://www.springone2gx.com">SpringOne 2GX 2011</a>? Or, were you, like me, just not able to see all concurrent sessions because those rascally laws of physics prevented you from being in many rooms at the same time? Well, don't fret, <A href ="http://www.infoq.com">InfoQ</a> has recorded many sessions from the conference, and will put them up periodically. 
    ```
    
    -   The first video up is Roy Clarkson, lead of the [Spring Mobile](http://www.springsource.org/spring-mobile) and [Spring Android](http://www.springsource.org/spring-android) projects, and Keith Donald, Spring "web" dude and SpringSource co-founder, talking about [building better, native mobile web applications with PhoneGap](http://www.infoq.com/presentations/Making-the-Mobile-Web-Native-with-PhoneGap). And, to be fair, the only reason I missed this awesome talk is because I was busy preparing to give another talk of my own. What's *your* excuse, hrmm?
    -   Michael Hunger, [Neo4J](http://neo4j.org) mad-scientist and great guy, gave a talk at [SpringOne2GX on Spring Data Neo4J](http://www.infoq.com/presentations/Introduction-to-Spring-Data-Neo4j). Thanks again, [InfoQ](http://www.infoq.com)!
    
    ```
    Copy<LI> SpringSource consultant and engineer and all around great guy (seriously, if he's coming to your town, buy him a beer) <a href   = "http://www.dzone.com/links/r/messaging_for_modern_applications.html">Tom McCuch's talk about  messaging architectures in modern applications</a>  from SpringOne 2GX is up.    
    </li>
    <li>
    <a href="http://blog.springsource.org/author/peter-ledbrook/">Peter Ledbrook</a>, Developer Advocate for Grails, discusses running <a href="http://www.infoq.com/presentations/Grails-in-the-Cloud">Grails in the Cloud</a>. He compares the different cloud providers out there and looks at some of the best solutions for hosting your Grails applications.
    </lI>
    ```
    
3.  Oleg Zhurakousky, senior engineer at SpringSource and a major contributor to [Spring Integration](http://www.springsource.org/spring-integration), gave an interview to [InfoQ](httP://www.infoq.com) at JavaOne this year.
    
    Watch this interview as [Srini Penchikala (from InfoQ) and Oleg Zhurakousky talk about messaging, Spring Integration, and cloud architectures](http://www.infoq.com/interviews/oleg-zhurakousky-javaone2011-interview).
    
    ```
    Copy			  </LI> 
    		 			
    
        <LI> Greg Turnquist just announced <a href = "http://blog.springsource.org/2011/12/20/spring-python-1-1-1-1-2-1-and-1-3-0-rc1-are-released/">the latest releases of Spring Python, versions 1.1.1, 1.2.1, and 1.3.0.RC1</a>, the <em>Pythonic</EM> implementation of the Spring framework. These are two maintenance releases and one release candidate. Great stuff!
    		<LI> 
    			
    			Mihai Dinca-Panaitescu has written up a quick, but concise, blog on <a href= "http://java.dzone.com/articles/spring-3-and-application">how to configure beans using external values (property files, or external systems, all together) using Spring 3.0</a>.  
    			
    ```
    
    Of course, Spring 3.1 now also supports the `Environment` abstraction, which makes retrieving properties from Java configuration a snap. So, as usual, Spring gives you choices, and in this particular case you have three different ways to cross the finish line.
    
4.  In the same vein, Aurelien Broszniowski has blogged on [how to use Maven's property filtering to *set* a system property at runtime](http://java.dzone.com/articles/use-spring-create-system).
    
    Maven, for those of you who don't know, will automatically replace properties (of the same form as Spring's property support: `${foo}`, for example) if you enable resource filtering. So, the *build* can be differentiated by which Maven profile is active. The result is that you get one build for one profile, and another for another profile.
    
    Another way to handle this sort of thing might be to use Spring 3.1's `[@Profile](http://blog.springsource.org/2011/02/14/spring-3-1-m1-introducing-profile/)` support.
    
5.  Alex Staveley has put together a blog introducing, in practically no code at all, [how to use Spring's `RestTemplate`](http://java.dzone.com/articles/rest-spring-30-simple). There are two facets to this claim: Alex has a gift for brevity (which long time readers of this column will know I clearly do not) and `RestTemplate` really is *that* simple!
6.  Eugen Paraschiv is at it again! This time he's talking about [persistence and JPA data access with Spring 3](http://www.baeldung.com/2011/12/13/the-persistence-layer-with-spring-3-1-and-jpa/). This follows [Simplifying the Data Access Layer with Spring and Java Generics](http://www.baeldung.com/2011/12/08/simplifying-the-data-access-layer-with-spring-and-java-generics/) and [The Persistence Layer with Spring 3.1 and Hibernate](http://www.baeldung.com/2011/12/02/the-persistence-layer-with-spring-3-1-and-hibernate/). All of these are good reasons, and I wholly recommend them. One thing that should be pointed out, and Chris Beams, Spring framework committer, [does point out](http://www.baeldung.com/2011/12/02/the-persistence-layer-with-spring-3-1-and-hibernate/#comment-377082446), is that while this blog's example uses Hibernate 3, Spring 3.1 also supports Hibernate 4.
7.  ```
    Copy			Willie Wheeler has written up a blog detailing his approach to domain modeling using  <a href = "http://java.dzone.com/articles/domain-modeling-spring-data">Neo4j and Spring Data Neo4j</a>. 
    			
    			<a href ="http://www.neo4j.org">Neo4J</a>, of course, is the leading,  open source graph database, and <a href = "http://www.springsource.org/spring-data/neo4j">Spring Data Neo4j</a> makes taking advantage of Neo4j, and integrating graph domain models with existing JPA domain models, a sinch. Check out this blog for a real-world example of how. 
    			  
    			  </LI>		<LI>
    					 The many enhancements in Spring 3.1 sure have gotten a lot of people excited. Blogger Rafal Borowiec is among them, and has put together a comprehensive enumeration of <a href = "http://blog.goyello.com/2011/12/16/enhancements-spring-mvc31/">the top five
    					new features in Spring MVC 3.1</a>, citing the flash attributes support, improved JSR 303 validation support,     form-encoded <code>PUT</CODE> requests, and Java based configuration, among others. For more, and for examples, check out the blog!
    				</LI>
    				<LI> Long time Spring community superstars Cake Solutions has a great blog on <a href = "http://www.cakesolutions.net/teamblogs/2011/11/28/we-still-like-spring/">using Spock Extensions to simply integration testing with Spring</a>. Definitely worth a read, so check it out!   </LI>
    		<LI>  
    			Have you read Jim Webber's seminal <EM><a HREF = "http://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=3&ved=0CC4QFjAC&url=http%3A%2F%2Fshop.oreilly.com%2Fproduct%2F9780596805838.do&ei=WWvvTunRFMGQiAKftPi8Ag&usg=AFQjCNEWzzYfeDrtYro1a5A3NH6jjUx-Eg&sig2=f7lkOqKfdKuxs2Q_Y14DhQ">REST in Practice</a></EM>? The book describes, among other things, how to use REST. That is, it's one thing to think of REST as being an HTTP-centric RPC mechanism, but to really grok it is something else entirely. On this subject, I can recommend no finer reference than Jim's book and  of course <a href = "http://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm">Roy Fielding's original work</a>. In Jim's book, however, he establishes an example of an automated coffee shop, <EM>RestBucks</EM>, which exposes an API. (This example itself is a twist on the example established in the simialarly seminal <EM>Patterns of Enterprise Architecture</EM>)  
    			It's a wonderful book, a fantastic example, and, more to the point,  it makes perfect fodder for blogger "Furious Bob" to <a href= "http://www.dzone.com/links/r/spring_31_rest_no_xml_caching_support_etag_and_ha.html">demonstrate a cleanly architected   application using Spring 3.1's enhanced REST support</a>.   
    			
    			 </LI> 
    
        <LI>  Tobias Flohre has put together a rather inspired post on <a href  = "http://blog.codecentric.de/en/2011/12/swt-and-springs-configurable-dependency-injection-for-the-ui">using Spring (and <CODE>@Configurable</CODE>) together with SWT</a>, the UI toolkit used to build such popular applications as Eclipse and SpringSource's very own <a href = "http://www.springsource.com/developer/sts">SpringSource Tool Suite</a>.  </LI>
    		<LI> GWT 2.4 surfaced the <CODE>RequestFactory</CODE> SPI, which is a framework SPI for the <EM>Service Locator</EM> pattern.  
    			So, blogger <EM>imrabti</EM> has details <a href  = "http://crazygui.wordpress.com/2011/09/23/spring-gwt-integration-using-the-requestfactory-api/">how to wire Spring as the <em>service locator</EM> for your GWT applications</a>. Naturally. There were actually a couple of blogs along this thread this week, but I saw this one first and the recipe is fundamentally the same. 
                        
    			</LI>
    		<LI>  
    			Jasypt, a simplified encryption library that integrates naturally with Spring and Spring Security, has <a href = "http://www.dzone.com/links/r/jasypt_19_published_java_simplified_encryption_su.html">just released Jasypt version 1.9.0</a>. Check out the <a href = "http://www.jasypt.org/whatsnew19.html"><EM>What's New</EM></a> section for the lowdown on the new features. Of particular   interest to the  Spring developer of late? The  3.1 support! 
    			</LI>
    		<LI> Blogger and <a href = "http://www.packtpub.com/spring-roo-1-1-cookbook/book"><EM>Spring Roo 1.1 Cookbook</EM></a> author Ashish Sarin has written a blog on how to <a href = "http://spring-roo.blogspot.com/2011/12/adding-json-support-to-domain-objects.html">add JSON support to domain entities and controllers using Spring Roo</a>. Nice job, Ashish!  </LI>
    		<LI>
    ```
    
    [*Spring in Practice*](http://www.manning.com/wheeler/) author and blogger Willie Wheeler has written a blog that would've helped me just the other week! In the blog, Willie describes [how to enable Jackson (a JSON serialization library) to use JAXB2 (an XML serialization standard with several implementations) annotations with the Spring OXM library](http://www.dzone.com/links/r/configuring_jackson_to_use_jaxb2_annotations_with.html). Spring, of course, provides the Spring object-to-XML (or, OXM) module as part of its core. The inspiration is that, if you want to generate RESTful views of your entities, you need to use something like JAXB for the XML view and Jackson for the JSON view. If you want to configure the mapping from Java object to another serialization, you usually annotate the Java object with annotations, which yeilds domain entities with redundant mapping annotations (one for JSON, one for XML!). Well, now you can use the same JAXB2 annotations for both purposes. Now, if we could just reduce the redundancies between JAXB and JPA...
    
    ```
    Copy			 </LI>
    		<LI> 
    			 Self described "Spring afficianado" (he certainly seems like one to me!) Shekhar Gulati has written about how he bootstrapped a proof-of-concept using  <a href = "http://www.springsource.org/roo">Spring Roo</a> and then added support for MongoDB replica sets using <a href = "http://www.springsource.org/spring-data/mongodb">Spring Data MongoDB</a>.  
    			
    			The blog shows <a href = "http://whyjava.wordpress.com/2011/12/12/using-mongodb-replica-set-with-spring-mongodb-1-0-0-rc1/">the Spring Roo commands and the Spring Data MongoDB integration</a> in detail.
    			  </LI>
                  		
                        <LI>Shekhar has got another post worthy of inclusion this week on how to <a href ="http://www.dzone.com/links/r/deploying_spring_roo_applications_on_jboss_as7.html">use Spring Roo to deploy an application against JBoss 7</a> (leveraging a <CODE>javax.sql.DataSource</CODE> configured in JBoss). Short and simple, as is the Roo way.  </LI>
    
                  
    		<LI>
    			
    			Gee, there's lots of GWT represented in this week's roundup! Frank Hinkel has contributed a blog about <a href = "http://frankhinkel.blogspot.com/2011/12/spring-web-and-smartgwt-integration.html">using Spring as the REST endpoint to a GWT  client</a>. To keep things interesting (if a bit odd!), he even uses a CDI security library through a Spring-CDI bridge on top of Spring to secure the Spring controller. He goes through the nitty gritty detail of how the development workflow works for a particular, open source application he's building called  "openKanban."  
    	
    	 </LI>	
     		<LI>  
    	 The Java Code Geeks have a blog that details <a href = "http://www.javacodegeeks.com/2011/12/configure-logback-logging-with-spring.html">how to use a <CODE>BeanPostProcessor</CODE> to systematically inject 
    	  SL4J <CODE>Logger</CODE> for any field that has a <CODE>@Log</CODE> annotation on it</a>. 
    	 This post is memorable for many reasons: one, it's <EM>useful</EM>! Additionally, it demonstrates how easy it is to have the container handle situations that  it doesn't already know how to handle without waiting for a new release. Remember, the very large majority of the Spring framework APIs are built on the same SPIs that are extended for everyday users!  
    	 </LI>
    	</OL>
    ```
    
    That's it for this week! Happy holidays, and c'ya next week!