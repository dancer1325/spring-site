---
title: Embracing Virtual Threads
source: https://spring.io/blog/2022/10/11/embracing-virtual-threads
scraped: 2026-02-23T10:38:15.663Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Paluch |  October 11, 2022 | 23 Comments
---

# Embracing Virtual Threads

_Engineering | Mark Paluch |  October 11, 2022 | 23 Comments_

Project Loom has made it into the JDK through [JEP 425](https://openjdk.org/jeps/425). It’s available since Java 19 in September 2022 as a preview feature. Its goal is to dramatically reduce the effort of writing, maintaining, and observing high-throughput concurrent applications.

## [](#where-virtual-threads-make-sense)[](#where-virtual-threads-make-sense)Where Virtual Threads make sense

This makes lightweight Virtual Threads an exciting approach for application developers and the Spring Framework. Past years indicated a trend towards applications that communicate over the network with each other. Many applications make use of data stores, message brokers, and remote services. I/O-intensive applications are the primary ones that benefit from Virtual Threads if they were built to use blocking I/O facilities such as `InputStream` and synchronous HTTP, database, and message broker clients. Running such workloads on Virtual Threads helps reduce the memory footprint compared to Platform Threads and in certain situations, Virtual Threads can increase concurrency.

Higher concurrency can be achieved if the system has additional resources necessary for concurrency. Specifically, these are:

1.  Available connections in a connection pool
    
2.  Sufficient memory to serve the increased load
    
3.  Unused CPU time
    

Use of Virtual Threads clearly is not limited to the direct reduction of memory footprints or an increase in concurrency. The introduction of Virtual Threads also prompts a broader revisit of decisions made for a runtime when only Platform Threads were available.

## [](#revision-of-concurrency-utilities)[](#revision-of-concurrency-utilities)Revision of Concurrency Utilities

Spring Framework’s `SimpleAsyncTaskExecutor` uses a new Platform Thread for each runnable submitted if no `ThreadFactory` is configured. Such an arrangement requires Platform Thread creation resulting in lower throughput and higher memory consumption. `SimpleAsyncTaskExecutor` could be revised to use Virtual Threads by default to reduce the memory footprint and increase throughput in its default configuration. (In the meantime, a custom `TaskExecutor` variant can be used to the same effect.)

## [](#revision-of-programming-models)[](#revision-of-programming-models)Revision of Programming Models

Virtual Threads can change our perspective on asynchronous programming interfaces. The reasons to use asynchronous programming models go away in many cases if we start with the assumption that our code runs on Virtual Threads. Virtual Threads are much more lightweight to allocate, and the number of threads is no longer a primary limitation for scalability. To make things more clear, asynchronous programming models do not remove the latency of e.g. a network call. The asynchronous Apache HTTP Client or netty simply switches tasks if a network call cannot progress instead of blocking a Thread. And the same happens with Virtual Threads: They effectively yield towards another `Runnable` that can progress with its work.

Project Loom has revisited all areas in the Java runtime libraries that can block and updated the code to yield if the code encounters blocking. Java’s concurrency utils (e.g. `ReentrantLock`, `CountDownLatch`, `CompletableFuture`) can be used on Virtual Threads without blocking underlying Platform Threads. This change makes `Future`'s `.get()` and `.get(Long, TimeUnit)` good citizens on Virtual Threads and removes the need for callback-driven usage of Futures.

Assumptions leading to the asynchronous Servlet API are subject to be invalidated with the introduction of Virtual Threads. The async Servlet API was introduced to release server threads so the server could continue serving requests while a worker thread continues working on the request. Running servlet request and response processing on a Virtual Thread removes the need to release server threads leading to the question, why to use `ServletRequest.startAsync()` at all, as asynchronous forking involves a lot of state-saving that could be eliminated as it would be no longer required.

## [](#mitigating-limitations)[](#mitigating-limitations)Mitigating Limitations

Our team has been experimenting with Virtual Threads since they were called Fibers. Since then and still with the release of Java 19, a limitation was prevalent, leading to Platform Thread pinning, effectively reducing concurrency when using `synchronized`. The use of `synchronized` code blocks is not in of itself a problem; only when those blocks contain blocking code, generally speaking I/O operations. These arrangements can be problematic as carrier Platform Threads are a limited resource and Platform Thread pinning can lead to application performance degradation when running code on Virtual Threads without careful inspection of the workload. In fact, the same blocking code in synchronized blocks can lead to performance issues even without Virtual Threads.

Spring Framework makes a lot of use of `synchronized` to implement locking, mostly around local data structures. Over the years, before Virtual Threads were available, we have revised `synchronized` blocks which might potentially interact with third-party resources, removing lock contention in highly concurrent applications. So Spring is in pretty good shape already owing to its large community and extensive feedback from existing concurrent applications. On the path to becoming the best possible citizen in a Virtual Thread scenario, we will further revisit `synchronized` usage in the context of I/O or other blocking code to avoid Platform Thread pinning in hot code paths so that your application can get the most out of Project Loom.

## [](#running-spring-applications-on-virtual-threads)[](#running-spring-applications-on-virtual-threads)Running Spring Applications on Virtual Threads

With the most recent versions of Spring Framework, Spring Boot and Apache Tomcat, you can start experimenting on your own. You start analyzing how Virtual Threads impact your application workloads and benchmark Virtual Threads usage vs. Platform Threads usage. To customize your Spring Boot application to process servlet requests on Virtual Threads, apply the following customization:

```
Copy@Bean(TaskExecutionAutoConfiguration.APPLICATION_TASK_EXECUTOR_BEAN_NAME)
public AsyncTaskExecutor asyncTaskExecutor() {
  return new TaskExecutorAdapter(Executors.newVirtualThreadPerTaskExecutor());
}

@Bean
public TomcatProtocolHandlerCustomizer<?> protocolHandlerVirtualThreadExecutorCustomizer() {
  return protocolHandler -> {
    protocolHandler.setExecutor(Executors.newVirtualThreadPerTaskExecutor());
  };
}
```

We are doing everything we can to make the preview experience as seamless as possible for the time being, and we expect to provide first-class configuration options once Loom goes out of preview in a new OpenJDK release.

If we learn about the concrete potential for virtual-thread-oriented optimizations in the core framework, be it certain `synchronized` usage points or certain `ThreadLocal` usage, we’ll try to roll corresponding refinements into upcoming Spring Framework and Spring Boot maintenance releases as far as possible, even before Loom’s general availability.

Virtual Threads impact not only Spring Framework but all surrounding integrations, such as database drivers, messaging systems, HTTP clients, and many more. Many of these projects are aware of the need to improve their `synchronized` behavior to unleash the full potential of Project Loom.

## [](#will-your-application-benefit-from-virtual-threads)[](#will-your-application-benefit-from-virtual-threads)Will your application benefit from Virtual Threads?

It is a more specific question than *will there be benefit*, and one harder to answer.

What we can say is that the most likely scenario in which you can benefit without almost any change, is if you’re currently not doing anything asynchronous at all (not even Servlet 3.1 style async requests, or otherwise you’ll probably need to make some revisions to align better). And of course, there would have to be some actual I/O or other thread parking for Loom to bring benefits.

We also believe that ReactiveX-style APIs remain a powerful way to compose concurrent logic and a natural way for dealing with streams. We see Virtual Threads complementing reactive programming models in removing barriers of blocking I/O while processing infinite streams using Virtual Threads purely remains a challenge. ReactiveX is the right approach for concurrent scenarios in which declarative concurrency (such as scatter-gather) matters. The underlying Reactive Streams specification defines a protocol for demand, back pressure, and cancellation of data pipelines without limiting itself to non-blocking API or specific Thread usage.

We very much look forward to our collective experience and feedback from applications. Our focus currently is to make sure that you are enabled to begin experimenting on your own. If you encounter specific issues in your own early experiments with Virtual Threads, please report them to the corresponding project.

*Give virtual threads a try with your Spring-based applications, and let us know how it goes!*