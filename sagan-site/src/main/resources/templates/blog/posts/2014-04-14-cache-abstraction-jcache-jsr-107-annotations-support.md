---
title: Cache Abstraction: JCache (JSR-107) Annotations Support
source: http://spring.io/blog/2014/04/14/cache-abstraction-jcache-jsr-107-annotations-support
scraped: 2026-02-23T22:25:18.407Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Stéphane Nicoll |  April 14, 2014 | 15 Comments
---

# Cache Abstraction: JCache (JSR-107) Annotations Support

_Engineering | Stéphane Nicoll |  April 14, 2014 | 15 Comments_

Spring's caching abstraction is available [as from Spring 3.1](https://spring.io/blog/2011/02/23/spring-3-1-m1-cache-abstraction) and it was about time to show it some more love. In this post, I want to walk you through the major improvement in that area which is the JCache (JSR-107) annotations support.

As you may have heard, [JSR-107 went final after all](https://blogs.oracle.com/theaquarium/entry/jcache_is_final_i_repeat), 13 years after the initial proposal. For those who are familiar with Spring’s caching annotations, the following table describes the mapping between the Spring annotations and the JSR-107 counterpart:

Spring

JSR-107

`@Cacheable`

`@CacheResult`

`@CachePut`

`@CachePut`

`@CacheEvict`

`@CacheRemove`

`@CacheEvict(allEntries=true)`

`@CacheRemoveAll`

# [](#jcache-annotations)JCache annotations

Let's first look at each annotation and describe how they can be used. This will be a chance to better understand what they support with regards to what you've been used to with the Spring annotations and more importantly the **new** features that these annotations bring.

## [](#cacheresult)@CacheResult

`@CacheResult` is fairly similar to `@Cacheable`, the following rewrites [the original example](https://spring.io/blog/2011/02/23/spring-3-1-m1-cache-abstraction) using the `@CacheResult` annotation:

```java
Copy@CacheResult(cacheName = "books")
public Book findBook(ISBN isbn) {...}
```

Keys generation can be customized using the `CacheKeyGenerator` interface. If no specific implementation is specified, the default implementation, *per* spec, takes all parameters unless one or more parameters are annotated with the `@CacheKey` annotation, in which case only those are used. Assuming that the method above needs now an extra attribute that should not be part of the key, this is how we would write it with JCache:

```java
Copy@CacheResult(cacheName = "book")
public Book findBook(@CacheKey ISBN isbn, boolean checkWarehouse) { ... }
```

`@CacheResult` brings the concept of *exception* cache: whenever a method execution failed, it is possible to *cache* the exception that was raised to prevent calling the method again. Let’s assume that `InvalidIsbnNotFoundException` is thrown if the structure of the ISBN is invalid. This is a permanent failure, no book could ever be retrieved with such parameter. The following caches the exception so that further calls with the same, invalid ISBN, throws the cached exception directly instead of invoking the method again.

```java
Copy@CacheResult(cacheName = "books", exceptionCacheName = "failures"
             cachedExceptions = InvalidIsbnNotFoundException.class)
public Book findBook(@CacheKey ISBN isbn) { ... }
```

Of course, blindly throwing a cached exception might be very confusing as the call stack may not match with the current invocation context. We do our best to make sure the stacktrace matches by copying the exception with a consistent call stack.

JCache has this cool notion of `CacheResolver` that permits to resolve the cache to use at runtime. Because JCache supports regular caches and exception caches, the `CacheResolver` instances to use are determined by a `CacheResolverFactory`. The obvious default is to resolve the cache to use based on the `cacheName` and `exceptionCacheName` attributes, respectively. However, it is also possible to customize the factory to use per operation.

```java
Copy@CacheResult(cacheName = "books", cacheResolverFactory = MyFactory.class)
public Book findBook(@CacheKey ISBN isbn) { ... }
```

Finally, `@CacheResult` has a `skipGet` attribute that can be enabled to *always* invoke the method regardless of the status of the cache. This is actually quite similar to our own use of `@CachePut`.

## [](#cacheput)@CachePut

While the annotations have the same name, the semantic in JCache is fairly different. A simple update for our book would be written like this

```java
Copy@CachePut(value = "books", key = "#p0")
public Book update(ISBN isbn, Book updatedBook) { ... }
```

While JCache would require you to write it like this

```java
Copy@CachePut(cacheName = "books")
public void update(ISBN isbn, @CacheValue Book updatedBook) { ... }
```

Note that even though `updatedBook` should not be part of the key, we didn't have to add a `@CacheKey` to the first argument. This is because the parameter annotated with `@CacheValue` is automatically excluded from the key generation.

As for `@CacheResult`, `@CachePut` allows to manage any exception that is thrown while executing the method, preventing the put operation to happen if the thrown exception matches the filter specified on the annotation.

Finally, it is possible to control if the cache is updated before or after the invocation of the annotated method. Of course, if it is updated before, no exception handling takes place.

## [](#cacheremove-and-cacheremoveall)@CacheRemove and @CacheRemoveAll

These are really similar to `@CacheEvict` and `@CacheEvict(allEntries = true)` respectively. `@CacheRemove` has a special exception handling to prevent the eviction if the annotated method throws an exception that matches the filter specified on the annotation.

# [](#other-features)Other features

## [](#cachedefaults)CacheDefaults

`@CacheDefaults` is a class-level annotation that allows you to *share* common settings on any caching operation defined on the class. These are:

-   The name of the cache
-   The custom `CacheResolverFactory`
-   The custom `CacheKeyGenerator`

In the sample below, any cache-related operation would use the `books` cache:

```java
Copy@CacheDefaults(cacheName = "books")
public class BookRepositoryImpl implements BookRepository {

    @CacheResult
    public Book findBook(@CacheKey ISBN isbn) { ... }
}
```

# [](#enabling-jsr-107-support)Enabling JSR-107 support

The implementation of the JCache support uses our own `Cache` and `CacheManager` abstraction which means that you can use your existing `CacheManager` infrastructure, and yet use standard annotations!

To enable the support of Spring caching annotations, you are used to either `@EnableCaching` or the `<cache:annotation-driven/>` xml element, for instance something like:

```java
Copy@Configuration
@EnableCaching
public class AppConfig {
    @Bean
    public CacheManager cacheManager() { ...}

    ...
}
```

So, what does it take to bring the support of standard annotations into the mix? Well, not much. Just add the JCache API and the `spring-context-support` module in your classpath if you haven't already and you'll be set.

The existing infrastructure actually looks for the presence of the JCache API and when found alongside Spring's JCache support, it will also configure the necessary infrastructure to support the standard annotations.

#Wrapping up

Long story short, if you are already using Spring's caching abstraction and you'd like to try the standard annotations, adding two more dependencies to your project is all that would be needed to get started.

Want to give it a try? Grab a nightly SNAPSHOT build of Spring 4.1 and add the `javax.cache:cache-api:1.0.0` and `org.springframework:spring-context-support:4.1.0.BUILD-SNAPSHOT` dependencies to your project. The [documentation](http://docs.spring.io/spring/docs/4.1.0.BUILD-SNAPSHOT/spring-framework-reference/html/cache.html) has also been updated in case you need more details.

In a next post, I'll cover how supporting JSR-107 annotations affected our own support as well as some other cache-related improvements.