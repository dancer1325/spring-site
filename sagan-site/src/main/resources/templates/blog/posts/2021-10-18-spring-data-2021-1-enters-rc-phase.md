---
title: Spring Data 2021.1 enters RC phase
source: https://spring.io/blog/2021/10/18/spring-data-2021-1-enters-rc-phase
scraped: 2026-02-23T13:08:03.535Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  October 18, 2021 | 0 Comments
---

# Spring Data 2021.1 enters RC phase

_Releases | Mark Paluch |  October 18, 2021 | 0 Comments_

Dear Spring community,

On behalf of the Spring Data team and everyone who contributed, it is my pleasure to announce that Spring Data `2021.1.0` has entered its release candidate phase by releasing `RC1` today. It is available from the milestone repository. This release ships with several tickets fixed. The most notable changes are:

-   Deprecate support for RxJava 2 in preparation for removal of RxJava 2 support with Spring Data 3.0.
-   Fluent Query API for Querydsl and Query-by-Example, allowing for projections, pagination, and consuming results as a `Stream`.
-   Spring Data JDBC ships with a refined SQL DSL, accepting complex JOIN conditions and subselects.
-   Support for `exists` and `not empty` keywords in Elasticsearch repository query methods and support for field exclusion in `source`.
-   Improve mapping performance for custom queries and paths in Neo4j and support for `ReactiveQuerydslPredicateExecutor`.

We are working towards the GA release in early November. Looking ahead, our focus shifts towards Spring Data 3.0 development with a Java 17 and Jakarta EE 9 baseline. Spring Data 3.0 development will be an ongoing endeavor throughout the next year. We plan to adhere to our 6-month release cadence, so you should expect a lighter Spring Data 2.7 (2022.0) feature release shipping mostly bug fixes and dependency upgrades in May of 2022.

Please give Spring Data `2021.1.0-RC1` a try (for example, as part of the upcoming Spring Boot `2.6.0-RC1` release), which will be available [start.spring.io](https://start.spring.io) soon, and let us know about any regressions or other issues.

Here are the detailed links to each individual artifact and the reference documentation:

-   Spring Data Commons 2.6 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-commons/2.6.0-RC1) - [Javadoc](https://docs.spring.io/spring-data/commons/docs/2.6.0-RC1/api) - [Documentation](https://docs.spring.io/spring-data/commons/docs/2.6.0-RC1/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-commons/releases/tag/2.6.0-RC1)
-   Spring Data JDBC 2.3 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jdbc/2.3.0-RC1) - [Javadoc](https://docs.spring.io/spring-data/jdbc/docs/2.3.0-RC1/api) - [Documentation](https://docs.spring.io/spring-data/jdbc/docs/2.3.0-RC1/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-jdbc/releases/tag/2.3.0-RC1)
-   Spring Data JPA 2.6 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jpa/2.6.0-RC1) - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/2.6.0-RC1/api) - [Documentation](https://docs.spring.io/spring-data/jpa/docs/2.6.0-RC1/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-jpa/releases/tag/2.6.0-RC1)
-   Spring Data KeyValue 2.6 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-keyvalue/2.6.0-RC1) - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/2.6.0-RC1/api) - [Documentation](https://docs.spring.io/spring-data/keyvalue/docs/2.6.0-RC1/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-keyvalue/releases/tag/2.6.0-RC1)
-   Spring Data for Apache Cassandra 3.3 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-cassandra/3.3.0-RC1) - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/3.3.0-RC1/api) - [Documentation](https://docs.spring.io/spring-data/cassandra/docs/3.3.0-RC1/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-cassandra/releases/tag/3.3.0-RC1)
-   Spring Data for Apache Geode 2.6 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-geode/2.6.0-RC1) - [Javadoc](https://docs.spring.io/spring-data/geode/docs/2.6.0-RC1/api) - [Documentation](https://docs.spring.io/spring-data/geode/docs/2.6.0-RC1/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-geode/releases/tag/2.6.0-RC1)
-   Spring Data Neo4j 6.2 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-neo4j/6.2.0-RC1) - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/6.2.0-RC1/api) - [Documentation](https://docs.spring.io/spring-data/neo4j/docs/6.2.0-RC1/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-neo4j/releases/tag/6.2.0-RC1)
-   Spring Data MongoDB 3.3 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-mongodb/3.3.0-RC1) - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/3.3.0-RC1/api) - [Documentation](https://docs.spring.io/spring-data/mongodb/docs/3.3.0-RC1/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-mongodb/releases/tag/3.3.0-RC1)
-   Spring Data R2DBC 1.4 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-r2dbc/1.4.0-RC1) - [Javadoc](https://docs.spring.io/spring-data/r2dbc/docs/1.4.0-RC1/api) - [Documentation](https://docs.spring.io/spring-data/r2dbc/docs/1.4.0-RC1/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-r2dbc/releases/tag/1.4.0-RC1)
-   Spring Data LDAP 2.6 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-ldap/2.6.0-RC1) - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/2.6.0-RC1/api) - [Documentation](https://docs.spring.io/spring-data/ldap/docs/2.6.0-RC1/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-ldap/releases/tag/2.6.0-RC1)
-   Spring Data Envers 2.6 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-envers/2.6.0-RC1) - [Javadoc](https://docs.spring.io/spring-data/envers/docs/2.6.0-RC1/api) - [Documentation](https://docs.spring.io/spring-data/envers/docs/2.6.0-RC1/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-envers/releases/tag/2.6.0-RC1)
-   Spring Data REST 3.6 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-rest-webmvc/3.6.0-RC1) - [Javadoc](https://docs.spring.io/spring-data/rest/docs/3.6.0-RC1/api) - [Documentation](https://docs.spring.io/spring-data/rest/docs/3.6.0-RC1/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-rest/releases/tag/3.6.0-RC1)
-   Spring Data Redis 2.6 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-redis/2.6.0-RC1) - [Javadoc](https://docs.spring.io/spring-data/redis/docs/2.6.0-RC1/api) - [Documentation](https://docs.spring.io/spring-data/redis/docs/2.6.0-RC1/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-redis/releases/tag/2.6.0-RC1)
-   Spring Data Elasticsearch 4.3 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-elasticsearch/4.3.0-RC1) - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/4.3.0-RC1/api) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/docs/4.3.0-RC1/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-elasticsearch/releases/tag/4.3.0-RC1)
-   Spring Data Couchbase 4.3 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-couchbase/4.3.0-RC1) - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/4.3.0-RC1/api) - [Documentation](https://docs.spring.io/spring-data/couchbase/docs/4.3.0-RC1/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-couchbase/releases/tag/4.3.0-RC1)