---
title: Spring Cloud Open Service Broker 3.0.0.M1 released
source: https://spring.io/blog/2018/10/03/spring-cloud-open-service-broker-3-0-0-m1-released
scraped: 2026-02-23T15:11:19.035Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Roy Clarkson |  October 03, 2018 | 0 Comments
---

# Spring Cloud Open Service Broker 3.0.0.M1 released

_Releases | Roy Clarkson |  October 03, 2018 | 0 Comments_

We're please to announce the release of Spring Cloud Open Service Broker 3.0.0.M1. The 3.0 release introduces full reactive support and builds upon 2.1.0.M1, which will support additions and changes in the [Open Service Broker API v2.14](https://www.openservicebrokerapi.org/blog/2018/08/21/open-service-broker-v2-14-released). This release includes:

-   First class support for Spring WebFlux and Project Reactor
-   The starter has been renamed because it now supports both Spring web frameworks
-   Introduces several reactive life cycle hooks for performing additional operations

Include the following Spring Boot starter:

```
Copy<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-open-service-broker</artifactId>
  <version>3.0.0.M1</version>
</dependency>
```

Use the Spring Milestone Repository:

```
Copy<repository>
  <id>spring-milestones</id>
  <url>https://repo.spring.io/milestone</url>
</repository>
```

View the details of the closed [issues](https://github.com/spring-cloud/spring-cloud-open-service-broker/milestone/12?closed=1) for this release. The next release, 3.0.0.M2, will include support for asynchronous bindings. Watch for it in the coming weeks.

[Project Page](https://spring.io/projects/spring-cloud-open-service-broker) | [GitHub](https://github.com/spring-cloud/spring-cloud-open-service-broker) | [Reference Doc](https://docs.spring.io/spring-cloud-open-service-broker/docs/3.0.0.M1/reference/html5) | [API Doc](https://docs.spring.io/spring-cloud-open-service-broker/docs/3.0.0.M1/apidocs/)