---
title: Spring Data 2021.1.0 goes GA
source: https://spring.io/blog/2021/11/12/spring-data-2021-1-0-goes-ga
scraped: 2026-02-23T13:04:44.524Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Jens Schauder |  November 12, 2021 | 1 Comment
---

# Spring Data 2021.1.0 goes GA

_Releases | Jens Schauder |  November 12, 2021 | 1 Comment_

On behalf of the team, I’m pleased to announce the availability of the Spring Data `2021.1.0`.

These are the most important changes:

-   Upgrade to Querydsl 5.0
-   Support jMolecules' @Identity Annotation for Identifiers
-   Fluent Query API for Querydsl and Query-by-Example
-   Deprecated RxJava 2 Support
-   MongoDB @DocumentReference, schema derivation for encrypted fields, and MongoDB 5.0 Time Series support
-   Redis 6.2 support
-   Support for streaming large result sets in Spring Data JDBC, Projections, and SQL Builder refinements around conditions, JOINs, and SELECT projections
-   Support for Impersonation and support for Querydsl in Neo4j

You can find a more detailed description in the [Release Notes](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-2021.1-%28Q%29-Release-Notes). This is the first time we offer release notes in this format, so please let us know if it works for you and what we can improve.

With 2021.1.0 out of the door, we'll concentrate our work on Spring Data 3.0.0 development with a Java 17 and Jakarta EE 9 baseline. Spring Data 3.0 development will be an ongoing endeavor throughout the next year. We plan to adhere to our 6-month release cadence, so you should expect a lighter Spring Data 2.7 (2022.0) feature release (shipping mostly bug fixes and dependency upgrades) in May of 2022.

This release is built on top of Spring Framework `5.3.13`. For your convenience, you can consume Spring Data `2021.1.0` through the upcoming Spring Boot releases `2.6.0`.

-   Spring Data Commons 2.6 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-commons/2.6.0) - [Javadoc](https://docs.spring.io/spring-data/commons/docs/2.6.0/api) - [Documentation](https://docs.spring.io/spring-data/commons/docs/2.6.0/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-commons/releases/tag/2.6.0)
-   Spring Data JDBC 2.3 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-jdbc/2.3.0) - [Javadoc](https://docs.spring.io/spring-data/jdbc/docs/2.3.0/api) - [Documentation](https://docs.spring.io/spring-data/jdbc/docs/2.3.0/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-jdbc/releases/tag/2.3.0)
-   Spring Data JPA 2.6 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-jpa/2.6.0) - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/2.6.0/api) - [Documentation](https://docs.spring.io/spring-data/jpa/docs/2.6.0/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-jpa/releases/tag/2.6.0)
-   Spring Data KeyValue 2.6 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-keyvalue/2.6.0) - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/2.6.0/api) - [Documentation](https://docs.spring.io/spring-data/keyvalue/docs/2.6.0/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-keyvalue/releases/tag/2.6.0)
-   Spring Data Neo4j 6.2 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-neo4j/6.2.0) - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/6.2.0/api) - [Documentation](https://docs.spring.io/spring-data/neo4j/docs/6.2.0/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-neo4j/releases/tag/6.2.0)
-   Spring Data MongoDB 3.3 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-mongodb/3.3.0) - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/3.3.0/api) - \[Documentation\]([https://docs.spring.io/spring-data/mongodb/docs/3](https://docs.spring.io/spring-data/mongodb/docs/3).

3.0/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-mongodb/releases/tag/3.3.0)

-   Spring Data for Apache Cassandra 3.3 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-cassandra/3.3.0) - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/3.3.0/api) - [Documentation](https://docs.spring.io/spring-data/cassandra/docs/3.3.0/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-cassandra/releases/tag/3.3.0)
-   Spring Data for Apache Geode 2.6 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-geode/2.6.0) - [Javadoc](https://docs.spring.io/spring-data/geode/docs/2.6.0/api) - [Documentation](https://docs.spring.io/spring-data/geode/docs/2.6.0/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-geode/releases/tag/2.6.0)
-   Spring Data R2DBC 1.4 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-r2dbc/1.4.0) - [Javadoc](https://docs.spring.io/spring-data/r2dbc/docs/1.4.0/api) - [Documentation](https://docs.spring.io/spring-data/r2dbc/docs/1.4.0/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-r2dbc/releases/tag/1.4.0)
-   Spring Data LDAP 2.6 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-ldap/2.6.0) - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/2.6.0/api) - [Documentation](https://docs.spring.io/spring-data/ldap/docs/2.6.0/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-ldap/releases/tag/2.6.0)
-   Spring Data Envers 2.6 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-envers/2.6.0) - [Javadoc](https://docs.spring.io/spring-data/envers/docs/2.6.0/api) - [Documentation](https://docs.spring.io/spring-data/envers/docs/2.6.0/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-envers/releases/tag/2.6.0)
-   Spring Data REST 3.6 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-rest-webmvc/3.6.0) - [Javadoc](https://docs.spring.io/spring-data/rest/docs/3.6.0/api) - [Documentation](https://docs.spring.io/spring-data/rest/docs/3.6.0/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-rest/releases/tag/3.6.0)
-   Spring Data Redis 2.6 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-redis/2.6.0) - [Javadoc](https://docs.spring.io/spring-data/redis/docs/2.6.0/api) - [Documentation](https://docs.spring.io/spring-data/redis/docs/2.6.0/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-redis/releases/tag/2.6.0)
-   Spring Data Elasticsearch 4.3 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-elasticsearch/4.3.0) - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/4.3.0/api) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/docs/4.3.0/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-elasticsearch/releases/tag/4.3.0)
-   Spring Data Couchbase 4.3 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-couchbase/4.3.0) - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/4.3.0/api) - [Documentation](https://docs.spring.io/spring-data/couchbase/docs/4.3.0/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-couchbase/releases/tag/4.3.0)