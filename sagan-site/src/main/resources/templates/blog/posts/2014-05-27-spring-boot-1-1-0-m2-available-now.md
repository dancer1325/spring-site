---
title: Spring Boot 1.1.0.M2 Available Now
source: https://spring.io/blog/2014/05/27/spring-boot-1-1-0-m2-available-now
scraped: 2026-02-23T22:29:33.182Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Dave Syer |  May 27, 2014 | 4 Comments
---

# Spring Boot 1.1.0.M2 Available Now

_Engineering | Dave Syer |  May 27, 2014 | 4 Comments_

Spring Boot 1.1.0.M2 is available now in the Spring repositories. There are quite a few new features and plenty of new [documentation](http://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/htmlsingle):

-   [Groovy Template](http://beta.groovy-lang.org/docs/groovy-2.3.1/html/documentation/#_template_engines) and [Velocity](http://docs.spring.io/spring/docs/current/spring-framework-reference/htmlsingle/#view-velocity) support for MVC and offline rendering.
    
-   Big changes to the `HealthIndicator` interface and the existing implementations, e.g. all database backends (like Mongo etc.) have a default `HealthIndicator` and the Actuator aggregates them all up into a single readout.
    
-   Support for Spring Data Solr and Spring Data Gemfire, and upgrade to the Spring Data Dijkstra release train
    
-   Support for multiple `DataSources` through a convenient
    

`DataSourceBuilder` abstraction, plus a similar feature for JPA `EntityManagerFactories`

-   Upgrades to various new versions of existing dependencies, e.g. Spring Batch 3.0, Spring Security 3.2.4

My favourite new feature is the ability to add `@ConfigurationProperties` to `@Beans` directly (as opposed to at the type level). This enables you to bind external properties to 2 instances of the same type, with different prefixes, e.g.

```java
Copy@Bean
@Primary
@ConfigurationProperties(prefix="datasource.primary")
public DataSource primaryDataSource() {
    return DataSourceBuilder.create().build();
}

@Bean
@ConfigurationProperties(prefix="datasource.secondary")
public DataSource secondaryDataSource() {
    return DataSourceBuilder.create().build();
}
```

In this example we bind to two beans of the same type. The concrete type of those beans might be a Tomcat `DataSource` or a HikariCP `DataSource`, so this shows that you can also use `@ConfigurationProperties` on `@Beans` to bind to types that you don't control (and don't have `@ConfigurationProperties` already).

We have many community members to thanks again for their contributions to this release (we are up to around 80 committers now, and there are others who help out with discussions and feedback). Keep up the good work! The plan is to get to RC1 next week and a GA release very soon after that, so please keep trying out the new features and send feedback via github.