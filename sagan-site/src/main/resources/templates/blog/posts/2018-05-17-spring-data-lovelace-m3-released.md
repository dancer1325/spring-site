---
title: Spring Data Lovelace M3 released
source: https://spring.io/blog/2018/05/17/spring-data-lovelace-m3-released
scraped: 2026-02-23T15:24:08.516Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Christoph Strobl |  May 17, 2018 | 0 Comments
---

# Spring Data Lovelace M3 released

_Releases | Christoph Strobl |  May 17, 2018 | 0 Comments_

On behalf of the Spring Data team, I'm pleased to announce the availability of the third milestone of the Lovelace release train.

This release ships with updates for all store modules that contain new features, improvements, and bug fixes. Notable changes include:

-   Revised documentation.
-   Annotation based auditing for the JDBC module. ([DATAJDBC-204](https://jira.spring.io/browse/DATAJDBC-204))
-   Synchronous and reactive [transaction support](https://docs.spring.io/spring-data/mongodb/docs/2.1.0.M3/reference/html/#mongo.transactions) in preparation for the MongoDB 4.0 release. ([DATAMONGO-1920](https://jira.spring.io/browse/DATAMONGO-1920) & [DATAMONGO-1970](https://jira.spring.io/browse/DATAMONGO-1970))
-   Reactive Map/Reduce abstractions for MongoDB. ([DATAMONGO-1890](https://jira.spring.io/browse/DATAMONGO-1890))
-   Enhancements to the [Lucene index support](https://docs.spring.io/spring-data/gemfire/docs/2.1.0.M3/reference/html/#bootstrap:lucene) in Spring Data Gemfire and for Apache Geode. ([SGF-739](https://jira.spring.io/browse/SGF-739) & [DATAGEODE-101](https://jira.spring.io/browse/DATAGEODE-101))
-   [Reactive pub/sub](https://docs.spring.io/spring-data/redis/docs/2.1.0.M3/reference/html/#redis:reactive:pubsub) for Spring Data Redis. ([DATAREDIS-612](https://jira.spring.io/browse/DATAREDIS-612))
-   Kotlin extensions for Spring Data Cassandra. ([DATACASS-484](https://jira.spring.io/browse/DATACASS-484))
-   Driver upgrades for Gemfire 9.5, Apache Geode 1.6, Lettuce 5.1 (M1), MongoDB 3.8 (beta2), MongoDB Reactive Streams 1.9 (beta1) and Cassandra 3.5.

With this release, we ship over a hundred tickets fixed. A high-level overview of what has been added can be found in our [release wiki](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Lovelace).

If you’re using Spring Boot and want to give Lovelace M3 a try, upgrading to the release train is as easy as setting the Maven property `spring-data-releasetrain.version` to `Lovelace-M3`. Just make sure to add the milestone repository to your Maven configuration:

```xml
Copy<repository>
    <id>spring-libs-milestone</id>
    <url>https://repo.spring.io/libs-milestone</url>
</repository>
```

To round things off, here’s the laundry list:

-   Spring Data Commons 2.1 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-commons/2.1.0.M3) - [JavaDocs](http://docs.spring.io/spring-data/commons/docs/2.1.0.M3/api) - [Documentation](http://docs.spring.io/spring-data/commons/docs/2.1.0.M3/reference/html) - [Changelog](http://docs.spring.io/spring-data/commons/docs/2.1.0.M3/changelog.txt)
-   Spring Data JPA 2.1 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jpa/2.1.0.M3) - [JavaDocs](http://docs.spring.io/spring-data/jpa/docs/2.1.0.M3/api) - [Documentation](http://docs.spring.io/spring-data/jpa/docs/2.1.0.M3/reference/html) - [Changelog](http://docs.spring.io/spring-data/jpa/docs/2.1.0.M3/changelog.txt)
-   Spring Data Gemfire 2.1 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-gemfire/2.1.0.M3) - [JavaDocs](http://docs.spring.io/spring-data/gemfire/docs/2.1.0.M3/api) - [Documentation](http://docs.spring.io/spring-data/gemfire/docs/2.1.0.M3/reference/html) - [Changelog](http://docs.spring.io/spring-data/gemfire/docs/2.1.0.M3/changelog.txt)
-   Spring Data Neo4j 5.1 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-neo4j/5.1.0.M3) - [JavaDocs](http://docs.spring.io/spring-data/neo4j/docs/5.1.0.M3/api) - [Documentation](http://docs.spring.io/spring-data/neo4j/docs/5.1.0.M3/reference/html) - [Changelog](http://docs.spring.io/spring-data/neo4j/docs/5.1.0.M3/changelog.txt)
-   Spring Data KeyValue 2.1 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-keyvalue/2.1.0.M3) - [JavaDocs](http://docs.spring.io/spring-data/keyvalue/docs/2.1.0.M3/api) - [Documentation](http://docs.spring.io/spring-data/keyvalue/docs/2.1.0.M3/reference/html) - [Changelog](http://docs.spring.io/spring-data/keyvalue/docs/2.1.0.M3/changelog.txt)
-   Spring Data for Apache Cassandra 2.1 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-cassandra/2.1.0.M3) - [JavaDocs](http://docs.spring.io/spring-data/cassandra/docs/2.1.0.M3/api) - [Documentation](http://docs.spring.io/spring-data/cassandra/docs/2.1.0.M3/reference/html) - [Changelog](http://docs.spring.io/spring-data/cassandra/docs/2.1.0.M3/changelog.txt)
-   Spring Data for Apache Solr 4.0 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-solr/4.0.0.M3) - [JavaDocs](http://docs.spring.io/spring-data/solr/docs/4.0.0.M3/api) - [Documentation](http://docs.spring.io/spring-data/solr/docs/4.0.0.M3/reference/html) - [Changelog](http://docs.spring.io/spring-data/solr/docs/4.0.0.M3/changelog.txt)
-   Spring Data MongoDB 2.1 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-mongodb/2.1.0.M3) - [JavaDocs](http://docs.spring.io/spring-data/mongodb/docs/2.1.0.M3/api) - [Documentation](http://docs.spring.io/spring-data/mongodb/docs/2.1.0.M3/reference/html) - [Changelog](http://docs.spring.io/spring-data/mongodb/docs/2.1.0.M3/changelog.txt)
-   Spring Data for Apache Geode 2.1 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-geode/2.1.0.M3) - [JavaDocs](http://docs.spring.io/spring-data/geode/docs/2.1.0.M3/api) - [Documentation](http://docs.spring.io/spring-data/geode/docs/2.1.0.M3/reference/html) - [Changelog](http://docs.spring.io/spring-data/geode/docs/2.1.0.M3/changelog.txt)
-   Spring Data LDAP 2.1 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-ldap/2.1.0.M3) - [JavaDocs](http://docs.spring.io/spring-data/ldap/docs/2.1.0.M3/api) - [Documentation](http://docs.spring.io/spring-data/ldap/docs/2.1.0.M3/reference/html) - [Changelog](http://docs.spring.io/spring-data/ldap/docs/2.1.0.M3/changelog.txt)
-   Spring Data Envers 2.1 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-envers/2.1.0.M3) - [JavaDocs](http://docs.spring.io/spring-data/envers/docs/2.1.0.M3/api) - [Documentation](http://docs.spring.io/spring-data/envers/docs/2.1.0.M3/reference/html)
-   Spring Data REST 3.1 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-rest-webmvc/3.1.0.M3) - [JavaDocs](http://docs.spring.io/spring-data/rest/docs/3.1.0.M3/api) - [Documentation](http://docs.spring.io/spring-data/rest/docs/3.1.0.M3/reference/html) - [Changelog](http://docs.spring.io/spring-data/rest/docs/3.1.0.M3/changelog.txt)
-   Spring Data Redis 2.1 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-redis/2.1.0.M3) - [JavaDocs](http://docs.spring.io/spring-data/redis/docs/2.1.0.M3/api) - [Documentation](http://docs.spring.io/spring-data/redis/docs/2.1.0.M3/reference/html) - [Changelog](http://docs.spring.io/spring-data/redis/docs/2.1.0.M3/changelog.txt)
-   Spring Data Elasticsearch 3.1 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-elasticsearch/3.1.0.M3) - [JavaDocs](http://docs.spring.io/spring-data/elasticsearch/docs/3.1.0.M3/api) - [Documentation](http://docs.spring.io/spring-data/elasticsearch/docs/3.1.0.M3/reference/html) - [Changelog](http://docs.spring.io/spring-data/elasticsearch/docs/3.1.0.M3/changelog.txt)
-   Spring Data Couchbase 3.1 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-couchbase/3.1.0.M3) - [JavaDocs](http://docs.spring.io/spring-data/couchbase/docs/3.1.0.M3/api) - [Documentation](http://docs.spring.io/spring-data/couchbase/docs/3.1.0.M3/reference/html) - [Changelog](http://docs.spring.io/spring-data/couchbase/docs/3.1.0.M3/changelog.txt)
-   Spring Data JDBC 1.0 M3 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jdbc/1.0.0.M3) - [JavaDocs](http://docs.spring.io/spring-data/jdbc/docs/1.0.0.M3/api) - [Documentation](http://docs.spring.io/spring-data/jdbc/docs/1.0.0.M3/reference/html) - [Changelog](http://docs.spring.io/spring-data/jdbc/docs/1.0.0.M3/changelog.txt)