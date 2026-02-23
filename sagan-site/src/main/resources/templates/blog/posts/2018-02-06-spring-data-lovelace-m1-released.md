---
title: Spring Data Lovelace M1 released.
source: https://spring.io/blog/2018/02/06/spring-data-lovelace-m1-released
scraped: 2026-02-23T16:09:41.278Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Christoph Strobl |  February 06, 2018 | 1 Comment
---

# Spring Data Lovelace M1 released.

_Releases | Christoph Strobl |  February 06, 2018 | 1 Comment_

On behalf of the Spring Data team I’m happy to announce the first milestone of the [Lovelace](https://en.wikipedia.org/wiki/Ada_Lovelace) release train. The release ships over 200 tickets fixed! The most important new features are:

-   JPA 2.2 result streaming.
-   MongoDB Validator and JsonSchema support.
-   Support for MongoDB Change Streams.
-   Neo4J OGM 3.1 upgrade.
-   Exist/Count projections as well as a fluent template API in Spring Data for Apache Cassandra.
-   Spring Data for Apache Geode added JCache Annotation support.
-   Query By Example for Redis repository abstractions.
-   Spring Data REST offers more fine grained method exposure mechanisms.

In addition to that, we're happy to now have [Spring Data JDBC](https://github.com/spring-projects/spring-data-jdbc) join the release train with a first milestone. Make sure to check it out!

Please find a curated changelog in our [release train wiki](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Lovelace) or skim through a [full list](https://jira.spring.io/issues/?filter=15676) of changes in JIRA. Watch out for updated [Examples](https://github.com/spring-projects/spring-data-examples) and upcoming milestones.

The easiest way to play with the new version is declaring the `spring-data-releasetrain.version` property to `Lovelace-M1` in your Spring Boot 2 application.

We’re looking forward to your feedback!

-   Spring Data Commons 2.1 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-commons/2.1.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/commons/docs/2.1.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/commons/docs/2.1.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/commons/docs/2.1.0.M1/changelog.txt)
-   Spring Data JPA 2.1 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jpa/2.1.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/jpa/docs/2.1.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/jpa/docs/2.1.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/jpa/docs/2.1.0.M1/changelog.txt)
-   Spring Data KeyValue 2.1 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-keyvalue/2.1.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/keyvalue/docs/2.1.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/keyvalue/docs/2.1.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/keyvalue/docs/2.1.0.M1/changelog.txt)
-   Spring Data for Apache Cassandra 2.1 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-cassandra/2.1.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/cassandra/docs/2.1.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/cassandra/docs/2.1.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/cassandra/docs/2.1.0.M1/changelog.txt)
-   Spring Data Gemfire 2.1 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-gemfire/2.1.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/gemfire/docs/2.1.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/gemfire/docs/2.1.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/gemfire/docs/2.1.0.M1/changelog.txt)
-   Spring Data Neo4j 5.1 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-neo4j/5.1.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/neo4j/docs/5.1.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/neo4j/docs/5.1.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/neo4j/docs/5.1.0.M1/changelog.txt)
-   Spring Data MongoDB 2.1 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-mongodb/2.1.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/mongodb/docs/2.1.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/mongodb/docs/2.1.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/mongodb/docs/2.1.0.M1/changelog.txt)
-   Spring Data for Apache Solr 3.1 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-solr/3.1.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/solr/docs/3.1.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/solr/docs/3.1.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/solr/docs/3.1.0.M1/changelog.txt)
-   Spring Data for Apache Geode 2.1 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-geode/2.1.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/geode/docs/2.1.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/geode/docs/2.1.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/geode/docs/2.1.0.M1/changelog.txt)
-   Spring Data LDAP 2.1 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-ldap/2.1.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/ldap/docs/2.1.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/ldap/docs/2.1.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/ldap/docs/2.1.0.M1/changelog.txt)
-   Spring Data Envers 2.1 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-envers/2.1.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/envers/docs/2.1.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/envers/docs/2.1.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/envers/docs/2.1.0.M1/changelog.txt)
-   Spring Data REST 3.1 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-rest-webmvc/3.1.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/rest/docs/3.1.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/rest/docs/3.1.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/rest/docs/3.1.0.M1/changelog.txt)
-   Spring Data Redis 2.1 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-redis/2.1.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/redis/docs/2.1.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/redis/docs/2.1.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/redis/docs/2.1.0.M1/changelog.txt)
-   Spring Data Elasticsearch 3.1 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-elasticsearch/3.1.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/elasticsearch/docs/3.1.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/elasticsearch/docs/3.1.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/elasticsearch/docs/3.1.0.M1/changelog.txt)
-   Spring Data Couchbase 3.1 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-couchbase/3.1.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/couchbase/docs/3.1.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/couchbase/docs/3.1.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/couchbase/docs/3.1.0.M1/changelog.txt)
-   Spring Data JDBC 1.0 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jdbc/1.0.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/jdbc/docs/1.0.0.M1/api) - [Documentation](https://github.com/spring-projects/spring-data-jdbc/blob/1.0.0.M1/README.adoc) - [Changelog](http://docs.spring.io/spring-data/jdbc/docs/1.0.0.M1/changelog.txt)