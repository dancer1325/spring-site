---
title: Spring Cloud Data Flow 1.6 M1 and 1.5.2 released
source: https://spring.io/blog/2018/07/05/spring-cloud-data-flow-1-6-m1-and-1-5-2-released
scraped: 2026-02-23T15:19:42.193Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  July 05, 2018 | 0 Comments
---

# Spring Cloud Data Flow 1.6 M1 and 1.5.2 released

_Releases | Mark Pollack |  July 05, 2018 | 0 Comments_

The [Spring Cloud Data Flow](https://cloud.spring.io/spring-cloud-dataflow/) team is pleased to announce the `1.6` M1 release and `1.5.2` release.

For 1.6 M1, follow the *Getting Started* guides for [Local Server](https://docs.spring.io/spring-cloud-dataflow/docs/1.6.0.M1/reference/htmlsingle/#getting-started), [Cloud Foundry](https://docs.spring.io/spring-cloud-dataflow-server-cloudfoundry/docs/1.6.0.M1/reference/htmlsingle/#getting-started), and [Kubernetes](https://docs.spring.io/spring-cloud-dataflow-server-kubernetes/docs/1.6.0.M1/reference/htmlsingle/#kubernetes-getting-started).

For 1.5.2, follow the *Getting Started* guides for [Local Server](https://docs.spring.io/spring-cloud-dataflow/docs/1.5.2.RELEASE/reference/htmlsingle/#getting-started), [Cloud Foundry](https://docs.spring.io/spring-cloud-dataflow-server-cloudfoundry/docs/1.5.2.RELEASE/reference/htmlsingle/#getting-started), and [Kubernetes](https://docs.spring.io/spring-cloud-dataflow-server-kubernetes/docs/1.5.2.RELEASE/reference/htmlsingle/#kubernetes-getting-started).

## [](#areas-of-improvement-for-16-m1)[](#areas-of-improvement-for-1-6-m1)Areas of improvement for 1.6 M1:

-   DSL and deployment property parsing
    
-   Task Execution status
    
-   Composed Task Runner security
    
-   Dashboard
    
-   Kubernetes deployments
    

## [](#dsl-and-deployment-property-parsing)[](#dsl-and-deployment-property-parsing)DSL and deployment property parsing

Launching Tasks with custom arguments is a great approach to influence the Task application with differing behaviors at runtime. Imagine influencing the batch-job (running as a Task) that accepts timezone as an argument to perform timezone specific data processing. In this release, we have adapted the parsing logic to include key-value pairs as values. Thanks to the community for reporting, giving us feedback, and sharing of their use-cases.

While reviewing the parsing rules for in-line vs. property files based properties for stream and task definitions, the community has found a difference in behavior, and that we have documented it for [general guidance](http://docs.spring.io/spring-cloud-dataflow/docs/1.6.0.M1/reference/htmlsingle/#_property_files_rules).

## [](#task-execution-status)[](#task-execution-status)Task execution status

Previously the task execution status was stored but not displayed in the shell or the UI. Now it is displayed :)

## [](#composed-task-runner-security)[](#composed-task-runner-security)Composed Task Runner security

With continuing interest from community, we have added support to enable secured access between Composed Task Runner and the Data Flow server. We have added basic authentication support and will add the other security options supported by Data Flow in upcoming releases.

## [](#dashboard-improvements)[](#dashboard-improvements)Dashboard improvements

The Task/Jobs and About tabs have been redesigned to be consistent with rest of the UI sections. The bulk operations, paginations, layout, and the general look and feel of the views have been modernized.

The routing and navigation between the Task tabs, sub-tabs and page views have gone through a update. You will notice improvements in state management navigating between the list to details page, and vice versa.

## [](#kubernetes-deployments)[](#kubernetes-deployments)Kubernetes deployments

A few improvements including the support for deploying Boot Apps with secured actuators, so the liveness and readiness probes can resolved at runtime.

The ability to pass custom `Service Account Name` is now possible for each stream/task deployment. This in particular is useful for scenarios where different stream/task deployments require different security permissions.

## [](#areas-of-improvement-for-152)[](#areas-of-improvement-for-1-5-2)Areas of improvement for 1.5.2:

-   Kubernetes support as in 1.6.0.M1
    
-   Small bug fixes
    

## [](#what-is-coming-next)[](#what-is-coming-next)What is coming next…​

The integration of the [PCF Scheduler](https://network.pivotal.io/products/p-scheduler) in Data Flow for Cloud Foundry is in the works. Stay tuned for the next milestone in the coming week.

## [](#stay-in-touch)[](#stay-in-touch)Stay in touch…​

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) or [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-dataflow).