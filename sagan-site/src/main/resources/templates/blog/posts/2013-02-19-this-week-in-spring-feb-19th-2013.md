---
title: This Week in Spring  - Feb 19th, 2013
source: https://spring.io/blog/2013/02/19/this-week-in-spring-feb-19th-2013
scraped: 2026-02-24T08:09:12.632Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  February 19, 2013 | 0 Comments
---

# This Week in Spring  - Feb 19th, 2013

_Engineering | Josh Long |  February 19, 2013 | 0 Comments_

Welcome back to another installment of *This Week in Spring*! This week I'm in Atlanta, GA with a few other SpringSource colleagues talking to developers at the [DevNexus](http://devnexus.org/s/index) Java conference and - tomorrow - [speaking at the Atlanta Spring User Group](http://www.meetup.com/AtlantaSpring/events/100345552/). This show is bigger and better than ever this year! I love the energy and community here.

If you're in Atlanta, GA, drop by the eHire labs (see the link above for the address) tomorrow night for the Spring User Group and we'll talk about REST, Spring MVC, Spring for Android, Spring Mobile, and more! I look forward to seeing you.

As usual, though, we've got a lot to cover, so let's get to it!

1.  The Spring Data release train "Arora" is now avialable, a synchronized, tested release of all Spring Data sub projects - [check it out now](http://www.springsource.org/node/3811)!
2.  [Craig Walls has announced that Spring Social 1.1.0.M2 has been released](http://www.springsource.org/spring-social/news/1.1.0.m2-released) ! The new release incorporates tighter integration with Spring Security and a slew of new features.
3.  [Jeremy Grelle has announced When.js 1.8.0](http://www.springsource.org/node/3812) which is cujojs's lightweight `Promises/A` implementation.

```
Copy<LI>  Gary Russell <a href  = "http://www.springsource.org/node/3813">has announced Spring Integration 3.0.0 M1</a>. 
 There are no major new features in this first milestone, it is mainly refactoring, removing deprecations, etc. Browse the documentation 'what's new' and the release notes for more information.

		 
```

5.  [](http://www.springsource.org/node/3814)Register now to talk with Sam Brannan and Rossen Stoyanchev on Feb 21st in the [Webinar: Testing Web Applications with Spring 3.2](http://www.springsource.org/node/3800)
6.  New replays from SpringOne2012 - talks from the Data and Integration track talks starting to hit YouTube. Check out Gary Russell's [Monitoring and Managing Spring Integration Part 2](http://www.springsource.org/node/3814), and Hadoop / Big Data enthusiasts shouldn't miss Costin's talk [How to build Big Data Pipelines for Hadoop using OSS](http://www.springsource.org/node/3814).
7.  As a bonus session this week, we've also released [Spring Data REST: Easily export JPA entities directly to the web](https://www.youtube.com/watch?v=kaiH1HsacPs).
8.  *Krishna's blog* has a nice post on [using CAS (single signon using Jasig) with Spring Security](http://krishnasblog.com/2013/02/11/sample-of-spring-security-and-cas-single-signon/).
9.  Sergei Sizov has put together a nice [post on using Spring Security and HTTP Basic authentication](http://vozis.blogspot.com/2013/02/spring-security-and-http-basic.html).
10.  The *Lucky Ryan* blog has a very nice post introducing [HDIV](http://hdiv.org) - which can be used to prevent cross site request forgery (CSRF), remove the ability to alter non-editable data (hidden fields, params) and even has options to limit characters globally across form fields - [and explaining how to use HDIV with Spring MVC](http://www.luckyryan.com/2013/02/14/spring-mvc-form-validation-with-hdiv-http-data-integrity-validator/).
11.  Your remoting layer (the layer that's exposed over the network) might simply surface the domain model objects from your services layer. Often, however, the object sent across the wire is a slightly different version of the data used by the service. Perhaps fields are omitted because they contain too much data. Perhaps extra fields are added to communicate metadata about the service itself. Perhaps you simply want to *flatten* two different types into a single object for ease-of-transport. Whatever the reason, the common *pattern* (or *anti-pattern*) to handling this is a DTO (data transfer object). We had these before with EJBs and DCOM and CORBA. Now we have them with REST. If you find you *have* to have DTOs, the *jtransfo* library introduced in this post seems like it might be helpful in reducing the tedious adapters from DTO to domain object. The post explains how [to use `JTransfo` to automatically handle adapting domain objects to DTOs](http://blog.progs.be/402/convert-to-jtransfo).
12.  The *Fahd.blog* blog has a [nice introduction to Spring Batch's `RetryTemplate`](http://fahdshariff.blogspot.com/2013/02/retrying-operations-using-springs.html). This is a very powerful component of Spring Batch that doesn't get enough love, so I am glad to see this post!
13.  The *Learn and Shine* blog has a nice post introducing [how to use Spring MVC to render XSLT views](http://www.javaguruonline.com/2013/02/spring-and-xslt-example.html).
14.  The *Java Ninja Chronicles By Norris Shelton, Jr* blog has [a *very* concise post on how he took the first steps in using Spring's Java configuration style](http://norrisshelton.wordpress.com/2013/02/12/finally-had-a-need-to-configure-spring-by-java-code/) to make short work of loading properties from an *exotic* source.