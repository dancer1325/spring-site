---
title: Spring Data 2020.0 - New and Noteworthy - A general Overview
source: https://spring.io/blog/2020/11/06/spring-data-2020-0-new-and-noteworthy-a-general-overview
scraped: 2026-02-23T13:40:21.407Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Christoph Strobl |  November 06, 2020 | 2 Comments
---

# Spring Data 2020.0 - New and Noteworthy - A general Overview

_Engineering | Christoph Strobl |  November 06, 2020 | 2 Comments_

Spring Data 2020.0, based on [Spring Framework 5.3](https://spring.io/blog/2020/10/27/spring-framework-5-3-goes-ga), is out and with it, a ton of new features across the various stores, which are covered by the individual modules. While posting highlights along with the milestone announcements, we wanted to give you a more detailed description of the new features in a series of blog posts. These posts will cover, among other things:

-   Reactive Context Access features in Data Commons.
-   Lifecycle callbacks and baselining to Spring R2DBC in [R2DBC](https://spring.io/blog/2020/11/18/spring-data-2020-0-new-and-noteworthy-in-spring-data-r2dbc-1-2).
-   General Repository and store-specific Redis Cache Metrics.
-   [Neo4J reactive repositories](https://spring.io/blog/2020/11/20/spring-data-2020-0-new-and-noteworthy-in-spring-data-neo4j-6-0).
-   Paging repository APIs for Spring Data for Apache Geode.
-   Geoshape, index, and reactive search improvements for [Spring Data Elasticsearch](https://spring.io/blog/2020/11/24/spring-data-2020-0-new-and-noteworthy-in-spring-data-elasticsearch-4-1).
-   Partial filter and aggregation hints in [MongoDB](https://spring.io/blog/2020/11/13/spring-data-2020-0-new-and-noteworthy-in-spring-data-mongodb-3-1).
-   `@Bean` row mappers for the [JDBC](https://spring.io/blog/2020/11/10/spring-data-2020-0-new-and-noteworthy-in-spring-data-jdbc-2-1) module.
-   Per-statement key spaces definition for the [Apache Cassandra abstraction](https://spring.io/blog/2020/11/26/spring-data-2020-0-new-and-noteworthy-in-spring-data-for-apache-cassandra-3-1).
-   Declarative Couchbase N1QL queries.

In this first part, we take the time to cover some general topics and certain aspects of the commons module that have effect on the store-specific implementations.

We start with the most obvious change: The versioning scheme. After following a lexical ordering (honoring famous computer scientists) for more than 7 years, we switched to a [CalVer](https://calver.org/)\-based versioning scheme. This will mainly affect those of you who manage versions of Spring Data artifacts through the `spring-data-releasetrain` artifact, which changed to `spring-data-bom` and the new scheme.

```bash
Copyorg.springframework.data
spring-data-bom
2020.0.0
```

The individual modules continue to use the numeric versioning scheme.

Despite those infrastructural changes, the current release has a clear focus on extending the reactive story, more application insight, metrics, and a better developer experience when working with GraalVM native images. Still, we took the time to add some bits and pieces here and there, to hopefully make your everyday work a little more convenient.

One of those enhancements was to add support for `java.lang.Optional` within projections. It is not a game changer, but it nevertheless lets if you want to avoid null values.

```java
Copyinterface User {

	String getNickname();
	Optional<byte[]> getPicture();
}

```

Working on performance insights (more on that a little later), we now delay repository initialization till its first use, which speeds up application startup times.

We also took the time to [Delombok](https://projectlombok.org/features/delombok) the entire production codebase for improved readability and debugging.

## [](#reactive-context-access)Reactive Context Access

This release contributes another important piece on its path to completing the reactive story. The addition of reactive context access let us work on features such as reactive auditing and SpEL context extensions evaluation inside a reactive flow. Till now, both Auditing and SpEL were, to a certain degree, already possible. The missing piece was the ability to access contextual details, such as an authentication principal that is typically provided by Spring Security in WebFlux arrangements.

When it comes to context, you have two options:

-   Pass the context along with the invocation
-   Store contextual details out of band (for example, by using `ThreadLocal`)

The imperative variants of auditing and SpEL context extensions rely on `ThreadLocal` storage. However, subscribing to a reactive pipeline removes any assumptions on which threads the pipeline is going to materialize. Therefore, this approach becomes unusable. This is where the second option comes into play, passing contextual details along with the invocation. Project Reactor's `Context` feature allows attaching contextual data to a subscription. To access the context, an API is required to use `Publisher` types. With this release, we therefore introduced reactive API variants for auditing with `ReactiveAuditorAware` and `ReactiveEvaluationContextExtension`.

```java
Copyinterface ReactiveAuditorAware<T> {  
	Mono<T> getCurrentAuditor();  
}

interface ReactiveEvaluationContextExtension extends ExtensionIdAware {  
	Mono<? extends EvaluationContextExtension> getExtension();  
}
```

You can expose implementations of both interfaces as Spring beans. Spring Data picks them up and uses them for reactive auditing, respective of context extension.

## [](#reactive-auditing)Reactive Auditing

Reactive Auditing associates auditable entities with a timestamp and the current user ("auditor"). Properties annotated with `@CreatedBy` or `@LastModifiedDate` are populated by Spring Data upon insert and update. In previous versions, properties annotated with `@CreatedDate` and `@LastModifiedDate` were updated through entity callbacks. As of this release, the auditor is propagated from `ReactiveAuditorAware` into the entity by using a dedicated entity callback.

An example implementation for `ReactiveAuditorAware` that uses Spring Security's `ReactiveSecurityContextHolder` could look like:

```java
Copyclass ReactiveUsernameAuditor implements ReactiveAuditorAware<String>{  

  	@Override  
  	public Mono<String> getCurrentAuditor() {  
    	  	return ReactiveSecurityContextHolder.getContext()  
              	  	.map(SecurityContext::getAuthentication)  
              	  	.map(Authentication::getPrincipal)  
              	  	.map(Object::toString);  
  	}
}
```

You need two steps to enable reactive auditing for your store module. First, enable reactive auditing through your store-specific `@EnableReactive…Auditing` annotation. Second, register a `ReactiveAuditorAware` bean. Reactive auditing is supported for Cassandra, Elasticsearch, MongoDB, Neo4j, and R2DBC.

The following configuration snippet shows how to enable reactive auditing. You can find the [full example](https://github.com/spring-projects/spring-data-examples/tree/master/cassandra/example/src/main/java/example/springdata/cassandra/auditing) on Github.

```java
Copy@Configuration  
@EnableReactiveCassandraAuditing  
class ApplicationConfiguration {  
  
	@Bean  
	ReactiveAuditorAware<String> reactiveAuditorAware() {  
		return () -> Mono.just("the-static-auditor-name");  
	}  
}
```

Note that the example results in a static auditor that is named `the-static-auditor-name`. Using a dynamic auditor derived from the context requires additional components, such as Spring Security and WebFlux. Note that several stores previously enabled the date-part of reactive auditing through `@Enable…Auditing`. With the introduction of `@EnableReactive…Auditing`, that is no longer the case, and `@Enable…Auditing` enables solely imperative auditing. Make sure to adopt your configuration accordingly if you require reactive auditing.

## [](#reactive-spring-expression-language-spel-context-extensions)Reactive Spring Expression Language ("SpEL") Context Extensions

SpEL Context extensions represent an SPI to allow plugging in application- or library-specific extensions that provide functionality that can be consumed in various places by using SpEL expressions. Context extensions can hold application-specific state, expose domain-specific functionality, or give access to contextual data associated with an incoming application request. A typical example for a SpEL Context feature is accessing the security context that is associated with a HTTP request issued by an authenticated or anonymous application user.

Similar to reactive auditing, any per-request context needs to be retrieved from the subscriber `Context`. In this release, we introduced `ReactiveEvaluationContextProvider`, which is a reactive variant of `EvaluationContextProvider`. `ReactiveEvaluationContextProvider` allows deferred `EvaluationContext` retrieval. By returning `Mono`, the context provider can access the subscriber `Context`. Reactive context extensions need to implement `ReactiveEvaluationContextExtension` so that they can participate in deferred context extension resolution. Reactive extensions can extract contextual data and pass it on to the actual `EvaluationContextExtension` that provides functionality to Spring Data's SpEL evaluation mechanism.

Note that Reactive SpEL support is available only for reactive repository query methods. SpEL expressions in other components (for example, a collection name in a MongoDB `@Document` or a Cassandra `@Table` name) are resolved without considering reactive context extensions as that API has no access to the subscriber `Context`.

## [](#refinements-to-spel-context-extension-resolution)Refinements to SpEL Context Extension Resolution

Since its inception, Spring Data has attempted resolution of all registered SpEL context extensions prior to SpEL expression processing if a query contained at least one SpEL expression. Context resolution can be expensive. Also, sometimes, context may be not present. Consider the following query methods:

```java
Copy@Query("SELECT * FROM person WHERE tenant = :#{tenantId}")
List<Person> findAllPeopleForTenant();

@Query("SELECT * FROM person WHERE tenant = :#{tenantId} or 1=?#{hasRole('ROLE_ADMIN') ? 1 : 0")
List<Person> findAllPeople();
```

Both query methods use SpEL expressions, and the second query method has a reference to Spring Security's SpEL context extension. When calling the first method (`findAllPeopleForTenant`) that only considers the `tenantId`, Spring Data also loaded Spring Security's extension. If the method was called outside of a security context, the method invocation failed because Spring Security could not resolve a security context. Invocation in a `CommandLineRunner` , `ApplicationEventLister`, or lifecyle method (such as `@PostConstruct`) are typical examples where no security context is given:

```java
Copyclass MyComponent {

  @Autowired PersonRepository repository;
  
  @PostConstruct
  public void postConstruct() {
    TenantIdHolder.setCurrentTenant(4711);

    // this method fails with an exception because it attempts to resolve
    // the security context although it's not required in for the actual query.
    repository.findAllPeopleForTenant(); 
  }
}
```

With the introduction of Reactive SpEL Context extensions, we refined our SPI to resolve only extensions that are actually needed. `org.springframework.data.spel.ExpressionDependencies` performs a static analysis of the SpEL expression and collects symbols (property references and method calls). Obtaining the `EvaluationContext` through `EvaluationContextProvider` accepts `ExpressionDependencies` to inspect which extensions provide these symbols and load only the ones that can satisfy the dependency requirements. This change should be transparent to most applications, as it touches only internal code. Note that the dependency analysis enables arrangements of running SpEL-enabled queries in, for example, `@PostConstruct`, if the query refers only to contextual functionality that can be resolved. Context extensions that are not involved in the query are no longer attempted for resolution, and that change may reflect into your application. That optimization applies to both imperative and reactive code paths and should result in improved performance.

## [](#repository-metrics)Repository Metrics

Having insight into the application as it runs is crucial to some businesses. The persistence layer (especially) can be, perhaps due to the network or slow query execution on server side, a culprit in performance issues. Repository metrics now give you a source of truth for runtime performance of your data access layer, by hooking directly into the Spring Data execution infrastructure. Listeners attached to the repository get notified about each and every invocation done to the interface, providing information about the repository itself, the method invoked, the arguments passed on, and the execution outcome (success, error, and cancelation signals), omitting the actual result.

For synchronous repository interfaces, the measurement starts at query method invocation time, which includes the time taken to actually parse a potential annotated query and evaluate extensions providing values through SpEL expressions, as outlined in the preceding section, and ends when the potentially converted result is returned.

For reactive repositories, the actual subscription marks the invocation entry point, whereas the complete or cancel signal completes the measurement.

At this time, the setup is not the most convenient, as it requires a `BeanPostProcessor` to manipulate the repository factory bean by adding the invocation listeners. However, future Spring Boot releases will offer dedicated support for repository metrics included in the actuator endpoints.

```java
Copyclass RepositoryMetricsPostProcessor implements BeanPostProcessor { 
   public Object postProcessBeforeInitialization(Object bean, String beanName) {

     if (bean instanceof RepositoryFactoryBeanSupport) {
         RepositoryFactoryBeanSupport<?, ?, ?> repositoryFactoryBean = (...) bean;      
         repositoryFactoryBean.addRepositoryFactoryCustomizer(repositoryFactory -> {
         	repositoryFactory.addInvocationListener(System.out::println);
         });
     }
   return bean;
   }
}
```

So that you can see it in action, we have prepared a little [metrics example](https://github.com/spring-projects/spring-data-examples/tree/boot-next/mongodb/repository-metrics) for you. That prints invocation durations to the console.

```bash
CopyPersonRepository.save(Object): 2 ms – SUCCESS

PersonRepository.save(Object): 2 ms – SUCCESS

PersonRepository.findAll(): 32 ms – SUCCESS

PersonRespository.findByName(String): 1 ms - SUCCESS
```

## [](#graalvm-native-images)GraalVM native images

When talking about metrics and performance, one might soon think of scale-to-zero scenarios, startup speed, and [GraalVM native images](https://www.graalvm.org/reference-manual/native-image/). The Spring Data team has been pushing hard on that end, resulting in an improved developer experience when compiling native images that make use of Spring Data repositories. The efforts cover simple toggles to disable certain features, such as the code generation for an optimized entity instantiation scenario, [compilation hints](https://github.com/spring-projects-experimental/spring-graalvm-native/blob/0.8.2/spring-graalvm-native-configuration/src/main/java/org/springframework/boot/autoconfigure/data/mongodb/MongoRepositoriesHints.java), and a `SpringDataComponentProcessor` as part of the [spring-graalvm-native](https://github.com/spring-projects-experimental/spring-graalvm-native) project. The component processor inspects Spring Data repositories, the domain types, and method signatures. Based on that information, it adds all the required proxy, resource, and reflection configuration to the native image to make it work. This also includes any store-specific annotations and custom implementations for both the imperative and reactive interfaces. If you are curious, give it a [try](https://github.com/spring-projects-experimental/spring-graalvm-native/blob/0.8.2/spring-graalvm-native-samples)!

With that, we finish our first part of this series. Watch this space for updates related to your favorite store and check out the [Spring Data Examples](https://github.com/spring-projects/spring-data-examples) to shorten the time till it is published.