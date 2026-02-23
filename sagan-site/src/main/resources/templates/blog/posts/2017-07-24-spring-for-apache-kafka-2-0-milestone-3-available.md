---
title: Spring For Apache Kafka 2.0 Milestone 3 Available
source: https://spring.io/blog/2017/07/24/spring-for-apache-kafka-2-0-milestone-3-available
scraped: 2026-02-23T16:22:55.912Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  July 24, 2017 | 2 Comments
---

# Spring For Apache Kafka 2.0 Milestone 3 Available

_Releases | Artem Bilan |  July 24, 2017 | 2 Comments_

We are pleased to announce the availability of the [Milestone 3](https://github.com/spring-projects/spring-kafka/milestone/20?closed=1) of the Spring for Apache Kafka `2.0` version.

It is available for download from the [Milestone Repository](https://repo.spring.io/milestone):

```
Copyrepositories {
    maven { url 'http://repo.spring.io/libs-milestone' }
}
compile "org.springframework.kafka:spring-kafka:2.0.0.M3"
```

Since the [previous announcement](https://spring.io/admin/blog/2911-spring-for-apache-kafka-2-0-milestone-1-available), these feature have made it into the current Milestone:

-   Apache Kafka [0.11.0.0](https://archive.apache.org/dist/kafka/0.11.0.0/RELEASE_NOTES.html) client base line;
    
-   With the new Apache Kafka foundation we have introduced `KafkaTransactionManager` and transactions support in the `KafkaTemplate` via new `executeInTransaction()` operation;
    
-   The `KafkaListenerContainer` can now be supplied with the `TransactionManager` to perform polling and offset commits with transaction boundaries;
    
-   The Kafka Headers support is provided as well. Now you can send and receive messages with any arbitrary headers, for example build request-reply scenarios using some `correlationKey` header;
    
-   The `ConsumerAwareErrorHandler` is provided to manage `Consumer` state in case of errors;
    
-   The `KafkaEmbedded` can now be supplied with any arbitrary `brokerProperties`.
    

Thanks to all community members for any feedback and contributions!

General availability of the `2.0` release is expected to be in the September (shortly after the Spring Framework `5.0` release). Feedback, feature requests and, of course, contributions are welcomed via the usual channels:

[Project Page](http://projects.spring.io/spring-kafka/) | [Issues](https://github.com/spring-projects/spring-kafka/issues) | [Contributing](https://github.com/spring-projects/spring-kafka/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-kafka) | [Chat](https://gitter.im/spring-projects/spring-kafka)