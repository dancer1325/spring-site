---
title: Spring Batch 2.0.0.M2 Released
source: https://spring.io/blog/2008/10/15/spring-batch-2-0-0-m2-released
scraped: 2026-02-24T09:14:06.301Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Dave Syer |  October 15, 2008 | 0 Comments
---

# Spring Batch 2.0.0.M2 Released

_Releases | Dave Syer |  October 15, 2008 | 0 Comments_

Spring Batch 2.0.0.M2 is now available. See the Spring Batch [downloads page](http://static.springframework.org/spring-batch/downloads.html) for more information - there is the usual .zip download and also Maven artifacts in S3.

Most work in this release went into the chunk-oriented approach to processing, which means changes to the ItemReader and ItemWriter interfaces, plus the introduction of the ItemProcessor as a top-level concern for translating between input and output items. Chunk-oriented processing is a key enabler for performance and scalability, as well as being much clearer for users in the extension points and interfaces (no more framework callbacks in business code).

The website has also been updated for the 2.0 milestones, and there is a new link to the current GA version on the site (1.1.x).

We continue to value very highly the feedback we get from the community and so if you have a chance to try it out, please do, and get back to us with questions and comments.

Enjoy!