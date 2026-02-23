---
title: Core container refinements in Spring Framework 4.3
source: https://spring.io/blog/2016/03/04/core-container-refinements-in-spring-framework-4-3
scraped: 2026-02-23T19:24:14.166Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Stéphane Nicoll |  March 04, 2016 | 17 Comments
---

# Core container refinements in Spring Framework 4.3

_Engineering | Stéphane Nicoll |  March 04, 2016 | 17 Comments_

Spring Framework 4.3.RC1 is around the corner and brings nice core container refinements which we are going to explore in this post...

## [](#implicit-constructor-injection-for-single-constructor-scenarios)Implicit constructor injection for single-constructor scenarios

Consider the following service class:

```java
Copy@Service
public class FooService {

    private final FooRepository repository;

    @Autowired
    public FooService(FooRepository repository) {
        this.repository = repository
    }
}
```

Quite a common use case but if you forget the `@Autowired` annotation on the constructor, the container will throw an exception looking for a default constructor, unless you explicitly indicate autowire mode 'constructor' in your bean definition setup (e.g. in an XML `<bean>`).

So as of 4.3, you no longer need to specify an explicit injection annotation in such a single-constructor scenario. This is particularly elegant for classes which otherwise do not carry any container annotations at all, for example when programmatically registered:

```java
Copypublic class FooService {

    private final FooRepository repository;

    public FooService(FooRepository repository) {
        this.repository = repository
    }
}
```

Similarly, you may have noticed that `@Configuration` classes historically did not support constructor injection. They do now as of 4.3, and they obviously allow for omitting `@Autowired` in a single-constructor scenario as well...

```java
Copy@Configuration
public class FooConfiguration {

    private final FooRepository repository;

    public FooConfiguration(FooRepository repository) {
        this.repository = repository
    }

    @Bean
    public FooService fooService() {
        return new FooService(this.repository);
    }
}
```

## [](#improved-programmatic-resolution-of-dependencies)Improved programmatic resolution of dependencies

Spring Framework 4.3 also introduces `ObjectProvider`, an extension of the existing `ObjectFactory` interface with handy signatures such as `getIfAvailable` and `getIfUnique` to retrieve a bean only if it actually exists (optional support) or if a single candidate can be determined (in particular: a primary candidate in case of multiple matching beans).

```java
Copy@Service
public class FooService {

    private final FooRepository repository;

    public FooService(ObjectProvider<FooRepository> repositoryProvider) {
        this.repository = repositoryProvider.getIfUnique();
    }
}
```

You may use such an `ObjectProvider` handle for custom resolution purposes during initialization as shown above, or store the handle in a field for late on-demand resolution (as you typically do with an `ObjectFactory`).

## [](#cache-abstraction-refinements)Cache abstraction refinements

The cache abstraction is mainly used to cache values that are CPU and/or IO consuming. In certain use cases, a given key may be requested by several threads (i.e. clients) in parallel, especially on startup. Synchronized cache support is a long-requested feature that has now been implemented. Assume the following:

```java
Copy@Service
public class FooService {

    @Cacheable(cacheNames = "foos", sync = true)
    public Foo getFoo(String id) { ... }

}
```

Notice the `sync = true` attribute which tells the framework to block any concurrent threads while the value is being computed. This will make sure that this intensive operation is invoked only once in case of concurrent access.

BTW, Spring Framework 4.3 now supports [Caffeine](https://github.com/ben-manes/caffeine), a Java 8 rewrite of Guava’s cache meant to supersede Spring's Guava support in Spring Framework 5.

## [](#miscellaneous)Miscellaneous

There are quite a few further core refinements, some of them long desired:

-   Injection of self references and generically typed `Collection`/`Map` beans
-   Support for Common Annotations 1.1's `javax.annotation.Resource.lookup()`
-   `@AliasFor` defaults to the name of the declaring attribute
-   Custom encoding support for `@PropertySource` declarations
-   Wider applicability of SpEL expressions (e.g. on `@Scheduled`)

Spring Framework `4.3.0.RC1` is due in late March, with GA scheduled towards the end of May. If you are interested in those features, please give it an early try using the snapshot: the easiest way is to generate a project on [https://start.spring.io](https://start.spring.io) using Spring Boot `1.4.0 (SNAPSHOT)`, bringing the current Spring Framework 4.3 snapshot along with it.