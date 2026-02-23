---
title: Spring Data 2025.1.0-M2 released
source: https://spring.io/blog/2025/04/22/spring-data-2025-1-0-M2-released
scraped: 2026-02-23T07:45:24.504Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  April 22, 2025 | 0 Comments
---

# Spring Data 2025.1.0-M2 released

_Releases | Mark Paluch |  April 22, 2025 | 0 Comments_

On behalf of the team and everyone who has contributed, I am pleased to announce a new milestone for the next Spring Data generation. The second milestone continues delivering new features and refinement mostly around infrastructure themes.

## [](#jspecify)JSpecify

Spring Data is gradually migrating from Spring's Nullability annotations to JSpecify. The following projects are equipped with JSpecify annotations:

-   Commons
-   JPA
-   MongoDB
-   LDAP
-   Cassandra
-   KeyValue
-   Elasticsearch

Other modules will follow suit.

## [](#jpa-refinements)JPA Refinements

Apart from JSpecify, Spring Data JPA ships with a few refinements around the `QueryEnhancer` and sorting using Specifications.

You can now configure a `QueryEnhancerSelector` through `@EnableJpaRepositories` to select which `QueryEnhancerFactory` (parser and rewrite utility for JPQL and native queries) to use instead of relying on our defaulting and auto-detection of JSqlParser.

With that change, the previously used `spring.data.jpa.query.native.parser` flag in `spring.properties` has been removed.

A selected set of expressions can now be used with `JpaSort.unsafe(…)` together with Specifications. The newly introduced parser for `ORDER BY` expressions translates `ORDER BY` items to JPA's Criteria API Expressions as much as possible. `ORDER BY` parsing can translate simple path expressions, function calls and `CASE` clauses. Any more complex ordering items (`TREAT`, `CAST`, nested queries) should be provided directly to `CriteriaQuery`.

Please see the [release notes](https://github.com/spring-projects/spring-data-commons/wiki/Spring-Data-2025.1-Release-Notes) for more details and upgrade instructions.

Thanks to all those who have contributed with issue reports and pull requests.

## [](#202510-m2)2025.1.0-M2

-   Spring Data Commons `4.0 M2` - [Javadoc](https://docs.spring.io/spring-data/commons/docs/4.0.0-M2/api/) - [Documentation](https://docs.spring.io/spring-data/commons/reference/4.0/) - [Changelog](https://github.com/spring-projects/spring-data-commons/releases/tag/4.0.0-M2)
-   Spring Data JPA `4.0 M2` - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/4.0.0-M2/api/) - [Documentation](https://docs.spring.io/spring-data/jpa/reference/4.0/) - [Changelog](https://github.com/spring-projects/spring-data-jpa/releases/tag/4.0.0-M2)
-   Spring Data KeyValue `4.0 M2` - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/4.0.0-M2/api/) - [Documentation](https://docs.spring.io/spring-data/keyvalue/reference/4.0/) - [Changelog](https://github.com/spring-projects/spring-data-keyvalue/releases/tag/4.0.0-M2)
-   Spring Data for Apache Cassandra `5.0 M2` - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/5.0.0-M2/api/) - [Documentation](https://docs.spring.io/spring-data/cassandra/reference/5.0/) - [Changelog](https://github.com/spring-projects/spring-data-cassandra/releases/tag/5.0.0-M2)
-   Spring Data Neo4j `8.0 M2` - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/8.0.0-M2/api/) - [Documentation](https://docs.spring.io/spring-data/neo4j/reference/8.0/) - [Changelog](https://github.com/spring-projects/spring-data-neo4j/releases/tag/8.0.0-M2)
-   Spring Data MongoDB `5.0 M2` - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/5.0.0-M2/api/) - [Documentation](https://docs.spring.io/spring-data/mongodb/reference/5.0/) - [Changelog](https://github.com/spring-projects/spring-data-mongodb/releases/tag/5.0.0-M2)
-   Spring Data LDAP `4.0 M2` - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/4.0.0-M2/api/) - [Documentation](https://docs.spring.io/spring-data/ldap/reference/4.0/) - [Changelog](https://github.com/spring-projects/spring-data-ldap/releases/tag/4.0.0-M2)
-   Spring Data REST `5.0 M2` - [Javadoc](https://docs.spring.io/spring-data/rest/docs/5.0.0-M2/api/) - [Documentation](https://docs.spring.io/spring-data/rest/reference/5.0/) - [Changelog](https://github.com/spring-projects/spring-data-rest/releases/tag/5.0.0-M2)
-   Spring Data Redis `4.0 M2` - [Javadoc](https://docs.spring.io/spring-data/redis/docs/4.0.0-M2/api/) - [Documentation](https://docs.spring.io/spring-data/redis/reference/4.0/) - [Changelog](https://github.com/spring-projects/spring-data-redis/releases/tag/4.0.0-M2)
-   Spring Data Elasticsearch `6.0 M2` - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/6.0.0-M2/api/) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/reference/6.0/) - [Changelog](https://github.com/spring-projects/spring-data-elasticsearch/releases/tag/6.0.0-M2)
-   Spring Data Couchbase `6.0 M2` - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/6.0.0-M2/api/) - [Documentation](https://docs.spring.io/spring-data/couchbase/reference/6.0/) - [Changelog](https://github.com/spring-projects/spring-data-couchbase/releases/tag/6.0.0-M2)
-   Spring Data Relational `4.0 M2` - [Javadoc](https://docs.spring.io/spring-data/relational/docs/4.0.0-M2/api/) - [Documentation](https://docs.spring.io/spring-data/relational/reference/4.0/) - [Changelog](https://github.com/spring-projects/spring-data-relational/releases/tag/4.0.0-M2)