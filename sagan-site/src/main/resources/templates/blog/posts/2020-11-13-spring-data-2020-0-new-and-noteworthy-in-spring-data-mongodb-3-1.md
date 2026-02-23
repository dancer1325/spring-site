---
title: Spring Data 2020.0 - New and Noteworthy in Spring Data MongoDB 3.1
source: https://spring.io/blog/2020/11/13/spring-data-2020-0-new-and-noteworthy-in-spring-data-mongodb-3-1
scraped: 2026-02-23T13:41:35.525Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Christoph Strobl |  November 13, 2020 | 0 Comments
---

# Spring Data 2020.0 - New and Noteworthy in Spring Data MongoDB 3.1

_Engineering | Christoph Strobl |  November 13, 2020 | 0 Comments_

The Spring Data MongoDB 3.1 release is one of the modules that highly benefited from the recent changes in the [Spring Data Commons](https://spring.io/blog/2020/11/06/spring-data-2020-0-new-and-noteworthy-a-general-overview) module, by leveraging the infrastructure built there to bring reactive features like auditing and SpEL. The following snippet gives you an impression of what this means for declarative MongoDB queries using SpEL:

```java
Copy@Query("{ 'supervisor' : ?#{ hasRole('ROLE_ADMIN') " +
  "? new Document('$regex', '*') : principal.name } }")
Flux<Person> findAllFilteredByRole();
```

`@EnableReactiveMongoAuditing` uses the common infrastructure so you can keep track of changes easily.

```java
Copy@Configuration
@EnableReactiveMongoAuditing
static class AuditingConfig extends AbstractReactiveMongoConfiguration {
   
  @Override
  protected String getDatabaseName() {
    return "database";
  }
    
  @Bean
  public ReactiveAuditorAware<User> auditorProvider() {
      return () -> ReactiveSecurityContextHolder.getContext()
        .map(it -> ...);
  }
}
```

Another focus of the current release was to keep up with the changes and enhancements around the MongoDB Aggregation Framework that lets you specify all sorts of data aggregation operations now, even including the possibility to run JavaScript functions as part of the pipeline (as shown in the example), recreating the average books calculation from the [MongoDB reference documentation](https://docs.mongodb.com/manual/reference/operator/aggregation/accumulator/#examples), below:

```java
CopyAccumulator accumulator = accumulatorBuilder()
  .init("function() { return { count: 0, sum: 0 } }")
  .accumulate("function(state, numCopies) { return { count: state.count + 1, sum: state.sum + numCopies } }")
  .accumulateArgs("$copies")
  .merge("function(state1, state2) { return { count: state1.count + state2.count, sum: state1.sum + state2.sum } }")
  .finalize("function(state) { return (state.sum / state.count) }");
```

To improve performance of aggregations operating on large datasets, MongoDB lets you add index hints to the pipeline by using `AggregationOptions.builder().hint("…")`.

Speaking of indices, although we highly recommend taking programmatic control over index creation, we also understand the convenience of declarative index definition holds. Therefore, we added partial filter expressions to the `@Indexed` and `@CompoundIndex` annotations to make index setup a little more convenient, as shown below:

```java
Copy@CompoundIndex(name = "idx", def = "...", 
  partialFilter = "{'ssn': {'$exists': true}}")
public class Person {
	
  //...
  @Indexed(partialFilter = "{'rating': { $lt: 10 }}") 
  String lastname;
}
```

So now that we have sped up aggregations and indexes, it is about time we talk about counting elements. As you know, we switched `MongoOperations.count(...)` (which previously worked on cached collection statistics) to run an aggregation for precise counting as part of our efforts on [Multi Document Transactions](https://spring.io/blog/2018/06/28/hands-on-mongodb-4-0-transactions-with-spring-data). Now, in some cases, one might not need the exact document count but can live with a close enough approximation. For those cases, you can now get an estimate from `MongoOperations.estimatedCount(...)`.

Last but not least, I wanted to mention the incubating [GraalVM native image](https://www.graalvm.org/reference-manual/native-image/) support for Spring Data MongoDB. Make sure to have Docker installed (just for convenience, as this will get you going without the need to install the GraalVM nor MongoDB) and check out the samples demonstrating instant startup for your [classic](https://github.com/spring-projects-experimental/spring-graalvm-native/tree/0.8.2/spring-graalvm-native-samples/data-mongodb) or [reactive](https://github.com/spring-projects-experimental/spring-graalvm-native/tree/0.8.2/spring-graalvm-native-samples/data-mongodb-reactive) MongoDB application.

```bash
Copy$ git clone https://github.com/spring-projects-experimental/spring-graalvm-native.git
$ cd spring-graalvm-native
$ git checkout 0.8.2
$ ./run-dev-container.sh
...@docker: cd spring-graalvm-native-samples/data-mongo
...@docker: ./build.sh
...@docker: ./target/data-mongodb
```