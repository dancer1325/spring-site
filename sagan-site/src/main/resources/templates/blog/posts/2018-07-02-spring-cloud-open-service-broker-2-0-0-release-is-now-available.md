---
title: Spring Cloud Open Service Broker 2.0.0.RELEASE is now available
source: https://spring.io/blog/2018/07/02/spring-cloud-open-service-broker-2-0-0-release-is-now-available
scraped: 2026-02-23T15:20:09.269Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Roy Clarkson |  July 02, 2018 | 0 Comments
---

# Spring Cloud Open Service Broker 2.0.0.RELEASE is now available

_Releases | Roy Clarkson |  July 02, 2018 | 0 Comments_

We’re pleased to announce that the 2.0.0 release of [Spring Cloud Open Service Broker](https://spring.io/projects/spring-cloud-open-service-broker) is now generally available. Spring Cloud Open Service Broker is a framework for building Spring Boot applications that implement the Open Service Broker API.

The [Open Service Broker API](https://www.openservicebrokerapi.org) project allows developers to deliver services to applications running within cloud native platforms such as Cloud Foundry, Kubernetes, and OpenShift. Spring Cloud Open Service Broker provides a framework based on Spring Boot that enables you to quickly create a service broker for your own managed service on platform that support the Open Service Broker API.

The version 2.0 release represents a major architecture change of the project. Here are some of the highlights:

-   Requires Java 8, Spring Framework 5, and Spring Boot 2
    
-   Supports inclusion in a Spring MVC based application
    
-   Provides improved Spring Boot auto-configuration over version 1.0
    
-   Incorporates the builder pattern for model objects
    
-   Adds support for externalized configuration of the Catalog in YAML or Java properties
    
-   Improves exception handling and logging
    

The recommended way to get started using Spring Cloud Open Service Broker in your project is with a dependency management system. One of the snippets below can be copied and pasted into your build.

With Maven:

org.springframework.cloud spring-cloud-starter-open-service-broker-webmvc 2.0.0.RELEASE

With Gradle:

dependencies { compile 'org.springframework.cloud:spring-cloud-starter-open-service-broker-webmvc:2.0.0.RELEASE' }

Looking toward the future, we have already begun work on 3.0. The next major release will focus on full reactive support through the utilization of project Reactor. This will also facilitate the support of Spring WebFlux in addition to the current Spring MVC support. You may expect the first milestone of the 3.0 line this Summer. We’re also considering the inclusion of an Open Service Broker client library. Your feedback is always appreciated. Stay tuned for more updates!