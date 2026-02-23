---
title: Ever wanted to rewrite a query in Spring Data JPA?
source: https://spring.io/blog/2022/05/02/ever-wanted-to-rewrite-a-query-in-spring-data-jpa
scraped: 2026-02-23T12:42:52.733Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Greg L. Turnquist |  May 02, 2022 | 5 Comments
---

# Ever wanted to rewrite a query in Spring Data JPA?

_Engineering | Greg L. Turnquist |  May 02, 2022 | 5 Comments_

Sometimes, no matter how many features you try to apply, it seems impossible to get Spring Data JPA to apply every thing you’d like to a query before it is sent to the `EntityManager`.

With `3.0.0-SNAPSHOT` (and targeted for the next milestone release train of Spring Data), you now have the ability to get your hands on the query, right before it’s sent to the `EntityManager` and "rewrite" it. That is, you can make any alterations at the last moment.

Check it out below:

Example 1. Declare a QueryRewriter using `@Query`

```
Copypublic interface MyRepository extends JpaRepository<User, Long> {

    @Query(value = "select original_user_alias.* from SD_USER original_user_alias",
                    nativeQuery = true, queryRewriter = MyQueryRewriter.class) // (1)
    List<User> findByNativeQuery(String param);

    @Query(value = "select original_user_alias from User original_user_alias",
                   queryRewriter = MyQueryRewriter.class) // (2)
    List<User> findByNonNativeQuery(String param);
}
```

1.  This pure SQL query (thanks to `nativeQuery`) will get routed through yet-to-be-defined `MyQueryRewriter` before the query is invoked.
    
2.  This JPQL query will also get routed through the same `MyQueryRewriter` before it’s handed over to the `EntityManager`.
    

You can then write your own ticket, as shown below!

Example 2. Example `QueryRewriter`

```
Copypublic class MyQueryRewriter implements QueryRewriter {

    @Override
    public String rewrite(String query, Sort sort) {
        return query.replaceAll("original_user_alias", "rewritten_user_alias");
    }
}
```

Okay, this one is a tad contrived. We are basically changing the name of a particular query’s alias. But you can really do anything you can think of. This hook gives you a chance to change a little (or a lot!).

Just be sure to register an instance `MyQueryRewriter` in the application context. Whether you use one of Spring Framework’s `@Component`\-based annotations, or you supply it through a `@Bean` method inside an `@Configuration` class, the choice is yours.

Warning

Your `QueryRewriter` is invoked after any and all checks have been performed by Spring Data JPA. You’re responsible for supplying a valid query to the `EntityManager`.

But wait…​there’s more!

While you can write your `QueryRewriter` as a separate bean, it’s also possible to put right inside the repository where it’s used!

Example 3. Repository that provides the `QueryRewriter`

```
Copypublic interface MyRepository extends JpaRepository<User, Long>,
                                   QueryRewriter { // (1)

    @Query(value = "select original_user_alias.* from SD_USER original_user_alias",
                   nativeQuery = true, queryRewriter = MyRepository.class) // (2)
    List<User> findByNativeQuery(String param);

    @Query(value = "select original_user_alias from User original_user_alias",
                   queryRewriter = MyRepository.class) // (3)
    List<User> findByNonNativeQuery(String param);

    @Override
    default String rewrite(String query, Sort sort) { // (4)
        return query.replaceAll("original_user_alias", "rewritten_user_alias");
    }
}
```

1.  Have your repository interface extend the `QueryRewriter` interface.
    
2.  Plug in the name of your repository into the native query’s `@Query.queryRewriter` entry.
    
3.  Plug in the name of your repository into the JPQL query’s `@Query.queryRewriter` entry.
    
4.  Override the `rewrite(String,Sort)` method and plugin a `default` value, and **POOF** you’re done!
    

Fair warning: it’s possible you may need more than one rewriter based on what exactly you’re doing.

Spring Data JPA supports not only Spring’s application context, but CDI-based environments.

Happy querying!

\-Greg Turnquist