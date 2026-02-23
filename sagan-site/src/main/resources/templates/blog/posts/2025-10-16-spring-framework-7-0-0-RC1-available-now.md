---
title: Spring Framework 7.0.0-RC1 available now
source: https://spring.io/blog/2025/10/16/spring-framework-7-0-0-RC1-available-now
scraped: 2026-02-23T07:26:04.932Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  October 16, 2025 | 0 Comments
---

# Spring Framework 7.0.0-RC1 available now

_Releases | Brian Clozel |  October 16, 2025 | 0 Comments_

On behalf of the team and everyone who has contributed, I am pleased to announce our first release candidate for Spring Framework 7.0. There is another release candidate scheduled by the end of the month, before our GA version in November. We have compiled all the upgrade information, new features and deprecations on the [Spring Framework 7.0 release notes](https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-7.0-Release-Notes) preview page.

## [](#resiliency-refinements)Resiliency refinements

The new [Resiliency feature](https://docs.spring.io/spring-framework/reference/7.0/core/resilience.html) got a few more refinements in this release. You can now match against exception causes in `@Retryable` or `RetryPolicy`, and even include/exclude specific exception types. We also added a new `@ConcurrencyLimit` programmatic variant for more flexible setups; the `@ConcurrencyLimit` annotation now supports placeholder resolution for its attributes.

## [](#context-propagation-improvements)Context Propagation Improvements

In the previous milestone, [we introduced context propagation support for Kotlin Coroutines](https://spring.io/blog/2025/09/11/spring-framework-7-0-0-M9-available-now#context-propagation-for-kotlin-coroutines). This new version refines the `ContextPropagationElement` operator to be more idiomatic for Kotlin users and handles `kotlinx-coroutines-reactor` as an optional dependency. `ContextPropagationElement` is now automatically applied for `CoroutinesUtils#invokeSuspendingFunction` when no `CoroutineContext` is provided. This means that context propagation will be supported automatically in your application code where Spring handles coroutines for you. You can check the relevant documentation section for more on [Context Propagation in Kotlin Coroutines](https://docs.spring.io/spring-framework/reference/7.0-SNAPSHOT/languages/kotlin/coroutines.html#coroutines.propagation).

## [](#api-versioning-refinements)API Versioning refinements

Controller methods can now get injected with the version being used:

```java
Copy@RestController
class UserController {
	
	@GetMapping("/users/{id}")
    public User findUser(String id, Version apiVersion) {
		//...
    }
	
}

```

## [](#baseline-upgrades)Baseline upgrades

This new release brings additional baseline upgrades for the 7.0 generation, namely:

-   JUnit 6.0
-   Jackson 3.0, see [this dedicated blog post on Jackson support](https://spring.io/blog/2025/10/07/introducing-jackson-3-support-in-spring)

## [](#and-much-more)And much more!

There are plenty of other changes. As usual, you can check [the detailed changelog](https://github.com/spring-projects/spring-framework/releases/tag/v7.0.0-RC1) for more details. 7.0.0-RC1 is now available from [https://repo.spring.io](https://repo.spring.io) and [Maven Central](https://spring.io/blog/2025/01/21/milestones-to-central).

[Project Page](https://spring.io/projects/spring-framework/) | [GitHub](https://github.com/spring-projects/spring-framework) | [Issues](https://github.com/spring-projects/spring-framework/issues) | [Documentation](https://docs.spring.io/spring-framework/reference/)