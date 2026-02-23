---
title: Spring for Apache Kafka 1.0 Release Candidate 1 Available
source: https://spring.io/blog/2016/06/07/spring-for-apache-kafka-1-0-release-candidate-1-available
scraped: 2026-02-23T19:14:11.586Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  June 07, 2016 | 0 Comments
---

# Spring for Apache Kafka 1.0 Release Candidate 1 Available

_Releases | Artem Bilan |  June 07, 2016 | 0 Comments_

On behalf of the Spring Integration and Spring Cloud Stream teams, I’m pleased to announce that the `spring-kafka` (Spring for Apache Kafka) Release Candidate for version `1.0` is now available.

The artifacts `org.springframework.kafka:spring-kafka:1.0.0.RC1` and `org.springframework.kafka:spring-kafka-test:1.0.0.RC1` are available in the [Milestone](https://repo.spring.io/milestone/) repository.

First of all many thanks to everyone involved, to active community members, who provided feature requests and contributions. Special thanks to [Martin Dam](https://github.com/martindam), who spent a lot of time helping us with the `pause/resume` algorithm to handle slow listeners.

There have been a number of reworks and housekeeping since the [Second Milestone](https://spring.io/blog/2016/04/11/spring-for-apache-kafka-1-0-milestone-2-available) including:

-   A `ConsumerRebalanceListener` can be injected into the `MessageListenerContainer`;
    
-   The `KafkaConsumer` and `KafkaProducer` can be customized with `(De)Serializer` s for `key` and `value` in the `ConsumerFactory` and `ProducerFactory`, respectively; this is an alternative to configuring using the properties.
    
-   `JsonSerializer` and `JsonDeserializer` s are provided, based on the Jackson library;
    
-   A `RecordFilterStrategy` and the `FilteringMessageListenerAdapter` are provided to allow skipping records or dealing with duplicate deliveries;
    
-   A self-explanatory `RetryingMessageListenerAdapter` is provided;
    
-   A `ListenerContainerIdleEvent` is emitted, after a configurable time, when the `MessageListenerContainer` has moved to an idle state;
    
-   `TopicPartitionInitialOffset` is provided to allow configuring the `MessageListenerContainer` to be assigned to specific partitions in the topic(s) and, optionally, seek to the desired offset when starting;
    
-   The `@KafkaListener` 's `@TopicPartition` attribute is enhanced with the `@PartitionOffset` property for initial offset configuration;
    
-   Improvements for consumer rebalance events.
    

# [](#pause-and-resume-for-slow-listeners)[](#pause-and-resume-for-slow-listeners)Pause and resume for slow listeners

The main feature that has been implemented for this Release Candidate, is pausing/resuming the `KafkaConsumer` when the target listener is slow to process records. If we don’t poll `KafkaConsumer` within the `session.timeout.ms`, Kafka presumes our consumer is defective and initiates a partition rebalance process, when using group management for partition assignment. To stay alive, we have to poll consumer. Consider the case where Kafka returned a large number of records on a poll and it takes longer than the session timeout to process them. For this purpose, the `MessageListenerContainer` can be configured with `enablePause`, `pauseAfter` and `queueDepth` - and the `KafkaConsumer` will be paused (polling continues but no records will be received) until the listener completes its work and the consumer is resumed. One more time thanks to [Martin Dam](https://github.com/martindam) for his help with this feature and his testing.

See also the [Reference Manual](http://docs.spring.io/spring-kafka/docs/1.0.0.RC1/reference/htmlsingle/) for more information.

# [](#spring-integration-kafka-support)[](#spring-integration-kafka-support)Spring Integration Kafka Support

Don’t miss the [Release Candidate](https://spring.io/blog/2016/06/07/spring-integration-kafka-support-2-0-0-release-candidate-is-now-available) for Spring Integration Kafka 2.0 which is reworked to be based on this Spring for Apache Kafka foundation.

# [](#next-steps)[](#next-steps)Next Steps

We expect to release the GA in about a week, so please give the candidate a try and report any issues as soon as possible.

[Project Page](http://projects.spring.io/spring-kafka/) | [Documentation](http://docs.spring.io/spring-kafka/docs/1.0.0.RC1/reference/htmlsingle/) | [Issues](https://github.com/spring-projects/spring-kafka/issues) | [Help](http://stackoverflow.com/questions/tagged/spring-integration)

# [](#spring-one-platform)[](#spring-one-platform)Spring One Platform

[Gary Russell](https://spring.io/team/grussell) will be talking about [Spring for Apache Kafka](https://2016.event.springoneplatform.io/schedule/sessions/spring_for_apache_kafka.html) at [Spring One Platform](http://springoneplatform.io), which is taking place in Las Vegas between August 1-4 this year. There are many other great talks so [check the agenda](https://2016.event.springoneplatform.io/schedule/sessions) and [get your ticket](https://2016.event.springoneplatform.io/register) if you haven’t done so already.