---
title: Spring for Apache Kafka 1.1 GA and Spring Integration Kafka 2.1 GA are Available
source: https://spring.io/blog/2016/09/19/spring-for-apache-kafka-1-1-ga-and-spring-integration-kafka-2-1-ga-are-available
scraped: 2026-02-23T19:04:34.111Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  September 19, 2016 | 0 Comments
---

# Spring for Apache Kafka 1.1 GA and Spring Integration Kafka 2.1 GA are Available

_Releases | Artem Bilan |  September 19, 2016 | 0 Comments_

I am pleased to announce that the Spring for Apache Kafka 1.1.0.RELEASE is now available in the [spring release repo](https://repo.spring.io/release) and [Maven Central](http://search.maven.org/#search%7Cga%7C1%7Cspring-kafka).

Due to some community requirements, we decided to bypass the Release Candidate (RC) phase and released General Availability (GA) immediately.

There are not many changes since the previous [Milestone 2](https://spring.io/blog/2016/09/08/spring-for-apache-kafka-1-1-0-milestone-2-available), but here is a summary of all Spring Kafka 1.1 changes:

-   Apache Kafka `0.10` upgrade;
    
-   The batch of messages support via `BatchMessageListener` as well as via `@KafkaListener` annotation configuration;
    
-   The `null payload` concept support via `KafkaNull` placeholder object;
    
-   You can now perform seek operations from the listener - this allows setting an initial offset when partitions are assigned by Kafka when using group management. You can also perform arbitrary seek operations after initialization;
    
-   Allow setting the initial offset to be relative to the current offset;
    
-   The `KafkaTemplate` now provides access to the `metrics` and `partitionsFor` methods on the `Producer`.
    

The `master` has been switched to the `1.1.1` version for immediate maintenance reaction. Also we are going to start version `1.2` soon enough. Our plans are:

-   providing first class support for KStreams;
    
-   implementing Spring Boot infrastructure;
    
-   providing solution for some interesting community [requests](https://github.com/spring-projects/spring-kafka/issues).
    

The `spring-integration-kafka` version `2.1.0.RELEASE`, fully based on the Spring Kafka `1.1` is available, too.

As usual, don’t hesitate to reach us with any questions, feedback or contribution, at last!

[Project Page](http://projects.spring.io/spring-kafka/) | [Documentation](http://docs.spring.io/spring-kafka/reference/html/) | [Issues](https://github.com/spring-projects/spring-kafka/issues) | [Help](http://stackoverflow.com/questions/tagged/spring-kafka)