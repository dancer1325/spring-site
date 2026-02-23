---
title: 1 Stream, 2 Applications, and 3 Dependencies for Spring Cloud Data Flow
source: https://spring.io/blog/2016/04/05/1-stream-2-applications-and-3-dependencies-for-spring-cloud-data-flow
scraped: 2026-02-23T19:20:29.107Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  April 05, 2016 | 3 Comments
---

# 1 Stream, 2 Applications, and 3 Dependencies for Spring Cloud Data Flow

_Engineering | Josh Long |  April 05, 2016 | 3 Comments_

I just wanted to register here an experience that made me smile yesterday: making the rapidly improving [Spring Cloud Data Flow](http://cloud.spring.io/spring-cloud-dataflow/) wiggle from (Spring Boot) start(-ers) to service in a matter of minutes!

> The only pre-requisite is that you have a Redis instance runnning. My Redis instance is running on `127.0.0.1` and it required no further configuration for Spring Boot to find and work with it.

We'll use the epic [Spring Initializr](http://start.spring.io) to make short work of generating our applications. Remember those silly Apple commercials, "There's an App For That?" Nevermind that, *there's a **checkbox** for that!* Let's see if you like the experience as much as I did!

## [](#a-local-data-flow-server)A Local Data Flow Server

Go to the [Spring Initializr](http://start.spring.io/) and select `Local Data Flow Server` and name the artifact `df-server`. This will be used to standup a local Data Flow service - a REST API and some persistence logic - to orchestrate and store information about streams and tasks. In the old Spring XD world, this was called the Spring XD *Admin Server*.

![](https://raw.githubusercontent.com/joshlong/meh/master/df-123/initializr-df-server.png)

Open the project in your IDE of choice and add `@EnableDataFlowServer` to the `DfServerApplication` class:

```java
Copypackage com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.dataflow.server.EnableDataFlowServer;

@EnableDataFlowServer
@SpringBootApplication
public class DfServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(DfServerApplication.class, args);
	}
}
```

Run `mvn spring-boot:run` in the root of the `df-server` project and the application will spin up on port `9393`.

**TIP**: You'll know you're (probably) home-free when you see the welcome ASCII artwork!

![](https://raw.githubusercontent.com/joshlong/meh/master/df-123/df-ascii.png)

**TIP about the TIP**: so, that's probably not true. It might fail for all sorts of reasons (like conflicting ports for the service or for the embedded H2 database), but quality ASCII artwork has been shown to be therapeutic in (my) study.. (of.. me).

## [](#a-data-flow-shell)A Data Flow Shell

Go to the Spring Initializr and select `Data Flow Shell` and named the artifact `df-shell`. This will be used to standup a Data Flow shell powered by Spring Shell.

![](https://raw.githubusercontent.com/joshlong/meh/master/df-123/initializr-df-shell.png)

The Data Flow shell runs on any operating system. It's a client for the Data Flow service we've just stood up. It let's us operate the service using a familiar pipes-and-filters DSL and commands. I love good banner ASCII artwork as much as the next developer, there *is* (gulp!) such a thing as too much of a good thing. By default, *both* Spring Shell *and* Spring Boot will both try to emit an ASCII banner, so we'll Spring Boot to keep out of this (this time!). Open the project in your IDE of choice and add `@EnableDataFlowShell` to the `DfShellApplication` class and then configure how the `SpringApplication` is created to hide the Spring Boot banner:

```java
Copypackage com.example;

import org.springframework.boot.Banner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.cloud.dataflow.shell.EnableDataFlowShell;

@EnableDataFlowShell
@SpringBootApplication
public class DfShellApplication {

	public static void main(String[] args) {
		new SpringApplicationBuilder(DfShellApplication.class)
				.bannerMode(Banner.Mode.OFF)
				.run(args);
	}
}
```

Run `mvn spring-boot:run` in the root of the `df-shell` project. You should be able to interact with the Data Flow server, running locally, by default. Try it out by issuing the `module list` command. You should see a table of all the in-built components that Spring Cloud Data Flow already knows about.

![](https://raw.githubusercontent.com/joshlong/meh/master/df-123/df-shell-module-list.png)

## [](#a-logging-sink-module)A Logging Sink Module

Go to the Spring Initializr and select `Stream Redis` and name the artifact `logging-sink`. We're going to use Spring Cloud Stream, which builds atop Spring's `MessageChannel` abstraction and the component model in Spring Integration to make concise the work of describing and integrating messaging-based microservices, to build a *custom* module that logs incoming messages. We'll then deploy and orchestrate this module with Spring Cloud Data Flow.

![](https://raw.githubusercontent.com/joshlong/meh/master/df-123/initializr-logging-sink.png)

Spring Cloud Data Flow is a powerful way to describe complex integration, batch and stream processing workloads in terms of small Spring Boot-powered modules. There are several types of `module`s. A `source` produces data, often on a fixed schedule, that downstream components may consume and process. A `processor` takes data in, does something with it, and writes data out. A `sink` merely takes data in but does not produce anything to be sent out. These components compose nicely together to describe any kind of potentially ceasless workload (internet-of-things sensor data, 24/7 event processing, online transaction data ingest and integration scenarios, etc.) Ultimately, a source is *usually* a Spring Integration inbound adapter. A processor is *usually* any kind of Spring Integration component (like a transformer) that takes data in and produces data out. A sink is *usually* a Spring Integration outbound adapter.

A `task` describes any workload that will, ultimately, stop. It might be a simple Spring Boot `Command Line Runner` or a Spring Batch `Job`.

Spring Cloud Data Flow doesn't have particular knowledge of Spring Integration, though. It just knows about Spring Cloud Stream and well-known Spring `MessageChannels` like `input` and `output`. It doesn't care what is on the terminuses of those channels. Spring Cloud Data Flow doesn't have particularly knowledge of Spring Batch, either. It just knows about Spring Cloud Task.

In the way that the UNIX `sh` shell environment lets us compose arbitrary many and arbitrarily sophisticated solutions from singly-focused command-line utilities by passing data to and from `stdin` and `stdout`, respectively, so too does Spring Cloud Data Flow let us compose arbitrary many and arbitrarily sophisticated solutions from singly-focused messaging components.

Spring Cloud Data Flow has lots of *batteries included* already. We're going to develop and install a simple module to log things - in our case, the time. It's worth noting that we're going to do this for our own edification, but we don't *need* to do this; Spring Cloud Data Flow already provides a `log` module! (and a `time` module!)

```java
Copypackage com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.messaging.Sink;
import org.springframework.integration.annotation.MessageEndpoint;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.messaging.handler.annotation.Headers;
import org.springframework.messaging.handler.annotation.Payload;

import java.util.Map;

@EnableBinding(Sink.class)
@SpringBootApplication
public class LoggingSinkApplication {

	@MessageEndpoint
	public static class LoggingMessageEndpoint {

		@ServiceActivator(inputChannel = Sink.INPUT)
		public void logIncomingMessages(
				@Payload String msg,
				@Headers Map<String, Object> headers) {

			System.out.println(msg);
			headers.entrySet().forEach(e ->
					System.out.println(e.getKey() + '=' + e.getValue()));

		}
	}

	public static void main(String[] args) {
		SpringApplication.run(LoggingSinkApplication.class, args);
	}
}
```

This is a simple Spring Cloud Stream binding. The `Sink.class` is an interface that defines a `MessageChannel input()`. Spring Cloud Stream will turn that into a live, named conduit to a message broker (in this case, Redis, though the default for Spring Cloud Data Flow will likely change to RabbitMQ in coming months) that any of our messaging code can work with. The example uses Spring Integration to print incoming message data out on arrival. Let's first register our custom module with Data Flow and then compose a stream that takes incoming messages containing the time from a `time` component and then logs the results.

First, `mvn clean install` the `logging-sink` project so that it's resolvable in the local Maven repository. Spring Cloud Data Flow uses a pluggable strategy to resolve instances of custom modules. In our example, it'll try to resolve them in our system local Maven repository.

Return to the Data Flow Shell and enter the following:

```shell
Copydataflow:>module register --name custom-log --type sink --uri maven://com.example:logging-sink:jar:0.0.1-SNAPSHOT
Successfully registered module 'sink:custom-log'

dataflow:>module list
╔══════════════╤════════════════╤═══════════════════╤═════════╗
║    source    │   processor    │       sink        │  task   ║
╠══════════════╪════════════════╪═══════════════════╪═════════╣
║file          │bridge          │aggregate-counter  │timestamp║
║ftp           │filter          │cassandra          │         ║
║http          │groovy-filter   │counter            │         ║
║jdbc          │groovy-transform│custom-log         │         ║
║jms           │httpclient      │field-value-counter│         ║
║load-generator│pmml            │file               │         ║
║rabbit        │splitter        │ftp                │         ║
║sftp          │transform       │gemfire            │         ║
║tcp           │                │gpfdist            │         ║
║time          │                │hdfs               │         ║
║trigger       │                │jdbc               │         ║
║twitterstream │                │log                │         ║
║              │                │rabbit             │         ║
║              │                │redis              │         ║
║              │                │router             │         ║
║              │                │tcp                │         ║
║              │                │throughput         │         ║
║              │                │websocket          │         ║
╚══════════════╧════════════════╧═══════════════════╧═════════╝

dataflow:>stream create --name time-to-log --definition 'time | custom-log'
Created new stream 'time-to-log'

dataflow:>stream list
╔═══════════╤═════════════════╤══════════╗
║Stream Name│Stream Definition│  Status  ║
╠═══════════╪═════════════════╪══════════╣
║time-to-log│time | custom-log│undeployed║
╚═══════════╧═════════════════╧══════════╝

dataflow:>stream deploy --name time-to-log
Deployed stream 'time-to-log'
```

You'll see in the Data Flow service logs that the modules have been started and stitched together. In my particular logs I observed:

```
Copy2016-04-05 09:09:18.067  INFO 58339 --- [nio-9393-exec-3] o.s.c.d.spi.local.LocalAppDeployer       : deploying app time-to-log.custom-log instance 0
   Logs will be in /var/folders/cr/grkckb753fld3lbmt386jp740000gn/T/spring-cloud-dataflow-2481763302070183542/time-to-log-1459861757641/time-to-log.custom-log
2016-04-05 09:09:30.838  INFO 58339 --- [nio-9393-exec-3] o.s.c.d.spi.local.LocalAppDeployer       : deploying app time-to-log.time instance 0
   Logs will be in /var/folders/cr/grkckb753fld3lbmt386jp740000gn/T/spring-cloud-dataflow-2481763302070183542/time-to-log-1459861757641/time-to-log.time

```

Tail the logs to confirm what you already know in your heart of hearts: our custom `logging-sink` is working!

```
Copytail -f /var/folders/cr/grkckb753fld3lbmt386jp740000gn/T/spring-cloud-dataflow-2481763302070183542/time-to-log-1459861757641/time-to-log.custom-log/std*
```

## [](#next-steps)Next Steps

To the cloud! We're using the Local Data Flow Server. There are other implementations available for processing fabrics like Cloud Foundry. The Cloud Foundry Data Flow Server spins up application instances instead of local Java processes. Now, building a scalable data ingest and processing stream is as easy as `cf push ..` and `cf scale -i $MOAR`!

We're using but a few of Spring Cloud Data Flow's capabilities! Use Spring Cloud Data Flow to orchestrate any number of messaging-based microservices powered by Spring Cloud Stream. I'd recommend a look at some of [the built-in Spring Cloud Stream modules](https://github.com/spring-cloud/spring-cloud-stream-modules) for inspiration.