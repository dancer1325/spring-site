---
title: The evolution of Spring Fu
source: https://spring.io/blog/2018/10/02/the-evolution-of-spring-fu
scraped: 2026-02-23T15:11:43.863Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Sébastien Deleuze |  October 02, 2018 | 2 Comments
---

# The evolution of Spring Fu

_Engineering | Sébastien Deleuze |  October 02, 2018 | 2 Comments_

I take the opportunity of a short stop between [SpringOne platform](https://springoneplatform.io) where I gave the first talk about Spring Fu and [Kotlinconf](https://kotlinconf.com/) to give an overview of the evolution of this project, summarize the current status and share what could be the next steps.

Early June, I announced a new experimental project named [Spring Fu](https://github.com/spring-projects/spring-fu), with the goal to experiment on a new kind of API to configure Spring applications using Kotlin DSL and functional configuration.

> Today, I am proud to announce a new experimental project: Spring Fu. It is a [@Kotlin](https://twitter.com/kotlin?ref_src=twsrc%5Etfw) micro-framework that makes it easy to create lightweight Spring-powered applications with functional APIs instead of annotations. We are looking for feedback. [https://t.co/R15wJ1gD8K](https://t.co/R15wJ1gD8K) [pic.twitter.com/ScljoPZ8rW](https://t.co/ScljoPZ8rW)
> 
> — Sébastien Deleuze (@sdeleuze) [June 8, 2018](https://twitter.com/sdeleuze/status/1005072964822487040?ref_src=twsrc%5Etfw)

I must admit I was not expecting the huge wave of feedback that followed, and I would like to thank the Spring community for such warm welcome. I have continued since to work on the project in order to turn this first POC based on raw Spring Framework API into an incubator for new Spring functional features.

## [](#kofu-configuration)Kofu configuration

The Kotlin DSL is now based on Spring Boot infrastructure and is called Kofu (for **Ko**tlin and **fu**nctional). It allows to configure Spring Boot applications with a Kotlin DSL and lambdas instead of annotations and have following characteristics:

-   Explicit configuration via a Kotlin DSL
-   Based on Spring Boot infrastructure used in a functional way
-   No feature enabled based on classpath detection
-   Both declarative and programmatic
-   Faster startup and lower memory consumption
-   Minimal reflection & annotations usage
-   Pure lambdas, no CGLIB proxy

A typical Spring Boot application configured with Kofu configuration looks like that:

```kotlin
Copyval app = application {
  import(beans)
  listener<ApplicationReadyEvent> {
    ref<UserRepository>().init()
  }
  properties<SampleProperties>("sample")
  server {
    port = if (profiles.contains("test")) 8181 else 8080
    mustache()
    codecs {
      string()
      jackson {
        indentOutput = true
      }
    }
    import(::routes)
  }
  mongodb {
    embedded()
  }
}

val beans = beans {
  bean<UserRepository>()
  bean<UserHandler>()
}

fun routes(userHandler: UserHandler) = router {
  GET("/", userHandler::listView)
  GET("/api/user", userHandler::listApi)
  GET("/conf", userHandler::conf)
}

fun main() = app.run()
```

In order to use it, you "just" have to add a `org.springframework.fu:spring-boot-kofu` dependency to a Spring Boot 2.1 application. As the current version number `0.0.2` suggests it, be aware that for now the API is not stable yet, not suitable for production and that the scope is limited to a subset of what Spring Boot supports.

But feel free to play with it, send feedback and try this new way of configuring Spring Boot applications which is functional, discoverable via your IDE auto-complete and [documented](http://repo.spring.io/milestone/org/springframework/fu/spring-boot-kofu/0.0.2/spring-boot-kofu-0.0.2-javadoc.jar!/kofu/org.springframework.boot.kofu/application.html).

Kofu is not better or worse than auto-config, it is just different. I believe it could be a way for Spring Boot to reach developers who prefer a more explicit configuration model and those who are coming from other backgrounds like Kotlin, Go, Node or Ruby.

## [](#jafu-configuration)Jafu configuration

Initially limited to Kotlin, one of the main feedback I received was from Java developers interested in this explicit DSL approach as well, so I worked on a Java equivalent and ended up with this Jafu (for **Ja**va and **fu**nctional) DSL.

```java
Copypublic class JafuApplication {

  public static SpringApplication app = application(app -> {
    app.beans(beans -> {
      beans.bean(SampleService.class);
      beans.bean(SampleHandler.class);
    });
    app.server(server -> server.router(router -> {
      SampleHandler sampleHandler = app.ref(SampleHandler.class);
      router.GET("/", sampleHandler::hello);
      router.resources("/**", new ClassPathResource("static/"));
    }));
  });

  public static void main (String[] args) {
    app.run(args);
  }
}
```

This is currently just a POC but I plan to reach feature parity shortly with Kofu and develop the 2 DSLs in parallel. The lack of [type-safe builders](https://kotlinlang.org/docs/reference/type-safe-builders.html), [reified type parameters](https://kotlinlang.org/docs/reference/inline-functions.html#reified-type-parameters) or [extension mechanism](https://kotlinlang.org/docs/reference/extensions.html#extensions) will make Jafu more verbose and less extensible than Kofu, but despite these limitations, I find Jafu pretty nice and usable.

For users only interested by the performance increase linked to the usage of a functional bean registration infrastructure, it is worth to notice than [Dave Syer](https://github.com/dsyer) is currently [experimenting](https://github.com/dsyer/spring-init-experiment) on solutions that would make it possible to leverage functional bean registration efficiency with regular Spring Boot applications based on annotations.

## [](#running-spring-applications-as-native-executable)Running Spring applications as native executable

[GraalVM](https://www.graalvm.org/) is a new virtual machine developed by Oracle, which allows among other features, to compile JVM bytecode to native executable via [Substratevm](https://github.com/oracle/graal/tree/master/substratevm).

Spring Framework 5.1 provides some [initial support](https://jira.spring.io/browse/SPR-16991) for GraalVM native images, but we are really at the beginning of the story. GraalVM team need to fix various issues raised by Dave in order to get everything working as expected, and the ecosystem needs to adap to this new platform which has different constraints and characteristics.

But GraalVM team is listening our feedback, and Spring application support has progressed significantly these last months. It is already possible to compile a basic Spring Boot reactive application with Kofu configuration as a native executable that runs almost instantly!

## [](#coroutines-support)Coroutines support

Like said before, the main goal of Spring Fu is to incubate features that will be integrated in current top level projects like Spring Framework, Spring Data and Spring Boot.

Spring Fu is currently incubating coroutines support for Spring WebFlux and Spring Data in order to be able to leverage Spring Reactive stack in a more imperative style fashion. This mainly targets developers who want to leverage the scalability of such stack without requiring all the power of reactive API.

```kotlin
Copyclass UserRepository(private val mongo: CoroutinesMongoTemplate) {
	suspend fun count(): Long = mongo.count<User>()
	suspend fun findAll(): List<User> = mongo.findAll<User>()
	suspend fun findOne(id: String): User? = mongo.findById<User>(id)
	suspend fun deleteAll() = mongo.remove<User>()
	suspend fun save(user: User): User? = mongo.save(user)
}
```

Be aware that while coroutines are considered final as of Kotlin 1.3, there is still a major missing piece in `kotlinx-coroutines` since it does not provide any type to deal with cold streams. We will need this missing abstraction in order to be able to expose our reactive foundations with a coroutines API, see [kotlinx.coroutines#254](https://github.com/Kotlin/kotlinx.coroutines/issues/254) for more details.

Notice that we should be able to [pass context between coroutines and reactor types](https://github.com/Kotlin/kotlinx.coroutines/issues/284) in order to allow pretty powerful use cases like reactive security and transactions.

[Konrad Kaminski](https://github.com/konrad-kaminski) who contributed the original Spring coroutines support via his great [spring-kotlin-coroutine](https://github.com/konrad-kaminski/spring-kotlin-coroutine) project will shortly join Spring Fu to work on this feature with me.

## [](#conclusion)Conclusion

I have just released [Spring Fu 0.0.2](https://github.com/spring-projects/spring-fu/releases/tag/v0.0.2) which provides an improved Kofu DSL and introduces [autowiring of function parameters](https://jira.spring.io/browse/SPR-17312). Feel free to try it and to provide feedback.

Upcoming [Spring Fu 0.0.3](https://github.com/spring-projects/spring-fu/milestone/4) will provide feature parity between Kofu and Jafu configurations.

We already have [10+ community contributors](https://github.com/spring-projects/spring-fu/graphs/contributors) who submitted pull requests to Spring Fu, so if you have some ideas you could maybe be the next ;-)

Looking forward meeting you in my upcoming Spring Fu talks at [JFuture](https://jfuture.by/) (Minsk), [Spring Fest](http://springfest2018.springframework.jp/) (Tokyo) and [Devoxx](https://dvbe18.confinabox.com/talk/TZU-3777/What's_cooking_in_Spring_Fu%3F) (Antwerpen).