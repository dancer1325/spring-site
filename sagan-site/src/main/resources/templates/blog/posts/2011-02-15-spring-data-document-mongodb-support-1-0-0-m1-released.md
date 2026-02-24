---
title: Spring Data Document - MongoDB Support 1.0.0.M1 Released
source: https://spring.io/blog/2011/02/15/spring-data-document-mongodb-support-1-0-0-m1-released
scraped: 2026-02-24T08:46:17.326Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  February 15, 2011 | 0 Comments
---

# Spring Data Document - MongoDB Support 1.0.0.M1 Released

_Releases | Thomas Risberg |  February 15, 2011 | 0 Comments_

Dear Spring Community,

I am pleased to announce that the very first milestone release of the Spring Data Document 1.0 project with MongoDB support is now available!

The primary goal of the **Spring Data** project is to make it easier to build Spring-powered applications that use new data access technologies such as non-relational databases, map-reduce frameworks, and cloud based data services.

The MongoDB module provides integration with the [MongoDB](http://www.mongodb.org) document database.

[Downloads](http://www.springsource.com/download/community?project=Spring%20Data&version=1.0.0.M1) | [JavaDocs](http://static.springsource.org/spring-data/data-document/docs/1.0.0.M1/api/) | [Reference Documentation](http://static.springsource.org/spring-data/data-document/docs/1.0.0.M1/reference/html/) | [Changelog](http://static.springframework.org/spring-data/data-document/docs/1.0.0.M1/changelog.txt)

To learn more about the project, visit the Spring Data [Homepage](http://www.springsource.org/spring-data).

The features in Spring Data Document 1.0.0.M1 include:

#### General

-   BeanFactory for basic configuration of Mongo environment
-   Namespace for basic configuration of Mongo environment

#### Core Data Access

-   Introduce MongoTemplate implementation with methods defined in MongoOperations interface
-   MongoTemplate support for insert, find, save, update, remove
-   MongoTemplate support for basic POJO serialization based on bean properties
-   Allow MongoTemplate methods to use a default collection name
-   Exception translation in MongoTemplate to Spring's DAO exception hierarchy
-   Support for update modifiers to allow for partial document updates
-   Expose WriteConcern settings on MongoTemplate used for any write operations
-   Support in MongoTemplate for enabling either logging or throwing exceptions based on value of WriteResult return value.

#### Repository

-   Introducing generic repository implementation for MongoDB
-   Automatic implementation of interface query method names on repositories.
-   Namespace support for Mongo repositories
-   Allow usage of pagination and sorting with repositories

Looking forward to your feedback on the [forum](http://forum.springsource.org/forumdisplay.php?f=80) or in the [issue tracker](https://jira.springsource.org/browse/DATADOC).