---
title: Spring Cloud Skipper 1.0 M2 Released
source: https://spring.io/blog/2017/11/21/spring-cloud-skipper-1-0-m2-released
scraped: 2026-02-23T16:15:15.520Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  November 21, 2017 | 0 Comments
---

# Spring Cloud Skipper 1.0 M2 Released

_Releases | Mark Pollack |  November 21, 2017 | 0 Comments_

On behalf of the team, I am pleased to announce the release of Spring Cloud Skipper 1.0 M2.

Skipper is a lightweight tool that allows you to discover Spring Boot applications and manage their lifecycle on multiple Cloud Platforms. You can use Skipper standalone or integrate it with Continuous Integration pipelines to help implement the practice of Continuous Deployment.

The 1.0 M2 release fixes several bugs and introduces a few new features.

-   Support for Postgres, MySQL, Microsoft SQL Server, and HSQLDB databases.
-   Improved support for upgrading applications that use an HTTP location for the resource definition.
-   LRU cache used to manage disk space for HTTP and Maven based resources that are downloaded.
-   HTTP based resources are always downloaded, never cached.
-   Use updated CF Deployer library with an HTTP based health check.

There were some minor changes to the application manifest and package metadata format.

-   Changes to apiVersion and kind in to be more consistent.
-   Separate out version property to a top-level field.
-   Skipper 1.0 M1 packages are still supported.

The [getting started section](https://docs.spring.io/spring-cloud-skipper/docs/1.0.0.M2/reference/htmlsingle/#getting-started-installing-skipper) in the reference guide is the best place to start kicking the tires.

Please reach out on [Github issues](https://github.com/spring-cloud/spring-cloud-skipper/issues), [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud-skipper), and the [Gitter channel](https://gitter.im/spring-cloud/spring-cloud-skipper) with questions, feedback or contributions.