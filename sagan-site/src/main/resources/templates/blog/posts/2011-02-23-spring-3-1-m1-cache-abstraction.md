---
title: Spring 3.1 M1: Cache Abstraction
source: https://spring.io/blog/2011/02/23/spring-3-1-m1-cache-abstraction
scraped: 2026-02-24T07:33:18.033Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Costin Leau |  February 23, 2011 | 1 Comment
---

# Spring 3.1 M1: Cache Abstraction

_Engineering | Costin Leau |  February 23, 2011 | 1 Comment_

One of the major [features](http://blog.springsource.com/2011/02/11/spring-framework-3-1-m1-released/) added in Spring Framework 3.1 M1 is the generic cache abstraction for transparently applying caching to Spring applications. Just like the [transaction](http://static.springsource.org/spring/docs/3.1.0.M1/spring-framework-reference/html/transaction.html) support, the caching abstraction allows consistent use of various caching solutions with minimal impact on the code.

### Purpose

[Cache](http://en.wikipedia.org/wiki/Cache)s are in general used to improve application performance by transparently serving frequently accessed data in a faster fashion such as serving data from local memory rather than from the network. Many of you have already used caching, whether knowingly or not: most ORM/JPA frameworks provide dedicated caching functionality (also known as the 2nd-level cache). Spring 3.1 M1 however introduces a generic cache mechanism that can be applied to any Java class, method or library: one can use it in conjunction with an existing caching infrastructure, to add caching to APIs without such support (for example JDBC) or simply to improve the performance of a slow, time-consuming and resource-hungry method.

### Meet `@Cacheable`, `@CacheEvict` and SpEL

Let us see what it takes to cache an arbitrary method:

```java
Copy@Cacheable("books")
public Book findBook(ISBN isbn) {...}
```

By marking the method with the `@Cacheable` annotation, we tell the container that the `findBook` method is backed by the cache entry `books`. That is each time the method is called, a cache lookup is performed using as key the method parameters (in this case the `isbn` argument). If a value is found, it will be returned and the method execution skipped. However, if the key is not found, the method is executed as usual and its result stored in the cache so the next time the method is invoked, the result can be returned without actually executing the (expensive or slow) method.

In practice not all methods have only one argument or, worse yet, the parameters are not suitable as cache keys - take for example a variation of the method above:

```java
Copypublic Book findBook(ISBN isbn, boolean checkWarehouse, boolean includeUsed)
```

In such cases, one can use Spring 3 Spring Expression Language or [SpEL](http://static.springsource.org/spring/docs/3.1.0.M1/spring-framework-reference/html/expressions.html) to cherry pick the proper arguments, navigate the object tree

```java
Copy// use property 'rawNumber' on isbn argument as key
@Cacheable(value="book", key="#isbn.rawNumber")
public Book findBook(ISBN isbn, boolean checkWarehouse, boolean includeUsed)
```

or compute the key on the fly, even call arbitrary methods without having to write any code:

```java
Copy// get the key by calling someType#hash(isbn)
@Cacheable(value="book", key="T(someType).hash(#isbn)")
public Book findBook(ISBN isbn, boolean checkWarehouse, boolean includeUsed)
```

Additionally, one can specify when or if the caching should occur: whether the cache should be inspected or completely disregarded and the method executed normally. It's up to the developer to decide what the criteria is: can be anything from the key size or type to the time of day or result of arbitrary methods: SpEL supports it all:

```java
Copy// cache only names shorter then 32 chars
@Cacheable(value="book", condition="#name.length < 32")
public Book findBook(String name)
```

```java
Copy// do not cache on weekends
@Cacheable(value="book", condition="!T(TimeUtils).isWeekend()")
public Book findBook(String name)
```

The cache abstraction also supports eviction of cache entries or of an entire cache through the `@CacheEvict` annotation. To evict a cache once it becomes invalid (for example because the cached data has been updated) one can use the following:

```java
Copy// evict all cache entries
@CacheEvict(value = "books", allEntries=true)
public void loadBooks(InputStream batch)
```

Once the annotations are in place, one can simply "enable" the caching functionality with one line (or three if you count the schema declaration):

```xml
Copy<beans xmlns="http://www.springframework.org/schema/beans" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:cache="http://www.springframework.org/schema/cache"
   xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/cache http://www.springframework.org/schema/cache/spring-cache.xsd">
  
  <cache:annotation-driven />
  ...
</beans>
```

Just like the rest of the `annotation-driven` element, the cache one uses defaults in its simplest form but can be used to pick between proxy and byte-code weaving of cached classes or to wire in the desired cache implementation.

### Declaring a cache implementation

So far, we discussed the declarative aspect of the caching abstraction: how to add and remove data from the cache based on your POJOs. But what are the backing cache implementations that one can use? Out of the box, Spring provides integration with [ehcache](http://ehcache.org/) and JDK `ConcurrentHashMap` great for small, non-distributed environments or testing:

```xml
Copy<!-- generic cache manager -->
<bean id="cacheManager" class="org.springframework.cache.support.SimpleCacheManager">
  <property name="caches">
    <set>
      <bean class="org.springframework.cache.concurrent.ConcurrentCacheFactoryBean" p:name="default"/>
      <bean class="org.springframework.cache.concurrent.ConcurrentCacheFactoryBean" p:name="books"/>
    </set>
  </property>
</bean>
```

### What about \[xx\] library - when will it be supported ?

For the moment we do not plan to support other caching libraries inside Spring Framework simply because of the sheer number of options out there, the dependency impact (many are bigger in size than the cache abstraction), and the maintenance and licensing issues. To plug-in a custom cache provider, we encourage developers to look at the caching SPI [package](http://static.springsource.org/spring/docs/3.1.0.M1/javadoc-api/index.html?org/springframework/cache/package-summary.html) and its two interfaces: [CacheManager](http://static.springsource.org/spring/docs/3.1.0.M1/javadoc-api/index.html?org/springframework/cache/CacheManager.html) and [Cache](http://static.springsource.org/spring/docs/3.1.0.M1/javadoc-api/index.html?org/springframework/cache/Cache.html). Besides the implementations available out of the box, one can look at the [GemFire](http://www.gemstone.com/products/gemfire) [implementation](https://github.com/SpringSource/spring-gemfire/tree/1.1.0-dev/src/main/java/org/springframework/data/gemfire/support), scheduled for the next major release version of [Spring GemFire](http://www.springsource.org/spring-gemfire).

### How does the caching abstraction compare to other caches (e.g. JPA 2nd-level cache) ?

In general, the two caching mechanisms can happily coexist as long as the developer pays attention to any domain overlap. Taking the example of the JPA 2nd-level cache, one can used it for data access through JPA while using Spring caching for the web-tier or remote service calls. One can go a step further by reusing the backed cache between the two mechanisms if that applies.

### Summary

I hope you enjoyed this quick introductory entry to the new caching feature in Spring 3.1. For more information, please see the relevant reference documentation [chapter](http://static.springsource.org/spring/docs/3.1.0.M1/spring-framework-reference/html/cache.html) and the SPI [javadoc](http://static.springsource.org/spring/docs/3.1.0.M1/javadoc-api/index.html?org/springframework/cache/package-summary.html). And do let us know what you think - we are interested in your feedback! You can reach us through the [forum](http://forum.springframework.org/index.php), blog post comments, our issue [tracker](https://jira.springsource.org/browse/SPR#selectedTab=com.atlassian.jira.plugin.system.project%3Aissues-panel) or yours truly on [Twitter](http://twitter.com/costinl).