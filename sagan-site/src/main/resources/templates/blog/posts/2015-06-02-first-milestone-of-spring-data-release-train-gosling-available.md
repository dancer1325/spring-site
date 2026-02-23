---
title: First Milestone of Spring Data Release Train Gosling Available
source: https://spring.io/blog/2015/06/02/first-milestone-of-spring-data-release-train-gosling-available
scraped: 2026-02-23T19:50:43.800Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Christoph Strobl |  June 02, 2015 | 0 Comments
---

# First Milestone of Spring Data Release Train Gosling Available

_Releases | Christoph Strobl |  June 02, 2015 | 0 Comments_

On behalf of the Spring Data team, I am happy to announce the first milestone of the Spring Data release train [Gosling](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Gosling). The release ships with [164 tickets](https://jira.spring.io/issues/?filter=14962) fixed as well as [Spring Data KeyValue](https://github.com/spring-projects/spring-data-keyvalue) joining the Spring Data release train with an initial milestone. The highlights of the release include:

-   Spring 4.1 as a new minimum baseline.
-   Simplified support for adding custom methods to all repositories throughout the individual modules (see this [example](https://github.com/spring-projects/spring-data-examples/tree/master/jpa/example/src/main/java/example/springdata/jpa/customall)).
-   Declarative ad-hoc JPA 2.1 fetch graph declarations via `@EntityGraph` on repository methods.
-   Gemfire 8.1 support including multi-index definition operations.
-   SpEL expressions in `@Query` as well as support for `$geoIntersects` for MongoDB.
-   Enhanced `ZSET` support for Spring Data Redis including `ZRANGEBYLEX`.
-   A Spring Data REST module shipping the HAL browser as well as support for conditional GETs.
-   Map-backed repositories (see this [example](https://github.com/spring-projects/spring-data-examples/tree/master/map))
-   Support for Neo4J 2.2.
-   Support for derived `deleteBy...` queries and bulk updates in Spring Data Elasticsearch.

Here are the participating modules:

-   Spring Data Commons 1.11 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-commons/1.11.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/commons/docs/1.11.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/commons/docs/1.11.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/commons/docs/1.11.0.M1/changelog.txt)
-   Spring Data JPA 1.9 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jpa/1.9.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/jpa/docs/1.9.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/jpa/docs/1.9.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/jpa/docs/1.9.0.M1/changelog.txt)
-   Spring Data MongoDB 1.8 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-mongodb/1.8.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/mongodb/docs/1.8.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/mongodb/docs/1.8.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/mongodb/docs/1.8.0.M1/changelog.txt)
-   Spring Data Neo4j 3.4 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-neo4j/3.4.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/neo4j/docs/3.4.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/neo4j/docs/3.4.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/neo4j/docs/3.4.0.M1/changelog.txt)
-   Spring Data Solr 1.5 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-solr/1.5.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/solr/docs/1.5.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/solr/docs/1.5.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/solr/docs/1.5.0.M1/changelog.txt)
-   Spring Data Couchbase 1.4 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-couchbase/1.4.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/couchbase/docs/1.4.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/couchbase/docs/1.4.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/couchbase/docs/1.4.0.M1/changelog.txt)
-   Spring Data Cassandra 1.3 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-cassandra/1.3.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/cassandra/docs/1.3.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/cassandra/docs/1.3.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/cassandra/docs/1.3.0.M1/changelog.txt)
-   Spring Data Elasticsearch 1.3 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-elasticsearch/1.3.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/elasticsearch/docs/1.3.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/elasticsearch/docs/1.3.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/elasticsearch/docs/1.3.0.M1/changelog.txt)
-   Spring Data Gemfire 1.7 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-gemfire/1.7.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/gemfire/docs/1.7.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/gemfire/docs/1.7.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/gemfire/docs/1.7.0.M1/changelog.txt)
-   Spring Data Redis 1.6 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-redis/1.6.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/redis/docs/1.6.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/redis/docs/1.6.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/redis/docs/1.6.0.M1/changelog.txt)
-   Spring Data REST 2.4 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-rest-webmvc/2.4.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/rest/docs/2.4.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/rest/docs/2.4.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/rest/docs/2.4.0.M1/changelog.txt)
-   Spring Data KeyValue 1.0 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-keyvalue/1.0.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/keyvalue/docs/1.0.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/keyvalue/docs/1.0.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/keyvalue/docs/1.0.0.M1/changelog.txt)

Be sure to check out the [already updated examples](https://github.com/spring-projects/spring-data-examples). Get in touch via [Twitter](https://twitter.com/springdata), [StackOverflow](http://stackoverflow.com/questions/tagged/spring-data) or [JIRA](https://jira.spring.io/). We're looking forward to your feedback!

---

## [](#springone-2gx-2015-is-around-the-corner)SpringOne 2GX 2015 is around the corner!

Book your place at [SpringOne2GX in Washington, DC soon](http://www.springone2gx.com). Super Early Bird Price expires June 12th! It's simply the best opportunity to find out first hand all that's going on and to provide direct feedback.

## [](#discounts)Discounts

-   The Super Early Bird price tier ($300 discount) expires June 12th. The Early Bird price tier (June 13th - August 14th) is discounted $150.
-   Register 4 and get the 5th pass free. Contact us with the names of your first 4 registrants for your complimentary pass code (conference admission only).
-   Alumni, contact us for your discount code ($150 off any option).