---
title: Context Propagation with Project Reactor 1 - The Basics
source: https://spring.io/blog/2023/03/28/context-propagation-with-project-reactor-1-the-basics
scraped: 2026-02-23T09:56:44.096Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Dariusz Jędrzejczyk |  March 28, 2023 | 3 Comments
---

# Context Propagation with Project Reactor 1 - The Basics

_Engineering | Dariusz Jędrzejczyk |  March 28, 2023 | 3 Comments_

This post is a part of a series:

1.  [The Basics](https://spring.io/blog/2023/03/28/context-propagation-with-project-reactor-1-the-basics)
2.  [The bumpy road of Spring Cloud Sleuth](https://spring.io/blog/2023/03/29/context-propagation-with-project-reactor-2-the-bumpy-road-of-spring-cloud)
3.  [Unified Bridging between Reactive and Imperative](https://spring.io/blog/2023/03/30/context-propagation-with-project-reactor-3-unified-bridging-between-reactive)

Spring Boot 3 and Spring Framework 6 [brought us](https://spring.io/blog/2022/10/12/observability-with-spring-boot-3) a unified and consistent way to enable Observability in applications that use Micrometer. The evolution from Spring Cloud Sleuth to Micrometer, along with the Observation API and Micrometer Tracing, made us consolidate various approaches to context propagation. In this blog post series, we aim to explain how we came to support context propagation in Project Reactor to meet the needs of imperative libraries. By building your understanding from the ground up, you will be able to use these constructs and understand what’s happening underneath. We assume basic understanding of reactive programming concepts. If you’re new to it or want to refresh your knowledge, have a look at [Introduction to Reactive Programming](https://projectreactor.io/docs/core/release/reference/#intro-reactive) in the Project Reactor documentation.

In this article, we develop a simple e-commerce application. Our limited angle considers a request that adds a product and notifies the shop that a new product was added to the inventory. As responsible developers, we want to log all the steps taken for a particular request so that, if we were to investigate a problem, we can look at the logs and understand what happened. We’ll explore how we can achieve the goal of providing the logging utility with contextual metadata about the request in an imperative style and also compare that to a more functional, declarative style of Project Reactor. The next articles will explore in more detail why and how we need a bridge between both programming styles.

## [](#threadlocal)ThreadLocal

To identify the logs belonging to a particular request, we need a way to correlate them. We may generate a simplistic random identifier like this:

```java
Copystatic long correlationId() {
  return Math.abs(ThreadLocalRandom.current().nextLong());
}
```

We need a way to make the correlation identifier be available in a logging utility. We could make the correlation part of every method call in our business logic, but that would be very invasive and verbose.

Usually, third-party libraries use JDK’s `ThreadLocal` to convey implicit information that is not the primary concern of our application’s business logic.

Let’s declare a static field for our correlation identifier:

```java
Copystatic final ThreadLocal<Long> CORRELATION_ID = new ThreadLocal<>();
```

Here’s our log method. It prints the current `Thread` name and formats the output:

```java
Copystatic void log(String message) {
  String threadName = Thread.currentThread().getName();
  String threadNameTail = threadName.substring(
    Math.max(0, threadName.length() - 10));
  System.out.printf("[%10s][%20s] %s%n",
    threadNameTail, CORRELATION_ID.get(), message);
}
```

Now we have everything we need to handle the request and log each step by using the implicit correlation identifier.

At the beginning of every request, the application makes a call to the following method to initiate the correlation:

```java
Copystatic void initRequest() {
  CORRELATION_ID.set(correlationId()));
}
```

Our simplified request handler performs the following:

```java
Copyvoid handleRequest() {
  initRequest();

  addProduct("test-product");
  notifyShop("test-product");
}
```

Logging in the business logic looks like this:

```java
Copyvoid addProduct(String productName) {
  log("Adding product: " + productName);
  // ...
}

void notifyShop(String productName) {
  log("Notifying shop about: " + productName);
  // ...
}
```

We can expect our application to log these lines:

```
Copy[      main][ 8592000019542134146] Adding product: test-product
[      main][ 8592000019542134146] Notifying shop about: test-product
```

As long as the execution of a particular request happens on the same `Thread` and is not interleaved with other concerns, `ThreadLocal` lets us decouple business logic from the metadata used for logging.

## [](#asynchronous-processing)Asynchronous Processing

Let’s imagine this application starts to have a higher load and needs to handle many concurrent requests. Imagine that we can use an asynchronous and non-blocking server implementation that requires us to provide asynchronous declarations instead of imperative and blocking steps.

Our request handler could return a `CompletableFuture` to process the request in an asynchronous and non-blocking manner:

```java
CopyCompletableFuture<Void> handleRequest() {
  return CompletableFuture
    .runAsync(() -> addProduct("test-product"))
    .thenRunAsync(() -> notifyShop("test-product"))
}
```

Unfortunately, when we execute our asynchronous version, the logs no longer contain the correlation identifier:

```
Copy[l-worker-1][                null] Adding product: test-product
[l-worker-1][                null] Notifying shop about: test-product
```

## [](#task-wrapping)Task Wrapping

A known mitigation for this issue is to wrap the tasks executed by asynchronous APIs. By wrapping, we mean an implementation that performs the restoration of the `ThreadLocal` context. When the task is created, the current context is captured. When a worker `Thread` actually executes the task, that context is restored. Let’s see how this would work for our example case with `Runnable`:

```java
Copyclass WrappedRunnable implements Runnable {

  private final Long correlationId;
  private final Runnable wrapped;

  public WrappedRunnable(Runnable wrapped) {
    this.correlationId = CORRELATION_ID.get();
    this.wrapped = wrapped;
  }

  @Override
  public void run() {
    Long old = CORRELATION_ID.get();
    CORRELATION_ID.set(this.correlationId);
    try {
      wrapped.run();
    } finally {
      CORRELATION_ID.set(old);
    }
  }
}
```

We could reimplement our handler like so:

```java
CopyCompletableFuture<Void> handleRequest() {
  return CompletableFuture
    .runAsync(new WrappedRunnable(
      () -> addProduct("test-product")))
    .thenRunAsync(new WrappedRunnable(
      () -> notifyShop("test-product")));
}
```

Unfortunately, that is a lot of overhead. Luckily, the JDK has an API for executing asynchronous tasks: the `Executor` interface. In a real-world scenario, we’d want to use a more comprehensive API, the `ExecutorService`. However, for our explanatory purposes, `Executor` should suffice.

Let’s have a look:

```java
Copystatic class WrappedExecutor implements Executor {

  private final Executor actual;

  WrappedExecutor(Executor actual) {
    this.actual = actual;
  }

  @Override
  public void execute(Runnable command) {
    actual.execute(new WrappedRunnable(command));
  }
}
```

Let’s reuse the common `ForkJoinPool` that the `CompletableFuture` framework uses by default, but wrap it with our implementation. Now our code looks like this:

```java
Copystatic Executor executor = new WrappedExecutor(ForkJoinPool.commonPool());

CompletableFuture<Void> handleRequest() {
  return CompletableFuture
    .runAsync(() -> addProduct("test-product"), executor)
    .thenRunAsync(() -> notifyShop("test-product"), executor);
}
```

Our logs again work properly:

```
Copy[l-worker-1][ 7321040639376081961] Adding product: test-product
[l-worker-2][ 7321040639376081961] Notifying shop about: test-product
```

In some scenarios, the `CompletableFuture` framework can provide the means to process asynchronous tasks in a non-blocking fashion. However, in many cases, the limited API surface and its behavior characteristics can be limiting. For example, we might want to delay the processing and resume later when our system is at its capacity. With `CompletableFuture` all created instances start computing as soon as they are created. We might also want to apply more fine grained operations on top of a stream of data, instead of operating upon a single unit of computation. For some of those reasons and also more, we might consider using a reactive programming library. We will consider Project Reactor, which is the default reactive implementation in the Spring portfolio.

## [](#project-reactor)Project Reactor

To provide a resilient framework for asynchronous processing, the Java community proposed the Reactive Streams specification. It helped establish a common vocabulary that the JDK was missing before – clear semantics for signal propagation, error handling, termination, and lifecycle management. It also allowed for built-in backpressure. Spring adopted this approach by introducing WebFlux, making Project Reactor and its reactive types first class citizens of the API.

Reactive Streams bring elegant and minimalistic solutions for asynchronous stream processing. However, context propagation is not part of the specification. The non-blocking and asynchronous nature of reactive libraries, together with potentially complex implementations, makes it extremely difficult to use `ThreadLocal`s. The reason for it is that there are no guarantees regarding which `Thread` can run the user’s code. Implementations are allowed to perform all sorts of optimizations as long as they guarantee serial delivery, thus making the user’s code concurrency-agnostic, shifting the burden of dealing with concurrency to the library internals.

To deliver its guarantees, reactive programming in Java assumes the functional programming paradigm is used to form a declarative and composable flow, which is agnostic of the fact that different `Thread`s can execute user-provided code. The reactive libraries can provide an extremely performant runtime, while complying to the specification, as long as there are no side effects in user code that assume execution within a particular `Thread`. `ThreadLocal` clearly violates this requirement.

Let’s try to rewrite our handler to use Project Reactor. The individual operations become:

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

Let’s try to use the above:

```java
CopyMono<Void> handleRequest() {
  initRequest();
  log("Assembling the chain");

  return Mono.just("test-product")
    .flatMap(product ->
      Flux.concat(
        addProduct(product),
        notifyShop(product))
      .then())
}
```

Our naive implementation yields the desired output:

```
Copy[      main][ 7224499961623309444] Assembling the chain
[      main][ 7224499961623309444] Adding product: test-product
[      main][ 7224499961623309444] Notifying shop about: test-product
```

The above implementation is invoked in the `main` `Thread`, and the execution is confined to that `Thread`. We should not make such assumptions though.

In the handler, we introduce a slight delay before we propagate the result of the processing. We do so to demonstrate the implicit `Thread` switch that happens behind the scenes.

```java
CopyMono<Void> handleRequest() {
  initRequest(); <1>
  log("Assembling the chain"); // <2>

  return Mono.just("test-product")
    .delayElement(Duration.ofMillis(1)) // <3>
    .flatMap(product ->
      Flux.concat(
        addProduct(product), // <4>
        notifyShop(product))
      .then())
}
```

When run, the following is printed:

```
Copy[      main][ 6265915299594887150] Assembling the chain
[parallel-1][                null] Adding product: test-product
[parallel-1][                null] Notifying shop about: test-product
```

What happened? Why does one log have the correlation identifier but the others don’t?

When the server calls our handler, the initialization at `<1>` sets the `ThreadLocal` correlation identifier and the log at `<2>` is able to use it. Those experienced in reactive programming can tell you the issue is that the execution happens in different phases. The `ThreadLocal` is set at assembly time. “You should restore it at subscription time, too” would be one piece of advice. We’ll get back to that in a bit. If the terms “assembly”, “subscription”, and “execution time” are confusing to you, have a look at the excellent explanations in [Simon’s blog post](https://spring.io/blog/2019/03/06/flight-of-the-flux-1-assembly-vs-subscription) or watch [the talk of the same title](https://www.youtube.com/watch?v=sNgTTcG-fEU).

While the method is returned immediately it does not guarantee that execution is started. That is because the returned `Mono` has to be subscribed to trigger processing. It may potentially happen in a different `Thread`. The `delayElement` operator at `<3>` implicitly uses a shared `Scheduler` (an abstraction for a pool of `Thread`s) from Reactor to deliver the signal on yet another `Thread` after the specified delay. That signal propagates to the downstream operators, which let us sequence adding the product first and notifying the shop afterwards. There are more surprising aspects of the pipeline we assembled, but let’s not get too confused.

The issue is that, in `<4>`, if we log, we can’t really tell what `Thread` the call is going to happen on. Operators such as `flatMap` can introduce their own asynchrony.

In a regular case, values start being delivered when the chain is subscribed to. We could therefore restore `ThreadLocal` values upon every subscription. It’s not always the best idea though. The `Subscription` can be delivered asynchronously, on a different `Thread`. Also values can be delivered on different `Thread`s. In the case of backpressure, a signal can be delivered as a result of a request for more data on the `Thread` performing the request instead of the `Thread` used by the `Publisher` of data. Lots of moving parts and quirks to consider! To learn more about threading and asynchronous execution in Reactor please review [another part of our previous blog post series](https://spring.io/blog/2019/12/13/flight-of-the-flux-3-hopping-threads-and-schedulers).

## [](#reactor-context)Reactor Context

Project Reactor introduced a mechanism that is well aligned with functional programming to provide means to transport contextual metadata. It is simply called `Context`. And it stays attached to the reactive chain, despite Thread switches that happen behind the scenes.

As we’ve seen, Project Reactor allows declaratively specifying the intent, while staying concurrency agnostic. It does provide the means to control concurrency when necessary, by using dedicated operators or configuration parameters (such as `publishOn`, `subscribeOn`, or the advanced parameters of `flatMap`), but that level of control is abstracted away from the core processing logic.

We mentioned side effects earlier. How can we get rid of those and still be able to transport contextual metadata?

To play well with functional programming, the `Context` is bound to the `Subscriber`, the consumer of signals emitted by the `Publisher`. Upon subscription, a `Subscriber` is made visible to all preceding operators in the assembled pipeline. When we associate an immutable `Map`\-like data structure to the `Subscriber` instance, it allows attaching and retrieving contextual information in parts of a reactive pipeline.

With control of the impact and the means to provide inheritance between steps in the reactive chain, Reactor `Context` is a side-effect-free concept, which can be used to provide meta-information to the processing. “Just what we need to correlate our requests!”.

Let’s rewrite our application to use Reactor `Context` instead of `ThreadLocal`s.

First, we need to make the correlation identifier an explicit parameter of the log method:

```java
Copystatic void log(String message, long correlationId) {
  String threadName = Thread.currentThread().getName();
  String threadNameTail = threadName.substring(
    Math.max(0, threadName.length() - 10));
  System.out.printf("[%10s][%20s] %s%n",
    threadNameTail, correlationId, message);
}
```

Our actions are the following:

```java
CopyMono<Void> addProduct(String productName) {
  return Mono.deferContextual(ctx -> {
    log("Adding product: " + productName, ctx.get("CORRELATION_ID"));
    return Mono.empty(); // Assume we’re actually storing the product
  });
}

Mono<Boolean> notifyShop(String productName) {
  return Mono.deferContextual(ctx -> {
    log("Notifying shop about: " + productName,
      ctx.get("CORRELATION_ID"));
    return Mono.just(true);
  });
}
```

What is interesting is how we provide the correlation identifier. We use a special operator, `Mono.deferContextual`, which has access to the `Context`. From the `ContextView` (a simplified, read-only `Context` version) we extract the correlation identifier before returning an actual `Mono` for the caller to subscribe to.

Our handler looks like this:

```java
CopyMono<Void> handleRequest() {
  long correlationId = correlationId();
  log("Assembling the chain", correlationId);

  Mono.just("test-product")
    .delayElement(Duration.ofMillis(1))
    .flatMap(product ->
      Flux.concat(addProduct(product), notifyShop(product))
          .then())
    .contextWrite(Context.of("CORRELATION_ID", correlationId));
```

When subscribed to, the output is as expected:

```
Copy[      main][ 6328001264807824115] Assembling the chain
[parallel-1][ 6328001264807824115] Adding product: test-product
[parallel-1][ 6328001264807824115] Notifying shop about: test-product
```

The inversion of information flow is apparent. As in any reactive chain, we define the processing flow by assembling a chain of operators. Once we (or actually, the server) subscribe to this chain, the information flows from downstream operators to the upstream operators to initiate the processing. Afterwards, the actual data signals are delivered from the upstream to the downstream – for example, the “test-product” value travels to the `flatMap` operator, then to the `concat` operator, which in turn provides the value to both `addProduct` and `notifyShop`. Due to this flow of logic, we write the `Context` at the very end (using the `contextWrite` method), just before any `Subscriber` subscribes to the chain. We can imagine the `Context` then becomes accessible alongside the `Subscriber` to all the stages in upstream operators.

Regardless of how many thread hops the reactive pipeline makes along the way of executing the user’s business logic, the context is not lost.

You can read more about Reactor `Context` [in our documentation](https://projectreactor.io/docs/core/release/reference/#context).

## [](#3rd-party-libraries)3rd party libraries

Unfortunately, we can’t expect 3rd party libraries to use Reactor `Context` to provide observability capabilities. The de facto currency for propagating implicit meta-information is the `ThreadLocal`. Libraries like SLF4J use an imperative style and have a stable position in the Java community. If we can make them work with the reactive paradigm instead of expecting them to adapt to it, it would be a clear win. In the next part, we discuss the history and challenges of propagating `ThreadLocal` values in reactive chains in Spring Cloud Sleuth, a tracing library that can be used together with Reactor.