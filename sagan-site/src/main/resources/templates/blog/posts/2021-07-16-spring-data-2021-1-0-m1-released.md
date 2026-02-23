---
title: Spring Data 2021.1.0-M1 released
source: https://spring.io/blog/2021/07/16/spring-data-2021-1-0-m1-released
scraped: 2026-02-23T13:18:38.531Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Jens Schauder |  July 16, 2021 | 1 Comment
---

# Spring Data 2021.1.0-M1 released

_Releases | Jens Schauder |  July 16, 2021 | 1 Comment_

On behalf of the team, I’m pleased to announce the availability of the Spring Data `2021.1.0-M1` milestone release.

The release is built on top of Spring Framework `5.3.9`. For your convenience, you can consume this release through Spring Boot `2.6.0-M1`, which our team mates on the Boot team will release in about a week.

The `2021.1` release train ships a set of features and dependency upgrades. The most important changes are:

-   Upgrade to Querydsl 5.
-   Support for a wide range of Redis 6.2 commands.
-   Support for dialect-dependent custom conversions in Spring Data JDBC. This was used to improve the support of `java.time` types across multiple databases.
-   Support for streaming large result sets in Spring Data JDBC.
-   Support for AggregateReference in query derivation.
-   REF\_CURSOR support for stored procedures in Spring Data JPA.
-   Upgrade to MongoDB Driver 4.3 and initial support for MongoDB Server 5.0 Time Series.
-   Spring Data MongoDB comes with extended capabilities for [linking documents](https://docs.spring.io/spring-data/mongodb/docs/3.3.0-M1/reference/html/#mapping-usage.document-references) and offers, next to the existing [DBRef](https://docs.spring.io/spring-data/mongodb/docs/3.3.0-M1/reference/html/#mapping-usage-references) approach, a property-based solution that uses simple values, such as the target `_id` or a combination of fields to link to another document.

The sample below shows the reference to a collection of `Account` documents through their `_id` in Java code and how it is represented in MongoDB: `java @Document class Person {   @Id   String id;   @DocumentReference   List<Account> accounts; }     ` `json {   "_id" : …,   "accounts" : [ "6509b9e" … ] }     `

See the wiki page of the [Spring Data `2021.1` release train](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-2021.1-%28Q%29) for further details. We're working towards a second milestone in August and a third one in September. We plan for a GA release in November. We're looking forward to your feedback!

To round things off, here are the links to the artifacts, changelogs, and documentation:

## [](#202110-m1)2021.1.0-M1

-   Spring Data Commons 2.6 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-commons/2.6.0-M1) - [Javadoc](https://docs.spring.io/spring-data/commons/docs/2.6.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/commons/docs/2.6.0-M1/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-commons/releases/tag/2.6.0-M1)
-   Spring Data JDBC 2.3 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jdbc/2.3.0-M1) - [Javadoc](https://docs.spring.io/spring-data/jdbc/docs/2.3.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/jdbc/docs/2.3.0-M1/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-jdbc/releases/tag/2.3.0-M1)
-   Spring Data JPA 2.6 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jpa/2.6.0-M1) - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/2.6.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/jpa/docs/2.6.0-M1/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-jpa/releases/tag/2.6.0-M1)
-   Spring Data KeyValue 2.6 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-keyvalue/2.6.0-M1) - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/2.6.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/keyvalue/docs/2.6.0-M1/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-keyvalue/releases/tag/2.6.0-M1)
-   Spring Data for Apache Cassandra 3.3 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-cassandra/3.3.0-M1) - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/3.3.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/cassandra/docs/3.3.0-M1/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-cassandra/releases/tag/3.3.0-M1)
-   Spring Data Neo4j 6.2 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-neo4j/6.2.0-M1) - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/6.2.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/neo4j/docs/6.2.0-M1/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-neo4j/releases/tag/6.2.0-M1)
-   Spring Data MongoDB 3.3 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-mongodb/3.3.0-M1) - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/3.3.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/mongodb/docs/3.3.0-M1/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-mongodb/releases/tag/3.3.0-M1)
-   Spring Data for Apache Geode 2.6 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-geode/2.6.0-M1) - [Javadoc](https://docs.spring.io/spring-data/geode/docs/2.6.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/geode/docs/2.6.0-M1/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-geode/releases/tag/2.6.0-M1)
-   Spring Data R2DBC 1.4 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-r2dbc/1.4.0-M1) - [Javadoc](https://docs.spring.io/spring-data/r2dbc/docs/1.4.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/r2dbc/docs/1.4.0-M1/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-r2dbc/releases/tag/1.4.0-M1)
-   Spring Data LDAP 2.6 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-ldap/2.6.0-M1) - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/2.6.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/ldap/docs/2.6.0-M1/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-ldap/releases/tag/2.6.0-M1)
-   Spring Data Envers 2.6 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-envers/2.6.0-M1) - [Javadoc](https://docs.spring.io/spring-data/envers/docs/2.6.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/envers/docs/2.6.0-M1/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-envers/releases/tag/2.6.0-M1)
-   Spring Data REST 3.6 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-rest-webmvc/3.6.0-M1) - [Javadoc](https://docs.spring.io/spring-data/rest/docs/3.6.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/rest/docs/3.6.0-M1/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-rest/releases/tag/3.6.0-M1)
-   Spring Data Redis 2.6 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-redis/2.6.0-M1) - [Javadoc](https://docs.spring.io/spring-data/redis/docs/2.6.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/redis/docs/2.6.0-M1/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-redis/releases/tag/2.6.0-M1)
-   Spring Data Elasticsearch 4.3 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-elasticsearch/4.3.0-M1) - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/4.3.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/docs/4.3.0-M1/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-elasticsearch/releases/tag/4.3.0-M1)
-   Spring Data Couchbase 4.3 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-couchbase/4.3.0-M1) - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/4.3.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/couchbase/docs/4.3.0-M1/reference/html) - [Changelog](https://github.com/spring-projects/spring-data-couchbase/releases/tag/4.3.0-M1)