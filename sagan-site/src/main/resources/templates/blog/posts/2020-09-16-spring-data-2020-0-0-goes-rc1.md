---
title: Spring Data 2020.0.0 goes RC1
source: https://spring.io/blog/2020/09/16/spring-data-2020-0-0-goes-rc1
scraped: 2026-02-23T13:48:05.649Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  September 16, 2020 | 0 Comments
---

# Spring Data 2020.0.0 goes RC1

_Releases | Mark Paluch |  September 16, 2020 | 0 Comments_

Dear Spring community,

On behalf of the Spring Data team and everyone who contributed, it's my pleasure to announce that Spring Data `2020.0.0` has entered its release candidate phase by releasing the first of two release candidate releases, available from the [milestone repository](https://repo.spring.io/milestone/org/springframework/data/spring-data-bom/2020.0.0-RC1/). This release ships with [70 tickets fixed](https://jira.spring.io/issues/?filter=17037). The most notable changes are:

-   Support for Redis 6 ACL and upgrade to Lettuce 6.0 RC2.
-   Migration of core R2DBC support from Spring Data R2DBC to [Spring R2DBC](https://spring.io/blog/2020/09/15/spring-framework-5-3-goes-rc1).
-   Support the `SocketFactory` configuration client in Spring Data Geode.
-   `Slice` query support for Neo4j and a revised API for relationships.

We're working towards a second release candidate in early October. It will provide refinements to MongoDB's Aggregation Pipeline for improved MongoDB 4.4 support. The GA release is scheduled for late October.

Please give Spring Data `2020.0.0-RC1` a try, for example, as part of the upcoming Spring Boot `2.4 M3` release, which will be available [start.spring.io](https://start.spring.io/) soon, and let us know about any regressions or other issues.

Cheers, Mark

Here are the detailed links to each individual artifact and the reference documentation:

-   Spring Data Commons 2.4 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-commons/2.4.0-RC1) - [Javadoc](https://docs.spring.io/spring-data/commons/docs/2.4.0-RC1/api) - [Documentation](https://docs.spring.io/spring-data/commons/docs/2.4.0-RC1/reference/html) - [Changelog](https://docs.spring.io/spring-data/commons/docs/2.4.0-RC1/changelog.txt)
-   Spring Data JDBC 2.1 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jdbc/2.1.0-RC1) - [Javadoc](https://docs.spring.io/spring-data/jdbc/docs/2.1.0-RC1/api) - [Documentation](https://docs.spring.io/spring-data/jdbc/docs/2.1.0-RC1/reference/html) - [Changelog](https://docs.spring.io/spring-data/jdbc/docs/2.1.0-RC1/changelog.txt)
-   Spring Data JPA 2.4 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jpa/2.4.0-RC1) - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/2.4.0-RC1/api) - [Documentation](https://docs.spring.io/spring-data/jpa/docs/2.4.0-RC1/reference/html) - [Changelog](https://docs.spring.io/spring-data/jpa/docs/2.4.0-RC1/changelog.txt)
-   Spring Data for Apache Cassandra 3.1 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-cassandra/3.1.0-RC1) - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/3.1.0-RC1/api) - [Documentation](https://docs.spring.io/spring-data/cassandra/docs/3.1.0-RC1/reference/html) - [Changelog](https://docs.spring.io/spring-data/cassandra/docs/3.1.0-RC1/changelog.txt)
-   Spring Data MongoDB 3.1 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-mongodb/3.1.0-RC1) - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/3.1.0-RC1/api) - [Documentation](https://docs.spring.io/spring-data/mongodb/docs/3.1.0-RC1/reference/html) - [Changelog](https://docs.spring.io/spring-data/mongodb/docs/3.1.0-RC1/changelog.txt)
-   Spring Data for Apache Geode 2.4 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-geode/2.4.0-RC1) - [Javadoc](https://docs.spring.io/spring-data/geode/docs/2.4.0-RC1/api) - [Documentation](https://docs.spring.io/spring-data/geode/docs/2.4.0-RC1/reference/html) - [Changelog](https://docs.spring.io/spring-data/geode/docs/2.4.0-RC1/changelog.txt)
-   Spring Data for Apache Solr 4.3 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-solr/4.3.0-RC1) - [Javadoc](https://docs.spring.io/spring-data/solr/docs/4.3.0-RC1/api) - [Documentation](https://docs.spring.io/spring-data/solr/docs/4.3.0-RC1/reference/html) - [Changelog](https://docs.spring.io/spring-data/solr/docs/4.3.0-RC1/changelog.txt)
-   Spring Data KeyValue 2.4 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-keyvalue/2.4.0-RC1) - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/2.4.0-RC1/api) - [Documentation](https://docs.spring.io/spring-data/keyvalue/docs/2.4.0-RC1/reference/html) - [Changelog](https://docs.spring.io/spring-data/keyvalue/docs/2.4.0-RC1/changelog.txt)
-   Spring Data Neo4j 6.0 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-neo4j/6.0.0-RC1) - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/6.0.0-RC1/api) - [Documentation](https://docs.spring.io/spring-data/neo4j/docs/6.0.0-RC1/reference/html) - [Changelog](https://docs.spring.io/spring-data/neo4j/docs/6.0.0-RC1/changelog.txt)
-   Spring Data R2DBC 1.2 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-r2dbc/1.2.0-RC1) - [Javadoc](https://docs.spring.io/spring-data/r2dbc/docs/1.2.0-RC1/api) - [Documentation](https://docs.spring.io/spring-data/r2dbc/docs/1.2.0-RC1/reference/html) - [Changelog](https://docs.spring.io/spring-data/r2dbc/docs/1.2.0-RC1/changelog.txt)
-   Spring Data LDAP 2.4 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-ldap/2.4.0-RC1) - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/2.4.0-RC1/api) - [Documentation](https://docs.spring.io/spring-data/ldap/docs/2.4.0-RC1/reference/html) - [Changelog](https://docs.spring.io/spring-data/ldap/docs/2.4.0-RC1/changelog.txt)
-   Spring Data Envers 2.4 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-envers/2.4.0-RC1) - [Javadoc](https://docs.spring.io/spring-data/envers/docs/2.4.0-RC1/api) - [Documentation](https://docs.spring.io/spring-data/envers/docs/2.4.0-RC1/reference/html) - [Changelog](https://docs.spring.io/spring-data/envers/docs/2.4.0-RC1/changelog.txt)
-   Spring Data REST 3.4 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-rest-webmvc/3.4.0-RC1) - [Javadoc](https://docs.spring.io/spring-data/rest/docs/3.4.0-RC1/api) - [Documentation](https://docs.spring.io/spring-data/rest/docs/3.4.0-RC1/reference/html) - [Changelog](https://docs.spring.io/spring-data/rest/docs/3.4.0-RC1/changelog.txt)
-   Spring Data Redis 2.4 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-redis/2.4.0-RC1) - [Javadoc](https://docs.spring.io/spring-data/redis/docs/2.4.0-RC1/api) - [Documentation](https://docs.spring.io/spring-data/redis/docs/2.4.0-RC1/reference/html) - [Changelog](https://docs.spring.io/spring-data/redis/docs/2.4.0-RC1/changelog.txt)
-   Spring Data Elasticsearch 4.1 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-elasticsearch/4.1.0-RC1) - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/4.1.0-RC1/api) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/docs/4.1.0-RC1/reference/html) - [Changelog](https://docs.spring.io/spring-data/elasticsearch/docs/4.1.0-RC1/changelog.txt)
-   Spring Data Couchbase 4.1 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-couchbase/4.1.0-RC1) - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/4.1.0-RC1/api) - [Documentation](https://docs.spring.io/spring-data/couchbase/docs/4.1.0-RC1/reference/html) - [Changelog](https://docs.spring.io/spring-data/couchbase/docs/4.1.0-RC1/changelog.txt)