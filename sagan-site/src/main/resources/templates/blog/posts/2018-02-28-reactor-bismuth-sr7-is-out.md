---
title: Reactor BISMUTH-SR7 is out!
source: https://spring.io/blog/2018/02/28/reactor-bismuth-sr7-is-out
scraped: 2026-02-23T16:07:22.584Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Simon Baslé |  February 28, 2018 | 1 Comment
---

# Reactor BISMUTH-SR7 is out!

_Releases | Simon Baslé |  February 28, 2018 | 1 Comment_

On behalf of the whole Reactor Team, it is my pleasure to announce that the Reactor `BISMUTH-SR7` release train is now available. As always, we recommend using the [`reactor-bom` Bill Of Material](http://projectreactor.io/docs/core/release/reference/docs/index.html#getting).

In time for Spring Boot 2, this release train comes with improvements and bugfixes to core, extras, and reactor-netty.

*This blog post highlights the most significant changes in both SR7 and last week’s SR6 release trains.*

# [](#reactor-core-315)[](#reactor-core-3-1-5)Reactor-Core 3.1.5

> What’s new since `3.1.3`? See the full release notes of the [`3.1.4.RELEASE`](https://github.com/reactor/reactor-core/releases/tag/v3.1.4.RELEASE) and the [`3.1.5.RELEASE`](https://github.com/reactor/reactor-core/releases/tag/v3.1.5.RELEASE). Core changes include more than 15 improvements and bugfixes.

A few new operators have landed in this release: For example, `mergeOrdered` has been added to `Flux` and `ParallelFlux`. It lets you merge multiple sources by continuously picking the smallest available value among all the sources, as defined by a provided `Comparator`.

For convenience, we also added `Flux#concatWithValues(T…​)` and `Mono#thenReturn(T)` , allowing easy concatenation/continuation with scalar values.

To kickstart our introspection theme of 2018, our implementations of `Scheduler` are `Scannable` and are thus meaningful when used with `Scannable#from`.

Notable update considerations include the fix of `Mono.zip` behavior, aligning it to that of `Flux.zip`: It now cancels in-flight sources as soon as one source completes with **empty** or throws an error. If all the `Mono` sources you `zip` together are guaranteed to be value, this changes nothing.

Tip

If you don’t care about the results but want to make sure the whole of N sources have all completed, prefer using `Mono.when`. In particular, look out for a `.zip(…​).then()` pattern, which should be replaced by `.when(…​)`.

Another change that is less likely to have been noticed by our users is fixing the visibility of a couple of classes that were never intended for the public:

-   The MPSC Queue implementation from 3.1.3.RELEASE is now exposed **only** as a plain `Queue` through `Queues.unboundedMultiproducer()`. This concrete class is now package-private.
    
-   `FluxDelaySequence`, `FluxIndex` and `FluxIndexFuseable` are now also package-private.
    

Bug fixes also include a few GC-friendly fixes, stopping unnecessary retaining of `elastic` `Scheduler` workers and event-loop based Processors' background task in case of `forceShutdown()`.

# [](#reactor-addons-316)[](#reactor-addons-3-1-6)Reactor Addons 3.1.6

> What’s new since `3.1.4`? See the full release notes of the [`3.1.5.RELEASE`](https://github.com/reactor/reactor-addons/releases/tag/v3.1.5.RELEASE) and the [`3.1.6.RELEASE`](https://github.com/reactor/reactor-addons/releases/tag/v3.1.6.RELEASE).

Addons has seen a couple of fixes and improvements.

The newly introduced opinionated helper for caching was released with a few package-private interfaces that should have been `public`. This is embarrassing. :( It has now been fixed.

A new `Repeat#create` factory method variant has been introduced. It allows combining a `Predicate` and a maximum amount of repeat attempts.

Note

Speaking of `Repeat` and its sister, `Retry`, some user noticed that the default behavior feels a bit misaligned with the core’s dumbed-down `repeat()` and `retry()` variants: Without further configuration, the helpers are capped at a single attempt, where the core versions keep on repeating or retrying. Furthermore, this is changed by chaining in `timeout`, which switches to an uncapped attempt behavior (which has been clarified in its javadoc).

We are thinking about realigning this behavior with core in `3.2.0`. Please chime in on the [issue](https://github.com/reactor/reactor-addons/issues/149) if you have any insight or feedback.

# [](#reactor-netty-075)[](#reactor-netty-0-7-5)Reactor-Netty 0.7.5

> What’s new since `0.7.3`? See the full release notes of the [`0.7.4.RELEASE`](https://github.com/reactor/reactor-netty/releases/tag/v0.7.4.RELEASE) and the [`0.7.5.RELEASE`](https://github.com/reactor/reactor-netty/releases/tag/v0.7.5.RELEASE).

Reactor-Netty has also seen quite a few fixes, mostly around pooling and the connection lifecycle.

New goodies include support for expect 100-continue, as well as better Reactor `Context` handling, by passing Netty pipelines to it when relevant.

Compression support has also been improved, allowing per-response activation of compression. This slightly supersedes the `minCompressionThreshold` feature that was already in place (albeit it was not 100% reliable). It is based on a `BiPredicate<Req,Resp>` that could, for instance, activate compression only on certain content types. The minimum compression threshold option is backed by a `content-length` predicate.

# [](#whats-next)[](#what-s-next)What’s Next

We encourage you to grab these new artifacts, but, if you’re a Spring Boot user, you’ll be delighted to learn you’ll be rewarded with the same goodies as soon as you upgrade to the upcoming Spring Boot 2.0.0 GA release. :)

As always, feedback is welcome. Come and discuss this release on [Gitter](https://gitter.im/reactor/reactor) or consider opening an [issue on GitHub](https://github.com/reactor/reactor-core/issues/new).

**In the meantime, happy reactive coding!**