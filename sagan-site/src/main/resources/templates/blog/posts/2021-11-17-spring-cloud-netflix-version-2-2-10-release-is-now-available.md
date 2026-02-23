---
title: Spring Cloud Netflix version 2.2.10.RELEASE is now available
source: https://spring.io/blog/2021/11/17/spring-cloud-netflix-version-2-2-10-release-is-now-available
scraped: 2026-02-23T13:04:22.748Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Olga Maciaszek-Sharma |  November 17, 2021 | 0 Comments
---

# Spring Cloud Netflix version 2.2.10.RELEASE is now available

_Releases | Olga Maciaszek-Sharma |  November 17, 2021 | 0 Comments_

On behalf of the community, I am pleased to announce that Spring Cloud Netflix version 2.2.10.RELEASE has been released.

This is primarily a security release that fixes the [CVE-2021-22053](https://tanzu.vmware.com/security/cve-2021-22053).

Applications using both `spring-cloud-netflix-hystrix-dashboard` and `spring-boot-starter-thymeleaf` exposed a way to execute code submitted within the request URI path during the resolution of view templates. When a request was made at `/hystrix/monitor;[user-provided-data]`, the path elements following `hystrix/monitor` were being evaluated as SpringEL expressions, which could lead to code execution.

This release fixes the issue.