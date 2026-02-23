---
title: Spring Data Release Train Kay RC1 & RC2 Released
source: https://spring.io/blog/2017/07/25/spring-data-release-train-kay-rc1-rc2-released
scraped: 2026-02-23T16:25:07.306Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Christoph Strobl |  July 25, 2017 | 0 Comments
---

# Spring Data Release Train Kay RC1 & RC2 Released

_Engineering | Christoph Strobl |  July 25, 2017 | 0 Comments_

On behalf of the Spring Data team, I’d like to announce the availability of the first and second release candiate of Spring Data [Kay](https://en.wikipedia.org/wiki/Alan_Kay). This release ships over 120 tickets fixed. The curated changelog can be found in our [release wiki](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Kay), the complete list of issues fixed can be found [here](https://jira.spring.io/issues/?filter=15649). Due to a severe issue in RC1 we immediately issued RC2.

# [](#notable-changes)Notable changes

-   Enhanced tooling support by adding `@NonNullApi` and `@Nullable` annotations in Spring Data Commons to be picked up by your favorite IDE.
-   Fine-tuning of the fluent API for MongoDB including a reactive counterpart and aggregation support.
-   Spring Data for Apache Geode joins the release train.
-   `RedisCache` got overhauled and is now way easier to configure.
-   Cassandra 3.0 driver upgrade and support for `@Indexed` and `@SASI`.
-   Child document support for Spring Data for Apache Solr.
-   A lot of internal cleanups.

As always, make sure to check out the [Spring Data Examples](https://github.com/spring-projects/spring-data-examples/tree/boot-next)!

# [](#spring-data-kay-rc2)Spring Data Kay RC2

-   Spring Data Commons 2.0 RC2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-commons/2.0.0.RC2) - [JavaDocs](http://docs.spring.io/spring-data/commons/docs/2.0.0.RC2/api) - [Documentation](http://docs.spring.io/spring-data/commons/docs/2.0.0.RC2/reference/html) - [Changelog](http://docs.spring.io/spring-data/commons/docs/2.0.0.RC2/changelog.txt)
-   Spring Data JPA 2.0 RC2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jpa/2.0.0.RC2) - [JavaDocs](http://docs.spring.io/spring-data/jpa/docs/2.0.0.RC2/api) - [Documentation](http://docs.spring.io/spring-data/jpa/docs/2.0.0.RC2/reference/html) - [Changelog](http://docs.spring.io/spring-data/jpa/docs/2.0.0.RC2/changelog.txt)
-   Spring Data KeyValue 2.0 RC2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-keyvalue/2.0.0.RC2) - [JavaDocs](http://docs.spring.io/spring-data/keyvalue/docs/2.0.0.RC2/api) - [Documentation](http://docs.spring.io/spring-data/keyvalue/docs/2.0.0.RC2/reference/html) - [Changelog](http://docs.spring.io/spring-data/keyvalue/docs/2.0.0.RC2/changelog.txt)
-   Spring Data for Apache Cassandra 2.0 RC2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-cassandra/2.0.0.RC2) - [JavaDocs](http://docs.spring.io/spring-data/cassandra/docs/2.0.0.RC2/api) - [Documentation](http://docs.spring.io/spring-data/cassandra/docs/2.0.0.RC2/reference/html) - [Changelog](http://docs.spring.io/spring-data/cassandra/docs/2.0.0.RC2/changelog.txt)
-   Spring Data for Apache Solr 3.0 RC2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-solr/3.0.0.RC2) - [JavaDocs](http://docs.spring.io/spring-data/solr/docs/3.0.0.RC2/api) - [Documentation](http://docs.spring.io/spring-data/solr/docs/3.0.0.RC2/reference/html) - [Changelog](http://docs.spring.io/spring-data/solr/docs/3.0.0.RC2/changelog.txt)
-   Spring Data Gemfire 2.0 RC2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-gemfire/2.0.0.RC2) - [JavaDocs](http://docs.spring.io/spring-data/gemfire/docs/2.0.0.RC2/api) - [Documentation](http://docs.spring.io/spring-data/gemfire/docs/2.0.0.RC2/reference/html) - [Changelog](http://docs.spring.io/spring-data/gemfire/docs/2.0.0.RC2/changelog.txt)
-   Spring Data Neo4j 5.0 RC2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-neo4j/5.0.0.RC2) - [JavaDocs](http://docs.spring.io/spring-data/neo4j/docs/5.0.0.RC2/api) - [Documentation](http://docs.spring.io/spring-data/neo4j/docs/5.0.0.RC2/reference/html) - [Changelog](http://docs.spring.io/spring-data/neo4j/docs/5.0.0.RC2/changelog.txt)
-   Spring Data MongoDB 2.0 RC2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-mongodb/2.0.0.RC2) - [JavaDocs](http://docs.spring.io/spring-data/mongodb/docs/2.0.0.RC2/api) - [Documentation](http://docs.spring.io/spring-data/mongodb/docs/2.0.0.RC2/reference/html) - [Changelog](http://docs.spring.io/spring-data/mongodb/docs/2.0.0.RC2/changelog.txt)
-   Spring Data for Apache Geode 2.0 RC2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-geode/2.0.0.RC2) - [JavaDocs](http://docs.spring.io/spring-data/geode/docs/2.0.0.RC2/api) - [Documentation](http://docs.spring.io/spring-data/geode/docs/2.0.0.RC2/reference/html) - [Changelog](http://docs.spring.io/spring-data/geode/docs/2.0.0.RC2/changelog.txt)
-   Spring Data LDAP 2.0 RC2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-ldap/2.0.0.RC2) - [JavaDocs](http://docs.spring.io/spring-data/ldap/docs/2.0.0.RC2/api) - [Documentation](http://docs.spring.io/spring-data/ldap/docs/2.0.0.RC2/reference/html) - [Changelog](http://docs.spring.io/spring-data/ldap/docs/2.0.0.RC2/changelog.txt)
-   Spring Data Envers 2.0 RC2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-envers/2.0.0.RC2) - [JavaDocs](http://docs.spring.io/spring-data/envers/docs/2.0.0.RC2/api) - [Documentation](http://docs.spring.io/spring-data/envers/docs/2.0.0.RC2/reference/html)
-   Spring Data REST 3.0 RC2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-rest-webmvc/3.0.0.RC2) - [JavaDocs](http://docs.spring.io/spring-data/rest/docs/3.0.0.RC2/api) - [Documentation](http://docs.spring.io/spring-data/rest/docs/3.0.0.RC2/reference/html) - [Changelog](http://docs.spring.io/spring-data/rest/docs/3.0.0.RC2/changelog.txt)
-   Spring Data Redis 2.0 RC2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-redis/2.0.0.RC2) - [JavaDocs](http://docs.spring.io/spring-data/redis/docs/2.0.0.RC2/api) - [Documentation](http://docs.spring.io/spring-data/redis/docs/2.0.0.RC2/reference/html) - [Changelog](http://docs.spring.io/spring-data/redis/docs/2.0.0.RC2/changelog.txt)
-   Spring Data Elasticsearch 3.0 RC2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-elasticsearch/3.0.0.RC2) - [JavaDocs](http://docs.spring.io/spring-data/elasticsearch/docs/3.0.0.RC2/api) - [Documentation](http://docs.spring.io/spring-data/elasticsearch/docs/3.0.0.RC2/reference/html) - [Changelog](http://docs.spring.io/spring-data/elasticsearch/docs/3.0.0.RC2/changelog.txt)
-   Spring Data Couchbase 3.0 RC2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-couchbase/3.0.0.RC2) - [JavaDocs](http://docs.spring.io/spring-data/couchbase/docs/3.0.0.RC2/api) - [Documentation](http://docs.spring.io/spring-data/couchbase/docs/3.0.0.RC2/reference/html) - [Changelog](http://docs.spring.io/spring-data/couchbase/docs/3.0.0.RC2/changelog.txt)