---
title: Spring Data Release Train Ingalls Goes GA
source: https://spring.io/blog/2017/01/26/spring-data-release-train-ingalls-goes-ga
scraped: 2026-02-23T18:40:25.464Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  January 26, 2017 | 2 Comments
---

# Spring Data Release Train Ingalls Goes GA

_Releases | Oliver Drotbohm |  January 26, 2017 | 2 Comments_

On behalf of the Spring Data team I'd like to announce the general availability of our [Ingalls](https://en.wikipedia.org/wiki/Daniel_Henry_Holmes_Ingalls_Jr.) release train. After nine months of development, this release not only contains a huge set of new features, improvements and bug fixes, it also marks the conclusion of a branch of Spring Data that has helped developers dealing with persistence for more than 5 years --- even 8, if you count in some module's predecessors.

The release ships more than 630 tickets fixed in total. Here's a very truncated list of the most important features shipping with the release:

-   Upgrade to Spring 4.3 as Spring Framework baseline.
-   Add Spring Data LDAP (the Spring Data related bits of Spring LDAP) to the release train.
-   Elevate Spring Data for Apache Cassandra to a Core module, give it a complete overhaul and upgrade it to Cassandra 3. User defined types, support for Java 8 `Stream` and `Optional` etc.
-   Performance improvements in object-to-store mapping by avoiding reflection in favor of ASM generated code using method handles.
-   More aggregation framework for MongoDB.
-   Improved stream execution verification in JPA (reports a missing surrounding transaction).
-   Support for mapping XML and JSON payloads to projection interfaces.
-   Any-match mode for our query-by-example support.
-   Support for Redis Geo commands.
-   CORS support in Spring Data REST.
-   Support for Javaslang collection and map types as repository query method return types.

We're gonna have a blog post ready casting more light on those features in a couple of days. Find a more complete but curated list of changes in our [release train wiki](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Ingalls). The team's focus is now shifting to our next generation Spring Data, starting with the Kay release train about to go GA in Q2 2017. Watch out for another milestone release of that coming soon. That in turn means, Ingalls will be included in the upcoming Spring Boot 1.5 release and the Spring Framework 4 based release train that's going under primary maintenance going forward. Hopper is about to phase out to only see occasional updates for Spring Boot 1.4 releases.

To round things off, here's the list of modules shipped:

-   Spring Data Commons 1.13 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-commons/1.13.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/commons/docs/1.13.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/commons/docs/1.13.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/commons/docs/1.13.0.RELEASE/changelog.txt)
-   Spring Data JPA 1.11 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-jpa/1.11.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/jpa/docs/1.11.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/jpa/docs/1.11.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/jpa/docs/1.11.0.RELEASE/changelog.txt)
-   Spring Data KeyValue 1.2 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-keyvalue/1.2.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/keyvalue/docs/1.2.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/keyvalue/docs/1.2.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/keyvalue/docs/1.2.0.RELEASE/changelog.txt)
-   Spring Data for Apache Cassandra 1.5 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-cassandra/1.5.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/cassandra/docs/1.5.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/cassandra/docs/1.5.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/cassandra/docs/1.5.0.RELEASE/changelog.txt)
-   Spring Data for Apache Solr 2.1 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-solr/2.1.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/solr/docs/2.1.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/solr/docs/2.1.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/solr/docs/2.1.0.RELEASE/changelog.txt)
-   Spring Data Gemfire 1.9 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-gemfire/1.9.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/gemfire/docs/1.9.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/gemfire/docs/1.9.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/gemfire/docs/1.9.0.RELEASE/changelog.txt)
-   Spring Data Neo4j 4.2 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-neo4j/4.2.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/neo4j/docs/4.2.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/neo4j/docs/4.2.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/neo4j/docs/4.2.0.RELEASE/changelog.txt)
-   Spring Data MongoDB 1.10 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-mongodb/1.10.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/mongodb/docs/1.10.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/mongodb/docs/1.10.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/mongodb/docs/1.10.0.RELEASE/changelog.txt)
-   Spring Data LDAP 1.0 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-ldap/1.0.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/ldap/docs/1.0.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/ldap/docs/1.0.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/ldap/docs/1.0.0.RELEASE/changelog.txt)
-   Spring Data Envers 1.1 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-envers/1.1.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/envers/docs/1.1.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/envers/docs/1.1.0.RELEASE/reference/html)
-   Spring Data REST 2.6 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-rest-webmvc/2.6.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/rest/docs/2.6.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/rest/docs/2.6.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/rest/docs/2.6.0.RELEASE/changelog.txt)
-   Spring Data Redis 1.8 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-redis/1.8.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/redis/docs/1.8.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/redis/docs/1.8.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/redis/docs/1.8.0.RELEASE/changelog.txt)
-   Spring Data Elasticsearch 2.1 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-elasticsearch/2.1.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/elasticsearch/docs/2.1.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/elasticsearch/docs/2.1.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/elasticsearch/docs/2.1.0.RELEASE/changelog.txt)
-   Spring Data Couchbase 2.2 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-couchbase/2.2.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/couchbase/docs/2.2.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/couchbase/docs/2.2.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/couchbase/docs/2.2.0.RELEASE/changelog.txt)