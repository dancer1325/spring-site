---
title: Spring Data 2023.0 goes GA
source: https://spring.io/blog/2023/05/12/spring-data-2023-0-goes-ga
scraped: 2026-02-23T09:50:52.165Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  May 12, 2023 | 0 Comments
---

# Spring Data 2023.0 goes GA

_Releases | Mark Paluch |  May 12, 2023 | 0 Comments_

On behalf of the Spring Data engineering team and everyone who contributed to this release, I am delighted to announce the general availability of Spring Data `2023.0` (Codename: Ullman) from Maven Central! This release has a strong focus on AOT follow-ups and several module-specific improvements.

Spring Data `2023.0` leverages Spring Framework `6.0.9` as its baseline along with Project Reactor `2022.0.7` and Micrometer `1.10.6`.

A general theme of this release was the introduction keyset-based scrolling. We added a new Scroll API across the portfolio to implement alternative scrolling mechanisms for large query result consumption. Keyset- and Offset-based scrolling are available for JPA, MongoDB, and Neo4j initially and will be expanded to other modules over time. With the Scroll API being less opinionated on the underlying scrolling mechanism, Cassandra's pagination will be a good fit for fututre Scroll API adoption.

There are many other features and refinement and various changes within the individual modules. This release improves AOT development experience by smoothing out rough edges in the AOT processing for Querydsl and Kotlin support. Specifically, the JPA module ships with [JPQL and HQL parsers](https://spring.io/blog/2023/03/21/spring-data-jpa-introduces-query-parser) solving a batch of query rewrite issues for updating sort directions, projections and other features. To find out more about what’s new, see the [release notes](https://github.com/spring-projects/spring-data-commons/wiki/Spring-Data-2023.0-%28Ullman%29-Release-Notes) and the individual module reference documentation.

This release will be included in the upcoming Spring Boot 3.1 GA release. We'd like to hear from you, so keep the feedback coming.

To round things off, here are the links to the individual modules, changelogs and artifacts:

-   Spring Data Commons `3.1 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-commons/3.1.0) - [Javadoc](https://docs.spring.io/spring-data/commons/docs/3.1.0/api/) - [Documentation](https://docs.spring.io/spring-data/commons/docs/3.1.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-commons/releases/tag/3.1.0)
-   Spring Data JPA `3.1 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-jpa/3.1.0) - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/3.1.0/api/) - [Documentation](https://docs.spring.io/spring-data/jpa/docs/3.1.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-jpa/releases/tag/3.1.0)
-   Spring Data Neo4j `7.1 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-neo4j/7.1.0) - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/7.1.0/api/) - [Documentation](https://docs.spring.io/spring-data/neo4j/docs/7.1.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-neo4j/releases/tag/7.1.0)
-   Spring Data MongoDB `4.1 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-mongodb/4.1.0) - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/4.1.0/api/) - [Documentation](https://docs.spring.io/spring-data/mongodb/docs/4.1.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-mongodb/releases/tag/4.1.0)
-   Spring Data KeyValue `3.1 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-keyvalue/3.1.0) - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/3.1.0/api/) - [Documentation](https://docs.spring.io/spring-data/keyvalue/docs/3.1.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-keyvalue/releases/tag/3.1.0)
-   Spring Data for Apache Cassandra `4.1 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-cassandra/4.1.0) - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/4.1.0/api/) - [Documentation](https://docs.spring.io/spring-data/cassandra/docs/4.1.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-cassandra/releases/tag/4.1.0)
-   Spring Data LDAP `3.1 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-ldap/3.1.0) - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/3.1.0/api/) - [Documentation](https://docs.spring.io/spring-data/ldap/docs/3.1.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-ldap/releases/tag/3.1.0)
-   Spring Data REST `4.1 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-rest-webmvc/4.1.0) - [Javadoc](https://docs.spring.io/spring-data/rest/docs/4.1.0/api/) - [Documentation](https://docs.spring.io/spring-data/rest/docs/4.1.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-rest/releases/tag/4.1.0)
-   Spring Data Redis `3.1 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-redis/3.1.0) - [Javadoc](https://docs.spring.io/spring-data/redis/docs/3.1.0/api/) - [Documentation](https://docs.spring.io/spring-data/redis/docs/3.1.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-redis/releases/tag/3.1.0)
-   Spring Data Elasticsearch `5.1 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-elasticsearch/5.1.0) - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/5.1.0/api/) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/docs/5.1.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-elasticsearch/releases/tag/5.1.0)
-   Spring Data Couchbase `5.1 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-couchbase/5.1.0) - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/5.1.0/api/) - [Documentation](https://docs.spring.io/spring-data/couchbase/docs/5.1.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-couchbase/releases/tag/5.1.0)
-   Spring Data Relational `3.1 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-relational/3.1.0) - [Javadoc](https://docs.spring.io/spring-data/jdbc/docs/3.1.0/api/) - [Documentation](https://docs.spring.io/spring-data/jdbc/docs/3.1.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-relational/releases/tag/3.1.0)