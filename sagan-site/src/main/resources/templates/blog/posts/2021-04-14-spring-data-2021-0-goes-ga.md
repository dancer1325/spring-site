---
title: Spring Data 2021.0 goes GA
source: https://spring.io/blog/2021/04/14/spring-data-2021-0-goes-ga
scraped: 2026-02-23T13:27:18.979Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  April 14, 2021 | 3 Comments
---

# Spring Data 2021.0 goes GA

_Releases | Mark Paluch |  April 14, 2021 | 3 Comments_

Dear Spring community,

On behalf of the Spring Data team and our contributors, it is my pleasure to announce that Spring Data `2021.0.0` (Codename: [Pascal](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-2021.0-%28Pascal%29)) is generally available from Maven Central. This release ships with features, bugfixes, and improvements that contain numerous version and driver upgrades. Note that [Spring Data Solr](https://spring.io/blog/2020/04/07/spring-data-for-apache-solr-discontinued) is no longer part of the Spring Data Release Train.

This curated overview summarizes the most significant changes:

-   Introduce `deleteAllById` for `CrudRepository` and `ReactiveCrudRepository`.
-   Use Spring Core JFR (Java Flight Recorder) metrics.
-   `QueryByExample` for R2DBC and Oracle.
-   Enable type- and refactoring-safe use of `KProperty` and `KPropertyPath` for property path rendering.
-   Embedded Document support & relaxed Aggregation type checks for MongoDB.
-   Cassandra prepared statements.
-   Repository projections & function execution for Apache Geode.
-   Remove Spring Data Solr from release train.
-   Support for [jMolecules](https://github.com/xmolecules/jmolecules).

Watch for a blog post series explaining the new and noteworthy items in this release train. Meanwhile, Spring Boot `2.5-RC1`, to be released in the next few days, is the easiest way to upgrade Spring Data `2021.0.0`.

We are working towards the next service release `2021.0.1`, to be included with Spring Boot 2.5 GA in mid-May. Going forward, the Spring Data team starts shifting its focus towards the next release trains. We expect the `2021.1` release train to ship mostly dependency upgrades and a reduced set of new features. The main focus moves towards Spring Data 3.0 in alignment with Spring Framework 6 and Spring Boot 3.0.

To round things off, here are the links to the individual modules:

-   Spring Data Commons 2.5 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-commons/2.5.0) - [Javadoc](https://docs.spring.io/spring-data/commons/docs/2.5.0/api) - [Documentation](https://docs.spring.io/spring-data/commons/docs/2.5.0/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-commons/releases/tag/2.5.0)
-   Spring Data JDBC 2.2 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-jdbc/2.2.0) - [Javadoc](https://docs.spring.io/spring-data/jdbc/docs/2.2.0/api) - [Documentation](https://docs.spring.io/spring-data/jdbc/docs/2.2.0/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-jdbc/releases/tag/2.2.0)
-   Spring Data JPA 2.5 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-jpa/2.5.0) - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/2.5.0/api) - [Documentation](https://docs.spring.io/spring-data/jpa/docs/2.5.0/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-jpa/releases/tag/2.5.0)
-   Spring Data for Apache Cassandra 3.2 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-cassandra/3.2.0) - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/3.2.0/api) - [Documentation](https://docs.spring.io/spring-data/cassandra/docs/3.2.0/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-cassandra/releases/tag/3.2.0)
-   Spring Data MongoDB 3.2 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-mongodb/3.2.0) - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/3.2.0/api) - [Documentation](https://docs.spring.io/spring-data/mongodb/docs/3.2.0/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-mongodb/releases/tag/3.2.0)
-   Spring Data Neo4j 6.1 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-neo4j/6.1.0) - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/6.1.0/api) - [Documentation](https://docs.spring.io/spring-data/neo4j/docs/6.1.0/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-neo4j/releases/tag/6.1.0)
-   Spring Data KeyValue 2.5 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-keyvalue/2.5.0) - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/2.5.0/api) - [Documentation](https://docs.spring.io/spring-data/keyvalue/docs/2.5.0/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-keyvalue/releases/tag/2.5.0)
-   Spring Data for Apache Geode 2.5 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-geode/2.5.0) - [Javadoc](https://docs.spring.io/spring-data/geode/docs/2.5.0/api) - [Documentation](https://docs.spring.io/spring-data/geode/docs/2.5.0/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-geode/releases/tag/2.5.0)
-   Spring Data R2DBC 1.3 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-r2dbc/1.3.0) - [Javadoc](https://docs.spring.io/spring-data/r2dbc/docs/1.3.0/api) - [Documentation](https://docs.spring.io/spring-data/r2dbc/docs/1.3.0/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-r2dbc/releases/tag/1.3.0)
-   Spring Data LDAP 2.5 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-ldap/2.5.0) - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/2.5.0/api) - [Documentation](https://docs.spring.io/spring-data/ldap/docs/2.5.0/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-ldap/releases/tag/2.5.0)
-   Spring Data Envers 2.5 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-envers/2.5.0) - [Javadoc](https://docs.spring.io/spring-data/envers/docs/2.5.0/api) - [Documentation](https://docs.spring.io/spring-data/envers/docs/2.5.0/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-envers/releases/tag/2.5.0)
-   Spring Data REST 3.5 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-rest-webmvc/3.5.0) - [Javadoc](https://docs.spring.io/spring-data/rest/docs/3.5.0/api) - [Documentation](https://docs.spring.io/spring-data/rest/docs/3.5.0/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-rest/releases/tag/3.5.0)
-   Spring Data Redis 2.5 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-redis/2.5.0) - [Javadoc](https://docs.spring.io/spring-data/redis/docs/2.5.0/api) - [Documentation](https://docs.spring.io/spring-data/redis/docs/2.5.0/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-redis/releases/tag/2.5.0)
-   Spring Data Elasticsearch 4.2 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-elasticsearch/4.2.0) - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/4.2.0/api) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/docs/4.2.0/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-elasticsearch/releases/tag/4.2.0)
-   Spring Data Couchbase 4.2 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-couchbase/4.2.0) - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/4.2.0/api) - [Documentation](https://docs.spring.io/spring-data/couchbase/docs/4.2.0/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-couchbase/releases/tag/4.2.0)