---
title: Spring Integration 4.3.1, 4.2.9, 4.1.9, 4.0.9 are available
source: https://spring.io/blog/2016/07/26/spring-integration-4-3-1-4-2-9-4-1-9-4-0-9-are-available
scraped: 2026-02-23T19:09:38.887Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  July 26, 2016 | 0 Comments
---

# Spring Integration 4.3.1, 4.2.9, 4.1.9, 4.0.9 are available

_Releases | Artem Bilan |  July 26, 2016 | 0 Comments_

Dear Spring community,

I’m pleased to announce that a number of Spring Integration `4.x.x` ([4.3.1](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10121&version=15576), [4.2.9](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10121&version=15577), [4.1.9](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10121&version=15459), [4.0.9](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10121&version=15400)) maintenance versions have been released. It’s strongly recommended for everyone to upgrade because these releases contain some important bug fixes and improvements.

We do not anticipate releasing more versions of the for `4.1.x` and `4.0.x` branches. If you use these in your projects, consider upgrading to `4.3.x` as soon as possible.

While you can find all the changes for `4.3.1` in its [Release Notes](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10121&version=15576), here are some highlights:

-   It is a foundation for upcoming Spring Boot 1.4 GA;
    
-   Routers can now resolve `channelKey` as a `Class<?>` correctly. Previously such a configuration produced the following exception:
    

MessagingException: unsupported return type for router \[class java.lang.Class\];

-   Messaging Gateway now supports `Message<?>` as return type for "receive-only" methods:
    
    @Gateway(replyChannel="ingestMessages") Message getMessage();
    

Previously such a configuration produced the following exception:

ClassCastException: java.lang.String cannot be cast to org.springframework.messaging.Message

-   Channel auto-creating and late binding improvements;
    
-   `IdempotentReceiverInterceptor` (as well as any `HandleMessageAdvice`) can now be configured as a part of `<request-handler-advice-chain>`, although it is applied to the `MessageHandler.handleMessage()` method;
    
-   And special thanks to good [Dr. Syer](https://spring.io/team/dsyer) for his valuable contribution, as usual. This time it was a new feature with `LockRegistryLeaderInitiator` to control leadership in your clustered application using Spring Integration distributed `LockRegistry` implementation, e.g. `JdbcLockRegistry`.
    

Next up: Spring Integration 5.0, based on Spring Framework 5.0 and some Reactive Streams support. Don’t miss [SpringOne Platform](https://springoneplatform.io/) conference the next week in Las Vegas to hear from us about all the new features and future plans!

[Project Page](http://projects.spring.io/spring-integration/) | [JIRA](https://jira.spring.io/browse/INT) | [Contributions](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.md) | [StackOverflow](http://stackoverflow.com) (`spring-integration` tag)