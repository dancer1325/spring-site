---
title: Getting Started With RSocket: Spring Boot Server
source: https://spring.io/blog/2020/03/02/getting-started-with-rsocket-spring-boot-server
scraped: 2026-02-23T14:00:04.235Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Wilcock |  March 02, 2020 | 12 Comments
---

# Getting Started With RSocket: Spring Boot Server

_Engineering | Ben Wilcock |  March 02, 2020 | 12 Comments_

**Time: approximately 15 mins.**

In the diverse world of microservices, HTTP is the undisputed leader in agent-to-agent communications. It’s mature, well established, and everywhere. But in some cases, HTTP request-response can be cumbersome. What if you need communication patterns beyond traditional request-response, such as fire-and-forget or streaming? And what if you want to send messages in either direction?

With HTTP, there are ways to achieve this but it’s not what the protocol was built for. Many of the solutions come with additional tradeoffs or shortcomings. Plus, here’s no rulebook that says “thou shalt always use HTTP”, messaging protocols like AMQP proved that already. So, it’s good to know what your options are, and healthy to add a few new technologies to your list every once in a while. This post is about one such alternative—RSocket.

[RSocket](http://rsocket.io/) is a new messaging protocol that's designed to solve some common microservice communication challenges. With RSocket you get a flexible protocol that works over TCP or WebSockets. This means you can do binary messages without conversion. You get modern controls like multiplexing, back-pressure, resumption, and routing, and you get multiple messaging modes including fire-and-forget, request-response, and streaming. RSocket is fully [reactive](https://projectreactor.io/) too, so it's ideal for your high-throughput microservice applications. Early adopters include Netflix, Pivotal, Alibaba, and Facebook—all of them experts in delivering scalable Internet-based services.

In this post—which is the first in a series—you'll learn how to get started with RSocket. You’ll become familiar with how it works, and experience some of its power. By the end of the series, you’ll have added RSocket to your skillset so that next time you’re figuring out your options, you’ll have one more protocol to choose from.

# [](#lets-get-started)Let’s Get Started...

As request-response is familiar ground for most web developers, we’ll begin our journey into RSocket with this pattern. The semantics of request-response are fairly straightforward, you send one request, you get one response. HTTP is built on this basic interaction and it’s incredibly common.

In this tutorial, you’ll discover how to do request-response with RSocket using Spring Boot as your server and a terminal application as your client.

> Request-response is just one of the four interaction models supported by Spring and RSocket. We’ll cover the others in future posts.

When you follow the steps below, you'll notice that the amount of code required to build an RSocket server with Spring Boot is very small. The code has been provided for you [here](https://github.com/benwilcock/spring-rsocket-demo) but you prefer you could also write the code from scratch yourself in a few minutes.

# [](#step-1-setup-your-environment)Step 1: Setup Your Environment

First, check you have the following prerequisites installed:

1.  A [Java SDK](https://adoptopenjdk.net/) of version 8 or above (to check, use java -version at the terminal)
2.  A working [Java IDE](https://spring.io/tools) (I’m using IntelliJ IDEA)
3.  A folder containing the cloned or extracted [demo code sample](https://github.com/benwilcock/spring-rsocket-demo).
4.  Linux Bash/ZSH shell (if you're a Windows user, check the note below)

> If you’re a Windows user, switch to Microsoft's [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/faq). Microsoft's instructions on how to do this are [here](https://docs.microsoft.com/en-us/windows/wsl/install-win10).

Now, Make the downloaded project folder your current directory in the terminal:

```bash
Copycd spring-rsocket-demo
```

Next, download the excellent [RSocket Client CLI](https://github.com/making/rsc) by [Toshiaki Maki](https://github.com/making) into the `rsocket-server` folder of your cloned or extracted code. There is an official RSocket CLI [elsewhere](https://github.com/rsocket/rsocket-cli), but Toshiaki’s is a little easier to use. In the terminal, download the JAR file as follows:

```bash
Copycd rsocket-server
wget -O rsc.jar https://github.com/making/rsc/releases/download/0.4.2/rsc-0.4.2.jar
```

You will use this client later to talk to the RSocket server, but for now, test it’s working by calling the help command like this:

```bash
Copyjava -jar rsc.jar --help
```

You should see some output like that below (which I've truncated), explaining the command's usage and options.

```none
Copyusage: rsc Uri [Options]

Non-option arguments:
[String: Uri]

Option                              Description
------                              -----------
--channel                           Shortcut of --im REQUEST_CHANNEL
-d, --data [String]                 Data. Use '-' to read data from

...
```

Leave this terminal window open, you'll need it later.

# [](#step-2-examine-the-server-code)Step 2: Examine the Server Code

Open the rsocket-server project in your IDE and examine the code. As you can see, there is very little code required to stand up an RSocket server in Spring Boot. Here are some highlights:

#### [](#the-project-file)The Project File

In the project's `pom.xml` file, you can see the `<dependencies>` required by the Spring Boot RSocket server. Spring Boot version `2.2.5.RELEASE` is used because, at the time of writing, this version has the most production-ready RSocket features. The project also depends on `lombok` and the `spring-boot-starter-rsocket` library. Lombok adds constructors, getters, setters, and equals to Java data classes and also eases access to things like logs. The Spring Boot Starter for RSocket integrates RSocket with Spring Boot and automatically configures some RSocket infrastructure for you at runtime.

#### [](#the-application-properties)The Application Properties

In the `application.properties` file, the TCP port for the RSocket server is set to `7000`, and Spring Boot's lazy initialization feature is switched on.

```java
Copyspring.rsocket.server.port=7000
spring.main.lazy-initialization=true
```

#### [](#the-message-class)The Message Class

The first class to take a look at in more detail is called `Message.java`. This Lombok `@Data` class is used to model the request and response messages between the client and the server (or the ‘requester’ and ‘responder’ if you prefer). The class looks like this…

```java
Copy@Data
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    private String origin;
    private String interaction;
    private long index;
    private long created = Instant.now().getEpochSecond();

    public Message(String origin, String interaction) {
        this.origin = origin;
        this.interaction = interaction;
        this.index = 0;
    }

    public Message(String origin, String interaction, long index) {
        this.origin = origin;
        this.interaction = interaction;
        this.index = index;
    }
}
```

Using this class, you can say where a message came from (its `origin`), which messaging style it was intended to use (the `interaction`), and which sequence number a message has in a sequence of messages (its `index`). Lombok simplifies the code by providing constructors, getters, setters, toString, and hashcode implementations.

#### [](#the-controller-class)The Controller Class

The RSocket server controller code can be found in the `RSocketController.java` file. This class is annotated as a Spring `@Controller` which essentially means that it declares service endpoints—in this case, RSocket endpoints.

```java
Copy@Controller
public class RSocketController {

    @MessageMapping("request-response")
    Message requestResponse(Message request) {
            log.info("Received request-response request: {}", request);
            // create a single Message and return it
            return new Message(SERVER, RESPONSE);
    }
}
```

Inside the class, there is a method called `requestResponse()` which accepts a single `Message` object (the request) and returns a single `Message` object (the response).

You'll notice that this `requestResponse()` method is decorated with the `@MessageMapping("request-response")` annotation. This annotation declares that any messages with metadata containing the RSocket route of `request-response` should be handled by this method. You will use this route later when you send a request message from your client.

> Did you notice how this is slightly different from Spring’s REST controllers? With REST controllers, URL path mappings like `/hello` are used to associate HTTP calls with their handler methods.

That's it for code. Let's try it.

# [](#step-3-start-the-spring-boot-rsocket-server)Step 3: Start The Spring Boot RSocket Server

Leaving your existing terminal window open, in a second terminal window, make the `rsocket-server` folder your current directory. Then build and run the RSocket server using the following command:

```bash
Copy./mvnw clean package spring-boot:run -DskipTests=true
```

> Alternatively, you can use the "Build" and "Run" commands in your Java IDE if you prefer.

# [](#step-4-send-a-command-to-the-server-with-the-rsocket-cli)Step 4: Send A Command To The Server With The RSocket CLI

Next, you’ll send a message to the running server using the RSocket client `rsc.jar` that you downloaded and tested in Step 1. Go back to the original terminal window where you had the `--help` text and issue the following command:

```bash
Copyjava -jar rsc.jar --debug --request --data "{\"origin\":\"Client\",\"interaction\":\"Request\"}" --route request-response tcp://localhost:7000
```

You’ll notice that the command has an RSocket message route declared (which is achieved by adding the `--route` option and specifying a name for the route). In this case, the route is `request-response` which matches the `@MessageMapping` declared in the request-response handler method in the `RSocketController.java`.

When the command runs, you will see some debug information in the terminal window explaining what happened during the request-response interaction. It looks something like this:

```none
Copy2020-02-27 11:20:21.806 DEBUG --- [actor-tcp-nio-1] i.r.FrameLogger : sending ->
Frame => Stream ID: 1 Type: REQUEST_RESPONSE Flags: 0b100000000 Length: 69
Metadata:
         +-------------------------------------------------+
         |  0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f |
+--------+-------------------------------------------------+----------------+
|00000000| 10 72 65 71 75 65 73 74 2d 72 65 73 70 6f 6e 73 |.request-respons|
|00000010| 65                                              |e               |
+--------+-------------------------------------------------+----------------+
Data:
         +-------------------------------------------------+
         |  0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f |
+--------+-------------------------------------------------+----------------+
|00000000| 7b 22 6f 72 69 67 69 6e 22 3a 22 43 6c 69 65 6e |{"origin":"Clien|
|00000010| 74 22 2c 22 69 6e 74 65 72 61 63 74 69 6f 6e 22 |t","interaction"|
|00000020| 3a 22 52 65 71 75 65 73 74 22 7d                |:"Request"}     |
+--------+-------------------------------------------------+----------------+
2020-02-27 11:20:21.927 DEBUG --- [actor-tcp-nio-1] i.r.FrameLogger : receiving ->
Frame => Stream ID: 1 Type: NEXT_COMPLETE Flags: 0b1100000 Length: 81
Data:
         +-------------------------------------------------+
         |  0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f |
+--------+-------------------------------------------------+----------------+
|00000000| 7b 22 6f 72 69 67 69 6e 22 3a 22 53 65 72 76 65 |{"origin":"Serve|
|00000010| 72 22 2c 22 69 6e 74 65 72 61 63 74 69 6f 6e 22 |r","interaction"|
|00000020| 3a 22 52 65 73 70 6f 6e 73 65 22 2c 22 69 6e 64 |:"Response","ind|
|00000030| 65 78 22 3a 30 2c 22 63 72 65 61 74 65 64 22 3a |ex":0,"created":|
|00000040| 31 35 38 32 38 30 32 34 32 31 7d                |1582802421}     |
+--------+-------------------------------------------------+----------------+
{"origin":"Server","interaction":"Response","index":0,"created":1582802421}
```

The debug output you see is split into three 'message frames'. The first message frame is labeled `Metadata`. In this case, it shows the routing metadata (`request-response`) being sent to the server. The second frame shows the `Data` message that the client is sending to the server (a JSON string). The third frame shows the server's response message back to the client (also a JSON string).

On the very last line, you can see the JSON formatted response from the server printed in isolation, confirming that our command message was successfully received and acknowledged by the server:

```bash
Copy{"origin":"Server","interaction":"Response","index":0,"created":1582802421}
```

Congratulations! You're done. You just sent a request-response message using RSocket. You can now stop the RSocket server by pressing `Ctrl-C` in the terminal window or by closing it. If you used your IDE to run the RSocket server, you can stop the process in your IDE in the usual way.

# [](#how-it-works)How It Works

The RSocket `rsc` client that you downloaded sends a request message to the `RSocketController` using the RSocket messaging protocol. The message is sent over TCP to the address `tcp://localhost:7000` where the server is waiting.

A message routing instruction is sent in the first message frame. This routing instruction is set using the `--route` option of the CLI client and is set to `request-response`. Spring uses this routing information to select the correct `@MessageMapping` endpoint to call, in this case, the `requestResponse(Message request)` method. The method then responds with a message of its own. The CLI client prints the whole interaction in the terminal window as a series of message frames.

# [](#wrapping-up)Wrapping Up

If you followed along, you saw just how easy it is to code a simple RSocket server using Spring Boot. You examined the Java code required and then started the Spring Boot server locally. You then sent a message to the RSocket server and observed the response. You also learned how it's possible to route your RSocket messages in Spring using the RSocket message routing feature. In the next post, you’ll learn [how to start building your own RSocket client using Spring Boot](https://spring.io/blog/2020/03/09/getting-started-with-rsocket-spring-boot-client).