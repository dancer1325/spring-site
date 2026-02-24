---
title: Further Cache Improvements in Spring 4.1
source: http://spring.io/blog/2014/06/16/further-cache-improvements-in-spring-4-1
scraped: 2026-02-23T22:24:41.982Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Stéphane Nicoll |  June 16, 2014 | 3 Comments
---

# Further Cache Improvements in Spring 4.1

_Engineering | Stéphane Nicoll |  June 16, 2014 | 3 Comments_

This post is a follow-up of my earlier [post related to JSR-107](http://spring.io/blog/2014/04/14/cache-abstraction-jcache-jsr-107-annotations-support). Adding JSR-107 support gave us the opportunity to review our own and see how the two can live happily together. Spring 4.1 also contains a series of improvements reported by the community.

I am also happy to announce that a new getting started guide dedicated to the cache abstraction has been published, check [Caching Data with Spring](http://spring.io/guides/gs/caching/)!

# [](#cacheresolver)CacheResolver

One of the nicest features we found in JSR-107 was the ability to resolve the cache to use at runtime, that is based on the actual method execution. So far, our own support was relying on cache name(s) being specified at the annotation (or aspect definition) level. Several issues were raised to report that when more than one `CacheManager` is used, it is required to be able to customize the manager to which those names were resolved to.

What we did ultimately was creating a similar `CacheResolver` abstraction to give the most flexible options. As you might suspect, the default implementation takes a `CacheManager` and resolves the cache(s) to use based on the provided cache names. Because such names are no longer required, Spring 4.1 allows you to write the following:

```java
Copy@Cacheable
public Book findBook(ISBN isbn) {...}
```

Of course, you have to specify your own `CacheResolver` that knows what to do with this particular invocation or you need to provide the cache(s) to use in a different manner (keep reading).

Just as the `value` attribute of the annotation is no longer required, the `CacheManager` may be omitted as long as a `CacheResolver` is set. You may actually have an implementation of it that does not rely on the `CacheManager` at all if you are managing your `Cache` instances in a different way.

# [](#operation-level-customizations)Operation-level customizations

The community also reported that they wanted to be able to control the cache behaviour in a much more fine-grained manner. Spring 4.1 allows you to specify the `CacheResolver` (or `CacheManager`) and `KeyGenerator` to use per operation.

For instance, the following applies a custom `KeyGenerator` to that specific operation

```java
Copy@Cacheable(value="book", keyGenerator="myKeyGenerator")
public Book findBook(ISBN isbn, boolean checkWarehouse, boolean includeUsed)
```

This looks for a `KeyGenerator` bean with name `myKeyGenerator`. CacheManager and cache resolver instances can be set in a similar fashion.

# [](#class-level-customizations)Class-level customizations

Another community feedback was the ability to share those customizations at method level **without** enabling any default cache behaviour. Meet `@CacheConfig` which provides the same customizations at class-level, i.e. cache names, `CacheResolver` (or `CacheManager`) and `KeyGenerator`.

```java
Copy@CacheConfig(cacheNames="book", keyGenerator="myKeyGenerator") 
public class BookRepository {

    @Cacheable
    public Book findBook(ISBN isbn) {...}

    public Book thisIsNotCached(String someArg) {...}
}
```

# [](#jcache-integration)JCache integration

One of the main goal when we implemented the JSR-107 support was to leverage what we already had in our own abstraction so that existing apps can transition in a very smooth manner. JCache support actually uses Spring's caching abstraction internally which allows you to reuse your existing caching infrastructure with the standard annotations. When you specify a JSR-107 customization component such as a `javax.cache.annotation.CacheResolver` or a `javax.cache.annotation.CacheKeyGenerator`, we route it through our abstraction using an adapter.

What that means concretely is that you can keep your existing infrastructure and chose whichever mechanism you want. For instance, you can have a `ConcurrentMapCacheManager` that uses `ConcurrentHashMap` behinds the scenes with the standard JSR-107 annotations.

If you want to try that, check [this fork of the guide](https://github.com/snicoll/gs-caching/tree/jsr-107) that uses JCache instead of the Spring annotations (commit [32fea97](https://github.com/snicoll/gs-caching/commit/32fea97e3e0a5031c2e9f124ae0ab5b2f58aa617) shows what was actually changed)

# [](#wrapping-up)Wrapping Up

Spring 4.1 is due this summer and it will provide a major enhancement of its caching abstraction; adding support for JSR-107 helped us to further improve that. There are other small enhancements that were not covered in this post such as a better exception handling and a convenient `putIfAbsent` method on the `Cache` interface.

As always, we welcome community feedback, please try these features and let us know if you run into any issue.