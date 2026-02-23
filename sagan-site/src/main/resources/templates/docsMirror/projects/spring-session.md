---
title: Spring Session
source: https://spring.io/projects/spring-session
scraped: 2026-02-19T07:50:17.526Z
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
    -   [Spring Session MongoDB](/projects/spring-session-mongodb)
    -   [Spring Session for Apache Geode](/projects/spring-session-data-geode)
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

# ![Spring Session](/img/projects/logo-session.png)Spring Session4.0.2[](https://github.com/spring-projects/spring-session "Github")[](https://stackoverflow.com/questions/tagged/spring-session "Stack Overflow")

-   [Overview](#overview)
-   [Learn](#learn)
-   [Support](#support)
-   [Samples](#samples)

Spring Session provides an API and implementations for managing a user’s session information.

## [](#features)[](#features)Features

Spring Session makes it trivial to support clustered sessions without being tied to an application container specific solution. It also provides transparent integration with:

-   `HttpSession` - allows replacing the HttpSession in an application container (i.e. Tomcat) neutral way, with support for providing session IDs in headers to work with RESTful APIs
    
-   `WebSocket` - provides the ability to keep the HttpSession alive when receiving WebSocket messages
    
-   `WebSession` - allows replacing the Spring WebFlux’s WebSession in an application container neutral way
    

## [](#modules)[](#modules)Modules

Spring Session consists of the following modules:

-   Spring Session Core - provides core Spring Session functionalities and APIs
    
-   Spring Session Data Redis - provides SessionRepository and ReactiveSessionRepository implementation backed by Redis and configuration support
    
-   Spring Session JDBC - provides SessionRepository implementation backed by a relational database and configuration support
    

## [](#feedback)[](#feedback)Feedback

You can use the [GitHub issue tracker](https://github.com/spring-projects/spring-session/issues) to report bugs or enhancements in Spring Session.

If you have a general usage question, please ask on [Stack Overflow](https://stackoverflow.com/) using the [spring-session](https://stackoverflow.com/tags/spring-session) tag.

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