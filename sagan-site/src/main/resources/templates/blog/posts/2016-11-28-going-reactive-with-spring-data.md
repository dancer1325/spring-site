---
title: Going reactive with Spring Data
source: https://spring.io/blog/2016/11/28/going-reactive-with-spring-data
scraped: 2026-02-23T18:57:02.894Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Paluch |  November 28, 2016 | 17 Comments
---

# Going reactive with Spring Data

_Engineering | Mark Paluch |  November 28, 2016 | 17 Comments_

Last weeks' [Spring Data Kay M1](https://spring.io/blog/2016/11/23/first-milestone-of-next-generation-spring-data-released) is the first release ever that comes with support for reactive data access. Its initial set of supported stores — MongoDB, Apache Cassandra and Redis — all ship reactive drivers already, which made them very natural candidates for such a prototype. Let’s take a more detailed look at the new programming model and the APIs that make up that support.

## [](#reactive-repositories)[](#reactive-repositories)Reactive Repositories

The repositories programming model is the most high-level abstraction Spring Data users usually deal with. They’re usually comprised of a set of CRUD methods defined in a Spring Data provided interface and domain-specific query methods. Here’s what a reactive Spring Data repository definition would look like:

```
Copypublic interface ReactivePersonRepository
  extends ReactiveCrudRepository<Person, String> {

  Flux<Person> findByLastname(Mono<String> lastname);

  @Query("{ 'firstname': ?0, 'lastname': ?1}")
  Mono<Person> findByFirstnameAndLastname(String firstname, String lastname);
}
```

As you can see, there’s not too much difference to what you’re used to. However, in contrast to the traditional repository interfaces, a reactive repository uses reactive types as return types and can do so for parameter types, too. The CRUD methods in the newly introduced `ReactiveCrudRepository`, of course make use of these types, too.

By default, reactive repositories use [Project Reactor](https://projectreactor.io) types but other reactive libraries can also be used. We provide a custom repository base interface (e.g. `RxJava2CrudRepository`) for those and also automatically adapt the types as needed for query methods, e.g RxJava’s `Observable` and `Single`. The rest basically stays the same. Note, however, that the current milestone does not support pagination yet and you of course have to have the necessary reactive libraries on the classpath to activate support for a particular library.

### [](#activating-reactive-spring-data)[](#reactive-configuration)Activating reactive Spring Data

Similarly to what we have in the blocking world, the support for reactive Spring Data is activated through an `@Enable…` annotation alongside some infrastructure setup:

```
Copy@EnableReactiveMongoRepositories
public class AppConfig extends AbstractReactiveMongoConfiguration {

  @Bean
  public MongoClient mongoClient() {
    return MongoClients.create();
  }

  @Override
  protected String getDatabaseName() {
    return "reactive";
  }
}
```

See how we use a different base class for the infrastructure configuration, as we need to make use of the MongoDB async driver.

## [](#using-reactive-repositories)[](#using-reactive-repositories)Using reactive repositories

The repository can now be used like a blocking repository, except that the handling of the result can now be done in a reactive way:

```
Copy@RestController
class PersonController {

  private final PersonRepository people;

  public PersonController(PersonRepository people) {
    this.people = people;
  }

  @GetMapping("/people")
  Flux<String> namesByLastname(@RequestParam Mono<String> lastname) {

    Flux<Person> result = repository.findByLastname(lastname);
    return result.map(it -> it.getFullName());
  }
}
```

See how we can forward the reactive parameters provided by Spring Web Reactive, pipe them into the repository, get back a `Flux` in turn and then work with the execution result in a reactive way. In general, reactive query methods follow the same idea of query creation as on the already known repositories. Parameters passed to query methods can be either plain (e.g. `String`) wrapped (`Optional<String>`, `Stream<String>`) or reactive wrapped arguments (`Mono<String>`, `Flux<String>`). If you’re using reactive wrappers as parameter types, the implementation defers actual query creation and execution until an actual subscription.

## [](#reactive-templates)[](#reactive-templates)Reactive templates

Just as the traditional repositories are based on traditional template implementations, the reactive ones are built on top of a reactive template. Most of the operations available in the blocking template API have a counterpart in the reactive template. We’re going to port more features of the blocking world into the reactive template APIs, but some of the operations are simply not available through reactive drivers (yet) or just do not make sense in a reactive world.

Here’s is an excerpt from `ReactiveMongoOperations` from Spring Data MongoDB. It is implemented by `ReactiveMongoTemplate` and uses [Project Reactor](http://projectreactor.io/)'s reactive types such as `Mono` and `Flux` to wrap responses. Some methods also accept reactive types to stream data into your data store.

```
Copypublic interface ReactiveMongoOperations {

  // …

  /**
   * Map the results of an ad-hoc query on the specified collection to a
   * single instance of an object of the specified type.
   */
  <T> Mono<T> findOne(Query query, Class<T> entityClass);

  /**
   * Map the results of an ad-hoc query on the collection for the entity
   * class to a List of the specified type.
   */
  <T> Flux<T> find(Query query, Class<T> entityClass);

  /**
   * Insert the object into the specified collection.
   */
  <T> Mono<T> insert(T objectToSave, String collectionName);

  /**
   * Insert the object into the collection for the entity type of the object
   * to save.
   */
  <T> Mono<T> insert(Mono<? extends T> objectToSave);

  // …
}
```

Note, that all methods follow the reactive execution model, not executing any operations incorporating any I/O upon invocation but only on subscription to the returned value.

Let’s insert some data via the template:

```
CopyFlux<Person> flux = Flux.just(new Person("Walter", "White"),
  new Person("Skyler", "White"),
  new Person("Saul", "Goodman"),
  new Person("Jesse", "Pinkman"));

template.insertAll(flux).subscribe();
```

Some methods — like `insertAll(…)` — accept reactive types to stream incoming data asynchronously into your MongoDB database, e.g. coming from a `Flux` that you receive in a Spring Web Reactive controller that will asynchronously map a JSON array via Jackson:

```
Copy@PostMapping("/people")
Flux<People> namesByLastname(@RequestBody Flux<Person> people) {

  return template.insertAll(people);
}
```

As you can see, both the repositories and the template APIs allow you to describe the request handling in a reactive, non-blocking way. That said, let’s dive even a bit deeper into the Redis support for reactive data access.

## [](#reactive-connections-with-spring-data-redis)[](#reactive-connections-with-spring-data-redis)Reactive Connections with Spring Data Redis

Spring Data Redis comes with initial reactive support on connection level, currently only on [Lettuce](https://github.com/mp911de/lettuce), as it’s the only Redis driver that supports reactive data access. As Redis is usually used on a much lower abstraction level, the Kay M1 release starts with reactive abstractions on that lower level. The `LettuceConnectionFactory` allows to get access to a `ReactiveRedisConnection` which in turn provides access to reactive versions of Redis commands

Functional chaining with operators creates chains to access Redis data in a reactive fashion. Again, all I/O is asynchronous.

```
CopyReactiveKeyCommands keyCommands = connection.keyCommands();
keyCommands.randomKey()
  .flatMap(keyCommands::type)
  .flatMap(System.out::println)
  .subscribe();
```

This code obtains a random key and prints its data type. A non-existant random key is completed as empty `Mono`.

Reactive Redis commands come in two flavors: accepting plain arguments and accepting command publishers. A command publisher emits specific Redis commands to stream data right into Redis. Each emitted command emits a command response once the command is executed.

```
Copypublic interface ReactiveStringCommands {

  // …

  Mono<Boolean> set(ByteBuffer key, ByteBuffer value);

  Flux<BooleanResponse<SetCommand>> set(Publisher<SetCommand> commands);

  // …
}
```

Traditional Spring Data Redis used `byte[]` on its blocking API to exchange data. A `byte[]` forces data duplication if data is available in a buffer such as `ByteBuffer` or Netty’s `ByteBuf`. Reactive support is a lot about efficient resource usage, so we decided to expose methods accepting and returning `ByteBuffer`.

## [](#summary)[](#summary)Summary

I hope this blog post gave you an introduction into the reactive features shipped with Kay at various levels of abstraction. You can find executable examples for all of that in our examples repository.

-   [Reactive examples for MongoDB](https://github.com/spring-projects/spring-data-examples/tree/master/mongodb/reactive)
    
-   [Reactive examples for Cassandra](https://github.com/spring-projects/spring-data-examples/tree/master/cassandra/reactive)
    
-   [Reactive examples for Redis](https://github.com/spring-projects/spring-data-examples/tree/master/redis/reactive)
    

We’re looking forward to shipping another milestone release in January 2017 before heading towards a release candidate.

## [](#related-content)[](#related-content)Related content

-   [Notes on Reactive Programming Part I: The Reactive Landscape](https://spring.io/blog/2016/06/07/notes-on-reactive-programming-part-i-the-reactive-landscape)
    
-   [Notes on Reactive Programming Part II: Writing Some Code](https://spring.io/blog/2016/06/13/notes-on-reactive-programming-part-ii-writing-some-code)
    
-   [Notes on Reactive Programming Part III: A Simple HTTP Server Application](https://spring.io/blog/2016/07/20/notes-on-reactive-programming-part-iii-a-simple-http-server-application)
    
-   [Ready your Java 8 Reactive apps now, Reactor 3.0 GA is out !](https://spring.io/blog/2016/09/27/ready-your-java-8-reactive-apps-now-reactor-3-0-ga-is-out)