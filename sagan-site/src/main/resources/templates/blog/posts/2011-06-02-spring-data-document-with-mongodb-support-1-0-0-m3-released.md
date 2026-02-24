---
title: Spring Data Document with MongoDB Support 1.0.0.M3 Released
source: https://spring.io/blog/2011/06/02/spring-data-document-with-mongodb-support-1-0-0-m3-released
scraped: 2026-02-24T08:40:46.590Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  June 02, 2011 | 0 Comments
---

# Spring Data Document with MongoDB Support 1.0.0.M3 Released

_Releases | Thomas Risberg |  June 02, 2011 | 0 Comments_

Dear Spring Community,

I am pleased to announce that the Milestone 3 release of the Spring Data Document 1.0 project with MongoDB support is now available! The primary goal of the **Spring Data** project is to make it easier to build Spring-powered applications that use new data access technologies such as non-relational databases, map-reduce frameworks, and cloud based data services.

The MongoDB module provides integration with the [MongoDB](http://www.mongodb.org) document database.

[Downloads](http://www.springsource.com/download/community?project=Spring%20Data%20Mongo&version=1.0.0.M3) | [JavaDocs](http://static.springsource.org/spring-data/data-document/docs/1.0.0.M3/api/) | [Reference Documentation](http://static.springsource.org/spring-data/data-document/docs/1.0.0.M3/reference/html/) | [Changelog](http://static.springframework.org/spring-data/data-document/docs/1.0.0.M3/changelog.txt)

To learn more about the project, visit the Spring Data [MongoDB Page](http://www.springsource.org/spring-data/mongodb).

The changes and new features in Spring Data Document 1.0.0.M3 includes much improved mapping and conversion support. The MappingMongoConverter is now the default converter used by the MongoTemplate and the SimpleMongoConverter has been deprecated and will be removed. The concept of a default collection name has also been removed and all operations of the MongoTemplate are based on the collection name used for the entity class that is the target of the operation. The collection name used for an entity class defaults to the clasname starting with a lower-case letter but it can be customized using the @Document annotation. See the [changelog](http://static.springframework.org/spring-data/data-document/docs/1.0.0.M3/changelog.txt) for more details.

Looking forward to your feedback on the [forum](http://forum.springsource.org/forumdisplay.php?f=80) or in the [issue tracker](https://jira.springsource.org/browse/DATADOC).