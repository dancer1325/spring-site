---
title: Migrating from Spring Framework 3.2 to 4.0.1
source: https://spring.io/blog/2014/01/30/migrating-from-spring-framework-3-2-to-4-0-1
scraped: 2026-02-24T07:44:10.321Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  January 30, 2014 | 26 Comments
---

# Migrating from Spring Framework 3.2 to 4.0.1

_Releases | Juergen Hoeller |  January 30, 2014 | 26 Comments_

After this week's 4.0.1 release, I'd like to take the opportunity to point out our recently revised [migration guide on GitHub](https://github.com/spring-projects/spring-framework/wiki/Migrating-from-earlier-versions-of-the-spring-framework): That document contains a lot of detailed system requirements etc for your migration to the Spring Framework 4 line. If you haven't already, now is a great time to give this a try, since the 4.0.1 release contains fixes for all known production-impacting issues that have been reported against the 4.0 GA release.

I'd particularly like to invite all WebSphere users to give the upgrade a try. We carefully designed Spring Framework 4 to be compatible with WebSphere 7.0.0.9+ still, and introduced a set of refinements in 4.0.1 towards fine-tuning the Spring experience on WebSphere. Several of those refinements have also been backported to 3.2.7, so in case you aren't prepared for a 4.x upgrade yet, please upgrade to 3.2.7 first - as a starting point!

To a large degree, an upgrade from Spring Framework 3.2 (or earlier) to 4.0.1 should be as straightforward as a change of version numbers in your Maven POMs. Note that you may have to upgrade specific third-party dependencies to a recent enough version (e.g. Hibernate 3.6+, Quartz 1.8+, Jackson 1.8+, Tiles 2.2+), but other than that, you should be able to get all the benefits of the Spring 4 line with hopefully very little effort.

If there are any issues with your migration attempt, please let us know as early as possible! We have Spring Framework 4.0.2 and 4.0.3 releases scheduled for February and March now, so we will be able to provide you with timely updates to sort out any remaining issues.