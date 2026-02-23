---
title: Modularizing Spring Boot
source: https://spring.io/blog/2025/10/28/modularizing-spring-boot
scraped: 2026-02-22T22:09:33.788Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | The Spring Boot Team |  October 28, 2025 | 1 Comment
---

# Modularizing Spring Boot

_Engineering | The Spring Boot Team |  October 28, 2025 | 1 Comment_

Continuing our [Road to GA series](https://spring.io/blog/2025/09/02/road_to_ga_introduction), this week we're exploring the modularization effort happening with Spring Boot 4.

When Spring Boot 1.0 was released in 2014, it shipped with a single `spring-boot-autoconfigure` jar weighing in at 182 KiB. Of course, that initial version didn't support a great deal, but over the years, that has changed.

One of Spring's greatest strengths is the sheer number of technologies that it supports, but each new technology brings a cost. Each time we support something new, the autoconfigure jar grows. With Spring Boot 3.5, that single `spring-boot-autoconfigure` jar is now 2 MiB!

While disk space is cheap, most of the classes actually aren't interesting for you because they target a technology you may not have in your application. That means you'll get a lot of auto-complete suggestions for classes and configuration properties that are just unnecessary. This adds confusion and mental load, and we're going to change that with Spring Boot 4.

So, grab a mind-soothing tea and join us for the ride!

## [](#a-modular-spring-boot-4)A Modular Spring Boot 4

In Spring Boot 4, we are introducing a fundamental change in how auto-configurations are packaged, delivered, and consumed. Instead of a single, monolithic `spring-boot-autoconfigure` jar, we are now splitting functionality into small and more focused modules.

This change is motivated by maintainability, clarity, and a leaner runtime footprint. It has ripple effects in package structure, starters, and how end users migrate from Spring Boot 3 to Spring Boot 4. Every technology supported by Spring Boot now has its own starter, some of which are new in Spring Boot 4.

## [](#why-modularize-the-codebase)Why Modularize the Codebase?

Now, you may ask yourself: why do this? Why touch almost everything in the codebase and split it up? In fact, this has been a very challenging piece of work, and one that we started before Spring Boot 3.5 was even released. The benefits, however, are quite compelling:

**Maintainability and architectural clarity**: With smaller modules and enforced boundaries, the team and our contributors can reason about each domain more clearly. Module boundaries become contracts rather than soft conventions. Your IDE also offers a much more focused view of the world. No more code completion suggestions of classes you're never going to need, and only the configuration properties you're actually using show up in the IDE popups.

**Reduced artifact sizes and footprint**: Instead of shipping one large autoconfigure jar containing many features you might not use, your application only pulls in the relevant modules. This reduces classpath overhead, startup scan costs, and disk space.

**Stronger signals and avoidance of accidental auto-configuration**: Because modules are scoped, Spring Boot has a much stronger signal about the reason you've pulled in a dependency. Did you include the `spring-webflux` jar for server-side `@Controller` support, or because you want to use `WebClient`? With focused modules, we actually know. You'll never again need to call `SpringApplication.setWebApplicationType(WebApplicationType.NONE)` because there won't even be any web server auto-configuration on the classpath if you're only using `WebClient` through the new `spring-boot-webclient` module.

**New use-cases enabled**: We're already seeing modularization open up new use-cases, and we think there will be more in the future. For example, you may now use Micrometer metrics independently of Actuator. You may bring in just the module that publishes metrics without needing the full actuator dependency chain, which is difficult with Spring Boot 3.

## [](#test-support)Test Support

It turns out that `spring-boot-autoconfigure` is not the only jar that needed modularizing. Whilst not as large, the `spring-boot-test-autoconfigure` jar also needed to be split up. For example, the `@AutoConfigureDataJdbc` annotation is used for testing Spring Data JDBC, so it should be aligned with the `spring-boot-data-jdbc` module.

We didn't want to put test support code in the module itself, so instead we've created test-specific modules. For our example above, the annotation moved to a `spring-boot-data-jdbc-test` jar.

To help keep things simple, we've also made sure there's a test starter POM for every regular starter that we ship. For example, if your app depends on `spring-boot-starter-webmvc` then it should also have a test-scoped dependency on `spring-boot-starter-webmvc-test`.

## [](#how-to-migrate-to-spring-boot-4)How to Migrate to Spring Boot 4

The effort involved with migrating an application from Spring Boot 3 to 4 will vary depending on a number of factors. For most applications, we hope the process will be just a few updates to your `pom.xml` or `build.gradle` file and a few package import fixes.

Here's the process that most applications should follow:

### [](#1-refine-your-main-starter-dependencies)1\. Refine Your Main Starter Dependencies

All existing starters now pull in their related modules transitively. This means that if you're already using starters, your application will have most of the modules that it needs. One thing you might need to do is add starters for technologies that previously didn't have one. Here's a typical Spring Boot 3 web application Maven POM:

```xml
Copy<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
  <groupId>org.flywaydb</groupId>
  <artifactId>flyway-core</artifactId>
</dependency>
```

In Spring Boot 3, Flyway would be auto-configured when the Flyway jar was present. With Spring Boot 4, you'll now need to include the Flyway starter to make sure you have the `spring-boot-flyway` module. We've also taken the opportunity to rename a few starters to make them more consistent. Here, the `web` starter is now named `webmvc`:

```xml
Copy<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-webmvc</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-flyway</artifactId>
</dependency>
```

You can find the list of starters for every technology in [the migration guide](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-4.0-Migration-Guide#starters).

### [](#2-use-the-new-test-starters)2\. Use the New Test Starters

Each of the main starters that you use has a corresponding test starter that you'll also want to add. Doing so ensures you get the correct testing support. Make sure that you add the test starters to the `test` scope. For our example application above, we'd use the following test starters:

```xml
Copy<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-webmvc-test</artifactId>
  <scope>test</scope>
</dependency>
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-security-test</artifactId>
  <scope>test</scope>
</dependency>
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-flyway-test</artifactId>
  <scope>test</scope>
</dependency>
```

This will include everything you need to test web components, controllers, mock MVC, security, and Flyway.

### [](#3-adjust-manual-or-custom-configuration)3\. Adjust Manual or Custom Configuration

If your project or any custom starter previously depended on `spring-boot-autoconfigure` or pulled in auto-configuration classes manually, you will need to replace those imports/dependencies with the new modular equivalents.

You'll also need to update package names if you reference Spring Boot's packages. Because modules now begin with `org.springframework.boot.<module>`, imports of auto-configuration support classes may need to change. The same also applies to customizers, for example.

### [](#4-review-custom-starters-and-shared-libraries)4\. Review Custom Starters and Shared Libraries

If your organization maintains custom Spring Boot starters or shared dependencies, you should reevaluate them in light of modularization. We strongly discourage supporting both Spring Boot 3 and 4 within the same artifact, due to refactorings in package names and modules.

## [](#classic-modules)Classic Modules

To ease the transition, Spring Boot 4 retains Classic Starter POMs. These "classic starters" bundle all the (modular) auto-configuration modules without their transitive dependencies. In effect, the classic starters act as a helpful tool if you have problems upgrading. You can adopt classic starters to "get up and running", fix any package imports, and then, over time, migrate to more selective module dependencies. To use the classic starters, your dependencies would look something like this:

```xml
Copy<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-classic</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-test-classic</artifactId>
  <scope>test</scope>
</dependency>
```

## [](#conclusion)Conclusion

Spring Boot 4's modularization of auto-configurations is a deliberate architectural step toward a more maintainable, composable, and lean framework. By splitting functionality into focused modules, introducing classic starters, and providing test-starters, Spring Boot gives you the tools for an incremental upgrade path. While there is some migration overhead (especially for custom or deeply coupled code), the benefits in clarity, footprint, and runtime behavior make it a worthwhile investment.

If you're planning a migration, try to use just the modules you need to create a lighter and more expressive application. If you need more time to complete your migration, use the classic starters and adopt modularization when it fits your schedule.

As always, we welcome any feedback that you might have. If you find bugs, please report them on our [GitHub issue tracker](https://github.com/spring-projects/spring-boot/issues). Thank you to everyone who has been following the milestones and release candidates and has already done so.