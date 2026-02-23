---
title: Spring Integration 4.3 M1 is Available
source: https://spring.io/blog/2016/02/17/spring-integration-4-3-m1-is-available
scraped: 2026-02-23T19:18:22.045Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  February 17, 2016 | 0 Comments
---

# Spring Integration 4.3 M1 is Available

_Releases | Artem Bilan |  February 17, 2016 | 0 Comments_

On behalf of the Spring Integration team I’m happy to announce the **First Milestone** of the Spring Integration 4.3 release.

4.3 is planned to be only a minor release with a few new features and improvements over 4.2 and will close out the 4.x line. Meanwhile we are looking forward to embrace the [Reactive Foundation for the JVM](https://spring.io/blog/2016/02/16/reactor-2-5-a-second-generation-reactive-foundation-for-the-jvm) in Spring Integration 5.0. We have yet to determine exactly what that means, so stay tuned! In addition, 5.0 (2017) will include the (currently separate) [Spring Integration Java DSL](https://github.com/spring-projects/spring-integration-java-dsl).

We plan on finalizing 4.3 over the next few months before switching our attention full-time to 5.0 so, if there is some **must have** feature you need before next year; speak up now via JIRA or GitHub Issues.

Anyway, I'd like to highlight some improvements in this Spring Integration 4.3 milestone:

-   The `negate` option for the `HeaderMapper`s to allow to exclude request and/or reply headers just with logical NOT `!`. (e.g. `*,!foo` - map all headers except `foo`).
-   `Exception` superclass mappings for the `ErrorMessageExceptionTypeRouter` to avoid mapping duplications for different inheritors.
-   `null` Remote Directory support for the `list()` and `listNames()` functions in the FTP adapters to meet the standard FTP protocol support for client current working directory .
-   An option to change the direction of Redis List Push/Pop operations in the Redis Queue Adapters.
-   `FileWritingMessageHandler` *sub-path* support in the file name to allow to restore the directory structure locally, e.g. after [unzipping](https://spring.io/blog/2016/01/12/spring-integration-zip-1-0-0-m1-and-others).
-   Upgrade to Smack-4.1.x.
-   And, of course, upgrade to [Spring Amqp 1.6](https://spring.io/blog/2016/02/16/spring-amqp-1-6-0-milestone-1-and-1-5-4-available) with support for its new features like Delayed Message Exchange!

Please, consult the [Release Notes](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10121&version=15396) and [What's New](http://docs.spring.io/spring-integration/docs/4.3.0.M1/reference/html/whats-new.html) for complete information about the included changes.

[Project Page](http://projects.spring.io/spring-integration/) | [JIRA](https://jira.spring.io/browse/INT) | \[Contributions\] ([https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.md](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.md)) | [StackOverflow](http://stackoverflow.com) (`spring-integration` tag)