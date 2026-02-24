---
title: Spring Data JPA 1.1.0 RC1 and 1.0.3 GA released
source: https://spring.io/blog/2012/02/09/spring-data-jpa-1-1-0-rc1-and-1-0-3-ga-released
scraped: 2026-02-24T08:27:04.621Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  February 09, 2012 | 0 Comments
---

# Spring Data JPA 1.1.0 RC1 and 1.0.3 GA released

_Releases | Oliver Drotbohm |  February 09, 2012 | 0 Comments_

Dear Spring Community,

I am happy to announce the release of Spring Data JPA 1.1.0 RC1 as well as 1.0.3 GA. The release candidate includes a ton of new features and a variety of bug fixes. Here's a brief list of the most important ones:

-   Support for locking
-   Support for @IdClass in entities
-   Support for LessThanEqual and GreaterThanEquals, True/False keywords in query methods
-   Added CDI integration for repositories
-   Improved parameter binding for derived queries for null values

The CDI integration was contributed by [Dirk Mahler](https://github.com/DirkMahler) of [Buschmais](http://www.buschmais.de) to a large degree. For a full list of changes see the [changelog](http://static.springframework.org/spring-data/data-jpa/docs/1.1.0.RC1/changelog.txt). Quite a few of the bugs fixed were back ported so we definitely recommend to upgrade to 1.0.3 as well as playing with the release candidate to help improving the final release. The 1.0.3 GA release can be obtained from Maven central while the release candidate is available via our milestone repository at [](http://repo.springsource.org/libs-milestone)[http://repo.springsource.org/libs-milestone](http://repo.springsource.org/libs-milestone).

**1.0.3.RELEASE** - [Maven artifacts](http://search.maven.org/#search%7Cga%7C1%7Cspring-data-jpa) | [JavaDocs](http://static.springsource.org/spring-data/data-jpa/docs/1.0.3.RELEASE/api/) | [Reference Documentation](http://static.springsource.org/spring-data/data-jpa/docs/1.0.3.RELEASE/reference/html/) | [Changelog](http://static.springframework.org/spring-data/data-jpa/docs/1.0.3.RELEASE/changelog.txt)

**1.1.0.RC1** - [Maven artifacts](http://repo.springsource.org/libs-milestone/org/springframework/data/spring-data-jpa/1.1.0.RC1) | [JavaDocs](http://static.springsource.org/spring-data/data-jpa/docs/1.1.0.RC1/api/) | [Reference Documentation](http://static.springsource.org/spring-data/data-jpa/docs/1.1.0.RC1/reference/html/) | [Changelog](http://static.springframework.org/spring-data/data-jpa/docs/1.1.0.RC1/changelog.txt)