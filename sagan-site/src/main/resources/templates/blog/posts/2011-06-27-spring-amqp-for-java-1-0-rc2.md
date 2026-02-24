---
title: Spring AMQP for Java 1.0 RC2
source: https://spring.io/blog/2011/06/27/spring-amqp-for-java-1-0-rc2
scraped: 2026-02-24T08:39:26.836Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Josh Long |  June 27, 2011 | 0 Comments
---

# Spring AMQP for Java 1.0 RC2

_Releases | Josh Long |  June 27, 2011 | 0 Comments_

We are pleased to announce that Spring AMQP for Java 1.0 RC2 is now available.

For details about the changes since RC1, please review [the Release Notes here](https://jira.springsource.org/secure/ReleaseNote.jspa?projectId=10450&version=12203)

In addition to a few bug fixes, this release provides the following:

-   Support for Exchange-to-Exchange bindings as well as custom Exchange types
-   Improved re-connection support
-   Added `ChannelListener` callback
-   Clarified Binding builder API semantics
-   Added a MessageProperties conversion strategy interface
-   Improved namespace coverage (e.g. `<rabbit:template>`)
-   Upgraded to RabbitMQ client version 2.5.0

Since this is intended to be our final pre-GA release, please take some time to try it out. In fact if you have a chance, really try to push the limits so that we know we're ready for prime time.

Thanks!  
The Spring AMQP Team