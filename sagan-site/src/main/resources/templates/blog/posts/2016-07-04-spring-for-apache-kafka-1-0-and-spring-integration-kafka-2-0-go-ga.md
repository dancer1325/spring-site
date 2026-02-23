---
title: Spring for Apache Kafka 1.0 and Spring Integration Kafka 2.0 go GA
source: https://spring.io/blog/2016/07/04/spring-for-apache-kafka-1-0-and-spring-integration-kafka-2-0-go-ga
scraped: 2026-02-23T19:11:29.053Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  July 04, 2016 | 4 Comments
---

# Spring for Apache Kafka 1.0 and Spring Integration Kafka 2.0 go GA

_Releases | Artem Bilan |  July 04, 2016 | 4 Comments_

I’m pleased to announce that the `spring-kafka` (Spring for Apache Kafka) `1.0 GA` and Spring Integration Kafka `2.0 GA` are available finally!

The artifacts `org.springframework.kafka:spring-kafka:1.0.0.RELEASE` and `org.springframework.kafka:spring-kafka-test:1.0.0.RELEASE` are available in the [Release](https://repo.spring.io/release/) repository and Maven Central, respectively.

In addition `org.springframework.integration:spring-integration-kafka:2.0.0.RELEASE`, fully based on the `spring-kafka-1.0.0.RELEASE`, is available at the same repositories as well.

Important

Just after release we figured out a [nasty bug](https://github.com/spring-projects/spring-kafka/issues/135) with unacked offset commits for `RECORD` mode. Special thanks to [Adam Dec](https://github.com/adamdec)! So, please, meet `spring-kafka:1.0.1.RELEASE` as well.

Of course, many thanks to everyone involved, to active community members, who provided feature requests and contributions.

There have been some reworks and bug fixes since the [Release Candidate 1](https://spring.io/blog/2016/06/07/spring-for-apache-kafka-1-0-release-candidate-1-available) including:

-   rework for Manual AckMode, which indicate as a breaking change though, because the `MANUAL_IMMEDIATE_SYNC` mode has been removed;
    
-   the `ackTime` has now 5 seconds as default value. The same as Kafka default `auto.commit.interval.ms`;
    
-   the `ackCount` must be `> 0` in case of `COUNT` and `COUNT_TIME` mode;
    
-   a new Spring Integration Kafka support chapter in the Reference Manual.
    

See also the [Reference Manual](http://docs.spring.io/spring-kafka/docs/1.0.0.RELEASE/reference/htmlsingle/) for more information.

# [](#next-steps)[](#next-steps)Next Steps

We expect to release the Milestone 1 for version 1.1 enough soon, which will support Kafka 0.10, include some Spring Boot auto configuration and actuator endpoint and much more!

[Project Page](http://projects.spring.io/spring-kafka/) | [Documentation](http://docs.spring.io/spring-kafka/docs/1.0.0.RELEASE/reference/htmlsingle/) | [Issues](https://github.com/spring-projects/spring-kafka/issues) | [Help](http://stackoverflow.com/questions/tagged/spring-integration)

# [](#spring-one-platform)[](#spring-one-platform)Spring One Platform

[Gary Russell](https://spring.io/team/grussell) will be talking about [Spring for Apache Kafka](https://2016.event.springoneplatform.io/schedule/sessions/spring_for_apache_kafka.html) at [Spring One Platform](http://springoneplatform.io), which is taking place in Las Vegas between August 1-4 this year. There are many other great talks so [check the agenda](https://2016.event.springoneplatform.io/schedule/sessions) and [get your ticket](https://2016.event.springoneplatform.io/register) if you haven’t done so already.