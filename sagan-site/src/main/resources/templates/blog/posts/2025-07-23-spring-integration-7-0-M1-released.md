---
title: Spring Integration 7.0 Milestone 1 Available
source: https://spring.io/blog/2025/07/23/spring-integration-7-0-M1-released
scraped: 2026-02-23T07:35:10.005Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  July 23, 2025 | 0 Comments
---

# Spring Integration 7.0 Milestone 1 Available

_Releases | Artem Bilan |  July 23, 2025 | 0 Comments_

On behalf of the team and everyone who contributed, I am pleased to announce the First Milestone of Spring Integration `7.0.0` generation. For convenience, the `7.0.0-M1` artifacts are also available in Maven Central.

In addition, the `6.5.1` and `6.4.6` versions with bug fixes and dependency upgrades have been released.

Some notable changes in `7.0.0` are:

-   Compilation with Java 24 while maintaining Java 17 compatibility helps us spot some bugs, not only in the code but also in the JavaDocs;
-   The Nullability via JSpecify and Nullaway is being implemented in the project. More fixes still have to be done, though;
-   Jackson 3 is now supported. Jackson 2 is now marked for deprecation. See JavaDocs of deprecated classes for migration path;
-   A new `DistributedLock` abstraction has been introduced with an API to set time-to-live per lock instance;
-   The classes previously deprecated in `spring-integration-hazelcast` are now removed. Please, consult with Hazelcast about their commercial support;
-   The classes for JUnit 4 support have been deprecated. See their JavaDocs about migration path to JUnit Jupiter;
-   A Java DSL API has been added to `spring-integration-jdbc` module via its dedicated `org.springframework.integration.jdbc.dsl.Jdbc` factory;
-   Many major/minor dependency upgrades.

In addition, I would like to appreciate tremendous community contributions from [Eddie Cho](https://github.com/EddieChoCho), [Anayonkar Shivalkar](https://github.com/anayonkars), [Jooyoung Pyoung](https://github.com/anthologia), [Jooyoung Pyoung](https://github.com/mjd507) and [Ruslan Stelmachenko](https://github.com/xak2000) who helped us with all those Nullability and Jackson 3 migrations. We are looking forward for more in upcoming milestones!

Also, please welcome new Spring Intergation team member, our old friend, [Glenn Renfro](https://spring.io/authors/cppwfs)!

See [What's New in 7.0](https://docs.spring.io/spring-integration/reference/7.0/whats-new.html#whats-new-part) for more details.

Also a [Migration Guide](https://github.com/spring-projects/spring-integration/wiki/Spring-Integration-6.x-to-7.0-Migration-Guide) contains some breaking changes in this new version.

We are looking forward to meet Community at [Spring One this August](https://www.vmware.com/explore/us/springone). Don't hesitate to reach us out in GitHub issues for the project with any feedback!

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/main/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration)