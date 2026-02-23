---
title: Spring Cloud Connectors 1.2.0 RC1 released
source: https://spring.io/blog/2015/05/22/spring-cloud-connectors-1-2-0-rc1-released
scraped: 2026-02-23T19:51:38.627Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Scott Frederick |  May 22, 2015 | 5 Comments
---

# Spring Cloud Connectors 1.2.0 RC1 released

_Releases | Scott Frederick |  May 22, 2015 | 5 Comments_

I’m pleased to announce the availability of Spring Cloud Connectors 1.2.0 RC1.

This release should be fully backward compatible with 1.1.0.RELEASE for applications using the library. Libraries that extend the core Connectors library should be recompiled against 1.2.0 RC1, and may encounter a few small extension API changes. Barring any issues, this will be the only RC before 1.2.0.RELEASE.

Here's an overview of what's new in 1.2.0:

# [](#spring-cloud-connectors-core)Spring Cloud Connectors Core

## [](#amqp)AMQP

-   `AmqpServiceInfo` no longer validates that the path element of a URI contains a value, which allows the default RabbitMQ vhost to be used.
-   URL validation in `AmqpServiceInfo` was relaxed such that [QPID URL format](https://cwiki.apache.org/confluence/display/qpid/Connection+URL+Format) is supported as well as RabbitMQ URL format.
-   `AmqpServiceInfo` now supports holding a list of URIs for providers that support multiple host connections.

# [](#cloud-foundry-connector)Cloud Foundry Connector

## [](#relational-databases)Relational Databases

-   All relational database `ServiceInfo` parsers now honor a `jdbcUrl` field in the `credentials` contained in `VCAP_SERVICES`. If a `jdbcUrl` is found, its value is provided by `RelationalServiceInfo.getJdbcUrl` without modification. If a `jdbcUrl` is not found, then a JDBC URL will be constructed by `RelationalServiceInfo` as before.

## [](#amqp-1)AMQP

-   The AMQP `ServiceInfo` parser now supports multiple URIs as provided by Pivotal’s RabbitMQ for Pivotal Cloud Foundry version 1.4.
-   The AMQP `ServiceInfo` parser now parses the management API and makes it available to clients.
-   `amqps` was added as a valid scheme when detecting an AMQP service based on a `url` field in the `credentials` contained in `VCAP_SERVICES`.

# [](#spring-connector)Spring Connector

## [](#java-configuration)Java Configuration

-   There was an issue with nested `@Configuration` classes that extend `AbstractCloudConfig` triggering `ClassNotFound` exceptions when spring-data-jpa, spring-data-mongodb, spring-data-redis, or spring-amqp are not present on the runtime classpath. This issue has been resolved, so only the dependencies actually needed by the application are required at runtime.

## [](#relational-databases-1)Relational Databases

-   The [HikariCP](https://github.com/brettwooldridge/HikariCP) connection pooling library is now supported when creating a `DataSource`, along with Tomcat and Apache Commons pooling libraries.

## [](#rabbitmq)RabbitMQ

-   `RabbitConnectionFactoryConfig` will now accept a map of key/value pairs to allow setting arbitrary properties of the created `ConnectionFactory`. This can be used by Java configuration or XML configuration.

## [](#redis)Redis

-   `RedisConnectionFactoryConfig` will now accept a map of key/value pairs to allow setting arbitrary properties of the created `RedisConnectionFactory`. This can be used by Java configuration or XML configuration.

MongoDB

-   `MongoDbFactoryCreator` now passes the authSource from the URI to the `MongoDbFactory`.
-   `MongoDbFactoryCreator` now accepts a URL that contains a list of replica sets.