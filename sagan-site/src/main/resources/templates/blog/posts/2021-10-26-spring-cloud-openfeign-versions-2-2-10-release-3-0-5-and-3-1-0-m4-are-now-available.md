---
title: Spring Cloud OpenFeign versions 2.2.10.RELEASE, 3.0.5 and 3.1.0-M4 are now available
source: https://spring.io/blog/2021/10/26/spring-cloud-openfeign-versions-2-2-10-release-3-0-5-and-3-1-0-m4-are-now-available
scraped: 2026-02-23T13:06:26.427Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Olga Maciaszek-Sharma |  October 26, 2021 | 0 Comments
---

# Spring Cloud OpenFeign versions 2.2.10.RELEASE, 3.0.5 and 3.1.0-M4 are now available

_Releases | Olga Maciaszek-Sharma |  October 26, 2021 | 0 Comments_

On behalf of the community, I am pleased to announce that Spring Cloud OpenFeign versions 2.2.10.RELEASE, 3.0.5 and 3.1.0-M4 have been released.

These are primarily security releases with fixes for the [CVE-2021-22044](https://tanzu.vmware.com/security/cve-2021-22044).

Applications using type-level `@RequestMapping`annotations over Feign client interfaces, can be involuntarily exposing endpoints corresponding to `@RequestMapping`\-annotated interface methods. Although a response is not returned for a request sent in this way, it does reach the corresponding server-side endpoint.

The practice of using a type-level `@RequestMapping` on a Feign client interface has been discouraged in the documentation, but we're now taking the step to reject it completely.

These versions will be picked up later by the 2020.0.x and 2021.0.x release trains, however, we recommend you already upgrade Spring Cloud OpenFeign in your projects to these most recent versions.

See all issues included in 2.2.10.RELEASE [here](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/44?closed=1) See all issues included in 3.1.0-M4 [here](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/45?closed=1) No additional issues were included for 3.0.5.