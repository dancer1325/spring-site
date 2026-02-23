---
title: Spring Data 2025.0.0-RC1 released
source: https://spring.io/blog/2025/04/22/spring-data-2025-0-0-RC1-released
scraped: 2026-02-23T07:45:28.900Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Christoph Strobl |  April 22, 2025 | 0 Comments
---

# Spring Data 2025.0.0-RC1 released

_Releases | Christoph Strobl |  April 22, 2025 | 0 Comments_

On behalf of the team and everyone who has contributed, I am pleased to announce the first release candidate of Spring Data `2025.0.0` ("Spring Data 3.5") containing amongst others:

-   Several database driver upgrades accross the individual data modules.
-   Refined HQL, EQL and JPQL parsing.
-   MongoDB QE schema derivation support for easier collection creation.
-   Deprecation warnings for parts that are going to change with the next major ("Spring Data 4.0") release. Please pay close attention to those especailly for parts that are marked for removal like the JMX support.

Going forward, we plan to ship a generally available release in May. Spring Boot 3.5 RC1 will upgrade to this milestone for your convenience. Happy Upgrading and let us know what you think about these changes, especially if you encounter any issue.

## [](#202500-rc1)2025.0.0-RC1

-   Spring Data Commons `3.5 RC1` - [Javadoc](https://docs.spring.io/spring-data/commons/docs/3.5.0-RC1/api/) - [Documentation](https://docs.spring.io/spring-data/commons/reference/3.5/) - [Changelog](https://github.com/spring-projects/spring-data-commons/releases/tag/3.5.0-RC1)
-   Spring Data JPA `3.5 RC1` - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/3.5.0-RC1/api/) - [Documentation](https://docs.spring.io/spring-data/jpa/reference/3.5/) - [Changelog](https://github.com/spring-projects/spring-data-jpa/releases/tag/3.5.0-RC1)
-   Spring Data MongoDB `4.5 RC1` - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/4.5.0-RC1/api/) - [Documentation](https://docs.spring.io/spring-data/mongodb/reference/4.5/) - [Changelog](https://github.com/spring-projects/spring-data-mongodb/releases/tag/4.5.0-RC1)
-   Spring Data Neo4j `7.5 RC1` - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/7.5.0-RC1/api/) - [Documentation](https://docs.spring.io/spring-data/neo4j/reference/7.5/) - [Changelog](https://github.com/spring-projects/spring-data-neo4j/releases/tag/7.5.0-RC1)
-   Spring Data for Apache Cassandra `4.5 RC1` - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/4.5.0-RC1/api/) - [Documentation](https://docs.spring.io/spring-data/cassandra/reference/4.5/) - [Changelog](https://github.com/spring-projects/spring-data-cassandra/releases/tag/4.5.0-RC1)
-   Spring Data KeyValue `3.5 RC1` - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/3.5.0-RC1/api/) - [Documentation](https://docs.spring.io/spring-data/keyvalue/reference/3.5/) - [Changelog](https://github.com/spring-projects/spring-data-keyvalue/releases/tag/3.5.0-RC1)
-   Spring Data LDAP `3.5 RC1` - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/3.5.0-RC1/api/) - [Documentation](https://docs.spring.io/spring-data/ldap/reference/3.5/) - [Changelog](https://github.com/spring-projects/spring-data-ldap/releases/tag/3.5.0-RC1)
-   Spring Data REST `4.5 RC1` - [Javadoc](https://docs.spring.io/spring-data/rest/docs/4.5.0-RC1/api/) - [Documentation](https://docs.spring.io/spring-data/rest/reference/4.5/) - [Changelog](https://github.com/spring-projects/spring-data-rest/releases/tag/4.5.0-RC1)
-   Spring Data Redis `3.5 RC1` - [Javadoc](https://docs.spring.io/spring-data/redis/docs/3.5.0-RC1/api/) - [Documentation](https://docs.spring.io/spring-data/redis/reference/3.5/) - [Changelog](https://github.com/spring-projects/spring-data-redis/releases/tag/3.5.0-RC1)
-   Spring Data Elasticsearch `5.5 RC1` - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/5.5.0-RC1/api/) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/reference/5.5/) - [Changelog](https://github.com/spring-projects/spring-data-elasticsearch/releases/tag/5.5.0-RC1)
-   Spring Data Couchbase `5.5 RC1` - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/5.5.0-RC1/api/) - [Documentation](https://docs.spring.io/spring-data/couchbase/reference/5.5/) - [Changelog](https://github.com/spring-projects/spring-data-couchbase/releases/tag/5.5.0-RC1)
-   Spring Data Relational `3.5 RC1` - [Javadoc](https://docs.spring.io/spring-data/relational/docs/3.5.0-RC1/api/) - [Documentation](https://docs.spring.io/spring-data/relational/reference/3.5/) - [Changelog](https://github.com/spring-projects/spring-data-relational/releases/tag/3.5.0-RC1)