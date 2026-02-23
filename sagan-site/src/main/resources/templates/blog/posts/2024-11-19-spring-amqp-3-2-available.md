---
title: Spring AMQP 3.2 Goes GA and 3.1.8 Available
source: https://spring.io/blog/2024/11/19/spring-amqp-3-2-available
scraped: 2026-02-23T08:06:43.890Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  November 19, 2024 | 0 Comments
---

# Spring AMQP 3.2 Goes GA and 3.1.8 Available

_Releases | Artem Bilan |  November 19, 2024 | 0 Comments_

On behalf of the team and everyone who contributed, I am pleased to announce the General Availability for Spring AMQP `3.2` generation. It can be used directly from Maven Central and will be included into upcoming Spring Boot `3.4`.

The version `3.1.8` includes some bug fixes and dependency updates. This is the last Open Source version. From now on fixes into `3.1.x` generation will be available only via commercial support.

Some notable changes in `3.2` release:

-   The server side retry logic (manual DLX) has been improved for a new `retry-count` header to make Spring AMQP compatible with recently released RabbitMQ `4.0.x`.

The `MessageProperties.incrementRetryCount()` has to be called before re-publishing message to DLX. The previous logic based on the `x-death` header does not work anymore since RabbitMQ `4.0.x` ignored any `x-*` headers sent from the client;

-   More Open Telemetry semantic tags are exposed via Rabbit Listener and Template observations;
-   The Consistent Hash exchange declaration API.

See more info in the [Release Notes](https://github.com/spring-projects/spring-amqp/releases/tag/v3.2.0).

Many thanks to community for feedback and prompt fixes!

Next year we are going to concentrate on new `4.0` generation.

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-amqp/) | [GitHub Issues](https://github.com/spring-projects/spring-amqp/issues) | [Contributing](https://github.com/spring-projects/spring-amqp/blob/main/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-amqp)