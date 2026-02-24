---
title: This Week in Spring, April 10th, 2012
source: https://spring.io/blog/2012/04/11/this-week-in-spring-april-10th-2012
scraped: 2026-02-24T08:23:54.568Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  April 11, 2012 | 0 Comments
---

# This Week in Spring, April 10th, 2012

_Engineering | Josh Long |  April 11, 2012 | 0 Comments_

What a great week! The [Cloud Foundry Open Tour](http://opentour.cloudfoundry.com/)'s well under way, having just finished the Asian and US legs of the tour. Now, onward to Europe! (If you're in Europe, now's the time to secure your spot!)

Before we continue on to the bevy of the latest and greatest content, I wanted to remind you guys to check out Spring Integration ninja Oleg Zhurakousky's upcoming webinar, *Practical Tips for Spring Integration*. There is, as usual, one event for [North America](http://www.springsource.org/node/3522), and one for [Europe](http://www.springsource.org/node/3521)

1.  Gunnar Hillert's put together a blog introducing a feature that's received a lot of attention in [SpringSource Tool Suite](http://www.springsource.com/developer/sts): [easy-to-use templates for creating Spring Integration projects](http://blog.springsource.org/2012/04/09/create-spring-integration-projects-using-sts/). Nice job, Gunnar! Also, check out Gunnar's accompanying video [*Create Spring Integration Projects with STS*](http://www.youtube.com/watch?v=GZEm86G1WxU&context=C434d5fcADvjVQa1PpcFOWQG_sFeB1FvWxWIanr31fXlNh1GqF20o=) on the [SpringSource YouTube channel](http://youtube.com/SpringSourceDev).
2.  Michael Isvy has put together a great blog explaining a few of the things you should be aware of when [upgrading to Spring 3.1](http://blog.springsource.org/2012/04/06/migrating-to-spring-3-1-and-hibernate-4-1/?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+SpringSourceTeamBlog+%28SpringSource+Team+Blog%29). Handy!

```
Copy <LI> Spring Integration 2.1.1 has been released! This is the first maintenance release of 2.1.x branch and contains the usual things like bug fixes and improvements related to AMQP, Gemfire, Mongo and Redis modules which were first introduced in Spring Integration 2.1.0. All together 56 issues were resolved with this release. 
	 For more, consult <a href = "http://www.springsource.org/node/3520">the release announcement</A>.</LI>
		
<LI>  Gabriel Axel talks about the <a href = "http://www.gabiaxel.com/2012/04/spring-social-google-first-milestone-is.html">first milestone of Spring Social Google</A>, the <A href = "http://www.springsource.org/spring-social">Spring Social</A> binding for Google's APIs, including Google+.  </LI>
	

 <LI>  	Aparna Chaudhary has put together a <EM>wonderful</EM>, concise blog  that explains how to <a href = "http://blog.aparnachaudhary.net/2012/04/09/archive-log-files-using-spring-data-mongodb/">archive log files using Spring Data MongoDB and Spring Integration</A>. 
	
	  </LI>
	
	
```

4.  Bloger Sloan Seaman's put together a fascinating introduction to the wide world of Spring's custom XML namespace support, rooted around the `BeanDefinitionParser` class. This introduction's both powerful, and helpful. Spring namespaces are an integral part of providing a clean, useful integration API for people that consume your API from Spring. Spring's XML namespaces often pack a lot of punch, offering very efficient, more focused DSLs for certain API abstractions and concepts XML namespaces are easy to create, and many third party projects also provide namespace implementations for their APIs.
    
    Here's [Part 1](http://sloanseaman.com/wordpress/2012/03/26/spring-custom-tags-extensible-xml-part-1/) and [Part 2](http://sloanseaman.com/wordpress/2012/04/08/spring-custom-tags-extensible-xml-part-2/).
    
5.  Gordon Dickens, of Chariot Solutions, has put together a great blog introducing how to create and configure [Java 7 for use with Spring Roo](http://java.dzone.com/articles/configuring-spring-roo-java-7)
6.  Blogger Diarmuid Moloney has put together a great look at how to use Spring 3.1's [`Environment` abstraction](http://diarmuidmoloney.wordpress.com/2012/04/07/spring-environments/), which provides an interface to the things that tend to change from one environment to another - properties, profiles, etc. He introduces the problems that *Environment* and its cousin, profiles, are designed to solve, then introduces how to use the *Environment* API to solve the problem.
    
    ```
    Copy </LI> 
     <LI>  Cake Solution's Jan Machacek is at it again, this time he's thinking aloud <a href = "http://www.cakesolutions.net/teamblogs/2012/04/05/cross-store-experiments/">about a more sophisticate polyglot persistence story for Spring Data</A>. What do you guys think about his ideas? Be sure to let him know and to encourage him!    </LI>
    ```
    
7.  Building Spring MVC applications, but want to use Groovy instead? Check out this blog that introduces how to setup [Groovy and use it in conjunction with Spring MVC](http://roundhilloftheapples.weebly.com/1/post/2012/04/adding-groovy-to-a-spring-mvc-maven-project.html).
8.  [Apache Tomcat 7.0.27](http://www.tomcatexpert.com/blog/2012/04/06/apache-tomcat-7027-released) has been released with many new features and bug fixes.
9.  Alex Soto's at it again, this time with a great look at how to use [Dumbster, a fake email server, with Spring's JavaMail support for easier unit tests.](http://www.lordofthejars.com/2012/04/why-does-rain-fall-from-above-why-do.html)