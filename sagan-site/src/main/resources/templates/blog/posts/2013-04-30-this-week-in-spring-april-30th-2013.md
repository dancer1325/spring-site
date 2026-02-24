---
title: This Week In Spring - April 30th, 2013
source: https://spring.io/blog/2013/04/30/this-week-in-spring-april-30th-2013
scraped: 2026-02-24T08:05:47.816Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  April 30, 2013 | 0 Comments
---

# This Week In Spring - April 30th, 2013

_Engineering | Josh Long |  April 30, 2013 | 0 Comments_

Welcome to another installment of *This Week in Spring*! We've got a lot to cover this week, as usual, so let's get to it. Did you miss last week's Pivotal public launch? Catch the [replay](http://www.gopivotal.com/launch) and learn about GE's investment in the new entity! Pivotal's mission is about bringing consumer-grade software to the enterprise -- where open source technology like Spring, Groovy, Grails, RabbitMQ, Redis, and Cloud Foundry, are already widely adopted. Check out the new Pivotal website, under the Community link (top right) for some other open source initiatives that might surprise you!

1.  [Oliver Gierke has announced Spring HATEOAS 0.5](https://twitter.com/olivergierke/status/329270702723174400), which contains [lots of new features](https://github.com/SpringSource/spring-hateoas/issues?milestone=5&state=closed)!  
    
2.  Spring Security lead Rob Winch has announced that [Spring Security 3.1.4 is now available](http://www.springsource.org/node/22598). This is a maintenance release with a number of bug fixes including OSGi support for Spring 3.2.
3.  Spring Data ninja [Oliver Gierke](https://twitter.com/olivergierke/status/328925143378300928) *also* (boy that guy gets around!) tweeted a look at the Spring Data roadmap: introducing [Spring Data "*Babbage*."](https://github.com/SpringSource/spring-data-commons/wiki/Release-Train-Babbage)
4.  [Spring Data Arora SR1](http://blog.springsource.org/2013/04/25/spring-data-arora-sr1-released/) released this week (named for [Sanjeev Arora)](http://en.wikipedia.org/wiki/Sanjeev_Arora). As an aside, you have probably noticed that the names of the various Spring Data release trains are adapted from various influential names in computer science. The new release is named for [Charles Babbage](http://en.wikipedia.org/wiki/Babbage).
5.  Adam Shook and Dr. Mark Pollack's webinar, [Hadoop, Pivotal HD and Spring for Apache Hadoop](http://www.youtube.com/watch?v=gxWXEBW0nMM), is now available online.
6.  Gil Tene, of Azul Systems, gave an amazing talk at SpringOne2GX 2012 called [*Understanding Java Garbage Collection and what you can do about it*](http://www.youtube.com/watch?v=we_enrM7TSY), which is now online.
7.  New SpringOne2GX replays now available in HD on YouTube: [Building for Performance with Spring Integration & Spring Batch, Case Study: Provisioning a Multi-Site In-Memory Database](http://www.springsource.org/node/22599)
8.  [James Watters](http://twitter.com/wattersjames) shared a video he'd discovered on setting up Cloud Foundry and BOSH. It's pretty epic and worth a watch if you want to get a handle on BOSH.
9.  What people write blog posts about sometimes surprises me. The *Javarevisted* blog has a nice post introducing Spring's (fairly internal, albeit stable) `org.springframework.util.StringUtils` class, with examples on how to [convert collections to delimited strings](http://www.stumbleupon.com/su/85VzC7/javarevisited.blogspot.com.br/2012/08/convert-collection-to-string-in-java.html). I think this is perhaps *too* much information on the subject, but I love the enthusiasm!
10.  RabbitMQ developer-advocate [Alvaro Videla](https://twitter.com/old_sound) has put together a post [on how to unit-test RabbitMQ from PHPUnit](http://videlalvaro.github.io/2013/04/using-rabbitmq-in-unit-tests.html). This approach is pretty cool, though I wonder how well it would play in Java and jUnit with concurrent test suite execution. Either way, this is a nice way to unit test my favorite message queue!
11.  Do you need a Spring Integration adapter? Have you checked out the [Spring Integration extensions repository](http://github.com/SpringSource/spring-integration-extensions)? This repository simply collects adapters that move faster than the Spring Integration core, or that are still being polished. It's a great place to find solutions to various problems. Heck, even [the *pull requests* are chock full of useful stuff](https://github.com/SpringSource/spring-integration-extensions/pulls) - I see an [MQTT](http://mqtt.org) adapter in there by the amazing [Gary Russell](https://github.com/garyrussell)!
12.  Check out this amazing post on [@gopivotal](http://twitter.com/gopivotal) blog called [800,000 Messages/Minute: How Nokias HERE Uses #RabbitMQ to Make Real-time Traffic Maps](http://ow.ly/kzy1o) over on the [@gopivotal](http://gopivotal.com) blog. It introduces the Nokia HERE architecture that builds on [Spring AMQP](http://springsource.org/spring-amqp) and [RabbitMQ](http://rabbitmq.org).