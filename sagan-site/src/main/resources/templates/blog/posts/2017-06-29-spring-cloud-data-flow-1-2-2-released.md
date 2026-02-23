---
title: Spring Cloud Data Flow 1.2.2 Released
source: https://spring.io/blog/2017/06/29/spring-cloud-data-flow-1-2-2-released
scraped: 2026-02-23T16:28:08.157Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  June 29, 2017 | 0 Comments
---

# Spring Cloud Data Flow 1.2.2 Released

_Releases | Thomas Risberg |  June 29, 2017 | 0 Comments_

On behalf of the team, I am pleased to announce the general availability of Spring Cloud Data Flow 1.2.2.

Local Server: [Quick Start](http://cloud.spring.io/spring-cloud-dataflow/#quick-start), [Getting Started Guide](http://docs.spring.io/spring-cloud-dataflow/docs/1.2.2.RELEASE/reference/htmlsingle/#getting-started)

Due to the popular demand from the community, the primary goal of this maintenance release is to bring Spring Boot 1.5.4 compatibility in Spring Cloud Data Flow.

-   Since it includes refactoring efforts to adapt to a bug fix introduced in a Spring Data maintenance release that is pulled in by Spring Boot, this is not a simple version upgrade.
-   As reported by the community, a side effect of this update surfaced pagination problems in the clients. It has been reworked both in the client and server-side.

This release also includes the usual bugfixes, documentation updates, and test coverage improvements - more details in the [release notes](https://github.com/spring-cloud/spring-cloud-dataflow/releases/tag/v1.2.2.RELEASE).

Feedback is important. Please reach out to us in [StackOverflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) and [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) for questions and feature requests. We also welcome contributions! Any help improving the [Spring Cloud Data Flow ecosystem](http://cloud.spring.io/spring-cloud-dataflow/#building-blocks-of-spring-cloud-data-flow) is appreciated.