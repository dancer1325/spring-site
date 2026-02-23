---
title: Spring Web Flow
source: https://spring.io/projects/spring-webflow
scraped: 2026-02-19T07:52:41.734Z
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

# ![Spring Web Flow](/img/projects/spring-web-flo.svg?v=2)Spring Web Flow4.0.0[](http://github.com/spring-projects/spring-webflow "Github")[](https://stackoverflow.com/questions/tagged/spring-webflow,spring-webflow-2 "Stack Overflow")

-   [Overview](#overview)
-   [Learn](#learn)
-   [Support](#support)
-   [Samples](#samples)

Spring Web Flow builds on Spring MVC and allows implementing the "flows" of a web application. A flow encapsulates a sequence of steps that guide a user through the execution of some business task. It spans multiple HTTP requests, has state, deals with transactional data, is reusable, and may be dynamic and long-running in nature.

The sweet spot for Spring Web Flow are stateful web applications with controlled navigation such as checking in for a flight, applying for a loan, shopping cart checkout, or even adding a confirmation step to a form. What these scenarios have in common is one or more of the following traits:

-   There is a clear start and an end point.
    
-   The user must go through a set of screens in a specific order.
    
-   The changes are not finalized until the last step.
    
-   Once complete it shouldn’t be possible to repeat a transaction accidentally
    

Spring Web Flow provides a declarative flow definition language for authoring flows on a higher level of abstraction. It allows it to be integrated into a wide range of applications without any changes (to the flow programming model) including Spring MVC, JSF, and even Portlet web applications. The following are common issues observed in stateful web applications with navigation requirements:

-   Visualizing the flow is very difficult.
    
-   The application has a lot of code accessing the HTTP session.
    
-   Enforcing controlled navigation is important but not possible.
    
-   Proper browser back button support seems unattainable.
    
-   Browser and server get out of sync with "Back" button use.
    
-   Multiple browser tabs causes concurrency issues with HTTP session data.
    
-   Spring Web Flow provides a solution to the above issues.
    

## Spring Boot Config

To use Spring Web Flow, add the following dependency to your application.

Maven

```
Copy<dependencies>
    <dependency>
        <groupId>org.springframework.webflow</groupId>
        <artifactId>spring-webflow</artifactId>
        <version>{version}</version>
    </dependency>
</dependencies>
```

Gradle

```
Copydependencies {
    compile 'org.springframework.webflow:spring-webflow:{version}'
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