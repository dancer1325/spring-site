---
title: Spring Cloud Open Service Broker 3.1.0.M1 Released
source: https://spring.io/blog/2019/07/01/spring-cloud-open-service-broker-3-1-0-m1-released
scraped: 2026-02-23T14:42:47.270Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Roy Clarkson |  July 01, 2019 | 0 Comments
---

# Spring Cloud Open Service Broker 3.1.0.M1 Released

_Releases | Roy Clarkson |  July 01, 2019 | 0 Comments_

We are pleased to announce the 3.1.0.M1 release of Spring Cloud Open Service Broker. We are planning to include support for the recently released [Open Service Broker API v2.15](https://www.openservicebrokerapi.org/blog/2019/06/21/announcing-open-service-broker-api-v2-15) within 3.1.0. This release includes all of the latest fixes and improvements from [3.0.3.RELEASE](https://github.com/spring-cloud/spring-cloud-open-service-broker/releases/tag/v3.0.3.RELEASE), as well as the following [enhancements](https://github.com/spring-cloud/spring-cloud-open-service-broker/issues?q=is%3Aclosed+milestone%3A3.1.0.M1):

-   Improve support for service metadata in configuration properties
-   Add support for configuring Base64 `metadata.imageUrl` data from a class path image file
-   Improve configuration of event hooks via additional bean and auto-configuration support

Include the following Spring Boot starter:

```
Copy<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-open-service-broker</artifactId>
  <version>3.1.0.M1</version>
</dependency>
```

Use the Spring Milestone Repository:

```
Copy<repository>
  <id>spring-milestones</id>
  <url>https://repo.spring.io/milestone</url>
</repository>
```

Spring Cloud Open Service Broker is a framework for building Spring Boot applications that implement the Open Service Broker API. The [Open Service Broker API](https://www.openservicebrokerapi.org) project allows developers to deliver services to applications running within cloud native platforms such as Cloud Foundry, Kubernetes, and OpenShift.

[Project Page](https://spring.io/projects/spring-cloud-open-service-broker) | [GitHub](https://github.com/spring-cloud/spring-cloud-open-service-broker) | [Reference Doc](https://docs.spring.io/spring-cloud-open-service-broker/docs/3.1.0.M1/reference/html5) | [API Doc](https://docs.spring.io/spring-cloud-open-service-broker/docs/3.1.0.M1/apidocs/)