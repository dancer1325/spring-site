---
title: Getting Started With RSocket: Spring Boot Channels
source: https://spring.io/blog/2020/04/06/getting-started-with-rsocket-spring-boot-channels
scraped: 2026-02-23T14:05:32.642Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Wilcock |  April 06, 2020 | 1 Comment
---

# Getting Started With RSocket: Spring Boot Channels

_Engineering | Ben Wilcock |  April 06, 2020 | 1 Comment_

**Reading Time: about 6 minutes. Practice Time: about 20 minutes.**

If, like me, you're still at the beginning of your RSocket journey, check out the [motivations behind the RSocket protocol](https://github.com/rsocket/rsocket/blob/master/Motivations.md). This short but insightful document includes one message that resonates very strongly with me — 'a mismatched abstraction increases the cost of developing a system.'

From a software design point of view, RSocket's four interaction models offer a significant benefit. It means we can model our component-to-component communications using the correct interaction model for each use case. This more productive model could save you lots of time and energy when coding!

So far, in this series, we've already explored [request](https://spring.io/blog/2020/03/09/getting-started-with-rsocket-spring-boot-client)\-[response](https://spring.io/blog/2020/03/02/getting-started-with-rsocket-spring-boot-server), [fire-and-forget](https://spring.io/blog/2020/03/16/getting-started-with-rsocket-spring-boot-fire-and-forget), and [request-stream](https://spring.io/blog/2020/03/23/getting-started-with-rsocket-spring-boot-request-stream) messaging. Today you'll add *channels* to your client and server code.

### [](#what-are-channels)What Are Channels?

Channels are bi-directional pipes that allow streams of data to flow in either direction. With channels, a data stream from client-to-server can coexist alongside a data stream from server-to-client. Channels have many real-world uses. Channels could carry video conferencing streams, send and receive two-way chat messages, synchronize data using deltas and diffs, or provide a means to report, observe, and monitor your system.

Channels in RSocket are no more complicated than streams or request-response. That said, the scenario you'll implement below is slightly more complicated than you've attempted previously, so it's best to understand it before you begin.

In the exercise that follows, the server streams messages to the client. The client controls the frequency of the messages in the server's stream. It does this using a stream of 'delay' settings. The settings in the client's stream tell the server how long the pause should be between each message it sends. Think of it as a message frequency dial. With the frequency setting high, the pause is shorter, so you’ll see lots of server-sent messages. With the frequency setting low, the pause is longer, so you’ll see fewer server-sent messages. With that outcome in mind, let's start coding.

> The full code sample is available on [GitHub](https://github.com/benwilcock/spring-rsocket-demo). The `RSocketController` is in the `rsocket-server` folder in the `io.pivotal.rsocketserver` package. The `RSocketShellClient` is in the `rsocket-client` folder in the `io.pivotal.rsocketclient` package.

### [](#step-1-add-the-channel-method-to-the-rsocketcontroller)Step 1: Add The Channel Method To The `RSocketController`

In the server-side `RSocketController` class, add a method called `channel()` which accepts a `Flux<Duration>` and returns a `Flux<Message>`. This method signature — flux-in, flux out — identifies this method as an RSocket channel method. Annotate the method with `@MessageMapping()` using the value `"channel"`. The code for this method is below.

```java
Copy    @MessageMapping("channel")
    Flux<Message> channel(final Flux<Duration> settings) {
        return settings
                    .doOnNext(setting -> log.info("\nFrequency setting is {} second(s).\n", setting.getSeconds()))
                    .switchMap(setting -> Flux.interval(setting)
                                                   .map(index -> new Message(SERVER, CHANNEL, index)))
                                                   .log();
    }
```

In the code, the `.doOnNext()` is listening to the stream of settings coming from the client. Each time a new `delay` setting arrives, it writes a message to the log. The `.switchMap()` creates a new Flux for each new setting. This new flux emits a new `Message` object based on the `.interval()` delay contained in the `delay` setting. The server sends these new messages back to the client in the stream.

### [](#step-2-add-the-channel-method-to-the-rsocketshellclient)Step 2: Add The Channel Method To The `RSocketShellClient`

In the client-side `RSocketShellClient` class, add a new `channel()` method and annotate it with the `@ShellMethod()` annotation. Add a description of the method's purpose as the annotation value, as shown in the example below.

```java
Copy    @ShellMethod("Stream some settings to the server. Stream of responses will be printed.")
    public void channel(){

// Code goes here

}
```

Next, in the method, add the code that creates the stream of settings. The code looks like this:

```java
CopyMono<Duration> setting1 = Mono.just(Duration.ofSeconds(1));
Mono<Duration> setting2 = Mono.just(Duration.ofSeconds(3)).delayElement(Duration.ofSeconds(5));
Mono<Duration> setting3 = Mono.just(Duration.ofSeconds(5)).delayElement(Duration.ofSeconds(15));

Flux<Duration> settings = Flux.concat(setting1, setting2, setting3)
                                        .doOnNext(d -> log.info("\nSending setting for {}-second interval.\n", d.getSeconds()));
```

Each `Mono` contains a single `Duration` setting. Each duration controls the pause between each message coming from the server. There are 3 monos in total. The first contains a short pause setting of 1 second. The second has a more relaxed pause setting of 3 seconds, but this mono is told to delay the production of this duration by 5 seconds using the `.delayElement()` method. The third mono contains a pause setting of 5 seconds, but won't emit its duration until 15 seconds have passed. These 3 mono's get concatenated into a single `Flux` using the `.concat()` method. A logging statement is added using `.doOnNext()` so you can see what's happening when the code is running.

> Note: There are many ways to build a `Flux` based stream, but for this tutorial, it’s just something simple.

Now you have the stream of settings inside the flux, add to the method the code required to communicate with the server:

```java
Copydisposable = this.rsocketRequester
                    .route("channel")
                    .data(settings)
                    .retrieveFlux(Message.class)
                    .subscribe(message -> log.info("Received: {} \n(Type 's' to stop.)", message));
```

If you've been following the series, this code looks familiar by now. The `rsocketRequester` is a global variable you built in the constructor. It provides your RSocket communication link with the server. The `.route()` is set to `"channel"` to match the message mapping in the server-side code. The `.data()` is the stream of mono's you created above. The `.retrieveFlux()` is specifying that you expect a stream of `Message` objects, and the `.subscribe()` begins your subscription and ensures that each message received is printed to the log so you can see what's happening. The `Disposable` object created by the subscription is kept and used to control the channel.

You can see the complete code for the method [here](https://github.com/benwilcock/spring-rsocket-demo/blob/master/rsocket-client/src/main/java/io/pivotal/rsocketclient/RSocketShellClient.java). That's all the code we need. Let's run it!

### [](#step-3-build-and-run-the-rsocket-server)Step 3: Build And Run The RSocket Server

Open a terminal window and move to the `rsocket-server` directory and run the server as follows:

```bash
Copycd rsocket-server
./mvnw clean package spring-boot:run -DskipTests=true
```

The server starts up on `localhost` port `7000`.

### [](#step-4-build-and-run-the-rsocket-client)Step 4: Build And Run The RSocket Client

Open a *second* terminal window and move to the `rsocket-client` directory. From there, build and run the client as follows:

```bash
Copycd rsocket-client
./mvnw clean package spring-boot:run -DskipTests=true
```

Once booted, Spring Shell presents you with a new prompt:

```bash
Copyshell:>
```

You request a channel from the server by typing `channel` at the prompt.

The client creates its stream of delay timer settings and begins to send them to the server. Each duration in the outbound steam gets printed by the client and the server. The server sends back a stream of messages, which the client prints out to the log. The terminal on the client-side looks something like this:

```none
Copyshell:>channel
i.p.rsocketclient.RSocketShellClient :

Sending setting for 1-second interval.

i.p.rsocketclient.RSocketShellClient : Received: Message(origin=Server, interaction=Channel, index=0, created=1585304561)
(Type 's' to stop.)

# removed log-lines

i.p.rsocketclient.RSocketShellClient :

Sending setting for 3-second interval.

i.p.rsocketclient.RSocketShellClient : Received: Message(origin=Server, interaction=Channel, index=0, created=1585304568)
(Type 's' to stop.)

# removed log-lines

i.p.rsocketclient.RSocketShellClient :

Sending setting for 5-second interval.

2020-03-27 10:23:00.243 INFO 5680 --- [tor-tcp-epoll-1] i.p.rsocketclient.RSocketShellClient : Received: Message(origin=Server, interaction=Channel, index=4, created=1585304580)
(Type 's' to stop.)

# removed log-lines
```

To stop the channeling, type `s` and then tap `Enter`.

### [](#step-5-tidy-up)Step 5: Tidy Up

You can exit the `rsocket-client` by typing `exit` at the `shell:>` prompt like this.

```bash
Copyshell:>exit
```

You can stop the `rsocket-server` process by pressing `Ctrl-C` in its terminal window.

### [](#how-it-works)How It Works

The client creates a sequence of 3 duration elements. The first duration setting gets emitted immediately, the second after 5 seconds have passed, and the third after 15 seconds have passed. Each time a new duration is emitted, it’s logged to the console. This stream of settings gets sent to the server and controls the server's generated stream of messages.

On the server-side, every time a new duration setting gets extracted from the client’s stream, a new stream of messages is created and returned. The most recent setting sent from the client controls the time delay between each message in this server-sent stream.

The channeling stops when the subscription's disposable object is disposed of by the client.

### [](#final-thoughts)Final Thoughts

If you followed the whole series, you've now seen all four of [RSocket's](https://rsocket.io/) interaction models in action: [request](https://spring.io/blog/2020/03/09/getting-started-with-rsocket-spring-boot-client)\-[response](https://spring.io/blog/2020/03/02/getting-started-with-rsocket-spring-boot-server), [fire-and-forget](https://spring.io/blog/2020/03/16/getting-started-with-rsocket-spring-boot-fire-and-forget), [request-stream](https://spring.io/blog/2020/03/23/getting-started-with-rsocket-spring-boot-request-stream), and now channels too.

With these four communication styles at your disposal, you're far less likely to encounter one of those pesky 'mismatched abstraction' scenarios we discussed at the beginning. With RSocket in your toolbox, you’ll have a flexible, low friction, high-performance messaging protocol you can use in your software — one that’s purpose-built for microservice architectures.