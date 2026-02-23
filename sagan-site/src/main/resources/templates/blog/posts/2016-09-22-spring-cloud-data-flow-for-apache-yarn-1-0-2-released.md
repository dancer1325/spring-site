---
title: Spring Cloud Data Flow for Apache YARN 1.0.2 released
source: https://spring.io/blog/2016/09/22/spring-cloud-data-flow-for-apache-yarn-1-0-2-released
scraped: 2026-02-23T19:04:16.585Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Janne Valkealahti |  September 22, 2016 | 0 Comments
---

# Spring Cloud Data Flow for Apache YARN 1.0.2 released

_Releases | Janne Valkealahti |  September 22, 2016 | 0 Comments_

We are pleased to announce the release of [Spring Cloud Data Flow for Apache YARN](http://cloud.spring.io/spring-cloud-dataflow-server-yarn) 1.0.2.RELEASE.

Spring Cloud Data Flow for Apache YARN provides support for orchestrating long-running (streaming) and short-lived (task/batch) data microservices on Apache YARN.

Apart from usual minor fixes, we have worked on the following themes.

-   Builds upon Spring Cloud Data Flow’s 1.0.1.RELEASE
-   Support for Apache Ambari 2.4
-   Adds Apache Ambari installation of Spring Cloud Data Flow for HDP 2.5 stack
-   UX improvements around Apache Ambari configuration settings and quicklinks
-   Adds support to interact with kerberized Apache Kafka cluster
-   Yarn deployer APIs and the auto-configuration improvements
-   Certification of partitioned batch-jobs running as short-lived Tasks in YARN
-   Improved documentation

For a complete list of changes and improvements, please refer to [1.0.2.RELEASE server release](https://github.com/spring-cloud/spring-cloud-dataflow-server-yarn/issues?q=milestone%3A1.0.2.RELEASE+is%3Aclosed), [1.0.2.RELEASE deployer release](https://github.com/spring-cloud/spring-cloud-deployer-yarn/issues?q=milestone%3A1.0.2.RELEASE+is%3Aclosed), [1.0-3.RELEASE rpm release](https://github.com/spring-cloud/spring-cloud-dataflow-rpm/issues?q=milestone%3A1.0-3-RELEASE%20is%3Aclosed%20) and [1.0-3.RELEASE ambari plugin release](https://github.com/spring-cloud/spring-cloud-dataflow-ambari-rpm/issues?q=milestone%3A1.0-3-RELEASE%20is%3Aclosed%20).

Looking into a future:

-   We're planning to start work for 1.1.x
-   Better and faster interoperability with YARN
-   Integration to Ambari's [Extensions](https://cwiki.apache.org/confluence/display/AMBARI/Extensions+-+2.4.0) and [Management Packs](https://cwiki.apache.org/confluence/display/AMBARI/Management+Packs+-+2.4.0) allowing upgrades
-   Better versioning for release artifacts needed for upgrade support