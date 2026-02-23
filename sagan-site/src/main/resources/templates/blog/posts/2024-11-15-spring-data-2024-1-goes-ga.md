---
title: Spring Data 2024.1 goes GA
source: https://spring.io/blog/2024/11/15/spring-data-2024-1-goes-ga
scraped: 2026-02-23T08:04:21.315Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  November 15, 2024 | 0 Comments
---

# Spring Data 2024.1 goes GA

_Releases | Mark Paluch |  November 15, 2024 | 0 Comments_

On behalf of the Spring Data engineering team and everyone who contributed to this release, I am pleased to announce general availability of Spring Data `2024.1` from Maven Central!

This release wraps up our support for Value Expression, completing support for Configuration Properties in `@Query` methods. You can now use Config Properties in your query methods in JPA, MongoDB, Cassandra, JDBC/R2DBC, and Neo4j.

Extending Spring Data by 3rd-Party Libraries is now much simpler. Developers of Spring Data repository extensions can use our [newly introduced SPI discovery mechanism](https://docs.spring.io/spring-data/jpa/reference/3.4/repositories/custom-implementations.html#repositories.spring-factories) to mount repository fragments as if the fragment would be part of your codebase without the need to register them manually.

Spring Data for Apache Cassandra features Keyspace qualification for tables and user-defined types so that you can leverage multiple keyspaces in a single application without using multiple CQL sessions.

We've refined Jedis Client configuration in Spring Data Redis and deprecated our own Micrometer Integration in favor of Lettuce’s Micrometer Observability classes.

To find out more about what’s new, see the [release notes](https://github.com/spring-projects/spring-data-commons/wiki/Spring-Data-2024.1-Release-Notes) and the individual module reference documentation.

This release will be included in the upcoming Spring Boot 3.4 GA release. We'd like to hear from you, so keep the feedback coming.

Going forward, we focus our efforts on the upcoming major release `2025.1` next year November. We have some exciting features around performance improvements and debugging experience in the pipeline.

To round things off, here are the links to the individual modules, changelogs, artifacts and documentation sites:

-   Spring Data Commons `3.4 GA` - [Javadoc](https://docs.spring.io/spring-data/commons/docs/3.4.0/api/) - [Documentation](https://docs.spring.io/spring-data/commons/reference/3.4/) - [Changelog](https://github.com/spring-projects/spring-data-commons/releases/tag/3.4.0)
-   Spring Data JPA `3.4 GA` - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/3.4.0/api/) - [Documentation](https://docs.spring.io/spring-data/jpa/reference/3.4/) - [Changelog](https://github.com/spring-projects/spring-data-jpa/releases/tag/3.4.0)
-   Spring Data Neo4j `7.4 GA` - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/7.4.0/api/) - [Documentation](https://docs.spring.io/spring-data/neo4j/reference/7.4/) - [Changelog](https://github.com/spring-projects/spring-data-neo4j/releases/tag/7.4.0)
-   Spring Data for Apache Cassandra `4.4 GA` - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/4.4.0/api/) - [Documentation](https://docs.spring.io/spring-data/cassandra/reference/4.4/) - [Changelog](https://github.com/spring-projects/spring-data-cassandra/releases/tag/4.4.0)
-   Spring Data MongoDB `4.4 GA` - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/4.4.0/api/) - [Documentation](https://docs.spring.io/spring-data/mongodb/reference/4.4/) - [Changelog](https://github.com/spring-projects/spring-data-mongodb/releases/tag/4.4.0)
-   Spring Data KeyValue `3.4 GA` - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/3.4.0/api/) - [Documentation](https://docs.spring.io/spring-data/keyvalue/reference/3.4/) - [Changelog](https://github.com/spring-projects/spring-data-keyvalue/releases/tag/3.4.0)
-   Spring Data LDAP `3.4 GA` - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/3.4.0/api/) - [Documentation](https://docs.spring.io/spring-data/ldap/reference/3.4/) - [Changelog](https://github.com/spring-projects/spring-data-ldap/releases/tag/3.4.0)
-   Spring Data REST `4.4 GA` - [Javadoc](https://docs.spring.io/spring-data/rest/docs/4.4.0/api/) - [Documentation](https://docs.spring.io/spring-data/rest/reference/4.4/) - [Changelog](https://github.com/spring-projects/spring-data-rest/releases/tag/4.4.0)
-   Spring Data Redis `3.4 GA` - [Javadoc](https://docs.spring.io/spring-data/redis/docs/3.4.0/api/) - [Documentation](https://docs.spring.io/spring-data/redis/reference/3.4/) - [Changelog](https://github.com/spring-projects/spring-data-redis/releases/tag/3.4.0)
-   Spring Data Elasticsearch `5.4 GA` - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/5.4.0/api/) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/reference/5.4/) - [Changelog](https://github.com/spring-projects/spring-data-elasticsearch/releases/tag/5.4.0)
-   Spring Data Couchbase `5.4 GA` - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/5.4.0/api/) - [Documentation](https://docs.spring.io/spring-data/couchbase/reference/5.4/) - [Changelog](https://github.com/spring-projects/spring-data-couchbase/releases/tag/5.4.0)
-   Spring Data Relational `3.4 GA` - [Javadoc](https://docs.spring.io/spring-data/relational/docs/3.4.0/api/) - [Documentation](https://docs.spring.io/spring-data/relational/reference/3.4/) - [Changelog](https://github.com/spring-projects/spring-data-relational/releases/tag/3.4.0)