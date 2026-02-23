---
title: New Home for Spring Integration AWS
source: https://spring.io/blog/2025/10/22/spring-integration-aws-eol
scraped: 2026-02-23T07:25:10.579Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Artem Bilan |  October 22, 2025 | 0 Comments
---

# New Home for Spring Integration AWS

_Engineering | Artem Bilan |  October 22, 2025 | 0 Comments_

The [Spring Integration for AWS](https://github.com/spring-projects/spring-integration-aws) was always an independent Spring Integration extension project with its own plans and release cycles. The consumption of this single jar library has always added a complexity from the dependency management perspective. It depends not only on Spring Integration modules like HTTP and File but directly on [Spring Cloud AWS](https://awspring.io) and of course the AWS SDK. Most of the dependencies are `optional` since this project brings channel adapters and components for different AWS integrations, like S3, SQS, DynamoDB, SNS and Kinesis. Therefore, target projects would suffer not only with matching versions from Spring Boot and Spring Cloud perspective, but also native AWS SDK libraries.

The same story is true for the [Spring Cloud Stream Binder for AWS Kinesis](https://github.com/spring-cloud/spring-cloud-stream-binder-aws-kinesis) project. The choice between native AWS Kinesis service and KCL/KPL and matching Spring Cloud Stream version leads to some dependency management headache.

These Spring projects were never in plans to be merged with the main projects as modules in Spring Integration and Spring Cloud Stream or as part of any release train. The fact that most reused API and auto-configurations have been pulled from Spring Cloud AWS project leads to release cycle discrepancy since the latter depends on Spring Boot and Spring Cloud itself.

All of that routine on our and your side is because Spring Cloud AWS is an independent project fully managed and supported by the open-source community. And even if it would be under the Spring Portfolio umbrella, that still would keep Spring Integration AWS and Kinesis Binder projects out of our release train due to that dependency complexity.

With the upcoming `7.0` generation [releases in November](https://spring.io/blog/2025/09/02/road_to_ga_introduction) (Spring Boot `4.0` and Spring Cloud `2025.1.0`), we decided to not do new major versions for Spring Integration AWS and Kinesis Binder projects. Rather, taking the whole portfolio major version opportunity, we will provide something more reasonable, simpler to manage and easier to consume. Both Spring Integration AWS and Kinesis Binder projects are going to be merged directly into [Spring Cloud AWS](https://github.com/awspring/spring-cloud-aws).

joint effort between the Spring engineering team and Spring Cloud AWS community. Currently working plan is to not provide a single `spring-cloud-aws-integraiton` module in the Spring Cloud AWS, but rather spread Spring Integration channel adapters and components between existing Spring Cloud AWS modules, like `spring-cloud-aws-dynamodb` or `spring-cloud-aws-s3`, and provide dedicated starters with required dependencies for this or that integration AWS service, like `spring-cloud-aws-starter-integration-sqs` and `spring-cloud-aws-starter-integration-sns`. Please, join us in Spring Cloud AWS GitHub issues and Pull Requests to share any feedback regarding this migration process.

The upcoming Spring Cloud AWS `4.0`, based on the Spring Boot `4.0` and Spring Cloud `2025.1.0`, will provide a smooth experience for Spring Integration and Kinesis Binder users with its straightforward release train, fine-grained modularization and simpler dependency management model. Once the merger is done, Spring Integration AWS and Kinesis Binder projects are going to be archived on GitHub since their Open Source support is over.

Regards,   
Artem