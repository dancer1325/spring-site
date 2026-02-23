---
title: Spring Data JDBC - How do I implement caching?
source: https://spring.io/blog/2021/10/18/spring-data-jdbc-how-do-i-implement-caching
scraped: 2026-02-23T09:26:59.575Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Jens Schauder |  October 18, 2021 | 2 Comments
---

# Spring Data JDBC - How do I implement caching?

_Engineering | Jens Schauder |  October 18, 2021 | 2 Comments_

This is the third article of a series about how to tackle various challenges you might encounter when using Spring Data JDBC.

The series consists of

1.  [Spring Data JDBC - How to use custom ID generation.](https://spring.io/blog/2021/09/09/spring-data-jdbc-how-to-use-custom-id-generation)
    
2.  [Spring Data JDBC - How do I make bidirectional relationships?](https://spring.io/blog/2021/09/22/spring-data-jdbc-how-do-i-make-bidirectional-relationships)
    
3.  Spring Data JDBC - How do I implement caching? (this article).
    
4.  [Spring Data JDBC - How Can I Do a Partial Update of an Aggregate Root?](https://spring.io/blog/2022/01/20/spring-data-jdbc-how-can-i-do-a-partial-update-of-an-aggregate-root)
    
5.  [Spring Data JDBC - How do I Generate the Schema for my Domain Model?](https://spring.io/blog/2023/08/29/spring-data-jdbc-how-to-maintain-your-database-schema)
    

If you are new to Spring Data JDBC, you should start by reading its [introduction](https://spring.io/blog/2018/09/17/introducing-spring-data-jdbc) and [this article, which explains the relevance of aggregates in the context of Spring Data JDBC](https://spring.io/blog/2018/09/24/spring-data-jdbc-references-and-aggregates). Trust me, it is important.

This article is based on part of a [talk I did at Spring One 2021](https://springone.io/2021/sessions/post-event/spring-data-jdbc-beyond-the-obvious).

## [](#why-does-spring-data-not-cache)[](#why-does-spring-data-not-cache)Why does Spring Data not cache?

One important design decision for Spring Data JDBC was to NOT include caching. The reason for this was as with so many decisions our experience with JPA. Let’s take a look at JPA and how it deals with caching.

JPA makes a pretty strong promise: When ever you load the logical same entity in a session you’ll always get the exact same instance. This certainly sounds convenient. It often saves a database roundtrip when you access an entity by id. But the reason for this is, that it is actually necessary for JPA to work properly. JPA tracks changes to your entities in order to flush those to the database eventually. This won’t work if a single logical entity is represented by multiple Java instances with potentially different and contradicting states.

In order to implement this promise JPA uses the "1st level cache" and thereby mixes two very distinct tasks:

1.  To transfer objects between memory and database.
    
2.  Caching.
    

This in turn causes problems, especially when developers forget about the cache or don’t learn about it in the first place.

-   They update an entity using SQL and fail to load the updated state using JPA, because JPA always returns the already loaded entity.
    
-   They edit an entity in memory and are surprised that it gets saved to the database, although they never called a method to do that.
    
-   They edit an entity in memory and want to compare it to its state in the database and again are surprised that they keep getting the already changed version.
    
-   They run large batches and are surprised that their entities are not garbage collected, resulting in huge memory footprint, bad performance and possibly out of memory exceptions.
    

The separation of concerns in Spring Data JDBC makes things way more transparent. An entity gets saved to the database when you call `save()` on the respective repository. And it gets loaded from the database when you call a method that returns one or more entities from a repository.

## [](#what-if-i-still-want-caching)[](#what-if-i-still-want-caching)What if I still want caching?

Without a doubt there are situations where caching is the right thing to do. Whenever you have data that you read a lot but that isn’t changing as fast, caching is a reasonable option.

And since caching is not part of Spring Data JDBC and Spring Data JDBC repositories are just Spring Beans, you can combine it with any caching solution you like. The obvious choice is of course, [Springs Caching abstraction](https://docs.spring.io/spring-framework/docs/current/reference/html/integration.html#cache) behind which you can put any caching solution.

It’s almost too simple to be true.

## [](#example)[](#example)Example

For demonstration purpose I once again use the beloved `Minion` entity and its matching repository.

```
Copypublic class Minion {
	@Id
	Long id;
	String name;

	Minion(String name) {
		this.name = name;
	}

	public Long getId(){
		return id;
	}
}
```

Note the cache related annotations on the repository.

```
Copyinterface MinionRepository extends CrudRepository<Minion, Long> {

	@Override
	@CacheEvict(cacheNames = "minions", beforeInvocation = false, key = "#result.id")
	<S extends Minion> S save(S s);

	@Override
	@Cacheable("minions")
	Optional<Minion> findById(Long aLong);
}
```

The `@CacheEvict` annotation is not as simple as one could wish because the `save` method takes an entity, but we need its `id` as a key. We accomplish that by using a SpEL expression. The `id` is in general only available after saving the entity, therefore we use `beforeInvocation = false`. And the use of `SpEL` forces us to make the `Minion` public and add a public `getId()` method.

Note that we need to enable caching by adding `@EnableCaching` to our Boot app.

```
Copy@EnableCaching
@SpringBootApplication
class CachingApplication {

	public static void main(String[] args) {
		SpringApplication.run(CachingApplication.class, args);
	}

}
```

And finally we need a test that accesses the database repeatedly only results in a select after a save.

```
Copy@SpringBootTest
class CachingApplicationTests {

	private Long bobsId;
	@Autowired MinionRepository minions;

	@BeforeEach
	void setup() {

		Minion bob = minions.save(new Minion("Bob"));
		bobsId = bob.id;
	}

	@Test
	void saveloadMultipleTimes() {

		Optional<Minion> bob = null;
		for (int i = 0; i < 10; i++) {
			bob = minions.findById(bobsId);
		}

		minions.save(bob.get());

		for (int i = 0; i < 10; i++) {
			bob = minions.findById(bobsId);
		}

	}

}
```

In order to observe what is going on when running the test we can enable logging of SQL statements in the `application.properties`

```
Copylogging.level.org.springframework.jdbc.core.JdbcTemplate=DEBUG
```

And these are the SQL statements that appear in the log:

```
CopyINSERT INTO "MINION" ("NAME") VALUES (?)]
SELECT "MINION"."ID" AS "ID", "MINION"."NAME" AS "NAME" FROM "MINION" WHERE "MINION"."ID" = ?]
UPDATE "MINION" SET "NAME" = ? WHERE "MINION"."ID" = ?]
SELECT "MINION"."ID" AS "ID", "MINION"."NAME" AS "NAME" FROM "MINION" WHERE "MINION"."ID" = ?]
```

So the caching works as expected. Caching of the `findById` avoids repetitive selects and `save` triggers the eviction of the entity from the cache.

For the example we use the simple cache which is just a `ConcurrentMap`. For production you’d probably want a proper cache implementation that you can configure with eviction strategies and what not. But the usage with Spring Data JDBC stays the same.

## [](#conclusion)[](#conclusion)Conclusion

Spring Data JDBC concentrates on its job: persisting and loading aggregates. Caching is orthogonal to that and can be added using the well known Spring Cache abstraction.

The [complete example code is available in the Spring Data Example repository](https://github.com/spring-projects/spring-data-examples/tree/main/jdbc/howto/caching).

There will be more articles like this. Let me know if you would like me to cover specific topics.