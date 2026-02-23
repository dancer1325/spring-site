---
title: Spring AMQP 2.0.0 Milestone 5 is Available
source: https://spring.io/blog/2017/07/24/spring-amqp-2-0-0-milestone-5-is-available
scraped: 2026-02-23T16:22:45.159Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  July 24, 2017 | 0 Comments
---

# Spring AMQP 2.0.0 Milestone 5 is Available

_Releases | Artem Bilan |  July 24, 2017 | 0 Comments_

I am pleased to announce that the [Milestone 5](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10450&version=15857) of Spring AMQP 2.0 is now available in the [Spring milestone repository](https://repo.spring.io/milestone/).

Features and fixes since [the last milestone](https://spring.io/admin/blog/2918-spring-amqp-2-0-0-milestone-4-is-available):

-   Log4j2 `AmqpAppender` is now thread-safe;
    
-   `DefaultMessagePropertiesConverter` now correctly passes arrays for the header values to the AMQP Client library;
    
-   `Jackson2JsonMessageConverter` can now be configured for the `trustedPackages` to fix violation for [Jackson Serialization Gadgets](https://pivotal.io/security/cve-2017-4995);
    
-   `RabbitAdmin` operations can now be performed on the same AMQP channel as a unit of work via `RabbitTemplate.invoke()`;
    
-   `PossibleAuthenticationFailureException` can now be treated as a non-fatal via particular option on the `AbstractMessageListenerContainer`;
    
-   `RepublishMessageRecoverer` can now be configured for the `deliveryMode` for messages to republish.
    

Thanks to all the community member for their feedback and contributions!

The release candidate is expected to be released in the end of August with the GA shortly after the Spring Framework 5.0 GA release in the September.

For a complete list of changes in 2.0, see [What’s New in the reference manual](http://docs.spring.io/spring-amqp/docs/2.0.0.M5/reference/html/_introduction.html#_changes_in_2_0_since_1_7).

[Project Page](http://projects.spring.io/spring-amqp/) | [JIRA](https://jira.spring.io/browse/AMQP) | [Contributing](https://github.com/spring-projects/spring-amqp/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-amqp) | [Chat](https://gitter.im/spring-projects/spring-amqp)