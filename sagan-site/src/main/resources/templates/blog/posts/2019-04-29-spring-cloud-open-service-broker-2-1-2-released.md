---
title: Spring Cloud Open Service Broker 2.1.2 Released
source: https://spring.io/blog/2019/04/29/spring-cloud-open-service-broker-2-1-2-released
scraped: 2026-02-23T14:49:49.081Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Roy Clarkson |  April 29, 2019 | 0 Comments
---

# Spring Cloud Open Service Broker 2.1.2 Released

_Releases | Roy Clarkson |  April 29, 2019 | 0 Comments_

We are pleased to announce the release of Spring Cloud Open Service Broker 2.1.2. We want to thank Guillaume Berche for his significant contributions to this release and to the project overall. This is a maintenance release that incorporates several updates and improvements, including the following:

-   Continued support for [Open Service Broker API v2.14](https://www.openservicebrokerapi.org/blog/2018/08/21/open-service-broker-v2-14-released).
-   Upgrade to Spring Boot 2.0.9.RELEASE and Spring Framework 5.0.13.RELEASE
-   Fix compatibility issue with Spring Boot DevTools
-   Allow nulls in optional Boolean fields and no longer set default values
-   Use valid JSON schema examples
-   Fix JSON serialization of model objects for use by OSB clients
-   Fix JSON schema not properly mapping to arrays
-   Add property binding support for CloudFoundry service plan metadata

Include the following Spring Boot starter:

```
Copy<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-open-service-broker-webmc</artifactId>
  <version>2.1.2.RELEASE</version>
</dependency>
```

[Project Page](https://spring.io/projects/spring-cloud-open-service-broker) | [GitHub](https://github.com/spring-cloud/spring-cloud-open-service-broker) | [Reference Doc](https://docs.spring.io/spring-cloud-open-service-broker/docs/2.1.2.RELEASE/reference/html5) | [API Doc](https://docs.spring.io/spring-cloud-open-service-broker/docs/2.1.2.RELEASE/apidocs/)