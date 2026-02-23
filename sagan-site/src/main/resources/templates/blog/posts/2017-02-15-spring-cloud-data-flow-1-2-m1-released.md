---
title: Spring Cloud Data Flow 1.2 M1 released
source: https://spring.io/blog/2017/02/15/spring-cloud-data-flow-1-2-m1-released
scraped: 2026-02-23T18:37:14.479Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  February 15, 2017 | 0 Comments
---

# Spring Cloud Data Flow 1.2 M1 released

_Releases | Thomas Risberg |  February 15, 2017 | 0 Comments_

On behalf of the team, I am excited to announce the release of the first milestone of Spring Cloud Data Flow 1.2.

*Note:* A great way to start using this new release(s) is to follow the [release matrix](http://cloud.spring.io/spring-cloud-dataflow/#spring-cloud-data-flow-implementations) on the project page, which includes the download coordinates and the links to the reference guide.

Over the last few weeks, we have added new features and improvements to the overall orchestration of data microservices. The following new features were included in the 1.2.0.M1 release:

### [](#core)Core

-   Introduce dedicated prefixes for deployment properties. Using the deployer properties is as simple as `deployer.<appname>.xxx` as opposed to `app.<appname>.spring.cloud.deployer.xxx`
-   Introduce a new REST-API controller and shell support to cleanup Task Executions
-   Foundation work to consolidate the use of controllers between Task deployments and Task Executions
-   Consolidate REST-API call traces and return codes for consistency
-   Adds [role-based access control](http://docs.spring.io/spring-cloud-dataflow/docs/1.2.0.M1/reference/htmlsingle/#customizing-authorization) to define who has access to create, deploy, destroy, or view streams/tasks. This works seamlessly in coordination with the supported [authentication methods](http://docs.spring.io/spring-cloud-dataflow/docs/1.2.0.M1/reference/htmlsingle/#configuration-security).
-   Performance optimizations to “stream list” operation. Instead of making individual calls for each app associated with the stream, the newly introduced `MultiStateAppDeployer` SPI operation invokes a call per stream that queries all the application statuses in a single network call
-   Improves error reporting for “stream list” operation

### [](#dashboard)Dashboard

-   Adds a convenient option in “About” tab from the Dashboard to download compatible Shell application
-   Adds connectivity between Tasks and Batch-jobs in the Dashboard. The batch-job “details view” can be accessed from the Task-list page and likewise, the task “details view” can be accessed from the Batch-list page.
-   Adds role-based access control integration to the Dashboard

### [](#out-of-the-box-stream-applications)[Out-of-the-box Stream Applications](https://github.com/spring-cloud-stream-app-starters/)

-   Following new applications were added and it is targeted to be released in the upcoming [Bacon release-train](http://docs.spring.io/spring-cloud-stream-app-starters/docs/Bacon.BUILD-SNAPSHOT/reference/html/):
    -   MongoDB Sink
    -   PGCopy Sink
    -   Aggregator Processor
    -   Header-enricher Processor
-   Add improvements to core app generation framework in the app-starters project that allows selectively upgrading dependent release versions. We can independently upgrade Spring Boot, Spring Integration or any other dependency at each application level and generate kafka, rabbitmq, or any other binder based applications more easily.

Review the [1.2.0.M1 (core)](https://github.com/spring-cloud/spring-cloud-dataflow/milestone/13?closed=1) / [1.2.0.M1 (ui)](https://github.com/spring-cloud/spring-cloud-dataflow-ui/milestone/12?closed=1) release markers to learn more about the incremental improvements.

### [](#next-milestone)Next Milestone

-   Include core foundation work to support Docker artifacts as first-class citizen in shell, dsl, and the UI.
-   The ability to orchestrate “composition of batch-jobs or tasks” is making progress. A new set of DSL primitives to support this from shell/UI is underway, too.
-   Significant refactoring of core constructs around controllers, dsl, and REST-APIs underway to support “application grouping” functionality. Apart from the ability to orchestrate Spring Cloud Stream or Spring Cloud Task applications, this new model would allow orchestration for any Spring Boot application. There will be an option to define the application groups and such “groups” can be tagged by "labels", so it will be then easy to perform group operations at the “label” level such group-deploy or group-destroy. For example, a stream is a specialization of a “group” that includes source, processor(s), and sink type of applications in it.
-   We envision further evolving “application grouping” capability to stream versioning, too. Stay tuned!

A few of us from the Spring Cloud Data Flow team will be at [DevNexus](https://devnexus.com/s/index) next week. Please do consider attending the [sessions](https://spring.io/blog/2017/02/01/spring-team-at-devnexus-2017) to learn more about these feature capabilities.