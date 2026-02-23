---
title: What\'s new in Spring Data Elasticsearch 4.0
source: https://spring.io/blog/2020/05/27/what-s-new-in-spring-data-elasticsearch-4-0
scraped: 2026-02-23T13:59:14.622Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Paluch |  May 27, 2020 | 2 Comments
---

# What's new in Spring Data Elasticsearch 4.0

_Engineering | Mark Paluch |  May 27, 2020 | 2 Comments_

*This article continues our blog post series on [What’s new in Spring Data Neumann](https://spring.io/blog/2020/05/18/what-s-new-in-spring-data-klara-dan-von-neumann). Today’s installment explains New and Noteworthy in Spring Data Elasticsearch. This blog post was written by [P.J. Meisch](https://twitter.com/sothawo) who maintains the Spring Data Elasticsearch module.*

This release addresses more than 140 issues, with more than 30 bugs fixed.

Spring Data Elasticsearch now uses Elasticsearch 7, 7.6.2 in particular. Elasticsearch clusters running on 6.x versions are not supported anymore. The `ElasticsearchTemplate` class is deprecated as it uses the `TransportClient` to access Elasticsearch, which itself is deprecated since Elasticsearch version 7.+ Users should switch to `ElasticsearchRestTemplate` or `ReactiveElasticsearchTemplate`.

In general, this release ships with several changes that may require several updates to your code and domain model. You can find the entire migration guide in the [reference documentation](https://docs.spring.io/spring-data/elasticsearch/docs/current/reference/html/#elasticsearch-migration-guide-3.2-4.0).

## [](#improved-object-mapping-and-entity-definitions)[](#improved-object-mapping-and-entity-definitions)Improved object mapping and entity definitions

A change under the hood was that the mapping between an entity to the JSON document that elasticsearch needs was switched from using Jackson to the `MappingElasticsearchConverter`. Now it is possible to define custom names for properties and even different date formats for time-related properties without the problems that used to show up in the previous versions. The MappingElasticsearchConverter not only converts entities but is also used when building queries and processing search results. By this the mapping and conversion is consistently applied to the whole storage and search process.

The `@Field` annotation now supports nearly all of the types that can be used in Elasticsearch.

```
Copy@Document(indexName = "person", type = "dummy")
public class Person implements Persistable<Long> {

    @Nullable @Id
    private Long id;

    @Nullable @Field(value = "last-name", type = FieldType.Text, fielddata = true)
    private String lastName;      (1)

    @Nullable @Field(name = "birth-date", type = FieldType.Date, format = DateFormat.basic_date)
    private LocalDate birthDate;  (2)

    @CreatedDate
    @Nullable @Field(type = FieldType.Date, format = DateFormat.basic_date_time)
    private Instant created;      (3)

    // other properties, getter, setter
}
```

1.  in Elasticsearch this field will be named *last-name*, this mapping is handled transparently
    
2.  a property for a date without time information
    
3.  another property this time with full date and time information
    

## [](#new-return-types)[](#new-return-types)New return types

As Elasticsearch not only returns the found entities in search results but a lot of additional information as well, new classes are introduced to provide this information, the most important being:

-   `SearchHit<T>` contains the entity and information like the *score*, *sortvalues*, *highlight fields*
    
-   `SearchHits<T>` contains the *maxScore* of a search, returned *aggregations*, the *totalCount*, and the list of `SearchHit<T>` elements.
    

These are returned from the calls to the `(Reactive)ElasticsearchOperations`.

To use them with repository methods they just need to be defined as the return type (repositories also support paged requests). As it is now possible to access highlight values in the `SearchHit`, repository methods can now be configured for highlights like shown in the first method:

```
Copy@Highlight(fields = {@HighlightField(name = "firstName")})
List<SearchHit<Person>> findByFirstName(String firstName);

Stream<SearchHit<Person>> findByBirthDateAfter(LocalDate date);

SearchHits<Person> findByLastName(String lastName);

SearchPage<Person> searchByLastName(String name, Pageable pageable);
```

Of course it is still possible to retrieve just the entity by defining the return type as `List<Person>`.

## [](#additional-configuration-options)[](#additional-configuration-options)Additional configuration options

Both the reactive and the non-reactive client can be configured with additional parameters

-   SSL support optionally with a custom `SSLContext`
    
-   Proxy support
    
-   custom header supplier to dynamically provide headers for each request sent to the cluster
    
-   *pathPrefix* for cases where the Elasticsearch cluster is behind some Loadbalancer or dispatcher
    

## [](#entity-callbacks-and-auditing)[](#entity-callbacks-and-auditing)Entity callbacks and Auditing

It now is possible to define Entity callbacks, the followig table shows the supported callbacks:

Callback

Method

Description

ReactiveBeforeConvertCallback  
BeforeConvertCallback

`onBeforeConvert(T,   IndexCoordinates)`

Invoked before a domain object is converted to `Document`.  
Can return the `entity` or a modified entity which then will be converted.

ReactiveAfterConvertCallback  
AfterConvertCallback

`onAfterConvert(T,   Document, IndexCoordinates)`

Invoked after a domain object is converted from `Document`  
on reading result data from Elasticsearch.

ReactiveAuditingEntityCallback  
AuditingEntityCallback

`onBeforeConvert(Object,   IndexCoordinates)`

Marks an auditable entity *created* or *modified*

ReactiveAfterSaveCallback  
AfterSaveCallback

`T onAfterSave(T,   IndexCoordinates)`

Invoked after a domain object is saved.

Built upon the `AuditingEntityCallback` is the support for auditing. By implementing `Persistable<T>` and adding annotated properties, these values will be automatically maintained for entities stored in Elasticsearch:

```
Copy@Document(indexName = "person")
public class Person implements Persistable<Long> {

    @Nullable @Id
    private Long id;

    @CreatedDate
    @Nullable @Field(type = FieldType.Date, format = DateFormat.basic_date_time)
    private Instant created;

    @Nullable @CreatedBy
    private String createdBy;

    @LastModifiedDate
    @Nullable @Field(type = FieldType.Date, format = DateFormat.basic_date_time)
    private Instant lastModified;

    @Nullable @LastModifiedBy
    private String lastModifiedBy;

    @Nullable
    public Long getId() { return id; }

    @Override
    public boolean isNew() { return id == null || (createdBy == null && created == null); }

    // other properties, getter, setter...
}
```