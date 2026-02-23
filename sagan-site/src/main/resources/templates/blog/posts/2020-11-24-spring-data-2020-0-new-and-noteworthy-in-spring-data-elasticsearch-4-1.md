---
title: Spring Data 2020.0 - New and Noteworthy in Spring Data Elasticsearch 4.1
source: https://spring.io/blog/2020/11/24/spring-data-2020-0-new-and-noteworthy-in-spring-data-elasticsearch-4-1
scraped: 2026-02-23T13:40:35.109Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Christoph Strobl |  November 24, 2020 | 2 Comments
---

# Spring Data 2020.0 - New and Noteworthy in Spring Data Elasticsearch 4.1

_Engineering | Christoph Strobl |  November 24, 2020 | 2 Comments_

Spring Data Elasticsearch is one of the community modules shipped with the [2020.0](https://spring.io/blog/2020/11/06/spring-data-2020-0-new-and-noteworthy-a-general-overview) release. On behalf of [P.J. Meisch](https://twitter.com/sothawo), who is doing most of the heavy lifting these days, we’re happy to share his insights on the current release.

The previous release included major overhaul of the internal code structure and the API, whereas the 2020.0 version of Spring Data Elasticsearch focused on fixing bugs and adding functionality.

Altogether there were 23 bugs fixed and 81 other issues resolved. Spring Data Elasticsearch now is built with the actual Elasticsearch version 7.9.3.

This blog post shows the most important features that were added to Spring Data Elasticsearch in version 4.1.

## [](#index-management)[](#index-management)Index management

This release adds the missing pieces to have index management available from within the application, especially alias handling and index templates.

Alias handling

The methods for alias handling in the `IndexOperations` interface have been redesigned to follow the Elasticsearch API for handling aliases. We now offer all the alias actions that Elasticsearch has in its API as well.

Index templates

Index templates in Elasticsearch define mappings, settings and alias information in combination with an index name pattern. So one can define a template for an index name pattern like "log-\*", and whenever an index like "log-2020-11-01" is created, the predefined mappings, settings and alias settings are automatically applied to the index.

Spring Data Elasticsearch now supports the management of index templates so the same entity annotations that are used for mappings and settings when creating an index are used for defining index templates.

With this index management it now is possible to implement index naming strategies like rolling indices with time based index names.

The index management functions now are available for the reactive setup as well as as for the non-reactive one.

## [](#nested-criteria-definitions)[](#nested-criteria-definitions)Nested Criteria definitions

On of the possibilities to define queries in Spring Data Elasticsearch is by using the `Criteria` query API. It allows for a fluent, language like syntax:

```
CopyCriteria criteria = new Criteria("lastName").is("Smith")
    .and("firstName").is("Emma");
Query query = new CriteriaQuery(criteria);
```

Up to now it was not possible to build nested queries with this API. If the user wants to search for all persons that have a last name of *Smith* and a first name of either *Emma* or *Lucy*, one might use the following query:

```
CopyCriteria criteria = new Criteria("lastName").is("Smith")
    .and("firstName").is("Emma")
    .or("firstName").is("Lucy");
```

But this would return *Emma Smith* and no *Lucy*, because this would be mapped to "must be Smith and must be Emma and should be Lucy".

We now support nested Criteria definitions:

```
CopyCriteria emmaOrLucy = new Criteria()
    .or("firstName").is("Emma")
    .or("firstName").is("Lucy");
Criteria criteria = new Criteria("lastName").is("Smith")
    .subCriteria(emmaOrLucy);
```

With these subcriterias it is now possible to build arbitrarily nested complex queries without using the `NativeSearchQuery` or the `StringQuery`.

## [](#geo_shape-support)[](#geo_shape-support)geo\_shape support

Spring Data Elasticsearch now finally supports the *geo\_shape* datatype. A property of an entity now is interpreted as a *geo\_shape* property if it either is derived from the newly introduced `GeoJson` interface or if it is annotated with the `@GeoShapeField` annotation.

Spring Data Elasticsearch provides the following implementations for the `GeoJson` interface:

-   `GeoJsonPoint`
    
-   `GeoJsonMultiPoint`
    
-   `GeoJsonMultiLineString`
    
-   `GeoJsonPolygon`
    
-   `GeoJsonMultiPolygon`
    
-   `GeoJsonGeometryCollection`
    

For a property annotated with `@GeoShapeField` that does not implement `GeoJson` one must provide custom converters for converting to and from a `Document` object or `String`.

*geo\_shape* properties are considered at the following places:

1\. mappings definitions

a property defined as *geo\_shape* will be written to the index mappings with type *geo\_shape*, so that Elasticsearch recognizes the data as GeoJson data.

2\. properties mapping

when document with a property of type *geo\_shape* is written to Elasticsearch, the property will be converted to the corresponding GeoJSON representation, and when a search response is read, the appropriate `GeoJson` derived type will be instantiated. So the *geo\_shape* types can be used like any other property type in an entity.

3\. criteria queries

Queries for *geo\_shape* properties can be built with the `NativeSearchQuery` and the `QueryString` classes; besides that, the `Criteria` interface now has methods to build such queries like:

```
CopyCriteriaQuery query = new CriteriaQuery(new Criteria("area").intersects(geoShape));
```

where *area* is a *geo\_shape* property and *geoShape* some variable of type `GeoJson`.

The `Criteria` methods for *geo\_shape* conditions are *within*, *intersects*, *isDisjoint* and *contains*, the same as offered by Elasticsearch for geo\_shape queries.

## [](#what-else)[](#what-else)what else?

-   Auditing support that was introduced in version 4.0 now is fully supported in the reactive stack as well.
    
-   When a nested query with inner hits, the inner hits are now returned in the `SearchHit` objects
    

This was a short overview over the main changes in Spring Data Elasticsearch 4.1, we hope you enjoy using it!