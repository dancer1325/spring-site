---
title: Spring Data JDBC - How do I make Bidirectional Relationships?
source: https://spring.io/blog/2021/09/22/spring-data-jdbc-how-do-i-make-bidirectional-relationships
scraped: 2026-02-23T09:26:55.188Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Jens Schauder |  September 22, 2021 | 0 Comments
---

# Spring Data JDBC - How do I make Bidirectional Relationships?

_Engineering | Jens Schauder |  September 22, 2021 | 0 Comments_

This is the second article of a series about how to tackle various challenges you might encounter when using Spring Data JDBC. The series consists of

1.  [Spring Data JDBC - How to use custom ID generation.](https://spring.io/blog/2021/09/09/spring-data-jdbc-how-to-use-custom-id-generation)
    
2.  Spring Data JDBC - How do I make bidirectional relationships? (this article).
    
3.  [Spring Data JDBC - How do I implement caching?](https://spring.io/blog/2021/10/18/spring-data-jdbc-how-do-i-implement-caching)
    
4.  [Spring Data JDBC - How Can I Do a Partial Update of an Aggregate Root?](https://spring.io/blog/2022/01/20/spring-data-jdbc-how-can-i-do-a-partial-update-of-an-aggregate-root)
    
5.  [Spring Data JDBC - How do I Generate the Schema for my Domain Model?](https://spring.io/blog/2023/08/29/spring-data-jdbc-how-to-maintain-your-database-schema)
    

If you are new to Spring Data JDBC, you should start by reading its [introduction](https://spring.io/blog/2018/09/17/introducing-spring-data-jdbc) and [this article, which explains the relevance of aggregates in the context of Spring Data JDBC](https://spring.io/blog/2018/09/24/spring-data-jdbc-references-and-aggregates). Trust me, it is important.

This article is based on part of a [talk I did at Spring One 2021](https://springone.io/2021/sessions/post-event/spring-data-jdbc-beyond-the-obvious).

Spring Data JDBC doesn’t have special support for bidirectional relationships. To understand why you don’t really need any we have to look at to different kinds of relationships: We distinguish references within an aggregate and those across aggregates.

## [](#internal-references)[](#internal-references)Internal references

Let us look first at references internal to an aggregate. Those get modelled by actual java references in Spring Data JDBC. These references always go from the aggregate root to the entity inside the aggregate. Actually the reference goes from an entity closer to the aggregate root to the one further inside. But the same arguments apply so we’ll just consider the aggregate root and one inner entity.

If you follow the ideas and rules of DDD you never access an internal entity directly. Instead you call a method on the aggregate root whenever you want to manipulate an internal entity and the aggregate root then calls the appropriate method on the internal entity. If the method needs a reference to the aggregate root you just pass it along when calling the method on the inner entity. The same goes for intermediate entities.

But maybe you have many such methods and don’t want to pass `this` all over the place. In that case you simply pass the reference not during the method call, but during construction of the aggregate. Just plain Java code with nothing special about it.

As an example consider a `Minion` and its `Toy` which shall have a reference back to the `Minion` so it can tell its owners name. The `Minion` sets itself as the master of all its toys.

```
Copyclass Minion {
	@Id
	Long id;
	String name;
	final Set<Toy> toys = new HashSet<>();

	Minion(String name) {
		this.name = name;
	}

	@PersistenceConstructor
	private Minion(Long id, String name, Collection<Toy> toys) {

		this.id = id;
		this.name = name;
		toys.forEach(this::addToy);
	}

	public void addToy(Toy toy) {
		toys.add(toy);
		toy.minion = this;
	}

	public void showYourToys() {
		toys.forEach(Toy::sayHello);
	}
}

class Toy {
	String name;

	@Transient // org.SPRINGframework.DATA...
	Minion minion;

	Toy(String name) {
		this.name = name;
	}

	public void sayHello() {
		System.out.println("I'm " + name + " and I'm a toy of " + minion.name);
	}
}
```

Note that you need to make those back references `@Transient` using the Spring Data annotation, not the JPA one. Otherwise Spring Data JDBC would try to persist them. which would lead to infinite loops.

## [](#external-references)[](#external-references)External references

The situation is even simpler for references between aggregates. With those references don’t get implemented by Java references but by using the id of the referenced aggregate, optionally wrapped in an `AggregateReference`.

Navigating such a reference translates into using the repository for the target aggregate and its `findById` method. For example a `Minion` might reference its evil master, a `Person`.

```
Copyclass Minion {
	@Id
	Long id;
	String name;
	AggregateReference<Person, Long> evilMaster;

	Minion(String name, AggregateReference<Person, Long> evilMaster) {
		this.name = name;
		this.evilMaster = evilMaster;
	}
}

class Person {
	@Id
	Long id;
	String name;

	Person(String name) {
		this.name = name;
	}
}
```

Given a `Minion` you can now load its evil master.

```
Copy@Autowired
PersonRepository persons;

//...

Minion minion = //...

Optional<Person> evilMaster = persons.findById(minion.evilMaster.getId());
```

In order to navigate the relationship in the opposite direction you declare a method in the `MinionRepository` which finds the appropriate minions for a given evil master.

```
Copyinterface MinionRepository extends CrudRepository<Minion, Long> {

	@Query("SELECT * FROM MINION WHERE EVIL_MASTER = :id")
	Collection<Minion> findByEvilMaster(Long id);
}

@Autowired
MinionRepository minions;

//...

Person evilMaster = // ...

Collection<Minion>findByEvilMaster(evilMaster.id);
```

With Spring Data JDBC 2.3 you don’t have to use a `@Query` annotation anymore because query derivation supports `AggregateReference` as argument type.

## [](#conclusion)[](#conclusion)Conclusion

While Spring Data JDBC doesn’t have explicit support for bidirectional relationships it turns out you don’t need special support. All you need are the existing features and standard Java code. The complete example code is available in the Spring Data Example repository. [There is one example for internal references](https://github.com/spring-projects/spring-data-examples/tree/main/jdbc/howto/bidirectionalinternal) and [one example for external references](https://github.com/spring-projects/spring-data-examples/tree/main/jdbc/howto/bidirectionalexternal).

There will be more articles like this. Let me know if you would like me to cover specific topics.