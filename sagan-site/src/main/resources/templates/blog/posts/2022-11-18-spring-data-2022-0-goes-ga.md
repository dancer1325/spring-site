---
title: Spring Data 2022.0 goes GA
source: https://spring.io/blog/2022/11/18/spring-data-2022-0-goes-ga
scraped: 2026-02-23T10:26:21.967Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  November 18, 2022 | 1 Comment
---

# Spring Data 2022.0 goes GA

_Releases | Mark Paluch |  November 18, 2022 | 1 Comment_

On behalf of the Spring Data engineering team and everyone who contributed to this release, I am pleased to announce the general availability of Spring Data `2022.0` (Codename: Turing) from Maven Central! It is the third major revision since Spring Data's inception in 2009 to serve you as your framework for modern-day data applications.

Spring Data `2022.0` builds on top of the [just-released Spring Framework 6.0](https://spring.io/blog/2022/11/16/spring-framework-6-0-goes-ga) with a Java 17+ baseline. Modules leveraging Jakarta EE technologies, such as Spring Data JPA and Spring Data REST, have been upgraded to Jakarta EE 9+, moving to the `jakarta` namespace, with a focus on the recently released Jakarta EE 10 APIs, such as Servlet 6.0 and JPA 3.1.

This release lays an initial foundation for [Ahead-of-Time compilation arrangements](https://spring.io/blog/2022/03/22/initial-aot-support-in-spring-framework-6-0-0-m3) to improve your experience with Graal Native runtime environments. Spring Data detects your repositories and domain types at build time and registers the required runtime hints for a seamless experience.

There are many other features and refinements, such as observability integration with Micrometer, a refined repository API introducing `List`\-based interface variants, and various changes within the individual modules. To find out more about what’s new, see the [release notes](https://github.com/spring-projects/spring-data-commons/wiki/Spring-Data-2022.0-%28Turing%29-Release-Notes) and the individual module’s reference documentation.

This release will be included in the upcoming Spring Boot 3.0 GA release.

Our virtual conference [SpringOne](https://springone.io/) in January is the best place to learn about our recent developments. Stay tuned. We'd like to hear from you, so keep the feedback coming.

To round things off, here are the links to the individual modules, changelogs and artifacts:

-   Spring Data Commons `3.0 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-commons/3.0.0) - [Javadoc](https://docs.spring.io/spring-data/commons/docs/3.0.0/api/) - [Documentation](https://docs.spring.io/spring-data/commons/docs/3.0.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-commons/releases/tag/3.0.0)
-   Spring Data JPA `3.0 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-jpa/3.0.0) - [Javadoc](https://docs.spring.io/spring-data/jpa/docs/3.0.0/api/) - [Documentation](https://docs.spring.io/spring-data/jpa/docs/3.0.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-jpa/releases/tag/3.0.0)
-   Spring Data Neo4j `7.0 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-neo4j/7.0.0) - [Javadoc](https://docs.spring.io/spring-data/neo4j/docs/7.0.0/api/) - [Documentation](https://docs.spring.io/spring-data/neo4j/docs/7.0.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-neo4j/releases/tag/7.0.0)
-   Spring Data MongoDB `4.0 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-mongodb/4.0.0) - [Javadoc](https://docs.spring.io/spring-data/mongodb/docs/4.0.0/api/) - [Documentation](https://docs.spring.io/spring-data/mongodb/docs/4.0.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-mongodb/releases/tag/4.0.0)
-   Spring Data KeyValue `3.0 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-keyvalue/3.0.0) - [Javadoc](https://docs.spring.io/spring-data/keyvalue/docs/3.0.0/api/) - [Documentation](https://docs.spring.io/spring-data/keyvalue/docs/3.0.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-keyvalue/releases/tag/3.0.0)
-   Spring Data for Apache Cassandra `4.0 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-cassandra/4.0.0) - [Javadoc](https://docs.spring.io/spring-data/cassandra/docs/4.0.0/api/) - [Documentation](https://docs.spring.io/spring-data/cassandra/docs/4.0.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-cassandra/releases/tag/4.0.0)
-   Spring Data LDAP `3.0 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-ldap/3.0.0) - [Javadoc](https://docs.spring.io/spring-data/ldap/docs/3.0.0/api/) - [Documentation](https://docs.spring.io/spring-data/ldap/docs/3.0.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-ldap/releases/tag/3.0.0)
-   Spring Data REST `4.0 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-rest-webmvc/4.0.0) - [Javadoc](https://docs.spring.io/spring-data/rest/docs/4.0.0/api/) - [Documentation](https://docs.spring.io/spring-data/rest/docs/4.0.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-rest/releases/tag/4.0.0)
-   Spring Data Redis `3.0 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-redis/3.0.0) - [Javadoc](https://docs.spring.io/spring-data/redis/docs/3.0.0/api/) - [Documentation](https://docs.spring.io/spring-data/redis/docs/3.0.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-redis/releases/tag/3.0.0)
-   Spring Data Elasticsearch `5.0 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-elasticsearch/5.0.0) - [Javadoc](https://docs.spring.io/spring-data/elasticsearch/docs/5.0.0/api/) - [Documentation](https://docs.spring.io/spring-data/elasticsearch/docs/5.0.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-elasticsearch/releases/tag/5.0.0)
-   Spring Data Couchbase `5.0 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-couchbase/5.0.0) - [Javadoc](https://docs.spring.io/spring-data/couchbase/docs/5.0.0/api/) - [Documentation](https://docs.spring.io/spring-data/couchbase/docs/5.0.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-couchbase/releases/tag/5.0.0)
-   Spring Data Relational `3.0 GA` - [Artifacts](https://repo.spring.io/libs-release/org/springframework/data/spring-data-relational/3.0.0) - [Javadoc](https://docs.spring.io/spring-data/jdbc/docs/3.0.0/api/) - [Documentation](https://docs.spring.io/spring-data/jdbc/docs/3.0.0/reference/html/) - [Changelog](https://github.com/spring-projects/spring-data-relational/releases/tag/3.0.0)