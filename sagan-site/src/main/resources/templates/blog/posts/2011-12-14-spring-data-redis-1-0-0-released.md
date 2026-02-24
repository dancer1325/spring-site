---
title: Spring Data Redis 1.0.0 Released
source: https://spring.io/blog/2011/12/14/spring-data-redis-1-0-0-released
scraped: 2026-02-24T08:30:23.495Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Costin Leau |  December 14, 2011 | 0 Comments
---

# Spring Data Redis 1.0.0 Released

_Releases | Costin Leau |  December 14, 2011 | 0 Comments_

Dear Spring Community, I am pleased to announce the very first GA release of the Spring Data Redis 1.0 project is now available!

[Downloads](http://www.springsource.com/download/community?project=Spring Data Redis&version=1.0.0.RELEASE) | [JavaDocs](http://static.springsource.org/spring-data/data-redis/docs/1.0.0.RELEASE/api/) | [Reference Documentation](http://static.springsource.org/spring-data/data-redis/docs/1.0.0.RELEASE/reference/) | [Changelog](http://static.springframework.org/spring-data/data-redis/docs/1.0.0.RELEASE/changelog.txt)

The Spring Data Redis features include:

-   Connection package as low-level abstraction across multiple drivers
-   Configuration support for Redis [Jedis](http://github.com/xetorthio/jedis), [JRedis](http://github.com/anthonylauzon/jredis) and [RJC](http://github.com/e-mzungu/rjc) drivers/connectors
-   [Exception translation](http://static.springsource.org/spring-data/redis/docs/1.0.0.RELEASE/reference/redis.html#redis:connectors:connection) to Spring's portable Data Access exception hierarchy for Redis driver exception
-   Generified [RedisTemplate](http://static.springsource.org/spring-data/redis/docs/1.0.0.RELEASE/reference/redis.html#redis:template) for exception translation and serialization support
-   Jdk, JSON and Spring Object/XML mapping object and hash serializers
-   Spring 3.1 cache abstraction [implementation](http://static.springsource.org/spring-data/redis/docs/1.0.0.RELEASE/reference/redis.html#redis:support:cache-abstraction) for Redis
-   [Pub-Sub](http://static.springsource.org/spring-data/redis/docs/1.0.0.RELEASE/reference/redis.html#pubsub) support (such as a MessageListenerContainer for message-driven POJOs)
-   Sorting and Pipelining functionality
-   Dedicated support for SORT, SORT/GET pattern and returned bulk values
-   Atomic counters and JDK [Collection](http://static.springsource.org/spring-data/redis/docs/1.0.0.RELEASE/reference/redis.html#redis:support) implementations on top of Redis

See Spring Data Redis in action through the *live* [RetwisJ](http://retwisj.cloudfoundry.com/) sample, a Twitter-clone (deployed in [CloudFoundry](http://www.cloudfoundry.com/)) based entirely on Redis that showcases the various features of Spring Data Redis.

Additionally, learn about Redis and Spring Data Redis in a dedicated webinar by [Salvatore Sanfilippo](http://twitter.com/antirez) (Redis author) and [Costin Leau](http://twitter.com/costinl) (Spring Data Redis lead):

<a href="http://www.youtube.com/embed/5xtEpB2FmMU">webinar</a>

We look forward to your feedback on the [forum](http://forum.springsource.org/forumdisplay.php?80-NoSQL) or in the [issue tracker](https://jira.springsource.org/browse/DATAREDIS).

P.S. Please use **maven.springframework.org/release** while Maven Central gets updated.