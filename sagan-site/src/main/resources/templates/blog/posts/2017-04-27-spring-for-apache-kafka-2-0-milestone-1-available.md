---
title: Spring For Apache Kafka 2.0 Milestone 1 Available
source: https://spring.io/blog/2017/04/27/spring-for-apache-kafka-2-0-milestone-1-available
scraped: 2026-02-23T16:33:23.172Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  April 27, 2017 | 1 Comment
---

# Spring For Apache Kafka 2.0 Milestone 1 Available

_Releases | Gary Russell |  April 27, 2017 | 1 Comment_

We are very pleased to announce the availability of the first milestone of the Spring for Apache Kafka 2.0 release [2.0.0.M1](https://github.com/spring-projects/spring-kafka/milestone/13?closed=1).

Significant new features in the 2.0 line include:

-   Support for timestamps in the `KafkaTemplate`.
    
-   Seek to beginning/end of topics.
    
-   New threading model facilitated by [KIP-62](https://cwiki.apache.org/confluence/display/KAFKA/KIP-62%3A+Allow+consumer+to+send+heartbeats+from+a+background+thread) - now that the consumer client does not rely on `poll()` being called frequently, the threading model is much simpler; avoiding the need for internal `pause()` / `resume()` processing. Listeners are now always invoked on the consumer thread. This, in turn, has facilitated:
    
-   `ConsumerAwareMessageListener` (and `BatchConsumerAwareMessageListener`) are provided so that listener implementations can access the `Consumer<?, ?>` object to perform operations such as `pause()`, `resume()`, `metrics()` etc.
    
-   `@KafkaListener` POJO methods can now be annotated with `@SendTo` to send the method result to some other topic.
    
    @KafkaListener(id = "replyingListener", topics = "inTopic") @SendTo("replyTopic") public String replyingListener(String in) { return in.toUpperCase(); }
    

For more information, see [Forwarding Listener Results using @SendTo](http://docs.spring.io/spring-kafka/docs/2.0.0.BUILD-SNAPSHOT/reference/html/_reference.html#annotation-send-to).

-   `@KafkaListener` annotations now have an `errorHandler` property, allowing a custom error handler to be configured for each. Previously, you had to use a different container factory for each.
    
-   The embedded kafka server JUnit `@Rule` in `spring-kafka-test` can now be provided as a Spring Bean instead (and auto wired into your tests). For further simplification, the framework can auto-declare the bean for you; simply add `@EmbeddedKafka` to your test class. See [@EmbeddedKafka Annotation](http://docs.spring.io/spring-kafka/docs/2.0.0.BUILD-SNAPSHOT/reference/html/_reference.html#__embeddedkafka_annotation) for more information.
    

In addition, the first 3.0 milestone of the Spring Integration Kafka extension is available (3.0.0.M1) based on this `spring-kafka` milestone.

The milestone releases for both projects are available in the [Spring milestone repository](http://repo.spring.io/milestone/).

We very much appreciate the feedback (and contributions) received to-date.

Note

Unfortunately, the spring-kafka pom has an incorrect transitive dependency on `spring-messaging-5.0.0.BUILD-SNAPSHOT`. We don’t recommend using milestones in production, but in order to provide a stable platform for testing, you should override this dependency to `5.0.0.M5`.

General availability of the 2.0 release is expected to be in the early summer (shortly after the Spring Framework 5.0 release). Feedback, feature requests and, of course, contributions are welcomed via the usual channels:

[Project Page](http://projects.spring.io/spring-kafka/) | [Issues](https://github.com/spring-projects/spring-kafka/issues) | [Contributing](https://github.com/spring-projects/spring-kafka/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-kafka) | [Chat](https://gitter.im/spring-projects/spring-kafka)