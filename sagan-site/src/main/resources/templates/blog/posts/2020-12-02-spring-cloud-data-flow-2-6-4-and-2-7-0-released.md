---
title: Spring Cloud Data Flow 2.6.4 and 2.7.0 Released
source: https://spring.io/blog/2020/12/02/spring-cloud-data-flow-2-6-4-and-2-7-0-released
scraped: 2026-02-23T13:40:16.965Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ilayaperumal Gopinathan |  December 02, 2020 | 0 Comments
---

# Spring Cloud Data Flow 2.6.4 and 2.7.0 Released

_Engineering | Ilayaperumal Gopinathan |  December 02, 2020 | 0 Comments_

Spring Cloud Data Flow team is pleased to announce the release of 2.7.0 and 2.6.4

While the release 2.6.4 has [the bug fixes](https://github.com/spring-cloud/spring-cloud-dataflow/issues/4227), the 2.7.0 has the following updates along with the [bug fixes and improvements](https://github.com/spring-cloud/spring-cloud-dataflow/releases/tag/v2.7.0) :

**SCDF dashboard re-design using VMware Clarity toolkit**

SCDF dashboard is re-designed using [VMware Clarity design system](https://clarity.design/). This is a complete rewrite of SCDF dashboard GUI to get the benefits of the Clarity design.

**Spring Boot 2.3. Update**

SCDF server components are now updated to use Spring Boot 2.3.5 release.

**Wavefront integration**

Spring Cloud Data Flow dashboards for streams, tasks, SCDF server components and Kafka Streams dashboard are available in VMware Wavefront dashboards for integrations. The configurations required to set up the wavefront integration are simplified at the SCDF as well. More information on this can be found [here](https://github.com/spring-cloud/spring-cloud-dataflow/issues/3965).

**Stream Application starters**

The out of box streaming applications have been re-designed and developed from the scratch to have Spring Cloud Stream function support as the foundation. These applications are available for the users to import in SCDF. You can refer to [this](https://spring.io/projects/spring-cloud-stream-applications) page to get the import URL links for the out of the box applications.

We have also a dedicated documentation available [here](https://dataflow.spring.io/docs/applications/pre-packaged-3x/#getting-started) for the users on how to use these applications including the migration documentation if you want to migrate from the previous out of the box stream app starters.

Please refer to the [blog series](https://spring.io/blog/2020/11/16/case-study-elasticsearch-sink) which provides detailed analysis of all the streaming applications and use cases.

**Task Java DSL**

Task Java DSL is now available as part of SCDF REST client component and gives the developers the ability to programmatically control task lifecycle operations using this Java DSL. For more information you can refer [here](https://dataflow.spring.io/docs/feature-guides/batch/java-dsl/)

**JDK11 Compatibility**

SCDF and Skipper components are compatible with Java 11 Runtime

**Deprecation of Helm Hub Chart**

Helm charts for SCDF are now deprecated and moved into [Bitnami OSS charts](https://github.com/bitnami/charts/tree/master/bitnami/spring-cloud-dataflow)

## [](#stay-in-touch)Stay in touch...

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) or [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-dataflow).