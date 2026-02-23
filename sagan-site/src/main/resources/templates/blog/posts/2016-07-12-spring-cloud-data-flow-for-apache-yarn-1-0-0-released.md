---
title: Spring Cloud Data Flow for Apache YARN 1.0.0 released
source: https://spring.io/blog/2016/07/12/spring-cloud-data-flow-for-apache-yarn-1-0-0-released
scraped: 2026-02-23T19:10:38.342Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Janne Valkealahti |  July 12, 2016 | 0 Comments
---

# Spring Cloud Data Flow for Apache YARN 1.0.0 released

_Releases | Janne Valkealahti |  July 12, 2016 | 0 Comments_

We are pleased to announce the release of [Spring Cloud Data Flow for Apache YARN](http://cloud.spring.io/spring-cloud-dataflow-server-yarn) 1.0.0.RELEASE.

Spring Cloud Data Flow for Apache YARN provides support for orchestrating long-running (streaming) and short-lived (task/batch) data microservices on Apache YARN.

This project was originally conceptualized with the goal to supplement the existing Spring XD users who have investments running streaming and batch data pipelines in a more traditional bare-metal setup. We wanted to provide migration path to help port over their existing investments and the tools and techniques to reap the benefits of microservices style architecture.

Apart from API cleanups and stabilization, we have worked on the following themes on this major release.

-   Builds upon 1.0.0.RELEASE of Spring Cloud Data Flow Core (shell, UI, REST-APIs, etc.)
-   Adds scaling infrastructure to support stream partitioning
-   Several improvements to Spring Cloud Data Flow’s Amabri plugin
-   Adds migration guide and other documentation fragments to the reference documentation
-   Adds a [project site](http://cloud.spring.io/spring-cloud-dataflow-server-yarn)
-   Adds [getting-started-guide](http://docs.spring.io/spring-cloud-dataflow-server-yarn/docs/1.0.0.RELEASE/reference/htmlsingle/#_using_sandboxes) to bootstrap Spring Cloud Data Flow on HDP 2.4 sandbox

For a complete list of changes and improvements, please refer to [1.0.0.RELEASE server release](https://github.com/spring-cloud/spring-cloud-dataflow-server-yarn/issues?q=milestone%3A1.0.0.RELEASE+is%3Aclosed) and [1.0.0.RELEASE deployer release](https://github.com/spring-cloud/spring-cloud-deployer-yarn/issues?q=milestone%3A1.0.0.RELEASE+is%3Aclosed).

The Spring Cloud Data Flow team will be talking at [Spring One Platform](https://springoneplatform.io/), which will be taking place in Las Vegas between August 1-4 this year. There are many other great talks so check the [agenda](https://2016.event.springoneplatform.io/schedule/sessions) and get your [ticket](https://2016.event.springoneplatform.io/register) if you haven’t done so already.