---
title: Spring Data Release Train Gosling Goes GA
source: https://spring.io/blog/2015/09/01/spring-data-release-train-gosling-goes-ga
scraped: 2026-02-23T19:43:47.327Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  September 01, 2015 | 0 Comments
---

# Spring Data Release Train Gosling Goes GA

_Releases | Oliver Drotbohm |  September 01, 2015 | 0 Comments_

On behalf of the Spring Data team I'd like to announce the general availability of the Spring Data release train Gosling. Over the last 6 months we've fixed 344 tickets in total, [56 of that](https://jira.spring.io/issues/?filter=15230) after the latest release candidate.

-   Upgraded Spring baseline to 4.1.
-   Easier implementability of custom repository code (per repo, see the [reference documentation](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repositories.custom-behaviour-for-all-repositories)) .
-   Improved compatibility with Hibernate 5 (JPA module).
-   SpEl support for `@Query` methods in MongoDB (see this [example](https://github.com/spring-projects/spring-data-examples/tree/master/mongodb/security)).
-   Support to create Querydsl `Predicates` from web requests (see the [reference documentation](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#core.web.type-safe)).
-   A [new Spring Data KeyValue module](https://docs.spring.io/spring-data/keyvalue/docs/1.0.0.RELEASE/reference/html/) for `Map`\-backed repositories using SpEL as query language.
-   Improved POST forms for the HAL browser in Spring Data REST.
-   Support for internationalization of enum values and link titles in Spring Data REST.

The [Spring Data examples](https://github.com/spring-projects/spring-data-examples) have already been upgraded to the new version. Find a more detailed list of what has change in this train in [our wiki](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Gosling). Spring Data ninja Christoph Strobl has a [blog post](https://spring.io/blog/2015/09/04/what-s-new-in-spring-data-release-gosling) covering some of the introduced features in more depth.

To upgrade to the new release train use the BOM we ship as described in our [examples repository](https://github.com/spring-projects/spring-data-examples/tree/master/bom) and configure its version to `Gosling-RELEASE`. If you're using Spring Boot, upgrading to the release train is as easy as setting the Maven property `spring-data-releasetrain.version` to that version. Note, that to use Spring Data REST with Boot 1.2, you also need to upgrade to Spring HATEOAS 0.19.0.RELEASE (by setting the `spring-hateoas.version` property) and Jackson 2.5 or better (current 2.6.1 preferred, via the `jackson.version` property).

The [next release train](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Hopper) is going to be named [Hopper](https://en.wikipedia.org/wiki/Grace_Hopper) and include the new major versions of the Neo4j, Couchbase and Solr modules. Target release time is mid autumn.

For reference, here is the list of all modules of the train:

-   Spring Data Commons 1.11 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-commons/1.11.0.RELEASE) - [JavaDocs](https://docs.spring.io/spring-data/commons/docs/1.11.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/commons/docs/1.11.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/commons/docs/1.11.0.RELEASE/changelog.txt)
-   Spring Data JPA 1.9 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-jpa/1.9.0.RELEASE) - [JavaDocs](https://docs.spring.io/spring-data/jpa/docs/1.9.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/jpa/docs/1.9.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/jpa/docs/1.9.0.RELEASE/changelog.txt)
-   Spring Data MongoDB 1.8 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-mongodb/1.8.0.RELEASE) - [JavaDocs](https://docs.spring.io/spring-data/mongodb/docs/1.8.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/mongodb/docs/1.8.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/mongodb/docs/1.8.0.RELEASE/changelog.txt)
-   Spring Data Neo4j 3.4 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-neo4j/3.4.0.RELEASE) - [JavaDocs](https://docs.spring.io/spring-data/neo4j/docs/3.4.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/neo4j/docs/3.4.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/neo4j/docs/3.4.0.RELEASE/changelog.txt)
-   Spring Data Solr 1.5 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-solr/1.5.0.RELEASE) - [JavaDocs](https://docs.spring.io/spring-data/solr/docs/1.5.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/solr/docs/1.5.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/solr/docs/1.5.0.RELEASE/changelog.txt)
-   Spring Data Couchbase 1.4 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-couchbase/1.4.0.RELEASE) - [JavaDocs](https://docs.spring.io/spring-data/couchbase/docs/1.4.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/couchbase/docs/1.4.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/couchbase/docs/1.4.0.RELEASE/changelog.txt)
-   Spring Data Cassandra 1.3 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-cassandra/1.3.0.RELEASE) - [JavaDocs](https://docs.spring.io/spring-data/cassandra/docs/1.3.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/cassandra/docs/1.3.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/cassandra/docs/1.3.0.RELEASE/changelog.txt)
-   Spring Data Elasticsearch 1.3 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-elasticsearch/1.3.0.RELEASE) - [JavaDocs](https://docs.spring.io/spring-data/elasticsearch/docs/1.3.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/docs/1.3.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/elasticsearch/docs/1.3.0.RELEASE/changelog.txt)
-   Spring Data Gemfire 1.7 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-gemfire/1.7.0.RELEASE) - [JavaDocs](https://docs.spring.io/spring-data/gemfire/docs/1.7.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/gemfire/docs/1.7.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/gemfire/docs/1.7.0.RELEASE/changelog.txt)
-   Spring Data Redis 1.6 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-redis/1.6.0.RELEASE) - [JavaDocs](https://docs.spring.io/spring-data/redis/docs/1.6.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/redis/docs/1.6.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/redis/docs/1.6.0.RELEASE/changelog.txt)
-   Spring Data REST 2.4 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-rest-webmvc/2.4.0.RELEASE) - [JavaDocs](https://docs.spring.io/spring-data/rest/docs/2.4.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/rest/docs/2.4.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/rest/docs/2.4.0.RELEASE/changelog.txt)
-   Spring Data KeyValue 1.0 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-keyvalue/1.0.0.RELEASE) - [JavaDocs](https://docs.spring.io/spring-data/keyvalue/docs/1.0.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/keyvalue/docs/1.0.0.RELEASE/reference/html) - [Changelog](https://docs.spring.io/spring-data/keyvalue/docs/1.0.0.RELEASE/changelog.txt)

We're going to cover a lot of the new features of Spring Data release train Gosling in the ["What's new in Spring Data?" talk](https://2015.event.springone2gx.com/schedule/sessions/what_s_new_in_2015_for_spring_data.html) at SpringOne2GX in Washington in two weeks. It's not too late to get a ticket if you want to learn about all of the latest and greatest first hand.