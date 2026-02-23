---
title: Spring Cloud Data Flow for Mesos 1.0 RC2 released
source: https://spring.io/blog/2016/08/26/spring-cloud-data-flow-for-mesos-1-0-rc2-released
scraped: 2026-02-23T19:06:46.926Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  August 26, 2016 | 0 Comments
---

# Spring Cloud Data Flow for Mesos 1.0 RC2 released

_Releases | Thomas Risberg |  August 26, 2016 | 0 Comments_

We are pleased to announce the 1.0.0.RC2 release candidate of Spring Cloud Data Flow for Mesos, a team effort that encompasses many new features under the hood.

This release candidate builds upon the recent 1.0 GA release of Spring Cloud Data Flow. Some highlights include:

-   We now run the Spring Cloud Data Flow Server as a Docker image on Marathon, a container orchestration platform for Mesos.
-   This release adds features to support stream partitioning and scaling

-   Currently partitioning and scaling of sinks and processors are handled by using multiple application deployments, one for each app instance, identified by an index appended to the name.
-   Scaling of sources is handled by using additional application instances.

\* Streams are now deployed using Marathon \[Application Groups\](https://mesosphere.github.io/marathon/docs/application-groups.html) so it is easier to identify the different apps making up a stream. \* We have added support for launching tasks using Chronos, a fault tolerant job scheduler for Mesos.

As part of this effort we have developed a simple Java client for interacting with the Chronos API. This [Java client](https://github.com/spring-cloud/spring-cloud-deployer-mesos/tree/master/src/main/java/org/springframework/cloud/mesos/chronos/client) is included in the latest 1.0.2.RELEASE version of the [Spring Cloud Deployer for Mesos project](https://github.com/spring-cloud/spring-cloud-deployer-mesos).

To get started using Spring Cloud Data Flow for Mesos [follow these steps](http://docs.spring.io/spring-cloud-dataflow-server-mesos/docs/1.0.0.RC2/reference/htmlsingle/#_getting_started) outlined in the reference documentation.

For a complete list of changes and improvements, please refer to the [1.0.0.RC2 issues](https://github.com/spring-cloud/spring-cloud-dataflow-server-mesos/issues?q=milestone%3A1.0.0.RC2).