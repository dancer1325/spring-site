---
title: News for Spring Data JDBC Extensions Project
source: https://spring.io/blog/2015/11/25/news-for-spring-data-jdbc-extensions-project
scraped: 2026-02-23T19:34:54.036Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  November 25, 2015 | 1 Comment
---

# News for Spring Data JDBC Extensions Project

_Releases | Thomas Risberg |  November 25, 2015 | 1 Comment_

We are pleased to announce the 1.2 release of the Spring Data JDBC Extensions project. This release updates the Querydsl dependency to 3.6.9 and adds an option to retrieve `SearchResults` using the `QueryDslTemplate`. See [changelog for 1.2.1.RELEASE](http://docs.spring.io/spring-data/jdbc/docs/1.2.1.RELEASE/changelog.txt).

We are also pleased to announce the first milestone of the 2.0 version of the Spring Data JDBC Extensions project. The big changes for this release are:

-   change to building with Java 7 or later
-   upgrading the Oracle JDBC to version 12.1.0.2
-   updating any dependencies to follow Spring IO Platform 2.0 including Spring Framework 4.2
-   removing the Querydsl SQL support in this version (see below)

The upgrade to use the Oracle JDBC driver version 12.1.0.2 allows us to change our code to support deprecations and new features available in this version. You can still use older database versions compatible with this driver including Oracle Database 12c R1, 11g R2 and 11g R1.

See [changelog for 2.0.0.M1](http://docs.spring.io/spring-data/jdbc/docs/2.0.0.M1/changelog.txt).

## [](#querydsl-support)Querydsl support

The Querydsl project has been undergoing some changes for their 4.0 version with a change of Maven group id, package names and also some API changes. This means that as of Querydsl version 4.0.0 the existing Spring Data JDBC Extension code that integrates with Querydsl no longer works.

We don't plan to port our Querydsl SQL support to the new Querydsl version 4.0 or later. Instead we encourage users developing new projects to use the Querydsl SQL APIs directly and to use the integration with Spring that is available in the Querydsl project's `querydsl-sql-spring` sub-project. This means that we are removing the Querydsl SQL support from the new Spring Data JDBC Extensions 2.x version.

For the 1.x version of Spring Data JDBC Extensions we will continue to use the latest available version of the Querydsl 3.x release series. We are also marking the Querydsl SQL support as deprecated to indicate that it will not be available in version 2.0 of Spring Data JDBC Extensions.

For more project specific information please see the [project page](http://projects.spring.io/spring-data-jdbc-ext/).