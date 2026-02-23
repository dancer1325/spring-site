---
title: Spring Integration 6.4 Goes GA and 6.3.6 & 6.2.11 Available
source: https://spring.io/blog/2024/11/20/spring-integration-6-4-goes-ga
scraped: 2026-02-23T08:05:51.995Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  November 20, 2024 | 0 Comments
---

# Spring Integration 6.4 Goes GA and 6.3.6 & 6.2.11 Available

_Releases | Artem Bilan |  November 20, 2024 | 0 Comments_

On behalf of the team and everyone who contributed, I am pleased to announce the General Availability for Spring Integration `6.4.0` generation.

In addition the regular bug fixes and dependency upgrades were release as Spring Integration `6.3.6` and `6.2.11`. The `6.2.11` is the last Open Source release. From now on updates to `6.2.x` generation are going to be available via Commercial Support only.

Along side with bug fixes, dependency upgrades and internal improvements, here are some notable new feature in version `6.4`:

-   The new Control Bus interaction model is implemented in the `ControlBusCommandRegistry`.

A new `ControlBusFactoryBean` class is recommended to be used instead of deprecated `ExpressionControlBusFactoryBean`

-   Also, a `ControlBusController` (together with an `@EnableControlBusController`) is introduced for managing exposed commands by the mentioned `ControlBusCommandRegistry`;
-   The SpEL evaluation infrastructure now supports configuration for `IndexAccessor`;
-   The outbound component `ZeroMqMessageHandler` (and respective API) can now bind a TCP port instead of connecting to a given URL.

Essentially, making it working as a server for the port folling regular ZeroMQ patterns;

-   The `DefaultSftpSessionFactory` now exposes a `Consumer<SshClient>` configurer property to further customize an internal `SshClient`;
-   The Python scripting support has been migrate to GraalVM Polyglot.

Now Python 3 language version can be used in your scripts. Plus all the benefits from third-party Python libraries;

-   The `RedisLockRegistry` can now be configured with a `TaskScheduler` for automatic locks renewal in the store;
-   The `SourcePollingChannelAdapterSpec` now can be configured with a custom `TaskScheduler`, e.g. for some `TaskDecorator` use-case;
-   The `@SpringIntegrationTest` can now be used for test classes hierarchy, including `@Nested` configuration;
-   The `ZipTransformer` now exposes a `fileNameGenerator` property to customize a target zip file (and optional zip entry) name generation;
-   The `BaseMessageBuilder` has been extracted for easier custom `MessageBuilderFactory` implementation, e.g. when we would like to mask some sensitive information from message headers whenever the message is logged.

See [What's New in 6.4](https://docs.spring.io/spring-integration/reference/6.4/whats-new.html) for more details.

Also a [Migration Guide](https://github.com/spring-projects/spring-integration/wiki/Spring-Integration-6.3-to-6.4-Migration-Guide) contains some breaking changes in this new version.

We are looking for any feedback on `6.4` to further improve the Framework and your experience for the next `6.5` generation planned in May 2025.

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/main/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration)