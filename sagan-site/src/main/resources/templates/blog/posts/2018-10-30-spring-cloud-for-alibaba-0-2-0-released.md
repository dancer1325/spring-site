---
title: Spring Cloud for Alibaba 0.2.0 released
source: https://spring.io/blog/2018/10/30/spring-cloud-for-alibaba-0-2-0-released
scraped: 2026-02-23T15:08:30.853Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  October 30, 2018 | 5 Comments
---

# Spring Cloud for Alibaba 0.2.0 released

_Releases | Spencer Gibb |  October 30, 2018 | 5 Comments_

Hi! Today, we're very excited to announce the first preview release of Spring Cloud Alibaba.

The Spring Cloud Alibaba project, consisting of Alibaba's open-source components and several Alibaba Cloud products, aims to implement and expose well known Spring Framework patterns and abstractions to bring the benefits of Spring Boot and Spring Cloud to Java developers using Alibaba products.

**NOTE:** *The Spring Cloud Alibaba project is a community project maintained by Alibaba.*

**NOTE:** *Version 0.2.0.RELEASE is compatible with the Spring Boot 2.0.x line. Version 0.1.0.RELEASE is compatible with the Spring Boot 1.x line.*

**The open-source components, prefixed with "spring-cloud-alibaba", have the following features:**

##### [](#service-discovery)Service Discovery

The `spring-cloud-alibaba-nacos-discovery-starter` component implements the registry convention interfaces as defined in Spring Cloud Commons, including `NacosAutoServiceRegistration`, `NacosServiceRegistry`, `NacosDiscoveryClient` and so on. By adding the dependency and a few configurations, you can register your services to Nacos Server easily. Integration with Ribbon is also supported.

##### [](#configuration)Configuration

`NacosPropertySourceLocator` in the `spring-cloud-alibaba-nacos-config-starter` component implements the PropertySoureLocator interface. Just add the dependency and a few configurations, and you will be able to obtain application configurations from Nacos Server and add them to the Spring Environment. In addition, you can distribute configurations and track the distribution status in real time without other components.

##### [](#safeguarding-for-high-availability)Safeguarding for High Availability

The flow control, circuit breaking, and concurrency features of Servlet, RestTemplate, Dubbo, and RocketMQ, integrated with the `spring-cloud-alibaba-sentinel-starter` component by default, can be used directly by adding the dependencies. You can also modify the policies and thresholds of flow control, circuit breaking, or concurrency for running applications in real time through the Sentinel dashboard.

**The Alibaba Cloud products, prefixed with "spring-cloud-alicloud", have the following features:**

##### [](#application-naming-service)Application Naming Service

Application Naming Service (ANS), the service discovery service from Alibaba Cloud, offers more cost-effective SaaS service discovery services. With encryption for API calls, your services have an extra layer of protection.

##### [](#application-configuration-management)Application Configuration Management

Application Configuration Management (ACM), the Nacos configuration management service from Alibaba Cloud, offers more cost-effective and secure SaaS configuration management services. You can also review the entire configuration distribution track.

##### [](#object-storage-service)Object Storage Service

Object Storage Service (OSS), a cost-effective, highly secure, and highly reliable cloud storage solution from Alibaba, allows you to store and retrieve any type of data at any time, from anywhere on the web. Simply by automatically injecting an OSS Client, you can use the data storage and downloading functions directly.

## [](#how-to-use)How to Use

These artifacts are available from Maven Central and [Spring Release](https://repo.spring.io/release/) repository via BOM:

```
Copy<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-alibaba-dependencies</artifactId>
            <version>0.2.0.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

## [](#whats-next)What's Next?

**RocketMQ**

Apache RocketMQ™ is a Java-based open-source distributed messaging and stream computing platform with high performance and high throughput. Since `spring-cloud-stream-binder-rocket` modules are based on the [Spring Integration](https://spring.io/projects/spring-integration) and [Spring Cloud Stream](https://cloud.spring.io/spring-cloud-stream/), developers can use RocketMQ as the messaging middleware when using Spring Cloud Stream and Spring Cloud Bus.

**AliCloud SchedulerX**

AliCloud SchedulerX, a distributed task-scheduling tool crafted by Alibaba Middleware Team, supports recurring tasks and tasks to be triggered at specified time.

**AliCloud SLS**

AliCloud SLS, a one-stop service for log management, is a proven tool that thrives in waves of big data challenges within Alibaba Group. Without getting your hands dirty on any code, you can quickly collect, consume, deliver, query, and analyze log data, therefore improve the operation, maintenance, and marketing efficiency, and gain the power of processing massive amounts of log data which is required in the DT age.

**Spring Cloud Release Train**

Spring Cloud Alibaba will work towards graduating from incubation to officially join a Spring Cloud Release Train sometime in 2019.