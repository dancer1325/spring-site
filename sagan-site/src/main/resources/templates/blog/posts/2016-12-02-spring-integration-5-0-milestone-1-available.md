---
title: Spring Integration 5.0 Milestone 1 Available
source: https://spring.io/blog/2016/12/02/spring-integration-5-0-milestone-1-available
scraped: 2026-02-23T18:51:43.769Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  December 02, 2016 | 3 Comments
---

# Spring Integration 5.0 Milestone 1 Available

_Releases | Gary Russell |  December 02, 2016 | 3 Comments_

We are pleased to announce that the first milestone for the 5.0 version of Spring Integration is now available.

This is a new major version, based on [Spring Framework 5.0](https://spring.io/blog/2016/11/08/spring-framework-5-0-m3-released) and requires Java 8; this is the biggest change so far, but the following are also included:

-   The [Java DSL](https://github.com/spring-projects/spring-integration-java-dsl) is now rolled into the framework itself; there are some minor changes to the DSL, such as the removal of the `.handleWithAdapter()` methods and some general Factory classes. A complete discussion of the DSL changes can be found in the [Migration Guide](https://github.com/spring-projects/spring-integration/wiki/Spring-Integration-4.3-to-5.0-Migration-Guide).
    
-   Upgrade to [Spring Data Kay](https://spring.io/blog/2016/11/23/first-milestone-of-next-generation-spring-data-released).
    
-   Upgrade to [Spring AMQP 2.0](https://spring.io/blog/2016/11/30/spring-amqp-2-0-milestone-1-available).
    
-   First class support for TCP/UDP has been added to the DSL.
    
-   Spring Integration is now based on Reactor 3.0 and Messaging Gateway `Promise` methods now have to be changed to return `Mono`.
    
-   You can now configure mid-flow transactions via `TransactionHandleMessageAdvice` for `adviceChain` Messaging Annotations attribute and `<transactional>` sub-element when using XML configuration.
    

And of course another goal of this new Spring Integration generation is to add Reactive Streams support. Right now, it is represented by the `ReactiveChannel` and `ReactiveConsumer`. Also, all of the out-of-the-box `MessageHandler` s are now Reactive `Subscriber` s with the ability to process messages from an upstream `MessageChannel` including back-pressure support, when a `ReactiveConsumer` is used.

For complete information, see the [What’s new](http://docs.spring.io/spring-integration/docs/5.0.0.M1/reference/html/whats-new.html) in the reference manual and the [JIRA release notes](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10121&version=15594).

More new features & improvements and, of course, more Reactive Streams support in the upcoming milestones.

[Project Page](http://projects.spring.io/spring-integration/) | [JIRA](https://jira.spring.io/browse/INT) | [Contributions](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.md) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)