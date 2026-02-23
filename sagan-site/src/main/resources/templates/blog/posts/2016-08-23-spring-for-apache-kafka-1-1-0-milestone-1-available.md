---
title: Spring for Apache Kafka 1.1.0 Milestone 1 Available
source: https://spring.io/blog/2016/08/23/spring-for-apache-kafka-1-1-0-milestone-1-available
scraped: 2026-02-23T19:05:58.667Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  August 23, 2016 | 0 Comments
---

# Spring for Apache Kafka 1.1.0 Milestone 1 Available

_Releases | Gary Russell |  August 23, 2016 | 0 Comments_

I am pleased to announce that the Spring for Apache Kafka [1.1.0.M1](https://github.com/spring-projects/spring-kafka/milestone/5?closed=1) milestone release [is available now](http://projects.spring.io/spring-kafka/).

As usual, thanks to the community for any feedback and contribution as always!

Highlights of this release:

-   Support for the 0.10.x.x client (use 1.0.x for the 0.9.x.x client)
    
-   Support for listeners that receive the entire batch of messages returned by the `consumer.poll()` operation
    
-   Support for `null` payloads - used to delete keys when using log compaction
    
-   Allow setting the initial offset to be relative to the current offset
    

[Project Page](http://projects.spring.io/spring-kafka/) | [GitHub](https://github.com/spring-projects/spring-kafka) | [Help](http://stackoverflow.com/questions/tagged/spring-kafka) | [Documentation](http://docs.spring.io/spring-kafka/reference/htmlsingle/)