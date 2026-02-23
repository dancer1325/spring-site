---
title: Getting Started With RSocket: Servers Calling Clients
source: https://spring.io/blog/2020/05/12/getting-started-with-rsocket-servers-calling-clients
scraped: 2026-02-23T14:01:11.369Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Wilcock |  May 12, 2020 | 5 Comments
---

# Getting Started With RSocket: Servers Calling Clients

_Engineering | Ben Wilcock |  May 12, 2020 | 5 Comments_

**Reading Time: about 7 minutes.** **Coding Time: about 20 minutes.**

If you've been following my [series](https://spring.io/blog/2020/03/02/getting-started-with-rsocket-spring-boot-server) on [RSocket](https://rsocket.io), you've heard me refer to "clients and servers" many times. But, with RSocket, the line between client and server is *blurry*. With Rsocket, servers can send messages to clients, and clients can respond to these requests in the same way a server would.

In fact, the [RSocket docs](http://rsocket.io/docs/Protocol#terminology) don't use the terms 'client' or 'server.' The docs use the terms 'requester' and 'responder' instead. In RSocket, any component can act as a requester, and any component can act as a responder or even both at the same time. In RSocket, all this back-and-forth communication between requesters and responders takes place over a single 'bi-directional' connection.

Today, you're going to take advantage of these features by programming your rsocket-client to respond to requests coming from the server. In the server-side code, you'll listen out for client connection events, and when a connection event happens, you'll store the new client in a list of connected clients. You'll also ask every client to stream telemetry messages back to the server for as long as their connection is alive.

> If you've been following the [series](https://spring.io/blog/2020/03/02/getting-started-with-rsocket-spring-boot-server), you can code along by following the directions below. The code is also available to download from [GitHub](https://github.com/benwilcock/spring-rsocket-demo).

## [](#step-1-update-spring-boot-and-rsocket)Step 1: Update Spring Boot and RSocket

First, some housekeeping. [Spring Boot](https://spring.io/projects/spring-boot) and the [RSocket Java](https://github.com/rsocket/rsocket-java) library were both updated recently. These updates include the usual round of bug fixes, enhancements, and deprecations, so it's in our interest to upgrade.

Working in the `<parent>` section of the Maven `pom.xml`, change the `spring-boot-starter-parent` to version `2.3.0.RELEASE` as shown below. You'll need to do this twice, as you have two separate projects — `rsocket-client` and `rsocket-server`.

```xml
Copy<parent>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-parent</artifactId>
  <version>2.3.0.RELEASE</version>
  <relativePath/> <!-- lookup parent from repository -->
</parent>
```

To refresh your code, run the following command in the root folder of both projects:

```bash
Copy./mvnw clean compile
```

Now you can move on to the coding task.

## [](#step-2-add-a-request-response-message-handler-to-the-client)Step 2: Add A Request-Response Message Handler To The Client

The client needs to be able to respond to messages coming from the server. In the `rsocket-client` project's `RSocketShellClient.java`, add a new inner class called `ClientHandler` as follows:

```java
Copy@Slf4j
class ClientHandler {
 
 @MessageMapping("client-status")
 public Flux<String> statusUpdate(String status) {
   log.info("Connection {}", status);
   return Flux.interval(Duration.ofSeconds(5)).map(index -> String.valueOf(Runtime.getRuntime().freeMemory()));
 }
}
```

This class contains a single method called `statusUpdate()` decorated with a `@MessageMapping` annotation like the ones in the `rsocket-server` project. The client uses this class and this method to capture and respond to requests coming in from the server. The response itself is a stream of messages. Every 5 seconds, the client tells the server its current free memory. Think of this as client telemetry data.

For this to work, you must 'register' this class with your RSocket connection. You'll do this in the next section.

## [](#step-3-register-the-clienthandler-in-the-clients-constructor)Step 3: Register The ClientHandler In The Client’s Constructor

Before the client can respond to messages coming from the server, it must register the `ClientHandler` with the RSocket connection. The revised constructor code is listed below. Notice the change to the constructor's method signature to add the `RSocketStrategies` variable. Spring supplies this variable to your constructor. Replace your old constructor code, with the new code listed below.

```java
Copypublic RSocketShellClient(RSocketRequester.Builder rsocketRequesterBuilder, RSocketStrategies strategies) {
 
 // (1)
 String client = UUID.randomUUID().toString();
 log.info("Connecting using client ID: {}", client);
  
 // (2)
 SocketAcceptor responder = RSocketMessageHandler.responder(strategies, new ClientHandler());
  
 // (3) 
 this.rsocketRequester = rsocketRequesterBuilder
 .setupRoute("shell-client")
 .setupData(client)
 .rsocketStrategies(strategies)
 .rsocketConnector(connector -> connector.acceptor(responder))
 .connectTcp("localhost", 7000)
 .block();
  
 // (4)
 this.rsocketRequester.rsocket()
 .onClose()
 .doOnError(error -> log.warn("Connection CLOSED"))
 .doFinally(consumer -> log.info("Client DISCONNECTED"))
 .subscribe();
 }
```

In the code above, you first generate and store a unique ID that identifies this client instance (1). Next, you create a new `SocketAcceptor` using the RSocket `strategies` plus a new `ClientHandler` instance (2). Then use the `RSocketRequesterBuilder` to register the new `SocketAcceptor` (3). And finally, make sure that disconnection is handled gracefully by handling the RSocket `onClose()` events (4).

That's it for the client-side code. Let's move on to the server-side changes.

## [](#step-4-remember-clients-on-the-server)Step 4: Remember Clients On The Server

The first thing to do in the `rsocket-server` project is to create a collection of `RSocketRequester` clients by adding a class-level variable to the `RSocketController.java` class as follows:

```java
Copyprivate final List<RSocketRequester> CLIENTS = new ArrayList<>();
```

Next, add a connection handler by adding a new method like this:

```java
Copy  @ConnectMapping("shell-client")
 void connectShellClientAndAskForTelemetry
(RSocketRequester requester, @Payload String client) {
 // The code for the method will go HERE
 }
```

The `@ConnectMapping` annotation lets you listen to client connection events as they happen. Using this event, you can schedule two pieces of work. The first is to add each new client to the `CLIENTS` list. The second is to call out to each client and start their telemetry streams.

Add the following code to the method you just created:

```java
Copyrequester.rsocket()
        .onClose() // (1)
        .doFirst(() -> { 
            log.info("Client: {} CONNECTED.", client);
            CLIENTS.add(requester); // (2)
        })
        .doOnError(error -> { 
            log.warn("Channel to client {} CLOSED", client); // (3)
        })
        .doFinally(consumer -> { 
            CLIENTS.remove(requester);
            log.info("Client {} DISCONNECTED", client); // (4)
        })
        .subscribe();
```

The first thing to notice is the call to the `requester.rsocket().onClose()` method (1). This method returns a reactive `Mono` object, which contains all the callbacks you need.

The mono's `doFirst()` method gets called *before* any calls to `subscribe()`, but after the initial creation of the mono. Use this method to add the client's `requester` object to the `CLIENTS` list (2).

> This code might feel counter-intuitive — calling `onClose()` while a client's connecting and then using the resulting mono to store a reference to the new client. Sometimes, event-driven API's can feel a bit odd. But think of it as the mono for this RSocket connection sending you an "I'm alive" event. You're using that creation event to trigger the storage of each client's reference in the list.

RSocket calls the mono's `doOnError()` method whenever there is a problem with the connection. This includes situations where the client has chosen to close the connection. You can use the `error` variable provided to decide what action to take. In the code above, the error simply gets logged as a warning (3).

The mono's `doFinally()` method is triggered when the RSocket connection has closed. This method is the ideal place to run the code that removes the client from the list `CLIENTS` (4).

Finally, `subscribe()` activates the reactive code you've added to the mono and signals that you're ready to process the events.

## [](#step-5-ask-for-free-memory-readings-from-clients)Step 5: Ask For Free Memory Readings From Clients

As each client connects, request a stream of telemetry readings. To do this, working once more in the `connectShellClientAndAskForTelemetry()` method, you need to send a request to the `client-status` message handler you added earlier. The code for this is as follows:

```java
Copyrequester.route("client-status")
        .data("OPEN")
        .retrieveFlux(String.class)
        .doOnNext(s -> log.info("Client: {} Free Memory: {}.",client,s))
        .subscribe();
```

Using the `requester`, target the route `"client-status"`. Send the string `"OPEN"` as the message data, and retrieve a `Flux` of type `String`. Each string that arrives contains the client's current free memory reading. Log this reading to the console. Finally, don't forget to `subscribe()` to activate your reactive code.

## [](#step-6-build-and-run-the-rsocket-server)Step 6: Build And Run The RSocket Server

It's time to test your code. Open a terminal window and move to the `rsocket-server` directory and run the server as follows:

```bash
Copycd rsocket-server
./mvnw clean package spring-boot:run -DskipTests=true
```

The server starts up on `localhost` port `7000`.

## [](#step-7-build-and-run-the-rsocket-client)Step 7: Build And Run The RSocket Client

Open a *second* terminal window and move to the `rsocket-client` directory. From there, build and run the client as follows:

```bash
Copycd rsocket-client
./mvnw clean package spring-boot:run -DskipTests=true
```

## [](#how-it-works)How it Works

Once booted, you'll notice that both the client and the server components have new log entries in the console. In the `rsocket-client` window, you'll see log entries showing the unique ID of the client — in the form of a UUID — and an `"OPEN"` connection status as follows:

```
CopyConnecting using client ID: 0acc1c60-4bc4-444d-bb82-eb6b510f4168
Connection OPEN
Started RsocketShellClientApplication in 1.516 seconds (JVM running for 1.814)
shell:>
```

Wait at least 10 seconds and then type `exit` at the `shell:>` prompt. The rsocket-client now disconnects from the server and shuts down.

Now switch to the `rsocket-server` window. The log entries look something like this:

```txt
CopyStarted RsocketServerApplication in 0.945 seconds (JVM running for 1.248)
Client: 0acc1c60-4bc4-444d-bb82-eb6b510f4168 CONNECTED.
Client: 0acc1c60-4bc4-444d-bb82-eb6b510f4168 Free Memory: 211317712.
Channel to client 0acc1c60-4bc4-444d-bb82-eb6b510f4168 CLOSED
Client 0acc1c60-4bc4-444d-bb82-eb6b510f4168 DISCONNECTED
```

As the client connects, it's added to the list of clients, and the console prints its client ID and the status "CONNECTED". Then, every 5 seconds, the log shows the client's current 'free memory' reading. Finally, as the client disconnects, it's RSocket channel's status becomes "CLOSED" and the client is "DISCONNECTED."

You can stop the `rsocket-server` process by pressing `Ctrl-C` in its terminal window.

## [](#final-thoughts)Final Thoughts

The ability to call out to clients is very powerful. It’s ideal for all kinds of scenarios, including mobile, internet-of-things, or microservices. And because all this can happen over TCP or WebSockets, you already have all the infrastructure you need without resorting to heavyweight solutions like message brokers.

You covered a lot of ground here. You learned how to turn servers into 'requesters' and clients into 'responders.' You discovered how to listen into connection events. You also learned a little bit about how to handle errors and events coming from rsocket connections. And, although in this exercise, you chose 'request-stream' as your server-client communication, you could use any of the four RSocket interaction modes, depending on your needs.