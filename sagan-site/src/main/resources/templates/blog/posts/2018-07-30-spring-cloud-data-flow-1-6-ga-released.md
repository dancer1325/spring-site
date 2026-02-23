---
title: Spring Cloud Data Flow 1.6 GA Released
source: https://spring.io/blog/2018/07/30/spring-cloud-data-flow-1-6-ga-released
scraped: 2026-02-23T15:17:32.994Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  July 30, 2018 | 1 Comment
---

# Spring Cloud Data Flow 1.6 GA Released

_Releases | Mark Pollack |  July 30, 2018 | 1 Comment_

The [Spring Cloud Data Flow](https://cloud.spring.io/spring-cloud-dataflow/) team is pleased to announce the release of `1.6.0`. Follow the *Getting Started* guides for [Local Server](https://docs.spring.io/spring-cloud-dataflow/docs/1.6.0.RELEASE/reference/htmlsingle/#getting-started), [Cloud Foundry](https://docs.spring.io/spring-cloud-dataflow-server-cloudfoundry/docs/1.6.0.RELEASE/reference/htmlsingle/#getting-started), and [Kubernetes](https://docs.spring.io/spring-cloud-dataflow-server-kubernetes/docs/1.6.0.RELEASE/reference/htmlsingle/#kubernetes-getting-started).

## [](#feature-highlights-for-16-ga)[](#feature-highlights-for-1-6-ga)Feature highlights for 1.6 GA

-   Task Scheduling on PCF
    
-   Dashboard improvments
    
-   Kubernetes support enhancements
    
-   App hosting tool
    
-   Composed Task Runner security
    
-   DSL and deployment property parsing refinements
    
-   Batch Database Schema and Optimization
    

## [](#task-scheduling-on-pcf)[](#task-scheduling-on-pcf)Task Scheduling on PCF

We are happy to introduce the native integration of [PCF Scheduler](https://docs.pivotal.io/pcf-scheduler/) in the [SCDF for Cloud Foundry](http://cloud.spring.io/spring-cloud-dataflow-server-cloudfoundry/#) implementation!

A typical workflow for batch data processing involves scheduling batch applications. For example, the scheduler system accepts a cron expression and launches the application whenever the expression matches the current time.

Data Flow provides the ability to schedule and unschedule a task definition. The schedule is based on a cron expression. Building upon the [PCF Java Client](https://github.com/pivotal-cf/pcf-java-client) the team has created a portable scheduler interface in the [Spring Cloud Scheduler SPI project](https://github.com/spring-cloud/spring-cloud-scheduler) (Service Provider Interface) and an implementation for PCF, [Spring Cloud Scheduler for Cloud Foundry](https://github.com/spring-cloud/spring-cloud-scheduler-cloudfoundry). The Dashboard provides access to schedule and unschedule a task as shown in the screenshot below.

![Create Schedule](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/v1.6.0.M2/spring-cloud-dataflow-docs/src/main/asciidoc/images/dataflow-scheduling-create.png)

![List and Delete Schedules](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/v1.6.0.M2/spring-cloud-dataflow-docs/src/main/asciidoc/images/dataflow-scheduling-list.png)

## [](#dashboard-improvements)[](#dashboard-improvements)Dashboard improvements

The stream deployment history is available for review from the Dashboard. It is convenient to review the context-specific history of a stream from a central location; especially, when the CI/CD systems continually deploy new version application artifacts that belong to the stream.

The Task/Jobs and About tabs have been redesigned to be consistent with rest of the UI sections. The bulk operations, paginations, layout, and the general look and feel of the views have been modernized. Previously the task execution status was stored but not displayed in the shell or the UI. Now it is displayed :)

The routing and navigation between the Task tabs, sub-tabs and page views have gone through a update. You will notice improvements in state management navigating between the list to details page, and vice versa.

The SCDF Dashboard and Spring Flo stack have been upgraded to Angular 6. Several downstream dependencies including JointJS were updated as well. Though the test harness runs through a variety of browsers for incremental validation, if you see any abnormalities in different browsers, feel free to open an issue or bring it up in Gitter or StackOverflow. We appreciate any feedback.

## [](#kubernetes-deployments)[](#kubernetes-deployments)Kubernetes deployments

A few improvements including the support for deploying Boot Apps with secured actuators, so the liveness and readiness probes can resolved at runtime.

The ability to pass custom `Service Account Name` is now possible for each stream/task deployment. This in particular is useful for scenarios where different stream/task deployments require different security permissions.

## [](#app-hosting-tool)[](#app-hosting-tool)App Hosting Tool

While Maven is the recommended approach for Stream/Task App artifact resolution, some users cannot use Maven for a variety of reasons. We have also heard about customers installing SCDF in a no-internet zone and can’t reach out to resolve Stream/Task artifacts via Maven, HTTP or a Docker registry.

To address these concerns, we have developed an App Hosting Tool, which mimics a standalone App repository, but in reality, is a Spring Boot App serving the App artifacts through HTTP. You can read more about the App Tool and the getting-started instructions from [here](https://github.com/spring-cloud-stream-app-starters/scdf-app-repo).

## [](#composed-task-runner-security)[](#composed-task-runner-security)Composed Task Runner security

With continuing interest from community, we have added support to enable secured access between Composed Task Runner and the Data Flow server. We have added basic authentication support and will add the other security options supported by Data Flow in upcoming releases.

## [](#dsl-and-deployment-property-parsing)[](#dsl-and-deployment-property-parsing)DSL and deployment property parsing

Launching Tasks with custom arguments is a great approach to influence the Task application with differing behaviors at runtime. Imagine influencing the batch-job (running as a Task) that accepts timezone as an argument to perform timezone specific data processing. In this release, we have adapted the parsing logic to include key-value pairs as values. Thanks to the community for reporting, giving us feedback, and sharing of their use-cases.

While reviewing the parsing rules for in-line vs. property files based properties for stream and task definitions, the community has found a difference in behavior, and that we have documented it for [general guidance](http://docs.spring.io/spring-cloud-dataflow/docs/1.6.0.RELEASE/reference/htmlsingle/#_property_files_rules).

## [](#batch-database-schema-and-optimization)[](#batch-database-schema-and-optimization)Batch Database Schema and Optimization

Thanks to the community for thorough validation and feedback on the database schema. The batch and task schemas have enhanced for the cases when there are large numbers of Task executions for MySQL and PostgreSQL. Optimizations for other databases are on their way.

## [](#what-is-coming-next)[](#what-is-coming-next)What is coming next…​

We are forming our 1.7 plans, checkout [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) for more details. However, one area of focus is to support the [Spring Cloud Function](https://cloud.spring.io/spring-cloud-function/) programming model. This also will help to simplify the composition of [app starters](https://cloud.spring.io/spring-cloud-stream-app-starters/) and your custom business logic.

## [](#stay-in-touch)[](#stay-in-touch)Stay in touch…​

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) or [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-dataflow).