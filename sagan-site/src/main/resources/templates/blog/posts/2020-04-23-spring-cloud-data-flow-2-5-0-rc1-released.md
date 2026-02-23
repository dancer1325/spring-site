---
title: Spring Cloud Data Flow 2.5.0.RC1 Released
source: https://spring.io/blog/2020/04/23/spring-cloud-data-flow-2-5-0-rc1-released
scraped: 2026-02-23T14:03:59.713Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ilayaperumal Gopinathan |  April 23, 2020 | 0 Comments
---

# Spring Cloud Data Flow 2.5.0.RC1 Released

_Engineering | Ilayaperumal Gopinathan |  April 23, 2020 | 0 Comments_

Spring Cloud Data Flow team is pleased to announce the first milestone release of 2.5.0.RC1.

This first release candidate of 2.5.0 adds some bug fixes and the following features:

-   Support application `metadata` as part of the `Container` images. Before this release, we only supported application property [whitelisting](https://dataflow.spring.io/docs/2.5.0.SNAPSHOT/feature-guides/general/application-metadata/#metadata-container-image-label) when using a maven artifact.
    
-   Support for `Azure AD` integration using OAuth 2.0. Spring Cloud Data Flow, Spring Cloud Skipper servers along with the Spring Cloud Data Flow shell can be [configured](https://docs.spring.io/spring-cloud-dataflow/docs/2.5.0.RC1/reference/htmlsingle/#identity-providers) to integrate with Azure AD for authentication and authorization.
    
-   Removal of Scheduler task launcher component when scheduling tasks. In Spring Cloud Data Flow 2.3.x, the scheduling of tasks was designed to have an intermediate scheduler task launcher component to enhance the continuous deployment user experience. Since this component added some additional complexities and overhead on Kubernetes, the 2.5.x release removed this intermediary task launcher. We also added a [migration tool](https://github.com/spring-cloud/spring-cloud-dataflow-samples/tree/master/dataflow-migrate-schedules) to migrate the schedules from 2.3.x and 2.4.x
    
-   Unification of Kubernetes Scheduler properties. This [feature](https://github.com/spring-cloud/spring-cloud-deployer-kubernetes/issues/331) lets the user configure any supported/applicable task deployment properties at the time of scheduling them as well.
    

We are wrapping up the 2.5.0 GA related changes and looking forward to sharing the GA announcement soon!

## [](#stay-in-touch)Stay in touch...

As always, we welcome feedback and contributions, so please reach out to us on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) or [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-dataflow).