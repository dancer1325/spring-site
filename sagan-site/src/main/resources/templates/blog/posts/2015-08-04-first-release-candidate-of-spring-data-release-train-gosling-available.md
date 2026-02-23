---
title: First Release Candidate of Spring Data Release Train Gosling Available
source: https://spring.io/blog/2015/08/04/first-release-candidate-of-spring-data-release-train-gosling-available
scraped: 2026-02-23T19:45:22.384Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  August 04, 2015 | 3 Comments
---

# First Release Candidate of Spring Data Release Train Gosling Available

_Releases | Oliver Drotbohm |  August 04, 2015 | 3 Comments_

On behalf of the Spring Data team, I am pleased to announce the availability of the first and final release candidate of Spring Data release train Gosling. The release ships [121 fixes](https://jira.spring.io/issues/?filter=15147) and enhancements, most notably the following ones:

-   Querydsl integration for Spring MVC and Spring Data REST (see [the example](https://github.com/spring-projects/spring-data-examples/tree/master/web/querydsl#interesting-bits) for details).
-   Improved compatibility with Spring Framework 4.2 and Spring Boot dev tools.
-   Spring Data JPA now exposes a `JpaContext` to easily obtain an `EntityManager` per domain type.
-   `RepositoryRestConfigurer` for less invasive configuration in Spring Data REST.
-   Spring Data Redis uses Lettuce fork maintained by Mark Paluch.
-   Support for `ReadPreference` in Spring Data MongoDB aggregations.
-   Support for range facets in Spring Data Solr.
-   Dependency upgrades to Spring Framework 4.1.7, Guava 18 and Jackson 2.6.

We're now heading towards a GA in roundabout 4 weeks. So it's perfect timing to give the release candidates a spin and report any findings you might run into upgrading.

-   Spring Data Commons 1.11 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-commons/1.11.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/commons/docs/1.11.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/commons/docs/1.11.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/commons/docs/1.11.0.RC1/changelog.txt)
-   Spring Data JPA 1.9 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jpa/1.9.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/jpa/docs/1.9.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/jpa/docs/1.9.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/jpa/docs/1.9.0.RC1/changelog.txt)
-   Spring Data MongoDB 1.8 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-mongodb/1.8.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/mongodb/docs/1.8.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/mongodb/docs/1.8.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/mongodb/docs/1.8.0.RC1/changelog.txt)
-   Spring Data Neo4j 3.4 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-neo4j/3.4.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/neo4j/docs/3.4.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/neo4j/docs/3.4.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/neo4j/docs/3.4.0.RC1/changelog.txt)
-   Spring Data Solr 1.5 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-solr/1.5.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/solr/docs/1.5.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/solr/docs/1.5.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/solr/docs/1.5.0.RC1/changelog.txt)
-   Spring Data Couchbase 1.4 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-couchbase/1.4.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/couchbase/docs/1.4.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/couchbase/docs/1.4.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/couchbase/docs/1.4.0.RC1/changelog.txt)
-   Spring Data Cassandra 1.3 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-cassandra/1.3.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/cassandra/docs/1.3.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/cassandra/docs/1.3.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/cassandra/docs/1.3.0.RC1/changelog.txt)
-   Spring Data Elasticsearch 1.3 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-elasticsearch/1.3.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/elasticsearch/docs/1.3.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/elasticsearch/docs/1.3.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/elasticsearch/docs/1.3.0.RC1/changelog.txt)
-   Spring Data Gemfire 1.7 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-gemfire/1.7.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/gemfire/docs/1.7.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/gemfire/docs/1.7.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/gemfire/docs/1.7.0.RC1/changelog.txt)
-   Spring Data Redis 1.6 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-redis/1.6.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/redis/docs/1.6.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/redis/docs/1.6.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/redis/docs/1.6.0.RC1/changelog.txt)
-   Spring Data KeyValue 1.0 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-keyvalue/1.0.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/keyvalue/docs/1.0.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/keyvalue/docs/1.0.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/keyvalue/docs/1.0.0.RC1/changelog.txt)
-   Spring Data REST 2.4 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-rest-webmvc/2.4.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/rest/docs/2.4.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/rest/docs/2.4.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/rest/docs/2.4.0.RC1/changelog.txt)

## [](#springone-2gx-2015-is-around-the-corner)SpringOne 2GX 2015 is around the corner!

Only a few more days until the early-bird pricing runs out for [SpringOne2GX in Washington, DC soon](http://www.springone2gx.com). It's simply the best opportunity to find out first hand all that's going on and to provide direct feedback. We're going to showcase a lot of the work currently and progress and give an in-depth view into state of the art data access.