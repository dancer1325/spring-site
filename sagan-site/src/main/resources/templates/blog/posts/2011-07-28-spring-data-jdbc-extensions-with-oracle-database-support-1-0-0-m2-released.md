---
title: Spring Data JDBC Extensions with Oracle Database Support 1.0.0.M2 Released
source: https://spring.io/blog/2011/07/28/spring-data-jdbc-extensions-with-oracle-database-support-1-0-0-m2-released
scraped: 2026-02-24T08:37:40.005Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  July 28, 2011 | 0 Comments
---

# Spring Data JDBC Extensions with Oracle Database Support 1.0.0.M2 Released

_Releases | Thomas Risberg |  July 28, 2011 | 0 Comments_

Dear Spring Community,

We are pleased to announce that the second milestone release (1.0.0.M2) of the Spring Data JDBC Extensions 1.0 project with Oracle Database support is now available!

The new Spring Data JDBC Extensions project was created to provide additional support for vendor specific JDBC extensions as well as new approaches to working with JDBC like QueryDSL. The bulk of the support is made up of code ported from the SpringSource project "Advanced Pack for Oracle Database" that was available for support subscription customers. We are now making this code available to all Spring users and any new developments will be made in the Spring Data JDBC Extensions project.

[Downloads](http://www.springsource.com/download/community?project=Spring%20Data%20JDBC) | [JavaDocs](http://static.springsource.org/spring-data/data-jdbc/docs/1.0.0.M2/api/) | [Reference Documentation](http://static.springsource.org/spring-data/data-jdbc/docs/1.0.0.M2/reference/html/) | [Changelog](http://static.springsource.org/spring-data/data-jdbc/docs/1.0.0.M2/changelog.txt)

To learn more about the project, visit the Spring Data JDBC Extensions [Homepage](http://www.springsource.org/spring-data/jdbc-extensions).

The new features in Spring Data JDBC Extensions 1.0.0.M2 include:

**Core**-   Added support for QueryDSL SQL module
    -   QueryDslJdbcTemplate
        
        Provides implementations for a basic set of JDBC operations allowing the use of QueryDSL features for these operations.
        
    -   SqlInsertCallback
        
        This callback allows for inserting rows via the QueryDSL SQLInsertClause.
        
    -   SqlInsertWithKeyCallback
        
        This callback allows for inserting rows via the QueryDSL SQLInsertClause and returning the generated key.
        
    -   SqlUpdateCallback
        
        This callback allows for updating rows via the QueryDSL SQLUpdateClause.
        
    -   SqlDeleteCallback
        
        This callback allows for deleting rows via the QueryDSL SQLDeleteClause.
        
**Streams AQ**-   DATAJDBC-8 Fixed a potential JDBC connection leak on third-party JDBC pool when using Oracle AQ in combination with DefaultMessageListenerContainer and sharing of the connection from a local JDBC transaction.

Looking forward to your feedback on the [forum](http://forum.springsource.org/forumdisplay.php?f=27) or in the [issue tracker](https://jira.springsource.org/browse/DATAJDBC).