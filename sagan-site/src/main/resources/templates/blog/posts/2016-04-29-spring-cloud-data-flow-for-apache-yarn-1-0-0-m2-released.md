---
title: Spring Cloud Data Flow for Apache YARN 1.0.0.M2 released
source: https://spring.io/blog/2016/04/29/spring-cloud-data-flow-for-apache-yarn-1-0-0-m2-released
scraped: 2026-02-23T19:17:42.131Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Janne Valkealahti |  April 29, 2016 | 0 Comments
---

# Spring Cloud Data Flow for Apache YARN 1.0.0.M2 released

_Releases | Janne Valkealahti |  April 29, 2016 | 0 Comments_

On behalf of the Spring Cloud Data Flow team, I am pleased to announce the 1.0.0.M2 release of Spring Cloud Data Flow for Apache YARN.

[Spring Cloud Data Flow for Apache YARN](https://github.com/spring-cloud/spring-cloud-dataflow-server-yarn) allows one to use all the goodness of [Spring Cloud Data Flow](https://github.com/spring-cloud/spring-cloud-dataflow) (like the Shell, UI and [Flo](https://network.pivotal.io/products/p-flo-for-spring-cloud-data-flow)) while targeting Apache YARN as a backend. Stream components are deployed as individual apps in Apache YARN, leveraging the power of the platform to handle scaling and health monitoring.

This second milestone

-   builds upon the 1.0.0.M1 release of [Spring Cloud YARN Deployer](https://github.com/spring-cloud/spring-cloud-deployer-yarn).
-   builds upon the 1.0.0.M3 release of Spring Cloud Data Flow.
-   Adds Spring Cloud Task support to orchestrate short-lived tasks including Spring Batch jobs in a YARN cluster.
-   Improved IP address discovery for internal coordination.
-   Adds support to host, resolve and register OOTB apps from HDFS.
-   Adds installable RPM bits.
-   Adds Ambari plugin to provision SCDF on YARN.

This release supports running both streams and tasks on YARN. Data Flow YARN server can be either run against existing YARN cluster or automatically installed into Apache Ambari via specific Ambari integration plugin. See details from [Reference Documentation](http://docs.spring.io/spring-cloud-dataflow-server-yarn/docs/1.0.0.M2/reference/htmlsingle).

![ambari-1 0 0 m3-shot3](https://cloud.githubusercontent.com/assets/50398/14921827/12371520-0e2c-11e6-8759-9ce1510b6267.png)

With YARN it's easy to scale streams: ![ambari-1 0 0 m3-shot1](https://cloud.githubusercontent.com/assets/50398/14921837/1e79d12e-0e2c-11e6-8fbc-4080b62e9e45.png)

For a complete list of changes and improvements, please refer to [1.0.0.M2 release](https://github.com/spring-cloud/spring-cloud-dataflow-server-yarn/issues?q=milestone%3A1.0.0.M2+is%3Aclosed).