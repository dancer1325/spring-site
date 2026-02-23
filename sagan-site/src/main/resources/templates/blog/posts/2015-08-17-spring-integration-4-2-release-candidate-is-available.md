---
title: Spring Integration 4.2 Release Candidate is Available
source: http://spring.io/blog/2015/08/17/spring-integration-4-2-release-candidate-is-available
scraped: 2026-02-23T19:44:38.436Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  August 17, 2015 | 4 Comments
---

# Spring Integration 4.2 Release Candidate is Available

_Releases | Gary Russell |  August 17, 2015 | 4 Comments_

We are pleased to announce that the final release candidate for Spring Integration 4.2 (`4.2.0.RC1`) is now available in the [spring milestone repository](https://repo.spring.io/milestone/).

Features of this release include:

## [](#security-context-propagation)Security Context Propagation

The security context can now be propagated across `ExecutorChannel` and `QueueChannel`s. The framework takes care of clearing the inherited security context when the downstream flow completes.

## [](#stomp-client-channel-adapters)STOMP Client Channel Adapters

STOMP client-side channel adapters based on the support in Spring Framework 4.2 are now available (the initial work announced in milestone 1 is now complete).

## [](#metrics)Metrics

`MessageChannel`, `MessageSource` and `MessageHandler` metrics can now be enabled independently of JMX.

## [](#file-scanner)File Scanner

A new directory scanner is available to more efficiently scan directory hierarchies by reacting to file system events rather than scanning the whole tree on every poll. (Requires Java 7)

## [](#event-channel-adapters)Event Channel Adapters

The event channel adapters now support the new POJO `ApplicationEvent` support in Spring Framework 4.2.

## [](#process-barrier)Process Barrier

A new component has been introduced allowing an integration flow to be suspended until some asynchronous event occurs. ([Sample app coming soon](https://github.com/spring-projects/spring-integration-samples/pull/141) where we wait for RabbitMQ publisher confirms before returning an HTTP response).

## [](#last-modified-file-list-filter)Last Modified File List Filter

A common problem with polling directories is if the file producer creates the file "in-place"; the file can be picked up while it is still being written. It is generally recommended to create the file with a temporary name and rename it when it is complete. If that cannot be done, however, this new filter prevents a file from being processed until it hasn't been modified for some time period.

## [](#codec)Codec

A codec abstraction (including a Kryo implementation) has been introduced as an alternative to java serialization.

## [](#jms-shared-subscriptions)JMS Shared Subscriptions

JMS 2.0 shared subscriptions are now supported by the namespace, simplifying configuration when using XML.

## [](#sftp-improvements)(S)FTP improvements

Inbound channel adapters can now use an expression for the remote directory.

## [](#soap-action-propagation)SOAP Action Propagation

It is now easier to implement a web service proxy using Spring Integration.

## [](#previous-milestones)Previous Milestones

A reminder of features already announced that were in the [milestone 1](https://spring.io/blog/2015/05/28/spring-integration-4-2-milestone-1-is-available) and [milestone 2](https://spring.io/blog/2015/07/07/spring-integration-4-2-milestone-2-is-available-and-4-1-6) releases:

-   A significant overhaul of the JMX support in the framework, providing performance and other improvements when JMX is enabled
-   A mongodb metadata store
-   `@SecuredChannel` annotation
-   Conditional Pollers - the polling interval can be adjusted dynamically, based on the results of (or before executing) the current poll
-   Cross Origin Resource Sharing (CORS) support in the http inbound gateway
-   Zookeeper Support for leadership, locks, and metadata
-   CompletableFuture gateway method return values
-   Aggregator improvements
-   (S)FTP improvements
-   Some performance bottlenecks have been identified and corrected.

For complete contents of the milestone releases, see the JIRA release notes for [M1](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10121&version=14855) and [M2](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10121&version=15106)

For complete contents of this release candidate, see the [release notes](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10121&version=15231).

Also refer to the [reference documentation "what's new" chapter](http://docs.spring.io/spring-integration/docs/4.2.0.RC1/reference/html/whats-new.html)

See [the project page](http://projects.spring.io/spring-integration/) for links to documentation, samples and download information.

Please try out these new features and improvements; it is your last chance for feedback before the final release planned for early September, just in time for SpringOne.

Also, don't forget to check out the recent work in the **Spring Integration Extensions projects** ([kafka](https://github.com/spring-projects/spring-integration-kafka), [hazlecast](https://github.com/spring-projects/spring-integration-extensions/tree/master/spring-integration-hazelcast)).

#SpringOne 2GX 2015 is around the corner! Book your place at [SpringOne2GX in Washington, DC soon](http://www.springone2gx.com). It's simply the best opportunity to find out first hand all that's going on and to provide direct feedback.