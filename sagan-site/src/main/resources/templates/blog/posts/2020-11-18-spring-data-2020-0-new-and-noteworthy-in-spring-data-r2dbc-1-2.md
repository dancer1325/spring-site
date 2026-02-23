---
title: Spring Data 2020.0 - New and Noteworthy in Spring Data R2DBC 1.2
source: https://spring.io/blog/2020/11/18/spring-data-2020-0-new-and-noteworthy-in-spring-data-r2dbc-1-2
scraped: 2026-02-23T13:40:55.297Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Paluch |  November 18, 2020 | 0 Comments
---

# Spring Data 2020.0 - New and Noteworthy in Spring Data R2DBC 1.2

_Engineering | Mark Paluch |  November 18, 2020 | 0 Comments_

This release is a major milestone in Spring's R2DBC support. Spring support for R2DBC started as an experimental project two years ago to evaluate how a reactive SQL integration might look. With this release, Spring Data R2DBC underwent a major refactoring by moving several components into a dedicated `spring-r2dbc` module and deprecating components that are provided by the Spring Framework. Besides that change, Spring Data R2DBC ships with the following most notable changes:

-   Add lifecycle callbacks through the `EntityCallback` API
-   Reactive auditing
-   Pass-through of `enum` values and Postgres Geo types

## [](#spring-r2dbc)Spring R2DBC

Spring Data R2DBC is now based on `spring-r2dbc`, a new module in Spring Framework that ships with core R2DBC support, such as `DatabaseClient`, `ConnectionFactoryInitializer`, and `R2dbcTransactionManager`. Those components were deprecated in favor of Spring R2DBC components and marked for removal with the next major Spring Data R2DBC release. See the [migration guide](https://docs.spring.io/spring-data/r2dbc/docs/current/reference/html/#upgrading.1.1-1.2) to learn about deprecations and what replacement API to use.

## [](#lifecycle-entitycallback-api)Lifecycle EntityCallback API

[Spring Data Moore introduced](https://spring.io/blog/2019/10/08/what-s-new-in-spring-data-moore) the [`EntityCallback` API](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/mapping/callback/EntityCallbacks.html) to pre-process and post-process entities upon load, save, and delete operations. Entity callbacks are invoked during persistence operations and allow in-place modifications to entities and returning new object instances if an entity class is immutable.

`EntityCallback` interfaces are reactive-enabled by returning `Publisher<T>` where `T` represents the entity type. Returning a publisher allows consuming the subscriber context (as is done for reactive auditing) or integrating with other reactive components that perform I/O before saving an entity or after loading one.

You can use `EntityCallback` for all sorts of callback hooks. The following example defines a `BeforeConvertCallback` to generate a primary key value from a H2 sequence for the `Customer` type if its identifier is `null`:

```java
Copy@Bean  
BeforeConvertCallback<Customer> idGeneratingCallback(DatabaseClient databaseClient) {  
  
   return (customer, sqlIdentifier) -> {  
  
      if (customer.getId() == null) {  
  
         return databaseClient.sql("SELECT primary_key.nextval") //  
  .map(row -> row.get(0, Long.class)) //  
  .first() //  
  .map(customer::withId);  
      }  
  
      return Mono.just(customer);  
   };  
}
```

You can read more about [R2DBC EntityCallbacks](https://docs.spring.io/spring-data/r2dbc/docs/current/reference/html/#r2dbc.entity-callbacks) in the [R2DBC reference documentation](https://docs.spring.io/spring-data/r2dbc/docs/current/reference/html/).

## [](#pass-thru-of-enum-values-and-postgres-geo-types)Pass-thru of `enum` Values and Postgres Geo Types

Postgres supports various data types, of which enumerations and Geometric types can be used directly from Spring Data R2DBC. By default, Spring Data converts `enum` values to `String` by using the enum's `name()` method to represent the enumeration value. R2DBC Postgres supports (since version 0.8.4) a specific codec that accepts Java `enum` types and maps these onto the corresponding Postgres enum type.

Consider the following Java `enum`:

```java
Copyenum Color {
	Blue, Green, White
}
```

Enumeration types in Postgres need to be created before using enum types:

```sql
CopyCREATE TYPE color_enum as enum ('Blue', 'Green', `White`);

CREATE TABLE product (id SERIAL PRIMARY KEY, color color_enum);
```

Once the enum type is in place, you need to configure the driver to associate the Java enum with the corresponding Postgres enum type. This is done by using the R2DBC Postgres `EnumCodec` builder . The resulting `CodecRegistrar` must be registered with the connection configuration before creating a `ConnectionFactory`:

```java
CopyCodecRegistrar codecRegistrar = EnumCodec.builder().withEnum("color_enum", Color.class).build();

PostgresqlConnectionConfiguration configuration = PostgresqlConnectionConfiguration.builder()
 
    .codecRegistrar(codecRegistrar)
 
    // additional configuration
    .build();
```

See also the [driver documentation on Postgres Enum Types](https://github.com/pgjdbc/r2dbc-postgresql#postgres-enum-types) for further reference.

Once the `ConnectionFactory` is configured, you can configure specific `enum` types in Spring Data to be passed-thru to the driver with their actual value instead of converting the enum value to `String`. `R2dbcCustomConversions` is the entry point to use when configuring simple types and their converters:

```java
CopyR2dbcCustomConversions conversions = R2dbcCustomConversions.of(PostgresDialect.INSTANCE, new ColorConverter());
```

Now you can use the enumeration type in your domain class:

```java
Copyclass Product {
  @Id Integer id;
  Color color;
  // getter, setter, constructors omitted for brevity
}
```

See the reference documentation on [Overriding Enum Mapping with Explicit Converters](https://docs.spring.io/spring-data/r2dbc/docs/current/reference/html/#mapping.explicit.enum.converters).

In contrast to enums, using Postgres Geometric types requires no special setup since Geo types have fixed type identifiers and map to individual Geo types. Spring Data R2DBC supports the use of the following driver-specific types in your entities:

-   `io.r2dbc.postgresql.codec.Box`
-   `io.r2dbc.postgresql.codec.Circle`
-   `io.r2dbc.postgresql.codec.Line`
-   `io.r2dbc.postgresql.codec.Lseg`
-   `io.r2dbc.postgresql.codec.Point`
-   `io.r2dbc.postgresql.codec.Path`
-   `io.r2dbc.postgresql.codec.Polygon`

Alternatively, you can use Spring Data's Geo Types in your domain model:

-   `org.springframework.data.geo.Box`
-   `org.springframework.data.geo.Circle`
-   `org.springframework.data.geo.Point`
-   `org.springframework.data.geo.Polygon`

To use Geometric types, create a table and a corresponding entity type:

```sql
CopyCREATE TABLE venue (id SERIAL PRIMARY KEY, name VARCHAR(255), location POINT);
```

```java
Copyclass Venue {
  @Id Long id;
  String name;
  Point location;
  // getter, setter, constructors omitted for brevity
}
```

Finally, you can use the entity in your application:

```java
CopyR2dbcEntityTemplate template = …;

template.insert(new Venue(null, "Seattle Space Needle", Point.of(47.6204,-122.3491));
```