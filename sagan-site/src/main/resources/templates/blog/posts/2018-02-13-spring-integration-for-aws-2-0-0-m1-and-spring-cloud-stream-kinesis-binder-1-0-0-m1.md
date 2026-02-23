---
title: Spring Integration for AWS 2.0.0.M1 and Spring Cloud Stream Kinesis Binder 1.0.0.M1
source: https://spring.io/blog/2018/02/13/spring-integration-for-aws-2-0-0-m1-and-spring-cloud-stream-kinesis-binder-1-0-0-m1
scraped: 2026-02-23T16:09:04.572Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  February 13, 2018 | 5 Comments
---

# Spring Integration for AWS 2.0.0.M1 and Spring Cloud Stream Kinesis Binder 1.0.0.M1

_Releases | Artem Bilan |  February 13, 2018 | 5 Comments_

Dear Spring Community!

It’s my pleasure to announce two Spring Milestone releases for [Amazon Web Services](https://aws.amazon.com/): [Spring Integration for AWS](https://github.com/spring-projects/spring-integration-aws) `2.0.0.M1` and [Spring Cloud Stream Binder for AWS Kinesis](https://github.com/spring-cloud/spring-cloud-stream-binder-aws-kinesis) `1.0.0.M1`.

Both milestones are available in the [Spring Milestone](https://repo.spring.io/milestone/) repository and they can be consumed as maven dependencies:

```
Copy<dependency>
    <groupId>org.springframework.integration</groupId>
    <artifactId>spring-integration-aws</artifactId>
    <version>2.0.0.M1</version>
</dependency>

<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-stream-binder-kinesis</artifactId>
    <version>1.0.0.M1</version>
</dependency>
```

## [](#spring-integration-for-aws)[](#spring-integration-for-aws)Spring Integration for AWS

The `2.0` version is the next generation of Spring Integration for AWS Framework. It is based on Java `8`, Spring Framework & Spring Integration `5.0` and [Spring Cloud for AWS](https://github.com/spring-cloud/spring-cloud-aws) `2.0`. In this new instalment we have improved all `MessageHandler` implementations to extend common `AbstractAwsMessageHandler` with the `AsyncHandler`, `failureChannel` and `ErrorMessageStrategy` support. A set of `AwsHeaders.RECEIVED_` headers have been added to avoid confusion on the outbound side when request messages arrive from the upstream AWS Inbound Channel Adapter. This comes handy when using it with a Spring Cloud Stream “processor-application” that requires same inbound and outbound bindings. The `KinesisMessageDrivenChannelAdapter` now supports error handling via `errorChannel` and a new `KinesisMessageHeaderErrorMessageStrategy` provides useful `AwsHeaders.RAW_RECORD` information in the `ErrorMessage` headers.

## [](#spring-cloud-stream-binder-for-aws-kinesis)[](#spring-cloud-stream-binder-for-aws-kinesis)Spring Cloud Stream Binder for AWS Kinesis

The Spring Cloud Stream Binder for AWS Kinesis provides the binding implementation for the Spring Cloud Stream. This implementation uses Spring Integration AWS Kinesis Channel Adapters at its foundation. The following captures how the Kinesis Binder implementation maps each of the configured destination to a AWS Kinesis Streams:

![LKinesis Binder](https://raw.githubusercontent.com/spring-cloud/spring-cloud-stream-binder-aws-kinesis/master/spring-cloud-stream-binder-kinesis-docs/src/main/asciidoc/images/kinesis-binder.png)

Unlike [Apache Kafka](https://kafka.apache.org/) the AWS Kinesis doesn’t provide out-of-the-box support for consumer groups. The support of this feature is implemented as a part of `MetadataStore`. A key for shard checkpoints in the `KinesisMessageDrivenChannelAdapter` - `[CONSUMER_GROUP]:[STREAM]:[SHARD_ID]`. By default Kinesis Binder uses `DynamoDbMetaDataStore` implementation, which is also inherited from the Spring Integration for AWS project as mentioned above.

Similar to RabbitMQ and Apache Kafka, it is possible to override binding configurations, both at the producer and consumer. They are exposed in the `KinesisConsumerProperties` and `KinesisProducerProperties`, respectively.

Many thanks to all the [community members](https://github.com/spring-cloud/spring-cloud-stream-binder-aws-kinesis/graphs/contributors) who helped shape this project with their valuable inputs and contributions!

Any feedback, feature ideas, critics, bug reports and questions are welcome via appropriate communication channels.

[Spring Integration AWS Project Page](https://cloud.spring.io/spring-cloud-gcp) | [Spring Cloud Stream Binder for AWS Kinesis Project Page](https://github.com/spring-cloud/spring-cloud-stream-binder-aws-kinesis) | [Help](https://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-cloud/spring-cloud-stream)