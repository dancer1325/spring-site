---
title: Spring Data 2026.0.0-M1 released
source: https://spring.io/blog/2026/02/13/spring-data-2026-0-0-m1-released
scraped: 2026-02-22T21:58:26.576Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  February 13, 2026 | 0 Comments
---

# Spring Data 2026.0.0-M1 released

_Releases | Mark Paluch |  February 13, 2026 | 0 Comments_

On behalf of the team and everyone who has contributed, I’m delighted to announce the first milestone of the `2026.0.0` release train.

## [](#support-for-type-safe-property-paths)Support for Type-Safe Property Paths

We now support type-safe property paths and property references as initiative to reduce the need for stringly-typed programming when referring to properties within an entity.

Java variants:

```java
CopyPropertyPath.from("name", Person.class) // existing String-based API
PropertyPath.of(Person::getName) // type-safe property reference expression

PropertyPath.from("address.country", Person.class) // existing nested path API
PropertyPath.of(Person::getAddress).then(Address::getCountry) // type-safe composed path expression

PropertyReference.of(Secret::getSecret)
```

Kotlin variants:

```kotlin
CopyPropertyReference.of(Secret::secret)

PropertyPath.of(Person::address / Address::city)
```

allowing type-safe usage through e.g.:

```java
CopySort.by(Person::getFirstName, Person::getLastName)
```

Type-Safe property-paths are available in Spring Data Commons `4.1 M1` and the following modules:

-   Spring Data Cassandra through the `Query`, `Criteria` and `Update` API for type-safe query construction.
-   Spring Data JDBC and R2DBC through the `Criteria` and `Update` API for type-safe query construction.
-   Spring Data JPA through the `Expressions` utility for an improved CriteriaBuilder API usage experience.
-   Spring Data MongoDB through the `Query`, `Criteria` and `Update` API for type-safe query construction.

Besides that, this milestone ships with enhancements, bugfixes, and dependency upgrades.

You can find more details in our [Release Notes](https://github.com/spring-projects/spring-data-commons/wiki/Spring-Data-2026.0-Release-Notes).

The upcoming Spring Boot 4.1 M2 milestone will pick up the release for your convenience by next week.

## [](#202600-m1)2026.0.0-M1

-   Spring Data Commons `4.1 M1` - [Javadoc](https://docs.spring.io/spring-data/commons/reference/4.1/api/java/) - [Documentation](https://docs.spring.io/spring-data/commons/reference/4.1/) - [Changelog](https://github.com/spring-projects/spring-data-commons/releases/tag/4.1.0-M1)
-   Spring Data JPA `4.1 M1` - [Javadoc](https://docs.spring.io/spring-data/jpa/reference/4.1/api/java/) - [Documentation](https://docs.spring.io/spring-data/jpa/reference/4.1/) - [Changelog](https://github.com/spring-projects/spring-data-jpa/releases/tag/4.1.0-M1)
-   Spring Data for Apache Cassandra `5.1 M1` - [Javadoc](https://docs.spring.io/spring-data/cassandra/reference/5.1/api/java/) - [Documentation](https://docs.spring.io/spring-data/cassandra/reference/5.1/) - [Changelog](https://github.com/spring-projects/spring-data-cassandra/releases/tag/5.1.0-M1)
-   Spring Data Neo4j `8.1 M1` - [Javadoc](https://docs.spring.io/spring-data/neo4j/reference/8.1/api/java/) - [Documentation](https://docs.spring.io/spring-data/neo4j/reference/8.1/) - [Changelog](https://github.com/spring-projects/spring-data-neo4j/releases/tag/8.1.0-M1)
-   Spring Data KeyValue `4.1 M1` - [Javadoc](https://docs.spring.io/spring-data/keyvalue/reference/4.1/api/java/) - [Documentation](https://docs.spring.io/spring-data/keyvalue/reference/4.1/) - [Changelog](https://github.com/spring-projects/spring-data-keyvalue/releases/tag/4.1.0-M1)
-   Spring Data MongoDB `5.1 M1` - [Javadoc](https://docs.spring.io/spring-data/mongodb/reference/5.1/api/java/) - [Documentation](https://docs.spring.io/spring-data/mongodb/reference/5.1/) - [Changelog](https://github.com/spring-projects/spring-data-mongodb/releases/tag/5.1.0-M1)
-   Spring Data LDAP `4.1 M1` - [Javadoc](https://docs.spring.io/spring-data/ldap/reference/4.1/api/java/) - [Documentation](https://docs.spring.io/spring-data/ldap/reference/4.1/) - [Changelog](https://github.com/spring-projects/spring-data-ldap/releases/tag/4.1.0-M1)
-   Spring Data REST `5.1 M1` - [Javadoc](https://docs.spring.io/spring-data/rest/reference/5.1/api/java/) - [Documentation](https://docs.spring.io/spring-data/rest/reference/5.1/) - [Changelog](https://github.com/spring-projects/spring-data-rest/releases/tag/5.1.0-M1)
-   Spring Data Redis `4.1 M1` - [Javadoc](https://docs.spring.io/spring-data/redis/reference/4.1/api/java/) - [Documentation](https://docs.spring.io/spring-data/redis/reference/4.1/) - [Changelog](https://github.com/spring-projects/spring-data-redis/releases/tag/4.1.0-M1)
-   Spring Data Elasticsearch `6.1 M1` - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/reference/6.1/api/java/) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/reference/6.1/) - [Changelog](https://github.com/spring-projects/spring-data-elasticsearch/releases/tag/6.1.0-M1)
-   Spring Data Couchbase `6.1 M1` - [Javadoc](https://docs.spring.io/spring-data/couchbase/reference/6.1/api/java/) - [Documentation](https://docs.spring.io/spring-data/couchbase/reference/6.1/) - [Changelog](https://github.com/spring-projects/spring-data-couchbase/releases/tag/6.1.0-M1)
-   Spring Data Relational `4.1 M1` - [Javadoc](https://docs.spring.io/spring-data/relational/reference/4.1/api/java/) - [Documentation](https://docs.spring.io/spring-data/relational/reference/4.1/) - [Changelog](https://github.com/spring-projects/spring-data-relational/releases/tag/4.1.0-M1)