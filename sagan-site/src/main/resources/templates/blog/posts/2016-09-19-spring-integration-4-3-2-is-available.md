---
title: Spring Integration 4.3.2 is Available
source: https://spring.io/blog/2016/09/19/spring-integration-4-3-2-is-available
scraped: 2026-02-23T19:04:38.484Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  September 19, 2016 | 0 Comments
---

# Spring Integration 4.3.2 is Available

_Releases | Artem Bilan |  September 19, 2016 | 0 Comments_

I’m pleased to announce that Spring Integration maintenance version `4.3.2` has been released. It is available in the [spring release repo](https://repo.spring.io/release) and [Maven Central](http://search.maven.org/#search%7Cga%7C1%7Cspring-integration-bom). It’s strongly recommended for everyone to upgrade because of the bug fixes and improvements contained in the release.

While you can find all the changes for `4.3.2` in its [Release Notes](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10121&version=15696), here are some highlights:

-   It is a foundation for upcoming Spring Boot 1.4.1;
    
-   The `RmiOutboundGateway` now can be supplied with `RmiProxyFactoryBeanConfigurer` to get access to underlying `RmiProxyFactoryBean` for customization, e.g. `ContextPropagatingRemoteInvocationFactory`;
    
-   Added `TcpConnectionFailedEvent` - An event emitted when a connection could not be established for some reason;
    
-   The `spring.integration.readOnly.headers` global integration property to let to exclude some headers from replying, e.g. undesired or incompatible `contentType`, populated by some transformers by default.
    

Right now we are busy with Spring Integration `5.0` and hope to have some Milestone 1 over a month or so with some Reactive Streams effort and absorbed [Spring Integration Java DSL](https://spring.io/blog/2016/09/15/java-dsl-for-spring-integration-1-2-milestone-2-is-available) for Java 8 code base.

Thanks everyone for their contribution. Looking forward for more!

[Project Page](http://projects.spring.io/spring-integration/) | [JIRA](https://jira.spring.io/browse/INT) | [Contributions](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.md) | [Help](http://stackoverflow.com/questions/tagged/spring-integration)