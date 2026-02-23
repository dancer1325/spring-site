---
title: Spring Cloud Data Flow 2.3.1 Released
source: https://spring.io/blog/2020/01/27/spring-cloud-data-flow-2-3-1-released
scraped: 2026-02-23T14:13:41.826Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Janne Valkealahti |  January 27, 2020 | 0 Comments
---

# Spring Cloud Data Flow 2.3.1 Released

_Releases | Janne Valkealahti |  January 27, 2020 | 0 Comments_

This is a maintenance release for small bug fixes, enhancements, and dependency updates. Generally speaking, we’re now on Spring Cloud Hoxton SR1. List of fixed issues can be found from [2.3.1 Issue List](https://github.com/spring-cloud/spring-cloud-dataflow/issues/3707)

## [](#maven-preemptive-authentication)Maven Preemptive Authentication

Support for using Maven Wagon transport for HTTP has been added to the Maven Artifact Resolver infrastructure. The driver for this was a request from a user to be able to use preemptive authentication with JFrog’s artifactory. Use of it is currently optional via a property but we’re looking to make it default sometime in the future and possibly introduce more wagon transports which might provide interesting options to place your artifacts behind ssh, git or whatever Apache Wagon is able to provide.

## [](#stay-in-touch)Stay in touch...

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) or [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-dataflow).