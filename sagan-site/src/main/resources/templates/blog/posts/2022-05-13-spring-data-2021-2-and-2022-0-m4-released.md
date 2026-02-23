---
title: Spring Data 2021.2 and 2022.0 M4 released.
source: https://spring.io/blog/2022/05/13/spring-data-2021-2-and-2022-0-m4-released
scraped: 2026-02-23T12:41:56.362Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Christoph Strobl |  May 13, 2022 | 1 Comment
---

# Spring Data 2021.2 and 2022.0 M4 released.

_Releases | Christoph Strobl |  May 13, 2022 | 1 Comment_

On behalf of the Data Team and everyone who contributed, I'm pleased to announce the GA release of the `2021.2` release train as well as the 4th Milestone of the `2022.0` one.

Already working on the 2022.0 train, based on [Spring Framework 6](https://spring.io/blog/2022/05/12/spring-framework-6-0-0-m4-available-now), [Java17](https://openjdk.java.net/projects/jdk/17/) and [Jakarta EE 9](https://jakarta.ee/specifications/platform/9/), the `2021.2` release ships bug fixes and selected back ported features.

Other than dependency upgrades, these are some of the major changes:

-   Infrastructure to introspect a projection type.
-   Common infrastructure for property-specific value converters.
-   Improved support for `IdClass` handling in data-jpa.
-   Declarative `Update` methods in `data-mongodb`.
-   Reindexing support in `data-elasticsearch`.
-   Direct projections for `data-cassandra`.
-   ACL support for Redis Sentinels.
-   Lock and Null precedence support for JDBC.
-   [Query Rewriter for JPA](https://spring.io/blog/2022/05/02/ever-wanted-to-rewrite-a-query-in-spring-data-jpa).

You can find a more detailed description in the `2021.2` and `2022.0` [release notes](https://github.com/spring-projects/spring-data-commons/wiki/#release-notes).

Check out the updated [Spring Data Examples](https://github.com/spring-projects/spring-data-examples/tree/boot-next) repository.

For your convenience, the data bits will be picked up by the next Spring Boot releases.

## [](#202120)2021.2.0

-   Spring Data Commons `2.7 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-commons/2.7.0) - [Javadoc](https://docs.spring.io/spring-data/commons/docs/2.7.0/api/) - [Documentation](https://docs.spring.io/spring-data/commons/docs/2.7.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-commons/releases/tag/2.7.0)
-   Spring Data JDBC `2.4 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-jdbc/2.4.0) - [Javadoc](https://docs.spring.io/spring-data/jdbc/docs/2.4.0/api/) - [Documentation](https://docs.spring.io/spring-data/jdbc/docs/2.4.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-relational/releases/tag/2.4.0)
-   Spring Data JPA `2.7 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-jpa/2.7.0) - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/2.7.0/api/) - [Documentation](https://docs.spring.io/spring-data/jpa/docs/2.7.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-jpa/releases/tag/2.7.0)
-   Spring Data MongoDB `3.4 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-mongodb/3.4.0) - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/3.4.0/api/) - [Documentation](https://docs.spring.io/spring-data/mongodb/docs/3.4.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-mongodb/releases/tag/3.4.0)
-   Spring Data KeyValue `2.7 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-keyvalue/2.7.0) - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/2.7.0/api/) - [Documentation](https://docs.spring.io/spring-data/keyvalue/docs/2.7.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-keyvalue/releases/tag/2.7.0)
-   Spring Data for Apache Cassandra `3.4 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-cassandra/3.4.0) - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/3.4.0/api/) - [Documentation](https://docs.spring.io/spring-data/cassandra/docs/3.4.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-cassandra/releases/tag/3.4.0)
-   Spring Data for Apache Geode `2.7 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-geode/2.7.0) - [Javadoc](https://docs.spring.io/spring-data/geode/docs/2.7.0/api/) - [Documentation](https://docs.spring.io/spring-data/geode/docs/2.7.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-geode/releases/tag/2.7.0)
-   Spring Data Neo4j `6.3 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-neo4j/6.3.0) - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/6.3.0/api/) - [Documentation](https://docs.spring.io/spring-data/neo4j/docs/6.3.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-neo4j/releases/tag/6.3.0)
-   Spring Data R2DBC `1.5 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-r2dbc/1.5.0) - [Javadoc](https://docs.spring.io/spring-data/r2dbc/docs/1.5.0/api/) - [Documentation](https://docs.spring.io/spring-data/r2dbc/docs/1.5.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-r2dbc/releases/tag/1.5.0)
-   Spring Data LDAP `2.7 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-ldap/2.7.0) - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/2.7.0/api/) - [Documentation](https://docs.spring.io/spring-data/ldap/docs/2.7.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-ldap/releases/tag/2.7.0)
-   Spring Data Envers `2.7 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-envers/2.7.0) - [Javadoc](https://docs.spring.io/spring-data/envers/docs/2.7.0/api/) - [Documentation](https://docs.spring.io/spring-data/envers/docs/2.7.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-envers/releases/tag/2.7.0)
-   Spring Data REST `3.7 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-rest-webmvc/3.7.0) - [Javadoc](https://docs.spring.io/spring-data/rest/docs/3.7.0/api/) - [Documentation](https://docs.spring.io/spring-data/rest/docs/3.7.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-rest/releases/tag/3.7.0)
-   Spring Data Redis `2.7 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-redis/2.7.0) - [Javadoc](https://docs.spring.io/spring-data/redis/docs/2.7.0/api/) - [Documentation](https://docs.spring.io/spring-data/redis/docs/2.7.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-redis/releases/tag/2.7.0)
-   Spring Data Elasticsearch `4.4 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-elasticsearch/4.4.0) - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/4.4.0/api/) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/docs/4.4.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-elasticsearch/releases/tag/4.4.0)
-   Spring Data Couchbase `4.4 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-couchbase/4.4.0) - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/4.4.0/api/) - [Documentation](https://docs.spring.io/spring-data/couchbase/docs/4.4.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-couchbase/releases/tag/4.4.0)

## [](#202200-m4)2022.0.0-M4

-   Spring Data Commons `3.0 M4` - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-commons/3.0.0-M4) - [Javadoc](https://docs.spring.io/spring-data/commons/docs/3.0.0-M4/api/) - [Documentation](https://docs.spring.io/spring-data/commons/docs/3.0.0-M4/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-commons/releases/tag/3.0.0-M4)
-   Spring Data JPA `3.0 M4` - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jpa/3.0.0-M4) - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/3.0.0-M4/api/) - [Documentation](https://docs.spring.io/spring-data/jpa/docs/3.0.0-M4/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-jpa/releases/tag/3.0.0-M4)
-   Spring Data MongoDB `4.0 M4` - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-mongodb/4.0.0-M4) - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/4.0.0-M4/api/) - [Documentation](https://docs.spring.io/spring-data/mongodb/docs/4.0.0-M4/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-mongodb/releases/tag/4.0.0-M4)
-   Spring Data KeyValue `3.0 M4` - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-keyvalue/3.0.0-M4) - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/3.0.0-M4/api/) - [Documentation](https://docs.spring.io/spring-data/keyvalue/docs/3.0.0-M4/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-keyvalue/releases/tag/3.0.0-M4)
-   Spring Data for Apache Cassandra `4.0 M4` - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-cassandra/4.0.0-M4) - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/4.0.0-M4/api/) - [Documentation](https://docs.spring.io/spring-data/cassandra/docs/4.0.0-M4/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-cassandra/releases/tag/4.0.0-M4)
-   Spring Data for Apache Geode `3.0 M4` - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-geode/3.0.0-M4) - [Javadoc](https://docs.spring.io/spring-data/geode/docs/3.0.0-M4/api/) - [Documentation](https://docs.spring.io/spring-data/geode/docs/3.0.0-M4/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-geode/releases/tag/3.0.0-M4)
-   Spring Data Neo4j `7.0 M4` - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-neo4j/7.0.0-M4) - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/7.0.0-M4/api/) - [Documentation](https://docs.spring.io/spring-data/neo4j/docs/7.0.0-M4/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-neo4j/releases/tag/7.0.0-M4)
-   Spring Data LDAP `3.0 M4` - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-ldap/3.0.0-M4) - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/3.0.0-M4/api/) - [Documentation](https://docs.spring.io/spring-data/ldap/docs/3.0.0-M4/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-ldap/releases/tag/3.0.0-M4)
-   Spring Data REST `4.0 M4` - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-rest-webmvc/4.0.0-M4) - [Javadoc](https://docs.spring.io/spring-data/rest/docs/4.0.0-M4/api/) - [Documentation](https://docs.spring.io/spring-data/rest/docs/4.0.0-M4/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-rest/releases/tag/4.0.0-M4)
-   Spring Data Redis `3.0 M4` - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-redis/3.0.0-M4) - [Javadoc](https://docs.spring.io/spring-data/redis/docs/3.0.0-M4/api/) - [Documentation](https://docs.spring.io/spring-data/redis/docs/3.0.0-M4/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-redis/releases/tag/3.0.0-M4)
-   Spring Data Elasticsearch `5.0 M4` - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-elasticsearch/5.0.0-M4) - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/5.0.0-M4/api/) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/docs/5.0.0-M4/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-elasticsearch/releases/tag/5.0.0-M4)
-   Spring Data Couchbase `5.0 M4` - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-couchbase/5.0.0-M4) - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/5.0.0-M4/api/) - [Documentation](https://docs.spring.io/spring-data/couchbase/docs/5.0.0-M4/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-couchbase/releases/tag/5.0.0-M4)
-   Spring Data Relational `3.0 M4` - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-relational/3.0.0-M4) - [Javadoc](https://docs.spring.io/spring-data/jdbc/docs/3.0.0-M4/api/) - [Documentation](https://docs.spring.io/spring-data/jdbc/docs/3.0.0-M4/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-relational/releases/tag/3.0.0-M4)