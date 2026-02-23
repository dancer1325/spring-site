---
title: Announcing Reactor Bismuth-SR10
source: https://spring.io/blog/2018/06/14/announcing-reactor-bismuth-sr10
scraped: 2026-02-23T15:22:25.199Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Simon Baslé |  June 14, 2018 | 0 Comments
---

# Announcing Reactor Bismuth-SR10

_Engineering | Simon Baslé |  June 14, 2018 | 0 Comments_

On behalf of the Reactor team, I have the pleasure of announcing a first shipment of Reactor goodness this week: Reactor `Bismuth-SR10` is out ?

Stay tuned for a Reactor Californium milestone later this week ??‍♂️

# [](#reactor-bismuth-sr10)Reactor Bismuth-SR10

The latest maintenance BOM of the 3.1.x line, `Bismuth-SR10`, is out. It includes two new artifacts (click on the version numbers to see the release notes on GitHub):

-   `reactor-core` [`3.1.8.RELEASE`](https://github.com/reactor/reactor-core/releases/tag/v3.1.8.RELEASE)
-   `reactor-netty` [`0.7.8.RELEASE`](https://github.com/reactor/reactor-netty/releases/tag/v0.7.8.RELEASE)

One update considerations though: `Flux.last()` used to skip throwing a `NoSuchElementException` on some category of empty sources (`Flux` or `Mono` that are `Callable`, like `Flux.empty()`). This is a bug and it correctly does throw now.

Otherwise, this release mainly contains backports of bugfixes from the ongoing development effort on `Californium`'s first release in the master branch.

# [](#change-in-process-for-backportingfixing-issues-in-maintenance-releases)Change in process for backporting/fixing issues in maintenance releases

Speaking of backports: for those of you who have or are interested in contributing (❤️), note that we are about to change triage and branching strategies. Inspired by what the Spring Boot team does, we'll now:

-   affect triaged issues to a backlog milestone
-   decide at the earliest whether an issue/PR should be fixed in a maintenance branch or the current dev branch (the backlog milestone chosen will reflect that)
-   fix the issue in the *earliest maintenance branch* in which it is supposed to ship
-   forward-merge the root maintenance branch into `master` (and when we have more maintenance branches, into more recent maintenance branches as well)
-   only move issues to precise milestones (like `3.2.0.M2`) *once they've been merged and forwarded*

This will reduce the ceremony around backporting issues (removing the need for confusing tracker issues). We believe it will also help users know wether an issue has been fixed in a maintenance version, by having the github milestone show the earliest maintenance release a fix has been shipped in. Finally, it will help while looking at the fix's code because there will now be a single reference commit for the fix (plus a merge commit that might contain adjustments necessary to make it compatible with newest breaking changes).

As we are at a point where a release just happened in both `3.1.x` and `master`, now is a good time to implement that change in process. See [#1225](https://github.com/reactor/reactor-core/issues/1225) for more details

Happy reactive coding!