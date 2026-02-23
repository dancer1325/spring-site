---
title: Spring Data Fowler SR2 released
source: https://spring.io/blog/2015/07/28/spring-data-fowler-sr2-released
scraped: 2026-02-23T19:46:23.789Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  July 28, 2015 | 0 Comments
---

# Spring Data Fowler SR2 released

_Releases | Oliver Drotbohm |  July 28, 2015 | 0 Comments_

On behalf of the Spring Data team I'd like to announce the availability of the second service release of Spring Data release train Fowler. The release ships [40 tickets fixed](https://jira.spring.io/issues/?filter=15152) and is a recommended upgrade for all users due to an important [bugfix](https://jira.spring.io/browse/DATACMNS-715) in the support for JTA 1.2's `@Transactional`.

Spring Boot users can upgrade to the new version by setting the `spring-data-releasetrain.version` property in their Maven POMs to `Fowler-SR2`, Non-Spring Boot users are recommended to use the Spring Data release train BOM [as described in our example repository](https://github.com/spring-projects/spring-data-examples/tree/a7f231c2ed876c8d0d04d2e70ca592518c502728/bom) and configure it to the very same version.

-   Spring Data Commons 1.10.2 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-commons/1.10.2.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/commons/docs/1.10.2.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/commons/docs/1.10.2.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/commons/docs/1.10.2.RELEASE/changelog.txt)
-   Spring Data JPA 1.8.2 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-jpa/1.8.2.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/jpa/docs/1.8.2.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/jpa/docs/1.8.2.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/jpa/docs/1.8.2.RELEASE/changelog.txt)
-   Spring Data MongoDB 1.7.2 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-mongodb/1.7.2.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/mongodb/docs/1.7.2.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/mongodb/docs/1.7.2.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/mongodb/docs/1.7.2.RELEASE/changelog.txt)
-   Spring Data Neo4j 3.3.2 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-neo4j/3.3.2.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/neo4j/docs/3.3.2.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/neo4j/docs/3.3.2.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/neo4j/docs/3.3.2.RELEASE/changelog.txt)
-   Spring Data Solr 1.4.2 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-solr/1.4.2.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/solr/docs/1.4.2.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/solr/docs/1.4.2.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/solr/docs/1.4.2.RELEASE/changelog.txt)
-   Spring Data Couchbase 1.3.2 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-couchbase/1.3.2.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/couchbase/docs/1.3.2.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/couchbase/docs/1.3.2.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/couchbase/docs/1.3.2.RELEASE/changelog.txt)
-   Spring Data Cassandra 1.2.2 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-cassandra/1.2.2.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/cassandra/docs/1.2.2.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/cassandra/docs/1.2.2.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/cassandra/docs/1.2.2.RELEASE/changelog.txt)
-   Spring Data Elasticsearch 1.2.2 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-elasticsearch/1.2.2.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/elasticsearch/docs/1.2.2.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/elasticsearch/docs/1.2.2.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/elasticsearch/docs/1.2.2.RELEASE/changelog.txt)
-   Spring Data Gemfire 1.6.2 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-gemfire/1.6.2.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/gemfire/docs/1.6.2.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/gemfire/docs/1.6.2.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/gemfire/docs/1.6.2.RELEASE/changelog.txt)
-   Spring Data Redis 1.5.2 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-redis/1.5.2.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/redis/docs/1.5.2.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/redis/docs/1.5.2.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/redis/docs/1.5.2.RELEASE/changelog.txt)
-   Spring Data REST 2.3.2 - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-rest-webmvc/2.3.2.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/rest/docs/2.3.2.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/rest/docs/2.3.2.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/rest/docs/2.3.2.RELEASE/changelog.txt)

## [](#springone-2gx-2015-is-around-the-corner)SpringOne 2GX 2015 is around the corner!

Book your place at [SpringOne2GX in Washington, DC soon](http://www.springone2gx.com). It's simply the best opportunity to find out first hand all that's going on and to provide direct feedback. Check recent blog posts to see what I mean and there is more to come!