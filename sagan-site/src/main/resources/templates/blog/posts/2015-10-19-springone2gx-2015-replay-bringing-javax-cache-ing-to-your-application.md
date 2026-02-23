---
title: SpringOne2GX 2015 replay: Bringing javax.cache\'ing to your application
source: https://spring.io/blog/2015/10/19/springone2gx-2015-replay-bringing-javax-cache-ing-to-your-application
scraped: 2026-02-23T19:39:03.145Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Pieter Humphrey |  October 19, 2015 | 0 Comments
---

# SpringOne2GX 2015 replay: Bringing javax.cache'ing to your application

_News | Pieter Humphrey |  October 19, 2015 | 0 Comments_

Recorded at SpringOne2GX 2015.

Speakers: Alex Snaps, Chris Dennis - Terracotta / Software AG

Slides: [http://www.slideshare.net/SpringCentral/bringing-javaxcacheing-to-your-app](http://www.slideshare.net/SpringCentral/bringing-javaxcacheing-to-your-app)

10 years in the making and finally JSR-107 has been finalized. We now have a standardized Caching API for the Java Platform. And that's all ready for you to use in your Spring apps. But what does it really enable for you? What's with these optional features? No transaction support? How do you efficiently make use of this new API to solve real world problems in your application today? We'll look into how get you best started introducing caching into your Spring application to solve real world problems. And, as we explore the javax.cache API in much more details, we'll see how to push the specifications to its limits and... beyond. Whether implicitly through frameworks (like Spring and Hibernate), or explicitly (cache-aside, cache-through, ...). And how to abstract yourself from a given provider when you require more than what the specifications cover (e.g. transactional caches). We'll also cover some implementer specifics you might want to account for when choosing an implementation, especially if you plan to push the spec to the extreme, like when going distributed and caching terabytes of data.