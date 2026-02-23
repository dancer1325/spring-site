---
title: Spring Data Release Train Hopper M1 Released
source: https://spring.io/blog/2016/02/12/spring-data-release-train-hopper-m1-released
scraped: 2026-02-23T19:28:07.537Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  February 12, 2016 | 4 Comments
---

# Spring Data Release Train Hopper M1 Released

_Releases | Oliver Drotbohm |  February 12, 2016 | 4 Comments_

On behalf of the Spring Data team I'm happy to announce the first milestone of the [Hopper](https://en.wikipedia.org/wiki/Grace_Hopper) release train. The release ships 250 tickets fixed! The most important new features are:

-   Upgrade to Querydsl 4.
-   Integration of Spring Data Neo4j 4.1, Spring Data Couchbase 2.1 and Spring Data Solr 2 (on Solr 5).
-   Support for Redis Cluster.
-   Support for projections on repository query methods in JPA and MongoDB (see [the example](https://github.com/spring-projects/spring-data-examples/tree/master/jpa/example/src/main/java/example/springdata/jpa/projections) for details).
-   Addition of Spring Data Envers to the release train (previously maintained separately).

Find a curated changelog in our [release train wiki](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Hopper) or skim through a [full list of changes in JIRA](https://jira.spring.io/issues/?filter=15352). We're shooting for a release candidate early March and a GA release at the end of the month.

The easiest way to play with the milestone is declaring the `spring-data-releasetrain.version` property to `Hopper-M1` in your Spring Boot application. If you're using Solr or Querydsl, make sure you also upgrade these versions as shown in the [example](https://github.com/spring-projects/spring-data-examples/blob/master/pom.xml#L35).

We're looking forward to your feedback!

-   Spring Data Commons 1.12 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-commons/1.12.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/commons/docs/1.12.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/commons/docs/1.12.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/commons/docs/1.12.0.M1/changelog.txt)
-   Spring Data JPA 1.10 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jpa/1.10.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/jpa/docs/1.10.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/jpa/docs/1.10.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/jpa/docs/1.10.0.M1/changelog.txt)
-   Spring Data Cassandra 1.4 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-cassandra/1.4.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/cassandra/docs/1.4.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/cassandra/docs/1.4.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/cassandra/docs/1.4.0.M1/changelog.txt)
-   Spring Data Solr 2.0 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-solr/2.0.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/solr/docs/2.0.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/solr/docs/2.0.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/solr/docs/2.0.0.M1/changelog.txt)
-   Spring Data Gemfire 1.8 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-gemfire/1.8.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/gemfire/docs/1.8.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/gemfire/docs/1.8.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/gemfire/docs/1.8.0.M1/changelog.txt)
-   Spring Data Neo4j 4.1 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-neo4j/4.1.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/neo4j/docs/4.1.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/neo4j/docs/4.1.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/neo4j/docs/4.1.0.M1/changelog.txt)
-   Spring Data MongoDB 1.9 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-mongodb/1.9.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/mongodb/docs/1.9.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/mongodb/docs/1.9.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/mongodb/docs/1.9.0.M1/changelog.txt)
-   Spring Data Envers 1.0 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-envers/1.0.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/envers/docs/1.0.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/envers/docs/1.0.0.M1/reference/html)
-   Spring Data KeyValue 1.1 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-keyvalue/1.1.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/keyvalue/docs/1.1.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/keyvalue/docs/1.1.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/keyvalue/docs/1.1.0.M1/changelog.txt)
-   Spring Data REST 2.5 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-rest-webmvc/2.5.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/rest/docs/2.5.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/rest/docs/2.5.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/rest/docs/2.5.0.M1/changelog.txt)
-   Spring Data Redis 1.7 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-redis/1.7.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/redis/docs/1.7.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/redis/docs/1.7.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/redis/docs/1.7.0.M1/changelog.txt)
-   Spring Data Elasticsearch 1.4 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-elasticsearch/1.4.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/elasticsearch/docs/1.4.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/elasticsearch/docs/1.4.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/elasticsearch/docs/1.4.0.M1/changelog.txt)
-   Spring Data Couchbase 2.1 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-couchbase/2.1.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/couchbase/docs/2.1.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/couchbase/docs/2.1.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/couchbase/docs/2.1.0.M1/changelog.txt)