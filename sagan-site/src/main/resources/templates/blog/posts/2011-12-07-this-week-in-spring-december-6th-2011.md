---
title: This Week in Spring, December  6th, 2011
source: https://spring.io/blog/2011/12/07/this-week-in-spring-december-6th-2011
scraped: 2026-02-24T08:31:00.533Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  December 07, 2011 | 0 Comments
---

# This Week in Spring, December  6th, 2011

_Engineering | Josh Long |  December 07, 2011 | 0 Comments_

Welcome back to another installment of *This Week in Spring*.

```
Copy     We're in December, folks. I just can't believe that it's already December. 
```

Um, OK, ignore me.  
Just astonished. Let's get into the roundup because there is a *lot* of new content this week.

1.  Did you miss [SpringOne](http://www.springone2gx.com)? Well, that's a shame. You missed out on a lot. However, don't fret, our friends at [InfoQ](http://www.infoq.com) are riding to the rescue with a steady stream of videos from the different talks at SpringOne2GX. The first two talks on the docket? The opening keynote with SpringSource CTO Adrian Colyer, [SpringOne 2Gx Keynote - Spring, Yesterday, Today and Tomorrow](http://www.springsource.org/node/3321).
    
    ```
    Copy		On day two, <a href= "http://www.springsource.org/node/3322">Ben Alex lead the SpringOne 2GX technical keynote</a>, a procession of 
    		  demonstrations and thought provoking insights into next generation application development with Spring and on the cloud.
    		
    		 </LI> 
    		
    		
    		<LI> <a href = "http://www.twitter.com/ramnivas">Ramnivas Laddad</a>, all around great guy and one of the brilliant, mad scientists on 
    			 the <A href= "http://www.cloudfoundry.org">Cloud Foundry</a> team (not to mention one of the mad scientists on the Spring team), has put together a quick video on  <a href = "http://www.springsource.org/DeploySpringAppsOnCloudFoundry">deploying Spring applications to  Cloud Foundry</a>. 
    			 </LI>
    		
    	 <LI> <a href = "http://www.springsource.org/node/3325">  Spring Data JPA  1.0.2   has been released</a>. 
    	
    	
    	This new release has a lot of new features, 	including  query creation for <CODE>Comparable</CODE> values, 
     fixed alias detection when entity name contains a number,
    	 
    	an update to QueryDSL 2.2.5,
    		fixed auditor mappings in <CODE>AbstractAuditable</CODE>, 
    		consolidateted <CODE>Expression</CODE> creation for property references and sort orders,
    		and fixed dependency injection in <CODE>QueryDslRepositorySupport</CODE>.
    	 
    	
    	There are lots of  new features in this release that I've not mentioned here, and, even better, there's a 
    	 lot of new features already in the development pipeline for 1.1 RC1. 
    	One of the new features in the works? 		
    	<a href = "https://jira.springsource.org/browse/DATAJPA-73">Support for locking</a>, which lets you apply declarative locking  
    ```
    
    to your repository queries.
    

```
Copy<LI>   
	 <a HREF ="http://twitter.com/#!/forjared">Jared Rosoff (10gen)</a> and <A href="http://blog.springsource.org/author/trisberg/">Thomas Risberg (SpringSource)</a>   
		
		show <a href= "http://www.springsource.org/UsingMongoDBAndSpringInTheCloud">the power of the combination of MongoDB, Spring and Cloud Foundry</a> in this video. 
		
		I just gave a talk on Mongo DB and Spring on Cloud Foundry at the Mongo Seattle event, on the same day this was made available. As soon as I got back to my hotel room, I rushed to watch this talk. These guys are giants, and I always learn something from them.
		Umm... so... what are you waiting for! 
		
		
		Go! Enjoy! 
		
		
	 </LI>
	 <li>
	Dr. David Syer,  lead of the Spring Batch project and SpringSource mad scientist at large, 
	has written about 
	<a href= "http://blog.springsource.org/2011/11/30/10317/">cross site request forgery and OAuth2</a>. 
		
		Dave's gift is that he can tackle <EM>really</EM> complex things and reduce them to 
		 chunks that can be consumed by the rest of us. It's what makes him one of the best developers out there, and it's what makes the articles that he writes absolutely amazing.    </LI>
	
 <LI> Mrabti Idriss has written a  high level overview of his application's <a href= "http://crazygui.wordpress.com/2011/12/06/spring-gwt-software-architecture-for-scalable-applications-part-1/">GWT-based Spring and GWT architecture</a>.   
```

There's not a lot of details here, because he describes a real-world application with many moving parts, but it's useful to see how the pieces stack together.

5.  ```
    Copy		 The <a href= "http://static.springsource.org/spring-security/site/">Spring Security</a> project's  used by a good deal many people in all sorts of ways. 
    		 This tutorial / blog introduces 
    		   <a href= "http://javarevisited.blogspot.com/2011/11/ldap-authentication-active-directory.html">how to setup  
    		LDAP Active Directory authentication in  with Spring Security</a>. 
    		 </LI>
     <LI>   
    	
    	<a href=  "http://www.meetup.com/AtlantaSpring/events/39659132/">Atlanta Spring User Group</a> leader  and SpringSource engineer Gunnar Hillert has published the deck he used when he presented <a href= "http://www.dzone.com/links/r/cloud_foundry_for_spring_developers_slides.html">Cloud Foundry for Spring Developers</a>.
    	 </LI>
     <LI>   
    	
    ```
    
    Using Hibernate? This blog, by frequent Spring blogger [Baeldung](http://twitter.com/baeldung),  
    introduces
    
    ```
    Copy<a href=  "http://www.baeldung.com/2011/12/02/the-persistence-layer-with-spring-3-1-and-hibernate/">how to use Hibernate's  contextual sessions  with Spring's declarative  transaction management 
     support</a>.
    
    	 </LI>
       <LI> Running Spring 1.x and looking to migrate to Spring 3? Using Quartz? This blog 
                 recounts <a href= "http://java.dzone.com/articles/library-migration">one developer's migration to Quartz 1.8.x and Spring 3.0.x</a> along with new example code.  		
     Concise, and straight to the point. Check it out! That said, be warned that Spring 3.1's <EM>very</EM> imminent and it will support 2.0. So, if you're going to jump, <a href="http://blog.springsource.org/category/spring/31/">jump to 3.1</a>! 
      </LI>   
    
      <LI> <a href = "http://www.tomcatexpert.com/blog/2011/12/07/apache-tomcat-6035-released">Apache Tomcat 6.0.35 has been released</a>. 
    		Apache Tomcat 6.0.35 is primarily a security and bug fix release. All users of older versions of the Tomcat 6.0 family should upgrade to 6.0.35. 
    	 </LI>
       <LI>   
    	Adobe Technical Evangelist Christophe Coenraets demonstrates <a href= "http://tv.adobe.com/watch/adc-presents/flex-and-spring-for-mobile">how to build mobile applications with Flash Builder and BlazeDS and Spring Flex</a> in this short video.   
    	 </LI> 
    	
    	
    <LI> 
    		<EM>Les experts d'Infotel</EM> have published a blog introducing <a href="http://blogdesexperts.infotel.com/?p=613">how to deploy applications to CloudFoundry.</a> 
    		
    		This is a useful blog that provides a lot of up-to-date information and is highly recommended.  This article is written in French, but through the magic of Google Translate and the fact that code's a pretty universal language, there's a lot to be had here.
    ```
    
6.  http://www.ensor.cc/2011/12/spring-31-cloud-foundry-local.html

```
Copy	<LI> Mike Ensor has also written up a great, <a href= "http://www.ensor.cc/2011/12/spring-31-cloud-foundry-local.html">concise introduction to getting started with Cloud Foundry</a>.
		  
		</LI>
</oL>
```