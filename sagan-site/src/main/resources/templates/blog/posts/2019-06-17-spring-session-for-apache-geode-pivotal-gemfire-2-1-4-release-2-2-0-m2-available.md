---
title: Spring Session for Apache Geode & Pivotal GemFire 2.1.4.RELEASE & 2.2.0.M2 Available
source: https://spring.io/blog/2019/06/17/spring-session-for-apache-geode-pivotal-gemfire-2-1-4-release-2-2-0-m2-available
scraped: 2026-02-23T14:44:26.041Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | John Blum |  June 17, 2019 | 0 Comments
---

# Spring Session for Apache Geode & Pivotal GemFire 2.1.4.RELEASE & 2.2.0.M2 Available

_Releases | John Blum |  June 17, 2019 | 0 Comments_

On behalf of the Spring and Apache Geode communities, it is my pleasure to announce the release of *Spring Session for Apache Geode and Pivotal GemFire* (SSDG) `2.1.4.RELEASE` and `2.2.0.M2` releases.

Both SSDG `2.1.4.RELEASE` and `2.2.0.M2` now support the ability to turn off client subscriptions. No longer does SSDG require client subscriptions to be enabled to use either Apache Geode or Pivotal GemFire to manage your HTTP Session state. However, if client subscriptions are not explicitly enabled, then the client will no longer receive notifications of Session events that may have originated from other clients accessing the same (HTTP) Session. This is entirely possible in a load balanced, non-sticky Session, environment.

Additionally, SSDG `2.2.0.M2` adds a new Session event, the `SessionChangedEvent`, to notify "interested" clients anytime the Session state changes, e.g. is updated. Session change events are not actually part of Spring Session core, but is a feature supported by Apache Geode & Pivotal GemFire. This may be useful in situations where a client would like to know if the Session state changed, especially in a highly concurrent environment. Of course, this only works if client subscriptions are enabled.

As reminder, you can enable client subscriptions using the following configuration:

Enabling Client Subscriptions on the "DEFAULT" Pool

```
Copy@ClientCacheApplication(subscriptionEnabled = true)
@EnableGemFireHttpSession(poolName = "DEFAULT")
class SpringSessionUsingApacheGeodeConfiguration { ... }
```

Additionally, if you have configured an dedicated, named connection `Pool` for use by SSDG, then your configuration would look similar to:

Enabling Client Subscriptions on targeted Pool

```
Copy@ClientCacheApplication
@EnablePool(name = "SessionPool", subscriptionEnabled = true)
@EnableGemFireHttpSession(poolName = "SessionPool")
class SpringSessionUsingApacheGeodeConfiguration { ... }
```

SSDG `2.1.4.RELEASE` bit are available in *Maven Central* and SSDG `2.2.0.M2` bits are available in the Spring `libs-milestone` repository.

Additionally, both releases will be picked up in the upcoming Spring Boot `2.1.6.RELEASE` and Spring Boot `2.2.0.M4` release, respectively.

## [](#feedback)[](#ssdg-feedback)Feedback

As always feedback is appreciated and welcomed. Please try out the new bits and let us know what you think.

[Issues](https://github.com/spring-projects/spring-session-data-geode/issues) | [PR](https://github.com/spring-projects/spring-session-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-session)