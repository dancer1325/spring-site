---
title: What\'s new in Spring Data Codd RC1?
source: https://spring.io/blog/2014/02/07/what-s-new-in-spring-data-codd-rc1
scraped: 2026-02-24T07:42:37.632Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oliver Drotbohm |  February 07, 2014 | 0 Comments
---

# What's new in Spring Data Codd RC1?

_Engineering | Oliver Drotbohm |  February 07, 2014 | 0 Comments_

As we're approaching the home stretch of the Spring Data release train currently in development, I think it's time to give you a brief overview of some of the new features we're going to introduce with this release.

In case you're not aware yet, the release train is a coordinated release of multiple Spring Data modules to make sure they work seamlessly out of the box. The current one is named after the inventor of the relational model [Edgar F. Codd](http://en.wikipedia.org/wiki/Edgar_F._Codd).

## [](#spring-data-commons)Spring Data Commons

As the Spring Data Commons module creates the foundation for all of the other modules contained in the release train, new features in it are also available in the individual store modules.

For the Codd release we raised the minimum required Spring version to 3.2.7 and improved our compatibility with Spring 4.0 to provide a seamless experience when updating to the latest and greatest version of Spring so far. When running your application with Spring 4 and Java 8 the Spring Data auditing feature is now able to populate the creation and modification dates of your entity with JSR-310 types:

```java
Copyabstract class BaseEntity {
    
    @CreatedDate ZonedDateTime createdDate;
    @LastModifiedDate ZonedDateTime modifiedDate;
}
```

Also, the auditing can now generally be activated using the module specific `@Enable…Auditing` annotation (read more on that in Thomas Darimont's [blog post](https://spring.io/blog/2013/12/04/what-s-new-in-spring-data-mongodb-1-4-m1) on the new features introduced in the first milestone).

As of Codd, Spring Data repositories will be instantiated eagerly to make sure the verification of the repository interface is triggered eagerly, even without an injection point explicitly requesting the repository instance at container startup. To fall back to the legacy behavior, use the `@Lazy` annotation on the repository interface, as you are used to with other Spring bean definitions.

### [](#uri-templates-for-pagination-links)URI templates for pagination links

In the area of web support for Spring MVC, Spring Data's `PagedResourcesAssembler` now creates page navigation links that adhere to the standard defined in [RFC-6570](http://tools.ietf.org/html/rfc6570). So assuming you have a Spring MVC controller like this one:

```java
Copy@Controller
class OrderController {
    
    @RequestMapping("/orders")
    HttpEntity<PagedResources<Resource<Order>>> showOrders(Pageable pageable, 
        PagedResourcesAssembler<Order> assembler) {

        Page<Order> orders = orderRepository.findAll(pageable);
        return new ResponseEntity<>(assembler.toResource(orders), HttpStatus.OK);
    }
}
```

The `PagedResourcesAssembler` will inspect the given `Page` of `Order`s, render the content, the page meta-information and also add the `prev` and `next` links as appropriate.

```javascript
CopyGET /orders?page=0&size=10
Accept: application/hal+json

200 OK
{ _links : { self : { href : "/orders{?page,size,sort}",
                      templated : true },
             next : { href : "/orders?page=1&size=10" }},

  _embedded :  { orders : [ … ] },

  page : {
    size : 1,
    totalElements : 2,
    totalPages : 2,
    number : 0
  }
}
```

As you can see, the `self` link clearly indicates the parameters the resource accepts to customize the response. The `next` link provides access to the next page corresponding to the current parameters given.

To round things off, the Commons module has seen significant changes to the way the configuration is evaluated which will significantly improve the bootstrap time, especially in applications with a lot of repositories.

## [](#spring-data-jpa)Spring Data JPA

The Spring Data JPA module has mostly seen internal improvements and new features regarding the interaction with JPA and CDI: we upgraded to EclipseLink 2.5.1 and improve the compatibility with Hibernate 4.3 to make sure our users can work with JPA 2.1 based persistence providers.

### [](#constructor-injection-for-entitymanagers)Constructor injection for EntityManagers

A feature that has been requested repeatedly has made it into this release as well: the ability to inject `EntityManager` instances into constructors when designing application components. If you write classes that need access to a JPA `EntityManager`, you usually use `@PersistenceContext` to trigger the injection of it. However, we generally consider constructor injection a best practice for a [variety of reasons](http://olivergierke.de/2013/11/why-field-injection-is-evil/), so that it would be useful not having to fallback to field injection for `EntityManagers`.

Unfortunately, the `@PersistenceContext` annotation cannot be used on constructor arguments currently. I've filed [a ticket in the JPA bug tracker](https://java.net/jira/browse/JPA_SPEC-72) for that but we certainly don't have to wait for JPA 2.2 to be released to see that functionality. As of version 1.5 of Spring Data JPA you'll be able to write application components like this:

```java
Copyclass UserRepositoryImpl implements UserRepositoryCustom {
    
    private final EntityManager em;

    @Autowired // or @Inject
    public UserRepositoryImpl(EntityManager em) {
        this.em = em;
    }

    …
}
```

By default, we will inject the `EntityManager` instance created by the `EntityManagerFactoryBean` declared in your `ApplicationContext`. If you have multiple ones defined, you can use `@Qualifier` to point to the bean name of the `EntityManagerFactoryBean` you want to obtain the `EntityManager` from.

### [](#eager-repository-instantiation-in-cdi-environments)Eager repository instantiation in CDI environments

When using Spring Data repositories in a Spring container, the repositories are instantiated eagerly. Even before Codd, they were instantiated as soon as a client component requested a repository through an injection point. So whenever you get a repository injected into a client, you are assured to get a *fully initialized application component*, simply as the Spring component model guarantees this.

In a CDI world, however, things are slightly different. When you access an application component, there's no guarantee its dependencies are already initialized as in the CDI component model it's fine to just inject a proxy and trigger the actual instance creation on first usage.

Practically this can result in a Spring Data repository getting instantiated while your application code is already running a JPA transaction. Part of the instantiation of the repository is checking for JPA named queries to back query methods. According to the JPA spec, the non-existence of such a named query (which is a totally expected state in a Spring Data context) has to be expressed by throwing an exception and this exception has to trigger a transaction rollback in JPA by definition.

This means that by intermingling the application component initialization with running business code in CDI you risk to break the latter when the former is invoked. Unfortunately, there's no way to enforce eager instantiation of application components out of the box in CDI. There are a few [container specific approaches](https://gist.github.com/mojavelinux/635719) but none of them work reliably on all of them (if you happen to find one, I'd be highly interested).

With Spring Data JPA 1.5 we're going to ship an `@Eager` annotation that will cause our CDI extension trigger repository and thus avoid the overlap of application component creation and the execution of business code.

## [](#spring-data-rest)Spring Data REST

The very core changes in Spring Data REST we're significant refactorings especially in the mapping configuration and customization parts of the module. This also included changes in the default relation types we expose for individual resources.

For each repository, Spring Data REST exposes a dedicated REST resource that follows the collection resource pattern. This means we have a dedicated resource for the collection of entities as well as individual ones for each item in the collection.

As proper REST clients are not supposed to create the URIs they interact with themselves but rather use hypermedia to follow links provided by the server, we need to expose two different relation types to indicate the difference between a collection resource and an item resource.

As of Spring Data REST 2.0, the relation type for the item resource is derived from the name of the domain class the repository manages. The relation type for the collection resource is then derived from that by pluralizing the item resource rel using the [Evo Inflector](https://github.com/atteo/evo-inflector) library. Thus, for a repository managing `Order` instances, you'll see links named `orders` to point to the collection resource and `order` pointing to the item resources.

This change in relation types being a breaking one for hypermedia clients of Spring Data REST 1.x bases services is one of the major reasons, the version of the module is raised to 2.0. Another aspect to this is that with M1 of the module we moved to [HAL](http://stateless.co/hal_specification.html) as default media type to be exposed by Spring Data REST. We're looking into support for other hypermedia formats just as [Collection+JSON](http://amundsen.com/media-types/collection/) and the like but HAL seems to gain quite a lot of attention. Amazon just recently released their [AppStream REST API](http://docs.aws.amazon.com/appstream/latest/developerguide/rest-api.html) and use HAL as the representation format.

## [](#spring-data-neo4j--mongodb)Spring Data Neo4j / MongoDB

The biggest change (and hence the move to a 3.0 version number) in the Spring Data Neo4j module ist the support for Neo4j 2.0. So to benefit from the latest and greatest features of that release, make sure you give the Codd release candidate a try.

On the MongoDB side of things the most important new feature is the support for Spring Expression language in the aggregation framework. Spring Data engineer Thomas Darimont had a [detailed blog post](https://spring.io/blog/2013/12/04/what-s-new-in-spring-data-mongodb-1-4-m1) on all features that we already shipped with M1 of Codd in case you missed that.

As indicated above, of course all new features in Spring Data Commons introduced in Codd are actually bubbling into both the Neo4j and MongoDB module as well.

## [](#outlook)Outlook

The GA release is planned for the end of February 2014. We have a [curated changelog](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Codd) that lists all important features introduced in this release in the Spring Data Commons wiki.

We appreciate any pre-release testing and reporting potential issues found in our [JIRA](http://jira.springsource.org) instance.