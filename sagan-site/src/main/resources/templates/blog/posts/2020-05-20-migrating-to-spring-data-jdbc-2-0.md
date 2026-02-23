---
title: Migrating to Spring Data JDBC 2.0
source: https://spring.io/blog/2020/05/20/migrating-to-spring-data-jdbc-2-0
scraped: 2026-02-23T13:59:48.579Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Jens Schauder |  May 20, 2020 | 3 Comments
---

# Migrating to Spring Data JDBC 2.0

_Engineering | Jens Schauder |  May 20, 2020 | 3 Comments_

With Spring Data JDBC 2.0, we had to introduce some breaking changes. The goal of this article is to help in the migration process.

## [](#tldr)[](#tldr)TL;DR

1.  Use the default letter casing for custom column and table names or quote the names for table generation exactly as used in the annotations.
    
2.  Use `AbstractJdbcConfiguration` for custom configuration of the application context.
    
3.  [Register a `Dialect` if necessary](https://stackoverflow.com/a/61854586/66686).
    
4.  Review event-handling code and ensure the data you try to use is not `null`.
    

## [](#quoting-of-identifiers)[](#quoting-of-identifiers)Quoting of Identifiers

Spring Data JDBC 1.x uses table and column names mostly without changing them. This causes problems when you use an SQL key word as a property or entity name or when you tried to use some special character in a column name.

For this reason Spring Data JDBC 2.0 quotes all identifiers by default. This makes the names case-sensitive, at least for most databases. Since we also, by default, convert the names generated into the default letter casing used by the database, this should not cause any problems, assuming you used no quotes in the `CREATE TABLE` statements, as most people do.

For example, consider a `Student` entity, as follows:

```
Copyclass Student {

    @Id
    Long id;
    String name;
}
```

A matching table for H2 could look like this:

```
CopyCREATE TABLE STUDENT
(
    ID SERIAL PRIMARY KEY,
    NAME  VARCHAR(30)
);
```

That example is the same as in previous versions of Spring Data JDBC. Things change when you specify column or table names explicitly with `@Column`, `@Table`, or `@MappedCollection`. In this case, we assume that you specify the name exactly as you want it to be used and, therefore, the table definition has to use quoted identifiers or the names have to use the default letter casing of your database, as in this modified student example:

```
Copy@Table("student")
class Student {

    @Id
    Long id;
    @Column("LAST_NAME")
    String name;
}
```

A matching table for H2 could look like this:

```
CopyCREATE TABLE "student" -- (1)
(
    ID SERIAL PRIMARY KEY,
    LAST_NAME  VARCHAR(30) -- (2)
);
```

1.  The table name must be quoted, because it is given in lower-case letters but H2 converts unquoted SQL identifiers to upper case by default.
    
2.  `LAST_NAME` does not have to get quoted because it already uses the default letter casing.
    

See below how to disable the forced quoting if you really want to.

## [](#configuration)[](#configuration)Configuration

If you need custom configuration of your `ApplicationContext`, it is probably easiest to inherit from [`org.springframework.data.jdbc.repository.config.AbstractJdbcConfiguration`](https://docs.spring.io/spring-data/jdbc/docs/2.0.0.RELEASE/api/org/springframework/data/jdbc/repository/config/AbstractJdbcConfiguration.html). Other classes with similar names and the same purpose have been removed.

In a configuration inherited from `AbstractJdbcConfiguration` you may override for example `jdbcMappingContext` as follows in order to disable the forced quoting of SQL identifiers.

```
Copy@Bean
@Override
public JdbcMappingContext jdbcMappingContext(Optional<NamingStrategy> namingStrategy, JdbcCustomConversions customConversions) {

	JdbcMappingContext mappingContext = super.jdbcMappingContext(namingStrategy, customConversions);
  mappingContext.setForceQuote(false);

	return mappingContext;
}
```

## [](#aggregatechange-and-dbaction-are-immutable)[](#aggregatechange-and-dbaction-are-immutable)`AggregateChange` and `DbAction` are immutable

You might have encountered these in event handlers or callback methods. They have been mutable in the past, but that was almost impossible to use in a meaningful way. Also, it was actually impossible to support in a stable way. Therefore, it was removed without replacement.

If you had a use case where you actually changed those instances, please create an issue in our issue tracker.

## [](#dialects)[](#dialects)Dialects

Spring Data JDBC now has a [`Dialect`](https://docs.spring.io/spring-data/jdbc/docs/2.0.0.RELEASE/api/org/springframework/data/relational/core/dialect/Dialect.html) interface and for the fully supported databases it ships with a matching implementation.

Supported databases are:

-   DB2
    
-   HSQLDB
    
-   H2
    
-   MySQL and MariaDB
    
-   Postgres
    
-   SQL Server
    

Oracle support is currently [work in progress](https://jira.spring.io/browse/DATAJDBC-256).

If you use a different database then your application won’t startup. In that case, you’ll have to

1.  implement your own `Dialect`.
    
2.  implement a [`JdbcDialectProvider`](https://docs.spring.io/spring-data/jdbc/docs/2.0.0.RELEASE/api/org/springframework/data/jdbc/repository/config/DialectResolver.JdbcDialectProvider.html) returning that `Dialect`.
    
3.  register the provider by putting a file `spring.factories` in the `META-INF` folder of your class path and add the line `org.springframework.data.jdbc.repository.config.DialectResolver$JdbcDialectProvider=<fully qualified name of your JdbcDialectProvider>`
    

Someone already wrote a [great answer on Stack Overflow](https://stackoverflow.com/a/61854586/66686) how to do that before we could get this article out the door.

## [](#streamlined-events)[](#streamlined-events)Streamlined events

Events only offer the ID of an entity if there is no entity available (for example, for delete events). If there is an entity available in the event, the ID is not in order, to avoid looking up values that then might not be used. Events that before used `Optional` values now use nullable values. Therefore, you should review your event listeners carefully.