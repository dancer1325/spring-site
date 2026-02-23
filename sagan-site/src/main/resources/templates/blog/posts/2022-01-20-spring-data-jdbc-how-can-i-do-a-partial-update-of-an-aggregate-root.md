---
title: Spring Data JDBC - How Can I Do a Partial Update of an Aggregate Root?
source: https://spring.io/blog/2022/01/20/spring-data-jdbc-how-can-i-do-a-partial-update-of-an-aggregate-root
scraped: 2026-02-23T09:27:03.950Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Jens Schauder |  January 20, 2022 | 2 Comments
---

# Spring Data JDBC - How Can I Do a Partial Update of an Aggregate Root?

_Engineering | Jens Schauder |  January 20, 2022 | 2 Comments_

This is the fourth article of a series about how to tackle various challenges you might encounter when using Spring Data JDBC. The series consists of:

1.  [Spring Data JDBC - How to Use Custom ID Generation.](https://spring.io/blog/2021/09/09/spring-data-jdbc-how-to-use-custom-id-generation)
    
2.  [Spring Data JDBC - How Do I Make Bidirectional Relationships?](https://spring.io/blog/2021/09/22/spring-data-jdbc-how-do-i-make-bidirectional-relationships)
    
3.  [Spring Data JDBC - How Do I Implement Caching?](https://spring.io/blog/2021/10/18/spring-data-jdbc-how-do-i-implement-caching)
    
4.  Spring Data JDBC - How Can I Do a Partial Update of an Aggregate Root? (this article)
    
5.  [Spring Data JDBC - How do I Generate the Schema for my Domain Model?](https://spring.io/blog/2023/08/29/spring-data-jdbc-how-to-maintain-your-database-schema)
    

If you are new to Spring Data JDBC, you should start by reading [introduction](https://spring.io/blog/2018/09/17/introducing-spring-data-jdbc) and [this article, which explains the relevance of aggregates in the context of Spring Data JDBC](https://spring.io/blog/2018/09/24/spring-data-jdbc-references-and-aggregates). Trust me. It is important.

Spring Data JDBC is built around the idea of aggregates and repositories. Repositories are collection-like objects that find, load, save, and delete aggregates. Aggregates are clusters of objects that have a tight relationship and are internally consistent whenever program control is outside their methods. As such, aggregates also get loaded and persisted together in one atomic operation.

However, Spring Data JDBC doesn’t keep track of how your aggregates change. Therefore, Spring Data JDBCs algorithm for persisting an aggregate minimizes the assumptions made about the database state. This is costly if your aggregate contains a collection of entities.

For an example to show what happens, we once again turn to Minions. This Minion has a Set of Toys.

```
Copyclass Minion {

	@Id Long id;
	String name;
	Color color = Color.YELLOW;
	Set<Toy> toys = new HashSet<>();
	@Version int version;

	Minion(String name) {
		this.name = name;
	}

	@PersistenceConstructor
	private Minion(Long id, String name, Collection<Toy> toys, int version) {

		this.id = id;
		this.name = name;
		this.toys.addAll(toys);
		this.version = version;
	}

	Minion addToy(Toy toy) {

		toys.add(toy);
		return this;
	}
}
```

The schema for these classes looks like this:

```
CopyCREATE TABLE MINION
(
    ID             IDENTITY PRIMARY KEY,
    NAME           VARCHAR(255),
    COLOR          VARCHAR(10),
    VERSION      INT
);

CREATE TABLE TOY
(
    MINION  BIGINT NOT NULL,
    NAME    VARCHAR(255)
);
```

And the repository interface is trivial for now:

```
Copyinterface MinionRepository extends CrudRepository<Minion, Long> {}
```

If we save a Minion that already exists in the database, the following happens:

1.  All Toys in the database of that minion get deleted.
    
2.  The minion itself gets updated.
    
3.  All the Toys that are currently part of that Minion get inserted into the database.
    

This is wasteful when there are many toys and none of them changed, was deleted, or added. However, Spring Data JDBC does not have any information about this, and it should not, to keep it simple. Also, you might know more in your code than Spring Data or any other tool or library knows, and you might be able to take advantage of that knowledge. The next sections describe various ways of doing that.

## [](#use-a-reduced-view-of-the-aggregate-root)[](#use-a-reduced-view-of-the-aggregate-root)Use a Reduced View of the Aggregate Root

Toys are an indispensable part of any proper minion but maybe there are domains that do not care about toys. If so, there is nothing wrong about having a `PlainMinion` mapped to the same table:

```
Copy@Table("MINION")
class PlainMinion {
	@Id Long id;
	String name;
	@Version int version;
}
```

Since it does not know about toys, it leaves them alone, as you can verify with a test:

```
Copy@SpringBootTest
class SelectiveUpdateApplicationTests {

	@Autowired MinionRepository minions;
	@Autowired PlainMinionRepository plainMinions;

	@Test
	void renameWithReducedView() {

		Minion bob = new Minion("Bob")
				.addToy(new Toy("Tiger Duck"))
				.addToy(new Toy("Security blanket"));
		minions.save(bob);

		PlainMinion plainBob = plainMinions.findById(bob.id).orElseThrow();
		plainBob.name = "Bob II.";
		plainMinions.save(plainBob);

		Minion bob2 = minions.findById(bob.id).orElseThrow();

		assertThat(bob2.toys).containsExactly(bob.toys.toArray(new Toy[]{}));
	}
}
```

Just make sure you have a foreign key between the toys and the minion so that you cannot accidentally delete the minion without also deleting its toys. Also, this works only for aggregate roots. Entities inside an aggregate get deleted and recreated, so any column not present in a reduced view of such an entity gets reset to its default value.

## [](#use-direct-database-updates)[](#use-direct-database-updates)Use Direct Database Updates

Alternatively, you can just write your update in a new repository method:

```
Copyinterface MinionRepository extends CrudRepository<Minion, Long> {

	@Modifying
	@Query("UPDATE MINION SET COLOR ='PURPLE', VERSION = VERSION +1 WHERE ID = :id")
	void turnPurple(Long id);
}
```

You need to be aware that it bypasses any logic in Spring Data JDBC. You must make sure this does not cause problems for your application. An example of such logic is the optimistic locking. The statement above takes care of optimistic locking, so other processes that do something else with the Minion do not accidentally undo the color change. Similarly, if your entities have auditing columns, you need to make sure they get updated accordingly. If you use [lifecycle events](https://docs.spring.io/spring-data/jdbc/docs/current/reference/html/#jdbc.events) or [entity callback](https://docs.spring.io/spring-data/jdbc/docs/current/reference/html/#jdbc.entity-callbacks), you need to consider if and how to emulate their action.

## [](#use-custom-methods)[](#use-custom-methods)Use Custom Methods

One alternative often overlooked by many Spring Data users is the option to implement a custom method where you may code whatever you want or need for your purpose.

For this, you let your repository extend an interface to contain the method you want to implement:

```
Copyinterface MinionRepository extends CrudRepository<Minion, Long>, PartyHatRepository {}

interface PartyHatRepository {

	void addPartyHat(Minion minion);
}
```

Then provide an implementation for it with the same name but an added `Impl`:

```
Copyclass PartyHatRepositoryImpl implements PartyHatRepository {

	private final NamedParameterJdbcOperations template;

	public PartyHatRepositoryImpl(NamedParameterJdbcOperations template) {
		this.template = template;
	}

	@Override
	public void addPartyHat(Minion minion) {

		Map<String, Object> insertParams = new HashMap<>();
		insertParams.put("id", minion.id);
		insertParams.put("name", "Party Hat");
		template.update("INSERT INTO TOY (MINION, NAME) VALUES (:id, :name)", insertParams);

		Map<String, Object> updateParams = new HashMap<>();
		updateParams.put("id", minion.id);
		updateParams.put("version", minion.version);
		final int updateCount = template.update("UPDATE MINION SET VERSION = :version + 1 WHERE ID = :id AND VERSION = :version", updateParams);
		if (updateCount != 1) {
			throw new OptimisticLockingFailureException("Minion was changed before a Party Hat was given");
		}
	}
}
```

In our example, we execute multiple SQL statements to add a toy and also to ensure that optimistic locking is used:

```
Copy@Test
void grantPartyHat() {

  Minion bob = new Minion("Bob")
      .addToy(new Toy("Tiger Duck"))
      .addToy(new Toy("Security blanket"));
  minions.save(bob);

  minions.addPartyHat(bob);

  Minion bob2 = minions.findById(bob.id).orElseThrow();

  assertThat(bob2.toys).extracting("name").containsExactlyInAnyOrder("Tiger Duck", "Security blanket", "Party Hat");
  assertThat(bob2.name).isEqualTo("Bob");
  assertThat(bob2.color).isEqualTo(Color.YELLOW);
  assertThat(bob2.version).isEqualTo(bob.version+1);

  assertThatExceptionOfType(OptimisticLockingFailureException.class).isThrownBy(() -> minions.addPartyHat(bob));
}
```

## [](#conclusion)[](#conclusion)Conclusion

Spring Data JDBC is here to make your life easier in the standard cases. At the same time, it tries to not get in your way if you want something to behave differently. There are many levels on which you may choose to implement the desired behavior.

The complete example code is available in the [Spring Data Example repository](https://github.com/spring-projects/spring-data-examples/tree/main/jdbc/howto/selectiveupdate).

There will be more articles like this. Let me know if you would like me to cover specific topics.