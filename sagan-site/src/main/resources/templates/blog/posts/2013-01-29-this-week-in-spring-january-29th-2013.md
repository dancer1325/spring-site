---
title: This Week in Spring - January 29th, 2013
source: https://spring.io/blog/2013/01/29/this-week-in-spring-january-29th-2013
scraped: 2026-02-24T08:10:12.737Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  January 29, 2013 | 0 Comments
---

# This Week in Spring - January 29th, 2013

_Engineering | Josh Long |  January 29, 2013 | 0 Comments_

Welcome back to another installation of *This Week in Spring* ! I've been visiting developers and companies in India, China, and Japan. It's been an exciting time to see what these emerging and powerful countries are doing with open source and with Spring, in particular! Of course, stay tuned to [the SpringSource blog in the coming weeks](http://blog.springsource.org/) some very cool examples and details!

In the meantime, as usual, we've got quite a bit of news to cover this week, including more news on the Spring 4 roadmap announcement from [last week](http://blog.springsource.org/2013/01/16/next-stop-spring-framework-4-0). If you want to get the absolute latest, check out the [Spring 3.2 GA webinar replay on YouTube](http://www.youtube.com/watch?v=fb5YG2W1srA), where Spring Framework 4.0 is covered a bit toward the end. Let's get to it!

1.  Charles Humble at InfoQ's [done a nice interview with Juergen Hoeller and write up of the Spring 4 announcement](http://www.infoq.com/news/2013/01/spring4) .
2.  The [Spring Integration 2.2.1 and 2.1.5](http://www.springsource.org/node/3793) maintenance releases are now generally available.

```
Copy		<LI>Spring HATEOAS 0.4 was <a href="http://www.springsource.org/node/3796">released</a>, adding Jackson and HAL support.</LI>
```

4.  Two new SpringOne 2GX 2012 Replays have been released to our YouTube Channel: [Tooling for the Javascript Era, An Introduction to Broadleaf Commerce](http://www.springsource.org/node/3794)
5.  We've launched a page to centralize [all the SpringOne2GX 2012 recordings](http://www.springone2gx.com/conference/washington/2012/10/video_list), check it out!
6.  Chris Beams, Gunnar Hillert, and Rossen Stoyanchev were recorded in well-received presentation [Introducing WebSockets at SpringOne2GX 2012](http://www.infoq.com/presentations/Introduction-WebSocket), now online on InfoQ!
7.  Blogger Ilias Tsagklis from the *Java Code Geeks* blog also has a nice post on the [Spring 4.0 roadmap announcement](http://www.javacodegeeks.com/2013/01/brace-yourselves-spring-framework-4-0-is-coming.html).
8.  Chris Beams has announced that [Spring 3.1.4 has been released](http://www.springsource.org/node/3789)!
9.  Marty Pitt has created a *very* nice extension - he's calling it *BakeHouse*\- for [Spring web applications that preprocesses web artifacts for consumption in your web application at application startup](http://martypitt.github.com/bakehouse/). There are various kinds of pre processing possible:
    
    -   [Less for your CSS](http://lesscss.org/)
    -   [Concatenate and minify your Javascript](https://developers.google.com/closure/compiler/)
    -   Maybe even use some [Typescript](http://www.typescriptlang.org/) or [CoffeeScript](http://coffeescript.org/), which needs to be compiled
    
    This is a very cool extension, Marty! It's like what I always wanted things like JAWR to be! The thing I most like about it, though? The fluid use of Spring Java `@Configuration` classes! Really slick and productive!
10.  [The Japanese portal *Public Key*](http://www.publickey1.jp/blog/13/spring_framework_409java_8spring_source.html) has a nice writeup of the announced roadmap for Spring 4.0
11.  The *Just Enough Architecture* blog has a nice post on [using ActiveMQ, Spring Integration and MongoDB together - cool!](http://blogs.justenougharchitecture.com/?p=640) I might've used Spring Batch's flat file reading support instead of a custom one out of the box, though, overall, this is an awesome post!
12.  Blogger *madhav* has a nice look at the [code to support table and class inheritance using Spring Data JPA](http://softtechgmr.blogspot.jp/2013/01/spring-data-jpa-inheritabce-table-for.html). That said, it's *really* hard to read as the code is not indented at all!
13.  Noushin Bashir has put together a nice post on how to [configure ActiveMQ with SSL and then connect to it from Spring](http://noushinb.blogspot.jp/2013/01/spring-activemq-ssl-enabled.html).

```
Copy	<LI>  Allard Buijze over at Trifork has announced <a href= "http://blog.trifork.nl/2013/01/22/axon-framework-2-0-released/"> version 2.0 of the Axon framework</a>, which builds on top of many different Spring  projects
		like Spring core, Spring AMQP, Spring Integration and Spring Data MongoDB to  bring 
		 the CQRS  pattern to developers  in Java.
```

15.  Blogger *lvwenwen* has put together a nice, Chinese-language post [introducing Spring and MongoDB integration](http://lvwenwen.iteye.com/blog/1774854).
16.  Blogger *java2000\_wl* has put together a nice, Chinese-language (though, to be fair, the post is almost entirely code, in this case, and that language - if nothing else - is universal) post [introducing how to use Spring Data Redis](http://blog.csdn.net/java2000_wl/article/details/8543203)
17.  Blogger *Ctillin* has put together a [Chinese-language post introducing how to use `@Autowired`](http://blog.csdn.net/ctllin/article/details/8536479) in your Spring applications.