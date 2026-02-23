---
title: Context Propagation with Project Reactor 3 - Unified Bridging between Reactive and Imperative
source: https://spring.io/blog/2023/03/30/context-propagation-with-project-reactor-3-unified-bridging-between-reactive
scraped: 2026-02-23T09:56:52.878Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Dariusz Jędrzejczyk |  March 30, 2023 | 8 Comments
---

# Context Propagation with Project Reactor 3 - Unified Bridging between Reactive and Imperative

_Engineering | Dariusz Jędrzejczyk |  March 30, 2023 | 8 Comments_

This post is a part of a series:

1.  [The Basics](https://spring.io/blog/2023/03/28/context-propagation-with-project-reactor-1-the-basics)
2.  [The bumpy road of Spring Cloud Sleuth](https://spring.io/blog/2023/03/29/context-propagation-with-project-reactor-2-the-bumpy-road-of-spring-cloud)
3.  [Unified Bridging between Reactive and Imperative](https://spring.io/blog/2023/03/30/context-propagation-with-project-reactor-3-unified-bridging-between-reactive)

We concluded [the last article](https://spring.io/blog/2023/03/29/context-propagation-with-project-reactor-2-the-bumpy-road-of-spring-cloud) with the thought that Spring Cloud Sleuth’s `MANUAL` context propagation strategy is both performant and provides correct semantics. Out of many experiences, the Spring, Micrometer, and Reactor teams created a new context-propagation library. Its goal is to encapsulate the concern of transporting contextual data between `ThreadLocal` values and `Map`\-like structures. Both Micrometer 1.10 and Reactor 3.5 build on top of it to provide a first-class experience between Reactor and imperative code. By using Reactor `Context`, we implicitly expose `ThreadLocal` values that are used by Micrometer to instrument tracing libraries as well as to populate SLF4J’s `MDC` to provide logs that include the tracing identifiers.

In this article, we will take a different approach than before. Instead of building our knowledge from the ground up, we’ll start with the ready top-level API available to you and afterwards explain what is happening behind the scenes. At the end, you will be able to:

-   Understand why these mechanisms work the way they do.
-   Make the right decisions as to which approach to take in your application or library.
-   Know when and why you needn’t do anything and expect everything to work out-of-the-box.

## [](#reactive-context-and-threadlocals)Reactive Context and ThreadLocals

Let’s revisit the example from the first article, where we showed how a `delayElement` operator caused a reactive chain to lose the correlation identifier. Let’s recall the code, starting with our actions:

```java
CopyMono<Void> addProduct(String productName) {
  log("Adding product: " + productName);
  return Mono.empty(); // Assume we’re actually storing the product
}

Mono<Boolean> notifyShop(String productName) {
  log("Notifying shop about: " + productName);
  return Mono.just(true); // Assume we’re actually notifying the shop
}
```

Then we need to recall the binding request handler:

```java
CopyMono<Void> handleRequest() {
  initRequest(); <1>
  log("Assembling the chain"); // <2>

  return Mono.just("test-product")
    .delayElement(Duration.ofMillis(1)) // <3>
    .flatMap(product ->
      Flux.concat(
        addProduct(product), // <4>
        notifyShop(product)).then())
}
```

Starting from Reactor 3.5.0, Reactor `Context` is able to integrate with a new library, under the Micrometer umbrella, called [`context-propagation`](https://github.com/micrometer-metrics/context-propagation). We’ll describe that integration in a bit more detail by the end of this article. In Reactor 3.5+, when the `context-propagation` library is on the classpath, we can expect our `ThreadLocal` values to be present when we log in the `handle` operator as well as the new `tap` operator.

To propagate our custom `ThreadLocal`, we need to register a `ThreadLocalContextAccessor`:

```java
CopyContextRegistry.getInstance()
  .registerThreadLocalAccessor("CORRELATION_ID",
    CORRELATION_ID::get,
    CORRELATION_ID::set,
    CORRELATION_ID::remove);
```

For now, the details of the `context-propagation` library are not essential to achieve what we need. The only thing we need to know is that we used the key, `CORRELATION_ID`, which will be used with the Reactor `Context` to restore the `ThreadLocal` in our special operators. Let’s modify the rest of the code to use them and log in the dedicated places.

We need just one alteration to our request handler:

```java
CopyMono<Void> handleRequest() {
  initRequest(); // <1>
  log("Assembling the chain");

  return Mono.just("test-product")
    .delayElement(Duration.ofMillis(1))
    .flatMap(product ->
      Flux.concat(
        addProduct(product),
        notifyShop(product)).then())
    .contextCapture(); // <2>
}
```

The only modification we’re doing is the `<2>` `contextCapture` operator at the very end of the chain we return to the caller. The job of this operator is to capture current `ThreadLocal` values, for which `ThreadLocalAccessor` instances are registered in `ContextRegistry`, and store them under the same keys in the Reactor `Context`. In this particular implementation, our only hope is that the subscription happens immediately after the assembly phase, as in `<1>`, where we set the `ThreadLocal` value.

Next, we’ll use the `tap` operator to add logging:

```java
CopyMono<Void> addProduct(String productName) {
  return Mono.<Void>empty()
    .tap(() -> new DefaultSignalListener<>() {
      @Override
      public void doOnComplete() throws Throwable {
        log("Adding product: " + productName);
      }
  });
}
```

Here, we are extending the `DefaultSignalListener` from `reactor-core`’s `reactor.core.observability` package. We are only interested in tapping to the completion signal, where we perform the log operation.

For the `handle` operator, we’ll alter the `notifyShop` method:

```java
CopyMono<Boolean> notifyShop(String productName) {
  return Mono.just(true)
    .handle((result, sink) -> {
      log("Notifying shop about: " + productName);
      sink.next(result);
    });
}
```

Let’s see if now, when we call our handler, we’ll get the proper output:

```java
CopyhandleRequest().block();
```

The result is the following:

```
Copy[      main][  643805344761543048] Assembling the chain
[parallel-1][  643805344761543048] Adding product: test-product
[parallel-1][  643805344761543048] Notifying shop about: test-product
```

Great! This is, in fact, the same approach as Spring Cloud Sleuth’s `MANUAL` strategy but is integrated into Reactor’s internals, so you need not restore `ThreadLocal` values by hand. We chose `tap` and `handle` because those operators have access to the `Subscriber`\-bound `Context` and allow taking action upon a concrete Reactive Streams signal.

*Remember*: Reactor `Context` for writing, `ThreadLocals` for reading.

As a matter of fact, our request handler is a bit dangerous. If we delay the act of subscribing, we will lose the correlation identifier. Consider:

```java
CopyMono<Void> requestHandler = handleRequest(); // <1>

Thread subscriberThread = new Thread(requestHandler::block); // <2>
subscriberThread.start();
subscriberThread.join();
```

The output is the following:

```
Copy[      main][ 1388809065574796038] Assembling the chain
[parallel-1][                null] Adding product: test-product
[parallel-1][                null] Notifying shop about: test-product
```

The assembly happened in `<1>` and the `ThreadLocal` was set in `main`. However, the subscription happens on a new `Thread` in `<2>`, which doesn’t have the `ThreadLocal` values to capture. Therefore, our logs have no correlation identifiers. We could wrap the body of our handler with `Mono.defer()` to solve this issue. However, instead of that, let’s consider whether we need a `ThreadLocal` to be actually set in the first place.

In an imperative application that invokes a Reactor chain, such as a Spring MVC controller method that calls `WebClient`, `ThreadLocal` values are already established and `contextCapture` will pick them up and store them in the `Context`.

In a reactive stack, like WebFlux, on the other hand, it makes more sense to use `contextWrite` directly.

We know that Reactor will use the contents of its `Context` to restore `ThreadLocal` values. If we directly store the intended values in the `Context`, instead of capturing them from the current state, we’ll improve the performance by a tiny bit, but we’ll also improve the compliance with the functional programming paradigm. Let’s try that:

```java
CopyMono<Void> handleRequest() {
  // initRequest(); -- no write to ThreadLocal
  log("Assembling the chain");

  return Mono.just("test-product")
    // <1>
    .delayElement(Duration.ofMillis(1))
    .flatMap(product ->
      Flux.concat(
        addProduct(product),
        notifyShop(product)).then())
    .contextWrite(
      Context.of("CORRELATION_ID", correlationId())); // <2>
}
```

Let’s run it:

```
Copy[      main][                null] Assembling the chain
[parallel-1][ 7059587638538899074] Adding product: test-product
[parallel-1][ 7059587638538899074] Notifying shop about: test-product
```

Nice! Our actual reactive chain contains a proper correlation identifier.

Unfortunately, we lost one in the assembly phase. One reason for it is that the log doesn’t happen within a `handle` or `tap` operator. If we added an initial log in `<1>` using the `tap` operator, we’d be fine. The `Context` with the correlation identifier is bound to the chain upstream from `<2>`. If we added a logging `tap` operator after the `contextWrite` call, we’d not see the correct correlation identifier – the attached `Context` at that stage is a different one and doesn’t have our identifier. We’ll get back to this issue in a moment, but first, let’s consider if we can simplify our code and avoid the special operators.

## [](#automatic-context-propagation)Automatic Context Propagation

When `reactor-core` 3.5.0 was released, it was included in Spring Framework 6.0 and Spring Boot 3.0. Existing Spring users who used Spring Cloud Sleuth for tracing were used to having logs populated with `trace-id` and `span-id` values (similarly to our correlation identifier). A switch to the new paradigm, where observability is part of the core suite of Spring products, would require existing applications to rewrite their logging to use the `handle` and `tap` operators. We continued thinking how we can make more operators capable of restoring the `ThreadLocal` values.

As we’ve seen in the previous article, restoring `ThreadLocal` values that can span multiple operators is not an easy task. `handle` and `tap` were chosen, because they do not let `ThreadLocal` values leak. No signals are propagated as a result of running the user’s code. The `ThreadLocal` values are present when the user code runs. Then the result is captured. Finally, the `ThreadLocal` context is cleared. Only afterwards does the reactive propagation of signals happen to downstream operators. Also, we wanted to be more selective, as performing the restoration in every operator has a lot of overhead, as discussed [in part 2](https://spring.io/blog/2023/03/29/context-propagation-with-project-reactor-2-the-bumpy-road-of-spring-cloud).

We rethought everything carefully and came up with an idea can be combined to the following call (starting from `reactor-core` 3.5.3):

```java
CopyHooks.enableAutomaticContextPropagation();
```

We can add it to the `main` method of our application.

We can now restore our initial implementation of the action methods:

```java
CopyMono<Void> addProduct(String productName) {
  log("Adding product: " + productName);
  return Mono.empty();
}

Mono<Boolean> notifyShop(String productName) {
  log("Notifying shop about: " + productName);
  return Mono.just(true);
}
```

We leave the `handleRequest` method and subscription on a new `Thread` unchanged. Let’s run it:

```
Copy[      main][                null] Assembling the chain
[parallel-1][ 8362586195225273235] Adding product: test-product
[parallel-1][ 8362586195225273235] Notifying shop about: test-product
```

Success!

With this feature, we can migrate an existing codebase that uses Spring Cloud Sleuth to the new Spring Framework without doing any changes to the way we log. With the above hook, if you use Spring Boot Actuator with Micrometer Tracing, the SLF4J logs have tracing information populated without the need to do anything. Soon, Spring Boot will automatically call the hook for you.

## [](#writing-framework-code)Writing Framework Code

We mentioned that we’d get back to the problem with the log at assembly time. So far, we’ve been initiating the correlation identifier generation process in our request handling logic. Ideally, our handler should be called by the server and the resulting `Publisher` (`Flux` or `Mono`) subscribed to from the calling code. Our handler is back to the initial shape:

```java
CopyMono<Void> handleRequest() {
  log("Assembling the chain");

  return Mono.just("test-product")
    .delayElement(Duration.ofMillis(1))
    .flatMap(product ->
      Flux.concat(
        addProduct(product),
        notifyShop(product)).then());
}
```

Let’s imitate the server code by attaching the context to the returned `Mono`:

```java
CopyMono<Void> requestHandler = handleRequest()
  .contextWrite(Context.of("CORRELATION_ID", correlationId()));
```

Then we need to run it:

```java
CopyrequestHandler.block();
```

The assembly time is still missing the correlation identifier:

```
Copy[      main][                null] Assembling the chain
[parallel-1][ 5508113792645841519] Adding product: test-product
[parallel-1][ 5508113792645841519] Notifying shop about: test-product
```

The `contextWrite` operator restores `ThreadLocal` values during subscription time (as well as for other lifecycle events). To have the user code have logs during the assembly time, the entire call to that code needs to be part of a reactive chain. In that way, the user’s code is executed during subscription of the outer `Mono` and the returned inner `Mono` is subscribed to immediately. For the entire execution, the outer `Mono`’s `Context` is made available in `ThreadLocal`s if we do this in our “framework” code:

```java
CopyMono<Void> requestHandler = Mono.defer(() -> handleRequest())
  .contextWrite(Context.of("CORRELATION_ID", correlationId()));
```

All that we needed to do was use `Mono.defer()` and attach the `Context` to it.

Luckily, Spring Framework does its job well and handles our assembly during the subscription phase as well.

## [](#are-we-done-solving-the-context-propagation-problem)Are We Done Solving the Context-propagation Problem?

This new approach looks very encouraging. One might wonder, with the approaches taken in the past, how will this new mechanism break? We feel more confident about this approach because it is more aligned with the nature of Reactive Streams. The approaches that were not based around Reactor `Context` had one major misconception embedded in them – they propagate `ThreadLocal` values downstream – hopefully, trying to clean up at some point. However, there were no semantic boundaries for the propagation to stop.

Relying on downstream propagation of `ThreadLocal` values can be a source of errors, too. Reactive libraries propagate signals upstream and downstream. One signal potentially triggers another signal, but it doesn’t have to. A different `Thread` can continue processing. Certain optimizations (such as prefetching) that are done by `flatMap`\-like operators, can request and enqueue values from the upstream, without our downstream propagating mechanism being involved. If we want to be able to have contextual information even when we log at the time of backpressure or cancellation, we need to take all the possible signals into account.

One important observation comes from the way the `Context` dictates logical boundaries. When you call `contextWrite` and store a value in the `Context`, all the upstream operators have access to the modified version. All the downstream operators won’t see the modification but will see the state upon which your modification is based.

The nature of a `Subscriber`\-bound `Context` serves as the basis for our new approach. We modified the `contextWrite` operator to set `ThreadLocal` values to reflect the current `Context` when signals travel upstream at subscription time, as well as at cancellation and request. But it resets those `ThreadLocal` values to the ones represented in the downstream `Context` whenever a signal is propagated downstream.

We still need to use the `Scheduler` wrapping approach. We also need the `Queue` wrapping approach ([for which we need to improve the lifecycle semantics](https://github.com/reactor/reactor-core/issues/3369)).

But we might consider improving the situation by [transporting the Reactor `Context`](https://github.com/reactor/reactor-core/pull/2983) in those cases instead of capturing the `ThreadLocal` values. That could improve the performance.

Also, when we work with `Publisher`s that are outside of Reactor’s control or sources that use `Thread`s that we don’t control (like with the `Mono.fromFuture()` example to mimic a remote call) we still lose the `ThreadLocal` values. A mitigation for now is to introduce the semantic boundary of `contextWrite` operator, which doesn’t really change the `Context`, as in this variation of the `notifyShop` method:

```java
CopyMono<Boolean> notifyShop(String productName) {
  log("Notifying shop about: " + productName);
  return makeRequest(productName) // <1>
    .contextWrite(Function.identity()) // <2>
    .doOnNext(r -> log("Request done.")); // <3>
}
```

The `makeRequest` method was defined [in the previous article](https://spring.io/blog/2023/03/29/context-propagation-with-project-reactor-2-the-bumpy-road-of-spring-cloud) in the series. If we assume `makeRequest` is a 3rd-party library call, which uses `Thread`s we can’t control, we also can’t wrap the code it executes in `<1>` and within the asynchronous code that completes its operation. Any logs done by that part of the chain won’t be populated with the correlation identifier. It would be the library author’s responsibility to propagate such context. However, because we used the boundary in `<2>`, our log in `<3>` contains the correlation identifier.

We [intend to add the necessary functionality](https://github.com/reactor/reactor-core/issues/3366) in `reactor-core` to provide such a boundary for sources that can change `Threads` in a way that is outside of Reactor’s control.

In imperative scenarios, that call reactive code only to use a blocking subscription (by using `block()` for example), [we plan to automatically perform `contextCapture`](https://github.com/reactor/reactor-core/issues/3406) to transparently propagate current `ThreadLocal` values into the reactive chain. This will be useful when interacting with WebClient in a Spring MVC application for instance.

## [](#context-propagation-library)Context-propagation Library

The task of capturing `ThreadLocal` state and restoring it in various places is an interesting subject on its own. Usually, we think of multiple `ThreadLocal` values that have a logical connection to each other or a `Map`\-like structure corresponding to various concerns. We have created a dedicated library that allows transforming between `ThreadLocal`s and arbitrary objects by capturing their state and restoring it into the respective target. In the preceding examples, we used some of the API of the [`context-propagation`](https://github.com/micrometer-metrics/context-propagation) library. It is open sourced under the Micrometer umbrella, and, if you’d like to use it in your code, it has [reference documentation](https://micrometer.io/docs/contextPropagation) with examples, too.

Project Reactor registers a `ContextAccessor` that deals with the Reactor `Context`, using the `ServiceLoader` JDK mechanism. On the other end, Micrometer registers an `ObservationThreadLocalAccessor`, that deals with the `ThreadLocal` state necessary for Micrometer Tracing and other instrumentation mechanisms to work using the single `Observation` concept.

We highly recommend trying out Spring Boot with Spring Boot Actuator to enable the [tracing capabilities](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html#actuator.micrometer-tracing) and see for yourself how cohesive the experience is.

## [](#wrapping-up)Wrapping up

In this series of blog posts, we covered the basics of Context Propagation and we covered the history and status quo of bridging between the imperative and reactive programming paradigms. We do hope you can now confidently use the features we implemented. In the best case scenario, there isn’t much work for you to do if you go with the automatic context propagation feature. Also, in this interesting scenario, we hope your custom propagation logic can take advantage of the primitives we’ve described in this article. You can [reach out to us](https://projectreactor.io) if you have questions or [report issues on GitHub](https://github.com/reactor/reactor-core/issues).

## [](#acknowledgments)Acknowledgments

This series would not have been published without the help of my colleagues reviewing every bit. I’d like to thank (in alphabetical order): Simon Baslé, Jay Bryant, Pierre De Rop, Oleh Dokuka, Marcin Grzejszczak, Robert McNees, Rossen Stoyanchev, and Tadaya Tsuyukubo.

## [](#bonus)Bonus

To play with the examples used, feel free to use [the relevant package in my GitHub repository](https://github.com/chemicL/reactor-lab/tree/main/src/main/java/dev/jedrzejczyk/reactorlab/contextpropagation).