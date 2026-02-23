---
title: Getting Started With RSocket: Spring Boot Request-Stream
source: https://spring.io/blog/2020/03/23/getting-started-with-rsocket-spring-boot-request-stream
scraped: 2026-02-23T14:07:21.296Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Wilcock |  March 23, 2020 | 3 Comments
---

# Getting Started With RSocket: Spring Boot Request-Stream

_Engineering | Ben Wilcock |  March 23, 2020 | 3 Comments_

**Time: about 15 minutes.**

Previously in this series, you experimented with [request](https://spring.io/blog/2020/03/09/getting-started-with-rsocket-spring-boot-client)\-[response](https://spring.io/blog/2020/03/02/getting-started-with-rsocket-spring-boot-server) and [fire-and-forget](https://spring.io/blog/2020/03/16/getting-started-with-rsocket-spring-boot-fire-and-forget) messaging in Spring Boot with RSocket. This time you'll try another of RSocket's fresh new messaging models — request-stream.

In this exercise, you'll learn how to stream data using the conventional *'client-requests-a-server-stream'* approach.

One thing that I haven't mentioned until now is that RSocket lets you use its messaging models in either direction. Therefore, if you wanted to use the less common *'server-requests-a-client-stream'* model, that's no problem for RSocket. Plus, there are lots of non-java [RSocket implementations](https://rsocket.io/docs/Implementations) to choose from, including Go, Javascript, and .Net—ideal if your architecture includes platforms where Java isn't perhaps the best fit.

With that cleared up, follow the steps below to add the streaming data capability to your existing RSocket client and server code from previous posts.

> If you didn't read the previous posts on [server-side](https://spring.io/blog/2020/03/02/getting-started-with-rsocket-spring-boot-server), [client-side](https://spring.io/blog/2020/03/09/getting-started-with-rsocket-spring-boot-client) request-response messaging, or [fire-and-forget](...) now's your chance! The code sample is [on GitHub](https://github.com/benwilcock/spring-rsocket-demo).

#### [](#step-1-add-the-server-side-stream-method)Step 1: Add The Server-Side Stream Method

Working once more in your server-side `RSocketController` class, add a new method called `.stream()` with the signature — 'accept-an-object, return-a-flux' — which RSocket expects for this messaging model. Annotate this new method with the `@MessageMapping` annotation, specifying a suitable mapping name — such as `"stream"`. The sample code for the method is below:

```java
Copy    @MessageMapping("stream")
    Flux<Message> stream(Message request) {
        log.info("Received stream request: {}", request);
        return Flux
                .interval(Duration.ofSeconds(1))
                .map(index -> new Message(SERVER, STREAM, index))
                .log();
    }
```

> The `RSocketController` is in the `rsocket-server` folder in the `io.pivotal.rsocketserver` package.

The `.stream()` method's sole parameter, `Message`, comes from the `io.pivotal.rsocketserver.data` package discussed previously. This message forms the basis of the client's request for a data stream. The code above logs the client's request to the console as soon as it's received.

The `Flux` object returned by the method is part of [Project Reactor](https://projectreactor.io/) and is also used in the [reactive support](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/web-reactive.html#webflux-why-reactive) of the Spring Framework.

RSocket uses `Flux` because it dramatically simplifies the handling of reactive data streams. Flux is a "Publisher" of data. It describes streams of 0 to N elements and offers a great many operators for processing streaming data — similar to [Java 8's streaming APIs](https://www.oracle.com/technical-resources/articles/java/ma14-java-se-8-streams.html).

In the code above, a new `Long` element gets added to the Flux every second — set via the `.interval()` call — essentially providing a constant stream of data. The `.map()` function creates a new message object using the `Long` as the index value, and on the last line, the call to the `.log()` method prints all elements flowing through the Flux to the console, including errors etc.

#### [](#step-2-add-the-client-side-stream-method)Step 2: Add The Client-Side Stream Method

In the client-side project's `RSocketShellClient` class, first, add a global reference to a `Disposable` object like this:

```java
Copyprivate static Disposable disposable;
```

> The `RSocketShellClient` is in the `io.pivotal.rsocketclient` package in the `rsocket-client` folder.

This `Disposable` object allows you to control the data stream once it starts.

Next, add a `.stream()` method to your `RSocketShellClient`. Annotate this method with the `@ShellMethod` annotation. The sample code for this is below:

```java
Copy    @ShellMethod("Send one request. Many responses (stream) will be printed.")
    public void stream() {
        log.info("\nRequest-Stream. Sending one request. Waiting for unlimited responses (Stop process to quit)...");
        this.disposable = this.rsocketRequester
                .route("stream")
                .data(new Message(CLIENT, STREAM))
                .retrieveFlux(Message.class)
                .subscribe(er -> log.info("Response received: {}", er));
    }
```

In the code above, the `rsocketRequester` is told to route requests to the server's `.stream()` method by specifying `"stream"` as the `.route()`. A new message object provides the `.data()` for your request. Because you want the server to return a stream, you used the `.requestFlux()` method on the `rsocketRequester`, specifying that the `Flux` returned contains elements of type `Message`. Finally, you set a log function to act as your subscriber to the stream in the `.subscribe()` method.

> Notice how the `Disposable` produced by the `rsocketRequester` is being kept. You'll need it to stop the stream.

#### [](#step-3-add-the-client-side-stop-stream-method)Step 3: Add The Client Side Stop Stream Method

By keeping a reference to the stream, you can dispose of it when you want the streaming to stop. To add your stream canceling feature to your `RSocketShellClient`, add a new method called `.s()` and annotate it with `@ShellMethod` as follows:

```java
Copy    @ShellMethod("Stop streaming messages from the server.")
    public void s(){
        if(null != disposable){
            disposable.dispose();
        }
    }
```

Inside the method, calling `disposable.dispose()` cancels the stream. With this method in place, to stop the stream, type `s` at the `shell:>` prompt and then tap `Enter`. The stream will then stop. Your coding tasks are now complete. Next, test the client and server are working together.

#### [](#step-4-build-and-run-the-rsocket-server)Step 4: Build And Run The RSocket Server

Open a terminal window and move to the `rsocket-server` directory. Run the server using Maven and Spring Boot plugin as follows:

```bash
Copycd rsocket-server
./mvnw clean package spring-boot:run -DskipTests=true
```

The server starts up on `localhost` port `7000`.

#### [](#step-5-build-and-run-the-rsocket-client)Step 5: Build And Run The RSocket Client

Open a *second* terminal window and move to the `rsocket-client` directory. From there, build and run the RSocket client application as follows:

```bash
Copycd rsocket-client
./mvnw clean package spring-boot:run -DskipTests=true
```

Once booted, Spring Shell presents you with a new prompt:

```bash
Copyshell:>
```

You request a stream from the server by typing `stream` at the prompt. The client sends one `Message` as its request for a stream. Each `Message` in the steam gets printed both as the server sends it, and as the client receives it. The console log on the client looks something like this:

```none
Copyshell:>stream
Request-Stream. Sending one request. Waiting for responses (Type 's' to stop)...
New Response: Message(origin=Server, interaction=Stream, index=0, created=1583923683) (Type 's' to stop.)
New Response: Message(origin=Server, interaction=Stream, index=1, created=1583923684) (Type 's' to stop.)
New Response: Message(origin=Server, interaction=Stream, index=2, created=1583923685) (Type 's' to stop.)
New Response: Message(origin=Server, interaction=Stream, index=3, created=1583923686) (Type 's' to stop.)
```

To stop the stream, type `s` at the `shell:>` prompt and then tap `Enter`.

#### [](#step-5-tidy-up)Step 5: Tidy Up

You can stop the `rsocket-client` by typing `exit` at the `shell:>` prompt like this.

```bash
Copyshell:>exit
```

You can stop the `rsocket-server` process by pressing `Ctrl-C` in its terminal window.

#### [](#how-it-works)How It Works

The `.stream()` method in the `RSocketShellClient` uses the `RSocketRequester` to send a single request message to the server. This request initiates a stream of data from the server to the client. The client then logs every message it receives to the console.

The `RSocketController` on the server-side examines the request message's metadata for the `route`. The route was set to `"stream"` for this message, so the server passes the message to the corresponding `.stream(Message request)` method. The server then proceeds to send a stream of messages to the client every second until the client asks it to stop.

The client can stop the stream at any time. In the `.s()` method, this is done by calling `.dispose()` on the `Disposable` returned by the original stream subscription.

#### [](#final-thoughts)Final Thoughts

In this post, you learned how to build a request-stream capability with RSocket in Spring Boot. In the next post, we'll add channel messaging. See you next time!