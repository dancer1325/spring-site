---
title: Spring Data JDBC Extensions with Oracle Database Support 1.0.0.M1 Released
source: https://spring.io/blog/2011/04/01/spring-data-jdbc-extensions-with-oracle-database-support-1-0-0-m1-released
scraped: 2026-02-24T08:44:02.464Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  April 01, 2011 | 0 Comments
---

# Spring Data JDBC Extensions with Oracle Database Support 1.0.0.M1 Released

_Releases | Thomas Risberg |  April 01, 2011 | 0 Comments_

Dear Spring Community,

We are pleased to announce that the first milestone release (1.0.0.M1) of the Spring Data JDBC Extensions 1.0 project with Oracle Database support is now available!

The new Spring Data JDBC Extensions project was created to provide additional support for vendor specific JDBC extensions. The bulk of the support is made up of code ported from the SpringSource project "Advanced Pack for Oracle Database" that was available for support subscription customers. We are now making this code available to all Spring users and any new developments will be made in the Spring Data JDBC Extensions project.

[Downloads](http://www.springsource.com/download/community?project=Spring%20Data&version=1.0.0.M1) | [JavaDocs](http://static.springsource.org/spring-data/data-jdbc/docs/1.0.0.M1/api/) | [Reference Documentation](http://static.springsource.org/spring-data/data-jdbc/docs/1.0.0.M1/reference/html/) | [Changelog](http://static.springsource.org/spring-data/data-jdbc/docs/1.0.0.M1/changelog.txt)

To learn more about the project, visit the Spring Data [Homepage](http://www.springsource.org/spring-data).

The features in Spring Data JDBC Extensions 1.0.0.M1 include:

**General**-   Ported all current features from SpringSource Advance Pack for Oracle Database v 1.1.0
    -   RAC "Fast Connection Failover"
        
        The RAC "Fast Connection Failover" provides the ability to have a Spring application transparently failover when a database node fails.
        
    -   Streams AQ (Advanced Queueing)
        
        The AQ support provides the option of using a single local transaction manager for both database and message access without resorting to expensive distributed 2-phase commit transaction management.
        
    -   XML Types
        
        Custom classes, examples and documentation on how to use Oracle JDBC extensions for their native XML Type.
        
    -   Advanced Data Types
        
        Custom classes, examples and documentation on how to use Oracle JDBC extensions for their advanced data types like STRUCT and ARRAY.
        
    -   Custom DataSource Connection Preparer
        
        This feature provides an API for customizing the connection environment with Oracle specific session settings etc.
        
**Streams AQ**-   DATAJDBC-4 added an attribute to specify 'connection-factory-type' for entries

Looking forward to your feedback on the [forum](http://forum.springsource.org/forumdisplay.php?f=27) or in the [issue tracker](https://jira.springsource.org/browse/DATAJDBC).