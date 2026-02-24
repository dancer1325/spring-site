---
title: Reactor - a foundation for asynchronous applications on the JVM
source: https://spring.io/blog/2013/05/13/reactor-a-foundation-for-asynchronous-applications-on-the-jvm
scraped: 2026-02-24T08:05:33.953Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Jon Brisbin |  May 13, 2013 | 9 Comments
---

# Reactor - a foundation for asynchronous applications on the JVM

_Engineering | Jon Brisbin |  May 13, 2013 | 9 Comments_

We’re pleased to announce that, after a long period of internal incubation, we’re releasing a foundational framework for asynchronous applications on the JVM which we’re calling *Reactor*. It provides abstractions for Java, Groovy and other JVM languages to make building event and data-driven applications easier. It’s also really fast. On modest hardware, it's possible to process over 15,000,000 events per second with the fastest non-blocking `Dispatcher`. Other dispatchers are available to provide the developer with a range of choices from thread-pool style, long-running task execution to non-blocking, high-volume task dispatching. The GitHub repo is here [](https://github.com/reactor/reactor)[https://github.com/reactor/reactor](https://github.com/reactor/reactor).

Reactor, as the name suggests, is heavily influenced by [the well-known Reactor design pattern](http://en.wikipedia.org/wiki/Reactor_pattern). But it is also influenced by other event-driven design practices, as well as several awesome JVM-based solutions that have been developed over the years. Reactor's goal is to condense these ideas and patterns into a simple and reusable foundation for making event-driven programming much easier.

Reactor’s abstractions give the developer a set of tools to not just develop but *compose* applications in a way that more efficiently uses system resources--which is particularly important when running in the cloud--and reduce or eliminate the spaghetti of nested callbacks (aptly named [“callback hell”](http://callbackhell.com/)) that has so far burdened most asynchronous applications.

### What is Reactor good for?

While you can make Reactor do a lot of things because of its inherent flexibility, it’s really designed to be a foundational framework for applications that need high throughput when performing reasonably small chunks of stateless, asynchronous processing. The sheer volume of non-human-generated data in modern applications can easily overtake a traditional single-threaded, blocking design model. From mobile applications that generate streams of location information to computerized manufacturing machines that send out vast amounts of geometric data to big data applications mining real-time logs to generate business metrics: modern data-driven applications demand better resource utilization and higher throughput than a traditional imperative, blocking application can usually provide.

That’s why [the Spring XD project](http://blog.springsource.org/2013/04/23/introducing-spring-xd/) (as well as several other Spring ecosystem projects like Spring Integration and Spring Batch) intend to take advantage of Reactor. Combining Reactor’s async dispatch with the NIO-based TCP adapters from Spring Integration to provide high throughput syslog and MQTT ingestion is just one example.

### Selectors, Consumers and Events

Three of the most foundational components in Reactor’s reactor-core module are the `Selector`, the `Consumer`, and the `Event`. A `Consumer` can be assigned to a `Reactor` by using a `Selector`, which is a simple abstraction to provide flexibility when finding the `Consumers` to invoke for an `Event`. A range of default selectors are available. From plain Strings to regular expressions to Spring MVC-style URL templates

Here’s some example code to show how easy it is to create event-driven applications using Reactor:

```java
Copy
// This helper method is like jQuery’s.
// It creates a Selector instance so you don’t have 
// to construct one using 'new Selector("parse")'
import static reactor.Fn.$;

Reactor reactor = R.create();

// Register interest in events published to key "parse"
reactor.on($("parse"), new Consumer<Event<String>>() {
  public void call(Event<String> ev) {
    service.handleEvent(ev);
  }
});

// Send an event to this Reactor and trigger all actions 
// that match the given Selector
reactor.notify("parse", Fn.event("Hello World!"));
 
```

### To Groovy, with Love

Included in the Reactor distribution is a module called `reactor-groovy`. It includes a Groovy binding which provides an expressive syntax, compile-time checking with `@CompileStatic`, implicit transformation of `Closure`s into `Consumer`s, as well as other Groovy-specific time-savers.

```java
Copy
// Assign a Closure as a Consumer
reactor.on($('hello')) { Event<String> ev ->
  if(ev.headers['specialHeader']) { // Events can have metadata
    doSomethingWith(ev.data)
  }
}

// Use Groovy helpers for notify
reactor.notify for: 'hello', data: 'Hello World!', specialHeader: 'specialValue'
 
```

And the best part: we didn’t have to trade performance to get there. The same JVM optimizations apply to Groovy code that apply to Java code. We’re continually (some would say “obsessively”) micro-benchmarking the dispatching code to make it as fast as possible and provide both Java and Groovy users the highest possible throughput.

### Ready for Java 8 when you are

Reactor is also designed to be friendly with [Java SE 8’s lambda expressions](http://www.jcp.org/en/jsr/detail?id=335) and many components within Reactor can be replaced with lambdas to make your Java code more succinct. We've also found that using Java 8 lambdas (and method references) results in slightly higher throughput. When Java 8 goes GA, you won’t have to wait for Reactor to support it. It will Just Work (tm).

```java
Copy
// Use a POJO as an event handler
class Service {
  public <T> void handleEvent(Event<T> ev) {
    // handle the event data
  }
}

@Inject
Service service;

// Use a method reference to create a Consumer<Event<T>>
reactor.on($("parse"), service::handleEvent);

// Notify consumers of the 'parse' topic that data is ready
// by passing a Supplier<Event<T>> in the form of a lambda
reactor.notify("parse", () -> {
  slurpNextEvent()
});
 
```

### Functional, Imperative, Callback or Promise: you pick

Executor, Event Loop, Actor, Distributed--there are many shapes for one of the most important use-cases in event-driven programming: task dispatching. Reactor supports several styles of event-driven programming. In addition to the traditional callback-oriented `Consumer` interface, Reactor has an interpretation of [the Promises/A+ spec](https://github.com/promises-aplus/promises-spec) that makes working with deferred values and consumers very easy.

Nested callbacks, while straightforward and easy to use in an imperative language like Java, become hard to maintain when the complexity of the application increases. Reactor’s `Composable` and `Promise` are all about easy composition of actions. You can chain a `Composable` into a series of actions that transform values, save things to a datastore, aggregate values, or the like. And since they’re chainable, you can do all this in pure Java in a type-safe way. Here’s a quick example of using a `Composable` to easily chain a series of asynchronously-executed tasks that perform transformation and filtering on the data stream as it passes through the `Composable`:

```java
Copy
Composable<Integer> c = new Composable<>()
  .map(new Function<Integer, Integer>() {
    public Integer apply(Integer i) {
      return i % 2;
    }
  })
  .filter(new Function<Integer, Boolean>() {
    public Boolean apply(Integer i) {
      return i == 0;
    }
  })
  .consume(new Consumer<Integer>() {
    public void accept(Integer eveni) {
      // work with only even numbers here
    }
  });
 
```

Each step of the `Composable` is a potentially asynchronous task. Calls to `map`, `filter`, and `consume` assign tasks to execute when the value from the previous step is available--no callback hell required.

### Dispatching

There is no silver bullet to any dispatching concern. Reactor provides different styles of `Dispatcher`s because every asynchronous application has different dispatching needs in different parts of the application. When ingesting tidal waves of data, for example, a `Reactor` will want to use the high-speed non-blocking `Dispatcher` based on [the venerable Disruptor RingBuffer](http://github.com/lmax-exchange/disruptor). But if a `Reactor` is issuing a blocking call to a database server or storing a blob of data in S3, it will want to leverage the lower-throughput worker pool `Dispatcher`. Reactor provides several options so you can pick the right tool for the job.

If the built-in `Dispatcher` implementations don’t fit your needs, then Reactor provides a solid foundation on which you can build your own `Dispatcher` that is tailored to your problem domain.

### Grails, meet Events, Events, meet Grails

[Grails](http://www.grails.org) is a full-stack web application framework for the JVM. With its mature codebase backed by a thriving community, Grails is nonetheless facing [new architectural challenges](http://grails.io/day/2013/04/22). Events were introduced into Grails through [the platform-core plugin](http://grailsrocks.github.io/grails-platform-core/guide/events.html). But Events are so powerful that this feature really belongs in the core; so from version 2.3 on, Grails applications will have a built-in, extremely powerful yet easy to use, convention-based Events API that looks very similar to the current implementation in the platform-core plugin. This Events API will be built on a Reactor foundation.

The goal of integrating events into Grails is to target new kinds of development--especially “realtime web” and high-scale, non-blocking application development. Combined with the Asynchronous GORM features, the Events API will prove a powerful ally. Complex queries accessing Big Data stores--thus taking a long time to process--can react when their results are ready by pushing them directly to the browser.

### A passionate community is essential

We’ll be working diligently over the next several months preparing for [SpringOne](http://www.springone2gx.com/conference/santa_clara/2013/09/home), where many of our big, fast, and scalable data solutions will play first fiddle. If you haven’t made plans to attend yet, [you definitely should](https://springone2gx.com/conference/santa_clara/2013/09/register)! We’ll have [a session on Reactor](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29395) and how you can use it to create high-scale, high-throughput event-driven applications.

But we can’t do it without you! This effort will only succeed if you help us create a passionate and active community for big, fast, event-driven application development on the JVM. If you’re interested, check out [the source code on GitHub](https://github.com/reactor/reactor), see some example code in [the reactor-quickstart](https://github.com/reactor/reactor-quickstart), [report any issues you find](https://github.com/reactor/reactor/issues), ask questions about Reactor on StackOverflow [using hashtag #reactor](http://stackoverflow.com/questions/tagged/reactor), join the discussion on [the reactor-framework Google Groups email list](https://groups.google.com/forum/?fromgroups#!forum/reactor-framework), or [fork the repo](https://help.github.com/articles/fork-a-repo) to help add features, tweak things for higher throughput, and contribute new ideas.

We’d love to see you there!