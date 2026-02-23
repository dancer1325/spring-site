---
title: Spring Cloud AWS 2.3 is now available
source: https://spring.io/blog/2021/03/17/spring-cloud-aws-2-3-is-now-available
scraped: 2026-02-23T13:29:50.652Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  March 17, 2021 | 6 Comments
---

# Spring Cloud AWS 2.3 is now available

_Releases | Spencer Gibb |  March 17, 2021 | 6 Comments_

*The following is a guest post from the maintainers of the Spring Cloud AWS project.*

On behalf of the Spring Cloud AWS team and the community around Spring Cloud AWS, I am happy to share that we have just released Spring [Spring Cloud AWS 2.3](https://github.com/awspring/spring-cloud-aws/releases/tag/v2.3.0) - a version that is **compatible with Spring Boot 2.4 and Spring Cloud 2020.0**.

This release contains a new integration with [Cognito](https://aws.amazon.com/cognito/) and a bunch of small improvements, fixes, and changes that we believe will make working with Spring Cloud AWS more pleasurable.

I believe the most surprising change is that now you need to include a separate Spring Cloud AWS BOM in your `pom.xml` file:

```xml
Copy<dependencyManagement>
	<dependencies>
		<dependency>
			<groupId>io.awspring.cloud</groupId>
			<artifactId>spring-cloud-aws-dependencies</artifactId>
			<version>2.3.0</version>
			<type>pom</type>
			<scope>import</scope>
		</dependency>
	</dependencies>
</dependencyManagement>
```

Also, dependencies group ids have to be updated to `io.awspring.cloud`:

```xml
Copy<dependencies>
    <dependency>
        <groupId>io.awspring.cloud</groupId>
        <artifactId>spring-cloud-starter-aws-messaging</artifactId>
    </dependency>
</dependencies>
```

All classes have moved from the `org.springfamework.cloud.aws` to `io.awspring.cloud` package.

## [](#release-notes)Release Notes

The most important changes organized by Spring Cloud AWS module:

### [](#core)Core

#### [](#configurable-clientconfiguration)Configurable `ClientConfiguration`

`ClientConfiguration`, used when initializing AWS clients, can be now defined by creating a bean named "com.amazonaws.ClientConfiguration.BEAN\_NAME".

It’s also possible to provide `ClientConfiguration` for particular integration by defining a bean of type `ClientConfiguration` and a name specific to the integration - for example, for SQS client, the bean name must be `sqsClientConfiguration`.

You can read more about [client configuration](https://docs.awspring.io/spring-cloud-aws/docs/2.3.0/reference/html/index.html#configuring-client-configuration)

#### [](#speed-up-startup-time)Speed-up Startup Time

To improve startup times for applications that do not use EC2 instance data, `ContextInstanceDataAutoConfiguration` is disabled by default. To enable it, set `cloud.aws.instance.data.enabled` to `true`.

#### [](#aws-sdk-version-upgrade)AWS SDK Version Upgrade

AWS SDK has been upgraded to 1.11.951

#### [](#configurable-endpoint-for-each-integration)Configurable Endpoint for Each Integration

For each integrated AWS service, you can configure Spring Cloud AWS to use a custom endpoint by setting configuration properties. This example shows how to do so:

```java
Copycloud.aws.s3.endpoint=http://localhost:4566
cloud.aws.sqs.endpoint=http://localhost:4566
cloud.aws.rds.endpoint=http://localhost:4566
```

Using a custom endpoint can be especially useful when you use [Localstack](https://github.com/localstack/localstack) in integration tests.

#### [](#deprecate-xml-configuration)Deprecate XML Configuration

XML Configuration is now deprecated and is going to be removed in the next major version upgrade.

#### [](#configurable-region-for-each-iintegration)Configurable Region for Each Iintegration

In addition to global region configuration, each integration can have a different region set statically. Read more about [configuring regions](https://docs.awspring.io/spring-cloud-aws/docs/2.3.0/reference/html/index.html#configuring-region).

#### [](#deprecate-enablexxx-annotations)Deprecate `@EnableXXX` Annotations

`@EnableXXX` annotations have been deprecated. We recommend using Spring Boot auto-configurations.

#### [](#simplify-disabling-integrations)Simplify Disabling Integrations

Each service can be now enabled or disabled by setting the `enabled` property.

#### [](#simplify-sdk-configuration)Simplify SDK Configuration

`DefaultAWSCredentialsProvider` and `DefaultAWSRegionProviderChain` are used now by default. The`cloud.aws.credentials.use-default-aws-credentials-chain` and `cloud.aws.region.use-default-aws-region-chain` properties were dropped.

### [](#cloudformation)CloudFormation

To simplify project setup for applications that do not use CloudFormation support, CloudFormation-related auto-configurations have been disabled by default. To enable CloudFormation support in Spring Cloud AWS, you must add the following dependency to trigger `ContextStackAutoConfiguration`:

```xml
Copy<dependency>
    <groupId>com.amazonaws</groupId>
    <artifactId>aws-java-sdk-cloudformation</artifactId>
</dependency>
```

### [](#ses)SES

SES support has been extracted from the `context` module to separate `spring-cloud-aws-ses` module. There is also a dedicated starter: `spring-cloud-aws-ses-starter`.

### [](#cognito)Cognito

Spring Cloud AWS comes with basic support for AWS Cognito, simplifying configuring OAuth2. Read more about [Cognito support](https://docs.awspring.io/spring-cloud-aws/docs/2.3.0/reference/html/index.html#cognito-support).

### [](#parameter-store)Parameter Store

1.  Support loading properties through `spring.config.import` introduced in Spring Cloud 2020.0. Read more about [integrating your Spring Cloud application with the AWS parameter store](https://docs.awspring.io/spring-cloud-aws/docs/2.3.0/reference/html/index.html#integrating-your-spring-cloud-application-with-the-aws-parameter-store).
2.  Dropped the dependency to `javax.validation:validation-api`.

### [](#secrets-manager)Secrets Manager

1.  Support loading properties through `spring.config.import`, introduced in Spring Cloud 2020.0 Read more about [integrating your Spring Cloud applicationwiththeAWS secrets manager](https://docs.awspring.io/spring-cloud-aws/docs/2.3.0/reference/html/index.html#integrating-your-spring-cloud-application-with-the-aws-secrets-manager).
2.  Removed the dependency to auto-configure module #526.
3.  Dropped the dependency to `javax.validation:validation-api`.
4.  Allow Secrets Manager prefix without "/" in the front [#736](https://github.com/spring-cloud/spring-cloud-aws/issues/736).

### [](#sqs)SQS

1.  The `SimpleMessageListenerContainer#isQueueRunning` method is now visible to extending classes. [#350](https://github.com/spring-cloud/spring-cloud-aws/issues/350)
2.  Added support for SQS custom data types. [#410](https://github.com/spring-cloud/spring-cloud-aws/issues/410).
3.  Added support for native SQS messages in `SqsListener` argument. [#295](https://github.com/spring-cloud/spring-cloud-aws/issues/295)
4.  Added global configuration for message deletion policy. [#188](https://github.com/spring-cloud/spring-cloud-aws/issues/188)
5.  Fixed queue listener graceful shutdown by increasing queue stop time to 20 seconds. `queueStopTimeout` can be configurable through `SimpleMessageListenerContainerFactory`. [#504](https://github.com/spring-cloud/spring-cloud-aws/issues/504) [#507](https://github.com/spring-cloud/spring-cloud-aws/issues/507)
6.  Added support for primitives and no specific data type in SQS message attributes. [#221](https://github.com/spring-cloud/spring-cloud-aws/issues/221) and [#374](https://github.com/spring-cloud/spring-cloud-aws/issues/374)
7.  Added support for resolving `SqsMessageHeaders` in `SqsListener`. Added `ApproximateFirstReceiveTimestamp`, `ApproximateReceiveCount`, and `SentTimestamp` headers [#296](https://github.com/spring-cloud/spring-cloud-aws/issues/296)
8.  SQS listeners, by default, instead of creating custom `ObjectMapper` instance, use one present in the application context. [#533](https://github.com/spring-cloud/spring-cloud-aws/issues/533), [#522](https://github.com/spring-cloud/spring-cloud-aws/issues/522), and [#540](https://github.com/spring-cloud/spring-cloud-aws/issues/540)
9.  Add support for SQS FIFO queues [#40](https://github.com/awspring/spring-cloud-aws/pull/40)

### [](#s3)S3

`SimpleStorageResource` sets `content-type` property on the S3 object metadata. [#262](https://github.com/spring-cloud/spring-cloud-aws/issues/262)

### [](#sns)SNS

1.  `@NotificationMessageMapping` now properly handles special characters. [#645](https://github.com/spring-cloud/spring-cloud-aws/issues/645)
2.  Support String Array SNS `messageAttributeDataType`. [#368](https://github.com/spring-cloud/spring-cloud-aws/issues/368)

### [](#rds)RDS

Make RDS instance name configuration more flexible. For example, for an instance named `test`, instead of setting `cloud.aws.rds.test.username=user` property, you must now set:

```java
Copycloud.aws.rds.instances[0].db-instance-identifier=test
cloud.aws.rds.instances[0].username=user
```

[#495](https://github.com/spring-cloud/spring-cloud-aws/issues/495)

### [](#cloudwatch)CloudWatch

Removed the `spring-cloud-aws-actuator` module. Instead, we recommend using the dependency to `micrometer-registry-cloudwatch` directly. [#571](https://github.com/spring-cloud/spring-cloud-aws/issues/571)

## [](#why-has-the-package-name-changed)Why Has the Package Name Changed?

On the 17th of April, 2020, it was [announced](https://spring.io/blog/2020/04/17/spring-cloud-2020-0-0-m1-released) that Spring Cloud GCP and Spring Cloud AWS are no longer part of the Spring Cloud release train. Not being a part of the release train also means moving from the Spring Cloud organization on Github and, as an effect, having new Maven coordinates and package names.

[We picked](https://twitter.com/maciejwalkowiak/status/1262055658762969093) **awspring** as the top level name and `io.awspring.cloud` as a top level package for Spring Cloud AWS, which leaves us opportunity to create other Spring-related and AWS-related, but not necessarily Spring Cloud-related, packages.

With the great help of [Spencer Gibb](https://twitter.com/spencerbgibb) and other folks from the Spring team, we moved to the new repository and created a new home for Spring Cloud AWS: [https://github.com/awspring/spring-cloud-aws](https://github.com/awspring/spring-cloud-aws).

## [](#whats-the-future-of-spring-cloud-aws)What's the Future of Spring Cloud AWS?

From now on, our efforts focus on 3.0 - based on AWS SDK 2.0. This release will be an opportunity to revisit every implemented module and align it better with Spring Boot conventions.

2.3.x will receive bug fixes and will be open for community contributions, but we - as the core team - will not focus on adding new features or modules.

2.2.x, being a part of the Hoxton release train, will continue to be maintained in the [original Spring Cloud repository](https://github.com/spring-cloud/spring-cloud-aws/).

## [](#who-is-behind-spring-cloud-aws)Who Is Behind Spring Cloud AWS?

Spring Cloud AWS is a community project with [Maciej Walkowiak](https://twitter.com/maciejwalkowiak), [Eddú Meléndez](https://twitter.com/EdduMelendez), and [Matej Nedic](https://twitter.com/MatejNedic1) in the Core Team. We are more than happy to take contributions from the community. In the near future, we are going to update contributing guidelines and publish the roadmap for Spring Cloud 3.0.

Stay tuned.