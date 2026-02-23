---
title: The Reactive Revolution at SpringOne Platform 2018 (part 1/N)
source: https://spring.io/blog/2018/09/27/the-reactive-revolution-at-springone-platform-2018-part-1-n
scraped: 2026-02-23T14:30:41.026Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  September 27, 2018 | 3 Comments
---

# The Reactive Revolution at SpringOne Platform 2018 (part 1/N)

_Engineering | Josh Long |  September 27, 2018 | 3 Comments_

Hi Spring fans! What a crazy week in Spring it's been! I'm at SpringOne Platform 2018 soaking up all the exciting community events, interacting with people from around the planet who love Pivotal and love Spring! I just got asked to take a selfie with a woman from Vietnam while five miles from the show - at a local mall where I happened to be for a community dinner! It's wonderful that the Pivotal brings people of so many disparate cultures and places together.

Today, Wednesday 26th, 2018, was a *doozie*! There are so many wonderful things happening this week, of course, but today was a very special one for me. Today saw us take the wraps off of the amazing work Pivotal is doing on two fronts. I wanted only to briefly touch on these topics in this post. You'll no doubt hear more about this from us in the weeks to come!

## [](#reactive-sql-data-access-with-r2dbc)Reactive SQL Data Access with R2DBC

First, we announced our work on trying to support a standard for reactive SQL data access with R2DBC. R2DBC is early days yet, but very exciting. Thus far when we talk about data access, I've been quick to remind people that they while they could use JDBC from within a reactive application, they're taking the issue of scaling out that interaction as their own responsibility. It would be up to them to configure more threads to the `Scheduler` assigned to the reactive stream in which any SQL data access was happening. This was necessary because JDBC is a fundamentally blocking and synchronous API. It doesn't have the ability to perform IO and then call you back when there's activity; the client thread is left waiting for the replies. R2DBC offers an alternative. It's *not* meant to be a wrapper around JDBC, but instead to support functional reactive data access built on natively reactive SQL database drivers. We have an SPI layer and an implementation supporting PostgreSQL.

Let's look at an example. In order to get this to work, I went to the [Spring Initializr](http://start.Spring.io) and selected `Reactive Web` and `Lombok`. I made sure to choose a `SNAPSHOT` version of Spring Boot. You don't need SNAPSHOTs of Spring Boot itself, *per se*, but you will want the Spring Initializr to add the Spring snapshot repositories to your build so that you can resolve the `r2dbc-postgresql` dependency. Then, I (manually! the horror!) edited the Maven build, `pom.xml`, and added a dependency on the `io.r2dbc:r2dbc-postgresql:1.0.0.BUILD-SNAPSHOT` dependency to the build.

```java
Copypackage s1p.r2dbc;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;

import io.r2dbc.postgresql.PostgresqlConnectionFactory;
import io.r2dbc.postgresql.PostgresqlResult;

import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.net.URI;

@Log4j2
@SpringBootApplication
public class PostgresqlApplication {

  public static void main(String args[]) {
    SpringApplication.run(PostgresqlApplication.class, args);
  }

  @Bean
  PostgresqlConnectionFactory connectionFactory(
      @Value("${spring.datasource.url}") String url) {

    URI uri = URI.create(url);
    String host = uri.getHost();
    String userInfo = uri.getUserInfo();
    String user = userInfo, pw = "";

    if (userInfo.contains(":")) {
      user = userInfo.split(":")[0];
      pw = userInfo.split(":")[1];
    }

    String name = uri.getPath().substring(1);
    PostgresqlConnectionConfiguration configuration = PostgresqlConnectionConfiguration
        .builder() //
        .database(name) //
        .host(host) //
        .username(user) //
        .password(pw) //
        .build();
    return new PostgresqlConnectionFactory(configuration);
  }
}

@Log4j2
@Service
class CustomerService {

  private final ConnectionFactory connectionFactory;

  CustomerService(PostgresqlConnectionFactory pgc) {
    this.connectionFactory = pgc;
  }

  Flux<Result> delete(Long id) {
    return Mono.from(this.connectionFactory.create())
      .flatMapMany(connection -> connection
        .createStatement("DELETE FROM customers where id = $1")
        .bind("$1", id) //
        .execute());
  }

  Flux<Result> create(Long id, String email) {
    return Mono.from(this.connectionFactory.create())
      .flatMapMany(connection -> connection
        .createStatement("INSERT INTO customers(id,email) VALUES($1, $2)")
        .bind("$1", id) //
        .bind("$2", email) //
        .add().execute());
  }

  Flux<Customer> all() {

    return Mono
      .from(this.connectionFactory
        .create())
      .flatMapMany(connection -> Flux.from(
        connection.createStatement("select * from customers").execute())
        .flatMap(result -> result.map((row, rowMetadata) -> new Customer(row.get("id", Long.class),
          row.get("email", String.class)))));
  }

}

@Data
@AllArgsConstructor
@NoArgsConstructor
class Customer {

  private Long id;

  private String email;

} 

```

Pretty cool, eh? The APIs are natively reactive and mean you can take advantage of the facilities provided for retries and composition afforded to you by those APIs.

## [](#rsocket-the-reactive-wire-protocol)RSocket: the reactive wire protocol

We also debuted our support for RSocket, a protocol developed by - among others - folks from Netflix who have since moved to Facebook. RSocket is a wire protocol that surfaces the tenants of reactive processing as part of the protocol itself. Facebook have developed two RSocket clients: one in C++ and another in Java. The Java RSocket client builds upon the Reactor project! RSocket is a binary protocol, though, so in theory you could build clients in other languages, as well.

RSocket is a general purpose data conveyance protocol. It supports a number of message exchange patterns or styles including, but not limited to, request-response, fire-and-forget, publish-subscribe and streaming. The sky's the limit! This post couldn't hope to thoroughly introduce all of the options, so let's look at a simple streaming example that has two components, a producer and a consumer. In order to get this to work, I went to the Spring Initializr, selected `Lombok` and I chose the latest (stable) version of Spring Boot. In the build file, `pom.xml`, I added two dependencies: `io.rsocket:rsocket-transport-netty:0.11.5` and `io.rsocket:rsocket-core:0.11.5`.

The goal here is to demonstrate how very simple these APIs are, and how flexible. You can use them directly or, as for example Netifi have done, as the basis for a whole suite of infrastructure supporting even more advanced use cases.

The crux of this simple sample is that the producer is going to emit a new record every second, forever! So long as the universe hasn't experienced its heat death, this example should keep going!

First, let's look at a trivial producer example. I set this up so that it will listen for the `ApplicationReadyEvent` and only then start serving requests. I want to keep the Java process up (and thus listening for requests) so, as a bit of a kludge, I use `System.in.read()` to poll the console for input. Remember, this API is non-blocking and asynchronous! It won't keep the main thread alive if we don't help it.

```java
Copypackage s1p.rsocket.producer;

import io.rsocket.AbstractRSocket;
import io.rsocket.Payload;
import io.rsocket.RSocketFactory;
import io.rsocket.SocketAcceptor;
import io.rsocket.transport.netty.server.TcpServerTransport;
import io.rsocket.util.DefaultPayload;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.time.Duration;
import java.time.Instant;

@SpringBootApplication
@Log4j2
public class ProducerApplication implements ApplicationListener<ApplicationReadyEvent> {

  public static void main(String[] args) throws IOException {
    SpringApplication.run(ProducerApplication.class, args);
    System.in.read();
  }

  @Override
  public void onApplicationEvent(ApplicationReadyEvent applicationReadyEvent) {
    SocketAcceptor sa = (connectionSetupPayload, rSocket) ->
      Mono.just(new AbstractRSocket() {

        @Override
        public Flux<Payload> requestStream(Payload payload) { // produce a result when asked...
          return Flux
            .interval(Duration.ofMillis(1000))  // ...every one second
            .map(aLong -> DefaultPayload.create("interval: " + aLong));
        }
      });

    RSocketFactory
      .receive()
      .acceptor(sa)
      .transport(TcpServerTransport.create("localhost", 7000))
      .start()
      .onTerminateDetach()
      .subscribe(nettyContextCloseable -> log.info("started the server @ " + Instant.now().toString()));
  }
}
```

The consumer is just as straightforward. It initiates a request to the service, gets the reactive streams `Publisher<T>` from the service and iterates through each record, unpacking the binary payload as a `String`, and logging it as it arrives. Here too, I use `System.in.read()` as a way to keep the thread running.

```java
Copypackage s1p.rsocket.consumer;

import io.rsocket.Payload;
import io.rsocket.RSocketFactory;
import io.rsocket.transport.netty.client.TcpClientTransport;
import io.rsocket.util.DefaultPayload;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;

import java.io.IOException;

@Log4j2
@SpringBootApplication
public class ConsumerApplication implements ApplicationListener<ApplicationReadyEvent> {

  public static void main(String[] args) throws IOException {
    SpringApplication.run(ConsumerApplication.class, args);
    System.in.read();
  }

  @Override
  public void onApplicationEvent(ApplicationReadyEvent evt) {
    RSocketFactory
      .connect()
      .transport(TcpClientTransport.create("localhost", 7000))
      .start()
      .flatMapMany(socket ->
        socket
          .requestStream(DefaultPayload.create("Hello"))
          .map(Payload::getDataUtf8)
          .doFinally(signal -> socket.dispose())
      )
      .subscribe(name -> log.info("consuming " + name + "."));
  }
}
```

Both producer and consumer connect to `localhost:7000` and start interacting. RSocket, like HTTP, doesn't really care what the payload of the message is. It's binary data on the wire, after all.

## [](#next-steps)Next Steps

There have been a ton of talks that expand on both of these topics recorded here at SpringOne Platform! They'll be online soon enough. (Don't you wish you were here, in the meantime?) Spring plays a strong role here because it is end-to-end reactive. Imagine it! You could build reactive microservices that communicate service-to-service using RSocket. Why not use `@Tailable` reactive Spring Data MongoDB repository methods to do a sort of continuous query on data in your MongoDB data set and stream, over RSocket, those results as they arrive in your MongoDB store? You could do the reverse, as well. Your RSocket client could stream a lot of data to be written to MongoDB, using the new *reactive* transaction support in the Spring Data MonogDB release in the just released Spring Data Lovelace! Why not use R2DBC and return large amounts of data in a streaming fashion over RSocket. RSocket is also optimal for the edge, too! You can conduct RSocket over, for example, websockets. Imagine that: RSocket-based services that can be consumed directly by HTML5 clients. Or, you could create reactive HTTP services using Spring WebFlux that in turn invoke RSocket based services which in turn invoke R2DBC. As they say, the skies are potentially unbounded and asynchronous!

The [Reactor team](http://twitter.com/ProjectReactor) and the Spring team's [Ben Hale](http://twitter.com/NebHale), among others, have worked diligently on both of these projects over more than a year, so I know they're very excited to share this news with you and to answer any questions you have as you take up proverbial arms in the reactive revolution!