---
title: Spring Native for GraalVM 0.8.3 available now
source: https://spring.io/blog/2020/11/23/spring-native-for-graalvm-0-8-3-available-now
scraped: 2026-02-23T13:40:41.691Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Sébastien Deleuze |  November 23, 2020 | 17 Comments
---

# Spring Native for GraalVM 0.8.3 available now

_Releases | Sébastien Deleuze |  November 23, 2020 | 17 Comments_

On behalf of everyone that has contributed, I am pleased to announce that [Spring Native for GraalVM](https://github.com/spring-projects-experimental/spring-native) 0.8.3 has been released and is available from [Spring milestone repository](https://repo.spring.io/milestone), check the updated [reference documentation](https://repo.spring.io/milestone/org/springframework/experimental/spring-graalvm-native-docs/0.8.3/spring-graalvm-native-docs-0.8.3.zip!/reference/index.html) for more details.

Spring Native for GraalVM provides an incubating support for compiling Spring applications to native executables using the [native-image](https://www.graalvm.org/reference-manual/native-image/) compiler, in order to provide a native deployment option designed to be packaged in lightweight containers. In practice, the target is to support your Spring application (typically a Spring Boot one), unmodified, on this new platform.

## [](#whats-new-in-083)[](#whats-new-in-0-8-3)What’s new in 0.8.3

### [](#spring-boot-240-baseline)[](#spring-boot-2-4-0-baseline)Spring Boot 2.4.0 baseline

0.8.3 is now based on [Spring Boot 2.4.0](https://spring.io/blog/2020/11/12/spring-boot-2-4-0-available-now) and the first release based on a stable version of Spring Boot.

### [](#graalvm-2030-support)[](#graalvm-20-3-0-support)GraalVM 20.3.0 support

0.8.3 is designed for [GraalVM 20.3.0](https://www.graalvm.org/release-notes/20_3/) that has just been released.

### [](#springbootapplication-and-configuration-with-default-attributes)[](#springbootapplication-and-configuration-with-default-attributes)@SpringBootApplication and @Configuration with default attributes

Until now, in order to compile Spring applications to native, you had to use `@SpringBootApplication(proxyBeanMethods = false)` and `@Configuration(proxyBeanMethods = false)` since CGLIB proxies created by `proxyBeanMethods = true` (previous default behavior) are not supported in native.

As of Spring Native 0.8.3, `@SpringBootApplication` and `@Configuration` do not create CGLIB proxies anymore, so they are native compliant out of the box. We have also added a verification mechanism that checks that your application and libraries do not use cross `@Bean` invocations (only supported with CGLIB proxies) and throw an error if such pattern is detected. You can switch off this verification if needed with `-Dspring.native.verify=false`.

### [](#improved-compatibility)[](#improved-compatibility)Improved compatibility

As usual, we are working to improve gradually the scope and the quality of our native support, see the [detailed changelog](https://github.com/spring-projects-experimental/spring-native/milestone/10?closed=1) for more details.

## [](#whats-next)[](#whats-next)What’s next

Our next [0.9.0 milestone](https://github.com/spring-projects-experimental/spring-native/milestone/6) expected early 2021 will be an important one since it will materialize the beginning of our beta support on a subset of Spring Boot starters like Spring MVC, WebFlux, Data (JPA, JDBC, Elastic Search, Neo4j, MongoDB, Redis, R2DBC), Security, Batch, Function, etc.

We are going to do several big refactorings to gradually transform the project into modules that could be integrated later in Spring top level projects. As part of this process, we are going to introduce a set of [build time transformations](https://github.com/spring-projects-experimental/spring-native/issues?q=is%3Aissue+is%3Aopen+label%3A%22type%3A+build-time-transformation%22) that will be done on your application in order to bring Spring Native to the next level in term of robustness and efficiency.

In parallel, we also collaborate with the GraalVM team on JUnit 5 native testing and helping JVM libraries to support native compilation out of the box in a maintainable way. We will share more on that effort early next year.