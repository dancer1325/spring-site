---
title: First milestone of Spring Data 2021.0.0 released
source: https://spring.io/blog/2020/12/09/first-milestone-of-spring-data-2021-0-0-released
scraped: 2026-02-23T13:39:21.082Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  December 09, 2020 | 0 Comments
---

# First milestone of Spring Data 2021.0.0 released

_Releases | Mark Paluch |  December 09, 2020 | 0 Comments_

On behalf of the team and everyone who contributed, I'd like to announce the first milestone of the Spring Data `2021.0.0` release train. This release ships with over [100 tickets fixed](https://jira.spring.io/issues/?filter=17238). This Spring Data release is the next release to use [calver](https://spring.io/blog/2020/04/30/updates-to-spring-versions).

The most notable new features are:

-   Support for `deleteAllById(Iterable<ID>)` in `CrudRepository` and `ReactiveCrudRepository`
-   Usage of Prepared Statements for `CassandraTemplate` and repository queries, including index-based parameter bindings
-   Upgrade to Elasticsearch 7.10.0

You can find the entire roadmap, including a curated change selection, on the [`2021.0.0` release wiki page](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-2021.0-%28Pascal%29). We're working now towards a second milestone that will be released early next year.

We'd also like to announce that all Spring Data projects are migrating their ticket management from Jira to GitHub issues. Beginning next year, you will find all Jira tickets being migrated into the associated GitHub repository, and we will track issues in GitHub only. Jira will remain as read-only copy.

To round things off, here are the links to each artifact, documentation, and changelog:

-   Spring Data Commons 2.5 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-commons/2.5.0-M1) - [Javadoc](https://docs.spring.io/spring-data/commons/docs/2.5.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/commons/docs/2.5.0-M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/commons/docs/2.5.0-M1/changelog.txt)
-   Spring Data JDBC 2.2 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jdbc/2.2.0-M1) - [Javadoc](https://docs.spring.io/spring-data/jdbc/docs/2.2.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/jdbc/docs/2.2.0-M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/jdbc/docs/2.2.0-M1/changelog.txt)
-   Spring Data JPA 2.5 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jpa/2.5.0-M1) - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/2.5.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/jpa/docs/2.5.0-M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/jpa/docs/2.5.0-M1/changelog.txt)
-   Spring Data KeyValue 2.5 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-keyvalue/2.5.0-M1) - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/2.5.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/keyvalue/docs/2.5.0-M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/keyvalue/docs/2.5.0-M1/changelog.txt)
-   Spring Data for Apache Cassandra 3.2 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-cassandra/3.2.0-M1) - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/3.2.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/cassandra/docs/3.2.0-M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/cassandra/docs/3.2.0-M1/changelog.txt)
-   Spring Data for Apache Geode 2.5 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-geode/2.5.0-M1) - [Javadoc](https://docs.spring.io/spring-data/geode/docs/2.5.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/geode/docs/2.5.0-M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/geode/docs/2.5.0-M1/changelog.txt)
-   Spring Data Neo4j 6.1 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-neo4j/6.1.0-M1) - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/6.1.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/neo4j/docs/6.1.0-M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/neo4j/docs/6.1.0-M1/changelog.txt)
-   Spring Data MongoDB 3.2 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-mongodb/3.2.0-M1) - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/3.2.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/mongodb/docs/3.2.0-M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/mongodb/docs/3.2.0-M1/changelog.txt)
-   Spring Data R2DBC 1.3 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-r2dbc/1.3.0-M1) - [Javadoc](https://docs.spring.io/spring-data/r2dbc/docs/1.3.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/r2dbc/docs/1.3.0-M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/r2dbc/docs/1.3.0-M1/changelog.txt)
-   Spring Data LDAP 2.5 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-ldap/2.5.0-M1) - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/2.5.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/ldap/docs/2.5.0-M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/ldap/docs/2.5.0-M1/changelog.txt)
-   Spring Data Envers 2.5 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-envers/2.5.0-M1) - [Javadoc](https://docs.spring.io/spring-data/envers/docs/2.5.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/envers/docs/2.5.0-M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/envers/docs/2.5.0-M1/changelog.txt)
-   Spring Data REST 3.5 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-rest-webmvc/3.5.0-M1) - [Javadoc](https://docs.spring.io/spring-data/rest/docs/3.5.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/rest/docs/3.5.0-M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/rest/docs/3.5.0-M1/changelog.txt)
-   Spring Data Redis 2.5 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-redis/2.5.0-M1) - [Javadoc](https://docs.spring.io/spring-data/redis/docs/2.5.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/redis/docs/2.5.0-M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/redis/docs/2.5.0-M1/changelog.txt)
-   Spring Data Elasticsearch 4.2 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-elasticsearch/4.2.0-M1) - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/4.2.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/docs/4.2.0-M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/elasticsearch/docs/4.2.0-M1/changelog.txt)
-   Spring Data Couchbase 4.2 M1 - [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-couchbase/4.2.0-M1) - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/4.2.0-M1/api) - [Documentation](https://docs.spring.io/spring-data/couchbase/docs/4.2.0-M1/reference/html) - [Changelog](https://docs.spring.io/spring-data/couchbase/docs/4.2.0-M1/changelog.txt)