---
title: Spring Data JDBC - How To Maintain Your Database Schema
source: https://spring.io/blog/2023/08/29/spring-data-jdbc-how-to-maintain-your-database-schema
scraped: 2026-02-23T09:25:59.304Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Jens Schauder |  August 29, 2023 | 1 Comment
---

# Spring Data JDBC - How To Maintain Your Database Schema

_Engineering | Jens Schauder |  August 29, 2023 | 1 Comment_

This is the fifth article of a series about how to tackle various challenges you might encounter when using Spring Data JDBC. The series consists of:

1.  [Spring Data JDBC - How to use custom ID generation?](https://spring.io/blog/2021/09/09/spring-data-jdbc-how-to-use-custom-id-generation)
    
2.  [Spring Data JDBC - How do I make bidirectional relationships?](https://spring.io/blog/2021/09/22/spring-data-jdbc-how-do-i-make-bidirectional-relationships).
    
3.  [Spring Data JDBC - How do I implement caching?](https://spring.io/blog/2021/10/18/spring-data-jdbc-how-do-i-implement-caching)
    
4.  [Spring Data JDBC - How Can I Do a Partial Update of an Aggregate Root?](https://spring.io/blog/2022/01/20/spring-data-jdbc-how-can-i-do-a-partial-update-of-an-aggregate-root)
    
5.  Spring Data JDBC - How do I Generate the Schema for my Domain Model? (This article)
    

If you are new to Spring Data JDBC, you should start by reading its [introduction](https://spring.io/blog/2018/09/17/introducing-spring-data-jdbc) and [this article, which explains the relevance of aggregates in the context of Spring Data JDBC](https://spring.io/blog/2018/09/24/spring-data-jdbc-references-and-aggregates) to understand the basic concepts.

With any Object Relational Mapper (ORM), you have to create two things, and they have to match each other:

1.  A domain model in the form of Java classes.
2.  A database schema consisting of tables, columns, indexes, and constraints.

Starting with [version 3.2.0-M1 Spring Data Relational](https://github.com/spring-projects/spring-data-commons/wiki/Spring-Data-2023.1-%28Vaughan%29-Release-Notes) will help you do this. This article shows you how to make it work.

## [](#creating-an-initial-schema)Creating an Initial Schema

The first thing to do is to find a place to put the code for the schema generation. We recommend using a test for this. You can use the configuration of your main application from it, and it cannot run by accident in production.

The next thing to do is to get a [`RelationalMappingContext`](https://docs.spring.io/spring-data/jdbc/docs/current/api/org/springframework/data/relational/core/mapping/RelationalMappingContext.html). This is the class that is at the core of Spring Data Relational, which is parent to both Spring Data JDBC and Spring Data R2DBC. This class holds all the mapping meta information about your aggregates, once it is fully initialized. But this initialization happens lazily, so you have to register your aggregate roots yourself.

Then you need to create a [`LiquibaseChangeSetWriter`](https://docs.spring.io/spring-data/jdbc/docs/3.2.x/api/org/springframework/data/jdbc/core/mapping/schema/LiquibaseChangeSetWriter.html) from it and use that to write out a Liquibase change set.

```java
Copy// context is a RelationalMappingContext that you autowire in your test.
context.setInitialEntitySet(Collections.singleton(Minion.class));
LiquibaseChangeSetWriter writer = new LiquibaseChangeSetWriter(context);

writer.writeChangeSet(new FileSystemResource("cs-minimum.yaml"));
```

For this to work, you need Liquibase in your dependencies:

```xml
Copy<dependency>
    <groupId>org.liquibase</groupId>
    <artifactId>liquibase-core</artifactId>
</dependency>
```

Note: If you use Spring Boot, the Liquibase dependency will trigger schema initialization using Liquibase, which will fail, because it cannot find any change sets. You can easily disable this by [adding this line to your `application.properties`](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#howto.data-initialization.migration-tool.liquibase).

```
Copyspring.liquibase.enabled=false
```

If you run this test, you should find a file named `cs-minimum.yaml` in the root folder of your project:

```yaml
CopydatabaseChangeLog:
- changeSet:
    id: '1692728224754'
    author: Spring Data Relational
    objectQuotingStrategy: LEGACY
    changes:
    - createTable:
        columns:
        - column:
            autoIncrement: true
            constraints:
              nullable: true
              primaryKey: true
            name: id
            type: BIGINT
        - column:
            constraints:
              nullable: true
            name: name
            type: VARCHAR(255 BYTE)
        tableName: minion
```

You should review this, modify it as desired, and put it in the proper location for Liquibase to pick up. If you have disabled it before, now enable schema initialization by Liquibase in order to actually use this change set.

## [](#creating-an-update-schema)Creating an Update Schema

For the second release of your application, you probably have some updates to the database schema. Spring Data JDBC can help you with these as well.

In order to create such an incremental schema update, we need to provide the current state of the database. This is done with an instance of [`liquibase.database.Database`](https://javadoc.liquibase.com/liquibase-core/liquibase/database/Database.html), which you can create from a `DataSource`.

```java
Copy@Autowired
DataSource ds;

// ...

context.setInitialEntitySet(Collections.singleton(Minion.class));
LiquibaseChangeSetWriter writer = new LiquibaseChangeSetWriter(context);

try (Database db = new HsqlDatabase()) {

	db.setConnection(new JdbcConnection(ds.getConnection()));

	writer.writeChangeSet(new FileSystemResource("cs-diff.yaml"), db);

} catch (IOException | SQLException | LiquibaseException e) {
	throw new RuntimeException("Changeset generation failed", e);
}
```

The example above uses a `HsqlDatabase`. You would use an implementation that matches your actual database.

By default, the change set never drops columns or tables from your schema. Just because they are not modeled in the domain model does not mean that you do not need them, right? However, if you actually want to delete some or all of the tables and columns not present in your Java domain model, register a `DropTableFilter` or `DropColumnFilter`), like in the following example, which drops all unmapped columns except those named `special`.

```java
Copywriter.setDropColumnFilter((table, column) -> !column.equalsIgnoreCase("special"));
```

## [](#customizing-the-schema-generation)Customizing the Schema Generation

Spring Data JDBC does not have annotations for specifying the exact database type for columns. But it does offer a hook to use the types that you want. You can provide a [`SqlTypeMapping`](https://docs.spring.io/spring-data/jdbc/docs/3.2.x/api/org/springframework/data/jdbc/core/mapping/schema/SqlTypeMapping.html) to the `LiquibaseChangeSetWriter`.

```java
Copywriter.setSqlTypeMapping(((SqlTypeMapping) property -> {
	if (property.getName().equalsIgnoreCase("name")) {
		return "VARCHAR(500)";
	}
	return null;
}).and(new DefaultSqlTypeMapping()));
```

You have to implement just a single method of that interface: [`String getColumnType(RelationalPersistentProperty property)`](https://docs.spring.io/spring-data/jdbc/docs/3.2.x/api/org/springframework/data/jdbc/core/mapping/schema/SqlTypeMapping.html#getColumnType\(org.springframework.data.relational.core.mapping.RelationalPersistentProperty\)\)). In the likely case that you want to modify the types for only some cases, you can combine it with a [`DefaultSqlTypeMapping`](https://docs.spring.io/spring-data/jdbc/docs/3.2.x/api/org/springframework/data/jdbc/core/mapping/schema/DefaultSqlTypeMapping.html), which will be used for all the cases where your implementation returns `null`, as shown in the example.

## [](#using-annotations-to-control-schema-types)Using Annotations to Control Schema Types

[`RelationalPersistentProperty`](https://docs.spring.io/spring-data/jdbc/docs/current/api/org/springframework/data/relational/core/mapping/RelationalPersistentProperty.html) has some very helpful methods, like `findAnnotation` to access an annotation (including meta annotations) on the property or its owning entity. You can use this feature to use your own annotations and meta annotations to control the database types used for your domain model.

For example, you may create a layer of annotations that specify database level types and another domain-specific set of annotations using the first, as demonstrated in the following code snippets:

```java
Copy@Retention(RetentionPolicy.RUNTIME)
public @interface Varchar {

	/**
	 * the size of the varchar.
	 */
	int value();
}
```

```java
Copy@Varchar(20)
@Retention(RetentionPolicy.RUNTIME)
public @interface Name {
}
```

You could then use this annotation to annotate properties in your domain model and use a matching `SqlTypeMapping`:

```java
Copy@Name
String name;
```

```java
Copywriter.setSqlTypeMapping(((SqlTypeMapping) property -> {

  if (!property.getType().equals(String.class)) {
    return null;
  }

  // findAnnotation will find meta annotations
  Varchar varchar = property.findAnnotation(Varchar.class);
  int value = varchar.value();

  if (varchar == null) {
    return null;
  }
  return "VARCHAR(" +
      varchar.value() +
      ")";

}).and(new DefaultSqlTypeMapping()));
```

## [](#limitations)Limitations

Schema generation currently does not support references. Those will currently be silently ignored. Of course, we will improve on that in the future.

## [](#why-so-complicated)Why so Complicated?

If you are coming from JPA/Hibernate, you are used to having a simple configuration to directly generate the schema in the database and also to having schema information as part of the mapping annotations. It's natural to ask why we chose a different way.

There are multiple answers to this question:

1.  Schema changes are potentially dangerous.

You can easily do things that you can recover from only by applying a database backup. We do not think it is a good thing to condition developers to do this kind of thing without really seeing, let alone thinking about, the changes they apply. That is why we create the changes but leave applying the changes as a separate step.

2.  Schema changes should be controlled by version control, and they need to be managed by a dedicated tool, since they are not idempotent. That is, you cannot reapply a SQL script that adds a table or column to make sure that column is present.

That is why we chose Liquibase for creating and managing changes.

3.  The exact datatypes used in the database are not relevant for an object relational mapper, such as Spring Data JDBC.

Therefore, this kind of information should not be part of the mapping annotations used by Spring Data JDBC. Instead, this kind of information should be derived from your model in a way that is really independent of Spring Data JDBC. We think the demonstrated meta annotation approach is a good way to do that.

## [](#conclusion)Conclusion

With current milestone and upcoming GA releases, Spring Data JDBC provides a flexible and powerful way to generate database migrations from your domain model. We look forward to hear about your opinions and experiences with this.

The complete [example code is available in the Spring Data Example repository](https://github.com/spring-projects/spring-data-examples/tree/main/jdbc/howto/schema-generation).