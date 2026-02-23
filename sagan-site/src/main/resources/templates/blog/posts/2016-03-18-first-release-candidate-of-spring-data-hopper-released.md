---
title: First Release Candidate of Spring Data Hopper Released
source: https://spring.io/blog/2016/03/18/first-release-candidate-of-spring-data-hopper-released
scraped: 2026-02-23T19:22:38.588Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  March 18, 2016 | 6 Comments
---

# First Release Candidate of Spring Data Hopper Released

_Releases | Oliver Drotbohm |  March 18, 2016 | 6 Comments_

In behalf of the Spring Data team I am happy to announce the first and final release candidate for the [Hopper](https://de.wikipedia.org/wiki/Grace_Hopper) release train. The release ships with a couple of important changes and updates:

-   Upgrade of the Spring Framework baseline to 4.2 (4.2.5 in particular).
-   Support for Query by Example in Spring Data JPA and MongoDB.
-   Support for object mapping and repositories for Spring Data Redis.
-   Improved support for composed annotations.
-   Support for lookup types and nested associations in Spring Data REST
-   Upgrade to Elasticsearch 2.2, and thus the version number change of Spring Data Elasticsearch to 2.0

We've managed to resolve [97 tickets](https://jira.spring.io/issues/?filter=15359) in total for this release and the [curated change log for the release train](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Hopper) has been updated to include more detailed changes. We're shooting for a GA release in the first week of April, which means that it's the perfect time to give the binaries a spin to make sure you can upgrade smoothly.

There will be a more detailed blog post coming up early next week to cast some more light on the new features. In the meantime, here's the laundry list of modules included:

-   Spring Data Commons 1.12 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-commons/1.12.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/commons/docs/1.12.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/commons/docs/1.12.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/commons/docs/1.12.0.RC1/changelog.txt)
-   Spring Data JPA 1.10 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jpa/1.10.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/jpa/docs/1.10.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/jpa/docs/1.10.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/jpa/docs/1.10.0.RC1/changelog.txt)
-   Spring Data KeyValue 1.1 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-keyvalue/1.1.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/keyvalue/docs/1.1.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/keyvalue/docs/1.1.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/keyvalue/docs/1.1.0.RC1/changelog.txt)
-   Spring Data Cassandra 1.4 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-cassandra/1.4.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/cassandra/docs/1.4.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/cassandra/docs/1.4.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/cassandra/docs/1.4.0.RC1/changelog.txt)
-   Spring Data Solr 2.0 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-solr/2.0.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/solr/docs/2.0.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/solr/docs/2.0.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/solr/docs/2.0.0.RC1/changelog.txt)
-   Spring Data Gemfire 1.8 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-gemfire/1.8.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/gemfire/docs/1.8.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/gemfire/docs/1.8.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/gemfire/docs/1.8.0.RC1/changelog.txt)
-   Spring Data Neo4j 4.1 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-neo4j/4.1.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/neo4j/docs/4.1.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/neo4j/docs/4.1.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/neo4j/docs/4.1.0.RC1/changelog.txt)
-   Spring Data MongoDB 1.9 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-mongodb/1.9.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/mongodb/docs/1.9.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/mongodb/docs/1.9.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/mongodb/docs/1.9.0.RC1/changelog.txt)
-   Spring Data Envers 1.0 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-envers/1.0.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/envers/docs/1.0.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/envers/docs/1.0.0.RC1/reference/html)
-   Spring Data REST 2.5 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-rest-webmvc/2.5.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/rest/docs/2.5.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/rest/docs/2.5.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/rest/docs/2.5.0.RC1/changelog.txt)
-   Spring Data Redis 1.7 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-redis/1.7.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/redis/docs/1.7.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/redis/docs/1.7.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/redis/docs/1.7.0.RC1/changelog.txt)
-   Spring Data Elasticsearch 2.0 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-elasticsearch/2.0.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/elasticsearch/docs/2.0.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/elasticsearch/docs/2.0.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/elasticsearch/docs/2.0.0.RC1/changelog.txt)
-   Spring Data Couchbase 2.1 RC1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-couchbase/2.1.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/couchbase/docs/2.1.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/couchbase/docs/2.1.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/couchbase/docs/2.1.0.RC1/changelog.txt)

If you happen to be in Barcelona mid May (never a bad time to be in Barcelona anyway!), don't miss the chance to join the [Spring I/O conference](http://www.springio.net/) where I'll be presenting on the latest and greatest in Spring Data in general. Also, the registration for [SpringOne Platform](http://springoneplatform.io/) (early August, Las Vegas) has opened recently, in case you want to benefit from early bird ticket pricing. The latter is also still open for talk proposals. So if you're interested to give a talk about Spring or Pivotal-related technologies, feel free to submit!