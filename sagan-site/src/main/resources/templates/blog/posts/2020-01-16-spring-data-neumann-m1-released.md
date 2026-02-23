---
title: Spring Data Neumann M1 released
source: https://spring.io/blog/2020/01/16/spring-data-neumann-m1-released
scraped: 2026-02-23T14:14:08.590Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  January 16, 2020 | 0 Comments
---

# Spring Data Neumann M1 released

_Releases | Mark Paluch |  January 16, 2020 | 0 Comments_

On behalf of the Spring Data team, I’m happy to announce the first milestone of the [Neumann](https://en.wikipedia.org/wiki/Klara_Dan_von_Neumann) release train. This release ships [over 260 tickets fixed](https://jira.spring.io/issues/?filter=16731). The Neumann release train is planned to ship major driver upgrades. This initial milestone covers all of our major version increments and ships driver upgrades to Elasticsearch 7 and the DataStax Java driver 4.3 for Apache Cassandra.

The most important new features are:

-   Repository support for Kotlin Coroutines.
-   Upgrade to Cassandra Driver 4.
-   Upgrade to Elasticsearch 7.
-   Major refactoring of the Spring Data Elasticsearch Template API. Reactive client based on `WebClient` and reactive repository support.
-   Upgrade to Solr 8.4.
-   Upgrade to Geode 1.10.
-   Support for fully immutable types (setting properties via copy constructors).
-   Spring Data R2DBC is part of the Spring Data release train.

Find a curated changelog in our [release train wiki](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Neumann) or skim through a [full list of changes in JIRA](https://jira.spring.io/issues/?filter=16731).

We're working towards a second milestone in February and a third one in March. The next milestone Neumann M2 is planned to ship with driver upgrades for MongoDB and Couchbase. Finally, the GA release is planned for late April.

We’re looking forward to your feedback!

To round things off, here's the full list that takes you to the artifacts and documentation:

-   Spring Data Commons 2.3 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-commons/2.3.0.M1) - [Javadoc](https://docs.spring.io/spring-data/commons/docs/2.3.0.M1/api) - [Documentation](https://docs.spring.io/spring-data/commons/docs/2.3.0.M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/commons/docs/2.3.0.M1/changelog.txt)
-   Spring Data JDBC 2.0 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jdbc/2.0.0.M1) - [Javadoc](https://docs.spring.io/spring-data/jdbc/docs/2.0.0.M1/api) - [Documentation](https://docs.spring.io/spring-data/jdbc/docs/2.0.0.M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/jdbc/docs/2.0.0.M1/changelog.txt)
-   Spring Data JPA 2.3 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jpa/2.3.0.M1) - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/2.3.0.M1/api) - [Documentation](https://docs.spring.io/spring-data/jpa/docs/2.3.0.M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/jpa/docs/2.3.0.M1/changelog.txt)
-   Spring Data KeyValue 2.3 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-keyvalue/2.3.0.M1) - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/2.3.0.M1/api) - [Documentation](https://docs.spring.io/spring-data/keyvalue/docs/2.3.0.M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/keyvalue/docs/2.3.0.M1/changelog.txt)
-   Spring Data Neo4j 5.3 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-neo4j/5.3.0.M1) - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/5.3.0.M1/api) - [Documentation](https://docs.spring.io/spring-data/neo4j/docs/5.3.0.M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/neo4j/docs/5.3.0.M1/changelog.txt)
-   Spring Data MongoDB 3.0 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-mongodb/3.0.0.M1) - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/3.0.0.M1/api) - [Documentation](https://docs.spring.io/spring-data/mongodb/docs/3.0.0.M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/mongodb/docs/3.0.0.M1/changelog.txt)
-   Spring Data for Apache Cassandra 3.0 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-cassandra/3.0.0.M1) - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/3.0.0.M1/api) - [Documentation](https://docs.spring.io/spring-data/cassandra/docs/3.0.0.M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/cassandra/docs/3.0.0.M1/changelog.txt)
-   Spring Data for Apache Geode 2.3 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-geode/2.3.0.M1) - [Javadoc](https://docs.spring.io/spring-data/geode/docs/2.3.0.M1/api) - [Documentation](https://docs.spring.io/spring-data/geode/docs/2.3.0.M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/geode/docs/2.3.0.M1/changelog.txt)
-   Spring Data for Apache Solr 4.2 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-solr/4.2.0.M1) - [Javadoc](https://docs.spring.io/spring-data/solr/docs/4.2.0.M1/api) - [Documentation](https://docs.spring.io/spring-data/solr/docs/4.2.0.M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/solr/docs/4.2.0.M1/changelog.txt)
-   Spring Data R2DBC 1.1 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-r2dbc/1.1.0.M1) - [Javadoc](https://docs.spring.io/spring-data/r2dbc/docs/1.1.0.M1/api) - [Documentation](https://docs.spring.io/spring-data/r2dbc/docs/1.1.0.M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/r2dbc/docs/1.1.0.M1/changelog.txt)
-   Spring Data LDAP 2.3 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-ldap/2.3.0.M1) - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/2.3.0.M1/api) - [Documentation](https://docs.spring.io/spring-data/ldap/docs/2.3.0.M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/ldap/docs/2.3.0.M1/changelog.txt)
-   Spring Data Envers 2.3 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-envers/2.3.0.M1) - [Javadoc](https://docs.spring.io/spring-data/envers/docs/2.3.0.M1/api) - [Documentation](https://docs.spring.io/spring-data/envers/docs/2.3.0.M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/envers/docs/2.3.0.M1/changelog.txt)
-   Spring Data REST 3.3 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-rest-webmvc/3.3.0.M1) - [Javadoc](https://docs.spring.io/spring-data/rest/docs/3.3.0.M1/api) - [Documentation](https://docs.spring.io/spring-data/rest/docs/3.3.0.M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/rest/docs/3.3.0.M1/changelog.txt)
-   Spring Data Redis 2.3 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-redis/2.3.0.M1) - [Javadoc](https://docs.spring.io/spring-data/redis/docs/2.3.0.M1/api) - [Documentation](https://docs.spring.io/spring-data/redis/docs/2.3.0.M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/redis/docs/2.3.0.M1/changelog.txt)
-   Spring Data Elasticsearch 4.0 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-elasticsearch/4.0.0.M1) - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/4.0.0.M1/api) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/docs/4.0.0.M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/elasticsearch/docs/4.0.0.M1/changelog.txt)
-   Spring Data Couchbase 4.0 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-couchbase/4.0.0.M1) - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/4.0.0.M1/api) - [Documentation](https://docs.spring.io/spring-data/couchbase/docs/4.0.0.M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/couchbase/docs/4.0.0.M1/changelog.txt)