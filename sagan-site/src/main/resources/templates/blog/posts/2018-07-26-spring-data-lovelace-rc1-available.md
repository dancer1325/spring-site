---
title: Spring Data Lovelace RC1 available
source: https://spring.io/blog/2018/07/26/spring-data-lovelace-rc1-available
scraped: 2026-02-23T15:18:14.985Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  July 26, 2018 | 0 Comments
---

# Spring Data Lovelace RC1 available

_Releases | Mark Paluch |  July 26, 2018 | 0 Comments_

On behalf of the Spring Data team, it is my pleasure to announce the availability of the Lovelace RC1 release. The first release candidate ships on top of the just-released Spring Framework 5.1 RC1 and in preparation of the upcoming Spring Boot 2.1 M1 release.

This release candidate ships with [194 tickets fixed](https://jira.spring.io/issues/?filter=16137) and contains the following notable changes:

-   Support for immutable objects.
-   Upgrade of Querydsl for MongoDB to use the Document API, letting you publish lifecycle events and participation in managed transactions.
-   Reactive `Slice` query support for Apache Cassandra.
-   Kotlin extension for Apache Cassandra.
-   Reactive `SCAN` support for Redis.

Immutable object support allows the use of truly immutable objects with Spring Data without interference caused by reflective access. Previously, immutable objects could experience a change if those were subject to ID generation, auditing, or optimistic locking. These kinds of operations mutated entities in place, which resulted in changes of actually immutable objects.

As of this release, Immutable object support ensures that immutable entities are not changed. `insert` and `save` methods return a new instance of the object that is associated with a mutation, such as a generated ID. This change requires your code to recompile as method return types have changed. Immutable object support requires a corresponding data model within the application code:

-   Usage of Kotlin data classes to leverage the `.copy(…)` method
-   Value objects exposing `with...` methods

`with...` methods create a new instance of an object that carries all previous property values and has a changed value of the `with…` property, as the following example shows:

```java
Copyclass Person
{
  private final @Id String id;
  private final String name;
  
  private Person(String id, String name) {
    // …
  }
  
  // …
  
  Person withId(String id) {
   return new Person(id, this.name);
  }
}
```

Lombok users can use `@Value` and `@Wither` annotations to follow the `with...` pattern.

Immutable object support is available for the Spring Data MongoDB, Apache Cassandra, Couchbase, ElasticSearch, Redis, KeyValue, Neo4j (Auditing), and Spring Data REST modules. Immutable object support for JPA is not possible, as the mapping layer resides inside JPA implementations. Entirely immutable objects with bi-directional relations are not possible for Neo4j. Immutable object support for JDBC follows along with Lovelace RC2.

We are aiming for a Lovelace RC2 release for the end of August and a GA release mid-September, just in time for this years' SpringOne Platform in Washington DC.

Here are the links to all the details, documentation and changelogs:

-   Spring Data Commons 2.1 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-commons/2.1.0.RC1) - [Javadoc](http://docs.spring.io/spring-data/commons/docs/2.1.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/commons/docs/2.1.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/commons/docs/2.1.0.RC1/changelog.txt)
-   Spring Data JPA 2.1 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jpa/2.1.0.RC1) - [Javadoc](http://docs.spring.io/spring-data/jpa/docs/2.1.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/jpa/docs/2.1.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/jpa/docs/2.1.0.RC1/changelog.txt)
-   Spring Data for Apache Solr 4.0 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-solr/4.0.0.RC1) - [Javadoc](http://docs.spring.io/spring-data/solr/docs/4.0.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/solr/docs/4.0.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/solr/docs/4.0.0.RC1/changelog.txt)
-   Spring Data MongoDB 2.1 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-mongodb/2.1.0.RC1) - [Javadoc](http://docs.spring.io/spring-data/mongodb/docs/2.1.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/mongodb/docs/2.1.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/mongodb/docs/2.1.0.RC1/changelog.txt)
-   Spring Data for Apache Cassandra 2.1 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-cassandra/2.1.0.RC1) - [Javadoc](http://docs.spring.io/spring-data/cassandra/docs/2.1.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/cassandra/docs/2.1.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/cassandra/docs/2.1.0.RC1/changelog.txt)
-   Spring Data KeyValue 2.1 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-keyvalue/2.1.0.RC1) - [Javadoc](http://docs.spring.io/spring-data/keyvalue/docs/2.1.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/keyvalue/docs/2.1.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/keyvalue/docs/2.1.0.RC1/changelog.txt)
-   Spring Data Gemfire 2.1 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-gemfire/2.1.0.RC1) - [Javadoc](http://docs.spring.io/spring-data/gemfire/docs/2.1.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/gemfire/docs/2.1.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/gemfire/docs/2.1.0.RC1/changelog.txt)
-   Spring Data Neo4j 5.1 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-neo4j/5.1.0.RC1) - [Javadoc](http://docs.spring.io/spring-data/neo4j/docs/5.1.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/neo4j/docs/5.1.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/neo4j/docs/5.1.0.RC1/changelog.txt)
-   Spring Data for Apache Geode 2.1 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-geode/2.1.0.RC1) - [Javadoc](http://docs.spring.io/spring-data/geode/docs/2.1.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/geode/docs/2.1.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/geode/docs/2.1.0.RC1/changelog.txt)
-   Spring Data LDAP 2.1 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-ldap/2.1.0.RC1) - [Javadoc](http://docs.spring.io/spring-data/ldap/docs/2.1.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/ldap/docs/2.1.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/ldap/docs/2.1.0.RC1/changelog.txt)
-   Spring Data Envers 2.1 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-envers/2.1.0.RC1) - [Javadoc](http://docs.spring.io/spring-data/envers/docs/2.1.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/envers/docs/2.1.0.RC1/reference/html)
-   Spring Data REST 3.1 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-rest-webmvc/3.1.0.RC1) - [Javadoc](http://docs.spring.io/spring-data/rest/docs/3.1.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/rest/docs/3.1.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/rest/docs/3.1.0.RC1/changelog.txt)
-   Spring Data Redis 2.1 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-redis/2.1.0.RC1) - [Javadoc](http://docs.spring.io/spring-data/redis/docs/2.1.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/redis/docs/2.1.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/redis/docs/2.1.0.RC1/changelog.txt)
-   Spring Data Elasticsearch 3.1 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-elasticsearch/3.1.0.RC1) - [Javadoc](http://docs.spring.io/spring-data/elasticsearch/docs/3.1.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/elasticsearch/docs/3.1.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/elasticsearch/docs/3.1.0.RC1/changelog.txt)
-   Spring Data Couchbase 3.1 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-couchbase/3.1.0.RC1) - [Javadoc](http://docs.spring.io/spring-data/couchbase/docs/3.1.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/couchbase/docs/3.1.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/couchbase/docs/3.1.0.RC1/changelog.txt)
-   Spring Data JDBC 1.0 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jdbc/1.0.0.RC1) - [Javadoc](http://docs.spring.io/spring-data/jdbc/docs/1.0.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/jdbc/docs/1.0.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/jdbc/docs/1.0.0.RC1/changelog.txt)