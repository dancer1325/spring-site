---
title: Spring Framework 7.0.0-M3 Available Now
source: https://spring.io/blog/2025/03/13/spring-framework-7-0-0-M3-available-now
scraped: 2026-02-23T07:39:48.574Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  March 13, 2025 | 0 Comments
---

# Spring Framework 7.0.0-M3 Available Now

_Releases | Brian Clozel |  March 13, 2025 | 0 Comments_

On behalf of the team and everyone who has contributed, I am pleased to announce the third milestone of the next Spring Framework generation. The third milestone continues delivering new features and refinements on top of [7.0.0-M1](https://spring.io/blog/2025/01/23/spring-framework-7-0-0-M1-available-now) and [7.0.0-M2](https://spring.io/blog/2025/02/13/spring-framework-7-0-0-M2-available-now).

In this milestone, we are shipping the first step of our [new "API versioning" feature for web applications](https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-7.0-Release-Notes#api-versioning-support-in-web-applications). Keep an eye for further improvements and documentation there, we're definitely interested in feedback from the community!

By popular demand, the java `Optional` type is now better supported in SpEL expressions. Not only you can now call [null-safe operations on Optional types](https://docs.spring.io/spring-framework/reference/7.0-SNAPSHOT/core/expressions/language-ref/operator-safe-navigation.html#expressions-operator-safe-navigation-optional), but you can also [use the Elvis operator](https://docs.spring.io/spring-framework/reference/7.0-SNAPSHOT/core/expressions/language-ref/operator-elvis.html) to navigate in expressions.

Finally, we are introducing a new Programmatic Bean Registration mechanism with `BeanRegistrar`; this can help if you're reaching the limits of the `@Bean` declaration model. See the [new "Programmatic Bean Registration" section in the reference documentation](https://docs.spring.io/spring-framework/reference/7.0-SNAPSHOT/core/beans/java/programmatic-bean-registration.html#page-title).

As usual, you can check [the detailed changelog](https://github.com/spring-projects/spring-framework/releases/tag/v7.0.0-M3) for more details and [read the global 7.0 release notes for upgrade concerns](https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-7.0-Release-Notes).

7.0.0-M3 is now available from [https://repo.spring.io](https://repo.spring.io) and [Maven Central](https://spring.io/blog/2025/01/21/milestones-to-central).

[Project Page](https://spring.io/projects/spring-framework/) | [GitHub](https://github.com/spring-projects/spring-framework) | [Issues](https://github.com/spring-projects/spring-framework/issues) | [Documentation](https://docs.spring.io/spring-framework/reference/)