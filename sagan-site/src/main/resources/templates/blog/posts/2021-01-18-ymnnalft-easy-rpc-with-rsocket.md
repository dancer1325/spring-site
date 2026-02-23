---
title: YMNNALFT: Easy RPC with RSocket
source: https://spring.io/blog/2021/01/18/ymnnalft-easy-rpc-with-rsocket
scraped: 2026-02-23T13:34:34.532Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  January 18, 2021 | 2 Comments
---

# YMNNALFT: Easy RPC with RSocket

_Engineering | Josh Long |  January 18, 2021 | 2 Comments_

Welcome to another installment of *You May Not Need Another Library For That* (YMNNALFT)! I've spent a lot of time since 2016 illuminating (or trying to, anyway!) some of the more enormous opportunities in the Spring ecosystem in [my Spring Tips videos](http://bit.ly/spring-tips-playlist). Today, however, I come to you in a different spirit, wanting to focus on the little, sometimes hidden, gems that do fantastic things and that might spare you an additional third-party dependency and its implied complexity.

Integrating two services separated by a common, potentially volatile, and overwhelmed network is one of the most challenging computer science problems.

Quick aside: the most challenging problem in computer science is, of course, vertical layouts in CSS.

![](https://blog.appstudio.dev/wp-content/uploads/2018/12/css.gif)

You could write a whole book about the different ways to integrate disparate systems and services. But, [Gregor Hohpe](https://twitter.com/ghohpe) and [Bobby Woolf](https://twitter.com/bobby_woolf) already did just that with their [*Enterprise Integration Patterns*](https://www.amazon.com/Enterprise-Integration-Patterns-Designing-Deploying/dp/0321200683) book, so I'll use one of their lists.

*Messaging* is where a producer sends a message (with an enveloper and a payload) to a reliable, intermediary broker. That broker acts as the delivery service for messages between the producer and the consumer.

*RPC*, or Remote Proxy Calls.., not that's not it. Risky Procedure Calls? No... Relatively Painless Calamities? No... Remote Procedure Calls! That's the stuff. RPC is where a consumer invokes methods (through some sort of network protocol like SOAP-RPC, Hessian, Burlap, Spring's own HTTP Invoker, XML RPC, EJBs, RMI, DCOM, CORBA, etc.) on remote objects. The experience is meant to feel like invoking methods on a local object in the same virtual machine.

*File Transfer* is where a producer transmits a file to a shared, agreed-upon (network) file system, and the consumer consumes messages deposited there. This is the basis of so many batch processes today. If you haven't, you should check out Spring Batch. 9/10 dentists agree: Spring Batch keeps teeth clean and integration processes lean.

*Shared databases* is where a producer and a consumer read data from the same table (not recommended). Indeed, this one is a bit of an antipattern at this point, particularly in the context of microservices.

There's definitely a discussion to be had around RPC's merits versus messaging as a way to reliably integrate a producer and a consumer, but *this* is not that discussion because I think I've found the best compromise: reactive, payload-agnostic, lightning-quick, observable, RSocket. [RSocket](http://RSocket.io) is a binary protocol initially developed by engineers at Netflix who left and continued their work at Facebook. The protocol is built for scale *and* speed and circumvents many of the limitations of HTTP 1-2 and gRPC. It is an endlessly exciting protocol for a ton of reasons:

-   it supports proper bidirectional communication
-   it supports many different message exchange patterns beyond mere request/response
-   it supports metadata to propagate out-of-band-information like tokens
-   it reifies the Reactive Streams specification concepts at the network protocol level (backpressure! On the wire! Huzzah!)
-   It has a cool `.io` domain, which everybody knows is critical to the success of technologies destined for the cloud

It's a message envelope-centric protocol, but it is trivial to use, and it's even more trivial to live that RPC-life if you want to.

There are numerous clients available for various languages, including Java. The Java client is built on top of [Project Reactor](http://ProjectReactor.io). It would've been *trivial* - *TRIVIAL! I say* - to integrate RSocket into a Spring application even if there were no native support in Spring itself. But there *is* native support in Spring itself, and it's incredible. The integration uses the same component model as the original WebSocket support from Spring Framework 4 uses.

Let's look at a simple example service.

You'll need the following dependencies.

-   RSocket on [the Spring Initializr](http://start.spring.io) - `org.springframework.boot` : `spring-boot-starter-rsocket`

Here's the code:

```java
Copypackage bootiful.rpc.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

import java.util.Locale;

@SpringBootApplication
public class BootifulApplication {

	public static void main(String[] args) {
		System.setProperty("spring.profiles.active", "rpcserver");
		SpringApplication.run(BootifulApplication.class, args);
	}

}

@Controller
class GreetingsController {

	@MessageMapping("greetings.{lang}")
	String greet(@DestinationVariable("lang") Locale lang, @Payload String name) {
		System.out.println("locale: " + lang.getLanguage());
		return "Hello, " + name + "!";
	}

}
```

Here's what I put into my `application.properties`:

```properties
Copyspring.rsocket.server.port=8888
spring.main.web-application-type=none
```

A controller is an object with methods, like RPC, but the client isn't strictly speaking obliged to wait for a response. It can background the thread or disconnect entirely. Win-win. The protocol is more envelope-and-payload-centric behind the scenes than the component model lets on, so we get the best of both worlds.

Our service is up and running. If you want to invoke it, you can use [the handy-dandy `rsc` CLI](https://github.com/making/rsc).

```shell
Copyrsc tcp://localhost:8888  -r greetings.en -d 'Josh' 
```

You should get output like this:

```shell
CopyHello, Josh!
```

That might be enough, but most of us will want to talk to our RSocket services from our client code. There are clients from several different programming languages, including, but not limited to, JavaScript, Go, .NET (C#), Rust, C++, Ruby, Python, and more. (and, worst case, you can always wrap the C++ or Java ports, right?)

Let's look at building a client to talk to the newly-minted services. We'll use the `RSocketRequester`, a client that we can use to speak to an RSocket endpoint.

You'll need the following dependency:

-   RSocket on [the Spring Initializr](http://start.spring.io) - `org.springframework.boot` : `spring-boot-starter-rsocket`

Here's the code:

```java
Copypackage bootiful.rpc.client;

import lombok.SneakyThrows;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.messaging.rsocket.RSocketRequester;

import java.util.Locale;

@SpringBootApplication
public class BootifulApplication {

	@SneakyThrows
	public static void main(String[] args) {
		System.setProperty("spring.profiles.active", "rpcclient");
		SpringApplication.run(BootifulApplication.class, args);
		Thread.sleep(5_000);
	}

	@Bean
	RSocketRequester rSocketRequester(RSocketRequester.Builder builder) {
		return builder.tcp("localhost", 8888);
	}

	@Bean
	ApplicationListener<ApplicationReadyEvent> ready(RSocketRequester rSocketRequester) {
		return event -> rSocketRequester //
				.route("greetings.{lang}", Locale.ENGLISH) //
				.data("World").retrieveMono(String.class)//
				.subscribe(greetings -> System.out.println("got: " + greetings));
	}

}
```

Here's what I put into my `application.properties`:

```properties
Copyspring.main.web-application-type=none
```

> Here, you can see that the default client experience of an RSocket service is more like that of an HTTP endpoint or an exchange with a message queue. We're sending request messages to endpoints, which are more like URIs, not distributed methods. That said, if you *really* are all about that RPC life and don't mind an *optional* extra dependency. You *might* [consider the *experimental* Spring Retrosocket project](http://github.com/spring-projects-experimental), which we launched to support this use case precisely. It provides a Netflix-feign like RPC experience, but for RSocket.

Did you like this gem at a glance approach? Did you learn anything? As always, I'm keen on hearing from you, so [please sound off on Twitter (@starbuxman)](http://twitter.com/starbuxman) ! I'll be back with another installment of *YMNNALFT*, so be sure not to miss that.