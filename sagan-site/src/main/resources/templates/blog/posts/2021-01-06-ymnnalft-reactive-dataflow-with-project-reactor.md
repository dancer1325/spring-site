---
title: YMNNALFT: Reactive Dataflow with Project Reactor
source: https://spring.io/blog/2021/01/06/ymnnalft-reactive-dataflow-with-project-reactor
scraped: 2026-02-23T13:35:37.519Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  January 06, 2021 | 2 Comments
---

# YMNNALFT: Reactive Dataflow with Project Reactor

_Engineering | Josh Long |  January 06, 2021 | 2 Comments_

Welcome to another installment of *You May Not Need Another Library For That* (YMNNALFT)! I've spent a lot of time since 2016 illuminating (or trying to, anyway!) some of the more enormous opportunities in the Spring ecosystem in [my Spring Tips videos](http://bit.ly/spring-tips-playlist). Today, however, I come to you in a different spirit, wanting to focus on the little, sometimes hidden, gems that do fantastic things and that might spare you an additional third-party dependency and its implied complexity.

And it's a good thing we're covering some of these complexity-reducing gems, too, you see, because the world is a confusing, complex, and dizzying place, and nowhere is that more evident than in the world of reactive data stream composition. Life comes at you fast and data, even more so. Data originates from everything (network services, databases, in-memory computation, threaded code, etc.). Data comes in many different sizes and shapes (one record, ten records, infinite records, etc.). Data comes in different volumes, starving or overwhelming its consumers. Data arrives at different cadences and times: now, later, all at once, periodically, etc. It's much more natural to talk about data that's already in memory, in hand, so to speak, than data that hasn't yet materialized. And it's more natural to talk about data in the single-threaded case than to deal with it in the concurrent case.

![](https://media1.tenor.com/images/e6494f3096cf60a3832e0775936bf9cb/tenor.gif)

It's confusing to think about! Historically, it's been even more tedious to address the different data dimensions in code. That is, until reactive programming.

Reactive programming offers a unified world view, allowing us to think about the messy world of (potentially asynchronous and potentially concurrent) integration in terms of an easy to use DSL with operators. The operators support the definition and composition of reactive stream data flow pipelines. Reactive programming offers a structured concurrency paradigm, greatly simplifying writing safe, scalable, resource-efficient code.

There are some great libraries out there (like [RxJava](https://github.com/ReactiveX/RxJava) and [Akka Streams](https://doc.akka.io/docs/akka/current/stream/index.html)) that work in much the same way. If you haven't got a particular one in mind but want a world-class option and are already using Spring, then you might as well use [Project Reactor](http://ProjectReactor.io). It's included in the box!

The Spring team developed Project Reactor to support the reactive efforts in the Spring ecosystem. You don't need Spring to use Project Reactor, but all the reactive APIs in the Spring ecosystem build on Project Reactor for the dataflow options. Microsoft [mandates](https://azure.github.io/azure-sdk/java_introduction.html#async-service-clients) that all their SDK clients and APIs be created using [Project Reactor](https://devblogs.microsoft.com/azure-sdk/async-programming-with-project-reactor/). [Facebook](https://github.com/rsocket/rsocket-java) developed the Java client for their RSocket protocol using Project Reactor. Project Reactor is mature - it's been around since 2010! - but growing new features all the time. If you're *still* not getting what you need, it works flawlessly with other reactive data flow libraries through the interoperable [Reactive Streams](http://www.reactive-streams.org/) types.

Let's look at an example of how Project Reactor makes short work of the composition of different data flow sources and sinks and all but eliminates any manual threading code. This is a *huge* win. Remember: only one person *truly* understands how to write safe, useful, multithreaded Java code.... and it's *not* you! I don't know *who* it is. It doesn't matter. Don't tempt fate; let Project Reactor help.

You'll need the following dependencies.

-   Reactive Web on [the Spring Initializr](http://start.spring.io) - `org.springframework.boot` : `spring-boot-starter-webflux`

Now, let's look at a sample. This example demonstrates how easy it is to normalize processing given disparate kinds of data. In this example, we look at a Java 8 `java.util.Stream<T?>` and a `CompletableFuture<T>`, but the sky's the limit. In most reactive applications, you won't necessarily be in the business of converting non-reactive types to reactive types (like `Flux<T>` or `Mono<T>`). Those examples would be even more straightforward. This example assumes that you've got two data sources and need to compose them.

```java
Copypackage bootiful.rx;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.concurrent.CompletableFuture;
import java.util.stream.Stream;

@SpringBootApplication
public class BootifulApplication {

	CompletableFuture<String> returnCompletableFuture(int counter) {
		return CompletableFuture.supplyAsync(() -> {
			var start = System.currentTimeMillis();
			try {
				Thread.sleep((long) (Math.max((Math.random() * 10), 5) * 1000));
			}
			catch (InterruptedException e) {
				// threads smdh
			}
			var stop = System.currentTimeMillis();
			var delta = stop - start;
			return "(" + Thread.currentThread().getName() + ") Hello, #" + counter + "! (after " + delta + " ms.)";
		});
	}

	Stream<Integer> returnStream() {
		return Stream.iterate(0, integer -> integer + 1);
	}

	@Bean
	ApplicationListener<ApplicationReadyEvent> begin() {
		return event -> {

			Flux<String> count = Flux//
					.fromStream(this.returnStream()) //
					.take(10) //
					.flatMap(c -> Flux.zip(Mono.just(c), Mono.fromCompletionStage(this.returnCompletableFuture(c)))) //
					.map(tuple -> tuple.getT2() + " #" + tuple.getT1()); //

			count.subscribe(System.out::println);
		};
	}

	public static void main(String[] args) {
		SpringApplication.run(BootifulApplication.class, args);
	}

}
```

Do you know what else you get with Reactor? Operators supporting retries, error handling, timeouts, etc., all of which you would also farm out to yet another third-party library if they weren't included in Project Reactor. Win-win.

I could go on and on about the opportunities that present themselves given something like Project Reactor. Indeed, I *did*. Check out my book [*Reactive Spring*](http://ReactiveSpring.io) for (a lot) more.

Well? Did you have fun, and maybe learn something? As always, I'm keen on hearing from you, so [please sound off on Twitter (@starbuxman)](http://twitter.com/starbuxman) ! I'll be back with another installment of *YMNNALFT* later this week, so be sure not to miss that. I've got installments on, among other things, Easy RPC, The Garden of `*Utils` objects, Dimensional Metrics with Micrometer, and many, many more topics.