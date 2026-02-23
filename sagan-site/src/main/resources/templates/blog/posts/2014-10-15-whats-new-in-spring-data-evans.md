---
title: Whats new in Spring Data Evans?
source: https://spring.io/blog/2014/10/15/whats-new-in-spring-data-evans
scraped: 2026-02-23T22:11:24.766Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Christoph Strobl |  October 15, 2014 | 14 Comments
---

# Whats new in Spring Data Evans?

_Engineering | Christoph Strobl |  October 15, 2014 | 14 Comments_

Spring Data Release [Evans](https://spring.io/blog/2014/09/09/spring-data-release-train-evans-goes-ga) has been around for a while and it's more than time to finally introduce you to the latest and greatest features we shipped with it.

There's a lot to cover since major enhancements have gone into the commons module. Those changes already have made it into some store modules and will go on and sneak their way into others over time, too. All of them are already available for at least [Spring Data JPA](http://projects.spring.io/spring-data-jpa/). That said, lets jump right in.

## [](#advanced-support-for-java-8)Advanced support for Java 8

Java8 has now been around for a while and previous Spring Data release trains already added fundamental support for some of those. With the Evans release train we extended the support significantly.

Java 8's [`Optional`](http://docs.oracle.com/javase/8/docs/api/java/util/Optional.html) has been a supported return since the [Dijkstra release](https://spring.io/blog/2014/05/21/what-s-new-in-spring-data-dijkstra) freeing you of having `null` checks spread across your code. We simply wrap and unwrap values for you when used as return types with repositories.

As of the Evans release [default methods](http://docs.oracle.com/javase/tutorial/java/IandI/defaultmethods.html) can be used in repository interfaces to e.g. forward parts of the parameters handed into the method to other query methods.

```java
Copyinterface PersonRepository extends Repository<Person, Long> {
  
  Optional<Customer> findByLastname(String lastname);
  
  default Optional<Customer> findByLastname(Customer customer) {
    return findByLastname(customer == null ? null : customer.getLastname());
  }
}
```

## [](#enhanced-multi-store-support)Enhanced multi-store support

Configuring your application to make use of different Spring Data modules has not been without issues so far. E.g. you might want to combine JPA and MongoDB where `Customer` happens to be a JPA Entity while `Order` is a MongoDB Document both persisted via according repository interfaces.

```java
Copy@Entity
class Customer {

  @Id @GeneratedValue Long id;
  String firstname, lastname;
  // ...
}

@Document
class Order {

  @Id String id;
  Long customerId;
  Date orderDate;
  // ...
}

interface CustomerRepository extends CrudRepository<Customer, Long> {}

interface OrderRepository extends CrudRepository<Order, String> {}
```

Until the Spring Data Evans release you had to manually configure the repository setup for MongoDB and JPA to mutually exclude the interfaces not relevant for the given store. Users usually used separate packages for that.

Now the repository setup detects that multiple Spring Data modules are on the classpath, and automatically restricts the repository scanning and inspect the domain type used by a given repository for store specific annotations such as `@Entity` and `@Document` to determine the concrete implementation they belong to. E.g. the Spring Data MongoDB module would drop the (accidentally) detected `CustomerRepository` as we don't find an `@Document` annotation.

### [](#statically-limiting-results)Statically limiting results

Dynamically limiting results is no new concept since Spring Data has had `Pagable` as abstraction since its inception and I bet nearly every Spring Data user is already familiar with something like this:

```java
CopyList<Person> findByLastname(String lastname, Pageable page)
```

This method declaration provides quite some flexibility: clients define the page number, size and a sort order of the elements they want to access. This is great if these values change dynamically (e.g. when you traverse the result set page by page).

But what if you're always only interested in e.g. the first 10 results and you always want them to be ordered by lastname? This could've been achieved by statically defining a `PageRequest` and reusing that for every method invocation. However, that still required the client to hand in the special `PageRequest`.

As of Spring Data Evans we now offer you a convenient way to explicitly limit the result set to a certain number of elements by using the keywords `top` and `first` followed by an optional positive numeric value (defaulting to 1).

```java
CopyList<Person> findTop10ByLastnameOrderByFirstnameDesc(String lastname);
```

## [](#mongodb-full-text-search)MongoDB Full Text Search

The Evans RC1 release introduced basic [text index support](https://spring.io/blog/2014/07/17/text-search-your-documents-with-spring-data-mongodb) for MongoDB 2.6. Using `@TextIndexed` allows you to mark properties you want to have text search enabled for so that we can go on and create the index for you. Note, that placing `@TextIndexed` on properties referring to complex types will index all properties of that type. Since scoring is a fundamental part of full text search the `@TextScore` annotation will assert that any full text query returns the documents score allowing you to order them by relevance.

```java
Copy@Document
class BlogPost {

  @Id String id;
  @TextIndexed(weight = 3) String title;
  @TextIndexed(weight = 2) String content;
  @TextIndexed List<String> categories;
  @TextScore Float score;
}
```

That in place, we extended the repository support to accept a `TextCriteria` instance that will define detailed options about the text search that shall be executed: the terms to be searched for, language options etc.

```java
Copyinterface BlogPostRepository extends CrudRepository<BlogPost, String> {

	Page<BlogPost> findBy(TextCriteria criteria, Pageable page);

	List<BlogPost> findAllByOrderByScoreDesc(TextCriteria criteria);
}
```

The first query method is quite straight forward. It executes the given `TextCriteria` and pages the results. The second query method definition combines the given `TextCriteria` with a standard criteria definition derived from the method name. This shows that you can freely combine text search with standard query easily.

## [](#mongodb-query-modifiers)MongoDB query modifiers

We added `@Meta` allowing you to define output and behavior of a query. By setting e.g. `maxExecutionTime` one can define the maximum duration a query may take (in milliseconds). Any execution that exceeds the limit will result in an error. You can also advice MongoDB to only scan through a maximum number of documents and return what has been found until reaching the limit by setting `maxScanDocuments`, while `comment` allows you to define text you can search for within the `system.profile` collection in case you got profiling enabled for your MongoDB instance.

```java
Copy@Meta(maxExcecutionTime = 100, comment = "onlyLimitedTime")
List<Customer> findByFirstname(String firstname);
```

## [](#configuration-options-for-redis-sentinel)Configuration options for Redis Sentinel

Redis 2.8 introduced high-availability support know as [Sentinels](http://redis.io/topics/sentinel). The Redis module of Spring Data Evans adds support to easily configure connecting to a sentinel setup so that your client will be able to continue working in case of re-elections of master nodes in a Redis cluster.

`RedisSentinelConfiguration` defines where the Sentiels are located so that the `ConnectionFactory` can set up pooling accordingly. In case of Jedis it will create a `JedisSentinelPool` for automatic failover. This means that in case your master node goes down, you'll receive, as soon as the Sentinels agreed on a new master, a connection to the new master without the need of any further interaction.

```java
Copy@Configuration
class RedisSentinelApplicationConfig {

  @Bean
  RedisConnectionFactory connectionFactory() {
    return new JedisConnectionFactory(sentinelConfig());
  }
  
  @Bean
  RedisSentinelConfiguration sentinelConfig() {
    return new RedisSentinelConfiguration().master("mymaster")
      .sentinel("localhost", 26379)
      .sentinel("localhost", 26380)
      .sentinel("localhost", 26381);
  }
}
```

The upcoming Spring Boot 1.2, will even take this even further by automatically picking up the `RedisSentinelConfiguration` if present and initialize the `RedisConnectionFactory` accordingly.

## [](#schema-support-for-solr)Schema support for Solr

Although the [Solr Schema API](https://cwiki.apache.org/confluence/display/solr/Schema+API) is not finished yet, we already try to support as much of it as possible. With the Evans release you can now dynamically add missing fields to an existing (managed) schema. To achieve this, we read the existing field definition and compare it against the one derived from the properties of the domain type. To do so we extended the `@Indexed` annotation a bit. It now allows some fine tuning of the fields to be created as values such as `indexed`, `stored` and `solrType` can be explicitly defined.

```java
Copy@Configuration
@EnableSolrRepositories(schemaCreationSupport = true)
class SolrConfiguration {
  
  @Bean
  SolrServer solrServer() {
    return new HttpSolrServer("http://localhost:8983/solr");
  }
}

@SolrDocument(solrCoreName = "collection1")
class ManagedProduct {
  
  @Id String id;
  @Indexed(type = "text_general") String name;
  @Indexed(name = "cat") List<String> category;
}
```

As always we are eager to hear from you! Reach out to us on [Twitter](https://twitter.com/SpringData), [Stackoverflow](http://stackoverflow.com/tags/spring-data) or [JIRA](http://jira.spring.io) to request new features, suggest improvements or report a bug.