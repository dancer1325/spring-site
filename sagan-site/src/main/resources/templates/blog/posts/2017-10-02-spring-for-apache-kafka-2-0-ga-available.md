---
title: Spring For Apache Kafka 2.0 GA Available
source: https://spring.io/blog/2017/10/02/spring-for-apache-kafka-2-0-ga-available
scraped: 2026-02-23T16:20:25.831Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  October 02, 2017 | 2 Comments
---

# Spring For Apache Kafka 2.0 GA Available

_Releases | Artem Bilan |  October 02, 2017 | 2 Comments_

We are pleased to announce the general availability of the [2.0.0.RELEASE](https://github.com/spring-projects/spring-kafka/milestone/22?closed=1) of the Spring for Apache Kafka `2.0` version.

As mentioned in the [2.0 RC1 announcement](https://spring.io/blog/2017/09/12/spring-for-apache-kafka-2-0-and-1-3-release-candidates-available), the `1.3 GA` is also available supporting the Kafka `0.11.x.x` client with Spring Framework `4.3.x` applications.

They are available for download from the [Release Repository](https://repo.spring.io/release) and Maven Central:

```
Copyrepositories {
    maven { url 'http://repo.spring.io/release' }
}
compile "org.springframework.kafka:spring-kafka:2.0.0.RELEASE"
```

That was 6 months journey to bring a Java 8 and Spring Framework 5 vision for Spring for Apache Kafka project and here is what we have so far overall:

-   Apache Kafka `0.11.x.x` client
    
-   Transactions support
    
-   Headers mapping
    
-   Kafka Streams support
    
-   `KafkaAdmin` is now available to automatically add topics (for `NewTopic` beans present in the application context)
    
-   `errorHandler` and `groupId` support for `@KafkaListener`; also `Consumer` argument resolution
    
-   `@EmbeddedKafka` for testing support
    

Many of these features are also available in the 1.3 release.

Thanks to all community members for any feedback and contributions!

Also the minor version `spring-integration-kafka-2.3.0.RELEASE` is available. This version utilize the `spring-kafka-1.3.0.RELEASE` foundation and provide some functionality to support Apache Kafka `0.11.x.x` client.

See the [Project Page](http://projects.spring.io/spring-kafka/) for a complete matrix of `spring-kafka`, `spring-integration-kafka` and `kafka-clients` version compatibility.

[Project Page](http://projects.spring.io/spring-kafka/) | [Issues](https://github.com/spring-projects/spring-kafka/issues) | [Contributing](https://github.com/spring-projects/spring-kafka/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-kafka) | [Chat](https://gitter.im/spring-projects/spring-kafka)