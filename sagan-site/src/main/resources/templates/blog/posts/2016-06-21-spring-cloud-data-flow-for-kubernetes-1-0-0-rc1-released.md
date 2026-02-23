---
title: Spring Cloud Data Flow for Kubernetes 1.0.0.RC1 released
source: https://spring.io/blog/2016/06/21/spring-cloud-data-flow-for-kubernetes-1-0-0-rc1-released
scraped: 2026-02-23T19:12:27.642Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  June 21, 2016 | 0 Comments
---

# Spring Cloud Data Flow for Kubernetes 1.0.0.RC1 released

_Releases | Thomas Risberg |  June 21, 2016 | 0 Comments_

I am pleased to announce the 1.0.0.RC1 release candidate of Spring Cloud Data Flow for Kubernetes, a team effort that encompasses many new features under the hood.

This release candidate builds upon the recent 1.0.0.RC1 release of Spring Cloud Data Flow and also adds Cloud Foundry specific refinements. Some highlights include:

-   Implements the TaskLauncher SPI to support launching of short-lived applications a.k.a tasks. They will be created as Kubernetes jobs and each task launch will create a new pod as part of the Kubernetes job
-   Adds support to configure command line args as a separate set of properties to be passed to an application when it's deployed. This is an important requirement for running Spring Batch jobs orchestrated as tasks using Spring Cloud Task programming model
-   Adds support for RDBMS “datasource” to supplement persistent repository requirements
-   Adds `/info` API to query health checks and to supplement probing requirements
-   Health endpoint improvements to standardize probing over readiness of all the applications orchestrated in Kubernetes
-   Adds docker image for Spring Cloud Data Flow’s Kubernetes server so it can be deployed as a Kubernetes replication controller and service

To get started using Spring Cloud Data Flow for Kubernetes [follow these steps](http://docs.spring.io/spring-cloud-dataflow-server-kubernetes/docs/1.0.0.RC1/reference/htmlsingle/#_getting_started) outlined in the reference documentation.

For a complete list of changes and improvements, please refer to the [1.0.0.RC1 issues](https://github.com/spring-cloud/spring-cloud-dataflow-server-kubernetes/issues?q=milestone%3A1.0.0.RC1).