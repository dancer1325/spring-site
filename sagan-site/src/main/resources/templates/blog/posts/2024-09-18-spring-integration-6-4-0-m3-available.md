---
title: Spring Integration 6.4.0-M3 Available
source: https://spring.io/blog/2024/09/18/spring-integration-6-4-0-m3-available
scraped: 2026-02-23T08:10:37.159Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  September 18, 2024 | 0 Comments
---

# Spring Integration 6.4.0-M3 Available

_Releases | Artem Bilan |  September 18, 2024 | 0 Comments_

On behalf of the team and everyone who contributed, I am pleased to announce the third Milestone for Spring Integration `6.4.0` generation.

In addition the regular bug fixes and dependency upgrades were release as Spring Integration `6.3.4` and `6.2.9`.

Here are some notable improvements and new features in Spring Integration 6.4:

-   First class support for `IndexAccessor` from SpEL and `JsonIndexAccessor` implementation (shout out to [Sam Brannen](https://spring.io/authors/sbrannen) for contribution);
-   Performance and memory improvements for dynamic integration flow registrations;
-   Control Bus Management via `ControlBusCommandRegistry` and deprecation for SpEL-based (and Groovy) Control Bus components;
-   The `ControlBusController` at `/control-bus` to expose an endpoint for Control Bus Management via REST API;
-   Fix `JdbcMetadataStore` for PostgreSQL and MySQL (and cover with respective tests);
-   Introduce an `MqttMessageNotDeliveredEvent` to be emitted from the `MqttActionListener.onFailure()` callback.

See [What's New in 6.4](https://docs.spring.io/spring-integration/reference/6.4/whats-new.html) for more details.

Also a [Migration Guide](https://github.com/spring-projects/spring-integration/wiki/Spring-Integration-6.3-to-6.4-Migration-Guide) contains some breaking changes in this new version.

We are looking for any feedback on `6.4` generation to further improve the Framework and your experience in upcoming release candidate in October.

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/main/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration)