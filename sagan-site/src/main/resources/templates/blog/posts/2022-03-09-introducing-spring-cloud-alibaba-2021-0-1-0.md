---
title: Introducing Spring Cloud Alibaba 2021.0.1.0
source: https://spring.io/blog/2022/03/09/introducing-spring-cloud-alibaba-2021-0-1-0
scraped: 2026-02-23T12:48:19.161Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  March 09, 2022 | 2 Comments
---

# Introducing Spring Cloud Alibaba 2021.0.1.0

_Releases | Spencer Gibb |  March 09, 2022 | 2 Comments_

Hi, Spring fans! Today, we are excited to announce the availability of Spring Cloud Alibaba 2021.0.1.0! Spring Cloud Alibaba provides a one-stop solution for distributed application development. It contains all the components required to develop distributed applications, making it easy for you to develop your applications using Spring Cloud. With Spring Cloud Alibaba, you need only add some annotations and a small amount of configuration to connect Spring Cloud applications to the distributed solutions of Alibaba and build a distributed application system with Alibaba middleware.

**NOTE:** *The Spring Cloud Alibaba project is a community project maintained by Alibaba.* ​

### [](#introducing-spring-cloud-alibaba-2021010)Introducing Spring Cloud Alibaba 2021.0.1.0

[Spring Cloud 2021.0.1](https://spring.io/blog/2022/02/18/spring-cloud-2021-0-1-has-been-released) and [Spring Boot 2.6.3](https://spring.io/blog/2022/01/20/spring-boot-2-6-3-is-now-available). Major upgrades have been made to many components, including the registration configuration center, distributed messages, flow control, and others. ​

-   [**Nacos**](https://github.com/alibaba/nacos): Upgrade the Nacos client to version 1.4.2, fix the related problems in Nacos 1.4.1, and support the Nacos service discovery failure and fault tolerance.
-   [**RocketMQ**](https://github.com/apache/rocketmq): Upgraded to 4.9.2, and the separate branch of RocketMQ in the previous project has been integrated into the main branch of the project. It is now released and iterated along with the major version, so that users can directly use the batch messages and asynchronous support newly supported by RocketMQ in the latest Spring Cloud Alibaba. There are many new features, such as message callback processing and the specified consumption start bit in Push mode.
-   [**Sentinel**](https://github.com/alibaba/Sentinel): Upgraded to 1.8.3. In addition to fixing some problems in previous versions, it also provides flexible flow control rules capabilities for FeignClient, supports the configuration of default fuse rules for the global FeignClient, supports the configuration of specific flow control rules for a single FeignClient, and supports configuring flow control rules and other capabilities for a single method.
-   **Spring Boot:** On the basis of Spring Boot 2.6.3, the application configuration method of spring.config.import is supported, which is convenient for users to configure and use the Nacos configuration center in the application in a more friendly way.

​ In addition to component upgrades, many problems existing in previous versions have also been fixed, further improving the stability and robustness of Spring Cloud Alibaba. For more information, see the release notes. For upgrade steps and usage examples of new features, see [https://github.com/alibaba/spring-cloud-alibaba/blob/2021.x/spring-cloud-alibaba-docs/src/main/asciidoc/sca-upgrade-guide.adoc](https://github.com/alibaba/spring-cloud-alibaba/blob/2021.x/spring-cloud-alibaba-docs/src/main/asciidoc/sca-upgrade-guide.adoc). ​ ​

### [](#explanation-of-the-new-version-number)Explanation of the new version number

Since the Spring Cloud version number has undergone a round of changes from the London Underground station name to the naming method beginning with the year, we have found that users inside and outside the community are often confused about the correspondence between Spring Cloud Alibaba and Spring Cloud version numbers. To make it easier for everyone to know the corresponding Spring Cloud version when using Spring Cloud Alibaba in the future, after the discussion among the contributor members of the community at the biweekly meeting, it was decided that, starting from 2021.0.1.0, the Spring Cloud Alibaba version will correspond to the Spring Cloud version. The first three are the Spring Cloud version, and the last one is the extended version. For example, the version number of the first version of Spring Cloud Alibaba corresponding to Spring Cloud 2021.0.1 is 2021.0. 1.0, the second one is 2021.0.1.1. ​ ​

### [](#in-future)In future

After more than three years of rapid development and close cooperation and exchanges with the Spring community, Spring Cloud Alibaba has released a total of [27 versions](https://github.com/alibaba/spring-cloud-alibaba/releases). The number of stars on GitHub has exceeded 21,400, the number of forks has reached 6,600, and the number of users has reached 21k, which means that Spring Cloud Alibaba has become one of the most popular microservices frameworks in China. In the future, Spring Cloud Alibaba will continue to align with the development and evolution of the mainstream versions of Spring Cloud. In the near future, it will support the iteration of Spring Cloud Alibaba [2021.x](https://github.com/alibaba/spring-cloud-alibaba/tree/2021.x) and [2.2.X](https://github.com/alibaba/spring-cloud-alibaba/tree/2.2.x), corresponding to the two current mainstream versions of Spring Cloud 2021.x.x and Hoxton. Apart from that, the community will continue to work hard on the stability and ease of use of components, such as Nacos, Sentinel, and RocketMQ in Alibaba's microservices solutions for Spring Cloud applications, and provide open-source Service Contracts, Label Routing, Grayscale Release, and others for Spring Cloud applications. We support efforts in microservices governance, and we welcome interested friends to join us and do some interesting things together! ​ ​