---
title: Spring Data Release Train Fowler RC1 Available
source: https://spring.io/blog/2015/03/05/spring-data-release-train-fowler-rc1-available
scraped: 2026-02-23T21:52:18.876Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Christoph Strobl |  March 05, 2015 | 11 Comments
---

# Spring Data Release Train Fowler RC1 Available

_Releases | Christoph Strobl |  March 05, 2015 | 11 Comments_

I'm pleased to announce the availability of the first and final release candidate of the Spring Data release train named [Fowler](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Fowler). The release ships [149 tickets](https://jira.spring.io/issues/?filter=14932) fixed. Here are some of the highlights:

-   Support for Java 8 `Stream` as return type in JPA and MongoDB.
-   Enhanced support for JSR-310 and the ThreeTen back port types.
-   Dedicated [GeoJSON](http://geojson.org) types for the MongoDB module.
-   Compatibility with MongoDB 3.0 and the new MongoDB Java driver (current beta3).
-   Auto-populate the last modified header for audited entities in Spring Data REST.
-   `@Score` annotation for Solr.
-   Support for suggestions in Elasticsearch.

A curated change log can be found in the [wiki](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Fowler) while the full list can be viewed in [JIRA](https://jira.spring.io/issues/?filter=14932).

Here are the participating modules:

-   Spring Data Commons 1.10 RC1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-commons/1.10.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/commons/docs/1.10.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/commons/docs/1.10.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/commons/docs/1.10.0.RC1/changelog.txt)
-   Spring Data JPA 1.8 RC1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jpa/1.8.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/jpa/docs/1.8.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/jpa/docs/1.8.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/jpa/docs/1.8.0.RC1/changelog.txt)
-   Spring Data MongoDB 1.7 RC1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-mongodb/1.7.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/mongodb/docs/1.7.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/mongodb/docs/1.7.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/mongodb/docs/1.7.0.RC1/changelog.txt)
-   Spring Data Neo4j 3.3 RC1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-neo4j/3.3.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/neo4j/docs/3.3.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/neo4j/docs/3.3.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/neo4j/docs/3.3.0.RC1/changelog.txt)
-   Spring Data Solr 1.4 RC1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-solr/1.4.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/solr/docs/1.4.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/solr/docs/1.4.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/solr/docs/1.4.0.RC1/changelog.txt)
-   Spring Data Couchbase 1.3 RC1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-couchbase/1.3.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/couchbase/docs/1.3.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/couchbase/docs/1.3.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/couchbase/docs/1.3.0.RC1/changelog.txt)
-   Spring Data Cassandra 1.2 RC1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-cassandra/1.2.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/cassandra/docs/1.2.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/cassandra/docs/1.2.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/cassandra/docs/1.2.0.RC1/changelog.txt)
-   Spring Data Elasticsearch 1.2 RC1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-elasticsearch/1.2.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/elasticsearch/docs/1.2.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/elasticsearch/docs/1.2.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/elasticsearch/docs/1.2.0.RC1/changelog.txt)
-   Spring Data Gemfire 1.6 RC1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-gemfire/1.6.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/gemfire/docs/1.6.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/gemfire/docs/1.6.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/gemfire/docs/1.6.0.RC1/changelog.txt)
-   Spring Data Redis 1.5 RC1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-redis/1.5.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/redis/docs/1.5.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/redis/docs/1.5.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/redis/docs/1.5.0.RC1/changelog.txt)
-   Spring Data REST 2.3 RC1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-rest-webmvc/2.3.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/rest/docs/2.3.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/rest/docs/2.3.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/rest/docs/2.3.0.RC1/changelog.txt)

The easiest way to upgrade to the release candidate is by adding the Spring Milestone repository at [https://repo.spring.io/libs-milestone](https://repo.spring.io/libs-milestone). Using Spring Boot you can then simply set the `spring-data-releasetrain.version` to `Fowler-RC1`. For non-Boot projects, simply add this snippet to the `<dependencyManagement />` section of your Maven `pom.xml`:

```xml
Copy<dependency>
    <groupId>org.springframework.data</groupId>
    <artifactId>spring-data-releasetrain</artifactId>
    <version>Fowler-RC1</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>
```

Get in touch via [Twitter](https://twitter.com/SpringData), [StackOverflow](http://stackoverflow.com/questions/tagged/spring-data) or [JIRA](https://jira.spring.io) - We're looking forward to your feedback!