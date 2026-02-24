---
title: This Week in Spring - Sept 3rd, 2013
source: https://spring.io/blog/2013/09/03/this-week-in-spring-sept-3rd-2013
scraped: 2026-02-24T07:58:56.324Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  September 03, 2013 | 0 Comments
---

# This Week in Spring - Sept 3rd, 2013

_Engineering | Josh Long |  September 03, 2013 | 0 Comments_

Welcome to *This Week in Spring*! [SpringOne](http://springone2gx.com) is almost upon us! It kicks off this weekend with the [Cloud Foundry Platform](http://platformcf.com) event and continues on until next Thursday. I, personally, am very excited (and a bit nervous!) about this year's show. It's going to be so epic. Yesterday may have been a holiday here in the US (I hope you all enjoyed a wonderful holiday!), but most of us on the Spring team were working fast and furiously in preparation for SpringOne2GX!

**My Road to SpringOne2GX 2013** the SpringOne2GX 2013 agenda looks *soo* good! I'm into a lot of different things like the open web (REST-powered architectures), big data, the cloud, and security and - at SpringOne - there's no reason I can't get my fill of each topic! Here are just *some* of the talks that *I* would *love* to see when I'm there.

-   [Tackling Big Data Complexity with Spring](http://springone2gx.com/conference/santa_clara/2013/09/session?id=29165) with Mark Fisher and Mark Pollack. Does this one need any introduction? Spring XD leads Mark Pollack (Spring core contributor, Spring AMQP co-founder, Spring.NET founder, Spring Data and Spring Data for Hadoop lead) and Mark Fisher (Spring core contributor, Spring Integration founder, Spring AMQP co-founder) will introduce Spring XD, the most powerful way to build big data-centric applications today.
-   [Build Your Very Own Private Cloud Foundry](http://springone2gx.com/conference/santa_clara/2013/09/session?id=29426) with the amazing Matt Stine. Matt's going to introduce how to setup your own on-premises Cloud Foundry instance using BOSH. Matt's a great speaker, a fantastic technologist, and I can't wait to see this talk.
-   [Distributed rules engines and CEP](http://springone2gx.com/conference/santa_clara/2013/09/session?id=30073) with John Davies. John's the CEO of C24, and has got some incredible enterprise integration war-stories. The man's an epic speaker, too.
-   [RabbitMQ is the new King](http://springone2gx.com/conference/santa_clara/2013/09/session?id=29462) with Jan Machacek and RabbitMQ Developer Advocate Alvaro Videla. Jan's a longtime Spring-guru and distributed systems guy, and Alvaro's the Pivotal RabbitMQ developer advocate (in the same way that I'm the Pivotal Spring developer advocate…). They're both sensational and I expect this one will be a wonderful talk.
-   [Your Data, Your Search, Elasticsearch](http://springone2gx.com/conference/santa_clara/2013/09/session?id=29406) with Costin Leau. Costin worked on, among many things, the original Spring Cache integration with Spring core, Spring Data GemFire, Spring Data itself, the OSGi support in Spring DM server (years ago), and a lot more. He's now working with Elasticsearch, and I can't wait to hear his perspective. Costin's really good at taking complex topics and distilling their essences.

I have four presentations (with amazing co-presenters!) this year. [Andy Piper](http://twitter.com/andypiper) and I will present on [building Spring and Cloud Foundry-powered applications](http://springone2gx.com/conference/santa_clara/2013/09/session?id=29455). [Roy Clarkson](http://twitter.com/royclarkson) and I will present on using [Spring and REST to connect applications](http://springone2gx.com/conference/santa_clara/2013/09/session?id=29834), [Kevin Nilson](http://twitter.com/javaclimber) and I will present on using [Spring and profiles to build applications that adapt](http://springone2gx.com/conference/santa_clara/2013/09/session?id=29833) and [Phil Webb](http://twitter.com/phillip_webb) and I will present on [how to improve your Java configuration muscle memory](http://springone2gx.com/conference/santa_clara/2013/09/session?id=30067).

I look forward to seeing you guys at SpringOne2GX! [Ping me on Twitter (@starbuxman)](http://twitter.com/starbuxman) if you're around and let's talk **Spring**!

**And now, on to this Week's Roundup!** Hopefully, this will sate your appetites until SpringOne2GX! :)

1.  Spring Scala lead Arjen Poutsma has just released [Spring Scala 1.0.0.RC1](http://forum.springsource.org/showthread.php?141307-Spring-Scala-1-0-0-RC1-has-been-released). The new release is the first release candidate in the release cycle, towards a 1.0 release, so definitely check it out!
2.  Join our friends from Pivotal Labs as David Frank shows you How to [Get Agile with Pivotal Tracker](https://www.springsource.org/node/22670), on September 5th.
3.  Join Phil Webb as he dives into the one of the newest, hottest projects in Spring - [Spring Boot on September 26th](http://www.springsource.org/node/22681).
4.  Jan Stenberg put together a nice post on Russ Miles' [*Life Preserver* pattern as used with Spring](http://www.infoq.com/news/2013/08/hexagonal-lifepreserver-spring). The post is a little light on code, but you can check [out the original presentation to get the details](http://skillsmatter.com/podcast/java-jee/from-patterns-to-code-coding-simple-event-driven-components-for-agile-software)!
5.  The JavaBeat blog has a *really* detailed post on how [to use Spring's `@Tranactional` annotation](http://www.javabeat.net/2013/09/transaction-control-annotations/).
6.  Eugen Dvorkin has a nice post on how to use [Storm, Groovy, a CEP engine and Spring together](http://eugenedvorkin.com/distributed-event-processing-rule-engine-with-storm-spring-and-groovy/). This is really cool, although there's not a lot of code. I also wonder if this could've been done in a simpler way using Spring XD, though.
7.  Spring web-ninja Arjen Poutsma, and author of the original `RestTemplate`, has been hard at work on an [*asynchronous* `RestTemplate`](https://github.com/SpringSource/spring-framework/blob/master/spring-web/src/main/java/org/springframework/web/client/AsyncRestTemplate.java) to be included in Spring 4. Looking *awesome*.
8.  Luis Miguel Gracia Luis has put together a nice post that introduces some of the great new stuff coming for Spring developers [since the Spring team became part of Pivotal](http://unpocodejava.wordpress.com/2013/08/30/nuevas-herramientas-spring-spring-loaded-spring-boot-spring-xd-y-spring-rest-shell/), including Spring XD, Spring Boot, Spring Loaded and Spring REST Shell. The post is Spanish language, but Google Translate does a fairly good job.
9.  Rajkumar Singh has put together a nice post - *Apache Hadoop and Spring Data : Configuring mapreduce Job* - that introduces [Spring for Apache Hadoop](http://rajkrrsingh.blogspot.com/2013/08/apache-hadoop-and-spring-data.html). Great post!  
    
10.  The Bluesoft blog has the second post in a series on [using Angular.js with Spring MVC to build a login dialog](http://blog.e-bluesoft.com/?p=35). This is getting good…  
     
11.  The *Technicalpractical* blog has a post, [*Display Model As JSON or XML using Spring*](http://technicalpractical.wordpress.com/2013/09/02/display-model-as-json-or-xml-using-spring/). The post does a fine job introducing how to put together a JSON view using Spring MVC 2.5-era APIs, but I hope you'll check [out some more recent introductions to building JSON-centric REST services with Spring](https://github.com/joshlong/the-spring-rest-stack). [Here's a (much) simpler example](https://gist.github.com/joshlong/6431608).