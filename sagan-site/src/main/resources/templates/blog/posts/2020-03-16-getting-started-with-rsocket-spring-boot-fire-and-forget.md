---
title: Getting Started With RSocket: Spring Boot Fire-And-Forget
source: https://spring.io/blog/2020/03/16/getting-started-with-rsocket-spring-boot-fire-and-forget
scraped: 2026-02-23T14:07:32.109Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Wilcock |  March 16, 2020 | 0 Comments
---

# Getting Started With RSocket: Spring Boot Fire-And-Forget

_Engineering | Ben Wilcock |  March 16, 2020 | 0 Comments_

**Time: about 15 minutes.**

Some developers reading this post will have been using HTTP for many years by now. Most of them will also know that if you want to use HTTP with other messaging models — like fire-and-forget, for example — you must sometimes use clever workarounds [like this one](https://stackoverflow.com/questions/38277471/fire-and-forget-for-http-in-java) posted on Stackoverflow. That's because HTTP is a request-response protocol. It requires a request to be sent and a response to be received. It has no concept of a one-way message without any form of response.

[RSocket](https://rsocket.io) takes a different approach. RSocket defines a new protocol layer on top of transports like TCP and WebSockets. This new protocol offers greater choice to developers, with built-in support for four distinct interaction models:

-   request/response
-   fire-and-forget
-   request/stream
-   channel

In the previous posts, you already learned how to do request-response with RSocket. In this post, you're going to learn how to add fire-and-forget messaging to your code. Let's dive right in!

> If you didn't read the previous posts on [server-side](https://spring.io/blog/2020/03/02/getting-started-with-rsocket-spring-boot-server) and [client-side](https://spring.io/blog/2020/03/09/getting-started-with-rsocket-spring-boot-client) request-response messaging with RSocket, now's your chance! The code sample is [on GitHub](https://github.com/benwilcock/spring-rsocket-demo).

#### [](#step-1-add-the-server-side-fire-and-forget-method)Step 1: Add The Server-Side Fire-And-Forget Method

You'll remember the `RSocketController` from the `rsocket-server` project that you worked on earlier:

```java
Copy@Slf4j
@Controller
public class RSocketController {
// code goes here
}
```

The `RSocketController` is the server-side class that dealt with request-response messaging. Its `.requestResponse()` method accepted a `Message` object as a parameter and returned a `Message` object as a response. It's this one-object-in, one-object-out method signature that makes the method a request-response method.

To add a fire-and-forget capability to the server, you must add a method with a different signature. The `.fireAndForget()` method should accept a single `Message` parameter, but this time, return a `void` like this...

```java
Copy    @MessageMapping("fire-and-forget")
    public void fireAndForget(Message request) {
        log.info("Received fire-and-forget request: {}", request);
    }
```

You must still use the `@MessageMapping` annotation on your method, but this time you must give the *route* mapping a different name. In the code above, I've used the name "fire-and-forget."

> In the Spring RSocket documentation, the method signature rules are in the [message mapping](https://docs.spring.io/spring/docs/current/spring-framework-reference/web-reactive.html#rsocket-annot-messagemapping) section.

#### [](#step-2-add-the-client-side-fire-and-forget-method)Step 2: Add The Client-Side Fire-And-Forget Method

You built your `RSocketShellClient` in the `rsocket-client` project when you followed the previous post:

```java
Copy@Slf4j
@ShellComponent
public class RSocketShellClient {
// code goes here
}
```

RSocketShellClient used the `.requestResponse()` method to send a single request to the RSocket server using the `RSocketRequester` created in the class constructor.

To add the fire-and-forget capability to your client, add a new `.fireAndForget()` method to the `RSocketShellClient` like this:

```java
Copy    @ShellMethod("Send one request. No response will be returned.")
    public void fireAndForget() throws InterruptedException {
        log.info("\nFire-And-Forget. Sending one request. Expect no response (check server log)...");
        this.rsocketRequester
                .route("fire-and-forget")
                .data(new Message(CLIENT, FIRE_AND_FORGET))
                .send()
                .block();
    }
```

Let's examine the code in this method in more detail:

The `.route()` on the `rsocketRequester` is set to `"fire-and-forget"`. This route name matches the `@MessageMapping` annotation on the fire-and-forget method in the `RSocketController.`

A new `Message` instance provides the data for the `.data()` method. The message instance has its origin set to `CLIENT` and `FIRE_AND_FORGET` set as its interaction mode.

Notice that there is no `.retrieveMono()` call. Instead, the fire-and-forget specific `.send()` method sends the message to the server, while `.block()` subscribes and waits for completion. Remember, nothing happens in reactive code without a subscription.

That's all the coding done. Now, it's time to test it's working.

#### [](#step-3-build-and-run-the-rsocket-server)Step 3: Build And Run The RSocket Server

Open a terminal window and move to the `rsocket-server` directory. Start running the server using the Maven wrapper like this:

```bash
Copycd rsocket-server
./mvnw clean package spring-boot:run -DskipTests=true
```

The server starts on `localhost` port `7000`.

> For details on how to run a Linux terminal on Windows 10, see [this quick guide from Ubuntu](https://ubuntu.com/wsl).

#### [](#step-4-build-and-run-the-rsocket-client)Step 4: Build And Run The RSocket Client

Open a *second* terminal window and move to the `rsocket-client` directory. From there, build and run the client application as follows:

```bash
Copycd rsocket-client
./mvnw clean package spring-boot:run -DskipTests=true
```

When the client runs, Spring Shell presents you with a new prompt:

```bash
Copyshell:>
```

You can send your fire-and-forget message to the server by typing `fire-and-forget` at the prompt.

```none
Copyshell:>fire-and-forget
2020-02-03 14:54:14.028 INFO 2929 --- [ main] io.pivotal.rsocketclient.RSocketClient :
Fire-And-Forget. Sending one request. Expect no response (check server)...
```

The client prints no response, but if you switch to the server's terminal window, you'll notice the receipt of the fire-and-forget message is logged successfully to the console:

```none
Copy2020-02-03 14:54:14.129 INFO 2061 --- [or-http-epoll-2] io.pivotal.rsocketserver.RSocketServer : Received fire-and-forget request: Message(origin=Client, interaction=Fire-And-Forget, index=0, created=1580741654)
```

#### [](#step-5-tidy-up)Step 5: Tidy Up

You can stop the `rsocket-client` by typing exit at the `shell:>` prompt like this.

```bash
Copyshell:>exit
```

You can stop the `rsocket-server` process by pressing `Ctrl-C` in its terminal window.

#### [](#how-it-works)How It Works

The client's `.fireAndForget()` method uses the `RSocketRequester` to send a single `Message` to the server when the `block()` method is called. The block method is effectively an instruction to 'subscribe and wait.'

The `RSocketController` on the server examines the message metadata for the `route` and correctly passes the message to the `.fireAndForget(Message request)` method for processing. Once the client sends the request, it is free to get on with other things. When the server receives the request, it too can get on with other work. It does not need to send a response to the client.

#### [](#final-thoughts)Final Thoughts

In this post, you learned how to quickly build a fire and forget capability with Spring Boot and RSocket. For more on Spring's RSocket integration and message mapping, take a look at the [Spring RSocket documentation](https://docs.spring.io/spring/docs/current/spring-framework-reference/web-reactive.html#rsocket-annot-messagemapping). In the next post, we'll cover request-stream messaging. See you there!