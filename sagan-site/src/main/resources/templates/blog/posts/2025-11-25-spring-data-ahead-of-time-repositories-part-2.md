---
title: Spring Data Ahead of Time Repositories - Part 2
source: https://spring.io/blog/2025/11/25/spring-data-ahead-of-time-repositories-part-2
scraped: 2026-02-22T22:08:17.800Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Christoph Strobl |  November 25, 2025 | 3 Comments
---

# Spring Data Ahead of Time Repositories - Part 2

_Engineering | Christoph Strobl |  November 25, 2025 | 3 Comments_

Concluding the [Road to GA](https://spring.io/blog/2025/09/02/road_to_ga_introduction) blog post series, let's explore benefits of Spring Data AOT Repositories.

Back in May 2025, we first introduced [Ahead of Time (AOT) repositories](https://spring.io/blog/2025/05/22/spring-data-ahead-of-time-repositories) as a preview feature for *JPA* and *MongoDB* with the [3rd Milestone of the next Spring Data generation](https://spring.io/blog/2025/05/16/spring-data-2025-1-0-M3-released). This feature, in short, uses AOT processing to implement your repository query methods using actual source code by relying on the store-specific nature of the repository.

Since then, we've incorporated feedback, ironed out rough edges, and onboarded two more modules: Apache Cassandra and JDBC. This means, with the [`2025.1.0` release](https://spring.io/blog/2025/11/14/spring-data-2025-1-goes-ga), you are be able to use AOT generated repositories with four Spring Data modules:

-   Spring Data for [Apache Cassandra](https://spring.io/projects/spring-data-cassandra)
-   Spring Data [JDBC](https://spring.io/projects/spring-data-jdbc)
-   Spring Data [JPA](https://spring.io/projects/spring-data-jpa)
-   Spring Data [MongoDB](https://spring.io/projects/spring-data-mongodb).

# [](#what-you-get)What you get

By leveraging the general [Spring AOT](https://docs.spring.io/spring-framework/reference/7.0/core/aot.html) infrastructure, we have a lot of insight into your application's configuration allowing for better integration than it would be possible with an annotation processor. A pre-initialized application context configuration for AOT processing gives us access to all registered beans, their types and properties, capturing your opinions and configuration. As you can imagine, this insight is crucial when you want to work with integrations like Data JDBC: While targeting standard SQL, the JDBC module needs to be aware of potential specifics of the target database that often come with their very own dialect deviations. Having access to registered beans, like the `JdbcDialect`, makes it possible to generate the right statements.

So when we look at the generated code, it shares common principles with the individual modules while sticking as close as possible to the underlying technology.

Just as each Spring Data module is specific to its target technology, so is the generated code. A simple query method like `findByLastnameStartingWith` in *JDBC* looks way different from the one generated for *JPA* or *Apache Cassandra*:

*Spring Data JDBC*

```java
Copypublic List<User> findByLastnameStartingWith(String lastname) {
  Criteria criteria = Criteria.where("lastname").like(escape(lastname) + "%");
  StatementFactory.SelectionBuilder builder = getStatementFactory().select(User.class).filter(criteria);

  RowMapper rowMapper = getRowMapperFactory().create(User.class);
  List result = (List) builder.executeWith((sql, paramSource) -> getJdbcOperations().query(sql, paramSource, new RowMapperResultSetExtractor<>(rowMapper)));
  return (List<User>) convertMany(result, User.class);
}
```

*Spring Data JPA*

```java
Copypublic List<User> findByLastnameStartingWith(String lastname) {
  String queryString = "SELECT u FROM example.springdata.aot.User u WHERE u.lastname LIKE :lastname ESCAPE '\\'";
  Query query = entityManager.createQuery(queryString);
  query.setParameter("lastname", "%s%%".formatted(lastname));

  return (List<User>) query.getResultList();
}
```

*Spring Data for Apache Cassandra*

```java
Copypublic List<User> findByLastnameStartingWith(String lastname) {
  Query query = Query.query(Criteria.where("lastname").like(lastname + "%"));

  ExecutableSelectOperation.TerminatingSelect<User> select = operations.query(User.class).matching(query);
  return select.all();
}
```

AOT Repositories are generated and mounted by default when building with general Spring AOT support. You may opt out of generating repository code via `spring.aot.repositories.enabled=false` or select single modules like `spring.aot.jdbc.repositories.enabled=false` if you wish.

To actually use them, your application must be started in AOT mode (either by using the `spring.aot.enabled` property or as GraalVM Native Image).

But, let us also have a look at some of the advantages for development and debugging.

# [](#debuggability-and-metadata)Debuggability and Metadata

AOT generated repositories not only explain in code how your query is being executed, but you can also set breakpoints in your IDE to debug statements when needed.

Following the line of thought of knowing what the queries look like during AOT processing, we've introduced a JSON metadata representation for your Spring Data interfaces. Like for the above repository, let's call it `UserRepository` for now, Spring Data generates a `UserRepository.json` resource that resides in the same package as your repository interface. That particular file contains information about query methods, which implementation they are targeting and what query they will run. It can be used for documentation purposes, but can also be read by your favorite IDE to display additional information while you're still developing.

*Spring Data JDBC*

```json
Copy{
 "name": "example.springdata.UserRepository",
 "module": "JDBC",
 "type": "IMPERATIVE",
 "methods": [
 {
   "name": "findByLastnameStartingWith",
   "signature": "public abstract List<User> UserRepository.findByLastnameStartingWith(String)",
   "query": {
     "query": "SELECT 'USER'.'ID' AS 'ID', 'USER'.'LAST_NAME' AS 'LAST_NAME', 'USER'.'FIRST_NAME' AS 'FIRST_NAME' FROM 'USER' WHERE 'USER'.'LASTNAME' LIKE :name"
   }
 }
 //...
```

*Spring Data JPA*

```json
Copy{
 // ...
 "query": {
   "query": "SELECT u FROM example.springdata.User u WHERE u.lastname LIKE ?1 ESCAPE '\\'"
 }
}
```

*Spring Data for Apache Cassandra*

```json
Copy{
 // ...
 "query": {
   "query": "SELECT * FROM users WHERE last_name LIKE ?"
 }
}
```

You can optionally disable metadata generation by setting `spring.aot.repositories.metadata.enabled=false`.

# [](#aot-cache-and-project-leyden)AOT Cache and Project Leyden

Generating repository code upfront not only has debuggability benefits but also goes very well with recent developments in the latest Java releases. Unlike runtime-generated pieces that make things work, pre-generated repositories can be seen and analyzed by the JVM during an [AOT Cache](https://openjdk.org/jeps/483) training run. This helps you reduce startup times by serving repository implementations already fully loaded and linked from the Java shared objects file.

```
Copy[info][class,load] example.springdata.aot.UserRepositoryImpl__AotRepository source: shared objects file
```

A well known feature of especially the Spring Data NoSQL implementations is their object mapping capabilities. Not so well known is the fact that at runtime, Spring Data will try to optimize creating new instances and accessing properties of your domain objects by generating bytecode that uses `MethodHandle` to improve load/save performance.

Collecting information about your domain model paved the way for generated bytecode inclusion that is used for property accessors and entity instantiators at build time. Having generated bytecode already available removes the need to use runtime optimizations. Additionally, captured entity instantiators and property accessors are packaged into the bundled JAR and therefore available through the class loader directly serving things even more efficiently.

```
Copy[info][class,load] example.springdata.User__Instantiator_cu2hga source: shared objects file
[info][class,load] example.springdata.User__Accessor_cu2hga source: shared objects file
```

# [](#any-downsides)Any downsides?

Obviously, computation time does not simply disappear, it shifts to somewhere else. In this case, to the build phase. So yes, analyzing the application and preparing the data, as well as doing JVM training runs takes time and potentially requires changes to your build and deployment pipeline. You also trade certain dynamic aspects of the framework for less memory consumption and faster startup times. Parts of your configuration need to be frozen when opting in for AOT. Remember the `JdbcDialect` from earlier? That's exactly one of those frozen spots since you cannot generate SQL optimized for one database and switch to the other as if nothing has changed.

Also Ahead of Time repositories do currently only support imperative repository interfaces. Reactive ones will not trigger any code generation.

If you're curious, you may just build and run your application with `spring.aot.enabled` or head over to our [Spring Data Examples](https://github.com/spring-projects/spring-data-examples) where we already prepared demo applications for you to try.

In any case, you can always fall back to starting your application without the `spring.aot.enabled` flag, which will disable all Ahead of Time enhancements. This enables you to build and test the application in AOT mode while having a back off strategy built in.

We're excited to see how you leverage Ahead of Time features.  
And, as always, your feedback matters! So, we're looking forward to hearing from you and your experiences on ways to improve.