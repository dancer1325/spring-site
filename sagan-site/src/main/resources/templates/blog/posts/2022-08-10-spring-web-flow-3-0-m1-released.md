---
title: Spring Web Flow 3.0 M1 Released
source: https://spring.io/blog/2022/08/10/spring-web-flow-3-0-m1-released
scraped: 2026-02-23T09:57:40.589Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rossen Stoyanchev |  August 10, 2022 | 2 Comments
---

# Spring Web Flow 3.0 M1 Released

_Engineering | Rossen Stoyanchev |  August 10, 2022 | 2 Comments_

It has been almost 4 years since the last set of Spring Web Flow releases. Nevertheless, the project continues to serve a specific need particularly well, arguably better than alternatives, and remains in active use. While there hasn't been a strong driver for new releases, the upcoming Spring Framework 6 brings a Java 17 baseline and makes the shift to Jakarta EE, which creates the need for such a release in order to enable applications to migrate to this new baseline.

Today I'm pleased to announce the availability of Spring Web Flow 3.0 M1 in the [Spring milestone](https://repo.spring.io/milestone) repository. This release focuses mainly on compatibility with Spring Framework 6 and Jakarta EE. The Travel booking-mvc sample on [spring-projects/spring-webflow-samples](https://github.com/spring-projects/spring-webflow-samples) has been updated and the commit history provides example changes. One significant change is the need to remove Tiles which has not migrated to Jakarta EE. In the sample, Thymeleaf Layouts is used instead.

Note that Spring Faces is not included in the release due to its deep integration with JSF and the additional time and effort required to migrate. Please, reach out if you have experience with Web Flow and JSF and are interested to help out with the migration of Spring Faces to Spring Framework 6 and Jakarta EE.

If you have a Web Flow application and you plan to migrate to Spring Framework 6, please give this milestone a try and provide feedback through the project [issue tracker](https://jira.spring.io/browse/SWF). Special thanks to [Ian Young](https://github.com/iay) and [Scott Cantor](https://github.com/scantor) for their substantial contributions to this release!