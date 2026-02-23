---
title: Spring for Apache Pulsar 0.2.0 available now
source: https://spring.io/blog/2023/03/24/spring-for-apache-pulsar-0-2-0-available-now
scraped: 2026-02-23T09:59:29.301Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Chris Bono |  March 24, 2023 | 0 Comments
---

# Spring for Apache Pulsar 0.2.0 available now

_Releases | Chris Bono |  March 24, 2023 | 0 Comments_

On behalf of the team and everyone who has contributed, I’m happy to announce that Spring for Apache Pulsar `0.2.0` has been released and is now available from [Maven Central](https://repo1.maven.org/maven2/org/springframework/pulsar/spring-pulsar-spring-boot-starter/0.2.0).

This is the second GA minor release of the framework. Although `0.2.0` still lives in the experimental Spring projects it is in the process of moving into the main Spring projects as follows:

-   The core will move into spring-projects/spring-pulsar (targeting mid-April)
-   The autoconfiguration will move into spring-projects/spring-boot (targeting the Spring Boot `3.2.0` release)
-   The binder will move into spring-cloud/spring-cloud-stream (targeting the SCSt `4.1.0` release)

## [](#notable-changes)Notable Changes

We have been busy adding features since our [last blog](https://spring.io/blog/2022/12/15/spring-for-apache-pulsar-0-1-0-available-now). Notable new features include:

-   Spring Boot `3.0.5`
-   Apache Pulsar `2.11.0`
-   Apache Pulsar Reactive client `0.2.0`
-   Spring Cloud Stream Pulsar binder (AOT enabled)
-   Pulsar IO / Pulsar Functions support
-   Pulsar header mapper (w/ encoding and filtering)
-   Default type mappings (topics + schema info)
-   Pulsar Reader support
-   Tombstone support

Please see the [release notes](https://github.com/spring-projects-experimental/spring-pulsar/releases/tag/0.2.0) for more detail.

A great place to get started is the [Quick Tour](https://docs.spring.io/spring-pulsar/docs/0.2.0/reference/html/#quick-tour) in the reference docs.

### [](#how-can-you-help)How can you help?

If you're interested in helping out, check out the ["ideal for contribution" tag](https://github.com/spring-projects-experimental/spring-pulsar/labels/status%3A%20ideal-for-contribution) in the issue repository. If you have general questions, please ask on Stack Overflow using the [`spring-pulsar` tag](https://stackoverflow.com/tags/spring-pulsar).

[GitHub](https://github.com/spring-projects-experimental/spring-pulsar) | [Issues](https://github.com/spring-projects-experimental/spring-pulsar/issues) | [Documentation](https://docs.spring.io/spring-pulsar/docs/0.2.0/reference/html) | [Stack Overflow](https://stackoverflow.com/tags/spring-pulsar)