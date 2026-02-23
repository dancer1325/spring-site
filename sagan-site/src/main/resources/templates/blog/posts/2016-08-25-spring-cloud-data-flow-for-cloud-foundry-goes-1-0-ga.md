---
title: Spring Cloud Data Flow for Cloud Foundry goes 1.0 GA
source: https://spring.io/blog/2016/08/25/spring-cloud-data-flow-for-cloud-foundry-goes-1-0-ga
scraped: 2026-02-23T19:06:55.711Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Eric Bottard |  August 25, 2016 | 0 Comments
---

# Spring Cloud Data Flow for Cloud Foundry goes 1.0 GA

_Releases | Eric Bottard |  August 25, 2016 | 0 Comments_

We are pleased to announce the general availability of Spring Cloud Data Flow for Cloud Foundry version 1.0.0.RELEASE.

Spring Cloud Data Flow for Cloud Foundry provides support for orchestrating long-running (streaming) and short-lived (task/batch) data microservices on Cloud Foundry runtime.

As the successor to Spring XD, this project benefits from a much more decoupled architecture, leveraging the Spring Cloud [Deployer for Cloud Foundry](https://github.com/spring-cloud/spring-cloud-deployer-cloudfoundry) library, which also goes GA today. More details about Spring Cloud Data Flow’s architecture and its ecosystem can be found in [this blog](https://blog.pivotal.io/big-data-pivotal/products/data-goes-cloud-native-with-the-new-spring-cloud-data-flow).

-   Stream and Batch/Task Processing are the primary functionalities in Spring Cloud Data Flow and they map to Cloud Foundry Diego’s [LRPs and Tasks1](https://docs.cloudfoundry.org/concepts/diego/diego-auction.html#processes) respectively.
    
-   Includes developer toolkits to build streaming and batch/task pipelines using the DSL, Shell, REST-APIs, Dashboard, Flo Designer, or any combination of those.
    
-   Facilitates test-driven-development at individual data pipeline components along with test fixtures to develop and test "data-centric" apps in isolation.
    
-   Leverages Cloud Foundry’s runtime capabilities such as security, metrics, operational monitoring, scaling, and reliable execution of streaming and batch/task pipelines.
    
-   The reference documentation includes a [migration guide](http://docs.spring.io/spring-cloud-dataflow-server-cloudfoundry/docs/1.0.0.RELEASE/reference/html/migration-guide.html) from XD to Data Flow
    

Please refer to the [Getting Started](http://docs.spring.io/spring-cloud-dataflow-server-cloudfoundry/docs/1.0.0.RELEASE/reference/htmlsingle/#getting-started) section of the documentation after you’ve [downloaded](http://repo.spring.io/release/org/springframework/cloud/spring-cloud-dataflow-server-cloudfoundry/1.0.0.RELEASE/spring-cloud-dataflow-server-cloudfoundry-1.0.0.RELEASE.jar) the 1.0.0.RELEASE of the server.

Make sure to read the core Spring Cloud Data Flow’s [release-blog](https://spring.io/blog/2016/07/12/spring-cloud-data-flow-1-0-ga-released) to learn more about all the feature capabilities

(1) Task support is an experimental feature available on Cloud Foundry 1.7.12+ only