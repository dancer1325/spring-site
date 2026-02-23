---
title: What\'s new in Spring Data Fowler?
source: https://spring.io/blog/2015/03/26/what-s-new-in-spring-data-fowler
scraped: 2026-02-23T21:10:04.128Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Thomas Darimont |  March 26, 2015 | 11 Comments
---

# What's new in Spring Data Fowler?

_Engineering | Thomas Darimont |  March 26, 2015 | 11 Comments_

The GA release of Spring Data release train Fowler marks the finishing line of 6 month of development. It's time to give you an impression of the content of this release and a brief overview about individual features. The major themes of the Fowler release train were performance improvements and enhanced Java 8 support that are mainly reflected in the Spring Data JPA and MongoDB modules but a lot of other ones have seen significant improvements, too.

The easiest way to upgrade to the Spring Data Fowler release train is by using Spring Boot and configuring the `spring-data-releasetrain.version` property to `Fowler-RELEASE`. If you're not using Spring Boot yet, add the [Spring Data BOM](http://search.maven.org/#artifactdetails%7Corg.springframework.data%7Cspring-data-releasetrain%7CFowler-RELEASE%7Cpom) to your `<dependencyManagement />` section of your Maven POM.

## [](#general-themes)General themes

### [](#java-8-streams-in-repository-methods)Java 8 streams in repository methods

One of Java 8's great new features is the `Stream` API, which allows Java developers to define a pipeline of operations to be executed on a stream of objects but only the final operation actually triggering the consumption of elements from the `Stream`.

In the context of data access providing the result of a query execution as `Stream` is an extremely useful use case as it prevents the caller of the query method from blocking until all items were read. Not even mentioning the more efficient memory usage here.

With the Fowler release we introduce support for Java 8 Streams as return types of finder methods in repositories. In both the MongoDB and the JPA module you can now go ahead and declare finder methods like this:

```java
Copyinterface CustomerRepository extends Repository<Customer, Long> {

  Stream<Customer> findByLastname(String lastname);
}
```

Calling this method will execute the query backing the repository method and immediately return once the first result is available. To achieve this with JPA, we use persistence provider specific API as JPA itself only provides means to obtain query results as `List`s. Repository clients can now go ahead and use the result of the method call in a try-with-resources block. This will make sure the resources held open to be able to traverse the stream will be closed eventually:

```java
Copytry (Stream<Customer> customers = repository.findByLastname("Matthews")) {
  customers.filter(…).map(…).collect(…);
}
```

### [](#jsr-310-and-threeten-backport-support)JSR-310 and ThreeTen Backport support

To easily persist *non-time-zoned* JSR-310 types - the date/time API newly introduced in JDK 8 - from within domain objects we added converters for the relevant types in the MongoDB and JPA module. For developers not able to upgrade to Java 8 yet, we added a similar set of converters for the [ThreeTen Backport project](https://github.com/ThreeTen/threetenbp) so that you can start using the types in your code even if you're still on Java 7. A switch to Java 8 will be a simple switch in the package names going forward.

In the MongoDB module, the corresponding `Converter` implementations are available automatically. For JPA you can simply register either `Jsr310JpaConverters` or `ThreeTenBackPortJpaConverters` with your persistence provider. If you're using a `LocalContainerEntityManagerFactoryBean` to set up your JPA environment in Spring simply add `org.springframework.data.jpa.convert.threeten` or `….threetenbp` to the packages to scan. With Spring Boot, it's just a matter of adding the aforementioned classes to the `@EntityScan` declaration:

```java
Copy@EntityScan(
  basePackageClasses = { Application.class, Jsr310JpaConverters.class }
)
@SpringBootApplication
class Application { … }
```

This setup will make sure that both your application package and the Spring Data JPA one for the JSR-310 converters will be scanned and handed to the persistence provider. Find a complete example for that in our [Spring Data Examples repository](https://github.com/spring-projects/spring-data-examples/tree/master/jpa/java8). Note, that due to the fact that the converter simply converts the JSR-310 types to legacy `Date` instances, *only non-time-zoned* (e.g. `LocalDateTime` etc.) are supported.

## [](#mongodb)MongoDB

### [](#30-server-and-driver-support)3.0 server and driver support

Spring Data Fowler ships support for the latest and greatest MongoDB 3.0 server generation. While that generation can already be used with the MongoDB Java driver in version 2.13.0 we also made sure Spring Data MongoDB will work flawlessly with the upcoming 3.0 version of the Java driver. Thus, developers are free to choose which version they're going to work with or rather when they would like to upgrade to the new driver. For general information on compatibility between driver and server versions be sure to check out the [MongoDB documentation](http://docs.mongodb.org/ecosystem/drivers/java/) Be aware though that subsequent development will clearly focus on the 3.0 line of both the server and the driver.

In general we encourage everyone to favour `MongoClient` over `Mongo` within JavaConfig or use the newly introduced XML elements for `<mongo:mongo-client />` and `<mongo:client-options />`. For more information please refer to the [reference documentation](http://docs.spring.io/spring-data/mongodb/docs/1.7.0.RELEASE/reference/html/#mongo.mongo-3).

### [](#geojson-support)GeoJSON support

It’s been awhile since MongoDB had introduced [GeoJSON](http://geosjon.org) as format for dealing with geo structures. These data structures operate on an earth like sphere and therefore cannot be used along with a 2D index. Having said that, the usage is pretty much straight forward since we provide dedicated types to support GeoJSON. Those can be used in both your domain types as well as query parameters.

```java
Copy@Document
class Store {

  @Id String id;

  /**
   * The location is stored in GeoJSON format:
   * { "type" : "Point", "coordinates" : [ x, y ] }
   */
  GeoJsonPoint location;
}

interface StoreRepository extends CrudRepository<Store, String> {

  List<Store> findByLocationWithin(Polygon polygon);
}

repo.findByLocationWithin(
  new GeoJsonPolygon(
    new Point(-73.992514, 40.758934),
    new Point(-73.961138, 40.760348),
    new Point(-73.991658, 40.730006),
    new Point(-73.992514, 40.758934)));
```

This creates the following query to be executed in MongoDB:

```json
Copy{
  "location": {
    "$geoWithin": {
      "$geometry": {
        "type": "Polygon",
        "coordinates": [[
           [-73.992514,40.758934],
           [-73.961138,40.760348],
           [-73.991658,40.730006],
           [-73.992514,40.758934]
        ]]
      }
    }
  }
}
```

Note that the `StoreRepository.findByLocationWithin(…)` still takes a `Polygon`. Using `GeoJsonPolygon` with `findByLocationWithin(…)` will create the query using the `$geometry` operator alongside the GeoJSON representation. More Details on usage and restrictions can be found in the [MongoDB manual](http://docs.mongodb.org/manual/core/2dsphere/#geospatial-indexes-store-geojson/).

### [](#execution-of-mongodb-stored-scripts)Execution of MongoDB stored scripts

MongoDB allows to execute JavaScript functions on the server by either directly sending the raw source script or calling one previously stored. We expose this functionality through the newly introduced `ScriptOperations` interface which can be obtained from `MongoOperations`.

```java
CopyScriptOperations ops = mongoOperations.scriptOps();
ExecutableMongoScript script = new ExecutableMongoScript("function(x) { return x; }");
Object r1 = ops.execute(script, "Direct function execution.")

ops.register(new NamedMongoScript("echo", script));
Object r2 = ops.call("echo", "Call stored function.");
```

The server-side script support will be enhanced in follow-up releases where we will add return type conversion, annotations for calling procedures from repository methods as well as support for the `$where` operator.

### [](#performance-improvements-in-object-to-store-conversion)Performance improvements in object-to-store conversion

The object-to-store mapping subsystem has undergone a significant overhaul in terms of performance improvements. We profiled the Commons and store modules, introduced some caching here and there and could actually gain quite an impressive increase of operations per second compared to the Evans release train (although most of the improvements were ported back to the service releases of Evans, too).

![Performance improvements in Spring Data Fowler](https://gist.githubusercontent.com/olivergierke/1d4239b59c57e05760c3/raw/fowler-bar-chart-read-write.png)

As you can see, we more than doubled the number of operations per second for read access and are a close to that in write operations, too.

When reading a lot of objects from the data store, a significant amount of time is spent creating the object instances via reflection. With the Fowler release train we introduce a new default `EntityInstantiator` that solves that bottleneck by creating a factory class for the domain object at runtime using ASM. This factory class calls the constructor of the domain class directly, which is significantly faster than doing so by reflection. If you're interested in the nifty details, [here](https://github.com/spring-projects/spring-data-commons/blob/1.10.0.RELEASE/src/main/java/org/springframework/data/convert/BytecodeGeneratingEntityInstantiator.java#L54)'s the class that does the trick for us.

## [](#redis)Redis

### [](#hyperloglog)HyperLogLog

Redis [HyperLogLog commands](http://redis.io/commands#hyperloglog) provide an efficient solution to counting unique things without the need to remember elements already encountered. This applies for instance to counting unique page visits by IP.

```java
CopyHyperLogLogOperations hll = redisTemplate.opsForHyperLogLog();

hll.add(today(), "8.8.8.8", "8.8.4.4");
hll.size(today()); // Unique page visits today = 2

hll.add(today(), "198.153.192.40", "8.8.8.8");
hll.size(today()); // Unique page visits today = 3
hll.size(today(), yesterday()); // Unique page visits today and yesterday
```

## [](#gemfire)Gemfire

By far, the most significant change to the GemFire module is full support for GemFire 8. GemFire 8 introduced [several new changes](http://gemfire80.docs.pivotal.io/8.0.0/userguide/index.html#relnotes/release_notes.html#topic_5mbwjl) since 7.0.2 including a new [cluster-based configuration service](http://gemfire80.docs.pivotal.io/8.0.0/userguide/index.html#relnotes/release_notes.html#topic_5mbwjl__section_zk2_p35_v4).

With that service enabled, developers can record their actions and schema-like changes in Gfsh as they perform actions, like adding regions, creating indexes, configuring disk stores, etc. When a developer spins up a new GemFire peer in the cluster, the member will automatically pick up its configuration from the new cluster-based configuration service, hosted in a locator.

While Spring Data GemFire's [XML-namespace-based configuration](http://docs.spring.io/spring-data-gemfire/docs/current/reference/html/#bootstrap) remains a popular choice, especially during development with highly iterative, short feedback cycles, Spring Data GemFire adds support for the new [cluster-based configuration](http://docs.spring.io/spring-data-gemfire/docs/1.6.0.RC1/reference/html/#bootstrap:cache:cluster-configuration), which behaves similarly to Spring Data Gemfire's support for GemFire's [native \`cache.xml](http://docs.spring.io/spring-data-gemfire/docs/1.6.0.RC1/reference/html/#bootstrap:cache) format.

To enable cluster-based configuration in Spring-configured GemFire node, a developer only needs to set the `use-cluster-configuration` attribute on the `<gfe:cache />` element, like this:

```xml
Copy<gfe:cache id="gemfireCache" use-cluster-configuration="true" … />
```

Spring Data GemFire will first request and apply the cluster-wide configuration before applying the XML namespace-specific configuration. You can think of the XML configuration meta-data as augmenting the cluster config sent by the cluster configuration service.

For more information on GemFire's new cluster configuration service, see the [GemFire user guide](http://gemfire80.docs.pivotal.io/8.0.0/userguide/index.html#deploying/gfsh/gfsh_persist.html) and [SGF-226](https://jira.spring.io/browse/SGF-226) for more details.

## [](#spring-data-rest)Spring Data REST

Spring Data REST has seen a wide range of improvements in the Fowler release, too. One of the most notable improvements is more entity metadata inspected and used to populate response headers. For example, stores supporting optimistic locking through an `@Version` annotation will now get the entity version used as `ETag` header, so that clients can leverage them to trigger conditional `GET` requests.

Quite related, entities that use Spring Data auditing support will automatically get their last modification date be propagated into the `LastModified` header of the response of item resources:

```java
Copyclass Customer {

  @Version Long version;
  @LastModifiedDate LocalDate lastModifiedDate;
}
```

```
Copycurl -v http://…/customers/1

Etag: 1
Last-Modified: Tue, 24 Mar 2015 12:34:56 GMT
```

### [](#json-schema)JSON Schema

The Fowler release of Spring Data REST also ships with revamped support for JSON Schema. By default, the schema is pointed to by the representation descriptor in the ALPS document exposed for a domain type. In the [Starbucks example](https://github.com/spring-projects/spring-data-examples/tree/master/rest/starbucks) you can see the link rendered like this:

```
Copycurl http://…/alps/stores

{
  "version": "1.0",
  "descriptors": [ {
    "id": "store-representation",
    "href": "http://localhost:8080/stores/schema",
    "descriptors": [ … ]
  }],
  …
}
```

Following the link will reveal the JSON Schema document for a store:

```
Copy{
  "title": "example.stores.Store",
  "properties": {
    "address": {
      "$ref": "#/descriptors/address"
    },
    "name": {
      "type": "string"
    }
  },
  "descriptors": {
    "address": {
      "type": "object",
      "properties": {
        "zip": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "street": {
          "type": "string"
        },
        "location": {
          "$ref": "#/descriptors/point"
        }
      }
    },
    "point": {
      "type": "object",
      "properties": {
        "x": {
          "type": "number"
        },
        "y": {
          "type": "number"
        }
      }
    }
  },
  "type": "object",
  "$schema": "http://json-schema.org/draft-04/schema#"
}
```

Note how we derive basic traits of the schema from the domain type and its Jackson mappings. Required properties can be determined by using `@JsonProperty(required = true)`, date/time types are correctly discovered and advertised. You can register a custom JSON Schema format or pattern on `RepositoryRestConfiguration.metadataConfiguration()`:

```java
Copy@Configuration
static class SampleConfiguration extends RepositoryRestMvcConfiguration {

  @Override
  protected void configureRepositoryRestConfiguration(
    RepositoryRestConfiguration config) {
    config.metadataConfiguration().
      registerJsonSchemaFormat(JsonSchemaFormat.EMAIL, EmailAddress.class);
  }
}
```

Assuming `EmailAddress` is a value object that you have tweaked Jackson into rendering as plain `String`, this configuration will cause all properties of type `EmailAddress` to appear with the `format`set to `email` in the JSON schema document.

## [](#solr)Solr

### [](#document-score-improvements)Document score improvements

The Fowler release added support for realtime-get allowing to read uncommitted changes from the index. `getById` is available on `SolrTemplate`. Also noteworthy is the addition of `@Score` which was inspired by `@TextScore` available for Spring Data MongoDB. The annotation allows retrieving document score and will implicitly add required parameters so that one no longer has to explicitly add `@Query(fields={"*", "score"}` when retrieving document query match score.

## [](#miscellaneous)Miscellaneous

### [](#elevating-projections)Elevating projections

Spring Data REST shipped a feature called projections with the Evans release train. In Fowler we moved the infrastructure backing that into Spring Data Commons and tweaked it a bit, so that other projects can use it without further dependencies. The very heart of the feature is a `ProjectionFactory` that allows you to create object instances for interfaces that are backed some other object, e.g. a `Map`.

```java
Copyinterface Customer {

  String getFirstname();

  String getLastname();

  @Value("#{target.firstname + ' ' + target.lastname}")
  String getFullName();
}
```

This interface can now be turned into an object using a `ProjectionFactory`:

```java
CopyMap<String, Object> map = new HashMap<>();
map.put("firstname", "Dave");
map.put("lastname", "Matthews");

ProjectionFactory factory = new SpelAwareProjectionFactory();
Customer customer = factory.createProjection(Customer.class, map)

assertThat(customer.getFirstname(), is("Dave"));
assertThat(customer.getLastname(), is("Matthews"));
assertThat(customer.getFullName(), is("Dave Matthews"));
```

As you can see, we chose a `Map` to back the created projection instance. Under the hood a JDK proxy is created equipped with method interceptors that - in case of a `Map` backing the proxy - delegating calls to accessors to property lookups within the `Map`. Methods annotated with `@Value` will get the annotated SpEL expression evaluated. In case you configure a `BeanFactory` on the `SpelAwareProjectionFactory` you can even refer to Spring beans from within these expressions and thus trigger more complex calculations.

In case the backing lookup does not return a value assignable to the return type declared, a standard `ConversionService` is used for simple conversions followed by a recursive projection step.

For an example of how to use projections within a Spring MVC controller, see [this answer on StackOverflow](http://stackoverflow.com/a/29386907/18122).

### [](#projections-in-spring-mvc)Projections in Spring MVC

The projection mechanism can now be used by Spring MVC controller implementations to create form backing objects solely using interfaces. Using `@EnableSpringDataWebSupport` in your Spring configuration (automatically activated in Boot) a `ProxyingHandlerMethodArgumentResolver` is resolved that will automatically create a proxy instance for the interface and bind the according request parameters to it:

```java
Copyinterface Form {

  @NotBlank String getName();
  @NotBlank String getText();
}

@Controller
@RequestMapping(value = "/guestbook")
class GuestbookController {

  @RequestMapping(method = RequestMethod.GET)
  String guestbook(Form form, Model model) { … }

  @RequestMapping(method = RequestMethod.POST)
  String guestbook(@Valid Form form, Errors errors, Model model) { … }
}
```

See how the interface is used in the method accepting a `GET` request to provide an empty form-backing object to the view about to be rendered. The method receiving the `POST` request uses the `Form` to indicate it wants to get form data bound to the proxy instance and validation applied.

## [](#summary)Summary

Despite the length of the post, we barely scratched the surface of all the new features Spring Data Fowler ships. You might want to explore the [release train wiki](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Fowler) for further gems, and traverse the links to the tickets and related commits in turn as they contain test cases that usually demonstrate a the individual features nicely.

Also, the already mentioned [Spring Data examples repository](https://github.com/spring-projects/spring-data-examples) has a lot of stuff to play with and explore.