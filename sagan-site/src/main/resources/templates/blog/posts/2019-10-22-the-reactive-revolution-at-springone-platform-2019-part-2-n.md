---
title: The Reactive Revolution at SpringOne Platform 2019 (part 2/N)
source: https://spring.io/blog/2019/10/22/the-reactive-revolution-at-springone-platform-2019-part-2-n
scraped: 2026-02-23T14:30:36.641Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  October 22, 2019 | 1 Comment
---

# The Reactive Revolution at SpringOne Platform 2019 (part 2/N)

_Engineering | Josh Long |  October 22, 2019 | 1 Comment_

Last year right in the middle of SpringOne Platform 2018, I posted the [first post in this series, \_ The Reactive Revolution at SpringOne Platform 2018 (part 1/N)\_](https://spring.io/blog/2018/09/27/the-reactive-revolution-at-springone-platform-2018-part-1-n), which looked at some of the big features we'd just dropped at SpringOne Platform 2018. I wanted to follow up and revisit that blog and the concepts I'd introduced last year, and show just how far we've come in the intervening year. TL;DR: things are *much* easier!

## [](#r2dbc)R2DBC

Last year, we announced our work on trying to support a standard for reactive SQL data access with a new project called [R2DBC](http://r2dbc.io). Traditional approaches to SQL data access on the JVM, like JDBC, are blocking APIs. They monopolize threads to do their work and negate the scalability benefits of a reactive platform like Spring. We wanted to improve that situation for developers so we built R2DBC. R2DBC has now been out in the public for more than a year and was developed internally for about as long internally before that. We've just reached the 0.0.8 release. We're nearing a GA release. I'm not sure when, but I reckon we'll have a majority of the features most developers need in a possibly GA, but-not-yet-1.0, release. Things like stored procedures might be released later.

We've made a ton of progress since last year. There are now a good many different implementations (some available and some under active development) from various vendors supporting R2DBC-based data access, including PostgresSQL, MySQL, Google Cloud Spanner, H2, Microsoft SQL Server, and more.

It's also *way* easier to get started. Simply visit my secon favorite place on the internet, *after production*, [the Spring Initializr](http://start.Spring.io/), and choose `R2DBC` and choose `PostgresSQL`. Click `Generate`. The resulting archive will be almost ready-to-run. You'll need to specify connection information, but as with all Spring Boot autoconfiguration, such details are best handled outside of the Java code. You could handle it in the environment, `-D` arguments, and in the property files. Here's what that looks like for me, in `src/main/resources/application.properties`.

```
Copyspring.r2dbc.url=r2dbc:postgres://localhost/orders
spring.r2dbc.username=orders
spring.r2dbc.password=orders
```

And here is a more-than-equivalent to last year's Java code:

```
Copypackage com.example.r2dbc;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

@SpringBootApplication
public class R2dbcApplication {

	public static void main(String[] args) {
		SpringApplication.run(R2dbcApplication.class, args);
	}
}

interface CustomerRepository extends ReactiveCrudRepository<Customer, Long> {
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class Customer {

	private Long id;

	private String email;

}
```

Pretty cool, eh? The APIs are natively reactive and mean you can take advantage of the facilities provided for retries and composition afforded to you by those APIs. We can take it a step further. There's now support for reactive transaction management thanks to the new `ReactiveTransactionManager` abstraction introduced in Spring Framework 5.2. There are already implementations of this interface, akin to the `PlatformTransactionManager` in Spring Framework, for Spring Data Neo4j RX (the new, reactie-first implementation), Spring Data MongoDB, and of course R2DBC. Here's a reactive, transactional service based on our R2DBC code.

```
Copy
@Service
@RequiredArgsConstructor
class CustomerService {

	private final TransactionalOperator transactionalOperator;

	@Transactional
	Flux<Customer> saveAllWithTransactionalAnnotation(String... emails) {
		return this.validCustomersFromEmails(emails);
	}

	Flux<Customer> saveAllWithTransactionalOperator(String... emails) {
		return this.transactionalOperator.transactional(
			this.validCustomersFromEmails(emails));
	}

	private Flux<Customer> validCustomersFromEmails(String... emails) {
		return Flux.fromArray(emails)
			.map(email -> new Customer(null, email))
			.doOnNext(c -> Assert.isTrue(c.getEmail().contains("@"), "the email must contain a '@'"));
	}
}
```

You'll need to explicitly configure transactions. Here's how:

```
Copy@Configuration
@EnableTransactionManagement
class TransactionConfiguration {

	@Bean
	ReactiveTransactionManager reactiveTransactionManager(ConnectionFactory cf) {
		return new R2dbcTransactionManager(cf);
	}

	@Bean
	TransactionalOperator transactionalOperator(ReactiveTransactionManager txm) {
		return TransactionalOperator.create(txm);
	}
}
```

In the comments for the article, someobdy asked about whether anybody is talking to Jakarta EE about all of this. I mentioned the (now defunct) ADBA project. R2DBC is now the best bet for getting reactive SQL-data access working. I hope you'll give it a shot, kick the tires, and feedback!

## [](#rsocket-the-reactive-wire-protocol)RSocket: the reactive wire protocol

Last year, we also debuted our support for RSocket, a protocol developed by - among others - folks from Netflix (who have since moved to Facebook) and Netifi. RSocket is a wire protocol that surfaces the tenants of reactive processing as part of the protocol itself. Facebook have developed different RSocket clients supporting, for example, C++ and Java. The Java RSocket client builds upon [the Reactor project](http://ProjectReactor.io)! RSocket is a binary protocol, though, so in theory you could build clients in other languages, as well.

RSocket is a general purpose data conveyance protocol. It's payload agnostic. It doesn't care what you send across the wire. It's also built for operations! It's even got a dedicate message frame in the protocol to convey information like service health and uptime. It supports a number of message exchange patterns or styles including, but not limited to, request-response, fire-and-forget, publish-subscribe and streaming. The sky’s the limit! This post couldn’t hope to thoroughly introduce all of the options, so let’s look at a simple streaming example that has two components, a producer and a consumer. In order to get this to work, I went to the Spring Initializr, selected `Lombok` and `RSocket`. I did this twice, one for a producer and another for a consumer. Let's look at that.

You'll need to provide sme configuration, as before, in `src/main/resources/application.properties`.

```
Copyspring.rsocket.server.port=7777
```

That'll start an RSocket service. Here's the actual code.

```
Copypackage com.example.rsocketservice;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;

import java.time.Duration;

@SpringBootApplication
public class RsocketServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(RsocketServiceApplication.class, args);
	}
}

@Controller
class GreetingsController {

	@MessageMapping("intervals")
	Flux<GreetingResponse> interval(GreetingRequest request) {
		return Flux
			.interval(Duration.ofMillis(1000))
			.map(interval -> new GreetingResponse("Hello (#" + interval + ") " + request.getName() + "!"));
	}
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class GreetingRequest {
	private String name;
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class GreetingResponse {
	private String message;
}

```

Much better than the code from last year! It's functionally equivalent, but it does one more interesting things, like marshal an object instead of a mere `String`. Remember, RSocket connections are multiplexed, stateful, long-lived connections. You can open a connection and reuse it to handle multiple requests. They might disconnect, and it's up to you to put in retry logic there. This has a profound effect on speed; you wouldn't believe how much time is spent connecting and disconnecting in typical HTTP!

Let's look at the client, something to consume the Greetings service. Go to the Spring Initializer, start a new project, choosing the same dependencies as before and varying only the project name.

```
Copypackage com.example.rsocketclient;

import lombok.*;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.rsocket.RSocketRequester;
import org.springframework.stereotype.Component;

@SpringBootApplication
@RequiredArgsConstructor
public class RsocketClientApplication {

	@SneakyThrows
	public static void main(String[] args) {
		SpringApplication.run(RsocketClientApplication.class, args);
		System.in.read();
	}

	@Bean
	RSocketRequester rSocketRequester(RSocketRequester.Builder builder) {
		return builder.connectTcp("localhost", 7777).block();
	}
}

@Log4j2
@Component
@RequiredArgsConstructor
class Client {

	private final RSocketRequester rSocketRequester;

	@EventListener(ApplicationReadyEvent.class)
	public void ready() {
		this.rSocketRequester
			.route("intervals")
			.data(new GreetingRequest("World"))
			.retrieveFlux(GreetingResponse.class)
			.subscribe(im -> log.info("consuming " + im.getMessage() + "."));
	}
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class GreetingRequest {
	private String name;
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class GreetingResponse {
	private String message;
}

```

Not bad, eh? We could take this a step further and secure it with the new support in Spring Security for RSocket, and we could front our services using Spring Cloud Gateway's new RSocket support, as well.

I can't wait to update this series with whatever the latest and greatest is in one year!