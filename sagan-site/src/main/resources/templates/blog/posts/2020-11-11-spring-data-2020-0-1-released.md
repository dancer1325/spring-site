---
title: Spring Data 2020.0.1 released
source: https://spring.io/blog/2020/11/11/spring-data-2020-0-1-released
scraped: 2026-02-23T13:42:02.070Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  November 11, 2020 | 0 Comments
---

# Spring Data 2020.0.1 released

_Releases | Mark Paluch |  November 11, 2020 | 0 Comments_

On behalf of the team, I'm pleased to announce Spring Data service release `2020.0.1`. This service release is built on top of Spring Framework `5.3.1` and Reactor `2020.0.1`. It contains mostly dependency upgrades and fixes.

Spring Data `2020.0.1` ships [34 improvements and fixes](https://jira.spring.io/issues/?filter=17237).

This release will be picked up by the upcoming Spring Boot `2.4.0` release for your convenience.

To round things off, here are the links to the individual modules along with their documentation:

-   Spring Data Commons 2.4.1 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-commons/2.4.1) - [Javadoc](https://docs.spring.io/spring-data/commons/docs/2.4.1/api) - [Documentation](https://docs.spring.io/spring-data/commons/docs/2.4.1/reference/html) - [Changelog](https://docs.spring.io/spring-data/commons/docs/2.4.1/changelog.txt)
-   Spring Data JDBC 2.1.1 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-jdbc/2.1.1) - [Javadoc](https://docs.spring.io/spring-data/jdbc/docs/2.1.1/api) - [Documentation](https://docs.spring.io/spring-data/jdbc/docs/2.1.1/reference/html) - [Changelog](https://docs.spring.io/spring-data/jdbc/docs/2.1.1/changelog.txt)
-   Spring Data JPA 2.4.1 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-jpa/2.4.1) - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/2.4.1/api) - [Documentation](https://docs.spring.io/spring-data/jpa/docs/2.4.1/reference/html) - [Changelog](https://docs.spring.io/spring-data/jpa/docs/2.4.1/changelog.txt)
-   Spring Data for Apache Cassandra 3.1.1 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-cassandra/3.1.1) - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/3.1.1/api) - [Documentation](https://docs.spring.io/spring-data/cassandra/docs/3.1.1/reference/html) - [Changelog](https://docs.spring.io/spring-data/cassandra/docs/3.1.1/changelog.txt)
-   Spring Data MongoDB 3.1.1 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-mongodb/3.1.1) - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/3.1.1/api) - [Documentation](https://docs.spring.io/spring-data/mongodb/docs/3.1.1/reference/html) - [Changelog](https://docs.spring.io/spring-data/mongodb/docs/3.1.1/changelog.txt)
-   Spring Data KeyValue 2.4.1 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-keyvalue/2.4.1) - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/2.4.1/api) - [Documentation](https://docs.spring.io/spring-data/keyvalue/docs/2.4.1/reference/html) - [Changelog](https://docs.spring.io/spring-data/keyvalue/docs/2.4.1/changelog.txt)
-   Spring Data Neo4j 6.0.1 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-neo4j/6.0.1) - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/6.0.1/api) - [Documentation](https://docs.spring.io/spring-data/neo4j/docs/6.0.1/reference/html) - [Changelog](https://docs.spring.io/spring-data/neo4j/docs/6.0.1/changelog.txt)
-   Spring Data for Apache Geode 2.4.1 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-geode/2.4.1) - [Javadoc](https://docs.spring.io/spring-data/geode/docs/2.4.1/api) - [Documentation](https://docs.spring.io/spring-data/geode/docs/2.4.1/reference/html) - [Changelog](https://docs.spring.io/spring-data/geode/docs/2.4.1/changelog.txt)
-   Spring Data for Apache Solr 4.3.1 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-solr/4.3.1) - [Javadoc](https://docs.spring.io/spring-data/solr/docs/4.3.1/api) - [Documentation](https://docs.spring.io/spring-data/solr/docs/4.3.1/reference/html) - [Changelog](https://docs.spring.io/spring-data/solr/docs/4.3.1/changelog.txt)
-   Spring Data R2DBC 1.2.1 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-r2dbc/1.2.1) - [Javadoc](https://docs.spring.io/spring-data/r2dbc/docs/1.2.1/api) - [Documentation](https://docs.spring.io/spring-data/r2dbc/docs/1.2.1/reference/html) - [Changelog](https://docs.spring.io/spring-data/r2dbc/docs/1.2.1/changelog.txt)
-   Spring Data LDAP 2.4.1 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-ldap/2.4.1) - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/2.4.1/api) - [Documentation](https://docs.spring.io/spring-data/ldap/docs/2.4.1/reference/html) - [Changelog](https://docs.spring.io/spring-data/ldap/docs/2.4.1/changelog.txt)
-   Spring Data Envers 2.4.1 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-envers/2.4.1) - [Javadoc](https://docs.spring.io/spring-data/envers/docs/2.4.1/api) - [Documentation](https://docs.spring.io/spring-data/envers/docs/2.4.1/reference/html) - [Changelog](https://docs.spring.io/spring-data/envers/docs/2.4.1/changelog.txt)
-   Spring Data REST 3.4.1 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-rest-webmvc/3.4.1) - [Javadoc](https://docs.spring.io/spring-data/rest/docs/3.4.1/api) - [Documentation](https://docs.spring.io/spring-data/rest/docs/3.4.1/reference/html) - [Changelog](https://docs.spring.io/spring-data/rest/docs/3.4.1/changelog.txt)
-   Spring Data Redis 2.4.1 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-redis/2.4.1) - [Javadoc](https://docs.spring.io/spring-data/redis/docs/2.4.1/api) - [Documentation](https://docs.spring.io/spring-data/redis/docs/2.4.1/reference/html) - [Changelog](https://docs.spring.io/spring-data/redis/docs/2.4.1/changelog.txt)
-   Spring Data Elasticsearch 4.1.1 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-elasticsearch/4.1.1) - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/4.1.1/api) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/docs/4.1.1/reference/html) - [Changelog](https://docs.spring.io/spring-data/elasticsearch/docs/4.1.1/changelog.txt)
-   Spring Data Couchbase 4.1.1 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-couchbase/4.1.1) - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/4.1.1/api) - [Documentation](https://docs.spring.io/spring-data/couchbase/docs/4.1.1/reference/html) - [Changelog](https://docs.spring.io/spring-data/couchbase/docs/4.1.1/changelog.txt)