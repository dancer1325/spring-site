---
title: Spring Integration for AWS 2.0.0.RC1 and Spring Cloud Stream Kinesis Binder 1.0.0.RC1
source: https://spring.io/blog/2018/08/01/spring-integration-for-aws-2-0-0-rc1-and-spring-cloud-stream-kinesis-binder-1-0-0-rc1
scraped: 2026-02-23T15:17:21.843Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  August 01, 2018 | 0 Comments
---

# Spring Integration for AWS 2.0.0.RC1 and Spring Cloud Stream Kinesis Binder 1.0.0.RC1

_Releases | Artem Bilan |  August 01, 2018 | 0 Comments_

Dear Spring Community!

It’s my pleasure to announce first Release Candidates for Spring projects supporting Amazon Web Services: [Amazon Web Services](https://aws.amazon.com/): [Spring Integration for AWS](https://github.com/spring-projects/spring-integration-aws) `2.0.0.RC1` and [Spring Cloud Stream Binder for AWS Kinesis](https://github.com/spring-cloud/spring-cloud-stream-binder-aws-kinesis) `1.0.0.RC1`.

Both artifacts are available in the [Spring Milestone](https://repo.spring.io/milestone/) repository and they can be consumed as maven dependencies:

```
Copy<dependency>
    <groupId>org.springframework.integration</groupId>
    <artifactId>spring-integration-aws</artifactId>
    <version>2.0.0.RC1</version>
</dependency>

<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-stream-binder-kinesis</artifactId>
    <version>1.0.0.RC1</version>
</dependency>
```

Where the first one is not needed to be includes when the second one is in use. The [AWS Kinesis](https://aws.amazon.com/kinesis/) and [AWS DynamoDB](https://aws.amazon.com/dynamodb/) Java SDK dependencies are included transitively for AWS Kinesis Binder as well. And now [AWS DynamoDB Lock Client](https://github.com/awslabs/dynamodb-lock-client) is also included for leader election.

Big thanks to the community for contribution and any feedback and especially for the help in testing these products in the real projects.

Here are changes since the previously announced [Milestone 2](https://spring.io/blog/2018/04/17/spring-integration-for-aws-2-0-0-m2-and-spring-cloud-stream-kinesis-binder-1-0-0-m2):

-   A `DynamoDbLockRegistry` implementation has been added for distributed locking based on the [AWS DynamoDB Lock Client](https://github.com/awslabs/dynamodb-lock-client) foundation.
    
-   The `KinesisMessageDrivenChannelAdapter` can now be supplied with a `LockRegistry` and exclusive access to shards before consuming. This way we ensure that only one consumer in a group reads records from the shard it is interested in. When one consumer goes (yields leadership), some other consumer may acquire a lock for the shard and continue to consume from the stored checkpoint.
    
-   Some other bug fixes and improvements in various components throughout the Spring Integration AWS project.
    
-   The Kinesis Binder now exposes configuration properties for the underlying `DynamoDbLockRegistry` used for binder consumers.
    
-   Some other fixes have been done in Kinesis Binder project as well.
    

As usual any feedback, feature ideas, critics, bug reports and questions are welcome via appropriate communication channels!

We are aimed for GA release in a week or though.

[Spring Integration AWS Project Page](https://cloud.spring.io/spring-cloud-gcp) | [Spring Cloud Stream Binder for AWS Kinesis Project Page](https://github.com/spring-cloud/spring-cloud-stream-binder-aws-kinesis) | [Help](https://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-cloud/spring-cloud-stream)