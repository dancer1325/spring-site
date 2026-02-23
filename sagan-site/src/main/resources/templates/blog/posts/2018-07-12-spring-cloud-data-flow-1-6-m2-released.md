---
title: Spring Cloud Data Flow 1.6 M2 released
source: https://spring.io/blog/2018/07/12/spring-cloud-data-flow-1-6-m2-released
scraped: 2026-02-23T15:19:29.033Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  July 12, 2018 | 0 Comments
---

# Spring Cloud Data Flow 1.6 M2 released

_Releases | Mark Pollack |  July 12, 2018 | 0 Comments_

The [Spring Cloud Data Flow](https://cloud.spring.io/spring-cloud-dataflow/) team is pleased to announce the release of `1.6 M2`. Follow the *Getting Started* guides for [Local Server](https://docs.spring.io/spring-cloud-dataflow/docs/1.6.0.M2/reference/htmlsingle/#getting-started), [Cloud Foundry](https://docs.spring.io/spring-cloud-dataflow-server-cloudfoundry/docs/1.6.0.M2/reference/htmlsingle/#getting-started), and [Kubernetes](https://docs.spring.io/spring-cloud-dataflow-server-kubernetes/docs/1.6.0.M2/reference/htmlsingle/#kubernetes-getting-started).

## [](#here-are-the-highlights)[](#here-are-the-highlights)Here are the highlights

-   Task Scheduling on PCF
    
-   Angluar 6 update
    
-   App Hosting Tool
    

## [](#task-scheduling-on-pcf)[](#task-scheduling-on-pcf)Task Scheduling on PCF

We are happy to introduce the native integration of [PCF Scheduler](https://docs.pivotal.io/pcf-scheduler/) in the [SCDF for Cloud Foundry](http://cloud.spring.io/spring-cloud-dataflow-server-cloudfoundry/#) implementation!

A typical workflow for batch data processing involves scheduling batch applications. For example, the scheduler system accepts a cron expression and launches the application whenever the expression matches the current time.

Data Flow provides the ability to schedule and unschedule a task definition. The schedule is based on a cron expression. Building upon the [PCF Java Client](https://github.com/pivotal-cf/pcf-java-client) the team has created a portable scheduler interface in the [Spring Cloud Scheduler SPI project](https://github.com/spring-cloud/spring-cloud-scheduler) (Service Provider Interface) and an implementation for PCF, [Spring Cloud Scheduler for Cloud Foundry](https://github.com/spring-cloud/spring-cloud-scheduler-cloudfoundry). The Dashboard provides access to schedule and unschedule a task as shown in the screenshot below.

![Create Schedule](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/v1.6.0.M2/spring-cloud-dataflow-docs/src/main/asciidoc/images/dataflow-scheduling-create.png)

![List and Delete Schedules](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/v1.6.0.M2/spring-cloud-dataflow-docs/src/main/asciidoc/images/dataflow-scheduling-list.png)

## [](#angular-6)[](#angular-6)Angular 6

The SCDF Dashboard and Spring Flo stack have been upgraded to Angular 6. Several downstream dependencies including JointJS were updated as well. Though the test harness runs through a variety of browsers for incremental validation, if you see any abnormalities in different browsers, feel free to open an issue or bring it up in Gitter or StackOverflow. We appreciate any feedback.

## [](#app-hosting-tool)[](#app-hosting-tool)App Hosting Tool

While Maven is the recommended approach for Stream/Task App artifact resolution, some users cannot use Maven for a variety of reasons. We have also heard about customers installing SCDF in a no-internet zone and can’t reach out to resolve Stream/Task artifacts via Maven, HTTP or a Docker registry.

To address these concerns, we have developed an App Hosting Tool, which mimics a standalone App repository, but in reality, is a Spring Boot App serving the App artifacts through HTTP. You can read more about the App Tool and the getting-started instructions from [here](https://github.com/spring-cloud-stream-app-starters/scdf-app-repo).

## [](#stay-in-touch)[](#stay-in-touch)Stay in touch…​

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) or [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-dataflow).