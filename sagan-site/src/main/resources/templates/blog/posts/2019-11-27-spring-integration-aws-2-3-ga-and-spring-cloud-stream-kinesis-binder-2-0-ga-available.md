---
title: Spring Integration AWS 2.3 GA and Spring Cloud Stream Kinesis Binder 2.0 GA Available
source: https://spring.io/blog/2019/11/27/spring-integration-aws-2-3-ga-and-spring-cloud-stream-kinesis-binder-2-0-ga-available
scraped: 2026-02-23T14:24:07.101Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  November 27, 2019 | 0 Comments
---

# Spring Integration AWS 2.3 GA and Spring Cloud Stream Kinesis Binder 2.0 GA Available

_Releases | Artem Bilan |  November 27, 2019 | 0 Comments_

Dear Spring Community,

Today it’s my pleasure to announce General Availability of Spring Integration for Amazon Web Services extension version `2.3.0` and Spring Cloud Stream Binder for AWS Kinesis version `2.0.0`.

These releases can be downloaded from Maven Central, JCenter, and our [release repository](https://repo.spring.io/release):

```
Copycompile "org.springframework.integration:spring-integration-aws:2.3.0.RELEASE"
```

If you don’t use Kinesis Binder. Or via Binder dependency:

```
Copycompile "org.springframework.cloud:spring-cloud-stream-binder-kinesis:2.0.0.RELEASE"
```

## [](#release-highlights)[](#release-highlights)Release Highlights

-   The main theme of both these releases is about an integration testing using a [Local Stack](https://github.com/localstack/localstack) framework which helped us to spot several bugs and race conditions in both libraries.
    
-   The `spring-integration-aws` provides a `PutRecordsRequest` (batch) support for `KplMessageHandler` collecting async results for `UserRecords` in that batch using Project Reactor `Mono.fromFuture()` functionality.
    
-   A `KinesisShardEndedEvent` is now emitted from the `KinesisMessageDrivenChannelAdapter` when the next shard request returns `null` with the meaning that shard is closed and no records can be added to that any more.
    
-   The `spring-cloud-stream-binder-kinesis` is based on the recently released Spring Cloud Stream version `3.0` and provides a new `KinesisBinderHealthIndicator` to check that all the streams involved in binding configurations are available.
    
-   A `ProducerMessageHandlerCustomizer` and `ConsumerEndpointCustomizer` can now be specified in the application context as bean and they are going to be injected into the `KinesisMessageChannelBinder` for an appropriate endpoints customization. This can be useful, for example, in cases when some endpoint properties are not covered by the configuration options.
    

Many thanks to everyone from the Community for all the feedback and contribution to these projects.

Any feedback is welcome via all the available communication channels!

Spring Integration for AWS resources:

[Project Page](https://github.com/spring-projects/spring-integration-aws) | [Contributing](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)

Spring Cloud Stream Binder for AWS Kinesis resources:

[Project Page](https://github.com/spring-cloud/spring-cloud-stream-binder-aws-kinesis) | [Contributing](https://github.com/spring-cloud/spring-cloud-stream-binder-aws-kinesis/blob/master/spring-cloud-stream-binder-kinesis-docs/src/main/asciidoc/contributing.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-cloud-stream) | [Chat](https://gitter.im/spring-projects/spring-cloud-stream)