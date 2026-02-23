---
title: Spring for Apache Kafka 1.1.0 Milestone 2 Available
source: https://spring.io/blog/2016/09/08/spring-for-apache-kafka-1-1-0-milestone-2-available
scraped: 2026-02-23T19:04:42.850Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  September 08, 2016 | 0 Comments
---

# Spring for Apache Kafka 1.1.0 Milestone 2 Available

_Releases | Gary Russell |  September 08, 2016 | 0 Comments_

I am pleased to announce that the second milestone for Spring for Apache Kafka version 1.1.0.M2 is now available in the [spring milestone repo](https://repo.spring.io/milestone).

This includes some bug fixes and the following new features:

-   The ability to process a batch of messages ([introduced in the last milestone](https://spring.io/blog/2016/08/23/spring-for-apache-kafka-1-1-0-milestone-1-available)) is now available when using the `@KafkaListener` annotation, for example…​
    
    @KafkaListener(id = "list", topics = "myTopic", containerFactory = "batchFactory") public void listen(List list) { ... }
    
-   You can now perform seek operations from the listener - this allows setting an initial offset when partitions are assigned by Kafka when using group management. You can also perform arbitrary seek operations after initialization.
    

The `KafkaTemplate` now provides access to the `metrics` and `partitionsFor` methods on the `Producer`.

In addition, the first milestone of `spring-integration-kafka` version 2.1 is now available, utilizing the `spring-kafka` 1.1.0.M2 version. It also supports batch payloads.

See the [project page](http://projects.spring.io/spring-kafka/) for links to documentation and more information.