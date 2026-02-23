---
title: Spring Data 2020.0.0-M2 released
source: https://spring.io/blog/2020/08/12/spring-data-2020-0-0-m2-released
scraped: 2026-02-23T13:51:45.987Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  August 12, 2020 | 0 Comments
---

# Spring Data 2020.0.0-M2 released

_Releases | Mark Paluch |  August 12, 2020 | 0 Comments_

On behalf of the Spring Data team I’m delighted to announce the second milestone of the `2020.0.0` release train (codename "Ockham"). This release ships almost 120 tickets fixed! The most important new features are:

-   Support for reactive SpEL context extensions.
-   Support for reactive auditing in Cassandra, Elasticsearch, MongoDB, and R2DBC.
-   Integration of Spring Data Neo4j 6.0, which is a rewrite of the module without relying on Neo4j OGM.
-   Refactoring of Spring Data R2DBC on top of Spring Framework's R2DBC module.
-   Oracle dialect for Spring Data JDBC.

Find a curated changelog in our [release train wiki](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Ockham-%282020.0.0%29) or skim through a [full list of changes in JIRA](https://jira.spring.io/issues/?filter=17031). Next up is `2020.0.0-RC1` planned for mid-September that will ship refinements for Redis 6. The GA release is scheduled mid-October.

Finally, here are the detailed links to each artifact, documentation, and changelog:

-   Spring Data Commons 2.4 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-commons/2.4.0-M2) - [Javadoc](https://docs.spring.io/spring-data/commons/docs/2.4.0-M2/api) - [Documentation](https://docs.spring.io/spring-data/commons/docs/2.4.0-M2/reference/html) - [Changelog](https://docs.spring.io/spring-data/commons/docs/2.4.0-M2/changelog.txt)
-   Spring Data JDBC 2.1 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jdbc/2.1.0-M2) - [Javadoc](https://docs.spring.io/spring-data/jdbc/docs/2.1.0-M2/api) - [Documentation](https://docs.spring.io/spring-data/jdbc/docs/2.1.0-M2/reference/html) - [Changelog](https://docs.spring.io/spring-data/jdbc/docs/2.1.0-M2/changelog.txt)
-   Spring Data JPA 2.4 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jpa/2.4.0-M2) - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/2.4.0-M2/api) - [Documentation](https://docs.spring.io/spring-data/jpa/docs/2.4.0-M2/reference/html) - [Changelog](https://docs.spring.io/spring-data/jpa/docs/2.4.0-M2/changelog.txt)
-   Spring Data for Apache Cassandra 3.1 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-cassandra/3.1.0-M2) - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/3.1.0-M2/api) - [Documentation](https://docs.spring.io/spring-data/cassandra/docs/3.1.0-M2/reference/html) - [Changelog](https://docs.spring.io/spring-data/cassandra/docs/3.1.0-M2/changelog.txt)
-   Spring Data MongoDB 3.1 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-mongodb/3.1.0-M2) - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/3.1.0-M2/api) - [Documentation](https://docs.spring.io/spring-data/mongodb/docs/3.1.0-M2/reference/html) - [Changelog](https://docs.spring.io/spring-data/mongodb/docs/3.1.0-M2/changelog.txt)
-   Spring Data for Apache Solr 4.3 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-solr/4.3.0-M2) - [Javadoc](https://docs.spring.io/spring-data/solr/docs/4.3.0-M2/api) - [Documentation](https://docs.spring.io/spring-data/solr/docs/4.3.0-M2/reference/html) - [Changelog](https://docs.spring.io/spring-data/solr/docs/4.3.0-M2/changelog.txt)
-   Spring Data KeyValue 2.4 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-keyvalue/2.4.0-M2) - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/2.4.0-M2/api) - [Documentation](https://docs.spring.io/spring-data/keyvalue/docs/2.4.0-M2/reference/html) - [Changelog](https://docs.spring.io/spring-data/keyvalue/docs/2.4.0-M2/changelog.txt)
-   Spring Data Neo4j 6.0 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-neo4j/6.0.0-M2) - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/6.0.0-M2/api) - [Documentation](https://docs.spring.io/spring-data/neo4j/docs/6.0.0-M2/reference/html) - [Changelog](https://docs.spring.io/spring-data/neo4j/docs/6.0.0-M2/changelog.txt)
-   Spring Data for Apache Geode 2.4 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-geode/2.4.0-M2) - [Javadoc](https://docs.spring.io/spring-data/geode/docs/2.4.0-M2/api) - [Documentation](https://docs.spring.io/spring-data/geode/docs/2.4.0-M2/reference/html) - [Changelog](https://docs.spring.io/spring-data/geode/docs/2.4.0-M2/changelog.txt)
-   Spring Data R2DBC 1.2 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-r2dbc/1.2.0-M2) - [Javadoc](https://docs.spring.io/spring-data/r2dbc/docs/1.2.0-M2/api) - [Documentation](https://docs.spring.io/spring-data/r2dbc/docs/1.2.0-M2/reference/html) - [Changelog](https://docs.spring.io/spring-data/r2dbc/docs/1.2.0-M2/changelog.txt)
-   Spring Data LDAP 2.4 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-ldap/2.4.0-M2) - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/2.4.0-M2/api) - [Documentation](https://docs.spring.io/spring-data/ldap/docs/2.4.0-M2/reference/html) - [Changelog](https://docs.spring.io/spring-data/ldap/docs/2.4.0-M2/changelog.txt)
-   Spring Data Envers 2.4 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-envers/2.4.0-M2) - [Javadoc](https://docs.spring.io/spring-data/envers/docs/2.4.0-M2/api) - [Documentation](https://docs.spring.io/spring-data/envers/docs/2.4.0-M2/reference/html) - [Changelog](https://docs.spring.io/spring-data/envers/docs/2.4.0-M2/changelog.txt)
-   Spring Data REST 3.4 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-rest-webmvc/3.4.0-M2) - [Javadoc](https://docs.spring.io/spring-data/rest/docs/3.4.0-M2/api) - [Documentation](https://docs.spring.io/spring-data/rest/docs/3.4.0-M2/reference/html) - [Changelog](https://docs.spring.io/spring-data/rest/docs/3.4.0-M2/changelog.txt)
-   Spring Data Redis 2.4 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-redis/2.4.0-M2) - [Javadoc](https://docs.spring.io/spring-data/redis/docs/2.4.0-M2/api) - [Documentation](https://docs.spring.io/spring-data/redis/docs/2.4.0-M2/reference/html) - [Changelog](https://docs.spring.io/spring-data/redis/docs/2.4.0-M2/changelog.txt)
-   Spring Data Elasticsearch 4.1 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-elasticsearch/4.1.0-M2) - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/4.1.0-M2/api) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/docs/4.1.0-M2/reference/html) - [Changelog](https://docs.spring.io/spring-data/elasticsearch/docs/4.1.0-M2/changelog.txt)
-   Spring Data Couchbase 4.1 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-couchbase/4.1.0-M2) - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/4.1.0-M2/api) - [Documentation](https://docs.spring.io/spring-data/couchbase/docs/4.1.0-M2/reference/html) - [Changelog](https://docs.spring.io/spring-data/couchbase/docs/4.1.0-M2/changelog.txt)