---
title: Spring Data Moore M2 released
source: https://spring.io/blog/2019/03/07/spring-data-moore-m2-released
scraped: 2026-02-23T14:55:55.634Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Christoph Strobl |  March 07, 2019 | 3 Comments
---

# Spring Data Moore M2 released

_Releases | Christoph Strobl |  March 07, 2019 | 3 Comments_

On behalf of the Spring Data team, I'm pleased to announce the availability of the second milestone of the [Moore](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Moore) release train.

Notable changes include:

-   Support for Kotlin [Coroutines](https://kotlinlang.org/docs/reference/coroutines-overview.html) in Spring Data MongoDB, Cassandra and Redis.
-   [Querydsl](https://docs.spring.io/spring-data/mongodb/docs/2.2.0.M2/reference/html/#mongodb.reactive.repositories.queries.type-safe) support for reactive repositories.
-   `Range` type support for derived repository query methods using `between` for Spring Data MongoDB & Cassandra.
-   `exists` projection in Neo4j repositories.
-   [Reactive repositories](https://docs.spring.io/spring-data/elasticsearch/docs/3.2.0.M2/reference/html/#elasticsearch.reactive.repositories) for Spring Data Elasticsearch.
-   Pivotal Gemfire and Apache Geode upgrades.
-   Upgrade to [Spring HATEOAS 1.0 M1](https://spring.io/blog/2019/03/05/spring-hateoas-1-0-m1-released).
-   ...and numerous features for the [JDBC module](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Moore#spring-data-jdbc---11) like direct `insert` & `update` methods skipping the *is new check*.

Please find a high-level overview of what has been added in our [release wiki](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Moore) or a detailed list of changes in our [issue tracker](https://jira.spring.io/issues/?filter=16365).

If you’re using Spring Boot and want to give the milestone a try, please make sure to switch to the most recent version of Spring Boot 2.2. And don't forget to add the milestone repository to your Maven configuration:

```xml
Copy<repository>
    <id>spring-libs-milestone</id>
    <url>https://repo.spring.io/libs-milestone</url>
</repository>
```

As always, we’re looking forward to your feedback! Don’t hesitate and get in touch [@SpringData](https://twitter.com/SpringData).

Last but not least the laundry list:

-   Spring Data Commons 2.2 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-commons/2.2.0.M2) - [Javadoc](http://docs.spring.io/spring-data/commons/docs/2.2.0.M2/api) - [Documentation](http://docs.spring.io/spring-data/commons/docs/2.2.0.M2/reference/html) - [Changelog](http://docs.spring.io/spring-data/commons/docs/2.2.0.M2/changelog.txt)
-   Spring Data JDBC 1.1 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jdbc/1.1.0.M2) - [Javadoc](http://docs.spring.io/spring-data/jdbc/docs/1.1.0.M2/api) - [Documentation](http://docs.spring.io/spring-data/jdbc/docs/1.1.0.M2/reference/html) - [Changelog](http://docs.spring.io/spring-data/jdbc/docs/1.1.0.M2/changelog.txt)
-   Spring Data JPA 2.2 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jpa/2.2.0.M2) - [Javadoc](http://docs.spring.io/spring-data/jpa/docs/2.2.0.M2/api) - [Documentation](http://docs.spring.io/spring-data/jpa/docs/2.2.0.M2/reference/html) - [Changelog](http://docs.spring.io/spring-data/jpa/docs/2.2.0.M2/changelog.txt)
-   Spring Data for Apache Solr 4.1 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-solr/4.1.0.M2) - [Javadoc](http://docs.spring.io/spring-data/solr/docs/4.1.0.M2/api) - [Documentation](http://docs.spring.io/spring-data/solr/docs/4.1.0.M2/reference/html) - [Changelog](http://docs.spring.io/spring-data/solr/docs/4.1.0.M2/changelog.txt)
-   Spring Data for Apache Cassandra 2.2 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-cassandra/2.2.0.M2) - [Javadoc](http://docs.spring.io/spring-data/cassandra/docs/2.2.0.M2/api) - [Documentation](http://docs.spring.io/spring-data/cassandra/docs/2.2.0.M2/reference/html) - [Changelog](http://docs.spring.io/spring-data/cassandra/docs/2.2.0.M2/changelog.txt)
-   Spring Data Gemfire 2.2 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-gemfire/2.2.0.M2) - [Javadoc](http://docs.spring.io/spring-data/gemfire/docs/2.2.0.M2/api) - [Documentation](http://docs.spring.io/spring-data/gemfire/docs/2.2.0.M2/reference/html) - [Changelog](http://docs.spring.io/spring-data/gemfire/docs/2.2.0.M2/changelog.txt)
-   Spring Data KeyValue 2.2 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-keyvalue/2.2.0.M2) - [Javadoc](http://docs.spring.io/spring-data/keyvalue/docs/2.2.0.M2/api) - [Documentation](http://docs.spring.io/spring-data/keyvalue/docs/2.2.0.M2/reference/html) - [Changelog](http://docs.spring.io/spring-data/keyvalue/docs/2.2.0.M2/changelog.txt)
-   Spring Data Neo4j 5.2 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-neo4j/5.2.0.M2) - [Javadoc](http://docs.spring.io/spring-data/neo4j/docs/5.2.0.M2/api) - [Documentation](http://docs.spring.io/spring-data/neo4j/docs/5.2.0.M2/reference/html) - [Changelog](http://docs.spring.io/spring-data/neo4j/docs/5.2.0.M2/changelog.txt)
-   Spring Data MongoDB 2.2 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-mongodb/2.2.0.M2) - [Javadoc](http://docs.spring.io/spring-data/mongodb/docs/2.2.0.M2/api) - [Documentation](http://docs.spring.io/spring-data/mongodb/docs/2.2.0.M2/reference/html) - [Changelog](http://docs.spring.io/spring-data/mongodb/docs/2.2.0.M2/changelog.txt)
-   Spring Data for Apache Geode 2.2 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-geode/2.2.0.M2) - [Javadoc](http://docs.spring.io/spring-data/geode/docs/2.2.0.M2/api) - [Documentation](http://docs.spring.io/spring-data/geode/docs/2.2.0.M2/reference/html) - [Changelog](http://docs.spring.io/spring-data/geode/docs/2.2.0.M2/changelog.txt)
-   Spring Data LDAP 2.2 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-ldap/2.2.0.M2) - [Javadoc](http://docs.spring.io/spring-data/ldap/docs/2.2.0.M2/api) - [Documentation](http://docs.spring.io/spring-data/ldap/docs/2.2.0.M2/reference/html) - [Changelog](http://docs.spring.io/spring-data/ldap/docs/2.2.0.M2/changelog.txt)
-   Spring Data Envers 2.2 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-envers/2.2.0.M2) - [Javadoc](http://docs.spring.io/spring-data/envers/docs/2.2.0.M2/api) - [Documentation](http://docs.spring.io/spring-data/envers/docs/2.2.0.M2/reference/html)
-   Spring Data REST 3.2 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-rest-webmvc/3.2.0.M2) - [Javadoc](http://docs.spring.io/spring-data/rest/docs/3.2.0.M2/api) - [Documentation](http://docs.spring.io/spring-data/rest/docs/3.2.0.M2/reference/html) - [Changelog](http://docs.spring.io/spring-data/rest/docs/3.2.0.M2/changelog.txt)
-   Spring Data Redis 2.2 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-redis/2.2.0.M2) - [Javadoc](http://docs.spring.io/spring-data/redis/docs/2.2.0.M2/api) - [Documentation](http://docs.spring.io/spring-data/redis/docs/2.2.0.M2/reference/html) - [Changelog](http://docs.spring.io/spring-data/redis/docs/2.2.0.M2/changelog.txt)
-   Spring Data Elasticsearch 3.2 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-elasticsearch/3.2.0.M2) - [Javadoc](http://docs.spring.io/spring-data/elasticsearch/docs/3.2.0.M2/api) - [Documentation](http://docs.spring.io/spring-data/elasticsearch/docs/3.2.0.M2/reference/html) - [Changelog](http://docs.spring.io/spring-data/elasticsearch/docs/3.2.0.M2/changelog.txt)
-   Spring Data Couchbase 3.2 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-couchbase/3.2.0.M2) - [Javadoc](http://docs.spring.io/spring-data/couchbase/docs/3.2.0.M2/api) - [Documentation](http://docs.spring.io/spring-data/couchbase/docs/3.2.0.M2/reference/html) - [Changelog](http://docs.spring.io/spring-data/couchbase/docs/3.2.0.M2/changelog.txt)