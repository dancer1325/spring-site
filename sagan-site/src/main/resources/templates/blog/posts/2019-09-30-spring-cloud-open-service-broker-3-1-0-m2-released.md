---
title: Spring Cloud Open Service Broker 3.1.0.M2 Released
source: https://spring.io/blog/2019/09/30/spring-cloud-open-service-broker-3-1-0-m2-released
scraped: 2026-02-23T14:35:26.486Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Roy Clarkson |  September 30, 2019 | 0 Comments
---

# Spring Cloud Open Service Broker 3.1.0.M2 Released

_Releases | Roy Clarkson |  September 30, 2019 | 0 Comments_

We are pleased to announce the 3.1.0.M2 release of Spring Cloud Open Service Broker, which includes some initial support for [Open Service Broker API v2.15](https://www.openservicebrokerapi.org/blog/2019/06/21/announcing-open-service-broker-api-v2-15). Thanks to the community for their significant contributions! This release includes the following [fixes and enhancements](https://github.com/spring-cloud/spring-cloud-open-service-broker/issues?q=is%3Aclosed+milestone%3A3.1.0.M2):

-   Upgrade to Spring Boot 2.1.8.RELEASE
-   Add `maintenance_info` field to Service Plan object
-   Add `maximum_polling_duration` field to Service Plan object
-   Add `plan_updateable` field to Service Plan object
-   Return HTTP 400 when the required `service_id` and/or `plan_id` are missing or incorrect
-   Return HTTP 202 when a service broker operation is in progress and an identical request is sent before the previous request completes
-   Return JSON arrays instead of JSON objects for certain Service definition metadata
-   Add support for custom base path of service broker controllers

Include the following Spring Boot starter:

```
Copy<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-open-service-broker</artifactId>
  <version>3.1.0.M2</version>
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

[Project Page](https://spring.io/projects/spring-cloud-open-service-broker) | [GitHub](https://github.com/spring-cloud/spring-cloud-open-service-broker) | [Reference Doc](https://docs.spring.io/spring-cloud-open-service-broker/docs/3.1.0.M2/reference/html5) | [API Doc](https://docs.spring.io/spring-cloud-open-service-broker/docs/3.1.0.M2/apidocs/)