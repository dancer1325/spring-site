---
title: Spring Data 2025.0.0 goes GA
source: https://spring.io/blog/2025/05/16/spring-data-2025-0-goes-ga
scraped: 2026-02-23T07:42:38.339Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  May 16, 2025 | 0 Comments
---

# Spring Data 2025.0.0 goes GA

_Releases | Mark Paluch |  May 16, 2025 | 0 Comments_

On behalf of the Spring Data engineering team and everyone who contributed to this release, I am delighted to announce the general availability of Spring Data `2025.0` from Maven Central! This release comes with driver upgrades and refinements in individual store modules.

Most notable changes include:

-   Vector type and Vector Search support in MongoDB and Apache Cassandra
-   Constructor Expression Derivation for DTO Projections in Spring Data JPA
-   Support for identifier generation using sequences in Spring Data JDBC and R2DBC
-   Index Creation using Cassandra 5 Storage-Attached Indexes

Please refer to our [release notes](https://github.com/spring-projects/spring-data-commons/wiki/Spring-Data-2025.0-Release-Notes) for further details.

Spring Boot `3.5` will upgrade to Spring Data `2025.0.0` for your convenience. Please also note that the Spring Data `2025.0.0` release train (Spring Data 3.5) is the last feature release of the `3.x` development line. Throughout the following months, we will be working on the `4.0` release (`2025.1` release train), expecting a few more milestones followed by a release candidate phase in fall and a GA release in November 2025.

## [](#202500)2025.0.0

-   Spring Data Commons `3.5` - [Javadoc](https://docs.spring.io/spring-data/commons/docs/3.5.0/api/) - [Documentation](https://docs.spring.io/spring-data/commons/reference/3.5/) - [Changelog](https://github.com/spring-projects/spring-data-commons/releases/tag/3.5.0)
-   Spring Data JPA `3.5` - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/3.5.0/api/) - [Documentation](https://docs.spring.io/spring-data/jpa/reference/3.5/) - [Changelog](https://github.com/spring-projects/spring-data-jpa/releases/tag/3.5.0)
-   Spring Data MongoDB `4.5` - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/4.5.0/api/) - [Documentation](https://docs.spring.io/spring-data/mongodb/reference/4.5/) - [Changelog](https://github.com/spring-projects/spring-data-mongodb/releases/tag/4.5.0)
-   Spring Data Neo4j `7.5` - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/7.5.0/api/) - [Documentation](https://docs.spring.io/spring-data/neo4j/reference/7.5/) - [Changelog](https://github.com/spring-projects/spring-data-neo4j/releases/tag/7.5.0)
-   Spring Data for Apache Cassandra `4.5` - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/4.5.0/api/) - [Documentation](https://docs.spring.io/spring-data/cassandra/reference/4.5/) - [Changelog](https://github.com/spring-projects/spring-data-cassandra/releases/tag/4.5.0)
-   Spring Data KeyValue `3.5` - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/3.5.0/api/) - [Documentation](https://docs.spring.io/spring-data/keyvalue/reference/3.5/) - [Changelog](https://github.com/spring-projects/spring-data-keyvalue/releases/tag/3.5.0)
-   Spring Data LDAP `3.5` - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/3.5.0/api/) - [Documentation](https://docs.spring.io/spring-data/ldap/reference/3.5/) - [Changelog](https://github.com/spring-projects/spring-data-ldap/releases/tag/3.5.0)
-   Spring Data REST `4.5` - [Javadoc](https://docs.spring.io/spring-data/rest/docs/4.5.0/api/) - [Documentation](https://docs.spring.io/spring-data/rest/reference/4.5/) - [Changelog](https://github.com/spring-projects/spring-data-rest/releases/tag/4.5.0)
-   Spring Data Redis `3.5` - [Javadoc](https://docs.spring.io/spring-data/redis/docs/3.5.0/api/) - [Documentation](https://docs.spring.io/spring-data/redis/reference/3.5/) - [Changelog](https://github.com/spring-projects/spring-data-redis/releases/tag/3.5.0)
-   Spring Data Elasticsearch `5.5` - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/5.5.0/api/) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/reference/5.5/) - [Changelog](https://github.com/spring-projects/spring-data-elasticsearch/releases/tag/5.5.0)
-   Spring Data Couchbase `5.5` - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/5.5.0/api/) - [Documentation](https://docs.spring.io/spring-data/couchbase/reference/5.5/) - [Changelog](https://github.com/spring-projects/spring-data-couchbase/releases/tag/5.5.0)
-   Spring Data Relational `3.5` - [Javadoc](https://docs.spring.io/spring-data/relational/docs/3.5.0/api/) - [Documentation](https://docs.spring.io/spring-data/relational/reference/3.5/) - [Changelog](https://github.com/spring-projects/spring-data-relational/releases/tag/3.5.0)