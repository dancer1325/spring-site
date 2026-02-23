---
title: Spring Session for Apache Geode/Pivotal GemFire 2.0.8.RELEASE Available!
source: https://spring.io/blog/2019/02/04/spring-session-for-apache-geode-pivotal-gemfire-2-0-8-release-available
scraped: 2026-02-23T14:59:04.553Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | John Blum |  February 04, 2019 | 0 Comments
---

# Spring Session for Apache Geode/Pivotal GemFire 2.0.8.RELEASE Available!

_Engineering | John Blum |  February 04, 2019 | 0 Comments_

I am pleased to announce *Spring Session for Apache Geode & Pivotal GemFire* (SSDG) `2.0.8.RELEASE`.

SSDG [builds on](https://github.com/spring-projects/spring-session-data-geode/blob/2.0.8.RELEASE/gradle.properties#L11-L19) *Spring Session* `2.0.9.RELEASE`, *Spring Data* `Kay-SR13` and *Spring Framework* `5.0.12.RELEASE` along with Apache Geode `1.2.1` and Pivotal GemFire `9.1.1`. Additionally, SSDG `2.0.8.RELEASE` is compatible with *Spring Boot* `2.0.x` based applications.

This release pulls in many enhancements from the `2.1.x` release branch along with a few minor fixes. Highlights include:

1.  Prevent saving non-dirty Sessions ([Issue-12](https://github.com/spring-projects/spring-session-data-geode/issues/12)). This primarily protects against Apache Geode/Pivotal GemFire bug [GEODE-6032](https://issues.apache.org/jira/browse/GEODE-6032).
    
2.  Standardize all logging on SLF4J ([Issue-18](https://github.com/spring-projects/spring-session-data-geode/issues/18)).
    
3.  Fixed bug involving incorrect synchronization lock on Session attributes passed down from the Session object on creation.
    
4.  Fixed bug involving *Data Serialization* to properly identify when a user uses a custom *DataSerializer* to de/serialize the Session.
    

### [](#spring-session-for-apache-geodepivotal-gemfire-20x-end-of-life-eol-announcement)[](#spring-session-for-apache-geode-pivotal-gemfire-code-2-0-x-code-end-of-life-eol-announcement)Spring Session for Apache Geode/Pivotal GemFire `2.0.x` End-of-Life (EOL) Announcement

Given the [recent announcement](https://spring.io/blog/2019/01/10/spring-data-lovelace-sr4-kay-sr13-and-ingalls-sr18-released#spring-data-1-x-and-2-0-x-end-of-life-eol) for the EOL of *Spring Data* `Kay`, so too will SSDG `2.0.x` reach it’s EOL around the same timeframe (end of March/April).

I will tentatively plan for 1 additional release (i.e. SSDG `2.0.9.RELEASE`) if either SD `Kay-SR14` is or *Spring Session* `2.0.10.RELEASE` is released.

Afterwards, all users are encouraged to upgrade to SSDG `2.1`, based on Apache Geode `1.6` and Pivotal GemFire `9.5` along with *Spring Session* `2.1`, *Spring Data* `Lovelace` and *Spring Framework* `5.1`. SSDG `2.1` is compatible with *Spring Boot* `2.1`.

### [](#feedback-welcome)[](#feedback-welcome)Feedback Welcome

As always, any feedback on the new release via the usual channels is always greatly appreciated.

[Issues](https://github.com/spring-projects/spring-session-data-geode/issues) | [PR](https://github.com/spring-projects/spring-session-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-session)

Thank you!