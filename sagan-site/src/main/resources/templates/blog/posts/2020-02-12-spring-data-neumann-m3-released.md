---
title: Spring Data Neumann M3 released
source: https://spring.io/blog/2020/02/12/spring-data-neumann-m3-released
scraped: 2026-02-23T14:11:52.381Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  February 12, 2020 | 0 Comments
---

# Spring Data Neumann M3 released

_Releases | Mark Paluch |  February 12, 2020 | 0 Comments_

On behalf of the Spring Data team, I’m pleased to announce the third milestone of the [Neumann](https://en.wikipedia.org/wiki/Klara_Dan_von_Neumann) release train. This release ships [exactly 75 tickets fixed](https://jira.spring.io/issues/?filter=16735) and will be picked up by Spring Boot 2.3 M2 in the near future.

The most important new features are:

-   Upgrade to MongoDB driver 4 (beta).
-   Joda-Time and ThreeTenBackport support is now deprecated in favor of JSR-310.
-   Geo Distance sort support in Elasticsearch.
-   Quoting of table and column names in Spring Data JDBC enabled by default.

You can find a curated changelog in our [release train wiki](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Neumann) or skim through a [full list of changes in JIRA](https://jira.spring.io/issues/?filter=16735).

The next and last milestone (M4) is scheduled for March before entering the RC phase in April. Expect the driver upgrade for Couchbase to be shipped with the next milestone release.

We’re looking forward to your feedback!

To round things off, here's the full list that takes you to the artifacts and documentation:

-   Spring Data Commons 2.3 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-commons/2.3.0.M3) - [Javadoc](https://docs.spring.io/spring-data/commons/docs/2.3.0.M3/api) - [Documentation](https://docs.spring.io/spring-data/commons/docs/2.3.0.M3/reference/html) - [Changelog](https://docs.spring.io/spring-data/commons/docs/2.3.0.M3/changelog.txt)
-   Spring Data JDBC 2.0 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jdbc/2.0.0.M3) - [Javadoc](https://docs.spring.io/spring-data/jdbc/docs/2.0.0.M3/api) - [Documentation](https://docs.spring.io/spring-data/jdbc/docs/2.0.0.M3/reference/html) - [Changelog](https://docs.spring.io/spring-data/jdbc/docs/2.0.0.M3/changelog.txt)
-   Spring Data JPA 2.3 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jpa/2.3.0.M3) - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/2.3.0.M3/api) - [Documentation](https://docs.spring.io/spring-data/jpa/docs/2.3.0.M3/reference/html) - [Changelog](https://docs.spring.io/spring-data/jpa/docs/2.3.0.M3/changelog.txt)
-   Spring Data KeyValue 2.3 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-keyvalue/2.3.0.M3) - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/2.3.0.M3/api) - [Documentation](https://docs.spring.io/spring-data/keyvalue/docs/2.3.0.M3/reference/html) - [Changelog](https://docs.spring.io/spring-data/keyvalue/docs/2.3.0.M3/changelog.txt)
-   Spring Data for Apache Solr 4.2 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-solr/4.2.0.M3) - [Javadoc](https://docs.spring.io/spring-data/solr/docs/4.2.0.M3/api) - [Documentation](https://docs.spring.io/spring-data/solr/docs/4.2.0.M3/reference/html) - [Changelog](https://docs.spring.io/spring-data/solr/docs/4.2.0.M3/changelog.txt)
-   Spring Data Neo4j 5.3 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-neo4j/5.3.0.M3) - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/5.3.0.M3/api) - [Documentation](https://docs.spring.io/spring-data/neo4j/docs/5.3.0.M3/reference/html) - [Changelog](https://docs.spring.io/spring-data/neo4j/docs/5.3.0.M3/changelog.txt)
-   Spring Data for Apache Geode 2.3 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-geode/2.3.0.M3) - [Javadoc](https://docs.spring.io/spring-data/geode/docs/2.3.0.M3/api) - [Documentation](https://docs.spring.io/spring-data/geode/docs/2.3.0.M3/reference/html) - [Changelog](https://docs.spring.io/spring-data/geode/docs/2.3.0.M3/changelog.txt)
-   Spring Data MongoDB 3.0 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-mongodb/3.0.0.M3) - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/3.0.0.M3/api) - [Documentation](https://docs.spring.io/spring-data/mongodb/docs/3.0.0.M3/reference/html) - [Changelog](https://docs.spring.io/spring-data/mongodb/docs/3.0.0.M3/changelog.txt)
-   Spring Data for Apache Cassandra 3.0 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-cassandra/3.0.0.M3) - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/3.0.0.M3/api) - [Documentation](https://docs.spring.io/spring-data/cassandra/docs/3.0.0.M3/reference/html) - [Changelog](https://docs.spring.io/spring-data/cassandra/docs/3.0.0.M3/changelog.txt)
-   Spring Data R2DBC 1.1 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-r2dbc/1.1.0.M3) - [Javadoc](https://docs.spring.io/spring-data/r2dbc/docs/1.1.0.M3/api) - [Documentation](https://docs.spring.io/spring-data/r2dbc/docs/1.1.0.M3/reference/html) - [Changelog](https://docs.spring.io/spring-data/r2dbc/docs/1.1.0.M3/changelog.txt)
-   Spring Data LDAP 2.3 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-ldap/2.3.0.M3) - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/2.3.0.M3/api) - [Documentation](https://docs.spring.io/spring-data/ldap/docs/2.3.0.M3/reference/html) - [Changelog](https://docs.spring.io/spring-data/ldap/docs/2.3.0.M3/changelog.txt)
-   Spring Data Envers 2.3 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-envers/2.3.0.M3) - [Javadoc](https://docs.spring.io/spring-data/envers/docs/2.3.0.M3/api) - [Documentation](https://docs.spring.io/spring-data/envers/docs/2.3.0.M3/reference/html) - [Changelog](https://docs.spring.io/spring-data/envers/docs/2.3.0.M3/changelog.txt)
-   Spring Data REST 3.3 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-rest-webmvc/3.3.0.M3) - [Javadoc](https://docs.spring.io/spring-data/rest/docs/3.3.0.M3/api) - [Documentation](https://docs.spring.io/spring-data/rest/docs/3.3.0.M3/reference/html) - [Changelog](https://docs.spring.io/spring-data/rest/docs/3.3.0.M3/changelog.txt)
-   Spring Data Redis 2.3 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-redis/2.3.0.M3) - [Javadoc](https://docs.spring.io/spring-data/redis/docs/2.3.0.M3/api) - [Documentation](https://docs.spring.io/spring-data/redis/docs/2.3.0.M3/reference/html) - [Changelog](https://docs.spring.io/spring-data/redis/docs/2.3.0.M3/changelog.txt)
-   Spring Data Elasticsearch 4.0 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-elasticsearch/4.0.0.M3) - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/4.0.0.M3/api) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/docs/4.0.0.M3/reference/html) - [Changelog](https://docs.spring.io/spring-data/elasticsearch/docs/4.0.0.M3/changelog.txt)
-   Spring Data Couchbase 4.0 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-couchbase/4.0.0.M3) - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/4.0.0.M3/api) - [Documentation](https://docs.spring.io/spring-data/couchbase/docs/4.0.0.M3/reference/html) - [Changelog](https://docs.spring.io/spring-data/couchbase/docs/4.0.0.M3/changelog.txt)