---
title: Spring Data Key Value (Redis + Riak) 1.0.0.M2 Released
source: https://spring.io/blog/2011/02/10/spring-data-key-value-redis-riak-1-0-0-m2-released
scraped: 2026-02-24T08:46:57.610Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Costin Leau |  February 10, 2011 | 0 Comments
---

# Spring Data Key Value (Redis + Riak) 1.0.0.M2 Released

_Releases | Costin Leau |  February 10, 2011 | 0 Comments_

Dear Spring Community,

I am pleased to announce the second milestone release of the Spring Data Key Value 1.0 project, with support for Redis and Riak, is now available!

[Downloads](http://www.springsource.com/download/community?project=Spring%20Data&version=1.0.0.M2) | [JavaDocs](http://static.springsource.org/spring-data/data-keyvalue/docs/1.0.0.M2/api/) | [Reference Documentation](http://static.springsource.org/spring-data/data-keyvalue/docs/1.0.0.M2/reference/html/) | [Changelog](http://static.springframework.org/spring-data/data-keyvalue/docs/1.0.0.M2/changelog.txt)

This release introduces several new features for both Redis and Riak, such as:

-   \[Redis\] [Pubsub](http://static.springsource.org/spring-data/data-keyvalue/docs/1.0.0.M2/reference/html/#d0e576) support (such as a MessageListenerContainer for message-driven POJOs)
-   \[Redis\] JSON and Spring Object/XML mapping [serializers](http://static.springsource.org/spring-data/data-keyvalue/docs/1.0.0.M2/reference/html/#redis:serializer)
-   \[Redis\] Full support for upcoming [Redis](http://redis.io) 2.2
-   \[Redis\] Sorting and Pipelining functionality
-   \[Riak\] [Asynchronous](http://static.springsource.org/spring-data/data-keyvalue/docs/1.0.0.M2/reference/html/#riak:async) RiakTemplate
-   \[Riak\] Dedicated [Groovy DSL](http://static.springsource.org/spring-data/data-keyvalue/docs/1.0.0.M2/reference/html/#riak:groovy) for asynchronous Riak access

We look forward to your feedback on the [forum](http://forum.springsource.org/forumdisplay.php?f=80) or in the [issue tracker](https://jira.springsource.org/browse/DATAKV).