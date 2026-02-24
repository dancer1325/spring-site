---
title: Reactor 1.0.0.M2 – a foundation for reactive fast-data applications on the JVM
source: https://spring.io/blog/2013/08/27/reactor-1-0-0-m2-a-foundation-for-reactive-fast-data-applications-on-the-jvm
scraped: 2026-02-24T07:59:18.950Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Jon Brisbin |  August 27, 2013 | 0 Comments
---

# Reactor 1.0.0.M2 – a foundation for reactive fast-data applications on the JVM

_Engineering | Jon Brisbin |  August 27, 2013 | 0 Comments_

I'm excited to announce the 2nd milestone release of [Reactor](https://github.com/reactor/reactor) on our way toward 1.0! Maven artifacts for Reactor 1.0.0.M2 are available in the usual milestone repository.

### What is Reactor?

Reactor is a foundational framework for building high-throughput, asynchronous, reactive applications on the JVM. It provides Selector-style topic matching for event routing, dynamic Consumer assignment, an uber-fast task processor, and reactive Stream and Promise APIs for working with data asynchronously and coordinating asynchronous tasks. It comes with comprehensive Groovy language support by providing langauge extensions to make writing Reactor applications in Groovy pretty darned Groovy! It also has easy-to-use Spring support that automagically wires annotated POJOs to Reactors.

### What's in this Release?

This 2nd milestone includes a number of bugfixes and some really exciting new features. Reactor now includes a `Processor` abstraction, which is a highly-optimized task processor based on the [LMAX Disruptor](https://github.com/LMAX-Exchange/disruptor) RingBuffer. It uses the common abstractions from Reactor to configure a RingBuffer and allows you to use Reactor's common API instead of the Disruptor-specific API. It also by design skips the Selector matching and dynamic Consumer assignment provided by a Reactor in order to wring every last drop of throughput it can. Anecdotal benchmarks on a MacBook Pro show the Processor can pump around 100,000,000 events per second through the pipeline. Yes, you read that right: 100 **million** per second!

1.0.0.M2 also includes a small, but significant new feature in the Reactor API which optimizes event publishing in a Reactor to get about 30-50% higher throughput. It won't suit every situation since it prepares an optimized list of Consumers from the Reactor, but for an **extra** 10 million events per second in throughput, it's a great new feature.

### Optimized Publish

One of the powerful aspects of Reactor is the Selector matching topic(ish) pub/sub. It allows you to easily assign handlers to events using topics, anonymous objects, assignable type hierarchies, URI path matching, or regular expressions (or any other type of Selector matching if you implement your own, domain-specific Selectors). But many applications can assign their handlers at startup, which means the path to those Consumers can be optimized for efficient event publication. The new Reactor method `prepare(Object)` allows you to pre-select the Consumers for a key. It returns a Consumer itself that event publishers can use to efficiently notify about new events.

```java
Copy// Create Environment in which Reactors operate
Environment env = new Environment();
Reactor reactor = Reactors.reactor().env(env).get();

reactor.on($("say.hello"), new Consumer<Event<String>>() {
	public void accept(Event<String> ev) {
		System.out.println("Hello " + ev.getData() + "!");
	}
});

Consumer<Event<String>> sayHello = reactor.prepare("say.hello");
for(String name : listOfNames) {
	sayHello.accept(name);
}
```

### RingBuffer Task Processor

Reactor 1.0.0.M2 includes the `Processor` abstraction. It is a simple task processor backed by the [LMAX Disruptor](https://github.com/LMAX-Exchange/disruptor) RingBuffer and is designed to integrate it seamlessly into the reactive APIs used in Reactor, so it uses common abstractions like Supplier and Consumer. A fully-configured Processor can be created in a single expression and using Java 8 lambdas is more succinct yet:

```java
CopyProcessor<Message> proc = new ProcessorSpec<Message>()
	.dataSupplier({ return new Message(); })
	.consume({ msg -> // handle the updated Message object })
	.get();
```

The `Processor` provides two ways to interact with the underlying RingBuffer. The single-operation mode works by requesting an `Operation` object from the `Processor` by calling the `prepare()` method. The `Operation` has a `get()` method on it to access the pre-allocated event object that the RingBuffer was filled with when it was created. The members of this object can be updated with new data. When ready to publish the operation and trigger the event handler, just call the Operation's `commit()` method.

```java
Copypublic class Message {
	int type;
	Buffer buffer;
}

@Autowired
Processor<Message> proc;

public void handle(Buffer buff) {
	Operation<Message> op = proc.prepare();

	op.get().type = buff.readInt();
	op.get().buffer = buff;

	op.commit();
}
```

If you can operate on batches of data, then the `Processor` provides a `batch(int, Consumer)` method which allows you to specify a batch size and pass a mutator in the form of a `Consumer` whose job it is to update the data for each event. If the batch size is larger than the size of the underlying RingBuffer, the batch will be flushed implicitly, otherwise the publish step will be delayed until the batch size has been reached. This generally increases throughput and efficiency.

```java
Copypublic class Message {
	int type;
	Buffer buffer;
}

@Autowired
Processor<Message> proc;

public void handle(List<Buffer> buffs) {

	proc.batch(buffs.size(), new Consumer<Message>() {
		ListIterator<Buffer> it = buffs.listIterator();

		public void accept(Message msg) {
			Buffer next = it.next();

			msg.type = next.readInt();
			msg.buffer = next;
		}
	});

}
```

### SpringOne2GX

Reactor will be featured prominently at this year's [SpringOne2GX conference](http://www.springone2gx.com/conference/santa_clara/2013/09/home), which is less than two weeks away. There will be [a full session on it lead by Stephane Maldini and Jon Brisbin](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29395) and almost non-stop water cooler discussion on how this technology can change the way you build applications. There's still time to [register](http://www.springone2gx.com/conference/santa_clara/2013/09/register) and book a room. But hurry!

### Resources

GitHub: (source, issue tracker) [https://github.com/reactor/reactor/](https://github.com/reactor/reactor/)  
Wiki: [https://github.com/reactor/reactor/wiki](https://github.com/reactor/reactor/wiki)  
API docs: [http://reactor.github.io/docs/api/](http://reactor.github.io/docs/api/)

### Maven artifacts

```groovy
Copyext {
	reactorVersion = '1.0.0.M2'
}

repositories {
	mavenCentral()
	maven { url 'http://repo.springsource.org/libs-release' }
	maven { url 'http://repo.springsource.org/libs-milestone' }
}

dependencies {
	// Reactor core
	compile "org.projectreactor:reactor-core:$reactorVersion"

	// Reactor Groovy support
	compile "org.projectreactor:reactor-groovy:$reactorVersion"

	// Reactor TCP client/server
	compile "org.projectreactor:reactor-tcp:$reactorVersion"

	// Reactor Spring support
	compile "org.projectreactor:reactor-spring:$reactorVersion"
}
```