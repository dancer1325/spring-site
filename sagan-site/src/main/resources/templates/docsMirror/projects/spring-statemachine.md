---
title: Spring Statemachine
source: https://spring.io/projects/spring-statemachine
scraped: 2026-02-19T07:52:30.625Z
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

# ![Spring Statemachine](/img/projects/spring-statemachine.svg)Spring Statemachine4.0.1[](http://github.com/spring-projects/spring-statemachine "Github")[](https://stackoverflow.com/questions/tagged/spring-statemachine "Stack Overflow")

-   [Overview](#overview)
-   [Learn](#learn)
-   [Support](#support)

Spring Statemachine is a framework for application developers to use state machine concepts with Spring applications.

Spring Statemachine aims to provide following features:

-   Easy to use flat one level state machine for simple use cases.
    
-   Hierarchical state machine structure to ease complex state configuration.
    
-   State machine regions to provide even more complex state configurations.
    
-   Usage of triggers, transitions, guards and actions.
    
-   Type safe configuration adapter.
    
-   Builder pattern for easy instantiation for use outside of Spring Application context
    
-   Recipes for usual use cases
    
-   Distributed state machine based on a Zookeeper
    
-   State machine event listeners.
    
-   UML Eclipse Papyrus modeling.
    
-   Store machine config in a persistent storage.
    
-   Spring IOC integration to associate beans with a state machine.
    

State machines are powerful because behaviour is always guaranteed to be consistent, making it relatively easy to debug. This is because operational rules are written in stone when the machine is started. The idea is that your application may exist in a finite number of states and certain predefined triggers can take your application from one state to the next. Such triggers can be based on either events or timers.

It is much easier to define high level logic outside of your application and then rely on the state machine to manage state. You can interact with the state machine by sending an event, listening for changes or simply request a current state.

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