---
title: Spring Cloud Data Flow for Kubernetes 1.1 RC1 released
source: https://spring.io/blog/2016/11/22/spring-cloud-data-flow-for-kubernetes-1-1-rc1-released
scraped: 2026-02-23T18:57:49.111Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  November 22, 2016 | 0 Comments
---

# Spring Cloud Data Flow for Kubernetes 1.1 RC1 released

_Releases | Thomas Risberg |  November 22, 2016 | 0 Comments_

On behalf of the team, I am pleased to announce the release of the first release candidate of *Spring Cloud Data Flow for Kubernetes* 1.1.

*Spring Cloud Data Flow for Kubernetes* provides support for orchestrating long-running (streaming) and short-lived (task/batch) data microservices on Kubernetes.

The most significant change for this release can be found in the *Spring Cloud Deployer for Kubernetes* project. Thanks to community contributions from Donovan Muller and Rémon (Ray) Sinnema, we have added support for defining volumes and volume mounts for deployed apps. We support the [volume types](http://kubernetes.io/docs/user-guide/volumes/#types-of-volumes) that have a model supported by the Fabric8 Kubernetes client's [kubernetes-model](https://github.com/fabric8io/kubernetes-model).

For detailed list of deployer improvements review the changes listed in the [Spring Cloud Deployer for Kubernetes 1.1.0.RC1 marker](https://github.com/spring-cloud/spring-cloud-deployer-kubernetes/milestone/8?closed=1).

We have also updated the provided scripts for testing the server on Google Cloud Container Engine. We now use Kafka 0.10.1 in order to support the latest 1.1 version of the [app starters](http://cloud.spring.io/spring-cloud-stream-app-starters/).

The 1.1.0.RC1 release builds on the recent [1.1 RC1 release](https://spring.io/blog/2016/11/09/spring-cloud-data-flow-1-1-rc1-released) of the core Spring Cloud Data Flow project.

Review the [Spring Cloud Data Flow for Kubernetes 1.1.0.RC1 marker](https://github.com/spring-cloud/spring-cloud-dataflow-server-kubernetes/milestone/8?closed=1) to learn more about the incremental improvements.

Docker images containing the *Spring Cloud Data Flow Server for Kubernetes* for all releases are available from the [Docker Hub repo](https://hub.docker.com/r/springcloud/spring-cloud-dataflow-server-kubernetes/tags/).

To get started using *Spring Cloud Data Flow for Kubernetes* [follow the steps](http://docs.spring.io/spring-cloud-dataflow-server-kubernetes/docs/1.1.0.RC1/reference/htmlsingle/#_getting_started) outlined in the reference documentation.