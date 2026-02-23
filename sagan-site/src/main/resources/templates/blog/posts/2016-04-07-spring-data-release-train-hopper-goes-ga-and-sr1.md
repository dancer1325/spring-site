---
title: Spring Data Release Train Hopper Goes GA (and SR1)!
source: https://spring.io/blog/2016/04/07/spring-data-release-train-hopper-goes-ga-and-sr1
scraped: 2026-02-23T19:17:28.113Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  April 07, 2016 | 5 Comments
---

# Spring Data Release Train Hopper Goes GA (and SR1)!

_Releases | Oliver Drotbohm |  April 07, 2016 | 5 Comments_

On behalf of the entire Spring Data team I am happy to announce the general availability of the Spring Data release train Hopper. The train includes 395 tickets fixed and its most important additions are:

-   Upgrade of the Spring Framework baseline to 4.2 (4.2.5 in particular).
-   Support for Query by Example in [Spring Data JPA](https://github.com/spring-projects/spring-data-examples/tree/master/jpa/query-by-example) and [MongoDB](https://github.com/spring-projects/spring-data-examples/tree/master/mongodb/query-by-example).
-   Improved support for composed annotations.
-   Support for lookup types and nested associations in Spring Data REST
-   Major upgrades of the Solr (2.0 on Solr 5.5), Neo4j (4.1), Couchbase (2.1 on Couchbase 2.0), Elasticsearch (2.0 on ES 2.2)
-   Upgrade to Querydsl 4.
-   Support for object mapping and repositories for [Spring Data Redis](https://github.com/spring-projects/spring-data-examples/tree/master/redis/repositories).
-   Support for [Redis Cluster](https://github.com/spring-projects/spring-data-examples/tree/master/redis/cluster).
-   Support for projections on repository query methods in [JPA](https://github.com/spring-projects/spring-data-examples/blob/cb50af3595ea6ecf7f59ced3c17a6e08ed0150c5/jpa/example/src/main/java/example/springdata/jpa/projections/CustomerRepository.java#L27) and [MongoDB](https://github.com/spring-projects/spring-data-examples/blob/cb50af3595ea6ecf7f59ced3c17a6e08ed0150c5/mongodb/example/src/main/java/example/springdata/mongodb/projections/CustomerRepository.java#L29).
-   Addition of Spring Data Envers to the release train (previously maintained separately).

***NOTE: Due to a glitch during the release process the Spring Data JPA artifact deployed to Maven Central is broken. We issued a service release for the entire train immediately so that the recommended version to upgrade to is `Hopper-SR1`!***

Find out more links to the tickets these features are implemented by in our [curated changelog](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Hopper). There's going to be a follow up blog post with an in-depth discussion of the new features added to the release in the upcoming days.

The easiest way to upgrade to this release train is by using the Spring Data BOM in combination with the version `Hopper-SR1`. If you're using any of the modules with major store upgrades in the back be prepared to have to make some changes to your application code as well. Coming from Gosling, the same applies to Querydsl in case you happen to use that.

Spring Boot users have to be a bit more careful but *should* be able to upgrade for the modules that didn't undergo any major upgrades (e.g. JPA, MongoDB) on 1.3 even. If you're using modules that did, be prepared to have to manually upgrade to newer versions of the store drivers and disable some auto-configuration. If in doubt, please consult the Spring Data Examples for sample setups. Full support for Hopper is going to be shipped with Spring Boot 1.4 M2.

The team will be busy presenting about the Hopper release train at different conferences coming up in the near future. [JAX 2016](http://jax.de) is taking place in Germany in two weeks, followed by [Spring I/O](http://www.springio.net/) in Barcelona and [SpringOne Platform](http://springoneplatform.io/) in Las Vegas early August. Make sure you've got your tickets booked if you're eager to learn more about the latest and greatest in the release train.

The next release train will be named [Ingalls](https://en.wikipedia.org/wiki/Daniel_Henry_Holmes_Ingalls,_Jr.) and is supposed to be released around SpringOne.

To round things off, here are the modules included in the release:

-   Spring Data Commons 1.12.1 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-commons/1.12.1.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/commons/docs/1.12.1.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/commons/docs/1.12.1.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/commons/docs/1.12.1.RELEASE/changelog.txt)
-   Spring Data JPA 1.10.1 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-jpa/1.10.1.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/jpa/docs/1.10.1.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/jpa/docs/1.10.1.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/jpa/docs/1.10.1.RELEASE/changelog.txt)
-   Spring Data KeyValue 1.1.1 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-keyvalue/1.1.1.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/keyvalue/docs/1.1.1.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/keyvalue/docs/1.1.1.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/keyvalue/docs/1.1.1.RELEASE/changelog.txt)
-   Spring Data Cassandra 1.4.1 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-cassandra/1.4.1.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/cassandra/docs/1.4.1.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/cassandra/docs/1.4.1.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/cassandra/docs/1.4.1.RELEASE/changelog.txt)
-   Spring Data Solr 2.0.1 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-solr/2.0.1.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/solr/docs/2.0.1.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/solr/docs/2.0.1.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/solr/docs/2.0.1.RELEASE/changelog.txt)
-   Spring Data Gemfire 1.8.1 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-gemfire/1.8.1.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/gemfire/docs/1.8.1.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/gemfire/docs/1.8.1.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/gemfire/docs/1.8.1.RELEASE/changelog.txt)
-   Spring Data Neo4j 4.1.1 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-neo4j/4.1.1.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/neo4j/docs/4.1.1.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/neo4j/docs/4.1.1.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/neo4j/docs/4.1.1.RELEASE/changelog.txt)
-   Spring Data MongoDB 1.9.1 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-mongodb/1.9.1.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/mongodb/docs/1.9.1.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/mongodb/docs/1.9.1.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/mongodb/docs/1.9.1.RELEASE/changelog.txt)
-   Spring Data Envers 1.0.1 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-envers/1.0.1.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/envers/docs/1.0.1.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/envers/docs/1.0.1.RELEASE/reference/html)
-   Spring Data REST 2.5.1 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-rest-webmvc/2.5.1.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/rest/docs/2.5.1.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/rest/docs/2.5.1.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/rest/docs/2.5.1.RELEASE/changelog.txt)
-   Spring Data Redis 1.7.1 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-redis/1.7.1.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/redis/docs/1.7.1.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/redis/docs/1.7.1.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/redis/docs/1.7.1.RELEASE/changelog.txt)
-   Spring Data Elasticsearch 2.0.1 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-elasticsearch/2.0.1.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/elasticsearch/docs/2.0.1.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/elasticsearch/docs/2.0.1.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/elasticsearch/docs/2.0.1.RELEASE/changelog.txt)
-   Spring Data Couchbase 2.1.1 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-couchbase/2.1.1.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/couchbase/docs/2.1.1.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/couchbase/docs/2.1.1.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/couchbase/docs/2.1.1.RELEASE/changelog.txt)