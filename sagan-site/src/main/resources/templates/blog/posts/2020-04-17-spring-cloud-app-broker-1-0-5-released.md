---
title: Spring Cloud App Broker 1.0.5 released
source: https://spring.io/blog/2020/04/17/spring-cloud-app-broker-1-0-5-released
scraped: 2026-02-23T14:04:26.227Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Roy Clarkson |  April 17, 2020 | 0 Comments
---

# Spring Cloud App Broker 1.0.5 released

_Releases | Roy Clarkson |  April 17, 2020 | 0 Comments_

We are pleased to announce the release of Spring Cloud App Broker 1.0.5. This release includes the following fixes and improvements:

-   Upgrade to Spring Boot 2.1.13.RELEASE
-   Allow a `ServiceInstanceService` bean to be provided by a consuming application
-   Correct an issue where the backing app environment was not being updated when the service instance was upgraded
-   If specified, the `routes` property now takes precedence over `host`, `hosts`, `domain` and `domains` properties
-   Correct an issue where synchronous binding and unbinding requests were not being properly handled

Gradle:

```
Copyimplementation("org.springframework.cloud:spring-cloud-starter-app-broker-cloudfoundry:1.0.5.RELEASE")
```

Maven:

```
Copy<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-app-broker-cloudfoundry</artifactId>
  <version>1.0.5.RELEASE</version>
</dependency>
```

[Project Page](https://spring.io/projects/spring-cloud-app-broker) | [GitHub](https://github.com/spring-cloud/spring-cloud-app-broker) | [Reference Doc](https://docs.spring.io/spring-cloud-app-broker/docs/1.0.5.RELEASE/reference/html5) | [API Doc](https://docs.spring.io/spring-cloud-app-broker/docs/1.0.5.RELEASE/api/)