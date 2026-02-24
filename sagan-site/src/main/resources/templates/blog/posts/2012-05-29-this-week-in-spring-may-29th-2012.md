---
title: This Week in Spring: May 29th 2012
source: https://spring.io/blog/2012/05/29/this-week-in-spring-may-29th-2012
scraped: 2026-02-24T08:21:20.389Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Adam Fitzgerald |  May 29, 2012 | 0 Comments
---

# This Week in Spring: May 29th 2012

_Engineering | Adam Fitzgerald |  May 29, 2012 | 0 Comments_

Welcome back to another installment of *This Week in Spring*! As usual, we have a lot to cover, so let's get straight to it!

1.  Chris Beams has announced that the first milestone release towards [Spring 3.2 is now available](http://www.springsource.org/node/3563)! This release is great!
    
    ```
    Copy	It includes 
    
    	initial support for asynchronous <CODE> @Controller</CODE> methods,
    	early support for JCache-based cache providers,
    	significant performance improvements in autowiring of non-singleton beans,
    	initial delay support for <CODE> @Scheduled</CODE> and <CODE> &lt;task:scheduled&gt;</CODE>,
    	ability to choose between multiple executuors with <CODE>@Async</CODE>,
    	enhanced bean profile selection using the not (<CODE>!</CODE>) operator,  
    	48 bugs fixed, 8 new features and 36 improvements implemented. 
    	
    ```
    
    Check out the latest and greatest bits now, and feel free to give feedback!
    
    When I asked [for any items for consideration into this roundup](https://twitter.com/starbuxman/status/207449648003162114) on my Twitter account, one user immediately shot back: "[With the Spring 3.2 news, how about a poll on whether the community wants 3.2 M1 to be followed by RC1. It's too good to wait](https://twitter.com/nealeu/status/207455613771464704)." I agree, this release *is* pretty epic!
    
    ```
    Copy	  </LI>
    ```
    
2.  Michael Isvy has put together a fantastic [introduction to the low level proxy machinery at the heart of much of Spring](http://blog.springsource.org/2012/05/23/understanding-proxy-usage-in-spring/), including transaction management and caching. Once you understand how it works, it's easy to employ it surgically.
3.  Martin Lippert has announced that [SpringSource Tool Suite 2.9.2 has been released](http://www.springsource.org/node/3562). The release includes updated compatibility with tcServer 2.7 and some bug fixes.
4.  Alan Stewart has announced the [1.2.2 release of Spring Roo](http://blog.springsource.org/2012/05/28/spring-roo-1-2-2-release-available/).
    
    ```
    Copy This is the second maintenance release for 1.2 and includes fixes for a number of issues and includes support for Spring Framework 3.1.1 and JDK 7.  Roo 1.2.2 also includes the excellent new "tailor" feature provided by our partner, Accenture. The H-Online website had <a href = "http://www.h-online.com/open/news/item/Spring-Roo-1-2-update-arrives-1585213.html">coverage of the release</A>.  </LI>  
    
    <LI> The Cake Solutions blog has put together  (another!) 
     great blog introducing 
    <a href ="http://www.cakesolutions.net/teamblogs/2012/05/23/enabling-neo4j-web-admin-tool-on-the-embedded-server-using-spring-data">
    how to run Neo4j embedded with the web administration tool, and Spring Data</A>. 
    / </LI>
    ```
    
5.  The Zenika blog is at it again, this time with not one, but two great entries into this week's roundup. The first entry provides an [overview of Spring Data MongoDB](http://blog.zenika.com/index.php?post/2012/04/27/Overview-of-Spring-Data-MongoDB) and the second entry provides an overview of how to [use Spring Batch and MongoDB together](http://blog.zenika.com/index.php?post/2012/05/23/Spring-Batch-and-MongoDB-cursor-based-item-reader). Great stuff, and I'll certainly be checking back for new content!
6.  The JavaRevisted blog has a nice post [on how to specify a bean's scope in Spring](http://javarevisited.blogspot.com/2012/05/what-is-bean-scope-in-spring-mvc.html). A few points of clarification: Spring 3.0 *does* provide new scopes (including one of my favorites, the [`SimpleThreadScope`)](http://static.springsource.org/spring/docs/3.0.x/javadoc-api/org/springframework/context/support/SimpleThreadScope.html), and - while this blog introduces the default scopes available - you can easily register new scopes using the [`CustomScopeConfigurer`](http://static.springsource.org/spring/docs/3.0.x/javadoc-api/org/springframework/beans/factory/config/CustomScopeConfigurer.html), and filling out the map of custom scope instances, like this:
    
    	@Bean 
    	public static CustomScopeConfigurer csc(){ 
    	  
    	  Map<String,Object> scopes = new HashMap<String,Object>();
    	  scopes.put("thread", new SimpleThreadScope());
    	  	
    	  CustomScopeConfigurer csc = new CustomScopeConfigurer();
    	  csc.setScopes(scopes);
    	  return csc;	
    	}
    
7.  Blogger Angelo Zerr has put together an introduction to how to use [Spring Virgo (formerly Spring DM) and Spring Data JPA and Spring Remoting to build an Eclipse RCP application](http://angelozerr.wordpress.com/2012/05/29/eclipse_spring_step11/). There are many blogs - and they seem to have have links near the top to the previous one preceding it, so simply work backwards to get all of them.
    
    There are versions of the articles in both French and English.
    
8.  Navin Bansal has put together a blog introducing the bean [lifecycle for beans managed by the Spring container](http://www.technicaltoday.com/2012/05/spring-framework-introducing-bean-and.html).