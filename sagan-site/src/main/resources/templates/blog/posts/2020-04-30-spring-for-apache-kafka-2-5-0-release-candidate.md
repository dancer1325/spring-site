---
title: Spring for Apache Kafka 2.5.0 Release Candidate
source: https://spring.io/blog/2020/04/30/spring-for-apache-kafka-2-5-0-release-candidate
scraped: 2026-02-23T14:02:40.807Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  April 30, 2020 | 0 Comments
---

# Spring for Apache Kafka 2.5.0 Release Candidate

_Releases | Gary Russell |  April 30, 2020 | 0 Comments_

The `2.5.0.RC1` release candidate is now avaialable in the [Spring milestone repo](https://repo.spring.io/milestone).

Update: 2.5.0.RELEASE was released on May 13th.

Highlights:

-   `kafka-clients` 2.5.0 (alignment of version numbers is coincidental).
    
-   Support for re-committing retryable offset commit exceptions for retained partitions when using cooperative rebalancing.
    
-   Support for the new "fetch-offset-request" procuder fencing (when brokers are 2.5 or higher), requiring fewer producers.
    
-   Support for static group membership.
    
-   More integration with Micrometer.
    
-   Optional Delivery Attempts header.
    
-   `RecoveringBatchErrorHandler` can commit a partial batch and replay from failed record in a batch (with cooperation of the listener); this is now the default for a batch listener.
    
-   Default error handler for record listener is now the `SeekToCurrentErrorHandler`.
    
-   Overridable producer properties in the `KafkaTemplate` allowing multiple templates to use the same producer factory.
    
-   Simple `String` serializer and deserializer are now provided.
    
-   More flexibility to determin the type to create in the `JsonDeserializer`.
    

See the [Reference manual "What’s New?"](https://docs.spring.io/spring-kafka/docs/2.5.0.RC1/reference/html/#whats-new-part) for more information.

The final release will be published shortly before the upcoming Spring Boot 2.3 GA release; please try out the candidate.

[Project Page](https://spring.io/projects/spring-kafka/) | [GitHub](https://github.com/spring-projects/spring-kafka) | [Issues](https://github.com/spring-projects/spring-kafka/issues) | [Documentation](https://docs.spring.io/spring-kafka/docs/2.5.0.RC1/reference/html/) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-kafka) | [Gitter](https://gitter.im/spring-projects/spring-kafka)