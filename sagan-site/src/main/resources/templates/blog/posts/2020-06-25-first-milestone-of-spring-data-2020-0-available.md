---
title: First milestone of Spring Data 2020.0 available
source: https://spring.io/blog/2020/06/25/first-milestone-of-spring-data-2020-0-available
scraped: 2026-02-23T13:56:16.653Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  June 25, 2020 | 1 Comment
---

# First milestone of Spring Data 2020.0 available

_Releases | Mark Paluch |  June 25, 2020 | 1 Comment_

On behalf of the Spring Data team, I’m happy to announce the first milestone of the 2020.0 (Code name ["Ockham"](https://en.wikipedia.org/wiki/William_of_Ockham)) release train, `2020.0.0-M1`. This release ships with [over 120 tickets fixed](https://jira.spring.io/issues/?filter=16934). This Spring Data release is the first release using [calver](https://spring.io/blog/2020/04/30/updates-to-spring-versions) as an update to the release train version scheme.

The most notable new features are:

-   Support for RxJava 3
-   Introduction of `org.springframework.data:spring-data-bom`, which replaces `org.springframework.data:spring-data-releasetrain`

You can find a curated changelog in our [release train wiki](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Ockham-%282020.0.0%29) or skim through a [full list of changes in JIRA](https://jira.spring.io/issues/?filter=16934).

A second milestone is planned for August. It will contain a full rewrite of Spring Data Neo4j, along with a version bump to 6.0 and the adoption of the newly introduced Spring R2DBC module in Spring Data R2DBC. Release candidates are scheduled for mid-September, followed by a GA release in late October.

We look forward to your feedback!

Finally, here are links to all the artifacts, changelogs, and documentation:

-   Spring Data Commons 2.4 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-commons/2.4.0-M1) - [Javadoc](https://docs.spring.io/spring-data/commons/docs/2.4.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/commons/docs/2.4.0-M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/commons/docs/2.4.0-M1/changelog.txt)
-   Spring Data JDBC 2.1 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jdbc/2.1.0-M1) - [Javadoc](https://docs.spring.io/spring-data/jdbc/docs/2.1.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/jdbc/docs/2.1.0-M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/jdbc/docs/2.1.0-M1/changelog.txt)
-   Spring Data JPA 2.4 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jpa/2.4.0-M1) - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/2.4.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/jpa/docs/2.4.0-M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/jpa/docs/2.4.0-M1/changelog.txt)
-   Spring Data KeyValue 2.4 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-keyvalue/2.4.0-M1) - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/2.4.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/keyvalue/docs/2.4.0-M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/keyvalue/docs/2.4.0-M1/changelog.txt)
-   Spring Data for Apache Solr 4.3 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-solr/4.3.0-M1) - [Javadoc](https://docs.spring.io/spring-data/solr/docs/4.3.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/solr/docs/4.3.0-M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/solr/docs/4.3.0-M1/changelog.txt)
-   Spring Data Neo4j 5.4 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-neo4j/5.4.0-M1) - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/5.4.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/neo4j/docs/5.4.0-M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/neo4j/docs/5.4.0-M1/changelog.txt)
-   Spring Data for Apache Cassandra 3.1 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-cassandra/3.1.0-M1) - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/3.1.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/cassandra/docs/3.1.0-M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/cassandra/docs/3.1.0-M1/changelog.txt)
-   Spring Data for Apache Geode 2.4 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-geode/2.4.0-M1) - [Javadoc](https://docs.spring.io/spring-data/geode/docs/2.4.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/geode/docs/2.4.0-M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/geode/docs/2.4.0-M1/changelog.txt)
-   Spring Data MongoDB 3.1 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-mongodb/3.1.0-M1) - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/3.1.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/mongodb/docs/3.1.0-M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/mongodb/docs/3.1.0-M1/changelog.txt)
-   Spring Data R2DBC 1.2 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-r2dbc/1.2.0-M1) - [Javadoc](https://docs.spring.io/spring-data/r2dbc/docs/1.2.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/r2dbc/docs/1.2.0-M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/r2dbc/docs/1.2.0-M1/changelog.txt)
-   Spring Data LDAP 2.4 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-ldap/2.4.0-M1) - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/2.4.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/ldap/docs/2.4.0-M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/ldap/docs/2.4.0-M1/changelog.txt)
-   Spring Data Envers 2.4 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-envers/2.4.0-M1) - [Javadoc](https://docs.spring.io/spring-data/envers/docs/2.4.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/envers/docs/2.4.0-M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/envers/docs/2.4.0-M1/changelog.txt)
-   Spring Data REST 3.4 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-rest-webmvc/3.4.0-M1) - [Javadoc](https://docs.spring.io/spring-data/rest/docs/3.4.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/rest/docs/3.4.0-M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/rest/docs/3.4.0-M1/changelog.txt)
-   Spring Data Redis 2.4 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-redis/2.4.0-M1) - [Javadoc](https://docs.spring.io/spring-data/redis/docs/2.4.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/redis/docs/2.4.0-M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/redis/docs/2.4.0-M1/changelog.txt)
-   Spring Data Elasticsearch 4.1 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-elasticsearch/4.1.0-M1) - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/4.1.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/docs/4.1.0-M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/elasticsearch/docs/4.1.0-M1/changelog.txt)
-   Spring Data Couchbase 4.1 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-couchbase/4.1.0-M1) - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/4.1.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/couchbase/docs/4.1.0-M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/couchbase/docs/4.1.0-M1/changelog.txt)