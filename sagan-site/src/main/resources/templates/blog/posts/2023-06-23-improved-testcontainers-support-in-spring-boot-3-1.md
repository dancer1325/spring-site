---
title: Improved Testcontainers Support in Spring Boot 3.1
source: https://spring.io/blog/2023/06/23/improved-testcontainers-support-in-spring-boot-3-1
scraped: 2026-02-23T09:38:28.781Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Moritz Halbritter |  June 23, 2023 | 16 Comments
---

# Improved Testcontainers Support in Spring Boot 3.1

_Engineering | Moritz Halbritter |  June 23, 2023 | 16 Comments_

There's been support for [Testcontainers](https://testcontainers.com/) in Spring Boot for some time now, and Spring Boot 3.1 improves it further. But first, let's take a look at what Testcontainers is and how it's usually used.

> Testcontainers is an open source framework for providing throwaway, lightweight instances of databases, message brokers, web browsers, or just about anything that can run in a Docker container.

If you have used Testcontainers in the past, there's a high chance that you have been using them in integration tests:

```java
Copy@SpringBootTest
@Testcontainers
class MyIntegrationTests {

    @Container
    static Neo4jContainer<?> neo4j = new Neo4jContainer<>("neo4j:5");

    @Test
    void myTest() {
        // ...
    }

    @DynamicPropertySource
    static void neo4jProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.neo4j.uri", neo4j::getBoltUrl);
    }

}
```

In this integration test, a Neo4j database is started inside a Testcontainer, and a `@DynamicPropertySource` is put in place to configure Spring Boot to use the Neo4j database running in the container.

With Spring Boot 3.1, we've added two new features related to Testcontainers. Both of those features have been implemented on top of the `ConnectionDetails` abstraction, which we [featured in a separate blog post](https://spring.io/blog/2023/06/19/spring-boot-31-connectiondetails-abstraction). In case you haven't read it, please do so now. The rest of this blog post will then make more sense.

The first of the features makes integration testing with Testcontainers easier. The new `@ServiceConnection` annotation can be used on the container instance fields of your tests:

```java
Copy@SpringBootTest
@Testcontainers
class MyIntegrationTests {

    @Container
    @ServiceConnection
    static Neo4jContainer<?> neo4j = new Neo4jContainer<>("neo4j:5");

    @Test
    void myTest() {
        // ...
    }

}
```

This replaces the need for the `@DynamicPropertySource` code, so you can just remove it.

Under the covers, `@ServiceConnection` discovers the type of container that is annotated and creates a `ConnectionDetails` bean for it. In our example, the bean would be a `Neo4jConnectionDetails`. The Spring Boot auto-configuration for Neo4j consumes this bean and configures the driver to connect to the Neo4j server running in the Testcontainer. This [works for many of the different container types supported by Testcontainers](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.testing.testcontainers.service-connections). If you're using `GenericContainer`, we'll take a look at the image name to infer the type of container. If you're using a custom image whose name we don't recognize, you can use the `name` attribute of the `@ServiceConnection` annotation to point us in the right direction.

Annotating the container fields with `@ServiceConnection` has several advantages. First, you have to type less code. Second, there's no more "stringly" typed coupling between your integration tests and the Spring Boot auto-configurations through the properties. And third, you don't have to look up (or remember) the property names.

We think this is quite a nifty feature and enough of a reason to upgrade to Spring Boot 3.1. In case you're not convinced yet, let us show you another great feature: Testcontainers at development time.

## [](#testcontainers-at-development-time)Testcontainers at development time

Most applications need some kind of external service, for example, a PostgreSQL database, a Redis server, or a Zipkin backend. Usually, these services are provided by either running some `docker run` commands from the readme before touching the code, or you use something like Docker Compose (for which Spring Boot 3.1 [added some cool new features, too](https://spring.io/blog/2023/06/21/docker-compose-support-in-spring-boot-3-1)).

With Testcontainers at development time, you now get another tool in your toolbox. Why should you use Testcontainers only for integration tests? Technically, nothing is stopping you from starting Testcontainers in your production code and then putting properties in place to connect to those containers. This works right now, even with Spring Boot before 3.1.

The downside of that approach is that you now need to have the Testcontainers dependency on your compile classpath, and there's a high chance that this dependency is then included in your fat JAR, too. With Spring Boot 3.1, there's a better way: leave the Testcontainers dependency in the `test` scope. All you need to do is to create a new `main` method inside your **test** code:

```java
Copypublic class TestMyApplication {

    public static void main(String[] args) {
        SpringApplication.from(MyApplication::main).run(args);
    }

}
```

This test-`main` method uses the new `SpringApplication.from` method to delegate to your "real" main method in production code.

You can now create a `@TestConfiguration` which defines beans for the Testcontainers you need while developing your application:

```java
Copy@TestConfiguration(proxyBeanMethods = false)
class MyContainersConfiguration {

    @Bean
    @ServiceConnection
    Neo4jContainer<?> neo4jContainer() {
        return new Neo4jContainer<>("neo4j:5");
    }

}
```

Please note that this bean method is annotated with `@ServiceConnection` so that Spring Boot automatically establishes a connection to the service running in the container. The lifecycle of this container is managed by Spring Boot. We start the container on application start-up and shut it down when the application is stopped.

With that in place, go back to your test-`main` method and point it to the newly created `@TestConfiguration`:

```java
Copypublic class TestMyApplication {

    public static void main(String[] args) {
        SpringApplication.from(MyApplication::main)
            .with(MyContainersConfiguration.class)
            .run(args);
    }

}
```

Now you can start this test-`main` method from your IDE and the containers automatically start up and Spring Boot establishes connections to them. You don't have to set any configuration properties, and Spring Boot makes sure to shut down the containers when your application is stopped. If you prefer to run your application from the terminal, we've got you covered there, too. The Spring Boot plugins for Gradle and Maven learned to run this test-`main` method. With Gradle, it's `./gradlew bootTestRun`, with Maven it's `./mvnw spring-boot:test-run`.

One thing to note is that your containers shut down every time you restart your application, and with that, they lose their data. This can be solved in two ways: The first one is to use the Spring Boot devtools, and then annotate the bean methods for your container with `@RestartScope`. Such containers are **not** restarted when devtools restarts your application. That means you don't have to wait for container startup every time you change something in your application and the containers keep their data.

The second way is a feature in Testcontainers named [reusable containers](https://java.testcontainers.org/features/reuse/):

```java
Copy@TestConfiguration(proxyBeanMethods = false)
public class MyContainersConfiguration {

    @Bean
    @ServiceConnection
    public Neo4jContainer<?> neo4jContainer() {
        return new Neo4jContainer<>("neo4j:5").withReuse(true);
    }

}
```

Such containers are not stopped when the application is shut down. This is an **experimental** Testcontainers feature, so use it at your own risk.

For completeness, here's the list of containers we support at the moment:

-   `CassandraContainer`
-   `CouchbaseContainer`
-   `ElasticsearchContainer`
-   `GenericContainer` using `redis` or `openzipkin/zipkin`
-   `JdbcDatabaseContainer`
-   `KafkaContainer`
-   `MongoDBContainer`
-   `MariaDBContainer`
-   `MSSQLServerContainer`
-   `MySQLContainer`
-   `Neo4jContainer`
-   `OracleContainer`
-   `PostgreSQLContainer`
-   `RabbitMQContainer`
-   `RedpandaContainer`

We hope you like these new features and that they'll help you write even more awesome applications. Please read the [documentation](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#features.testing.testcontainers) to get started, and if you find any problems or have ideas to improve this further, [please get in contact](https://github.com/spring-projects/spring-boot/issues)!