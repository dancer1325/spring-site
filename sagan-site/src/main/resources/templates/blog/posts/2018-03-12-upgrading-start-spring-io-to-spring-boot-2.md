---
title: Upgrading start.spring.io to Spring Boot 2
source: https://spring.io/blog/2018/03/12/upgrading-start-spring-io-to-spring-boot-2
scraped: 2026-02-23T16:06:16.607Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Stéphane Nicoll |  March 12, 2018 | 2 Comments
---

# Upgrading start.spring.io to Spring Boot 2

_Engineering | Stéphane Nicoll |  March 12, 2018 | 2 Comments_

Spring Boot 2 was released recently and the production instance of [Spring Initializr](https://github.com/spring-io/initializr) ([start.spring.io](https://start.spring.io)) was upgraded to Spring Boot 2 the same day.

In this post, I'd like to walk you through the process of upgrading a Spring Boot `1.x` app to Spring Boot 2.

## [](#release-notes-and-migration-guide)Release notes and migration guide

A good first step is to get yourself familiar with the main changes in Spring Boot 2 by reading the [migration guide](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.0-Migration-Guide) and the [release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.0-Release-Notes).

## [](#build-upgrade)Build upgrade

If you are using Maven and the `spring-boot-starter-parent`, you need to be aware that several plugins are going to be updated as part of the upgrade. If you're not using the parent, it is worthwhile to inspect your build and upgrade the plugins that you are using. Spring Initializr is built with Maven so the easiest way is to [scan `spring-boot-dependencies`](https://github.com/spring-projects/spring-boot/blob/v2.0.0.RELEASE/spring-boot-project/spring-boot-dependencies/pom.xml#L183) and upgrade the plugins you are using if necessary.

## [](#upgrade-to-spring-boot-2)Upgrade to Spring Boot 2

Initializr has dedicated auto-configuration to automatically configure the service. It also exposes dedicated metrics so it goes beyond using what already exists. The first step is to review some basic compilation errors due to renames and relocations.

In the case of Initializr, the biggest change was the move to [micrometer](http://micrometer.io/) as the `CounterService` and `GaugeService` are no longer available. Fortunately, it was [quite easy to fix the compilation errors](https://github.com/spring-io/initializr/blob/fe7650f2c8b98161473d4406a8bbc5e7007ea648/initializr-actuator/src/main/java/io/spring/initializr/actuate/metric/ProjectGenerationMetricsListener.java) by injecting the `MeterRegistry`. We can then use the registry to retrieve a `Counter` per element to increment.

We certainly need to improve our integration with Micrometer, but that basic change is enough to get us going.

## [](#properties-migration)Properties migration

We haven't looked at the test suite yet but we could give the app a go to get a first impression. Before doing so, let's add the properties migrator to the build

```xml
Copy<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-properties-migrator</artifactId>
    <scope>runtime</scope>
</dependency>
```

Or, if you're using Gradle:

```gradle
Copyruntime("org.springframework.boot:spring-boot-properties-migrator")
```

If we run the app, it will identify the properties that are no longer managed by Spring Boot. If there is a replacement it will temporarily remap the property for you with a warning. If there isn't a replacement, an error report will give you more information. Either way, the configuration has to be updated and the dependency removed once you have updated the configuration.

Before you move on, it is a good idea to use the search feature of your IDE to double-check that you aren't using one of the properties you've migrated in an integration test. In the case of Initializr, `management.security.enabled` was used and [had to be migrated as well](https://github.com/spring-io/initializr/blob/fe7650f2c8b98161473d4406a8bbc5e7007ea648/initializr-actuator/src/test/java/io/spring/initializr/actuate/ActuatorIntegrationTests.java#L42).

So the app starts now. Before going further, let's have a look at the test suite.

## [](#test-infrastructure)Test infrastructure

As part of the upgrade, test utilities are also upgraded (we primarily use AssertJ and Mockito). AssertJ had an interesting behaviour change: `containsSequence` on a `String` stopped permitting holes in the sequence (`containsSubSequence` was introduced for that behavior). The Mockito upgrade was painless (`ArgumentMatcher` is now an interface and the import for `argThat` had to be changed).

We were also using `PropertiesConfigurationFactory` to bind a POJO to a prefix of the `Environment`. In 2.0, a brand new `Binder` API was introduced that is more flexible and easier to use. Our binding that took 10 lines of code [could be reduced to 3 simple lines](https://github.com/spring-io/initializr/commit/fe7650f2c8b98161473d4406a8bbc5e7007ea648#diff-2aede7dc447980e1149b5948298cb231R211).

Finally, our auto-configuration tests can now benefit from `ApplicationContextRunner`, rather than creating the `ApplicationContext` and managing its lifecycle ourselves. This feature is covered in detail [in a separate blog post](https://spring.io/blog/2018/03/07/testing-auto-configurations-with-spring-boot-2-0).

We can now run the tests and realize that there are a few tests failing. The home page of the service does not work anymore in the browser! Some tests exercising the creation of build scripts via the endpoint failed too.

## [](#mustache-prefix-change)Mustache prefix change

The reason the templates did not render anymore is due to the fact that the [prefix for Mustache templates has changed](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.0-Migration-Guide#mustache-templates-default-file-extension). Renaming our templates to `.mustache` was enough to fix that problem.

## [](#spring-mvc-path-matching-default-behavior-change)Spring MVC Path Matching Default Behavior Change

The second problem was an abuse of path matching in our endpoint. The endpoint that allows you to create a `pom.xml` file was as follows:

```java
Copy@RequestMapping("/pom")
@ResponseBody
public ResponseEntity<byte[]> pom(BasicProjectRequest request) { ... }
```

Users are expected to call `/pom.xml` and that's what we should have mapped initially. In Spring Boot 2, the [Spring MVC path matching default behavior has changed](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.0-Migration-Guide#spring-mvc-path-matching-default-behavior-change) so that this endpoint does not match anymore.

An easy fix is:

```java
Copy@RequestMapping(path = { "/pom", "/pom.xml" })
@ResponseBody
public ResponseEntity<byte[]> pom(BasicProjectRequest request) { ... }
```

## [](#redirect-for-info)Redirect for `/info`

[https://start.spring.io/info](https://start.spring.io/info) is a well-known URL to retrieve the versions mapping that Spring Initializr is currently using. It typically allows you to know which Spring Cloud version matches your current Spring Boot version.

Spring Boot 2 moves actuator endpoints to `/actuator` and we want to follow that default. But that does not mean we want to break a URL that users may have bookmarked. To get the best of the both worlds, we can add a simple redirect:

```java
Copy@Bean
public WebMvcConfigurer initializrWebMvcConfigurer() {
    return new WebMvcConfigurer() {
        @Override
        public void addViewControllers(ViewControllerRegistry registry) {
            registry.addRedirectViewController("/info", "/actuator/info");
        }
    }
}
```

## [](#wrapping-up)Wrapping up

Migrating Spring Initializr to Spring Boot 2 was quite easy in the end. Reading the release notes and the migration guide to know beforehand the changes that may affect your app was key. Since the Spring Boot 2 release, [start.spring.io](https://start.spring.io) has been happily generating tens of thousands of projects a day for the community around the World.

The next step is to properly migrate metrics to Micrometer, abandoning hierarchical names and using tags instead. Subscribe to [#526](https://github.com/spring-io/initializr/issues/526) if you are interested to know more about that.