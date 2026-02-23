---
title: Bootiful Spring Boot 3.4: Spring Boot
source: https://spring.io/blog/2024/11/24/bootiful-34-boot
scraped: 2026-02-23T08:04:07.101Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  November 24, 2024 | ...
---

# Bootiful Spring Boot 3.4: Spring Boot

_Engineering | Josh Long |  November 24, 2024 | ..._

And now we’re back where we started: Spring Boot 3.4! This release is what pulls everything together. When you look at Spring Boot, remember that it normalizes the integration of all the projects it assembles and tries, wherever possible, to smooth out whatever integration issues might arise from using those projects together. In addition, it provides facilities that benefit users of all those other frameworks.

Case in point: when we introduced GraalVM native image support in Spring Framework 6 and Spring Boot 3, it was delivered in three tranches. One: a component model, lifecycle, and core SPI delivered in Spring Framework. Two: this core component model allowed all the other projects that built upon Spring Framework (you know: Spring Data, Spring Security, Spring Batch, Spring Integration, etc.) to then provide the right GraalVM native image experience for their projects. Finally, Three: Spring Boot packaged up that experience into one cohesive whole, providing GraalVM integrations for itself as well as some third-party projects, providing the build tooling plugins, and generally arranging everything so that the stuff that has to happen at compile time, before your code is ever run, gets done. Spring Boot also integrates ambient things like the GraalVM reachability metadata repository and the Buildpacks support for containerizing GraalVM native images. When it’s done right, the result is something to behold, and there’s a reason that Spring Boot has taken the world by storm. It lets you focus on production, and it lets Spring be Spring. (Teamwork makes the dream work!)

And this release is no exception. There are so many awesome things in this release! Let’s do our usual [review of the new and novel in the release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.4-Release-Notes) and then dive right into some of my favorite new features (ignoring all the amazing features that are implied in the projects that the Spring Boot 3.4 release pulls in!).

-   they’ve enhanced and normalized the auto-configuration experience for the underlying `HttpRequestFactory` implementations that get plugged into either the `RestClient` or `RestTemplate.` If you have Apache HTTP Components, you’ll get a `HttpComponentsClientHttpRequestFactory`. If not, but you have Jetty, you’ll get a `JettyClientHttpRequestFactory`. If not, but you have Reactor Netty, you’ll get a `ReactorClientHttpRequestFactory`. If not, but you have more recent versions of the JDK, you’ll get `JdkClientHttpRequestFactory`. If not, and if you have nothing else, you’ll get a `SimpleClientHttpRequestFactory`, essentially just `HttpURLConnection` from the JDK. Yeck! NB: this release also inverts the defaults. Before, you would’ve gotten the `HttpURLConnection` by default, even on JVM’s, which support the `HttpClient`.
-   there’s also a new `ClientHttpRequestFactoryBuilder`, which allows you to build these implementations programmatically and consistently.
-   All these clients follow redirects by default, though you can opt-out now.
-   Applications are now shut down gracefully by default. We’ve had graceful shutdowns for *years* in Spring Boot. The basic idea is that Spring Boot will shut down immediately when a container orchestrator, platform, or operator sends the shutdown (`SIGTERM`) command to the JVM. It’ll allow any ongoing transactions to taper off for a configurable period. Then, it’ll shut down. During this window, it’ll reject new HTTP requests and so on.
-   You can now use `@AutoConfigureTestDatabase` with containers without telling test support that you don’t want to replace it.
-   This release brings more coarse-grained support to Actuator endpoint visibility.
-   This release’s baseline is HTMLUnit 4.3, which lives in a different Maven coordinate. So, update your code accordingly.
-   Support for structured logging has been introduced with built-in support for Elastic Common Schema (`ecs`), Graylog Extended Log Format (`gelf`) and Logstash (`logstash`). To enable structured file logging set `logging.structured.format.file` to `ecs`, `gelf` or `logstash`. Similarly, set `logging.structured.format.console` to enable structured console logging.
-   It’s now possible to send OTLP spans over the gRPC transport.
-   Client certificates can now be used to authenticate with a Couchbase cluster as an alternative to basic username and password authentication
-   FreeMarker variables that are used by the auto-configured FreeMarker’s Configuration object can now be customized
-   Now that ActiveMQ Classic supports an embedded broker again, the auto-configuration has been updated to support it. (Embedded ActiveMQ is back if you add `org.apache.activemq`:`activemq-broker`!)
-   there’s now a mechanism to document and signal the deprecation of auto configuration: `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.replacements`.
-   The `OtlpMeterRegistry` and Undertow both do the right thing when using virtual threads now
-   Spring Boot now uses the `paketobuildpacks/builder-jammy-java-tiny` by default. This builder supports ARM and x64 platforms out of the box.
-   Docker Compose now supports multiple Docker Compose configuration files and supports custom parameters passed to the Docker Compose command line when running Docker Compose files on startup.
-   The Spring Boot Actuator endpoints reflect more information about SSL bundles
-   Additional information about scheduled tasks is available at the `/actuator/scheduledtasks` endpoint.

So many new features! Where does one even begin? I wasn’t exactly sure, so I figured I’d look not at the code but at the runtime experience that spring boot controls, particularly at two features: GraalVM native images in build-packs on Apple silicon and graceful shutdown. Let’s look at graceful shutdown. There’s not much to understand here.

Let’s look at a particularly innocuous little class that does many things right.

```java
package com.example.bootiful_34.boot;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestClient;

@Controller
@ResponseBody
class GracefulController {

	private final RestClient http;

	GracefulController(RestClient.Builder http) {
		this.http = http.build();
	}

	@GetMapping("/delay")
	String delay() {
		return this.http.get().uri("https://httpbin.org/delay/5").retrieve().body(String.class);
	}

}

```

First, this class is using the updated auto-configured `RestClient` builder, which is new in Spring Boot 3.4. I’m running on Java 21+ (Java 23, as it happens), so I got the new `JdkClientHttpRequestFactory`, based on the awesome `java.net.http.HttpClient`. It’s already a win, and we’re just getting started!

Each request sent to his controller endpoint results in an HTTP request being made to the HTTPBin endpoint. The HTTPBin website is designed to artificially prolong the duration of the response by as many seconds as we stipulate in the HTTP request. In this case, it’s 5 seconds. That’s a long time! And remember, we’re using a servlet container, so each request requires one thread by default. So you invoke `localhost:8080/delay` (remember you might have to log in since we locked down the application with spring security earlier...), and it’ll block for five long seconds. It’ll just sit there, wasting time on a thread, of which there are precious few by default. Thankfully, this is Spring Boot, so with the flip of a config switch, we’ve enabled Java 21’s virtual threads: `spring.threads.virtual.enabled=true`.

Now, when a user makes a request, the RestClient launches a request, and as it sits there waiting for five seconds, the JVM automatically moves the request of the operating system threads into a sort of holding pattern. Why does this matter? because now somebody else is free to use that thread 8in the meantime! This results in much better, guilt-free scalability. But it’s not a new feature. You could’ve used this as sprint boot 3.2.

What is nice about this situation is that each request also takes time to complete. Five seconds plus network latency, surely. So what happens if an operator, Kubernetes or Cloud Foundry, comes along and wants to shut down the application? We’re still waiting for the request to finish! And so, too, shall the JVM. 30s, by default, you can configure it with `spring.lifecycle.timeout-per-shutdown-phase=30s`. So, if the platform shuts the application down (you can simulate it by pressing the red square in JetBrains IntelliJ IDEA), it waits up to 30 seconds to finish any in-flight requests. Then it’ll shut down. Otherwise, it’ll shut down immediately. Nice.

A nice improvement for Apple Silicon enjoyers is that the [Buildpacks](https://buildpacks.io) support has been updated to work correctly on Apple Silicon.

So, let’s turn this application itself into a GraalVM native image. Run the following at the root of the `bootiful-34` folder.

```java
./mvnw -DskipTests clean -Pnative spring-boot:build-image
```

Here’s the script I use to compile and then run it on my Apple Silicon-powered Apple M4 laptop.

```shell
#!/usr/bin/env bash

rm -rf target
./mvnw -DskipTests spring-javaformat:apply 
./mvnw -DskipTests -Pnative spring-boot:build-image 

```

Here’s the script I use to run it. This assumes you’ve got Docker or something Docker-like running locally and that you’ve got an environment variable (as I do) in your host operating system specifying an OpenAI API key named `SPRING_AI_OPENAI_API_KEY`.

```shell
#!/usr/bin/env bash

export SPRING_DATASOURCE_URL=jdbc:postgresql://host.docker.internal/mydatabase
docker run \
  -e SPRING_DATASOURCE_URL=$SPRING_DATASOURCE_URL \
  -e SPRING_AI_OPENAI_API_KEY=$SPRING_AI_OPENAI_API_KEY \
  docker.io/library/bootiful-34:0.0.1-SNAPSHOT
```

You know what blows my mind? Sometimes, at least on my machine, the Linux container with the GraalVM native image binary running on Apple Silicon runs faster than when compiled directly into a macOS native binary and runs on macOS! I have no earthly idea how! This application is the kitchen sink! We’ve got a web server, a Spring Batch `Job`, a couple of Spring Integration flows, lots of SQL `DataSource` access, Spring Modulith, Spring AI invoking functions locally, three different kinds of security *and* a full-blown OAuth IDP (Spring Authorization Server), some HTTP endpoints, some Spring Data JDBC entities, and repositories, and so much more. And so, believe me when I tell you, this isn’t a typical workload, and I was not expecting the binary to run faster on my machine under Linux. On macOS, running directly, it sometimes starts up between 0.450 and 0.5 seconds. In Docker, I’ve seen it run as quickly as 0.264 seconds. Color me confused!

The numbers are even more stark in my more typical applications-focused services. I’ve got a more trivial application in the same Github repository called `demo`. `demo` is just Spring Data JDBC talking to PostgreSQL and Spring MVC. It does nothing. The Buildpacks version of the native image starts up consistently in around 0.050 seconds, whereas the macOS native image starts up in around 0.080 seconds! It’s not quite double, but it’s not *nothing*, either! I love Buildpacks! And it’s so nice to test that everything works on my local machine now.

Spring Boot provides a solid foundation upon which some of our other projects can be built. Two projects have already been released with Spring Boot 3.4 support: Spring Modulith and Spring AI. So, I’ll cover those two here. The other one, which builds upon Spring Boot 3.4—Spring Cloud—will be along shortly.

Spring Boot 3.4 is amazing. Remember, this release is one of the last before we get to Spring Boot 4.0 next year, so when you upgrade, pay attention to any deprecations. It’s better to sort and sift those out right now!