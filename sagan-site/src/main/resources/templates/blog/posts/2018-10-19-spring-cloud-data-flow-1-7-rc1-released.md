---
title: Spring Cloud Data Flow 1.7 RC1 released
source: https://spring.io/blog/2018/10/19/spring-cloud-data-flow-1-7-rc1-released
scraped: 2026-02-23T15:09:31.857Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  October 19, 2018 | 0 Comments
---

# Spring Cloud Data Flow 1.7 RC1 released

_Releases | Mark Pollack |  October 19, 2018 | 0 Comments_

The [Spring Cloud Data Flow](https://cloud.spring.io/spring-cloud-dataflow/) team is pleased to announce the release of `1.7 RC1`. Follow the *Getting Started* guides for [Local Server](https://docs.spring.io/spring-cloud-dataflow/docs/1.7.0.RC1/reference/htmlsingle/#getting-started), [Cloud Foundry](https://docs.spring.io/spring-cloud-dataflow-server-cloudfoundry/docs/1.7.0.RC1/reference/htmlsingle/#getting-started), and [Kubernetes](https://docs.spring.io/spring-cloud-dataflow-server-kubernetes/docs/1.7.0.RC1/reference/htmlsingle/#kubernetes-getting-started).

The RC1 release builds on the core features introduced in 1.7 M1 with a few refinements.

## [](#here-are-the-highlights)[](#here-are-the-highlights)Here are the highlights

-   [Improved UI](https://spring.io/blog/2018/09/18/spring-cloud-data-flow-1-7-m1-released#improved-ui) — The UI has a completely new look. The property whitelisting functionality has been refined to not display all application properties by default if the whitelist is empty.
    
-   [Stream Application DSL](https://spring.io/blog/2018/09/18/spring-cloud-data-flow-1-7-m1-released#stream-application-dsl) — This has been integrated into the UI so you can design a data pipeline made out of arbitrary Boot applications.
    
-   [Support for scheduling of tasks on Kubernetes](http://docs.spring.io/spring-cloud-dataflow-server-kubernetes/docs/1.7.0.RC1/reference/htmlsingle/#_scheduling).
    
-   [Audit trail](https://spring.io/blog/2018/09/18/spring-cloud-data-flow-1-7-m1-released#audit-trail). — Task and Scheduler supported has been added.
    
-   [Concurrent Task Launch Limiting](https://spring.io/blog/2018/09/18/spring-cloud-data-flow-1-7-m1-released#concurrent-task-launch-limiting).
    
-   [Stream and Task validation](https://spring.io/blog/2018/09/18/spring-cloud-data-flow-1-7-m1-released#stream-and-task-validation). — Added support for validation of applications registered of type 'app'.
    
-   [Force upgrade for Streams](https://spring.io/blog/2018/09/18/spring-cloud-data-flow-1-7-m1-released#force-upgrade-for-streams).
    
-   Added section to customize docker compose to include Skipper. See item 5 in [Customizing Spring Cloud Data Flow](http://docs.spring.io/spring-cloud-dataflow/docs/1.7.0.RC1/reference/htmlsingle/#getting-started-customizing-spring-cloud-dataflow-docker).
    

## [](#stay-in-touch)[](#stay-in-touch)Stay in touch…​

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) or [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-dataflow).