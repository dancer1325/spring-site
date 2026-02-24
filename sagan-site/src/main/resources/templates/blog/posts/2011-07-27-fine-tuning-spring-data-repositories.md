---
title: Fine-tuning Spring Data repositories
source: https://spring.io/blog/2011/07/27/fine-tuning-spring-data-repositories
scraped: 2026-02-24T08:37:48.806Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oliver Drotbohm |  July 27, 2011 | 0 Comments
---

# Fine-tuning Spring Data repositories

_Engineering | Oliver Drotbohm |  July 27, 2011 | 0 Comments_

It's only been a few days only since we've released Spring Data JPA 1.0 GA which is the first major version of a [Spring Data](http://www.springsource.org/spring-data) project shipping with an implementation of the repository abstraction inside our Spring Data Commons module. The repository abstraction consists of three major parts: defining a repository interface, exposing CRUD methods and adding query methods. Adding query methods was discussed in detail in the [first Spring Data JPA blog post](http://blog.springsource.com/2011/02/10/getting-started-with-spring-data-jpa/). But defining a repository interface and exposing CRUD methods triggered quite some questions in earlier blog posts. That's why will have a closer look at them right now discussing the options available to users.

## Declaring a Spring Data repository interface

The declaration of a repository interface can be done in two ways: using annotations or by extending a marker interface:

```java
Copy
@RepositoryDefinition(domainClass=Customer.class, idClass=Long.class)
public interface CustomerRepository {
  // declare query methods
}

public interface AccountRepository extends Repository<Account, Long> {
  // declare query methods
}
```

Which style to pick is pretty much a matter of taste. Purists who like to reduce the dependencies of there code as much as possible will probably stick to the annotation based approach but the inheritance based one is actually more consistent to the rest of the programming model. Whatever approach you choose, the Spring Data infrastructure will understand how to implement repository methods defined in these interfaces.

## CRUD methods

The next step you might wanna do is exposing CRUD methods. To aid in doing so we provide two separate interfaces: [`CrudRepository`](http://static.springsource.org/spring-data/data-commons/docs/1.1.0.RELEASE/api/org/springframework/data/repository/CrudRepository.html) and [`PagingAndSortingRepository`](http://static.springsource.org/spring-data/data-commons/docs/1.1.0.RELEASE/api/org/springframework/data/repository/PagingAndSortingRepository.html) where the latter extends the former. As the name suggests `CrudRepository` exposes basic CRUD methods like `T save(T entity)`, `T findOne(ID id)` and `void delete(T entity)`. `PagingAndSortingRepository` exposes methods to do pagination out of the box, like `Page findAll(Pageable pageable)`. To expose these methods to your clients simply extend these interfaces like this:

```java
Copypublic interface CustomerRepository extends PagingAndSortingRepository<Customer, Long> {
  // declare query methods here
}
```

## Fine-tuning repository interfaces

Extending the previously shown interfaces is quite neat for a quick start but has a significant downside: you expose a pre-defined set of operations to clients that are not under you control, it's pretty much all or nothing until now. There's seemingly no way to only expose read operations while hiding state changing operations entirely.

To circumvent this issue we allow you to define custom base interfaces for your repositories where you can selectively expose the CRUD methods you like:

```java
Copy
@NoRepositoryBean
public interface ReadOnlyRepository<T, ID extends Serializable> extends Repository<T, ID> {
  T findOne(ID id);
  Iterable<T> findAll();
  Iterable<T> findAll(Sort sort);
  Page<T> findAll(Pageable pageable);
}
```

There are a few crucial things to consider here: First, the intermediate interface has to be a Spring Data repository interface as well, which means it either has to be annotated with `@RepositoryDefinition` or extend `Repository` as shown here. You should also annotate the interface with `@NoRepositoryBean` to prevent an interface with formal type parameters `T` and `ID` from being picked up by the Spring Data classpath scanning. The last - and probably most crucial - part is that the method signatures have to match the ones in `CrudRepository` or `PagingAndSortingRepository`. Your actual repository interface would then look like this:

```java
Copypublic interface CustomerRepository extends ReadOnlyRepository<Customer, Long> {
  // declare query methods here
}
```

As the repository implementations backing the proxy created for that interface implement the methods declared in your custom intermediate interface we can route the calls to those into the implementations. You can even declare shared query methods inside a shared base interface:

```java
Copy@NoRepositoryBean
public interface NamedRepository<T, ID extends Serializable> extends ReadOnlyRepository<T, ID> {
  List<T> findByName(String name);
}

public interface CustomerRepository extends NamedRepository<Customer, Long> { … }

public interface PersonRepository extends NamedRepository<Person, Long> { … }
```

This assumes `Customer` and `Person` share a `name` property (not necessarily through inheritance). since the query will be automatically derived from the method name then. It's even possible to manually define the queries executed for both concrete repositories by simply declaring JPA named queries `Customer.findByName` and `Person.findByName`. Using this approach you can easily come up with tailor-made base interfaces for your application scenario.

## Technology specific interfaces

This leaves us with the question of when to use the technology specific base interfaces like [`JpaRepository`](http://static.springsource.org/spring-data/data-jpa/docs/1.0.0.RELEASE/api/org/springframework/data/jpa/repository/JpaRepository.html). The first reason might be just the quick-start one: it exposes `List`\-based read methods (e.g. `List findAll()`) which developers using JPA are probably more used to as well as all the CRUD methods derived from it's super interfaces. We also expose some JPA specific methods here as some client's might need to call them. We actually recommend not to expose technology specifics to clients but sometimes it's simply pragmatism over theory. All these specialties can be exposed through a custom base interface as well (redeclare read methods returning `List`s, exposing JPA-specific methods), so you pretty much choose what's the least possible effort in your specific situation.

So if you want to get started with the repository abstraction of Spring Data feel free to have a look at our example projects for [JPA](https://github.com/SpringSource/spring-data-jpa-examples) and [Mongo](https://github.com/SpringSource/spring-data-document-examples) at Github.