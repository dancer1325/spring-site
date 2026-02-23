---
title: Reactor 2.0.0.M1 released with Reactive Streams integration!
source: https://spring.io/blog/2014/10/21/reactor-2-0-0-m1-released-with-reactive-streams-integration
scraped: 2026-02-23T22:11:20.379Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Jon Brisbin |  October 21, 2014 | 5 Comments
---

# Reactor 2.0.0.M1 released with Reactive Streams integration!

_Engineering | Jon Brisbin |  October 21, 2014 | 5 Comments_

The [Reactor](https://github.com/reactor/reactor) team is frankly a little giddy at finally being able to announce an initial milestone release of Reactor 2.0! This update includes a fully-compliant [Reactive Streams](http://www.reactive-streams.org/) implementation in the completely re-written `Stream` and `Promise` APIs! This is a huge step for Reactor users. It opens up integration with other Reactive Streams implementations like [Akka Streams](http://www.typesafe.com/activator/template/akka-stream-scala), [Ratpack](http://ratpack.io/), [RxJava](https://github.com/ReactiveX/RxJava) and others. Reactor provides a solid foundation upon which to build modern `#uberfastdata` applications with demanding high-throughput and low-latency requirements.

### [](#stream-and-promise)Stream and Promise

The headline change in Reactor 2.0 is the Stream API. In fact, most other parts of the codebase were either just lightly refined or remain untouched between 1.1 and 2.0. Not so with `Stream` and `Promise`. These components have been completely rewritten from the ground up to take advantage of the Reactive Streams specification to provide fully-non-blocking backpressure in functional reactive streaming pipelines.

### [](#what-is-backpressure-in-a-reactive-system)What is backpressure in a reactive system?

Dr. Roland Kuhn, of Akka fame, has spoken on the topic quite eloquently and if you're interested in exploring the reasoning behind non-blocking backpressure, we encourage you to watch his conference presentations on the topic, [most of which are available on YouTube](https://www.google.com/search?q=site%3Ayoutube.com%20%22reactive%20streams%22%20%22roland%20kuhn%22&rct=j).

TL;DR

Backpressure is an inversion of the publisher and subscriber relationship where the `Subscriber` says to the `Publisher` "give me the next N available items" rather than a `Publisher` saying to a `Subscriber` "take all these items I have whether you can handle them or not". Since the `Publisher` is passively providing elements of data to the `Subscriber` rather than the other way around, it's not necessary (in a fully Reactive Streams pipeline) to buffer data since you'll never have more data inflight than what you can handle. In reality, some buffering or queueing is necessary but libraries like Reactor take away your need to worry about how this is accomplished so you can write fully reactive code that responds to data as it becomes available rather than trying to figure out what magic combination of `BlockingQueue` or other kinds of inefficient schemes must be employed to ensure asynchronous components are properly segregated from one another.

### [](#reactor-implements-reactive-streams)Reactor implements Reactive Streams

The Reactor team has put in the depressingly large number of hours necessary to implement a comprehensive implementation of the Reactive Streams specification. Reactor's `Stream` component provides you with useful and understandable hooks on which to hang your business logic so that you only have to concern yourself with writing the appropriately-scoped functional component that will respond to a single element of data rather than having to dirty your code with a lot of boilerplate logistics to handle passing data from one Thread to another, performing bounded queueing and buffering, and the sundry other tasks usually necessary in working with reactive, asynchronous components.

An example of how this looks in your code can be found in the [Reactive Geocoder Demo](https://github.com/SpringOne2GX-2014/reactive-geocoder) which the Reactor team discussed at this year's SpringOne in Dallas, Texas ([replays](http://www.infoq.com/presentations/reactive-streams-reactor) are available on InfoQ for SpringOne2GX 2014 attendees and will become public some time later).

Following is a little snippet that shows how to create a new `Stream`, attach business logic to it, then publish data into it.

```java
Copy// by default Streams use the Disruptor RingBufferDispatcher
HotStream<String> helloStream = Streams.defer(env);

helloStream.map(s -> "Hello " + s + "!")
           .consume(log::info);

helloStream.broadcastNext("World");
```

When you run this, you will see the text "Hello World!" logged. You should also notice that the logging has taken place from the RingBuffer thread and not from your main thread. In other words, you've just submitted a task to another Thread to be executed asynchronously, have the result transformed into something else, and then responded to the result using Reactive Streams non-blocking, demand-based backpressure without any kind of noisy Future-based, blocking code!

You can create "cold" streams as well, which are very similar to using RxJava's `Observable`.

```java
Copy// stream contains the single value "Hello World!"
Stream<String> helloStream = Streams.just("World");

helloStream.map(s -> "Hello " + s + "!")
           .consume(log::info);
```

When you run this, you will see the text "Hello World!" logged, similarly to the previous example. The difference here is that we never had to call the `broadcastNext(String)` method because that was handled for us when we attached our `Consumer<String>`. You can create streams out of any value or collection of values just like creating an RxJava `Observable`. This lets you mix standard Java Collection APIs with the reactive, streaming API.

### [](#stream-is-the-new-black)Stream is the new Black

Streaming APIs like Spark, Storm, and other Big Data libraries prove that working with data in a more functional and reactive way is more efficient when running on systems without unlimited resources (which is basically anything we run on in the cloud) as well as being more understandable (in many cases) owing to the declarative, self-documentating nature of the DSL used to build up the processing pipeline. When you boil your business logic down to its essence, you really do notice that not many things exist that can't be expressed as a transformation or consumer function. You either take input and produce output or you simply take input. Reactor's Stream API is steeped in this paradigm so provides you with a plethora (who can tell me this movie reference: "would you say I have a plethora of pinatas?") of options for processing data as it passes through your pipeline. Beyond simple functions like `map(Function<T,V>)` and `filter(Predicate<T>)` are the more sophisticated options like `buffer(int)` or `buffer(int, long, TimeUnit)`. The latter provides extrememly useful length and time-based "microbatching". For example, to microbatch a set of database updates that are expensive to send across a WAN connection, you might want to buffer them until you either have a set amount or a certain timeout has elapsed.

```java
Copy// create a stream backed by a load-balanced, round-robin assigned Dispatcher
Stream<Update> updateStream = Streams.defer(env, env.getDefaultDispatcherFactory().get());

updateStream.buffer(1024, 350, TimeUnit.MILLISECONDS)
            .consume(driver::batchUpdate);
```

This will collect streaming updates until either 1024 of them have been collected or 350 milliseconds have expired, whichever comes first. It will then trigger the downstream processing by passing a `List<Update>` of either 1024 elements or however many were collected in 350ms. This allows you to write very, very efficient systems that deal with high volumes of data in batches to minimize network bandwidth usage and maximize throughput (while still maintaing a predicatble latency).

Along with microbatching `Stream` provides facilities like `filter`, `flatMap`, `movingBuffer`, `join`, `merge`, `sample`, `sort`, and many other operations which are largely self-explanatory. Much like Scala's collection API or RxJava's Observable, Reactor's `Stream` provides functional and reactive ways to process data quickly, efficiently, and at extremely high volume while maintaining predictable, low latencies. It's not an exaggeration to say that you could write your entire application using the `Stream` as a foundational component that is used to submit asynchronous tasks for execution and also to process traditional collections of data in a reactive way--and then mix the two approaches by combining live data with historical data.

### [](#parallel-processing)Parallel processing

It's sometimes necessary to split up a stream of data into parallel pipelines for doing concurrent processing. Reactor's `Stream` provides an extremely convenient way to do this with the `parallel(int)` operation. You simply attach your business logic to the `Stream` provided after the `parallel` call and data will be round-robined between the downstream pipelines for concurrent processing.

```java
CopyHotStream<String> stream = Streams.defer(env);

// by default uses number of CPUs as thread count
stream.parallel(substream -> substream.map(greeting -> "Hello " + greeting + "!")
                                      .consume(log::info));
```

Here's an interesting example of the Reactive Streams implementation showing itself in your code: when you run this you won't get any output. The `.parallel()` operation doesn't create "demand" on the pipeline. In a Reactive Streams system, it's the end of the pipeline that pulls data into the operations rather than the producer that pushes it. Since there's no terminal operation at the end of this pipeline, there's no way for the data to get pulled through. In reality that's not usually a problem because you actually want to handle the data in a real application. In this example, we can just add a `.drain()` call after `.parallel()` to produce demand and pull data through. We likely wouldn't do this in a production system but for tests and demos we can take the easy out with a drain.

```java
Copystream.parallel(substream -> substream.map(greeting -> "Hello " + greeting + "!")
                                      .consume(log::info))
      .drain();
```

### [](#whats-going-on-and-why-dont-i-see-what-i-expect)What's going on and why don't I see what I expect?

With reactive systems it's sometimes frustrating to understand why things aren't working like you expect. While there's not a lot that a library can do to make the process of live debugging an asynchronous stream inside an IDE better, there's always the tried-and-true method of copious logging. Reactor adds a couple of somewhat hidden methods called `.debug()` and `.log()` that should help you figure out how your streams are constructed and what they're doing. The `.debug()` method will provide you with an output of how a stream is wired. It will show what actions are connected to what and what capacities are currently available in each. The `.log()` method attaches a logging action to your stream and outputs subscribe and publish events.

If we add a `.log()` call before our `.parallel()` from the above example, we'll get additional logging to tell us what's happening:

```java
Copystream.log()
      .parallel(substream -> substream.map(greeting -> "Hello " + greeting + "!")
                                      .consume(log::info))
      .drain();
```

Will produce:

\[ringBuffer-1\] INFO  r.r.a.LoggerAction - onSubscribe: {capacity=0/8188 \[0%\], current=0, pending=0, waiting=0}
\[main\] INFO  r.r.a.LoggerAction - subscribe: ConcurrentAction-{dispatcher=RingBuffer:8192, max-capacity=8188}
\[ringBuffer-1\] INFO  r.r.a.LoggerAction - request: 9223372036854775807
\[ringBuffer-1\] INFO  r.r.a.LoggerAction - onNext: World
\[ringBufferGroup-2\] INFO  r.r.StreamTests - Hello World!

### [](#artifacts)Artifacts

To upgrade an existing application to Reactor 2.0, you'll likely only need to tweak a few things. If you are using streams in Reactor 1.1, you'll find that Reactor 2.0 streams differ in their publication of values. The `.broadcastNext()` method is defined on `Action` subclasses and `HotStream` but not some other operations. Reactor 1.1 used a `Deferred` to publish values so your code will need to be tweaked to change the publisher type to something that has access to the `.broadcastNext()` method. If you're using a plain `Reactor` or the Spring and annotation-based event handling, you won't have to change hardly anything.

To access the milestone artifacts, use the `http://repo.spring.io/libs-milestone` repository in your build system of choice. For example, if using Gradle (of course you're using Gradle, right?) just configure your `repositories` block like so:

```groovy
Copyrepositories {
  maven { url 'http://repo.spring.io/libs-milestone' }
  mavenCentral()
}
```

To report bugs, follow the development of Reactor 2.0, read the wiki, or otherwise get involved in the Reactor community, visit the GitHub home of Reactor at [https://github.com/reactor/reactor](https://github.com/reactor/reactor). You can also read the JavaDoc online here: [http://reactor.github.io/docs/api/2.0.0.M1/index.html](http://reactor.github.io/docs/api/2.0.0.M1/index.html)