---
title: Spring Cloud Azure 4.0 is Now Generally Available
source: https://spring.io/blog/2022/03/30/spring-cloud-azure-4-0-is-now-generally-available
scraped: 2026-02-23T12:46:01.513Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  March 30, 2022 | 4 Comments
---

# Spring Cloud Azure 4.0 is Now Generally Available

_Engineering | Josh Long |  March 30, 2022 | 4 Comments_

**NOTE: Hi, Spring fans! This is a guest post from Sean Li, our friend at Microsoft**

I am pleased to announce that Spring Cloud Azure 4.0 is now generally available. With this major release we aim to bring better security, leaner dependencies, support for production readiness and more. Version 4 represents a significant milestone in our product roadmap that we couldn’t have delivered without the collective wisdom of the Spring community and customer feedback. On behalf of the Spring on Azure product team, thank you for making this happen!

## [](#unified-development-experience)Unified Development Experience

At the Developer Division of Microsoft, we are big on developer experience. We constantly challenge ourselves on how we can make things more consistent and easier to understand, so our customers are not confronted with haphazard development choices. This is a long and self-evolving journey as consistency is relative and there will be things that are outside of our control. We now humbly take another step in this direction to improve to our developer experience by unifying project name, artifact ID and properties.

```xml
Copy
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>com.azure.spring</groupId>
      <artifactId>spring-cloud-azure-dependencies</artifactId>
      <version>4.0.0</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>

```

## [](#simplified-dependency-management)Simplified dependency management

Dependency management is one of the core value pillars that has helped Spring establish preeminence over to other Java frameworks. In that spirit, we have also been exploring ways to make dependency management easier for Spring developers on Azure. In this release we have codified best practices and expertise from Spring experts and condensed all of our dependency BOMs into one, spring-cloud-azure-dependencies, which we believe will further bring down the learning curve and avoid ill-handling of dependencies.

## [](#expanded-support-scope-of-azure-support)Expanded support scope of Azure Support

The Azure Support module in Spring Initializr provides auto-configuration of many Azure services.

![](https://github.com/joshlong/blog-images/blob/master/spring-cloud-azure-4/initializr.png?raw=true)

In this release we have expanded the scope of Azure Support to cover the additional 3 more services:

-   Event Hubs
-   Azure Cache for Redis
-   App Configuration

Our journey does not end here and over time we will bring even more Azure services into the fold.

## [](#more-flexible-spring-programming-model)More flexible Spring programming model

One bit of feedback that we consistently hear is our Spring modules are unnecessarily stacked on top of too many layers of dependencies, which has prevented broader adoption. As an example, all of our early Spring modules rely on Spring Boot, and many of our customers are running Spring MVC apps in Tomcat, leveraging nothing but Spring Data, as an example, to communicate with data services. We have rearchitected our Spring module dependencies from the ground up to make them a better fit with different approaches. Take the programming model for Azure Event Hubs as an example. Purple boxes in the diagrams represent Spring Cloud Azure client libraries. You can use Spring binder (spring-cloud-azure-stream-binder-eventhubs), Spring integration (spring-integration-azure-eventhubs) and Spring Kafka (spring-messaging-azure) to interact with Azure Event Hubs.

![](https://github.com/joshlong/blog-images/blob/master/spring-cloud-azure-4/graph.png?raw=true)

## [](#more-control-and-secure)More control and secure

At the heart of every real-world application is identity and secret management. Support for managed identity has become a fundamental principle for Azure, providing a security baseline at the individual service level. We believe aligning on those guidelines will also benefit Spring developers at large, and have added Managed Identity support for App Configuration, Event Hub, Service Bus, Cosmos, Key Vault, Storage Blob, and Storage Queue. This enables building credential-free applications, which is a pattern that has picked up tremendous momentum both at Microsoft and in the community. In addition to Managed Identity, you can use any authentication methods supported in the underlying Azure SDK from our Spring libraries. For instance, you can use a SAS token and token credential to authenticate with Service Bus and Event Hubs. [Credential chain](https://docs.microsoft.com/en-us/dotnet/api/azure.identity.chainedtokencredential?view=azure-dotnet) is now enabled by default, allowing applications to obtain credentials from application properties, environment variables, managed identity, IDEs, etc., all of which promote securing your apps in a zero-trust programing model.

Lastly providing granular level access control at the resource level (i.e.: Service Bus queue), is often of paramount importance when it comes to meeting the needs of our enterprise customers. We’ve now unlocked these controls to our customers for better security governance and adherence to IT policies.

## [](#more-options-exposed-in-a-spring-idiomatic-way)More options exposed in a Spring idiomatic way

Spring developers have long enjoyed the convenience of defining client options in application configuration files. We certainly do not want to take that privilege away and burden Spring developers with setting options via client objects. To that end, we’ve significantly improved autoconfiguration coverage of Azure SDK clients for both synchronous and asynchronous scenarios. Case in point, here is a teaser preview of configuration options you can set with Spring Integration Azure Service Bus.

![](https://github.com/joshlong/blog-images/blob/master/spring-cloud-azure-4/table.png?raw=true)

## [](#more-production-ready)More Production Ready

Lastly all of the above would be in vain if we do not have enough feature coverage to support our customers in production. Many things come to my mind to make an application production ready, but observability often arrives at the top. We’ve added health indicator for App Configuration, Event Hubs, Cosmos, Key Vault, Storage Blob, Storage Queue, Storage File, as well as Spring Cloud Sleuth support for all HTTP-based Azure SDKs. As an example, you now can probe if storage blob is up or down via Spring Boot actuator endpoint, as well as track dependencies and application latencies in a Zipkin dashboard.

![](https://github.com/joshlong/blog-images/blob/master/spring-cloud-azure-4/sleuth.png?raw=true)

## [](#getting-started)Getting Started

We hope you are as excited as we are about this release. To get started follow our latest

-   [Reference docs](https://microsoft.github.io/spring-cloud-azure/current/reference/html/index.html)
-   [Code samples](https://github.com/Azure-Samples/azure-spring-boot-samples)
-   [Migration guides](https://microsoft.github.io/spring-cloud-azure/current/reference/html/index.html#migration-guide-for-4-0)