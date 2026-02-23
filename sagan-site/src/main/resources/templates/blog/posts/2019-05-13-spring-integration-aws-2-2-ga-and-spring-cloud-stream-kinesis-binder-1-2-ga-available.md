---
title: Spring Integration AWS 2.2 GA and Spring Cloud Stream Kinesis Binder 1.2 GA Available
source: https://spring.io/blog/2019/05/13/spring-integration-aws-2-2-ga-and-spring-cloud-stream-kinesis-binder-1-2-ga-available
scraped: 2026-02-23T14:48:29.236Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  May 13, 2019 | 1 Comment
---

# Spring Integration AWS 2.2 GA and Spring Cloud Stream Kinesis Binder 1.2 GA Available

_Releases | Artem Bilan |  May 13, 2019 | 1 Comment_

Today it’s my pleasure to announce General Availability of Spring Integration for Amazon Web Services extension version `2.2.0` and Spring Cloud Stream Binder for AWS Kinesis version `1.2.0`.

These releases can be downloaded from Maven Central, JCenter, and our [release repository](https://repo.spring.io/release):

```
Copycompile "org.springframework.integration:spring-integration-aws:2.2.0.RELEASE"
```

If you don’t use Kinesis Binder. Or via Binder dependency:

```
Copycompile "org.springframework.cloud:spring-cloud-stream-binder-kinesis:1.2.0.RELEASE"
```

The main theme of both these releases is about new functionality to support [Kinesis Client](https://docs.aws.amazon.com/streams/latest/dev/developing-consumers-with-kcl.html) and [Kinesis Producer](https://docs.aws.amazon.com/streams/latest/dev/developing-producers-with-kpl.html) libraries. For this purpose the `spring-integration-aws` is shipped with `KclMessageDrivenChannelAdapter` and `KplMessageHandler` implementations, respectively. At the moment an implementation is based on the `KCL v1.x`, since not all AWS dependencies we use in the `spring-integration-aws` provide the `AWS SKD v2` implementation. Based on the Kinesis Client Library investigation, an additional `CheckpointMode.periodic` has been introduced to both `KclMessageDrivenChannelAdapter` and `KinesisMessageDrivenChannelAdapter`.

The `spring-cloud-stream-binder-kinesis` is based on the recently released Spring Cloud Stream version `2.2` and provides a new Binder configuration option to enable `KCL/KPL` functionality:

```
Copyspring.cloud.stream.kinesis.binder.kplKclEnabled = true
```

The `KCL/KPL` dependencies are included explicitly into the `spring-cloud-stream-binder-kinesis`, so there is just left a simple decision about selecting classical or `KCL/KPL` mode for Kinesis Binder.

Another new feature in the Kinesis Binder is for [DynamoDB Streams](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html), which can be handled as Kinesis Consumer records. For this purpose a particular input binding should be configured with the property:

```
Copyspring.cloud.stream.kinesis.bindings.<channelName>.consumer.dynamoDbStreams = true
```

Also a configuration for the DynamoDB and Cloud Watch are optional now if your Spring Cloud Stream Microservice works only in a `source` mode. There is only need to worry about a Kinesis producer configuration, either classical or `KPL` mode.

Many thanks to everyone from the Community for all the feedback and contribution to these projects.

Any feedback is welcome via all the available communication channels!

Spring Integration for AWS resources:

[Project Page](https://github.com/spring-projects/spring-integration-aws) | [Contributing](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)

Spring Cloud Stream Binder for AWS Kinesis resources:

[Project Page](https://github.com/spring-cloud/spring-cloud-stream-binder-aws-kinesis) | [Contributing](https://github.com/spring-cloud/spring-cloud-stream-binder-aws-kinesis/blob/master/spring-cloud-stream-binder-kinesis-docs/src/main/asciidoc/contributing.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-cloud-stream) | [Chat](https://gitter.im/spring-projects/spring-cloud-stream)