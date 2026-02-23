---
title: Spring Cloud Data Flow 2.6.0 Released
source: https://spring.io/blog/2020/08/04/spring-cloud-data-flow-2-6-0-released
scraped: 2026-02-23T13:53:12.055Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Janne Valkealahti |  August 04, 2020 | 1 Comment
---

# Spring Cloud Data Flow 2.6.0 Released

_Releases | Janne Valkealahti |  August 04, 2020 | 1 Comment_

Spring Cloud Data Flow team is pleased to announce the release of 2.6.0.

This 2.6.0 adds usual bug fixes and the following key highlights:

-   **Wavefront** New integration to monitor streams and tasks using *Wavefront*. More about this feature can be found from [Stream Monitoring](https://dataflow.spring.io/docs/feature-guides/streams/monitoring/) and [Task Monitoring](https://dataflow.spring.io/docs/feature-guides/batch/monitoring/)
    
-   **Platform Support for Scheduling** Tasks scheduling now have a platform support. See [Scheduling Tasks](https://dataflow.spring.io/docs/recipes/multi-platform-deployment/multi-platform-task/#scheduling-tasks)
    
-   **Java CFEnv** We're now on a new version of [Java CFEnv](https://github.com/pivotal-cf/java-cfenv) which greatly improves user experience when there is a need to bind to user created services.
    
-   **Bitnami** We've moved from a [Helm Hub](https://hub.helm.sh/charts/bitnami/spring-cloud-dataflow) to [Bitnami](https://bitnami.com/stack/spring-cloud-dataflow/helm) as a helm chart storage.
    
-   **Composed Task Runner as SCDF native module** Composed Task Runner is now an integral part of SCDF itself and gets registered implicitly while the users who have the custom composed task runner can still override the native one. This enables us to integrate the composed tasks management within the context of Spring Cloud Data Flow.
    
-   **Stream Applications** This is also a good reminder what's happening on our application space by following blog series \[Creating a Supplier Function and generating Spring Cloud Stream Source
    

\]([https://spring.io/blog/2020/07/27/creating-a-supplier-function-and-generating-spring-cloud-stream-source](https://spring.io/blog/2020/07/27/creating-a-supplier-function-and-generating-spring-cloud-stream-source))

## [](#stay-in-touch)Stay in touch...

As always, we welcome feedback and contributions, so please reach out to us on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) or [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-dataflow).