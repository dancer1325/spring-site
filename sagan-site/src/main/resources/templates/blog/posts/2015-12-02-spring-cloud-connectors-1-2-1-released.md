---
title: Spring Cloud Connectors 1.2.1 released
source: https://spring.io/blog/2015/12/02/spring-cloud-connectors-1-2-1-released
scraped: 2026-02-23T19:34:11.534Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Scott Frederick |  December 02, 2015 | 0 Comments
---

# Spring Cloud Connectors 1.2.1 released

_Releases | Scott Frederick |  December 02, 2015 | 0 Comments_

I’m pleased to announce the availability of Spring Cloud Connectors 1.2.1. This is a maintenance release with a few new features and a few bug fixes.

Here are the highlights:

# [](#heroku-connector)Heroku Connector

## [](#relational-databases)Relational Databases

-   The Heroku cloud connector now recognizes the `DATABASE_URL` environment variable when detecting [PostgreSQL database](https://devcenter.heroku.com/articles/heroku-postgresql#create-a-new-database).

## [](#redis)Redis

-   [Heroku Redis](https://elements.heroku.com/addons/heroku-redis) is now supported.

# [](#spring-connector)Spring Connector

## [](#relational-databases-1)Relational Databases

-   When creating a `DataSource`, Spring Cloud Connectors will look for a pooling `DataSource` implementation on the classpath and choose one based on a [default priority](http://cloud.spring.io/spring-cloud-connectors/spring-cloud-spring-service-connector.html#_detection_and_prioritization_of_code_datasource_code_implementations). The priority of detection has been changed to more closely match the order used in [Spring Boot](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-connect-to-production-database).
-   Applications can customize the priority order of pooled `DataSource` implementations using either [Java configuration](http://cloud.spring.io/spring-cloud-connectors/spring-cloud-spring-service-connector.html#_reordering_implementation_priority) or [XML configuration](http://cloud.spring.io/spring-cloud-connectors/spring-cloud-spring-service-connector.html#_reordering_implementation_priority_2).
-   `DataSourceConfig` will now accept a map of key/value pairs to allow setting arbitrary properties of the created `DataSource`. This allows overriding of the default JDBC driver class name and validation query set up by Connectors, in addition to other properties of the `DataSource`. This can be used by Java configuration or XML configuration.

See the full list of [resolved issues in GitHub](https://github.com/spring-cloud/spring-cloud-connectors/issues?q=milestone%3A1.2.1).