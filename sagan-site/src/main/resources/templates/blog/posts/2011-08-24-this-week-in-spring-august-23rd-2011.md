---
title: This week in Spring: August 23rd, 2011
source: https://spring.io/blog/2011/08/24/this-week-in-spring-august-23rd-2011
scraped: 2026-02-24T08:36:11.885Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  August 24, 2011 | 0 Comments
---

# This week in Spring: August 23rd, 2011

_Engineering | Josh Long |  August 24, 2011 | 0 Comments_

Welcome to another edition of *"This Week in Spring"* Things are moving fast and furious as we near next week's [VMworld 2011](http://www.vmworld.com). I want to invite any attendees to visit your expert technologists at the VMWorld Spring booth. Let me know if you read this weekly roundup. Lots to talk about this week, so let's get to it!

```
Copy<li>The preliminary session schedule has been published for <a href="http://www.springone2gx.com">SpringOne 2GX 2011</a>. This year's show is going to be another fantastic mix of deep technical content, cutting edge development and the absolute best place to learn about everything in the Spring universe. Be sure to <a href="http://springone2gx.com/conference/chicago/2011/10/register">register now</a>!</li>

<LI> <a href="http://static.springsource.org/spring/docs/3.0.6.RELEASE/changelog.txt">Spring 3.0.6's was just released!</a>   		 
	 This release addresses over 50 minor issues and includes about a dozen small improvements. Be sure to read the <a href="http://static.springsource.org/spring/docs/3.0.6.RELEASE/changelog.txt">Change Log</a> for all the details and <a href="http://www.springsource.com/download/community?project=Spring%20Framework&version=3.0.6.RELEASE">download</a> the bits as soon as possible. 		
	</LI>	
    
    
	<LI> <a href="http://www.springsource.org/node/3208">Spring Data Graph 1.1.0 with Neo4j support</a> has just been released. The new version features improved support for the latest and greatest Neo4j iteration, (1.4.1), as well as improved support for queries. You can now build repositories using Spring Data Graph with much greater ease. Also, the project's been renamed to reflect its core focus, Neo4j, thus, this will be the <EM> Spring Data Neo4j</EM> project, going forward. This rename is already evident in the packages in the project. 
		
		  
	</LI> 
```

2.  Eclipse Gemini Blueprint lead Costin Leau chimes in to note that [Eclipse Gemini Blueprint 1.0.0.RELEASE has just been released](http://www.springsource.org/node/3211)! The 1.0.0.RELEASE completes the [migration](http://www.springsource.org/node/2178) of Spring DM to the Eclipse Foundation (see this [guide](http://www.eclipse.org/gemini/blueprint/documentation/migration) for more information). Nice job, guys!
3.  ```
    CopyI like <a href="http://www.cloudfoundry.org">CloudFoundry.</a> Others may not be using CloudFoundry, as it is relatively new. Some might still be using Google App Engine, for example. And that's OK. Spring always has been, and will continue to be, about portability and choice. So it is great to see a post that demonstrates <a href="http://www.springsource.org/node/3207">it is easy to get Spring Roo applications running on Google App Engine</a>, too!  </LI>
    ```
    
4.  The Spring Integration repository has changed addresses! Formerly, the repository was hosted on [git.SpringSource.org](http://git.springsource.org), but it is now hosted under the [SpringSource Github.com presence](https://github.com/SpringSource/spring-integration).
5.  Ken Rimple [has another great post](http://java.dzone.com/articles/now-you-can-choose), this time on the upcoming Spring Roo 1.2 release, which features support for both the [ActiveRecord](http://martinfowler.com/eaaCatalog/activeRecord.html)\-style entities that Roo has traditionally generated as well as services, which many will no doubt be familiar with. While it's always been possible to use services in conjunction with Spring Roo, this new release makes it a natural part of the workflow.
6.  Agile developer Tarun Sapra, at Xebia India, has [written a nice post](http://tarunsapra.wordpress.com/2011/08/21/spring-singleton-request-session-beans-and-thread-safety/) on the golden rule of when to use to Spring's `singleton` concept: only use singletons for beans that don't have to have *client-specific* state. While he poses the golden rule slightly differently, I think the distinction is important. Spring beans can themselves maintain state, but they must guard that state from mutations by multiple (and often concurrent) clients.
    
    ```
    CopyA lot of times, too, Spring lets you work as though you have client-specific state, but are in fact using a singleton. An example of this is in the way Spring supports injection of the JPA <CODE>EntityManager</CODE>, which is <EM>not</EM> thread-safe. Spring intercepts calls to the EntityManager proxy that's injected and then, in a thread-local, creates an EntityManager so that each request <em>effectively</em> has client-specific state, but they can program in terms of single-threaded access. 
    ```
    
    That said, this post is a very good read.
    
7.  TomcatExpert.com comments on the [support for explicit release of JNDI resources in Apache Tomcat](http://www.tomcatexpert.com/blog/2011/08/17/new-closemethod-jndi-resources). Apache Tomcat 7 contains a number of new features around database connection pooling, which help administrators keep their application available and serving content, collecting customer information, and supporting their applications. The main one that has garnered a lot of attention is the new JDBC Connection Pool feature introduced by Filip Hanik last year. Another connection pool attribute not yet discussed here on TomcatExpert.com is the new `closeMethod` for speeding up the closing of JNDI resources that would otherwise be closed during garbage collection.
    
    ```
    Copy	</lI>
    	<LI> This <a href="http://www.ibm.com/developerworks/web/library/x-springandroid/index.html">post</A> by Deepak Vohra on IBM's DeveloperWorks has some great information on using Spring Android's <CODE>RestTemplate</CODE> support to consume RESTful web services (which, in this example, were developed using JAX-RS). Interoperability is king, and Spring's REST support makes it easy.
    ```
    

```
Copy<LI><a href="http://www.dzone.com/links/r/spring_integration_with_mvc_freemarker_jsp_webser.html">This fantastic post covers using  FreeMarker</a> (via the <CODE>org.springframework.web.servlet.view.freemarker.FreeMarkerViewResolver</CODE> view resolver) for Spring MVC views</a>. I like FreeMarker, and it has a lot to offer compared to straight <CODE>JSP</CODE> (and even compared to straight <CODE>JSPX</CODE>!) The take away, for me, is that Spring MVC supports lots of options, and provides SPIs that make it very simple to integrate new technology for each of the core pieces of the integration.
```

Great stuff!

10.  ...which brings me to [this implementation of a Spring MVC view](https://github.com/sps/mustache-spring-view) by a Sean Scanlon, supporting [Mustache.js templates](http://mustache.github.com/). Great stuff, too!

```
Copy         <LI>  Blogger Mkyong has posted a tutorial <a href="http://www.mkyong.com/spring-security/spring-security-hello-world-example">introducing how to use Spring Security 3.</a>
     The tutorial covers the basics of setting up Spring Security 3 with Maven 3 for a simple web application login scenario.  

     </LI>

<LI> 
	<a href="http://www.tomcatexpert.com/blog/2011/08/19/apache-tomcat-6033-released">Apache Tomcat 6.0.33 has been released!</a>
	 
	
	 

	Apache Tomcat 6.0.33 is primarily a security and bug fix release. All users of older versions of the Tomcat 6.0 family should upgrade to 6.0.33.

	Note that is version has 4 zip binaries: a generic one and three bundled with Tomcat native binaries for different CPU architectures.

	Apache Tomcat 6.0 includes new features over Apache Tomcat 5.5, including support for the new Servlet 2.5 and JSP 2.1 specifications, a refactored clustering implementation, advanced IO features, and improvements in memory usage.

	 
</LI>
```