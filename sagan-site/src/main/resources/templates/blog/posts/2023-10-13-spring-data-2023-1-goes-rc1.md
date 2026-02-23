---
title: Spring Data 2023.1 goes RC1
source: https://spring.io/blog/2023/10/13/spring-data-2023-1-goes-rc1
scraped: 2026-02-23T09:17:29.345Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  October 13, 2023 | 0 Comments
---

# Spring Data 2023.1 goes RC1

_Releases | Mark Paluch |  October 13, 2023 | 0 Comments_

It is my pleasure to announce that a feature-complete Spring Data `2023.1` release candidate is available now! This release is in preparation for a first Spring Boot 3.2 release candidate next week. We expect final releases for general availability in November.

This RC ships a couple of New and Noteworthy changes:

-   `@ReadPreference` support for Repository Query Methods and support for dots in MongoDB document field names.
-   Revision of the `Converter` arrangement in Spring Data Relational allowing to use the same converter abstraction for JDBC and R2DBC modules.
-   Asynchronous Caching support for Redis when using the Lettuce driver.

You can find the consolidated list of changes at the [release notes](https://github.com/spring-projects/spring-data-commons/wiki/Spring-Data-2023.1-%28Vaughan%29-Release-Notes) for the `2023.1` release train.

To round things off, here are the links to the documentation and individual change logs:

-   Spring Data Commons `3.2 RC1` - [Javadoc](https://docs.spring.io/spring-data/commons/docs/3.2.0-RC1/api/) - [Documentation](https://docs.spring.io/spring-data/commons/reference/) - [Changelog](https://github.com/spring-projects/spring-data-commons/releases/tag/3.2.0-RC1)
-   Spring Data JPA `3.2 RC1` - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/3.2.0-RC1/api/) - [Documentation](https://docs.spring.io/spring-data/jpa/reference/) - [Changelog](https://github.com/spring-projects/spring-data-jpa/releases/tag/3.2.0-RC1)
-   Spring Data Neo4j `7.2 RC1` - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/7.2.0-RC1/api/) - [Documentation](https://docs.spring.io/spring-data/neo4j/reference/) - [Changelog](https://github.com/spring-projects/spring-data-neo4j/releases/tag/7.2.0-RC1)
-   Spring Data for Apache Cassandra `4.2 RC1` - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/4.2.0-RC1/api/) - [Documentation](https://docs.spring.io/spring-data/cassandra/reference/) - [Changelog](https://github.com/spring-projects/spring-data-cassandra/releases/tag/4.2.0-RC1)
-   Spring Data MongoDB `4.2 RC1` - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/4.2.0-RC1/api/) - [Documentation](https://docs.spring.io/spring-data/mongodb/reference/) - [Changelog](https://github.com/spring-projects/spring-data-mongodb/releases/tag/4.2.0-RC1)
-   Spring Data KeyValue `3.2 RC1` - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/3.2.0-RC1/api/) - [Documentation](https://docs.spring.io/spring-data/keyvalue/reference/) - [Changelog](https://github.com/spring-projects/spring-data-keyvalue/releases/tag/3.2.0-RC1)
-   Spring Data LDAP `3.2 RC1` - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/3.2.0-RC1/api/) - [Documentation](https://docs.spring.io/spring-data/ldap/reference/) - [Changelog](https://github.com/spring-projects/spring-data-ldap/releases/tag/3.2.0-RC1)
-   Spring Data REST `4.2 RC1` - [Javadoc](https://docs.spring.io/spring-data/rest/docs/4.2.0-RC1/api/) - [Documentation](https://docs.spring.io/spring-data/rest/reference/) - [Changelog](https://github.com/spring-projects/spring-data-rest/releases/tag/4.2.0-RC1)
-   Spring Data Redis `3.2 RC1` - [Javadoc](https://docs.spring.io/spring-data/redis/docs/3.2.0-RC1/api/) - [Documentation](https://docs.spring.io/spring-data/redis/reference/) - [Changelog](https://github.com/spring-projects/spring-data-redis/releases/tag/3.2.0-RC1)
-   Spring Data Elasticsearch `5.2 RC1` - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/5.2.0-RC1/api/) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/reference/) - [Changelog](https://github.com/spring-projects/spring-data-elasticsearch/releases/tag/5.2.0-RC1)
-   Spring Data Couchbase `5.2 RC1` - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/5.2.0-RC1/api/) - [Documentation](https://docs.spring.io/spring-data/couchbase/reference/) - [Changelog](https://github.com/spring-projects/spring-data-couchbase/releases/tag/5.2.0-RC1)
-   Spring Data Relational `3.2 RC1` - [Javadoc](https://docs.spring.io/spring-data/relational/docs/3.2.0-RC1/api/) - [Documentation](https://docs.spring.io/spring-data/relational/reference/) - [Changelog](https://github.com/spring-projects/spring-data-relational/releases/tag/3.2.0-RC1)