---
title: Spring Cloud Data Flow 1.5.0 Released
source: https://spring.io/blog/2018/05/16/spring-cloud-data-flow-1-5-0-released
scraped: 2026-02-23T15:24:14.128Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  May 16, 2018 | 0 Comments
---

# Spring Cloud Data Flow 1.5.0 Released

_Releases | Mark Pollack |  May 16, 2018 | 0 Comments_

The [Spring Cloud Data Flow](https://cloud.spring.io/spring-cloud-dataflow/) team is pleased to announce the `1.5.0` GA release. Follow the *Getting Started* guides for [Local Server](https://docs.spring.io/spring-cloud-dataflow/docs/1.5.0.RELEASE/reference/htmlsingle/#getting-started), [Cloud Foundry](https://docs.spring.io/spring-cloud-dataflow-server-cloudfoundry/docs/1.5.0.RELEASE/reference/htmlsingle/#getting-started), and [Kubernetes](https://docs.spring.io/spring-cloud-dataflow-server-kubernetes/docs/1.5.0.RELEASE/reference/htmlsingle/#kubernetes-getting-started).

## [](#here-are-the-highlights)[](#here-are-the-highlights)Here are the highlights:

-   UI Improvements
    
-   Spring Boot, Spring Cloud Stream 2.0, and Spring Cloud Task 2.0 Support
    
-   Updated Application Starters
    
-   Metrics Improvements
    
-   Nested splits for Composed Tasks
    
-   Kubernetes Improvements
    
-   Updated File Ingest sample
    

## [](#ui-improvements)[](#ui-improvements)UI Improvements

We have continued to improve the UI/UX of the Dashboard. We hope that you will immediately notice an overall lighter weight design. The Tasks tab has been rewritten to match the UX styling of the other tabs. A new paginator component has been added to all the list pages. Switching from a list of 20, 30, 50, or 100 items per page is possible. This further simplifies the bulk operation workflows.

The updated [Stream Builder](https://docs.spring.io/spring-cloud-dataflow/docs/1.5.0.RELEASE/reference/htmlsingle/#dashboard-stream-deploy) tab makes is easy to deploy Stream Definitions and update deployed streams. You can edit application and deployment properties as well as change the version of individual applications in the stream and re-deploy. Data Flow’s integration with [Skipper](https://cloud.spring.io/spring-cloud-skipper/) handles the upgrade process, allowing for easy rollback in case the upgrade doesn’t go as planned. The Stream Builder tab also includes many optimizations, including better form validation and eager error reporting. Try it out!

![Stream Builder Tab](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/master/spring-cloud-dataflow-docs/src/main/asciidoc/images/dataflow-stream-deploy-builder.png)

There has also been a significant amount of refactoring to optimize the code base and prepare for future extensions and feature additions. End-to-end testing with Selenium and SauceLabs has also been added.

## [](#spring-boot--spring-cloud-stream-20-support)[](#spring-boot-spring-cloud-stream-2-0-support)Spring Boot & Spring Cloud Stream 2.0 Support

We now support deploying Spring Boot 2.0 and Spring Cloud Stream 2.0-based applications. Read the section on Metrics for related features.

## [](#updated-application-starters)[](#updated-application-starters)Updated Application Starters

A new GA release of the [Stream App Starters](https://cloud.spring.io/spring-cloud-stream-app-starters/) - [Celsius.SR2](https://cloud.spring.io/spring-cloud-stream-app-starters/) fixes a bug using Rabbit source/sink apps on PCF and updates the python apps. A new GA release of [Task App Starters](https://cloud.spring.io/spring-cloud-task-app-starters/) - [Clark SR1](https://docs.spring.io/spring-cloud-task-app-starters/docs/Clark.SR1/reference/htmlsingle/) removes some outdated tasks and includes a new release of the composted task runner.

The release train [Darwin RC1](https://docs.spring.io/spring-cloud-stream-app-starters/docs/Darwin.RC1/reference/htmlsingle) updates the stream application starters to be based on Spring Boot & Spring Cloud Stream 2.0. A [gRPC processor](https://docs.spring.io/spring-cloud-stream-app-starters/docs/Darwin.RC1/reference/htmlsingle/#spring-cloud-stream-modules-grpc-processor) has been added. Import URLs can be found [here](https://cloud.spring.io/spring-cloud-stream-app-starters/#stream-app-starters-and-spring-cloud-data-flow-).

The release train [Dearborn M1](https://docs.spring.io/spring-cloud-task-app-starters/docs/Dearborn.M1/reference/htmlsingle/) updates the task application starters to be based on Spring Boot & Spring Cloud Task 2.0.

The [Spring Cloud Stream Application Initializr](https://start-scs.cfapps.io/) has been updated to support customizing Darwin-based apps.

## [](#metrics-improvements)[](#metrics-improvements)Metrics Improvements

The Spring Cloud Stream Application Starters library provides a couple utility classes to enrich micrometer-based monitoring by adding tags to [identify streams](https://github.com/spring-cloud-stream-app-starters/core/blob/master/common/app-starters-micrometer-common/src/main/java/org/springframework/cloud/stream/app/micrometer/common/SpringCloudStreamMicrometerCommonTags.java) and the [Cloud Foundry environment](https://github.com/spring-cloud-stream-app-starters/core/blob/master/common/app-starters-micrometer-common/src/main/java/org/springframework/cloud/stream/app/micrometer/common/CloudFoundryMicrometerCommonTags.java).

An updated [Spring Cloud Stream Application Initializr](https://start-scs.cfapps.io/) now lets you add micrometer libraries to both Boot 1.5- and 2.0-based applications.

Two new sample applications showcase using Micrometer with Data Flow. The [first sample](https://docs.spring.io/spring-cloud-dataflow-samples/docs/current/reference/html/_micrometer.html#spring-cloud-data-flow-samples-micrometer-influx-overview) uses [InfluxDB](https://www.influxdata.com/) and [Grafana](https://grafana.com/). The [second sample](https://docs.spring.io/spring-cloud-dataflow-samples/docs/current/reference/html/_micrometer.html#_scdf_metrics_with_prometheus_and_grafana) uses [Prometheus](https://prometheus.io/) and Grafana.

![Prometheus + Grafana Dashboard](https://docs.spring.io/spring-cloud-dataflow-samples/docs/current/reference/html/images/grafana-prometheus-dashboard.png)

Another work in progress that is quite interesting to follow is the use of the [Promregator](https://github.com/promregator/promregator) project to monitor applications deployed on Cloud Foundry by using Prometheus. Follow [these instructions](https://docs.google.com/document/d/1XGwjn1wUW843q8G8SEsZYuMRuBIKhsufH0yUEaLMbPc/edit?ts=5afc5875) to kick the tires.

The 2.0 RC1 release of [Metrics Collector](https://github.com/spring-cloud/spring-cloud-dataflow-metrics-collector) is based on Spring Boot 2.0 and Spring Cloud Stream 2.0. The Metrics Collector server supports collecting metrics from streams that contain only Boot 1.x or 2.x apps as well as streams that contain a [mixture of Boot versions](https://docs.spring.io/spring-cloud-dataflow/docs/1.5.0.RC1/reference/htmlsingle/#configuration-monitoring-deployed-applications). A consistent representation of the throughput rates will be captured and propagated over to Data Flow’s Dashboard.

## [](#nested-splits-for-composed-tasks)[](#nested-splits-for-composed-tasks)Nested splits for Composed Tasks

Due to popular demand, this release added DSL support to interpret “nested splits” in composed tasks. The Flo Dashboard and Shell tooling automatically adapt to nested splits.

Here is how it looks in the Flo Dashboard for the DSL expression:

<<extractFromFTP && cleanseFiles || extractFromS3 && splitTransform> && merge || extractfromOracle>

![Nested Splits](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/gh-pages/img/nested-splits-1-5-0-M1.png)

To use this feature, you have to register the `1.1.1.RELEASE` version of the Composed Task Runner in SCDF.

For Maven users

maven://org.springframework.cloud.task.app:composedtaskrunner-task:1.1.1.RELEASE

and for Docker users

docker:springcloudtask/composedtaskrunner-task:1.1.1.RELEASE

## [](#kubernetes-improvements)[](#kubernetes-improvements)Kubernetes Improvements

-   The client and the cluster version compatibility have improved due to  [Core Workload APIs going GA](https://kubernetes.io/blog/2018/01/core-workloads-api-ga/). For example, a StatefulSet deployment for a partitioned streaming-pipeline dynamically resolves the version compatibility.
    
-   Extending the annotation support added to the “pod” configurations, it is now also possible to add custom annotations to “jobs” deployment.
    
-   Deploying with custom liveness and readiness probe ports is now supported.
    
-   While using Skipper with Data Flow, it is already possible to target application deployment to multiple platform backends. However, we did not support targeting multiple Kubernetes platforms. Now you can. :)
    
-   The Kubernetes server now supports using a [private Docker registry](https://docs.spring.io/spring-cloud-dataflow-server-kubernetes/docs/1.5.0.RELEASE/reference/htmlsingle/#_private_docker_registry) on a per-application basis.
    

## [](#updated-file-ingest-sample)[](#updated-file-ingest-sample)Updated File Ingest sample

A common use case is to detect new files on an FTP site, download them, and launch a batch job. We have added a new [File Ingest sample](https://docs.spring.io/spring-cloud-dataflow-samples/docs/current/reference/htmlsingle/#_stream_launching_batch_job) for this use case. In the coming months, we will continue to improve the design and features. You can follow along [here](https://waffle.io/spring-cloud/spring-cloud-dataflow-samples).

## [](#other-bits-and-bobs)[](#other-bits-and-bobs)Other bits and bobs

-   A growing number of new issues dealt with the ability to individually and globally override `JAVA_OPTS` for applications running on Cloud Foundry. We added a deployer property (`deployer.yourapp.cloudfoundry.javaOpts`) to support setting this specific environment variable.
    
-   Switched to Hikari connection pool and restructure code to use fewer connections.
    
-   Several bug fixes in underlying deployer libraries.
    

## [](#stay-in-touch)[](#stay-in-touch)Stay in touch…​

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) or [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-dataflow).

Please try it out, share your feedback, and consider contributing to the project!