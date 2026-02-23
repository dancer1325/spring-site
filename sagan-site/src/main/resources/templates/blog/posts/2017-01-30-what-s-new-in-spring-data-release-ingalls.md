---
title: What\'s New in Spring Data Release Ingalls?
source: https://spring.io/blog/2017/01/30/what-s-new-in-spring-data-release-ingalls
scraped: 2026-02-23T18:40:21.162Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Paluch |  January 30, 2017 | 7 Comments
---

# What's New in Spring Data Release Ingalls?

_Engineering | Mark Paluch |  January 30, 2017 | 7 Comments_

As you probably have seen, we have [just announced](https://spring.io/blog/2017/01/26/spring-data-release-train-ingalls-goes-ga) the GA release of Spring Data release train Ingalls. As the release is packed with way too many features to cover them in a release announcement, I would like to use this post to take a deeper look at the changes and features that come with the 15 modules on the train.

## [](#housekeeping)[](#housekeeping)Housekeeping

A very fundamental change in the release train’s dependencies is the upgrade to Spring Framework 4.3 (currently 4.3.6) as the baseline. Other dependency upgrades are mostly driven by major version bumps of the underlying store drivers and implementations that need to be reflected in potential breaking changes to the API exposed by those modules.

Ingalls also ships with a new Spring Data Module: Spring Data LDAP. The Spring LDAP project has shipped Spring Data repository support for quite a while. After a couple of glitches and incompatibilities we decided to move LDAP repository support into a separate Spring Data module so that it is more closely aligned to the release train.

Another big change to the module setup is that Spring Data for Apache Cassandra has now become a core module, which means it now has been and is going to be maintained by the Spring Data team at Pivotal. A great chance to thank the previous core maintainers David Webb and Matthew T. Adams for all their efforts.

Besides those very fundamental changes, the team has been working on a whole bunch of new features:

-   Use of method handles for property access in conversion subsystem.
    
-   Support for XML and JSON based projections for REST payloads (Commons)
    
-   Cross-origin resource sharing with Spring Data REST
    
-   More MongoDB Aggregation Framework operators for array, arithmetic, date and set operations.
    
-   Support for Redis Geo commands.
    
-   Upgrade to Cassandra 3.0 with support for query derivation in repository query methods, User-defined types, Java 8 types (Optional, Stream), JSR-310 and ThreeTen Backport.
    
-   Support for Javaslang’s `Option`, collection and map types for repository query methods.
    

These are the ones that I would like to discuss in the remainder of this post.

## [](#performance-improvements)[](#performance-improvements)Performance improvements

### [](#methodhandles-for-improved-object-access)[](#methodhandles-for-improved-object-access)MethodHandles for improved object access

A major theme of our release train was to improve the performance in how our object-to-store mapping subsystem accesses data from domain classes. Traditionally, Spring Data has used reflection for that, either inspecting the fields directly or invoking accessor methods of properties.

Although the perfomance of reflection has significantly improved in Java 8, there is still a different way that we can use to even bring the performance close to native access: `MethodHandle`s. They are especially fast to use if they are held in static fields of a class, which poses a bit of a challenge to us as we do not know about the structure the domain types you want to persist beforehand. However, we already apply a similar kind of optimization to the creation of domain object instances by using ASM to generate tailor made factories that invoke constructors directly. We now went ahead and applied the same idea to our `PersistentPropertyAccessor` implementations: we inspect the types and ASM-generate a class that holds static final `MethodHandle`s, that our API to read and write properties then use to avoid reflection. In case the classes expose public API (e.g. accessors) we just use those.

In case you are interested, the implementation code can be found [here](https://github.com/spring-projects/spring-data-commons/blob/17366031071c68ddb87a9de1debac6f1dda85524/src/main/java/org/springframework/data/mapping/model/ClassGeneratingPropertyAccessorFactory.java). However, brace yourselves, ASM code might feel a bit complicated to read. All Spring Data modules using the object-to-store mapping benefit from this change (i.e. JPA does not) if you are running at least Java 7. You can find more details in the [ticket requesting that change](https://jira.spring.io/browse/DATACMNS-809). We have seen performance improvements from 20 to 70%.

### [](#domain-event-publication-from-aggregate-roots)[](#domain-event-publication-from-aggregate-roots)Domain event publication from aggregate roots

[Spring Application Events](https://docs.spring.io/spring/docs/current/spring-framework-reference/htmlsingle/#context-functionality-events) are usually used to publish technical events within an application. However, they’re also a great tool to decouple parts of a system by using the infrastructure for domain events. This is usually implemented like that:

```
Copyclass OrderManagement {

  private final ApplicationEventPublisher publisher;
  private final OrderRepository orders;

  @Transactional
  void completeOrder(Order order) {

    OrderCompletedEvent event = order.complete();
    orders.save(order);
    publisher.publish(event);
  }
}
```

See how the aggregate root produces an event which a service component then publishes via Spring’s `ApplicationEventPublisher`. The pattern is a nice one in general but involves quite a bit of ceremony and introduces a technical framework dependency in a business component which one might like to avoid.

With the Spring Data Ingalls release train, repositories now inspect the aggregates handed to `save(…)` methods for the aggregate method annotation `@DomainEvents`, invokes that method and automatically publishes the returned objects via the event publisher. So assuming an `Order.complete()` implementation looking something like this (`AbstractAggregateRoot` is a Spring Data provided type containing the annotated methods):

```
Copyclass Order extends AbstractAggregateRoot {

  Order complete() {
    register(new OrderCompletedEvent(this));
    return this;
  }
}
```

the client code can be simplified to

```
Copyclass OrderManagement {

  private final OrderRepository orders;

  @Transactional
  void completeOrder(Order order) {
    repository.save(order.complete());
  }
}
```

As you can see, there are no references to Spring infrastructure anymore. The event publication is taken care of by the component responsible for it: the aggregate root. Read more about that new mechanism in the [reference documentation](http://docs.spring.io/spring-data/commons/docs/current/reference/html/#core.domain-events). There are more advanced ideas regarding domain events circling around in the team currently. Watch this space for further updates.

### [](#pagination)[](#pagination)Pagination

Pagination queries with Spring Data MongoDB and Spring Data JPA now benefit from an [improved fetching strategy](https://github.com/spring-projects/spring-data-commons/blob/17366031071c68ddb87a9de1debac6f1dda85524/src/main/java/org/springframework/data/repository/support/PageableExecutionUtils.java#L46) that more aggressively tries to avoid executing a count query. Constructing a `Page` requires the fetched data and usually the total record count returned by the query. While data queries can be optimized with range selection and indexes, count queries are quite expensive because they require a scan of the table or an index. In case you request the last, only partially-filled page, we can skip counting the records as the toal number of elements can be calculated from the offset and numer of items in the result page.

### [](#mongodb-dbref-resolution)[](#mongodb-dbref-resolution)MongoDB DBRef resolution

Another performance-related change was made in Spring Data MongoDB’s `DBRef` fetching. Collections of references are fetched in a [single bulk-operation](https://github.com/spring-projects/spring-data-mongodb/blob/b79474c92c231ee4f2b3bd77fdde12878002acef/spring-data-mongodb/src/main/java/org/springframework/data/mongodb/core/convert/MappingMongoConverter.java#L1253) if the references in the collection point to the same database collection. That means, wen can basically read the related collection using a single query instead of one for each element.

## [](#xml-and-json-based-projections-for-rest-payloads)[](#xml-and-json-based-projections-for-rest-payloads)XML and JSON based projections for REST payloads

The [Evans](https://spring.io/blog/2014/09/09/spring-data-release-train-evans-goes-ga) and [Hopper](https://spring.io/blog/2016/05/03/what-s-new-in-spring-data-hopper) release trains shipped with projection features that allow customizing the view on existing domain objects by applying projection interfaces. Projections can be used in application code (repositories or manually implemented Spring MVC controllers) or with Spring Data REST to expose a dedicated view on a domain object through a web endpoint. The projection also could have been used to bind form submissions (see this example for details). With Ingalls we now extend that support to handle JSON and XML requests:

```
Copy@RestController
class UserController {

  /**
   * Receiving POST requests supporting both JSON and XML.
   */
  @PostMapping(value = "/")
  HttpEntity<String> post(@RequestBody UserPayload user) {

    return ResponseEntity
      .ok(String.format("firstname: %s, lastname: %s",
        user.getFirstname(), user.getLastname()));
  }
}

@ProjectedPayload
public interface UserPayload {

  @XBRead("//firstname")
  @JsonPath("$..firstname")
  String getFirstname();

  @XBRead("//lastname")
  @JsonPath("$..lastname")
  String getLastname();
}
```

Projection interfaces are annotated with `@ProjectedPayload` to enable projection and projection method annotations contain a [JSON path](https://github.com/jayway/JsonPath#getting-started) or [XPath expression](https://xmlbeam.org/t01.html#E01:_Printing_some_weather_data).

If these property annotations are omitted, we are going to assume defaults (i.e. `$.firstname` or `/firstname` etc. in the example above). The fundamental idea here is to — instead of using an object structure to map incoming data — rather point exactly to the parts of a payload that you are interested in. The use of JSON Path expressions or XPath allows you to be more lenient about the actual location of the element you want to access so that a change in the payload structure does not necessarily break the consumer. See how the example above looksup `firstname` anywhere in the document. If the party producing the JSON decided to all of a sudden nest that into e.g. a `user` document or XML sub node, nothing would need to change in the consuming code.

If you want to use that kind of payload access on the client, you can simply register the corresponding `HttpMessageConverter` instances on a `RestTemplate`:

```
Copy@Configuration
class Config {

  @Bean
  RestTemplateBuilder builder() {
    return new RestTemplateBuilder()
      .additionalMessageConverters(new ProjectingJackson2HttpMessageConverter())
      .additionalMessageConverters(new XmlBeamHttpMessageConverter());
  }
}
```

The projection binding support uses [JsonPath](https://github.com/jayway/JsonPath) to evaluate JSON-path expressions and [XMLBeam](https://xmlbeam.org/) to evaluate XPath expressions. You can find a complete example for this in in the [Spring Data Examples repository](https://github.com/spring-projects/spring-data-examples/tree/c523b8d468484075658a2b3c63a4a718c54bab16/web/projection).

## [](#cross-origin-resource-sharing-with-spring-data-rest)[](#cross-origin-resource-sharing-with-spring-data-rest)Cross-Origin Resource Sharing with Spring Data REST

Using client-side JavaScript requests inside of browsers is restricted by the [same-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy). Requesting data from other sources than the application server is a forbidden by default because it is a cross-origin request. Enabling Cross-Origin Resource Sharing (CORS) requires the target server to provide [CORS headers](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) to be sent with every HTTP response. The Ingalls release of Spring Data REST now allows you to easily:

```
Copy@CrossOrigin
public interface CustomerRepository extends CrudRepository<Customer, Long> {}

GET /customers/1 HTTP/1.1
Origin: http://localhost

HTTP/1.1 200 OK
Vary: Origin
ETag: "0"
Access-Control-Allow-Origin: http://localhost
Access-Control-Allow-Credentials: true
Last-Modified: Tue, 24 Jan 2017 09:38:01 GMT
Content-Type: application/hal+json;charset=UTF-8
```

Exported domain classes and repositories can be annotated with `@CrossOrigin` to enable CORS and the annotation can be used to customize the setup. For more global configuration you can use `RepositoryRestConfigurer.configureRepositoryRestConfiguration(…)` to gain full control over the CORS setup across all Spring Data REST exposed resources.

```
Copy@Component
public class SpringDataRestCustomization extends
  RepositoryRestConfigurerAdapter {

  @Override
  public void configureRepositoryRestConfiguration(
    RepositoryRestConfiguration config) {

    config.getCorsRegistry().addCorsMapping("/person/**")
      .allowedOrigins("http://domain2.com")
      .allowedMethods("PUT", "DELETE")
      .allowedHeaders("header1", "header2", "header3")
      .exposedHeaders("header1", "header2")
      .allowCredentials(false).maxAge(3600);
  }
}
```

Find more details about that in the [reference documentation](http://docs.spring.io/spring-data/rest/docs/current/reference/html/#customizing-sdr.configuring-cors).

## [](#new-mongodb-aggregation-framework-operators)[](#new-mongodb-aggregation-framework-operators)New MongoDB Aggregation Framework operators

The MongoDB team adds [new aggregation framework operators](https://docs.mongodb.com/manual/release-notes/3.4/#aggregation) on a regular basis. With the Ingalls release train, we took the chance to enhance Spring Data MongoDB’s set of available operators to align with MongoDB ones and how you interact with these. This release adds native support for the following aggregation operators and aggregation stages:

### [](#aggregation-operators)[](#aggregation-operators)Aggregation operators

-   `$anyElementTrue`, `$allElementsTrue`, `$setEquals`, `$setIntersection`, `$setUnion`, `$setDifference`, `$setIsSubset`
    
-   `$filter`, `$in`, `$indexOfArray`, `$range`, `$reverseArray`, `$reduce`, `$zip`
    
-   `$indexOfBytes`, `$indexOfCP`, `$split`, `$strLenBytes`, `$strLenCP`, `$substrCP`
    
-   `$stdDevPop`, `$stdDevSamp`
    
-   `$abs`, `$ceil`, `$exp`, `$floor`, `$ln`, `$log`, `$log10`, `$pow`, `$sqrt`, `$trunc`
    
-   `$arrayElementAt`, `$concatArrays`, `$isArray`
    
-   `$literal`, `$let`
    
-   `$dayOfYear`, `$dayOfMonth`, `$dayOfWeek`, `$year`, `$month`, `$week`, `$hour`, `$minute`, `$second`, `$millisecond`, `$dateToString`, `$isoDayOfWeek`, `$isoWeek`, `$isoWeekYear`
    
-   `$count`, `$cond`, `$ifNull`, `$map`, `$switch`, `$type`
    

### [](#aggregation-stages)[](#aggregation-stages)Aggregation stages

-   `$facet`, `$bucket`, `$bucketAuto`
    
-   `$replaceRoot`, `$unwind`, `$graphLookup`
    

Aggregation operators have entry points for creation and are built in a fluent style. Multiple aggregators are grouped in facades like `ArrayOperators`, `ArithmeticOperators` and many more. Field references and aggregation expressions can be used in the entry point methods. Entry points to aggregation stage operators are accessible via `Aggregation`.

```
CopyAggregation.newAggregation(
  project()
    .and(ArrayOperators.arrayOf("instock").concat("ordered")).as("items")
);

Aggregation.newAggregation(
  project()
    .and(ArithmeticOperators.valueOf("quizzes").sum()).as("quizTotal")
);

Aggregation.newAggregation(
  group().stdDevSamp("age").as("ageStdDev")
);

Aggregation.newAggregation(Employee.class,
  match(Criteria.where("name").is("Andrew")),
  graphLookup("employee")
    .startWith("reportsTo")
    .connectFrom("reportsTo")
    .connectTo("name")
    .depthField("depth")
    .maxDepth(5)
    .as("reportingHierarchy"));

Aggregation.newAggregation(bucketAuto("field", 5)
  .andOutputExpression("netPrice + tax").as("total")
);
```

Any currently unsupported aggregation operators and expressions can be used by implementing `AggregationOperation` or `AggregationExpression` respectively. Please also note that some of these operators were introduced in very recent MongoDB versions and can only be used with those.

The growing number of operators opens up a whole lot new set of possibilities to combine them with each other. Operators can be nested in various combinations, which can sometimes lead to code that is hard to read.

```
CopynewAggregation(
  project()
    .and(ConditionalOperators.when(Criteria.where("a").gte(42))
      .then("answer")
      .otherwise("no-answer"))
      .as("deep-tought")
);
```

To simplify this code we now support Spring Expression Language (SpEL) expressions to formulate the same projection like this:

```
CopynewAggregation(
  project()
    .andExpression("cond(a >= 42, 'answer', 'no-answer')")
    .as("deep-tought")
);
```

SpEL support in aggregations is not something entirely new. In fact, it has been available since Spring Data MongoDB 1.6. So far it supported arithmetic operations (like `'$items.price' * '$items.quantity'`). The new bit that Ingalls adds here is that now aggregation operators can be expressed as functions that accept parameters. You pass fields to aggregation operators by using their field names. The aggregation framework then evaluates SpEL expressions and creates the BSON documents for the aggregation operator.

The gateway to SpEL is `AggregationSpELExpression.expressionOf(…)` that allows handing in SpEL expressions everywhere you are able to hand in an `AggregationExpression`.

```
CopynewAggregation(
  group("number")
    .first(expressionOf("cond(a >= 42, 'answer', 'no-answer')"))
    .as("deep-tought")
)
```

Refer to the [reference documentation](http://docs.spring.io/spring-data/mongodb/docs/current/reference/html/#mongo.aggregation) or the [MongoDB Aggegation Framework example](https://github.com/spring-projects/spring-data-examples/blob/9a2e95a784cf449bdda372668ae78e8d5c06956d/mongodb/aggregation/src/test/java/example/springdata/mongodb/aggregation/SpringBooksIntegrationTests.java) for further details.

## [](#redis-geo-indexes)[](#redis-geo-indexes)Redis Geo Indexes

Redis 3.2 supports geo indexing and we received great support from our community regarding geo indexes. We ship geo index support with Ingalls that is available through `RedisTemplate` and Redis repositories. Let us have a look at an example:

```
CopygeoOperations.geoAdd("Sicily", new Point(13.361389, 38.115556), "Arigento");
geoOperations.geoAdd("Sicily", new Point(15.087269, 37.502669), "Catania");
geoOperations.geoAdd("Sicily", new Point(13.583333, 37.316667), "Palermo");

GeoResults<GeoLocation<String>> result =
  geoOperations.geoRadiusByMember("Sicily", "Palermo",
    new Distance(100, DistanceUnit.KILOMETERS));

List<String> geohashes = geoOperations.geoHash("Sicily", "Arigento", "Catania");
List<Point> points = geoOperations.geoPos("Sicily", "Arigento", "Palermo");
```

Geo indexes integrate seamless with your domain classes. Domain objects with geospatial values can be indexed in a Geo index and queried through Redis repositories. The following example shows domain class and repository interface declarations:

```
Copypublic class City {

  @Id String id;
  String name;

  @GeoIndexed Point location;
}

public interface CityRepository extends Repository<City, String> {

  List<City> findByLocationNear(Point point, Distance distance);
}
```

Declaring a repository query using the `Near` or `Within` keywords lets you use geospatial queries near a `Point` or within a `Circle`. Note the `@GeoIndexed` annotation used on `location` allows the usage of a geo-index that can be used with the derived geospatial query method.

## [](#spring-data-for-apache-cassandra)[](#spring-data-for-apache-cassandra)Spring Data for Apache Cassandra

Spring Data for Apache Cassandra is now a core module maintained by the Spring Data team. Besides the change in primary ownership of development effort, the Ingalls release train ships with a series of noteworthy changes to the module itself.

We upgraded to the Datastax Java Driver 3.1 and so Spring Data for Apache Cassandra now supports Apache Cassandra 3.0 (1.2, 2.0, 2.1, 2.2 and 3.0, up to 3.9).

This release also ships with support for query derivation so that you do not necessarily have to use string queries but can derive an Apache Cassandra CQL query from the query method name:

```
Copypublic interface BasicUserRepository extends Repository<User, Long> {

  /**
   * Derived query method.
   * Creates {@code SELECT * FROM users WHERE username = ?0}.
   */
  User findUserByUsername(String username);

  /**
   * Derived query method using SASI (SSTable Attached Secondary Index)
   * features through the {@code LIKE} keyword.
   * This query corresponds with
   * {@code SELECT * FROM users WHERE lastname LIKE '?0'}.
   * {@link User#lastname} is not part of the
   * primary key so it requires a secondary index.
   */
  List<User> findUsersByLastnameStartsWith(String lastnamePrefix);
}
```

You can find examples for query derivation for Spring Data for Apache Cassandra in our [examples repository](https://github.com/spring-projects/spring-data-examples/blob/c523b8d468484075658a2b3c63a4a718c54bab16/cassandra/example/src/main/java/example/springdata/cassandra/basic/BasicUserRepository.java).

Query derivation supports all predicates provided by Apache Cassandra and ships with predicates for SASI (SSTable Attached Secondary Index) indexes. In this context, query derivation is in not opinionated about primary keys or columns with a secondary index. There is no support for `AllowFiltering` [yet](https://jira.spring.io/browse/DATACASS-376). Also, repository query methods also support `Stream` as a return type. Using a `Stream` does not preload the whole result set but iterates over the results as you pull on the stream.

To round things off, you can now use JSR-310 and ThreeTen back-port types as well as JodaTime types in your domain classes that were added as part of the Java 8 support story. JSR-310 types are converted to native Apache Cassandra data types. Refer to the revised [reference documentation](http://docs.spring.io/spring-data/cassandra/docs/1.5.0.RELEASE/reference/html/#mapping-conversion) or our [Java 8 examples](https://github.com/spring-projects/spring-data-examples/tree/c523b8d468484075658a2b3c63a4a718c54bab16/cassandra/java8) for details.

```
Copypublic class Order {

  @Id String id;
  LocalDate orderDate;
  ZoneId zoneId;
}

public interface OrderRepository extends Repository<Order, String> {

  /**
   * Method parameters are converted according the registered
   * Converters into Cassandra types.
   */
  @Query("SELECT * from pizza_orders WHERE orderdate = ?0 and zoneid = ?1 ALLOW FILTERING")
  Order findOrderByOrderDateAndZoneId(LocalDate orderDate, ZoneId zoneId);

  /**
   * String-based query using native data types.
   */
  @Query("SELECT * from pizza_orders WHERE orderdate = ?0 and zoneid = ?1 ALLOW FILTERING")
  Order findOrderByDate(com.datastax.driver.core.LocalDate orderDate, String zoneId);

  /**
   * Streaming query.
   */
  Stream<Order> findAll();
}
```

Data type support is configurable by registering custom conversions. For details on this, make sure you check out the examples [dedicated to this on GitHub](https://github.com/spring-projects/spring-data-examples/tree/c523b8d468484075658a2b3c63a4a718c54bab16/cassandra/example/src/main/java/example/springdata/cassandra/convert).

A last noteworthy feature is user-defined types (UDT). With Ingalls, you can now either use mapped user-defined types embedded in your domain classes or just use the native `UDTValue` type.

```
Copy@Table
public class Person {

  @Id int id;

  String firstname, lastname;
  Address current;
  List<Address> previous;

  @CassandraType(type = Name.UDT, userTypeName = "address")
  UDTValue alternative;
}

@UserDefinedType
public class Address {
  String street, zip, city;
}
```

Explicitly mapped iser-defined types map structured values to `UDTValue` under the coverts so thatyyou can keep working with a domain class while the mapping is handled by Spring Data for Apache Cassandra.

UDT values are stored in a row which makes mapped UDTs embedded objects. You can use UDTs as singular property or as part of a collection type. If you are using schema creation, then user-defined types are created in the data store on application startup. UDTs are value objects conceptually, which means that updates to UDT values (by saving a domain object) result in replacing the entire value.

For details on particular features please refer to the revised [reference documentation](http://docs.spring.io/spring-data/cassandra/docs/1.5.0.RELEASE/reference/html/) or the [UDT example](https://github.com/spring-projects/spring-data-examples/tree/9a2e95a784cf449bdda372668ae78e8d5c06956d/cassandra/example/src/main/java/example/springdata/cassandra/udt).

## [](#support-for-javaslang)[](#support-for-javaslang)Support for Javaslang

Spring Data repositories now support [Javaslang](http://www.javaslang.io/)'s [`Option`](http://static.javadoc.io/io.javaslang/javaslang/2.1.0-alpha/javaslang/control/Option.html) and collection types as return values for repository query methods. `Option` can be used as an alternative to JDK 8’s `Optional`, [`Seq`](http://static.javadoc.io/io.javaslang/javaslang/2.1.0-alpha/javaslang/collection/Seq.html) can be used as an alternative to JDK’s `List`. Javaslang’s `Set` and `Map` are supported, too, and transparently mapped from their JDK counterparts.

```
Copypublic interface PersonRepository extends Repository<Person, Long> {

    Option<Person> findById(Long id);

    Seq<Person> findByFirstnameContaining(String firstname);
}
```

For more information see the [JPA with Javaslang example](https://github.com/spring-projects/spring-data-examples/blob/a41f69127caba6f7b96c868336b93968c000f728/jpa/javaslang/src/test/java/example/PersonRepositoryIntegrationTests.java#L49-L73).

## [](#spring-data-ldap)[](#spring-data-ldap)Spring Data LDAP

The Spring LDAP project has shipped support for Spring Data repositories itself for quite a while. With Ingalls, we have extracted that support into a Spring Data module, so that changes that we make to our internal SPIs propagate to the LDAP based implementation more quickly.

If you are an existing Spring LDAP repositories user, you are affected by this change and need to adopt two changes to your project:

1.  Add [`Spring Data LDAP`](http://projects.spring.io/spring-data-ldap/#quick-start) to your project dependencies.
    
2.  Change the packages to the repository components from `org.springframework.ldap.repository` to `org.springframework.data.ldap.repository`.
    

That said, Spring LDAP 2.3.0 already removed its repository support and if you follow the steps above you can continue using LDAP repositories with Spring Data LDAP 1.0. Learn more about LDAP repositories by taking a look at our [Spring Data LDAP example](https://github.com/spring-projects/spring-data-examples/tree/9a2e95a784cf449bdda372668ae78e8d5c06956d/ldap/example).

## [](#conclusion)[](#conclusion)Conclusion

I hope I could give you a quick overview about the new features of the Ingalls release train. We’re looking forward to your feedback via our [Gitter channel](https://gitter.im/spring-projects/spring-data). Also, please go ahead and report any bugs you spot in our [JIRA](https://jira.spring.io). Happy coding!