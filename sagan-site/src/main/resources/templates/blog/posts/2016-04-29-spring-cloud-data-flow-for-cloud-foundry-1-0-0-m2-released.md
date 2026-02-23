---
title: Spring Cloud Data Flow for Cloud Foundry 1.0.0.M2 released
source: https://spring.io/blog/2016/04/29/spring-cloud-data-flow-for-cloud-foundry-1-0-0-m2-released
scraped: 2026-02-23T19:17:36.991Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Eric Bottard |  April 29, 2016 | 0 Comments
---

# Spring Cloud Data Flow for Cloud Foundry 1.0.0.M2 released

_Releases | Eric Bottard |  April 29, 2016 | 0 Comments_

On behalf of the Spring Cloud Data Flow team, I am pleased to announce the 1.0.0.M2 release of Spring Cloud Data Flow for Cloud Foundry.

[Spring Cloud Data Flow for Cloud Foundry](https://github.com/spring-cloud/spring-cloud-dataflow-server-cloudfoundry) allows one to use all the goodness of [Spring Cloud Data Flow](https://github.com/spring-cloud/spring-cloud-dataflow) (like the Shell, UI and [Flo](https://network.pivotal.io/products/p-flo-for-spring-cloud-data-flow)) while targeting Cloud Foundry as a backend. Stream components are deployed as individual apps in Cloud Foundry, leveraging the power of the platform to handle scaling and health monitoring.

This second milestone

-   builds upon the 1.0.0.M1 release of [Cloud Foundry implementation](https://github.com/spring-cloud/spring-cloud-deployer-cloudfoundry) of spring-cloud-deployer
-   builds upon the 1.0.0.M3 release of Spring Cloud Data Flow
-   builds upon the 2.0.0.M4 release of the [Cloud Foundry java client](https://github.com/cloudfoundry/cf-java-client), leveraging its reactive programming style

In addition to being written from the ground up using the new [Spring Cloud Deployer](https://github.com/spring-cloud/spring-cloud-deployer) abstraction for Cloud Foundry, this release improves logging and error handling for stream deployments in Cloud Foundry. It also introduces asynchronous deployment of apps, providing a better user experience in the Shell, UI and Flo.

Future work will focus on support to run short-lived tasks in Cloud Foundry, which may be any process that does not run indefinitely, including Spring Batch jobs

For a complete list of changes and improvements, please refer to [1.0.0.M2 release](https://github.com/spring-cloud/spring-cloud-dataflow-server-cloudfoundry/issues?q=milestone%3A1.0.0.M2+is%3Aclosed).