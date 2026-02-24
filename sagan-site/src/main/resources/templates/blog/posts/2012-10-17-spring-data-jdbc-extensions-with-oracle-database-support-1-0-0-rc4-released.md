---
title: Spring Data JDBC Extensions with Oracle Database Support 1.0.0.RC4 Released
source: https://spring.io/blog/2012/10/17/spring-data-jdbc-extensions-with-oracle-database-support-1-0-0-rc4-released
scraped: 2026-02-24T08:15:14.910Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  October 17, 2012 | 0 Comments
---

# Spring Data JDBC Extensions with Oracle Database Support 1.0.0.RC4 Released

_Releases | Thomas Risberg |  October 17, 2012 | 0 Comments_

Dear Spring Community,

We are pleased to announce that the fourth and last release candidate (1.0.0.RC4) of the Spring Data JDBC Extensions 1.0 project with Oracle Database support is now available!

The new Spring Data JDBC Extensions project was created to provide additional support for vendor specific JDBC extensions as well as new approaches to working with JDBC like QueryDSL. The bulk of the support is made up of code ported from the SpringSource project "Advanced Pack for Oracle Database" that was available for support subscription customers. We are now making this code available to all Spring users and any new developments will be made in the Spring Data JDBC Extensions project.

To learn more about the project, visit the Spring Data JDBC Extensions [Homepage](http://www.springsource.org/spring-data/jdbc-extensions).

The most important changes for the four release candidates are:

General

-   Changed build to use Gradle
-   Added documentation chapter for QueryDSL SQL module

Core

-   Adding One-to-Many ResultSetExtractor implementation
-   Adding exception translation to QueryDslJdbcTemplate

Oracle

-   Parameterizing classes used for mapping of advanced data types
-   Adding support for mapping ARRAYs of STRUCTs in addition to scalar values

Looking forward to your feedback on the [forum](http://forum.springsource.org/forumdisplay.php?f=27) or in the [issue tracker](https://jira.springsource.org/browse/DATAJDBC).

[Downloads](http://www.springsource.com/download/community?project=Spring%20Data%20JDBC) | [JavaDocs](http://static.springsource.org/spring-data/data-jdbc/docs/1.0.0.RC4/api/) | [Reference Documentation](http://static.springsource.org/spring-data/data-jdbc/docs/1.0.0.RC4/reference/html/) | [Changelog](http://static.springsource.org/spring-data/data-jdbc/docs/1.0.0.RC4/changelog.txt)