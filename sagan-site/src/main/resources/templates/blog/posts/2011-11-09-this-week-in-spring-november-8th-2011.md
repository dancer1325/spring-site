---
title: This Week in Spring, November 8th, 2011
source: https://spring.io/blog/2011/11/09/this-week-in-spring-november-8th-2011
scraped: 2026-02-24T08:32:40.671Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  November 09, 2011 | 0 Comments
---

# This Week in Spring, November 8th, 2011

_Engineering | Josh Long |  November 09, 2011 | 0 Comments_

Another fantastic week in the Spring community. Can you guys believe it's already the 8th of November? Where *does* the time go?

```
CopyIf you blink, we'll be in 2012 already! 
No time to waste - the year might change out from underneath us! - let's dive right into this week's roundup!
```

1.  Ramnivas Laddad, senior engineer on the Cloud Foundry project and a hero world wide to those who - like me - enjoy the use of AspectJ in their Spring applications, has put together a fantastic post shining a light on the specific [support for services (like MySQL, PostgreSQL, and RabbitMQ) in Cloud Foundry](http://blog.springsource.org/2011/11/04/using-cloud-foundry-services-with-spring-part-2-auto-reconfiguration/). This is the second post in a series. Read the first one to learn about [the basics of services on Cloud Foundry](http://blog.springsource.org/2011/10/13/using-cloud-foundry-services-with-spring-part-1-the-basics/). *Awesome* posts with great details.
2.  This next post is among the posts that made me smile this week. Roy Clarkson and I did a talk at [SpringOne 2GX](http://www.springone2gx.com) a few weeks ago on native Android development practices with Spring. We sat down the night before our talk and ran through our deck and demonstrations, only to realize that - in the interim weeks since everything was originally prepared, the delicate spider's web of configuration required to get Eclipse ([SpringSource Tool Suite](http://www.springsource.com/developer/sts)), Maven, and Android all speaking to each other and working correctly had been... *disturbed*. We did the talk with a non-Maven build with great success, but it still irked us that we had to switch to a regular Eclipse build so that the talk could proceed. Roy, always intrepid and fearless, has since figured out the right permutations of configurations required to get this all working again and - generous guy that he is - [he has documented everything in this blog](http://blog.springsource.org/2011/11/07/updated-maven-support-for-android-projects/). Check it out! (I know I did!)
3.  Tomcat Expert has another practical column on [administering and developing with Apache Tomcat 7](http://www.tomcatexpert.com/blog/2011/11/02/best-practices-securing-apache-tomcat-7). The post explains how to take the default security configuration Apache Tomcat 7 to the next level with a bit of background on the configuration options available.
    
    ```
    Copy</LI> 
    
    
    
    <LI> Roger Hughes <a href="http://java.dzone.com/articles/using-jsr-250s-postconstruct">introduces how to use JSR 250's <CODE>@PostConstruct</CODE> and <CODE>@PreDestroy</CODE> annotations</A> to replace the use of the corresponding Spring  callback interfaces, <CODE>InitializingBean</CODE> and <CODE>DisposableBean</CODE>.   </LI> 
    
    <LI>Michal Huniewicz explains <a href= "http://blog.m1key.me/2011/10/wizard-form-with-spring-mvc.html">how to create a wizard form with Spring MVC</a>.  
    	
     His solution's certainly one way to solve the problem (and worth a look), but as Spring MVC engineer Rossen  Stoyanchev  notes in the comments, developers should alternatively consider Spring Web Flow for these types of use cases, as well.
    	
    ```
    

```
Copy<LI>  Yet another great post dissecting one of Spring's oft-misunderstood nuances by Roger Hughes! This post introduces <a href="http://java.dzone.com/articles/using-spring-mvc%E2%80%99s">Spring @MVC's <CODE>@ModelAttribute</CODE></A>. 
	The attribute can be handy when... what am I doing? <EM>Go</EM>, read the post! It's great!
	 </LI> 
	<lI>  Want to run your Spring application on Google App Engine? Want to use their not-quite-there SQL support through Hibernate? Want Hibernate to not be  painful? Use Spring. This post shows <a href= "http://blog.essaytagger.com/2011/11/spring-hibernate-on-google-app-engines.html">how to use Spring to setup <code>HibernateDao</code> on Google App Engine</a>. It sounds like this particular blogger is only using Spring to make the most of Hibernate, which is a shame.  Spring runs really nicely on Google App Engine, and so users are encouraged to exploit its full power in that environment, too.

	</LI>
	
		<LI> 
			Readers of this column will know that we often try to link to posts about Tomcat administration that are <em>real world</EM>. Why? Because Tomcat's powerful and also the most widely used application server for Java developers, and sometimes developers need to blur the lines between developer and system administrator to develop applications in an environment that faithfully replicates production. 

				This week's link, <a href= "http://java-wisdom.blogspot.com/2010/11/apache-load-balancing-for-tomcat.html">on load balancing with  Apache Tomcat by fronting it with Apache HTTPD</a>, is no different. Great introduction, and a great topic. 
```

  
At this point, however, I would be remiss if I didn't mention that the easiest way to get this exact behavior with no configuration at all is to use [Cloud Foundry](http://cloudfoundry.com/signup?utm_source=springsource_web&utm_medium=banner&utm_campaign=cloudfoundry-signup), the open source PaaS project. Simply deploy your application to Cloud Foundry and then ratchet up the number of instances of that application. You'll instantly get round robin dispatching among the deployed instances. This is quick and easy, in development or in production! Just sayin'...!

```
Copy			 </LI>
	<LI> Ashish Sarin, as readers of this column will know, really digs Spring Roo. He's just announced a Spring Roo podcast, and I couldn't be happier. 
		 I'll certainly be checking it out, and you should too. Here's the <a href="http://spring-roo.blogspot.com/2011/10/spring-roo-podcast.html">announcement with details</a>.
		 </LI>
	<LI>Chad Lung has put together a great introduction on <A href= "http://java.dzone.com/articles/build-spring-data-project">how to build  a Spring-Data project with MongoDB in under 5 minutes using Netbeans 7 and Maven</a>.  Spring makes it easy, no matter which build tool and IDE you're using, of course, but it's nice to have specific goals in mind when approaching this sort of integration, and this post is <EM>nothing</EM> if not specific! Read on!   
  </LI>
<LI>The United States Navy used Magnolia, the CMS, along with Spring to build their <a href="http://www.navy.com">Navy.com</A> portal and landing page. The web site is - among other things - the focal point of a high volume recruitment campaign here in the US. 
	Magnolia's putting on a webinar  that explains  "how Campbell Ewald (Navy's digital agency) used Magnolia's Blossom module for straightforward app integration and how Blossom enabled Spring developers to work efficiently with Magnolia CMS right from the start."
	This could be interesting indeed. To learn more,  <a href= "http://www.magnolia-cms.com/landing/webinar-navy.html">check out the webinar registration page.</a> 
	  </LI>
      	<LI> 
	Using <a href="http://www.vmware.com/products/vcloud-director/overview.html">vCloud Director (VMware's turnkey IaaS solution)</a>? Want to publish notifications about system state using AMQP (and RabbitMQ)? <a href="http://cloud.dzone.com/articles/how-setup-rabbitmq-amqp-vcloud">Read this post</a>. 'Nuff said.
	</LI>

      
```