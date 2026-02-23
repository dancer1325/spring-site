---
title: Spring Data release train Kay goes GA
source: https://spring.io/blog/2017/10/02/spring-data-release-train-kay-goes-ga
scraped: 2026-02-23T16:17:41.500Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oliver Drotbohm |  October 02, 2017 | 9 Comments
---

# Spring Data release train Kay goes GA

_Engineering | Oliver Drotbohm |  October 02, 2017 | 9 Comments_

On behalf of the Spring Data engineering team I am happy to announce the general availability of Spring Data Kay. It's the first major revision since Spring Data's inception in 2009 and thus packed with tons of features. Here are the most significant ones:

-   Upgrade to Spring Framework 5.0, Java 8 and JavaEE 7 as baseline
-   Revised repository APIs (better method names, `Optional` etc.)
-   A revised repository composition model
-   Support for reactive data access for Cassandra, Couchbase, MongoDB and Redis
-   Addition of Spring Data Geode to the release train
-   [Use of nullability annotations and advanced runtime checks on those](https://docs.spring.io/spring-data/jpa/docs/current-SNAPSHOT/reference/html/#repositories.nullability)
-   Kotlin support for null-safety and immutable data classes supported through Kotlin constructors
-   General Java 9 compatibility

Find out more about what's new in the curated changelog, [previous blog posts](https://spring.io/blog/2017/06/20/a-preview-on-spring-data-kay) (and an [even former one](https://spring.io/blog/2016/11/28/going-reactive-with-spring-data) on the reactive bits) and the what's new sections of the individual module's reference documentation.

The release will be included in the upcoming Spring Boot milestone to give us time for some further refinements and a first service release for Boot 2.0's GA. Besides that, we're now starting the work on our upcoming release train [Lovelace](https://en.wikipedia.org/wiki/Ada_Lovelace).

Also, make sure you're not going to miss this year's [SpringOne Platform](https://springoneplatform.io/) conference that's packed with data related talks, opportunities to learn about the latest and greatest features and of course some previews about what we're planning to do next. Discounted pricing is running out soon!

Last but not least, as usual, the laundry list:

-   Spring Data Commons 2.0 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-commons/2.0.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/commons/docs/2.0.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/commons/docs/2.0.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/commons/docs/2.0.0.RELEASE/changelog.txt)
-   Spring Data JPA 2.0 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-jpa/2.0.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/jpa/docs/2.0.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/jpa/docs/2.0.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/jpa/docs/2.0.0.RELEASE/changelog.txt)
-   Spring Data for Apache Solr 3.0 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-solr/3.0.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/solr/docs/3.0.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/solr/docs/3.0.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/solr/docs/3.0.0.RELEASE/changelog.txt)
-   Spring Data for Apache Cassandra 2.0 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-cassandra/2.0.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/cassandra/docs/2.0.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/cassandra/docs/2.0.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/cassandra/docs/2.0.0.RELEASE/changelog.txt)
-   Spring Data KeyValue 2.0 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-keyvalue/2.0.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/keyvalue/docs/2.0.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/keyvalue/docs/2.0.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/keyvalue/docs/2.0.0.RELEASE/changelog.txt)
-   Spring Data MongoDB 2.0 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-mongodb/2.0.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/mongodb/docs/2.0.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/mongodb/docs/2.0.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/mongodb/docs/2.0.0.RELEASE/changelog.txt)
-   Spring Data Gemfire 2.0 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-gemfire/2.0.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/gemfire/docs/2.0.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/gemfire/docs/2.0.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/gemfire/docs/2.0.0.RELEASE/changelog.txt)
-   Spring Data Neo4j 5.0 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-neo4j/5.0.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/neo4j/docs/5.0.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/neo4j/docs/5.0.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/neo4j/docs/5.0.0.RELEASE/changelog.txt)
-   Spring Data for Apache Geode 2.0 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-geode/2.0.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/geode/docs/2.0.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/geode/docs/2.0.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/geode/docs/2.0.0.RELEASE/changelog.txt)
-   Spring Data LDAP 2.0 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-ldap/2.0.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/ldap/docs/2.0.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/ldap/docs/2.0.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/ldap/docs/2.0.0.RELEASE/changelog.txt)
-   Spring Data Envers 2.0 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-envers/2.0.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/envers/docs/2.0.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/envers/docs/2.0.0.RELEASE/reference/html)
-   Spring Data REST 3.0 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-rest-webmvc/3.0.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/rest/docs/3.0.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/rest/docs/3.0.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/rest/docs/3.0.0.RELEASE/changelog.txt)
-   Spring Data Redis 2.0 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-redis/2.0.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/redis/docs/2.0.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/redis/docs/2.0.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/redis/docs/2.0.0.RELEASE/changelog.txt)
-   Spring Data Elasticsearch 3.0 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-elasticsearch/3.0.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/elasticsearch/docs/3.0.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/elasticsearch/docs/3.0.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/elasticsearch/docs/3.0.0.RELEASE/changelog.txt)
-   Spring Data Couchbase 3.0 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-couchbase/3.0.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/couchbase/docs/3.0.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/couchbase/docs/3.0.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/couchbase/docs/3.0.0.RELEASE/changelog.txt)