---
title: First milestone of next-generation Spring Data released
source: https://spring.io/blog/2016/11/23/first-milestone-of-next-generation-spring-data-released
scraped: 2026-02-23T18:56:10.922Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  November 23, 2016 | 3 Comments
---

# First milestone of next-generation Spring Data released

_Releases | Oliver Drotbohm |  November 23, 2016 | 3 Comments_

On behalf of the Spring Data team, I’d like to announce the first milestone of the Kay release train. This is a special release train as it's going to ship a new generation of Spring Data that will include a couple of breaking changes going forward.

## [](#infrastructure-upgrades)Infrastructure upgrades

The first and most noticeable change is the upgrade to Java 8 as a minimum baseline (no JDK 6 compatibility anymore) and an upgrade to Spring 5 as framework foundation. In subsequent milestones we're going to ship some significant internal rewrites that will also affect user facing API to make use of the new language features in JDK 8.

## [](#support-for-reactive-data-access)Support for reactive data access

The most significant additions that made it into the milestone is the addition of support for reactive data access for selected stores. This means: reactive Spring Data repositories and templates for MongoDB, Cassandra and Redis. Other stores are going to follow with subsequent milestones. The introduction of reactive data access support for MongoDB also required us to finally switch from the legacy `DBObject` API to MongoDB's current `Document` one.

We have example projects ready for all of these stores:

-   [Reactive examples for MongoDB](https://github.com/spring-projects/spring-data-examples/tree/master/mongodb/reactive)
-   [Reactive examples for Cassandra](https://github.com/spring-projects/spring-data-examples/tree/master/cassandra/reactive)
-   [Reactive examples for Redis](https://github.com/spring-projects/spring-data-examples/tree/master/redis/reactive)

We consider this release a starting point to get early feedback from you guys. There are some gaps to be filled, support for additional stores to be added but we'd definitely like to hear from you already.

The Spring team is currently preparing a couple of reactive example projects to showcase the interplay of different projects. Also, a blog post covering the new reactive features in Spring Data is going to follow in a couple of days.

## [](#the-laundry-list)The laundry list

That said, let's round this of with the formalities.

-   Spring Data Commons 2.0 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-commons/2.0.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/commons/docs/2.0.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/commons/docs/2.0.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/commons/docs/2.0.0.M1/changelog.txt)
-   Spring Data JPA 2.0 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jpa/2.0.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/jpa/docs/2.0.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/jpa/docs/2.0.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/jpa/docs/2.0.0.M1/changelog.txt)
-   Spring Data KeyValue 2.0 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-keyvalue/2.0.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/keyvalue/docs/2.0.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/keyvalue/docs/2.0.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/keyvalue/docs/2.0.0.M1/changelog.txt)
-   Spring Data for Apache Cassandra 2.0 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-cassandra/2.0.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/cassandra/docs/2.0.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/cassandra/docs/2.0.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/cassandra/docs/2.0.0.M1/changelog.txt)
-   Spring Data for Apache Solr 3.0 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-solr/3.0.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/solr/docs/3.0.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/solr/docs/3.0.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/solr/docs/3.0.0.M1/changelog.txt)
-   Spring Data Gemfire 2.0 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-gemfire/2.0.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/gemfire/docs/2.0.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/gemfire/docs/2.0.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/gemfire/docs/2.0.0.M1/changelog.txt)
-   Spring Data Neo4j 5.0 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-neo4j/5.0.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/neo4j/docs/5.0.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/neo4j/docs/5.0.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/neo4j/docs/5.0.0.M1/changelog.txt)
-   Spring Data MongoDB 2.0 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-mongodb/2.0.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/mongodb/docs/2.0.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/mongodb/docs/2.0.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/mongodb/docs/2.0.0.M1/changelog.txt)
-   Spring Data Envers 2.0 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-envers/2.0.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/envers/docs/2.0.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/envers/docs/2.0.0.M1/reference/html)
-   Spring Data REST 3.0 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-rest-webmvc/3.0.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/rest/docs/3.0.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/rest/docs/3.0.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/rest/docs/3.0.0.M1/changelog.txt)
-   Spring Data Redis 2.0 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-redis/2.0.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/redis/docs/2.0.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/redis/docs/2.0.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/redis/docs/2.0.0.M1/changelog.txt)
-   Spring Data Elasticsearch 3.0 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-elasticsearch/3.0.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/elasticsearch/docs/3.0.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/elasticsearch/docs/3.0.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/elasticsearch/docs/3.0.0.M1/changelog.txt)
-   Spring Data Couchbase 3.0 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-couchbase/3.0.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/couchbase/docs/3.0.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/couchbase/docs/3.0.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/couchbase/docs/3.0.0.M1/changelog.txt)

Find a curated changelog in our [release train wiki](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Kay) or skim through a [full list of changes in JIRA](https://jira.spring.io/issues/?filter=????). Your feedback is welcome.