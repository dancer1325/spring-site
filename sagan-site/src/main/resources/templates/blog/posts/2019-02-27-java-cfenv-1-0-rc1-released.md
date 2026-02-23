---
title: java-cfenv 1.0 RC1 Released
source: https://spring.io/blog/2019/02/27/java-cfenv-1-0-rc1-released
scraped: 2026-02-23T14:56:53.297Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  February 27, 2019 | 0 Comments
---

# java-cfenv 1.0 RC1 Released

_Releases | Mark Pollack |  February 27, 2019 | 0 Comments_

The java-cfenv library is new library for accessing Cloud Foundry Services. For Spring Boot users, it extracts service credentials from the `VCAP_SERVICES` environment variable and sets well known Spring Boot auto-configuration properties.

In this release the following Cloud Foundry Services are supported

-   Databases - DB2, MySQL, Oracle, Postgresql, SqlServer
    
-   RabbitMQ
    
-   Cassandara
    
-   MongoDB
    
-   Redis
    

In 1.0 RC1 two other modules were introduced that contain support for Pivotal’s Spring Cloud Service and Single Sign on tiles. The `java-cfenv-boot-pivotal-scs` module provides support for Config Server and `java-cfenv-boot-pivotal-sso` module provides support for single sign on.

There is a new interface, [CfEnvProcessor](https://github.com/pivotal-cf/java-cfenv/blob/master/java-cfenv-boot/src/main/java/io/pivotal/cfenv/spring/boot/CfEnvProcessor.java) that simplifies what you need to write in order to provide integration with other Cloud Foundry services. The docs on [supporting other services](https://github.com/pivotal-cf/java-cfenv#supporting-other-services) has the details.

Thanks to [Scott Frederick](https://spring.io/team/scottfrederick) and [David Turanski](https://spring.io/team/dturanski) for their contributions!