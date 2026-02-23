---
title: What\'s new in Spring Data Lovelace?
source: https://spring.io/blog/2018/09/27/what-s-new-in-spring-data-lovelace
scraped: 2026-02-23T14:32:53.999Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oliver Drotbohm |  September 27, 2018 | 3 Comments
---

# What's new in Spring Data Lovelace?

_Engineering | Oliver Drotbohm |  September 27, 2018 | 3 Comments_

With Spring Data Lovelace just released in its generally available version last week, it is time to have a brief walk through the new features we have added. The release train is pretty packed with features. In this blog post, I cover the more general ones. Advanced, store-specific news is covered in the following blog posts:

-   [Jens Schauder introducing Spring Data JDBC](https://spring.io/blog/2018/09/17/introducing-spring-data-jdbc)
    
-   [Jens again on how to model aggregates with Spring Data JDBC](https://spring.io/blog/2018/09/24/spring-data-jdbc-references-and-aggregates)
    
-   [Christoph Strobl on MongoDB](https://spring.io/blog/2018/09/27/what-s-new-in-spring-data-lovelace-for-mongodb)
    
-   [Mark Paluch on Spring Data for Apache Cassandra & Redis](https://spring.io/blog/2018/09/26/what-s-new-in-spring-data-lovelace-for-redis-and-apache-cassandra)
    

Read up on those? Alright, then let’s get started on the more general items.

## [](#improved-object-mapping-for-immutable-types)[](#improved-object-mapping-for-immutable-types)Improved Object Mapping for Immutable Types

With Spring Data Lovelace, we took the chance to revamp our object mapping facilities that are used by most of the NoSQL modules. We have always supported immutable entities, except a tiny aspect: Values that needed to change during database interactions, such as an auto-generated identifier or an optimistic locking version property, have always been changed under the covers. This has changed with the latest release.

To support those properties, we now need you to either provide a wither method (following the `with…(…)` naming convention) or — in the Kotlin world — expose a dedicated `copy(…)` method, taking all properties as arguments. The following example uses a `withId` method:

```
Copyclass Person {

  private final Long id;
  private final String firstname, lastname;

  static Person of(String firstname, String lastname) {
    return new Person(null, firstname, lastname);
  }

  private Person(Long id, String firstname, String lastname) {
    // Assign parameters to fields
  }

  Person withId(Long id) {
    return new Person(id, this.firstname, this.lastame);
  }

  // …
}
```

With Lombok, we can do the same thing, as follows:

```
Copy@Value(staticConstructor = "of")
class Person {

  @Wither Long id;
  String firstname, lastname;

  // …
}
```

The declared constructor is used when `Person` instances are read from the database. The wither method for the identifier property comes into play when persisting new entities to the store in the first place. Be sure you actually use the result returned from the repository’s `save(…)` method, as this will now be a different instance than the one you handed to the method in the first place.

We used the work on that aspect to improve the performance of the actual object conversion in some store implementations by avoiding a couple of unnecessary iterations over properties when an immutable type is used. For more details on that, see the newly added [section of the reference documentation](https://docs.spring.io/spring-data/mongodb/docs/current/reference/html/#mapping.fundamentals).

## [](#support-for-vavrs-try-monad)[](#support-for-vavr-s-try-monad)Support for Vavr’s Try Monad

By default, Spring Data repositories propagate errors that occur during the execution of a query method as runtime exceptions. Proponents of a more functional style of writing Java code usually use Vavr in their application. We have had support for Vavr’s collection types as repository return types for quite a while already. Spring Data Lovelace now adds support for the `Try` monad, so that errors occurring in the query method execution cause a `Failure` instance to be returned instead of an exception being thrown.

```
Copyinterface PersonRepository extends Repository<Person, Long> {

  Try<Option<Person>> findByLastnameContaining(String lastname);
}
```

That method fails if more than one person can be found with a `lastname` that matches the given criteria. With `Try` being used as return type, a client component might now recover from that exceptional case as follows:

```
Copyrepository.findByLastnameContaining("e")
  .recover(it -> Match(it).of(
    Case(instanceOf(IncorrectResultSizeDataAccessException.class), Optional.empty())
));
```

While this might look a little convoluted in this contrived, tiny example, it is a pretty powerful mechanism, to keep mapping over a potentially available result on code that might throw exceptions. Note that, when using a transactional store in combination with this feature, you have to take care of managing transaction rollbacks yourself, as the exception is not actually being thrown any more and does not trigger transaction rollbacks for `@Transaction` annotated methods. Support for that is on its way. Be sure to follow [this ticket](https://jira.spring.io/browse/SPR-15806) in Spring Framework or even cast your vote on it.

To see the Vavr support in action, check out the [example](https://github.com/spring-projects/spring-data-examples/blob/e9405dfa049b8265834cb78c50a932a51307a87d/jpa/vavr/src/) in our canonical Spring Data Examples repository.

## [](#deferred-jpa-repository-initialization)[](#deferred-jpa-repository-initialization)Deferred JPA Repository Initialization

Starting up a Spring Data JPA application requires an `EntityManagerFactory` to be bootstrapped. This usually consumes quite a bit of the startup time of the application overall. To tackle this problem, Spring Framework already introduced the ability to bootstrap that `EntityManagerFactory` in a background thread and, thus, let other beans get initialized in parallel. Unfortunately, Spring Data repositories usually have at least one transitive dependency on some kind of Spring bean. Their initialization, in turn, interacts with the factory already, which — without further steps — caused the initialization of those other components to block. This limited the effect of that new functionality significantly.

As of Spring Data Lovelace, you can now define the repositories to bootstrap in a lazy mode, which automatically declares all injection points of Spring Data repositories as being lazy. This causes Spring Framework to create proxies and delay the actual repository initialization up until the very first interaction with them. In other words, repositories clients and clients of those clients can, in turn, be created without having to wait for the `EntityManagerFactory` to finish its bootstrap. That means that a significantly higher amount of Spring bean initialization can be parallelized to the JPA bootstrap.

The delay of the initialization also causes any kind of verification to be delayed until (for example) the very first request that hits the code path that actually uses a repository. If you want to still make sure that the repositories are fully initialized before the application starts taking requests, use the **deferred** bootstrap mode. This mode works in the same way as the lazy one, except that, when the container is done bootstrapping, it explicitly triggers the initialization of all repositories in the `ApplicationContext`.

The easiest way to switch between those modes is by setting the Spring Boot properties `spring.jpa.repositories.bootstrap-mode` to either `lazy` or `deferred`. This also ensures that the lazy initialization of the `EntityManagerFactory` is configured properly. Also, be sure to check out the new section added to the [reference documentation](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.bootstrap-mode).

### [](#an-example)[](#an-example)An Example

We have prepared [an example](https://github.com/spring-projects/spring-data-examples/tree/master/jpa/deferred) to show the effect of that optimization in a quite extreme example consisting of 2,000 entities, 2,000 repositories and 2,000 beans that depend on the repositories. Using the deferred mode cuts off about a third (~12 seconds) of the startup time. The lazy one even takes away another third (~22 seconds better than the default).

![deferred jpa](https://github.com/olivergierke/blog-images/raw/53341f1a3c047e9ee426f475f8e184e2e82ccf3e/deferred-jpa.png)

## [](#controlling-http-method-exposure-in-spring-data-rest)[](#controlling-http-method-exposure-in-spring-data-rest)Controlling HTTP method exposure in Spring Data REST

We finish with a look at a feature in Spring Data REST that had been requested for a while. In Spring Data REST, the decision about which HTTP methods are supported for which resource type exposed is, by default driven by the declared CRUD methods. However, there are certain cases in which the presence of a single repository method causes multiple resource-HTTP-method combinations to be enabled. For example, the `save(…)` method exposed on a repository causes `POST` to be supported on the collection resources as well as `PUT` for both update **and** creation of the item resource.

Spring Data Lovelace has a new `ExposureConfiguration` (obtainable from a `RepositoryRestConfiguration`), which allows fine grained control over which methods are supposed to be exposed:

```
CopyExposureConfiguration config = restConfiguration.getExposureConfiguration();

config.withItemExposure((metadata, httpMethods)
  -> httpMethods.disable(HttpMethod.PATCH));
config.forDomainType(User.class).disablePutForCreation();
```

As you can see, the configuration options come in two flavors:

-   A global one (shown first) that allows control over collection, item, and association resource exposure by using a lambda over a `ResourceMapping` and `ConfigurableHttpMethods`.
    
-   A type-specific one as shown below. Some setup details, such as disabling the (enabled by default) ability to create entities by using `PUT` requests are supported with explicit configuration methods.
    

You can find out more about that in the corresponding section of the [reference documentation](https://docs.spring.io/spring-data/rest/docs/current/reference/html/#customizing-sdr.http-methods).