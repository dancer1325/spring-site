---
title: Spring for Apache Kafka 2.7.0 Available
source: https://spring.io/blog/2021/04/14/spring-for-apache-kafka-2-7-0-available
scraped: 2026-02-23T13:27:27.773Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Gary Russell |  April 14, 2021 | 2 Comments
---

# Spring for Apache Kafka 2.7.0 Available

_Engineering | Gary Russell |  April 14, 2021 | 2 Comments_

I am pleased to announce that Spring for Apache Kafka 2.7.0 is now available.

This release contains a significant enhancement, which is a community contribution. Failed deliveries can be forwarded to a series of topics for delayed redelivery.

It is best described with an example:

```
Copy@RetryableTopic(attempts = "5", backoff = @Backoff(delay = 1000, multiplier = 2.0))
@KafkaListener(id = "sk270", topics = "sk270")
public void listen(String in, @Header(KafkaHeaders.RECEIVED_TOPIC) String topic) {
    LOG.info(in + " from " + topic);
    throw new RuntimeException("test");
}

@DltHandler
public void dlt(String in, @Header(KafkaHeaders.RECEIVED_TOPIC) String topic) {
    LOG.info(in + " from " + topic);
}
```

With this configuration, the first delivery attempt fails and the record is sent to a topic configured for a 1-second delay. When that delivery fails, the record is sent to a topic with a 2-second delay. When that delivery fails, it goes to a topic with a 4-second delay, then an 8 second delay, and, finally, to a dead letter topic with an (optional) `@DltHandler` method.

This allows processing of subsequent records from the same partition while retrying the failed record. Of course, if strict ordering is needed, then traditional retries should be used.

The framework takes care of provisioning the main and delayed topics. The consumers on the delayed topics are paused until the current time exceeds the record timestamp plus the delay.

For information about all changes in this release, see [What’s New](https://docs.spring.io/spring-kafka/docs/current/reference/html/#whats-new-part).

[Project Page](https://spring.io/projects/spring-kafka/) | [GitHub](https://github.com/spring-projects/spring-kafka) | [Issues](https://github.com/spring-projects/spring-kafka/issues) | [Documentation](https://docs.spring.io/spring-kafka/docs/2.7.0/reference/html/) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-kafka) | [Gitter](https://gitter.im/spring-projects/spring-kafka)