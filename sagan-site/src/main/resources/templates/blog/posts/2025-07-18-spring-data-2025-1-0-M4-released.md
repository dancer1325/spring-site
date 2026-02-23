---
title: Spring Data 2025.1.0-M4 released
source: https://spring.io/blog/2025/07/18/spring-data-2025-1-0-M4-released
scraped: 2026-02-23T07:36:15.375Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  July 18, 2025 | 2 Comments
---

# Spring Data 2025.1.0-M4 released

_Releases | Mark Paluch |  July 18, 2025 | 2 Comments_

On behalf of the team and everyone who has contributed, I am pleased to announce the fourth milestone for the next Spring Data generation. This milestone continues delivering new features and refinements.

## [](#ahead-of-time-optimization-for-repositories)Ahead-of-Time Optimization for Repositories

When applying AOT optimizations through Spring Boot's build plugin, then AOT-generated Repositories are now enabled by default: You no longer need to set the `spring.aot.repositories.enabled` property. Additionally, you can disable AOT repository generation entirely or individually by setting either `spring.aot.jpa.repositories.enabled=false` or `spring.aot.mongodb.repositories.enabled=false`.

For MongoDB, we've added AOT repository support for additional query methods:

-   Using Geospatial types for `Near` and `Within` queries
-   Vector Search
-   Collations
-   Value Expressions

## [](#updated-mongodb-bigdecimal-and-biginteger-representation-defaults)Updated MongoDB BigDecimal and BigInteger Representation Defaults

Spring Data MongoDB has updated its default using `Decimal128` for `BigDecimal` and `BigInteger` values (querying and writing). Existing values can be read by Spring Data MongoDB 5.0, but queries and writes will use `Decimal128`. Make sure to migrate either your data to `Decimal128` or switch back the default or individual properties to use the String-based representation.

## [](#composite-identifiers-in-spring-data-jdbc)Composite Identifiers in Spring Data JDBC

Spring Data JDBC ships with Composite Id support. Composite identifiers can now be complex types, ideally a type with a set of simple properties. A simple example would look like:

```java
Copyclass Person {
    @Id Name id; 
    String nickname;
    Integer age;
}

record Name(String first, String last) {
}
```

While it is not necessary (complex `@Id` types are considered embeddables) for simple arrangements, you can use `@Embedded(prefix=…)` to configure column name prefixes.

## [](#spring-data-redis)Spring Data Redis

Spring Data Redis is now annotated using JSpecify annotations. Command and Operations interfaces are deliberately `@NullUnmarked` as Redis' Transactional behavior renders each method conditionally nullable based on whether it is used in the context of transactions or pipelining. We consider this to be the best compromise between nullness indication and the trouble that stems from working around nullness indication that isn't applicable in a certain context.

We also ship with Jackson 3-based serializers along with the existing Jackson 2 support that is now deprecated.

Going forward, we're working on finalizing Jackson 3 support in the upcoming months. Refer to our [detailed release notes](https://github.com/spring-projects/spring-data-commons/wiki/Spring-Data-2025.1-Release-Notes) for a complete list of changes.

Thanks to all those who have contributed with issue reports and pull requests.

## [](#202510-m4)2025.1.0-M4

-   Spring Data Commons `4.0 M4` - [Javadoc](https://docs.spring.io/spring-data/commons/docs/4.0.0-M4/api/) - [Documentation](https://docs.spring.io/spring-data/commons/reference/4.0/) - [Changelog](https://github.com/spring-projects/spring-data-commons/releases/tag/4.0.0-M4)
-   Spring Data JPA `4.0 M4` - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/4.0.0-M4/api/) - [Documentation](https://docs.spring.io/spring-data/jpa/reference/4.0/) - [Changelog](https://github.com/spring-projects/spring-data-jpa/releases/tag/4.0.0-M4)
-   Spring Data MongoDB `5.0 M4` - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/5.0.0-M4/api/) - [Documentation](https://docs.spring.io/spring-data/mongodb/reference/5.0/) - [Changelog](https://github.com/spring-projects/spring-data-mongodb/releases/tag/5.0.0-M4)
-   Spring Data KeyValue `4.0 M4` - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/4.0.0-M4/api/) - [Documentation](https://docs.spring.io/spring-data/keyvalue/reference/4.0/) - [Changelog](https://github.com/spring-projects/spring-data-keyvalue/releases/tag/4.0.0-M4)
-   Spring Data for Apache Cassandra `5.0 M4` - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/5.0.0-M4/api/) - [Documentation](https://docs.spring.io/spring-data/cassandra/reference/5.0/) - [Changelog](https://github.com/spring-projects/spring-data-cassandra/releases/tag/5.0.0-M4)
-   Spring Data Neo4j `8.0 M4` - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/8.0.0-M4/api/) - [Documentation](https://docs.spring.io/spring-data/neo4j/reference/8.0/) - [Changelog](https://github.com/spring-projects/spring-data-neo4j/releases/tag/8.0.0-M4)
-   Spring Data LDAP `4.0 M4` - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/4.0.0-M4/api/) - [Documentation](https://docs.spring.io/spring-data/ldap/reference/4.0/) - [Changelog](https://github.com/spring-projects/spring-data-ldap/releases/tag/4.0.0-M4)
-   Spring Data REST `5.0 M4` - [Javadoc](https://docs.spring.io/spring-data/rest/docs/5.0.0-M4/api/) - [Documentation](https://docs.spring.io/spring-data/rest/reference/5.0/) - [Changelog](https://github.com/spring-projects/spring-data-rest/releases/tag/5.0.0-M4)
-   Spring Data Redis `4.0 M4` - [Javadoc](https://docs.spring.io/spring-data/redis/docs/4.0.0-M4/api/) - [Documentation](https://docs.spring.io/spring-data/redis/reference/4.0/) - [Changelog](https://github.com/spring-projects/spring-data-redis/releases/tag/4.0.0-M4)
-   Spring Data Elasticsearch `6.0 M4` - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/6.0.0-M4/api/) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/reference/6.0/) - [Changelog](https://github.com/spring-projects/spring-data-elasticsearch/releases/tag/6.0.0-M4)
-   Spring Data Couchbase `6.0 M4` - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/6.0.0-M4/api/) - [Documentation](https://docs.spring.io/spring-data/couchbase/reference/6.0/) - [Changelog](https://github.com/spring-projects/spring-data-couchbase/releases/tag/6.0.0-M4)
-   Spring Data Relational `4.0 M4` - [Javadoc](https://docs.spring.io/spring-data/relational/docs/4.0.0-M4/api/) - [Documentation](https://docs.spring.io/spring-data/relational/reference/4.0/) - [Changelog](https://github.com/spring-projects/spring-data-relational/releases/tag/4.0.0-M4)