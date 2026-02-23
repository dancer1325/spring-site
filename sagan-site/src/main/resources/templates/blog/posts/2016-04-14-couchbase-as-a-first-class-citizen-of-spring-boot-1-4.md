---
title: Couchbase as a First Class Citizen of Spring Boot 1.4
source: https://spring.io/blog/2016/04/14/couchbase-as-a-first-class-citizen-of-spring-boot-1-4
scraped: 2026-02-23T19:19:17.959Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Stéphane Nicoll |  April 14, 2016 | 5 Comments
---

# Couchbase as a First Class Citizen of Spring Boot 1.4

_Engineering | Stéphane Nicoll |  April 14, 2016 | 5 Comments_

> This is a cross-post blog from Simon BASLÉ from [Couchbase](http://www.couchbase.com/). You can find him on twitter ([@simonbasle](https://twitter.com/simonbasle)) or [github](https://github.com/simonbasle). Learn more about Couchbase and the Couchbase Java SDK on the [developer portal](http://developer.couchbase.com/documentation/server/4.1/sdks/java-2.2/java-intro.html).

[`Spring Boot 1.4.0 MILESTONE 2`](https://spring.io/blog/2016/04/13/spring-boot-1-4-0-m2-available-now) is out! This is a good time to tell you about the joint effort between Spring Boot team members and the Couchbase Java SDK team to offer a first class integration of Couchbase into Spring Boot :)

![](https://raw.githubusercontent.com/simonbasle/media/master/images/springBootAndCouchbase.png)

In `Spring Boot 1.4.0`, Couchbase becomes a first class citizen of the Spring Boot ecosystem!

## [](#couchbase-sdk-integration)Couchbase SDK Integration

Spring Boot now directly recognizes when you have the `Couchbase SDK` in your classpath. And when that's the case, it instantiates a `Cluster` and a `Bucket` bean for you using *autoconfiguration*.

Spring Boot can pick up properties to further configure these core SDK classes, even the `CouchbaseEnvironment`!

The following bootstrapping properties are recognized:

```
Copyspring.couchbase.bootstrap-hosts
spring.couchbase.bucket.name
spring.couchbase.bucket.password
```

Environment tuning (IO endpoints, SSL support and default sync API timeouts) are exposed through the following properties:

```
Copyspring.couchbase.env.endpoints.key-value
spring.couchbase.env.endpoints.query
spring.couchbase.env.endpoints.view

spring.couchbase.env.ssl.enabled
spring.couchbase.env.ssl.key-store
spring.couchbase.env.ssl.key-store-password

spring.couchbase.env.timeouts.connect
spring.couchbase.env.timeouts.key-value
spring.couchbase.env.timeouts.query
spring.couchbase.env.timeouts.view
```

Now this is ⭐️⭐️⭐️⭐️⭐️ support!

> **WARNING**: Note that in the previous milestone the bootstrapping properties were prefixed with " `spring.*data*.couchbase` ", now becoming " `spring.couchbase` ".

## [](#spring-cache-implementation)Spring Cache Implementation

The Spring Cache abstraction has a Couchbase 2.x implementation, [`couchbase-spring-cache`](https://github.com/couchbaselabs/couchbase-spring-cache).

Spring Boot now recognizes this cache implementation when both the Java SDK and the `couchbase-spring-cache` artifacts are on the classpath.

This integrates nicely with the previous section, seeing as the default underlying storage `Bucket` for the caches is the one autoconfigured by Spring Boot :)

> **NOTE**: The cache implementation has been pulled out of the Spring Data Couchbase project into its own project (in Couchbase's github repository), so that it could be used and released separately from Spring Data.

> **TIP**: Don't forget to at least configure the `spring.couchbase.bootstrap-hosts` property.

This implementation of the `CacheManager` allows for storing data from several caches into the same Couchbase bucket, by automatically prefixing the keys in Couchbase with the name of each cache.

The `CouchbaseCacheManager` will automatically reuse the `Bucket` autoconfigured by Spring Boot. By simply adding a property to declaratively list cache names, the corresponding caches will be pre-loaded:

```
Copyspring.cache.type=couchbase
spring.cache.cache-names=foo,bar
```

Five-star support, we tell you!

You can even configure it to store data for different caches into multiple buckets. The caches can then be configured using a fluent builder pattern (eg. in a `CacheManagerCustomizer<CouchbaseCacheManager>`). This `CacheBuilder` also allows you to further tune the caches, like setting a default expiration time:

```java
Copy@Configuration
public class CouchbaseCacheConfiguration {

  private final Cluster cluster;

  //inject the Cluster from Boot core Couchbase support
  public CouchbaseCacheConfiguration(Cluster cluster) {
    this.cluster = cluster;
  }

  @Bean
  public Bucket anotherBucket() {
    return this.cluster.openBucket("another", "secret");
  }

  @Bean
  public CacheManagerCustomizer<CouchbaseCacheManager> cmCustomizer() {
    return c -> {
      c.prepareCache("biz", CacheBuilder
              .newInstance(anotherBucket())
              .withExpirationInMillis(2000));
    };
  }
}
```

This implementation can use views to selectively clear caches that are collocated in the same Bucket.

Finally, it supports dynamic creation of caches as they are requested. To activate that, simply omit to declare any cache name and just activate Couchbase caching with the relevant property:

```
Copyspring.cache.type=couchbase
```

This will use the Spring Boot autoconfigured `Bucket` as the default bucket for all dynamically created caches.

Fun with `@Cacheable` awaits ?

## [](#spring-data-integration)Spring Data Integration

[Spring Data Couchbase `2.1.0`](http://projects.spring.io/spring-data-couchbase/) (release train Hopper) has included several modifications that makes integration with Spring Boot a breeze.

First the usual suspect: by default Spring Boot will autoconfigure Spring Data Couchbase to use the `Bucket` it created. This is made possible by having separated the core SDK configuration parts into a `CouchbaseConfigurer` class, while what is really specific to Spring Data is located in a new base class, `AbstractCouchbaseDataConfiguration`.

If you use only Spring Data, you can go ahead and continue using the `AbstractCouchbaseConfiguration`, which is now both a CouchbaseConfigurer and an AbstractCouchbaseDataConfiguration.

If you use Spring Boot however, it will autoconfigure a `CouchbaseConfigurer`. You can always tune your own `AbstractCouchbaseDataConfiguration` and inject the configurer in it.

### [](#other-spring-data-couchbase-features)Other Spring Data Couchbase Features

The 2.1.0 release also includes a few new features:

-   Optional automatic `touch` (refreshing the expiry of a document) on reads ([DATACOUCH-59](https://jira.spring.io/browse/DATACOUCH-59))
-   Improvements to sorting and pagination ([DATACOUCH-211](https://jira.spring.io/browse/DATACOUCH-211), [DATACOUCH-214](https://jira.spring.io/browse/DATACOUCH-214))
-   Added support for auditing (eg. `@CreatedBy` annotation, [DATACOUCH-91](https://jira.spring.io/browse/DATACOUCH-91))

## [](#conclusion)Conclusion

Go grab that ⭐️⭐️⭐️⭐️⭐️ MILESTONE!

As always, feedback is welcome (in the Spring Data [issue tracker](https://jira.spring.io/browse/DATACOUCH), Spring Boot [issue tracker](https://github.com/spring-projects/spring-boot/issues?utf8=%E2%9C%93&q=is%3Aissue+couchbase) or on the [Couchbase forums](https://forums.couchbase.com/c/java-sdk)).

Happy Coding!