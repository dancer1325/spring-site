---
title: Cache auto-configuration in Spring Boot 1.3
source: https://spring.io/blog/2015/06/15/cache-auto-configuration-in-spring-boot-1-3
scraped: 2026-02-23T19:49:30.967Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Stéphane Nicoll |  June 15, 2015 | 5 Comments
---

# Cache auto-configuration in Spring Boot 1.3

_Engineering | Stéphane Nicoll |  June 15, 2015 | 5 Comments_

Over the past year, we have significantly improved the cache abstraction, with support of [JSR-107 (JCache) annotations](https://spring.io/blog/2014/04/14/cache-abstraction-jcache-jsr-107-annotations-support) and a [better declarative model to share or externalize common settings](https://spring.io/blog/2014/06/16/further-cache-improvements-in-spring-4-1). In Spring Boot 1.3, we now offer a comprehensive auto-configuration for it.

In a nutshell, the cache abstraction applies caching to methods, thus reducing the number of executions based on the information available in the cache. The caching logic is applied transparently: the method below will only be invoked if the specified `ISBN` is not already present in the `books` cache. Upon calling that method for a missing `Book`, the caches will be updated transparently so that a further call does not invoke the method again.

```java
Copy@Cacheable("books")
public Book findBook(ISBN isbn) {...}
```

To actually enable the processing of those annotations a basic setup requires `@EnableCaching` to be set and a `CacheManager` bean to be defined.

```java
Copy@SpringBootApplication
@EnableCaching
public class MyApp {
    @Bean
    public CacheManager cacheManager() { ...}

    ...
}
```

We wanted to try to reduce this last step so that all you'd have to do is add `@EnableCaching` on your Spring Boot app and you're done. This is now a reality as of Spring Boot 1.3.M1! Spring Boot offers auto-configuration for any JSR-107 compliant provider but also for EhCache, Hazelcast, Infinispan, Redis and Guava. We also provide a very basic support if none of these are available using `ConcurrentHashMap`.

Spring Boot is inspecting your project to deduce the right defaults; for instance, if you have a `ehcache.xml` at the root of the classpath and EhCache 2.x is present, then we will automatically create a `EhCacheCacheManager` using that configuration file (unless specified otherwise). We also provide a broad support of configuration options: just grab Spring Boot 1.3.M1 and type `spring.cache` in your IDE to list the available options.

Spring Boot can create caches on startup if the underlying provider supports it. If you're using JCache, it can also give you a callback of the `javax.cache.CacheManager` in case you want to customize it on startup (i.e. to further tune the configuration).

If you're using the actuator, cache metrics are also exposed by default if the underlying cache provider supports it. For now we expose for each cache the size, the cache ratio and the miss ratio. We're looking forward to your feedback to improve that list.

Thanks a lot to the community for their help and in particular to [Eddú Meléndez Gonzales](https://twitter.com/EdduMelendez) who contributed many PRs! The [documentation](http://docs.spring.io/spring-boot/docs/1.3.0.M1/reference/htmlsingle/#boot-features-caching) has been updated as well so please give it a try and let us know what you think.