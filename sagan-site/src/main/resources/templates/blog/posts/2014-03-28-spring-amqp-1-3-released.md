---
title: Spring AMQP 1.3 Released
source: https://spring.io/blog/2014/03/28/spring-amqp-1-3-released
scraped: 2026-02-24T07:35:16.419Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  March 28, 2014 | 0 Comments
---

# Spring AMQP 1.3 Released

_Releases | Gary Russell |  March 28, 2014 | 0 Comments_

We are pleased to announce the availability of the Spring AMQP (for Java) 1.3.1.RELEASE.

The release includes some significant new features, including:

-   **Listener Container**
    
-   The listener container concurrency can be changed without first stopping the container and the listeners will be adjusted accordingly
    
-   The listener container can dynamically adjust the concurrent consumers, based on workload
    
-   The listener container now supports consumer priority (with RabbitMQ 3.2.x or greater)
    
-   The listener container now supports the configuration of an exclusive consumer
    
-   The listener container now supports auto-delete queues; redeclaring them if necessary when starting
    
-   **Rabbit Template**
    
-   The `RabbitTemplate` now has several convenient `receiveAndReply` methods
    
-   The `RabbitTemplate` can now be configured with a `RetryTemplate`, enabling clients to not have to deal directly with broker connectivity issues.
    
-   **Connection Factory**
    
-   The Connection Factory can now cache connections rather than all users sharing the same connection (and, since M2, channels can be cached within cached connections)
    
-   There is now a `SimpleRoutingConnectionFactory` to determine which connection factory to use at runtime
    
-   **Other Key Features**
    
-   A fluent Java API is now provided to build a `Message` (and `MessageProperties`)
    
-   A fluent Java API is now provided for building a listener container retry interceptor
    
-   When using a retry interceptor, a new `RepublishMessageRecoverer` is available to republish failed messages (with stack trace) to another exchange
    

See the [What's new](http://docs.spring.io/spring-amqp/docs/1.3.0.RELEASE/reference/html/whats-new.html#d4e76) and release notes for a full list of new features. Please visit the [project page](http://projects.spring.io/spring-amqp/) for links to documentation etc.

-   [1.3.1 release notes](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10450&version=14500)
-   [GA release notes](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10450&version=14396)
-   [RC1 release notes](https://jira.springsource.org/secure/ReleaseNote.jspa?projectId=10450&version=14317)
-   [M2 release notes](https://jira.springsource.org/secure/ReleaseNote.jspa?projectId=10450&version=14352)
-   [M1 release notes](https://jira.springsource.org/secure/ReleaseNote.jspa?projectId=10450&version=14314)