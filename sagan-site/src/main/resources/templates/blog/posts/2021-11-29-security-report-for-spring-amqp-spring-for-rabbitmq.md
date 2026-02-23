---
title: Security Report for Spring AMQP (Spring for RabbitMQ)
source: https://spring.io/blog/2021/11/29/security-report-for-spring-amqp-spring-for-rabbitmq
scraped: 2026-02-23T13:03:01.745Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Gary Russell |  November 29, 2021 | 0 Comments
---

# Security Report for Spring AMQP (Spring for RabbitMQ)

_Engineering | Gary Russell |  November 29, 2021 | 0 Comments_

The recently released versions of Spring AMQP (2.4.0, 2.3.12, 2.2.20) contain a fix for [CVE-2021-22095](https://tanzu.vmware.com/security/cve-2021-22095), which can cause a potential `OutOfMemoryError` for very large messages.

Spring Boot version 2.6.0 and 2.5.7 will bring in the 2.4.0 and 2.3.12 versions of spring-amqp respectively. Users of Boot 2.4.x should override the `spring-amqp` and `spring-rabbit` versions to 2.3.12; users of Spring Boot 2.3.x should override the versions to 2.2.20.