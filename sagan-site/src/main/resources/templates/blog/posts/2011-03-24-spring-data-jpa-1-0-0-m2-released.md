---
title: Spring Data JPA 1.0.0.M2 released
source: https://spring.io/blog/2011/03/24/spring-data-jpa-1-0-0-m2-released
scraped: 2026-02-24T08:44:24.532Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  March 24, 2011 | 0 Comments
---

# Spring Data JPA 1.0.0.M2 released

_Releases | Oliver Drotbohm |  March 24, 2011 | 0 Comments_

Dear Spring Community,

we are pleased to announce that the second milestone release of the Spring Data JPA project is now available! The release includes:

-   Support for [Querydsl](http://www.querydsl.com) predicates and thus type-safe JPA queries
-   Validation of @Query annotated queries at bootstrap time
-   Support for XML based entity mapping
-   Support for Distinct, In and NotIn keywords in query methods
-   Ported Hades extensions into Spring Data Commons core
-   Various bugfixes.

<dependency>
    <groupId>org.springframework.data</groupId>
    <artifactId>spring-data-jpa</artifactId>
    <version>1.0.0.M2</version>
</dependency>

<repository>
    <id>org.springframework.maven.milestone</id>
    <name>Spring Maven Milestone Repository</name>
    <url>http://maven.springframework.org/milestone</url>
</repository>

[Download](http://www.springsource.com/download/community?project=Spring%20Data&version=1.0.0.M2) | [JavaDocs](http://static.springsource.org/spring-data/data-jpa/docs/1.0.0.M2/api/) | [Reference documentation (HTML)](http://static.springsource.org/spring-data/data-jpa/docs/1.0.0.M2/reference/html/) | [Reference documentation (PDF)](http://static.springsource.org/spring-data/data-jpa/docs/1.0.0.M2/reference/pdf/spring-data-jpa-reference.pdf) | [Changelog](http://static.springsource.org/spring-data/data-jpa/docs/1.0.0.M2/changelog.txt)

Looking forward to your feedback in the [forums](http://forum.springsource.org/forumdisplay.php?f=27) or the [issuetracker](http://jira.springsource.org/browse/DATAJPA).