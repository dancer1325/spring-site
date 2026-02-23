---
title: What\'s new in Spring Data Moore?
source: https://spring.io/blog/2019/10/08/what-s-new-in-spring-data-moore
scraped: 2026-02-23T14:32:00.562Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Christoph Strobl |  October 08, 2019 | 2 Comments
---

# What's new in Spring Data Moore?

_Engineering | Christoph Strobl |  October 08, 2019 | 2 Comments_

Spring Data Moore ships with 16 modules and over 700 tickets completed. It includes tons of improvements and new features across the portfolio and has a strong focus on three major topics: Reactive, Kotlin, and Performance. The release adds features such as declarative reactive transactions and Coroutines/Flow support and comes with up to [60%\*](#performance) faster finder methods.

Let’s start with a look at some of the Reactive features of Moore.

## [](#declarative-reactive-transactions)[](#declarative-reactive-transactions)Declarative, reactive transactions

The [Lovelace Release](https://spring.io/blog/2018/09/27/what-s-new-in-spring-data-lovelace) introduced early support for reactive transactions in a closure-fashioned style that left some room for improvements. The following listing shows that style:

Reactive Transactions in Lovelace (with MongoDB)

```
Copypublic Mono<Process> doSomething(Long id) {

  return template.inTransaction().execute(txTemplate -> {

    return txTemplate.findById(id)
      .flatMap(it -> start(txTemplate, it))
      .flatMap(it -> verify(it))
      .flatMap(it -> finish(txTemplate, it));

  }).next();
}
```

In the preceding snippet, the transaction has to be initiated by explicitly calling `inTransaction()` with a transaction-aware template within the closure, calling `next()` at the end to turn the returned `Flux` into a `Mono` to satisfy the method signature, even though `findById(…)` already emits only a single element.

Obviously, this is not the most intuitive way of doing reactive transactions. So let’s have a look at the same flow using declarative reactive transaction support. As with Spring’s [transaction support](https://docs.spring.io/spring/docs/current/spring-framework-reference/data-access.html#transaction), you need a component to handle the transaction for you. For reactive transactions, a `ReactiveTransactionManager` is currently provided by the MongoDB and R2DBC modules. The following listing shows such a component:

```
Copy@EnableTransactionManagement
class Config extends AbstractReactiveMongoConfiguration {

  // …

  @Bean
  ReactiveTransactionManager mgr(ReactiveMongoDatabaseFactory f) {
    return new ReactiveMongoTransactionManager(f);
  }
}
```

From there, you can annotate methods with `@Transactional` and rely on the infrastructure to start, commit, and roll back transactional flows to handle the lifecycle via the [Reactor Context](https://projectreactor.io/docs/core/release/reference/#context). This lets you turn the code from Lovelace into the following listing, removing the need for the closure with its scoped template and the superfluous `Flux` to `Mono` transformation:

Declarative Reactive Transactions in Moore (with MongoDB)

```
Copy@Transactional
public Mono<Process> doSomething(Long id) {

  return template.findById(id)
    .flatMap(it -> start(template, it))
    .flatMap(it -> verify(it))
    .flatMap(it -> finish(template, it));
}
```

## [](#reactive-elasticsearch-repositories)[](#reactive-elasticsearch)Reactive Elasticsearch repositories

Another notable addition to the reactive family can be found in one of the community modules, with Spring Data Elasticsearch now offering reactive template and repository support built upon a fully reactive Elasticsearch REST client that in turn is based on Spring’s `WebClient`.

The client offers first class support for everyday search operations by exposing a familiar API close to the *Java High-Level REST Client*, making necessary cuts where needed. The combination of the template and repository API lets you, if needed, seamlessly transition to reactive without getting lost. The following listing shows how to configure Elasticsearch to use a reactive client:

Reactive Elasticsearch

```
Copyclass Config extends AbstractReactiveElasticsearchConfiguration {

  // …

  @Bean
  public ReactiveElasticsearchClient reactiveClient() {
    return ReactiveRestClients.create(localhost());
  }
}

@Autowired
ReactiveElasticsearchTemplate template;

//…

Criteria criteria = new Criteria("topics").contains("spring")
    .and("date").greaterThanEqual(today())

Flux<Conference> result = template.find(new CriteriaQuery(criteria), Conference.class);
```

## [](#reactive-querydsl)[](#reactive-querydsl)Reactive Querydsl

Speaking of getting lost in transition: [Querydsl](http://www.querydsl.com/) (← plain HTTP / NO HTTPS) offers a remarkable way of defining type safe queries for several data stores and has been supported for non-reactive data access for quite a while already. To support it in reactive scenarios, we added a reactive execution layer that lets you run `Predicate` backed queries. The `ReactiveQuerydslPredicateExecutor`, when added to the repository interface, provides all entry points, as the following example shows:

Reactive Querydsl

```
Copyinterface SampleRepository extends …, ReactiveQuerydslPredicateExecutor<…> {
  // …
}

@Autowired
SampleRepository repository;

// …
Predicate predicate = QCustomer.customer.lastname.eq("Matthews");
Flux<Customer> result = repository.findAll(predicate);
```

## [](#support-for-kotlin-coroutines-and-mongodb-criteria-api-dsl)[](#kotlin-coroutines)Support for Kotlin coroutines and MongoDB criteria API DSL

Along the lines of the enhanced reactive support in Moore, we continued the Kotlin story that we already started with the Lovelace Release. In particular, we provide several extensions for [Kotlin Coroutines](https://kotlinlang.org/docs/reference/coroutines-overview.html) and Flows by such offering methods as `awaitSingle()` and `asFlow()`. The following method uses the `awaitSingle()` method:

Kotlin Coroutine Support

```
Copyval result = runBlocking {
  operations.query<Person>()
   .matching(query(where("lastname").isEqualTo("Matthews")))
   .awaitSingle()
}
```

Another great enhancement that uses Kotlin language features was contributed by the community, adding a type safe query DSL for the Spring Data MongoDB criteria API. This lets you transform code such as `query(where("lastname").isEqualTo("Matthews"))` to the following notation:

Kotlin type safe queries

```
Copyval people = operations.query<Person>()
  .matching(query(Person::lastname isEqualTo "Matthews"))
  .all()
```

## [](#performance-improvements)[](#performance)Performance improvements

Along with crafting all these new features, we also took some time to investigate potential bottlenecks of the current implementations and found some areas for improvement. This included getting rid of `Optional`, capturing lambdas and stream execution in a lot of places, adding caches, and avoiding unnecessary lookup operations. In the end, the benchmarks showed an almost 60% increase of throughput for JPA single attribute finder methods, such as `findByTitle(…)`.

![](data:image/png;base64,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)

This is great and was worth the time it took! However, and I want to be clear about this, all benchmarks use clean-room scenarios that avoid any kind of overhead whatsoever. If you move them to a more real-world scenario (for example, by replacing an in-memory H2 database with an actual production-ready database), results look way different, as performance throttles shift to the network interaction, query execution and result transmission. The improvements are still visible but are usually down to single-digit percentages. The benchmarks can be found in this [GitHub repository](https://github.com/spring-projects/spring-data-dev-tools/tree/master/benchmark).

## [](#new-entity-callback-api)[](#entity-callback-api)New entity callback API

We also refined our existing hooks to intercept an entity’s lifecycle during persistence operations by moving away from the current `ApplicationEvent`\-based approach to a more direct interaction model. The `EntityCallback` API introduces better support for immutable types, provides runtime guarantees, and also seamlessly integrates into a reactive flow. Of course, we still support and publish `ApplicationEvents`, but we highly recommend switching to `EntityCallbacks` when changes to the processed entity should be made.

In the following sample, the `BeforeConvertCallback` modifies a given immutable entity by using a `wither` method that assigns an `id` to a copy of the entity, which is then returned and, in the next step, converted into the store specific representation:

EntityCallback API

```
Copy@Bean
BeforeConvertCallback<Person> beforeConvert() {

  return (entity, collection) -> {
    return entity.withId(…);
  }
}
```

Other than with `ApplicationEvents` (which could be configured with an `AsyncTaskExecutor`, leaving it pretty much open when the action is executed), the `EntityCallback` API guarantees to be invoked right before the actual event is triggered. Even in a reactive stream. The following listing shows how it works:

Reactive EntityCallback API

```
Copy@Bean
ReactiveBeforeConvertCallback<Person> beforeConvert() {

  return (entity, collection) -> {
    return Mono.just(entity.withId(…));
  }
}
```

## [](#support-for-redis-streams)[](#redis-streams)Support for Redis Streams

Speaking of streams, Spring Data Redis now has support for Redis Streams, which have almost nothing to do with reactive streams but are a new Redis append-only data structure that models a log where each entry consists of an id (typically a timestamp plus a sequence number) and multiple key/value pairs. Along with the usual suspects, such as adding to the log and reading from it, Spring Data Redis provides containers that allow infinite listening and processing of entries added to the log. It works like `tail -f` but for a Redis Stream. The following example shows a Redis stream listener:

Redis Streams listener

```
Copy@Autowired
RedisConnectionFactory factory;

StreamListener<String, MapRecord<…>> listener =
  (msg) -> {

    // … msg.getId()
    // … msg.getStream()
    // … msg.getValue()
  };

StreamMessageListenerContainer container = StreamMessageListenerContainer.create(factory));

container.receive(StreamOffset.fromStart("my-stream"), listener);
```

The `StreamMessageListenerContainer` in the preceding sample reads all existing entries of `my-stream` and gets notified about newly added ones. For each message received, the `StreamListener` is invoked. A single container can receive messages from multiple streams.

Of course, stream-like structures are best consumed by a reactive infrastructure, as the following example shows:

```
CopyStreamReceiver receiver = // …

receiver.receive(StreamOffset.fromStart("my-stream"))
  .doOnNext(msg -> {
      // …
  })
  .subscribe();
```

## [](#multiple-out-parameters-for-jpa-stored-procedures)[](#multiple-out-parameters-jpa)Multiple out parameters for JPA stored procedures

On the JPA side of things, a tiny improvement now lets you have multiple `OUT` parameters for stored procedures, which are returned within a `Map`. The following example shows how to do so:

Out parameters with JPA Stored Procedures

```
Copy@NamedStoredProcedureQuery(name = "User.s1p", procedureName = "s1p",
  parameters = {
    @StoredProcedureParameter(mode = IN, name = "in_1", type = …),
    @StoredProcedureParameter(mode = OUT, name = "out_1", type = …),
    @StoredProcedureParameter(mode = OUT, name = "out_2", type = …)})
@Table(name = "SD_User")
class User { … }

interface UserRepository extends JpaRepository<…> {

  @Procedure(name = "User.s1p")
  Map<String, Integer> callS1P(@Param("in_1") Integer arg);
}
```

All of the out parameters declared in JPA’s `@StoredProcedureParameter` annotations will eventually be available in the `Map` returned by the repository query method.

## [](#declarative-mongodb-aggregations-on-repository-methods)[](#declarative-mongodb-aggregations)Declarative MongoDB aggregations on repository methods

With MongoDB, complex data processing is done with [Aggregations](https://docs.mongodb.com/manual/reference/operator/aggregation/) for which Spring Data offers a specific (fluent) API with abstractions for the operations and expressions. However, Stackoverflow taught us that people tend to craft their aggregations on the command line and translate those into Java code later on. That translation turned out to be one major pain point.  
So we took the opportunity to introduce `@Aggregation` as a direct way to run aggregations in a repository method. The following example shows how to do so:

Declarative MongoDB Aggregations

```
Copyinterface OrderRepository extends CrudRepository<Order, Long> {

  @Aggregation("{ $group : { _id : '$cust_id', total : { $sum : '$amount' }}}")
  List<TotalByCustomer> totalByCustomer(Sort sort);

  @Aggregation(pipeline = {
    "{ $match : { customerId : ?0 }}",
    "{ $count : total }"
  })
  Long totalOrdersForCustomer(String customerId);
}
```

Like its relative, the `@Query` annotation, `@Aggregation` supports parameter replacement and adds sorting to the aggregation if provided by a query method argument, as shown in the preceding example. We even took it one step further, extracting single-attribute document values for methods that return simple types, such as the *totalOrdersForCustomer* method in the preceding example. The `$count` stage in this case returns a document like `{"total" : 101 }` that normally requires mapping to either plain `org.bson.Document` or a corresponding domain type. However, since the method declares `Long` as its return type, we inspect the result document and extract / convert the value from there, removing the need of the dedicated type.

## [](#theres-much-more-for-you-to-explore)[](#more)There’s much more for you to explore

To round things off for now, I want to mention some additional features across other modules. If you’re interested in all of them, please have a look at our [release wiki](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Moore) or refer to the "What’s New" section in the reference documentation of the individual modules. So, without further ado, here are yet more improvements provided by this release:

-   Gemfire/Apache Geode: Improved SSL support & dynamic port configuration
    
-   JDBC: Read only properties, SQL generation & embeddable load options
    
-   REST: making use of HATEOAS 1.0 and all the cool stuff in there!
    
-   MongoDB: Reactive GridFS, declarative collation support & JSON Schema generator
    
-   neo4j: Spatial types & exists projections
    
-   Apache Cassandra: Range queries, Optimistic locking and auditing support
    
-   Redis: Cluster caching and non blocking connect methods
    
-   Elasticsearch: High Level REST Client support & non Jackson based entity mapping
    

If you’d like to know more, [here](https://www.youtube.com/watch?v=jwdhZcCOock)'s a 30-minute presentation recorded at SpringOne 2019 in Austin, TX.