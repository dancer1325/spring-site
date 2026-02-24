---
title: Spring Data JPA 1.0.2 released
source: https://spring.io/blog/2011/12/06/spring-data-jpa-1-0-2-released
scraped: 2026-02-24T08:31:18.654Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  December 06, 2011 | 0 Comments
---

# Spring Data JPA 1.0.2 released

_Releases | Oliver Drotbohm |  December 06, 2011 | 0 Comments_

Dear Spring Community,

I'd like to announce the release of Spring Data JPA 1.0.2.RELEASE. The release includes the following improvements and fixes:

-   Fixed query creation for Comparable values (DATAJPA-99)
-   Fixed alias detection when entity name contained number (DATAJPA-110)
-   SimpleJpaRepository's deleteAll() does not call em.clear() anymore (DATAJPA-111)
-   Upgraded to Querydsl 2.2.5 (DATAJPA-102, DATAJPA-115)
-   Fixed auditor mappings in AbstractAuditable (DATAJPA-120)
-   Consolidate Expression creation for property references and sort orders (DATAJPA-103)
-   Fixed dependency injection in QueryDslRepositorySupport (DATAJPA-113)

[Downloads](http://www.springsource.com/download/community?project=Spring%20Data%20JPA&version=1.0.2.RELEASE) | [JavaDocs](http://static.springsource.org/spring-data/data-jpa/docs/1.0.2.RELEASE/api/) | [Reference Documentation](http://static.springsource.org/spring-data/data-jpa/docs/1.0.2.RELEASE/reference/html/) | [Changelog](http://static.springframework.org/spring-data/data-jpa/docs/1.0.2.RELEASE/changelog.txt)

To learn more about the project, visit the Spring Data [JPA Page](http://www.springsource.org/spring-data/jpa). Looking forward to your feedback on the [forum](http://forum.springsource.org/forumdisplay.php?f=80) or in the [issue tracker](https://jira.springsource.org/browse/DATAJPA).