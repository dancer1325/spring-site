---
title: Spring Cloud Data Flow 1.5 M1 released
source: https://spring.io/blog/2018/04/20/spring-cloud-data-flow-1-5-m1-released
scraped: 2026-02-23T15:26:50.026Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  April 20, 2018 | 1 Comment
---

# Spring Cloud Data Flow 1.5 M1 released

_Releases | Mark Pollack |  April 20, 2018 | 1 Comment_

The [Spring Cloud Data Flow](https://cloud.spring.io/spring-cloud-dataflow/) team is pleased to announce the release of `1.5.0 M1`. Follow the *Getting Started* guides for [Local Server](https://docs.spring.io/spring-cloud-dataflow/docs/1.5.0.M1/reference/htmlsingle/#getting-started), [Cloud Foundry](https://docs.spring.io/spring-cloud-dataflow-server-cloudfoundry/docs/1.5.0.M1/reference/htmlsingle/#getting-started), and [Kubernetes](https://docs.spring.io/spring-cloud-dataflow-server-kubernetes/docs/1.5.0.M1/reference/htmlsingle/#kubernetes-getting-started).

Here are the highlights:

-   UI Improvements
    
-   Spring Boot & Spring Cloud Stream 2.0 Support
    
-   Nested splits for Composed Tasks
    
-   Metrics Collector 2.0 M1
    
-   Stream Application Starters Darwin M1 release train
    
-   Support for deploying to multiple Kubernetes clusters
    

## [](#ui-improvements)[](#ui-improvements)UI Improvements

We have continued to improve the UI/UX of the Dashboard. You will immediately notice an overall lighter weight design. The Tasks tab has been rewritten to match the UX styling of the other tabs. The stream-builder view includes many optimizations ranging from better form validation and eager error reporting. Try it out!

There has also been a significant amount of refactoring to optimize the codebase and prepare for future extensions and feature additions.

## [](#spring-boot--spring-cloud-stream-20-support)[](#spring-boot-spring-cloud-stream-2-0-support)Spring Boot & Spring Cloud Stream 2.0 Support

We now support deploying Spring Boot and Spring Cloud Stream 2.0 based applications. A small [utility class](https://github.com/spring-cloud-stream-app-starters/core/blob/master/common/app-starters-micrometer-common/src/main/java/org/springframework/cloud/stream/app/micrometer/common/SpringCloudStreamMicrometerCommonTags.java) in the Spring Cloud Stream Application Starters library adds Micrometer metric tags to help identify the streams and applications in the desired monitoring backend.

## [](#composed-tasks-and-nested-splits)[](#composed-tasks-and-nested-splits)Composed Tasks and nested splits

Due to popular demand, this release added DSL support to interpret “nested splits” in composed tasks. The Flo Dashboard and Shell tooling automatically adapt to nested splits.

Here is how it looks in the Flo Dashboard for the DSL expression:

<<extractFromFTP && cleanseFiles || extractFromS3 && splitTransform> && merge || extractfromOracle>

![Nested Splits](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/gh-pages/img/nested-splits-1-5-0-M1.png)

To use this feature, you’d have to register the `1.1.1.BUILD-SNAPSHOT` version of the Composed Task Runner in SCDF.

For Maven users

maven://org.springframework.cloud.task.app:composedtaskrunner-task:1.1.1.BUILD-SNAPSHOT

and for Docker users

docker:springcloudtask/composedtaskrunner-task:latest

## [](#metrics-collector-20-m1)[](#metrics-collector-2-0-m1)Metrics Collector 2.0 M1

The 2.0 M1 release of [Metrics Collector](https://github.com/spring-cloud/spring-cloud-dataflow-metrics-collector) is based on Spring Boot 2.0 and Spring Cloud Stream 2.0. The Metrics Collector server supports collecting metrics from streams that contain only Boot 1.x or 2.x apps as well as streams that contain a [mixture of Boot versions](https://docs.spring.io/spring-cloud-dataflow/docs/1.5.0.M1/reference/htmlsingle/#configuration-monitoring-deployed-applications). A consistent representation of the throughput rates will be captured and propagated over to SCDF’s Dashboard. A sample demonstrating comprehensive metrics support with the help of Micrometer and a few of the supported backends are in the works - stay tuned!

## [](#stream-application-starters-darwin)[](#stream-application-starters-darwin)Stream Application Starters Darwin

The release train [Darwin](http://docs.spring.io/spring-cloud-stream-app-starters/docs/Darwin.M1/reference/htmlsingle) updates the [application starters](https://cloud.spring.io/spring-cloud-stream-app-starters/) to be based on Spring Boot & Spring Cloud Stream 2.0. A [gRPC processor](https://docs.spring.io/spring-cloud-stream-app-starters/docs/Darwin.M1/reference/htmlsingle/#spring-cloud-stream-modules-grpc-processor) has been added. Import URL can be found [here](http://cloud.spring.io/spring-cloud-stream-app-starters/#stream-app-starters-and-spring-cloud-data-flow-).

## [](#support-for-deploying-to-multiple-kubernetes-clusters)[](#support-for-deploying-to-multiple-kubernetes-clusters)Support for deploying to multiple Kubernetes clusters

While using Skipper with Data Flow, it is already possible to target application deployment to multiple platform backends. However, we did not support targeting multiple Kubernetes platforms. Now you can. :)

## [](#other-bits-and-bobs)[](#other-bits-and-bobs)Other bits and bobs

A growing number of new issues dealt with the ability to individually and globally override `JAVA_OPTS` for applications running on Cloud Foundry. We added a deployer property, e.g. `deployer.yourapp.cloudfoundry.javaOpts` to support setting this specific environment variable.

The Kubernetes server now supports using a [private Docker registry](https://docs.spring.io/spring-cloud-dataflow-server-kubernetes/docs/1.5.0.M1/reference/htmlsingle/#_private_docker_registry) on a per-application basis.

## [](#stay-in-touch)[](#stay-in-touch)Stay in touch…​

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) or [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-dataflow).

Please try it out, share your feedback, and consider contributing to the project!