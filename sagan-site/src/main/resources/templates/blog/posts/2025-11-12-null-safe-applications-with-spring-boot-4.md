---
title: Null-safe applications with Spring Boot 4
source: https://spring.io/blog/2025/11/12/null-safe-applications-with-spring-boot-4
scraped: 2026-02-22T22:01:25.429Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Sébastien Deleuze |  November 12, 2025 | 3 Comments
---

# Null-safe applications with Spring Boot 4

_Engineering | Sébastien Deleuze |  November 12, 2025 | 3 Comments_

This is a new blog post in the [Road to GA series](https://spring.io/blog/2025/09/02/road_to_ga_introduction), this time sharing an update on the status of the null-safety support across the Spring portfolio, as a follow-up of my previous related blog post [Null Safety in Spring applications with JSpecify and NullAway](https://spring.io/blog/2025/03/10/null-safety-in-spring-apps-with-jspecify-and-null-away) and [related Spring I/O talk](https://www.youtube.com/watch?v=5Lbxq6LP7FY).

## [](#are-we-fixing-the-billion-dollar-mistake)Are we fixing “the billion dollar mistake”?

Yes, we are! And by “we”, I mean [the organizations involved in the JSpecify projects](https://jspecify.dev/about/), the Spring team, and you, Spring developers who are going to upgrade to Spring Boot 4.

That said, I don’t think “the billion dollar mistake” was the invention of the null reference that [Tony Hoare](https://en.wikipedia.org/wiki/Tony_Hoare) apologized for. I think the real mistake was to not express it explicitly in the type system, as this is the implicit nature of the nullability that causes so many [`NullPointerException`](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/NullPointerException.html) on production. If you make it explicit, nullability becomes a zero cost abstraction for expressing the potential absence of value, backward compatible with existing APIs.

[JSpecify](https://jspecify.dev/) has been designed to provide [a set of annotations](https://jspecify.dev/docs/api/org/jspecify/annotations/package-summary.html), with related [documentation](https://jspecify.dev/docs/start-here/) allowing Java codebases to express explicitly the nullability of their APIs. A key point is that those annotations are not tied to a specific tool, they have been designed to allow multiple consistent implementations thanks to the detailed [specifications](https://jspecify.dev/docs/spec/).

## [](#a-huge-collaborative-effort)A huge collaborative effort

Annotating randomly a few APIs with `@Nullable` is easy, but fully annotating existing codebases with a checker part of your build treating nullability inconsistencies as compilation errors is much more challenging. This is the huge task the Spring team has started a few months ago.

Today, I am delighted to share that we, as a team, have reached our goal to make most of the Spring portfolio APIs null-safe, in order to empower Spring developers to reduce or remove the risk of `NullPointerException` on production.

More specifically, the following projects now provide null-safe APIs:

-   Spring Boot 4.0
-   Spring Framework 7.0
-   Spring Data 4.0
-   Spring Security 7.0
-   Spring Batch 6.0
-   Spring Kafka 4.0
-   Spring Integration 7.0
-   Spring GraphQL 2.0
-   Spring Web Services 5.0
-   Spring AMQP 4.0
-   Spring Shell 4.0
-   Spring Kafka 4.0
-   Spring Plugin 4.0
-   Spring HATEOAS 3.0
-   Spring Modulith 2.0
-   Spring Vault 4.0
-   Spring Cloud Commons 5.0
-   Spring Cloud Gateway 5.0
-   Micrometer 1.16
-   Micrometer Tracing 1.6
-   Context Propagation 1.2
-   Reactor 2025.0

A few Spring projects do not provide yet null-safe APIs, but plan to do so in a near future:

-   Spring AI (planned in 2.0)
-   Spring Session
-   Spring LDAP
-   Spring gRPC (tentatively planned in 1.0)
-   The rest of Spring Cloud (tentatively planned in 2026.0)

Worth to notice that some dependencies used by Spring have also annotated their APIs with JSpecify annotations, and likely more are coming:

-   JUnit
-   GraphQL
-   Caffeine

Kotlin 2, the new baseline for Spring Framework 7 and Spring Boot 4, automatically translates JSpecify annotations to Kotlin nullability. Goodbye [platform types](https://kotlinlang.org/docs/java-interop.html#notation-for-platform-types), including for generics, Spring APIs now look like if they were natively written in Kotlin!

## [](#null-safe-usage-of-spring-apis)Null-safe usage of Spring APIs

The easiest way to benefit from Spring null-safety is to upgrade to Spring Boot 4 and use an IDE that supports JSpecify annotations to provide feedback to the developer on how to handle potential nullability issues detected from Spring APIs usage.

With JetBrains being a member of the JSpecify group since its inception, the IntelliJ IDEA team has been working on a first class JSpecify support that will be available as of IntelliJ IDEA 2025.3 (release expected in a few days).

Andrei Kogun, product expert at JetBrains, shares more details about it:

> The adoption of JSpecify is a great example of how collaboration across the Java ecosystem can create not just another standard, but one that developers actually benefit from in everyday work.
> 
> IntelliJ IDEA added support for JSpecify early on — back when the first drafts of the specification appeared — and we’ve been improving it ever since. Today, it includes full coverage for generic types and complex data-flow analysis, making nullability checks both powerful and intuitive. Community feedback and cooperation from teams migrating their codebases to JSpecify, have been key to shaping that support.
> 
> Starting with IntelliJ IDEA 2025.3, the IDE will automatically prefer JSpecify annotations when they’re available on the classpath, even over JetBrains’s own ones. That means when you fix nullability issues, these annotations are not just recognized — they’re also generated automatically through quick-fixes and refactorings.

For example, see the screenshot below where IntelliJ IDEA warns about a potential nullability issue and guides the developer with various ways to handle that.

![IntelliJ IDEA warnings and guidance](https://static.spring.io/blog/sdeleuze/20251112/intellij-idea-nullability.png)

The Spring Tools team is also working on [configuring JSpecify automatically in Eclipse and VSCode](https://github.com/spring-projects/spring-tools/issues/1624), leveraging existing support for nullability annotation in the Eclipse platform.

Those IDE checks will allow you to greatly reduce the risk of `NullPointerException` at runtime.

## [](#null-safe-applications)Null-safe applications

If your ambition is not to reduce but to remove almost any chance of `NullPointerException` at runtime in your application, you can annotate your Spring Boot application with JSpecify annotations and we highly recommend to use a build-time nullability checker like [NullAway](https://github.com/uber/NullAway). Just be aware that’s significantly more involved than just consuming null-safe APIs as described in the previous section, so make sure to fully understand the implications before starting.

The Spring team has been collaborating with [Manu Sridharan](https://manu.sridharan.net/), Professor of Computer Science and Engineering at the University of California, Riverside, who is also the NullAway lead. He shared the following thoughts:

> The NullAway team is excited to support the JSpecify standard. We are eager to continue working with the Spring team and others on increasing null safety throughout the Java ecosystem.

To make your application null-safe, you will typically annotate the packages with [@NullMarked](https://jspecify.dev/docs/api/org/jspecify/annotations/NullMarked.html), and specify nullable type usages with [@Nullable](https://jspecify.dev/docs/api/org/jspecify/annotations/Nullable.html), see more details in the [related guidelines in Spring Framework null-safety documentation](https://docs.spring.io/spring-framework/reference/7.0/core/null-safety.html#null-safety-guidelines).

To enable checks at build-time, you need to configure [NullAway](https://github.com/uber/NullAway) in your build. See [jspecify-nullaway-demo](https://github.com/sdeleuze/jspecify-nullaway-demo) for concrete examples of [build.gradle](https://github.com/sdeleuze/jspecify-nullaway-demo/blob/main/build.gradle), [build.gradle.kts](https://github.com/sdeleuze/jspecify-nullaway-demo/blob/main/build.gradle.kts) and [pom.xml](https://github.com/sdeleuze/jspecify-nullaway-demo/blob/maven/pom.xml).

Be aware that NullAway JSpecify mode requires a recent javac version, so we recommend using Java 25 if you can, otherwise most JDK 21.0.8+ distributions (except Oracle JDK) should support the `-XDaddTypeAnnotationsToSymbol=true` flag that will allow NullAway to work as expected. A Java 17 backport of this flag may be available in the future. If, like Spring, you need to retain a Java 17 baseline, you can use a Java 25 toolchain and configure your Maven or Gradle build with the javac option `--release 17` as shown in [jspecify-nullaway-demo](https://github.com/sdeleuze/jspecify-nullaway-demo).

Be aware that former Spring nullability annotations in the [org.springframework.lang](https://docs.spring.io/spring-framework/docs/7.0.x/javadoc-api/org/springframework/lang/package-summary.html) package are now deprecated in favor of JSpecify ones.

## [](#potential-future-refinements)Potential future refinements

### [](#cannot-attach-type-annotations-errors)Cannot attach type annotations errors

The Spring team has worked to minimize such side effects, but with recent versions of Java like Java 25, javac can report errors when importing a class that has type use annotations like JSpecify [`@Nullable`](https://jspecify.dev/docs/api/org/jspecify/annotations/Nullable.html) and [`@NonNull`](https://jspecify.dev/docs/api/org/jspecify/annotations/NonNull.html) on types not present in the classpath.

There are ongoing discussions and work to hopefully remove this side effect by restoring javac lazy behavior to not trigger such error, or if not possible to downgrade it to a warning with some way to suppress it. See [https://github.com/openjdk/jdk/pull/28018](https://github.com/openjdk/jdk/pull/28018) for more details.

### [](#suppresswarningsnullness)@SuppressWarnings(“nullness”)

There are ongoing discussions at the JSpecify working group to standardize a tooling-neutral way to suppress nullability checks, when for example they are not relevant. You can track [https://github.com/jspecify/jspecify/issues/55](https://github.com/jspecify/jspecify/issues/55) related issue.

### [](#nullaway-refinements)NullAway refinements

NullAway JSpecify mode is still evolving, so be sure to check or report [related issues](https://github.com/uber/NullAway/issues?q=is%3Aissue%20state%3Aopen%20label%3Ajspecify). For example with Spring or Reactor APIs using lambdas, you may hit [NullAway#1290](https://github.com/uber/NullAway/issues/1290). For now, you can suppress related warnings with `@SuppressWarnings("NullAway")`.

We are also expecting refinements on JDK APIs nullability, see [NullAway#950](https://github.com/uber/NullAway/issues/950) related issue.

## [](#conclusion)Conclusion

What I like with those null-safety improvements is that they led to a lot of refinements in the Spring codebases that increased its quality and robustness. And you are free to decide how much you want to leverage them. You can just turn-off related warnings if you don't care, fix them in your IDE to reduce the risk of `NullPointerException`, or go as far as making your application null-safe.

Also, as shown by Spring work, this is actionable on existing projects without breaking your APIs, as you will conceptually augment current types with nullability information.

We hope to see more open source libraries adopting JSpecify as well, and we think that JSpecify adoption will help the JVM ecosystem and your applications to be prepared for a future support of [Null-Restricted and Nullable Types](https://openjdk.org/jeps/8303099), which may require several years to materialize in practice (availability as a non-preview feature, library upgrading their baseline, applications doing as well) with additional runtime efficiency benefits.