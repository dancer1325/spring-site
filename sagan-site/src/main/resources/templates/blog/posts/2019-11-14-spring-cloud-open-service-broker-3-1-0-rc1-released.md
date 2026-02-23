---
title: Spring Cloud Open Service Broker 3.1.0.RC1 Released
source: https://spring.io/blog/2019/11/14/spring-cloud-open-service-broker-3-1-0-rc1-released
scraped: 2026-02-23T14:26:04.436Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Roy Clarkson |  November 14, 2019 | 0 Comments
---

# Spring Cloud Open Service Broker 3.1.0.RC1 Released

_Releases | Roy Clarkson |  November 14, 2019 | 0 Comments_

We are pleased to announce the 3.1.0.RC1 release of Spring Cloud Open Service Broker. Support for [Open Service Broker API v2.15](https://www.openservicebrokerapi.org/blog/2019/06/21/announcing-open-service-broker-api-v2-15) is now feature complete, and we expect for this to be the final milestone before a GA release. Thanks to the community for your feedback and contributions! This release includes the following [fixes and enhancements](https://github.com/spring-cloud/spring-cloud-open-service-broker/issues?q=is%3Aclosed+milestone%3A3.1.0.RC1):

-   Upgrade to Spring Boot 2.2.1.RELEASE
-   Add `ServiceBrokerMaintenanceInfoConflictException` to handle `MaintenanceInfoConflict` error scenarios.
-   `ServiceBrokerInvalidParametersException` now returns an HTTP 400 when a create or update request is malformed or includes invalid parameters. Previously it was, incorrectly, returning an HTTP 422.
-   `CreateServiceInstanceBindingRequest` now extends `AsyncParameterizedServiceInstanceRequest` in order to utilize a common request object and reduce redundancy.
-   Update reference documentation.

Include the following Spring Boot starter:

```
Copy<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-open-service-broker</artifactId>
  <version>3.1.0.RC1</version>
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

[Project Page](https://spring.io/projects/spring-cloud-open-service-broker) | [GitHub](https://github.com/spring-cloud/spring-cloud-open-service-broker) | [Reference Doc](https://docs.spring.io/spring-cloud-open-service-broker/docs/3.1.0.RC1/reference/html5) | [API Doc](https://docs.spring.io/spring-cloud-open-service-broker/docs/3.1.0.RC1/apidocs/)