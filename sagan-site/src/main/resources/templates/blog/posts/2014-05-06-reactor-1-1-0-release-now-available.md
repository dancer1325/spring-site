---
title: Reactor 1.1.0.RELEASE now available
source: http://spring.io/blog/2014/05/06/reactor-1-1-0-release-now-available
scraped: 2026-02-24T07:25:28.355Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Jon Brisbin |  May 06, 2014 | 0 Comments
---

# Reactor 1.1.0.RELEASE now available

_Releases | Jon Brisbin |  May 06, 2014 | 0 Comments_

The Reactor team is pleased to announce that some significant updates to the Reactor framework are now available in the 1.1.0.RELEASE version of Reactor's flexible, asynchronous, fast data framework. This version includes numerous bug fixes and rewrites of key components to make them faster and, maybe more importantly, more efficient in terms of memory usage. Reactor 1.1 now includes the fantastic `gs-collections` library from Goldman Sachs \[1\] which provides a very fluent API for dealing with maps and collections of all kinds.

Here is a non-exhaustive list of changes between Reactor 1.0 and 1.1:

#### [](#stream--promise)Stream / Promise

-   Improved Stream and Promise value-handling
-   Additional composition methods like connect(), merge(), timeout(), window() and more
-   Many methods moved into Composable so shared between Stream and Promise

Some of the more useful additions to the Stream API over version 1.0 include the `Stream.window` and `Stream.timeout` methods. This allows you to collect values for a given period of time and pass them on down the processing chain. For example, to process whatever values have collected every 500ms, use a `window`:

```java
CopyDeferred<Pojo, Stream<Pojo>> in = Streams.defer(env);

// add all collected values every half-second
in.compose()
  .window(500)
  .consume(values -> service.addAll(values));

// another service emits data into the `Deferred`
Pojo p;
while(null != (p = input.next())) {
  in.accept(p);
}
```

#### [](#utilities)Utilities

-   Robust HashWheelTimer implemenation based on a `RingBuffer`
-   Allocator API for efficient object pooling
-   New Consumer Registry implementation based on `gs-collections` 5.0 \[1\]

If you need to control memory usage in a more predictable way, Reactor includes an allocation API that can be backed by any specific implementation of pooling that you require. Reactor 1.1 comes with two implementations: a RingBuffer-based `Allocator`, and a reference-counting `Allocator`.

The RingBuffer-based `Allocator` can be configured to act very much like a standard Disruptor `RingBuffer` with event handlers. But if all you need is to block the producer and use a slot-based allocation strategy, then it's very simple to use a RingBuffer for allocation:

```java
CopyAllocator<Event<Buffer>> pool = new RingBufferAllocatorSpec<Event<Buffer>>()
    .ringSize(16 * 1024)
    .allocator(() -> new Event<Buffer>(null))
    .waitStrategy(new BusySpinWaitStrategy())
    .get();

// in your code, maintain a `Reference` you can release
Reference<Event<Buffer>> ref = pool.allocate();

// pass your data POJO to other services
Event<Buffer> ev = ref.get().setData(buffer);
service.invoke(ev);

// when you're done, release the reference
ref.release();
```

#### [](#logging)Logging

-   Extremely efficient high-speed logging using Java Chronicle
-   Re-written Reactor-based async appender implementations

Logging can be very detrimental to an asynchronous application's performance--particularly one that uses technologies like a RingBuffer, which uses a single thread to support many tasks. If that thread gets blocked by one task doing IO writing a log entry, then that could potentially cascade back through the application and cause it to grind to a halt.

Reactor includes an efficient asynchronous `Appender` implementation for Logback \[2\] which moves the actual appending onto a dedicated logging thread. This should help alleviate thread pressure caused by logging in most applications. But sometimes even that's not enough and a higher-throughput solution is needed. That's where Reactor's Java Chronicle-based `Appender` comes in handy.

The Java Chronicle \[3\] is a high-speed messaging library that uses memory-mapped files for fast and efficient data persistence. Reactor integrates this with Logback by providing an `Appender` that logs raw event data from your application but does not have to invoke downstream appenders. This means your logging event is stored in a `Chronicle` but in its raw state. An additional utility is required to post-process a "durable" log file and either send those events to a "real" appender (like to a file or database) or to peek into the the `Chronicle` and look for entries that match a given pattern. This is extremely useful in production situations where you don't care about logging if the application is functioning normally but if something goes wrong, you can easily extract the data from the `Chronicle` into a standard log file for forensic analysis.

To configure a Reactor `DurableAsyncAppender` to do high-speed logging, simply declare it in your Logback configuration. Here's an example of using it in a `logback.xml` config:

```xml
Copy  <appender name="chronicle" class="reactor.logback.DurableAsyncAppender">
    <!-- Uncomment to have log events also sent to a "normal" file appender -->
    <!--appender-ref ref="logfile"/-->
    <basePath>log/</basePath>
    <backlog>2097152</backlog>
  </appender>
```

If something goes wrong, you can analyze the chronicle using the included utility by directing events extracted from the chronicle into the given "real" `Appender`. This example invokes the log utility (the `reactor-logback.jar` artifact must be on the classpath) and reads the durable log files from the `log/` directory, reads in the Logback configuration from `logback.xml` and then outputs all ERROR messages into the `logfile` appender, which is defined in the `logback.xml` config file.

```
Copyjava reactor.logback.DurableLogUtility --path log/ --config logback.xml --output logfile --level ERROR
```

#### [](#groovy)Groovy

-   Better organization of Groovy support
-   AST-based extensions moved to their own subproject for better Gradle compatibility
-   Ready for Groovy 2.3 and Java 1.8

Groovy 2.3.0 [has just been released](http://glaforge.appspot.com/article/groovy-2-3-0-is-out) and includes [a ton of new features and performance improvements](http://groovy.codehaus.org/Groovy+2.3+release+notes?nc) as well as lambda closure support and other cool JDK 8 features. Reactor's Groovy support is ready for use in Groovy 2.3 while still be compatible with Groovy 2.2 on JDK 7.

#### [](#networktcp)Network/TCP

-   Renamed `reactor-tcp` to `reactor-net`
-   Refactored base abstractions to handle both TCP and UDP
-   Added UDP support using Netty
-   Added ZeroMQ support using `jeromq`
-   Rewritten `reconnect` support
-   Improved and exapanded testing

Improvements to the TCP module have been made which incorporate support for UDP as well as a new implementation based on ZeroMQ. \[4\]

The ZeroMQ support in Reactor features `tcp` and `inproc` support and provides a succinct fluent API for creating clients and servers very quickly using Reactor's effecient codec facility.

```java
CopyZeroMQ<JsonData> zmq = new ZeroMQ<>(reactorEnv)
    .codec(new JacksonJsonCodec());

zmq.router("inproc://queue")
   .consume(channel -> channel.consume(service::invoke));

zmq.dealer("inproc://queue")
   .consume(channel -> {
     JsonData data;
     while(null != (data = in.next())) {
       channel.sendAndForget(data);
     }
   });
```

#### [](#testing)Testing

-   Numerous improvements to benchmarking
-   Added dedicated `reactor-benchmark` project based on JMH \[5\]
-   Removed most benchmarking code from core project
-   Expanded and improved test coverage

## [](#usage)Usage

Artifacts are available in Maven Central and `repo.spring.io/libs-release`. Please note that the coordinates for the Spring support have changed to `org.projectreactor.spring:reactor-spring-*` in version 1.1 \[6\].

Reference documentation is available in the [GitHub wiki](https://github.com/reactor/reactor/wiki).

Updated API docs are on the [GitHub pages site](http://reactor.github.io/docs/api/).

---

\[1\] - [https://github.com/goldmansachs/gs-collections](https://github.com/goldmansachs/gs-collections)

\[2\] - [http://logback.qos.ch/](http://logback.qos.ch/)

\[3\] - [https://github.com/OpenHFT/Java-Chronicle](https://github.com/OpenHFT/Java-Chronicle)

\[4\] - [http://zeromq.org/](http://zeromq.org/)

\[5\] - [http://openjdk.java.net/projects/code-tools/jmh/](http://openjdk.java.net/projects/code-tools/jmh/)

\[6\] - [http://repo.spring.io/libs-release/org/projectreactor/spring/](http://repo.spring.io/libs-release/org/projectreactor/spring/)