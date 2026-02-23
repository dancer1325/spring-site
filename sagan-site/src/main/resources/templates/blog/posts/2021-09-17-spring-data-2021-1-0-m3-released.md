---
title: Spring Data 2021.1.0-M3 released
source: https://spring.io/blog/2021/09/17/spring-data-2021-1-0-m3-released
scraped: 2026-02-23T13:10:59.225Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  September 17, 2021 | 0 Comments
---

# Spring Data 2021.1.0-M3 released

_Releases | Mark Paluch |  September 17, 2021 | 0 Comments_

On behalf of the team, I’m delighted to announce the availability of the third Spring Data `2021.1.0` milestone. This release is the last milestone before entering the RC phase on mid October. This release ships besides numerous bugfixes and dependency upgrades a series of notable enhancements:

**General**

-   Support jMolecules' `@Identity` as ID annotation
-   Publish delete events by repository methods `deleteInBatch` and `deleteAllInBatch` methods

**MongoDB**

-   Support for MongoDB 5.0 aggregation stages and operators including `$setWindowFields` for aggregations using time-series.
-   Configuration options for MongoDB's versioned Server API.
-   Schema derivation for encrypted fields.

**Redis**

-   Options to reuse bound connections.
-   Enable `ReactiveRedisTemplate` for multi-tenancy usage.
-   Performance optimizations using Jedis with Redis Cluster.

**Elasticsearch**

-   Improved client configuration callbacks.

**Neo4j**

-   Support for cyclic mapping in projections.

We are working towards a release candidate release in mid-October and a GA release in early November. Watch out for the upcoming Spring Boot `2.6.0-M3` release in the next few days that is going to pick up this Spring Data milestone.

Finally, here are the links to the artifacts, changelogs, and documentation:

-   Spring Data Commons 2.6 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-commons/2.6.0-M3) - [Javadoc](https://docs.spring.io/spring-data/commons/docs/2.6.0-M3/api) - [Documentation](https://docs.spring.io/spring-data/commons/docs/2.6.0-M3/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-commons/releases/tag/2.6.0-M3)
-   Spring Data JDBC 2.3 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jdbc/2.3.0-M3) - [Javadoc](https://docs.spring.io/spring-data/jdbc/docs/2.3.0-M3/api) - [Documentation](https://docs.spring.io/spring-data/jdbc/docs/2.3.0-M3/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-jdbc/releases/tag/2.3.0-M3)
-   Spring Data JPA 2.6 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jpa/2.6.0-M3) - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/2.6.0-M3/api) - [Documentation](https://docs.spring.io/spring-data/jpa/docs/2.6.0-M3/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-jpa/releases/tag/2.6.0-M3)
-   Spring Data MongoDB 3.3 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-mongodb/3.3.0-M3) - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/3.3.0-M3/api) - [Documentation](https://docs.spring.io/spring-data/mongodb/docs/3.3.0-M3/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-mongodb/releases/tag/3.3.0-M3)
-   Spring Data KeyValue 2.6 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-keyvalue/2.6.0-M3) - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/2.6.0-M3/api) - [Documentation](https://docs.spring.io/spring-data/keyvalue/docs/2.6.0-M3/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-keyvalue/releases/tag/2.6.0-M3)
-   Spring Data Neo4j 6.2 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-neo4j/6.2.0-M3) - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/6.2.0-M3/api) - [Documentation](https://docs.spring.io/spring-data/neo4j/docs/6.2.0-M3/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-neo4j/releases/tag/6.2.0-M3)
-   Spring Data for Apache Geode 2.6 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-geode/2.6.0-M3) - [Javadoc](https://docs.spring.io/spring-data/geode/docs/2.6.0-M3/api) - [Documentation](https://docs.spring.io/spring-data/geode/docs/2.6.0-M3/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-geode/releases/tag/2.6.0-M3)
-   Spring Data for Apache Cassandra 3.3 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-cassandra/3.3.0-M3) - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/3.3.0-M3/api) - [Documentation](https://docs.spring.io/spring-data/cassandra/docs/3.3.0-M3/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-cassandra/releases/tag/3.3.0-M3)
-   Spring Data R2DBC 1.4 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-r2dbc/1.4.0-M3) - [Javadoc](https://docs.spring.io/spring-data/r2dbc/docs/1.4.0-M3/api) - [Documentation](https://docs.spring.io/spring-data/r2dbc/docs/1.4.0-M3/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-r2dbc/releases/tag/1.4.0-M3)
-   Spring Data LDAP 2.6 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-ldap/2.6.0-M3) - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/2.6.0-M3/api) - [Documentation](https://docs.spring.io/spring-data/ldap/docs/2.6.0-M3/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-ldap/releases/tag/2.6.0-M3)
-   Spring Data Envers 2.6 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-envers/2.6.0-M3) - [Javadoc](https://docs.spring.io/spring-data/envers/docs/2.6.0-M3/api) - [Documentation](https://docs.spring.io/spring-data/envers/docs/2.6.0-M3/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-envers/releases/tag/2.6.0-M3)
-   Spring Data REST 3.6 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-rest-webmvc/3.6.0-M3) - [Javadoc](https://docs.spring.io/spring-data/rest/docs/3.6.0-M3/api) - [Documentation](https://docs.spring.io/spring-data/rest/docs/3.6.0-M3/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-rest/releases/tag/3.6.0-M3)
-   Spring Data Redis 2.6 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-redis/2.6.0-M3) - [Javadoc](https://docs.spring.io/spring-data/redis/docs/2.6.0-M3/api) - [Documentation](https://docs.spring.io/spring-data/redis/docs/2.6.0-M3/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-redis/releases/tag/2.6.0-M3)
-   Spring Data Elasticsearch 4.3 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-elasticsearch/4.3.0-M3) - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/4.3.0-M3/api) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/docs/4.3.0-M3/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-elasticsearch/releases/tag/4.3.0-M3)
-   Spring Data Couchbase 4.3 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-couchbase/4.3.0-M3) - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/4.3.0-M3/api) - [Documentation](https://docs.spring.io/spring-data/couchbase/docs/4.3.0-M3/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-couchbase/releases/tag/4.3.0-M3)