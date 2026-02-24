---
title: Spring Data MongoDB 1.0.0 M4 released
source: https://spring.io/blog/2011/09/02/spring-data-mongodb-1-0-0-m4-released
scraped: 2026-02-24T08:35:20.690Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Oliver Drotbohm |  September 02, 2011 | 0 Comments
---

# Spring Data MongoDB 1.0.0 M4 released

_News | Oliver Drotbohm |  September 02, 2011 | 0 Comments_

Dear Spring Community,

I am pleased to announce the availability of Spring Data MongoDB 1.0.0 M4. Here are the most important features added:

-   Support for map-reduce operations in MongoTemplate
-   Provided means to use externalized queries to be executed by repositories
-   Support for geoNear queries on MongoTemplate and the repositories
-   New DocumentCallbackHandler interface on MongoTemplate
-   A DB wide WriteConcern can now be configured on the SimpleDbFactory
-   A WriteConcern configurable on MongoFactoryBean
-   Added a QuerydslRepositorySupport base class to ease implementing Querydsl based repositories
-   Configurable TypeMapper interface to control how type information is written and retrieved to and from Mongo documents

Beyond that we ship a ton of bug fixes and improvements mostly around the mapping subsystem and performance. For a detailed list of tickets fixed have a look at the [changelog](http://static.springframework.org/spring-data/data-document/docs/1.0.0.M4/changelog.txt).

[Downloads](http://www.springsource.com/download/community?project=Spring%20Data%20Mongo&version=1.0.0.M4) | [JavaDocs](http://static.springsource.org/spring-data/data-document/docs/1.0.0.M4/api/) | [Reference Documentation](http://static.springsource.org/spring-data/data-document/docs/1.0.0.M4/reference/html/) | [Changelog](http://static.springframework.org/spring-data/data-document/docs/1.0.0.M4/changelog.txt)

To learn more about the project, visit the Spring Data [MongoDB Page](http://www.springsource.org/spring-data/mongodb). Looking forward to your feedback on the [forum](http://forum.springsource.org/forumdisplay.php?f=80) or in the [issue tracker](https://jira.springsource.org/browse/DATADOC).