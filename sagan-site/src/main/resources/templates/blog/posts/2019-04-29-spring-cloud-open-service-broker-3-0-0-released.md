---
title: Spring Cloud Open Service Broker 3.0.0 Released
source: https://spring.io/blog/2019/04/29/spring-cloud-open-service-broker-3-0-0-released
scraped: 2026-02-23T14:46:24.296Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Roy Clarkson |  April 29, 2019 | 0 Comments
---

# Spring Cloud Open Service Broker 3.0.0 Released

_Releases | Roy Clarkson |  April 29, 2019 | 0 Comments_

We are pleased to announce the general availability of Spring Cloud Open Service Broker 3.0.0. This release introduces a significant shift from imperative to reactive APIs in order to support the new reactive-based web framework, Spring WebFlux. v3.0.0 was developed in parallel with v2.1.x and has feature parity with [v2.1.2](https://spring.io/blog/2019/04/29/spring-cloud-open-service-broker-2-1-2-released). Looking forward, all new features will only be added to the 3.x releases.

New features available in v3.0.0:

-   Continue support for [Open Service Broker API v2.14](https://www.openservicebrokerapi.org/blog/2018/08/21/open-service-broker-v2-14-released).
-   Support Spring Boot 2.1 and Spring Framework 5.1
-   Introduce support for Spring WebFlux via a new Reactive API (based on Project Reactor)
-   Continue support for Spring MVC
-   Rename the Spring Boot starter because it now supports both Spring web frameworks
-   Introduce several reactive life cycle hooks for performing additional operations

Include the following Spring Boot starter:

```
Copy<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-open-service-broker</artifactId>
  <version>3.0.0.RELEASE</version>
</dependency>
```

[Project Page](https://spring.io/projects/spring-cloud-open-service-broker) | [GitHub](https://github.com/spring-cloud/spring-cloud-open-service-broker) | [Reference Doc](https://docs.spring.io/spring-cloud-open-service-broker/docs/3.0.0.RELEASE/reference/html5) | [API Doc](https://docs.spring.io/spring-cloud-open-service-broker/docs/3.0.0.RELEASE/apidocs/)