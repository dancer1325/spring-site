---
title: Spring Data JPA introduces query parser!
source: https://spring.io/blog/2023/03/21/spring-data-jpa-introduces-query-parser
scraped: 2026-02-23T10:00:59.423Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Greg L. Turnquist |  March 21, 2023 | 8 Comments
---

# Spring Data JPA introduces query parser!

_Engineering | Greg L. Turnquist |  March 21, 2023 | 8 Comments_

## [](#the-problem)The Problem

One of Spring Data JPA’s handy features is letting you plugin in custom JPA queries through its `@Query` annotation.

This allows some flexiblity because you are still able to offer sort parameters to the consumers of your app. Check out the example below:

```java
Copyinterface SampleRepository extends CrudRepository<Employee, Long> {

    @Query("select e from Employee e where e.firstName = :firstName")
    List<Employee> findCustomEmployees(String firstName, Sort sort);

}
```

Spring Data JPA will turn this custom query into a JPA query when provided not just with a criteria (`firstName`) but also a custom sort via `findCustomEmployees("Alice", Sort.by("lastName"))`, into the following fully fledged query:

```jpql
Copyselect e
from Employee e
where e.firstName = :firstName
order by e.lastName
```

On top of that, Spring Data JPA supports paging, which requires the ability to count result sets.

In the past, with more and more complex queries, our ability to "do the right thing" and apply "order by" clauses that properly point to the primary SELECT clause's alias value has been challenging to say the least.

It is also tricky to wrap the projection with a proper `count()` function. Imagine doing this when there subqueries, case statements, and other deep queries!

## [](#the-solution)The Solution

We are excited to announce the release of both HQL and JPQL parsers, which will make it easier for you to customize queries in your Spring Data JPA applications.

Using both the JPA and Hibernate specifications, we have developed ANTLR-based query parsing engines and use them to more properly apply the customizations needed to serve you.

Not only can we spot the "right place" to put that `count()` function and also harvest the primary `FROM` expression's alias, it becomes possible to detect semantic situations.

With a query parser, it is much easier spot valid vs. invalid queries. Sometimes, we spend MORE time working out whether a query is even correct before figuring out how to handle it properly.

## [](#how-do-i-use-it)How do I use it?

Good news...it's automatically applied.

When using the `@Query` annotation, there is a key parameter: `isNative`. This boolean flag lets you signal whether you are writing native SQL (`isNative=true`) or a JPA query (`isNative=false` by default).

If you have a JPA query (`isNative=false`) and Hibernate is on the classpath, it will use our new HQL parser. If Hibernate is NOT on the classpath, it will fallback to the somewhat limited JPQL parser. (Limited by specification, not our implementation.)

And thus, all you must do is either pick up our latest snapshot release of the Spring Data release train (Spring Data 3.1 snapshots) or pick up the next milestone release of Spring Boot.

## [](#whats-next)What's next?

There are more features to add. For example, it's possible to have more complex aliasing, such as:

```
Copyselect AVG(e.timeToCloseTickets) as avg
from Employee e
```

This type of query when you apply a `Sort.by("avg")` should NOT yield an `order by e.avg`, but instead simply `order by avg`. There are other scenarios we are looking into adding support. But with these query parsers in place, it becomes much easier to support these situations.

We also have a backlog of tickets related to query parsing that we can now work through.

## [](#bonus)BONUS

As a bonus, if you are wanting to pre-check our own custom queries, it's possible with today's tooling to get a peek.

If you use IntelliJ IDEA, there is an ANTLR plugin ([https://plugins.jetbrains.com/plugin/7358-antlr-v4](https://plugins.jetbrains.com/plugin/7358-antlr-v4)) that when installed, lets you run any ANTLR grammar file and test against it.

1.  Install IntelliJ IDEA's ANTLR plugin.
2.  Clone Spring Data JPA's source repository.
3.  Find `src/main/antlr4/org/springframework/data/jpa/repository/query/Hql.g4`.
4.  Right-click "start" and select "Test rule start"
5.  Enter your query in the box on the left, and check out the AST in the window pane on the right.

![IntelliJ IDEA with ANTLR plugin showing a query](https://static.spring.io/blog/contentful/20240923/Screen_Shot_2023-03-14_at_11.08.01_AM.png)

(We recently asked for people to send in their craziest JPA queries and this is one of them. At a glance, the query is valid and you can even zoom in to see more of it.)

Cheers, --Greg Turnquist