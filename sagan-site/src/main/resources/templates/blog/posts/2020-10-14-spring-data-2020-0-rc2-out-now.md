---
title: Spring Data 2020.0 RC2 out now
source: https://spring.io/blog/2020/10/14/spring-data-2020-0-rc2-out-now
scraped: 2026-02-23T13:45:17.523Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Christoph Strobl |  October 14, 2020 | 0 Comments
---

# Spring Data 2020.0 RC2 out now

_Releases | Christoph Strobl |  October 14, 2020 | 0 Comments_

Dear Spring community,

On behalf of the Spring Data team and everyone who contributed, it’s my pleasure to announce that Spring Data 2020.0.0 RC2 is available from the milestone repository. This release ships with [87 tickets](https://jira.spring.io/issues/?filter=17133) fixed. The most notable changes are:

-   `PagingAndSortingRepository` support for Apache Geode.
-   Support for the `REVERSERANGEBYLEX` command and the `KEEPTTL` and `JUSTID` flags in Redis.
-   Additional MongoDB aggregation pipeline operators:`$unionWith`, `$function`, and `$accumulator`.
-   Cyclic data loading strategy improvements in Neo4j.
-   A dedicated Cassandra `DataClass` row mapper.
-   Suspendible repository query methods for use with Kotlin.

Please give Spring Data 2020.0.0-RC2 a try (for example, as part of the upcoming Spring Boot 2.4 M4 release, which will be available start.spring.io soon) and let us know about any regressions or other issues.

-   Spring Data Commons 2.4 RC2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-commons/2.4.0-RC2) - [Javadoc](https://docs.spring.io/spring-data/commons/docs/2.4.0-RC2/api) - [Documentation](https://docs.spring.io/spring-data/commons/docs/2.4.0-RC2/reference/html) - [Changelog](https://docs.spring.io/spring-data/commons/docs/2.4.0-RC2/changelog.txt)
-   Spring Data JDBC 2.1 RC2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jdbc/2.1.0-RC2) - [Javadoc](https://docs.spring.io/spring-data/jdbc/docs/2.1.0-RC2/api) - [Documentation](https://docs.spring.io/spring-data/jdbc/docs/2.1.0-RC2/reference/html) - [Changelog](https://docs.spring.io/spring-data/jdbc/docs/2.1.0-RC2/changelog.txt)
-   Spring Data JPA 2.4 RC2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jpa/2.4.0-RC2) - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/2.4.0-RC2/api) - [Documentation](https://docs.spring.io/spring-data/jpa/docs/2.4.0-RC2/reference/html) - [Changelog](https://docs.spring.io/spring-data/jpa/docs/2.4.0-RC2/changelog.txt)
-   Spring Data KeyValue 2.4 RC2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-keyvalue/2.4.0-RC2) - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/2.4.0-RC2/api) - [Documentation](https://docs.spring.io/spring-data/keyvalue/docs/2.4.0-RC2/reference/html) - [Changelog](https://docs.spring.io/spring-data/keyvalue/docs/2.4.0-RC2/changelog.txt)
-   Spring Data for Apache Solr 4.3 RC2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-solr/4.3.0-RC2) - [Javadoc](https://docs.spring.io/spring-data/solr/docs/4.3.0-RC2/api) - [Documentation](https://docs.spring.io/spring-data/solr/docs/4.3.0-RC2/reference/html) - [Changelog](https://docs.spring.io/spring-data/solr/docs/4.3.0-RC2/changelog.txt)
-   Spring Data for Apache Cassandra 3.1 RC2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-cassandra/3.1.0-RC2) - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/3.1.0-RC2/api) - [Documentation](https://docs.spring.io/spring-data/cassandra/docs/3.1.0-RC2/reference/html) - [Changelog](https://docs.spring.io/spring-data/cassandra/docs/3.1.0-RC2/changelog.txt)
-   Spring Data Neo4j 6.0 RC2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-neo4j/6.0.0-RC2) - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/6.0.0-RC2/api) - [Documentation](https://docs.spring.io/spring-data/neo4j/docs/6.0.0-RC2/reference/html) - [Changelog](https://docs.spring.io/spring-data/neo4j/docs/6.0.0-RC2/changelog.txt)
-   Spring Data MongoDB 3.1 RC2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-mongodb/3.1.0-RC2) - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/3.1.0-RC2/api) - [Documentation](https://docs.spring.io/spring-data/mongodb/docs/3.1.0-RC2/reference/html) - [Changelog](https://docs.spring.io/spring-data/mongodb/docs/3.1.0-RC2/changelog.txt)
-   Spring Data for Apache Geode 2.4 RC2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-geode/2.4.0-RC2) - [Javadoc](https://docs.spring.io/spring-data/geode/docs/2.4.0-RC2/api) - [Documentation](https://docs.spring.io/spring-data/geode/docs/2.4.0-RC2/reference/html) - [Changelog](https://docs.spring.io/spring-data/geode/docs/2.4.0-RC2/changelog.txt)
-   Spring Data R2DBC 1.2 RC2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-r2dbc/1.2.0-RC2) - [Javadoc](https://docs.spring.io/spring-data/r2dbc/docs/1.2.0-RC2/api) - [Documentation](https://docs.spring.io/spring-data/r2dbc/docs/1.2.0-RC2/reference/html) - [Changelog](https://docs.spring.io/spring-data/r2dbc/docs/1.2.0-RC2/changelog.txt)
-   Spring Data LDAP 2.4 RC2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-ldap/2.4.0-RC2) - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/2.4.0-RC2/api) - [Documentation](https://docs.spring.io/spring-data/ldap/docs/2.4.0-RC2/reference/html) - [Changelog](https://docs.spring.io/spring-data/ldap/docs/2.4.0-RC2/changelog.txt)
-   Spring Data Envers 2.4 RC2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-envers/2.4.0-RC2) - [Javadoc](https://docs.spring.io/spring-data/envers/docs/2.4.0-RC2/api) - [Documentation](https://docs.spring.io/spring-data/envers/docs/2.4.0-RC2/reference/html) - [Changelog](https://docs.spring.io/spring-data/envers/docs/2.4.0-RC2/changelog.txt)
-   Spring Data REST 3.4 RC2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-rest-webmvc/3.4.0-RC2) - [Javadoc](https://docs.spring.io/spring-data/rest/docs/3.4.0-RC2/api) - [Documentation](https://docs.spring.io/spring-data/rest/docs/3.4.0-RC2/reference/html) - [Changelog](https://docs.spring.io/spring-data/rest/docs/3.4.0-RC2/changelog.txt)
-   Spring Data Redis 2.4 RC2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-redis/2.4.0-RC2) - [Javadoc](https://docs.spring.io/spring-data/redis/docs/2.4.0-RC2/api) - [Documentation](https://docs.spring.io/spring-data/redis/docs/2.4.0-RC2/reference/html) - [Changelog](https://docs.spring.io/spring-data/redis/docs/2.4.0-RC2/changelog.txt)
-   Spring Data Elasticsearch 4.1 RC2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-elasticsearch/4.1.0-RC2) - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/4.1.0-RC2/api) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/docs/4.1.0-RC2/reference/html) - [Changelog](https://docs.spring.io/spring-data/elasticsearch/docs/4.1.0-RC2/changelog.txt)
-   Spring Data Couchbase 4.1 RC2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-couchbase/4.1.0-RC2) - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/4.1.0-RC2/api) - [Documentation](https://docs.spring.io/spring-data/couchbase/docs/4.1.0-RC2/reference/html) - [Changelog](https://docs.spring.io/spring-data/couchbase/docs/4.1.0-RC2/changelog.txt)