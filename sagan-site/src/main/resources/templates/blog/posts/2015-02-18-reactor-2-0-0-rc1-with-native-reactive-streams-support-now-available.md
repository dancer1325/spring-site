---
title: Reactor 2.0.0.RC1 with native Reactive Streams support now available!
source: https://spring.io/blog/2015/02/18/reactor-2-0-0-rc1-with-native-reactive-streams-support-now-available
scraped: 2026-02-23T21:54:52.125Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Jon Brisbin |  February 18, 2015 | 6 Comments
---

# Reactor 2.0.0.RC1 with native Reactive Streams support now available!

_Releases | Jon Brisbin |  February 18, 2015 | 6 Comments_

The Reactor team is happy to announce the release of 2.0.0.RC1, which is now available in [the spring.io Maven repository](http://repo.spring.io/libs-milestone/io/projectreactor/) as well as [Maven central](http://search.maven.org/#search%7Cga%7C1%7Cio.projectreactor). Version 2.0 is an `#uberupdate` from Reactor version 1.1 and contains several new components as well as complete rewrites of important classes like `Stream`, which now implements [the Reactive Streams standard](http://github.com/reactive-streams/reactive-streams).

Please note that the Maven coordinates for Reactor 2.0 have changed from those for Reactor 1.x. The new coordinates all fall under the group ID `io.projectreactor` rather than the previous `org.projectreactor`. A sample dependencies block for a Gradle project might look like this:

```groovy
Copyext {
  reactorVersion = '2.0.0.RC1'
}

repositories {
  maven { url 'http://repo.spring.io/libs-milestone' }
  mavenCentral()
}

compile "io.projectreactor:reactor-core:$reactorVersion",
    "io.projectreactor:reactor-net:$reactorVersion",
    "io.projectreactor.spring:reactor-spring-context:$reactorVersion"
```

### [](#what-is-reactor)What is Reactor?

If you're a complete newbie to Reactor, you might want to first jump over to the spiffy new website at [http://projectreactor.io](http://projectreactor.io) and get acquainted with it before some of this will make sense.

### [](#changelog-tldr)Changelog TL;DR

Along with [the changes announced in the 2.0.0.M1 release](https://spring.io/blog/2014/10/21/reactor-2-0-0-m1-released-with-reactive-streams-integration), here’s a brief list of important changes over version 1.1:

-   `Stream` has been rewritten to implement the Reactive Streams standard, is 5-10x faster, and has much less overhead than the previous version.
-   Upgrading from Reactor 1.x code is not hard, with just a few changes to existing code being required to accommodate the new signatures of `Stream` and the renaming of `Reactor` to `EventBus`. Documentation around this transition is ongoing.
-   Reactor’s `Stream` API derives from [Reactive Extensions](https://msdn.microsoft.com/en-gb/data/gg577609.aspx) and mirrors many of its naming conventions. By leveraging a common vocabulary and behavior, it’s possible to easily translate Rx.NET and RxJava examples to Reactor.
-   Reactor’s API has been harmonized around static helper methods and factories to make embedding as easy as possible.
-   TCP support is totally jacked: Reactive Streams backpressure, HTTP server and client, `Stream` integration, DSL helper methods.
-   [A new website](http://projectreactor.io/) with the beginnings of a proper reference manual, more samples, and more javadoc.
-   Community contributions from more than just core project committers.

### [](#reactive-streams-is-totally-boss)Reactive Streams is totally Boss

If we had to limit ourselves to talking about just one change, then the native and foundational support for Reactive Streams would be it. It’s hard to overstate just how fundamental Reactive Streams has become to Reactor. Stream processing is the [new](https://typesafe.com/company/news) [black](https://twitter.com/search?q=stream%20processing) and Reactor has embraced that from the beginning of the project. The addition of Reactive Streams and its propagation of backpressure support, however, makes processing large volumes of data in real or near-real time much more accessible to your cloud applications. Now patterns such as `stop-read` under load, `batch flush` or `adaptive batch` are available out of the box.

Each step in a Reactor `Stream` is a Reactive Streams component that correctly propagates demand and backpressure based on the rate of processing under the current resource constraints. Using Reactive Streams, Reactor 2.0 makes it possible to create a stream of processing that adjusts its resource usage automatically. You can influence the rate at which new items are pulled into the system because of the way Reactive Streams backpressure is communicated upstream. That means a slow downstream component can push back all the way to the source to slow down the ingest rate if current processing is using all available resources.

```java
CopyPool<Connection> pool;
Stream<Message> input;

input.capacity(1)
     .batchConsume(msg -> {
       pool.getConnection().merge(msg);
     }, requestMore -> Math.max(pool.getSize() - pool.getActive(), 1));
```

In the snippet above we’re adapting the number of items to process based on the number of available connections in the pool. The `Consumer` passed as the first parameter to the `batchConsume` method will be invoked governed by the `requestMore` value returned from the `Function` passed as the second parameter. In this case we’re going to pre-fetch a number of messages equal to the number of free connections in the pool, or just a single message if all connections are active (in that case we’ll rely on backpressure from the connection pool).

If we wanted to make sure our stream was not a resource hog, we could also change the capacity algorithm to return a number less than the number of available connections, which would leave some connections available to other components in our application.

### [](#reactor-is-now-android-friendly)Reactor is now Android-friendly

Starting with Reactor 2.0.0.RC1, it’s possible to include Reactor in your Android application by simply excluding the `gs-collections` library which would otherwise force you to jump through some hoops due to it’s size. We’ve implemented a `SimpleCachingRegistry` for the `EventBus` that doesn’t use `gs-collections`. Future improvements could include a dedicated UI event loop `Dispatcher` to make sure your event handlers are run on the correct thread.

We’re very interested to see how Reactor can facilitate reactive applications on Android devices and how that ties to Reactor’s extremely high volume, low latency capabilities on the server side. Please let us know if you’re using Reactor on Android and if there are things we can do to make that experience better.

### [](#http-and-better-tcp-and-zeromq-support)HTTP and Better TCP and ZeroMQ support

RC1 introduces new support for HTTP based on Reactor’s use of Netty 4. It’s not comprehensive yet, but it provides a few helper methods and some useful abstractions for building (and accessing) non-blocking REST-based micro and nanoservices. I wouldn't be trying to build production services with it yet, as there's still some refining that needs to happen before GA. You can embed a microservice using Reactor without resorting to the Netty API directly.

The following creates a Netty-based embedded HTTP server with path parameters that dispatches tasks onto the shared `RingBufferDispatcher`.

```java
CopyHttpServer<String, String> server = NetStreams.httpServer(
  spec -> spec.listen(3000)
              .codec(StandardCodecs.STRING_CODEC)
              .dispatcher(Environment.sharedDispatcher())
);

server.get("/echo/{greeting}", ch -> {
  String greeting = ch.param("greeting") + " World!";

  ch.transfer(Transfer.NON_CHUNKED)
    .responseHeader("Content-Length", "" + greeting.length())
    .log("server");

  return Streams.just(greeting);
});

server.start();
```

We’ve also updated the TCP and ZeroMQ support to make better use of the important changes we made to `Stream`. Most importantly, TCP servers and clients make use of Reactive Streams backpressure support to implement patterns like 'stop-read' to keep the server from overflowing downstream processing by reading too much data from the client, before there are resources available to process it.

### [](#the-road-to-ga)The Road to GA

We’ll do at least one more RC before releasing Reactor 2.0 GA. There’s still a few tweaks we need to make around complicated fork/join dispatching before we’re happy with its predictability. There are likely some additions to the HTTP support that we’ll want to make since this first cut is a fairly simple set of features. We might come across a few more bugs in edge cases as well.

We feel pretty good about this release candidate and we encourage you to try it out. If you’re doing new development, then we definitely encourage you to build on the Reactive Streams foundation of Reactor 2.0 versus the less capable, pre-Reactive Streams version in 1.1. If you’re upgrading existing Reactor code, the path is actually quite easy. In almost all cases your code will be greatly simplified.

### [](#getting-support)Getting Support

If you run into problems upgrading your code, or just have general questions about how to use Reactor to solve your fast data problems, don’t hesitate to ask on the [Reactor Framework Google Group](https://groups.google.com/forum/#!forum/reactor-framework).

We also welcome community contributions via [pull requests on GitHub](https://github.com/reactor/reactor/pulls).

You might also be interested to know that the Reactive Streams project is being considered for inclusion in JDK 9 in the form of a new `java.util.concurrent.Flow` class and appropraite inner classes. The discussion on this topic is being held in the [JSR-166 concurrency-interest](http://g.oswego.edu/dl/concurrency-interest/) mailling list managed by professor [Doug Lea](http://gee.cs.oswego.edu/dl/) of the State University of New York at Oswego.

### [](#getting-the-code)Getting the Code

Reactor is Apache 2.0 licensed and the project is managed through GitHub:

-   **Reactor (core, groovy, net)**: [https://github.com/reactor/reactor](https://github.com/reactor/reactor)
-   **Reactor Spring**: [https://github.com/reactor/reactor-spring](https://github.com/reactor/reactor-spring)