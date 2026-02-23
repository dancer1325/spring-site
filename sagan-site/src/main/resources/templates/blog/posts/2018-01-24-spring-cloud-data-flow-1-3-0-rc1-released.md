---
title: Spring Cloud Data Flow 1.3.0.RC1 released
source: https://spring.io/blog/2018/01/24/spring-cloud-data-flow-1-3-0-rc1-released
scraped: 2026-02-23T16:10:57.643Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  January 24, 2018 | 0 Comments
---

# Spring Cloud Data Flow 1.3.0.RC1 released

_Releases | Mark Pollack |  January 24, 2018 | 0 Comments_

We are pleased to announce the 1.3.0.RC1 release of the Spring Cloud Data Flow and its associated ecosystem of projects.

Follow the Getting Started guides for [Local Server](https://docs.spring.io/spring-cloud-dataflow/docs/1.3.0.RC1/reference/htmlsingle/#getting-started), [Cloud Foundry](https://docs.spring.io/spring-cloud-dataflow-server-cloudfoundry/docs/1.3.0.RC1/reference/htmlsingle/#getting-started), and [Kubernetes](https://docs.spring.io/spring-cloud-dataflow-server-kubernetes/docs/1.3.0.RC1/reference/htmlsingle/#kubernetes-getting-started).

# [](#release-highlights)[](#release-highlights)Release Highlights

## [](#feature-toggle-for-skipper)[](#feature-toggle-for-skipper)Feature toggle for Skipper

To simplify the overall experience of opting into using [Skipper](https://cloud.spring.io/spring-cloud-skipper/) to deploy streams, a feature toggle provides you the ability to switch between skipper mode and the previous 'classic' mode. The feature toggle is used in both the Shell and the Server. The default value is to use the 'classic' non-skipper mode. To enable skipper mode, pass in the following Spring Boot options.

java -jar spring-cloud-dataflow-server-local-1.3.0.RC1.jar \\ --spring.cloud.dataflow.features.skipper-enabled=true

java -jar spring-cloud-dataflow-shell-1.3.0.RC1.jar --dataflow.mode=skipper

This also allowed us to remove `stream skipper` commands introduced in 1.3 M3 and collapse skipper behavior into `stream` commands.

## [](#stream-deployment-properties-are-persisted)[](#stream-deployment-properties-are-persisted)Stream Deployment properties are persisted

You can retrieve the deployment properties using the command `stream info`.

## [](#versioned-app-registry)[](#versioned-app-registry)Versioned App Registry

When in Skipper mode, multiple versions of a stream application can be registered. A default version is used when deploying the stream. You can set the default version using the new command `app default`. When upgrading an application version in a stream, you must first register it in Data Flow.

## [](#dashboard-improvements)[](#dashboard-improvements)Dashboard Improvements

You can restart and stop an already running batch-job as well as get more information about a stream, such as each application version and the application/deployment properties.

## [](#javadsl)[](#javadsl)JavaDSL

Added deployment property builders to help avoid typos when setting commonly used deployment properties.

## [](#local-debugging)[](#local-debugging)Local Debugging

The local server lets you deploy task and stream applications in debug mode so that you can attache a debugger.

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) or [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-stream).

Please try it out, share your feedback, and consider contributing to the project!