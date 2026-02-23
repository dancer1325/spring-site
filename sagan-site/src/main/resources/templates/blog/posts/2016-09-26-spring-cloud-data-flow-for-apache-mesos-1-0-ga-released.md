---
title: Spring Cloud Data Flow for Apache Mesos 1.0 GA released
source: https://spring.io/blog/2016/09/26/spring-cloud-data-flow-for-apache-mesos-1-0-ga-released
scraped: 2026-02-23T19:03:25.939Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  September 26, 2016 | 0 Comments
---

# Spring Cloud Data Flow for Apache Mesos 1.0 GA released

_Releases | Thomas Risberg |  September 26, 2016 | 0 Comments_

On behalf of the team, I am excited to announce the General Availability of Spring Cloud Data Flow for Apache Mesos 1.0.

Spring Cloud Data Flow for Apache Mesos provides support for orchestrating long-running (streaming) and short-lived (task/batch) data microservices on Apache Mesos. We launch stream apps using Application Groups on Marathon and tasks as Chronos one-time jobs. The release includes a template JSON script for deploying the Spring Cloud Data Flow server on Marathon. We also include sample scripts for deploying Redis, MySQL and Rabbit MQ on Marathon to be used for testing a complete deployment. In addition to running on an Apache Mesos cluster, we also support running on a Mesosphere DC/OS cluster.

*Note:* A great way to start using this new release is to follow the [release matrix](http://cloud.spring.io/spring-cloud-dataflow/#spring-cloud-data-flow-server-implementations) on the project page, which includes the download coordinates and the links to the reference guide.

Changes since the previous 1.0 RC2 release:

-   Adds configuration support for “authorization token” for secured access to Marathon and Chronos REST APIs on an OAuth enabled DC/OS cluster
-   Builds upon Spring Cloud Data Flow 1.0.1.RELEASE and Spring Cloud Deployer for Apache Mesos 1.0.4.RELEASE

To get started using Spring Cloud Data Flow for Apache Mesos [follow the steps](http://docs.spring.io/spring-cloud-dataflow-server-mesos/docs/1.0.0.RELEASE/reference/htmlsingle/#_getting_started) outlined in the reference documentation.

## [](#upcoming-webinar)Upcoming webinar

Tune-in to “[Data Microservices in the Cloud](https://spring.io/blog/2016/09/13/webinar-data-microservices-in-the-cloud)” webinar scheduled on 9/29/2016 to learn more about Spring Cloud Data Flow and the latest improvements.