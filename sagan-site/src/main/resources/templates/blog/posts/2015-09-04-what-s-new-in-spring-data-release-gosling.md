---
title: What\'s New In Spring Data Release Gosling?
source: https://spring.io/blog/2015/09/04/what-s-new-in-spring-data-release-gosling
scraped: 2026-02-23T19:43:22.555Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Christoph Strobl |  September 04, 2015 | 5 Comments
---

# What's New In Spring Data Release Gosling?

_Engineering | Christoph Strobl |  September 04, 2015 | 5 Comments_

Over 300 issues fixed across 12 projects makes it pretty hard to keep track on what has happened since the last release. So here's a more detailed excerpt of some of the new features we've been cooking during the last iteration.

## [](#ad-hoc-jpa-fetch-graphs)Ad-hoc JPA fetch graphs.

Since the Dijkstra release train we have been able to refer to the named entity graph declared on the entity through the `@EntityGraph` annotation in JPA-backed repositories. In the example below this forces firstname and lastname to be loaded eagerly, while all others remain lazily loaded.

```java
Copy@Entity
@NamedEntityGraphs(
  @NamedEntityGraph(name = "with-tags",
    attributeNodes = { @NamedAttributeNode("tags") }))
class Product {

  @ManyToMany
  Set<Tag> tags;

  // other properties omitted
}

interface ProductRepository extends Repository<Customer, Long> {

  @EntityGraph("with-tags")
  Product findOneById(Long id);
}
```

The Gosling release now takes our JPA 2.1 story one step forward, extending it to ad-hoc fetch graph definitions. By explicitly specifying properties via `@EntityGraph(attributePaths = …)` on the query method you don't need to have the `NamedEntityGraph` annotation on your entity.

```java
Copy@Entity
class Product {

  @ManyToMany
  Set<Tag> tags;

  // other properties omitted
}

interface ProductRepository extends Repository<Customer, Long> {

  @EntityGraph(attributePaths = {"tags"})
  Product findOneById(Long id);
}
```

## [](#querydsl-web-support)Querydsl web support

The Spring Data web support already lets you declare parameters of type `Pageable` in your controller handler methods. The newly introduced Querydsl integration extends that to allow you to receive a ready to use `Predicate` derived directly from the HTTP request's query string. The feature is automatically enabled when `@EnableSpringDataWebSupport` is configured and Querydsl is found on the classpath.

If `Predicate` is used without further configuration we'll try to resolve the root type for `Predicate` resolution from the method's return type, although in most cases it might be better to explicitly declare the desired type reference via `@QuerydslPredicate(root = …)`. Having that in place, query string attributes are bound to matching properties of the type which creates e.g.

```java
CopyQUser.user.firstname.eq("Dave").and(QUser.user.lastname.eq("Matthews")) 
```

from `?firstname=Dave&lastname=Matthews` using the default property type dependent binding.

```java
Copy@SpringBootApplication
public class Application {

  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }

  @Controller
  @RequiredArgsConstructor(onConstructor = @__(@Autowired))
  static class UserController {

    private final UserRepository repository;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    String index(Model model,
                 @QuerydslPredicate(root = User.class) Predicate predicate,
                 Pageable pageable) {

      model.addAttribute("users", repository.findAll(predicate, pageable));
      return "index";
    }
  }
}
```

Now it does not always make sense to use the default (equals) binding, but rather a dedicated binding per property or a type specific one. To achieve this just override the defaults by providing a `QuerydslBinderCustomizer` that can either be registered via `@QuerydslPredicate(bindings = …)` or is simply implemented by to the repository.

```java
Copyinterface UserRepository extends CrudRepository<User, String>,
    QueryDslPredicateExecutor<User>,
    QuerydslBinderCustomizer<QUser> {

  // Query methods go here

  @Override
  default public void customize(QuerydslBindings bindings, QUser user) {

    bindings.bind(user.nationality).first(
      (path, value) -> path.equalsIgnoreCase(value)); // 1
    bindings.bind(String.class).first(
      (StringPath path, String value) -> path.containsIgnoreCase(value)); // 2
    bindings.excluding(user.password);
  }
}
```

As you can see we leverage Java 8 lambdas along side Querydsl's type-safe property references to define the binding for a dedicated property (1) or for all properties of a given type (2). Using `QuerydslBindings.excluding` allows you remove paths from being queryable.

Find a complete working example in the [Spring Data examples repository](https://github.com/spring-projects/spring-data-examples/tree/master/web/querydsl) and check out the [reference documentation](http://docs.spring.io/spring-data/jpa/docs/1.9.0.RELEASE/reference/html/#core.web.type-safe) for details.

## [](#spring-data-rest)Spring Data REST

### [](#querydsl-support)Querydsl support

The Querydsl support introduced in Spring Data Commons (see [above](#querydsl-web-support)) has been integrated into Spring Data REST. That means that you can filter your collection resources by appending simple property query parameters to the request URI.

In the Spring Data REST example exposing Starbucks store locations, note how StoreRepository now implements both `QueryDslPredicateExecutor` as well as `QuerydslBinderCustomizer<QStore>` just as described above.

The collection resource for stores exposed by Spring Data REST will let you then issue requests like these:

```bash
Copy$ http :8080/api/stores?address.city=York

{
    "_embedded": {
        "stores": [
            {
                "_links": {
                    …
                }, 
                "address": {
                    "city": "New York", 
                    "location": { "x": -73.938421, "y": 40.851 }, 
                    "street": "803 W 181st St", 
                    "zip": "10033-4516"
                }, 
                "name": "Washington Hgts/181st St"
            }, 
            {
                "_links": {
                    …
                }, 
                "address": {
                    "city": "New York", 
                    "location": { "x": -73.939822, "y": 40.84135 }, 
                    "street": "4001 Broadway", 
                    "zip": "10032-1508"
                }, 
                "name": "168th & Broadway"
            }, 
            …
        ]
    }, 
    "_links": {
        …
    }, 
    "page": {
        "number": 0, 
        "size": 20, 
        "totalElements": 209, 
        "totalPages": 11
    }
}
```

Note how only returns stores whose city ends with "York", just as defined in the implementation of `QuerydslBinderCustomizer` in `StoresRepository`.

We're currently looking into options to advertise this querying mechanism more obviously, e.g. using template variables and even provide advanced mapping facilities to customize the request parameter names to be used.

### [](#custom-hal-browser)Custom HAL Browser

The Gosling release of Spring Data REST ships with an additional module that wraps Mike Kelly's [HAL browser](https://github.com/mikekelly/hal-browser) and tweaks it with a few customizations to leverage the API metadata we expose. To use the browser with your application simply add the `spring-data-rest-hal-browser` module to your project and your API root will serve the browser for requests accepting `text/html`. The standard HAL responses are of course still served by default or if you use a JSON based `Accept` header.

[!\[HAL browser\](https://gist.githubusercontent.com/olivergierke/4d3683c12769211d97cb/raw/9d11209ea9840b42693854ba62f8a46bc9940f39/hal-browser.png)](https://gist.githubusercontent.com/olivergierke/4d3683c12769211d97cb/raw/9d11209ea9840b42693854ba62f8a46bc9940f39/hal-browser.png)

Fig 1. - HAL Browser (click to enlarge)

While the Spring Data REST module makes it easy to add the browser to your app, it also tweaks the browser slightly. When you click the button to trigger a non-`GET` request, the browser would normally open a modal dialogue that expects some raw JSON input. While that's of course great if you know what you're doing, it's a bit error prone and not really convenient, as you have to know about the data structure the server expects.

Spring Data REST exposes JSON schema documents for the types exposed by the system leveraging the `profile` link relation which makes the schema generically discoverable without tying the discovery logic to Spring Data REST itself. The browser instance we ship will lookup that schema metadata and – if it can find some – hand this to JSON Editor to replace the default dialogue with a form completely derived from the JSON Schema.

[!\[JSON Editor based POST form\](https://gist.githubusercontent.com/olivergierke/4d3683c12769211d97cb/raw/9d11209ea9840b42693854ba62f8a46bc9940f39/json-editor-post-form.png)](https://gist.githubusercontent.com/olivergierke/4d3683c12769211d97cb/raw/9d11209ea9840b42693854ba62f8a46bc9940f39/json-editor-post-form.png)

Fig 2. - JSON Editor based POST for (click to enlarge)

See how the form allows adding line items as the schema exposes it to be an array. The price and order date fields are marked as read-only, the location field allows choosing values from an enumeration with internationalized values.

The sample project can be found [on GitHub](https://github.com/olivergierke/spring-restbucks).

### [](#internationalizing-links-and-enums)Internationalizing links and enums

As you could see in the screenshots above the `restbucks:orders` link was accompanied by a human readable description. The descriptions are pulled from an optional resource bundle `rest-messages` using `_links.$rel.title` keys to define a readable value. The sample uses a `rest-messages.properties` as a fallback resource bundle but also contains a `rest-messages_de.properties` to return German labels for clients that send an `Accept-Language` header set to `de`.

The same resource bundle can be used to internationalize enum values so that they can be used on the client in a human readable manner. To not break existing applications, this has to be explicitly activated via [`RepositoryRestConfiguration.setEnableEnumTranslation(…)`](http://docs.spring.io/spring-data/rest/docs/2.4.0.RELEASE/api/org/springframework/data/rest/core/config/RepositoryRestConfiguration.html#setEnableEnumTranslation-boolean-). Details about the translation can be configured on [`EnumTranslationConfiguration`](http://docs.spring.io/spring-data/rest/docs/2.4.0.RELEASE/api/org/springframework/data/rest/core/config/EnumTranslationConfiguration.html).

## [](#spring-data-gemfire--apache-geode)Spring Data GemFire & Apache Geode

Support for Pivotal GemFire 8.1 and Apache Geode are the most notable additions to Spring Data GemFire 1.7. Pivotal GemFire was submitted to the [Apache Incubator](https://wiki.apache.org/incubator/GeodeProposal) earlier this year and the Spring Data team responded quickly to include [support](https://spring.io/blog/2015/06/12/spring-data-gemfire-supports-apache-geode) in Spring Data GemFire.

In addition, several other features were added to simplify the development of GemFire and Apache Geode applications using Spring. For instance, developers can now define application domain object specific expiration policies using annotations:

```java
Copy@TimeToLiveExpiration(
  timeout = "@expirationSettings['spel.defined.timeout']" action="DESTROY")
@IdleTimeoutExpiration(
  timeout = "1800" action="${property.placeholder.defined.action}")
class ApplicationDomainObject { … }
```

The expiration-based annotations support both [SpEL](http://docs.spring.io/spring/docs/current/spring-framework-reference/htmlsingle/#expressions) and Spring [Property Placeholder](http://docs.spring.io/spring/docs/1.7.0.RELEASE/spring-framework-reference/htmlsingle/#beans-factory-placeholderconfigurer) values. To enable annotation-based expiration policies, you only need configure Spring Data GemFire's [CustomExpiry](http://gemfire.docs.pivotal.io/latest/javadocs/japi/com/gemstone/gemfire/cache/CustomExpiry.html) implementation, [AnnotationBasedExpiration](http://docs.spring.io/spring-data-gemfire/docs/1.7.0.RELEASE/api/org/springframework/data/gemfire/support/AnnotationBasedExpiration.html), on your GemFire regions for either, or both, TTL and TTI:

```xml
Copy<gfe:partitioned-region id="Example" persistent="false" …>
  <gfe:custom-entry-ttl>
    <bean class="….gemfire.support.AnnotationBasedExpiration" factory-method="forTimeToLive"/>
  </gfe:custom-entry-ttl>
  <gfe:custom-entry-tti ref="ttiExpiration"/>
</gfe:partitioned-region>

<bean id="ttiExpiration" class="….gemfire.support.AnnotationBasedExpiration" factory-method="forIdleTimeout">
  <constructor-arg ref="defaultExpirationAttributes"/>
</bean>

<bean id="defaultExpirationAttributes" class="….ExpirationAttributes">
  <constructor-arg value="600"/>
  <constructor-arg value="#{T(….ExpirationAction).DESTROY}"/>
</bean>
```

See the reference guide to [learn more](http://docs.spring.io/spring-data-gemfire/docs/1.7.0.RELEASE/reference/html/#bootstrap:region:expiration). Next, support was added for repository query method OQL extensions via annotations:

```java
Copyinterface CustomerRepository implements CrudRepository<Cutomer, Long> {

  @Trace
  @Limit(25)
  @Import("org.exmple.Customer")
  @Hint("CustomerLastNameIdx")
  List<Customer> findByLastNameOrderByLastNameAsc(String lastName);
}
```

`@Trace` enables individual OQL statement debugging. `@Limit` restrains the number of results in the query result set and `@Import` enables applications to distinguish between similarly named object types. For example, your application might define both `org.example.app.core.Customer` and `org.example.app.vendor.xyz.Customer` types. See GemFire's [doc](http://gemfire81.docs.pivotal.io/latest/userguide/index.html#developing/query_select/the_import_statement.html#concept_2E9F15B2FE9041238B54736103396BF7) for more details. `@Hint` enables the use of OQL hints to identify indexes applicable to the query. Learn more about OQL extensions [here](http://docs.spring.io/spring-data-gemfire/docs/1.7.0.RELEASE/reference/html/#gemfire-repositories.oql-extension).

Finally, Spring Data GemFire offers support for GemFire [Cache and Region Snapshots](http://gemfire81.docs.pivotal.io/latest/userguide/index.html#managing/cache_snapshots/chapter_overview.html) using the Spring Data GemFire XML Data Namespace:

```xml
Copy<gfe:partitioned-region id="Example" persistent="false" … />

<gfe-data:snapshot-service id="exampleRegionSnapshotService" region-ref="Example">
  <gfe-data:snapshot-import location="/path/to/import/example.snapshot"/>
  <gfe-data:snapshot-export locator="/path/to/export/example.snapshot"/>
</gfe-data:snapshot-service>
```

You can learn more about how Spring Data GemFire supports ZIP files on import, the use of Spring `ApplicationEvents` to trigger import and export snapshots as well as how to appropriately filter data imported and exported [here](http://docs.spring.io/spring-data-gemfire/docs/1.7.0.RELEASE/reference/html/#bootstrap:snapshot).

## [](#spring-data-keyvalue--map-based-repositories)Spring Data KeyValue & Map based repositories

It's been quite a long time since we've been asked to provide a very simple `Map` based implementation for Spring Data repositories for various – mostly testing – purposes. The requests eventually concluded in revitalizing the [KeyValue module](http://docs.spring.io/spring-data/keyvalue/docs/1.0.0.RELEASE/reference/html/) in a slightly different way than it existed in before.

Spring Data KeyValue now consists of a basic `Map` based repository implementation that will use Spring Expression Language (SpEL) for querying values by default, provide sorting, pagination and Querydsl integration based on its collection module. It also exposes dedicated APIs to allow key-value stores to leverage store specific optimizations in storage, retrieval and most importantly query execution if needed.

The default query mechanism used by Spring Data KeyValue repositories is based on SpEL and allows you to define and run complex queries. This approach shows off its real power when run in [`COMPILED` mode](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/expressions.html#expressions-spel-compilation) as it effectively compiles the filter expressions to be executed on the values. Alternatively you also can use Querydsl expressions for typesafe querying.

```java
Copy@Configuration
@EnableMapRepositories("com.acme.repositories")
class AppConfig {}

@KeySpace("user")
class User {

  String @Id id;
  String firstname;
}

interface UserRepository extends CrudRepository<User, String> {
  List<String> findByFirstnameStartingWith(String firstname);
}
```

We currently have extensions of that API cooking for Ehcache, [Hazelcast](https://github.com/hazelcast-incubator/spring-data-integrations-commons/tree/develop) and [Aerospike](https://github.com/spring-projects/spring-data-aerospike) and are looking forward to evaluate options to also integrate Redis and maybe port some of the Gemfire APIs to use that.

## [](#whats-next)What's next?

Up next is [SpringOne2GX in Washington, DC](http://www.springone2gx.com/)\- we'd be happy to see you there - the best place to get in touch with the team, learn about new features and simply have a good time. Meanwhile we are already preparing the next service release for the Fowler Release Train and started working on new features for the Hopper release train (Sshh... We'll give a sneak peak on Hopper in the [“What’s new in Spring Data?” talk](https://2015.event.springone2gx.com/schedule/sessions/what_s_new_in_2015_for_spring_data.html) at SpringOne).