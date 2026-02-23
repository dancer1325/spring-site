---
title: Spring For Apache Kafka 1.3 Milestone 2 Available
source: https://spring.io/blog/2017/08/21/spring-for-apache-kafka-1-3-milestone-2-available
scraped: 2026-02-23T16:22:51.518Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  August 21, 2017 | 0 Comments
---

# Spring For Apache Kafka 1.3 Milestone 2 Available

_Releases | Artem Bilan |  August 21, 2017 | 0 Comments_

We are pleased to announce the availability of the [Milestone 2](https://github.com/spring-projects/spring-kafka/commits/v1.3.0.M1) of the Spring for Apache Kafka `1.3` version.

It is available for download from the [Milestone Repository](https://repo.spring.io/milestone):

```
Copyrepositories {
    maven { url 'http://repo.spring.io/libs-milestone' }
}
compile "org.springframework.kafka:spring-kafka:1.3.0.M1"
```

(Milestone 1 had a blocker issue).

Functionally, the 1.3.x line provides a subset of the [2.0 line](https://spring.io/blog/2017/07/24/spring-for-apache-kafka-2-0-milestone-3-available) (which requires Spring Framework 5.0 and Java 8), but provides support for Java 7 projects and Spring Framework `4.3.x`.

It is primarily intended to provide early access to 0.11.0.0 Apache Kafka client features, but here is a summary:

-   Apache Kafka [0.11.0.0](https://archive.apache.org/dist/kafka/0.11.0.0/RELEASE_NOTES.html) client;
    
-   Improved listener container threading model facilitated by [KIP-62](https://cwiki.apache.org/confluence/display/KAFKA/KIP-62%3A+Allow+consumer+to+send+heartbeats+from+a+background+thread);
    
-   With the new Apache Kafka foundation we have introduced the `KafkaTransactionManager` and local transaction support in the `KafkaTemplate` via new `executeInTransaction()` operation;
    
-   The `KafkaListenerContainer` can now be supplied with a `TransactionManager` to perform polling and offset commits with transaction boundaries, and to synchronize a Kafka transaction with some external transaction manager.
    
-   Support for the new Kafka `Headers` feature is also provided. Now you can send and receive messages with any arbitrary headers, for example build request-reply scenarios using some `correlationKey` header;
    
-   The `KafkaEmbedded` JUnit class/Spring Bean can now be supplied with any arbitrary `brokerProperties`;
    
-   The `KafkaAdmin` can be used to automatically create topics by scanning the application context for `NewTopic` beans.
    

In addition, Spring Integration extension for Apache Kafka [2.3.0.M2](https://github.com/spring-projects/spring-integration-kafka/commits/2.3.x) is available to incorporate the Spring for Apache Kafka `1.3` foundation. In particular the `KafkaProducerMessageHandler` can be supplied with the `KafkaHeaderMapper`, where the `DefaultKafkaHeaderMapper` is used by default if the Jackson JSON processor is present in the classpath. If also includes enhancements to error handling.

spring-integration-kafke [2.2.0.M1](https://github.com/spring-projects/spring-integration-kafka/commits/2.2.x) is also available for spring-kafka 1.2.x. It includes the enhanced error handling mentioned above.

See the [Project Page](http://projects.spring.io/spring-kafka/) for a complete matrix of spring-kafka, spring-integration-kafka and kafka-clients version compatibility.

Thanks to all community members for any feedback and contributions!

General availability of the `1.3.0` release is expected to be in September alongside the `2.0.0.RELEASE`. Feedback, feature requests and, of course, contributions are welcomed via the usual channels:

[Project Page](http://projects.spring.io/spring-kafka/) | [Issues](https://github.com/spring-projects/spring-kafka/issues) | [Contributing](https://github.com/spring-projects/spring-kafka/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-kafka) | [Chat](https://gitter.im/spring-projects/spring-kafka)