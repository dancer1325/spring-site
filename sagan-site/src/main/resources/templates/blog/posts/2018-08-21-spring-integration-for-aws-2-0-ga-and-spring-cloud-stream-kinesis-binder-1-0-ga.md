---
title: Spring Integration for AWS 2.0 GA and Spring Cloud Stream Kinesis Binder 1.0 GA
source: https://spring.io/blog/2018/08/21/spring-integration-for-aws-2-0-ga-and-spring-cloud-stream-kinesis-binder-1-0-ga
scraped: 2026-02-23T15:16:28.890Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  August 21, 2018 | 0 Comments
---

# Spring Integration for AWS 2.0 GA and Spring Cloud Stream Kinesis Binder 1.0 GA

_Releases | Artem Bilan |  August 21, 2018 | 0 Comments_

Dear Spring Community!

It’s my pleasure to announce General Availability for Spring projects supporting [Amazon Web Services](https://aws.amazon.com/): [Spring Integration for AWS](https://github.com/spring-projects/spring-integration-aws) `2.0.0.RELEASE` and [Spring Cloud Stream Binder for AWS Kinesis](https://github.com/spring-cloud/spring-cloud-stream-binder-aws-kinesis) `1.0.0.RELEASE`.

Both artifacts are available in the [Spring Release](https://repo.spring.io/release/) repository and Maven Central and can be used as dependencies:

```
Copy<dependency>
    <groupId>org.springframework.integration</groupId>
    <artifactId>spring-integration-aws</artifactId>
    <version>2.0.0.RELEASE</version>
</dependency>
...
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-stream-binder-kinesis</artifactId>
    <version>1.0.0.RELEASE</version>
</dependency>
```

The `spring-integration-aws` is not needed to be includes when the second one is in use.

The main goal of this Spring Integration for AWS `2.0` generation was, of course, around AWS Kinesis support which was driven by the work done in the Spring Cloud Stream Binder for AWS Kinesis. In particular we have introduced a `DynamoDbMetadataStore` and `DynamoDbLockRegistry` to support distributed Binder consumers for the AWS Kinesis. At the same time, following well-formed Spring Integration abstractions, these new components can be used in any other distributed tasks, when your application is deployed into the Amazon cloud environment or when you rely on the AWS services. For example AWS S3 Inbound Channel Adapters can use a `DynamoDbMetadataStore` for the `S3PersistentAcceptOnceFileListFilter` to prevent access to the same already processed resource in several distributed application instances. The `DynamoDbLockRegistry` can be used for leader election in the application cluster. See more information about `LockRegistryLeaderInitiator` in the [Spring Integration Reference Manual](https://docs.spring.io/spring-integration/docs/current/reference/html/messaging-endpoints-chapter.html#leadership-event-handling).

In addition to those new components tne SNS and SQS Channel Adapters support now headers mapping to the message attributes as back. See `AbstractMessageAttributesHeaderMapper` Javadocs and its implementations for more details.

The Kinesis Channel Adapters also support headers mapping, but the mechanism is fully different and we can only **embed** them together with the payload into the record body. See an `EmbeddedJsonHeadersMessageMapper` in Spring Integration for more details. Similar embedding technique is used in the Kinesis Binder when `headerMode` is `embedded` (default one).

See previous release [announcements](https://spring.io/blog/2018/08/01/spring-integration-for-aws-2-0-0-rc1-and-spring-cloud-stream-kinesis-binder-1-0-0-rc1) for more information about new features in the Spring Integration for AWS `2.0` and what Spring Cloud Stream Binder for AWS Kinesis is about.

Also see [Spring Cloud Stream Samples](https://github.com/spring-cloud/spring-cloud-stream-samples) for more ideas how Kinesis Binder can be used in cloud streaming applications.

Thanks everyone who contributed to these projects any possible way.

We are looking forward for any feedback and thrilled to evolve these projects for better community requirements in the next installments.

[Spring Integration AWS Project Page](https://github.com/spring-projects/spring-integration-aws) | [Spring Cloud Stream Binder for AWS Kinesis Project Page](https://github.com/spring-cloud/spring-cloud-stream-binder-aws-kinesis) | [Help](https://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-cloud/spring-cloud-stream)