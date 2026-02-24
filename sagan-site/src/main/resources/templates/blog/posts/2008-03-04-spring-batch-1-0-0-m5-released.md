---
title: Spring Batch 1.0.0.m5 Released
source: https://spring.io/blog/2008/03/04/spring-batch-1-0-0-m5-released
scraped: 2026-02-24T09:20:25.133Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Dave Syer |  March 04, 2008 | 0 Comments
---

# Spring Batch 1.0.0.m5 Released

_Releases | Dave Syer |  March 04, 2008 | 0 Comments_

Spring Batch 1.0.0.m5 is available today via the s3 Milestone repository (browse at [http://s3browse.com/explore/maven.springframework.org/milestone/org/springframework/batch](http://s3browse.com/explore/maven.springframework.org/milestone/org/springframework/batch)). For more information, please see the Spring Batch downloads page at [http://static.springframework.org/spring-batch](http://static.springframework.org/spring-batch).

The main change in m5 from the user's point of view is the configuration of jobs, steps and the launcher environment through various factory beans. Several key user concerns have been addressed by the new BatchListener group of interfaces. There are also some changes to key interfaces in the API, like ItemReader and ItemWriter, which have allowed us to separate concerns better between the user and the framework. There is a section on the website describing in detail how to migrate from 1.0.0.m4 to 1.0.0.m5 ([http://static.springframework.org/spring-batch/migration/1.0-m4-m5.html](http://static.springframework.org/spring-batch/migration/1.0-m4-m5.html)).

We are very pleased with the progress we made on Spring Batch since the last milestone, and it now feels finally as if everything is almost in place for a final release. As planned, we now just have time for an rc1 release, with some contingency for rc2 if necessary, before the expected March 20 final release.