---
title: Spring Cloud App Broker 1.1.1 released
source: https://spring.io/blog/2020/06/10/spring-cloud-app-broker-1-1-1-released
scraped: 2026-02-23T13:58:17.162Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gareth Clay |  June 10, 2020 | 0 Comments
---

# Spring Cloud App Broker 1.1.1 released

_Releases | Gareth Clay |  June 10, 2020 | 0 Comments_

We are pleased to announce the release of Spring Cloud App Broker 1.1.1. Thanks to the community for your feedback and contributions! This release includes the following fixes and improvements:

-   Upgrade to Spring Cloud Open Service Broker 3.1.1.RELEASE
-   Upgrade to Spring Boot 2.2.7.RELEASE
-   Upgrade to CF Java Client 4.7.0.RELEASE
-   Upgrade to Spring CredHub 2.1.1.RELEASE
-   Permissions stored in CredHub are now cleaned up on unbind
-   Backing app environment is updated on upgrade
-   Add service instance logging endpoints to support the [service instance logs CF CLI plugin](https://github.com/pivotal-cf/service-instance-logs-cli-plugin)
-   Fixed an issue where configured backing services were not being deleted
-   Fixed an issue with deletion of permissions from CredHub
-   Add a new logging starter
-   Logging updates to ensure potentially sensitive configuration data is only logged in debug mode
-   Extend the API to allow service instance management operations to be performed without the requirement for the `cloud_controller.admin` authority
-   Add documentation on how to create a custom Target

Gradle:

```
Copyimplementation("org.springframework.cloud:spring-cloud-starter-app-broker-cloudfoundry:1.1.1.RELEASE")
```

Maven:

```
Copy<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-app-broker-cloudfoundry</artifactId>
  <version>1.1.1.RELEASE</version>
</dependency>
```

Optionally, if you would like to enable the logging endpoints to support the [service instance logs CF CLI plugin](https://github.com/pivotal-cf/service-instance-logs-cli-plugin), additionally add the new logging starter dependency:

Gradle:

```
Copyimplementation("org.springframework.cloud:spring-cloud-starter-app-broker-logging:1.1.1.RELEASE")
```

Maven:

```
Copy<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-app-broker-logging</artifactId>
  <version>1.1.1.RELEASE</version>
</dependency>
```

[Project Page](https://spring.io/projects/spring-cloud-app-broker) | [GitHub](https://github.com/spring-cloud/spring-cloud-app-broker) | [Reference Doc](https://docs.spring.io/spring-cloud-app-broker/docs/1.1.1.RELEASE/reference/) | [API Doc](https://docs.spring.io/spring-cloud-app-broker/docs/1.1.1.RELEASE/api/)