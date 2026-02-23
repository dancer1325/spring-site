---
title: Spring Integration Kafka Support 1.1.GA is available
source: https://spring.io/blog/2015/03/26/spring-integration-kafka-support-1-1-ga-is-available
scraped: 2026-02-23T21:06:30.204Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  March 26, 2015 | 0 Comments
---

# Spring Integration Kafka Support 1.1.GA is available

_Releases | Artem Bilan |  March 26, 2015 | 0 Comments_

Dear Spring community,

We are pleased to announce that the Spring Integration Kafka Support 1.1 GA is now available. Use the [Release Repository](http://repo.springsource.org/release) with Maven or Gradle

```
Copycompile "org.springframework.integration:spring-integration-kafka:1.1.1.RELEASE"
```

or download a [distribution archive](http://repo.spring.io/release/org/springframework/integration/spring-integration-kafka/1.1.1.RELEASE), to give it a spin.

## [](#overview)Overview

The main reason of such a quick next point release just after [1.0 GA](https://spring.io/blog/2015/02/09/spring-integration-kafka-extension-1-0-ga-is-available) is to address a number of critical [fixes](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=11101&version=14931) for the upcoming [Spring XD](http://projects.spring.io/spring-xd/) `1.1.1` and `1.2` releases. In addition, this release provides performance improvements around message generation streaming scenarios, which required an upgrade to [Spring Integration](http://projects.spring.io/spring-integration/) `4.1`, which is the minimum for Spring XD also.

One more important feature, which has been introduced with this release, is *manual acknowledgment*, where a message's `offset` can be committed later on demand. For this purpose, Spring Integration Kafka introduces the `Acknowledgment` interface. When `KafkaMessageDrivenChannelAdapter#autoCommitOffset` is set to `false`, a `KafkaHeaders.ACKNOWLEDGMENT` header is added to the message, containing an `Acknowledgment` object. Having that message header you always can decide to `acknowledge()` the Kafka message or not in the downstream flow.

If you are using `KafkaMessageListenerContainer` directly, you can now register an `AcknowledgingMessageListener`:

```
Copypublic interface AcknowledgingMessageListener {
	void onMessage(KafkaMessage message, Acknowledgment acknowledgment);
}
```

When doing so, automatic offset updates are disabled, and you can use the `acknowledge()` method of the `Acknowledgment` argument to trigger an offset update.

## [](#what-next)What next?

Our plans are to work on `1.2` release. It will be a critical upgrade to [Kafka 0.8.2](http://kafka.apache.org/downloads.html), possibly non-backwards compatible. Plus we are going to expose more configurable options for retry support within Kafka Adapters. And much more!

[Project Page](https://github.com/spring-projects/spring-integration-kafka) | [JIRA](https://jira.spring.io/browse/INTEXT) | [Issues](https://github.com/spring-projects/spring-integration-kafka/issues) | \[Contributions\] ([https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.md](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.md)) | [StackOverflow](http://stackoverflow.com) (`spring-integration` tag)