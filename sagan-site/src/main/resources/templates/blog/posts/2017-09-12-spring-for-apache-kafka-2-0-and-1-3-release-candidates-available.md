---
title: Spring For Apache Kafka 2.0 and 1.3 Release Candidates Available
source: https://spring.io/blog/2017/09/12/spring-for-apache-kafka-2-0-and-1-3-release-candidates-available
scraped: 2026-02-23T16:20:30.178Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  September 12, 2017 | 0 Comments
---

# Spring For Apache Kafka 2.0 and 1.3 Release Candidates Available

_Releases | Gary Russell |  September 12, 2017 | 0 Comments_

We are pleased to announce the availability of the [2.0.0.RC1](https://github.com/spring-projects/spring-kafka/milestone/24?closed=1) release candidate of the Spring for Apache Kafka `2.0` version.

As discussed in the [1.3.0.M2 announcement](https://spring.io/blog/2017/08/21/spring-for-apache-kafka-1-3-milestone-2-available), we are concurrently releasing 1.3 with 2.0, where 1.3 contains a subset of the 2.0 features, supporting the Kafka 0.11.x.x client, while still supporting Spring Framework 4.3. As such, the 1.3.0.RC1 release candidate is also available.

They are available for download from the [Milestone Repository](https://repo.spring.io/milestone):

```
Copyrepositories {
    maven { url 'http://repo.spring.io/libs-milestone' }
}
compile "org.springframework.kafka:spring-kafka:2.0.0.RC1"
```

Since the [previous announcement](https://spring.io/blog/2017/07/24/spring-for-apache-kafka-2-0-milestone-3-available), the following is a summary of additional features added:

-   Support for Spring Framework’s transaction synchronization.
    
-   `KafkaAdmin` is now available to automatically add topics (for `NewTopic` beans present in the application context).
    
-   `AckMode.RECORD` now correctly commits the offset immediately after the listener returns. This is facilitated by the new threading model in the listener container.
    
-   Several bug fixes
    

These features are also available in the 1.3 release.

Thanks to all community members for any feedback and contributions!

General availability of the `2.0` release will be shortly after the Spring Framework `5.0` release. Feedback, feature requests and, of course, contributions are welcomed via the usual channels:

In addition, `spring-integration-kafka` milestones (3.0.0.M2 for `spring-kafka` 2.0, and 2.3.0.RC1 for `spring-kafka 1.3`, and 2.2.0.M1 for `spring-kafka` 1.2 are also available in the milestone repository.

Also the maintenance version `spring-integration-kafka-2.1.2.RELEASE` is available with `ErrorMessageStrategy` and `sendFailureChannel` support for the `KafkaProducerMessageHandler`. At the same time the success (`SendResult.getRecordMetadata()`) of the publishing to the topic is sent to the `outputChannel` as a `kafka_recordMetadata` header together with the `requstMessage` as payload.

See the [Project Page](http://projects.spring.io/spring-kafka/) for a complete matrix of `spring-kafka`, `spring-integration-kafka` and `kafka-clients` version compatibility.

[Project Page](http://projects.spring.io/spring-kafka/) | [Issues](https://github.com/spring-projects/spring-kafka/issues) | [Contributing](https://github.com/spring-projects/spring-kafka/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-kafka) | [Chat](https://gitter.im/spring-projects/spring-kafka)