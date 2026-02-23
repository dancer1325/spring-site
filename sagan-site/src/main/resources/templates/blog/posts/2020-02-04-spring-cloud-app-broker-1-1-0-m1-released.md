---
title: Spring Cloud App Broker 1.1.0.M1 Released
source: https://spring.io/blog/2020/02/04/spring-cloud-app-broker-1-1-0-m1-released
scraped: 2026-02-23T14:12:38.778Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Roy Clarkson |  February 04, 2020 | 0 Comments
---

# Spring Cloud App Broker 1.1.0.M1 Released

_Releases | Roy Clarkson |  February 04, 2020 | 0 Comments_

We are pleased to announce the release of Spring Cloud App Broker 1.1.0.M1. Thanks to the community for your feedback and contributions! This release includes the following fixes and enhancements:

-   Upgrade to Spring Boot 2.2.4.RELEASE
-   Upgrade to Spring Cloud Open Service Broker 3.1.0.RELEASE
-   Upgrade to Cloud Foundry Java Client 4.1.0.RELEASE
-   Log warnings when auto-configuration enables an `ServiceInstanceStateRepository` or `ServiceInstanceBindingStateRepository`
-   Document example implementation of `ServiceInstanceStateRepository` and `ServiceInstanceBindingStateRepository`
-   Update reference docs to use new Spring docs style
-   Exclude tests from docs and distribution zips
-   Replace InMemory repository Map data structure
-   Truncate app name if too long when using `ServiceInstanceGuidSuffix`
-   `UpdateServiceInstance` will now create and bind new backing services, and unbind and delete old backing services
-   Fix reference documentation publication
-   Support custom BrokeredServices to be injected by custom configuration
-   Add support to configure API polling duration to support async backing services
-   Support a brokered service without a backing application
-   Migrate to Reactive Spring CredHub APIs
-   Allowing ServiceInstanceService as a provided Service
-   Enable Blockhound

Include the following Spring Boot starter:

```
Copy<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-app-broker-cloudfoundry</artifactId>
  <version>1.1.0.M1</version>
</dependency>
```

Use the Spring Milestone Repository:

```
Copy<repository>
  <id>spring-milestones</id>
  <url>https://repo.spring.io/milestone</url>
</repository>
```

[Project Page](https://spring.io/projects/spring-cloud-app-broker) | [GitHub](https://github.com/spring-cloud/spring-cloud-app-broker) | [Reference Doc](https://docs.spring.io/spring-cloud-app-broker/docs/1.1.0.M1/reference/html5) | [API Doc](https://docs.spring.io/spring-cloud-app-broker/docs/1.1.0.M1/api/)