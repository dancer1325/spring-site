---
title: Spring Data Moore goes GA
source: https://spring.io/blog/2019/10/01/spring-data-moore-goes-ga
scraped: 2026-02-23T14:35:13.370Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  October 01, 2019 | 1 Comment
---

# Spring Data Moore goes GA

_Releases | Mark Paluch |  October 01, 2019 | 1 Comment_

On behalf of the community and everyone who has contributed, it’s my pleasure to announce that Spring Data Moore is now generally available from Maven Central and our [release repository](https://repo.spring.io/release).

Spring Data Moore requires JDK 8 or higher and specifically supports JDK 11 as the current long-term support branch as well as JDK 13 as the latest OpenJDK release. Here's an excerpt from the [960 tickets](https://jira.spring.io/issues/?filter=16435) that were addressed with this release train:

-   Imperative and Reactive EntityCallback APIs for immutable object support and as a base for future reactive auditing
-   First-class support for Kotlin Coroutines
-   Performance improvements
-   Declarative aggregations and reactive Querydsl support Spring Data MongoDB repositories
-   Reactive transaction manager in Spring Data MongoDB
-   Reactive support for Spring Data Elasticsearch
-   Redis Streams support with Spring Data Redis

We will follow up with a detailed blog post in the coming days to explain selected features in detail.

To round things off, here are links to the reference documentation, changelogs, and artifacts of the individual project releases:

-   Spring Data Commons 2.2 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-commons/2.2.0.RELEASE) - [Javadoc](https://docs.spring.io/spring-data/commons/docs/2.2.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/commons/docs/2.2.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/commons/docs/2.2.0.RELEASE/changelog.txt)
-   Spring Data JDBC 1.1 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-jdbc/1.1.0.RELEASE) - [Javadoc](https://docs.spring.io/spring-data/jdbc/docs/1.1.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/jdbc/docs/1.1.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/jdbc/docs/1.1.0.RELEASE/changelog.txt)
-   Spring Data JPA 2.2 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-jpa/2.2.0.RELEASE) - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/2.2.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/jpa/docs/2.2.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/jpa/docs/2.2.0.RELEASE/changelog.txt)
-   Spring Data MongoDB 2.2 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-mongodb/2.2.0.RELEASE) - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/2.2.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/mongodb/docs/2.2.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/mongodb/docs/2.2.0.RELEASE/changelog.txt)
-   Spring Data KeyValue 2.2 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-keyvalue/2.2.0.RELEASE) - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/2.2.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/keyvalue/docs/2.2.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/keyvalue/docs/2.2.0.RELEASE/changelog.txt)
-   Spring Data for Apache Cassandra 2.2 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-cassandra/2.2.0.RELEASE) - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/2.2.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/cassandra/docs/2.2.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/cassandra/docs/2.2.0.RELEASE/changelog.txt)
-   Spring Data for Apache Solr 4.1 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-solr/4.1.0.RELEASE) - [Javadoc](https://docs.spring.io/spring-data/solr/docs/4.1.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/solr/docs/4.1.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/solr/docs/4.1.0.RELEASE/changelog.txt)
-   Spring Data Gemfire 2.2 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-gemfire/2.2.0.RELEASE) - [Javadoc](https://docs.spring.io/spring-data/gemfire/docs/2.2.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/gemfire/docs/2.2.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/gemfire/docs/2.2.0.RELEASE/changelog.txt)
-   Spring Data Neo4j 5.2 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-neo4j/5.2.0.RELEASE) - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/5.2.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/neo4j/docs/5.2.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/neo4j/docs/5.2.0.RELEASE/changelog.txt)
-   Spring Data for Apache Geode 2.2 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-geode/2.2.0.RELEASE) - [Javadoc](https://docs.spring.io/spring-data/geode/docs/2.2.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/geode/docs/2.2.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/geode/docs/2.2.0.RELEASE/changelog.txt)
-   Spring Data LDAP 2.2 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-ldap/2.2.0.RELEASE) - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/2.2.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/ldap/docs/2.2.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/ldap/docs/2.2.0.RELEASE/changelog.txt)
-   Spring Data Envers 2.2 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-envers/2.2.0.RELEASE) - [Javadoc](https://docs.spring.io/spring-data/envers/docs/2.2.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/envers/docs/2.2.0.RELEASE/reference/html)
-   Spring Data REST 3.2 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-rest-webmvc/3.2.0.RELEASE) - [Javadoc](https://docs.spring.io/spring-data/rest/docs/3.2.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/rest/docs/3.2.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/rest/docs/3.2.0.RELEASE/changelog.txt)
-   Spring Data Redis 2.2 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-redis/2.2.0.RELEASE) - [Javadoc](https://docs.spring.io/spring-data/redis/docs/2.2.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/redis/docs/2.2.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/redis/docs/2.2.0.RELEASE/changelog.txt)
-   Spring Data Elasticsearch 3.2 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-elasticsearch/3.2.0.RELEASE) - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/3.2.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/docs/3.2.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/elasticsearch/docs/3.2.0.RELEASE/changelog.txt)
-   Spring Data Couchbase 3.2 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-couchbase/3.2.0.RELEASE) - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/3.2.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/couchbase/docs/3.2.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/couchbase/docs/3.2.0.RELEASE/changelog.txt)