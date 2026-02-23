---
title: Spring Data Release Train Ingalls M1 Released
source: https://spring.io/blog/2016/07/27/spring-data-release-train-ingalls-m1-released
scraped: 2026-02-23T19:08:42.181Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  July 27, 2016 | 5 Comments
---

# Spring Data Release Train Ingalls M1 Released

_Releases | Mark Paluch |  July 27, 2016 | 5 Comments_

On behalf of the Spring Data team, I’m happy to announce the first milestone of the [Ingalls](https://en.wikipedia.org/wiki/Daniel_Henry_Holmes_Ingalls,_Jr.) release train. The release ships [230 tickets](https://jira.spring.io/issues/?filter=15383) fixed! The most noteworthy new features are:

-   Use of method handles for property access in conversion subsystem (Commons, MongoDB).
-   Upgrade to Cassandra 3.0 for Spring Data Cassandra (see the [updated examples](https://github.com/spring-projects/spring-data-examples/tree/master/cassandra) for details).
-   Support for declarative query methods for Cassandra repositories.
-   Support for Redis geo commands.
-   Any-match mode for query-by-example.
-   Support for XML and JSON based projections for REST payloads (see the [example](https://github.com/spring-projects/spring-data-examples/tree/master/web/projection) for details)

Find a curated change log in our [release train wiki](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Ingalls) or skim through a [full list of changes in JIRA](https://jira.spring.io/issues/?filter=15383).

The easiest way to play with the milestone is declaring the `spring-data-releasetrain.version` property to `Ingalls-M1` in your Spring Boot application. If you’re using Spring Data REST, make sure to set the `spring-hateoas.version` property to `0.21.0.M1`. Spring Data Redis users need to upgrade to Jedis 2.9.0 (Boot users set the `jedis.version` property accordingly). If you are a Spring Data Cassandra user, you need to upgrade to the Cassandra driver to 3.0.x (Boot users set the `cassandra-driver.version` property accordingly). Also, please check out our updated [Spring Data Examples](https://github.com/spring-projects/spring-data-examples) for more samples on integrating the particular components.

To sum things up, here's the list of modules included in the release:

-   Spring Data Commons 1.13 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-commons/1.13.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/commons/docs/1.13.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/commons/docs/1.13.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/commons/docs/1.13.0.M1/changelog.txt)
-   Spring Data JPA 1.11 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jpa/1.11.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/jpa/docs/1.11.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/jpa/docs/1.11.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/jpa/docs/1.11.0.M1/changelog.txt)
-   Spring Data KeyValue 1.2 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-keyvalue/1.2.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/keyvalue/docs/1.2.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/keyvalue/docs/1.2.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/keyvalue/docs/1.2.0.M1/changelog.txt)
-   Spring Data Cassandra 1.5 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-cassandra/1.5.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/cassandra/docs/1.5.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/cassandra/docs/1.5.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/cassandra/docs/1.5.0.M1/changelog.txt)
-   Spring Data Solr 2.1 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-solr/2.1.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/solr/docs/2.1.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/solr/docs/2.1.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/solr/docs/2.1.0.M1/changelog.txt)
-   Spring Data Gemfire 1.9 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-gemfire/1.9.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/gemfire/docs/1.9.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/gemfire/docs/1.9.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/gemfire/docs/1.9.0.M1/changelog.txt)
-   Spring Data Neo4j 4.2 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-neo4j/4.2.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/neo4j/docs/4.2.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/neo4j/docs/4.2.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/neo4j/docs/4.2.0.M1/changelog.txt)
-   Spring Data MongoDB 1.10 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-mongodb/1.10.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/mongodb/docs/1.10.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/mongodb/docs/1.10.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/mongodb/docs/1.10.0.M1/changelog.txt)
-   Spring Data Envers 1.1 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-envers/1.1.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/envers/docs/1.1.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/envers/docs/1.1.0.M1/reference/html)
-   Spring Data REST 2.6 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-rest-webmvc/2.6.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/rest/docs/2.6.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/rest/docs/2.6.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/rest/docs/2.6.0.M1/changelog.txt)
-   Spring Data Redis 1.8 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-redis/1.8.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/redis/docs/1.8.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/redis/docs/1.8.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/redis/docs/1.8.0.M1/changelog.txt)
-   Spring Data Elasticsearch 2.1 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-elasticsearch/2.1.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/elasticsearch/docs/2.1.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/elasticsearch/docs/2.1.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/elasticsearch/docs/2.1.0.M1/changelog.txt)
-   Spring Data Couchbase 2.2 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-couchbase/2.2.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/couchbase/docs/2.2.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/couchbase/docs/2.2.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/couchbase/docs/2.2.0.M1/changelog.txt)

On a final note, SpringOne Platform 2016 is around the corner! Meet the Spring Data team at SpringOne Platform 2016 in Las Vegas, Nevada, next week. We've prepared a [lot of sessions](https://2016.event.springoneplatform.io/schedule/2016-08-02) to cover Spring & Data related topics and it's not too late to [register](https://2016.event.springoneplatform.io/register). Vegas is never a bad place to be at, even more so with the Spring team around!