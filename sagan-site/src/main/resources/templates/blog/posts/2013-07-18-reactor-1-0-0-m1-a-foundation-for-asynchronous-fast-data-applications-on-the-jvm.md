---
title: Reactor 1.0.0.M1 - a foundation for asynchronous fast-data applications on the JVM
source: https://spring.io/blog/2013/07/18/reactor-1-0-0-m1-a-foundation-for-asynchronous-fast-data-applications-on-the-jvm
scraped: 2026-02-24T08:01:47.171Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Jon Brisbin |  July 18, 2013 | 0 Comments
---

# Reactor 1.0.0.M1 - a foundation for asynchronous fast-data applications on the JVM

_Engineering | Jon Brisbin |  July 18, 2013 | 0 Comments_

I'm super excited to announce the first milestone release of Project Reactor! Project Reactor is a foundational framework for building asynchronous, FastData applications on the JVM. Some of the goodness in Reactor 1.0.0.M1 includes: reactive composition helpers Stream and Promise, a TcpServer and TcpClient, and Groovy and Spring support. Inspired by Reactive Extenstions, RxJava, the new JDK 8 Stream API (and Scala, and others...), these Composables make coordinating asynchronous tasks dead simple. They support traditional callback-style programming using Consumers, but they also offer a succinct composition API with methods like `map(Function fn)`, `filter(Predicate p)`, `batch(int size)` and more.

### What Problem does Reactor Solve?

Reactor is designed, from the ground up, to be a high-performance, high-scale platform for building the next generation of big data applications. Asynchronous architectures are demonstrably superior to thread-per-request architectures when it comes to scaling an application to hundreds, thousands, even millions of users. Reactor's asynchronous underpinnings provide a solid foundation for big data applications that process tens or hundreds of thousands--or even millions--of events per second. It provides simple tools for chaining asynchronous tasks together and makes executing those tasks as easy as calling a single method.

### Composition using Reactor

Streams are an easy way to process data as it flows through an application asynchronously. In Reactor, there are actually two parts to a Stream: a Deferred, which is the publisher, and the actual Stream, which is a Consumer. You assign handlers on a Stream to process the data using a combination of composition methods and simple callbacks.

Transforming and filtering data coming into an application before placing it on a queue to be further processed using a Stream and JDK Lambdas would look something like this:

```java
Copy
// Create Environment in which Reactors operate
Environment env = new Environment();

// Create a Stream using the high-speed LMAX Disruptor RingBuffer
Deferred<Trade, Stream<Trade>> incoming = Streams.<Trade>defer()
		.env(env)
		.dispatcher(Environment.RING_BUFFER)
		.get();

// Work with the incoming trades
Stream<Trade> trades = incoming.compose();
Stream<Order> orders = trades.map(trade -> tradeService.placeTrade(trade));

// Filter out large orders from small
Stream<Order> highPriority = orders.filter(order -> order.getSize() >= 1000);
Stream<Order> lowPriority = orders.filter(order -> order.getSize() < 1000);

// Consume the orders in different ways
highPriority.consume(order -> orderService.executeNow(order));
lowPriority.consume(order -> orderService.executeLater(order));
```

### TCP Support

The M1 also includes an easy-to-use TCP client and server. Powered by the awesomely-fast Netty networking library, a Reactor-powered syslog server can ingest something like 1 million messages per sec on server-grade hardware. Reactor TCP support includes a simple Codec facility, which is easily extensible beyond the default set of codecs provided in core and designed to be lightweight by using Reactor's Buffer class, which provides things like extremely efficient views over data, as well as a slew of helper methods for working with standard Java NIO ByteBuffers--but without the pain of dealing with the ByteBuffer directly.

Reactor's TCP support comes with JSON right out of the box. To create a TCP-based RPC server that uses JSON as the protocol is as simple as this:

```java
Copy
TcpServer<Pojo, Pojo> server = new TcpServerSpec<Pojo, Pojo>(NettyTcpServer.class)
		.env(env)
		.codec(new JsonCodec<>(Pojo.class))
		.consume(conn -> {
			conn.consume(data -> {
				// handle incoming data
			});
		})
		.get()
		.start();
```

### Groovy and Spring Support

Reactor M1 also provides awesome Groovy support. It provides helpers to make consuming events using Closures very succinct. Needless to say, writing Reactor event-handling in Groovy is super easy. Dealing with Reactors using Closures makes asynchronous code actually readable!

```groovy
Copy
def env = new Environment()

// Create Reactor using default RingBuffer Dispatcher
def reactor = Reactors.reactor().env(env).get()

reactor.on('topic') { String s ->
	// handle data
}

// Publish an event to a topic
r1.notify 'topic', 'Hello World!'
```

Reactor M1 also includes Spring support to make writing event-driven POJOs as easy as an MVC Controller. By annotating methods with the `@On` annotation, a bean picked up by component-scanning can be automatically wired to a Reactor and be notified of events.

A simple JavaConfig-based Spring configuration might look like this:

```java
Copy
public class HandlerBean {
	@On(reactor = "@rootReactor", selector = '$("test")')
	public void handleTest() {
		// event 'test' was fired
	}
}

@Configuration
public class AnnotatedHandlerConfig {

	@Bean
	public Environment env() {
		return new Environment();
	}

	@Bean
	public Reactor rootReactor() {
		return env().getRootReactor();
	}
}
```

Just inject your Reactor into a service layer and when events are ready, publish them on the Reactor using the `notify()` method.

### Artifacts, Source, and Documentation

Maven artifacts are available in the SpringSource Artifactory repository. In a Gradle project, you'd pull Reactor in like this:

```groovy
Copy
ext {
  reactorVersion = '1.0.0.M1'
}

repositories {
	maven { url 'http://repo.springsource.org/libs-milestone' }
  mavenCentral()
}

dependencies {
  // Reactor Core
  compile 'org.projectreactor:reactor-core:$reactorVersion'
}
```

Source code is available on GitHub: [](https://github.com/reactor/reactor)[https://github.com/reactor/reactor](https://github.com/reactor/reactor)

Come join the [Reactor Google+ Community](https://plus.google.com/u/0/communities/102145739439865812501) to keep up with what's going on with Reactor, or [follow us on Twitter](https://twitter.com/ProjectReactor) @ProjectReactor.

Documentation is available on the [GitHub Wiki](https://github.com/reactor/reactor/) and the [API Javadoc](http://reactor.github.io/docs/api/).

You can also file issues and keep track of development on [GitHub Issues](https://github.com/reactor/reactor/issues?state=open).

### Come to SpringOne!

We'll be giving [a full session on Reactor at SpringOne this year](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29395). If you haven't made plans to attend yet, then you really should! The agenda is jam-packed with fantastic sessions on the exiciting things the Spring community is doing. Come join us!

[SpringOne2GX 2013, September 9-12 in Santa Clara, California](http://www.springone2gx.com/conference/santa_clara/2013/09/home)

I can't wait to dig into the next sprint to work toward 1.0 GA. We'd love to have you along for the ride!