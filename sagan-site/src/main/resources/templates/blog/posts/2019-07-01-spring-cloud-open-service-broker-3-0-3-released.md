---
title: Spring Cloud Open Service Broker 3.0.3 Released
source: https://spring.io/blog/2019/07/01/spring-cloud-open-service-broker-3-0-3-released
scraped: 2026-02-23T14:42:38.144Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Roy Clarkson |  July 01, 2019 | 0 Comments
---

# Spring Cloud Open Service Broker 3.0.3 Released

_Releases | Roy Clarkson |  July 01, 2019 | 0 Comments_

We are pleased to announce the 3.0.3 release of Spring Cloud Open Service Broker. This release includes the following [updates](https://github.com/spring-cloud/spring-cloud-open-service-broker/issues?q=is%3Aclosed+milestone%3A3.0.3.RELEASE):

-   Upgrade to Spring Boot 2.1.6.RELEASE
-   Fix issue with Servlet API and Reactor transitive dependencies
-   Return 404 when attempting to request a service instance binding for a service instance that does not exist

Include the following Spring Boot starter:

```
Copy<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-open-service-broker</artifactId>
  <version>3.0.3.RELEASE</version>
</dependency>
```

Spring Cloud Open Service Broker is a framework for building Spring Boot applications that implement the Open Service Broker API. The [Open Service Broker API](https://www.openservicebrokerapi.org) project allows developers to deliver services to applications running within cloud native platforms such as Cloud Foundry, Kubernetes, and OpenShift.

[Project Page](https://spring.io/projects/spring-cloud-open-service-broker) | [GitHub](https://github.com/spring-cloud/spring-cloud-open-service-broker) | [Reference Doc](https://docs.spring.io/spring-cloud-open-service-broker/docs/3.0.3.RELEASE/reference/html5) | [API Doc](https://docs.spring.io/spring-cloud-open-service-broker/docs/3.0.3.RELEASE/apidocs/)