---
title: Spring Data Key Value (Redis + Riak) 1.0.0.M3 Released
source: https://spring.io/blog/2011/04/06/spring-data-key-value-redis-riak-1-0-0-m3-released
scraped: 2026-02-24T08:43:48.626Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Costin Leau |  April 06, 2011 | 0 Comments
---

# Spring Data Key Value (Redis + Riak) 1.0.0.M3 Released

_Releases | Costin Leau |  April 06, 2011 | 0 Comments_

Dear Spring Community,

I am pleased to announce the third milestone release of the Spring Data Key Value 1.0 project, with support for Redis and Riak, is now available!

[Downloads](http://www.springsource.com/download/community?project=Spring%20Data&version=1.0.0.M3) | [JavaDocs](http://static.springsource.org/spring-data/data-keyvalue/docs/1.0.0.M3/api/) | [Reference Documentation](http://static.springsource.org/spring-data/data-keyvalue/docs/1.0.0.M3/reference/html/) | [Changelog](http://static.springframework.org/spring-data/data-keyvalue/docs/1.0.0.M3/changelog.txt)

This release introduces several new features for Redis, such as:

-   Support for a new Redis client, [RJC](https://github.com/e-mzungu/rjc) bringing the number of Redis connectors to three
-   New object-hash (and vice-versa) mapping
-   Improved exception hierarchy
-   Dedicated support for SORT, SORT/GET pattern and returned bulk values

Additionally, a new sample is now available that showcases the various Spring Data features: [RetwisJ](http://github.com/SpringSource/spring-data-keyvalue-examples) a Twitter-clone based entirely on Redis.

We look forward to your feedback on this forum or in the [issue tracker](https://jira.springsource.org/browse/DATAKV).