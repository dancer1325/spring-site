---
title: Spring Data R2DBC 1.0 M2 and Spring Boot starter released
source: https://spring.io/blog/2019/05/15/spring-data-r2dbc-1-0-m2-and-spring-boot-starter-released
scraped: 2026-02-23T14:47:28.529Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  May 15, 2019 | 3 Comments
---

# Spring Data R2DBC 1.0 M2 and Spring Boot starter released

_Releases | Mark Paluch |  May 15, 2019 | 3 Comments_

## [](#spring-data-r2dbc)Spring Data R2DBC

On behalf of the community and everyone who contributed, I'm delighted to announce the availability of the second milestone of Spring Data R2DBC 1.0. It is based on the recently released [Moore M4 release](https://spring.io/blog/2019/05/14/spring-data-moore-m4-lovelace-sr8-and-ingalls-sr22-released) and [R2DBC 0.8.0.M8 release](https://r2dbc.io/2019/05/13/r2dbc-0-8-milestone-8-released). Please note that Spring Data R2DBC is released outside of the Moore release train and it will be part of the next release train [Neumann](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Neumann).

Spring Data R2DBC ships with [32 tickets fixed](https://github.com/spring-projects/spring-data-r2dbc/milestone/2?closed=1). The most notable features are:

-   Support for MySQL by using [jasync-sql](https://github.com/jasync-sql/jasync-sql).
-   Reactive transaction manager.
-   Fluent API for `insert`/`update`/`delete` operations.
-   Coroutine extensions.
-   Support for custom conversions.
-   Named parameters that are translated to native bind markers by using `Dialect` instances.
-   Support for single-column projections for simple types.
-   Refactored package structure.

If you use Maven, include the following lines in your `pom.xml` to use Spring Data R2DBC 1.0 M2 in your project:

```xml
Copy<dependencies>
  <dependency>
    <groupId>org.springframework.data</groupId>
    <artifactId>spring-data-r2dbc</artifactId>
    <version>1.0.0.M2</version>
  </dependency>
</dependencies>

<!-- R2DBC 0.8.0.M8 required -->
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>io.r2dbc</groupId>
      <artifactId>r2dbc-bom</artifactId>
      <version>Arabba-M8</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>

<repositories>
  <repository>
    <id>spring-milestone</id>
    <url>https://repo.spring.io/milestone</url>
  </repository>
</repositories>
```

## [](#spring-boot-autoconfiguration-and-actuator)Spring Boot Autoconfiguration and Actuator

Together with this release, I'd also like to announce a milestone release of Spring Boot support for R2DBC 0.1.0.M1. This is an experimental Spring Boot module that provides auto-configuration and actuator support. It is marked as experimental, as this support is likely to get merged into a future Spring Boot release eventually.

Here's what you get from the experimental Spring Boot support for R2DBC:

-   URL-based configuration of R2DBC `ConnectionFactory` (`spring.r2dbc.url=rdbc:postgresql://<server>:<port>/<database>`).
-   Embedded database support for H2. H2 is configured for both R2DBC and JDBC access when `r2dbc-h2` and `spring-jdbc` are available.
-   Connection pool support (`spring.r2dbc.pool.initial-size`, `spring.r2dbc.pool.max-size`, `spring.r2dbc.validation-query`).
-   Actuator support by exposing a reactive `ConnectionFactoryHealthIndicator`.
-   Configuration of `R2dbcConnectionManager` enabling reactive `@Transactional`.
-   Configuration of `TransactionalOperator` bean.
-   Configuration of `r2dbc-client` by exposing a `R2dbc` bean.

```xml
Copy<dependencies>
  <dependency>
    <groupId>org.springframework.boot.experimental</groupId>
    <artifactId>spring-boot-starter-data-r2dbc</artifactId>
    <version>0.1.0.M1</version>
  </dependency>

  <dependency>
    <groupId>org.springframework.boot.experimental</groupId>
    <artifactId>spring-boot-actuator-autoconfigure-r2dbc</artifactId>
    <version>0.1.0.M1</version>
  </dependency>
  
  <dependency>
    <groupId>io.r2dbc</groupId>
    <artifactId>r2dbc-postgresql</artifactId>
    <version>0.8.0.M8</version>
    <scope>runtime</scope>
  </dependency>
  
  <!-- Enable for connection pooling -->
  <dependency>
    <groupId>io.r2dbc</groupId>
    <artifactId>r2dbc-pool</artifactId>
    <scope>runtime</scope>
  </dependency>
</dependencies>

<repositories>
  <repository>
    <id>spring-milestone</id>
    <url>https://repo.spring.io/milestone</url>
  </repository>
</repositories>
```

The [repository readme](https://github.com/spring-projects-experimental/spring-boot-r2dbc#spring-boot-r2dbc-starter) and our [documentation](https://github.com/spring-projects-experimental/spring-boot-r2dbc/blob/master/documentation.adoc) are the best places to get you started. Also, make sure to check out our [Spring WebFlux/R2DBC/H2 example](https://github.com/spring-projects-experimental/spring-boot-r2dbc/tree/master/spring-boot-example-h2).

## [](#next-steps)Next steps

R2DBC continues to evolve. We expect another series of R2DBC releases in the October timeframe so that we can pick up these in Spring Data R2DBC and eventually ship a release candidate. Our backlog contains a series of refinements around dialect support for an improved extensibility model, and we look forward to allowing for query interception to alter bindings and SQL statements before they are sent to a database.

To round things off, here are links to the changelog, GitHub repository, and docs:

-   Project Repository: [github.com/spring-projects/spring-data-r2dbc](https://github.com/spring-projects/spring-data-r2dbc)
-   Issue Tracker: [github.com/spring-projects/spring-data-r2dbc/issues](https://github.com/spring-projects/spring-data-r2dbc/issues)
-   [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-r2dbc/1.0.0.M2/) - [Javadoc](https://docs.spring.io/spring-data/r2dbc/docs/1.0.0.M2/api) - [Documentation](https://docs.spring.io/spring-data/r2dbc/docs/1.0.0.M2/reference/html/) - [Changelog](https://docs.spring.io/spring-data/r2dbc/docs/1.0.0.M2/changelog.txt)