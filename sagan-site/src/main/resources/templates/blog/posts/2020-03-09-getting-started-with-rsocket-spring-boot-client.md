---
title: Getting Started With RSocket: Spring Boot Client
source: https://spring.io/blog/2020/03/09/getting-started-with-rsocket-spring-boot-client
scraped: 2026-02-23T14:07:25.721Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Wilcock |  March 09, 2020 | 6 Comments
---

# Getting Started With RSocket: Spring Boot Client

_Engineering | Ben Wilcock |  March 09, 2020 | 6 Comments_

**Time: approximately 15 mins.**

In the [previous article](https://spring.io/blog/2020/03/02/getting-started-with-rsocket-spring-boot-server), you saw how Spring Boot simplifies the task of writing RSocket servers. But what about RSocket clients? In this article, you’ll learn how to write your own RSocket client and then use this new client to send request-response messages to your RSocket-server. Let’s get started!

This tutorial uses the Linux shell. For details on how to run a Linux shell on Windows, see [this Microsoft tutorial](https://docs.microsoft.com/en-us/windows/wsl/install-win10).

# [](#step-1-create-a-new-spring-boot-project-for-your-client)Step 1: Create A New Spring Boot Project For Your Client

It’s fun to write your own code, so for your RSocket client let’s start from scratch.

> If this is too much hassle for you, or you don’t have the time right now, then you can find the code in the rsocket-client folder of the [demo code repository](https://github.com/benwilcock/spring-rsocket-demo).

Open your browser and navigate to start.spring.io then use the following settings to create a new Spring Boot project:

-   Project: `Maven`
-   Language: `Java`
-   Spring Boot: `2.2.5` (or whichever is the latest GA version)
-   Group: `io.pivotal`
-   Artifact: `rsocket-client`
-   Dependencies: `RSocket`, `Lombok`

Click the green **“Generate”** button. Download the ZIP file and extract the project into a folder, then open the extracted project in your favorite Java IDE.

# [](#step-2-add-spring-shell-to-the-project)Step 2: Add Spring Shell To The Project

[Spring Shell](https://docs.spring.io/spring-shell/docs/2.0.0.RELEASE/reference/htmlsingle/) helps you write simple terminal programs using Spring Boot. At the time of writing, the Spring Initializr doesn’t offer a Spring Shell option, but you can still use it by adding the dependency to your project manually.

Open the Maven `pom.xml` file in your IDE, and add the following xml into the `<dependencies>` section:

```xml
Copy<dependency>
    <groupId>org.springframework.shell</groupId>
    <artifactId>spring-shell-starter</artifactId>
    <version>2.0.0.RELEASE</version>
</dependency>
```

This will enable Spring Shell in your new RSocket client project.

# [](#step-3-write-the-code)Step 3: Write The Code

There are a few short coding tasks required to add Spring Shell and RSocket support to your new RSocket client application. They are as follows:

#### [](#delete-the-test)Delete The Test

You can delete the auto-generated `RsocketclientApplicationTests` test class. If you don’t, odd things might happen when you run the Spring ‘integration’ test. For details, see the notes section [here in the Spring Shell Docs](https://docs.spring.io/spring-shell/docs/2.0.0.RELEASE/reference/htmlsingle/#_adding_a_dependency_on_spring_shell).

#### [](#copy-the-message-class-from-the-server-code)Copy The Message Class From The Server Code

Copy over the `Message.java` data class from the `io.pivotal.rsocketserver.data` package. This package is in the `rsocket-server` project folder you worked on in the [previous article](https://spring.io/blog/2020/03/02/getting-started-with-rsocket-spring-boot-server). You need this class in order to exchange messages with the server.

#### [](#create-the-rsocketshellclient-class)Create The RSocketShellClient Class

In the `io.pivotal.rsocketclient` package, create a new class called `RSocketShellClient` and annotate this class with the `@Slf4j` and `@ShellComponent` annotations. The first annotation tells Lombok to add logging features to this class and the second tells Spring that you are building a Shell-based component.

```java
Copy@Slf4j
@ShellComponent
public class RSocketShellClient {
 // Your code will go here...
}
```

#### [](#set-up-your-rsocketrequester)Set Up Your RSocketRequester

The RSocket client needs to know where it can find and communicate with the RSocket server. Spring RSocket support is autoconfigured by Spring Boot, you just have to build a customized `RSocketRequester`. You can do this by adding a class constructor and using the `RSocketRequester.Builder` as follows:

```java
Copy// Add a global class variable for the RSocketRequester
private final RSocketRequester rsocketRequester;

// Use an Autowired constructor to customize the RSocketRequester and store a reference to it in the global variable
@Autowired
public RSocketShellClient(RSocketRequester.Builder rsocketRequesterBuilder) {
    this.rsocketRequester = rsocketRequesterBuilder
            .connectTcp("localhost", 7000).block();
}
```

The requester’s `connectTcp()` method needs to know the IP address and port of your RSocket server, and you need to tell the requester to `block()` until a connection is established. After that, you’re ready to communicate with the RSocket server over TCP.

#### [](#add-a-request-response-shell-method)Add A Request-Response Shell Method.

Adding shell capabilities in Spring Shell components is fairly straightforward. First of all, add a public `requestResponse()` method returning `void` to the `RSocketShellClient`, and use the `@ShellMethod` annotation over the method signature to activate Spring Shell and declare the help text that users will see if they type `help`.

Inside the method, use the global reference to the `RSocketRequester` and set the `route()` to `"request-response"`, the `data()` to be a new `Message` instance, and tell the requester to `retrieveMono()` of type `Message`. Finally, add a simple logging function to the `subscribe()` method. The code for this is as follows:

```java
Copy    @ShellMethod("Send one request. One response will be printed.")
    public void requestResponse() throws InterruptedException {
        log.info("\nSending one request. Waiting for one response...");
        Message message = this.rsocketRequester
                .route("request-response")
                .data(new Message(CLIENT, REQUEST))
                .retrieveMono(Message.class)
                .block();
        log.info("\nResponse was: {}", message);
    }
```

> RSocket is designed to deal with long-running, asynchronous streams of data. This is most effectively done using the functional programming style that you’re already familiar with from the [Java 8 Stream API](https://www.oracle.com/technical-resources/articles/java/ma14-java-se-8-streams.html).

The code above states what you'd like to happen when (and only when) there is messaging work to be done. In this case, you've committed to sending one request message, routed to the server's `"request-response"` handler method, and you expect one response message in return. This process is triggered by the call to the `block()` method. Without it, nothing will happen.

That's it for coding. Let's run it!

# [](#step-4-build-and-run-the-rsocket-server)Step 4: Build And Run The RSocket Server

As our server, you're going to use the code from the [previous article](https://spring.io/blog/2020/03/02/getting-started-with-rsocket-spring-boot-server). Open a terminal window and move to the `rsocket-server` directory and then run the server code using the Maven wrapper like this:

````bash
Copycd rsocket-server
./mvnw clean package spring-boot:run -DskipTests=true
```bash

The server will start up on `localhost` port `7000` and wait for your client to connect.

# Step 5: Build And Run The RSocket Client

To run your RSocket client, open a second terminal window and move to your `rsocket-client` directory. From there, build and run the client as follows:

```bash
cd rsocket-client
./mvnw clean package spring-boot:run -DskipTests=true
````

When the client finishes starting up, you will be presented with a new command line prompt like this:

**`shell:>`**

You can use this prompt to issue commands to your Spring application similar to issuing commands via a regular terminal app.

Let's send a request message to the server and watch for a response. Do this by typing `request-response` at the prompt. You will then see the request and response messages being sent and received like this:

```none
Copyshell:>request-response
Sending one request. Waiting for one response...
Response was: Message(origin=Server, interaction=Response, index=0, created=1582558295)
shell:>
```

> I’ve omitted much of the log detail here for brevity. Your output will be more verbose than shown, but the outcome will be the same.

You can now stop your `rsocket-client` by typing `exit` at the `shell:>` prompt. You can stop the `rsocket-server` by pressing `Ctrl-C` in its terminal window, or by closing it.

# [](#how-it-all-works)How It All Works

Spring Shell allows you to build and run terminal-like programs using Spring Boot. In the constructor of your shell component, you configured an `RSocketRequester` to communicate with your server using TCP on localhost port 7000.

You then created a `requestResponse()` method in your shell component and annotated it so that when you typed `request-response` at the shell prompt, Spring Shell invoked this method.

When the `requestResponse()` method was called, the client sent some metadata describing the `route` to use, and then it sent the request as a `Message` object. The server’s response message was printed on the screen using a simple logging statement.

# [](#thats-it-youre-done)That’s It, You're Done!

In this article, you learned how to write a simple RSocket client using Spring Shell. This new client communicates with your RSocketServer over TCP. In the next article, we’ll cover fire-and-forget messages with RSocket and Spring Boot by adding extra functionality to both your client and your server projects.