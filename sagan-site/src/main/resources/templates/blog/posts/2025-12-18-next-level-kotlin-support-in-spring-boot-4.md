---
title: Next level Kotlin support in Spring Boot 4
source: https://spring.io/blog/2025/12/18/next-level-kotlin-support-in-spring-boot-4
scraped: 2026-02-22T22:04:06.718Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Sébastien Deleuze |  December 18, 2025 | 1 Comment
---

# Next level Kotlin support in Spring Boot 4

_Engineering | Sébastien Deleuze |  December 18, 2025 | 1 Comment_

Following the announcement of the [strategic partnership between JetBrains and Spring](https://blog.jetbrains.com/kotlin/2025/05/strategic-partnership-with-spring/) in May, I would like to share a global update on various Kotlin-related features and documentation enhancements we have made recently, with the goal of making Spring Boot 4 the best framework to develop backend applications with Kotlin.

## [](#kotlin-2-baseline)Kotlin 2 baseline

[Kotlin 2.0](https://blog.jetbrains.com/kotlin/2024/05/celebrating-kotlin-2-0-fast-smart-and-multiplatform/) introduced a new stable K2 compiler that compiles projects faster, performs smarter code analysis and allows the Kotlin team to evolve the language faster than with the K1 compiler. We recommend IntelliJ IDEA users to upgrade to [2025.3](https://www.jetbrains.com/idea/whatsnew/) to benefit from the best developer experience.

Spring Framework 7.0, Spring Boot 4.0 and the rest of the portfolio switches from Kotlin 1 to Kotlin 2 with a new Kotlin 2.2 baseline that we chose for multiple reasons:

-   Automatic translation of JSpecify to Kotlin null-safety is only enabled by default as of Kotlin 2.1
-   A Kotlin developer experience as consistent as possible (with [defaults when no use-site targets are specified](https://kotlinlang.org/docs/annotations.html#defaults-when-no-use-site-targets-are-specified) for example)
-   Limit the maintenance overhead for the Spring team

The policy we plan for future version is consistent with what has been done so far:

-   Spring Boot 4.1 should leverage [Kotlin 2.3](https://kotlinlang.org/docs/whatsnew23.html) which adds Java 25 support while retaining a Kotlin 2.2 baseline
-   Spring Framework 7.1, Spring Boot 4.2 and related portfolio projects should leverage Kotlin 2.4 while also retaining a Kotlin 2.2 baseline

The recommendation for libraries depending on Spring Framework 7 is to define the same baseline with [Kotlin compiler options](https://kotlinlang.org/docs/gradle-compiler-options.html#attributes-common-to-jvm-and-javascript) `apiVersion=2.2` and `languageVersion=2.2` to not accidentally break the compatibility when upgrading the Kotlin version.

We also recommend defining a Kotlin baseline for new versions of libraries supporting Kotlin typically used in Spring Boot 4 applications, but not depending on Spring. In that case, the baseline can typically be more lenient with for example `apiVersion=2.0` and `languageVersion=2.0`, if you don’t leverage JSpecify annotations, don’t have to maintain a compiler plugin and if the version of the Kotlin compiler you are using supports this baseline.

## [](#idiomatic-null-safe-apis-with-jspecify)Idiomatic null-safe APIs with JSpecify

I had the opportunity to describe recently how [JSpecify](https://jspecify.dev/) usage across the Spring portfolio enables writing [null-safe Java applications with Spring Boot 4](https://spring.io/blog/2025/11/12/null-safe-applications-with-spring-boot-4), but it also turns Spring APIs to idiomatic null-safe Kotlin ones.

Spring Framework 5 and 6 provided some initial null-safety support, but this new major version brings it to a whole new level, since unlike the previous JSR 305 arrangement, JSpecify annotations:

-   Allow to specify the nullability of generic types and array elements
-   Are applied to the whole Spring portfolio, not just Spring Framework and Spring Data
-   Are automatically translated to Kotlin nullability
-   Are checked when building Spring portfolio projects with [NullAway](https://github.com/uber/NullAway)

When upgrading to Spring Boot 4, you should see no [unsafe platform types](https://kotlinlang.org/docs/java-interop.html#null-safety-and-platform-types) in Spring, Reactor or Micrometer APIs anymore, just Kotlin null-safe types. That may require some slight refinements when migrating due to some nullability changes, but hopefully nothing too painful.

## [](#better-kotlin-serialization-support)Better Kotlin Serialization support

### [](#a-more-predictable-behavior)A more predictable behavior

Over the years, the combined usage of [Kotlin Serialization](https://kotlinlang.org/docs/serialization.html) alongside another general purpose JSON library like Jackson has triggered the creation of [a lot of bug reports](https://github.com/spring-projects/spring-framework/issues/35761). One of the reasons is that Kotlin Serialization is not a general purpose JSON serialization library, it is designed to handle mostly Kotlin classes annotated with `@Serializable`, but also some other cases like:

-   Unannotated Kotlin enums
-   Containers shared between Java and Kotlin like `List`, `Map`, etc.
-   Numbers, characters, booleans and strings

That means there is a grey area where it is not always obvious to determine what should be handled by Kotlin Serialization and what should be handled by Jackson.

Also, it is important to keep in mind that even in Spring Boot applications using Kotlin Serialization, Jackson remains needed for features like actuators. So the combined usage of both Kotlin Serialization and Jackson is very common.

In order to solve this recurring problem, we have decided to make the Spring support for Kotlin Serialization more predictable. With Spring Boot 4.0, when both Kotlin Serialization and Jackson are used, the former will handle only types annotated with `@Serializable` at root or generic type level (see [related utility method](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/core/KotlinDetector.html#hasSerializableAnnotation\(org.springframework.core.ResolvableType\))). When only Kotlin Serialization is used, it will continue to handle all the types supported by the library.

If you need to customize the behavior deciding which types Kotlin Serialization should handle, you can do it easily via the new [`org.springframework.http.converter.HttpMessageConverters`](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/http/converter/HttpMessageConverters.html) type crafted by Brian Clozel. See for example [how to configure it](https://docs.spring.io/spring-boot/reference/web/servlet.html#web.servlet.spring-mvc.message-converters) in Spring Boot with Spring MVC. New constructors in related converters and codecs allowing to customize that behavior with a predicate are available.

### [](#a-new-spring-boot-dedicated-module)A new Spring Boot dedicated module

Spring Boot 4 now provides a new `spring-boot-kotlinx-serialization-json` module and a related `spring-boot-starter-kotlinx-serialization-json` starter ([renamed in Spring Boot 4.0.1](https://github.com/spring-projects/spring-boot/issues/48262)) that allows to automatically configure Kotlin Serialization JSON with a stronger signal than just the presence of the library in the classpath. Just add one of those dependencies, as well as [the related compiler plugin](https://github.com/Kotlin/kotlinx.serialization?tab=readme-ov-file#gradle), and Kotlin Serialization JSON will be used by Spring. I recommend reading the [Modularizing Spring Boot](https://spring.io/blog/2025/10/28/modularizing-spring-boot) blog post for more context.

## [](#dsl-based-registration-of-spring-beans)DSL-based registration of Spring beans

[BeanRegistrar and BeanRegistrarDsl](https://docs.spring.io/spring-framework/reference/core/beans/java/programmatic-bean-registration.html) provide flexible bean registration capabilities, allowing for example custom registration through an `if` expression or a `for` loop, something that is not possible with `@Bean`.

Their hidden superpower is that they allow creating custom configuration DSLs for Spring Boot applications, in the spirit of [Spring Fu that we recently retired](https://github.com/spring-attic/spring-fu), with the advantage of being fully integrated with Spring Boot 4 and its new [modular design](https://spring.io/blog/2025/10/28/modularizing-spring-boot). [KHTMX for Spring](https://wakingrufus.github.io/khtmx/spring.html) is a great example of that. Don't be shy, write your own in Java or Kotlin!

In your Kotlin application, feel free to choose between `@Bean` and `BeanRegistrarDsl` for declaring your beans, after all it is also a matter of style preference. Check [Spring PetKlinik](https://github.com/sdeleuze/spring-petklinik), my Kotlin fullstack version of the famous Spring Petclinic sample application, if you want to see how such programmatic bean registration looks like in practice combined with the router DSL.

## [](#automatic-context-propagation-with-coroutines)Automatic context propagation with Coroutines

Spring Boot 4.0 and Spring Framework 7.0 introduces [automatic context propagation with Coroutines](https://docs.spring.io/spring-framework/reference/languages/kotlin/coroutines.html#coroutines.propagation), allowing observability and tracing to work in suspending functions. To enable it, just define a `spring.reactor.context-propagation=auto` Spring Boot property, and make sure the `io.micrometer:context-propagation` dependency is present.

## [](#most-popular-spring-guides-available-in-kotlin)Most popular Spring guides available in Kotlin

Previously only available in Java, the most popular Spring guides are now also available in Kotlin thanks to the contributions of Danil Pavlov from the Kotlin team, and have been upgraded to Spring Boot 4:

-   [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service)
-   [Building a Reactive RESTful Web Service](https://spring.io/guides/gs/reactive-rest-service)
-   [Consuming a RESTful Web Service](https://spring.io/guides/gs/consuming-rest)
-   [Building an Application with Spring Boot](https://spring.io/guides/gs/spring-boot)
-   [Uploading Files](https://spring.io/guides/gs/uploading-files)
-   [Securing a Web Application](https://spring.io/guides/gs/securing-web)
-   [Enabling Cross Origin Requests for a RESTful Web Service](https://spring.io/guides/gs/rest-service-cors)
-   [Accessing Relational Data using JDBC with Spring](https://spring.io/guides/gs/relational-data-access)
-   [Accessing Data with JPA](https://spring.io/guides/gs/accessing-data-jpa)
-   [Managing Transactions](https://spring.io/guides/gs/managing-transactions)
-   [Testing the Web Layer](https://spring.io/guides/gs/testing-web)

[The official Spring Boot Kotlin tutorial](https://spring.io/guides/tutorials/spring-boot-kotlin) has also been migrated from Spring Data JPA to Spring Data JDBC, which allows more idiomatic Kotlin code and a more lightweight stack. It has also been upgraded to Spring Boot 4 and modernized.

## [](#whats-next)What’s next?

The 2026 roadmap is not yet fully defined, but I intend to explore the following areas that may or may not materialize in our releases:

-   Leverage the [more efficient kotlin-reflect based on kotlin-metadata-jvm](https://youtrack.jetbrains.com/issue/KT-75463)
-   Better efficiency and performance when using [Kotlin inline value classes](https://kotlinlang.org/docs/inline-classes.html)
-   Fullstack rendering with [Compose HTML](https://github.com/JetBrains/compose-multiplatform?tab=readme-ov-file#compose-html) and [Kotlin/Wasm](https://kotlinlang.org/docs/wasm-overview.html)
-   Idiomatic logging in Kotlin
-   Enhanced support for Coroutines
    -   Native support in Spring MVC (without the reactive bridge)
    -   [Virtual Thread dispatcher](https://github.com/spring-projects/spring-framework/issues/33788)
-   Even more Kotlin-friendly Spring Framework reference documentation
-   Declarative build systems ([Declarative Gradle](https://declarative.gradle.org/), [Amper](https://github.com/JetBrains/amper))

Feel free to share your ideas, asks and hopes!