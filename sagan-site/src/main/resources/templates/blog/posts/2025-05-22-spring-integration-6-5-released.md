---
title: Spring Integration 6.5 GA Available
source: https://spring.io/blog/2025/05/22/spring-integration-6-5-released
scraped: 2026-02-23T07:41:04.823Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  May 22, 2025 | 0 Comments
---

# Spring Integration 6.5 GA Available

_Releases | Artem Bilan |  May 22, 2025 | 0 Comments_

On behalf of the team and everyone who contributed, I am pleased to announce the General Avalilability of Spring Integration `6.5.0` generation.

In addition, the `6.3.10` and `6.4.5` versions with bug fixes and dependency upgrades have been released.

Some notable changes in `6.5.0` are:

-   The `AbstractRecentFileListFilter` - the `FileListFilter` to accept only files which are recent according to the provided `age`;
-   The `AbstractMessageChannel` now emits a special `MessageDispatchingException` for the situation when message production is initiated too early;
-   The `PollerMetadata.sendTimeout` option has been removed (deprecated before) since it is out of use;
-   The Hazelcast CP-subsystem based components in the `spring-integration-hazelcast` module have been deprecated due to commercial support of the Hazelcast features (stating with `5.5.0`) we relied on;
-   The `LockRequestHandlerAdvice` to ensure exclusive access to the underlying service method call;
-   The `MessageChannel` no emits a special `MessageDispatchingException` when aplication context is not ready, e.g. not started yet or stopped at runtime;
-   The Java DSL `gateway()` operator now fully supports an `async(true)` behavior;
-   The `SourcePollingChannelAdapter` endpoint now starts a `CONSUMER` kind observation for the received message;
-   The `ReactiveRedisStreamMessageHandler` now exposes a `Function<Message<?>, RedisStreamCommands.XAddOptions>` to provide additional `XADD` option via convenient `RedisStreamCommands.XAddOptions` API;
-   Most of major/minor dependency upgrades.

See [What's New in 6.5](https://docs.spring.io/spring-integration/reference/6.5/whats-new.html) for more details.

Also a [Migration Guide](https://github.com/spring-projects/spring-integration/wiki/Spring-Integration-6.4-to-6.5-Migration-Guide) contains some breaking changes in this new version.

We are switching now to Spring Integration `7.0` based on Spring Framework `7.0`. Don't hesitate to reach us out in GitHub issues for the the project with any feedback!

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/main/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration)