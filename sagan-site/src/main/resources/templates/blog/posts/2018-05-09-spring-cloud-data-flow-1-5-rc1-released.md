---
title: Spring Cloud Data Flow 1.5 RC1 released
source: https://spring.io/blog/2018/05/09/spring-cloud-data-flow-1-5-rc1-released
scraped: 2026-02-23T15:25:27.703Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  May 09, 2018 | 0 Comments
---

# Spring Cloud Data Flow 1.5 RC1 released

_Releases | Mark Pollack |  May 09, 2018 | 0 Comments_

The [Spring Cloud Data Flow](https://cloud.spring.io/spring-cloud-dataflow/) team is pleased to announce the release of `1.5.0 RC1`. Follow the *Getting Started* guides for [Local Server](https://docs.spring.io/spring-cloud-dataflow/docs/1.5.0.RC1/reference/htmlsingle/#getting-started), [Cloud Foundry](https://docs.spring.io/spring-cloud-dataflow-server-cloudfoundry/docs/1.5.0.RC1/reference/htmlsingle/#getting-started), and [Kubernetes](https://docs.spring.io/spring-cloud-dataflow-server-kubernetes/docs/1.5.0.RC1/reference/htmlsingle/#kubernetes-getting-started).

Here are the highlights:

## [](#general-improvements)[](#general-improvements)General Improvements

-   Switch to Hikari connection pool and restructure code to use fewer connections.
    
-   Several bug fixes in underling deployer libraries.
    

## [](#dashboard)[](#dashboard)Dashboard

-   Editing a created/deployed stream is now possible from the [Stream Builder](http://docs.spring.io/spring-cloud-dataflow/docs/1.5.0.RC1/reference/htmlsingle/#dashboard-stream-deploy). The application and deployment properties can be edited and re-deployed. The App version can be switched, too.
    
-   A new paginator component is added to all the list page. Switching from a list of 20, 30, 50, or 100 items per page is possible. This further simplifies the bulk operation workflows.
    
-   Introduction of end-to-end testing via Selenium and SauceLabs.
    

## [](#app-starters)[](#app-starters)App Starters:

-   New release - [Celsius.SR2](https://cloud.spring.io/spring-cloud-stream-app-starters/)
    
-   Updated Rabbit source/sink to work on PCF
    
-   Updated python apps
    

## [](#kubernetes-server)[](#kubernetes-server)Kubernetes Server

-   The client and the cluster version compatibility have be improved due to [Core Workload APIs](https://kubernetes.io/blog/2018/01/core-workloads-api-ga/) going GA. For example, a StatefulSet deployment for a partitioned streaming-pipeline dynamically resolves the version compatibility - no more hardcoded StatefulSet endpoints.
    
-   Extending the annotation support added to the “pod” configurations, it is now also possible to add custom annotations to “jobs” deployment.
    
-   Deploying with custom liveness and readiness probe ports is now supported.
    

Review the [1.5.0.M1 release blog](https://spring.io/blog/2018/04/20/spring-cloud-data-flow-1-5-m1-released) for new feature improvements already added to the 1.5 code base.

## [](#stay-in-touch)[](#stay-in-touch)Stay in touch…​

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) or [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-dataflow).

Please try it out, share your feedback, and consider contributing to the project!