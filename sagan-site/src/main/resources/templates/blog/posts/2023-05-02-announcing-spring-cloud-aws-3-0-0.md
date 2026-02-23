---
title: Announcing Spring Cloud AWS 3.0.0
source: https://spring.io/blog/2023/05/02/announcing-spring-cloud-aws-3-0-0
scraped: 2026-02-23T09:52:21.867Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  May 02, 2023 | 3 Comments
---

# Announcing Spring Cloud AWS 3.0.0

_Releases | Spencer Gibb |  May 02, 2023 | 3 Comments_

This is a guest post from the maintainers of Spring Cloud AWS.

# [](#spring-cloud-aws-300)Spring Cloud AWS 3.0.0

[Spring Cloud AWS 3.0](https://github.com/awspring/spring-cloud-aws) is a recent release of the Spring Cloud AWS project. This version represents a complete rewrite of the library using AWS SDK v2 for Java. Since this has required a major refactoring, we took it as an opportunity to revisit all the assumptions and integrations modules. As a result, we've produced a library that is lightweight, flexible, causes less headache and provides simple to use abstractions.

Spring Cloud AWS 3.0 has been developed with following principles in mind:

-   Spring Boot “native” developer experience - sensible defaults, highly customizable
-   Minimal startup time overhead
-   Integration module independent of each other
-   Kotlin friendly (`@Nullable` annotations)
-   Testing as a first class citizen - Spring Cloud AWS uses [Localstack](https://localstack.cloud/) in its own tests and we made the library easy to use with Localstack.

## [](#some-key-features-of-the-release)Some key features of the release

-   Compatible with Spring Boot 3.0
-   Built on the top of AWS SDK V2 for Java
-   Completely re-written SQS integration module
-   New DynamoDB integration

## [](#documentation)Documentation

We strongly recommend reading the Spring Cloud AWS [Reference Documentation](https://docs.awspring.io/spring-cloud-aws/docs/3.0.0/reference/html/index.html) to learn more.

Additionally, you can explore sample applications for several integration modules at the [Spring Cloud AWS GitHub repository](https://github.com/awspring/spring-cloud-aws/tree/main/spring-cloud-aws-samples/)

## [](#changes)Changes

Find below a high level list of changes in each integration module:

### [](#core)Core

-   Simplified credentials, region and AWS client configuration and customization
-   Removed XML configuration support and `@EnableXXX` annotations
-   Introduced STS Credentials support
-   Kotlin's support improved with nullability annotations

### [](#sqs)SQS

-   Complete rewrite based on battle tested Spring Kafka architecture
-   Async listeners
-   Batch listeners
-   FIFO queues support

### [](#s3)S3

In S3 we have introduced new interesting features such as:

-   S3 Object Metadata support
-   S3Template: convenient methods to upload & download files, as well as persisting Java objects to S3
-   Cross-region S3 client
-   Automatic content type resolution (supports 817 content types)
-   Creating S3 Signed URLs
-   Creating & Deleting buckets
-   Multiple S3 OutputStream implementations:
    -   `InMemoryBufferingS3OutputStream`
    -   `DiskBufferingS3OutputStream`
    -   `TransferManagerS3OutputStream`

### [](#sns)SNS

-   `SnsTemplate` and `SnsOperations` provide convenient API for sending notifications to SNS
-   `SnsSmsTemplate` provides convenient API for sending text messages (SMS) to phone numbers

### [](#secrets-manager)Secrets Manager

-   Loading secretes is now only possible with `spring.config.import`
-   Support for JSON, plain text, and binary secrets
-   Support for auto-reloading secrets
-   Secrets Manager property sources now support custom prefixes

### [](#parameter-store)Parameter Store

-   Loading secretes is now only possible with `spring.config.import`
-   Support for auto-reloading properties

### [](#dynamodb)DynamoDB

-   `DynamoDbTemplate` high level API to use DynamoDB built on the top of DynamoDB Enhanced Client
-   Auto-configuration of AWS DAX (DynamoDB Accelerator)

### [](#parameter-store-1)Parameter Store

-   Loading properties is now only possible with spring.config.import=aws-parameterstore.
-   Support for auto-reload introduced
-   Simplified using custom SsmClient

### [](#cloudwatch)CloudWatch

-   Auto-configuration for `micrometer-registry-cloudwatch2`

### [](#missing-integrations)Missing integrations

Spring Cloud AWS 3.0 does not include integrations for RDS, ElastiCache, EC2 and CloudFormation.