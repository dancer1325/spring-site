---
title: Reactor Californium-M1, this summer\'s Milestone release train
source: https://spring.io/blog/2018/08/07/reactor-californium-m1-this-summer-s-milestone-release-train
scraped: 2026-02-23T15:17:04.283Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Simon Baslé |  August 07, 2018 | 0 Comments
---

# Reactor Californium-M1, this summer's Milestone release train

_Engineering | Simon Baslé |  August 07, 2018 | 0 Comments_

On behalf of the Reactor team, I have the pleasure of announcing the newest Reactor milestone, `Californium-M1` ? ?

The team has been busy working on `Californium`, the third major installment of Reactor 3. We are now ready for your feedback on a few select issues, and we have a lot of enhancements and bug fixes ready for your consumption as well.

# [](#californium-m1-bom)Californium-M1 BOM

For its third release train, we continue on the theme of alphabetically increasing names on the periodic table of elements. Californium is an element first synthesized in California.

The milestone's BOM contains:

-   `reactor-core` `3.2.0.M3`
-   `reactor-extra` `3.2.0.M1` (with a few API alignment changes)
-   `reactor-netty` `0.8.0.M1`

Early this year (M1), there was an early preview of `reactor-core` that was solely focused on the "error mode continue" feature, and core also had an off-train milestone release (M2) in June. This blog post covers changes from the latter in addition to those in the brand new M3.

# [](#reactor-netty-080m1)Reactor Netty 0.8.0.M1

The heavyweight here is [`reactor-netty`](https://github.com/reactor/reactor-netty/releases/tag/v0.8.0.M1). Expect a fuller blog post that details the rationale behind the API changes and new features, which include:

### [](#api-revamp)API revamp

The team has introduced a large revamp of the API that is more guiding when building clients and servers, avoiding unforgiving configuration errors that were too easy to make in the 0.7.x line.

The lifecycle is also more clearly outlined by the new API.

### [](#http2-support)HTTP2 support

Yes, **HTTP2 support** ? For now it is mainly upgrading to HTTP2 transparently, but we are working on adding HTTP2 individual streams as first-class citizens in the near future.

# [](#reactor-core-320)Reactor Core 3.2.0

Altogether, M2 and M3 bring in over 70 changes compared to the previous Bismuth iteration.

There are fewer API changes in reactor-core than in reactor-netty, and the update considerations are mainly about differences between the milestones themselves. See the "update considerations" section of [M2](https://github.com/reactor/reactor-core/releases/tag/v3.2.0.M2) and [M3](https://github.com/reactor/reactor-core/releases/tag/v3.2.0.M3) for more details.

We most need your feedback for the following features:

### [](#metrics)Metrics

Micrometer and `.metrics()` support ([#1183](https://github.com/reactor/reactor-core/issues/1183), [#1123](https://github.com/reactor/reactor-core/issues/1123)) has been added. The new `.metrics()` operator does something only if `Micrometer` is on the classpath.

It records metrics on `onNext` timings, subscription-to-completion timings, signal count, and others -- all from the perspective of what signals the immediate upstream operator produces.

It was introduced in M2 but has seen improvements in M3, as well as a (breaking) change in some of the tags names ([#1245](https://github.com/reactor/reactor-core/pull/1245)).

Note that an important goal was to avoid exposing Micrometer stuff in the public Reactor API. We didn't want to have a mandatory dependency to Micrometer, and we strove to contain its usage to internal classes loaded only if we detect it on the classpath.

> **Up next**: Before GA, there should also be basic instrumentation support for `Schedulers` (or rather the `ExecutorServices` that back some of the `Schedulers`). We are also looking at a way to choose a specific `MeterRegistry` globally for Reactor, again without exposing a public API that refers to the `MeterRegistry` interface.

### [](#advanced-retry)Advanced Retry

We added a preconfigured alternative to `retryWhen` with exponential backoff and jitter (`retryBackoff()`. See [#1122](https://github.com/reactor/reactor-core/issues/1122)).

This version of retry reflects what we think is the industry best practice in terms of retries. It is a good middle ground between the too simple `retry(n)`, the complex `retryWhen(Function)` and the more configurable `RetryFunction` from `reactor-addons`.

### [](#resource-based-reactive-closures)Resource-based reactive closures

To help you build reactive transactional blocks, we added [`usingWhen`](https://github.com/reactor/reactor-core/issues/1220). Like `using`, it wraps a resource, generates a `Flux` out of it, and ensures that the resource is properly cleaned up when the Flux terminates.

The major differences are:

-   The resource is provided asynchronously through a `Publisher`.
-   Cleanups are asynchronous as well (`Function<Resource, Publisher>`) and delay only the propagation of the terminal signals, NOT the onNext signals.
-   The operator can have separate async "cleanups" for complete, error, and cancel terminations.

This was introduced in M2 but slightly changed in M3 to fix `Context` propagation and to support cancellation of the `Publisher<Resource>`. By cancelling the main `Flux<T>` returned by this operator **before** the `Resource` is even emitted, your cancel instruction is propagated to the `Publisher<Resource>`.

### [](#ondiscard-hook)`onDiscard` hook

This global hook, which takes the form of a `Consumer<Object>`, is intended as the last missing piece for advanced users that deal with off-heap objects that need special cleanup.

Typically, Netty's `ByteBuf` or Spring 5's `DataBuffer` fall into this category: They are pooled, off-heap, and need a `release()` call once they're not used, lest there be a memory leak.

Such elements could fall between the cracks of reactive sequences and never reach user code in three broad situations:

1.  the operator's source is malformed and doesn't respect RS specification (for example, it emits a `ByteBuf` *after* having signalled `onComplete`).
2.  the operator filters some elements as part of its semantics (for example `filter`).
3.  the operator prefetches for backpressure optimization purposes and is cancelled, discarding its prefetch queue.

Case (1) was already covered by the `onNextDropped` hook, but case (3) was definitely not. Case (2) (filter semantics) was a bit in the middle, with the possibility of doing the cleanup *inside* the filtering `Predicate`, for example. But that was cumbersome and prone to be forgotten.

So we added the `onDiscard` to our repertoire of `Hooks` to cover (2) and (3). Note that, unlike the "continue on error" feature, for now, there is no public API to setup the hook on a specific `Flux` instance. There is an unsupported workaround with the `Context`, and an official API is likely to make an appearance in the GA or a later maintenance release.

The `onDiscard` hook has the following **characteristics and requirements**:

-   It is additive, meaning that invoking `Hooks.onDiscard(Consumer)` twice will combine the two consumers using `Consumer#andThen`.
-   It is not keyed, meaning that while multiple calls are additive, it can only be reset in full (not on a per-`Consumer` basis).
-   The `Consumer` MUST perform `instanceof` checks before casting, as it WILL be used with different types of objects.
-   The `Consumer` MUST NOT throw exceptions and should contain `try catch` blocks as needed.
-   The `Consumer` MUST be idempotent, as it might be invoked on the same instance multiple times (for example, in the case of overlapping buffers).

On a side note, `errorStrategyContinue()` **has been renamed in M3 to `onErrorContinue()`**.

# [](#reactor-extra-320m1)Reactor Extra 3.2.0.M1

Finally, `reactor-extra` has a more minor API change in the retry/repeat utils side of things. It aligns with the `core` operators, using the same default values and `Long` rather than `Integer` indexes.

# [](#next-steps)Next Steps

The next step for `reactor-core` is a rework of how the `Processor` objects are exposed. The current `FluxProcessor<IN, OUT>` is a bit bloated, because it extends and exposes the whole `Flux` API.

Additionally, the `FluxProcessor#sink()` and associated `FluxSink` are too easily misused, especially when one seeks to both subscribe a `Processor` to a `Publisher` source AND manually push data to it through the `sink()`, which isn't really supported currently. The fact that `sink()` should be called once and the returned `FluxSink<T>` instance should be reused is also not crystal clear.

So we are looking at a facade over `Processor<T, T>` that directly implements `FluxSink` (instead of `Flux`), works when both are used as a subscriber and a sink, and has an `asFlux()` view method to *optionally* build a chain of `Flux` operators on top of it.

`MonoProcessor` will likely follow in these steps by becoming a (simpler) interface, with the concrete implementation being renamed to `MonoNextProcessor`. We are also looking at offering a stand-alone implementation of a `MonoSink` that users can directly manipulate without the need to use `Mono.create()`.

# [](#conclusion)Conclusion

Cool people don't wait for the GA release! Go kick the tires on that shiny milestone, and, as always, feedback is welcome. :)

Happy reactive coding!