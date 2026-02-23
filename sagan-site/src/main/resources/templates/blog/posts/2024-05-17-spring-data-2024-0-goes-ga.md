---
title: Spring Data 2024.0 goes GA
source: https://spring.io/blog/2024/05/17/spring-data-2024-0-goes-ga
scraped: 2026-02-23T08:40:03.413Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  May 17, 2024 | 0 Comments
---

# Spring Data 2024.0 goes GA

_Releases | Mark Paluch |  May 17, 2024 | 0 Comments_

On behalf of the Spring Data engineering team and everyone who contributed to this release, I am delighted to announce the general availability of Spring Data `2024.0` from Maven Central! This release comes with major driver upgrades and refinements in individual store modules.

A major enhancement is support for Value Expressions in mapping and `@Value` (constructor) annotations. Value Expressions support obtaining values from Configuration Properties in addition to SpEL expressions.

Spring Data MongoDB `2024.0` has upgraded its MongoDB driver dependency compatibility to MongoDB driver 5. You can still downgrade to an older 4.x (such as `4.11`) driver if you wish.

Another noteworthy change is declarative support for MongoDB transaction options by leveraging transaction labels such as `@Transactional(label = { "mongo:readConcern=majority" })`

To find out more about what’s new, see the [release notes](https://github.com/spring-projects/spring-data-commons/wiki/Spring-Data-2024.0-Release-Notes) and the individual module reference documentation.

This release will be included in the upcoming Spring Boot 3.3 GA release. We'd like to hear from you, so keep the feedback coming.

To round things off, here are the links to the individual modules, changelogs, artifacts and documentation sites:

-   Spring Data Commons `3.3 GA` - [Javadoc](https://docs.spring.io/spring-data/commons/docs/3.3.0/api/) - [Documentation](https://docs.spring.io/spring-data/commons/reference/3.3/) - [Changelog](https://github.com/spring-projects/spring-data-commons/releases/tag/3.3.0)
-   Spring Data JPA `3.3 GA` - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/3.3.0/api/) - [Documentation](https://docs.spring.io/spring-data/jpa/reference/3.3/) - [Changelog](https://github.com/spring-projects/spring-data-jpa/releases/tag/3.3.0)
-   Spring Data Neo4j `7.3 GA` - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/7.3.0/api/) - [Documentation](https://docs.spring.io/spring-data/neo4j/reference/7.3/) - [Changelog](https://github.com/spring-projects/spring-data-neo4j/releases/tag/7.3.0)
-   Spring Data KeyValue `3.3 GA` - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/3.3.0/api/) - [Documentation](https://docs.spring.io/spring-data/keyvalue/reference/3.3/) - [Changelog](https://github.com/spring-projects/spring-data-keyvalue/releases/tag/3.3.0)
-   Spring Data for Apache Cassandra `4.3 GA` - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/4.3.0/api/) - [Documentation](https://docs.spring.io/spring-data/cassandra/reference/4.3/) - [Changelog](https://github.com/spring-projects/spring-data-cassandra/releases/tag/4.3.0)
-   Spring Data MongoDB `4.3 GA` - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/4.3.0/api/) - [Documentation](https://docs.spring.io/spring-data/mongodb/reference/4.3/) - [Changelog](https://github.com/spring-projects/spring-data-mongodb/releases/tag/4.3.0)
-   Spring Data LDAP `3.3 GA` - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/3.3.0/api/) - [Documentation](https://docs.spring.io/spring-data/ldap/reference/3.3/) - [Changelog](https://github.com/spring-projects/spring-data-ldap/releases/tag/3.3.0)
-   Spring Data REST `4.3 GA` - [Javadoc](https://docs.spring.io/spring-data/rest/docs/4.3.0/api/) - [Documentation](https://docs.spring.io/spring-data/rest/reference/4.3/) - [Changelog](https://github.com/spring-projects/spring-data-rest/releases/tag/4.3.0)
-   Spring Data Redis `3.3 GA` - [Javadoc](https://docs.spring.io/spring-data/redis/docs/3.3.0/api/) - [Documentation](https://docs.spring.io/spring-data/redis/reference/3.3/) - [Changelog](https://github.com/spring-projects/spring-data-redis/releases/tag/3.3.0)
-   Spring Data Elasticsearch `5.3 GA` - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/5.3.0/api/) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/reference/5.3/) - [Changelog](https://github.com/spring-projects/spring-data-elasticsearch/releases/tag/5.3.0)
-   Spring Data Couchbase `5.3 GA` - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/5.3.0/api/) - [Documentation](https://docs.spring.io/spring-data/couchbase/reference/5.3/) - [Changelog](https://github.com/spring-projects/spring-data-couchbase/releases/tag/5.3.0)
-   Spring Data Relational `3.3 GA` - [Javadoc](https://docs.spring.io/spring-data/relational/docs/3.3.0/api/) - [Documentation](https://docs.spring.io/spring-data/relational/reference/3.3/) - [Changelog](https://github.com/spring-projects/spring-data-relational/releases/tag/3.3.0)