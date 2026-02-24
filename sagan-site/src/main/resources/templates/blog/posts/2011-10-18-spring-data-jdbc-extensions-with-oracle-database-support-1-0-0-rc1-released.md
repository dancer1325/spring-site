---
title: Spring Data JDBC Extensions with Oracle Database Support 1.0.0.RC1 Released
source: https://spring.io/blog/2011/10/18/spring-data-jdbc-extensions-with-oracle-database-support-1-0-0-rc1-released
scraped: 2026-02-24T08:33:43.933Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  October 18, 2011 | 0 Comments
---

# Spring Data JDBC Extensions with Oracle Database Support 1.0.0.RC1 Released

_Releases | Thomas Risberg |  October 18, 2011 | 0 Comments_

Dear Spring Community, We are pleased to announce that the release candidate (1.0.0.RC1) of the Spring Data JDBC Extensions 1.0 project with Oracle Database support is now available!

The new Spring Data JDBC Extensions project was created to provide additional support for vendor specific JDBC extensions as well as new approaches to working with JDBC like QueryDSL. The bulk of the support is made up of code ported from the SpringSource project "Advanced Pack for Oracle Database" that was available for support subscription customers. We are now making this code available to all Spring users and any new developments will be made in the Spring Data JDBC Extensions project.

[Downloads](http://www.springsource.com/download/community?project=Spring%20Data%20JDBC) | [JavaDocs](http://static.springsource.org/spring-data/data-jdbc/docs/1.0.0.RC1/api/) | [Reference Documentation](http://static.springsource.org/spring-data/data-jdbc/docs/1.0.0.RC1/reference/html/) | [Changelog](http://static.springsource.org/spring-data/data-jdbc/docs/1.0.0.RC1/changelog.txt)

To learn more about the project, visit the Spring Data JDBC Extensions [Homepage](http://www.springsource.org/spring-data/jdbc-extensions).

The improvements in Spring Data JDBC Extensions 1.0.0.RC1 include:

-   Added documentation chapter for QueryDSL SQL module
-   Added OSGi manifests
-   Fixed slf4j/log4j and other dependencies

I'd like to thank Andrei Stefan for the JPetStore re-write using the QueryDSL support and SQLFire. It provides a good example for using the QueryDslJdbcTemplate in a project - see [https://github.com/SpringSource/spring-sqlfire-samples](https://github.com/SpringSource/spring-sqlfire-samples).

Looking forward to your feedback on the [forum](http://forum.springsource.org/forumdisplay.php?f=27) or in the [issue tracker](https://jira.springsource.org/browse/DATAJDBC).