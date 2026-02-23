---
title: Spring Cloud Data Flow for Kubernetes 1.0 GA released
source: https://spring.io/blog/2016/07/12/spring-cloud-data-flow-for-kubernetes-1-0-ga-released
scraped: 2026-02-23T19:10:20.383Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  July 12, 2016 | 2 Comments
---

# Spring Cloud Data Flow for Kubernetes 1.0 GA released

_Releases | Thomas Risberg |  July 12, 2016 | 2 Comments_

We are pleased to announce the release of Spring Cloud Data Flow's Kubernetes 1.0.0.RELEASE.

Spring Cloud Data Flow for Kubernetes provides support for orchestrating long-running (streaming) and short-lived (task/batch) data microservices on Kubernetes.

This project was originally conceptualized by the community and we are thankful to [Florian Rosenberg](https://github.com/frosenberg) for his early contributions that eventually made it into the official Spring Cloud Deployer for Kubernetes project. Building upon this theme, we recently bumped into [Donovan Muller](https://github.com/donovanmuller)'s [blog](http://blog.switchbit.io/spring-cloud-deployer-openshift/), where he walks through his experience extending the Spring Cloud Deployer project for OpenShift, paving the path for Spring Cloud Data Flow to orchestrate data microservices on OpenShift.

Apart from API cleanups and stabilization, we have worked on the following themes on this major release.

-   Builds upon [1.0.0.RELEASE of Spring Cloud Data Flow Core](https://spring.io/blog/2016/07/12/spring-cloud-data-flow-1-0-ga-released) (shell, UI, REST-APIs, etc.)
-   Adds features to support stream partitioning and scaling:

-   Currently partitioning and scaling of sinks and processors are handled by using multiple replication controllers, one for each app instance.
-   Scaling of sources is handled by using pod replicas with a single replication controller. This allows us to take advantage of the platforms load balancing features for HTTP connections to the app.

\* Integration and acceptance tests of stream and task processing against a Kubernetes cluster using Google Container Engine. Additional stream testing using a Hadoop cluster provisioned on Google Cloud Dataproc \* Adds migration guide and other documentation fragments to the reference documentation \* Adds a \[project site\](http://cloud.spring.io/spring-cloud-dataflow-server-kubernetes/)

To get started using Spring Cloud Data Flow for Kubernetes [follow these steps](http://docs.spring.io/spring-cloud-dataflow-server-kubernetes/docs/1.0.0.RELEASE/reference/htmlsingle/#_getting_started) outlined in the reference documentation.

For a complete list of changes and improvements, please refer to the [1.0.0.RELEASE issues](https://github.com/spring-cloud/spring-cloud-dataflow-server-kubernetes/issues?q=milestone%3A1.0.0.RELEASE).

The Spring Cloud Data Flow team will be talking at [Spring One Platform](https://springoneplatform.io/), which will be taking place in Las Vegas between August 1-4 this year. There are many other great talks so check the [agenda](https://2016.event.springoneplatform.io/schedule/sessions) and get your [ticket](https://2016.event.springoneplatform.io/register) if you haven’t done so already.