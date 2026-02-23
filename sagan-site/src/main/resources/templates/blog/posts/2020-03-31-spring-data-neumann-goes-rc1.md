---
title: Spring Data Neumann goes RC1
source: https://spring.io/blog/2020/03/31/spring-data-neumann-goes-rc1
scraped: 2026-02-23T14:06:10.583Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  March 31, 2020 | 3 Comments
---

# Spring Data Neumann goes RC1

_Releases | Mark Paluch |  March 31, 2020 | 3 Comments_

I'm pleased to announce that Spring Data Neumann has entered the release candidate phase with [86 tickets fixed](https://jira.spring.io/issues/?filter=16832). This release is the first of two release candidates. This release candidate ships with a series of noteworthy changes:

-   Upgrade to Couchbase SDK 3.
-   Spring Data MongoDB no longer automatically creates indexes from `@Indexed` annotations by default.
-   The Cassandra module supports configurable naming strategies and ships with a revised data type resolution mechanism.
-   Spring Data Elasticsearch now supports auditing and entity callbacks.
-   Support for query derivation in Spring Data R2DBC.
-   Dialect discovery for Spring Data JDBC, supporting H2, HSQLDB, Postgres, MariaDB, MySQL, and SQL Server.
-   Upgrade to Querydsl 4.3.
-   Ready for JDK 14.

We're working now towards a second release candidate that is, at this point, scheduled for late April and a GA release in early May. Stay tuned for the first Spring Boot 2.3 release candidate in the next days.

Lastly, here are the links to the individual modules along with their documentation:

-   Spring Data Commons 2.3 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-commons/2.3.0.RC1) - [Javadoc](https://docs.spring.io/spring-data/commons/docs/2.3.0.RC1/api) - [Documentation](https://docs.spring.io/spring-data/commons/docs/2.3.0.RC1/reference/html) - [Changelog](https://docs.spring.io/spring-data/commons/docs/2.3.0.RC1/changelog.txt)
-   Spring Data JDBC 2.0 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jdbc/2.0.0.RC1) - [Javadoc](https://docs.spring.io/spring-data/jdbc/docs/2.0.0.RC1/api) - [Documentation](https://docs.spring.io/spring-data/jdbc/docs/2.0.0.RC1/reference/html) - [Changelog](https://docs.spring.io/spring-data/jdbc/docs/2.0.0.RC1/changelog.txt)
-   Spring Data JPA 2.3 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jpa/2.3.0.RC1) - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/2.3.0.RC1/api) - [Documentation](https://docs.spring.io/spring-data/jpa/docs/2.3.0.RC1/reference/html) - [Changelog](https://docs.spring.io/spring-data/jpa/docs/2.3.0.RC1/changelog.txt)
-   Spring Data for Apache Cassandra 3.0 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-cassandra/3.0.0.RC1) - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/3.0.0.RC1/api) - [Documentation](https://docs.spring.io/spring-data/cassandra/docs/3.0.0.RC1/reference/html) - [Changelog](https://docs.spring.io/spring-data/cassandra/docs/3.0.0.RC1/changelog.txt)
-   Spring Data KeyValue 2.3 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-keyvalue/2.3.0.RC1) - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/2.3.0.RC1/api) - [Documentation](https://docs.spring.io/spring-data/keyvalue/docs/2.3.0.RC1/reference/html) - [Changelog](https://docs.spring.io/spring-data/keyvalue/docs/2.3.0.RC1/changelog.txt)
-   Spring Data for Apache Solr 4.2 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-solr/4.2.0.RC1) - [Javadoc](https://docs.spring.io/spring-data/solr/docs/4.2.0.RC1/api) - [Documentation](https://docs.spring.io/spring-data/solr/docs/4.2.0.RC1/reference/html) - [Changelog](https://docs.spring.io/spring-data/solr/docs/4.2.0.RC1/changelog.txt)
-   Spring Data for Apache Geode 2.3 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-geode/2.3.0.RC1) - [Javadoc](https://docs.spring.io/spring-data/geode/docs/2.3.0.RC1/api) - [Documentation](https://docs.spring.io/spring-data/geode/docs/2.3.0.RC1/reference/html) - [Changelog](https://docs.spring.io/spring-data/geode/docs/2.3.0.RC1/changelog.txt)
-   Spring Data Neo4j 5.3 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-neo4j/5.3.0.RC1) - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/5.3.0.RC1/api) - [Documentation](https://docs.spring.io/spring-data/neo4j/docs/5.3.0.RC1/reference/html) - [Changelog](https://docs.spring.io/spring-data/neo4j/docs/5.3.0.RC1/changelog.txt)
-   Spring Data MongoDB 3.0 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-mongodb/3.0.0.RC1) - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/3.0.0.RC1/api) - [Documentation](https://docs.spring.io/spring-data/mongodb/docs/3.0.0.RC1/reference/html) - [Changelog](https://docs.spring.io/spring-data/mongodb/docs/3.0.0.RC1/changelog.txt)
-   Spring Data R2DBC 1.1 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-r2dbc/1.1.0.RC1) - [Javadoc](https://docs.spring.io/spring-data/r2dbc/docs/1.1.0.RC1/api) - [Documentation](https://docs.spring.io/spring-data/r2dbc/docs/1.1.0.RC1/reference/html) - [Changelog](https://docs.spring.io/spring-data/r2dbc/docs/1.1.0.RC1/changelog.txt)
-   Spring Data LDAP 2.3 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-ldap/2.3.0.RC1) - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/2.3.0.RC1/api) - [Documentation](https://docs.spring.io/spring-data/ldap/docs/2.3.0.RC1/reference/html) - [Changelog](https://docs.spring.io/spring-data/ldap/docs/2.3.0.RC1/changelog.txt)
-   Spring Data Envers 2.3 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-envers/2.3.0.RC1) - [Javadoc](https://docs.spring.io/spring-data/envers/docs/2.3.0.RC1/api) - [Documentation](https://docs.spring.io/spring-data/envers/docs/2.3.0.RC1/reference/html) - [Changelog](https://docs.spring.io/spring-data/envers/docs/2.3.0.RC1/changelog.txt)
-   Spring Data REST 3.3 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-rest-webmvc/3.3.0.RC1) - [Javadoc](https://docs.spring.io/spring-data/rest/docs/3.3.0.RC1/api) - [Documentation](https://docs.spring.io/spring-data/rest/docs/3.3.0.RC1/reference/html) - [Changelog](https://docs.spring.io/spring-data/rest/docs/3.3.0.RC1/changelog.txt)
-   Spring Data Redis 2.3 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-redis/2.3.0.RC1) - [Javadoc](https://docs.spring.io/spring-data/redis/docs/2.3.0.RC1/api) - [Documentation](https://docs.spring.io/spring-data/redis/docs/2.3.0.RC1/reference/html) - [Changelog](https://docs.spring.io/spring-data/redis/docs/2.3.0.RC1/changelog.txt)
-   Spring Data Elasticsearch 4.0 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-elasticsearch/4.0.0.RC1) - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/4.0.0.RC1/api) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/docs/4.0.0.RC1/reference/html) - [Changelog](https://docs.spring.io/spring-data/elasticsearch/docs/4.0.0.RC1/changelog.txt)
-   Spring Data Couchbase 4.0 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-couchbase/4.0.0.RC1) - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/4.0.0.RC1/api) - [Documentation](https://docs.spring.io/spring-data/couchbase/docs/4.0.0.RC1/reference/html) - [Changelog](https://docs.spring.io/spring-data/couchbase/docs/4.0.0.RC1/changelog.txt)