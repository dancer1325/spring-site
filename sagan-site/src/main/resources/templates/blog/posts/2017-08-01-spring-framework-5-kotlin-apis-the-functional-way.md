---
title: Spring Framework 5 Kotlin APIs, the functional way
source: https://spring.io/blog/2017/08/01/spring-framework-5-kotlin-apis-the-functional-way
scraped: 2026-02-23T16:24:50.113Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Sébastien Deleuze |  August 01, 2017 | 11 Comments
---

# Spring Framework 5 Kotlin APIs, the functional way

_Engineering | Sébastien Deleuze |  August 01, 2017 | 11 Comments_

**Update:** see also [Spring Fu experimental project](https://github.com/spring-projects/spring-fu/).

Since our original announcement (very well received by the community!) of [official Kotlin support in Spring Framework 5](https://spring.io/blog/2017/01/04/introducing-kotlin-support-in-spring-framework-5-0), we have continued to work towards even stronger Kotlin support in conjunction with recent refinements in Spring WebFlux.

In order to demonstrate these features, and how they could be used together, I have created a new [spring-kotlin-functional](https://github.com/sdeleuze/spring-kotlin-functional) demo application which is a standalone Spring WebFlux application, developed in Kotlin, with Mustache template rendering, JSON REST webservices and Server-Sent Events streaming capabilities. Don't hesitate to send us feedbacks and proposals before Spring Framework 5 release expected in September.

## [](#programmatic-bootstrap)Programmatic bootstrap

Spring WebFlux and Reactor Netty allow for programmatic bootstrap of the application since they are natively designed to run as an embedded webserver. This is obviously not needed when developing a Spring Boot application but can be very useful for tight deployment units with custom bootstrapping in a microservice architecture or other constrained environments.

```kotlin
Copyclass Application {
	
  private val httpHandler: HttpHandler
  private val server: HttpServer
  private var nettyContext: BlockingNettyContext? = null
  
  constructor(port: Int = 8080) {
    val context = GenericApplicationContext().apply {
        beans().initialize(this)
        refresh()
    }
    server = HttpServer.create(port)
    httpHandler = WebHttpHandlerBuilder.applicationContext(context).build()
  }

  fun start() {
    nettyContext = server.start(ReactorHttpHandlerAdapter(httpHandler))
  }
	
  fun startAndAwait() {
    server.startAndAwait(ReactorHttpHandlerAdapter(httpHandler),
        { nettyContext = it })
  }
	
  fun stop() {
    nettyContext?.shutdown()
  }
}

fun main(args: Array<String>) {
  Application().startAndAwait()
}
```

## [](#functional-bean-definitions-with-springs-new-kotlin-dsl)Functional bean definitions with Spring's new Kotlin DSL

Spring Framework 5 introduces a new way of registering beans using lambdas. It is very efficient, does not require any reflection or CGLIB proxies (so [`kotlin-spring`](https://kotlinlang.org/docs/reference/compiler-plugins.html#kotlin-spring-compiler-plugin) plugin is not needed for Reactive apps), and is a good fit with languages like Java 8 or Kotlin. You can have an overview of Java versus Kotlin syntax [here](https://spring.io/blog/2017/01/04/introducing-kotlin-support-in-spring-framework-5-0#functional-bean-declaration-dsl).

In [spring-kotlin-functional](https://github.com/sdeleuze/spring-kotlin-functional), beans are declared in a `Beans.kt` file which contains bean definitions. The DSL conceptually declare a `Consumer<GenericApplicationContext>` via a clean declarative API which allows you to deal with profile and `Environment` for customizing how your beans are registered. This DSL also allows custom registration logic of beans via `if` expression, `for` loop or any other Kotlin constructs.

```kotlin
Copybeans {
  bean<UserHandler>()
  bean<Routes>()
  bean<WebHandler>("webHandler") {
    RouterFunctions.toWebHandler(
      ref<Routes>().router(),
      HandlerStrategies.builder().viewResolver(ref()).build()
    )
  }
  bean("messageSource") {
    ReloadableResourceBundleMessageSource().apply {
      setBasename("messages")
      setDefaultEncoding("UTF-8")
    }
  }
  bean {
    val prefix = "classpath:/templates/"
    val suffix = ".mustache"
    val loader = MustacheResourceTemplateLoader(prefix, suffix)
    MustacheViewResolver(Mustache.compiler().withLoader(loader)).apply {
      setPrefix(prefix)
      setSuffix(suffix)
    }
  }
  profile("foo") {
    bean<Foo>()
  }
}
```

In this example, `bean<Routes>()` is using autowiring by constructor and `ref<Routes>()` is a shortcut for `applicationContext.getBean(Routes::class.java)`.

## [](#null-safety-of-spring-and-reactor-apis)Null-safety of Spring and Reactor APIs

One of Kotlin's key features is [null-safety](https://kotlinlang.org/docs/reference/null-safety.html) which allows to deal with `null` values at compile time rather than bumping into the famous `NullPointerException` at runtime. This makes your applications safer through clean nullability declarations, expressing "value or no value" semantics without paying the cost of wrapper like `Optional`. (Kotlin allows using functional constructs with nullable values; check out this [comprehensive guide to Kotlin null-safety](http://www.baeldung.com/kotlin-null-safety).)

Although Java does not allow to express null-safety in its type-system, we have introduced some amount of [null-safety to Spring APIs](https://jira.spring.io/browse/SPR-15540) via tooling-friendly annotations: `@NonNullApi` annotations at package level declare that non-null is the default behavior, and we explicitly put `@Nullable` annotations where specific parameters or return values can be `null`. We have done this work for the whole Spring Framework API (yes it was a huge effort!), and other projects like [Spring Data](https://jira.spring.io/browse/DATACMNS-1114) begin to leverage it. Spring annotation are meta-annotated with JSR 305 meta-annotation (a dormant JSR but supported by tools like IDEA, Eclipse, Findbugs, etc.) to provide useful warnings to Java developers.

On the Kotlin side, the killer feature is that - as of the Kotlin 1.1.51 release - these annotations [are recognized by Kotlin](https://github.com/Kotlin/KEEP/blob/jsr-305/proposals/jsr-305-custom-nullability-qualifiers.md) in order to provide null-safety for the whole Spring API. That means you should never have `NullPointerException` in your code when using Spring 5 and Kotlin because the compiler will not allow it. You need to use a `-Xjsr305=strict` compiler flag to get these annotations taken in account in Kotlin type system.

## [](#functional-routing-with-the-kotlin-dsl-for-spring-webflux)Functional routing with the Kotlin DSL for Spring WebFlux

Instead of using `@RestController` and `@RequestMapping`, `spring-kotlin-functional` is using the WebFlux functional API via a dedicated Kotlin DSL.

```
Copyrouter {
  accept(TEXT_HTML).nest {
    GET("/") { ok().render("index") }
    GET("/sse") { ok().render("sse") }
    GET("/users", userHandler::findAllView)
  }
  "/api".nest {
    accept(APPLICATION_JSON).nest {
      GET("/users", userHandler::findAll)
    }
    accept(TEXT_EVENT_STREAM).nest {
      GET("/users", userHandler::stream)
    }		
  }
  resources("/**", ClassPathResource("static/"))
}
```

Like for the bean DSL, the functional routing DSL allows programmatic registration of routes based on custom logic and dynamic data (can be useful to develop a CMS or eCommerce solution where most routes depends on data created via the backoffice).

Routes usually point to handlers in charge of creating an HTTP response based on the HTTP request via callable references. Here is the `UserHandler` which takes advantage of the Kotlin extensions Spring Framework 5 is providing directly in Spring JARs to avoid the well-known type erasure problem using [Kotlin reified type parameters](https://kotlinlang.org/docs/reference/inline-functions.html#reified-type-parameters). The same code in Java would require additional `Class` or `ParameterizedTypeReference` parameters.

```kotlin
Copyclass UserHandler {
	
  private val users = Flux.just(
      User("Foo", "Foo", LocalDate.now().minusDays(1)),
      User("Bar", "Bar", LocalDate.now().minusDays(10)),
      User("Baz", "Baz", LocalDate.now().minusDays(100)))
	
  private val userStream = Flux
      .zip(Flux.interval(ofMillis(100)), users.repeat())
      .map { it.t2 }

  fun findAll(req: ServerRequest) =
      ok().body(users)

  fun findAllView(req: ServerRequest) =
      ok().render("users", mapOf("users" to users.map { it.toDto() }))
	
  fun stream(req: ServerRequest) =
      ok().bodyToServerSentEvents(userStream)
	
}
```

Notice it is super easy to create Server-Sent Events endpoints with Spring WebFlux, as well as server-side template rendering (Mustache in this application).

##Easy testing with WebClient, Reactor Test and JUnit 5

Kotlin allows to specify meaningful test function names betweeen backticks, and as of JUnit 5.0 RC2 Kotlin test classes can use `@TestInstance(TestInstance.Lifecycle.PER_CLASS)` to enable a single instantiation of test classes which allows to use `@BeforeAll` and `@AfterAll` annotations on non-static methods, which is a good fit for Kotlin. It is also now possible to change the default behavior to `PER_CLASS` thanks to a `junit-platform.properties` file with a `junit.jupiter.testinstance.lifecycle.default = per_class` property.

```
Copyclass IntegrationTests {
	
  val application = Application(8181)
  val client = WebClient.create("http://localhost:8181")
	
  @BeforeAll
  fun beforeAll() {
    application.start()
  }
	
  @Test
  fun `Find all users on JSON REST endpoint`() {
    client.get().uri("/api/users")
        .accept(APPLICATION_JSON)
        .retrieve()
        .bodyToFlux<User>()
        .test()
        .expectNextMatches { it.firstName == "Foo" }
        .expectNextMatches { it.firstName == "Bar" }
        .expectNextMatches { it.firstName == "Baz" }
        .verifyComplete()
  }

  @Test
  fun `Find all users on HTML page`() {
    client.get().uri("/users")
        .accept(TEXT_HTML)
        .retrieve()
        .bodyToMono<String>()
        .test()
        .expectNextMatches { it.contains("Foo") }
        .verifyComplete()
  }

  @Test
  fun `Receive a stream of users via Server-Sent-Events`() {
    client.get().uri("/api/users")
        .accept(TEXT_EVENT_STREAM)
        .retrieve()
        .bodyToFlux<User>()
        .test()
        .expectNextMatches { it.firstName == "Foo" }
        .expectNextMatches { it.firstName == "Bar" }
        .expectNextMatches { it.firstName == "Baz" }
        .expectNextMatches { it.firstName == "Foo" }
        .expectNextMatches { it.firstName == "Bar" }
        .expectNextMatches { it.firstName == "Baz" }
        .thenCancel()
        .verify()
  }
	
  @AfterAll
  fun afterAll() {
    application.stop()
  }
}
```

##Conclusion

We are looking forward to feedback about these new features! Note that August is our last chance to refine the API since [the ultimate Spring Framework 5.0 release candidate](https://jira.spring.io/browse/SPR/fixforversion/16259/) is expected at the end of the month. So feel free to play with [spring-kotlin-functional](https://github.com/sdeleuze/spring-kotlin-functional), fork it, add new features like [Spring Data Reactive Fluent API](https://jira.spring.io/browse/DATAMONGO-1719), etc.

On our side, we are now working on the documentation.

Happy summer coding ;-)