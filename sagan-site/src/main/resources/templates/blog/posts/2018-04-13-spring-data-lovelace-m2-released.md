---
title: Spring Data Lovelace M2 released
source: https://spring.io/blog/2018/04/13/spring-data-lovelace-m2-released
scraped: 2026-02-23T15:27:33.793Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  April 13, 2018 | 2 Comments
---

# Spring Data Lovelace M2 released

_Releases | Mark Paluch |  April 13, 2018 | 2 Comments_

On behalf of the Spring Data team, I’d like to announce the availability of the second milestone of the Lovelace release train.

This release ships with updates for all store modules that contain new features, improvements, and bug fixes. Notable changes include:

-   MongoDB 3.6 support for Change Streams, `$jsonSchema`, and Client Sessions (in preparation for MongoDB Transactions).
-   Apache Cassandra mapping improvements for Map and Tuple Types, along with newly introduced Lifecycle Callbacks.
-   Upgrade to Apache Solr 7.
-   Improved Connection Handling for reactive Redis and static Master/Slave use.
-   `SCAN` support for Redis Cluster.
-   `List` support for Spring Data JDBC.
-   Composable repositories support via CDI.

During the course of Lovelace M2, we decided to increment Spring Data Solr to a new major version number, 4.0 M2, as we upgraded from SolrJ 6.6.2 to 7.2.1.

Watch out for a follow-up [blog post about MongoDB Transaction support](https://spring.io/blog/2018/04/18/new-in-spring-data-lovelace-m2-get-ready-for-mongodb-3-6-and-4-0) in the coming days.

With this release, we ship over [200 tickets](https://jira.spring.io/issues/?filter=15838) fixed. A high-level overview of what has been added can be found in our [release wiki](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Lovelace). To round things off, here’s the laundry list:

-   Spring Data Commons 2.1 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-commons/2.1.0.M2) - [JavaDocs](http://docs.spring.io/spring-data/commons/docs/2.1.0.M2/api) - [Documentation](http://docs.spring.io/spring-data/commons/docs/2.1.0.M2/reference/html) - [Changelog](http://docs.spring.io/spring-data/commons/docs/2.1.0.M2/changelog.txt)
-   Spring Data JPA 2.1 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jpa/2.1.0.M2) - [JavaDocs](http://docs.spring.io/spring-data/jpa/docs/2.1.0.M2/api) - [Documentation](http://docs.spring.io/spring-data/jpa/docs/2.1.0.M2/reference/html) - [Changelog](http://docs.spring.io/spring-data/jpa/docs/2.1.0.M2/changelog.txt)
-   Spring Data Neo4j 5.1 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-neo4j/5.1.0.M2) - [JavaDocs](http://docs.spring.io/spring-data/neo4j/docs/5.1.0.M2/api) - [Documentation](http://docs.spring.io/spring-data/neo4j/docs/5.1.0.M2/reference/html) - [Changelog](http://docs.spring.io/spring-data/neo4j/docs/5.1.0.M2/changelog.txt)
-   Spring Data for Apache Cassandra 2.1 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-cassandra/2.1.0.M2) - [JavaDocs](http://docs.spring.io/spring-data/cassandra/docs/2.1.0.M2/api) - [Documentation](http://docs.spring.io/spring-data/cassandra/docs/2.1.0.M2/reference/html) - [Changelog](http://docs.spring.io/spring-data/cassandra/docs/2.1.0.M2/changelog.txt)
-   Spring Data MongoDB 2.1 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-mongodb/2.1.0.M2) - [JavaDocs](http://docs.spring.io/spring-data/mongodb/docs/2.1.0.M2/api) - [Documentation](http://docs.spring.io/spring-data/mongodb/docs/2.1.0.M2/reference/html) - [Changelog](http://docs.spring.io/spring-data/mongodb/docs/2.1.0.M2/changelog.txt)
-   Spring Data KeyValue 2.1 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-keyvalue/2.1.0.M2) - [JavaDocs](http://docs.spring.io/spring-data/keyvalue/docs/2.1.0.M2/api) - [Documentation](http://docs.spring.io/spring-data/keyvalue/docs/2.1.0.M2/reference/html) - [Changelog](http://docs.spring.io/spring-data/keyvalue/docs/2.1.0.M2/changelog.txt)
-   Spring Data for Apache Solr 4.0 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-solr/4.0.0.M2) - [JavaDocs](http://docs.spring.io/spring-data/solr/docs/4.0.0.M2/api) - [Documentation](http://docs.spring.io/spring-data/solr/docs/4.0.0.M2/reference/html) - [Changelog](http://docs.spring.io/spring-data/solr/docs/4.0.0.M2/changelog.txt)
-   Spring Data Gemfire 2.1 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-gemfire/2.1.0.M2) - [JavaDocs](http://docs.spring.io/spring-data/gemfire/docs/2.1.0.M2/api) - [Documentation](http://docs.spring.io/spring-data/gemfire/docs/2.1.0.M2/reference/html) - [Changelog](http://docs.spring.io/spring-data/gemfire/docs/2.1.0.M2/changelog.txt)
-   Spring Data for Apache Geode 2.1 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-geode/2.1.0.M2) - [JavaDocs](http://docs.spring.io/spring-data/geode/docs/2.1.0.M2/api) - [Documentation](http://docs.spring.io/spring-data/geode/docs/2.1.0.M2/reference/html) - [Changelog](http://docs.spring.io/spring-data/geode/docs/2.1.0.M2/changelog.txt)
-   Spring Data LDAP 2.1 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-ldap/2.1.0.M2) - [JavaDocs](http://docs.spring.io/spring-data/ldap/docs/2.1.0.M2/api) - [Documentation](http://docs.spring.io/spring-data/ldap/docs/2.1.0.M2/reference/html) - [Changelog](http://docs.spring.io/spring-data/ldap/docs/2.1.0.M2/changelog.txt)
-   Spring Data Envers 2.1 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-envers/2.1.0.M2) - [JavaDocs](http://docs.spring.io/spring-data/envers/docs/2.1.0.M2/api) - [Documentation](http://docs.spring.io/spring-data/envers/docs/2.1.0.M2/reference/html)
-   Spring Data REST 3.1 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-rest-webmvc/3.1.0.M2) - [JavaDocs](http://docs.spring.io/spring-data/rest/docs/3.1.0.M2/api) - [Documentation](http://docs.spring.io/spring-data/rest/docs/3.1.0.M2/reference/html) - [Changelog](http://docs.spring.io/spring-data/rest/docs/3.1.0.M2/changelog.txt)
-   Spring Data Redis 2.1 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-redis/2.1.0.M2) - [JavaDocs](http://docs.spring.io/spring-data/redis/docs/2.1.0.M2/api) - [Documentation](http://docs.spring.io/spring-data/redis/docs/2.1.0.M2/reference/html) - [Changelog](http://docs.spring.io/spring-data/redis/docs/2.1.0.M2/changelog.txt)
-   Spring Data Elasticsearch 3.1 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-elasticsearch/3.1.0.M2) - [JavaDocs](http://docs.spring.io/spring-data/elasticsearch/docs/3.1.0.M2/api) - [Documentation](http://docs.spring.io/spring-data/elasticsearch/docs/3.1.0.M2/reference/html) - [Changelog](http://docs.spring.io/spring-data/elasticsearch/docs/3.1.0.M2/changelog.txt)
-   Spring Data Couchbase 3.1 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-couchbase/3.1.0.M2) - [JavaDocs](http://docs.spring.io/spring-data/couchbase/docs/3.1.0.M2/api) - [Documentation](http://docs.spring.io/spring-data/couchbase/docs/3.1.0.M2/reference/html) - [Changelog](http://docs.spring.io/spring-data/couchbase/docs/3.1.0.M2/changelog.txt)
-   Spring Data JDBC 1.0 M2 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jdbc/1.0.0.M2) - [JavaDocs](http://docs.spring.io/spring-data/jdbc/docs/1.0.0.M2/api) - [Documentation](http://docs.spring.io/spring-data/jdbc/docs/1.0.0.M2/reference/html) - [Changelog](http://docs.spring.io/spring-data/jdbc/docs/1.0.0.M2/changelog.txt)

Update: Here's the link to the [blog post about MongoDB Client Sessions and Transactions](https://spring.io/blog/2018/04/18/new-in-spring-data-lovelace-m2-get-ready-for-mongodb-3-6-and-4-0).