---
title: It can\'t just be Big Data, it has to be Fast Data: Reactor 1.0 goes GA
source: https://spring.io/blog/2013/11/12/it-can-t-just-be-big-data-it-has-to-be-fast-data-reactor-1-0-goes-ga
scraped: 2026-02-24T07:53:17.715Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Jon Brisbin |  November 12, 2013 | 0 Comments
---

# It can't just be Big Data, it has to be Fast Data: Reactor 1.0 goes GA

_Releases | Jon Brisbin |  November 12, 2013 | 0 Comments_

I'm happy to announce that Reactor, a powerful foundational library for building reactive, fast data applications on the JVM has reached GA!

### [](#what-is-reactor-and-why-should-i-care)What is Reactor and why should I care?

Reactor provides the necessary abstractions to build high-throughput, low-latency--what we now call "fast data"--applications that absolutely *must* work with thousands, tens of thousands, or even millions of concurrent requests per second.

You should care about Reactor because modern applications with non-human consumers--like mobile phones and the apps that run on them--generate more data than traditional thread-per-connection servers are capable of supporting so Reactor provides you with the tools and abstractions you need to build these kinds of high-scale applications without getting bogged down in the logistics of managing state and passing around events in an asynchronous application. Modern JVM applications must be built on a solid foundation of asynchronous and reactive components that efficiently manage the execution of a very large number of tasks on a very small number of system threads. Reactor is specifically designed to help you build these kinds of applications without getting in your way or forcing you to work within an opinionated pattern.

### [](#reactor-is-foundational)Reactor is foundational

Reactor itself is heavily influenced by the [well-known design pattern of the same name](http://en.wikipedia.org/wiki/Reactor_pattern)\--but it doesn't draw inspiration from *just* that pattern. There are elements of the [Actor model](http://en.wikipedia.org/wiki/Actor_model) and traditional event-based callback programming as well.

Although it is part of the foundation of the [Spring IO platform](https://spring.io/platform), **the core Reactor libraries have no dependency on Spring**. Reactor core is a self-contained library whose only external dependencies are [SLF4J](http://www.slf4j.org/) and the fantastic [LMAX Disruptor RingBuffer library](http://lmax-exchange.github.io/disruptor/).

Built on Reactor's core are other, optional components to facilitate developing applications against common patterns. Some of Reactor's built-in, first-class support includes:

-   LMAX Disruptor support via the high-speed [Processor](http://reactor.github.io/docs/api/index.html?reactor/core/processor/Processor.html) abstraction, which provides a Reactor API over the RingBuffer.
-   Support for the high-performance [JavaChronicle persistent message-passing library](https://github.com/OpenHFT/Java-Chronicle) through the flexible [PersistentQueue](http://reactor.github.io/docs/api/index.html?reactor/queue/PersistentQueue.html) abstraction.
-   Supports Groovy closures and `@CompileStatic` and provides a comprehesnive environment-construction and event-wiring DSL.
-   High-performance TCP client and server support based on Netty 4.0.
-   Powerful annotation-based Spring support.
-   Buckets of stuff in the boot...

### [](#reactor-is-fast)Reactor is fast

Reactor is designed from the ground up to be flexible and efficient in what it does so that it can get out of your way and help you process data through your application as fast as possible. In its fastest configuration, a standard RingBuffer-backed Reactor can publish over 10-15 million events per second on a standard developer laptop. The high-performance `Processor` abstraction can pump over 100 million events per second into your application. What your application does with the data to slow Reactor down can vary depending on the task. But with throughput as high as this in an optimum, no-op mode, an application won't be sitting around waiting on Reactor to do its work!

### [](#reactor-is-functional)Reactor is functional

Reactor core includes some fundamental abstractions inspired by (and in some cases directly based on) the new functional abstractions of JDK 8 like `Function<T,V>`, `Consumer<T>`, `Supplier<T>`, and `Predicate<T>`. Not only is Reactor itself built on the foundation of these abstractions, but your applications can also leverage them. At some point in the future JDK 8 adoption will be pervasive enough that Reactor can simply delete these abstractions from Reactor and rely on those in JDK 8. Until then, your JDK 6 and 7 applications can benefit from these functional abstractions right now.

### [](#reactor-is-reactive)Reactor is reactive

Inspired by libraries like the [Reactive Extensions for .NET](http://rx.codeplex.com/), [Netflix's RxJava](https://github.com/Netflix/RxJava), the JDK 8 [Stream](http://download.java.net/jdk8/docs/api/index.html?java/util/stream/Stream.html) abstraction, and many others (not to mention 20 years of event-driven Computer Science), Reactor provides a "reactive" programming model to make coordinating asynchronous tasks much easier. Abstractions like `Stream<T>` and `Promise<T>` make chaining non-blocking actions easy and succinct--and no callback spaghetti!

```java
Copy@Inject
AsyncDataLoader loader;

Promise<Buffer> p = loader.get("U-U-I-D")
    .map(new Function<Buffer, Data>() {
      public Data apply(Buffer buff) {
        // transform data
        Data data = parser.parse(buff);
        return data;
      }
    })
    .filter(new Predicate<Data>() {
      public boolean test(Data data) {
        // check Data for certain conditions being true
        return null != data.getName();
      }
    })
    .consume(new Consumer<Data>() {
      public void accept(Data data) {
        // only Data that passes the Predicate test makes it here...
      }
    });
    
// Promises can also block like a Future
Buffer buff = p.await();
```

Each of these actions (`map`, `filter`, `consume`) are distinct actions performed (potentially) asynchronously. In a traditional multi-threaded environment, noisy bits of code around blocking on Futures and waiting for completions would have to be added. Using Reactor, however, you simply chain actions together in a reactive way so that an action will "react" to data when the previous action is finished.

### [](#reactor-is-groovy)Reactor is groovy

Reactor includes first-class support for the Groovy language. It supports using Closures as callbacks, has a powerful DSL for configuring the Reactor Environment, and provides some very cool operator overloading for writing terse code.

### [](#reactor-is-extensible)Reactor is extensible

Clojurewerkz has a library called [Meltdown](https://github.com/clojurewerkz/meltdown) that is based on Reactor. Other JVM language support can be added without a lot of effort. Reactor's API is designed to be extensible so that non-Java languages can benefit from the tools in Reactor.

### [](#but-what-does-the-code-look-like)But what does the code look like?

Reactor is Java 8 ready, so let's first look at some Reactor code using the awesome Lambda feature of JDK 8:

```java
Copyimport static reactor.event.selector.Selectors.*;

// Only create one of these per JVM
static Environment env = new Environment();

// Create a Reactor and listen to a topic using a Selector
Reactor r = Reactors.reactor(env)
  .<String>on($("topic"), ev -> System.out.prinltn("greeting: " + ev.getData()));

r.notify("topic", Event.wrap("Hello World!"));
```

One of the things Reactor hopes to accomplish is to reduce the amount of code you have to write; the above is pretty succinct. But even in Java 6 and 7 it's very terse:

```java
Copyimport static reactor.event.selector.Selectors.*;

// Only create one of these per JVM
static Environment env = new Environment();

// Create a Reactor and listen to a topic using a Selector
Reactor r = Reactors.reactor(env)
  .on($("topic"), new Consumer<Event<String>>() {
    public void accept(Event<String> ev) {
      System.out.prinltn("greeting: " + ev.getData());
    }
  });

r.notify("topic", Event.wrap("Hello World!"));
```

In Groovy it's even more succinct (as you would expect) since the language support takes care of converting some objects into the right types and allows the use of Closures:

```java
Copydef env = new Environment()

def r = Reactors.reactor(env).on("topic") { String greeting ->
  println "greeting: $greeting"
}

r.notify "topic", "Hello World!"
```

### [](#dispatchers)Dispatchers

A `Dispatcher` is responsible for executing a task on a given `Thread`. There are various built-in implementations of `Dispatcher` that execute a task in the calling thread, on a thread from a pool, using a single-threaded event loop style dispatching, or the fastest dispatcher: the `RingBufferDispatcher` which dispatches tasks using the [LMAX Disruptor RingBuffer](http://lmax-exchange.github.io/disruptor/).

Whenever you create a component in Reactor, it's common to specify the `Dispatcher` to use when dispatching events. Instead of using a thread pool, which can become extremely expensive to CPU and GC in high-volume applications, event dispatch into the RingBuffer is extremely efficient. It's possible to dispatch 10's of millions of events per second using the `RingBufferDispatcher`.

### [](#selectors)Selectors

A `Selector` is the dynamic mapping of actions to event keys. When you assign an action to a `Reactor`, you tell it what event keys to respond to by registering a `Selector`. There are several built-in implementations that match on things like `Object.equals()`, do String-based regular expression matching, URI template matching so you can use the familiar brace-delimited placeholder notation for matching against URIs, `Class.isAssignableFrom()` matching to select only those keys that descend from a common abstraction, `Predicate` matching to allow you to create arbitrary `Predicate<T>` Selectors based on scoped predicates, and there's even an optional `JsonPathSelector` that uses [JsonPath](https://code.google.com/p/json-path/) to query data from the key using a JsonPath expression.

You'll have noticed in the samples the use of something that, as a Java developer, you might be a little confused by: the `$` shortcut method for creating a `Selector` \[1\]. If you've used jQuery for web development, then you'll feel right at home because the `$` method is simply a shortcut to creating a `Selector` much like jQuery creates a CSS Query when writing things like `$(".css-class")`. If the dollar sign is too unusual for you, Reactor always tries to provide more than one way of getting something accomplished; you can use the `Selectors.object(T)` or `ObjectSelector.objectSelector()` static creation method instead (or just new up an instance of `ObjectSelector` using the constructor).

\[1\]: *Besides `$(T)`, there are other shortcut helper methods for creating Selectors. There's `R(String)` for creating RegexSelectors, `T(Class<?>)` for creating ClassSelectors, and `U(String)` for creating UriTemplateSelectors.*

### [](#promise-and-stream)Promise and Stream

Reactor's `Promise` and `Stream` provide a reactive, compositional way to coordinate multiple, asynchronous tasks without excessive callback spaghetti. A `Promise` is a stateful component that can be passed around your application and represents a value that will be populated from another thread. Like a traditional `Future`, a `Promise` can block the calling thread. But more importantly, a `Promise` makes it easy to transform values and execute whole chains of processing.

A `Stream` is similar to a `Promise` in that it provides a composition API to react to future values. But a `Stream` differs from a `Promise` in that it is designed to handle multiple values passing through.

To populate values in either a `Promise` or a `Stream`, you create a `Deferred`, which is a `Consumer<T>`. You can pass this `Deferred` into your service layer to communicate the eventual value back to the caller.

```java
Copy// Only create one of these per JVM
static Environment env = new Environment();

public class DataLoader {

  public Promise<Buffer> load(String key) {  
    Deferred<Buffer, Promise<Buffer>> deferred = Promises.defer(env);

    // submit work to be done in another thread
    // like reading data from a datastore
    datastore.load(key, deferred);
    
    return deferred.compose();
  }
  
}

// Your service layer uses this API
@Inject
DataLoader loader;

loader.load("obj-key")
  .onSuccess(new Consumer<Buffer>() {
    public void accept(Buffer b) {
      // handle eventual data
    }
  })
  .onError(new Consumer<Throwable>() {
    public void accept(Throwable t) {
      // handle errors
    }
  });
```

### [](#tuples)Tuples

Scala's Tuple class is a type-safe way to pass around a single object that encapsulates other values without creating applicaiton-specific, single-use "holder" beans. Reactor incorporates this functionality into its own interpretation of the `Tuple` class.

Tuples are extremely easy to use. You create one using the `Tuple.from(T1, T2, …)` methods and you can get the values from them using the `Tuple.getT1()` to `Tuple.getTN()` methods.

```java
Copyreactor.on($("topic"), new Consumer<Event<Tuple2<URI, Buffer>>>() {
  public void accept(Event<Tuple2<URI, Buffer>> ev) {
    URI uri = tup.getT1();
    Buffer buff = tup.getT2();  
    
    // deal with request from uri.getPath()
  }
});

// notify consumers of new request
reactor.notify("topic", Event.wrap(Tuple.from(requestUri, request)));
```

Check the [Tuple API documentation](http://reactor.github.io/docs/api/index.html?reactor/tuple/Tuple.html) for all the possibilities.

### [](#tcpclient-and-tcpserver)TcpClient and TcpServer

Reactor comes with full-featured TCP client and server abstractions. They provide an easy way to build TCP-based applications that can support large numbers of clients. The basic abstractions in the Reactor TCP support are generic and multiple implementations could be created to leverage different TCP technologies. The built-in implementation, though, leverages the great [Netty library](http://netty.io/) for doing asynchronous IO.

### [](#apache-licensed-with-a-friendly-community)Apache-licensed with a friendly community

Reactor is open source and Apache-licensed. The developer and user community is just a bunch of normal folks that want to work together to create a fantastic foundation for building reactive, FastData applications on the JVM. Become a part of our community to learn more about Reactor or to contribute back through whatever improvements you'd like to see.

To get started quickly with Reactor and see some code in various contexts, check out the quickstart:

[https://github.com/reactor/reactor-quickstart](https://github.com/reactor/reactor-quickstart)

or the samples:

[https://github.com/reactor/reactor-samples](https://github.com/reactor/reactor-samples)

To fork the source code, read the wiki, or file an issue, visit us on GitHub:

[https://github.com/reactor/reactor](https://github.com/reactor/reactor)

There's a Google Group you can join to ask questions or otherwise contribute to the discussion around Reactor:

[https://groups.google.com/forum/#!forum/reactor-framework](https://groups.google.com/forum/#!forum/reactor-framework)

Access the Maven artifacts to include in your project:

```xml
Copy<dependencies>

	<!-- core components -->
	<dependency>
		<groupId>org.projectreactor</groupId>
		<artifactId>reactor-core</artifactId>
		<version>1.0.0.RELEASE</version>
	</dependency>
	
	<!-- groovy support -->
	<dependency>
		<groupId>org.projectreactor</groupId>
		<artifactId>reactor-groovy</artifactId>
		<version>1.0.0.RELEASE</version>
	</dependency>

	<!-- tcp client/server -->
	<dependency>
		<groupId>org.projectreactor</groupId>
		<artifactId>reactor-tcp</artifactId>
		<version>1.0.0.RELEASE</version>
	</dependency>

	<!-- spring support -->
	<dependency>
		<groupId>org.projectreactor</groupId>
		<artifactId>reactor-spring</artifactId>
		<version>1.0.0.RELEASE</version>
	</dependency>

</dependencies>
```