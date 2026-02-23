---
title: Introducing Spring Modulith
source: https://spring.io/blog/2022/10/21/introducing-spring-modulith
scraped: 2026-02-23T10:29:58.531Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oliver Drotbohm |  October 21, 2022 | 34 Comments
---

# Introducing Spring Modulith

_Engineering | Oliver Drotbohm |  October 21, 2022 | 34 Comments_

When designing software systems, architects and developers have plenty of architectural options to choose from. Microservice-based systems have become ubiquitous in the last couple of years. However, the idea of monolithic, modular systems has also regained popularity recently. Independent of the architectural style ultimately selected, the individual applications comprising the overall system need their structure to be evolvable and able to follow changes in business requirements.

Traditionally, application frameworks have provided structural guidance by providing abstractions aligned with technical concepts, such as Spring Framework’s stereotype annotations (`@Controller`, `@Service`, `@Repository`, and so on). However, shifting the focus to [align code structure with the domain](https://dannorth.net/2022/02/10/cupid-for-joyful-coding/#domain-based) has proven to lead to better structured applications that are ultimately more understandable and maintainable. Until now, the Spring team has given verbal and written guidance on how we recommend structuring your Spring Boot applications. We decided that we can do more than that.

[*Spring Modulith*](https://spring.io/projects/spring-modulith) is a new, experimental Spring project that supports developers in expressing these logical application modules in code and in building well-structured, domain-aligned Spring Boot applications.

## [](#an-example)[](#example)An Example

Let us have a look at [a concrete example](https://github.com/spring-projects/spring-modulith/tree/main/spring-modulith-examples/spring-modulith-example-full). Assume we need to develop an e-commerce application, for which we start with two logical modules. An *order* module deals with order processing, and an *inventory* keeps track of the stock for the products we sell. Our primary focus for this post is the use case that the inventory needs to be updated once an order is completed. Our project structure would look something like this (`○` denotes a public type, `-` a private one):

```
Copy□ Example
└─ □ src/main/java
   ├─ □ example
   │  └─ ○ Application.java
   │
   ├─ □ example.inventory
   │  ├─ ○ InventoryManagement.java
   │  └─ - InventoryInternal.java
   │
   ├─ □ example.order
   │  └─ ○ OrderManagement.java
   └─ □ example.order.internal
      └─ ○ OrderInternal.java
```

This arrangement starts with the usual skeleton, a base package that contains the Spring Boot application class. Our two business modules are reflected by direct sub-packages: `inventory` and `order`. The inventory uses a rather simple arrangement. It consists of only a single package. Thus, we can use Java visibility modifiers to hide internal components from access by code residing in other modules, such as `InventoryInternal`, as the Java compiler restricts access to non-public types.

The `order` package, on the contrary, contains a sub-package that exposes a Spring bean which—​in our case—​needs to be public, because `OrderManagement` refers to it. This arrangement of types, unfortunately, rules out the compiler as a helper to prevent illegal access to `OrderInternal`, because, in plain Java, packages are not hierarchical. A sub-package is not hidden inside a parent one. Spring Modulith, however, establishes the notion of *application modules*, that—​by default—​consist of an API package (the ones directly located under the application’s main package—​in our case `inventory` and `order`) and, optionally, nested ones (`order.internal`). The latter are considered internal, and the code residing in those modules is inaccessible to other modules. This application module model can [be tweaked](https://docs.spring.io/spring-modulith/docs/0.1.0-M1/reference/html/#fundamentals.customizing-modules) to your liking, but let us stick with this default arrangement for this post.

## [](#verifying-the-modular-structure)[](#verification)Verifying the Modular Structure

To verify the application’s structure and that our code adheres to the structures we defined, we can create a test case that creates an `ApplicationModules` instance:

```
Copyclass ModularityTests {

  @Test
  void verifyModularity() {
    ApplicationModules.of(Application.class).verify();
  }
}
```

Assuming `InventoryManagement` introduced a dependency on `OrderInternal`, that test would fail with the following error message and, thus, break the build:

```
Copy\- Module 'inventory' depends on non-exposed type ….internal.OrderInternal within module 'order'!
InventoryManagement declares constructor InventoryManagement(InventoryInternal, OrderInternal) in (InventoryManagement.java:0)
```

The initial step (`ApplicationModules.of(…)`) inspects the application structure, applies the module conventions and analyzes which parts of each application module are part of their *provided interface*. As `OrderInternal` does not reside in the application module’s API package, the reference to it from the `inventory` module is considered invalid and, thus, is reported as such in the next step, the invocation of `….verify()`.

The verification as well as the underlying analysis of the application module model are implemented by using [ArchUnit](https://www.archunit.org/). It will reject cyclic dependencies between application modules, access to types considered internal (as per the definition above), and, optionally, allow only references to modules explicitly allow-listed by using `@ApplicationModule(allowedDependencies = …)` on the application modules `package-info.java`. For more information on how to define application module boundaries and allowed dependencies between them in the link, see the [reference documentation](https://docs.spring.io/spring-modulith/docs/0.1.0-M1/reference/html/#fundamentals.modules).

## [](#application-module-integration-tests)[](#integration-tests)Application Module Integration Tests

Being able to build a model of the application’s structure is also helpful for integration testing. Similar to Spring Boot’s slice test annotations, developers can indicate that they want to include only the components and configuration for a particular application module by using Spring Modulith’s `@ApplicationModuleTest` on an integration test. This helps to isolate integration tests against changes and the potential failures of tests located in other modules. An integration test class would look something like this:

```
Copypackage example.order;

@ApplicationModuleTest
class OrderIntegrationTests {

  // Test methods go here
}
```

Similar to a test case run with `@SpringBootTest`, `@ApplicationModuleTest` finds the application’s main class annotated with `@SpringBootApplication`. It then initializes the application module model, finds the module the test class is located in, and defaults to bootstrap exactly that module. If you run this class and have the log level for `org.springframework.modulith.test` raised to `DEBUG`, you will see output that looks like this:

```
Copy… - Bootstrapping @ApplicationModuleTest for example.order in mode STANDALONE (class example.Application)…
…
… - ## example.order ##
… - > Logical name: order
… - > Base package: example.order
… - > Direct module dependencies: none
… - > Spring beans:
… -   + ….OrderManagement
… -   + ….internal.OrderInternal
…
… - Re-configuring auto-configuration and entity scan packages to: example.order.
```

The test execution reports which module is bootstrapped, its logical structure, and how it ultimately alters the Spring Boot bootstrap to include only the module’s base package. It can be [tweaked](https://docs.spring.io/spring-modulith/docs/0.1.0-M1/reference/html/#testing.bootstrap-modes) to explicitly include other application modules, or bootstrap an entire tree of modules.

## [](#using-events-for-inter-module-interaction)[](#events)Using Events for Inter-module Interaction

Shifting the integration testing focus towards application modules usually reveals their outgoing dependencies, typically established by references to Spring beans residing in other modules. While those can be mocked (by using `@MockBean`) to satisfy the test execution, it is often a better idea to replace the cross-module bean dependencies with an application event being published and consuming that with the previously explicitly invoked component.

Our example is already arranged in this preferred way, as it publishes an `OrderCompleted` event during the call to `OrderManagement.complete(…)`. Spring Modulith’s `PublishedEvents` abstraction allows testing that an integration test case has caused particular application events to be published:

```
Copy@ApplicationModuleTest
@RequiredArgsConstructor
class OrderIntegrationTests {

  private final OrderManagement orders;

  @Test
  void publishesOrderCompletion(PublishedEvents events) {

    var reference = new Order();

    orders.complete(reference);

    // Find all OrderCompleted events referring to our reference order
    var matchingMapped = events.ofType(OrderCompleted.class)
        .matchingMapped(OrderCompleted::getOrderId, reference.getId()::equals);

    assertThat(matchingMapped).hasSize(1);
  }
}
```

## [](#a-tool-box-for-well-structured-spring-boot-applications)[](#summary)A Tool Box for Well-structured Spring Boot Applications

Spring Modulith provides convention and APIs to declare and verify logical modules in your Spring Boot application. On top of the features described above, the first release has many more features to help developers structuring their applications:

-   Support for more [advanced package arrangements](https://docs.spring.io/spring-modulith/docs/0.1.0-M1/reference/html/#fundamentals.modules.advanced).
    
-   Support to [flexibly select](https://docs.spring.io/spring-modulith/docs/0.1.0-M1/reference/html/#testing.bootstrap-modes) a set of application modules to include in an integration test run.
    
-   A [transaction event publication](https://docs.spring.io/spring-modulith/docs/0.1.0-M1/reference/html/#events.publication-registry) log to let developers integrate application modules through events in transactional contexts.
    
-   Deriving [developer documentation](https://docs.spring.io/spring-modulith/docs/0.1.0-M1/reference/html/#documentation) from the application module structure, including C4 and UML component diagrams as well as the Application Module Canvas (a tabular high-level description of each module).
    
-   Runtime [observability](https://docs.spring.io/spring-modulith/docs/0.1.0-M1/reference/html/#observability) on the application module level.
    
-   A [Passage of Time Events](https://docs.spring.io/spring-modulith/docs/0.1.0-M1/reference/html/#moments) implementation.
    

You can find more about the project in [its reference documentation](https://docs.spring.io/spring-modulith/docs/0.1.0-M1/reference/html/) and check out the [example project](https://github.com/spring-projects/spring-modulith/tree/main/spring-modulith-examples/spring-modulith-example-full). Despite the broad set of features already available, this is just the start of the journey. We look forward to your feedback and feature ideas for the project. Also, be sure to follow us [on Twitter](https://twitter.com/springmodulith) for the latest social media updates on the project.

## [](#about-moduliths)[](#about-moduliths)About Moduliths

Spring Modulith (no trailing "s") is the continuation of the [Moduliths (with trailing "s") project](https://github.com/moduliths/moduliths) but using Spring Boot 3.0, Framework 6, Java 17, and JakartaEE 9 as the baseline. The old Moduliths project is currently available in version 1.3, is compatible with Spring Boot 2.7, and will be maintained as long as the corresponding Boot generation. We have used the experience gained with it over the last two years, streamlined a few abstractions, tweaked a couple of defaults here and there, and decided to start with a more state-of-the-art baseline. For more detailed guidance on how to migrate to Spring Modulith, see the Spring Modulith [reference documentation](https://docs.spring.io/spring-modulith/docs/0.1.0-M1/reference/html/#appendix.migrating-from-moduliths).