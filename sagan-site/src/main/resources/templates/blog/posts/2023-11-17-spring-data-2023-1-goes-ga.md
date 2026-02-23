---
title: Spring Data 2023.1 goes GA
source: https://spring.io/blog/2023/11/17/spring-data-2023-1-goes-ga
scraped: 2026-02-23T09:10:28.022Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  November 17, 2023 | 0 Comments
---

# Spring Data 2023.1 goes GA

_Releases | Mark Paluch |  November 17, 2023 | 0 Comments_

On behalf of the Spring Data engineering team and everyone who contributed to this release, I am delighted to announce the general availability of Spring Data `2023.1` (Codename: Vaughan) from Maven Central! This release comes with several infrastructure themese as well as refinements in individual store modules.

Spring Data `2023.1` has upgraded its Spring Framework baseline to `6.1` along with Project Reactor `2023.0.0` and Micrometer `1.12.0` while requiring Java 17 as minimum platform version and supporting up to Java 21 for Virtual Threads support.

Virtual Threads can be used in various components by configuring an Virtual Threads-enabled `Executor`. Prominent examples for these components are Redis' `MessageListenerContainer` or Mongo's `MessageListenerContainer` for Change Streams and Tailing Cursor polling. Using Virtual Threads requires opt-in as the configuration remains defaulting to Platform Threads.

This release ships also refinements for [JVM Checkpoint Restore arrangements (Project CRaC)](https://docs.spring.io/spring-framework/reference/6.1/integration/checkpoint-restore.html). Spring Data Redis' connection factory beans are now `Lifecycle` beans that auto-start on bean initialization and that can be stopped before taking a checkpoint snapshot. Going forward, we plan to explore support for additional modules, however specific support requires oftentimes support by database drivers directly.

There are many other features and refinement and various changes within the individual modules. This release ships also experimental support for Single Query Loading within the Spring Data JDBC module to load full aggregates using a single query. To find out more about what’s new, see the [release notes](https://github.com/spring-projects/spring-data-commons/wiki/Spring-Data-2023.1-%28Vaughan%29-Release-Notes) and the individual module reference documentation.

Going forward, we plan to expand Single Query Loading support and revise JPA's query mechanism to consolidate the various query approaches that have evolved over time.

This release will be included in the upcoming Spring Boot 3.2 GA release. We'd like to hear from you, so keep the feedback coming.

To round things off, here are the links to the individual modules, changelogs, artifacts and our new shiny Antora-based documentation sites:

-   Spring Data Commons `3.2 GA` - [Javadoc](https://docs.spring.io/spring-data/commons/docs/3.2.0/api/) - [Documentation](https://docs.spring.io/spring-data/commons/reference/) - [Changelog](https://github.com/spring-projects/spring-data-commons/releases/tag/3.2.0)
-   Spring Data JPA `3.2 GA` - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/3.2.0/api/) - [Documentation](https://docs.spring.io/spring-data/jpa/reference/) - [Changelog](https://github.com/spring-projects/spring-data-jpa/releases/tag/3.2.0)
-   Spring Data KeyValue `3.2 GA` - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/3.2.0/api/) - [Documentation](https://docs.spring.io/spring-data/keyvalue/reference/) - [Changelog](https://github.com/spring-projects/spring-data-keyvalue/releases/tag/3.2.0)
-   Spring Data MongoDB `4.2 GA` - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/4.2.0/api/) - [Documentation](https://docs.spring.io/spring-data/mongodb/reference/) - [Changelog](https://github.com/spring-projects/spring-data-mongodb/releases/tag/4.2.0)
-   Spring Data for Apache Cassandra `4.2 GA` - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/4.2.0/api/) - [Documentation](https://docs.spring.io/spring-data/cassandra/reference/) - [Changelog](https://github.com/spring-projects/spring-data-cassandra/releases/tag/4.2.0)
-   Spring Data Neo4j `7.2 GA` - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/7.2.0/api/) - [Documentation](https://docs.spring.io/spring-data/neo4j/reference/) - [Changelog](https://github.com/spring-projects/spring-data-neo4j/releases/tag/7.2.0)
-   Spring Data LDAP `3.2 GA` - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/3.2.0/api/) - [Documentation](https://docs.spring.io/spring-data/ldap/reference/) - [Changelog](https://github.com/spring-projects/spring-data-ldap/releases/tag/3.2.0)
-   Spring Data REST `4.2 GA` - [Javadoc](https://docs.spring.io/spring-data/rest/docs/4.2.0/api/) - [Documentation](https://docs.spring.io/spring-data/rest/reference/) - [Changelog](https://github.com/spring-projects/spring-data-rest/releases/tag/4.2.0)
-   Spring Data Redis `3.2 GA` - [Javadoc](https://docs.spring.io/spring-data/redis/docs/3.2.0/api/) - [Documentation](https://docs.spring.io/spring-data/redis/reference/) - [Changelog](https://github.com/spring-projects/spring-data-redis/releases/tag/3.2.0)
-   Spring Data Elasticsearch `5.2 GA` - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/5.2.0/api/) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/reference/) - [Changelog](https://github.com/spring-projects/spring-data-elasticsearch/releases/tag/5.2.0)
-   Spring Data Couchbase `5.2 GA` - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/5.2.0/api/) - [Documentation](https://docs.spring.io/spring-data/couchbase/reference/) - [Changelog](https://github.com/spring-projects/spring-data-couchbase/releases/tag/5.2.0)
-   Spring Data Relational `3.2 GA` - [Javadoc](https://docs.spring.io/spring-data/relational/docs/3.2.0/api/) - [Documentation](https://docs.spring.io/spring-data/relational/reference/) - [Changelog](https://github.com/spring-projects/spring-data-relational/releases/tag/3.2.0)