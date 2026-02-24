---
title: This Week in Spring - January 1, 2013
source: https://spring.io/blog/2013/01/01/this-week-in-spring-january-1-2013
scraped: 2026-02-24T08:11:21.815Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  January 01, 2013 | 0 Comments
---

# This Week in Spring - January 1, 2013

_Engineering | Josh Long |  January 01, 2013 | 0 Comments_

I almost typed *2012* when I composed this post! It's already 2013! I hope your holidays were wonderful.

Welcome back to another installment of *This Week in Spring*! It's time to begin another exciting new year (and to remember to use the correct new year in text!). With that, let's have a look at  
the new and exciting content from all around the community.

```
Copy<LI> The epic book by <a href="https://twitter.com/rob_winch/status/284812769197441024">Spring Security lead Rob Winch and Peter Mularien   on   Spring Security 3.1</a> by Packt publishing is now out!  
	  The book is a great resource for people who are looking at Spring Security and want  
	the scoop from the source.
	 </lI>

  <LI> Are you using Spring Security to handle login and logout in your application? Sometimes it's necessary to tailor the behavior of how login and logout are accomplished. Perhaps you need to tear down some state or do logging. In any event, this post <a href="http://javaiscoool.blogspot.com/2012/12/spring-security-implement-logout-handler.html"> demonstrates the configuration and base contract of a logout handler</a>. </LI>
```

2.  Chris Shayan has a nice post that illustrates how [Spring Batch can help make short work of complex enterprise-y batch processing, complete with code and examples](http://java.dzone.com/articles/enterprise-use-case-spring)! Nice job!
3.  The *Java Kart* blog has a nice post that [introduces Spring Data Redis with the JRedis client library](http://javakart.blogspot.com/2012/12/spring-data-redis-hello-world-example.html)
4.  Desam Venu Madhava Reddy has a very simple post identifying [some of the main reasons why people use Spring](http://spring.javabook.org/2012/12/what-are-advantages-of-spring-framework.html). There are many reasons people come to Spring, and these are some of the very high level ones.
5.  *The Cafe Techno* has a nice post on the [complete setup of a `SimpleFormController` in Spring MVC](http://thecafetechno.com/tutorials/spring/use-of-simpleformcontroller-spring-mvc). The example uses Spring MVC and explicitly wires up the machinery for working with Spring MVC. You don't need to do much of this in Spring 2.5 (introduced in 2007) and later, instead relying on the defaults and conventions. That said, if you want to override the framework, then understanding some of these things are wired together can be very helpful.
6.  The *Developer's Diary* blog has [a nice post on autowiring a map, list, or array using Spring annotations](http://dev-faqs.blogspot.com/2012/12/spring-framework-autowiring-map-list.html)
7.  This blog is in Chinese, and has a simple example of how to setup a Spring MVC 3.2 example. NB: I'd recommend using the Java-centric configuration for this, as this is needlessly XML-centric. In a Spring 3.1+ and Servlet 3 environment, there's no need for XML (for Spring MVC or `web.xml`).
8.  The *all and sundry* blog [has a nice post on Spring Data JPA and pagination](http://www.java-allandsundry.com/2012/12/spring-data-jpa-and-pagination.html)
9.  This post is in Japanese, and from what I can gather it's aimed at showing how to build a lean [Spring application using MyBatis, Freemarker, etc](http://d.hatena.ne.jp/maji-KY/20121230/1356847738).
10.  This post is also in Chinese, and shows [the various kinds of dependency checking in Spring](http://www.cnblogs.com/rollenholt/archive/2012/12/27/2835270.html).
11.  http://manikmagar.wordpress.com/2013/01/01/spring-mybatis-integration-and-junit-testing-using-springs-embedded-database/
12.  I had some time over the holiday and decided to quickly scratch one item off of my 2012 new years resolutions (I got it done before new years, and besides, better late than never!): I migrated my photos away from my Flickr account to another service which was cheaper and more invested in. To do this, I used the community-supported Spring Social Flickr project. The project is, decidedly, not yet finished, but works well enough. I forked it and added a Spring Batch downloader which reliably downloads all the photos into albums named for the ID of the https://github.com/joshlong/spring-social-flickr
13.  The *Fish* blog (also in Chinese) has a nice post on using [the Danga memcached client from Spring](http://www.cnblogs.com/atyou/archive/2012/12/31/2840460.html).
14.  Simon Massey has a nice post on [server-side pagination with ZK (a widget-centric web framework), Spring Data MongoDB and Google Maps](http://architects.dzone.com/articles/serverside-pagination-zk). Do I need to say anymore? Check it out!
15.  The *Dinesh on Java* blog has a nice, introductory post on [using Spring MVC interceptors](http://www.dineshonjava.com/2012/12/spring-3-mvc-and-interceptor-with.html). Good stuff!