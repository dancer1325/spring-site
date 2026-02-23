---
title: Spring Cloud Data Flow for Kubernetes 1.1 M2 released
source: https://spring.io/blog/2016/11/02/spring-cloud-data-flow-for-kubernetes-1-1-m2-released
scraped: 2026-02-23T18:59:52.461Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  November 02, 2016 | 0 Comments
---

# Spring Cloud Data Flow for Kubernetes 1.1 M2 released

_Releases | Thomas Risberg |  November 02, 2016 | 0 Comments_

On behalf of the team, I am pleased to announce the release of the second milestone of *Spring Cloud Data Flow for Kubernetes* 1.1.

*Spring Cloud Data Flow for Kubernetes* provides support for orchestrating long-running (streaming) and short-lived (task/batch) data microservices on Kubernetes.

*Note:* A great way to start using this new release(s) is to follow the [release matrix](http://cloud.spring.io/spring-cloud-dataflow/#spring-cloud-data-flow-server-implementations) on the project page, which includes the download coordinates and the links to the reference guide.

The most significant changes for this release can be found in the *Spring Cloud Deployer for Kubernetes* project. Thanks to several community contributions, we have significantly improved the customization options available for launching Kubernetes apps. We now support resource requests in addition to resource limits and the imagePullPolicy can now be specified. You can also specify the startup command and the entryPoint type used for the Docker image as well as override exposed ports and specify environment variables when deploying apps. For detailed list of deployer improvements review the changes listed in the [Spring Cloud Deployer for Kubernetes 1.1.0.M1 marker](https://github.com/spring-cloud/spring-cloud-deployer-kubernetes/milestone/7?closed=1).

The 1.1.0.M2 release builds on the recent [1.1 M2 release](https://spring.io/blog/2016/10/18/spring-cloud-data-flow-1-1-m2-released) of the core Spring Cloud Data Flow project.

Review the [Spring Cloud Data Flow for Kubernetes 1.1.0.M2 marker](https://github.com/spring-cloud/spring-cloud-dataflow-server-kubernetes/milestone/7?closed=1) to learn more about the incremental improvements.

Docker images containing the *Spring Cloud Data Flow Server for Kubernetes* for all releases are available from the [Docker Hub repo](https://hub.docker.com/r/springcloud/spring-cloud-dataflow-server-kubernetes/tags/).

To get started using *Spring Cloud Data Flow for Kubernetes* [follow the steps](http://docs.spring.io/spring-cloud-dataflow-server-kubernetes/docs/1.1.0.M2/reference/htmlsingle/#_getting_started) outlined in the reference documentation.