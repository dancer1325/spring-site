---
title: Preview releases of Spring Cloud Alibaba are available: 0.9.0, 0.2.2, and 0.1.2
source: https://spring.io/blog/2019/04/19/preview-releases-of-spring-cloud-alibaba-are-available-0-9-0-0-2-2-and-0-1-2
scraped: 2026-02-23T14:50:23.874Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  April 19, 2019 | 2 Comments
---

# Preview releases of Spring Cloud Alibaba are available: 0.9.0, 0.2.2, and 0.1.2

_Releases | Spencer Gibb |  April 19, 2019 | 2 Comments_

**NOTE: This is a guest post from our friends at Alibaba.**

Hi! Today, we’re very excited to announce that the 0.9.0, 0.2.2, and 0.1.2 releases of Spring Cloud Alibaba are now available.

## [](#release-highlight)Release Highlight

Included in this GA are 3 new releases:

-   Release 0.9.0: Compatible with Spring Cloud Greenwich
-   Release 0.2.2: Compatible with Spring Cloud Finchley
-   Release 0.1.2: Compatible with Spring Cloud Edgware

Four new modules were added to all three releases:

-   spring-cloud-alibaba-sentinel-zuul
-   spring-cloud-alibaba-seata
-   spring-cloud-alibaba-dubbo (not available in Release 0.1.2)
-   spring-cloud-alibaba-sms

In addition, we introduced new features in spring-cloud-alibaba-nacos and spring-cloud-alibaba-sentinel, and rocketmq-binder is now integrated with rocketmq-spring.

Lastly, we fixed some bugs found in the previous version.

Note: The Spring Cloud Alibaba project is a community project maintained by Alibaba.

### [](#spring-cloud-alibaba-seata)Spring Cloud Alibaba Seata

[Seata](https://github.com/seata/seata) is a distributed transaction component that is jointly open-sourced by Alibaba Group and Ant Financial. Being able to integrate with most of today's relational databases that support ACID transactions, Seata addresses distributed transaction issues in microservice scenarios in an efficient and nonintrusive manner.

At the level of Spring Cloud, Seata accesses the Spring Cloud layer by passing the transaction context in microservices:

-   Support for automatic restoration of Seata transaction contexts in a Spring MVC environment
-   Support for automatic passing of Seata transaction contexts when the service caller calls a service through RestTemplate or FeignClient
-   Support for using FeingClient together with Hystrix or Sentinel in rate limiting and service-degradation scenarios

### [](#spring-cloud-alibaba-dubbo)Spring Cloud Alibaba Dubbo

[Apache Dubbo™ (incubating)](http://dubbo.apache.org/en-us/index.html) is a high-performance, Java-based open-source RPC framework.

Spring Cloud Alibaba integrated with it:

-   Based on Dubbo Spring Boot 2.7.1 (minimum JDK requirement: Java 8)
-   Supports all Spring Cloud registry implementations for Dubbo service registration (including Alibaba Nacos) and introduces a new Dubbo registry protocol: "**spring-cloud://localhost**"
-   Extends the communication protocols of Spring Cloud service-to-service calls, meaning that REST is no longer the only way and more communication protocols that Dubbo supports can be chosen, providing better performance -- e.g. dubbo, thrift, and so on. There are three programming models for the developers:
    -   Standard Apache Dubbo: `@Reference` `@Service` annotated on Java interface
    -   Spring Cloud Open Feign: `@DubboTransported` annotated on `@FeignClient` Java interface
    -   Spring Cloud RestTemplate: `@DubboTransported` annotated on `@Bean` definition of RestTemplate annonated `@LoadBalanced`
-   Substitutes for Netflix Ribbon by using Dubbo built-in Load balancer that offers a weighting mechanism making things more smooth and stable.

### [](#spring-cloud-alibaba-nacos)Spring Cloud Alibaba Nacos

[Nacos](https://github.com/alibaba/nacos) is a dynamic service discovery, configuration management, and service management platform that makes it easier to build cloud-native applications.

#### [](#spring-cloud-alibaba-nacos-config)Spring Cloud Alibaba Nacos Config

We updated Nacos Config as follows:

-   Upgrade Nacos Client version to 1.0.0
-   Support `spring.cloud.nacos.config.enabled` configuration to turn off Nacos Config auto-injection
-   Replace `spring.cloud.nacos.config.enabled` with `spring.profiles.active`

#### [](#spring-cloud-alibaba-nacos-discovery)Spring Cloud Alibaba Nacos Discovery

We updated Nacos service registration as follows:

-   Upgrade Nacos Client version to 1.0.0.
-   Support namespace to isolate the data.
-   Provide `NacosWatch` to trigger `HeartbeatEvent`.
-   Make `@EnableDiscoveryClient` optional to register service.

### [](#spring-cloud-alibaba-sentinel)Spring Cloud Alibaba Sentinel

[Sentinel](https://github.com/alibaba/Sentinel) is an open-source project developed by the Alibaba Middleware team to address flow-control issues and ensure high availability in distributed architectures. Sentinel takes "flow" as the breakthrough point, and helps you to ensure service reliability through flow control, circuit breaking, and system load protection.

Updates in this release include:

-   Upgrade the Sentinel version to 1.5.2
-   Add the `ruleType` property for sentinel dataSource to fix the bug that the rule data won't load dynamically when dataSource loads empty data for the first time
-   Fix the bug that `@SentinelRestTemplate` doesn't work in some scenarios
-   Add JSR 303 validation in `SentinelProperties` and add two configuration items: Client IP and whether `CommonFilter` is initialized
-   Support automatic injection of `RequestOriginParser`
-   The priority of `SentinelProtectInterceptor` that corresponds to `@SentinelRestTemplate` becomes the highest
-   `SentinelEndpoint` now displays more information, such as application name, log directory, log name policy, dashboard address, metrics file size, client IP, etc
-   Support `@EnableCircuitBreaker`
-   Optimize flow control and circuit breaking handling logic in `RestTemplate` and `Feign`

### [](#spring-cloud-alibaba-rocketmq-binder)Spring Cloud Alibaba RocketMQ Binder

[RocketMQ](https://github.com/apache/rocketmq) is an open-source distributed messaging system based on highly available cluster technologies. It provides low-latency and highly available message publication and subscription services.

Updates in this release include:

-   Integrate with RocketMQ Spring and refactoring
-   Support connection with Aliware MQ by configuring Alibaba Cloud AK/SK only
-   Optimized processing logic in the cases of message sending and consuming errors
-   Support sending messages asynchronously, and, by default, send messages asynchronously

### [](#spring-cloud-alibaba-sentinel-zuul)Spring Cloud Alibaba Sentinel Zuul

Zuul is a network gateway product of Netflix. We have now integrated it into Sentinel.

Updates in this release include:

-   Sentinel is now integrated with Zuul and provides `SentinelPreFilter`、`SentinelPostFilter`、`SentinelErrorFilter` for request interception
-   Provide the configuration prefix of `spring.cloud.sentinel.zuul.` to configure Sentinel Filter

### [](#spring-cloud-alibaba-cloud-sms)Spring Cloud Alibaba Cloud SMS

SMS is a messaging service provided by Alibaba Cloud.

Spring Cloud Alibaba Cloud SMS provides the following functions:

-   Support single and batch SMS delivery
-   Support SMS queries based on mobile phone number, date, and message type
-   Support queries of SMS delivery status by subscribing to the downlink messages
-   Support content retrieval of end user replies by subscribing to the uplink messages

### [](#spring-cloud-alibaba-cloud-schedulerx)Spring Cloud Alibaba Cloud SchedulerX

SchedulerX is a job scheduling middleware tool provided by Alibaba Cloud.

In this release we, fixed the circular reference bug.

## [](#how-to-use)How to Use

These artifacts are available from Maven Central and Spring Release repository by using the BOM, as follows:

```
Copy<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-alibaba-dependencies</artifactId>
            <version>0.9.0.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

## [](#whats-next)What's next

**Sentinel** currently supports reactive and will adapt to WebFlux and Spring Cloud Gateway.

**RocketMQ Binder** adaptation to MessageSource for message pulling.