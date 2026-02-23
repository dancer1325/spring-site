---
title: Bootiful Spring Boot 3.4: Spring Integration
source: https://spring.io/blog/2024/11/24/bootiful-34-integration
scraped: 2026-02-23T08:03:23.486Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  November 24, 2024 | 0 Comments
---

# Bootiful Spring Boot 3.4: Spring Integration

_Engineering | Josh Long |  November 24, 2024 | 0 Comments_

Spring Integration 6.4 is your one-stop shop for all matters of enterprise application integration. So it supports numerous messaging and integration patterns and even more numerous adapters for all manner of technologies - SFTP, FTP, Redis, Apache Pulsar, Apache Kafka, JDBC, TCP/IP, etc. So, as you might have surmised, there’s just no way to keep up with them. The [release notes](https://docs.spring.io/spring-integration/reference/whats-new.html#whats-new-part) do a pretty good job, so I’ll list some of my favorites.

-   The remote file system inbound adapters now use the `clearFetchedCache()` method to remove references from the cache for unprocessed remote files.
-   The Spring Integration distributed lock mechanism has a method - `LockRepository#delete` - that now returns the result of removing ownership of a distributed lock.
-   similarly, the Redis-backed implementation of distributed locks - `RedisLockRegistry` - throws a `ConcurrentModificationException` if the ownership of the lock is expired.
-   there is now a convenient `Consumer<SshClient>` to allow for further customization of the internal `SshClient`
-   The outbound ZeroMQ can now bind to a TCP port instead of connecting to a URL.
-   Multiple instances of `MqttPahoMessageDrivenChannelAdapter` and `Mqttv5PahoMessageDrivenChannelAdapter` can now be added at runtime using corresponding `ClientManager` through `IntegrationFlowContext`.
-   scripting support for Python now builds on the GraalVM Truffle Polyglot implementation
-   the `AbstractMailReceiver` exposes an option to disable setting `Flags.Flag.FLAGGED`.
-   a new `BaseMessageBuilder` has been extracted from the `MessageBuilder` to simplify building your custom builder implementation, where most of the logic should be identical to that of \`MessageBuilder.
-   there’s a new `ControlBusFactoryBean` that simplifies standing up a new `ControlBus.` In addition, there’s a new Control Bus HTTP controller.

The improved control bus support is, I think, well worth looking at! The idea behind the control bus pattern is that it should be possible to control the system with the same in-band messaging infrastructure you use to send messages to the system. Control Spring Integration (and your Spring applications) with Spring Integration. Spring has a mechanism that will automatically detect and expose Spring beans annotated with `@ManagedResource` as JMX beans for operations. The ControlBus mechanism in Spring Integration takes those same beans and exports them for manipulation with messages coming to and from Spring Integration.

```java
Copypackage com.example.bootiful_34.integration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.dsl.DirectChannelSpec;
import org.springframework.integration.dsl.IntegrationFlow;
import org.springframework.integration.dsl.MessageChannels;
import org.springframework.integration.http.config.EnableControlBusController;
import org.springframework.jmx.export.annotation.ManagedOperation;
import org.springframework.jmx.export.annotation.ManagedResource;
import org.springframework.messaging.MessageChannel;

import java.util.concurrent.atomic.AtomicInteger;

@Configuration
@EnableControlBusController
class ControlBusConfiguration {

	@Bean
	IntegrationFlow controlBusFlow(MessageChannel controlBusFlowMessageChannel) {
		return IntegrationFlow.from(controlBusFlowMessageChannel).controlBusOnRegistry().get();
	}

	@Bean
	DirectChannelSpec controlBusFlowMessageChannel() {
		return MessageChannels.direct();
	}

	@Bean
	MyOperationsManagedResource myOperationsManagedResource() {
		return new MyOperationsManagedResource();
	}

	@ManagedResource
	public static class MyOperationsManagedResource {

		static final AtomicInteger COUNTER = new AtomicInteger(0);

		@ManagedOperation(description = "Update the magic number")
		public void updateMagicNumber(int magicNumber) {
			System.out.println("doSomething with magic number " + magicNumber);
			COUNTER.incrementAndGet();
		}

	}

}

```

In this example, a bean manipulates some *important* state—configuring some magic number. OK, OK, I can see why this isn’t the most tantalizing sample. But bear with me. Anyway, it provides a method—`updateMagicNumber(int)`—that we expect to be accessible via JMX and Spring Integration’s `ControlBus`. I register the bean normally, making sure to also annotate the class with `@ManagedResource`.

I define a Spring `MessageChannel` of type `DirectChannel` and then a Spring Integration `IntegrationFlow`, which routes all messages via the `DirectChannel` to the control bus in the Spring application. The control bus will then adapt and route the message to the appropriate managed resource. Let’s look at what the message needs to look like to invoke that managed resource and its method expecting a parameter.

```java
Copypackage com.example.bootiful_34.integration;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.integration.IntegrationMessageHeaderAccessor;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.support.MessageBuilder;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class ControlBusConfigurationTest {

	@Test
	void controlBusConfigurationRunner(@Autowired MessageChannel controlBusFlowMessageChannel) {
		var msg = MessageBuilder.withPayload("myOperationsManagedResource.updateMagicNumber")
			.setHeaderIfAbsent(IntegrationMessageHeaderAccessor.CONTROL_BUS_ARGUMENTS, List.of(42))
			.build();
		assertEquals(ControlBusConfiguration.MyOperationsManagedResource.COUNTER.get(), 0,
				"there should be zero invocations of the control bus thus far");
		controlBusFlowMessageChannel.send(msg);
		assertEquals(ControlBusConfiguration.MyOperationsManagedResource.COUNTER.get(), 1,
				"there should be one invocation of the control bus thus far");
	}

}
```

Straightforward enough, indeed? In this test, we inject the `DirectChannel` and craft a new `Message` whose payload is the name of the managed resource bean and the method on that managed resource, along with some data to pass into the parameters of that managed resource bean’s method. The rest of the test is just about ensuring the message was successfully delivered, and the counter has incremented to reflect the invocation.

The `ControlBus` pattern is super powerful! Remember: Spring `MessageChannel` instances are your gateway to any other system, be it via Spring Cloud Stream, Spring Framework 4’s WebSocket support, or Spring Integration’s inbound adapters. This method invocation could’ve just as quickly resulted from a file being deposited on an FTP server, a new message arriving on an Apache Kafka queue, or a TCP payload arriving on a particular part. We could’ve used Spring Security to secure the inbound message channel, rejecting messages that can’t be authenticated. This is a lot easier to do than, say, JMX directly.

And if that weren’t enough, the new `@EnableControlBusController` annotation publicly exports the `ControlBus` functionality!