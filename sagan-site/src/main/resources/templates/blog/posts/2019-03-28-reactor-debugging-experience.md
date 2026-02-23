---
title: Reactor Debugging Experience
source: https://spring.io/blog/2019/03/28/reactor-debugging-experience
scraped: 2026-02-23T14:54:01.103Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Sergei Egorov |  March 28, 2019 | 4 Comments
---

# Reactor Debugging Experience

_Engineering | Sergei Egorov |  March 28, 2019 | 4 Comments_

In the [Project Reactor](https://projectreactor.io) team, we believe that the debugging experience of the libraries you rely upon is as important as, let's say, the feature set or performance.

Today, we're excited to announce two new experimental projects in the Reactor family!

## [](#blockhound---a-new-kid-on-the-block)BlockHound - a new kid on the block

One of the most common rookie mistakes is to block Java threads that are supposed to run only non-blocking code (e.g., `Schedulers.parallel()`).  
It is one of the most harmful issues because you may block unrelated processing or even create a deadlock!

Consider the following code:

```java
CopyFlux.range(0, Runtime.getRuntime().availableProcessors() * 2)
        .subscribeOn(Schedulers.parallel())
        .map(i -> {
            CountDownLatch latch = new CountDownLatch(1);

            Mono.delay(Duration.ofMillis(i * 100))
                .subscribe(it -> latch.countDown());

            try {
                latch.await();
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }

            return i;
        })
        .blockLast();
```

How long will it take to run this code? 1 second? 10 seconds?  
What if I tell you that it will never exit and create a deadlock? Here is why:

1.  We create `N * 2` signals, where `N` is the number of CPUs our JVM can use.
2.  We subscribe using `Schedulers.parallel` - a bounded pool limited to `N` threads.
3.  For every signal, we schedule another task for the parallel scheduler (`Mono.delay` implicitly uses `Schedulers.parallel`).
4.  Our logic assumes that the delay will be processed shortly and the latch will eventually unblock.
5.  However, all N threads will be waiting for their latches, and the delay task will never get executed!

Even of you don't block all threads and block only some, you're preventing other unrelated tasks from advancing. The most probable result is that the performance will degrade.

The problem is especially notable when you're [migrating your old blocking code to the reactive approach](https://projectreactor.io/docs/core/release/reference/#faq.wrap-blocking). Even the most experienced code reviewer may not spot a blocking call when your [functions are of the same color](http://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function/)!

This is why we created [BlockHound](https://github.com/reactor/BlockHound) - a Java agent to detect blocking calls from non-blocking threads. Unlike other solutions, it instruments the original methods (even native ones!) and leaves no way to call a blocking method, even with reflection!

Now, if we add it to our app as [described in the docs](https://github.com/reactor/BlockHound/tree/master/docs/quick_start.md), we will get the following exception:

```
Copyjava.lang.Error: Blocking call! sun.misc.Unsafe#park
  at reactor.BlockHound$Builder.lambda$new$0(BlockHound.java:154)
  at reactor.BlockHound$Builder.lambda$install$8(BlockHound.java:254)
  at reactor.BlockHoundRuntime.checkBlocking(BlockHoundRuntime.java:43)
  at sun.misc.Unsafe.park(Unsafe.java)
  at java.util.concurrent.locks.LockSupport.park(LockSupport.java:175)
  at java.util.concurrent.locks.AbstractQueuedSynchronizer.parkAndCheckInterrupt(AbstractQueuedSynchronizer.java:836)
  at java.util.concurrent.locks.AbstractQueuedSynchronizer.doAcquireSharedInterruptibly(AbstractQueuedSynchronizer.java:997)
  at java.util.concurrent.locks.AbstractQueuedSynchronizer.acquireSharedInterruptibly(AbstractQueuedSynchronizer.java:1304)
  at java.util.concurrent.CountDownLatch.await(CountDownLatch.java:231)
  at com.example.demo.BlockingCode.lambda$main$1(BlockingCode.java:24)
```

Note that `await` calls `Unsafe#park` internally for the awaiting logic. We don't want our Thread to be parked or blocked, and BlockHound protects us from that!

Read the [how it works](https://github.com/reactor/BlockHound/blob/master/docs/how_it_works.md) page if you want to know the implementation details.  
TL;DR: it wraps original methods and adds only two method calls to them.

You can run it in tests or on your QA/staging environments without losing performance. Holy Atom, you can even try running it in production, given the low overhead! :)

BlockHound works with Project Reactor and RxJava 2, and you can [write your own integration](https://github.com/reactor/BlockHound/blob/master/docs/custom_integrations.md).

## [](#reactor-debug-agent---production-ready-assembly-back-tracing)Reactor Debug agent - production-ready assembly back-tracing

Debugging Reactive code can sometimes be challenging because of the functional programming aspect of it: Instead of commanding exactly what to perform on the data, you *declare* how the data should flow through the system. It means that the declaration and the execution happen at different moments of time.

> You can read more about it in Simon's great article: [https://spring.io/blog/2019/03/06/flight-of-the-flux-1-assembly-vs-subscription](https://spring.io/blog/2019/03/06/flight-of-the-flux-1-assembly-vs-subscription)

In Reactor, we call it "Assembly time" and "Execution time". During Assembly time, you "design" your pipeline by calling `myFlux.map(i -> i * 2).filter(5 % i == 1).single()` and other operators. Some time later, this "pipeline definition" will be used to process the signals published by `myFlux`. But what happens when an error occurs?

Some of you may already know `Hooks.onOperatorDebug()`. That's a very helpful hook in `reactor-core`. It transforms stack traces from this:

```
Copyjava.lang.IndexOutOfBoundsException: Source emitted more than one item
  at reactor.core.publisher.MonoSingle$SingleSubscriber.onNext(MonoSingle.java:129)
  at reactor.core.publisher.FluxRange$RangeSubscription.fastPath(FluxRange.java:129)
  at reactor.core.publisher.FluxRange$RangeSubscription.request(FluxRange.java:107)
  at reactor.core.publisher.MonoSingle$SingleSubscriber.request(MonoSingle.java:94)
  at reactor.core.publisher.MonoSubscribeOn$SubscribeOnSubscriber.trySchedule(MonoSubscribeOn.java:186)
  at reactor.core.publisher.MonoSubscribeOn$SubscribeOnSubscriber.onSubscribe(MonoSubscribeOn.java:131)
  at reactor.core.publisher.MonoSingle$SingleSubscriber.onSubscribe(MonoSingle.java:114)
  at reactor.core.publisher.FluxRange.subscribe(FluxRange.java:68)
  at reactor.core.publisher.MonoSingle.subscribe(MonoSingle.java:58)
  at reactor.core.publisher.Mono.subscribe(Mono.java:3711)
  at reactor.core.publisher.MonoSubscribeOn$SubscribeOnSubscriber.run(MonoSubscribeOn.java:123)
  at reactor.core.scheduler.WorkerTask.call(WorkerTask.java:84)
  at reactor.core.scheduler.WorkerTask.call(WorkerTask.java:37)
  at java.util.concurrent.FutureTask.run(FutureTask.java:266)
  at java.util.concurrent.ScheduledThreadPoolExecutor$ScheduledFutureTask.access$201(ScheduledThreadPoolExecutor.java:180)
  at java.util.concurrent.ScheduledThreadPoolExecutor$ScheduledFutureTask.run(ScheduledThreadPoolExecutor.java:293)
  at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)
  at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)
  at java.lang.Thread.run(Thread.java:748)
```

into this:

```
Copyjava.lang.IndexOutOfBoundsException: Source emitted more than one item
  at reactor.core.publisher.MonoSingle$SingleSubscriber.onNext(MonoSingle.java:129)
   ...
  at java.lang.Thread.run(Thread.java:748)
  Suppressed: reactor.core.publisher.FluxOnAssembly$OnAssemblyException: 
Assembly trace from producer [reactor.core.publisher.MonoSingle] :
  reactor.core.publisher.Flux.single(Flux.java:7380)
  com.example.demo.Example.run(Example.java:13)
Error has been observed by the following operator(s):
  |_	Flux.single ⇢ com.example.demo.Example.run(Example.java:13)
  |_	Mono.subscribeOn ⇢ com.example.demo.Example.run(Example.java:14)
```

For the following code:

```java
Copy9:  public class Example {
10:
11:     public static void run() {
12:        Flux.range(0, 5)
13:            .single() // <-- Aha!
14:            .subscribeOn(Schedulers.parallel())
15:            .block();
16:     }
17: }
```

As you can see, with debug mode enabled, we can clearly identify the assembly operation where the error happened. It is like a stack-trace, but (since the execution is separated from the assembly) is a back-trace.

You may think: "Great, now I want it in production!" - and so do we. But when you use `Hooks.onOperatorDebug()`, we have to do heavy-weight stack walking at assembly time to capture the call-site every time you call an operator like `.map(...)`, even if your code will never throw an error! This is due to a lack of call-site tracing in Java, where the only alternatives are `new Exception().getStackTrace()` or `StackWalker` (in Java 9+).

Clearly, we cannot use this approach in production, so we made a tool for that!

`ReactorDebugAgent` from the [reactor-tools project](http://github.com/reactor/reactor-tools) is a Java agent that helps you debug exceptions in your application without paying a runtime cost (unlike `Hooks.onOperatorDebug()`).

> ⚠️ This project is in incubating phase and may or may not become a standalone project or a module of [https://github.com/reactor/reactor-core](https://github.com/reactor/reactor-core) in the future.

It transforms (via bytecode transformation) chains like:

```java
CopyFlux.range(0, 5)
       .single()
```

to:

```java
CopyFlux flux = Flux.range(0, 5);
flux = Hooks.addCallSiteInfo(flux, "Flux.range\n foo.Bar.baz(Bar.java:21)"));
flux = flux.single();
flux = Hooks.addCallSiteInfo(flux, "Flux.single\n foo.Bar.baz(Bar.java:22)"));
```

To enable it, you need to initialize the agent first:

```java
CopyReactorDebugAgent.init();
```

ℹ️ Since the implementation will instrument your classes when they are loaded, the best place to put it is before everything else in your `main(String[])` method:

```java
Copypublic static void main(String[] args) {
    ReactorDebugAgent.init();
    SpringApplication.run(Application.class, args);
}
```

## [](#conclusion)Conclusion

We hope that these tools will make your life as a developer easier and make you feel more comfortable with Project Reactor!

## [](#links)Links

-   [https://github.com/reactor/BlockHound](https://github.com/reactor/BlockHound)
-   [https://github.com/reactor/BlockHound/blob/master/docs/how\_it\_works.md](https://github.com/reactor/BlockHound/blob/master/docs/how_it_works.md)
-   [https://github.com/reactor/reactor-tools](https://github.com/reactor/reactor-tools)