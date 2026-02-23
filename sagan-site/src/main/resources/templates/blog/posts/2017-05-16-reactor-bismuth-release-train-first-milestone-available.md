---
title: Reactor Bismuth release train first milestone available
source: https://spring.io/blog/2017/05/16/reactor-bismuth-release-train-first-milestone-available
scraped: 2026-02-23T16:31:32.644Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Simon Baslé |  May 16, 2017 | 0 Comments
---

# Reactor Bismuth release train first milestone available

_Releases | Simon Baslé |  May 16, 2017 | 0 Comments_

On behalf of the Reactor team, it is my pleasure to announce that **Reactor hit an important milestone** last week, making the `Bismuth-M1` release train available.

This first milestone backs the newly released Spring Framework 5 RC1. It notably includes version `3.1.0.M1` of `reactor-core`, `reactor-test` and `reactor-extra`.

As the 3.1.x generation is slated to be the long term support branch (as is appropriate for a version that backs the Spring framework), focus has been on stabilizing and polishing the API. As such, expect some breaking changes from the 3.0.x versions \[[1](#_footnote_1 "View footnote.")\].

# [](#migrating-from-30x)[](#migrating-from-3-0-x)Migrating from 3.0.x

If you’ve kept your Reactor dependencies up to date during the 3.0.x phase (meaning you’re on reactor-core `3.0.7`), then you’ve noticed methods being deprecated in the last few versions.

We’ve tried to prepare a path to 3.1.0 as much as possible by providing new APIs in advance and, in the case of renamed methods, deprecating the old methods when the new one were introduced.

These **methods that were deprecated in 3.0.x have mostly been removed in 3.1.0.M1**, so make sure to follow this quick guide on migrating before you update your dependencies!

In a very limited number of cases, this strategy couldn’t be applied and we’ll detail the migration pattern for these below.

## [](#hunt-for-deprecated-methods)[](#hunt-for-deprecated-methods)Hunt for deprecated methods

Deprecation notes are present in `3.0.7` for most of API changes, so the easiest way to start migrating is to find deprecated API usage in your code and fix them according to the suggestion in the javadoc.

Most of the API changes fall into 2 categories:

1.  renaming a method to **better align the APIs** between `Flux` and `Mono` or to **remove some ambiguities with lambda usage**: the new alias will be introduced in 3.0.7 and old method will be deprecated with a note to use the new alias.
    
2.  **removing redundant variants of operators** like all the `xxxMillis` variants (that have been removed in favor of just using the `Duration` based alternatives): the method will be deprecated with a note to use the variant that will be kept.
    

One trickier case exists though:

## [](#migrating-monothenfunction-and-monoflatmap)[](#migrating-code-mono-then-function-code-and-code-mono-flatmap-code)Migrating `Mono.then(Function)` and `Mono.flatMap`

Contrary to all other `then` variants, which have the effect of ignoring the data from the mono *then* continuing it upon completion with another `Publisher`, `Mono.then(Function)` would react on the `onNext` event.

This was violating the principle of least surprise and could lead to unexpected behavior when chaining a few `then` together. Take this example:

```
CopyMono.just(someObject)
 	 .thenEmpty(Mono.fromRunnable(AsyncUtils::runDiagnostics))
 	 .then(v -> AsyncUtils.toJson(v));
```

This code would never invoke `runCleanupFor`, because the `thenEmpty` just before returns a `Mono<Void>`. But if the code used in the `Function` is happy compiling with a `Void` generic type, then you won’t get any warning.

Looking further at the signature and the fact that the operator didn’t entirely ignore `onNext` signals like its other variants, we noticed that this was actually closer to a classic `flatMap`:

```
CopyMono<V> then(Function<T, Mono<V>> thenFunction);
```

But `flatMap` already existed in `Mono`, with the following signature:

```
CopyFlux<V> flatMap(Function<T, Flux<V>> mapFunction)
```

Since flatMap usually returns the same type as the enclosing type, it seems more correct to **rename `then(Function)` to `flatMap` and the old `flatMap` would become `flatMapMany`** (following an already established suffix convention that indicates the Mono is transformed to a Flux by such operators).

Since a new `flatMap` signature only differing by its return type couldn’t be introduced in 3.0.x (where we only wanted to *deprecate* the old flatMap), this migration was trickier to anticipate.

**As a result, the best migration "recipe" is:**

1.  to first replace all usage of `Mono.flatMap` with `flatMapMany`
    
2.  finish other refactor and migrations
    
3.  switch to `3.1.0.M1`
    
4.  replace all usage of `Mono.then(Function)` (now not compiling) to `flatMap`
    

Note

Note that if you don’t perform step 1, you might get misleading compilation errors: sequences that contained a `flatMap` would continue as a `Flux` but now continue as a `Mono`.  
If down the chain of operators you relied on being in a `Flux` (eg. using an operator only available on this type, like `reduce()`), the compilation error would appear down the line.  
Rather than fixing the compilation error at face value, you’d need to notice that the code expected a `Flux` and that this is due to not using `flatMapMany` upstream…​

## [](#schedulers-time-and-testing-with-virtual-time)[](#schedulers-time-and-testing-with-virtual-time)Schedulers, time and testing with virtual time

The `Schedulers.timer()` scheduler has been removed, and all default schedulers are now capable of submitting a task with a delay/periodically. As a result, for operators like `delay()` the default `Scheduler` is now `Schedulers.parallel()`. Note that thread names will now follow the *"parallel-\`x\`"* pattern, with x varying between the number of workers instead of a single *"timed-\`n\`"*.

Another change is the way the `VirtualTimeScheduler` from `reactor-test` now can replace any Scheduler. Most notably, when used through `StepVerifier#withVirtualTime`, the VTS will indeed **replace ALL default Schedulers**.

This means that if you are testing blocking code that you would previously isolate in eg. `Schedulers.elastic()`, you now need to do that in a **dedicated** `Scheduler` created **before** the `StepVerifier` (eg. `Schedulers.newSingle()`).

## [](#processor-changes)[](#processor-changes)Processor changes

Processors have been reworked. Notably you don’t need to explicitly connect to some Processors anymore, but should rather always use the new `sink()` method. This aligns the API for all processors and serializes calls for those which aren’t already inherently serialized. The whole `Processor` family usage is now closer to `Flux.create`.

# [](#new-features)[](#new-features)New Features

## [](#scannable)[](#scannable)Scannable

The `Scannable` interface replaces introspection interfaces that were mainly used internally and have been removed (`Loopback`, `MultiProducer`, `MultiReceiver`, `Producer`, `Receiver`, `Trackable`).

The goal is to support introspection of sequences, including by traversing the operators, in a single interface. The focus will increase on supportability using this mechanism between now and the GA release.

## [](#monodelayuntil)[](#mono-delayuntil)Mono.delayUntil

The `delayUntil` and `delayUntilOther` operators were added to `Mono` in order to delay the emission of the `Mono` until after a companion `Publisher` completes. In the case of `delayUntil`, that companion is generated from the value emitted by the source Mono. The triggering of the delaying Publisher is made upon source’s completion though. This is very close to the very recently added `untilOther`, except that the later triggers its companion on `onNext` rather than `onComplete`.

Decision is still pending whether or not `untilOther` should be deprecated, as we believe both its name and its onNext-dependent behavior are less expressive and useful.

# [](#conclusion)[](#conclusion)Conclusion

Let me conclude by a shoutout to community contributors that participated in the latest 3.0.x releases as well as the M1 release (github usernames in alphabetical order): **@bdavisx @Dmitriusan @garyrussell @lebannen @lhotari @madhead @nebhale @rajinisivaram @RunninglVlan @sdeleuze @schauder**.

Thanks again guys!

To get this release, use the BOM together with the Spring Milestone repository (see the reference guide [here](http://projectreactor.io/docs/core/snapshot/reference/docs/index.html#_milestones_and_snapshots)).

Finally, a call to action:

> If you have any question about this milestone, or **even more importantly any remarks or suggestions**, don’t hesitate to join the discussion live on [Gitter](https://gitter.im/reactor/reactor) or [open an issue](https://github.com/reactor/reactor-core/issues/new).

Happy reactive programming!

---

[1](#_footnoteref_1). As a reminder, Reactor 3 is not entirely conforming to the `MAJOR.MINOR.PATCH` scheme of semantic versioning, but **rather follows a `X.MAJOR.MINOR` versioning scheme**. `X` incrementing means a major architectural and API do-over, a `MAJOR` can contain important new features and breaking changes while `MINOR` are all binary and API compatible within the same MAJOR (although they can contain internals changes and new features in addition to bugfixes)