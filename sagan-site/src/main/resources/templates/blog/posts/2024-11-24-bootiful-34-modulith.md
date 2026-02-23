---
title: Bootiful Spring Boot 3.4: Spring Modulith
source: https://spring.io/blog/2024/11/24/bootiful-34-modulith
scraped: 2026-02-23T08:03:32.381Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  November 24, 2024 | 0 Comments
---

# Bootiful Spring Boot 3.4: Spring Modulith

_Engineering | Josh Long |  November 24, 2024 | 0 Comments_

When Spring Boot first came out, I would tell people at talks that Spring Boot is like pair programming with the Spring team. It provided the convention-over-configuration to allow you to stand up infrastructure and get something going quickly. But it didn’t provide much architectural guidance. No "rails," as it were, regarding how you structured your application. And this was OK, I think, since Spring Boot isn’t a one-trick pony. You can use it for CLIs, monoliths, web applications, batch jobs, streaming and integration processors, microservices, GRPC services, Kubernetes operators, etc. Anything on the server side. It’s worked just fine. And for the most part, it’s pretty hard to tie yourself in a knot with Spring Boot. AfterA CLI, a microservice, streaming processor, and Kubernetes operator, tends to be singularly focused and, therefore, small. The trouble, I think, arises when you’re trying to scale out a monolith. Here, there are many options and not a lot of guidance.

Enter Spring Modulith, a framework designed to provide architecture guidance during development in the form of ArchUnit-backed tests and infrastructure at runtime to support the clean decomposition of modules we crave. If you write your code using Spring Modulith, it would be very hard to end up with a codebase that isn’t well structured and doesn’t lend itself to scaling the code and the team working on it. If any framework could be said to keep you "on rails," I think this one would be it!

There are too many amazing new features in Spring Modulith, and I couldn’t hope to look at them all, but in brief:

-   Support for nested application modules and external application module contributions.
-   Optimized integration test execution via a JUnit Jupiter extension.
-   New deleting and archiving event publication completion modes.
-   By-ID event publication completion significantly improves performance.
-   Support for MariaDB, Oracle DB, and Microsoft SQL Server in the JDBC-based Event Publication Registry.
-   Event externalization into Spring’s MessageChannel abstraction to, for example, trigger Spring Integration flows.
-   Automatic Javadoc extraction for inclusion in the generated Application Module Canvases.
-   An aggregating document for all documentation generated.

I wanted to look at one of my favorite new features in this release: the ability to externalize events by publishing them to a Spring Integration `Messagechannel`. Full disclosure: I’m indulging in self-dealing because I helped contribute to this feature. But at least you know Im not lying: it is one of my favorite features :D

The idea is that in Spring Modulith, you have some conventions that define "modules," which are, in effect, just root packages adjacent to the Spring Boot application class. So, given an application package of `a.b.c`, then `a.b.c.foo` would be the `foo` module, and `a.b.c.bar` would be the `bar` package. So far, so good?

The goal is to reduce the impact of change. Make a change in one place, and your change shouldn’t ripple across the codebase like a fly in a spider’s web. We do this by letting the language’s privacy modifiers serve us and, when that’s not enough, by writing tests.

```java
Copypackage com.example.bootiful_34;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.modulith.core.ApplicationModules;
import org.springframework.modulith.docs.Documenter;

@SpringBootTest
class Bootiful34ApplicationTests {

	@Test
	void contextLoads() {
		var am = ApplicationModules.of(Bootiful34Application.class);
		am.verify();

		System.out.println(am);

		new Documenter(am).writeDocumentation();
	}

}

```

Run this test to confirm that we don’t have tangles and are not leaking things from one module’s module-private implementation packages to another. (It’ll also print out the logical structure of our modules on the CLI and then even generate some PlantUML diagrams representing the state of the architecture and dump them into `target/spring-modulith-docs`, but that’s neither here nor there...)

When I ran the test, I got the following output:

```shell
Copy2024-11-24T21:16:07.341-08:00  INFO 46642 --- [bootiful-34] [           main] com.tngtech.archunit.core.PluginLoader   : Detected Java version 23.0.1
# Ai
> Logical name: ai
> Base package: com.example.bootiful_34.ai
> Excluded packages: none
> Direct module dependencies: none
> Spring beans:
o ….AiConfiguration
o org.springframework.ai.chat.client.ChatClient
o org.springframework.ai.model.function.FunctionCallback

# Batch
> Logical name: batch
> Base package: com.example.bootiful_34.batch
> Excluded packages: none
> Direct module dependencies: none
> Spring beans:
o ….BatchConfiguration
o ….StepOneConfiguration
o ….StepTwoConfiguration
o org.springframework.batch.core.Job
o org.springframework.batch.core.Step
o org.springframework.batch.item.ItemWriter
o org.springframework.batch.item.database.JdbcCursorItemReader
o org.springframework.batch.item.file.FlatFileItemReader
o org.springframework.batch.item.queue.BlockingQueueItemReader
o org.springframework.batch.item.queue.BlockingQueueItemWriter
o org.springframework.batch.item.support.CompositeItemReader

# Boot
> Logical name: boot
> Base package: com.example.bootiful_34.boot
> Excluded packages: none
> Direct module dependencies: none
> Spring beans:
o ….GracefulController

# Data
> Logical name: data
> Base package: com.example.bootiful_34.data
> Excluded packages: none
> Direct module dependencies: none
> Spring beans:
o ….CustomerRepository
o ….LocaleEvaluationContextExtension

# Framework
> Logical name: framework
> Base package: com.example.bootiful_34.framework
> Excluded packages: none
> Direct module dependencies: none
> Spring beans:
o ….DefaultNoOpMessageProvider
o ….FallbackDemoConfiguration
o ….SimpleMessageProvider
o ….SophisticatedMessageProvider
o org.springframework.boot.ApplicationRunner

# Integration
> Logical name: integration
> Base package: com.example.bootiful_34.integration
> Excluded packages: none
> Direct module dependencies: none
> Spring beans:
o ….ControlBusConfiguration
+ ….ControlBusConfiguration$MyOperationsManagedResource
o org.springframework.integration.dsl.DirectChannelSpec
o org.springframework.integration.dsl.IntegrationFlow

# Modulith
> Logical name: modulith
> Base package: com.example.bootiful_34.modulith
> Excluded packages: none
> Direct module dependencies: none
> Spring beans:
o ….ChannelsConfiguration
o ….consumer.ConsumerConfiguration
o ….producer.MessagePublishingApplicationRunner
o org.springframework.integration.dsl.DirectChannelSpec
o org.springframework.integration.dsl.IntegrationFlow

# Security
> Logical name: security
> Base package: com.example.bootiful_34.security
> Excluded packages: none
> Direct module dependencies: none
> Spring beans:
o ….SecuredController
o ….SecurityConfiguration
o org.springframework.security.core.userdetails.UserDetailsService
o org.springframework.security.web.SecurityFilterChain

# Testing
> Logical name: testing
> Base package: com.example.bootiful_34.testing
> Excluded packages: none
> Direct module dependencies: framework
> Spring beans:
o ….GreetingsController

```

Nice! Types in one module can reference and inject types from another module (but not from another module’s nested packages because those are considered module-private implementation details). This works, but remember, every time you export an interface to another module and make it public, you need to maintain it. For my money, I try to use eventing whenever possible to handle integration. Messaging and integration are sort of my jam. It’s good for the architecture and good for the soul. There are many patterns, all of which hinge on the humble message. Check out this blog by Martin Fowler from 2017 called [*what do you mean by event-driven?*](https://martinfowler.com/articles/201701-event-driven.html) It looks at the various uses of messaging and integration in systems and services, and all of it starts with the humble event or message. Spring has an event publisher, and it’s been in Spring since Spring Framework 1.1 in the early 2000’s!

Here’s our event:

```java
Copypackage com.example.bootiful_34.modulith;

import org.springframework.modulith.events.Externalized;

import java.time.Instant;

@Externalized("events")
public record CrossModuleEvent(Instant instant) {
}

```

And here’s the product of the event:

```java
Copypackage com.example.bootiful_34.modulith.producer;

import com.example.bootiful_34.modulith.CrossModuleEvent;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
class MessagePublishingApplicationRunner {

	private final ApplicationEventPublisher publisher;

	MessagePublishingApplicationRunner(ApplicationEventPublisher publisher) {
		this.publisher = publisher;
	}

	@Scheduled(initialDelay = 1, timeUnit = TimeUnit.SECONDS)
	public void run() {
		this.publisher.publishEvent(new CrossModuleEvent(Instant.now()));
	}

}
```

And here’s the consumer of the event:

```java
Copypackage com.example.bootiful_34.modulith.consumer;

import com.example.bootiful_34.modulith.CrossModuleEvent;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;

@Configuration
class ConsumerConfiguration {

	@EventListener
	void consume(CrossModuleEvent crossModuleEvent) {
		System.out.println("got the event " + crossModuleEvent);
	}

}

```

Isn’t that nice?

You can publish events using this event publisher, and they’re dispatched synchronously to another bean in the application context. However, there are some issues with using this in a scalable way. First, they’re dispatched synchronously, so you’d need to annotate them with Spring’s `@Async` to invoke them in another thread. Second, once you’ve done that, you’re no longer in the same thread as the producer, which means you’re not in the same transaction. If you wanted that, there’s no easy way to get the same transactionality black. Still, you can ensure that at least if the message is, for whatever reason, dropped or lost (power went out, the database doesn’t connect, whatever), it gets logged and reconciled later. this is called *the outtbox pattern*. It’s trivial to set up with Spring Modulith! Add the following two properties to your property file:

```properties
Copyspring.modulith.events.republish-outstanding-events-on-restart=true
spring.modulith.events.jdbc.schema-initialization.enabled=true
```

When Spring Modulith starts up, it installs a table, `event_publications,` which tracks the event dispatches and whether they are complete or not. If you restart the service and Spring Modulith sees that some of the events were never completed, it’ll run again! Huzzah.

But what if I also want to publish those events for other microservices and systems? Easy! Just set up the distribution fabric of your choice - Spring for Apache Kafka, Spring AMQP, etc., and then `@Externalized` to the event you’re publishing. The `@Externalized` annotation uses a schema to tell Spring Modulith how to route this event externally. For Apache Kafka, you’d specify just the string name of the topic in your Apache Kafka broker. For RabbitMQ, with its destinations and routing-keys, you’d specify `destination::routing-key`. Now, the event will get dispatched to other modules in the same code base *and* to other systems and services connected in this way. But what if you want to distribute the message but are not using Kafka or RabbgitMQ? (why not?) well, fear not, for in Spring Modulith 1.3, there’s new support for publishing messages into a Spring Integ5ration `MessageChannel`! Once there, as you know, you can use Spring Integration to send it anywhere! To Kafka or RabbitMQ, sure, but also out via TCP/IP, Apache Pulsar, FTP servers, local file systems, other SQL Databases, NoSQL Databases, and a million other destinations. That’s the point. "Integration experts love this one weird trick...!"

Make sure you have the `MessageChannel` define:

```java
Copypackage com.example.bootiful_34.modulith;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.dsl.DirectChannelSpec;
import org.springframework.integration.dsl.MessageChannels;

@Configuration
class ChannelsConfiguration {

	@Bean
	DirectChannelSpec events() {
		return MessageChannels.direct();
	}

}

```

And now recall that the event has an `@Externalized` annotation on it:

```java
Copypackage com.example.bootiful_34.modulith;

import org.springframework.modulith.events.Externalized;

import java.time.Instant;

@Externalized("events")
public record CrossModuleEvent(Instant instant) {
}

```

That’s the name of the channel specified there.

So, all we have to do is set up a Spring Integration `IntegrtationFDlow` that consumes messages from that channel.

```java
Copypackage com.example.bootiful_34.modulith.consumer;

import com.example.bootiful_34.modulith.CrossModuleEvent;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.core.GenericHandler;
import org.springframework.integration.dsl.IntegrationFlow;
import org.springframework.integration.file.dsl.Files;
import org.springframework.messaging.MessageChannel;

import java.io.File;

@Configuration
class IntegrationConsumerConfiguration {

	@Bean
	IntegrationFlow integrationFlow(@Value("file:${user.home}/Desktop/outbound") File destination,
			@Qualifier("events") MessageChannel incoming) {
		var destinationFolder = Files.outboundAdapter(destination).autoCreateDirectory(true);
		return IntegrationFlow.from(incoming)
			.handle((GenericHandler<CrossModuleEvent>) (payload, headers) -> payload.instant().toString())
			.handle(destinationFolder)
			.get();
	}

}

```

This is admittedly a pretty silly example insofar as all it does is take the incoming event being dispatched by Spring Modulith into this channel and then write the message out to the file system in a folder called `outbound` on the user’s `~/Desktop`. But it gets the point across.

Decoupling is always a win.