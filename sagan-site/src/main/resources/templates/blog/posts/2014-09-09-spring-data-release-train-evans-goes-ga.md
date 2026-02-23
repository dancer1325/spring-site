---
title: Spring Data Release Train Evans Goes GA
source: http://spring.io/blog/2014/09/09/spring-data-release-train-evans-goes-ga
scraped: 2026-02-23T22:15:11.497Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  September 09, 2014 | 0 Comments
---

# Spring Data Release Train Evans Goes GA

_Releases | Oliver Drotbohm |  September 09, 2014 | 0 Comments_

On behalf of the entire Spring Data team, I'd like to announce the general availability of the Spring Data release train iteration called Evans. The release ships 11 modules to help you build sophisticated data access layers on top of relational and non-relational data stores.

The major themes of this iteration were:

-   Upgrade Spring baseline to 4.0
-   Support for `top` and `first` as keywords in derived queries
-   Support for MongoDB 2.6 features like text search
-   SpEL support for Spring Data JPA (Spring Security integration)
-   Redis Sentinel support
-   ALPS and excerpt projections for Spring Data REST
-   Support for custom implementations in the CDI extension
-   Improved multi-store configuration
-   Asciidoctor for reference documentation

Here's the full list of participating modules:

-   Spring Data Commons 1.9 GA - [Artifacts](http://repo.spring.io/libs-release/org/springframework/data/spring-data-commons/1.9.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/commons/docs/1.9.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/commons/docs/1.9.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/commons/docs/1.9.0.RELEASE/changelog.txt)
-   Spring Data JPA 1.7 GA - [Artifacts](http://repo.spring.io/libs-release/org/springframework/data/spring-data-jpa/1.7.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/jpa/docs/1.7.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/jpa/docs/1.7.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/jpa/docs/1.7.0.RELEASE/changelog.txt)
-   Spring Data MongoDB 1.6 GA - [Artifacts](http://repo.spring.io/libs-release/org/springframework/data/spring-data-mongodb/1.6.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/mongodb/docs/1.6.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/mongodb/docs/1.6.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/mongodb/docs/1.6.0.RELEASE/changelog.txt)
-   Spring Data Neo4j 3.2 GA - [Artifacts](http://repo.spring.io/libs-release/org/springframework/data/spring-data-neo4j/3.2.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/neo4j/docs/3.2.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/neo4j/docs/3.2.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/neo4j/docs/3.2.0.RELEASE/changelog.txt)
-   Spring Data Solr 1.3 GA - [Artifacts](http://repo.spring.io/libs-release/org/springframework/data/spring-data-solr/1.3.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/solr/docs/1.3.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/solr/docs/1.3.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/solr/docs/1.3.0.RELEASE/changelog.txt)
-   Spring Data Couchbase 1.2 GA - [Artifacts](http://repo.spring.io/libs-release/org/springframework/data/spring-data-couchbase/1.2.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/couchbase/docs/1.2.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/couchbase/docs/1.2.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/couchbase/docs/1.2.0.RELEASE/changelog.txt)
-   Spring Data Cassandra 1.1 GA - [Artifacts](http://repo.spring.io/libs-release/org/springframework/data/spring-data-cassandra/1.1.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/cassandra/docs/1.1.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/cassandra/docs/1.1.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/cassandra/docs/1.1.0.RELEASE/changelog.txt)
-   Spring Data Elasticsearch 1.1 GA - [Artifacts](http://repo.spring.io/libs-release/org/springframework/data/spring-data-elasticsearch/1.1.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/elasticsearch/docs/1.1.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/elasticsearch/docs/1.1.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/elasticsearch/docs/1.1.0.RELEASE/changelog.txt)
-   Spring Data Gemfire 1.5 GA - [Artifacts](http://repo.spring.io/libs-release/org/springframework/data/spring-data-gemfire/1.5.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/gemfire/docs/1.5.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/gemfire/docs/1.5.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/gemfire/docs/1.5.0.RELEASE/changelog.txt)
-   Spring Data Redis 1.4 GA - [Artifacts](http://repo.spring.io/libs-release/org/springframework/data/spring-data-redis/1.4.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/redis/docs/1.4.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/redis/docs/1.4.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/redis/docs/1.4.0.RELEASE/changelog.txt)
-   Spring Data REST 2.2 GA - [Artifacts](http://repo.spring.io/libs-release/org/springframework/data/spring-data-rest-webmvc/2.2.0.RELEASE) - [JavaDocs](http://docs.spring.io/spring-data/rest/docs/2.2.0.RELEASE/api) - [Documentation](http://docs.spring.io/spring-data/rest/docs/2.2.0.RELEASE/reference/html) - [Changelog](http://docs.spring.io/spring-data/rest/docs/2.2.0.RELEASE/changelog.txt)

The home stretch to GA allowed us to fix [72 tickets](https://jira.spring.io/issues/?filter=14761) which leaves us with 294 tickets fixed and implemented for Evans overall. Find a curated change log for the release train in [our wiki](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Evans).

The example projects have been updated to the latest version already and are a good starting point to familiarize yourself with the new features. Watch this space for an upcoming blog series which will introduce some of the features introduced in greater detail.

The next train iteration is going to be named [Fowler](http://en.wikipedia.org/wiki/Martin_Fowler) with an expected first milestone in approximately 6 weeks. We're going to ship a final service release for Dijkstra in about 3 weeks time. Looking forward to your feedback!