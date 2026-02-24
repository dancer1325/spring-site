---
title: This week in Spring: August 2nd, 2011
source: https://spring.io/blog/2011/08/03/this-week-in-spring-august-2nd-2011
scraped: 2026-02-24T08:37:17.973Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  August 03, 2011 | 0 Comments
---

# This week in Spring: August 2nd, 2011

_Engineering | Josh Long |  August 03, 2011 | 0 Comments_

Welcome to another edition of "This Week in Spring." August is well underway and soon, at the end of August, [VMworld 2011](http://vmworld.com) will be upon us. Shortly thereafter, [SpringOne](http://www.springone2gx.com) will be here. It's going to get hot and heavy very quickly, so get ready! This week's "This Week in Spring" has a *lot* of interesting content from Gordon Dickens, of Chariot Solutions. Thanks Gordon for all the good reading!

1.  Rod Johnson - Spring's founder and thought leader - did a keynote at TheServerSide earlier this year. [This post relays](http://www.theserverside.com/feature/Cloud-Computing-vs-SOA-SOA-Was-Just-a-Fad-says-SpringSources-Rod-Johnson) some of the content of that keynote, including his thoughts on cloud computing, SOA, and more. Check it out.

```
Copy<LI> 
	The video of the recent webinar, "<A href="http://www.springsource.org/node/3194">What's New in Apache Tomcat 7</a>," is now available on the <a href="http://www.youtube.com/SpringSourceDev">SpringSourceDev YouTube channel</a>.   
</LI> 
<LI>Luke Taylor has some great content on how to <a href="http://blog.springsource.com/2011/08/01/spring-security-configuration-with-scala/">configure Spring Security with the Scala DSL</a> he's been developing. Check it out! 
</LI> 
<LI> 
	<a href= "http://www.springsource.org/node/3192">Spring Data JDBC Extensions with Oracle Database Support</a> 1.0.0.M2 has been released. The new features include QueryDSL SQL module support and a fixed leak in Streams AQ. 
 </li> 

<LI>  Oliver Gierke has a great post <a href= "http://blog.springsource.com/2011/07/27/fine-tuning-spring-data-repositories/">on how to fine tune Spring Data JPA repositories.</a>  </li> 
<LI>This is a great post on <a href="http://hsiliev.blogspot.com/2011/07/virgo-and-cloud.html">using CloudFoundry, and Eclipse Virgo</a> (formerly the SpringSource dm Server), together. Check it out!</LI> 
<LI>  
	<a href= "http://www.springsource.org/spring-social/news/1.0.0.rc2-released">Spring Social 1.0.0.RC2,</a> has just been released. Spring Social continues its steady march to GA with this latest release, including lots of new features. Check it out!
 </LI> 
<LI>Gordon Dickens has put together a quick walkthrough on <A href="http://gordondickens.com/wordpress/2011/07/27/quick-install-for-tcserver-2-5-with-spring-insight-in-sts/">using tcServer with Spring Insight in SpringSource Tool Suite</a>. Very cool stuff, check it out! </LI> 
<LI>Gordon Dickens at it again, with a great <a href="http://gordondickens.com/wordpress/2011/08/01/simpler-jpa-with-spring-data-jpa/">look at using Spring Data JPA.</a>  He also has a post on using queries <a href="http://gordondickens.com/wordpress/2011/08/02/adding-queries-to-spring-data-jpa/">in Spring Data JPA.</a> Check it out! </LI> 

<LI>You just can't stop Gordon Dickens! This time he takes a look at the <a href="http://gordondickens.com/wordpress/2011/07/25/restful-mvc-features-in-spring-3-0-and-3-1/">REST support in Spring 3.0 and 3.1</a> Very concise, insightful look at the technology. Check it out! </LI> 
 	
<LI> Speaking of Spring MVC 3.1, I pinged Rossen Stoyanchev  and Keith Donald on the Spring web team to see what's cooking. I was really happy to learn that   flash map support will be available in Spring MVC 3.1. The flash map support is simple: it allows you to persist a value beyond a single redirect, which then expires. This has historically been useful in implementing the redirect-after-post pattern, to avoid having somebody double submit a POST submission should they try to use the back button. Faithful readers and fellow code spelunkers will know that the <a href="https://github.com/SpringSource/greenhouse">GreenHouse</a> project has an implementation of this type of functionality already available. If you can't stand the (short) wait, you might consider using that until the more sophisticated, powerful offering is available, integrated into Spring MVC 3.1, directly.  </li> 

	<LI>Are you looking at Groovy? Want to learn more? There are many great resources, and entirely by accident, I've just stumbled upon another.  
		Check out <a href="http://groovycasts.org/">Groovy Casts.</a> 
		</LI> 

<LI>  This is a post that's all too common these days: what could possibly compel me to use CDI and JavaEE6? In this post,  <a href="http://java.dzone.com/news/do-you-need-move-spring-java"><em>Do I need to move from Spring to Java EE 6?</em></a>,  the answer, of course, is an ebullient, "No!" 
```

This post explain's one architect's reasoning. Are you fleeing from CDI and JavaEE6, and moving your application to Spring? Or, simply want to reuse code from an existing CDI application, in particular CDI's decorators? Then check out this post for an [approach to reuse CDI's decorator's inside of Spring.](http://niklasschlimm.blogspot.com/2011/08/jsr-299-cdi-decorators-for-spring-beans.html) This support is limited in scope, of course, but it's one less thing you'd have to work on when moving to Spring. An ideal migration will take advantage of the far more robust AOP support available in Spring itself.

```
Copy<LI>  O'REILLY's just published a small getting started book for Spring, <a href="http://oreilly.com/catalog/9781449306403"><em>Just Spring</em>.</a> 
	 I haven't had a chance to look at it, but the TOC seems promising -- it looks like a direct, 80%-centric look at using the Spring framework. Check it out.
	 </LI> 
```