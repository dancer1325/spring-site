---
title: This Week in Spring - July 10th, 2012
source: https://spring.io/blog/2012/07/11/this-week-in-spring-july-10th-2012
scraped: 2026-02-24T08:19:21.231Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  July 11, 2012 | 0 Comments
---

# This Week in Spring - July 10th, 2012

_Engineering | Josh Long |  July 11, 2012 | 0 Comments_

Welcome back to another installment of *This Week in Spring*. This week, I'm at [JAX](http://www.jaxconf.com) in San Francisco. We're having a good time, and happily answering questions from community members. As usual, though, we've got a lot to cover, so let's get on with the show.

1.  Martin Lippert has announced the latest versions of [SpringSource Tool Suite and the Groovy and Grails Tool Suites](http://www.springsource.org/node/3594).
2.  Chris Beams has announced that [Spring 3.1.2 has been released!](http://www.springsource.org/node/3593)
    
    ```
    Copy	</LI>
    <LI> Rob Winch has announced that <A href = "http://www.springsource.org/node/3588">Spring Security 3.1.1 has been released!  	</A>
    </LI>
    	 
     <LI>  Costin Leau has announced that <A href = "http://www.springsource.org/node/3588">Spring GemFire 1.1.2 has been released!  	</A>
    	</LI>
    
     <LI>   The Tech Annotation page has a great post on using some of  <a href = "http://techannotation.wordpress.com/2012/07/05/remoting-spring-rmi-and-http/">Spring's remoting technologies, RMI and HTTP invoker, to expose objects  to remote clients</A>.  </LI> 
    
    
    <Li>  
    	Chris Haddad  has   put together a nice article <a  HREF = "http://cloud.dzone.com/articles/how-deploy-spring-database">on using
    		 Spring on Cloud Foundry</A>.
    	 </LI>
    	
            
    <LI>  
     The Enterprise Development Ideas blog has a nice article <a href ="http://pfelitti87.blogspot.com/2012/07/rest-services-with-spring-3-xml-json.html"> on using Spring 3.1  to build RESTful services that support JSON and XML</A>.
    	 </LI>
     <LI> 
    ```
    
    Did you guys miss JAX, in San Francisco, this week? The talks that Chris Richardson and I have, and will, give are going to be online next week, but this week you should check [out the presentation on using Spring MVC and Backbone.js](http://www.slideshare.net/sebarmeli/mvc-on-the-server-and-on-the-client) together by Sebastiano Armeli-Battana, a community member who also spoke this week. Nice job, Sebastiano! Also: [be sure to check out the code](https://github.com/sebarmeli/JaxConf2012-SpringMVC_BackboneJS-Demo)!
    
    ```
    Copy </LI> <LI> 
    	 Would you like a sneak peak at how a master structures his application? Let 
    	
    	<a href = "http://gordondickens.com/wordpress/2012/07/03/enterprise-spring-best-practices-part-1-project-config/"> Gordon Dickens explain how he configures his application</A>. 
    	
    	 </LI> 
    
    <LI> The <EM>Code Tips and Tricks</em> blog has a nice post on using <a href = "http://lessonsincode.wordpress.com/2012/07/10/explicitly-defining-a-spring-mvc-annotation-based-controller/">Spring MVC without using the default Spring component scanning in place</A>.    
    	  </LI>
     <LI>  This VMware knowledge base article has a rather interesting tip that shows how to 
    	 <a href = "http://kb.vmware.com/selfservice/microsites/search.do?language=en_US&cmd=displayKC&externalId=2007015"> ask the Spring <CODE>ApplicationContext</CODE> which configuration resources  are being used.
    	 </A>
    	
    	</LI>
      <LI>This blog has a great look at customizing <a href = "http://thinkinginsoftware.blogspot.com/2012/07/round-half-up-using-annotation-driven.html"> formatting for Spring MVC with the use of a custom formatter</A>. </LI>
    <LI> 
    	 Peng Fei Xu  has  a quick <a href  ="http://s-xu.blogspot.com/2012/07/spring-framework-annotation-part-3.html">introduction to using Spring's Java configuration</A>.
    	  </LI>
    	
    	<LI> 
    		This blog has a <a HREF = "http://techforenterprise.blogspot.com/2012/07/handling-forms-with-spring-3-mvc.html">nice introduction to handling Forms with Spring 3 MVC</A>
    		
    		
    		 </LI>
    	
    ```
    
3.  The Java Code Geeks has a nice blog introducing [how Spring's custom namespace definitions work](http://www.javacodegeeks.com/2012/07/spring-custom-namespaces.html).

```
Copy<LI> The Apache Tomcat team has announced <a href = "http://www.tomcatexpert.com/blog/2012/07/09/apache-tomcat-7029-released">the immediate availability of Apache Tomcat 7.0.29</A>. 
```

-   The new release adds support for a default error pages
-   The servlet version defined in web.xml no longer determines if Tomcat scans for annotations when the web application starts. This is now solely controlled by metadata-complete element.
-   On web application start, JARs are now always scanned for ServletContainerInitializers regardless of the setting of metadata-complete

```
Copy</li>
```

7.  This is not a Spring-specific post, but instead pertains to AspectJ. AspectJ, of course, is very well supported as part of Spring's AOP story. In this blog, Thibault Delor introduces how to introduce a [useful `toString` method for all of your classes](http://java.dzone.com/articles/implementing-default-tostring).