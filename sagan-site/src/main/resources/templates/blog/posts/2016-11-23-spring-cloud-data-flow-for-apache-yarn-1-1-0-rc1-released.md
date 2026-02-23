---
title: Spring Cloud Data Flow for Apache YARN 1.1.0.RC1 released
source: https://spring.io/blog/2016/11/23/spring-cloud-data-flow-for-apache-yarn-1-1-0-rc1-released
scraped: 2026-02-23T18:57:20.373Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Janne Valkealahti |  November 23, 2016 | 0 Comments
---

# Spring Cloud Data Flow for Apache YARN 1.1.0.RC1 released

_Releases | Janne Valkealahti |  November 23, 2016 | 0 Comments_

On behalf of the Spring Cloud Data Flow team, I am pleased to announce the 1.1.0.RC1 release of [Spring Cloud Data Flow for Apache YARN](http://cloud.spring.io/spring-cloud-dataflow-server-yarn).

[Spring Cloud Data Flow for Apache YARN](https://github.com/spring-cloud/spring-cloud-dataflow-server-yarn) allows one to use all the goodness of [Spring Cloud Data Flow](https://github.com/spring-cloud/spring-cloud-dataflow) (like the Shell and UI) while targeting Apache YARN as a backend. Stream components are deployed as individual apps in Apache YARN, leveraging the power of the platform to handle scaling and health monitoring.

This first release candicate

-   Builds upon Spring Cloud Data Flow 1.1.0.RC1 and Spring Cloud Deployer 1.1.0.RC1.
-   Support for keeping multiple deployer versions in hdfs.
-   Preparation of supporting upgrades on Ambari when these become available with Ambari future versions.

To get started using Spring Cloud Data Flow for Apache YARN [follow these steps](http://docs.spring.io/spring-cloud-dataflow-server-yarn/docs/1.1.0.RC1/reference/htmlsingle/#_spring_cloud_data_flow_runtime) outlined in the reference documentation.

For a complete/cumulative list of changes and improvements, please refer to [Server 1.1.0.M1 release](https://github.com/spring-cloud/spring-cloud-dataflow-server-yarn/issues?q=milestone%3A1.1.0.M1+is%3Aclosed), [Server 1.1.0.RC1 release](https://github.com/spring-cloud/spring-cloud-dataflow-server-yarn/issues?q=milestone%3A1.1.0.RC1+is%3Aclosed), [Deployer 1.1.0.M1 release](https://github.com/spring-cloud/spring-cloud-deployer-yarn/issues?q=milestone%3A1.1.0.M1+is%3Aclosed), [Deployer 1.1.0.RC1 release](https://github.com/spring-cloud/spring-cloud-deployer-yarn/issues?q=milestone%3A1.1.0.RC1+is%3Aclosed).