---
title: Java CFEnv 1.1 GA Released
source: https://spring.io/blog/2019/06/19/java-cfenv-1-1-ga-released
scraped: 2026-02-23T14:43:39.560Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  June 19, 2019 | 0 Comments
---

# Java CFEnv 1.1 GA Released

_Releases | Mark Pollack |  June 19, 2019 | 0 Comments_

On behalf of the Java CFEnv community I am happy to announce the release of Java CFEnv 1.1 GA.

This release add support for the following services:

-   Volume Services
    
-   Pivotal Single Sign-On Service
    
-   Pivotal Redis Service
    

It also adds the following functionality:

-   Checks the classpath to correctly determine setting of MySQL or MariaDB driver class name.
    
-   When using the Spring Boot support, an exception is thrown if the Spring Cloud Connector library is on the classpath. This applies only for the following services: DataSource, RabbitMQ, Cassandra, MongoDB, and Redis. The exception message indicates to set the environment variable `JBP_CONFIG_SPRING_AUTO_RECONFIGURATION '{enabled: false}'`
    
-   Support for Boot 1.5.x by copying a logging utility class into the project.
    

The 1.1 GA release is available in maven central through the dependency

```
Copy<dependency>
  <groupId>io.pivotal.cfenv</groupId>
  <artifactId>java-cfenv-boot</artifactId>
  <version>1.1.0.RELEASE</version>
</dependency>
```

The project [README](https://github.com/pivotal-cf/java-cfenv/blob/master/README.adoc) has more information.

## [](#background)[](#background)Background

For those who may have missed the [first release announcement](https://spring.io/blog/2019/02/15/introducing-java-cfenv-a-new-library-for-accessing-cloud-foundry-services), the Java CFEnv library allows you to easily access environment variables set when deploying an application to Cloud Foundry. It is modeled after the design of the library [node-cfenv](https://github.com/cloudfoundry-community/node-cfenv/) and other `*-cfenv` libraries in the Cloud Foundry ecosystem.

The library also sets common application properties in Spring Boot so that Java objects such as the `DataSource` or the `RabbitConnectionFactory` are created using Spring Boot auto-configuration. It is a replacement for the Spring Cloud Connectors library which is now is maintenance mode.