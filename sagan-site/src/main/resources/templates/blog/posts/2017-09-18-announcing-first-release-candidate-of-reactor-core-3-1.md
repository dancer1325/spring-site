---
title: Announcing First Release Candidate of Reactor Core 3.1
source: https://spring.io/blog/2017/09/18/announcing-first-release-candidate-of-reactor-core-3-1
scraped: 2026-02-23T16:21:31.172Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Simon Baslé |  September 18, 2017 | 0 Comments
---

# Announcing First Release Candidate of Reactor Core 3.1

_Releases | Simon Baslé |  September 18, 2017 | 0 Comments_

On behalf of the Reactor team, it is my pleasure to announce that [reactor-core `3.1.0.RC1`](https://github.com/reactor/reactor-core/releases/tag/v3.1.0.RC1) has been released ?. This is a big last step towards GA release of 3.1 at the end of the month, the long term support version that will back [Spring 5](https://spring.io/blog/2017/09/11/spring-framework-5-0-rc4-available-now)!

It is also complemented by various releases, all tied together in the `Bismuth-M4` Release Train and BOM:

-   `reactor-test`, `reactor-extra`, `reactor-adapter` and `reactor-logback` all made the cut to `3.1.0.RC1`
-   `reactor-netty` has seen significant updates and bug fixes in the new `0.7.0.M2` milestone
-   `reactor-kafka` has been released in its `1.0.0.M4` milestone

In order to get this release, the best way is to use the BOM, as described in the reference guide [here](http://projectreactor.io/docs/core/milestone/reference/docs/index.html#getting). Make sure to read the part about [milestones](http://projectreactor.io/docs/core/milestone/reference/docs/index.html#_milestones_and_snapshots) (transposing it to *Bismuth-M4*).

# [](#important-changes-in-reactor-core)Important Changes in Reactor-Core

Since we did not make many announcements since MILESTONE 1, let's have a slightly deeper look at the main changes in `reactor-core` 3.1.0, which has the most changes.

We reserved the option of making API changes until 3.1.0.RELEASE, and this allowed us to collect great feedback from our [community](https://gitter.im/reactor/reactor) and from the Spring Framework team. Thus we were able to polish the API and come up with something we feel is 100% suited for the long term ride along Spring Framework 5.0.

These changes have been progressively made since the first MILESTONE of Reactor 3.1.0, and you can head to the [release notes on Github](https://github.com/reactor/reactor-core/releases) for a complete changelog, especially if you haven't upgraded to any of these since the `3.0.7.RELEASE`.

Here is a non-exhaustive overview of these changes:

### [](#better-alignment-of-flux-and-mono-apis)Better Alignment of Flux and Mono APIs

-   Mono and Flux error handling operators have been adjusted. (M1)
-   `Mono#flatMap` has become `flatMapMany` and Mono.then (`Mono<V> then(Function<T, Mono<V> other)`) is now `flatMap`. (M1)
-   Tuple-returning `Mono.when` static methods and `Mono#and` are now `zip` and `zipWith`, consistent with their `Flux` counterparts. Note the `when` and `and` methods still exist in 3.1.0.RC1 but they are specific to the case where one is only interested in the completion of several `Publisher` objects (represented as a `Mono<Void>` return type). (RC1)
-   The `Flux#firstEmitting` static method is now called `first` and the `Flux#firstEmittingWith` instance method is now called `or`. (RC1)

### [](#better-operator-consistency)Better Operator Consistency

-   A `*When` suffix is used for operator variants that take a companion `Publisher` or that perform the same task as their unsuffixed counterparts asynchronously. (M1)
-   All `delayError` parameter variants have been removed in favor of adding an alias suffixed with `DelayError` (for example `flatMapDelayError`). (M1)
-   All `*Millis` variants (taking a `long` duration) have been removed in favor of `Duration` based variants. (M1)

These changes usually have the added benefit of removing any ambiguity about which override of the method to apply when using lambdas, especially from languages like Kotlin.

### [](#mono-specific-apis)Mono Specific APIs

`Mono` has several APIs that deal with completion of tasks. They basically ignore the elements (if any) and propagate only the `onComplete` signals.

Before RC1, these APIs would also have overrides that wouldn't be focused on this task-completion use case, introducing some confusion. As of RC1 these variants have all been renamed (eg. the `Mono<Tuple2> and(Mono<V> other)` has been renamed `zipWith`).

The task-completion oriented variants, which have been kept, can be spotted by the fact that they return a `Mono<Void>`. They now work with any `Publisher`, not just Monos:

-   `when` static methods fire several provided tasks at once and wait for all of them to complete
-   `and` does the same when called from a `Mono`, with a single provided `Publisher`
-   `then` is about forgetting the element(s) of the source to only signal its completion

### [](#other-changes)Other Changes

-   `reactor-test` sources have been moved to the same repo as `reactor-core` and the artifact is now under the `io.projectreactor` groupId in Maven. (M2)
-   `Hooks` are cumulative (M3) and can be partially set/reset using a key (RC1)
-   `WorkQueueProcessor` and `TopicProcessor` have many construction options, now represented as a `Builder` (M2)
-   `Processor` implementations in Reactor have been heavily reworked and a facade `Sink` interface has been created to ease direct interactions with processors. Use `Processor#sink()` to obtain and keep a reference to this facade. (M3)
-   A `Flux`/`Mono` can be tagged with multiple `tag` annotations or a `name` annotation. (M3)
-   **It is now possible to tie a `Context` to a reactive sequence** upon subscribing to it, using `subscriberContext(Context)`. This context is propagated upstream along with the subscription signal. (RC1)

# [](#the-road-from-here)The Road from Here

The next two weeks will be all about preparing the GA release, for which we do not expect any new change other than documentation and a few new operators.

But it is also the **last opportunity** for you to try the changes out and give feedback! So please give it a roll as soon as you can, and come back to us with any feedback you might have (on [GitHub](http://github.com/reactor/reactor-core/issues) or via [Gitter chat](https://gitter.im/reactor/reactor))

Happy reactive coding!