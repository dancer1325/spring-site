---
title: Spring Data JPA 1.1.0 GA released
source: https://spring.io/blog/2012/05/16/spring-data-jpa-1-1-0-ga-released
scraped: 2026-02-24T08:21:56.529Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  May 16, 2012 | 0 Comments
---

# Spring Data JPA 1.1.0 GA released

_Releases | Oliver Drotbohm |  May 16, 2012 | 0 Comments_

Dear Spring Community, I'd like to announce the availability of the GA release of Spring Data 1.1.0. The overall release comes with 72 bugs fixed, improvements and new features. Here are the most important ones:

-   New keywords for query generation: `LessThanEqual`, `GreaterThanEqual`, `Before`, `After`, `StartsWith`, `EndsWith`, `Contains`
-   PersistenceUnitPostProcessor to scan for JPA entities (to be used with Spring versions before 3.1)
-   CDI integration for repositories (see [here](http://static.springsource.org/spring-data/data-jpa/docs/current/reference/html/#jpd.misc.cdi-integration) for details)
-   Support for native queries in `@Query`
-   Support for declarative locking

The [release binaries](http://repo.springsource.org/release/org/springframework/data/spring-data-jpa/1.1.0.RELEASE/) are available via our Artifactory instance at [](http://repo.springsource.org/release)[http://repo.springsource.org](http://repo.springsource.org) and will be available in [Maven Central](http://search.maven.org/#search%7Cga%7C1%7Cspring-data-jpa) in a bit as well.

[Download](http://www.springsource.com/download/community?project=Spring%20Data%20JPA&version=1.1.0.RELEASE) | [JavaDocs](http://static.springsource.org/spring-data/data-jpa/docs/1.1.0.RELEASE/api/) | [Reference documentation (HTML)](http://static.springsource.org/spring-data/data-jpa/docs/1.1.0.RELEASE/reference/html/) | [Reference documentation (PDF)](http://static.springsource.org/spring-data/data-jpa/docs/1.1.0.RELEASE/reference/pdf/spring-data-jpa-reference.pdf) | [Changelog](http://static.springsource.org/spring-data/data-jpa/docs/1.1.0.RELEASE/changelog.txt)

Looking forward to your feedback in the [forums](http://forum.springsource.org/forumdisplay.php?f=27) or the [issuetracker](http://jira.springsource.org/browse/DATAJPA).