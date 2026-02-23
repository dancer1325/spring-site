---
title: Spring Data Moore M3 released
source: https://spring.io/blog/2019/04/11/spring-data-moore-m3-released
scraped: 2026-02-23T14:52:10.754Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Christoph Strobl |  April 11, 2019 | 1 Comment
---

# Spring Data Moore M3 released

_Releases | Christoph Strobl |  April 11, 2019 | 1 Comment_

Hot on the heels of [Spring Framework 5.2 M1](https://spring.io/blog/2019/04/10/spring-framework-5-2-0-m1-available-now) and just in time for the upcoming [Spring Boot 2.2 M2](https://github.com/spring-projects/spring-boot/milestone/134) release, on behalf of the Spring Data team, I’m pleased to announce the availability of the third milestone of the [Moore](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Moore) release train.

Notable changes amongst many others:

-   `Flow` extensions for Kotlin coroutines in Spring Data for Apache Cassandra & MongoDB.
-   MongoDB [Json Schema generation](https://docs.spring.io/spring-data/mongodb/docs/2.2.0.M3/reference/html/#mongo.jsonSchema.generated) from domain Types.
-   Support for `BINARY` storage type in Spring Data JDBC.
-   Alternative [EntityMapper](https://docs.spring.io/spring-data/elasticsearch/docs/3.2.0.M3/reference/html/#elasticsearch.mapping.meta-model) for Elasticsearch.
-   Improved Geospatial query support for Neo4j.
-   Smarter Redis cluster topology caching.

Please find a high-level overview of what has been added in our [release wiki](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Moore). As always, we’re looking forward to your feedback! -> [@SpringData](https://twitter.com/springdata).

-   Spring Data Commons 2.2 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-commons/2.2.0.M3) - [Javadoc](https://docs.spring.io/spring-data/commons/docs/2.2.0.M3/api) - [Documentation](https://docs.spring.io/spring-data/commons/docs/2.2.0.M3/reference/html) - [Changelog](https://docs.spring.io/spring-data/commons/docs/2.2.0.M3/changelog.txt)
-   Spring Data JDBC 1.1 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jdbc/1.1.0.M3) - [Javadoc](https://docs.spring.io/spring-data/jdbc/docs/1.1.0.M3/api) - [Documentation](https://docs.spring.io/spring-data/jdbc/docs/1.1.0.M3/reference/html) - [Changelog](https://docs.spring.io/spring-data/jdbc/docs/1.1.0.M3/changelog.txt)
-   Spring Data JPA 2.2 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jpa/2.2.0.M3) - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/2.2.0.M3/api) - [Documentation](https://docs.spring.io/spring-data/jpa/docs/2.2.0.M3/reference/html) - [Changelog](https://docs.spring.io/spring-data/jpa/docs/2.2.0.M3/changelog.txt)
-   Spring Data KeyValue 2.2 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-keyvalue/2.2.0.M3) - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/2.2.0.M3/api) - [Documentation](https://docs.spring.io/spring-data/keyvalue/docs/2.2.0.M3/reference/html) - [Changelog](https://docs.spring.io/spring-data/keyvalue/docs/2.2.0.M3/changelog.txt)
-   Spring Data for Apache Solr 4.1 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-solr/4.1.0.M3) - [Javadoc](https://docs.spring.io/spring-data/solr/docs/4.1.0.M3/api) - [Documentation](https://docs.spring.io/spring-data/solr/docs/4.1.0.M3/reference/html) - [Changelog](https://docs.spring.io/spring-data/solr/docs/4.1.0.M3/changelog.txt)
-   Spring Data Gemfire 2.2 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-gemfire/2.2.0.M3) - [Javadoc](https://docs.spring.io/spring-data/gemfire/docs/2.2.0.M3/api) - [Documentation](https://docs.spring.io/spring-data/gemfire/docs/2.2.0.M3/reference/html) - [Changelog](https://docs.spring.io/spring-data/gemfire/docs/2.2.0.M3/changelog.txt)
-   Spring Data Neo4j 5.2 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-neo4j/5.2.0.M3) - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/5.2.0.M3/api) - [Documentation](https://docs.spring.io/spring-data/neo4j/docs/5.2.0.M3/reference/html) - [Changelog](https://docs.spring.io/spring-data/neo4j/docs/5.2.0.M3/changelog.txt)
-   Spring Data for Apache Cassandra 2.2 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-cassandra/2.2.0.M3) - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/2.2.0.M3/api) - [Documentation](https://docs.spring.io/spring-data/cassandra/docs/2.2.0.M3/reference/html) - [Changelog](https://docs.spring.io/spring-data/cassandra/docs/2.2.0.M3/changelog.txt)
-   Spring Data MongoDB 2.2 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-mongodb/2.2.0.M3) - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/2.2.0.M3/api) - [Documentation](https://docs.spring.io/spring-data/mongodb/docs/2.2.0.M3/reference/html) - [Changelog](https://docs.spring.io/spring-data/mongodb/docs/2.2.0.M3/changelog.txt)
-   Spring Data for Apache Geode 2.2 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-geode/2.2.0.M3) - [Javadoc](https://docs.spring.io/spring-data/geode/docs/2.2.0.M3/api) - [Documentation](https://docs.spring.io/spring-data/geode/docs/2.2.0.M3/reference/html) - [Changelog](https://docs.spring.io/spring-data/geode/docs/2.2.0.M3/changelog.txt)
-   Spring Data LDAP 2.2 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-ldap/2.2.0.M3) - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/2.2.0.M3/api) - [Documentation](https://docs.spring.io/spring-data/ldap/docs/2.2.0.M3/reference/html) - [Changelog](https://docs.spring.io/spring-data/ldap/docs/2.2.0.M3/changelog.txt)
-   Spring Data Envers 2.2 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-envers/2.2.0.M3) - [Javadoc](https://docs.spring.io/spring-data/envers/docs/2.2.0.M3/api) - [Documentation](https://docs.spring.io/spring-data/envers/docs/2.2.0.M3/reference/html)
-   Spring Data REST 3.2 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-rest-webmvc/3.2.0.M3) - [Javadoc](https://docs.spring.io/spring-data/rest/docs/3.2.0.M3/api) - [Documentation](https://docs.spring.io/spring-data/rest/docs/3.2.0.M3/reference/html) - [Changelog](https://docs.spring.io/spring-data/rest/docs/3.2.0.M3/changelog.txt)
-   Spring Data Redis 2.2 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-redis/2.2.0.M3) - [Javadoc](https://docs.spring.io/spring-data/redis/docs/2.2.0.M3/api) - [Documentation](https://docs.spring.io/spring-data/redis/docs/2.2.0.M3/reference/html) - [Changelog](https://docs.spring.io/spring-data/redis/docs/2.2.0.M3/changelog.txt)
-   Spring Data Elasticsearch 3.2 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-elasticsearch/3.2.0.M3) - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/3.2.0.M3/api) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/docs/3.2.0.M3/reference/html) - [Changelog](https://docs.spring.io/spring-data/elasticsearch/docs/3.2.0.M3/changelog.txt)
-   Spring Data Couchbase 3.2 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-couchbase/3.2.0.M3) - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/3.2.0.M3/api) - [Documentation](https://docs.spring.io/spring-data/couchbase/docs/3.2.0.M3/reference/html) - [Changelog](https://docs.spring.io/spring-data/couchbase/docs/3.2.0.M3/changelog.txt)