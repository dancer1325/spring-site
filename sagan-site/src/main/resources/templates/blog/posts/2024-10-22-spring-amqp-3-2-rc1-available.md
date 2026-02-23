---
title: Spring AMQP 3.2 RC1 Available
source: https://spring.io/blog/2024/10/22/spring-amqp-3-2-rc1-available
scraped: 2026-02-23T08:12:31.264Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  October 22, 2024 | 0 Comments
---

# Spring AMQP 3.2 RC1 Available

_Releases | Artem Bilan |  October 22, 2024 | 0 Comments_

On behalf of the team and everyone who contributed, I am pleased to announce the first Release Candidate for Spring AMQP `3.2` generation.

Some highlights of this release:

-   The server side retry logic (manual DLX) has been improved for a new `retry-count` header to make Spring AMQP compatible with recently released RabbitMQ `4.0.x`. The `MessageProperties.incrementRetryCount()` has to be called before re-publishing message to DLX. The previous logic based on the `x-death` header does not work anymore since RabbitMQ `4.0.x` ignored any `x-*` headers sent from the client;
-   More Open Telemetry semantic tags are exposed via Rabbit Listener and Template observations;
-   Some bugs and internal code improvement.

See more info in the [Release Notes](https://github.com/spring-projects/spring-amqp/releases/tag/v3.2.0-RC1).

In November we are planning to release GA. So, that is the last chance to give us feedback!

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-amqp/) | [GitHub Issues](https://github.com/spring-projects/spring-amqp/issues) | [Contributing](https://github.com/spring-projects/spring-amqp/blob/main/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-amqp)