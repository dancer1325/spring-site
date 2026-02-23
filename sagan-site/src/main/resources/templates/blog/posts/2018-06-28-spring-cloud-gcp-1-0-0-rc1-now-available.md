---
title: Spring Cloud GCP 1.0.0.RC1 Now Available
source: https://spring.io/blog/2018/06/28/spring-cloud-gcp-1-0-0-rc1-now-available
scraped: 2026-02-23T15:20:29.022Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  June 28, 2018 | 1 Comment
---

# Spring Cloud GCP 1.0.0.RC1 Now Available

_Releases | Artem Bilan |  June 28, 2018 | 1 Comment_

Dear Spring Community!

Today, together with Google team, it’s my pleasure to announce the First Release Candidate of [Spring Cloud](https://projects.spring.io/spring-cloud/) for [Google Cloud Platform](https://cloud.google.com/) project of version `1.0`.

The artifacts available from [Spring Milestone](http://repo.spring.io/milestone/) repository via BOM:

```
Copy<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-gcp-dependencies</artifactId>
            <version>1.0.0.RC1</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

Since the previously announced [Milestone 3](https://spring.io/blog/2018/04/16/what-s-new-in-spring-cloud-gcp-1-0-0-milestone-3), Spring Cloud GCP is based on the latest [Spring Cloud Finchley](https://spring.io/blog/2018/06/19/spring-cloud-finchley-release-is-available) and provides these features:

## [](#messaging)[](#messaging)Messaging

All the Spring Messaging support is located in the `spring-cloud-gcp-pubsub` and `spring-cloud-gcp-pubsub-stream-binder` modules and based on the [Spring Integration](https://spring.io/projects/spring-integration) and [Spring Cloud Stream](https://cloud.spring.io/spring-cloud-stream/). There are `PubSubTemplate` for low level, plain messaging with [Google Cloud Pub/Sub](https://cloud.google.com/pubsub/docs/overview). The Spring Integration Channel Adapters, based on the `PubSubTemplate` foundation, are `PubSubInboundChannelAdapter` and `PubSubMessageHandler`. In this Release Candidate, we implemented for them consistent message conversion via `PubSubMessageConverter` abstraction and also added a header mapping via `PubSubHeaderMapper`.

The Spring Cloud Stream integration is represented via `PubSubMessageChannelBinder` with smooth binding properties based on the Spring Boot auto-configuration provided in the `spring-cloud-gcp-autoconfigure` module.

## [](#database)[](#database)Database

The [Google Cloud SQL](https://cloud.google.com/sql/) support is implemented as a plain Spring Boot auto-configuration provided in the `spring-cloud-gcp-autoconfigure` module and everything else is just standard Spring JDBC support! The `spring-cloud-gcp-starter-sql-mysql` and `spring-cloud-gcp-starter-sql-postgresql` are aimed to help you transparently auto-configure Google Cloud SQL services in your Spring Boot application.

## [](#file-storage)[](#file-storage)File Storage

The [Google Cloud Storage](https://cloud.google.com/storage/) integration is implemented via `GoogleStorageProtocolResolver`, when you can refer to your Google Cloud resource with the `gs://` prefix classical Spring `Resource` abstraction. In addition, ``GcsInboundFileSynchronizingMessageSource, `GcsStreamingMessageSource`` and `GcsMessageHandler` Spring Integration Channel Adapters are provided for handling Google Cloud resources with messaging.

## [](#logging)[](#logging)Logging

The [Google Cloud Stackdriver Logging](https://cloud.google.com/logging/) integration is represented with various auto-configured utils, which can be enabled in your logging configs with our predefined `logback-appender.xml` and `logback-json-appender.xml` templates. The `spring-cloud-gcp-starter-logging` Spring Boot Starter helps to manage proper dependencies for your application.

## [](#trace)[](#trace)Trace

Together with the [Spring Cloud Sleuth](https://cloud.spring.io/spring-cloud-sleuth/), the Spring Cloud GCP provides an integration for the [Google Cloud Stackdriver Trace](https://cloud.google.com/trace/docs/). The `spring-cloud-gcp-starter-trace` helps you to auto-configure the proper Spring Cloud and [Open Zipkin](https://zipkin.io/) dependencies for this integration.

## [](#authentication)[](#authentication)Authentication

For the proper authentication into your [Google Cloud Accounts](https://cloud.google.com/iam/docs/service-accounts), the Spring Boot auto-configuration is provided via `Credentials` and `GcpProjectIdProvider` abstractions.

## [](#try-it-out)[](#try-it-out)Try it out!

Check out the [code samples](https://github.com/spring-cloud/spring-cloud-gcp/tree/master/spring-cloud-gcp-samples) in the [Spring Cloud GCP GitHub repository](https://github.com/spring-cloud/spring-cloud-gcp/), read the Spring Cloud GCP Reference documentation for more details, and try it hands on with [code labs](https://codelabs.developers.google.com/spring). Most importantly, let us know your feedback and report any issues while we are aiming towards to GA release! Meanwhile we have started on bringing you more integrations in the future. Currently, you can try out our beta support for Spring [Data Cloud Spanner](https://docs.spring.io/spring-cloud-gcp/docs/1.1.0.BUILD-SNAPSHOT/reference/htmlsingle/#_spring_data_cloud_spanner) and [Spring Cloud Config](https://docs.spring.io/spring-cloud-gcp/docs/1.1.0.BUILD-SNAPSHOT/reference/htmlsingle/#_spring_cloud_config) in the work-in-progress version `1.1`.

From the Spring Cloud GCP Team

> Don’t miss [SpringOne Platform](https://springoneplatform.io/) conference in Washington, D.C. this September! Together with Google team I’m going to represent these and more other features in the Spring Cloud for Google Cloud Platform project. Checkout the [sessions](https://springoneplatform.io/2018/sessions) and register!

[Project Page](https://cloud.spring.io/spring-cloud-gcp) | [issues](https://github.com/spring-cloud/spring-cloud-gcp/issues) | [Documentation](https://docs.spring.io/spring-cloud-gcp/docs/1.0.0.RC1/reference/htmlsingle)