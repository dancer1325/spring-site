---
title: Spring Integration 6.5 Milestone 1 Available
source: https://spring.io/blog/2025/01/22/spring-integration-6-5-M1-released
scraped: 2026-02-23T07:55:10.478Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  January 22, 2025 | 0 Comments
---

# Spring Integration 6.5 Milestone 1 Available

_Releases | Artem Bilan |  January 22, 2025 | 0 Comments_

On behalf of the team and everyone who contributed, I am pleased to announce the firs Milestone of Spring Integration `6.5.0` generation.

In addition to dependency upgrades for their latest major/minor versions, this Milestone includes removals for previous deprecations.

Some notable changes so far are:

-   The Java DSL `controlBus()` operator is restored from the deprecated state, but now it does exactly the same what previously introduced `controlBusOnRegistry()`, which is deprecated now;
-   Previously, if a `MessageGroupProcessor` returns a collection of payloads, the `AbstractCorrelatingMessageHandler` has failed with the `IllegalArgumentException` stating that only collection of messages is possible.

From now on such a restriction is eliminated and returned collection of payloads is emitted as a single reply message from the aggregator;

-   The `AbstractMessageGroupStore` implementations now can be configured with a `LockRegistry`, which is used for all the non-atomic message store operations;
-   The `SourcePollingChannelAdapter` now can start a Mircometer observation;
-   A `discardIndividuallyOnExpiry` option for the `AbstractCorrelatingMessageHandler` can be set to `false` to emit the whole expired group as a single message into the discard channel;
-   The `org.eclipse.paho.client.mqttv3` dependency for the `spring-integration-mqtt` module is now `optional` - not everyone works with MQTT v3 protocol; the v5 might be a preference to choose.

See [What's New in 6.5](https://docs.spring.io/spring-integration/reference/6.5/whats-new.html) for more details.

Also a [Migration Guide](https://github.com/spring-projects/spring-integration/wiki/Spring-Integration-6.4-to-6.5-Migration-Guide) contains some breaking changes in this new version.

We also will start looking into Spring Integration `7.0` based on Spring Framework `7.0`. Don't hesitate to reach us out in GitHub issues for the the project with any feedback!

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/main/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration)