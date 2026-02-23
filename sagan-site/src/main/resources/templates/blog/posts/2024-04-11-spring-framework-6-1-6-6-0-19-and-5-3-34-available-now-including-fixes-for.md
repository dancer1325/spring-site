---
title: Spring Framework 6.1.6, 6.0.19 and 5.3.34 Available Now Including Fixes for CVE-2024-22262
source: https://spring.io/blog/2024/04/11/spring-framework-6-1-6-6-0-19-and-5-3-34-available-now-including-fixes-for
scraped: 2026-02-23T08:47:05.712Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  April 11, 2024 | 2 Comments
---

# Spring Framework 6.1.6, 6.0.19 and 5.3.34 Available Now Including Fixes for CVE-2024-22262

_Releases | Brian Clozel |  April 11, 2024 | 2 Comments_

On behalf of the team and everyone who has contributed, I am pleased to announce that Spring Framework `6.1.6`, `6.0.19` and `5.3.34` are available now:

-   Spring Framework `6.1.6` ships with [41 fixes and documentation improvements](https://github.com/spring-projects/spring-framework/releases/tag/v6.1.6). This version will be shipped with [Spring Boot 3.2.5](https://github.com/spring-projects/spring-boot/milestone/340), to be released next week.
-   Spring Framework `6.0.19` ships with [14 fixes and documentation improvements](https://github.com/spring-projects/spring-framework/releases/tag/v6.0.19). This version will be shipped with [Spring Boot 3.1.11](https://github.com/spring-projects/spring-boot/milestone/339), to be released next week.
-   Spring Framework `5.3.34` ships with [10 fixes and documentation improvements](https://github.com/spring-projects/spring-framework/releases/tag/v5.3.34).

The releases address [CVE-2024-22262](https://spring.io/security/cve-2024-22262) for "URL Parsing with Host Validation (3rd report)". Important CVEs on popular projects, like the original [CVE-2024-22243](https://spring.io/security/cve-2024-22243), often get attention from the security community. We received many reports and helpful feedback about new attack variants over the last weeks. The security of Spring applications is our priority and we will keep addressing vulnerabilities in a transparent and timely fashion.

We are [actively working on a new approach](https://github.com/spring-projects/spring-framework/issues/32513) that will completely revisit the implementation.

## [](#upgrading-your-project)Upgrading your project

Commercial customers using Spring Boot 2.7 or 3.0 can make use of Spring Boot Hotfix releases 2.7.20.3 and 3.0.15.3. Releases are available now on the Spring commercial artifact repository and can be accessed with a [Spring Enterprise Subscription](https://spring.vmware.com).

Commercial customers and OSS users of Spring Boot 3.1 and 3.2 should manually upgrade to Spring Framework 6.0.19 and 6.1.6 now, and to Spring Boot 3.1.11 and 3.2.5 next week when those become available.

[Project Page](https://spring.io/projects/spring-framework/) | [GitHub](https://github.com/spring-projects/spring-framework) | [Issues](https://github.com/spring-projects/spring-framework/issues) | [Documentation](https://docs.spring.io/spring-framework/reference/)