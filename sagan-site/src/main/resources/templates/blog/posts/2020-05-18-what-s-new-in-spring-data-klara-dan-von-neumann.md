---
title: What\'s new in Spring Data (Klara Dan von) Neumann?
source: https://spring.io/blog/2020/05/18/what-s-new-in-spring-data-klara-dan-von-neumann
scraped: 2026-02-23T13:59:30.329Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Christoph Strobl |  May 18, 2020 | 0 Comments
---

# What's new in Spring Data (Klara Dan von) Neumann?

_Engineering | Christoph Strobl |  May 18, 2020 | 0 Comments_

Spring Data Neumann is the first release to follow the new six-month cadence. The reduced timeframe lets us deliver new features more often, which is key in enabling you to move faster. The release itself ships with a bunch of new stuff and includes important (potentially breaking) upgrades of several store.

## [](#major-version-upgrades)[](#major-version-upgrades)Major Version Upgrades

Several store modules, as listed below, required a major version bump due to potentially breaking changes in either their exposed API or their drivers:

-   Spring Data JDBC 2.0 (was 1.1 before)  
    Here’s the [link to the post that explains migration from Spring Data JDBC 1.1 to 2.0](https://spring.io/blog/2020/05/20/migrating-to-spring-data-jdbc-2-0).
    
-   Spring Data MongoDB 3.0 (was 2.2 before)
    
-   Spring Data for Apache Cassandra 3.0 (was 2.2 before)
    
-   Spring Data Couchbase 4.0 (was 3.2 before)
    
-   Spring Data Elasticsearch 4.0 (was 3.2 before)  
    Learn [What’s new in Spring Data Elasticsearch](https://spring.io/blog/2020/05/27/what-s-new-in-spring-data-elasticsearch-4-0).
    

Before moving on to [selected new features](#new-features) let’s break down some those API changes. If in doubt, please visit the *Upgrading* sections of the modules reference documentation. And, for those worried because the upgrade would be too painful right now, the previous [Moore](https://spring.io/blog/2019/10/01/spring-data-moore-goes-ga) release train will still be around and will receive updates for another twelve months.

**JDBC** Every SQL store comes with its very own specialties that required specific treatment. To better support this, a couple of changes had to be made, resulting a major version bump for the module. Now, by default, the `AbstractJdbcConfiguration` will try to determine the database specific `Dialect` from the provided `DataSource` or registered `DialectResolver`. Out of the box, the JDBC modules ships with dialects for H2, HSQLDB, MySQL, Postgres, MariaDB, Microsoft SqlServer and DB2. Spring Data JDBC now also by default quotes all table names and columns. While this might force you to adapt either your `CREATE TABLE` statements or your `@Column` annotations it gives greater flexibility when choosing those names.

**MongoDB** Spring Data MongoDB picks up the MongoDB Java and reactive streams 4.0 driver generation that lets you choose the desired methodology without having to have the other on the path. Therefore, both the sync as well as the reactive MongoDB driver are now optional dependencies that need to be added manually. With the new drivers, some of the already deprecated API has finally been removed, impacting exposed configuration classes like `AbstractMongoConfiguration` and XML namespace elements provided by the Spring Data implementation. We summarized public facing changes in the [Upgrading Section](https://docs.spring.io/spring-data/mongodb/docs/3.0.0.RELEASE/reference/html/#upgrading.2-3) of the reference documentation.

**Apache Cassandra** The long overdue upgrade to the Apache Cassandra 4.0 driver generation, with not only its new package and data structure but also changed behavior in cluster and session handling, leads to extensive changes in configuration that will bleed into user configuration when using the XML namespace or more complex scenarios than just the default setup with `AbstractCassandraConfiguration`.

**Couchbase** The Couchbase module follows the Couchbase SDK and upgrades from Version 3.x to 4.x which includes automatic index management and transaction support. Read the full story in their [Blog](https://blog.couchbase.com/announcing-spring-data-couchbase-4-0/).

**Elasticsearch** The release adds support for the HTTP Client API, SSL, and Proxy support, along with extensive internal changes that included streamlining and removing of (deprecated) API, which required a major version bump. The Elasticsearch module now ships a `Document` covering `Get-`, `Index-` and `Search-Requests` allowing the mapping layer to use types like `SearchHit`, `SearchHits` and `SearchPage`.

Having the stage set, let’s move on to a selection of new features.

## [](#kotlin-coroutines-repositories)[](#new-features)Kotlin Coroutines Repositories

The Neumann release completes the story that already started with [Moore](https://spring.io/blog/2019/10/08/what-s-new-in-spring-data-moore), introducing first class support for [Kotlin Coroutines](https://kotlinlang.org/docs/reference/coroutines-overview.html) by adding support for dedicated Coroutines repositories to supporting store modules.

The coroutines support is backed by Spring Data’s reactive repository support. Therefore, it’s possible to either invoke reactive query methods or have native suspended functions.

```
Copyinterface StudentRepository : CoroutineCrudRepository<Student, String> {

    suspend fun findOne(id: String): User

    fun findByLastname(firstname: String): Flow<Student>
}
```

## [](#primary-repositories-and-the-search-keyword)[](#new-features.commons.primary)`@Primary` Repositories and the `search` Keyword

These two rather small improvements relieve pain with the repository bean lookup and the finder method naming, as we now elevate the `@Primary` annotation from the scanned repository bean definition to the one created for the repository factory, which helps the container to untangle repository wiring in some scenarios. The additional `search` prefix can be used as an alias to the well-known `find` keyword, which now accepts a `search…By…` pattern for queries like `searchByFirstname`.

Though designed to target stores like Elasticsearch, let’s move on and put that new `search…By…` pattern to use with the hot-off-the-press query derivation support of Spring Data R2DBC.

## [](#r2dbc-query-derivation)[](#new-features.r2dbc)R2DBC Query Derivation

Until now, Spring Data R2DBC made heavy use of the `@Query` annotation on repository finder methods when it came to usage, apart from the defaults provided through the `*.Repository` interfaces. The Neumann release now closes the gap with many other module implementations by adding method name query derivation, as shown in the snippet below:

```
Copyinterface StudentRepository extends ReactiveCrudRepository<Student, Long> {

	Flux<Student> searchByLastname(String lastname); (1)
}
```

1.  Equivalent to `@Query("select id, firstname, lastname from customer c where c.lastname = :lastname")`

## [](#paging-and-query-derivation-support-for-jdbc)[](#new-features.jdbc)Paging and Query Derivation support for JDBC

Sticking with the relational stores for a bit longer, Spring Data JDBC 2.0 ships with an even broader range of supported databases. We now run our integration tests with H2, HSQLDB, MySQL, MariaDB, PostgreSQL and DB2.

For these databases we support query derivation and pagination. Making repositories like the following possible:

```
Copyinterface StudentRepository extends PagingAndSortingRepository<Student, Long> {

	Page<Student> findByLastname(String lastname);
}
```

With that we’re moving on to the space of NoSQL stores, starting with MongoDB and it’s new way of modifying docments.

## [](#mongodb-update-aggregations)[](#new-features.mongodb)MongoDB Update Aggregations

An important enhancement (which did not quite make into the Moore release and now profits from the shortened release cycle) lets you use an [Aggregation Pipeline](https://docs.mongodb.com/manual/core/aggregation-pipeline/) for update operations. By doing so, the update can contain more complex statements, such as conditions based on actual field values, as shown below:

```
CopyAggregationUpdate update = Aggregation.newUpdate()
    .set("average").toValue(ArithmeticOperators.valueOf("tests").avg())
    .set("grade").toValue(ConditionalOperators.switchCases(
        when(valueOf("average").greaterThanEqualToValue(90)).then("A"),
        when(valueOf("average").greaterThanEqualToValue(80)).then("B"),
        when(valueOf("average").greaterThanEqualToValue(70)).then("C"),
        when(valueOf("average").greaterThanEqualToValue(60)).then("D"))
        .defaultTo("F")
    );

template.update(Student.class)
    .apply(update)
    .all();
```

Already thinking about the next release, Spring Data MongoDB would surely benefit from a feature recently already added to other modules: support for embedded objects.

## [](#embedded-type-support-for-apache-cassandra)[](#new-features.cassandra)Embedded Type Support for Apache Cassandra

Apache Cassandra, as a table-centric datastore that keeps its data in columns, now gets support for embedded type mapping, which was already available for [Spring Data JDBC](https://docs.spring.io/spring-data/jdbc/docs/current/reference/html/#jdbc.entity-persistence.embedded-entities). Embedded entities are used to design value objects in the Java domain model whose properties are flattened out into the table. In the following example, `Student.name` is annotated with `@Embedded`, which triggers that all properties of `Name` are folded into the student table, which consists of three columns (`student_id`, `firstname`, and `lastname`):

```
Copypublic class Student {

    @PrimaryKey("student_id")
    private String studentId;

    @Embedded(onEmpty = USE_NULL)
    Name name;
}

public class Name {
    private String firstname;
    private String lastname;
}
```

## [](#auditing-with-elasticsearch)[](#new-features.elasticsearch)Auditing with Elasticsearch

As the existence of an `id` is not a sufficient criterion to determine if an entity is new in Elasticsearch, additional information needs to be provided through the `isNew()` method when implementing \`Persistable, as shown below:

```
Copy@Document(indexName = "person")
public class Person implements Persistable<Long> {

    @Id private Long id;
    private String lastName;
    private String firstName;

    @Field(type = Date)
    private Instant createdDate;
    private String createdBy

    @Field(type = Date)
    private Instant lastModifiedDate;
    private String lastModifiedBy;

    @Override
    public boolean isNew() {
        return id == null || (createdDate == null && createdBy == null);
    }
}
```

With that in place, adding `@EnableElasticsearchAuditing` to the configuration registers all the components required to have it running.

## [](#neo4j)[](#new-features.neo4j)Neo4j

Spring Data Neo4j brings support for Neo4j 4.0 parameter syntax by replacing the previously deprecated and now removed placeholder style. It now depends on the latest Neo4j-OGM and Neo4j Java driver for the best experience when working with the newest version of Neo4j.

Though not directly part of the current release train (though it is ready to be picked up by the next one), Neo4j has been busy pushing hard on reactive support for the graph database and its Spring Data integration with [Neo4j RX](https://neo4j.com/developer/spring-data-neo4j-rx/).

## [](#apache-geode--vmware-tanzu-gemfire)[](#new-features.geode)Apache Geode / VMware Tanzu GemFire

Spring Data for Apache Geode and VMware Tanzu GemFire, collectively known as SDG, now combines both the `spring-data-geode` and `spring-data-gemfire` modules into a single project. Apache Geode has been upgraded to `1.12.0` and GemFire has been upgrade to `9.10.0`, which is itself based on Apache Geode `1.12`. Additionally, SDG builds and runs on `JDK 8` through `JDK 14`.

SDG now supports [auto-transaction event publishing](https://jira.spring.io/browse/DATAGEODE-272), which translates a GemFire/Geode Cache TransactionEvent into an appropriate ApplicationEvent fired in the context.

It is also now possible to [pause event dispatching](https://jira.spring.io/browse/DATAGEODE-242) on an AEQ configured with SDG. Also, when building GemFire/Geode Locator-based applications by using SDG’s `@LocatorApplication` annotation, you can now [configure the Locator to connect to other Locators](https://jira.spring.io/browse/DATAGEODE-272) thereby forming a highly-available, highly-resilient cluster.