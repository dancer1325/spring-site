---
title: Spring Cloud Data Flow for Apache YARN 1.0.0.RC1 released
source: https://spring.io/blog/2016/06/21/spring-cloud-data-flow-for-apache-yarn-1-0-0-rc1-released
scraped: 2026-02-23T19:12:23.241Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Janne Valkealahti |  June 21, 2016 | 0 Comments
---

# Spring Cloud Data Flow for Apache YARN 1.0.0.RC1 released

_Releases | Janne Valkealahti |  June 21, 2016 | 0 Comments_

On behalf of the Spring Cloud Data Flow team, I am pleased to announce the 1.0.0.RC1 release of Spring Cloud Data Flow for Apache YARN.

[Spring Cloud Data Flow for Apache YARN](https://github.com/spring-cloud/spring-cloud-dataflow-server-yarn) allows one to use all the goodness of [Spring Cloud Data Flow](https://github.com/spring-cloud/spring-cloud-dataflow) (like the Shell and UI) while targeting Apache YARN as a backend. Stream components are deployed as individual apps in Apache YARN, leveraging the power of the platform to handle scaling and health monitoring.

This first release candicate

-   Adds several improvements to launching of short-lived applications a.k.a tasks to Apache YARN
-   Builds upon Spring StateMachine 1.1.0.RELEASE that includes new features, stability, and API improvements
-   Adds support to configure command line args as a separate set of properties to be passed to an application when it's deployed. This is an important requirement for running Spring Batch jobs
-   Several Ambari plugin improvements to simplify provisioning of Spring Cloud Data Flow’s YARN server

To get started using Spring Cloud Data Flow for Apache YARN [follow these steps](http://docs.spring.io/spring-cloud-dataflow-server-yarn/docs/1.0.0.RC1/reference/htmlsingle/#_spring_cloud_data_flow_runtime) outlined in the reference documentation.

For a complete list of changes and improvements, please refer to [1.0.0.RC1 release](https://github.com/spring-cloud/spring-cloud-dataflow-server-yarn/issues?q=milestone%3A1.0.0.RC1+is%3Aclosed).