---
title: Spring Data 2025.1.0-M6 released
source: https://spring.io/blog/2025/09/12/spring-data-2025-1-0-M6-released
scraped: 2026-02-23T07:30:54.821Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  September 12, 2025 | 0 Comments
---

# Spring Data 2025.1.0-M6 released

_Releases | Mark Paluch |  September 12, 2025 | 0 Comments_

On behalf of the team and everyone who has contributed, I am pleased to announce the sixth and last milestone for the next Spring Data generation. This milestone continues delivering new features, refinements, and dependency upgrades.

## [](#removed-mongodb-uuid-and-bigdecimal-defaults)Removed MongoDB UUID and BigDecimal Defaults

Spring Data MongoDB now aligns with the MongoDB Java Driver and no longer defaults to a representation for `UUID` values. Instead, you need to explicitly configure the desired representation through driver settings.

We're also no longer providing a default configuration value for `BigInteger` and resort the default for `BigDecimal` to `Decimal128` in accordance with MongoDB's default codecs. This is a much safer approach that prevents you your application from accidentally switching representations when upgrading to the new major version. Please make sure to configure formats for big numbers through `MongoCustomConversions`.

Setting the `BigDecimal` representation to `STRING` or `DECIMAL128` allows you to control the default representation for `BigDecimal` and `BigInteger` values. Any explicit type hints through `@Field(targetType = FieldType.DECIMAL128)` or `@Field(targetType = FieldType.STRING)` remain unaffected.

## [](#aot-repository-support-for-jdbc-and-apache-cassandra)AOT Repository Support for JDBC and Apache Cassandra

This milestone ships with AOT support for Spring Data JDBC and Spring Data for Apache Cassandra repositories. This includes support for query derivation, declared, and named queries.

## [](#ahead-of-time-generated-property-accessors-and-entity-instantiators)Ahead-of-Time-generated Property Accessors and Entity Instantiators

When enabling AOT processing, Spring Data includes generated property accessors and entity instantiators at build time in the final AOT bundle. Instead of generating these classes during runtime, we now capture the generated classes during AOT optimizations. This improves startup time and reduces memory consumption. Additionally, generated property accessors and entity instantiators are now available within GraalVM native images.

## [](#jackson-3-support)Jackson 3 Support

We're happy to announce that Spring Data Commons and Spring Data REST modules now support Jackson 3. While Spring Data Commons ships with deprecated Jackson 2 classes and can still be operated using Jackson 2, Spring Data REST requires Jackson 3 as Spring Data REST is effectively a huge abstraction over Jackson in some sense.

## [](#neo4j-vector-search)Neo4j Vector Search

Spring Data Neo4j supports now vector search methods based on a vector index at the repository level. The repository methods have to be annotated with `@VectorSearch(indexName,numberOfNodes)` to make use of Neo4j's vector search capabilities. The vector search can be combined with already existing search functions, like `findByName` and will invoke a vector search prior doing the name filtering. A `Vector` parameter is mandatory to make the query work but it can also be enhanced with a `Score` cutoff to ignore low-quality results.

```java
Copyinterface VectorSearchRepository extends CrudRepository<EntityWithVector, String> {

  @VectorSearch(indexName = "entityIndex", numberOfNodes = 2)
  SearchResults<EntityWithVector> findAllBy(Vector searchVector);

  @VectorSearch(indexName = "entityIndex", numberOfNodes = 2)
  SearchResult<EntityWithVector> findBy(Vector searchVector, Score score);

}
```

Find more details about Spring Data Neo4j's vector search in the [reference documentation](https://docs.spring.io/spring-data/neo4j/reference/8.0/repositories/vector-search.html).

This milestone is the last milestone before entering the release candidate phase in October followed by general availability in November. We encourage you to try out the new features and improvements and provide feedback to help us make Spring Data even better.

## [](#202510-m6)2025.1.0-M6

-   Spring Data Commons `4.0 M6` - [Javadoc](https://docs.spring.io/spring-data/commons/docs/4.0.0-M6/api/) - [Documentation](https://docs.spring.io/spring-data/commons/reference/4.0/) - [Changelog](https://github.com/spring-projects/spring-data-commons/releases/tag/4.0.0-M6)
-   Spring Data JPA `4.0 M6` - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/4.0.0-M6/api/) - [Documentation](https://docs.spring.io/spring-data/jpa/reference/4.0/) - [Changelog](https://github.com/spring-projects/spring-data-jpa/releases/tag/4.0.0-M6)
-   Spring Data Neo4j `8.0 M6` - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/8.0.0-M6/api/) - [Documentation](https://docs.spring.io/spring-data/neo4j/reference/8.0/) - [Changelog](https://github.com/spring-projects/spring-data-neo4j/releases/tag/8.0.0-M6)
-   Spring Data for Apache Cassandra `5.0 M6` - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/5.0.0-M6/api/) - [Documentation](https://docs.spring.io/spring-data/cassandra/reference/5.0/) - [Changelog](https://github.com/spring-projects/spring-data-cassandra/releases/tag/5.0.0-M6)
-   Spring Data MongoDB `5.0 M6` - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/5.0.0-M6/api/) - [Documentation](https://docs.spring.io/spring-data/mongodb/reference/5.0/) - [Changelog](https://github.com/spring-projects/spring-data-mongodb/releases/tag/5.0.0-M6)
-   Spring Data KeyValue `4.0 M6` - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/4.0.0-M6/api/) - [Documentation](https://docs.spring.io/spring-data/keyvalue/reference/4.0/) - [Changelog](https://github.com/spring-projects/spring-data-keyvalue/releases/tag/4.0.0-M6)
-   Spring Data LDAP `4.0 M6` - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/4.0.0-M6/api/) - [Documentation](https://docs.spring.io/spring-data/ldap/reference/4.0/) - [Changelog](https://github.com/spring-projects/spring-data-ldap/releases/tag/4.0.0-M6)
-   Spring Data REST `5.0 M6` - [Javadoc](https://docs.spring.io/spring-data/rest/docs/5.0.0-M6/api/) - [Documentation](https://docs.spring.io/spring-data/rest/reference/5.0/) - [Changelog](https://github.com/spring-projects/spring-data-rest/releases/tag/5.0.0-M6)
-   Spring Data Redis `4.0 M6` - [Javadoc](https://docs.spring.io/spring-data/redis/docs/4.0.0-M6/api/) - [Documentation](https://docs.spring.io/spring-data/redis/reference/4.0/) - [Changelog](https://github.com/spring-projects/spring-data-redis/releases/tag/4.0.0-M6)
-   Spring Data Elasticsearch `6.0 M6` - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/6.0.0-M6/api/) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/reference/6.0/) - [Changelog](https://github.com/spring-projects/spring-data-elasticsearch/releases/tag/6.0.0-M6)
-   Spring Data Couchbase `6.0 M6` - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/6.0.0-M6/api/) - [Documentation](https://docs.spring.io/spring-data/couchbase/reference/6.0/) - [Changelog](https://github.com/spring-projects/spring-data-couchbase/releases/tag/6.0.0-M6)
-   Spring Data Relational `4.0 M6` - [Javadoc](https://docs.spring.io/spring-data/relational/docs/4.0.0-M6/api/) - [Documentation](https://docs.spring.io/spring-data/relational/reference/4.0/) - [Changelog](https://github.com/spring-projects/spring-data-relational/releases/tag/4.0.0-M6)