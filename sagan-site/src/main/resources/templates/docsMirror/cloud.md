---
title: Spring | Cloud
source: https://spring.io/cloud
scraped: 2026-02-19T07:47:11.497Z
description: Level up your Java code and explore what Spring can do for you.
---

![](/img/extra/event-driven-7.svg)

# [](#cloud)Cloud

Developing distributed systems can be challenging. Complexity is moved from the application layer to the network layer and demands greater interaction between services. Making your code ‘cloud-native’ means dealing with [12-factor](https://12factor.net/) issues such as external configuration, statelessness, logging, and connecting to backing services. The Spring Cloud suite of projects contains many of the services you need to make your applications run in the cloud.

![](/img/extra/cloud-1.svg)![](/img/extra/cloud-1-dark.svg)

# Spring Cloud architecture highlights

![Diagram](/img/extra/cloud-3.svg)![Diagram](/img/extra/cloud-3-dark.svg)

# Service discovery

In the cloud, applications can’t always know the exact location of other services. A service registry, such as [Netflix Eureka](https://github.com/Netflix/eureka), or a sidecar solution, such as [HashiCorp Consul](https://www.consul.io/), can help. Spring Cloud provides `DiscoveryClient` implementations for popular registries such as [Eureka](/projects/spring-cloud-netflix), [Consul](/projects/spring-cloud-consul), [Zookeeper](/projects/spring-cloud-zookeeper), and even [Kubernetes](/projects/spring-cloud-kubernetes)' built-in system. There’s also a [Spring Cloud Load Balancer](/guides/gs/spring-cloud-loadbalancer/) to help you distribute the load carefully among your service instances.

[Get started with this simple guide](/guides/gs/service-registration-and-discovery)

# API gateway

With so many clients and servers in play, it’s often helpful to include an API gateway in your cloud architecture. A gateway can take care of securing and routing messages, hiding services, throttling load, and many other useful things. [Spring Cloud Gateway](/projects/spring-cloud-gateway) gives you precise control of your API layer, integrating Spring Cloud service discovery and client-side load-balancing solutions to simplify configuration and maintenance.

[Getting Started with Spring Cloud Gateway](/blog/2019/06/18/getting-started-with-spring-cloud-gateway)

[![Cloud](/img/extra/cloud-7.jpg)](https://www.youtube.com/watch?v=khzC-VwpFVM)

We found that the performance of \[Spring Cloud Gateway\] was very appealing. Low latency, good throughput, \[and\] a very small percentage of timeouts in our use cases.CHRIS JACKSON, SENIOR DEVELOPER, TD AMERITRADE

# Cloud configuration

![](/img/extra/cloud-2.svg)![](/img/extra/cloud-2-dark.svg)

In the cloud, configuration can’t simply be embedded inside the application. The configuration has to be flexible enough to cope with multiple applications, environments, and service instances, as well as deal with dynamic changes without downtime. [Spring Cloud Config](/projects/spring-cloud-config) is designed to ease these burdens and offers integration with version control systems like Git to help you keep your configuration safe.

[Try it now](/guides/gs/centralized-configuration/)

# Circuit breakers

Distributed systems can be unreliable. Requests might encounter timeouts or fail completely. A circuit breaker can help mitigate these issues, and [Spring Cloud Circuit Breaker](/spring-cloud-circuitbreaker) gives you the choice of three popular options: [Resilience4J](https://resilience4j.readme.io/docs/getting-started), [Sentinel](https://github.com/alibaba/Sentinel/wiki/Circuit-Breaking), or [Hystrix](https://github.com/Netflix/Hystrix/wiki).

[Try this guide to get started](/guides/gs/circuit-breaker)

# Tracing

Debugging distributed applications can be complex and take a long time. For any given failure, you might need to piece together traces of information from several independent services. [Micrometer Tracing](https://docs.micrometer.io/tracing/reference/) can instrument your applications in a predictable and repeatable way. And when used in conjunction with [OpenZipkin Brave](https://github.com/openzipkin/brave) or [OpenTelemetry](https://opentelemetry.io/), you can zero in on any latency problems you might have.

[![Video](/img/extra/cloud-4.png)](https://www.youtube.com/watch?v=CFLZJSwbYI0)[Spring Tips: Zipkin and Distributed Tracing](https://www.youtube.com/watch?v=CFLZJSwbYI0)

# Testing

In the cloud, you get extra points for having reliable, trustworthy, stable APIs—but getting there can be a journey. Contract-based testing is one technique that high-performing teams often use to stay on track. It helps by formalizing the content of APIs and building tests around them to ensure code remains in check.

[Spring Cloud Contract](/projects/spring-cloud-contract) provides contract-based testing support for REST and messaging-based APIs with contracts written in Groovy, Java, or Kotlin.

[Try this guide to get started](/guides/gs/contract-rest)

## Ready to get started?

## More resources

[![Introducing Azure Spring Cloud](/img/extra/cloud-5.jpg)](https://content.pivotal.io/webinars/dec-5-introducing-azure-spring-cloud-a-managed-runtime-for-spring-based-apps-webinar)

# [Introducing Azure Spring Cloud](https://content.pivotal.io/webinars/dec-5-introducing-azure-spring-cloud-a-managed-runtime-for-spring-based-apps-webinar)

Josh Long

[![Migrating to Cloud-Native Application Architectures](/img/extra/microservices-1.png)](https://content.pivotal.io/ebooks/migrating-to-cloud-native-application-architectures)

# [Migrating to Cloud-Native Application Architectures](https://content.pivotal.io/ebooks/migrating-to-cloud-native-application-architectures)

Matt Stine

[![Getting Started With Spring Cloud Gateway](/img/extra/cloud-6.png)](https://spring.io/blog/2019/06/18/getting-started-with-spring-cloud-gateway)

# [Getting Started With Spring Cloud Gateway](https://spring.io/blog/2019/06/18/getting-started-with-spring-cloud-gateway)

Ben Wilcock

![](/img/extra/footer.svg)

## Get ahead

VMware offers training and certification to turbo-charge your progress.

[Learn more](https://spring.academy/)

## Get support

Tanzu Spring offers support and binaries for OpenJDK™, Spring, and Apache Tomcat® in one simple subscription.

[Learn more](/support)

## Upcoming events

Check out all the upcoming events in the Spring community.

[View all](/events)