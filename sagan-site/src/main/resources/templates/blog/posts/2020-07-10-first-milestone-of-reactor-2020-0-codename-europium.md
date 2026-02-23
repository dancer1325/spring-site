---
title: First milestone of Reactor 2020.0 (Codename Europium)
source: https://spring.io/blog/2020/07/10/first-milestone-of-reactor-2020-0-codename-europium
scraped: 2026-02-23T13:55:09.091Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Simon Baslé |  July 10, 2020 | 2 Comments
---

# First milestone of Reactor 2020.0 (Codename Europium)

_Engineering | Simon Baslé |  July 10, 2020 | 2 Comments_

Earlier this month, we released a first milestone of Reactor 2020.0. This cycle, codename `Europium`, follows the Dysprosium one (which included reactor-core 3.3.x and reactor-netty 0.9.x).

It includes reactor-core `3.4.0` and reactor-netty `1.0.0`.

In this blog post, we'll cover a few highlights of the reactor-core milestone, and briefly mention what's in store for M2.

For reactor-netty, we'll link to a separate blog post here as soon as it is out.

Note also that there is a new versioning scheme in place, which has been adopted accross the Spring portfolio: see the [reference guide](https://projectreactor.io/docs/core/snapshot/reference/#getting-started-understanding-bom) and [this blog post](https://spring.io/blog/2020/04/30/updates-to-spring-versions).

# [](#changes-around-processor)Changes around `Processor`

The main change in core is a long overdue effort around `Processor` implementations in Reactor and how they are exposed.

This is the main focus of `reactor-core 3.4.0-M1`, and the goal is to phase out usage of the concrete flavor of `FluxProcessor` (and to some extent `MonoProcessor`).

`Processor` is an interface from Reactive Streams, originally intended as a way to represent a "step" in a reactive pipeline that could be shared between libraries.But these days, operators are largely directly implemented as `Publisher/Subscriber` pairs, so in Reactor processors end up covering different use cases (most often, multicasting from one `Publisher` to multiple `Subscriber`).

So most often, users are looking at processors as a way to "manually create a `Flux`": rather than connecting a `Processor` to a parent publisher (aka using it as a `Subscriber`), they directly call its `onNext`/`onComplete`/`onError` methods. This is unfortunately a problematic approach, because such calls MUST be made in a way that conforms to the Reactive Streams specification, meaning that they need to be externally synchronized.

Historically, this has been alleviated by the introduction of the `sink()` method on `FluxProcessor`. The idea was that if you want to use the `FluxProcessor` in a manual way like this, you would need to instantiate the processor flavor you want, then call its `sink()` method ONCE and use the resulting `FluxSink` from there on to trigger signals to subscribers. Downstream, the `FluxProcessor` itself is exposed (as a `Flux` on which operators can be composed).

This is still problematic from a discoverability standpoint, because the "right way" of cattering to the most common use case is the hardest to come up with.

With 3.4.0, we intend to turn that around and put the `Sink` usage pattern in the spotlight as the first class citizen, and make the `Processor` usage pattern harder to accidentally discover or misuse.

This first milestone makes a first step towards that by:

-   deprecating all concrete implementations of `FluxProcessor`, which are now slated for removal in `3.5.0`
-   exposing a `Sinks` utility class that bears factory methods for sinks aimed to be manually triggered

In M1 the flavors of processors are still there but the factory methods have been copied over the `Processors` class, *but that is already being reworked in M2*. We intend to move the choice of flavors on `Sinks` instead in M2. There would then be a way to turn a `Sink` into a `FluxProcessor` from there on, removing the need for `Processors` in M2.

# [](#migrating-away-from-concrete-processors-in-m1)Migrating away from concrete processors in M1

In `M1`, all factory methods on concrete `xxxProcessor` (eg. `UnicastProcessor.create()`) have been moved to either `Processors` for the base case or `Processors.more()` for the overloads that allow finer tuning. The methods distinguish flavors by prefixes:

-   `UnicastProcessor` -> `Processors.unicast()` and `Processors.more().unicast(...)`
-   `EmitterProcessor` -> `Processors.multicast()` and `Processors.more().multicast(...)`
-   `DirectProcessor` -> `Processors.more().multicastNoBackpressure()`
-   `ReplayProcessor` -> `Processors.replayAll()`/`replay(int)`/`replayTimeout(Duration)`/`replaySizeAndTimeout(int, Duration)` and similar methods on `Processors.more()`

All these processors conceptually have the same input and output type `<T>`, so they are `FluxProcessor<T,T>`. A convenience interface `FluxIdentityProcessor<T>` has been introduced in M1 but it doesn't bring much other than reducing the number of generics, so it might be removed in M2.

But rather than using a `FluxProcessor` from `Processors`, we said one should favor using `Sinks`. In this scenario, one would get a sink first and turn it into a `Flux` or `Mono` for the rest of the application to compose upon, like in the below example:

```
Copy//you get the sink first and foremost
StandaloneFluxSink<Integer> sink = Sinks.multicast();

//this is what the rest of the application sees and uses
Flux<Integer> flux = sink.asFlux();
flux.map(i -> i * 10).subscribe();
flux.filter(i -> i % 2 == 0).subscribe();

//this is how you push data to the subscribers through the sink (thread safe)
sink.next(1);
sink.next(2);
sink.next(3);
sink.next(4);
sink.complete();
```

Note that the class currently offers less variants than `Processors`, but this is being reconsidered for M2.

# [](#deprecations-and-removals)Deprecations and Removals

Several classes that were deprecated back in 3.3.0 have been **removed**:

-   `TopicProcessor`
-   `WorkQueueProcessor`

The `Schedulers.boundedElastic()` has been out since 3.3.0 and we think we can now **deprecate** its ancestor, `elastic()`, rather than just recommend using boundedElastic over elastic.

Further down the road, in 3.5.0, the `elastic` `Scheduler` will be removed.

# [](#reactor-netty-is-hitting-10)Reactor-Netty is hitting 1.0

There is much much to cover here, which we'll do in a separate blog post.

# [](#conclusion)Conclusion

Please try out the [M1](https://repo.spring.io/milestone/io/projectreactor/reactor-core/3.4.0-M1/)!

We're already making further changes to sinks and processors in M2, along with other themes like `Context` operators, avoiding thrown exceptions in `subscribe` and improving the story around metrics.

As always, feedback for both M1 and current M2 snapshots is very welcome.

In the meantime, happy reactive coding ! The Reactor Team.