---
title: Spring Data 2025.1.0-M5 released
source: https://spring.io/blog/2025/08/15/spring-data-2025-1-0-M5-released
scraped: 2026-02-23T07:33:21.222Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  August 15, 2025 | 1 Comment
---

# Spring Data 2025.1.0-M5 released

_Releases | Mark Paluch |  August 15, 2025 | 1 Comment_

On behalf of the team and everyone who has contributed, I am pleased to announce the fourth milestone for the next Spring Data generation. This milestone continues delivering new features, refinements, and dependency upgrades.

## [](#updated-mongodb-uuid-format-defaults)Updated MongoDB UUID Format Defaults

Spring Data MongoDB now defaults to the BSON binary subtype 4 to represent UUIDs migrating off the legacy subtype 3. While this change doesn't manifest in a breaking code change, any existing data stored in MongoDB using subtype 3 will not be read correctly and will either require migrating to BSON binary subtype 4 or switching the default back to subtype 3 until the migration is complete.

This is a rather subtle change that only shows its effect on existing data. We're strongly considering to remove any defaulting, including the `BigDecimal` and `BigInteger` format defaults in favor of an explicit configuration to avoid any surprises in the future. If you have any feedback on this topic, please let us know via [GitHub](https://github.com/spring-projects/spring-data-mongodb/issues/5037).

## [](#composite-identifiers-in-spring-data-r2dbc)Composite Identifiers in Spring Data R2DBC

Spring Data R2DBC ships with Composite Id support and full support for embeddables. Composite identifiers can now be complex types, ideally a type with a set of simple properties. A simple example would look like:

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

We aim to ship Jackson 3 support with the next milestone. Refer to our [detailed release notes](https://github.com/spring-projects/spring-data-commons/wiki/Spring-Data-2025.1-Release-Notes) for a complete list of changes.

Thanks to all those who have contributed with issue reports and pull requests.

## [](#202510-m5)2025.1.0-M5

-   Spring Data Commons `4.0 M5` - [Javadoc](https://docs.spring.io/spring-data/commons/docs/4.0.0-M5/api/) - [Documentation](https://docs.spring.io/spring-data/commons/reference/4.0/) - [Changelog](https://github.com/spring-projects/spring-data-commons/releases/tag/4.0.0-M5)
-   Spring Data JPA `4.0 M5` - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/4.0.0-M5/api/) - [Documentation](https://docs.spring.io/spring-data/jpa/reference/4.0/) - [Changelog](https://github.com/spring-projects/spring-data-jpa/releases/tag/4.0.0-M5)
-   Spring Data Neo4j `8.0 M5` - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/8.0.0-M5/api/) - [Documentation](https://docs.spring.io/spring-data/neo4j/reference/8.0/) - [Changelog](https://github.com/spring-projects/spring-data-neo4j/releases/tag/8.0.0-M5)
-   Spring Data for Apache Cassandra `5.0 M5` - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/5.0.0-M5/api/) - [Documentation](https://docs.spring.io/spring-data/cassandra/reference/5.0/) - [Changelog](https://github.com/spring-projects/spring-data-cassandra/releases/tag/5.0.0-M5)
-   Spring Data MongoDB `5.0 M5` - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/5.0.0-M5/api/) - [Documentation](https://docs.spring.io/spring-data/mongodb/reference/5.0/) - [Changelog](https://github.com/spring-projects/spring-data-mongodb/releases/tag/5.0.0-M5)
-   Spring Data KeyValue `4.0 M5` - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/4.0.0-M5/api/) - [Documentation](https://docs.spring.io/spring-data/keyvalue/reference/4.0/) - [Changelog](https://github.com/spring-projects/spring-data-keyvalue/releases/tag/4.0.0-M5)
-   Spring Data LDAP `4.0 M5` - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/4.0.0-M5/api/) - [Documentation](https://docs.spring.io/spring-data/ldap/reference/4.0/) - [Changelog](https://github.com/spring-projects/spring-data-ldap/releases/tag/4.0.0-M5)
-   Spring Data REST `5.0 M5` - [Javadoc](https://docs.spring.io/spring-data/rest/docs/5.0.0-M5/api/) - [Documentation](https://docs.spring.io/spring-data/rest/reference/5.0/) - [Changelog](https://github.com/spring-projects/spring-data-rest/releases/tag/5.0.0-M5)
-   Spring Data Redis `4.0 M5` - [Javadoc](https://docs.spring.io/spring-data/redis/docs/4.0.0-M5/api/) - [Documentation](https://docs.spring.io/spring-data/redis/reference/4.0/) - [Changelog](https://github.com/spring-projects/spring-data-redis/releases/tag/4.0.0-M5)
-   Spring Data Elasticsearch `6.0 M5` - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/6.0.0-M5/api/) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/reference/6.0/) - [Changelog](https://github.com/spring-projects/spring-data-elasticsearch/releases/tag/6.0.0-M5)
-   Spring Data Couchbase `6.0 M5` - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/6.0.0-M5/api/) - [Documentation](https://docs.spring.io/spring-data/couchbase/reference/6.0/) - [Changelog](https://github.com/spring-projects/spring-data-couchbase/releases/tag/6.0.0-M5)
-   Spring Data Relational `4.0 M5` - [Javadoc](https://docs.spring.io/spring-data/relational/docs/4.0.0-M5/api/) - [Documentation](https://docs.spring.io/spring-data/relational/reference/4.0/) - [Changelog](https://github.com/spring-projects/spring-data-relational/releases/tag/4.0.0-M5)