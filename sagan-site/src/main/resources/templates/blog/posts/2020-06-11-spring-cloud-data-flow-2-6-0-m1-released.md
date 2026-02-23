---
title: Spring Cloud Data Flow 2.6.0-M1 Released
source: https://spring.io/blog/2020/06/11/spring-cloud-data-flow-2-6-0-m1-released
scraped: 2026-02-23T13:57:57.291Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ilayaperumal Gopinathan |  June 11, 2020 | 0 Comments
---

# Spring Cloud Data Flow 2.6.0-M1 Released

_Engineering | Ilayaperumal Gopinathan |  June 11, 2020 | 0 Comments_

Spring Cloud Data Flow team is pleased to announce the first milestone release of 2.6.0.

This 2.6.0-M1 adds some bug fixes and the following features:

-   **Composed Task Runner as SCDF native module** Composed Task Runner is now an integral part of SCDF itself and gets registered implicitly while the users who have the custom composed task runner can still override the native one. This enables us to integrate the composed tasks management within the context of Spring Cloud Data Flow. This change also allowed us to provide some additional user experiences when managing composed tasks. .
    
-   **Improvements in task applications management** This milestone added some improvements at the backend such as the ability to uniquely identify the task elements inside the composed task, adding task manifest as part of the last ran task definition, ability to cleanup task related resources as part of task definition cleanup along with the SCDF dashboard changes.
    
-   **Liveness/Readiness probes for SCDF/Skipper deployments** SCDF/Skipper server Kubernetes deployment configuration files are updated with the liveness/readiness probes which can be customized based on the deployment setup.
    
-   **Bundling SCDF/Skipper DB schema files** The DDL scripts for all the supported databases are now bundled and available in the classpath. For the database administrators who want to setup the database without the flyway activated schema management, this bundle would come in handy.
    

In the upcoming release, we look forward to add wavefront monitoring for stream/task application metrics and task scheduling on multiple platforms etc.,

## [](#stay-in-touch)Stay in touch...

As always, we welcome feedback and contributions, so please reach out to us on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) or [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-dataflow).