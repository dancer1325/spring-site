---
title: Spring Data 2020.0 - New and Noteworthy in Spring Data JDBC 2.1
source: https://spring.io/blog/2020/11/10/spring-data-2020-0-new-and-noteworthy-in-spring-data-jdbc-2-1
scraped: 2026-02-23T13:42:06.451Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Jens Schauder |  November 10, 2020 | 3 Comments
---

# Spring Data 2020.0 - New and Noteworthy in Spring Data JDBC 2.1

_Engineering | Jens Schauder |  November 10, 2020 | 3 Comments_

As part of the 2020.0.0 version of Spring Data, we released Spring Data JDBC 2.1. This article presents the four most interesting changes in this version.

-   [Use `@Value` on entity constructor arguments.](#use-code-value-code-on-entity-constructor-arguments)
-   [`RowMapper` and `ResultSetExtractor` as beans.](#rowmapper-and-resultsetextractor-as-beans)
-   [Improved performance for entities.](#improved-performance-for-entities)
-   [Support of Oracles temporal types.](#support-of-oracles-temporal-types)

#Use @Value on Entity Constructor Arguments

In some cases, not all the data that goes into an entity comes from the `ResultSet` of a query. You now may provide an `@Value` annotation with a SPeL expression that is evaluated, and the result is passed as an argument upon construction of the entity.

```java
Copyclass WithAtValue {

  private final @Id Long id;
  private final @Transient String computed;

 WithAtValue(Long id,
      @Value("#root.first_name") String computed) {
    this.id = id;
    this.computed = computed;
  }
}
```

The example accesses the `first_name` column from the `ResultSet`, but the SPeL context also has access to the full application context. Therefore, you have a flexible way to customize the instantiation of your entities.

# [](#rowmapper-and-resultsetextractor-as-beans)RowMapper and ResultSetExtractor as Beans

When you specify the query to be executed for a repository method by using `@Query`, you may optionally provide the type of a `RowMapper` or `ResultSetExtractor` implementation. However, since the instances created from these types are not Spring beans, they do not participate in dependency injection. Therefore, you cannot inject other resources that you might want to use into them.

You now may instead specify a reference to a bean that implements `RowMapper` or `ResultSetExtractor` but using the `rowMapperRef` or `resultSetExtractorRef` attributes in `@Query`, respectively:

```java
Copyinterface CarRepository extends CrudRepository<Car, Long> {

  @Query(value = "select * from car", resultSetExtractorRef = "carResultSetExtractorBean")
  List<Car> findByNameWithResultSetExtractor();

  @Query(value = "select model from car", rowMapperRef = "customRowMapperBean")
  List<String> findByNameWithRowMapperBean();
}
```

Spring Data JDB looks up the beans in the application context by name. Since they are normal Spring beans, you can freely inject other beans or really do anything with them that the Spring Framework has to offer.

# [](#improved-performance-for-entities)Improved Performance for Entities

Spring Data JDBC entities can have their properties set by a constructor, by a setter, or (in the case of immutable entities) by a with-method. However, if a property is already set by a constructor, it should not get set by a setter or (probably worse) with-method. This avoids the cost of the method call and possibly instance creation. However, for this, Spring Data JDBC used to check each property to see if it has a matching constructor parameter. This test is surprisingly expensive and can be avoided by checking once if there is an all-arguments constructor. In such a case, there is no need to call any setters at all. With the latest version, Spring Data JDBC does exactly that, resulting in better performance for entities with all-arguments constructors. So a new performance tip is to provide all-argument constructors.

# [](#support-of-oracles-temporal-types)Support of Oracles Temporal Types

Spring Data JDBC has supported temporal types from the very beginning. However, when we added official support for Oracle, we discovered that Oracle does return a special proprietary type for temporal types that Spring Data JDBC wasn't able to convert to the normal temporal types (such as `java.time.Instant` or similar types).

In this release, we added support for the conversion. Using temporal data types should not cause more problems with Oracle than with any other database. They can still cause trouble through the power of time zones and daylight savings time, but that is not our problem to solve.

Enjoy the new features while we work on the next release.