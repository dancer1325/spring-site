---
title: Spring Data release train Arora available
source: https://spring.io/blog/2013/02/13/spring-data-release-train-arora-available
scraped: 2026-02-23T14:03:12.258Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  February 13, 2013 | 0 Comments
---

# Spring Data release train Arora available

_Releases | Oliver Drotbohm |  February 13, 2013 | 0 Comments_

I am pleased to announce the first themed release of the Spring Data release train named [Arora](http://en.wikipedia.org/wiki/Sanjeev_Arora). Going forward we'll use names of famous computer scientists to label a set of Spring Data modules to make it easier to identify modules being compatible to each other. This mostly refers to the Spring Data Commons version they refer to.

  

The Arora release contains the following modules:

-   Spring Data Commons 1.5 - [Artifacts](http://repo.springsource.org/libs-release/org/springframework/data/spring-data-commons/1.5.0.RELEASE/) - [JavaDocs](http://static.springsource.org/spring-data/commons/docs/1.5.0.RELEASE/api/) - [Documentation](http://static.springsource.org/spring-data/commons/docs/1.5.0.RELEASE/reference/html/) - [Changelog](http://static.springsource.org/spring-data/commons/docs/1.5.0.RELEASE/changelog.txt)
-   Spring Data JPA 1.3 - [Artifacts](http://repo.springsource.org/libs-release/org/springframework/data/spring-data-jpa/1.3.0.RELEASE/) - [JavaDocs](http://static.springsource.org/spring-data/jpa/docs/1.3.0.RELEASE/api/) - [Documentation](http://static.springsource.org/spring-data/jpa/docs/1.3.0.RELEASE/reference/html/) - [Changelog](http://static.springsource.org/spring-data/jpa/docs/1.3.0.RELEASE/changelog.txt)
-   Spring Data MongoDB 1.2 - [Artifacts](http://repo.springsource.org/libs-release/org/springframework/data/spring-data-mongodb/1.2.0.RELEASE/) - [JavaDocs](http://static.springsource.org/spring-data/mongodb/docs/1.2.0.RELEASE/api/) - [Documentation](http://static.springsource.org/spring-data/mongodb/docs/1.2.0.RELEASE/reference/html/) - [Changelog](http://static.springsource.org/spring-data/mongodb/docs/1.2.0.RELEASE/changelog.txt)
-   Spring Data Neo4j 2.2 - [Artifacts](http://repo.springsource.org/libs-release/org/springframework/data/spring-data-neo4j/2.2.0.RELEASE/) - [JavaDocs](http://static.springsource.org/spring-data/neo4j/docs/2.2.0.RELEASE/api/) - [Documentation](http://static.springsource.org/spring-data/neo4j/docs/2.2.0.RELEASE/reference/html/) - [Changelog](http://static.springsource.org/spring-data/neo4j/docs/2.2.0.RELEASE/changelog.txt)
-   Spring Data Redis 1.0.3 - [Artifacts](http://repo.springsource.org/libs-release/org/springframework/data/spring-data-redis/1.0.3.RELEASE/) - [JavaDocs](http://static.springsource.org/spring-data/redis/docs/1.0.3.RELEASE/api/) - [Documentation](http://static.springsource.org/spring-data/redis/docs/1.0.3.RELEASE/reference/html/) - [Changelog](http://static.springsource.org/spring-data/redis/docs/1.0.3.RELEASE/changelog.txt)
-   Spring Data Gemfire 1.3 M1 - [Artifacts](http://repo.springsource.org/libs-milestone/org/springframework/data/spring-data-gemfire/1.3.0.M1/) - [JavaDocs](http://static.springsource.org/spring-data/gemfire/docs/1.3.0.M1/api/) - [Documentation](http://static.springsource.org/spring-data/gemfire/docs/1.3.0.M1/reference/html/) - [Changelog](http://static.springsource.org/spring-data/gemfire/docs/1.3.0.M1/changelog.txt)
-   Spring Data Solr 1.0 RC1 - [Artifacts](http://repo.springsource.org/libs-milestone/org/springframework/data/spring-data-solr/1.0.0.RC1/) - [JavaDocs](http://static.springsource.org/spring-data/solr/docs/1.0.0.RC1/api/) - [Documentation](http://static.springsource.org/spring-data/solr/docs/1.0.0.RC1/reference/html/) - [Changelog](http://static.springsource.org/spring-data/solr/docs/1.0.0.RC1/changelog.txt)

The major new features of the release are:

-   Annotation based auditing support through `@CreatedDate`, `@CreatedBy` etc. (except Spring Data Gemfire)
-   Exposure of Spring Data Mapping information for all modules (to be used by Spring Data REST)
-   Spring Data Mapping information being read from accessor methods as well
-   Automatic registration of JodaTime Converters if present on classpath (Spring Data MongoDB)
-   Major improvements to mapping subsystem and query execution for Spring Data MongoDB
-   Extended querying options on query methods (Spring Data Solr)
-   Annotation support for Gemfire functions (Spring Data Gemfire)
-   A tag has been added to the gfe-data XML namespace for automatic basic client connection and region configuration. (Spring Data Gemfire)
-   Support for Lettuce Redis driver (raising the count of supported driver to 5, Spring Data Redis)
-   Dynamic removal of listener for running MesageListenerContainer (Spring Data Redis)
-   Refined Maven build to ease release process

Alongside the new major versions of the Spring Data Modules we've also published bugfix releases for Spring Data Commons (1.4.1), Spring Data JPA (1.2.1) and Spring Data MongoDB (1.1.2).

  

*Note: The artifactId of the Spring Data Commons module has changed to from `spring-data-commons-core` to `spring-data-commons`. So if you're explicitly referring to it from your project, make sure you update the reference accordingly.*

The binaries will be present in Maven central shortly if not already in place.