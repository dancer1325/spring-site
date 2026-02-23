---
title: Spring Cloud for Google Cloud Platform 1.0 Milestone 2 Available
source: https://spring.io/blog/2018/02/07/spring-cloud-for-google-cloud-platform-1-0-milestone-2-available
scraped: 2026-02-23T15:27:38.211Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  February 07, 2018 | 4 Comments
---

# Spring Cloud for Google Cloud Platform 1.0 Milestone 2 Available

_Releases | Artem Bilan |  February 07, 2018 | 4 Comments_

Dear Spring Community!

It’s my pleasure to announce today a new project in the [Spring Cloud](https://projects.spring.io/spring-cloud/) family. It’s called `Spring Cloud GCP` and its goal is to bring into your applications well-known Spring patterns and Spring Boot conventions for consuming [Google Cloud Platform](https://cloud.google.com) services.

The project currently is in version `1.0.0.M2` and is available from the [Spring Milestone Repository](https://repo.spring.io/milestone/org/springframework/cloud):

```
Copy<dependencyManagement>
   <dependencies>
       <dependency>
           <groupId>org.springframework.cloud</groupId>
           <artifactId>spring-cloud-gcp-dependencies</artifactId>
           <version>1.0.0.M2</version>
           <type>pom</type>
           <scope>import</scope>
       </dependency>
   </dependencies>
</dependencyManagement>
```

This project has been started as an experiment of collaboration between Google and Spring teams. So far we got a good experience and our inter-team knowledge sharing has brought for us this project with several stable modules and active contribution from the Google team.

The project provides an integration and access object to Google Cloud Platform services via these modules:

## [](#spring-cloud-gcp-core)[](#spring-cloud-gcp-core)spring-cloud-gcp-core

The first class citizen abstraction like `GcpProjectIdProvider` and `CredentialsProvider` and their support classes. Provides properties and configures access to the [Project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects) and [Cloud Authentication](https://cloud.google.com/docs/authentication). This is a transitive dependency for all other modules.

## [](#spring-cloud-gcp-autoconfigure-and-spring-cloud-gcp-starters)[](#spring-cloud-gcp-autoconfigure-and-spring-cloud-gcp-starters)spring-cloud-gcp-autoconfigure and spring-cloud-gcp-starters

The Spring Boot auto-configurations and starters for components provided by this project, or just wrappers and helpers to existing auto-configuration such as `DataSourceAutoConfiguration`.

## [](#spring-cloud-gcp-pubsub)[](#spring-cloud-gcp-pubsub)spring-cloud-gcp-pubsub

The well-known `Template` and `Factory` Spring patterns implementations for [Google Cloud Pub/Sub](https://cloud.google.com/pubsub) service. Also this module includes [Spring Integration](https://projects.spring.io/spring-integration) Channel Adapters implementations around the `PubSubTemplate`, `PublisherFactory` and `SubscriberFactory`.

## [](#spring-cloud-gcp-storage)[](#spring-cloud-gcp-storage)spring-cloud-gcp-storage

The `org.springframework.core.io.ProtocolResolver` implementation for the [Google Cloud Storage](https://cloud.google.com/storage) resources resolution. Plus [Spring Integration](https://projects.spring.io/spring-integration) Channel Adapters for reading and writing to/from `Blob` and `Bucket` resources.

## [](#spring-cloud-gcp-logging)[](#spring-cloud-gcp-logging)spring-cloud-gcp-logging

This module provides support for associating a web request trace ID with the corresponding log entries. This allows grouping of log messages by request.

## [](#spring-cloud-gcp-trace)[](#spring-cloud-gcp-trace)spring-cloud-gcp-trace

The [Spring Cloud Sleuth](https://cloud.spring.io/spring-cloud-sleuth) components implementation for the [Google Cloud Stackdriver Trace](https://cloud.google.com/trace).

## [](#spring-cloud-gcp-pubsub-stream-binder)[](#spring-cloud-gcp-pubsub-stream-binder)spring-cloud-gcp-pubsub-stream-binder

The [Spring Cloud Stream](https://cloud.spring.io/spring-cloud-stream) `Binder` implementation for the [Google Cloud Pub/Sub](https://cloud.google.com/pubsub) service.

See more information about these and other project features in the [Reference Manual](https://docs.spring.io/spring-cloud-gcp/docs/1.0.0.M2/reference/htmlsingle). Also pay attention to the comprehensive set of [Samples](https://github.com/spring-cloud/spring-cloud-gcp/tree/master/spring-cloud-gcp-samples) provided in the project. In addition we have a [Messaging with Google Cloud Pub/Sub](https://spring.io/guides/gs/spring-cloud-gcp) Getting Started Guide for you.

And finally don’t miss [Google Announcement](https://cloudplatform.googleblog.com/2018/02/announcing-Spring-Cloud-GCP-integrating-your-favorite-Java-framework-with-Google-Cloud.html) about this project!

More Google Cloud Platform services support and Spring components implementations are coming!

Any feedback, feature ideas, critics, bug reports and questions are welcome via appropriate communication channels.

[Project Page](https://cloud.spring.io/spring-cloud-gcp) | [issues](https://github.com/spring-cloud/spring-cloud-gcp/issues) | [Documentation](https://docs.spring.io/spring-cloud-gcp/docs/1.0.0.M2/reference/htmlsingle)