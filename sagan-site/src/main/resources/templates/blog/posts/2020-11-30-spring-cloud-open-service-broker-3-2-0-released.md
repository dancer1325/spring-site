---
title: Spring Cloud Open Service Broker 3.2.0 Released
source: https://spring.io/blog/2020/11/30/spring-cloud-open-service-broker-3-2-0-released
scraped: 2026-02-23T13:40:07.988Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Roy Clarkson |  November 30, 2020 | 0 Comments
---

# Spring Cloud Open Service Broker 3.2.0 Released

_Releases | Roy Clarkson |  November 30, 2020 | 0 Comments_

We are pleased to announce the general availability of Spring Cloud Open Service Broker 3.2.0. Version 3.2.0 is upgraded to Spring Boot 2.3, and addresses a few issues related to OSB API v2.15 support. It is feature compatible with the 3.1.2 release, and includes the following:

-   Upgrade to Spring Boot 2.3.6.RELEASE (#310)
-   Return HTTP 400 Bad Request for unknown instance in last operation (#306)
-   Fix `MaintenanceInfo.toString` (#301 via @gberche-orange)
-   Replace dependency management plugin with Gradle platform dependencies (#298)
-   Add `MaintenanceInfo` to `CreateServiceInstanceRequest` and `UpdateServiceInstanceRequest` (#290)
-   Return the operation in the HTTP 202 response body when an async operation is in progress and another request is received for the same service instance (#284)
-   Update Gradle build to use native Gradle facilities for publishing artifacts (#280)
-   Update javadoc to better reflect the OSBA spec (#279 via @mateusz-stefanski)

Include the following Spring Boot starter:

Gradle:

```
Copyimplementation("org.springframework.cloud:spring-cloud-starter-open-service-broker:3.2.0")
```

Maven:

```
Copy<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-open-service-broker</artifactId>
  <version>3.2.0</version>
</dependency>
```

Spring Cloud Open Service Broker is a framework for building Spring Boot applications that implement the Open Service Broker API. The [Open Service Broker API](https://www.openservicebrokerapi.org) project allows developers to deliver services to applications running within cloud native platforms such as Cloud Foundry, Kubernetes, and OpenShift.

[Project Page](https://spring.io/projects/spring-cloud-open-service-broker) | [GitHub](https://github.com/spring-cloud/spring-cloud-open-service-broker) | [Reference Doc](https://docs.spring.io/spring-cloud-open-service-broker/docs/3.2.0/reference/) | [API Doc](https://docs.spring.io/spring-cloud-open-service-broker/docs/3.2.0/apidocs/)