---
title: Spring Integration for AWS 2.0.0.M2 and Spring Cloud Stream Kinesis Binder 1.0.0.M2
source: https://spring.io/blog/2018/04/17/spring-integration-for-aws-2-0-0-m2-and-spring-cloud-stream-kinesis-binder-1-0-0-m2
scraped: 2026-02-23T15:27:13.933Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  April 17, 2018 | 3 Comments
---

# Spring Integration for AWS 2.0.0.M2 and Spring Cloud Stream Kinesis Binder 1.0.0.M2

_Releases | Artem Bilan |  April 17, 2018 | 3 Comments_

Dear Spring Community!

It’s my pleasure to announce Milestone releases for Spring projects supporting [Amazon Web Services](https://aws.amazon.com/): [Spring Integration for AWS](https://github.com/spring-projects/spring-integration-aws) `2.0.0.M2` and [Spring Cloud Stream Binder for AWS Kinesis](https://github.com/spring-cloud/spring-cloud-stream-binder-aws-kinesis) `1.0.0.M2`.

Both milestones are available in the [Spring Milestone](https://repo.spring.io/milestone/) repository and they can be consumed as maven dependencies:

```
Copy<dependency>
    <groupId>org.springframework.integration</groupId>
    <artifactId>spring-integration-aws</artifactId>
    <version>2.0.0.M2</version>
</dependency>

<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-stream-binder-kinesis</artifactId>
    <version>1.0.0.M2</version>
</dependency>
```

Where the first one is not needed to be includes when the second one is in use. The [AWS Kinesis](https://aws.amazon.com/kinesis/) and [AWS DynamoDB](https://aws.amazon.com/dynamodb/) Java SDK dependencies are included transitively for AWS Kinesis Binder as well.

These Milestones are good effort of the team and some third-party contributors after valuable feedback from the community via StackOverflow questions, Gitter chats, bug reports and feature request. So, thank you everyone involved!

Here are changes since the previously announced [Milestone 1](https://spring.io/blog/2018/02/13/spring-integration-for-aws-2-0-0-m1-and-spring-cloud-stream-kinesis-binder-1-0-0-m1):

-   The `KinesisMessageDrivenChannelAdapter` has been improved for fault tolerance when intermittent network errors happen in the AWS Client.
    
-   The Kinesis `Checkpointer` has been improved to be based on the `ConcurrentMetadataStore` for better concurrent interactions, especially in cluster environment - consumer groups.
    
-   A headers mapping mechanism has been implemented for the `SqsMessageHandler` and `SnsMessageHandler` - the `SqsHeaderMapper` and `SnsHeaderMapper` as out-of-the-box implementations, respectively.
    
-   Since AWS Kinesis doesn’t provide any headers notations, we implemented workaround via *embedding headers* into the Kinesis `Record` body. For this purpose the `KinesisMessageHandler` and `KinesisMessageDrivenChannelAdapter` should be configured with the `OutboundMessageMapper` and `InboundMessageMapper`, respectively. As a good choice an out-of-the-box Spring Integration `EmbeddedJsonHeadersMessageMapper` can be used on both side to carry any desired message headers over AWS Kinesis.
    
-   The `KinesisMessageDrivenChannelAdapter` has also been supplied with the logic to convert records when `ListenerMode.batch` is used.
    
-   The `KinesisMessageChannelBinder` has been updated according the latest changes and fixes in the Spring Cloud Stream and Spring Integration AWS.
    
-   Also a new `rawRecords` listener mode has been introduced. By default the Kinesis Binder is configured for `record` mode where the message to emit contains payload as `byte[]` for the downstream conversion by the [Spring Cloud Stream](https://spring.io/blog/2018/02/26/spring-cloud-stream-2-0-content-type-negotiation-and-transformation). The `batch` mode now produces a `List<byte[]>` and this new `rawRecords` mode produces a message with a payload as `List<Record>` - and all the conversion logic to business model is up to end-user in the target `@StreamListener` method.
    

As usual any feedback, feature ideas, critics, bug reports and questions are welcome via appropriate communication channels!

[Spring Integration AWS Project Page](https://cloud.spring.io/spring-cloud-gcp) | [Spring Cloud Stream Binder for AWS Kinesis Project Page](https://github.com/spring-cloud/spring-cloud-stream-binder-aws-kinesis) | [Help](https://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-cloud/spring-cloud-stream)