---
title: Spring Integration for AWS 1.1 GA Available
source: https://spring.io/blog/2017/11/27/spring-integration-for-aws-1-1-ga-available
scraped: 2026-02-23T16:15:04.340Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  November 27, 2017 | 0 Comments
---

# Spring Integration for AWS 1.1 GA Available

_Releases | Artem Bilan |  November 27, 2017 | 0 Comments_

I am pleased to announce that the `1.1.0.RELEASE` of Spring Integration for Amazon Web Services is now available in the [Spring release repository](https://repo.spring.io/release/) and Maven Central.

First of all thanks to all community members for any feedback and contributions to make features in this project available!

Some highlights what we have after [a year and a couple months](https://github.com/spring-projects/spring-integration-aws/commit/a9a7b26dbf5ea57e7c95015b01f2c15d737aae6a) of amazing team work:

-   `S3StreamingMessageSource` to get access to S3 resources content on demand;
    
-   `KinesisMessageHandler` and `KinesisMessageDrivenChannelAdapter` for interaction with AWS Kinesis service;
    
-   `DynamoDbMetaDataStore` to store metadata in the AWS DymanoDB table;
    
-   And, of course, a ton of bug fixes!
    

Just after this release we are going to switch `master` to version `2.0` and make it based not only on Spring Integration `5.0`, but on the Spring Cloud `2.0`, as well. And of course more and more Spring abstractions over AWS are waiting for you there!

Also, make sure you’re not going to miss this year’s [SpringOne Platform](https://springoneplatform.io) conference that’s packed with many Spring talks, opportunities to learn about the latest and greatest features and of course some previews about what we’re planning to do next.

[Project Page](https://github.com/spring-projects/spring-integration-aws) | [Contributing](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)