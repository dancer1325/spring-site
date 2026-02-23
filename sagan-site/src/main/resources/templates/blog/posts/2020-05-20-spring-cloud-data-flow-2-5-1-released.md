---
title: Spring Cloud Data Flow 2.5.1 Released
source: https://spring.io/blog/2020/05/20/spring-cloud-data-flow-2-5-1-released
scraped: 2026-02-23T13:59:52.946Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Janne Valkealahti |  May 20, 2020 | 0 Comments
---

# Spring Cloud Data Flow 2.5.1 Released

_Releases | Janne Valkealahti |  May 20, 2020 | 0 Comments_

Spring Cloud Data Flow team is pleased to announce the release of 2.5.1.

This release includes some bug fixes with the some of the notable changes as follows:

-   DeploymentProperties parsing fixes.
-   Removed behaviour for server to attempt to contact dockerhub during a start.
-   Fixes to dataflow client to re-authorize when oauth client credentials are used.
-   Liveness and readiness probe changes to kubernetes deployment files.
-   Upgrades to `Spring Boot 2.2.7` and `Spring Cloud Hoxton.SR4`. New dependencies from these fixed an issue in `Spring Data Rest` which caused repository mappings [DATAREST-1502](https://jira.spring.io/browse/DATAREST-1502) to stop working and effectively caused UI and Skipper to start behaving erratically in `Data Flow 2.5.0`.

## [](#stay-in-touch)Stay in touch...

As always, we welcome feedback and contributions, so please reach out to us on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) or [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-dataflow).