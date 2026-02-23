---
title: Spring Sync 1.0.0 Milestone 1 Released
source: https://spring.io/blog/2014/10/22/spring-sync-1-0-0-milestone-1-released
scraped: 2026-02-23T22:11:11.608Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Craig Walls |  October 22, 2014 | 4 Comments
---

# Spring Sync 1.0.0 Milestone 1 Released

_Releases | Craig Walls |  October 22, 2014 | 4 Comments_

Dear Spring Community,

I am pleased to announce the first milestone release of Spring Sync 1.0.0.

Spring Sync enables efficient communication and synchronization of data between clients and Spring-based servers.

The release dependency is available in the [repo.spring.io milestone repository](http://repo.spring.io/libs-milestone-local) at the dependency coordinates of "org.springframework.sync:spring-sync:1.0.0.M1".

This release includes:

-   A patch abstraction for calculating differences and applying patches between Java objects.
-   Support for representing patches as [JSON Patch](https://tools.ietf.org/html/rfc6902).
-   An implementation of [Differential Synchronization](https://neil.fraser.name/writing/sync/eng047-fraser.pdf) for creating and applying patches in a controlled manner.
-   DiffSyncController, a Spring MVC controller that handles HTTP request of type application/patch-json+patch and performing Differential Synchronization against a resource.

The [code for Spring Sync](https://github.com/spring-projects/spring-sync) is available in GitHub. Contributions in the form of pull requests are most certainly welcome. You may also submit bug reports and improvement suggestions via [GitHub issue tracking](https://github.com/spring-projects/spring-sync/issues).

Keep an eye on this blog for an introductory article on Spring Sync to be published later today. In the meantime, have a look at a few [Spring Sync examples](https://github.com/spring-projects/spring-sync-samples) to see Spring Sync in action.