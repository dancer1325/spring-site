---
title: Spring Cloud for Alibaba 0.2.1 released
source: https://spring.io/blog/2018/12/21/spring-cloud-for-alibaba-0-2-1-released
scraped: 2026-02-23T15:03:49.790Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  December 21, 2018 | 0 Comments
---

# Spring Cloud for Alibaba 0.2.1 released

_Releases | Spencer Gibb |  December 21, 2018 | 0 Comments_

**NOTE: This is a guest post from our friends at Alibaba.**

Hello everyone! Today, we’re very excited to announce that the 0.2.1.RELEASE of Spring Cloud Alibaba is available now.

Release highlights:

-   Added two new modules to Spring Cloud Alibaba: spring-cloud-alibaba-schedulerx and spring-cloud-stream-binder-rocketmq.
-   Added some new features in spring-cloud-alibaba-nacos and spring-cloud-alibaba-sentinel.
-   Fixed some bugs in the previous version.

Notes:

-   The Spring Cloud Alibaba project is a community project maintained by Alibaba.
    
-   The 0.2.1.RELEASE is compatible with Spring Cloud Finchley. Also included in this version is a 0.1.1.RELEASE, which is compatible with Spring Cloud Edgware. 0.1.1.RELEASE also contains the components and features that are new in 0.2.1.
    

### [](#spring-cloud-stream-binder-rocketmq)Spring Cloud Stream Binder RocketMQ

-   Implements the message abstraction of Spring Cloud Stream API.
-   Includes support for transaction messages.
-   Includes support for filtering messages with tags and SQL expressions on the consumer side, as well as ordered, concurrent, and broadcast message consumption.

### [](#spring-cloud-alibaba-cloud-schedulerx)Spring Cloud Alibaba Cloud SchedulerX

-   Provides accurate, highly reliable, and highly available scheduled job scheduling services with response time within seconds.
-   Supports a rich set of job execution models, including stand-alone execution, broadcast execution, and distributed subjobs execution.

### [](#spring-cloud-alibaba-nacos-config)Spring Cloud Alibaba Nacos Config

-   Upgraded Nacos Client version to 0.6.1.
-   Added support for getting and listening for configurations from multiple dataids and groupids and setting priorities based on the combination of dataids and groupids.

### [](#spring-cloud-alibaba-nacos-discovery)Spring Cloud Alibaba Nacos Discovery

-   Upgraded Nacos Client version to 0.6.1.
-   Added support for setting the service instance to the unavailable state on the Nacos Console so that the service is automatically filtered out during service discovery.
-   Added support for ignoring the local cache when initializing service discovery.

### [](#spring-cloud-alibaba-sentinel)Spring Cloud Alibaba Sentinel

-   Added support for Feign so that it is now compatible with all @FeignClient properties, including `fallback` and `fallbackFactory`.
-   Added support for parameter flow control and cluster flow control.
-   Refactored the design of the `ReadableDataSource` to provide a more user-friendly way to configure persistent Sentinel rules.
-   Optimized the post-processing mechanism of Sentinel after `RestTemplate` is degraded.
-   Added some properties corresponding to the Sentinel configuration information, such as log directory and log file name.

## [](#whats-next)What's Next?

**Spring Cloud Alibaba Cloud SLS**, a one-stop service for log management, is a proven tool that thrives in waves of big data challenges within Alibaba Group. Without getting your hands dirty on any code, you can quickly collect, consume, deliver, query, and analyze log data, thereby improving the operation, maintenance, and marketing efficiency and gaining the power of processing massive amounts of log data, which is required in the DT age.

**Spring Cloud Alibaba Dubbo** Dubbo is a popular open source RPC framework. We will integrate Dubbo into Spring Cloud Alibaba so that you can enjoy the convenience of Spring Cloud when developing Dubbo applications.