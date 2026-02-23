---
title: Spring Cloud Open Service Broker 3.1.0 Released
source: https://spring.io/blog/2019/11/26/spring-cloud-open-service-broker-3-1-0-released
scraped: 2026-02-23T14:24:15.956Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Roy Clarkson |  November 26, 2019 | 0 Comments
---

# Spring Cloud Open Service Broker 3.1.0 Released

_Releases | Roy Clarkson |  November 26, 2019 | 0 Comments_

We are pleased to announce the general availability of Spring Cloud Open Service Broker 3.1.0.RELEASE. Support for [Open Service Broker API v2.15](https://www.openservicebrokerapi.org/blog/2019/06/21/announcing-open-service-broker-api-v2-15) is now feature complete. Thanks to the community for your feedback and contributions! This release includes all of the fixes and enhancements from the pre-release milestones:

-   Upgrade to Spring Boot 2.2.1.RELEASE
-   Add `ServiceBrokerMaintenanceInfoConflictException` to handle `MaintenanceInfoConflict` error scenarios
-   `ServiceBrokerInvalidParametersException` now returns an HTTP 400 when a create or update request is malformed or includes invalid parameters. Previously it was, incorrectly, returning an HTTP 422.
-   `CreateServiceInstanceBindingRequest` now extends `AsyncParameterizedServiceInstanceRequest` in order to utilize a common request object and reduce redundancy.
-   Update reference documentation
-   Support updating a Service Instance context
-   Add list of `endpoints` to create Service Binding response body
-   Support `X-Broker-API-Request-Identity` request identity header
-   Restrict `Operation` strings to 10,000 characters in the response body
-   Fix an issue where `ServiceInstanceBindingDoesNotExistException` was incorrectly extended from `RuntimeException`, instead of `ServiceBrokerException`
-   Add `maintenance_info` field to Service Plan object
-   Add `maximum_polling_duration` field to Service Plan object
-   Add `plan_updateable` field to Service Plan object
-   Return HTTP 400 when the required `service_id` and/or `plan_id` are missing or incorrect
-   Return HTTP 202 when a service broker operation is in progress and an identical request is sent before the previous request completes
-   Return JSON arrays instead of JSON objects for certain Service definition metadata
-   Add support for custom base path of service broker controllers
-   Improve support for service metadata in configuration properties
-   Add support for configuring Base64 `metadata.imageUrl` data from a class path image file
-   Improve configuration of event hooks via additional bean and auto-configuration support

Include the following Spring Boot starter:

```
Copy<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-open-service-broker</artifactId>
  <version>3.1.0.RELEASE</version>
</dependency>
```

Spring Cloud Open Service Broker is a framework for building Spring Boot applications that implement the Open Service Broker API. The [Open Service Broker API](https://www.openservicebrokerapi.org) project allows developers to deliver services to applications running within cloud native platforms such as Cloud Foundry, Kubernetes, and OpenShift.

[Project Page](https://spring.io/projects/spring-cloud-open-service-broker) | [GitHub](https://github.com/spring-cloud/spring-cloud-open-service-broker) | [Reference Doc](https://docs.spring.io/spring-cloud-open-service-broker/docs/3.1.0.RELEASE/reference/html5) | [API Doc](https://docs.spring.io/spring-cloud-open-service-broker/docs/3.1.0.RELEASE/apidocs/)