---
title: 5x startup performance boost in Virgo milestone M02
source: https://spring.io/blog/2010/07/08/5x-startup-performance-boost-in-virgo-milestone-m02
scraped: 2026-02-24T08:55:40.359Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Glyn Normington |  July 08, 2010 | 0 Comments
---

# 5x startup performance boost in Virgo milestone M02

_Engineering | Glyn Normington |  July 08, 2010 | 0 Comments_

Virgo 2.1.0.M02-incubator is available for [download](http://www.eclipse.org/virgo/download/). Apart from completing the "getting started guide", this milestone dramatically reduces startup time - by as much as 5x on some systems.

This should be a further incentive for users of dm Server to migrate to Virgo: Virgo is the codebase for future development, has more liberal licensing, and now provides much faster startup.

#### Measurements

We measured elapsed time for a warm startup (i.e. without -clean) of the Virgo web server and compared milestone M02 to M01.

On a quad-core Intel Xeon 2.66 GHz machine, startup reduced from 68 to 12 seconds, an improvement of 5.6x.

However some other systems do not achieve the same level of improvement. For example, startup on a dual-core Intel Core i7 2.66 GHz machine reduced from the (blazingly fast) 15.4 to 14.2 seconds, an improvement of only 8%.

#### Changes

Profiling showed that in-memory logging was the main hotspot during startup. However our experience over the last couple of years, in the field and during development, is that in-memory logging is hardly ever useful in practice. The in-memory log buffer is visible only in dumps, but when a dump occurs the other contents of the dump are always more interesting and useful than log entries. In addition to the overhead of in-memory logging, the circular buffer used to record in-memory log entries is likely to make garbage collection more frequent and increase the cost of marking live objects.

This is clearly a trade-off, but we believe many users will benefit from the increased speed and will rarely, if ever, miss the log entries which are suppressed.

Other changes:

-   avoided the use of 'cflowbelow' from the entry/exit logging aspect
-   suppressed method entry/exit logging of the (well tested and reliable) artifact repository component
-   suppressed method entry/exit logging of getter and setter methods