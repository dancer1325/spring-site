---
title: Context Propagation with Project Reactor 2 - The bumpy road of Spring Cloud Sleuth
source: https://spring.io/blog/2023/03/29/context-propagation-with-project-reactor-2-the-bumpy-road-of-spring-cloud
scraped: 2026-02-23T09:56:48.474Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Dariusz Jędrzejczyk |  March 29, 2023 | 0 Comments
---

# Context Propagation with Project Reactor 2 - The bumpy road of Spring Cloud Sleuth

_Engineering | Dariusz Jędrzejczyk |  March 29, 2023 | 0 Comments_

This post is a part of a series:

1.  [The Basics](https://spring.io/blog/2023/03/28/context-propagation-with-project-reactor-1-the-basics)
2.  [The bumpy road of Spring Cloud Sleuth](https://spring.io/blog/2023/03/29/context-propagation-with-project-reactor-2-the-bumpy-road-of-spring-cloud)
3.  [Unified Bridging between Reactive and Imperative](https://spring.io/blog/2023/03/30/context-propagation-with-project-reactor-3-unified-bridging-between-reactive)

Spring Cloud Sleuth recently [became Micrometer Tracing](https://micrometer.io/docs/tracing), part of the Micrometer project. Most of the tracing instrumentation is centered within Micrometer under the new [Observability API](https://micrometer.io/docs/observation). The goal of these projects is to enable observability of any application – in the form of metrics, tracing, and logs that contain correlation identifiers. To achieve this goal, libraries require a way to transport contextual information. When applications deal with asynchrony in any form, that task becomes quite a challenge. In the previous article, we went through the basics of context propagation with `ThreadLocal`s and Reactor `Context`.

Spring Cloud Sleuth went through many pivots in the approach to asynchronous context propagation. As Sleuth deals with third-party instrumentation libraries that don’t need to have a reactive API, having an established way to make the context available to them is vital. These libraries often don’t assume asynchrony but rely on a static `ThreadLocal` state. For years, `ThreadLocal`s have provided JVM applications with implicit, contextual storage for driving the observability features. Over time, Project Reactor introduced various hooks and wrapping mechanisms on top of the underlying primitives in order to make the bridging between reactive and imperative possible. In this article, we aim to explore the approaches to propagate context to `ThreadLocal` values and discuss the potential errors with them. We’ll explore the approaches Sleuth took and conclude with a summary of what we discovered as a good compromise that is performant and semantically sound.

Before we describe the approaches that Sleuth introduced, we should consider the dangers that lie in bridging between the imperative and reactive world.

## [](#pitfalls-of-side-effects-in-the-face-of-hidden-concurrency)Pitfalls of Side Effects in the Face of Hidden Concurrency

We discussed some of the potential problems with `Thread` switches and related side effects in the previous article. Now we will explore the properties of reactive programming a little more by using Reactor’s plugin mechanism to solve issues that we may encounter.

To summarize all the issues Spring Cloud Sleuth ran into is a moving target. Also, there are numerous implementations in organizations that implement their own mechanisms for context propagation, for example, for populating SLF4J’s `MDC`. This article is not intended to be a comprehensive summary of all the potential pitfalls. It rather aims to build some intuition that will help you understand the ultimate truth: you either play by reactive programming rules or you prepare to lose in the most unexpected moments.

## [](#scheduler-hook)Scheduler Hook

As we know, reactive chains can propagate signals using different `Thread`s. From what we learned in [the previous article](https://spring.io/blog/2023/03/28/context-propagation-with-project-reactor-1-the-basics), when execution is continued on another `Thread`, it makes sense to restore the context when a task is run. Project Reactor delegates the task of managing `Thread`s to `Scheduler`s. It also provides a dedicated hook that allows intercepting the scheduling and running of a particular unit of work: the `Schedulers.onScheduleHook`. It works in a similar way as the `WrappedExecutor` from the previous article. Let’s see a scenario when we might consider using it.

### [](#cleanup)Cleanup

In Part 1 we understood that we can’t rely on `ThreadLocal` values to be available consistently within a reactive chain. What if we tried to initialize it at subscription time, and clear it in the `doFinally` operator? Our applications can handle many requests, some of them concurrently, using a limited number of `Thread`s. As those platform `Thread`s can be reused, we need to perform cleanup of any `ThreadLocal` state associated with one request before processing another so that a different request does not use a leftover correlation identifier.

The code samples that follow are alterations to the code we wrote in the previous part, in which we didn’t use the Reactor `Context`.

A potential implementation of the `handleRequest` method could look like this:

```java
CopyMono<Void> handleRequest() {
  return Mono.fromSupplier(() -> {
    initRequest(); // <1>
    return "test-product";
  }).flatMap(product ->
    Flux.concat(
      addProduct(product),
      notifyShop(product)).then())
    .doOnSuccess(v -> log("Done."))
    .doFinally(signalType ->
      CORRELATION_ID.remove()); // <2>
}
```

In `<1>` we set the `ThreadLocal` value, and in `<2>` we attempt to clear it.

We also modify the actions we perform to be able to add an artificial delay in the `addProduct` method:

```java
CopyMono<Void> addProduct(String productName) {
  return Mono.defer(() -> {
    log("Adding product: " + productName);
    return Mono.<Void>empty()
      .delaySubscription(Duration.ofMillis(10),
        Schedulers.single()); // <1>
  });
}

Mono<Boolean> notifyShop(String productName) {
  return Mono.defer(() -> {
    log("Notifying shop about: " + productName);
    return Mono.just(true);
  });
}
```

Notice that, in `<1>`, we introduce asynchrony by delaying the subscription and use `Schedulers.single()` to initiate the subscription after 10ms. The `delaySubscription` will use that `Scheduler`’s underlying `ScheduledExecutorService` and initiate the subscription on another `Thread` after the delay.

From the previous article, we know we need to restore `ThreadLocals` in such a case, so we use the mentioned `Scheduler` plugin to achieve that:

```java
CopySchedulers.onScheduleHook("context.propagation", WrappedRunnable::new);
```

Every task executed on Reactor’s `Scheduler`s will restore the `ThreadLocal` values, so we should be safe.

Now, let’s imitate two sequential requests, separated by a log validating that `CORRELATION_ID` is cleared properly:

```java
Copylog("Got first request, calling handler");
handleRequest().block();

log("Got second request, calling handler");
log("There should be no correlationId on this line!");

handleRequest().block();
```

The logs are as follows:

```
Copy[      main][                null] Got first request, calling handler // <1>
[      main][ 8658769170992364531] Adding product: test-product
[  single-1][ 8658769170992364531] Notifying shop about: test-product
[  single-1][ 8658769170992364531] Done.
[      main][ 8658769170992364531] Got second request, calling handler
[      main][ 8658769170992364531] There should be no correlationId on this line!
[      main][  711436174608061530] Adding product: test-product
[  single-1][  711436174608061530] Notifying shop about: test-product
[  single-1][  711436174608061530] Done.
```

The logs related to `“test-product”` processing have correct correlation identifiers. However, what happened in between the requests? We expected to have the `ThreadLocal` be cleared in `doFinally`. Unfortunately, the log in between requests still contains an identifier. What happened then?

Notice the `“Notifying shop about”` log happened on `Thread` `single-1`. The signal was delivered on that `Thread`, so we cleared the `ThreadLocal` there, but left the main `Thread` polluted (in `<1>`). Now the execution outside of our handler can use the wrong correlation identifier for different purposes. We could try to mitigate this issue by adding cleanup logic to the server layer (which dispatches requests) and make sure every `Thread` used for a request is not polluted. This wouldn’t save all the other potential `Scheduler` `Thread`s if our pipeline were more complex.

This approach gets quite far in allowing an application to use `ThreadLocal` values transparently within a reactive chain. It’s also reasonable from a performance perspective, since it does not set and reset `ThreadLocal` around every operator, but only when there is a `Thread` switch when processing the items. However, it also shows there are side effects that remain unsolved. In the next examples we will experience and attempt to tackle different scenarios.

### [](#difficulties-with-external-sources-and-sinks)Difficulties with External Sources and Sinks

Another common issue for the strategies that use `ThreadLocal` as the transport mechanism for contextual metadata is when a different asynchronous library than Reactor is used and it switches `Thread`s on its own. When the execution changes to a different `Thread` that is not controlled by a wrapped `ExecutorService`, the context is lost.

Let’s see this in action. We will reuse most of the code we’ve seen so far, with one change to the `notifyShop` method. It now imitates a remote call by using the following method:

```java
CopyMono<Boolean> makeRequest(String productName) {
  return Mono.fromFuture(CompletableFuture.supplyAsync(() -> true,
    CompletableFuture.delayedExecutor(100, TimeUnit.MILLISECONDS)));
}
```

So `notifyShop` looks like this:

```java
CopyMono<Boolean> notifyShop(String productName) {
  return Mono.defer(() -> {
    log("Notifying shop about: " + productName);
    return makeRequest(productName);
  });
}
```

If we trigger the handler once:

```java
CopyhandleRequest().block();
```

We get the following output:

```
Copy[      main][  683056557275963407] Adding product: test-product
[  single-1][  683056557275963407] Notifying shop about: test-product
[l-worker-1][                null] Done!
```

The logs shorten the `Thread` names for better visibility, but `l-worker-1` is actually a shortened version of `ForkJoinPool.commonPool-worker-1`.

As we can see, our execution continued on a common `ForkJoinPool` that we don’t control. One problem is that we no longer see our correlation identifier starting from that `Thread` switch, but another is that we perform cleanup on a `Thread` that is actually missing the correlation information.

We could potentially improve the situation (partially) with `Executor` or task wrapping, as presented in the previous article, but we don’t always have such control - for example, if we call an external library that uses `CompletableFuture`.

## [](#operator-hooks)Operator Hooks

We’re almost ready to discuss Sleuth’s strategies. `Schedulers.onScheduleHook` offers limited capability with regards to the non-obvious `Thread` switches that can happen in reactive processing. We need more control over the execution of operations. We will demonstrate the limitations by introducing two flavors of external service communication.

The `addProduct` method now makes a remote request and publishes the result on a `Scheduler` we control. It is common to offload heavy computations to a different `Thread`. For that purpose, we use the `publishOn` operator:

```java
CopyMono<Void> addProduct(String productName) {
  return Mono.defer(() -> {
    log("Adding product: " + productName);
    return makeRequest(productName)
      .publishOn(Schedulers.single())
      .then();
  });
}
```

The `notifyShop` method emulates mapping the result into potentially multiple `Publisher`s. That can be a typical scenario in case the response is a composite result - for example, if the response is a JSON array and we intend to process each item as a separate call to another service or enrich the individual result. Let’s use a simplified version and take only a single result:

```java
CopyMono<Boolean> notifyShop(String productName) {
  return Mono.defer(() -> {
    log("Notifying shop about: " + productName);
    return makeRequest(productName)
      .flatMapMany(result ->
        Flux.just("result")
          .map(x -> result))
          .take(1)
          .single();
    });
}
```

Let’s skip the handler for now and manually initiate the correlation identifiers and then subscribe to these chains:

```java
CopyinitRequest();
addProduct("test-product")
  .doOnSuccess(v -> log("Added."))
  .block();

initRequest();
notifyShop("test-product")
  .doOnSuccess(v -> log("Notified."))
  .block();
```

Let’s see the output:

```
Copy[      main][ 6606077262934500649] Adding product: test-product
[  single-1][                null] Added.
[      main][  182687922231622589] Notifying shop about: test-product
[l-worker-1][                null] Notified.
```

This is expected, as both logs that happen in `doOnSuccess` are triggered as a result of the `CompletableFuture` delivering the value on a `ForkJoinPool` `Thread`. Even though we have `Scheduler` wrapping, the result is first delivered on a `Thread` we don’t control, so even `publishOn` used in `addProduct` doesn’t help.

Can we do anything to improve the situation? Reactor has a fine-grained plugin system, which lets us decorate any operator within any pipeline. We can try to use it for the purpose of restoring the correlation identifier.

The plugins will use a custom `Subscriber` implementation, which captures the correlation identifier upon subscription:

```java
Copystatic class CorrelatingSubscriber<T> implements CoreSubscriber<T> {
  final CoreSubscriber<T> delegate;
  Long correlationId;

  public CorrelatingSubscriber(CoreSubscriber<T> delegate) {
    this.delegate = delegate;
  }

  @Override
  public void onSubscribe(Subscription s) {
    delegate.onSubscribe(s);
    this.correlationId = CORRELATION_ID.get();
  }

  @Override
  public void onNext(T t) {
    CORRELATION_ID.set(this.correlationId);
    delegate.onNext(t);
  }

  @Override
  public void onError(Throwable t) {
    CORRELATION_ID.set(this.correlationId);
    delegate.onError(t);
  }

  @Override
  public void onComplete() {
    CORRELATION_ID.set(this.correlationId);
    delegate.onComplete();
  }
}
```

To alter an operator to have our implementation delegate calls to an actual `Subscriber` instance, we can use the `Operators.lift` method:

```java
CopyOperators.lift((scannable, subscriber) ->
  new CorrelatingSubscriber<>(subscriber));
```

### [](#oneachoperator-hook)onEachOperator Hook

First, we’ll try a plugin, which lets us alter every single operator in the chain:

```java
CopyHooks.onEachOperator(
  Operators.lift((scannable, subscriber) ->
    new CorrelatingSubscriber<>(subscriber)));
```

Let’s run our example once more and examine the output:

```
Copy[      main][ 7295088917002526647] Adding product: test-product
[  single-1][ 7295088917002526647] Added.
[      main][  383851863754448684] Notifying shop about: test-product
[l-worker-1][  383851863754448684] Notified.
```

Wow! We managed to get the correlation identifier even in such complicated scenarios. The initial act of subscribing caught the `ThreadLocal` value and restored it in each step. Even the `flatMap` used in the `notifyShop` method (which subscribes on its own) works, because, prior to subscribing on another `Thread`, the `ThreadLocal` is populated from a previous capture! This does sound wonderful indeed, but there are drawbacks of this approach. The first and most obvious one is performance. The propagation takes place for each and every operator. With that technique, we first decorate every object, as well as make `ThreadLocal` accesses in every step. All of them are expensive. To learn more, watch [Oleh’s talk about Reactive Performance](https://www.youtube.com/watch?v=pyqIpqCt8PU).

### [](#onlastoperator-hook)onLastOperator Hook

So let’s try a different approach. This time, we’ll use a plugin that attaches to every operator that is considered the last one in the chain – an operator directly before a `subscribe()` call.

One observation can be made about reactive chains: In the case of synchronous operators, we don’t need to restore the initially captured context in each individual manipulation (for example, `filter` or `map`) but only when the last operator in the chain is subscribed to. This mechanism works as long as there is no `Thread` boundary crossing involved. To support operators that potentially cross these boundaries (such as `flatMap`, which involves subscribing to a new `Publisher`), there is a special trick involved. It treats the results of the mapping as the last operators for the internal `Publishers` that they operate on.

Let’s try this approach:

```java
CopyHooks.onLastOperator(
  Operators.lift((scannable, subscriber) ->
    new CorrelatingSubscriber<>(subscriber)));
```

And run:

```
Copy[      main][ 2122332013640150746] Adding product: test-product
[  single-1][ 2122332013640150746] Added.
[      main][  459477771449275997] Notifying shop about: test-product
[l-worker-1][                null] Notified.
```

It worked with `publishOn` in `addProduct` but fails for the `flatMap` in `notifyShop`.

Let’s analyze why `notifyShop` fails. Our call to `block()` captures the `ThreadLocal` and restores it for every signal traveling downstream. With the mapping done in `flatMapMany`, we are dealing with an asynchronous boundary that we mentioned before. Our plugin is, in fact, applied to the internal source (`Flux.just().map().single()`).

However, these efforts still didn’t help, despite the fact that the custom `Subscriber` is called internally in `flatMapMany` and tries to restore the `ThreadLocal` value. The signal triggering the internal subscription was initiated on a `Thread` we don’t control, so we have no `ThreadLocal` to capture in the first place.

It is different in the case of the `publishOn` operator. The subscription to it begins in a `Thread` we control. Therefore, when a signal is processed as a result from the `makeRequest()` method, it is only delivered on a `Thread` that is in our control. The execution of `.doOnSuccess(v -> log("Added."))` happens after a different `Thread` boundary than in the case of `flatMapMany`.

That’s why `onEachOperator` covers more cases - it restores the initial value at each step, regardless of asynchronous boundaries. The performance is slightly better with `onLastOperator` than with `onEachOperator` though.

### [](#addqueuewrapper-hook)addQueueWrapper Hook

There is one more plugin that we can use to get full control over the reactive delivery if we combine it with the previous hooks. It is also used by Spring Cloud Sleuth. We are thinking about a recently introduced plugin, `Hooks.addQueueWrapper`. We will not explore it in detail, though. It can solve the problem introduced by a work-stealing mechanism in Reactor. Asynchronous operators, such as `flatMap`, can make progress on various `Thread`s that deliver signals to the operator. Imagine a backpressure scenario where the processing is stalled for a while. At some point, a new `Thread` can take over and issue a `Subscription.request(n)` call, which causes the accumulated values to be delivered immediately. Now you can ask yourself: “what accumulated values?” That is a good question. A lot of operators in Reactor use internal `Queue`s to make backpressure possible or to preserve the serial delivery semantics. Because the draining of these `Queue`s can happen on any `Thread`, the contextual information should be attached to every signal stored in the `Queue` - namely, the `ThreadLocal` value for our correlation purposes. That’s what we’d need a `Queue` wrapper for - upon submitting a value into the `Queue`, we capture the `ThreadLocal` state. When a value is retrieved from the `Queue`, the state is restored.

## [](#context-propagation-in-spring-cloud-sleuth)Context Propagation in Spring Cloud Sleuth

Having shown what are the risks of operating outside of the reactive-streams terms and what mechanisms we can use to propagate `ThreadLocal` context, let’s summarize the four [strategies used by Spring Cloud Sleuth](https://docs.spring.io/spring-cloud-sleuth/docs/current-SNAPSHOT/reference/html/integrations.html#sleuth-reactor-integration):

1.  `DECORATE_ON_EACH`
2.  `DECORATE_ON_LAST`
3.  `DECORATE_QUEUES`
4.  `MANUAL`

The first three strategies try to use some properties of reactive operators, together with Reactor’s [plugin mechanism](https://projectreactor.io/docs/core/release/reference/#hooks-assembly), and use `ThreadLocal`s as the internal transport mechanism as well as the means to share the contextual data with instrumentation libraries. The first three strategies also assume `Scheduler` wrapping with [Schedulers.onScheduleHook](https://projectreactor.io/docs/core/release/api/reactor/core/scheduler/Schedulers.html#onScheduleHook-java.lang.String-java.util.function.Function-). On the other hand, the last strategy takes advantage of Reactor’s `Subscriber`\-bound `Context`.

### [](#decorate_on_each)DECORATE\_ON\_EACH

This strategy uses the [`Hooks.onEachOperator`](https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Hooks.html#onEachOperator-java.util.function.Function-) plugin we’ve seen in action before. The performance impact is dramatic, even though Sleuth adds a lot of optimizations to avoid restoration when not necessary. Usually, this method is very effective. It is very aggressive though, so it can be troublesome to cope with if an operator requires changing the context. The downstream operators wouldn’t see a change, as the context from the initial subscription is restored at each step.

### [](#decorate_on_last)DECORATE\_ON\_LAST

[`Hooks.onLastOperator`](https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Hooks.html#onLastOperator-java.util.function.Function-) is used to improve performance. This approach can fail because of the flexibility it provides. If an upstream operator modifies the context, the downstream operations see the change. This carries the risk that, if an operator clears that context, that context is lost until another signal is scheduled to the wrapped `Scheduler`. Another risk is what we’ve seen in the earlier examples, where the subscription happens on some `Thread`, but requesting the data happens on another, which is not in Reactor’s control.

### [](#decorate_queues)DECORATE\_QUEUES

An evolution over the preceding strategy, `DECORATE_QUEUES` corrects some erroneous scenarios (requesting data happens out-of-band or multiple `Threads` publish data) but not all of them. The [`Hooks.addQueueWrapper`](https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Hooks.html#addQueueWrapper-java.lang.String-java.util.function.Function-) plugin is used the way we described earlier. One known issue with `Queue` wrapping is that there is no reliable way of cleaning up after the processing of an item. The context is restored upon retrieval of an item from a `Queue`. There is no scope surrounding processing of the item that travels through downstream operators. Therefore, this approach is also prone to polluting `ThreadLocal` storage. There have been some recent improvements in the draining procedure to limit the impact.

### [](#manual)MANUAL

In this strategy, the only thing Sleuth does is to capture the values from `ThreadLocal`s into Reactor’s `Context` upon subscription as a snapshot. It is up to the user to extract that snapshot in relevant places and populate the `ThreadLocal`s to make them available to instrumenting libraries. For supported tracing instrumentation, such as with Zipkin and Brave, Sleuth restores the `ThreadLocal`s by using a concept of scoping – the `ThreadLocal`s are restored for the instrumentation and are gone immediately after the snapshot is closed. It is the most performant approach, although it requires manual (as the name suggests) handling, by the user.

## [](#evolution)Evolution

Using Reactor Context to populate `ThreadLocal`s in a localized scope proves to be both performant and compliant with the way the reactive chains work. Associating context with the `Subscriber` is a proven approach that does not unexpectedly cause the contextual data to be lost. In the next article, we will show how Reactor 3.5 and Micrometer 1.10 took the manual approach to the next level and provide a structured approach to context propagation across reactive and imperative boundaries.