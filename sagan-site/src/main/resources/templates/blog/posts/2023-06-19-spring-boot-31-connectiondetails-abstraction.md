---
title: Spring Boot 3.1\'s ConnectionDetails abstraction
source: https://spring.io/blog/2023/06/19/spring-boot-31-connectiondetails-abstraction
scraped: 2026-02-23T09:40:18.108Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Moritz Halbritter |  June 19, 2023 | 4 Comments
---

# Spring Boot 3.1's ConnectionDetails abstraction

_Engineering | Moritz Halbritter |  June 19, 2023 | 4 Comments_

If you've used Spring Boot for a while, you're probably familiar with setting up connection details using properties. For example, you may have used `spring.datasource.url` to configure a JDBC connection. In Spring Boot 3.1 this continues to work as you'd expect, but we've changed things a bit under the hood to decouple the auto-configurations from the properties.

There's now a new [`ConnectionDetails`](https://github.com/spring-projects/spring-boot/blob/main/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/service/connection/ConnectionDetails.java) abstraction. This interface models the concept of a connection to a remote service. If you take a look at this interface, you'll see that it's empty. It serves as a tagging interface, and is extended by multiple other interfaces which model the connection to a concrete remote service, e.g. [`RedisConnectionDetails`](https://github.com/spring-projects/spring-boot/blob/main/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/data/redis/RedisConnectionDetails.java) for connections to a [Redis server](https://redis.io/) or [`JdbcConnectionDetails`](https://github.com/spring-projects/spring-boot/blob/main/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/jdbc/JdbcConnectionDetails.java) for connections to a database server through JDBC.

We added the `ConnectionDetails` abstraction primarily to support our brand new Docker Compose and Testcontainers features, which we will cover in depth in subsequent blog articles. But this abstraction isn't limited to only Docker Compose or Testcontainers. The auto-configurations in Spring Boot have been changed to use the `ConnectionDetails` if they are available. In such cases they will take even precendence over the configuration properties. If there is no such `ConnectionDetails` bean, then the properties will be used.

Let's take a look at the `JdbcConnectionDetails` interface:

```java
Copypublic interface JdbcConnectionDetails extends ConnectionDetails {

  String getUsername();

  String getPassword();

  String getJdbcUrl();

}
```

This is all Spring Boot needs to know in order to connect to a JDBC database. The URL contains which JDBC driver to use, which host to connect to, which port to use, etc. The username and the password are needed for authentication. This is equivalent to setting the `spring.datasource.url`, `spring.datasource.username` and `spring.datasource.password` properties.

Note that the interface does not include methods for everything related to JDBC connections. For example, the connection pool configuration is not part of the contract. This interface only deals with the information needed to connect to a remote service, other concerns like the pool size etc. are still configured through properties.

This abstraction is useful because, sometime in the future, other interesting integrations can be built on top of it. For example, a Spring Boot application running in [VMware Tanzu](https://tanzu.vmware.com/tanzu) cloud could discover the database which is associated to the application and automatically provide a `JdbcConnectionDetails` (or `R2dbcConnectionDetails` for reactive applications) bean which knows how to connect to that database. For you as a user this means less time fiddling with Kubernetes config maps and secrets, because the application "just knows" how to connect to the database. You'll have more time to concentrate on the important things in life like solving business problems and attending sprint meetings!

You might be wondering why a new interface is necessary when it's already possible to contribute properties for connection details. Indeed, using connection properties outside of `application.properties` is quite common. For example, when writing integration tests with Testcontainers, the `@DynamicPropertySource` feature is often used.

The problem with using properties outside of the application configuration is that they can change (and have in the past, like the `spring.redis` properties did), which leads to brittle coupling. If the property names change, the code which sets these properties still compiles, as it's all "stringly" typed. When using `ConnectionDetails` to provide the information on how to connect to a remote service, if we make backward-incompatible changes (and we won't without a good reason, we promise!), this will lead to a compile error. This is much better than finding out about the breakage in production.

If you want to use the `ConnectionsDetails` abstraction yourself, all you need to do is to define a bean with the right type, for example:

```java
Copy@Configuration(proxyBeanMethods = false)
class MyConnectionDetailsConfiguration {

  @Bean
  JdbcConnectionDetails myJdbcConnectionDetails() {
    return new JdbcConnectionDetails() {

      @Override
      public String getUsername() {
        return "myuser";
      }

      @Override
      public String getPassword() {
        return "3xtr3mly-s3cr3t";
      }

      @Override
      public String getJdbcUrl() {
        return "jdbc:postgresql://postgres-server.svc.local:5432/mydatabase?ssl=true&sslmode=required";
      }

    };
  }

}
```

Now Spring Boot will automatically use these information to connect to the given PostgreSQL database.

At the time of writing, there are the following sub-interfaces:

-   `CassandraConnectionDetails` for connections to a [Cassandra server](https://cassandra.apache.org/)
-   `CouchbaseConnectionDetails` for connections to a [Couchbase server](https://www.couchbase.com/)
-   `ElasticsearchConnectionDetails` for connections to an [Elasticsearch server](https://www.elastic.co/elasticsearch/)
-   `JdbcConnectionDetails` for connections to a database server through JDBC
-   `KafkaConnectionDetails` for connections to a [Kafka server](https://kafka.apache.org/)
-   `MongoConnectionDetails` for connections to a [MongoDB server](https://www.mongodb.com/)
-   `Neo4jConnectionDetails` for connections to a [Neo4J server](https://neo4j.com/)
-   `R2dbcConnectionDetails` for connections to a database server through R2DBC
-   `RabbitConnectionDetails` for connections to a [RabbitMQ server](https://www.rabbitmq.com/)
-   `RedisConnectionDetails` for connections to a [Redis server](https://redis.io/)
-   `ZipkinConnectionDetails` for connections to a [Zipkin server](https://zipkin.io/)

We hope you liked our little tour to the `ConnectionDetails` abstraction and we're excited to see what cool things will be built on top of it!