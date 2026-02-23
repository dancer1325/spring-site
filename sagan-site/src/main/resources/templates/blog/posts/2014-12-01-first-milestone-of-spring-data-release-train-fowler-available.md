---
title: First Milestone of Spring Data Release Train Fowler Available
source: https://spring.io/blog/2014/12/01/first-milestone-of-spring-data-release-train-fowler-available
scraped: 2026-02-23T22:05:24.928Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  December 01, 2014 | 9 Comments
---

# First Milestone of Spring Data Release Train Fowler Available

_Releases | Oliver Drotbohm |  December 01, 2014 | 9 Comments_

On behalf of the Spring Data team, I am happy to announce the first milestone of the Spring Data Release train [Fowler](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Fowler).

The release ships [170 tickets fixed](https://jira.spring.io/issues/?filter=14842), 119 of them unique to the Fowler release train. Find a curated changelog [here](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Fowler). The highlights of the release include:

-   Upgrades to Spring 4.0.8 and Querydsl 3.6.0.
-   Performance improvements in converter subsystem by using byte-code generation.
-   Out-of-the-box support for JSR-310 date/time types (MongoDB).
-   Various (performance) improvements in the usage of SpEL (JPA).
-   Support for `$bit`, `$mul` and `$position` operators (MongoDB).
-   Improved proxy-id detection for JPA and REST.
-   Introdcution of `QueryDslPredicateExceutor.findAll(OrderSpecifier<?>... orders)` (Querydsl).
-   CDI repository extension for Cassandra module.
-   Upgrade to Gemfire 8 (Gemfire).
-   Version property based ETag generation (REST).
-   Upgrades to Solr 4.10.1, Elasticsearch 1.2, Neo4J 2.1.5, compatibility with upcoming MongoDB server and driver.

Here are the participating modules:

-   Spring Data Commons 1.10 M1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-commons/1.10.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/commons/docs/1.10.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/commons/docs/1.10.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/commons/docs/1.10.0.M1/changelog.txt)
-   Spring Data JPA 1.8 M1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jpa/1.8.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/jpa/docs/1.8.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/jpa/docs/1.8.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/jpa/docs/1.8.0.M1/changelog.txt)
-   Spring Data MongoDB 1.7 M1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-mongodb/1.7.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/mongodb/docs/1.7.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/mongodb/docs/1.7.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/mongodb/docs/1.7.0.M1/changelog.txt)
-   Spring Data Neo4j 3.3 M1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-neo4j/3.3.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/neo4j/docs/3.3.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/neo4j/docs/3.3.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/neo4j/docs/3.3.0.M1/changelog.txt)
-   Spring Data Solr 1.4 M1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-solr/1.4.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/solr/docs/1.4.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/solr/docs/1.4.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/solr/docs/1.4.0.M1/changelog.txt)
-   Spring Data Couchbase 1.3 M1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-couchbase/1.3.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/couchbase/docs/1.3.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/couchbase/docs/1.3.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/couchbase/docs/1.3.0.M1/changelog.txt)
-   Spring Data Cassandra 1.2 M1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-cassandra/1.2.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/cassandra/docs/1.2.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/cassandra/docs/1.2.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/cassandra/docs/1.2.0.M1/changelog.txt)
-   Spring Data Elasticsearch 1.2 M1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-elasticsearch/1.2.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/elasticsearch/docs/1.2.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/elasticsearch/docs/1.2.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/elasticsearch/docs/1.2.0.M1/changelog.txt)
-   Spring Data Gemfire 1.6 M1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-gemfire/1.6.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/gemfire/docs/1.6.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/gemfire/docs/1.6.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/gemfire/docs/1.6.0.M1/changelog.txt)
-   Spring Data Redis 1.5 M1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-redis/1.5.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/redis/docs/1.5.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/redis/docs/1.5.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/redis/docs/1.5.0.M1/changelog.txt)
-   Spring Data REST 2.3 M1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-rest-webmvc/2.3.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/rest/docs/2.3.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/rest/docs/2.3.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/rest/docs/2.3.0.M1/changelog.txt)

Be sure to check out the already [updated examples](https://github.com/spring-projects/spring-data-examples). Get in touch via [Twitter](https://twitter.com/SpringData), [StackOverflow](http://stackoverflow.com/questions/tagged/spring-data) or [JIRA](http://jira.spring.io). We're looking forward to your feedback!