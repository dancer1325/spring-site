---
title: Spring Cloud
source: https://spring.io/projects/spring-cloud
scraped: 2026-02-19T07:49:24.548Z
description: Level up your Java code and explore what Spring can do for you.
---

[All projects](/projects)

-   [Spring Boot](/projects/spring-boot)
-   [Spring Framework](/projects/spring-framework)
-   [Spring Data](/projects/spring-data)
-   [Spring Cloud](/projects/spring-cloud)
    -   [Spring Cloud Azure](/projects/spring-cloud-azure)
    -   [Spring Cloud Alibaba](/projects/spring-cloud-alibaba)
    -   [Spring Cloud for Amazon Web Services](/projects/spring-cloud-aws)
    -   [Spring Cloud Bus](/projects/spring-cloud-bus)
    -   [Spring Cloud Circuit Breaker](/projects/spring-cloud-circuitbreaker)
    -   [Spring Cloud CLI](/projects/spring-cloud-cli)
    -   [Spring Cloud Commons](/projects/spring-cloud-commons)
    -   [Spring Cloud Config](/projects/spring-cloud-config)
    -   [Spring Cloud Consul](/projects/spring-cloud-consul)
    -   [Spring Cloud Contract](/projects/spring-cloud-contract)
    -   [Spring Cloud Function](/projects/spring-cloud-function)
    -   [Spring Cloud Gateway](/projects/spring-cloud-gateway)
    -   [Spring Cloud GCP](/projects/spring-cloud-gcp)
    -   [Spring Cloud Kubernetes](/projects/spring-cloud-kubernetes)
    -   [Spring Cloud Netflix](/projects/spring-cloud-netflix)
    -   [Spring Cloud Open Service Broker](/projects/spring-cloud-open-service-broker)
    -   [Spring Cloud OpenFeign](/projects/spring-cloud-openfeign)
    -   [Spring Cloud Sleuth](/projects/spring-cloud-sleuth)
    -   [Spring Cloud Stream](/projects/spring-cloud-stream)
    -   [Spring Cloud Stream Applications](/projects/spring-cloud-stream-applications)
    -   [Spring Cloud Task](/projects/spring-cloud-task)
    -   [Spring Cloud Vault](/projects/spring-cloud-vault)
    -   [Spring Cloud Zookeeper](/projects/spring-cloud-zookeeper)
    -   [Spring Cloud App Broker](/projects/spring-cloud-app-broker)
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

# ![Spring Cloud](/img/projects/spring-cloud.svg)Spring Cloud2025.1.1[](http://github.com/spring-cloud "Github")[](https://stackoverflow.com/questions/tagged/spring-cloud "Stack Overflow")

-   [Overview](#overview)
-   [Learn](#learn)
-   [Support](#support)
-   [Samples](#samples)

Spring Cloud provides tools for developers to quickly build some of the common patterns in distributed systems (e.g. configuration management, service discovery, circuit breakers, intelligent routing, micro-proxy, control bus, short lived microservices and contract testing). Coordination of distributed systems leads to boiler plate patterns, and using Spring Cloud developers can quickly stand up services and applications that implement those patterns. They will work well in any distributed environment, including the developer’s own laptop, bare metal data centres, and managed platforms such as Cloud Foundry.

## [](#features)Features

Spring Cloud focuses on providing good out of box experience for typical use cases and extensibility mechanism to cover others.

-   Distributed/versioned configuration
    
-   Service registration and discovery
    
-   Routing
    
-   Service-to-service calls
    
-   Load balancing
    
-   Circuit Breakers
    
-   Distributed messaging
    
-   Short lived microservices (tasks)
    
-   Consumer-driven and producer-driven contract testing
    

## [](#talks-and-videos)Talks and videos

-   [Distributed Applications with Spring Cloud: Spring Office Hours](https://www.youtube.com/watch?v=C1ujgyu4NWA)
-   [Beginner’s Guide To Spring Cloud](https://www.youtube.com/watch?v=aO3W-lYnw-o)

## [](#getting-started)Getting Started

### [](#generating-a-new-spring-cloud-project)Generating A New Spring Cloud Project

The easiest way to get started is visit [start.spring.io](http://start.spring.io), select your Spring Boot version and the Spring Cloud projects you want to use. This will add the corresponding Spring Cloud BOM version to your Maven/Gradle file when you generate the project.

### [](#adding-spring-cloud-to-an-existing-spring-boot-application)Adding Spring Cloud To An Existing Spring Boot Application

If you an existing Spring Boot app you want to add Spring Cloud to that app, the first step is to determine the version of Spring Cloud you should use. The version you use in your app will depend on the version of Spring Boot you are using.

The table below outlines which version of Spring Cloud maps to which version of Spring Boot.

Table 1. Release train Spring Boot compatibility (see [here](https://github.com/spring-cloud/spring-cloud-release/wiki/Supported-Versions#supported-releases) for more detailed information).

Release Train

Spring Boot Generation

[2025.1.x](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2025.1-Release-Notes) aka Oakwood

4.0.x

[2025.0.x](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2025.0-Release-Notes) aka Northfields

3.5.x

[2024.0.x](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2024.0-Release-Notes) aka Moorgate

3.4.x

[2023.0.x](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2023.0-Release-Notes) aka Leyton

3.3.x, 3.2.x

[2022.0.x](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2022.0-Release-Notes) aka Kilburn

3.0.x, 3.1.x (Starting with 2022.0.3)

[2021.0.x](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2021.0-Release-Notes) aka Jubilee

2.6.x, 2.7.x (Starting with 2021.0.3)

[2020.0.x](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2020.0-Release-Notes) aka Ilford

2.4.x, 2.5.x (Starting with 2020.0.3)

[Hoxton](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-Hoxton-Release-Notes)

2.2.x, 2.3.x (Starting with SR5)

[Greenwich](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Greenwich-Release-Notes)

2.1.x

[Finchley](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Finchley-Release-Notes)

2.0.x

[Edgware](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Edgware-Release-Notes)

1.5.x

[Dalston](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Dalston-Release-Notes)

1.5.x

> Spring Cloud Dalston, Edgware, Finchley, Greenwich, 2020.0 (aka Ilford), 2021.0 (aka Jubilee), and 2022.0 (aka Kilburn) have all reached end of life status and are no longer supported.

Bug fixes and backwards compatible features are added to each release train via a service release (SR). Once you determine which version of Spring Cloud to use, you should use the latest service release for that release train. You can find the latest service release information on our [release notes page](https://github.com/spring-cloud/spring-cloud-release/wiki).

Now that you know which release train to use and the latest service release for that release train you are ready to add the Spring Cloud BOM to your application.

```xml
Copy<properties>
    <spring-cloud.version>2025.1.0</spring-cloud.version>
</properties>
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>${spring-cloud.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

```groovy
Copyplugins {
  id 'java'
  id 'org.springframework.boot' version '4.0.0'
  id 'io.spring.dependency-management' version '1.1.7'
}

repositories {
  mavenCentral()
}

ext {
  set('springCloudVersion', "2025.1.0")
}

dependencyManagement {
  imports {
    mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
  }
}

```

> It is recommended that you use release train BOM `spring-cloud-dependencies` This is a BOM-only version and it just contains dependency management and no plugin declarations or direct references to Spring or Spring Boot. You can Spring Boot parent POM, or use the BOM from Spring Boot (`spring-boot-dependencies`) to manage Spring Boot versions.

Just like Spring Boot, many Spring Cloud projects include starters that you can add as dependencies to add various cloud native features to your project. In many cases, many features are enabled purely by adding the starter to your classpath. The starter names are documented within the individual projects. Below is an example of how you would add a Spring Cloud Config Client and a Spring Cloud Netflix Eureka client to your application.

```
Copy<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-config</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
    </dependency>
    ...
</dependencies>
```

```
Copydependencies {
  implementation 'org.springframework.cloud:spring-cloud-starter-config'
  implementation 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
  //...
}
```

## [](#main-projects)Main Projects

### [](#spring-cloud-config)[](#spring-cloud-config)[Spring Cloud Config](https://spring.io/projects/spring-cloud-config)

Centralized external configuration management backed by a git repository. The configuration resources map directly to Spring `Environment` but could be used by non-Spring applications if desired.

### [](#spring-cloud-gateway)[](#spring-cloud-gateway)[Spring Cloud Gateway](https://spring.io/projects/spring-cloud-gateway)

Spring Cloud Gateway is an intelligent and programmable router based on Spring Framework and Spring Boot.

### [](#spring-cloud-netflix)[](#spring-cloud-netflix)[Spring Cloud Netflix](https://spring.io/projects/spring-cloud-netflix)

Integration with Eureka Services Discovery from Netflix OSS.

### [](#spring-cloud-consul)[](#spring-cloud-consul)[Spring Cloud Consul](https://spring.io/projects/spring-cloud-consul)

Service discovery and configuration management with Hashicorp Consul.

### [](#spring-cloud-kubernetes)[](#spring-cloud-kubernetes)[Spring Cloud Kubernetes](https://spring.io/projects/spring-cloud-kubernetes)

Kubernetes integration with Spring Cloud Discovery Client, Configuration, including Controllers for Discovery and Configuration.

### [](#spring-cloud-function)[](#spring-cloud-function)[Spring Cloud Function](http://github.com/spring-cloud/spring-cloud-function)

Spring Cloud Function promotes the implementation of business logic via functions. It supports a uniform programming model across serverless providers, as well as the ability to run standalone (locally or in a PaaS).

### [](#spring-cloud-stream)[](#spring-cloud-stream)[Spring Cloud Stream](https://spring.io/projects/spring-cloud-stream)

A lightweight event-driven microservices framework to quickly build applications that can connect to external systems. Simple declarative model to send and receive messages using Apache Kafka or RabbitMQ between Spring Boot apps.

### [](#spring-cloud-stream-applications)[](#spring-cloud-stream-applications)[Spring Cloud Stream Applications](https://spring.io/projects/spring-cloud-stream-applications)

Spring Cloud Stream Applications are out of the box Spring Boot applications providing integration with external middleware systems such as Apache Kafka, RabbitMQ etc. using the binder abstraction in Spring Cloud Stream.

### [](#spring-cloud-task)[](#spring-cloud-task)[Spring Cloud Task](https://spring.io/projects/spring-cloud-task)

A short-lived microservices framework to quickly build applications that perform finite amounts of data processing. Simple declarative for adding both functional and non-functional features to Spring Boot apps.

### [](#spring-cloud-task-app-starters)[](#spring-cloud-task-app-starters)[Spring Cloud Task App Starters](https://spring.io/projects/spring-cloud-task-app-starters)

Spring Cloud Task App Starters are Spring Boot applications that may be any process including Spring Batch jobs that do not run forever, and they end/stop after a finite period of data processing.

### [](#spring-cloud-zookeeper)[](#spring-cloud-zookeeper)[Spring Cloud Zookeeper](https://spring.io/projects/spring-cloud-zookeeper)

Service discovery and configuration management with Apache Zookeeper.

### [](#spring-cloud-contract)[](#spring-cloud-contract)[Spring Cloud Contract](https://spring.io/projects/spring-cloud-contract)

Spring Cloud Contract is an umbrella project holding solutions that help users in successfully implementing the Consumer Driven Contracts approach.

### [](#spring-cloud-openfeign)[](#spring-cloud-openfeign)[Spring Cloud OpenFeign](https://spring.io/projects/spring-cloud-openfeign)

Spring Cloud OpenFeign provides integrations for Spring Boot apps through autoconfiguration and binding to the Spring Environment and other Spring programming model idioms.

### [](#spring-cloud-bus)[](#spring-cloud-bus)[Spring Cloud Bus](https://spring.io/projects/spring-cloud-bus)

An event bus for linking services and service instances together with distributed messaging. Useful for propagating state changes across a cluster (e.g. config change events).

### [](#spring-cloud-open-service-broker)[](#spring-cloud-open-service-broker)[Spring Cloud Open Service Broker](https://spring.io/projects/spring-cloud-open-service-broker)

Provides a starting point for building a service broker that implements the Open Service Broker API.

## [](#release-trains)[](#release-trains)Release Trains

Spring Cloud is an umbrella project consisting of independent projects with, in principle, different release cadences. To manage the portfolio a BOM (Bill of Materials) is published with a curated set of dependencies on the individual project. Go [here](https://github.com/spring-cloud/spring-cloud-release/wiki/Release-Train-Naming-Convention) to read about the Release Train naming conventions.

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