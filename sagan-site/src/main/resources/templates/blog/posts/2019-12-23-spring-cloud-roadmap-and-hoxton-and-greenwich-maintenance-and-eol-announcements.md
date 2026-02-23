---
title: Spring Cloud Roadmap and Hoxton and Greenwich Maintenance and EOL Announcements
source: https://spring.io/blog/2019/12/23/spring-cloud-roadmap-and-hoxton-and-greenwich-maintenance-and-eol-announcements
scraped: 2026-02-23T14:16:59.736Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  December 23, 2019 | 0 Comments
---

# Spring Cloud Roadmap and Hoxton and Greenwich Maintenance and EOL Announcements

_Releases | Spencer Gibb |  December 23, 2019 | 0 Comments_

With the recent [Spring Framework](https://spring.io/blog/2019/12/03/spring-framework-maintenance-roadmap-in-2020-including-4-3-eol) and [Spring Boot](https://spring.io/blog/2019/12/10/spring-boot-2-1-x-eol-november-1st-2020) maintenance and roadmap posts, the Spring Cloud team is taking the opportunity to provide some insight to our future roadmap as well as the lifetimes of the Greenwich and Hoxton release trains.

## [](#spring-cloud-ilford)Spring Cloud Ilford

We would like to announce our next major release, Spring Cloud Ilford. This will be the first major release since the release of Spring Cloud Finchley, which provided support for Spring Boot 2.x and Spring Framework 5.x. By making Ilford a major release, it will allow us to remove modules that have entered [maintenance mode](https://spring.io/blog/2018/12/12/spring-cloud-greenwich-rc1-available-now#spring-cloud-netflix-projects-entering-maintenance-mode) and to complete the simplification of the release train [announced earlier this year](https://spring.io/blog/2019/07/24/simplifying-the-spring-cloud-release-train). It will also allow us to do some API refactoring that may introduce breaking changes.

Ilford will be released following Spring Framework 5.3 and Spring Boot 2.4 sometime in Q4 2020.

## [](#spring-cloud-hoxton)Spring Cloud Hoxton

According to the [Pivotal Open Source Support Policy](https://pivotal.io/support/oss), major releases are supported for a period of three years. Finchley was first released in June 2018. Therefore, Hoxton, a minor release of the Finchley release train, will be supported until the end of June 2021 with regular releases. Starting in July 2021 Hoxton will enter a special maintenance period where only critical bug fixes and security patches will be released until the end of December 2021.

This will allow a full year of overlap between major versions.

Spring Boot 2.3.x, scheduled for release in Q2 2020, will be supported by a Hoxton Service Release soon after the Spring Boot release.

## [](#spring-cloud-greenwich)Spring Cloud Greenwich

Greenwich, a minor release of the Finchley release train, was released in January 2019. Its last regular Service Release will be in Jan 2020. After that, it will enter a special maintenance period where only critical bug fixes and security patches will be released until the end of December 2020. This will be the last release train to support Spring Boot 2.1.x.

Please see the [release train milestones](https://github.com/spring-cloud/spring-cloud-release/milestones?direction=asc&sort=due_date&state=open) to track future releases and the new [Supported Versions](https://github.com/spring-cloud/spring-cloud-release/wiki/Supported-Versions) page to see version lifetime.