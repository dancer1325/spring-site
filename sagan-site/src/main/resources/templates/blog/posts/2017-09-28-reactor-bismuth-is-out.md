---
title: Reactor Bismuth is out
source: https://spring.io/blog/2017/09/28/reactor-bismuth-is-out
scraped: 2026-02-23T16:20:21.435Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Simon Baslé |  September 28, 2017 | 1 Comment
---

# Reactor Bismuth is out

_Releases | Simon Baslé |  September 28, 2017 | 1 Comment_

It is my great pleasure to announce the GA release of **Reactor Bismuth**, which notably encompasses `reactor-core` **3.1.0.RELEASE** and `reactor-netty` **0.7.0.RELEASE** ?

With the release of [Spring Framework 5.0](https://spring.io/blog/2017/09/28/spring-framework-5-0-goes-ga) now just happening, you can imagine this is a giant step for Project Reactor :)

![bismuth crystal](https://farm2.staticflickr.com/1434/5109110719_6f10365d85_m_d.jpg)

*Like the bismuth crystal this release is intricate*

   
The release contains a lot of changes and API polishing. For reactor-core you can find the exhaustive list in the [release notes](https://github.com/reactor/reactor-core/releases/tag/v3.1.0.RELEASE).

Important

There is a **known (minor) issue** with the `reactor-core` and `reactor-test` **sources** jars: They contain duplicate java source entries. See issue [#887](https://github.com/reactor/reactor-core/issues/887) for more details.

Let’s have an overview of what is new and noteworthy in this release:

-   [API Final Polishing](#api)
    
-   [Reactor-Test And Kotlin Extensions Moved](#moved)
    
-   [Kotlin And Null-Safety Support](#kotlin-null-safety)
    
-   [Documentation Polishing](#docs)
    
-   The major new feature in this release: [The `Context`](#context)
    
-   [Other Interesting New Features](#other-new)
    

## [](#api-final-polishing)[](#api)API Final Polishing

A number of API changes have been made between the last release in the 3.0.x cycle and 3.1.0. We wanted to get the best API out for the long run with Spring Framework 5, so these breaking changes were necessary. The release notes contain a more exhaustive list of such changes, but let’s have a look at a few of them.

### [](#error-handling-operators)[](#error-handling-operators)Error Handling Operators

The error handling operators have been made more consistent in both `Flux` and `Mono`. All use the `onError` prefix and the APIs are aligned in both classes:

-   **onErrorReturn** to switch to a fall-back value (formerly `otherwiseReturn` in Mono)
    
-   **onErrorResume** to switch to a fall-back `Publisher` (formerly `onErrorResumeWith` in Flux and `otherwise` in Mono)
    
-   **onErrorMap** to translate an `Exception` into another one (formerly `mapError` in both Flux and Mono)
    
-   **switchIfEmpty** to switch to a fall-back sequence if the source is empty (formerly `otherwiseIfEmpty` in `Mono`)
    
-   `Flux#switchOnError` has been removed, the same can be achieved with `onErrorResume` using a lambda that ignores its parameter.
    

### [](#alignment-between-flux-and-mono-concepts-and-operators)[](#alignment-between-code-flux-code-and-code-mono-code-concepts-and-operators)Alignment Between `Flux` And `Mono` Concepts And Operators

`Mono` API had a tendency to sometimes divert from the `Flux` API despite similar concepts. Where it makes sense, these separations have been fixed.

#### [](#alignment-of-when-and-zip-and-zipwith)[](#alignment-of-code-when-code-code-and-code-code-zip-code-and-code-zipwith-code)Alignment of `when`, `and`, `zip`, and `zipWith`

For instance, `Mono` had a `and` operator and `when` static methods **which used to combine elements and to produce `Mono<Tuple2>`**. In essence, they were essentially a specialization of `zipWith` and `zip` in `Flux`, but having different names made it difficult to attach the concepts. That is why these methods have been renamed in `Mono`.

On the other hand, you’ll notice that a different flavor of `when` and `and` is still present in the `Mono` API. Contrary to the ones we saw previously, these return a `Mono<Void>`. Dealing with completion of tasks is an essential use case of `Mono`, and these methods are now specifically tailored for that sort of application: they will combine and execute several tasks (represented as source Monos), ignore their potential `onNext` signal and only propagate the combination of `onComplete` signals, resulting in a `Mono<Void>` that completes whenever the N tasks complete.

#### [](#consistent-semantic-of-the-then-prefix)[](#consistent-semantic-of-the-code-then-code-prefix)Consistent Semantic Of The `then` Prefix

Similarly, the `then` prefix now consistently indicates that the `onNext` of the source are to be discarded, instead building up on the terminal signals. This has been made consistent in both `Flux` and `Mono`:

-   `then()` returns a `Mono<Void>` that only propagates the `onComplete` or `onError` signal from the source.
    
-   `then(Mono<V>)` returns a `Mono<V>`: it waits for the original `onComplete` signal before switching to another provided `Mono`, emitting only the elements from that other `Mono`.
    
-   `thenMany(Publisher<V>)` is similar, except it continues into a `Flux<V>`.
    
-   `thenEmpty(Publisher<Void>)` returns a `Mono<Void>` that completes once the original `Mono` *then* the `Publisher` have completed. That is, it represents sequential completion, unlike `and` which subscribes to both sequences immediately.
    

Note that variants that were taking a `Supplier` parameter have been removed altogether (their lazy semantics can be replaced by a `Mono.defer`). Also, the `Mono#thenEmpty` described above was renamed from `then(Publisher<Void>)`.

#### [](#how-one-then-was-really-a-flatmap)[](#how-one-code-then-code-was-really-a-code-flatmap-code)How One `then` Was Really A `flatMap`

`Mono` used to have another interesting `then` variant:

```
CopyMono<V> then(Function<T, Mono<V>> thenFunction);
```

When looking closely, this didn’t fit with the new semantic of `then*` focusing on the terminal signals. Rather, it would transform the source into another `Mono` *depending on the source’s* `onNext`. Sounds familiar? This is indeed consistent with what `Flux#flatMap` does!

There was one problem, though: `Mono` already had a `flatMap` operator:

```
CopyFlux<V> flatMap(Function<T, Publisher<V>> mapper);
```

After thinking a bit more about it, we recognized that the classic semantic of `flatMap` is to return a value of the same type as the one `flatMap` is applied to. So it was more correct to have `Mono#flatMap` return a `Mono`…​

As a result, we renamed this then variant to `flatMap` and we used the `Many` suffix on the variant that would return a `Flux`:

```
CopyMono<V> flatMap(Function<T, Mono<V>> mapper);
Flux<V> flatMapMany(Function<T, Publisher<V>> mapper);
```

Tip

In order to ease the migration, we advise you to search for all usage of the old `Mono.flatMap` and replace these with `flatMapMany` first. Then search for `then(Function)` uses and replace those with `flatMap`.

### [](#various-api-simplifications)[](#various-api-simplifications)Various API Simplifications

**Time**: In this release, all the operators dealing with time do so exclusively via the `Duration` type. Most used to have a variant with the `*Millis` suffix that was using a `long` and a `TimeUnit` to represent a duration. These variants have been removed in 3.1.0.

**Delaying Errors**: Another cross-cutting change dealing with suffixes: some operators have an optional configuration where they can combine multiple errors and emit the `onError` signal at the very end, allowing for some values to still make it in the resulting sequence. For example, `flatMap` can either stop immediately if an inner sequence emits `onError` or continue merging the elements from other inner sequences before propagating that error.

In some instances, that optional behavior was represented in the API as a `boolean` flag parameter. In other instances, it was a separate variant suffixed with `DelayError`. In 3.1.0, all these variants have been aligned to consistently use the `*DelayError` suffix rather than the boolean flag.

**Simplified Interfaces**: Some specialized interfaces have also been removed in favor of simpler or more generic alternatives:

-   The `Cancellation` interface has been removed in favor of the more generic `Disposable` one.
    
-   The `TimedScheduler` interface has been removed. The few `Scheduler` that are not time-capable will throw a `RejectedExecutionException` indicating so whenever one attempts to use `schedulePeriodically` on them. Also, `Scheduler#shutdown` has been removed in favor of `dispose()` from Disposable.
    
-   Several interfaces used for introspection have been simplified into a single `Scannable` interface, which exposes information about the current state of an operator (in a best effort fashion) through its `scan(Scannable.Attr)` method.
    
-   `QueueSupplier` has been renamed to `Queues` and is purely a utility class now (and not a `Supplier` anymore).
    

## [](#reactor-test-and-kotlin-extensions-moved)[](#moved)Reactor-Test And Kotlin Extensions Moved

Both Kotlin Extensions and Reactor Test artifacts have been directly integrated into the main repository of `reactor-core`:

-   Kotlin extensions are part of the `reactor-core` artifact. No need for a dependency to `io.projectreactor:reactor-kotlin-extensions` anymore.
    
-   `reactor-test` is now under the same groupId as `reactor-core`.
    
    -   Replace `io.projectreactor.addons:reactor-test` with `io.projectreactor:reactor-test`.
        

## [](#kotlin-and-null-safety-support)[](#kotlin-null-safety)Kotlin And Null-Safety Support

During this release cycle, an ongoing effort to better integrate with languages like Kotlin has been made.

This notably translates to some API rework in order to avoid ambiguous signatures with lambdas. Whenever a method had two overrides that where just differing by the type of functional interface they took, we extracted one of the variants as a new suffix for the operator.

For example, consider `buffer(Publisher, Supplier)` and `buffer(Publisher, Function)`. The second variant has been renamed to `bufferWhen`, as it creates a buffer *when* the companion `Publisher` from that `Function` emits.

As we saw above, the **Kotlin extensions** have also been integrated directly into the reactor-core repository.

Additionally, support for null-safety analysis has been improved through the introduction of three annotations. These annotations build upon JSR 305 which, despite being dormant, is drawn on by multiple static analysis tools including the IntelliJ IDE. The following annotations are provided in the `reactor.util.annotation` package:

-   `@NonNull` indicates that a specific parameter, return value, or field cannot be null. (It is not needed on parameters and return value where `@NonNullApi` applies) .
    
-   `@Nullable` indicates that a parameter, return value, or field can be null.
    
-   `@NonNullApi` is a package level annotation that indicates non-null is the default behavior for parameters and return values.
    

We leverage these annotations to express an explicit and actionable null-safety contract on all public Reactor Core APIs.

## [](#documentation-polishing)[](#docs)Documentation Polishing

The documentation has also received some love: the [reference guide](http://projectreactor.io/docs/core/release/reference) is finally complete and the javadoc have been reviewed and reworded in order to describe some methods more clearly.

With the support for Kotlin being integrated directly into reactor-core, a [new section](http://projectreactor.io/docs/core/release/reference/docs/index.html#kotlin) has been added to the reference guide and the KotlinDocs are [published](http://projectreactor.io/docs/core/release/kdoc-api/).

## [](#the-context)[](#context)The `Context`

Contextual data can now be attached to a `Flux` or `Mono`, per subscription, as a Map-like `Context` object!

This is an advanced feature that will mostly interest library developers, but we know it will prove invaluable in migrating features that formerly relied on `ThreadLocal` in imperative code for example.

In the Spring portfolio, we expect both `spring-security` and `spring-cloud-sleuth` to benefit greatly.

In order to add information to the `Context`, use the `subscriberContext(Context)` operator, like in the following example:

```
CopyMono<String> put = doPut("www.example.com", Mono.just("Walter"))
    .subscriberContext(Context.of(HTTP_CORRELATION_ID, "2-j3r9afaf92j-afkaf"))
    .filter(t -> t.getT1() < 300)
    .map(Tuple2::getT2);
```

Tip

The `Context` is immutable and is propagated during the *subscription* phase, which runs from the end of the chain (`subscribe()` call) toward the beginning of the chain.  
As a result, what you put into the `Context` via `subscriberContext` results in an enriched copy of the `Context` **visible only by the operators above it**.

In order to retrieve and use the information put inside the `Context`, the upstream chain of operators can make use of `Mono.subscriberContext()`, which materializes the visible `Context` (e.g. inside a `flatMap`).

It could look like the following snippet:

```
CopyMono<Tuple2<String, Optional<Object>>> dataAndContext =
  data.zipWith(Mono.subscriberContext()
                   .map(c -> c.getOrEmpty(HTTP_CORRELATION_ID))
  );
```

Head to the [reference guide](http://projectreactor.io/docs/core/release/reference/docs/index.html#context) to learn more about `Context`.

## [](#other-interesting-new-features)[](#other-new)Other Interesting New Features

### [](#added-the-expand-operator)[](#added-the-code-expand-code-operator)Added The `expand` Operator

This operator can be used to recursively *expand* source elements into nested `Publishers`, producing a graph of `Publisher` either depth-first or breadth-first.

### [](#mapping-null-provider-to-the-empty-mono)[](#mapping-code-null-code-provider-to-the-empty-code-mono-code)Mapping `null` Provider To The Empty `Mono`

When transforming a source `Callable` or `Supplier` that returns `null` into a `Mono`, `fromCallable` and `fromSupplier` used to emit an error. They now accommodate the `null` result and produce an empty `Mono` instead.

### [](#added-ability-to-name-and-tag-a-reactive-sequence)[](#added-ability-to-code-name-code-and-code-tag-code-a-reactive-sequence)Added Ability To `name` And `tag` A Reactive Sequence

A single `name(String)` can be given to a `Flux`. It can be retrieved using `Scannable.name()`, which walks the chain of operators upstream until it finds a first declared name.

Similarly, several `tag(String, String)` key-pairs can be associated with a `Flux` or `Mono`. These can be retrieved as a `Stream<Tuple2<String, String>>` by the `Scannable#tags()` method, which walks the whole chain of operators upstream.

### [](#added-a-distinctuntilchanged-variant-with-a-bipredicate)[](#added-a-code-distinctuntilchanged-code-variant-with-a-code-bipredicate-code)Added A `distinctUntilChanged` Variant With A `BiPredicate`

Rather than using `Set` semantics to evaluate if there is a change, the `BiPredicate` is applied on the current source element and last emitted element. This makes it possible to skip elements if they are *too close to* the last emitted element (e.g. `Doubles` with a difference < 1).

### [](#added-monocacheduration)[](#added-code-mono-cache-duration-code)Added `Mono.cache(Duration)`

This allows to easily cache a hard-to-compute single value (or error) for a limited amount of time. First subscriber to come in after the TTL period will re-trigger a subscription to the source.

### [](#cost-improvement-for-checkpointstring)[](#cost-improvement-for-code-checkpoint-string-code)Cost Improvement For `checkpoint(String)`

The `checkpoint(String)` variant is now light by default, which means there is no stack trace filled on instantiation (making the operator less costly to use). We now assume the `String` identifier is unique enough that it would be sufficient to find the instantiation point of a sequence that terminates in error.

### [](#adding-a-grace-period-to-refcount)[](#adding-a-grace-period-to-code-refcount-code)Adding A Grace Period to `refCount`

When using `refCount`, one can now provide a `Duration`. When the number of subscribers to the reference counted sequence falls below the threshold, the operator waits for that duration instead of immediately unsubscribing from the source. No cancellation happen in case enough subscribers come back within this grace period.

### [](#mono-delayuntil-replaces-untilother)[](#mono-code-delayuntil-code-replaces-code-untilother-code)Mono `delayUntil` Replaces `untilOther`

The `delayUntil` operator delays the emission of a `Mono` until after a companion `Publisher`, generated from the source value, completes.

Note that there was an `untilOther` operator that has been removed. It used to also delay, but trigger on the first `onNext` of the companion. `delayUntil` is more flexible, as the same behavior can be achieved by appending a `take(1)` to the companion.

### [](#test-features)[](#test-features)Test Features

The `reactor-test` artifact also has a few new features:

-   New expectations around verification of errors compatible with using assertions: `expectErrorSatisfies` and `verifyErrorSatisfies`.
    
-   Added an optional configurable default timeout for `StepVerifier#verify()`. Set it up by using the static `StepVerifier#setDefaultTimeout` method.
    
-   Added a `PublisherProbe` to easily check that a complex chain of operators with conditional switches (e.g. `switchIfEmpty`) does go through a logical branch, while still emitting meaningful data for the test by wrapping any `Flux` or `Mono`.
    

# [](#conclusion)[](#conclusion)Conclusion

If you’re new to Reactor, now is an exciting time to start your reactive journey with Spring Framework 5.0. If you’re not, we hope that’ll you enjoy working with Reactor even more now that all these changes have been put in place.

If you encounter any migration difficulty, have a look at the [release notes](https://github.com/reactor/reactor-core/releases/tag/v3.1.0.RELEASE) or ask for help on our [Gitter](https://gitter.im/reactor/reactor).

Happy Reactive Coding!

*bismuth crystal photo CC-By-SA David Abercrombie via [Flickr](https://www.flickr.com/photos/albategnius/)*