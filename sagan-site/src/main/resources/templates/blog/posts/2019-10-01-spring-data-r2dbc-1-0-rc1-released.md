---
title: Spring Data R2DBC 1.0 RC1 released
source: https://spring.io/blog/2019/10/01/spring-data-r2dbc-1-0-rc1-released
scraped: 2026-02-23T14:35:02.332Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  October 01, 2019 | 3 Comments
---

# Spring Data R2DBC 1.0 RC1 released

_Releases | Mark Paluch |  October 01, 2019 | 3 Comments_

On behalf of the team and everyone that contributed, I am pleased to announce that the first release candidate of Spring Data R2DBC 1.0 has been released and is available from our milestone repository. This release contains 60 issues and pull requests. It upgrades its baseline to R2DBC 0.8 RC1 and Spring Data Moore GA.

The most notable features are:

-   `ConnectionFactory` routing through `AbstractRoutingConnectionFactory`.
-   Utilities for schema initialization through `ResourceDatabasePopulator` and `ScriptUtils`.
-   Propagation and reset of Auto-Commit and Isolation Level control through `TransactionDefinition`.
-   Support for Entity-level converters.
-   Kotlin extensions for reified generics and Coroutines.
-   Add pluggable mechanism to register dialects.
-   API refinements.

## [](#connectionfactory-routing)`ConnectionFactory` Routing

For each operation, `DatabaseClient` obtains a `Connection` from the `ConnectionFactory` that is used to create `DatabaseClient`.

The general idea is that a routing `ConnectionFactory` acts as an intermediary - while the ‘real’ `ConnectionFactory` is determined dynamically at runtime based on a lookup key. One potential use case is for catering to multi-tenancy by using multiple `ConnectionFactory` instances that point to a separate database. For a routing `ConnectionFactory` to determine which `ConnectionFactory` to use, it requires contextual information. Spring Data R2DBC comes with an `AbstractRoutingConnectionFactory` that can return a lookup key that is used to look up the right `ConnectionFactory`.

Reactive flows can attach contextual information to the subscription by using Project Reactor's [`Context`](https://projectreactor.io/docs/core/release/reference/#context).

An example implementation for a routing `ConnectionFactory` might look like the following listing:

```java
Copyclass RoutingConnectionFactory extends AbstractRoutingConnectionFactory {

    public static final String ROUTING_KEY = "routing-key";

    @Override
    protected Mono<Object> determineCurrentLookupKey() {
        return Mono.subscriberContext().filter(it -> it.hasKey(ROUTING_KEY)).map(it -> it.get(ROUTING_KEY));
    }
}
```

The following listing shows how to initialize the connection factory a map between the lookup key and the target `ConnectionFactory`:

```java
CopyRoutingConnectionFactory connectionFactory = new RoutingConnectionFactory();
Map<String, ConnectionFactory> factories = new HashMap<>();
factories.put("customer1", …);
factories.put("customer2", …);
connectionFactory.setTargetConnectionFactories(factories);
connectionFactory.afterPropertiesSet();
```

You can create a `DatabaseClient` by using the routing `ConnectionFactory` to determine the appropriate `ConnectionFactory` for each subscription. The routing key itself gets attached to the `Context` and is evaluated by `RoutingConnectionFactory`, as the following listing shows:

```java
CopyDatabaseClient client = DatabaseClient.create(connectionFactory);

Context routingContext = Context.of(ROUTING_KEY, "customer1");

Flux<User> users = client.execute("SELECT first_name, last_name FROM user")
                .as(User.class)
                .fetch()
                .all()
                .subscriberContext(routingContext);
```

## [](#schema-initialization)Schema Initialization

The `org.springframework.data.r2dbc.connectionfactory.init` package provides support for initializing an existing `ConnectionFactory`. You may sometimes need to initialize an instance that runs on a server somewhere or that is an embedded database. The following listing shows how to register and configure a `ConnectionFactoryInitializer` bean to initialize your database through a `ConnectionFactory`.

```java
Copy@Configuration
public class InitializerConfiguration {

  @Bean
  public ConnectionFactoryInitializer initializer(ConnectionFactory connectionFactory) {

    ConnectionFactoryInitializer initializer = new ConnectionFactoryInitializer();
    initializer.setConnectionFactory(connectionFactory);

    CompositeDatabasePopulator populator = new CompositeDatabasePopulator();
    populator.addPopulators(new ResourceDatabasePopulator(new ClassPathResource("com/foo/sql/db-schema.sql")));
    populator.addPopulators(new ResourceDatabasePopulator(new ClassPathResource("com/foo/sql/test-data1.sql")));
    initializer.setDatabasePopulator(populator);

    return initializer;
  }
}
```

This initialization support is used by Spring Boot R2DBC auto-configuration to apply `schema.sql` and `data.sql` to the configured `ConnectionFactory`.

## [](#kotlin-extensions)Kotlin Extensions

This release ships with Kotlin extensions for idiomatic usage of Spring Data R2DBC when developing applications with Kotlin.

Spring Data R2DBC provides the following extensions:

-   Reified generics support for `DatabaseClient` and `Criteria`
-   Kotlin Coroutines support for `DatabaseClient`

To retrieve a list of `User` objects in Java, you would normally write the following:

```java
CopyFlux<User> characters = client.select().from(User.class).fetch().all();
```

With Kotlin and the Spring Data extensions, you can instead write the following:

```kotlin
Copyval users =  client.select().from<User>().fetch().all()
```

Kotlin Coroutines are Kotlin lightweight threads that allow writing non-blocking code in an imperative style. Spring Data R2DBC's Coroutines extensions leverages the reactive infrastructure to expose functions you can `suspend` and bridge `Flux` results into Kotlin's `Flow` type.

The following example shows Coroutine usage with Spring Framework's `TransactionalOperator` to atomically insert two rows:

```kotlin
Copyoperator.executeAndAwait {
  client.execute("INSERT INTO person VALUES(:first_name, :last_name)")
        .bind("first_name", "John")
        .bind("last_name", "Doe")
        .await()
  client.execute("INSERT INTO person_events VALUES(:first_name, :last_name, :event_type)")
        .bind("first_name", "John")
        .bind("last_name", "Doe")
        .bind("event_type", "CREATED")
        .await()
}
```

Note that most `suspend` methods end with `await`, as an indicator for Coroutines methods.

## [](#pluggable-dialects)Pluggable Dialects

As of now, the R2DBC driver eco-system consists of only a few known drivers, but the number of drivers is growing. To enable seamless integration with additional drivers, Spring Data R2DBC exposes an extension point for `R2dbcDialect` registration. Spring Data R2DBC can auto-discover a `R2dbcDialect` by registering a class that implements `org.springframework.data.r2dbc.dialect.DialectResolver$R2dbcDialectProvider` through Spring's `META-INF/spring.factories` mechanism. The following listing shows how to do so:

```java
Copypublic class MyDialectProvider implements DialectResolver.R2dbcDialectProvider {

    @Override
    public Optional<R2dbcDialect> getDialect(ConnectionFactory connectionFactory) {

        if (connectionFactory.getMetadata().getName().equals("my-dastabase")) {
            return Optional.of(…);
        }
        return Optional.empty();
    }
}
```

**spring.factories**

```java
Copyorg.springframework.data.r2dbc.dialect.DialectResolver$R2dbcDialectProvider=com.example.MyDialectProvider
```

## [](#artifact-coordinates)Artifact Coordinates

If you use Maven, add the following lines to your `pom.xml` file to upgrade to Spring Data R2DBC 1.0 RC1:

```xml
Copy<dependencies>
  <dependency>
    <groupId>org.springframework.data</groupId>
    <artifactId>spring-data-r2dbc</artifactId>
    <version>1.0.0.RC1</version>
  </dependency>
</dependencies>

<!-- R2DBC 0.8.0.RC1 required -->
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>io.r2dbc</groupId>
      <artifactId>r2dbc-bom</artifactId>
      <version>Arabba-RC1</version>
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

## [](#next-steps)Next steps

R2DBC 0.8.0 RC1 was recently released, and we expect a GA release later this year. We're working towards a Spring Data R2DBC 1.0 GA release and will ship the next release once R2DBC itself is GA. Our backlog contains a series of enhancements, such as query derivation, optimistic locking, and allowing for query interception to alter bindings and SQL statements before they get executed.

To round things off, here are links to the changelog, GitHub repository, and docs:

-   Project Repository: [github.com/spring-projects/spring-data-r2dbc](https://github.com/spring-projects/spring-data-r2dbc)
-   Issue Tracker: [github.com/spring-projects/spring-data-r2dbc/issues](https://github.com/spring-projects/spring-data-r2dbc/issues)
-   [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-r2dbc/1.0.0.RC1/) - [Javadoc](https://docs.spring.io/spring-data/r2dbc/docs/1.0.0.RC1/api) - [Documentation](https://docs.spring.io/spring-data/r2dbc/docs/1.0.0.RC1/reference/html/) - [Changelog](https://docs.spring.io/spring-data/r2dbc/docs/1.0.0.RC1/changelog.txt)