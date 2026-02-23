---
title: Spring for Apache Kafka 2.3 Milestone 2
source: https://spring.io/blog/2019/05/13/spring-for-apache-kafka-2-3-milestone-2
scraped: 2026-02-23T14:48:43.295Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  May 13, 2019 | 1 Comment
---

# Spring for Apache Kafka 2.3 Milestone 2

_Releases | Gary Russell |  May 13, 2019 | 1 Comment_

We are pleased to announce the availability of the second milestone of the Spring for Apache Kafka 2.3 release - 2.3.0.M2.

### [](#highlights)[](#highlights)Highlights

-   `SeekToCurrentErrorHandler` can be configured to not retry certain exceptions.
    
-   The new `RecoveringDeserializationExceptionHandler` can recover from failed deserialization operations in Kafka Streams applications, for example to send the failed message to a dead-letter topic.
    
-   The new `HeaderEnricher` transformer can be added to a Kafka Streams topology to add headers.
    
-   The new `MessagingTransformer` can be used to invoke a Spring Integration flow within a Kafka Streams topology.
    
-   The new `AggregatingReplyingKafkaTemplate` can send a record and wait for responses from multiple consumers.
    

For more information see the [What’s New chapter in the documentation](https://docs.spring.io/spring-kafka/docs/2.3.0.M2/reference/html/#whats-new-part) and the change logs.

-   [Change log for M1](https://github.com/spring-projects/spring-kafka/releases/tag/v2.3.0.M1)
    
-   [Change log for M2](https://github.com/spring-projects/spring-kafka/releases/tag/v2.3.0.M2)
    

In addition, Spring Integration for Apache Kafka (`spring-integration-kafka`) 3.2.0.M2 is available; it is based on Spring for Apache Kafka 2.3 and Spring Integration 5.2.

-   The `KafkaMessageSource` consumer can now be paused/resumed.
    
-   The `KafkaMessageSource` consumer can now be configured to retrieve multiple records on each poll.
    
-   XML configuration is now available for all components.
    

See the [Spring Integration Chapter](https://docs.spring.io/spring-kafka/docs/2.3.0.M2/reference/html/#spring-integration) for more information.

[Project Page](http://projects.spring.io/spring-kafka/) | [GitHub](https://github.com/spring-projects/spring-kafka) | [Issues](https://github.com/spring-projects/spring-kafka/issues) | [Documentation](http://docs.spring.io/spring-kafka/docs/2.3.0.M2/reference/html/) | [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-kafka) | [Gitter](https://gitter.im/spring-projects/spring-kafka)