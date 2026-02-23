---
title: Spring Integration for AWS 3.0.0-M2 and Spring Cloud Stream Kinesis Binder 4.0.0-M1 Available
source: https://spring.io/blog/2023/03/27/spring-integration-for-aws-3-0-0-m2-and-spring-cloud-stream-kinesis-binder-4
scraped: 2026-02-23T09:58:31.127Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  March 27, 2023 | 0 Comments
---

# Spring Integration for AWS 3.0.0-M2 and Spring Cloud Stream Kinesis Binder 4.0.0-M1 Available

_Releases | Artem Bilan |  March 27, 2023 | 0 Comments_

Dear Spring community,

Today I'm excited to share with you news that [Spring Integration extension project for AWS](https://github.com/spring-projects/spring-integration-aws) and [AWS Kinesis Binder for Spring Cloud Stream](https://github.com/spring-cloud/spring-cloud-stream-binder-aws-kinesis) have finally been moved to [AWS Java SDK v2](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/home.html), their respective milestones `3.0.0-M2` & `4.0.0-M1` are available from Spring Milestone repository.

I cannot tell that this was a pleasant work to do because it has turned to be not just a plain dependencies upgrade and namespace renaming. The whole AWS SDK API was changed to more modern Java style, including `CompletableFuture` composition and `Stream` API, lambda-style configuration, generated builders etc. They have even Reactive Streams support! Some options have been removed and some added. So, even if Spring Integration channel adapters are high enough API for end-users, they still suffered many breaking changes with these new generations.

Some highlights of these milestone:

-   Of course, first of all the latest AWS SDK `2.20.32`
-   Upgrades to [Spring Cloud AWS](https://awspring.io/) `3.0.0` with its new SQS listener API
-   XML configuration removal. Right, this is unusual for Spring backwards compatibility, but Spring Cloud AWS did that already and there is no any Spring Cloud projects providing and XML support.
-   Our own `DynamoDbLockRegistry` implementation with a proper TTL support.
-   KCL channel adapter now relies on a new [Enhanced Fan-Out Consumer](https://docs.aws.amazon.com/streams/latest/dev/building-enhanced-consumers-kcl.html).
-   All outbound channel adapters are `async` by default and leverage a `CompletableFuture` support from their super `AbstractMessageProducingHandler` class.
-   The [Glue Schema](https://docs.aws.amazon.com/glue/latest/dg/schema-registry.html) support has been exposed in KCL and KPL channel adapters.
-   The Kinesis Binder does not support [DynamoDB Streams Adapter](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.KCLAdapter.html) any more. There is no its implementation for SDK v2 and general AWS recommendation is to use Kinesis [enabled on the table](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/kds.html) to captures data changes.

See READMEs of these projects on GitHub for more information.

We are probably going to GA in a couple weeks, so don't hesitate to give them a try and come back with any feedback or contribution!

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)