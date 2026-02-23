---
title: Spring Integration 4.2 Milestone 2 is Available (and 4.1.6)
source: https://spring.io/blog/2015/07/07/spring-integration-4-2-milestone-2-is-available-and-4-1-6
scraped: 2026-02-23T19:47:31.446Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  July 07, 2015 | 0 Comments
---

# Spring Integration 4.2 Milestone 2 is Available (and 4.1.6)

_Releases | Gary Russell |  July 07, 2015 | 0 Comments_

We are pleased to announce that the second milestone for the upcoming 4.2 release of Spring Integration is now available. In addition to those features in [milestone 1](https://spring.io/blog/2015/05/28/spring-integration-4-2-milestone-1-is-available) this release includes:

##Zookeeper Support

Several components have been added that use zookeeper, including a `LockRegistry` and `MetadataStore` but probably the most significant is the ability to assign endpoints to a leadership `Role`, with the endpoint lifecycle being controlled by the leadership status. When an application context is granted leadership, all endpoints in the corresponding role are started automatically. Similarly when leadership is revoked, the endpoints are stopped.

This can be useful for configuring a hot-standby instance of an application.

##CompletableFuture

When running with Java 8, gateway methods can now return `CompletableFuture<?>`.

##Aggregator

It is now possible to more easily configure an `aggregator` as a message barrier where, when the message group is released (due to completion or timeout), each message is released individually rather than as a collection.

##(S)FTP

The SFTP and FTP outbound gateways now support the `-stream` option when `get`ing files and the message payload is an `InputStream` allowing direct streaming of the remote file. When using this feature for a text file, in conjunction with a `FileSplitter` (`<int-file:splitter/>`) each line can be processed individually without copying the file to local disk.

##Performance Improvements

Some performance bottlenecks have been identified and corrected.

See the [release notes](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10121&version=15106) for complete information and the [project page](http://projects.spring.io/spring-integration/) for documentation and download details.

As a reminder, the [Apache Kafka extension](https://spring.io/blog/2015/06/19/spring-integration-kafka-1-2-is-available-with-0-8-2-support-and-performance-enhancements) now supports version 0.8.2 of kafka.

The 4.1.6.RELEASE containing a [few bug fixes and minor improvements](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10121&version=15215) is also available in the [spring repo](https://repo.spring.io/release) and will be in maven central shortly.

#SpringOne 2GX 2015 is around the corner! Book your place at [SpringOne2GX in Washington, DC soon](http://www.springone2gx.com). Super Early Bird Price expires June 12th! It's simply the best opportunity to find out first hand all that's going on and to provide direct feedback.