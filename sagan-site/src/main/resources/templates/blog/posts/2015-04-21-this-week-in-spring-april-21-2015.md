---
title: This Week in Spring - April 21, 2015
source: https://spring.io/blog/2015/04/21/this-week-in-spring-april-21-2015
scraped: 2026-02-23T21:05:34.915Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  April 21, 2015 | 1 Comment
---

# This Week in Spring - April 21, 2015

_Engineering | Josh Long |  April 21, 2015 | 1 Comment_

Welcome to another installment of *This Week in Spring*! This week I'm in Bangalore, India, at the [Great Indian Developer Summit](http://www.developermarch.com/developersummit/). Lots of the Spring Team are at [JAXConf in Germany this week](http://spring.io/blog/2015/04/17/spring-at-jax-germany-2015) as well.

A friendly reminder, if you're in the south west region of Europe, and Barcelona, Spain, specifically, and looking for fun in the sun, I can think of no better option than [Spring I/O Conference](http://www.springio.net/), which [is next week](http://spring.io/blog/2015/04/17/pivotal-at-spring-i-o-conference-april-29-30-in-barcelona). Don't miss the *many* great talks from many amazing Spring team and Spring community members. I'll be there and looking forward to meeting and seeing you all!

Without further ado, let's get to it!

-   Spring Integration ninja Artem Bilan just announced [the Spring Integration Hazelcast adapter](http://spring.io/blog/2015/04/20/spring-integration-hazelcast-support-1-0-milestone-1-is-available). Hazelcast is an open-source distributed data grid that supports `java.util.Map<K,V>`, `java.util.Queue<T>`, and `java.util.Set<T>` semantics, among other things, across a cluster of nodes.
-   Spring Security and Spring Session lead Rob Winch [just announced Spring Session 1.0.1](http://spring.io/blog/2015/04/16/spring-session-1-0-1-released)
-   Spring Social lead Craig Walls just announced [Spring Social Facebook 2.0.0.RELEASE which](http://spring.io/blog/2015/04/15/spring-social-facebook-2-0-0-release-released) which includes all the numerous breaking changes in the Facebook Graph API.
-   << Kafka! >> Marius Bogoevici and Mark Pollack are teaming up for a webinar on Tues April 28th about [Reactive data-pipelines with Spring XD and Kafka](http://spring.io/blog/2015/03/17/webinar-reactive-data-pipelines-with-spring-xd-and-kafka), a must for any big / fast data enthusiasts.
-   Spring Integration ninja just put together a *really* nice writeup of the [Spring Integration Java DSL 1.1.M1](http://spring.io/blog/2015/04/15/spring-integration-java-dsl-1-1-m1-is-available) release, complete with lots of new features including POJO-based EIP components, the `IntegrationFlowAdapter`, dynamic language support, and Apache Kafka support..
-   .. which I wrote about this week. Apache Kafka is a distributed message queue that [makes shoveling *huge* amounts of data around easy to do](http://spring.io/blog/2015/04/15/using-apache-kafka-for-integration-and-data-processing-pipelines-with-spring). It's a natural fit for integration-based code and for big-data processing with support in Spring Integration and Spring XD.
-   This week's SpringOne2GX replays are out! Ryan Gardner from Dealer.com talks about getting configuration out of your apps, and into a distributed store in [Centralized Application Configuration with Spring and Apache ZooKeeper](http://spring.io/blog/2015/04/21/springone2gx-2014-replay-centralized-application-configuration-with-spring-and-apache-zookeeper)
-   Our pal Xavier Padró put together a nice [post on using Spring Boot with JMS](http://xpadro.blogspot.in/2015/04/configure-spring-jms-application-with.html), specifically taking advantage of the programming model in Spring framework 4.1.
-   I love this post on [exposing Git commit information from a Spring Boot `/info` actuator endpoint](http://www.petrikainulainen.net/programming/spring-framework/spring-from-the-trenches-returning-git-commit-information-as-json/).
-   Did you know that Spring Boot supports declarative, [easy-to-use support for HTTPs](http://www.drissamri.be/blog/java/enable-https-in-spring-boot/) in the embedded containers?
-   Are you using Vaadin and Spring? Did you know there's a powerful Spring Boot and Vaadin-based integration that is now featured on [the Spring Initializr](http://start.spring.io).
-   Are you using IntelliJ? Have you tried out all the new features in IntelliJ supporting Spring Boot? Check out Spring ninja Stephan Nicoll's joint talk with the IntelliJ team [on using IntelliJ with Spring Boot](http://blog.jetbrains.com/idea/2015/04/webinar-recording-spring-boot-and-intellij-idea-14-1/).
-   I have been playing a lot with ways to safely coordinate cluster state in a distributed system. In this space, tools like Redis, Hazelcast, and Apache Zookeeper are very powerful options [and Spring Cloud already has some *very* preliminary support](https://github.com/spring-cloud/spring-cloud-cluster). Check them out! I'd love to hear about your use cases for coordination, if you've got 'em. There are some obvious scenarios. How would you elect a node handling message queuing as the master? How would you handle master-worker topologies?
-   I've discovered a wealth of (Japanese-language) [posts on Qiita on Spring Boot](http://qiita.com/tags/spring-boot), among other things. This post on [Spring Boot and Thymeleaf](http://qiita.com/uzresk/items/31a4585f7828c4a9334f) is interesting. Here's one \[on using Spring Boot (Spring MVC) and Swagger\](Spring MVC integration for Swagger). This post on [unit testing Spring MVC services looks pretty detailed](http://qiita.com/NetPenguin/items/0e06779ecdd48d24a5db). I'll be checking back every now and then! Great resources, it seems, even from the Google Translate results!