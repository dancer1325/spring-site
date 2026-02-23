---
title: Spring for Apache Pulsar 1.2.0-M1 is now available
source: https://spring.io/blog/2024/08/20/spring-for-apache-pulsar-1-2-0-m1-is-now-available
scraped: 2026-02-23T08:21:59.607Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Chris Bono |  August 20, 2024 | 0 Comments
---

# Spring for Apache Pulsar 1.2.0-M1 is now available

_Releases | Chris Bono |  August 20, 2024 | 0 Comments_

On behalf of the team and everyone who has contributed, I’m happy to announce that Spring for Apache Pulsar `1.2.0-M1` has been released and is now available from [https://repo.spring.io/milestone](https://repo.spring.io/milestone).

The release will be included in the upcoming Spring Boot [3.4.0-M2](https://github.com/spring-projects/spring-boot/milestones/3.4.0-M2) release.

This release includes numerous enhancements, documentation improvements, bug fixes, and dependency upgrades.

Notable new features include:

-   **Custom Object Mapper** - you can provide your own Jackson ObjectMapper that Pulsar will use when producing and consuming JSON messages ([more details](https://docs.spring.io/spring-pulsar/docs/1.2.0-M1/reference/reference/custom-object-mapper.html))
    
-   **Default Tenant and Namespace** - you can specify a default tenant and/or namespace to use when producing or consuming messages against a non-fully-qualified topic URL ([more details](https://docs.spring.io/spring-pulsar/docs/1.2.0-M1/reference/reference/default-tenant-namespace.html))
    
-   Updates to next minor version of Spring, Reactor, and Micrometer libraries
    

Please see the [release notes](https://github.com/spring-projects/spring-pulsar/releases/tag/v1.2.0-M1) for more details.