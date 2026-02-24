---
title: Spring Data MongoDB 1.0 GA released
source: https://spring.io/blog/2011/12/22/spring-data-mongodb-1-0-ga-released
scraped: 2026-02-24T08:29:18.894Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  December 22, 2011 | 0 Comments
---

# Spring Data MongoDB 1.0 GA released

_Releases | Oliver Drotbohm |  December 22, 2011 | 0 Comments_

Dear Spring Community,

to go on with SpringSource Christmas presents I'd like to announce the availability of Spring Data Mongo 1.0 GA. The release marks the end of a long road to the first step of developing sophisticated data access using a MongoDB datastore. The overall feature set includes:

-   MongoTemplate to simplify performing common Mongo operations, including map-reduce and geo spatial queries
-   Spring namespace to configure MongoDB instances, replica sets and JMX monitoring
-   MongoConverter for domain class mapping and persistence
-   Spring Data repositories support
-   MongoDB Log4j appender
-   Cross-store persistance - support for JPA Entities with fields transparently persisted/retrieved using MongoDB
-   Java based Query, Criteria, and Update DSLs
-   QueryDSL integration

Part of that release is the release of Spring Data Commons 1.2 GA which contains most of the core functionality of the high-level functionality such as entity mapping and repository abstraction. Note that we will remove the Spring Data Document repository from GitHub as we moved it to the Spring Data MongoDB repository in October already.

[Downloads](http://www.springsource.com/download/community?project=Spring%20Data%20Mongo&version=1.0.0.RELEASE) | [JavaDocs](http://static.springsource.org/spring-data/data-mongodb/docs/1.0.0.RELEASE/api/) | [Reference Documentation](http://static.springsource.org/spring-data/data-mongodb/docs/1.0.0.RELEASE/reference/html/) | [Changelog](http://static.springframework.org/spring-data/data-mongodb/docs/1.0.0.RELEASE/changelog.txt)

The release is available from our Maven repository and will be available in Maven Central in a bit. To learn more about the project, visit the Spring Data [MongoDB Page](http://www.springsource.org/spring-data/mongodb). Looking forward to your feedback on the [forum](http://forum.springsource.org/forumdisplay.php?f=80) or in the [issue tracker](https://jira.springsource.org/browse/DATAMONGO).