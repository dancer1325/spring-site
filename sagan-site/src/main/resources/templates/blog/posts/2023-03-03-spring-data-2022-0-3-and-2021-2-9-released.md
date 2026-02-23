---
title: Spring Data 2022.0.3 and 2021.2.9 released
source: https://spring.io/blog/2023/03/03/spring-data-2022-0-3-and-2021-2-9-released
scraped: 2026-02-23T10:04:52.140Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  March 03, 2023 | 0 Comments
---

# Spring Data 2022.0.3 and 2021.2.9 released

_Releases | Mark Paluch |  March 03, 2023 | 0 Comments_

On behalf of the team, I’m pleased to announce the availability of Spring Data `2022.0.3` and `2021.2.9` service releases. These releases ship with improvements, including fixes for regressions. Some of them were important enough that we decided to release this version early, outside of the usual schedule.

The upcoming Spring Boot `3.0.4` release is going to pick up Spring Data `2022.0.3` for your convenience. If you want to upgrade your Spring Boot `2.7.x` application to use Spring Data `2021.2.9`, then use the version property mechanism to specify the Spring Data BOM version:

Maven POM:

```
Copy<properties>
  <spring-data-bom.version>2021.2.9</spring-data-bom.version>
</properties>
```

Gradle:

```
Copyext['spring-data-bom.version'] = '2021.2.9'
```

## [](#202203)2022.0.3

-   Spring Data Commons `3.0.3` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-commons/3.0.3) - [Javadoc](https://docs.spring.io/spring-data/commons/docs/3.0.3/api/) - [Documentation](https://docs.spring.io/spring-data/commons/docs/3.0.3/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-commons/releases/tag/3.0.3)
-   Spring Data JPA `3.0.3` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-jpa/3.0.3) - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/3.0.3/api/) - [Documentation](https://docs.spring.io/spring-data/jpa/docs/3.0.3/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-jpa/releases/tag/3.0.3)
-   Spring Data MongoDB `4.0.3` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-mongodb/4.0.3) - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/4.0.3/api/) - [Documentation](https://docs.spring.io/spring-data/mongodb/docs/4.0.3/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-mongodb/releases/tag/4.0.3)
-   Spring Data KeyValue `3.0.3` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-keyvalue/3.0.3) - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/3.0.3/api/) - [Documentation](https://docs.spring.io/spring-data/keyvalue/docs/3.0.3/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-keyvalue/releases/tag/3.0.3)
-   Spring Data for Apache Cassandra `4.0.3` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-cassandra/4.0.3) - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/4.0.3/api/) - [Documentation](https://docs.spring.io/spring-data/cassandra/docs/4.0.3/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-cassandra/releases/tag/4.0.3)
-   Spring Data Neo4j `7.0.3` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-neo4j/7.0.3) - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/7.0.3/api/) - [Documentation](https://docs.spring.io/spring-data/neo4j/docs/7.0.3/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-neo4j/releases/tag/7.0.3)
-   Spring Data LDAP `3.0.3` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-ldap/3.0.3) - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/3.0.3/api/) - [Documentation](https://docs.spring.io/spring-data/ldap/docs/3.0.3/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-ldap/releases/tag/3.0.3)
-   Spring Data REST `4.0.3` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-rest-webmvc/4.0.3) - [Javadoc](https://docs.spring.io/spring-data/rest/docs/4.0.3/api/) - [Documentation](https://docs.spring.io/spring-data/rest/docs/4.0.3/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-rest/releases/tag/4.0.3)
-   Spring Data Redis `3.0.3` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-redis/3.0.3) - [Javadoc](https://docs.spring.io/spring-data/redis/docs/3.0.3/api/) - [Documentation](https://docs.spring.io/spring-data/redis/docs/3.0.3/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-redis/releases/tag/3.0.3)
-   Spring Data Elasticsearch `5.0.3` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-elasticsearch/5.0.3) - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/5.0.3/api/) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/docs/5.0.3/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-elasticsearch/releases/tag/5.0.3)
-   Spring Data Couchbase `5.0.3` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-couchbase/5.0.3) - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/5.0.3/api/) - [Documentation](https://docs.spring.io/spring-data/couchbase/docs/5.0.3/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-couchbase/releases/tag/5.0.3)
-   Spring Data Relational `3.0.3` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-relational/3.0.3) - [Javadoc](https://docs.spring.io/spring-data/jdbc/docs/3.0.3/api/) - [Documentation](https://docs.spring.io/spring-data/jdbc/docs/3.0.3/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-relational/releases/tag/3.0.3)

## [](#202129)2021.2.9

-   Spring Data Commons `2.7.9` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-commons/2.7.9) - [Javadoc](https://docs.spring.io/spring-data/commons/docs/2.7.9/api/) - [Documentation](https://docs.spring.io/spring-data/commons/docs/2.7.9/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-commons/releases/tag/2.7.9)
-   Spring Data JDBC `2.4.9` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-jdbc/2.4.9) - [Javadoc](https://docs.spring.io/spring-data/jdbc/docs/2.4.9/api/) - [Documentation](https://docs.spring.io/spring-data/jdbc/docs/2.4.9/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-relational/releases/tag/2.4.9)
-   Spring Data JPA `2.7.9` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-jpa/2.7.9) - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/2.7.9/api/) - [Documentation](https://docs.spring.io/spring-data/jpa/docs/2.7.9/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-jpa/releases/tag/2.7.9)
-   Spring Data MongoDB `3.4.9` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-mongodb/3.4.9) - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/3.4.9/api/) - [Documentation](https://docs.spring.io/spring-data/mongodb/docs/3.4.9/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-mongodb/releases/tag/3.4.9)
-   Spring Data KeyValue `2.7.9` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-keyvalue/2.7.9) - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/2.7.9/api/) - [Documentation](https://docs.spring.io/spring-data/keyvalue/docs/2.7.9/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-keyvalue/releases/tag/2.7.9)
-   Spring Data for Apache Cassandra `3.4.9` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-cassandra/3.4.9) - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/3.4.9/api/) - [Documentation](https://docs.spring.io/spring-data/cassandra/docs/3.4.9/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-cassandra/releases/tag/3.4.9)
-   Spring Data Neo4j `6.3.9` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-neo4j/6.3.9) - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/6.3.9/api/) - [Documentation](https://docs.spring.io/spring-data/neo4j/docs/6.3.9/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-neo4j/releases/tag/6.3.9)
-   Spring Data R2DBC `1.5.9` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-r2dbc/1.5.9) - [Javadoc](https://docs.spring.io/spring-data/r2dbc/docs/1.5.9/api/) - [Documentation](https://docs.spring.io/spring-data/r2dbc/docs/1.5.9/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-r2dbc/releases/tag/1.5.9)
-   Spring Data for Apache Geode `2.7.9` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-geode/2.7.9) - [Javadoc](https://docs.spring.io/spring-data/geode/docs/2.7.9/api/) - [Documentation](https://docs.spring.io/spring-data/geode/docs/2.7.9/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-geode/releases/tag/2.7.9)
-   Spring Data LDAP `2.7.9` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-ldap/2.7.9) - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/2.7.9/api/) - [Documentation](https://docs.spring.io/spring-data/ldap/docs/2.7.9/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-ldap/releases/tag/2.7.9)
-   Spring Data Envers `2.7.9` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-envers/2.7.9) - [Javadoc](https://docs.spring.io/spring-data/envers/docs/2.7.9/api/) - [Documentation](https://docs.spring.io/spring-data/envers/docs/2.7.9/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-envers/releases/tag/2.7.9)
-   Spring Data REST `3.7.9` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-rest-webmvc/3.7.9) - [Javadoc](https://docs.spring.io/spring-data/rest/docs/3.7.9/api/) - [Documentation](https://docs.spring.io/spring-data/rest/docs/3.7.9/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-rest/releases/tag/3.7.9)
-   Spring Data Redis `2.7.9` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-redis/2.7.9) - [Javadoc](https://docs.spring.io/spring-data/redis/docs/2.7.9/api/) - [Documentation](https://docs.spring.io/spring-data/redis/docs/2.7.9/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-redis/releases/tag/2.7.9)
-   Spring Data Elasticsearch `4.4.9` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-elasticsearch/4.4.9) - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/4.4.9/api/) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/docs/4.4.9/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-elasticsearch/releases/tag/4.4.9)
-   Spring Data Couchbase `4.4.9` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-couchbase/4.4.9) - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/4.4.9/api/) - [Documentation](https://docs.spring.io/spring-data/couchbase/docs/4.4.9/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-couchbase/releases/tag/4.4.9)