---
title: Spring Data MongoDB 1.0.0.RC1 Released
source: https://spring.io/blog/2011/12/07/spring-data-mongodb-1-0-0-rc1-released
scraped: 2026-02-24T08:31:09.452Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  December 07, 2011 | 0 Comments
---

# Spring Data MongoDB 1.0.0.RC1 Released

_Releases | Mark Pollack |  December 07, 2011 | 0 Comments_

Dear Spring Community,

I am pleased to announce that Spring Data MongoDB 1.0 RC1 is now available!

The primary goal of the [Spring Data project](http://www.springsource.org/spring-data/) is to provide a familiar and consistent Spring-based programming model for new datastores while retaining store-specific features and capabilities. The [Spring Data MongoDB project](http://www.springsource.org/spring-data/mongodb) provides integration with the [MongoDB](http://www.mongodb.org) document database. Key functional areas are a POJO centric model for interacting with a MongoDB DBCollection and easily writing a [Repository style](http://static.springsource.org/spring-data/data-mongo/docs/current/reference/html/#mongo.repositories) data access layer.

This is primarily a bug fix release as we move quickly to GA but a few notable improvements and new features were added:

-   Provide additional options for setting WriteConcern on a per operation basis
-   Support geting index information on a collection or mapped class.
-   Add support for findAndModify and upsert operations
-   Allow type converters to be included through classpath scanning
-   Update to use [Spring Data Commons 1.2.0.RC1](http://static.springsource.org/spring-data/data-commons/docs/1.2.0.RC1/changelog.txt)

For a detailed list of issues fixed have a look at the changelog.

[Downloads](http://www.springsource.com/download/community?project=Spring%20Data%20Mongo&version=1.0.0.RC1) | [JavaDocs](http://static.springsource.org/spring-data/data-mongo/docs/1.0.0.RC1/api/) | [Reference Documentation](http://static.springsource.org/spring-data/data-mongo/docs/1.0.0.RC1/reference/html/) | [Changelog](http://static.springsource.org/spring-data/data-mongo/docs/1.0.0.RC1/changelog.txt)

To learn more about the project, visit the [Spring Data MongoDB Page](http://www.springsource.org/spring-data/mongodb).

Looking forward to your feedback on the [forum](http://forum.springsource.org/forumdisplay.php?f=80) or in the [issue tracker](https://jira.springsource.org/browse/DATAMONGO).