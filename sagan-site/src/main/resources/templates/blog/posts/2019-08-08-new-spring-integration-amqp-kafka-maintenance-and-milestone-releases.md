---
title: New Spring Integration, AMQP, Kafka Maintenance and Milestone Releases (08/2019)
source: https://spring.io/blog/2019/08/08/new-spring-integration-amqp-kafka-maintenance-and-milestone-releases
scraped: 2026-02-23T14:39:46.210Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  August 08, 2019 | 1 Comment
---

# New Spring Integration, AMQP, Kafka Maintenance and Milestone Releases (08/2019)

_Releases | Gary Russell |  August 08, 2019 | 1 Comment_

We are pleased to announce the following maintenance releases are now available.

**All users are encouraged to upgrade to these versions**

### [](#spring-integration)[](#spring-integration)Spring Integration

-   [5.1.7.RELEASE](https://github.com/spring-projects/spring-integration/releases/tag/v5.1.7.RELEASE)
    
-   [5.0.14.RELEASE](https://github.com/spring-projects/spring-integration/releases/tag/v5.0.14.RELEASE)
    
-   [4.3.21.RELEASE](https://github.com/spring-projects/spring-integration/releases/tag/v4.3.21.RELEASE)
    

[Project Page](https://spring.io/projects/spring-integration/) | [GitHub](https://github.com/spring-projects/spring-integration) | [Issues](https://github.com/spring-projects/spring-integration/issues) | [Documentation](https://docs.spring.io/spring-integration/docs/5.1.7.RELEASE/reference/html) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-integration) | [Gitter](https://gitter.im/spring-projects/spring-integration)

### [](#spring-amqp-spring-for-rabbitmq)[](#spring-amqp-spring-for-rabbitmq)Spring AMQP (Spring for RabbitMQ)

-   [2.1.8.RELEASE](https://github.com/spring-projects/spring-amqp/releases/tag/v2.1.8.RELEASE).
    
-   [2.0.13.RELEASE](https://github.com/spring-projects/spring-amqp/releases/tag/v2.0.13.RELEASE).
    
-   [1.7.14.RELEASE](https://github.com/spring-projects/spring-amqp/releases/tag/v1.7.14.RELEASE).
    

[Project Page](https://spring.io/projects/spring-amqp/) | [GitHub](https://github.com/spring-projects/spring-amqp) | [Issues](https://github.com/spring-projects/spring-amqp/issues) | [Documentation](https://docs.spring.io/spring-amqp/docs/2.1.8.RELEASE/reference/html) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-amqp) | [Gitter](https://gitter.im/spring-projects/spring-amqp)

### [](#spring-for-apache-kafka)[](#spring-for-apache-kafka)Spring for Apache Kafka

-   [2.2.8.RELEASE](https://github.com/spring-projects/spring-kafka/releases/tag/v2.2.8.RELEASE)
    
-   [2.1.13.RELEASE](https://github.com/spring-projects/spring-kafka/releases/tag/v2.1.13.RELEASE)
    
-   [1.3.10.RELEASE](https://github.com/spring-projects/spring-kafka/releases/tag/v1.3.10.RELEASE)
    

[Project Page](https://spring.io/projects/spring-kafka/) | [GitHub](https://github.com/spring-projects/spring-kafka) | [Issues](https://github.com/spring-projects/spring-kafka/issues) | [Documentation](https://docs.spring.io/spring-kafka/docs/2.2.8.RELEASE/reference/html/) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-kafka) | [Gitter](https://gitter.im/spring-projects/spring-kafka)

**In addition, milestone 4 (and the previously unannounced milestone 3) of the next generations are also available:**

### [](#spring-integration-1)[](#spring-integration-2)Spring Integration

-   [5.1.0.M4](https://github.com/spring-projects/spring-integration/releases/tag/v5.2.0.M4)
    
-   [5.1.0.M3](https://github.com/spring-projects/spring-integration/releases/tag/v5.2.0.M3)
    
-   [What’s New?](https://docs.spring.io/spring-integration/docs/5.2.0.M4/reference/html/whats-new.html)
    

#### [](#highlights-in-these-milestones)[](#highlights-in-these-milestones)Highlights in these Milestones

-   RabbitMQ - support for consumer side batching (`List<?>` payloads from multiple source messages or producer batches)
    
-   Multi-page reference manual to speed browser load time
    
-   Control Bus support for `Pausable` components
    
-   `Flux<?>`\-based aggregator
    
-   Validation support for inbound HTTP components
    
-   New header aggregation strategy to customize aggregator behavior
    
-   Improved exception information making it easier to identify where a failure occurred
    
-   FTP/SFTP server application event publishers for Apache MINA servers
    

#### [](#previous-milestones)[](#previous-milestones)Previous Milestones

-   [Change log for M2](https://github.com/spring-projects/spring-integration/releases/tag/v5.2.0.M2)
    
-   [Change log for M1](https://github.com/spring-projects/spring-integration/releases/tag/v5.2.0.M1)
    

[Project Page](https://spring.io/projects/spring-integration/) | [GitHub](https://github.com/spring-projects/spring-integration) | [Issues](https://github.com/spring-projects/spring-integration/issues) | [Documentation](https://docs.spring.io/spring-integration/docs/5.2.0.M4/reference/html) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-integration) | [Gitter](https://gitter.im/spring-projects/spring-integration)

### [](#spring-amqp-spring-for-rabbitmq-1)[](#spring-amqp-spring-for-rabbitmq-2)Spring AMQP (Spring for RabbitMQ)

-   [2.2.0.M4](https://github.com/spring-projects/spring-amqp/releases/tag/v2.2.0.M4).
    
-   [2.2.0.M3](https://github.com/spring-projects/spring-amqp/releases/tag/v2.2.0.M3).
    
-   [What’s New?](https://docs.spring.io/spring-amqp/docs/2.2.0.M4/reference/html/#_changes_in_2_2_since_2_1)
    

#### [](#highlights-in-these-milestones-1)[](#highlights-in-these-milestones-2)Highlights in these Milestones

-   Shuffle option to randomize node when connecting to a cluster
    
-   Consumer-side batching (get a `List<Message>` based on a batch size or receive timeout)
    
-   Batching support with `@RabbitListener`
    

#### [](#previous-milestones-1)[](#previous-milestones-2)Previous Milestones

-   [Change log for M2](https://github.com/spring-projects/spring-amqp/releases/tag/v2.2.0.M2).
    
-   [Change log for M1](https://github.com/spring-projects/spring-amqp/releases/tag/v2.2.0.M1).
    

[Project Page](https://spring.io/projects/spring-amqp/) | [GitHub](https://github.com/spring-projects/spring-amqp) | [Issues](https://github.com/spring-projects/spring-amqp/issues) | [Documentation](https://docs.spring.io/spring-amqp/docs/2.1.0.M1/reference/html) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-amqp) | [Gitter](https://gitter.im/spring-projects/spring-amqp)

### [](#spring-for-apache-kafka-1)[](#spring-for-apache-kafka-2)Spring for Apache Kafka

-   [2.2.0.M4](https://github.com/spring-projects/spring-kafka/releases/tag/v2.3.0.M4).
    
-   [2.2.0.M3](https://github.com/spring-projects/spring-kafka/releases/tag/v2.3.0.M3).
    
-   [What’s New?](https://docs.spring.io/spring-kafka/docs/2.3.0.M4/reference/html/#spring-kafka-intro-new)
    

#### [](#highlights-in-these-milestones-2)[](#highlights-in-these-milestones-3)Highlights in these Milestones

-   Option to use thread-bound `Producer` s
    
-   Add `RecordInterceptor` to the listener container
    
-   Add delegating serializer/deserializer to support multiple types
    
-   Add relative seek capability to `ConsumerSeekAware` (seek to `current - 1`, for example)
    
-   Add seek to timestamp to `ConsumerSeekAware`
    
-   Simplified embedded kafka configuration when using Spring Boot
    
-   Support for custom correlation and reply-to headers in `ReplyingKafkaTemplate`
    
-   Documentation improvements
    

#### [](#previous-milestones-2)[](#previous-milestones-3)Previous Milestones

-   [Change log for M2](https://github.com/spring-projects/spring-kafka/releases/tag/v2.3.0.M2)
    
-   [Change log for M1](https://github.com/spring-projects/spring-kafka/releases/tag/v2.3.0.M1)
    

[Project Page](https://spring.io/projects/spring-kafka/) | [GitHub](https://github.com/spring-projects/spring-kafka) | [Issues](https://github.com/spring-projects/spring-kafka/issues) | [Documentation](https://docs.spring.io/spring-kafka/docs/2.3.0.M4/reference/html/) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-kafka) | [Gitter](https://gitter.im/spring-projects/spring-kafka)