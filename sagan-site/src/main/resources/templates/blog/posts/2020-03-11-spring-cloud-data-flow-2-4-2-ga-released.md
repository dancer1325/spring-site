---
title: Spring Cloud Data Flow 2.4.2 GA Released
source: https://spring.io/blog/2020/03/11/spring-cloud-data-flow-2-4-2-ga-released
scraped: 2026-02-23T14:07:54.540Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ilayaperumal Gopinathan |  March 11, 2020 | 0 Comments
---

# Spring Cloud Data Flow 2.4.2 GA Released

_Engineering | Ilayaperumal Gopinathan |  March 11, 2020 | 0 Comments_

Spring Cloud Data Flow team is pleased to announce the **GA** release of **2.4.2**.

In this release, along with some bug fixes, we primarily focused on the server/client-side performance improvements on the stream management.

The REST layer in Spring Cloud Data Flow server is refactored to accommodate better `pagination` and `performance` when retrieving the runtime application statuses of streams. In addition to that, the SCDF dashboard pages are re-worked based on these changes. The `Runtime Applications` page in the Dashboard has a new layout where the runtime applications are grouped by their streams. The `Streams` page is also refactored to efficiently retrieve the stream status, application metrics, etc.,

Reactive interface methods are added into Spring Cloud Deployer. The Cloud Foundry Deployer’s status methods implement these reactive methods for better performance. Along with Spring Cloud Deployer, Spring Cloud Skipper is updated to use these reactive implementations.

**NOTE** Please note that Spring Cloud Data Flow 2.4.2 GA is compatible only with the Spring Cloud Skipper 2.3.2.RELEASE and above. When upgrading Spring Cloud Data Flow 2.4.2.RELEASE, Spring Cloud Skipper also needs to be updated to 2.3.2.RELEASE and above.

## [](#stay-in-touch)Stay in touch...

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) or [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-dataflow).