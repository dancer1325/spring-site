---
title: Java CFEnv 1.1.0.RC1 Released
source: https://spring.io/blog/2019/06/12/java-cfenv-1-1-0-rc1-released
scraped: 2026-02-23T14:45:07.954Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  June 12, 2019 | 0 Comments
---

# Java CFEnv 1.1.0.RC1 Released

_Releases | Mark Pollack |  June 12, 2019 | 0 Comments_

## [](#introduction)[](#introduction)Introduction

On behalf of the community I am happy to announce the release of Java CFEnv 1.1 RC1.

The RC1 release adds the following functionality:

-   Checks the classpath to correctly determine setting of MySQL or MariaDB driver class name.
    
-   When using the Boot support, an exception is thrown if the Spring Cloud Connector library is on the classpath. This applies only for the following services: DataSource, RabbitMQ, Cassandra, MongoDB, and Redis. The exception message indicates to set the environment variable `JBP_CONFIG_SPRING_AUTO_RECONFIGURATION '{enabled: false}'`
    
-   Support for Boot 1.5.x by copying a logging utility class into the project.
    

The project [README](https://github.com/pivotal-cf/java-cfenv/blob/master/README.adoc) has more information.

The GA release is planned for next week. Please try it out and give feedback on our [github issues](https://github.com/pivotal-cf/java-cfenv/issues) page.