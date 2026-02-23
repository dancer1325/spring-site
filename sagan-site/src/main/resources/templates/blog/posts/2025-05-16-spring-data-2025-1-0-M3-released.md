---
title: Spring Data 2025.1.0-M3 released
source: https://spring.io/blog/2025/05/16/spring-data-2025-1-0-M3-released
scraped: 2026-02-22T22:08:44.590Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  May 16, 2025 | 0 Comments
---

# Spring Data 2025.1.0-M3 released

_Releases | Mark Paluch |  May 16, 2025 | 0 Comments_

On behalf of the team and everyone who has contributed, I am pleased to announce the third milestone for the next Spring Data generation This milestone continues delivering new features and refinements mostly around infrastructure themes.

## [](#ahead-of-time-optimization-for-repositories)Ahead-of-Time Optimization for Repositories

Spring Data repositories can now be optimized at build time using the Spring AOT framework. AOT processing allows for faster startup times and reduced memory consumption featuring in the JPA (Hibernate only) and MongoDB modules. Ahead-of-Time optimizations capture some decisions that have been taken at build-time. These are hard-coded in the application setup and hanging the implementation or updating queries requires AOT re-processing.

To enable AOT optimizations for repositories, set the `spring.aot.repositories.enabled=true` configuration property during AOT processing.

AOT optimizations are applied automatically when running your application in AOT mode (e.g. in a GraalVM Native image, setting the `spring.aot.enabled=true` property as system property or through `spring.properties`).

We will publish a detailed blog post outlining AOT optimizations for repositories during next week.

## [](#and-more)And more!

Going forward, we're working on upgrading Spring Data to Jackson 3 and finishing the migration to JSpecify. Refer to our detailed [release notes](https://github.com/spring-projects/spring-data-commons/wiki/Spring-Data-2025.1-Release-Notes) on for a complete list of changes.

Thanks to all those who have contributed with issue reports and pull requests.

## [](#202510-m3)2025.1.0-M3

-   Spring Data Commons `4.0 M3` - [Javadoc](https://docs.spring.io/spring-data/commons/docs/4.0.0-M3/api/) - [Documentation](https://docs.spring.io/spring-data/commons/reference/4.0/) - [Changelog](https://github.com/spring-projects/spring-data-commons/releases/tag/4.0.0-M3)
-   Spring Data JPA `4.0 M3` - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/4.0.0-M3/api/) - [Documentation](https://docs.spring.io/spring-data/jpa/reference/4.0/) - [Changelog](https://github.com/spring-projects/spring-data-jpa/releases/tag/4.0.0-M3)
-   Spring Data KeyValue `4.0 M3` - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/4.0.0-M3/api/) - [Documentation](https://docs.spring.io/spring-data/keyvalue/reference/4.0/) - [Changelog](https://github.com/spring-projects/spring-data-keyvalue/releases/tag/4.0.0-M3)
-   Spring Data for Apache Cassandra `5.0 M3` - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/5.0.0-M3/api/) - [Documentation](https://docs.spring.io/spring-data/cassandra/reference/5.0/) - [Changelog](https://github.com/spring-projects/spring-data-cassandra/releases/tag/5.0.0-M3)
-   Spring Data Neo4j `8.0 M3` - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/8.0.0-M3/api/) - [Documentation](https://docs.spring.io/spring-data/neo4j/reference/8.0/) - [Changelog](https://github.com/spring-projects/spring-data-neo4j/releases/tag/8.0.0-M3)
-   Spring Data MongoDB `5.0 M3` - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/5.0.0-M3/api/) - [Documentation](https://docs.spring.io/spring-data/mongodb/reference/5.0/) - [Changelog](https://github.com/spring-projects/spring-data-mongodb/releases/tag/5.0.0-M3)
-   Spring Data LDAP `4.0 M3` - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/4.0.0-M3/api/) - [Documentation](https://docs.spring.io/spring-data/ldap/reference/4.0/) - [Changelog](https://github.com/spring-projects/spring-data-ldap/releases/tag/4.0.0-M3)
-   Spring Data REST `5.0 M3` - [Javadoc](https://docs.spring.io/spring-data/rest/docs/5.0.0-M3/api/) - [Documentation](https://docs.spring.io/spring-data/rest/reference/5.0/) - [Changelog](https://github.com/spring-projects/spring-data-rest/releases/tag/5.0.0-M3)
-   Spring Data Redis `4.0 M3` - [Javadoc](https://docs.spring.io/spring-data/redis/docs/4.0.0-M3/api/) - [Documentation](https://docs.spring.io/spring-data/redis/reference/4.0/) - [Changelog](https://github.com/spring-projects/spring-data-redis/releases/tag/4.0.0-M3)
-   Spring Data Elasticsearch `6.0 M3` - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/6.0.0-M3/api/) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/reference/6.0/) - [Changelog](https://github.com/spring-projects/spring-data-elasticsearch/releases/tag/6.0.0-M3)
-   Spring Data Couchbase `6.0 M3` - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/6.0.0-M3/api/) - [Documentation](https://docs.spring.io/spring-data/couchbase/reference/6.0/) - [Changelog](https://github.com/spring-projects/spring-data-couchbase/releases/tag/6.0.0-M3)
-   Spring Data Relational `4.0 M3` - [Javadoc](https://docs.spring.io/spring-data/relational/docs/4.0.0-M3/api/) - [Documentation](https://docs.spring.io/spring-data/relational/reference/4.0/) - [Changelog](https://github.com/spring-projects/spring-data-relational/releases/tag/4.0.0-M3)