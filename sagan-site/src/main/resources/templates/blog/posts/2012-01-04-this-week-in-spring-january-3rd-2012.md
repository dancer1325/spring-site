---
title: This Week in Spring, January 3rd, 2012
source: https://spring.io/blog/2012/01/04/this-week-in-spring-january-3rd-2012
scraped: 2026-02-24T08:28:55.764Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  January 04, 2012 | 0 Comments
---

# This Week in Spring, January 3rd, 2012

_Engineering | Josh Long |  January 04, 2012 | 0 Comments_

Happy new year! I hope your new year and holidays were amazing. And, welcome back to another installment of *This Week in Spring*.

```
CopyThis year is going to be <EM>incredible</EM>, so let's dive right into it.  

This week's  roundup features some content from the last few weeks. Particularly, we've got content that InfoQ   put up     
from the <a href = "http://www.springone2gx.com">SpringOne2GX 2011</a> conference.  
```

Thank you [InfoQ](http://www.infoq.com) for sharing this great content, as usual.

1.  Garry Russel and David Turanski's SpringOne2GX presentation on implementing [highly available architectures using Spring Integration](http://www.infoq.com/presentations/Implementing-HA-Architectures-Spring-Integration) is now up on InfoQ.

```
Copy<LI> Rob Winch demoes some of the <A href = "http://www.infoq.com/presentations/Spring-Security-3-1">new features in Spring Security 3.1</a>: multiple http elements, stateless authentication mode for RESTful services, Debug Filter, CAS support for proxy tickets, JAAS, etc.  This is another great presentation from SpringOne2GX 2011. 
   </LI>

<LI> 
	Rossen Stoyanchev's presentation at SpringOne2GX 2011 on the <a href = "http://www.infoq.com/presentations/Spring-MVC-3-1-Update">new features in Spring MVC 3.1 is now up over at InfoQ</a>.
	 </LI>

	<LI> Community member and DevNexus organizer Gunnar Hillert has put together an awesome blog on a powerful, if underrated new feature in Spring 3.1: <a href = "http://hillert.blogspot.com/2011/12/method-validation-with-hibernate.html">support for validating business service methods using JSR 303 and Spring</a>. This support is manifest in the Spring MVC REST support for validating marshalled entities that are part of the request. But, as Gunnar explains, the 
		 facility can be used generically in any service tier.   </LI> 

<LI>  Blogger <EM>Mrabti</EM> has the second part of his series
	<a href = "http://crazygui.wordpress.com/2012/01/02/spring-gwt-software-architecture-for-scalable-applications-part-2/">on using Spring and GWT together</a>. Check it out to learn about his architecture and how he used <a href ="http://www.springsource.org/spring-roo">Spring Roo</a> and <a href ="http://www.springsource.org/spring-data">Spring Data</a> together. 
	
	  </LI>
<LI> <EM>Pro Spring</EM> co-author and Spring community member  Jan Machacek  
	has put together a great blog on  <a href= "http://www.javaworld.com/javaworld/jw-12-2011/111228-learn-scala-with-specs2spring.html">using the Specs2 Spring testing framework to test your Spring applications</a>. Specs2 is a good way to
					learn Scala, and to test your application.
	 
	   </LI>
<LI>  
	Tomasz Nurkiewicz has  put together a post on <a href="http://nurkiewicz.blogspot.com/2011/12/enabling-jmx-in-hibernate-ehcache-qurtz.html">exposing Hibernate's 
	
 and EhCache's statistics using Spring's JMX exporters</a>. The code's written in Scala, but should translate 
 naturally for those conversant in Java. One little niggle is that he subclasses classes	
	to expose them, which doesn't quite feel right. Sure, it works, but it's probably not required. 
	
	In the case of the <CODE>javax.sql.DataSource</CODE>, you can simply  reference it when configuring a <a href="http://static.springsource.org/spring/docs/3.1.x/spring-framework-reference/htmlsingle/spring-framework-reference.html#jmx"><CODE>org.springframework.jmx.export.MBeanExporter</CODE></a>.   Obtaining the <EM>native</EM> <CODE>EntityManagerFactory</CODE> isn't difficult, either and shouldn't require a subclass, as the <CODE>AbstractEntityManagerFactoryBean</CODE> base class exposes a public <CODE>nativeEntityManagerFactory</CODE> field which might have worked instead. Anyway,  the concepts are interesting, and - in the end - the blog <EM>does</EM> demonstrate  how to expose JMX information from objects that don't already expose them, so that's very cool. Nice job!
	
	 </LI>
<LI> JavaCodeGeeks has an interesting post on using Spring to <a href = "http://www.javacodegeeks.com/2011/12/spring-mvc-and-rest-at-google-app.html">build RESTful services on Google App Engine</a>.  There's very little specific to Spring here (as that just works - after all, Spring's unparalleled in its ability to work on any cloud). Instead, this post covers the minutae of configuring Google App Engine and of configuring Maven, and so on. A worthy read if you're looking for the details.
	 </LI>
	
	

 <LI> Blogger  John Varghese has an interesting (if slightly not technical) write up 
	 of  <A href = "http://softthoughtsbyjohn.blogspot.com/2011/12/enterprise-application-development.html">enterprise application development with Spring Roo</a>. 
		</LI>
		
<LI> 	SpringSource founder and all around great guy Rod Johnson's presentation at QCon, 
		<A href="http://www.infoq.com/presentations/Things-I-Wish-I-d-Known">Things I'd Wish I'd Known</A>, 
		is also up on InfoQ. Rod is a charming presenter and it's great to hear him talk about the  exhilarating  (if sometimes nerve-wracking) development of  SpringSource. 
	 </LI>
```