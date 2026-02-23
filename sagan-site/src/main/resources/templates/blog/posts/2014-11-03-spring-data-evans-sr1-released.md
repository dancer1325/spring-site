---
title: Spring Data Evans SR1 released
source: https://spring.io/blog/2014/11/03/spring-data-evans-sr1-released
scraped: 2026-02-23T22:10:02.587Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Christoph Strobl |  November 03, 2014 | 0 Comments
---

# Spring Data Evans SR1 released

_Releases | Christoph Strobl |  November 03, 2014 | 0 Comments_

On behalf of the Spring Data team I am pleased to announce the availability of the first service release of the Evans release train. The team around the participating modules completed [41 issues](http://jira.spring.io/issues/?filter=14836) including serveral bug fixes. We want to thank everyone for taking the time to report, volunteer fixing and testing those issues - this is invaluable feedback we could not do without!

The release includes the following 11 modules:

-   Spring Data Commons 1.9.1 - [Artifacts](http://repo.spring.io/libs-release/org/springframework/data/spring-data-commons/1.9.1.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/commons/docs/1.9.1.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/commons/docs/1.9.1.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/commons/docs/1.9.1.RELEASE/changelog.txt)
-   Spring Data JPA 1.7.1 - [Artifacts](http://repo.spring.io/libs-release/org/springframework/data/spring-data-jpa/1.7.1.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/jpa/docs/1.7.1.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/jpa/docs/1.7.1.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/jpa/docs/1.7.1.RELEASE/changelog.txt)
-   Spring Data MongoDB 1.6.1 - [Artifacts](http://repo.spring.io/libs-release/org/springframework/data/spring-data-mongodb/1.6.1.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/mongodb/docs/1.6.1.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/mongodb/docs/1.6.1.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/mongodb/docs/1.6.1.RELEASE/changelog.txt)
-   Spring Data Neo4j 3.2.1 - [Artifacts](http://repo.spring.io/libs-release/org/springframework/data/spring-data-neo4j/3.2.1.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/neo4j/docs/3.2.1.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/neo4j/docs/3.2.1.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/neo4j/docs/3.2.1.RELEASE/changelog.txt)
-   Spring Data Solr 1.3.1 - [Artifacts](http://repo.spring.io/libs-release/org/springframework/data/spring-data-solr/1.3.1.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/solr/docs/1.3.1.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/solr/docs/1.3.1.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/solr/docs/1.3.1.RELEASE/changelog.txt)
-   Spring Data Couchbase 1.2.1 - [Artifacts](http://repo.spring.io/libs-release/org/springframework/data/spring-data-couchbase/1.2.1.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/couchbase/docs/1.2.1.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/couchbase/docs/1.2.1.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/couchbase/docs/1.2.1.RELEASE/changelog.txt)
-   Spring Data Cassandra 1.1.1 - [Artifacts](http://repo.spring.io/libs-release/org/springframework/data/spring-data-cassandra/1.1.1.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/cassandra/docs/1.1.1.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/cassandra/docs/1.1.1.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/cassandra/docs/1.1.1.RELEASE/changelog.txt)
-   Spring Data Elasticsearch 1.1.1 - [Artifacts](http://repo.spring.io/libs-release/org/springframework/data/spring-data-elasticsearch/1.1.1.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/elasticsearch/docs/1.1.1.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/elasticsearch/docs/1.1.1.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/elasticsearch/docs/1.1.1.RELEASE/changelog.txt)
-   Spring Data Gemfire 1.5.1 - [Artifacts](http://repo.spring.io/libs-release/org/springframework/data/spring-data-gemfire/1.5.1.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/gemfire/docs/1.5.1.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/gemfire/docs/1.5.1.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/gemfire/docs/1.5.1.RELEASE/changelog.txt)
-   Spring Data Redis 1.4.1 - [Artifacts](http://repo.spring.io/libs-release/org/springframework/data/spring-data-redis/1.4.1.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/redis/docs/1.4.1.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/redis/docs/1.4.1.RELEASE/reference/pdf/spring-data-redis-reference.pdf) - [Changelog](http://docs.spring.io/spring-data/redis/docs/1.4.1.RELEASE/changelog.txt)
-   Spring Data REST 2.2.1 - [Artifacts](http://repo.spring.io/libs-release/org/springframework/data/spring-data-rest-webmvc/2.2.1.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/rest/docs/2.2.1.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/rest/docs/2.2.1.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/rest/docs/2.2.1.RELEASE/changelog.txt)

Evans SR 1 is a recommended upgrade as it contains important bug fixes. Dijkstra users still on a service release are encouraged to upgrade as well. The next release coming will be the first milestone of release train [Fowler](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Fowler).

---

In case you happen to be in London this week, don't miss the oportunity to meet us at [Spring eXchange 2014](https://skillsmatter.com/conferences/1941-spring-exchange-2014).