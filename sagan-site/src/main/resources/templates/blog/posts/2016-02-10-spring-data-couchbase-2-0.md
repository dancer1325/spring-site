---
title: Spring Data Couchbase 2.0
source: https://spring.io/blog/2016/02/10/spring-data-couchbase-2-0
scraped: 2026-02-23T19:27:21.340Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  February 10, 2016 | 0 Comments
---

# Spring Data Couchbase 2.0

_Engineering | Josh Long |  February 10, 2016 | 0 Comments_

> This is a cross-post blog from Simon BASLÉ from [Couchbase](http://www.couchbase.com). You can find him on twitter ([`@simonbasle`](https://twitter.com/simonbasle)) or github. Learn more about Couchbase and the Couchbase Java SDK on the [developer portal](http://developer.couchbase.com/documentation/server/4.1/sdks/java-2.2/java-intro.html). Thanks again, Simon and great job to you and your team! -Josh

Spring Data Couchbase 2.0 is a rewrite of the original Spring Data Couchbase 1.4.x connector. It is based on the Couchbase Java 2.2 SDK and makes heavy use of the new query language N1QL (which was introduced in Couchbase Server 4.0) to offer more features for Spring Data users.

The [first Milestone](http://blog.couchbase.com/2015/august/spring-data-couchbase-2.0-preview) has been released last august, then a Release Candidate followed, and since then additional features (and bugfixes) were implemented a GA release can now be unleashed on the public.

Let's take a quick tour of what changed (with a ⭐ to ⭐⭐⭐ notation of how awesome and significant we think each feature is ?):

## [](#new-features-in-spring-data-couchbase-20)New Features in Spring Data Couchbase 2.0

The main differences between the 1.x generation of Spring Data Couchbase and its 2.x version are:

-   Configuration elements are closer to the Couchbase reality: Environment, Cluster, Bucket (potentially allowing you to create `CouchbaseTemplate`s that each connect to a different bucket, or even to different clusters!)
-   Backing custom repository methods is not always done with views anymore, it is (by default) now done via N1QL, which is much more flexible and requires less server-side maintenance.
-   Custom methods using views have been modified a little to better stick to the Spring Data philosophy. This reduces flexibility a little bit, but the implementations are generated from the method name (through "query derivation").
-   You can now do geospatial querying of your data (or multidimensional querying if you go beyond 3 dimensions) with views.

Of course you can still access the lower level API by using the `CouchbaseTemplate` rather than the `CouchbaseRepository` interface, and you can even access the underlying `Bucket` from the SDK.

### [](#repository-methods-through-n1ql)Repository methods through N1QL

⭐⭐⭐

The big new feature in Couchbase 4.0 is **N1QL**, a SQL extension that works on JSON documents (so it added JSON-related specificities to SQL).

This is especially great for the `Repository` pattern and query derivation in Spring Data, because the vast majority of query derivation keywords can be easily translated to N1QL.

N1QL is now the default backing Couchbase feature for Repository methods. You can also elect to use the @Query interface if you want to be explicit on the query executed.

```java
Copypublic interface UserRepository extends Repository<User, String> {

  User findByUsernameEquals(String username);

  List<User> findByUsernameContains(String contains);

  @Query //optional for N1QL query derivation but more explicit
  List<User> findByAgeBetween(int minAge, int maxAge);
}
```

### [](#repository-methods-through-views)Repository methods through Views

⭐⭐

One big change in this version is that now, Repository Queries (aka custom repository methods) that are based on views are more in line with the Spring Data philosophy. They also have to be annotated explicitly with `@View(viewName="something")`.

This means that nothing Couchbase-specific should leak into your repository interface. Instead, what you can do is use query derivation mechanisms for most of the queries.

Query derivation is also possible to a small extent, with a few keywords being accepted in a view-backed method.

```java
Copypublic interface UserRepository extends Repository<User, String> {

  @Override
  @View(designDocument = "user", viewName = "customFindAllView")
  Iterable<User> findAll();

  @View(viewName = "customFindByNameView")
  User findByUsernameIs(String lowKey);

  @View(viewName = "customFindByNameView")
  List<User> findByUsernameBetween(String lowKey, String highKey);
}
```

### [](#using-reduce-function-from-views)Using reduce function from Views

⭐

Another new thing that wasn't previously supported is the execution of the reduce function if you have one. Now, in order to execute it, you simply set the `reduce` flag to true in the `@View` annotation.

You could also prefix your method with "count" instead of "find" if that is meaningful to you (ie. you actually use the "count" reduce function).

Note that the reduce function in Couchbase can be something else than the preexisting \_count one, and could even return something else than a long like a `JsonObject`, like for built-in `_stats`.

Similarly, adding the variation "topX" or "firstX" in a method name will result in an additional limit being set on the request (eg. `findFirst5ByLastName` will limit the list to 5 results).

### [](#configuring-consistency-read-your-own-writes)Configuring consistency, Read Your Own Writes

⭐⭐⭐

One thing that comes up often when using asynchronously populated secondary indexes like views and GSI (the new secondary index engine backing N1QL), is the need to immediately read the modifications from your previous write operations.

This implies that the view/N1QL shouldn't answer as long as the data is still in the process of being indexed, so this sacrifices some performance in favor of consistency.

The opposite (and current default for Spring Data Couchbase) is to favor performance by accepting stale data to be returned.

We added global semantics for configuring all queries (view-based or N1QL-based) that are constructed by the framework through query derivation, by providing a small abstraction around the concept of Consistency.

This is done by overriding the `AbstractCouchbaseConfiguration`'s `getDefaultConsistency()` method. `Consistency` is an enum that lets you choose between `READ_YOUR_OWN_WRITES`, `STRONGLY_CONSISTENT`, `UPDATE_AFTER` and `EVENTUALLY_CONSISTENT`. Please refer to the official documentation for more information on how they work exactly and what their impact is at query time.

You can also do that in XML by using the consistency attribute on the `<couchbase:template>` tag.

Since GA, CRUD methods in repositories now also take the default configured consistency into account.

### [](#changing-the-type-information-field-in-stored-json)Changing the type information field in stored JSON

⭐

Some users have reported issues with Spring Data and the Couchbase Mobile side of things, with the Sync Gateway rejecting documents containing fields prefixed by an underscore.

This is problematic for Spring Data, since by default it stores the type information in a `_class` field :(

The solution is to allow, through the configuration, to modify the name of that type information field. You can do so by overriding the `typeKey()` method in `AbstractCouchbaseConfiguration`. For instance, you can use the constant `MappingCouchbaseConverter.TYPEKEY_SYNCGATEWAY_COMPATIBLE` (which is "`javaClass`").

This field is the one used by generated N1QL queries to filter only documents corresponding to the repository's entity.

### [](#support-for-pageablepagerequest-in-n1ql-derived-queries)Support for `Pageable`/`PageRequest` in N1QL derived queries

⭐⭐

Using N1QL, for queries that are generated through query derivation, `Pageable` and `Sort` parameters are now supported.

-   Support for `PagingAndSortingRepository` based on N1QL.
-   Adds two `findAll` methods that rely on N1QL for paging and/or sorting. Uses the default configured consistency.

### [](#geospatial-and-multi-dimensional-querying-using-spatial-views)GeoSpatial and Multi-Dimensional querying using Spatial Views

⭐⭐⭐

Query Couchbase using coordinates! Provided your entity has a `Point` (or `x` and `y`) location, you can find it using:

-   a bounding box: `findByLocationWithin(Box area)`
-   a circle: `findByLocationWithin(Circle area)`, `findByLocationWithin(Point center, Distance radius)`.
-   a polygon: `findByLocationWithin(Polygon area)`, `findByLocationWithin(Point[] polygon)`.
-   a distance `findByLocationNear(Point near, Distance maxDistance)`.

Circle and polygon-like queries are performed fast as bounding box approximations on the server then the false positives are eliminated by the framework before presenting results.

You can take advantage of the multidimensional aspect of Couchbase Spatial Views to add extra dimensions to your queries (e.g. stores that open late at night within a city...).

```java
Copypublic interface DimensionalPartyRepository extends CrudRepository<Party, String> {

  @Dimensional(designDocument = "partyGeo", spatialViewName = "byLocation")
  List<Party> findByLocationNear(Point p, Distance d);

  @Dimensional(designDocument = "partyGeo", spatialViewName = "byLocation")
  List<Party> findByLocationWithin(Box boundingBox);

  @Dimensional(designDocument = "partyGeo", spatialViewName = "byLocation")
  List<Party> findByLocationWithin(Polygon zone);
  
  @Dimensional(designDocument = "partyGeo", spatialViewName = "byLocationAndAttendees", dimensions = 3)
  List<Party> findByLocationWithinAndAttendeesGreaterThan(Polygon zone, double minAttendees);
}
```

Note: if you want to reuse annotations, you can do that too (works for `@View` and `@Query` too):

```java
Copypublic interface DimensionalPartyRepository extends CrudRepository<Party, String> {

  //define your own meta-annotation
  @Dimensional(designDocument = "partyGeo", spatialViewName = "byLocation", dimensions = 2)
  @Retention(RetentionPolicy.RUNTIME)
  @interface IndexedByLocation { }
  
  //use it :)
  @IndexedByLocation
  List<Party> findByLocationNear(Point p, Distance d);

  @IndexedByLocation
  List<Party> findByLocationWithin(Box boundingBox);

  @IndexedByLocation
  List<Party> findByLocationWithin(Polygon zone);
  
  //here we use a variation with 3 dimensions, so we need to revert to @Dimensional
  @Dimensional(designDocument = "partyGeo", spatialViewName = "byLocationAndAttendees", dimensions = 3)
  List<Party> findByLocationWithinAndAttendeesGreaterThan(Polygon zone, double minAttendees);
}
```

### [](#inline-n1ql-query-now-have-spel-support)Inline `N1QL` `@Query` now have SpEL support

⭐⭐⭐

Inline queries can use SpEL notation to:

1.  ensure that correct selection and filtering is applied to the statement in order to construct and return entities: use `#{#n1ql.selectEntity}` to generate a `SELECT ... FROM ...` clause, and `#{#n1ql.filter}` in the `WHERE` clause to limit query to the correct entity.
2.  compute values or retrieve data from external SpEL value provides configured in the Spring context.

### [](#repository-main-indexes-creation-can-be-automatically-triggered)Repository "main" indexes creation can be automatically triggered

⭐⭐

⚠️ ***IMPORTANT: this is considered as an aid during development/testing and discouraged in production***

In order to make sure that N1QL indexing of the entities in a given repository is activated in a dev or pre-production environment, one can annotate it with `@N1qlPrimaryIndexed` (which enables bucket-wide freeform querying) and `@N1qlSecondaryIndexed` (which will index only the documents corresponding to the entity type, similarly to the WHERE clause produced by SpEL `#{#n1ql.filter}`).

Also, the backing view for CRUD operation can be automatically created by annotating the repository with `@ViewIndexed` (you'll need to provide the design document name, which should correspond to the entity's simple class name with a lowercase first letter).

This feature must additionally be opted-in by redefining the `indexManager` bean in the `AbstractCouchbaseConfiguration`.

### [](#simple-return-types-primitives-and-string-are-now-supported-when-using-a-single-row-projection)Simple return types (primitives and `String`) are now supported when using a single-row projection

⭐⭐

This is especially targeted at inline N1QL queries with aggregation functions like `COUNT(*)`, `AVG(field)`, etc... The query must return a single row with a single projection.

### [](#support-named-parameters-in-n1ql-inline-queries)Support named parameters in N1QL inline queries

⭐⭐

Use either named parameters or positional parameter, but not both. Syntax for named parameters is `$paramName`, requiring that each method parameter be annotated with `@Param("paramName")`.

### [](#other-features)Other Features

⭐

Other features include:

-   Fix bean naming so that all beans created by Spring Data Couchbase are prefixed with "`couchbase`", in order to avoid clashes with other stores.
-   Changing the base class for all repositories is now supported (following the process documented in the common Spring Data documentation)
-   In case indexes are stale, deleted documents are eliminated from find methods in the `CouchbaseTemplate`
-   Expiry can be set on a `@Document`, as a `long` + `timeUnit`

A few bugfixes and improvements over RC1 have also been implemented.

## [](#documentation)Documentation

⭐⭐⭐

[Documentation](http://docs.spring.io/spring-data/couchbase/docs/2.0.0.RELEASE/reference/html/) has also been improved, adding Couchbase-oriented examples on how to add the implementation of a custom method to a repository, how to change the base class of all repositories, how to deal with SpEL in inline queries, ...

## [](#a-note-about-spring-cache)A note about Spring Cache

The Spring Cache support has been moved out of the Spring Data repository. It is still there and we plan on improving on it. You can for now find it on a Couchbase [repository](https://github.com/couchbaselabs/couchbase-spring-cache) on github but it should soon reintegrate the official Spring family of projects.

## [](#getting-spring-data-couchbase)Getting Spring Data Couchbase

You can add the following to your project's `pom.xml` to get this GA Release (in the `dependencies` section:

```xml
Copy<!--<dependencies>-->
  <dependency>
    <groupId>org.springframework.data</groupId>
    <artifactId>spring-data-couchbase</artifactId>
    <version>2.0.0.RELEASE</version>
  </dependency>
<!--</dependencies>-->
```

We hope you enjoy this release and all the new features it brings to the table. Next step will be to re-attach to the `Hopper` release train with a version `2.1` expected before Summer.