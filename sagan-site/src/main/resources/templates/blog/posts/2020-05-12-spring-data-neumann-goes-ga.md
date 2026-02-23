---
title: Spring Data Neumann goes GA
source: https://spring.io/blog/2020/05/12/spring-data-neumann-goes-ga
scraped: 2026-02-23T14:01:22.221Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  May 12, 2020 | 3 Comments
---

# Spring Data Neumann goes GA

_Releases | Mark Paluch |  May 12, 2020 | 3 Comments_

Dear Spring community,

On behalf of the Spring Data team and many contributors, it is my pleasure to announce that Spring Data Neumann is generally available from [repo.spring.io](https://repo.spring.io/) as well as Maven Central! This release ships with over [650 features, bugfixes and improvements](https://jira.spring.io/issues/?filter=16930) containing numerous major version and driver upgrades.

This very tightly curated overview summarizes the most significant changes:

-   Repository support for Kotlin Coroutines.
-   Upgrade to MongoDB Driver 4.
-   Upgrade to Cassandra Driver 4.
-   Upgrade to Couchbase SDK 3
-   Upgrade to Querydsl 4.3
-   Upgrade to Elasticsearch 7 and fully revise Template API for consistent Elasticsearch usage.
-   Inclusion of Spring Data R2DBC into the release train.
-   Merge of Spring Data for Apache Geode and Spring Data GemFire into a single Spring Data Geode module.
-   Joda-Time and ThreeTenBackport support deprecated.

Over the coming days, we are going to publish several blog posts that outline the new and noteworthy items of this release.

With the upcoming Spring Boot 2.3 release, you will be fully able to consume Spring Data Neumann, including all necessary infrastructure changes. Check out specifically the migration guides of each module to simplify the upgrade. We hope you enjoy it :-)

Cheers, Mark

PS: Here are the links to each module:

-   Spring Data Commons 2.3 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-commons/2.3.0.RELEASE) - [Javadoc](https://docs.spring.io/spring-data/commons/docs/2.3.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/commons/docs/2.3.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/commons/docs/2.3.0.RELEASE/changelog.txt)
-   Spring Data JDBC 2.0 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-jdbc/2.0.0.RELEASE) - [Javadoc](https://docs.spring.io/spring-data/jdbc/docs/2.0.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/jdbc/docs/2.0.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/jdbc/docs/2.0.0.RELEASE/changelog.txt)
-   Spring Data JPA 2.3 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-jpa/2.3.0.RELEASE) - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/2.3.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/jpa/docs/2.3.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/jpa/docs/2.3.0.RELEASE/changelog.txt)
-   Spring Data for Apache Geode 2.3 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-geode/2.3.0.RELEASE) - [Javadoc](https://docs.spring.io/spring-data/geode/docs/2.3.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/geode/docs/2.3.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/geode/docs/2.3.0.RELEASE/changelog.txt)
-   Spring Data Neo4j 5.3 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-neo4j/5.3.0.RELEASE) - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/5.3.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/neo4j/docs/5.3.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/neo4j/docs/5.3.0.RELEASE/changelog.txt)
-   Spring Data for Apache Cassandra 3.0 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-cassandra/3.0.0.RELEASE) - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/3.0.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/cassandra/docs/3.0.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/cassandra/docs/3.0.0.RELEASE/changelog.txt)
-   Spring Data MongoDB 3.0 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-mongodb/3.0.0.RELEASE) - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/3.0.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/mongodb/docs/3.0.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/mongodb/docs/3.0.0.RELEASE/changelog.txt)
-   Spring Data KeyValue 2.3 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-keyvalue/2.3.0.RELEASE) - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/2.3.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/keyvalue/docs/2.3.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/keyvalue/docs/2.3.0.RELEASE/changelog.txt)
-   Spring Data for Apache Solr 4.2 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-solr/4.2.0.RELEASE) - [Javadoc](https://docs.spring.io/spring-data/solr/docs/4.2.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/solr/docs/4.2.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/solr/docs/4.2.0.RELEASE/changelog.txt)
-   Spring Data R2DBC 1.1 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-r2dbc/1.1.0.RELEASE) - [Javadoc](https://docs.spring.io/spring-data/r2dbc/docs/1.1.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/r2dbc/docs/1.1.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/r2dbc/docs/1.1.0.RELEASE/changelog.txt)
-   Spring Data LDAP 2.3 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-ldap/2.3.0.RELEASE) - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/2.3.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/ldap/docs/2.3.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/ldap/docs/2.3.0.RELEASE/changelog.txt)
-   Spring Data Envers 2.3 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-envers/2.3.0.RELEASE) - [Javadoc](https://docs.spring.io/spring-data/envers/docs/2.3.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/envers/docs/2.3.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/envers/docs/2.3.0.RELEASE/changelog.txt)
-   Spring Data REST 3.3 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-rest-webmvc/3.3.0.RELEASE) - [Javadoc](https://docs.spring.io/spring-data/rest/docs/3.3.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/rest/docs/3.3.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/rest/docs/3.3.0.RELEASE/changelog.txt)
-   Spring Data Redis 2.3 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-redis/2.3.0.RELEASE) - [Javadoc](https://docs.spring.io/spring-data/redis/docs/2.3.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/redis/docs/2.3.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/redis/docs/2.3.0.RELEASE/changelog.txt)
-   Spring Data Elasticsearch 4.0 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-elasticsearch/4.0.0.RELEASE) - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/4.0.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/docs/4.0.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/elasticsearch/docs/4.0.0.RELEASE/changelog.txt)
-   Spring Data Couchbase 4.0 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-couchbase/4.0.0.RELEASE) - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/4.0.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/couchbase/docs/4.0.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/couchbase/docs/4.0.0.RELEASE/changelog.txt)