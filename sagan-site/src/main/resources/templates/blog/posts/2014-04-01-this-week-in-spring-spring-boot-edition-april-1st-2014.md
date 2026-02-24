---
title: This Week in Spring (Spring Boot edition!) - April 1st, 2014
source: https://spring.io/blog/2014/04/01/this-week-in-spring-spring-boot-edition-april-1st-2014
scraped: 2026-02-24T07:34:30.733Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  April 01, 2014 | 4 Comments
---

# This Week in Spring (Spring Boot edition!) - April 1st, 2014

_Engineering | Josh Long |  April 01, 2014 | 4 Comments_

Welcome everybody to a momentous [*This Week in Spring* - Boot edition](https://spring.io/blog/2014/04/01/spring-boot-1-0-ga-released)!

Today is, of course, April Fools day. There is a lot of great stuff out there as April 1st jokes go! We didn't prepare any practical jokes this year, but I always like to point people to this still-epic video [of Spring co-founder Rod Johnson announcing the sale of SpringSource (as the company where Spring originated was named) to Microsoft!](http://www.infoq.com/news/2008/04/microsoft-springsource-purchase) (in **2008**, on [April Fools](http://en.wikipedia.org/wiki/April_Fools'_Day))

That out of the way, there's *far* more interesting stuff to talk about today (with no bearing whatsoever on April Fools): [Spring Boot](http://spring.io/projects/spring-boot) which - just this morning - [*finally* went GA](https://spring.io/blog/2014/04/01/spring-boot-1-0-ga-released)! Congratulations to [Phillip Webb](http://spring.io/team/pwebb) and [Dr. Dave Syer](http://spring.io/team/dsyer) (and the scores of people who've helped them) on this *amazing* release.

I don't know what it looks like from the outside, looking in, but we on the Spring team have been watching Philip and Dave drive Boot from concept, to polished prototype where it made a *huge* splash [at SpringOne2GX 2013](http://springone.com), to GA over the last year and some change. Boot has informed many of the other Spring projects, including Spring Framework 4.0. A truly game-changing technology, and not just for the JVM, either.

If you haven't tried it yet, then now is the time. There'a a video on using Spring Boot from [STS 3.5 (which is due soon as well)](http://spring.io/tools/sts/all). STS isn't *required* at all, but it does have some handy tools! Check it out.

1.  The big news: [Spring Boot 1.0.0](https://spring.io/blog/2014/04/01/spring-boot-1-0-ga-released) has reached it's first major release!
2.  Spring Integration ninja Artem Bilan has just announced [Spring Integration 3.0.2 *and* Spring Integration 4.0 M4](https://spring.io/blog/2014/03/31/spring-integration-3-0-2-and-4-0-milestone-4-released). The new stuff in Spring Integration 3.0.2 is awesome, but scroll down for *the Spring Integration, Boot & Java configuration demo*! I'm tickled pink to see this release. #boot
3.  [Spring lead Juergen Hoeller has announced the Spring 4.0.3 release, with Java 8 support and much improved websocket support.](https://spring.io/blog/2014/03/27/spring-framework-4-0-3-released-with-java-8-support-now-production-ready)
4.  Spring Data legend Thomas Darimont has announced that [Spring Data Redis 1.2.1 is now available](https://spring.io/blog/2014/03/27/spring-data-redis-1-2-1-released). The new release includes bugfixes for `RedisCacheManager` and `RedisTemplate`.
5.  Spring Data lead Oliver Gierke has just released the [first milestone of Spring Data Dijkstra](https://spring.io/blog/2014/04/01/first-milestone-of-spring-data-release-train-dijkstra-available). Check it out!
6.  On April 9, I'll be doing a vJUG presentation, [live and worldwide, introducing Spring Boot](http://www.meetup.com/virtualJUG/events/164640872/). My hope is to - in the short space alloted - demonstrate what building an application with Spring Boot looks like. I'd love to see you there, and please feel free to also ask questions on the IRC channel. #boot
7.  Our pal [Chris Richardson](http://twitter.com/crichardson) has chimed in with a blog that describes an [approach to building Microservices with Spring Boot](http://plainoldobjects.com/2014/04/01/building-microservices-with-spring-boot-part1/). The example is in Scala. Check it out! #boot
8.  Spring Boot's been nominated for [*Most Innovative Java technology*](http://jax.de/awards2014/spring-boot). I'm not sure how the *voting* process works, but as soon as I find out, I'll post here. Either way, I hope we can count on your help to drive votes through! #boot
9.  Marco Vermeulen put together a very nice talk introducing [how to use Spring Boot to build microservices, as well](http://marcovermeulen.github.io/spring-boot-groovy-talk/). This example is in Groovy. #boot
10.  [Jim Drannbauer](https://github.com/excellentdrums) has put together a GitHub repository demonstrating how to use [the recently released](https://spring.io/blog/2014/03/19/introducing-spring-test-mvc-htmlunit) [Spring MVC Test HtmlUnit and Cucumber together](http://github.com/excellentdrums/Cucumber-JVM-Spring-MVC-Test-HTMLUnit-Demo). With this in place, [your unit tests almost read like human sentences](https://github.com/excellentdrums/Cucumber-JVM-Spring-MVC-Test-HTMLUnit-Demo/blob/master/src/test/java/hello/Stepdefs.java)! #boot
11.  Our pal Matt Raible is back at it again, this time with not one, but *two* posts on using Spring Boot! The first post demonstrates how to [add Swagger integration to a Spring Boot application](http://raibledesigns.com/rd/entry/documenting_your_spring_api_with), and the second demonstrates what its like to build [an iOS client to a Boot backend application using the Ionic framework](http://raibledesigns.com/rd/entry/developing_an_ios_native_app). #boot
12.  The *all and sundry* blog is back, this time with a post on [using Spring Boot and Scala together](http://www.java-allandsundry.com/2014/03/spring-boot-and-scala.html). Nice! Boot's a win no matter what language you're using! #boot
13.  Sergi Almar is back this week with a [post on how to monitor your websocket threadpools using JMX](http://www.sergialmar.com/2014/03/monitor-your-websockets-and-threadpools-for-performance-tuning-via-jmx/). This is a fine followup to his last post [on detecting websocket connection and disconnection in Spring 4](http://www.sergialmar.com/2014/03/detect-websocket-connects-and-disconnects-in-spring-4/). #boot
14.  The team behind our website has [installed Disqus for comments on our blogs](https://spring.io/blog/2014/04/01/comments-are-back). I wish I could show you the emails, but the turnaround from "idea" to "comments are live!" in this instance was *insanely* quick. Agile, even.
15.  Adam Shook gave a talk [SpringOne2GX 2013 Replay: Hadoop - Just the Basics for Big Data Rookies](https://spring.io/blog/2014/03/31/springone2gx-2013-replay-hadoop-just-the-basics-for-big-data-rookies) at SpringOne2GX 2013 whose replay is now available online. Don't miss it!
16.  Also available online is David Turanski and Luke Taylor's talk from SpringOne2GX 2013, [Real Time Analytics with Spring](https://spring.io/blog/2014/03/31/springone2gx-2013-replay-real-time-analytics-with-spring). Check it out!
17.  The replay of the talk that Spring LDAP lead [Mattias Arthursson gave at SpringOne2GX 2013 last year introducing Spring LDAP 2.0](https://spring.io/blog/2014/03/26/webinar-replay-spring-ldap-2-0-0) is now live
18.  Did you miss Spring lead [Juergen Hoeller's webinar introducing Spring 4 on Java 8](https://spring.io/blog/2014/03/26/webinar-replay-spring-framework-4-0-on-java-8)? It's available now and definitely worth a watch!