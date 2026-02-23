---
title: Going Reactive with Spring, Coroutines and Kotlin Flow
source: https://spring.io/blog/2019/04/12/going-reactive-with-spring-coroutines-and-kotlin-flow
scraped: 2026-02-23T14:49:03.513Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Sébastien Deleuze |  April 12, 2019 | 30 Comments
---

# Going Reactive with Spring, Coroutines and Kotlin Flow

_Engineering | Sébastien Deleuze |  April 12, 2019 | 30 Comments_

Since we announced [Spring Framework official support for Kotlin](https://spring.io/blog/2017/01/04/introducing-kotlin-support-in-spring-framework-5-0) in January 2017, a lot of things happened. Kotlin was announced as an official Android development language at Google I/O 2017, we continued to improve the Kotlin support across Spring portfolio and Kotlin itself has continued to evolve with key new features like [coroutines](https://kotlinlang.org/docs/reference/coroutines-overview.html).

I would like to take the opportunity of the [first milestone of Spring Framework 5.2](https://spring.io/blog/2019/04/10/spring-framework-5-2-0-m1-available-now) to give a status overview of where we are when it comes to Spring and Kotlin. And I will make my best to focus on concrete improvements since I believe Spring and Kotlin share the same pragmatic mindset.

I think it is all about choices. Choices that we (the Spring team) provide, but also choices that you as application developers have to make when starting a new Spring Boot application. For example:

-   What language should I use?
    
-   Annotated `@Controller` or functional style?
    
-   Spring MVC or WebFlux?
    

These questions are obviously highly subjective and usually depend on the project context, but I will share my opinionated point of view.

## [](#java-or-kotlin)[](#java-or-kotlin)Java or Kotlin?

Java is the obvious default choice, but [Kotlin](https://kotlinlang.org/) is an increasingly popular alternative. What are the reasons that could make a developer switch from Java to Kotlin? When people ask me, I usually says that Kotlin allows Java developers to leverage their existing skills to write shorter, safer and more expressive code. But to make an educated choice, we should identify more specific points.

My favorite Kotlin feature is that it turns `null`, the so-called (multiple) "billion-dollar mistake" into a safety feature. The error of Java is not `null` itself, it is to not manage `null` explicitly in its type system, leading to issues close to what we can observe in dynamic languages. Kotlin embraces `null` by using it in its type system to [deal with the absence of value](https://medium.com/@elizarov/dealing-with-absence-of-value-307b80534903). In Kotlin, types like `String` are not nullable so safe to use without precaution, while types like `String?` are nullable and should be used with caution. The good news is that Kotlin compiler will raise potential errors at compile time, and you will be able to handle them gracefully with [safe calls](https://kotlinlang.org/docs/reference/null-safety.html#safe-calls), [elvis operator](https://kotlinlang.org/docs/reference/null-safety.html#elvis-operator) or [execute if not `null`](https://kotlinlang.org/docs/reference/idioms.html#execute-if-not-null) blocks. And unlike Java `Optional`, Kotlin null-safety is suitable for input parameters as well and does not force you to use a wrapper that impacts performances and readibility of your code.

[DSLs](https://kotlinlang.org/docs/reference/type-safe-builders.html) are also another area where Kotlin shines. [Gradle Kotlin DSL](https://gradle.org/kotlin/) (support on [start.spring.io](https://start.spring.io) is [just around the corner](https://github.com/spring-io/initializr/pull/851)) is a great example, allowing to use a very rich and flexible API with great discoverability and confidence thanks to Kotlin statically typed nature. Spring Framework provides Kotlin DSLs for [bean definition](https://docs.spring.io/spring/docs/5.2.0.M1/spring-framework-reference/languages.html#kotlin-bean-definition-dsl), [functional routing](https://docs.spring.io/spring/docs/5.2.0.M1/spring-framework-reference/languages.html#kotlin-web) and even [MockMvc](https://docs.spring.io/spring/docs/5.2.0.M1/spring-framework-reference/languages.html#mockmvc-dsl).

I could detail a lot of other good reasons to switch like [optional parameters with default values](https://kotlinlang.org/docs/reference/functions.html#default-arguments), the [great interoperability with Java APIs](https://kotlinlang.org/docs/reference/java-interop.html) (like Spring), [extension functions](https://kotlinlang.org/docs/reference/), [reified type parameters](https://kotlinlang.org/docs/reference/inline-functions.html#reified-type-parameters) to avoid type erasure, [data classes](https://kotlinlang.org/docs/reference/data-classes.html#data-classes) or immutability encouraged by default, but I think you should just [learn Kotlin by example](https://play.kotlinlang.org/byExample/overview) eventually helped by the [reference documentation](https://kotlinlang.org/docs/reference/) and make your own judgement. You can also follow this step by step [Spring Boot tutorial with Kotlin](https://spring.io/guides/tutorials/spring-boot-kotlin/).

So let’s say I will choose Kotlin for my next Spring Boot project ;-)

## [](#annotated-controller-or-functional-style)[](#annotated-controller-or-functional-style)Annotated `@Controller` or functional style?

As I said in the introduction, choices depend of the context and are a matter of taste. I am a big fan of [functional routing with Kotlin](https://docs.spring.io/spring/docs/5.2.0.M1/spring-framework-reference/languages.html#kotlin-web) given the very nice DSL and functional programming capabilities of this language. I am even working on exploring how we could define Spring Boot application configuration in a functional way via the experimental [Kofu DSL for Spring Boot](https://spring.io/blog/2018/10/02/the-evolution-of-spring-fu) which is incubating in [Spring Fu](https://github.com/spring-projects/spring-fu) repository.

But today, let’s say my team is composed of developers used to `@Controller` programming model for years, and that I don’t want to change everything at the same time, so let’s keep `@Controller`.

## [](#spring-mvc-or-webflux)[](#spring-mvc-or-webflux)Spring MVC or WebFlux?

The choice we propose in term of web framework is the following.

You can continue to use Spring MVC and all the related well known technologies that we continue to improve: Tomcat, JPA, etc. You can even leverage some reactive bits by using `WebClient` modern API instead of `RestTemplate`.

But we also provide a reactive stack that includes [WebFlux](https://docs.spring.io/spring/docs/5.2.0.M1/spring-framework-reference/web-reactive.html#webflux), a web framework based on [Reactive Streams](http://www.reactive-streams.org/) for those who want more scalability, a stack immune to latency (useful for microservices-oriented architecture) and better stream processing capabilities. Other parts of the ecosystem like Spring Data and Spring Security provide reactive support as well.

### [](#webflux-with-reactor-api-in-java)[](#webflux-with-reactor-api-in-java)WebFlux with Reactor API in Java

Until now, using Spring reactive stack using WebFlux required a pretty big shift by switching IO related functionalities (web, persistence) from imperative to declarative/functional style by using APIs like Reactor [Mono](https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Mono.html) and [Flux](https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Flux.html) or RxJava similar types. This disruptive approach provides real advantages compared to imperative programming, but is also very different and requires a non trivial learning curve.

Let’s see what that means with concrete code, and let’s use this opportunity to show you how one can use [R2DBC](https://r2dbc.io/) (Reactive Streams based alternative to JDBC) and [Spring Data R2DBC](https://spring.io/projects/spring-data-r2dbc) to access SQL databases in a reactive way.

If we would have chosen Java, we would have written the following `UserRepository` class that exposes a reactive API to access SQL databases using the [`DatabaseClient`](https://docs.spring.io/spring-data/r2dbc/docs/1.0.0.M1/api/org/springframework/data/r2dbc/function/DatabaseClient.html) API provided by Spring Data R2DBC.

```
Copyclass UserRepository {

	private final DatabaseClient client;

	public UserRepository(DatabaseClient client) {
		this.client = client;
	}

	public Mono<Long> count() {
		return client.execute().sql("SELECT COUNT(*) FROM users")
			.as(Long.class).fetch().one();
	}

	public Flux<User> findAll() {
		return client.select().from("users").as(User.class).fetch().all();
	}

	public Mono<User> findOne(String id) {
		return client.execute()
			.sql("SELECT * FROM users WHERE login = :login")
			.bind("login", id).as(User.class).fetch().one();
	}

	public Mono<Void> deleteAll() {
		return client.execute().sql("DELETE FROM users").then();
	}

	public Mono<Void> save(User user) {
		return client.insert().into(User.class).table("users")
			.using(user).then();
	}

	public Mono<Void> init() {
		return client.execute().sql("CREATE TABLE ...").then()
			.then(deleteAll())
			.then(save(new User("smaldini", "Stéphane", "Maldini")))
			.then(save(new User("sdeleuze", "Sébastien", "Deleuze")))
			.then(save(new User("bclozel", "Brian", "Clozel")));
	}
}
```

Note

Saving the users could have been done in a fork-join way because these operations do not depend on each other, but for the sake of this comparison I use sequential operations chained with `then()`.

You can see that in such API, `void` becomes `Mono<Void>`, `User` becomes `Mono<User>`. This allows to use them in a non-blocking way and provide access to a rich set of operators. But it also makes it mandatory to use `Mono` wrapper and significantly change how you use these API. For example if some operations need to be done sequentially like in the `init()` method which is straightforward with imperative code, here we have to build a declarative pipeline with the `then` operator.

`Flux<User>` provides more added value since it allows to process the incoming users as a stream while usage of `List<User>` as typically used in a blocking stack implies loading all the data in memory before processing it. Notice we could also have used `Mono<List<User>>` here.

On controller side, you can see that Spring WebFlux supports natively these reactive types, and you can also see another characteristic of Reactive Streams based API where exceptions are mostly used as an error signal carried by the reactive type instead of being thrown like in regular imperative code.

```
Copy@RestController
public class UserController {

	private final UserRepository userRepository;

	public UserController(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@GetMapping("/")
	public Flux<User> findAll() {
		return userRepository.findAll();
	}

	@GetMapping("/{id}")
	public Mono<User> findOne(@PathVariable String id) {
		return userRepository
			.findOne(id)
			.switchIfEmpty(Mono.error(
				new CustomException("This user does not exist");
	}

	@PostMapping("/")
	public Mono<Void> save(User user) {
		return userRepository.save(user);
	}
}
```

### [](#webflux-with-coroutines-api-in-kotlin)[](#webflux-with-coroutines-api-in-kotlin)WebFlux with coroutines API in Kotlin

It is important to understand that Spring reactive support has been built on top of [Reactive Streams](http://www.reactive-streams.org/) with interoperability in mind, and that Reactor is used for 2 different purpose:

-   It is the Reactive Streams implementation that we use everywhere in Spring reactive infrastructure
    
-   It is also the default reactive public API exposed
    

But Spring reactive support has been designed from its inception to adapt easily to other asynchronous or reactive APIs like `CompletableFuture`, RxJava 2, [and now coroutines](https://docs.spring.io/spring/docs/5.2.0.M1/spring-framework-reference/languages.html#coroutines). In that case we still leverage Reactor internally, adapting at public API level to a different end user reactive API.

It is of course perfectly fine to continue to use `Flux` and `Mono` in Kotlin if you prefer this approach, but Spring Framework 5.2 introduces a new major feature: we can now use [Kotlin coroutines](https://kotlinlang.org/docs/reference/coroutines-overview.html) to leverage Spring reactive stack in a more imperative way.

Coroutines are Kotlin lightweight threads allowing to write non-blocking code in an imperative way. On language side, suspending functions identified by the `suspend` keyword provide an abstraction for asynchronous operations while on library side [kotlinx.coroutines](https://github.com/Kotlin/kotlinx.coroutines) provides functions likes [async { }](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/async.html) and types like [Flow](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/index.html) which is `Flux` equivalent in coroutines world.

Coroutines support is enabled when `kotlinx-coroutines-core` and `kotlinx-coroutines-reactor` dependencies are in the classpath:

`build.gradle.kts`

```
Copydependencies {
	implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:${coroutinesVersion}")
	implementation("org.jetbrains.kotlinx:kotlinx-coroutines-reactor:${coroutinesVersion}")
}
```

So what look like `UserRepository` and `UserController` written in Kotlin instead of Java and using coroutines and `Flow` instead or `Mono` and `Flux`?

```
Copyclass UserRepository(private val client: DatabaseClient) {

	suspend fun count(): Long =
		client.execute().sql("SELECT COUNT(*) FROM users")
			.asType<Long>().fetch().awaitOne()

	fun findAll(): Flow<User> =
		client.select().from("users").asType<User>().fetch().flow()

	suspend fun findOne(id: String): User? =
		client.execute()
			.sql("SELECT * FROM users WHERE login = :login")
			.bind("login", id).asType<User>()
			.fetch()
			.awaitOneOrNull()

	suspend fun deleteAll() =
		client.execute().sql("DELETE FROM users").await()

	suspend fun save(user: User) =
		client.insert().into<User>().table("users").using(user).await()

	suspend fun init() {
		client.execute().sql("CREATE TABLE IF NOT EXISTS users (login varchar PRIMARY KEY, firstname varchar, lastname varchar);").await()
		deleteAll()
		save(User("smaldini", "Stéphane", "Maldini"))
		save(User("sdeleuze", "Sébastien", "Deleuze"))
		save(User("bclozel", "Brian", "Clozel"))
	}
}
```

You can see here that instead of returning for example `Mono<User>`, we return `User` (or more exactly its nullable variant `User?`) in a suspending function that can be used in an imperative way. The differences in `init()` method implementation illustrate that pretty well since we now use regular imperative code instead of chained `then` invocations.

But wait, how can I use coroutines directly on the `DatabaseClient` type which is a reactive API based on `Mono` and `Flux`? This is made possible because Spring Data R2DBC also provides Kotlin extensions (see for example [this one](https://github.com/spring-projects/spring-data-r2dbc/blob/master/src/main/kotlin/org/springframework/data/r2dbc/function/RowsFetchSpecExtensions.kt)) which allows you to add coroutines based methods on `DatabaseClient` once imported. By convention, suspending methods are prefixed by `await` or suffixed by `AndAwait` and get a similar name to their `Mono` based counterparts.

Now let’s have a deeper look to this `Flow<User>` return type. First, be aware that we are referring to [`kotlinx.coroutines.flow.Flow`](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/index.html), not [`java.util.concurrent.Flow`](https://docs.oracle.com/javase/9/docs/api/java/util/concurrent/Flow.html) which is Reactive Streams container type provided with Java 9+.

You will use `Flow` API like you use Java 8+ `Stream` or its Kotlin equivalent `Sequence`, but the huge difference is that it is suitable for asynchronous operations and manages backpressure. So it is `Flux` equivalent in coroutines world, suitable for hot or cold stream, finite or infinite streams, with the following main differences:

-   `Flow` is push-based while `Flux` is push-pull hybrid
    
-   Backpressure is implemented via suspending functions
    
-   `Flow` has only a [single suspending `collect` method](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/collect.html) and operators are implemented as [extensions](https://kotlinlang.org/docs/reference/extensions.html)
    
-   [Operators are easy to implement](https://github.com/Kotlin/kotlinx.coroutines/tree/master/kotlinx-coroutines-core/common/src/flow/operators) thanks to coroutines
    
-   Extensions allow to add custom operators to `Flow`
    
-   Collect operations are suspending functions
    
-   [`map` operator](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/map.html) supports asynchronous operation (no need for `flatMap`) since it takes a suspending function parameter
    

Now let’s have a look to the coroutines version of the controller:

```
Copy@RestController
class UserController(private val userRepository: UserRepository) {

	@GetMapping("/")
	fun findAll(): Flow<User> =
		userRepository.findAll()

	@GetMapping("/{id}")
	suspend fun findOne(@PathVariable id: String): User? =
		userRepository.findOne(id) ?:
			throw CustomException("This user does not exist")

	@PostMapping("/")
	suspend fun save(user: User) =
		userRepository.save(user)
}
```

Again you can see that the code is very close of regular imperative code that we would have used with Spring MVC.

In addition to providing coroutines extensions to `Flux` and `Mono` based APIs like `WebClient`, `ServerRequest` or `ServerResponse`, Spring WebFlux now supports natively suspending functions and `Flow` return types for annotated `@Controller` classes.

### [](#asynchronous-operations-with-imperative-code)[](#asynchronous-operations-with-imperative-code)Asynchronous operations with imperative code

Let’s leverage `WebClient` coroutines extensions to see how we can chain asynchronous calls. We are going to request a remote HTTP endpoint to get additional `UserDetail1` and `UserDetail2`.

```
Copy@RestController
class UserWithDetailsController(
		private val userRepository: UserRepository,
		private val client: WebClient) {

	@GetMapping("/")
	fun findAll(): Flow<UserWithDetails> =
		userRepository.findAll().map(this::withDetails)

	@GetMapping("/{id}")
	suspend fun findOne(@PathVariable id: String): UserWithDetails {
		val user: User = userRepository.findOne(id) ?:
			throw CustomException("This user does not exist")
		return withDetails(user)
	}

	private suspend fun withDetails(user: User): UserWithDetails {
		val userDetail1 = client.get().uri("/userdetail1/${user.login}")
			.accept(APPLICATION_JSON)
			.awaitExchange().awaitBody<UserDetail1>()
		val userDetail2 = client.get().uri("/userdetail2/${user.login}")
			.accept(APPLICATION_JSON)
			.awaitExchange().awaitBody<UserDetail2>()
		return UserWithDetails(user, userDetail1, userDetail2)
	}
}
```

Here we are using `WebClient` coroutines extensions like `awaitExchange()` and `awaitBody()` to perform asynchronous and non-blocking operations in a purely imperative way. And since `Flow` [`map` operator](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/map.html) takes a suspending function parameter, we can perform such operation in it, no need for `flatMap` here like we would done it with reactive APIs in Java.

### [](#parallel-decomposition)[](#parallel-decomposition)Parallel decomposition

As seen previously, coroutines are sequential by default, but they can also be used to perform operations in parallel. Let’s refactor our previous example to perform the 2 remote calls concurrently.

```
Copy@RestController
class UserWithDetailsController(
		private val userRepository: UserRepository,
		private val client: WebClient) {

	@GetMapping("/")
	fun findAll(): Flow<UserWithDetails> =
		userRepository.findAll().map(this::withDetails)

	@GetMapping("/{id}")
	suspend fun findOne(@PathVariable id: String): UserWithDetails {
		val user: User = userRepository.findOne(id) ?:
			throw CustomException("This user does not exist")
		return withDetails(user)
	}

	private suspend fun withDetails(user: User): UserWithDetails = coroutineScope {
		val asyncDetail1 = async {
			client.get().uri("/userdetail1/${user.login}")
				.accept(APPLICATION_JSON)
				.awaitExchange().awaitBody<UserDetail1>()
		}
		val asyncDetail2 = async {
			client.get().uri("/userdetail2/${user.login}")
				.accept(APPLICATION_JSON)
				.awaitExchange().awaitBody<UserDetail2>()
		}
		UserWithDetails(user, asyncDetail1.await(), asyncDetail2.await())
	}
}
```

Here we leverage [structured concurrency](https://medium.com/@elizarov/structured-concurrency-722d765aa952) to trigger parallel retrieval of the 2 user details by creating `Deferred<UserDetail1>` and `Deferred<UserDetail2>` instances via the `async {}` builder, then we wait completion of these by calling the 2 `await()` methods that will return the `UserDetail1` and `UserDetail2` instances when available.

## [](#conclusion)[](#conclusion)Conclusion

I think using Spring reactive stack with such coroutines and Kotlin `Flow` APIs provides an interesting trade-of between imperative and declarative approaches. It allows to leverage WebFlux and Spring Data reactive scalability and features in a very approachable way.

Coroutines support in Spring WebFlux and Spring Data will be available as part of the upcoming Spring Boot 2.2 release. You can read the [reference documentation](https://docs.spring.io/spring/docs/5.2.0.M1/spring-framework-reference/languages.html#coroutines) and can expect further improvements like coroutines support for [RSocket](http://rsocket.io/) `@MessageMapping` endpoints and `RSocketRequester` extensions. Spring Data Moore will also provide similar coroutines extensions on Spring Data MongoDB, Cassandra and Redis. And Spring Data may provide support for [coroutines repositories](https://jira.spring.io/browse/DATACMNS-1508) at some point. We are also going to make [Reactor and coroutines context interoperable](https://github.com/Kotlin/kotlinx.coroutines/issues/284) to support security and reactive transactions.

I would like to finish by saying thank you to many talented engineers without whom all of this would not have been possible:

-   Roman Elizarov and Vsevolod Tolstopyatov from Kotlin team for their incredible work on coroutines and `Flow`
    
-   Konrad Kaminski for the initial community driven coroutines support for Spring
    
-   Jake Wharton for its early prototyping around unifying Rx and coroutines
    
-   Stéphane Maldini and David Karnok for their inspirational work
    
-   Juergen Hoeller, Rossen Stoyanchev and Brian Dussault for their confidence
    
-   Mark Paluch and Oliver Drotbohm for their support on the persistence side
    

As usual, I am looking forward for feedback, [as well as Kotlin team on `Flow` API](https://github.com/Kotlin/kotlinx.coroutines/issues/254) since it is still in preview mode. Come to see my upcoming talks at [Devoxx France](https://cfp.devoxx.fr/2019/talk/CWE-1971/Spring_Boot_avec_Kotlin,_Kofu_et_les_Coroutines), [JAX](https://jax.de/serverside-enterprise-java/spring-boot-with-kotlin-functional-configuration-and-graalvm/), [Spring I/O](https://2019.springio.net/sessions/spring-boot-with-kofu-dsl-and-coroutines) or [Sunny Tech](https://sunny-tech.io/schedule/2019-06-28?sessionId=31) to know more.

Cheers!