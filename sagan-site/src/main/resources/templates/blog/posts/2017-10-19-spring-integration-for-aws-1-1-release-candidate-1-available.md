---
title: Spring Integration for AWS 1.1 Release Candidate  1 Available
source: https://spring.io/blog/2017/10/19/spring-integration-for-aws-1-1-release-candidate-1-available
scraped: 2026-02-23T16:18:07.494Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  October 19, 2017 | 2 Comments
---

# Spring Integration for AWS 1.1 Release Candidate  1 Available

_Releases | Artem Bilan |  October 19, 2017 | 2 Comments_

Dear Spring Community!

Today I’d like to announce the first Release Candidate of the version `1.1` of Spring Integration for [Amazon Web Services](https://aws.amazon.com). Its artifact

```
Copyorg.springframework.integration:spring-integration-aws:1.1.0.RC1
```

is available in the [Milestone Repository](https://repo.spring.io/milestone/).

Thanks to everybody contributed!

Some highlights of the features since the previously announced [Milestone 1](https://spring.io/blog/2017/03/09/spring-integration-extension-for-aws-1-1-0-m1-available):

## [](#kinesismessagedrivenchanneladapter)[](#kinesismessagedrivenchanneladapter)KinesisMessageDrivenChannelAdapter

The `KinesisMessageDrivenChannelAdapter` has been improved to handle properly expired and throttled shard iterators. Also it now skips closed shards. Some other bug fixed have been provided after early community adoption.

## [](#dynamodbmetadatastore)[](#dynamodbmetadatastore)DynamoDbMetaDataStore

The `ConcurrentMetadataStore` implementation for the AWS [DynamoDB](https://aws.amazon.com/dynamodb) is now provided via `DynamoDbMetaDataStore` component. This metadata store can be used in the `KinesisMessageDrivenChannelAdapter` for distributed checkpoint management between instances in the cluster.

## [](#spring-cloud-stream-kinesis-binder)[](#spring-cloud-stream-kinesis-binder)Spring Cloud Stream Kinesis Binder

In addition it’s my pleasure to announce here that we already have started the AWS Kinesis Binder implementation for Spring Cloud Stream. The solution is fully based on the Spring Integration AWS and already has some traction from the community. Check its [project page](https://github.com/spring-cloud/spring-cloud-stream-binder-aws-kinesis) and an appropriate sample in the [Spring Cloud Samples](https://github.com/spring-cloud/spring-cloud-stream-samples/tree/master/kinesis-produce-consume)! Especial thanks to Peter Oates ([@oatesp](https://github.com/oatesp)) and Jacob Severson ([@JacobASeverson](https://github.com/JacobASeverson)) for their valuable time and quality contributions!

The General Availability release for version `1.1` is going to happen in a week. After that we will switch to the version `2.0` based on the Spring Integration `5.0` and Spring Cloud AWS `2.0`.

Of course any feedback is welcome via all available communication channel!

[Project Page](https://github.com/spring-projects/spring-integration-aws) | [Issues](https://github.com/spring-projects/spring-integration-aws/issues) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)