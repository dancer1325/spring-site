---
title: Spring Data 2020.0.0 goes GA
source: https://spring.io/blog/2020/10/28/spring-data-2020-0-0-goes-ga
scraped: 2026-02-23T13:43:58.063Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  October 28, 2020 | 0 Comments
---

# Spring Data 2020.0.0 goes GA

_Releases | Mark Paluch |  October 28, 2020 | 0 Comments_

Dear Spring community,

On behalf of the Spring Data team and our contributors, it is my pleasure to announce that Spring Data `2020.0.0` is generally available from Maven Central.

Spring Data `2020.0.0` (Codename: [Ockham](https://en.wikipedia.org/wiki/William_of_Ockham)) is the first release train using the [changed versioning scheme](https://spring.io/blog/2020/04/30/updates-to-spring-versions), previous release trains were identified by name, such as `Neumann-RELEASE`.

This release train includes several themes. Here's a summary of the most important ones:

-   Switch Release Train version to calver (`2020.0.0`) and introduce `spring-data-bom` artifact.
-   Improve Graal Native Image experience.
-   Reactive SpEL context extensions and auditing support.
-   Include SDN-RX as Spring Data Neo4j 6.0.
-   Oracle dialect for Spring Data JDBC.
-   Refactor Spring Data R2DBC on top of Spring Framework’s R2DBC module.
-   Upgrade to Redis 6.0 including support ACL authentication and enhanced support for Sorted Set commands.
-   Support for RxJava 3.
-   De-lombok production code.

You can find out more ing the [links to the tickets](https://jira.spring.io/issues/?filter=17234). These features are listed in our [curated changelog](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Ockham-%282020.0.0%29). In the coming days, we will create a follow-up blog post with an in-depth discussion of the new features added to the release.

Spring Boot `2.4-RC1` is the easiest way to upgrade Spring Data `2020.0.0`. Neo4j users who use Spring Boot 2.3 require special attention, because the configuration infrastructure for Spring Data Neo4j `6.0` has changed in an incompatible way.

Finally, here are the links to all artifacts, the documentation, and individual changelogs:

-   Spring Data Commons 2.4 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-commons/2.4.0) - [Javadoc](https://docs.spring.io/spring-data/commons/docs/2.4.0/api) - [Documentation](https://docs.spring.io/spring-data/commons/docs/2.4.0/reference/html) - [Changelog](https://docs.spring.io/spring-data/commons/docs/2.4.0/changelog.txt)
-   Spring Data JDBC 2.1 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-jdbc/2.1.0) - [Javadoc](https://docs.spring.io/spring-data/jdbc/docs/2.1.0/api) - [Documentation](https://docs.spring.io/spring-data/jdbc/docs/2.1.0/reference/html) - [Changelog](https://docs.spring.io/spring-data/jdbc/docs/2.1.0/changelog.txt)
-   Spring Data JPA 2.4 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-jpa/2.4.0) - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/2.4.0/api) - [Documentation](https://docs.spring.io/spring-data/jpa/docs/2.4.0/reference/html) - [Changelog](https://docs.spring.io/spring-data/jpa/docs/2.4.0/changelog.txt)
-   Spring Data Neo4j 6.0 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-neo4j/6.0.0) - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/6.0.0/api) - [Documentation](https://docs.spring.io/spring-data/neo4j/docs/6.0.0/reference/html) - [Changelog](https://docs.spring.io/spring-data/neo4j/docs/6.0.0/changelog.txt)
-   Spring Data for Apache Geode 2.4 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-geode/2.4.0) - [Javadoc](https://docs.spring.io/spring-data/geode/docs/2.4.0/api) - [Documentation](https://docs.spring.io/spring-data/geode/docs/2.4.0/reference/html) - [Changelog](https://docs.spring.io/spring-data/geode/docs/2.4.0/changelog.txt)
-   Spring Data KeyValue 2.4 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-keyvalue/2.4.0) - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/2.4.0/api) - [Documentation](https://docs.spring.io/spring-data/keyvalue/docs/2.4.0/reference/html) - [Changelog](https://docs.spring.io/spring-data/keyvalue/docs/2.4.0/changelog.txt)
-   Spring Data for Apache Solr 4.3 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-solr/4.3.0) - [Javadoc](https://docs.spring.io/spring-data/solr/docs/4.3.0/api) - [Documentation](https://docs.spring.io/spring-data/solr/docs/4.3.0/reference/html) - [Changelog](https://docs.spring.io/spring-data/solr/docs/4.3.0/changelog.txt)
-   Spring Data MongoDB 3.1 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-mongodb/3.1.0) - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/3.1.0/api) - [Documentation](https://docs.spring.io/spring-data/mongodb/docs/3.1.0/reference/html) - [Changelog](https://docs.spring.io/spring-data/mongodb/docs/3.1.0/changelog.txt)
-   Spring Data for Apache Cassandra 3.1 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-cassandra/3.1.0) - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/3.1.0/api) - [Documentation](https://docs.spring.io/spring-data/cassandra/docs/3.1.0/reference/html) - [Changelog](https://docs.spring.io/spring-data/cassandra/docs/3.1.0/changelog.txt)
-   Spring Data R2DBC 1.2 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-r2dbc/1.2.0) - [Javadoc](https://docs.spring.io/spring-data/r2dbc/docs/1.2.0/api) - [Documentation](https://docs.spring.io/spring-data/r2dbc/docs/1.2.0/reference/html) - [Changelog](https://docs.spring.io/spring-data/r2dbc/docs/1.2.0/changelog.txt)
-   Spring Data LDAP 2.4 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-ldap/2.4.0) - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/2.4.0/api) - [Documentation](https://docs.spring.io/spring-data/ldap/docs/2.4.0/reference/html) - [Changelog](https://docs.spring.io/spring-data/ldap/docs/2.4.0/changelog.txt)
-   Spring Data Envers 2.4 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-envers/2.4.0) - [Javadoc](https://docs.spring.io/spring-data/envers/docs/2.4.0/api) - [Documentation](https://docs.spring.io/spring-data/envers/docs/2.4.0/reference/html) - [Changelog](https://docs.spring.io/spring-data/envers/docs/2.4.0/changelog.txt)
-   Spring Data REST 3.4 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-rest-webmvc/3.4.0) - [Javadoc](https://docs.spring.io/spring-data/rest/docs/3.4.0/api) - [Documentation](https://docs.spring.io/spring-data/rest/docs/3.4.0/reference/html) - [Changelog](https://docs.spring.io/spring-data/rest/docs/3.4.0/changelog.txt)
-   Spring Data Redis 2.4 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-redis/2.4.0) - [Javadoc](https://docs.spring.io/spring-data/redis/docs/2.4.0/api) - [Documentation](https://docs.spring.io/spring-data/redis/docs/2.4.0/reference/html) - [Changelog](https://docs.spring.io/spring-data/redis/docs/2.4.0/changelog.txt)
-   Spring Data Elasticsearch 4.1 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-elasticsearch/4.1.0) - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/4.1.0/api) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/docs/4.1.0/reference/html) - [Changelog](https://docs.spring.io/spring-data/elasticsearch/docs/4.1.0/changelog.txt)
-   Spring Data Couchbase 4.1 GA - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-couchbase/4.1.0) - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/4.1.0/api) - [Documentation](https://docs.spring.io/spring-data/couchbase/docs/4.1.0/reference/html) - [Changelog](https://docs.spring.io/spring-data/couchbase/docs/4.1.0/changelog.txt)