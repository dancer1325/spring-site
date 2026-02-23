---
title: Spring Cloud Open Service Broker 2.1.0 Released
source: https://spring.io/blog/2018/12/21/spring-cloud-open-service-broker-2-1-0-released
scraped: 2026-02-23T15:04:02.900Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Roy Clarkson |  December 21, 2018 | 0 Comments
---

# Spring Cloud Open Service Broker 2.1.0 Released

_Releases | Roy Clarkson |  December 21, 2018 | 0 Comments_

We're please to announce the release of Spring Cloud Open Service Broker 2.1.0. This release supports additions and changes in the [Open Service Broker API v2.14](https://www.openservicebrokerapi.org/blog/2018/08/21/open-service-broker-v2-14-released). This release includes:

-   Upgrade to Spring Boot 2.0.7.RELEASE
-   Support for asynchronous service instance binding and unbinding
-   Support providing an updated `dashboard_url` when updating a service instance
-   Resolves issues with deserializing the model objects that were converted to the builder pattern
-   Adds a convenience property to the various request objects for accessing the `Plan` for the specified `ServiceDefinition`

Include the following Spring Boot starter:

```
Copy<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-open-service-broker-webmc</artifactId>
  <version>2.1.0.RELEASE</version>
</dependency>
```

[Project Page](https://spring.io/projects/spring-cloud-open-service-broker) | [GitHub](https://github.com/spring-cloud/spring-cloud-open-service-broker) | [Reference Doc](https://docs.spring.io/spring-cloud-open-service-broker/docs/2.1.0.RELEASE/reference/html5) | [API Doc](https://docs.spring.io/spring-cloud-open-service-broker/docs/2.1.0.RELEASE/apidocs/)