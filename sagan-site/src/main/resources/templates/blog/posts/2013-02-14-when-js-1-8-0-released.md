---
title: When.js 1.8.0 Released
source: https://spring.io/blog/2013/02/14/when-js-1-8-0-released
scraped: 2026-02-24T08:09:21.551Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Jeremy Grelle |  February 14, 2013 | 0 Comments
---

# When.js 1.8.0 Released

_Releases | Jeremy Grelle |  February 14, 2013 | 0 Comments_

Dear Spring Community,

We are pleased to announce the release of [when.js 1.8.0](https://github.com/cujojs/when).

**When.js is [cujojs](http://cujojs.com)’s lightweight Promises/A and when() implementation, derived from the async core of [wire.js](https://github.com/cujojs/wire), cujojs’s IOC Container. It also provides several other useful Promise-related concepts, such as joining multiple promises, mapping and reducing collections of promises, and timed promises.**

Among other things, this release includes an extensive set of adapters for working with existing callback-based APIs, including node-style async APIs, allowing you to effectively convert them into promise-aware functions. In addition, most of the new features in this release are community contributions, which is awesome. Keep it coming!

Some specific highlights include:

-   Adapters for promisifying existing callback-based code.
-   Mechanisms for generating and processing unbounded/infinite lists
-   Promise-based periodic polling utility.

[Check out the changelog](https://github.com/cujojs/when#whats-new) for more info and direct links to docs for all the new goodies.

If you're still wondering what this cujojs thing is all about, be sure to check out [Brian Cavalier and John Hann's "IOC + JavaScript" talk from SpringOne 2012](http://www.youtube.com/watch?v=TqX-CqYYwEc).