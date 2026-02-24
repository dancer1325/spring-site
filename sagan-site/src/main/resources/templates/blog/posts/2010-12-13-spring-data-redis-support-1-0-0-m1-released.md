---
title: Spring Data - Redis Support 1.0.0.M1 Released
source: https://spring.io/blog/2010/12/13/spring-data-redis-support-1-0-0-m1-released
scraped: 2026-02-24T08:50:10.400Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Costin Leau |  December 13, 2010 | 0 Comments
---

# Spring Data - Redis Support 1.0.0.M1 Released

_Releases | Costin Leau |  December 13, 2010 | 0 Comments_

Dear Spring Community,

I am pleased to announce the very first milestone release of the Spring Data - Redis Support 1.0 project is now available! The primary goal of the **Spring Data** project is to make it easier to build Spring-powered applications that use new data access technologies such as non-relational databases, map-reduce frameworks, and cloud based data services. The Redis modules provides integration with [Redis](http://code.google.com/p/redis/) key-value store.

[Downloads](http://www.springsource.com/download/community?project=Spring%20Data&version=1.0.0.M1) | [JavaDocs](http://static.springsource.org/spring-data/data-keyvalue/redis/docs/1.0.0.M1/api/) | [Reference Documentation](http://static.springsource.org/spring-data/data-keyvalue/redis/docs/1.0.0.M1/reference/html/) | [Changelog](http://static.springframework.org/spring-data/data-keyvalue/redis/docs/1.0.0.M1/changelog.txt)

To learn more about the project, visit the Spring Data [Homepage](http://www.springsource.org/spring-data).

The features in 1.0.0 M1 include:

-   Connection package as low-level abstraction across multiple drivers
-   Configuration support for Redis [Jedis](http://github.com/xetorthio/jedis) and [JRedis](http://github.com/anthonylauzon/jredis) drivers/connectors
-   [Exception translation](http://static.springsource.org/spring-data/data-keyvalue/redis/docs/current/reference/html/#redis:connectors) to Spring's portable Data Access exception hierarchy for Redis driver exceptions
-   Generified [RedisTemplate](http://static.springsource.org/spring-data/data-keyvalue/redis/docs/1.0.0.M1/reference/html/#redis:template) for exception translation and serialization support
-   Various serialization strategies
-   Atomic [counter](http://static.springsource.org/spring-data/data-keyvalue/redis/docs/1.0.0.M1/reference/html/#redis:support) support classes
-   JDK [Collection](http://static.springsource.org/spring-data/data-keyvalue/redis/docs/1.0.0.M1/reference/html/#redis:support) implementations on top of Redis

Looking forward to your feedback on the [forum](http://forum.springsource.org/forumdisplay.php?f=80) or in the [issue tracker](https://jira.springsource.org/browse/DATAKV).