---
title: This Year in Spring
source: https://spring.io/blog/2011/12/27/this-year-in-spring
scraped: 2026-02-24T08:29:09.934Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Josh Long |  December 27, 2011 | 0 Comments
---

# This Year in Spring

_News | Josh Long |  December 27, 2011 | 0 Comments_

Welcome back to the final installment of *This Week in Spring* for 2011. It's incredible to think that we've been doing this for a year already! Where *has* the time gone? Time flies when you're having fun, as they say...

The hope has always been that these roundups would make it easier for developers to take the pulse of the Spring community. Between the announcements and releases and content from SpringSource and VMware and the incredible deluge of content authored by the community, there is *always* something interesting happening, somewhere.

While there is a *lot* of interesting content this week, we'll defer the usual reviews until next week. This week, we're going to reflect on the year that was 2011 for the Spring community.

```
Copy</P>

<OL>
	<lI>  <B>Spring 3.1</B> Development of Spring 3.1 began in earnest in early 2010, and by SpringOne 2GX 2010 we already had an idea of what it was going to look like. By the beginning of this year, <a href ="http://www.springsource.org/node/3026">we already had milestones</a> to play with.  
  As the year progressed, we saw numerous new milestones, followed in short order by release candidates. The release candidates progressed and then, finally, a couple of weeks ago, we <a href = "http://www.springsource.org/node/3335">got Spring 3.1 GA</a>. 
```

Among the many new, exciting features and themes in Spring 3.1, there is

-   A much improved [Java configuration model](http://blog.springsource.org/2011/06/10/spring-3-1-m2-configuration-enhancements/)
-   Enhanced, Java-only configuration for JPA and [Spring MVC](http://blog.springsource.org/2011/06/13/spring-3-1-m2-spring-mvc-enhancements-2/) applications.
-   [Profiles](http://blog.springsource.org/2011/02/14/spring-3-1-m1-introducing-profile/), which let you describe beans in your configuration twice and then activate a given definition based on the environment in which the application's running.
-   An [`Environment`](http://blog.springsource.org/2011/02/15/spring-3-1-m1-unified-property-management/) abstraction
-   A [declarative, annotation-driven caching](http://blog.springsource.org/2011/02/23/spring-3-1-m1-caching/) model
-   An improved [unit testing story](http://blog.springsource.org/2011/06/21/spring-3-1-m2-testing-with-configuration-classes-and-profiles/)
-   [Hibernate 4 support](http://blog.springsource.org/2011/12/13/spring-framework-3-1-goes-ga/)

Of course, if you want to see all these 3.1 details demonstrated live, you should sign up for the Spring 3.1 Webinar on January 19th ([Europe](https://vmwareevents.webex.com/vmwareevents/onstage/g.php?t=a&d=663415641), [North America](https://vmwareevents.webex.com/vmwareevents/onstage/g.php?t=a&d=668718779)). As useful as this all is, I think the prospect of releases of all the other Spring projects that will build on 3.1 really make 2012 a very exciting year.

```
Copy		   </LI>
	<LI>  
		<B>The Cloud and Cloud Foundry</B> 
		
		 In April of this year, <a href ="http://blog.springsource.org/2011/04/12/launching-cloud-foundry/">SpringSource and VMWare launched   Cloud Foundry</A>, the open source Platform as a Service. <a href = "http://cloudfoundry.org">Cloud Foundry</a> can be run on-premise. 
		
		Cloud Foundry is an open-source Platform-as-a-Service (PaaS). Cloud Foundry works with many languages, runtimes, and services. And, if the list of supported services and runtimes wasn't enough, one only had to wait to see <a href="http://blog.cloudfoundry.com/post/6109591023/cloud-foundry-now-supporting-scala"> Scala</a> support, <a href ="http://blog.springsource.org/2011/08/30/using-postgres-on-cloud-foundry/">PostgreSQL</a> support, <a href = "http://blog.springsource.org/2010/04/13/springsource-acquires-rabbitmq/">RabbitMQ</a> support and <A href = "http://blog.cloudfoundry.com/post/13481010480/cloud-foundry-welcomes-net-framework-community-contributions">.NET</a> support added in the months that followed.
		
	 
			Cloud Foundry works <a href = "http://blog.springsource.org/2011/10/13/using-cloud-foundry-services-with-spring-part-1-the-basics/">brilliantly</a> with <a href ="http://blog.springsource.org/2011/11/04/using-cloud-foundry-services-with-spring-part-2-auto-reconfiguration/">Spring applications</a>.
			
			 You can use the <a href = "http://blog.springsource.org/2011/11/09/using-cloud-foundry-services-with-spring-applications-part-3-the-cloud-namespace/"> &lt;<CODE>cloud</CODE>&gt;</a> namespace or Java configuration in tandem with the Cloud Foundry library to interrogate and work with the services provisioned by Cloud Foundry. <a href ="http://blog.springsource.org/2011/11/10/using-cloud-foundry-services-with-spring-part-4-%e2%80%93-spring-profiles/">Spring 3.1 profiles can be used to to good effect on Cloud Foundry</a> to conditionally reference data sources that are managed  by the cloud when your application's run in the cloud. Spring AMQP and Spring Integration make  it simple <a href = "http://blog.springsource.org/2011/08/16/chatting-in-the-cloud-part-1/">to build messaging applications using RabbitMQ</a> on Cloud Foundry, and the Spring Data projects make it dead simple to build applications that work with <a href = "http://blog.springsource.org/2011/05/03/using-mongodb-redis-node-js-and-spring-mvc-in-a-single-cloud-foundry-application/"> MongoDB, and  Redis</a> on Cloud Foundry. There is of course <a href = "http://blog.springsource.org/2011/08/24/using-micro-cloud-foundry-from-grails/">Grails support</a> and <a href ="http://blog.springsource.org/2011/04/12/roo-cloud-foundry-productivity-in-the-cloud/">Spring Roo support</a>. <a href = "http://blog.springsource.org/2011/08/24/micro-cloud-foundry-for-spring-developers/"> Cloud Foundry released Micro Cloud Foundry</a>, a virtual machine with a fully configured cloud that you could use to develop your Spring applications locally. To support automated builds with Cloud Foundry, <a href="http://blog.springsource.org/2011/09/22/rapid-cloud-foundry-deployments-with-maven/">developers can use the Maven plugin</a>.
			
			
		 
	 </LI>
	<LI> <B>Big Data</B> 
		2011 delivered the implementation of the NoSQL data integration vision that Rod Johnson described way back at SpringOne 2GX 2010. 
		
   This year saw  many Spring Data projects reach or exceed 1.0 releases (and the numerous milestones and release candidates that precede GA releases!), including  <a href = "http://blog.springsource.org/2011/02/10/getting-started-with-spring-data-jpa/">Spring Data JPA</a> and  <a href = "http://www.springsource.org/node/3302">Spring Data Neo4J</a>, <a href  = "http://www.springsource.org/node/3346">Spring Data MongoDB</a>, <a href ="http://www.springsource.org/node/3337">Spring Data Redis</a>, <a href = "http://www.springsource.org/node/3336">Spring Data GemFire</a>, and the evolution of numerous other interesting projects like <a href = "https://github.com/SpringSource/spring-hadoop">Spring Hadoop</a>, and the concept of <a href = "http://blog.springsource.org/2011/07/27/fine-tuning-spring-data-repositories/">Spring Data Repositories</a>.

		 </LI> 
		
		
		
		
		
		
		
		
	<LI>  <B>Mobile and The Next Generation Web </B>  
		
		 The web's a big place, and it comes in many form factors.  
	
	Today, delivering an application means delivering it  through the web, and on  mobile platforms like Android and iOS. 
		
		A huge  part of building better mobile applications is building  RESTful services for  communication between client and a server in a standard, interoperable way.
		
		
```

Spring Core provides the `RestTemplate` which facilitates RESTful communication between clients and servers.

[Spring Android](http://www.springsource.org/spring-android) provides support for consuming RESTful web services from Android devices.

```
CopyThis year even saw the creation of some great information for <a href = "http://blog.springsource.org/2011/08/26/clean-code-with-android/"> building cleaner Android applications overall</a>. 		
 

As powerful as REST is, it can't be the full story. A critical piece of the pie is security, and authorization. After all,  Facebook can't very well go around exposing your data through a RESTful service that you haven't explicitly authorized it to. The last few years bore witness to the rise of the various OAuth standards, and implementations by the various 	service providers like Facebook, Twitter, etc. <a href = "http://blog.springsource.com/2011/09/08/spring-social-1-0-what-a-year-makes/">Spring Social went GA this year</a> and it supports communication with these services through OAuth. Spring Android also supports Spring Social, making it ideally trivial to consume OAuth-secured, RESTful services from
```

Android applications. Additionally, [Spring Security OAuth](http://www.springsource.org/spring-security-oauth), a project for Spring Security that's dedicated to helping people expose secured services using OAuth, started its march to GA this year, as well.

-   **SpringOne 2GX** The biggest [SpringOne 2GX](http://www.springone2gx.com) conference ever was hosted in Chicago in October. It was a fantastic confluence of great technology, phenomenal presentations and the wonderful people from the Spring Community (that is you guys!). The conference keynotes kicked things off perfectly with Adrian Colyer talking about [Spring Yesterday, Today and Tomorrow](http://www.infoq.com/presentations/Spring-Yesterday-Today-and-Tomorrow) while Ben Alex followed up with [Next Generation Applications](http://www.infoq.com/presentations/SpringOne-2GX-Keynote-Next-Generation-Applications). If you were not able to join us in Chicago this year, or if like me, you were unable to attend all the talks you wanted to see, then you won't want to miss the series of [SpringOne talks that InfoQ recorded](http://www.infoq.com/springone_2gx_2011/). It is a great way to learn about [Messaging for Modern Applications](http://www.infoq.com/presentations/Messaging-for-Modern-Applications), [Spring Data Neo4J](http://www.infoq.com/presentations/Introduction-to-Spring-Data-Neo4j), [Making Mobile Web Native with PhoneGap](http://www.infoq.com/presentations/Making-the-Mobile-Web-Native-with-PhoneGap) and many other great topics.
    
    ```
    Copy        	</LI>
    
    	 
    
    		
    </OL>
    
    <P> That's it for this week and year! Happy new year! We look forward to seeing you next year! <p>
    ```