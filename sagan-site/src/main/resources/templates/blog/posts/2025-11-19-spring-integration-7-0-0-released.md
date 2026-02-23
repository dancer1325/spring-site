---
title: Spring Integration 7.0.0 Available
source: https://spring.io/blog/2025/11/19/spring-integration-7-0-0-released
scraped: 2026-02-22T22:10:39.364Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  November 19, 2025 | 0 Comments
---

# Spring Integration 7.0.0 Available

_Releases | Artem Bilan |  November 19, 2025 | 0 Comments_

On behalf of the team and everyone who contributed, I am pleased to announce the General Availability of the Spring Integration `7.0.0` generation.

In addition, the `6.5.4` and `6.4.9` versions with bug fixes and dependency upgrades have been released.

Some notable changes in `7.0.0`:

-   Nullability via JSpecify;
-   Jackson 3 Support;
-   Migration to Spring Core Retry;
-   Channel Adapters for AMQP `1.0` based on Spring AMQP `4.0`;
-   The directory to scan in the `FileReadingMessageSource` can now be configured as an expression to be evaluated at runtime on each scan call;
-   The `MESSAGE_BYTES` SQL column for message store tables has been renamed to the `MESSAGE_CONTENT` as with some implementation the message serialization is not always byte array;
-   All the Spring Integration modules now follow the standard package structure: components has been moved to `input` or `output` packages according to their purpose;
-   The `ScatterGatherHandler` now fully support `async` mode emiting a `Mono` for reply processing;
-   The `DistributedLock` abstraction with API to supply a Time-To-Live option;
-   The Java DSL implementation for JDBC channel adapters;
-   SMB module has been updated to JCIFS `3.0.0`.

See [What's New in 7.0](https://docs.spring.io/spring-integration/reference/7.0/whats-new.html#whats-new-part) for more details.

Also a [Migration Guide](https://github.com/spring-projects/spring-integration/wiki/Spring-Integration-6.x-to-7.0-Migration-Guide) contains some breaking changes in this new version.

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/main/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration)