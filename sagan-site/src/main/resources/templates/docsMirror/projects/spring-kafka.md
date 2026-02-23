---
title: Spring for Apache Kafka
source: https://spring.io/projects/spring-kafka
scraped: 2026-02-19T07:51:48.405Z
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

# ![Spring for Apache Kafka](/img/projects/spring-kafka.svg?v=2)Spring for Apache Kafka4.0.3[](http://github.com/spring-projects/spring-kafka "Github")[](https://stackoverflow.com/questions/tagged/spring-kafka "Stack Overflow")

-   [Overview](#overview)
-   [Learn](#learn)
-   [Support](#support)
-   [Samples](#samples)

The Spring for Apache Kafka (spring-kafka) project applies core Spring concepts to the development of Kafka-based messaging solutions. It provides a "template" as a high-level abstraction for sending messages. It also provides support for Message-driven POJOs with `@KafkaListener` annotations and a "listener container". These libraries promote the use of dependency injection and declarative. In all of these cases, you will see similarities to the JMS support in the Spring Framework and RabbitMQ support in Spring AMQP.

## [](#features)[](#features)Features

-   `KafkaTemplate`
    
-   `KafkaMessageListenerContainer`
    
-   `@KafkaListener`
    
-   `KafkaTransactionManager`
    
-   `Retryable Topics`
    
-   `spring-kafka-test` jar with embedded kafka server
    

## [](#kafka-client-and-spring-boot-compatibility)[](#kafka-client-compatibility)Kafka Client and Spring Boot Compatibility

Use the support tab above for information about supported versions.

Spring for Apache Kafka is based on the pure java `kafka-clients` jar. The following is the compatibility matrix:

Spring for Apache Kafka Version

Spring Integration for Apache Kafka Version

`kafka-clients`

Spring Boot

3.3.x

6.4.x

3.8.0 to 3.9.0

3.4.x

3.2.x

6.3.x

3.7.0

3.3.x

3.1.x

6.2.x

3.6.0

3.2.x

3.0.x

6.0.x/6.1.x

3.3.2 to 3.6.0

3.0.x/3.1.x

**IMPORTANT:** This matrix is client compatibility; for a complete discussion about client/broker compatibility, see the Kafka [Compatibility Matrix](https://cwiki.apache.org/confluence/display/KAFKA/Compatibility+Matrix)

To override Apache Kafka client versions, see [Override Spring Boot Dependencies](https://docs.spring.io/spring-kafka/reference/appendix/override-boot-dependencies.html).

[Spring Boot Supported Versions](https://spring.io/projects/spring-boot#support).

## Spring Boot Config

[Spring Boot Support for Spring for Apache Kafka](https://docs.spring.io/spring-boot/docs/current/reference/html/messaging.html#messaging.kafka)

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