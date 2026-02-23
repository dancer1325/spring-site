---
title: Spring Cloud App Broker 1.2.1 released
source: https://spring.io/blog/2020/12/02/spring-cloud-app-broker-1-2-1-released
scraped: 2026-02-23T13:39:49.970Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gareth Clay |  December 02, 2020 | 0 Comments
---

# Spring Cloud App Broker 1.2.1 released

_Releases | Gareth Clay |  December 02, 2020 | 0 Comments_

We are pleased to announce the release of Spring Cloud App Broker 1.2.1!

Our focus at the start of the 1.2.x release series has been to update our major dependencies, namely Spring Boot and Spring Cloud Open Service Broker. We have also updated and simplified our build and release process. Since the release of 1.1.1, the 1.2.1 release incorporates the following updates:

-   Update the Gradle build to make use of new native features for dependency management and publication
-   Upgrade to Spring Cloud Open Service Broker 3.2.0
-   Upgrade to Spring Boot 2.3.6

Gradle:

```
Copyimplementation("org.springframework.cloud:spring-cloud-starter-app-broker-cloudfoundry:1.2.1")
```

Maven:

```
Copy<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-app-broker-cloudfoundry</artifactId>
  <version>1.2.1</version>
</dependency>
```

[Project Page](https://spring.io/projects/spring-cloud-app-broker) | [GitHub](https://github.com/spring-cloud/spring-cloud-app-broker) | [Reference Doc](https://docs.spring.io/spring-cloud-app-broker/docs/1.2.1/reference/) | [API Doc](https://docs.spring.io/spring-cloud-app-broker/docs/1.2.1/api/)