---
title: Spring Cloud Data Flow for Apache Mesos and Kubernetes 1.0.0.M2 versions released
source: https://spring.io/blog/2016/04/29/spring-cloud-data-flow-for-apache-mesos-and-kubernetes-1-0-0-m2-versions-released
scraped: 2026-02-23T19:17:55.756Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  April 29, 2016 | 0 Comments
---

# Spring Cloud Data Flow for Apache Mesos and Kubernetes 1.0.0.M2 versions released

_Releases | Thomas Risberg |  April 29, 2016 | 0 Comments_

On behalf of the team, I am pleased to announce 1.0.0.M2 releases of Spring Cloud Data Flow for Apache Mesos and Spring Cloud Data Flow for Kubernetes.

[Spring Cloud Data Flow for Apache Mesos](https://github.com/spring-cloud/spring-cloud-dataflow-server-mesos) allows one to use all the goodness of [Spring Cloud Data Flow](https://github.com/spring-cloud/spring-cloud-dataflow) (like the Shell, UI and [Flo](https://network.pivotal.io/products/p-flo-for-spring-cloud-data-flow)) while targeting Apache Mesos as a backend. Stream components are deployed as individual apps using Marathon, leveraging the power of the platform to handle scaling and health monitoring.

This second milestone

-   Builds upon 1.0.0.M1 release of the [Spring Cloud Deployer Mesos/Marathon implementation](https://github.com/spring-cloud/spring-cloud-deployer-mesos)
-   Builds upon 1.0.0.M3 release of Spring Cloud Data Flow
-   Replaces spring-cloud-marathon-connector with environment variables for service connection parameters. We will improve the service discovery in future release and tie in to Mesos/Marathon’s native service discovery mechanism for runtime credentials
-   Adds support to resolve, register, and run OOTB and custom apps as docker images

For a complete list of changes and improvements, please refer to [Spring Cloud Data Flow for Apache Mesos 1.0.0.M2 release](https://github.com/spring-cloud/spring-cloud-dataflow-server-mesos/issues?q=milestone%3A1.0.0.M2)

[Spring Cloud Data Flow forKubernetes](https://github.com/spring-cloud/spring-cloud-dataflow-server-kubernetes) allows one to use all the goodness of [Spring Cloud Data Flow](https://github.com/spring-cloud/spring-cloud-dataflow) (like the Shell, UI and [Flo](https://network.pivotal.io/products/p-flo-for-spring-cloud-data-flow)) while targeting Kubernetes as a backend. Stream components are deployed as individual apps using Kubernetes, leveraging the power of the platform to handle scaling and health monitoring.

This second milestone

-   Builds upon 1.0.0.M1 release of [Spring Cloud Deployer Kubernetes implementation](https://github.com/spring-cloud/spring-cloud-deployer-kubernetes)
-   Builds upon 1.0.0.M3 release of Spring Cloud Data Flow
-   Replaces spring-cloud-kubernetes-connector with environment variables for service connection parameters. We will improve the service discovery in future release and use Kubernetes’ native service discovery mechanism for runtime credentials
-   Adds support to resolve, register, and run OOTB and custom apps as docker images

For a complete list of changes and improvements, please refer to [Spring Cloud Data Flow Kubernetes 1.0.0.M2 release](https://github.com/spring-cloud/spring-cloud-dataflow-server-kubernetes/issues?q=milestone%3A1.0.0.M2)