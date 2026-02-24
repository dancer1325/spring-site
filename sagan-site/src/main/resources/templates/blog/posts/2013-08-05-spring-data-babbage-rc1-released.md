---
title: Spring Data Babbage RC1 released
source: https://spring.io/blog/2013/08/05/spring-data-babbage-rc1-released
scraped: 2026-02-24T08:00:47.657Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  August 05, 2013 | 0 Comments
---

# Spring Data Babbage RC1 released

_Releases | Oliver Drotbohm |  August 05, 2013 | 0 Comments_

I am pleased to announce the first and final release candidate of the Babbage episode of the Spring Data release train. I consists of the following modules:

-   Spring Data Commons 1.6 RC1 - [Artifacts](http://repo.springsource.org/libs-milestone/org/springframework/data/spring-data-commons/1.6.0.RC1/) - [JavaDocs](http://static.springsource.org/spring-data/commons/docs/1.6.0.RC1/api/) - [Documentation](http://static.springsource.org/spring-data/commons/docs/1.6.0.RC1/reference/html/) - [Changelog](http://static.springsource.org/spring-data/commons/docs/1.6.0.RC1/changelog.txt)
-   Spring Data JPA 1.4 RC1 - [Artifacts](http://repo.springsource.org/libs-milestone/org/springframework/data/spring-data-jpa/1.4.0.RC1/) - [JavaDocs](http://static.springsource.org/spring-data/jpa/docs/1.4.0.RC1/api/) - [Documentation](http://static.springsource.org/spring-data/jpa/docs/1.4.0.RC1/reference/html/) - [Changelog](http://static.springsource.org/spring-data/jpa/docs/1.4.0.RC1/changelog.txt)
-   Spring Data MongoDB 1.3 RC1 - [Artifacts](http://repo.springsource.org/libs-milestone/org/springframework/data/spring-data-mongodb/1.3.0.RC1/) - [JavaDocs](http://static.springsource.org/spring-data/mongodb/docs/1.3.0.RC1/api/) - [Documentation](http://static.springsource.org/spring-data/mongodb/docs/1.3.0.RC1/reference/html/) - [Changelog](http://static.springsource.org/spring-data/mongodb/docs/1.3.0.RC1/changelog.txt)
-   Spring Data Neo4j 2.3 RC1 - [Artifacts](http://repo.springsource.org/libs-milestone/org/springframework/data/spring-data-neo4j/2.3.0.RC1/) - [JavaDocs](http://static.springsource.org/spring-data/neo4j/docs/2.3.0.RC1/api/) - [Documentation](http://static.springsource.org/spring-data/neo4j/docs/2.3.0.RC1/reference/html/) - [Changelog](http://static.springsource.org/spring-data/neo4j/docs/2.3.0.RC1/changelog.txt)

The release forms a significant milestone towards the GA releases expected around SpringOne this year. We added support for the [MongoDB Aggregation Framework](http://static.springsource.org/spring-data/mongodb/docs/1.3.0.RC1/reference/html/mongo.core.html#mongo.aggregation) and improved the execution of polymorphic queries. On the JPA side of things we introduced support to use SpEL expressions in manually defined queries, improved the handling of entities using `@IdClass` and now allow to define the `Date` binding for repository query parameters using `@TemporalType`. The Neo4j module added support for `countBy()` queries and type safe query execution for repositories. You can find a more detailed list of features at the [wiki page](https://github.com/SpringSource/spring-data-commons/wiki/Release-Train-Babbage) summarizing the Babbage content.

This release is the perfect time to play with the new features and report back your experiences before we turn it to a GA release in a few weeks. We'd be happy to hear your opinions in the [forums](http://forum.springsource.org/forumdisplay.php?27-Data) or in the [bug tracker](jira.springsource.org) in case you run into any issues.

If you want to learn more about Spring Data or the Spring eco-system in general, the upcoming [SpringOne conference](http://www.springone.com/) in Santa Clara, CA is the perfect time and place to be. Checkout the [schedule](http://www.springone2gx.com/conference/santa_clara/2013/09/schedule) and register!