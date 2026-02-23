---
title: Spring Modulith
source: https://spring.io/projects/spring-modulith
scraped: 2026-02-19T07:50:53.114Z
description: Level up your Java code and explore what Spring can do for you.
---

[All projects](/projects)

-   [Spring Boot](/projects/spring-boot)
-   [Spring Framework](/projects/spring-framework)
-   [Spring Data](/projects/spring-data)
-   [Spring Cloud](/projects/spring-cloud)
-   [Spring Cloud Data Flow](/projects/spring-cloud-dataflow)
-   [Spring gRPC](/projects/spring-grpc)
-   [Spring Security](/projects/spring-security)
-   [Spring Authorization Server](/projects/spring-authorization-server)
-   [Spring for GraphQL](/projects/spring-graphql)
-   [Spring Session](/projects/spring-session)
-   [Spring Integration](/projects/spring-integration)
-   [Spring HATEOAS](/projects/spring-hateoas)
-   [Spring Modulith](/projects/spring-modulith)
-   [Spring REST Docs](/projects/spring-restdocs)
-   [Spring AI](/projects/spring-ai)
-   [Spring Batch](/projects/spring-batch)
-   [Spring AMQP](/projects/spring-amqp)
-   [Spring CredHub](/projects/spring-credhub)
-   [Spring for Apache Kafka](/projects/spring-kafka)
-   [Spring LDAP](/projects/spring-ldap)
-   [Spring for Apache Pulsar](/projects/spring-pulsar)
-   [Spring Shell](/projects/spring-shell)
-   [Spring Statemachine](/projects/spring-statemachine)
-   [Spring Vault](/projects/spring-vault)
-   [Spring Web Flow](/projects/spring-webflow)
-   [Spring Web Services](/projects/spring-ws)

# ![Spring Modulith](/img/projects/spring-modulith.svg)Spring Modulith2.0.2[](https://github.com/spring-projects/spring-modulith "Github")[](https://stackoverflow.com/questions/tagged/spring-modulith "Stack Overflow")

-   [Overview](#overview)
-   [Learn](#learn)
-   [Samples](#samples)

Spring Modulith allows developers to build well-structured Spring Boot applications and guides developers in finding and working with [application modules](https://docs.spring.io/spring-modulith/reference/fundamentals.html#modules) driven by the domain. It supports the [verification](https://docs.spring.io/spring-modulith/reference/verification.html) of such modular arrangements, [integration testing](https://docs.spring.io/spring-modulith/reference/testing.html) individual modules, [observing](https://docs.spring.io/spring-modulith/reference/production-ready.html) the application’s behavior on the module level and creating [documentation snippets](https://docs.spring.io/spring-modulith/reference/documentation.html) based on the arrangement created.

## [](#quickstart)[](#quickstart)Quickstart

1.  Create a Spring Boot application on [https://start.spring.io](https://start.spring.io)
    
2.  Create a Java package arrangement that puts business modules as [direct sub-packages of the application’s main package](https://docs.spring.io/spring-modulith/reference/fundamentals.html).
    
    ```
    Copy□ Example
    └─ □ src/main/java
       ├─ □ example           <1>
       │  └─ Application.java
       ├─ □ example.inventory <2>
       │  └─ …
       └─ □ example.order     <2>
          └─ …
    ```
    
    1.  The application root package
        
    2.  Application module packages
        
3.  Create [an `ApplicationModules` model](hhttps://docs.spring.io/spring-modulith/reference/fundamentals.html#modules), run [verifications](https://docs.spring.io/spring-modulith/reference/verification.html) and [create documentation snippets](https://docs.spring.io/spring-modulith/reference/documentation.html).
    
    ```
    Copyclass ApplicationTests {
    
      @Test
      void writeDocumentationSnippets() {
    
        var modules = ApplicationModules.of(Application.class).verify(); (1)
    
        new Documenter(modules) (2)
          .writeModulesAsPlantUml()
          .writeIndividualModulesAsPlantUml();
      }
    }
    ```
    
    1.  Creates application module model and [verifies its structure](https://docs.spring.io/spring-modulith/reference/verification.html).
        
    2.  Renders [Asciidoctor snippets](https://docs.spring.io/spring-modulith/reference/documentation.html) (component diagrams, application module canvas) to `target/modulith-docs`.
        
4.  Run [integration tests](https://docs.spring.io/spring-modulith/reference/testing.html) for individual application modules.
    
    ```
    Copy□ Example
    └─ □ src/test/java
       └─ □ example.order
          └─ OrderModuleIntegrationTests.java
    
    @ApplicationModuleTests
    class OrderModuleIntegrationTests {
    
      @Test
      void someTestMethod() { … }
    }
    ```
    

![Spring Initializr](/img/logos/spring-initializr.svg)

## Quickstart Your Project

Bootstrap your application with [Spring Initializr](https://start.spring.io/).

![](/img/extra/footer.svg)

## Get ahead

VMware offers training and certification to turbo-charge your progress.

[Learn more](https://spring.academy/)

## Get support

Tanzu Spring offers support and binaries for OpenJDK™, Spring, and Apache Tomcat® in one simple subscription.

[Learn more](/support)

## Upcoming events

Check out all the upcoming events in the Spring community.

[View all](/events)