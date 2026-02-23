---
title: Announcing ListCrudRepository & Friends for Spring Data 3.0
source: https://spring.io/blog/2022/02/22/announcing-listcrudrepository-friends-for-spring-data-3-0
scraped: 2026-02-23T12:50:23.054Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Jens Schauder |  February 22, 2022 | 0 Comments
---

# Announcing ListCrudRepository & Friends for Spring Data 3.0

_Engineering | Jens Schauder |  February 22, 2022 | 0 Comments_

The Spring Data [`CrudRepository`](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/repository/CrudRepository.html) has various methods that return multiple instances of the entity managed by the repository. It does so by using [`Iterable`](https://docs.oracle.com/javase/8/docs/api/java/lang/Iterable.html) and not `List`, as one might expect. In many cases, that is of no consequence, since you typically want to iterate over the result anyway. However, you might occasionally prefer a `List`. In these cases, `Iterable` is annoying.

I will write more about why that choice was made in the first place and how you can deal with it as long as you are on Spring Data 2.x. However, let me get the good news out first:

## [](#repositories-returning-lists)[](#repositories-returning-lists)Repositories returning Lists

Spring Data 3.0.0 now offers a `ListCrudRepository` in the latest snapshot releases, which returns a `List` where `CrudRepository` returns an `Iterable`.

Example 1. CrudRepository versus ListCrudRepository

```
Copy@NoRepositoryBean
public interface CrudRepository<T, ID> extends Repository<T, ID> {

	<S extends T> S save(S entity);

	<S extends T> Iterable<S> saveAll(Iterable<S> entities);

	Optional<T> findById(ID id);

	boolean existsById(ID id);

	Iterable<T> findAll();

	Iterable<T> findAllById(Iterable<ID> ids);

	long count();

	void deleteById(ID id);

	void delete(T entity);

	void deleteAllById(Iterable<? extends ID> ids);

	void deleteAll(Iterable<? extends T> entities);

	void deleteAll();
}

@NoRepositoryBean
public interface ListCrudRepository<T, ID> extends CrudRepository<T, ID> {

	<S extends T> List<S> saveAll(Iterable<S> entities);

	List<T> findAll();

	List<T> findAllById(Iterable<ID> ids);
}
```

## [](#splitting-the-sorting-repositories)[](#splitting-the-sorting-repositories)Splitting the Sorting Repositories

The popular `PagingAndSortingRepository` used to extend from `CrudRepository`, but it no longer does. This lets you combine it with either `CrudRepository` or `ListCrudRepository` or a base interface of your own creation. This means you now have to explicitly extend from a CRUD fragment, even when you already extend from `PagingAndSortingRepository`.

Example 2. Paging and sorting repository — Version 2.x

```
Copypublic interface PersonRepository<Person, Long> extends PagingAndSortingRepository<Person, Long> {}
```

Example 3. Paging and sorting repository — Version 3.x

```
Copypublic interface PersonRepository<Person, Long> extends PagingAndSortingRepository<Person, Long>, ListCrudRepository<Person, Long> {}
```

There are also other interfaces that return `Iterable<T>` and that now got a companion interface that returns `List<T>`.

Fragment Interface returning `Iterable`

New fragment interface returning `List`

`QuerydslPredicateExecutor`

`ListQuerydslPredicateExecutor`

`QueryByExampleExecutor`

`ListQueryByExampleExecutor`

Also, similar to `PagingAndSortingRepository`, other sorting repository interfaces used to extend their respective CRUD variant but no longer do so.

Sorting fragment Interface

CRUD repository it no longer extends

`ReactiveSortingRepository`

[`ReactiveCrudRepository`](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/repository/reactive/ReactiveCrudRepository.html)

`CoroutineSortingRepository`

`CoroutineCrudRepository`

`Rx3JavaSortingRepository`

[`Rx3JavaCrudRepository`](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/repository/reactive/RxJava3SortingRepository.html)

This means that, when you use any of these interfaces as the basis for your Spring Data repositories, you now need to additionally extend the respective CRUD repository (assuming you are actually interested in using the CRUD functionality of it).

## [](#what-about-2x)[](#what-about-2-x)What about 2.x?

If you are not ready to jump onto 3.0.0 snapshots, you still have all the [existing options](https://stackoverflow.com/a/67413334/66686) to avoid dealing with `Iterable` as a return value.

1.  You need not extend `CrudRepository`. You can instead use `Repository`, which does not have any methods. Now you can add only the methods that you actually want with the return types you want. If they match those in `CrudRepository` but return `Collection` or `List` instead of `Iterable` Spring Data, takes care of the conversion for you. Also, in most cases, you probably do not really need `deleteAll` in production, right?
    
2.  If you want all methods of `CrudRepository` but want `Iterable` to be replaced by something else, you may do so by extending `CrudRepository` and overwriting the methods that you want to have changed.
    
3.  Instead of doing this in every repository interface that you declare, you can create you own base repository interface. For this approach, use the same approach as above but annotate it with [`@NoRepositoryBean`](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/repository/NoRepositoryBean.html) so that Spring Data does not try to create an implementation for it. Your actual repository interfaces can now extend from this interface. The popular [`JpaRepository`](https://docs.spring.io/spring-data/jpa/docs/current/api/org/springframework/data/jpa/repository/JpaRepository.html) is one such interface.
    
4.  In the same way as above, you might use [`Streamable`](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/util/Streamable.html) as the return type, which is an `Iterable` but offers [direct conversion methods to `Stream`](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/util/Streamable.html#stream--), [`List`](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/util/Streamable.html#toList--), and [`Set`](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/util/Streamable.html#toSet--).
    
5.  If you do not want to touch the repositories, you can use [`Streamable` to convert from `Iterable`](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/util/Streamable.html#of-java.lang.Iterable-) to an interface of `Stream`, `List`, or `Set`.
    

## [](#why-iterable-in-the-first-place)[](#why-iterable-in-the-first-place)Why Iterable in the first place?

1.  The methods of `CrudRepository` need to get implemented by every Spring Data implementation. Therefore, it is not only an API for users of Spring Data but also an SPI for those that provide a Spring Data module. Also, such a module might not want to populate a full list before returning it but, instead, return an `Iterable` quickly while still loading and processing data.
    
2.  If `CrudRepository` returns a `List`, you could not overwrite its methods to return a `Streamable`, `Set`, `Collection`, or `Iterable`.
    
3.  `Streamable` would have been a great return type, since it combines flexibility with usability. Unfortunately it would force a Spring interface into your domain model, which many consider a no go or at least a code smell.
    

Also, once `Iterable` was out there, it became hard or even impossible to change the API without breaking existing code. So finding a solution with better usability while limiting the breakage caused by the change took some time.

We hope you like the solution, and we are confident that you will let us know what you think.