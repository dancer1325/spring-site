---
title: Spring Cloud Data Flow for Kubernetes 1.1 M1 and 1.0.1 GA released
source: https://spring.io/blog/2016/10/03/spring-cloud-data-flow-for-kubernetes-1-1-m1-and-1-0-1-ga-released
scraped: 2026-02-23T19:02:18.161Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  October 03, 2016 | 0 Comments
---

# Spring Cloud Data Flow for Kubernetes 1.1 M1 and 1.0.1 GA released

_Releases | Thomas Risberg |  October 03, 2016 | 0 Comments_

On behalf of the team, I am pleased to announce the release of the first milestone of Spring Cloud Data Flow for Kubernetes 1.1 along with a 1.0.1 maintenance release.

Spring Cloud Data Flow for Kubernetes provides support for orchestrating long-running (streaming) and short-lived (task/batch) data microservices on Kubernetes.

*Note:* A great way to start using this new release(s) is to follow the [release matrix](http://cloud.spring.io/spring-cloud-dataflow/#spring-cloud-data-flow-server-implementations) on the project page, which includes the download coordinates and the links to the reference guide.

The most significant change for both of these releases is the way we handle task launching. We used to orchestrate them as a Job with associated Pods, but that proved problematic in terms of failed jobs getting restarted even with a RestartPolicy specified as "Never". To resolve this, we now launch the tasks using [bare pods](http://kubernetes.io/docs/user-guide/jobs/#bare-pods) and we also give each launched task and corresponding pod a unique id.

The 1.1.0.M1 release builds on the recent [1.1 M1 release](https://spring.io/blog/2016/09/16/spring-cloud-data-flow-1-1-m1-and-1-0-1-ga-released#1-1-m1-release) of the core Spring Cloud Data Flow project.

The 1.0.1.RELEASE maintenance release builds on the latest [1.0.1 maintenance release](https://spring.io/blog/2016/09/16/spring-cloud-data-flow-1-1-m1-and-1-0-1-ga-released#1-0-1-ga-release) of the core Spring Cloud Data Flow project.

Review the [1.0.1.RELEASE marker](https://github.com/spring-cloud/spring-cloud-dataflow-server-kubernetes/milestone/5?closed=1) and the [Spring Cloud Deployer for Kubernetes 1.0.4.RELEASE marker](https://github.com/spring-cloud/spring-cloud-deployer-kubernetes/milestone/6?closed=1) to learn more about the incremental improvements.

Docker images containing the *Spring Cloud Data Flow Server for Kubernetes* for both of these releases are available from the [Docker Hub repo](https://hub.docker.com/r/springcloud/spring-cloud-dataflow-server-kubernetes/tags/).

To get started using Spring Cloud Data Flow for Kubernetes [follow the steps](http://docs.spring.io/spring-cloud-dataflow-server-kubernetes/docs/1.0.1.RELEASE/reference/htmlsingle/#_getting_started) outlined in the reference documentation.