---
title: Spring Cloud Open Service Broker 3.0.0.M3 Released
source: https://spring.io/blog/2018/12/21/spring-cloud-open-service-broker-3-0-0-m3-released
scraped: 2026-02-23T15:04:09.296Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Roy Clarkson |  December 21, 2018 | 0 Comments
---

# Spring Cloud Open Service Broker 3.0.0.M3 Released

_Releases | Roy Clarkson |  December 21, 2018 | 0 Comments_

We're please to announce the release of Spring Cloud Open Service Broker 3.0.0.M3. This 3.0 release will support Spring WebFlux and a reactive programing model, as well as additions and changes in the [Open Service Broker API v2.14](https://www.openservicebrokerapi.org/blog/2018/08/21/open-service-broker-v2-14-released). This release includes:

-   Upgrade to Spring Boot 2.1.1.RELEASE (previously built against Spring Boot 2.0)
-   Adds a convenience property to the various request objects for accessing the `Plan` for the specified `ServiceDefinition`

Include the following Spring Boot starter:

```
Copy<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-open-service-broker</artifactId>
  <version>3.0.0.M3</version>
</dependency>
```

Use the Spring Milestone Repository:

```
Copy<repository>
  <id>spring-milestones</id>
  <url>https://repo.spring.io/milestone</url>
</repository>
```

[Project Page](https://spring.io/projects/spring-cloud-open-service-broker) | [GitHub](https://github.com/spring-cloud/spring-cloud-open-service-broker) | [Reference Doc](https://docs.spring.io/spring-cloud-open-service-broker/docs/3.0.0.M3/reference/html5) | [API Doc](https://docs.spring.io/spring-cloud-open-service-broker/docs/3.0.0.M3/apidocs/)