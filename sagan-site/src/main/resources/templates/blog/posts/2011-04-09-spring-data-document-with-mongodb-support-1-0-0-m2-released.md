---
title: Spring Data Document with MongoDB Support 1.0.0.M2 Released
source: https://spring.io/blog/2011/04/09/spring-data-document-with-mongodb-support-1-0-0-m2-released
scraped: 2026-02-24T08:43:30.935Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  April 09, 2011 | 0 Comments
---

# Spring Data Document with MongoDB Support 1.0.0.M2 Released

_Releases | Thomas Risberg |  April 09, 2011 | 0 Comments_

Dear Spring Community,

I am pleased to announce that the second milestone release of the Spring Data Document 1.0 project with MongoDB support is now available!

The primary goal of the **Spring Data** project is to make it easier to build Spring-powered applications that use new data access technologies such as non-relational databases, map-reduce frameworks, and cloud based data services.

The [Spring Data MongoDB subproject](http://www.springsource.org/spring-data/mongodb) provides integration with the [MongoDB](http://www.mongodb.org) document database.

[Downloads](http://www.springsource.com/download/community?project=Spring%20Data&version=1.0.0.M2) | [JavaDocs](http://static.springsource.org/spring-data/data-document/docs/1.0.0.M2/api/) | [Reference Documentation](http://static.springsource.org/spring-data/data-document/docs/1.0.0.M2/reference/html/) | [Changelog](http://static.springframework.org/spring-data/data-document/docs/1.0.0.M2/changelog.txt)

To learn more about the project, visit the Spring Data [Spring Data MongoDB Page](http://www.springsource.org/spring-data/mongodb).

The changes and new features in Spring Data Document 1.0.0.M2 include:

#### General

-   Spring configuration support using Java based @Configuration classes

#### Core Data Access

-   Persistence and mapping lifecycle events
-   GeoSpatial integration
-   \[DATADOC-76\] - Add support for findAndRemove to MongoTemplate/MongoOperations
-   \[DATADOC-5\] - Provide detailed mapping of Mongo errors onto Spring DAO exception
-   \[DATADOC-51\] - Fixed issue with exceptions thrown when authenticating multiple times for same DB instance

#### Querying

-   \[DATADOC-72\] - Add support for Mongo's $elemMatch and chained Criteria
-   \[DATADOC-77\] - Rename "and" method in Query to "addCritera"
-   \[DATADOC-67\] - Criteria API to support keywords for geo search

#### Mapping

-   Feature Rich Object Mapping integrated with Spring's Conversion Service
-   Annotation based mapping metadata but extensible to support other metadata formats
-   \[DATADOC-60\] - Add namespace support to setup a MappingMongoConverter
-   \[DATADOC-33\] - Introduce annotation to demarcate id field in a domain object

#### Repository

-   \[DATADOC-47, DATACMNS-17\] - Adapted new metamodel API
-   \[DATADOC-46\] - Added support for 'In' and 'NotIn' keyword
-   \[DATADOC-49\] - Fixed 'And' and 'Or' keywords
-   \[DATADOC-41\] - Added support for executing QueryDsl predicates
-   \[DATADOC-69\] - Let repository namespace pickup the default mapping context bean and allow configuration
-   \[DATADOC-24\] - Allow use of @Query annotation to define queries
-   \[DATADOC-34\] - Create indexes for columns that are mentioned in query methods

#### Cross-Store

-   \[DATADOC-48\] - Cross-store persistance - support for JPA Entities with fields transparently persisted/retrieved using MongoDB

#### Logging

-   \[DATADOC-66\] - Log4j log appender

Looking forward to your feedback on the [forum](http://forum.springsource.org/forumdisplay.php?f=80) or in the [issue tracker](https://jira.springsource.org/browse/DATADOC).