---
title: This Week in Spring, February 21st, 2012
source: https://spring.io/blog/2012/02/22/this-week-in-spring-february-21st-2012
scraped: 2026-02-24T08:26:09.025Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  February 22, 2012 | 0 Comments
---

# This Week in Spring, February 21st, 2012

_Engineering | Josh Long |  February 22, 2012 | 0 Comments_

Wow! Another week's come and gone, and, as usual, a *lot* of great content's been created for the community, and often by the community. Let's get to it!

```
Copy<OL> 
	<LI> First, the big news: <a href ="http://www.springsource.org/node/3476">Spring Framework 3.1.1's Been Released</A>!  
	 
	   The first maintenance release in the Spring 3.1.x line is now available via Maven Central, the <a href="http://repo.springsource.org/release">SpringSource repository</a>, or for direct download from our <a target="_blank" href="http://www.springsource.com/download/community?project=Spring%20Framework&amp;version=3.1.1.RELEASE">community download page</a>.  This release includes many <a href="https://jira.springsource.org/secure/ReleaseNote.jspa?projectId=10000&amp;version=12706">important bugfixes and minor improvements</a> and is a recommended upgrade. 
		</LI>
	<LI> <a href = "http://www.springsource.org/node/3475">Dr. David Syer's SpringOne2GX talk, <EM>Identity Management With Spring Security,</EM></A> 
		
```

covers Single Sign On, security standards (including SAML, OpenID, OAuth, SCIM, JWT), how Spring Security can fit in, as well as demoing identity management as a service.

-   [Roy Clarkson](http://blog.springsource.org/author/rclarkson/) and [I](http://blog.springsource.org/author/jolong/) gave a talk at SpringOne 2GX 2011 [introducing Native Android Development Practices](http://www.springsource.org/node/3474) . The session covers Spring MVC support for device detection, REST implementation for handling device requests and Spring Android support for organizing calls from the mobile client to the server.
    
-   Spring Social Lead Craig Walls announced [Spring Social LinkedIn 1.0.0 RC1](http://www.springsource.org/spring-social/news/spring-social-linkedin-1.0.0.rc1-released). This releases sees the finalization of the support for the LinkedIn API, thanks to community contributions.
-   The [new Micro Cloud Foundry version, 1.2, has been released](http://blog.cloudfoundry.com/post/13481010689/micro-cloud-foundry-streamlines-offline-support-and-adds-java-debugging) and features a whole slew of new features, including an easier offline experience, and debugging support in SpringSource Tool Suite.
-   InfoQ has published Cloud Foundry architect [Derek Collison's talk from SpringOne2GX 2011, *Cloud Foundry Inside the Machine*](http://www.infoq.com/presentations/Cloud-Foundry-Inside-the-Machine), which offers a detailed look at [Cloud Foundry](http://www.cloudfoundry.org)'s architecture. This perspective can inform our work as developers on Cloud Foundry.

```
Copy<LI>  In the SpringOne 2GX video, <a href="http://www.springsource.org/node/3473">Tuning Java for Virtual Environments with EM4J</A>, <a href= "http://blog.springsource.org/author/bcorrie/">Ben Corrie</A> provides a    
```

thorough overview of Java memory management, how things work differently in virtual environments and what you can do about it to avoid problems.

```
Copy<Li> 
```

If you missed the [recent Cloud Foundry webinar](http://webinars.cloudfoundry.com/) that covered Spring development, you can [catch the video replay](http://www.youtube.com/watch?v=5UwMw4DNHsQ&list=UU0ZYS0Y7b5oiVLvxGf4magw&feature=plcp) on [the Cloud Foundry YouTube channel](http://www.youtube.com/user/CloudFoundry). In this video, [Ramnivas Laddad](http://blog.springsource.org/author/ramnivasl/) shows you how to take a real Spring application and target it to Cloud Foundry using both [STS](http://www.springsource.com/developer/sts) and the vmc command line.

```
Copy</LI>
<LI> 
	Spring Data Document Lead Oliver Gierke announced that <a href ="http://www.springsource.org/node/3472">Spring Data Mongodb 1.0.1 GA has been released</A>.
		 
	 
	</Li> 
	
	
	
	
	
	
	
	
	
	
	
	<li> Javier Manzano's posted a blog about <a href = "http://www.jmanzano.es/blog/?p=163&lang=en"> efficient RESTful services with Spring Android</A>.  Interestingly, I also found <a href="http://www.jmanzano.es/blog/?p=163">this blog, in Spanish, which seems to be the same thing, just translated.</A>
		
		</LI>
	
	
	 <li> The Java CodeGeeks has an article up, <A href ="http://www.javacodegeeks.com/2012/02/set-up-spring-3-development-environment.html"> on setting up a Spring 3 Development environment</A>. The article introduces the basics, but you can shortcut most of those steps by setting up a JDK and <a href="http://www.springsource.com/developer/sts">STS</A>, as commenters note at the bottom of the page.
		</lI>
	
```

-   ```
    Copy In this blog, on <a href ="http://glenn-renfro-dev.blogspot.com/2012/02/adding-attachement-to-email-via-spring.html">Sending Email Attachments with Spring Integration</A>, blogger <EM>Glenn</EM> introduces Spring Integration, the flow of a use case that requires email attachments, and  example code, to boot! </li>
    	
    ```
    
-   [Artur Mkrtchyan introduces Spring Data & MongoDB](http://java.dzone.com/articles/spring-data-mongodb) in this DZone article. He first establishes an example in code, and then introduces the cleaner Spring Data Document-based code.

```
Copy<LI> Also on DZone, blogger Roger Hughes has written up a great article on the handy class, <a href = "http://java.dzone.com/articles/using-springs?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+javalobby%2Ffrontpage+%28Javalobby+%2F+Java+Zone%29">the <CODE>SimpleMappingExceptionHandler</CODE></A>, which maps exceptions to error pages in Spring MVC.
	</LI>
	  <LI> 
		Blogger <a href="http://ngjweb.wordpress.com/author/ngjweb/">ngjweb</A> has written up a great overview on 
		 <a href= "http://ngjweb.wordpress.com/2012/02/18/securing-spring-faces-webflow-2-spring-security-3-application/">Securing Spring Faces Webflow 2 flows with Spring Security 3</A>. 
			
			</LI>
	 
```