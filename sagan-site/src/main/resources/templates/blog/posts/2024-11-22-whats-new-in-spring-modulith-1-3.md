---
title: What\'s new in Spring Modulith 1.3?
source: https://spring.io/blog/2024/11/22/whats-new-in-spring-modulith-1-3
scraped: 2026-02-23T08:04:33.766Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oliver Drotbohm |  November 22, 2024 | 2 Comments
---

# What's new in Spring Modulith 1.3?

_Engineering | Oliver Drotbohm |  November 22, 2024 | 2 Comments_

After half a year of development, Spring Modulith 1.3 GA [has been released](http://spring.io/blog/2024/11/22/spring-modulith-1-3-ga-released). It is packed with new features, improvements, and – best of all – community contributions. Let me walk you through some of the most interesting ones.

## [](#baseline-upgrades)Baseline Upgrades

As usual, a new minor version of Spring Modulith upgrades to the latest releases of both Spring Boot and Spring Framework, [3.4](https://spring.io/blog/2024/11/21/spring-boot-3-4-0-available-now) and [6.2](https://spring.io/blog/2024/11/14/spring-framework-6-2-0-available-now) respectively. That said, we still remain compatible with the previous generations of each of them so that you can selectively upgrade to Spring Modulith 1.3 without having to the latest Boot and Framework versions.

## [](#the-application-module-model)The Application Module Model

### [](#nested-application-modules)Nested Application Modules

Spring Modulith's core abstractions have been significantly revamped internally to enable support for some cool new features. An application module can now contain nested ones that are hidden from other, sibling-level modules. This adds another level of means to structure your applications. Nested application modules are declared by using Spring Modulith's `@ApplicationModule` (or jMolecules' `@Module`) on packages nested inside the base packages of modules discovered by the defined detection strategy.

```
Copy🍃 Example
└─ 🖿 src/main/java
   |
   ├─ 📦 example
   |  └─ 🟢 Application.java
   |
   |  -> Inventory
   |
   ├─ 📦 example.inventory
   |  ├─ 🟢 InventoryManagement.java
   |  └─ 🔴 SomethingInventoryInternal.java
   ├─ 📦 example.inventory.internal
   |  └─ 🔴 SomethingInventoryInternal.java
   |
   |  -> Inventory > Nested
   |
   ├─ 📦 example.inventory.nested
   |  ├─ ☕ package-info.java // @ApplicationModule
   |  └─ 🟠 NestedApi.java
   ├─ 📦 example.inventory.nested.internal
   |  └─ 🔴 NestedInternal.java
   |
   |  -> Order
   |
   └─ 📦 example.order
      ├─ 🟢 OrderManagement.java
      └─ 🔴 SomethingOrderInternal.java
```

In this example, `inventory` is an application module as described [in the reference documentation](https://docs.spring.io/spring-modulith/reference/fundamentals.html#modules.simple). The `@ApplicationModule` annotation on the `nested` package caused that to become a nested application module in turn. In that arrangement, the following access rules apply:

-   The code in *Nested* is only available from *Inventory* or any types exposed by sibling application modules nested inside *Inventory*.
-   Any code in the *Nested* module can access code in parent modules, even internal. I.e., both `NestedApi` and `NestedInternal` can access `inventory.internal.SomethingInventoryInternal`.
-   Code from nested modules can also access exposed types by top-level application modules.

Any code in `nested` (or any sub-packages) can access `OrderManagement`.

### [](#external-application-modules)External Application Modules

Spring Modulith's default application module detection strategy assumes all application modules living in the same package namespace. Until now, adding other packages to the arrangement had only been possible by knowing the packages to include in advance and configuring them in `@Modulithic(additionalPackages = "…"`. With version 1.3, we introduce an SPI `ApplicationModuleSourceFactory` that can be registered via `META-INF/spring.factories` and used to declare root packages to scan, explicit application module base packages and optionally customize the application module detection strategy to be used for the declared root package.

```java
Copypackage example;

public class CustomApplicationModuleSourceFactory implements ApplicationModuleSourceFactory {

  @Override
  public List<String> getRootPackages() {
    return List.of("com.acme.toscan");
  }

  @Override
  public ApplicationModuleDetectionStrategy getApplicationModuleDetectionStrategy() {
    return ApplicationModuleDetectionStrategy.explicitlyAnnotated();
  }

  @Override
  public List<String> getModuleBasePackages() {
    return List.of("com.acme.module");
  }
}
```

The above example would use `com.acme.toscan` to detect explicitly declared modules within that and also create an application module from `com.acme.module`. The package names returned from these will subsequently be translated into `ApplicationModuleSource`s via the corresponding `getApplicationModuleSource(…)` flavors exposed in `ApplicationModuleDetectionStrategy`.

## [](#integration-testing)Integration Testing

Optimizing the execution of integration test has always been a core feature of Spring Modulith. Application modules can be bootstrapped individually or in varying degrees of collaboration using the `@ApplicationModuleTest` annotation.

In 1.3, we extend that support with a JUnit Jupiter extension, that will analyze the changes made to your application and, for a test run, only select the integration tests for execution that really need to be executed. By default, we consider uncommitted changes and commits on top of your current branch's tracking branch. To optimize test execution on CI systems, the extension can be given a commit hash -- usually the one from the latest successfully built commit -- to act as reference to calculate the changed files to consider.

![Some console output showing tests being skipped that would test functionality not affected by the current changes made to the repository](https://static.spring.io/blog/odrotbohm/241122/junit-selective-execution.png)

As you can see, the tests that are not affected by the changes made to the project are skipped. Big thanks to [Lukas Dohmen](https://github.com/lukasdo) and [David Bilge](https://github.com/davidbilge) who contributed this feature.

Another minor, but useful, addition in the area of integration testing support is that `@ApplicationModuleTest` now supports defining the module to be executed explicitly via its newly introduced `module` attribute. This allows integration tests to be located outside the application module's package space and was also contributed by Lukas.

## [](#event-publication-registry)Event Publication Registry

### [](#application-event-publication-modes)Application Event Publication Modes

Spring Modulith 1.3 ships a ton of new features in its event publication support. First and foremost, we ship two new completion modes configurable via the `spring.modulith.events.completion-mode` property. The first new completion mode (`delete`) deletes publications right away instead of setting the completion date. This means the number of entries in the registry stays small, and thus imposes less of a performance overhead in systems with a significant number of events being published.

Deleting publications on completion right away comes with the drawback of not being able to access them, for example for statistical purposes. That is why we also added an archiving (`archive`) mode that maintains a dedicated publication archive that the completed publications will be moved to. This yields the same performance improvements on event publication but retains completed publications separately.

### [](#completing-event-publications-by-identifier)Completing Event Publications by Identifier

Until now, event publications have been completed by decorating the transactional application listeners. That means the completing code only had access to the raw application event consumed and the identifier of the listener, and not the identifier of the individual publication.

In Spring Modulith 1.3, the Event Publication Registry keeps track of the currently in progress event publications and thus allows us to issue publication completions referring to the publication's identifier. This allows the individual backing store implementations to significantly improve the performance of the completion operation, as indexes can be used more effectively.

### [](#more-databases-and-schema-support-for-relational-databases)More Databases and Schema Support for Relational Databases

The relational database backend of the Event Publication Registry now supports three additional databases, namely MariaDB, Oracle DB and Microsoft SQL Server. Also, a schema to be used for both the DDL execution and general operation can be defined for databases that support schemas.

Finally, the `spring.modulith.republish-outstanding-events-on-restart` has been deprecated in favor of the newly introduced `spring.modulith.events.republish-outstanding-events-on-restart` for consistency reasons.

### [](#event-externalization)Event externalization

Spring Modulith's support to easily externalize application events into other systems ships with quite a few new features as well. Messages sent out can now get headers associated with them. To achieve that, `EventExternalizingConfiguration` now exposes [various `headers(…)` methods](https://docs.spring.io/spring-modulith/reference/events.html#externalization.api) that allow registering custom extractors for events in general or per event type specifically.

```java
Copy@Configuration
class MyConfiguration {

  @Bean
  EventExternalizingConfiguration config(SomeBean bean) {

    return EventExternalizingConfiguration.defaults(…)
        .headers(event -> Map.of("signature", bean.signMessage(event)))
        .build();
  }
}
```

To dynamically calculate the routing target for externalized events, `@Externalized` now supports SpEL expressions to define those, in addition to the previously already supported dynamic routing keys.

Our good friend [Josh Long](https://github.com/joshlong) contributed a new externalizing adapter to write events into Spring's `MessageChannel` abstraction. That interface is implemented by Spring Integration's message channels so that you can now seamlessly feed application events into those if needed.

The support for event externalization into Amazon SQS and SNS has been moved into the current releases of Spring Cloud for AWS (thanks [Maciej Walkowiak](https://github.com/maciejwalkowiak) for that). As a consequence, we formally deprecate our own implementations in favor of theirs, which are copies of the Spring Modulith native implementations and should be a drop-in replacement. We plan to remove our artifacts with the 2.0 release coming up next year.

## [](#documentation-support)Documentation Support

Our documentation support ships with a few interesting features as well. For one, thanks to Cora Iberkleid, the default documentation generation process produces an aggregating document containing all individual artifacts created, for convenient preview. That document will be generated whenever you use one of the `writeDocumentation(…)` flavors of `Documenter`. Alternatively, call `writeAggregatingDocument(…)` explicitly after you have triggered the generation of individual diagrams and Application Module Canvases selectively.

The Canvases conveniently lay out all the pieces of code of an application module that constitutes its surface. We have always provided the option for that Canvas to include Javadoc present on the types and methods (for event listeners) through the integration of third-party libraries and a pretty involved build setup. With 1.3, we now ship an annotation processor (in `spring-modulith-apt`) that automatically extracts the Javadoc of your codebase into a reusable JSON document and the Canvas generation has been updated to transparently use that if present. It is now automatically included by the `spring-modulith-starter-core`.

## [](#third-party-integration)Third-party integration

Finally, for convenience, we now trigger the [ArchUnit-based](https://github.com/xmolecules/jmolecules-integrations/tree/main/jmolecules-archunit) architectural verifications, such as the ones for [Hexagonal-, Onion- or Layered Architecture](https://github.com/xmolecules/jmolecules?tab=readme-ov-file#use-case-expressing-architectural-concepts), provided by jMolecules automatically if present on the classpath.