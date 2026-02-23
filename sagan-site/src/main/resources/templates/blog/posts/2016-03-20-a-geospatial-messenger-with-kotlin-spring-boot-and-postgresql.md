---
title: A Geospatial Messenger with Kotlin, Spring Boot and PostgreSQL
source: https://spring.io/blog/2016/03/20/a-geospatial-messenger-with-kotlin-spring-boot-and-postgresql
scraped: 2026-02-23T18:54:01.692Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Sébastien Deleuze |  March 20, 2016 | 2 Comments
---

# A Geospatial Messenger with Kotlin, Spring Boot and PostgreSQL

_Engineering | Sébastien Deleuze |  March 20, 2016 | 2 Comments_

Following my first [Kotlin blog post](https://spring.io/blog/2016/02/15/developing-spring-boot-applications-with-kotlin), today I want introduce the new Spring Boot + Kotlin application I have developed for my upcoming [Spring I/O 2016 conference](http://www.springio.net/) talk "Developing Geospatial Web Services with Kotlin and Spring Boot".

## [](#dealing-with-native-database-functionalities)Dealing with native database functionalities

One of the goal of this application is to see how to take advantage of native database functionalities like we do in NoSQL world. Here we want to use Geospatial support provided by [PostGIS](http://postgis.net/), the spatial database extender for [PostgreSQL](http://postgresql.org/). [Native JSON support](https://www.compose.io/articles/is-postgresql-your-next-json-database/) could also be a good use case.

This Geospatial Messenger sample application is [available on GitHub](https://github.com/sdeleuze/geospatial-messenger) in 2 flavors:

-   The `master` branch uses [Exposed](https://github.com/JetBrains/Exposed), a Kotlin SQL library with a typesafe API created by JetBrains. It could be compared to [Query DSL SQL](https://github.com/querydsl/querydsl/tree/master/querydsl-sql) or [jOOQ](http://www.jooq.org/) but provides an idiomatic Kotlin API and does not require code generation.
-   The [`spring-data-jdbc-repository`](https://github.com/sdeleuze/geospatial-messenger/tree/spring-data-jdbc-repository) branch is using `spring-data-jdbc-repository`, a community project that allows to use Spring Data [`PagingAndSortingRepository`](https://docs.spring.io/spring-data/data-commons/docs/current/api/org/springframework/data/repository/PagingAndSortingRepository.html) API with raw SQL queries without JPA. I am using [this Jakub Jirutka fork](https://github.com/jirutka/spring-data-jdbc-repository/) which is an improved version of [Tomasz Nurkiewicz original project](https://github.com/nurkiewicz/spring-data-jdbc-repository).

A [Spring Data JPA + Hibernate Spatial variant](https://github.com/sebastianperruolo/spring-gis) would be interesting, so feel free to contribute it with a pull request ;-) Kotlin Query DSL support would be also nice but this is currently not supported (please comment on [this issue](https://github.com/querydsl/querydsl/issues/1828) if you are interested). In this blog post I will focus on the [Exposed](https://github.com/JetBrains/Exposed) variant.

## [](#a-tour-of-geospatial-messenger-code)A tour of Geospatial Messenger code

### [](#domain-model)Domain model

Our domain model is described easily thanks to these 2 [Kotlin classes](https://kotlinlang.org/docs/reference/classes.html):

```kotlin
Copyclass Message(
    var content  : String,
    var author   : String,
    var location : Point? = null,
    var id       : Int?   = null
)

class User(
    var userName  : String,
    var firstName : String,
    var lastName  : String,
    var location  : Point? = null
)
```

### [](#sql-schema)SQL schema

Exposed allows us to describe the structure of our tables with a type-safe SQL API quite handy to use (autocomplete, refactoring and error prone):

```kotlin
Copyobject Messages : Table() {
    val id       = integer("id").autoIncrement().primaryKey()
    val content  = text("content")
    val author   = reference("author", Users.userName)
    val location = point("location").nullable()
}

object Users : Table() {
    val userName  = text("user_name").primaryKey()
    val firstName = text("first_name")
    val lastName  = text("last_name")
    val location  = point("location").nullable()
}
```

It is interesting to notice that Exposed does not support natively PostGIS functionalities like geometry types or geospatial requests. That's where [Kotlin extensions](https://kotlinlang.org/docs/reference/extensions.html) shine, and allow with a few lines of code to add such support without requiring to use extended classes:

```kotlin
Copyfun Table.point(name: String, srid: Int = 4326): Column<Point>
  = registerColumn(name, PointColumnType())

infix fun ExpressionWithColumnType<*>.within(box: PGbox2d) : Op<Boolean>
  = WithinOp(this, box)
```

### [](#repositories)Repositories

**Update**: we are now able to use [Exposed `@Transactional` support](https://dl.bintray.com/kotlin/exposed/org/jetbrains/exposed/spring-transaction/)! Transaction management is simply configured with `@EnableTransactionManagement` annotation and a `PlatformTransactionManager` bean in the [`Application`](https://github.com/sdeleuze/geospatial-messenger/blob/master/src/main/kotlin/io/spring/messenger/Application.kt) class.

Our repositories are also quite short and very flexible, since they allow you to write any kind of SQL request even with complex `WHERE` clause with a type-safe SQL API.

Please notice that since we are using Spring Framework 4.3, we [no longer need to specify an `@Autowired` annotation in such single-constructor class](https://spring.io/blog/2016/03/04/core-container-refinements-in-spring-framework-4-3#implicit-constructor-injection-for-single-constructor-scenarios).

```kotlin
Copyinterface CrudRepository<T, K> {
    fun createTable()
    fun create(m: T): T
    fun findAll(): Iterable<T>
    fun deleteAll(): Int
    fun findByBoundingBox(box: PGbox2d): Iterable<T>
    fun updateLocation(userName:K, location: Point)
}

interface UserRepository: CrudRepository<User, String>

@Repository
@Transactional // Should be at @Service level in real applications
class DefaultUserRepository(val db: Database) : UserRepository {

    override fun createTable() = SchemaUtils.create(Users)

    override fun create(user: User): User {
        Users.insert(toRow(user))
        return user
    }

    override fun updateLocation(userName:String, location: Point) = {
        location.srid = 4326
        Users.update({Users.userName eq userName})
            { it[Users.location] = location }
    }

    override fun findAll() = Users.selectAll().map { fromRow(it) }

    override fun findByBoundingBox(box: PGbox2d) =
            Users.select { Users.location within box }
                 .map { fromRow(it) }

    override fun deleteAll() = Users.deleteAll()

    private fun toRow(u: User): Users.(UpdateBuilder<*>) -> Unit = {
        it[userName] = u.userName
        it[firstName] = u.firstName
        it[lastName] = u.lastName
        it[location] = u.location
    }

    private fun fromRow(r: ResultRow) =
        User(r[Users.userName],
             r[Users.firstName],
             r[Users.lastName],
             r[Users.location])
}
```

### [](#controllers)Controllers

Controllers are also very concise and use Spring Framework 4.3 upcoming `@GetMapping` / `@PostMapping` annotations which are just method-specific shortcuts for `@RequestMapping` annotations:

```kotlin
Copy@RestController
@RequestMapping("/user")
class UserController(val repo: UserRepository) {

    @PostMapping
    @ResponseStatus(CREATED)
    fun create(@RequestBody u: User) { repo.create(u) }

    @GetMapping
    fun list() = repo.findAll()

    @GetMapping("/bbox/{xMin},{yMin},{xMax},{yMax}")
    fun findByBoundingBox(@PathVariable xMin:Double,
                          @PathVariable yMin:Double,
                          @PathVariable xMax:Double,
                          @PathVariable yMax:Double)
            = repo.findByBoundingBox(
                        PGbox2d(Point(xMin, yMin), Point(xMax, yMax)))

    @PutMapping("/{userName}/location/{x},{y}")
    @ResponseStatus(NO_CONTENT)
    fun updateLocation(@PathVariable userName:String,
                       @PathVariable x: Double,
                       @PathVariable y: Double)
            = repo.updateLocation(userName, Point(x, y))
}
```

The client side is a pure HTML + Javascript application developed with [OpenLayers](http://openlayers.org/) mapping library (see [index.html](https://github.com/sdeleuze/geospatial-messenger/blob/master/src/main/resources/static/index.html) and [map.js](https://github.com/sdeleuze/geospatial-messenger/blob/master/src/main/resources/static/map.js) for more details) that geolocalizes you and creates geolocalized messages sent/received to/from other users thanks to Server-Sent Events.

![Screenshot](https://raw.githubusercontent.com/sdeleuze/geospatial-messenger/master/screenshot.png)

And last but not least, the REST API is fully tested and documented thanks to the awesome [Spring REST docs](http://projects.spring.io/spring-restdocs/) project, see [MessageControllerTests](https://github.com/sdeleuze/geospatial-messenger/blob/master/src/test/kotlin/io/spring/messenger/MessageControllerTests.kt) and [index.adoc](https://github.com/sdeleuze/geospatial-messenger/blob/master/src/main/resources/static/index.html) for more details.

## [](#conclusion)Conclusion

The main impression I had developing this application is that it was fun, efficient, with a high level of flexibility and safety provided by the SQL API and Kotlin type system and [null safety](https://kotlinlang.org/docs/reference/null-safety.html). The resulting Spring Boot application is a 18 MBytes self-contained executable jar with low memory consumption (the app can run with `-Xmx32m`!!!). Using Spring REST docs was also a pleasure, demonstrating again Kotlin nice Java interoperability.

The few pain points I have encountered ([array annotation attributes](https://youtrack.jetbrains.com/issue/KT-11235), [Java 8 Stream support](https://youtrack.jetbrains.com/issue/KT-5175), [full callable reference support](https://youtrack.jetbrains.com/issue/KT-6947)), are planned to be fixed in Kotlin 1.1. Exposed library is still young and need to mature, but from my point of view it is promising and shows how Kotlin could be used for building type-safe DSL API ([this HTML type-safe builder](https://kotlinlang.org/docs/reference/type-safe-builders.html) is also a good example).

And keep in mind that officially supported [Spring Data projects](http://projects.spring.io/spring-data/) works well with Kotlin as shown in the [spring-boot-kotlin-demo](https://github.com/sdeleuze/spring-boot-kotlin-demo) project in my [previous blog post](https://spring.io/blog/2016/02/15/developing-spring-boot-applications-with-kotlin).

If you happen to be in Barcelona mid May (never a bad time to be in Barcelona anyway!), don’t miss the chance to join the [Spring I/O conference](http://www.springio.net/). Also, the registration for [SpringOne Platform](http://springoneplatform.io/) (early August, Las Vegas) has opened recently, in case you want to benefit from early bird ticket pricing. The latter is also still open for talk proposals. So if you’re interested to give a talk about Spring or Pivotal-related technologies, feel free to submit!