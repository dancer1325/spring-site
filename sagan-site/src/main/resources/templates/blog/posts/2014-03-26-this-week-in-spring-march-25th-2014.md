---
title: This Week in Spring - March 25th, 2014
source: https://spring.io/blog/2014/03/26/this-week-in-spring-march-25th-2014
scraped: 2026-02-24T07:35:37.441Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  March 26, 2014 | 1 Comment
---

# This Week in Spring - March 25th, 2014

_Engineering | Josh Long |  March 26, 2014 | 1 Comment_

Welcome to another installment of *This Week in Spring*! This week is going to be a *crazy* week, and I can't wait to see you on the other end of it next week! There are some BIG announcements coming! Keep your eyes glued to [spring.io](http://spring.io) this week: **So. Much. Win**. Alright, with that out of the way, let's get to it!

-   Spring Boot co-lead and all-around awesome guy Phil Webb has announced [that Spring Boot 1.0.0.RC5 is now available](https://spring.io/blog/2014/03/22/spring-boot-1-0-0-rc5-available-now). *I can't stress this enough*: download the bits, try 'em out and give them a smoke test against your code. The GA release is *very* soon, and we want to have as few surprises as possible!
-   Speaking of Spring Boot, Erdem Gunay put together a *very cool* post detailing how he took an existing app, [reworked it with Spring Boot and got it up and running in one week](http://egunaytech.tumblr.com/post/79957584772/porting-legacy-java-backend-to-spring-boot-in-one-week). *Wow!* I note that one point he points to a configuration file that's all in XML, but it doesn't need to be. In fact, the beans so configured would be more concisely described in java. Check out the post, either way! Great stuff, Erdem!
-   Spring Security lead Rob Winch has put together a nice introduction to using [Spring Test MVC with HtmlUnit, which he introduced last week](https://spring.io/blog/2014/03/19/introducing-spring-test-mvc-htmlunit).
-   Spring lead Juergen Hoeller has put together a *really* good look at the [state of Java 8 in enterprise projects](https://spring.io/blog/2014/03/21/java-8-in-enterprise-projects) - a great, pragmatic resource for people stuck on eariler JDK versions.
-   Speaking of Java 8, my pal Pieter Humphrey shared [a great resource on the subject of Java 8 first-class functions](https://spring.io/blog/2014/03/20/manning-publications-first-class-functions-in-java-8) in Manning's Java 8 tutorial video. Check it out!
-   The *Syntx.co* blog has a nice post on how to [use Spring 4's websocket support along with a simple client-side example](http://syntx.co/languages-frameworks/using-websockets-in-java-using-spring-4/)
-   Sergi Almar's Blog has a great post on [Detecting WebSocket Connects and Disconnects in Spring 4](http://www.sergialmar.com/2014/03/detect-websocket-connects-and-disconnects-in-spring-4/). Great for presence detection usecases in games, chat, etc.
-   Sergi Almar is on fire this week! He also posted a some good info on how to [Track your WebSocket messages with Spring 4 and RabbitMQ](http://www.sergialmar.com/2014/03/track-your-websocket-messages-with-spring-4-and-rabbitmq/).
-   [SpringOne2GX 2013 Replay: Tips and Tricks for Client Side Performance](http://spring.io/blog/2014/03/25/springone2gx-2013-replay-aop-ing-your-javascript) by Scott Andrews is now up on YouTube!
-   It's Javascript March madness around here - another Javascript session from [SpringOne 2GX: AOP-ing your JavaScript](http://spring.io/blog/2014/03/25/springone2gx-2013-replay-aop-ing-your-javascript) by Brian Calavier is now up on YouTube!
-   OK, I confess, I almost didn't include [this post](http://myshittycode.com/2014/03/19/spring-choosing-the-right-dependency-injection-approach) because of its name. I won't repeat it here, but if you can look past the name and just read the post, it's hilarious and - to be honest- a rather good narrative on choosing a dependency injection approach.
-   The *DevCrumb* blog has a nice post introducing [how to use Spring 3.2.2 and Hibernate 4.2.0 together](http://devcrumb.com/hibernate/hibernate-jpa-spring-and-hsqldb/). This *works* but I'd advise against using any XML configuration (or *any* configuration at all!) if it can be helped. Most of the code in this post goes away if you use [Spring Boot](http://spring.io/projects/spring-boot). If you also use Spring Data JPA repositories (and why wouldn't you?), then all of the code except for the `Person` entity can be thrown away.
-   There's a neat post on *JournalDev* by Pankaj Kumar that [looks at using Spring's AOP support.](http://www.journaldev.com/2583/spring-aop-example-tutorial-aspect-advice-pointcut-joinpoint-annotations-xml-configuration)