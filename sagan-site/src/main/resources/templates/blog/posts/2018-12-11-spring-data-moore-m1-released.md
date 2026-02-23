---
title: Spring Data Moore M1 released
source: https://spring.io/blog/2018/12/11/spring-data-moore-m1-released
scraped: 2026-02-23T15:04:49.505Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Christoph Strobl |  December 11, 2018 | 0 Comments
---

# Spring Data Moore M1 released

_Releases | Christoph Strobl |  December 11, 2018 | 0 Comments_

On behalf of the Spring Data team, I’m pleased to announce the availability of the first milestone of the [Moore](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Moore) release train.

Notable changes include:

-   Support for [Streamable](https://docs.spring.io/spring-data/commons/docs/2.2.0.M1/reference/html/#repositories.collections-and-iterables.streamable) wrappers as query method return types.
-   Additional Kotlin extensions like `CrudRepository.findByIdOrNull(…)`.
-   A [Kotlin query DSL](https://docs.spring.io/spring-data/mongodb/docs/2.2.0.M1/reference/html/#mongo.query.kotlin-support) for MongoDB (special thanks to [Tjeu Kayim](https://github.com/TjeuKayim))
-   Gemfire & Apache Geode upgrades.
-   Spatial type support for Neo4j.
-   Elasticsearch [REST and (initial) reactive client](https://docs.spring.io/spring-data/elasticsearch/docs/3.2.0.M1/reference/html/#elasticsearch.clients) support.
-   Support for [Redis Streams](https://docs.spring.io/spring-data/redis/docs/2.2.0.M1/reference/html/#redis.streams).
-   ...and tons of new stuff for Spring Data JDBC.

Please find a high-level overview of what has been added in our [release wiki](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Moore).

If you’re using Spring Boot and want to give the milestone a try, upgrading to the release train is as easy as setting the Maven property `spring-data-releasetrain.version` to `Moore-M1`.

Just make sure to add the milestone repository to your Maven configuration:

```xml
Copy<repository>
    <id>spring-libs-milestone</id>
    <url>https://repo.spring.io/libs-milestone</url>
</repository>
```

As always, we're looking forward to your feedback! Don't hesitate and get in touch [@SpringData](https://twitter.com/SpringData).

Last but not least the laundry list:

-   Spring Data Commons 2.2 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-commons/2.2.0.M1) - [Javadoc](http://docs.spring.io/spring-data/commons/docs/2.2.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/commons/docs/2.2.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/commons/docs/2.2.0.M1/changelog.txt)
-   Spring Data JPA 2.2 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jpa/2.2.0.M1) - [Javadoc](http://docs.spring.io/spring-data/jpa/docs/2.2.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/jpa/docs/2.2.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/jpa/docs/2.2.0.M1/changelog.txt)
-   Spring Data Neo4j 5.2 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-neo4j/5.2.0.M1) - [Javadoc](http://docs.spring.io/spring-data/neo4j/docs/5.2.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/neo4j/docs/5.2.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/neo4j/docs/5.2.0.M1/changelog.txt)
-   Spring Data MongoDB 2.2 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-mongodb/2.2.0.M1) - [Javadoc](http://docs.spring.io/spring-data/mongodb/docs/2.2.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/mongodb/docs/2.2.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/mongodb/docs/2.2.0.M1/changelog.txt)
-   Spring Data for Apache Cassandra 2.2 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-cassandra/2.2.0.M1) - [Javadoc](http://docs.spring.io/spring-data/cassandra/docs/2.2.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/cassandra/docs/2.2.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/cassandra/docs/2.2.0.M1/changelog.txt)
-   Spring Data for Apache Solr 4.1 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-solr/4.1.0.M1) - [Javadoc](http://docs.spring.io/spring-data/solr/docs/4.1.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/solr/docs/4.1.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/solr/docs/4.1.0.M1/changelog.txt)
-   Spring Data KeyValue 2.2 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-keyvalue/2.2.0.M1) - [Javadoc](http://docs.spring.io/spring-data/keyvalue/docs/2.2.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/keyvalue/docs/2.2.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/keyvalue/docs/2.2.0.M1/changelog.txt)
-   Spring Data Gemfire 2.2 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-gemfire/2.2.0.M1) - [Javadoc](http://docs.spring.io/spring-data/gemfire/docs/2.2.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/gemfire/docs/2.2.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/gemfire/docs/2.2.0.M1/changelog.txt)
-   Spring Data for Apache Geode 2.2 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-geode/2.2.0.M1) - [Javadoc](http://docs.spring.io/spring-data/geode/docs/2.2.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/geode/docs/2.2.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/geode/docs/2.2.0.M1/changelog.txt)
-   Spring Data LDAP 2.2 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-ldap/2.2.0.M1) - [Javadoc](http://docs.spring.io/spring-data/ldap/docs/2.2.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/ldap/docs/2.2.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/ldap/docs/2.2.0.M1/changelog.txt)
-   Spring Data Envers 2.2 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-envers/2.2.0.M1) - [Javadoc](http://docs.spring.io/spring-data/envers/docs/2.2.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/envers/docs/2.2.0.M1/reference/html)
-   Spring Data REST 3.2 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-rest-webmvc/3.2.0.M1) - [Javadoc](http://docs.spring.io/spring-data/rest/docs/3.2.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/rest/docs/3.2.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/rest/docs/3.2.0.M1/changelog.txt)
-   Spring Data Redis 2.2 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-redis/2.2.0.M1) - [Javadoc](http://docs.spring.io/spring-data/redis/docs/2.2.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/redis/docs/2.2.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/redis/docs/2.2.0.M1/changelog.txt)
-   Spring Data Elasticsearch 3.2 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-elasticsearch/3.2.0.M1) - [Javadoc](http://docs.spring.io/spring-data/elasticsearch/docs/3.2.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/elasticsearch/docs/3.2.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/elasticsearch/docs/3.2.0.M1/changelog.txt)
-   Spring Data Couchbase 3.2 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-couchbase/3.2.0.M1) - [Javadoc](http://docs.spring.io/spring-data/couchbase/docs/3.2.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/couchbase/docs/3.2.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/couchbase/docs/3.2.0.M1/changelog.txt)
-   Spring Data JDBC 1.1 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jdbc/1.1.0.M1) - [Javadoc](http://docs.spring.io/spring-data/jdbc/docs/1.1.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/jdbc/docs/1.1.0.M1/reference/html) - [Changelog](http://docs.spring.io/spring-data/jdbc/docs/1.1.0.M1/changelog.txt)