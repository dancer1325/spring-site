---
title: Spring for Apache Kafka 2.3 is now available
source: https://spring.io/blog/2019/10/02/spring-for-apache-kafka-2-3-is-now-available
scraped: 2026-02-23T14:34:42.763Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  October 02, 2019 | 2 Comments
---

# Spring for Apache Kafka 2.3 is now available

_Releases | Gary Russell |  October 02, 2019 | 2 Comments_

We are pleased to announce the following releases are now available.

**All users are encouraged to upgrade to these versions**

-   [2.3.0.RELEASE (**new**)](https://github.com/spring-projects/spring-kafka/releases/tag/v2.3.0.RELEASE)
    
-   [2.2.9.RELEASE (**maintenance**)](https://github.com/spring-projects/spring-kafka/releases/tag/v2.2.8.RELEASE)
    

The 2.3.0 release is the first release of the newest line for this project.

Refer to the [What’s New](https://docs.spring.io/spring-kafka/reference/html/#whats-new-part) chapter for more information, but here are a few highlights:

#### [](#producing)[](#producing)Producing

-   Option to use a producer per thread, to avoid blocking other threads when flushing.
    
-   The `AggregatingReplyingKafkaTemplate` extension to the `ReplyingKafkaTemplate` is provided to aggregate replies from multiple consumers.
    

#### [](#consuming)[](#consuming)Consuming

-   You can now add a `RecordInterceptor` to modify the record before the listener is invoked.
    
-   `ConsumerSeekAware` now supports relative seeks.
    
-   You can now specify a delay between processing the results of the previous `poll()` and issuing the next `poll()`.
    
-   When using manual `AckMode` s, you can now negatively acknowledge a record and the container will perform the necessary seeks to replay the record.
    
-   Micrometer `Timer` s are now supported to monitor listener performance.
    
-   The `SeekToCurrentErrorHandler` can be configured to treat certain exceptions as fatal, disabling retry; you can also now add a `BackOff` between redelivery attempts for failed deliveries.
    
-   The `RetryingDeserializer` is provided to retry serialization in the event of, say, a network glitch accessing a schema registry.
    

#### [](#kafka-streams)[](#kafka-streams)Kafka Streams

-   The `RecoveringDeserializationExceptionHandler` is now provided for handling deserialization exceptions.
    
-   The `HeaderEnricherTransformer` is provided to add headers within a stream topology definition.
    
-   The `MessagingTransformer` is provided to allow invocation of a Spring Integration flow from within a stream definition.
    

#### [](#miscellaneous)[](#miscellaneous)Miscellaneous

-   Delegating serializer and deserializer implementations are provided to allow sending/receiving records containing different types.

[Project Page](https://spring.io/projects/spring-kafka/) | [GitHub](https://github.com/spring-projects/spring-kafka) | [Issues](https://github.com/spring-projects/spring-kafka/issues) | [Documentation](https://docs.spring.io/spring-kafka/docs/2.2.8.RELEASE/reference/html/) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-kafka) | [Gitter](https://gitter.im/spring-projects/spring-kafka)