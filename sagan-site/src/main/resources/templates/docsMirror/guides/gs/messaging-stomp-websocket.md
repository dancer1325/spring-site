---
title: Getting Started | Using WebSocket to build an interactive web application
source: https://spring.io/guides/gs/messaging-stomp-websocket
scraped: 2026-02-19T08:00:24.476Z
description: Learn how to the send and receive messages between a browser and the server over a WebSocket
---

# Using WebSocket to build an interactive web application

This guide walks you through the process of creating a “Hello, world” application that sends messages back and forth between a browser and a server. WebSocket is a thin, lightweight layer above TCP. This makes it suitable for using “subprotocols” to embed messages. In this guide, we use [STOMP](http://en.wikipedia.org/wiki/Streaming_Text_Oriented_Messaging_Protocol) messaging with Spring to create an interactive web application. STOMP is a subprotocol operating on top of the lower-level WebSocket.

## What You Will Build

You will build a server that accepts a message that carries a user’s name. In response, the server will push a greeting into a queue to which the client is subscribed.

## What You Need

-   About 15 minutes
    
-   A favorite text editor or IDE
    
-   [Java 17](https://www.oracle.com/java/technologies/downloads/) or later
    
-   [Gradle 7.5+](https://gradle.org/install/) or [Maven 3.5+](https://maven.apache.org/download.cgi)
    
-   You can also import the code straight into your IDE:
    
    -   [Spring Tool Suite (STS)](/guides/gs/sts)
        
    -   [IntelliJ IDEA](/guides/gs/intellij-idea/)
        
    -   [VSCode](/guides/gs/guides-with-vscode/)
        
    

## How to complete this guide

Like most Spring [Getting Started guides](/guides), you can start from scratch and complete each step or you can bypass basic setup steps that are already familiar to you. Either way, you end up with working code.

To **start from scratch**, move on to [Starting with Spring Initializr](#scratch).

To **skip the basics**, do the following:

-   [Download](https://github.com/spring-guides/gs-messaging-stomp-websocket/archive/main.zip) and unzip the source repository for this guide, or clone it using Git: `git clone [https://github.com/spring-guides/gs-messaging-stomp-websocket.git](https://github.com/spring-guides/gs-messaging-stomp-websocket.git)`
    
-   cd into `gs-messaging-stomp-websocket/initial`
    
-   Jump ahead to [Create a Resource Representation Class](#initial).
    

**When you finish**, you can check your results against the code in `gs-messaging-stomp-websocket/complete`.

## Starting with Spring Initializr

You can use this [pre-initialized project](https://start.spring.io/#!type=maven-project&groupId=com.example&artifactId=messaging-stomp-websocket&name=messaging-stomp-websocket&description=Demo%20project%20for%20Spring%20Boot&packageName=com.example.messaging-stomp-websocket&dependencies=websocket) and click Generate to download a ZIP file. This project is configured to fit the examples in this tutorial.

To manually initialize the project:

1.  Navigate to [https://start.spring.io](https://start.spring.io). This service pulls in all the dependencies you need for an application and does most of the setup for you.
    
2.  Choose either Gradle or Maven and the language you want to use. This guide assumes that you chose Java.
    
3.  Click **Dependencies** and select **Websocket**.
    
4.  Click **Generate**.
    
5.  Download the resulting ZIP file, which is an archive of a web application that is configured with your choices.
    

If your IDE has the Spring Initializr integration, you can complete this process from your IDE.

You can also fork the project from Github and open it in your IDE or other editor.

## Create a Resource Representation Class

Now that you have set up the project and build system, you can create your STOMP message service.

Begin the process by thinking about service interactions.

The service will accept messages that contain a name in a STOMP message whose body is a JSON object. If the name is `Fred`, the message might resemble the following:

```
Copy{
    "name": "Fred"
}
```

To model the message that carries the name, you can create a plain old Java object with a `name` property and a corresponding `getName()` method, as the following listing (from `src/main/java/com/example/messagingstompwebsocket/HelloMessage.java`) shows:

```
Copypackage com.example.messagingstompwebsocket;

public class HelloMessage {

  private String name;

  public HelloMessage() {
  }

  public HelloMessage(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
```

Upon receiving the message and extracting the name, the service will process it by creating a greeting and publishing that greeting on a separate queue to which the client is subscribed. The greeting will also be a JSON object, which as the following listing shows:

```
Copy{
    "content": "Hello, Fred!"
}
```

To model the greeting representation, add another plain old Java object with a `content` property and a corresponding `getContent()` method, as the following listing (from `src/main/java/com/example/messagingstompwebsocket/Greeting.java`) shows:

```
Copypackage com.example.messagingstompwebsocket;

public class Greeting {

  private String content;

  public Greeting() {
  }

  public Greeting(String content) {
    this.content = content;
  }

  public String getContent() {
    return content;
  }

}
```

Spring will use the [Jackson JSON](https://github.com/FasterXML/jackson) library to automatically marshal instances of type `Greeting` into JSON.

Next, you will create a controller to receive the hello message and send a greeting message.

## Create a Message-handling Controller

In Spring’s approach to working with STOMP messaging, STOMP messages can be routed to [`@Controller`](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/stereotype/Controller.html) classes. For example, the `GreetingController` (from `src/main/java/com/example/messagingstompwebsocket/GreetingController.java`) is mapped to handle messages to the `/hello` destination, as the following listing shows:

```
Copypackage com.example.messagingstompwebsocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GreetingController {

  @MessageMapping("/hello")
  @SendTo("/topic/greetings")
  public Greeting greeting(HelloMessage message) throws Exception {
    Thread.sleep(1000); // simulated delay
    return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
  }

}
```

This controller is concise and simple, but plenty is going on. We break it down step by step.

The [`@MessageMapping`](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/messaging/handler/annotation/MessageMapping.html) annotation ensures that, if a message is sent to the `/hello` destination, the `greeting()` method is called.

The payload of the message is bound to a `HelloMessage` object, which is passed into `greeting()`.

Internally, the implementation of the method simulates a processing delay by causing the thread to sleep for one second. This is to demonstrate that, after the client sends a message, the server can take as long as it needs to asynchronously process the message. The client can continue with whatever work it needs to do without waiting for the response.

After the one-second delay, the `greeting()` method creates a `Greeting` object and returns it. The return value is broadcast to all subscribers of `/topic/greetings`, as specified in the [`@SendTo`](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/messaging/handler/annotation/SendTo.html) annotation. Note that the name from the input message is sanitized, since, in this case, it will be echoed back and re-rendered in the browser DOM on the client side.

## Configure Spring for STOMP messaging

Now that the essential components of the service are created, you can configure Spring to enable WebSocket and STOMP messaging.

Create a Java class named `WebSocketConfig` that resembles the following listing (from `src/main/java/com/example/messagingstompwebsocket/WebSocketConfig.java`):

```
Copypackage com.example.messagingstompwebsocket;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

  @Override
  public void configureMessageBroker(MessageBrokerRegistry config) {
    config.enableSimpleBroker("/topic");
    config.setApplicationDestinationPrefixes("/app");
  }

  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/gs-guide-websocket");
  }

}
```

`WebSocketConfig` is annotated with `@Configuration` to indicate that it is a Spring configuration class. It is also annotated with [`@EnableWebSocketMessageBroker`](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/messaging/simp/config/EnableWebSocketMessageBroker.html). As its name suggests, `@EnableWebSocketMessageBroker` enables WebSocket message handling, backed by a message broker.

The `configureMessageBroker()` method implements the default method in `WebSocketMessageBrokerConfigurer` to configure the message broker. It starts by calling `enableSimpleBroker()` to enable a simple memory-based message broker to carry the greeting messages back to the client on destinations prefixed with `/topic`. It also designates the `/app` prefix for messages that are bound for methods annotated with `@MessageMapping`. This prefix will be used to define all the message mappings. For example, `/app/hello` is the endpoint that the `GreetingController.greeting()` method is mapped to handle.

The `registerStompEndpoints()` method registers the `/gs-guide-websocket` endpoint for websocket connections.

## Create a Browser Client

With the server-side pieces in place, you can turn your attention to the JavaScript client that will send messages to and receive messages from the server side.

Create an `index.html` file similar to the following listing (from `src/main/resources/static/index.html`):

```
Copy<!DOCTYPE html>
<html>
<head>
    <title>Hello WebSocket</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link href="/main.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@stomp/stompjs@7.0.0/bundles/stomp.umd.min.js"></script>
    <script src="/app.js"></script>
</head>
<body>
<noscript><h2 style="color: #ff0000">Seems your browser doesn't support Javascript! Websocket relies on Javascript being
    enabled. Please enable
    Javascript and reload this page!</h2></noscript>
<div id="main-content" class="container">
    <div class="row">
        <div class="col-md-6">
            <form class="form-inline">
                <div class="form-group">
                    <label for="connect">WebSocket connection:</label>
                    <button id="connect" class="btn btn-default" type="submit">Connect</button>
                    <button id="disconnect" class="btn btn-default" type="submit" disabled="disabled">Disconnect
                    </button>
                </div>
            </form>
        </div>
        <div class="col-md-6">
            <form class="form-inline">
                <div class="form-group">
                    <label for="name">What is your name?</label>
                    <input type="text" id="name" class="form-control" placeholder="Your name here...">
                </div>
                <button id="send" class="btn btn-default" type="submit">Send</button>
            </form>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <table id="conversation" class="table table-striped">
                <thead>
                <tr>
                    <th>Greetings</th>
                </tr>
                </thead>
                <tbody id="greetings">
                </tbody>
            </table>
        </div>
    </div>
</div>
</body>
</html>
```

This HTML file imports the [`StompJS`](https://stomp-js.github.io/) javascript library that will be used to communicate with our server through STOMP over websocket. We also import `app.js`, which contains the logic of our client application. The following listing (from `src/main/resources/static/app.js`) shows that file:

```
Copyconst stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:8080/gs-guide-websocket'
});

stompClient.onConnect = (frame) => {
    setConnected(true);
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/greetings', (greeting) => {
        showGreeting(JSON.parse(greeting.body).content);
    });
};

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    stompClient.activate();
}

function disconnect() {
    stompClient.deactivate();
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.publish({
        destination: "/app/hello",
        body: JSON.stringify({'name': $("#name").val()})
    });
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $( "#connect" ).click(() => connect());
    $( "#disconnect" ).click(() => disconnect());
    $( "#send" ).click(() => sendName());
});
```

The main pieces of this JavaScript file to understand are the `stompClient.onConnect` and `sendName` functions.

`stompClient` is initialized with `brokerURL` referring to path `/gs-guide-websocket`, which is where our websockets server waits for connections. Upon a successful connection, the client subscribes to the `/topic/greetings` destination, where the server will publish greeting messages. When a greeting is received on that destination, it will append a paragraph element to the DOM to display the greeting message.

The `sendName()` function retrieves the name entered by the user and uses the STOMP client to send it to the `/app/hello` destination (where `GreetingController.greeting()` will receive it).

The `main.css` can be omitted if you like, or you can create an empty one, just so the `<link>` can be resolved.

## Make the Application Executable

Spring Boot creates an application class for you. In this case, it needs no further modification. You can use it to run this application. The following listing (from `src/main/java/com/example/messagingstompwebsocket/MessagingStompWebsocketApplication.java`) shows the application class:

```
Copypackage com.example.messagingstompwebsocket;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MessagingStompWebsocketApplication {

  public static void main(String[] args) {
    SpringApplication.run(MessagingStompWebsocketApplication.class, args);
  }
}
```

`@SpringBootApplication` is a convenience annotation that adds all of the following:

-   `@Configuration`: Tags the class as a source of bean definitions for the application context.
    
-   `@EnableAutoConfiguration`: Tells Spring Boot to start adding beans based on classpath settings, other beans, and various property settings. For example, if `spring-webmvc` is on the classpath, this annotation flags the application as a web application and activates key behaviors, such as setting up a `DispatcherServlet`.
    
-   `@ComponentScan`: Tells Spring to look for other components, configurations, and services in the `com/example` package, letting it find the controllers.
    

The `main()` method uses Spring Boot’s `SpringApplication.run()` method to launch an application. Did you notice that there was not a single line of XML? There is no `web.xml` file, either. This web application is 100% pure Java and you did not have to deal with configuring any plumbing or infrastructure.

### Build an executable JAR

You can run the application from the command line with Gradle or Maven. You can also build a single executable JAR file that contains all the necessary dependencies, classes, and resources and run that. Building an executable jar makes it easy to ship, version, and deploy the service as an application throughout the development lifecycle, across different environments, and so forth.

If you use Gradle, you can run the application by using `./gradlew bootRun`. Alternatively, you can build the JAR file by using `./gradlew build` and then run the JAR file, as follows:

java -jar build/libs/gs-messaging-stomp-websocket-0.0.1-SNAPSHOT.jar

If you use Maven, you can run the application by using `./mvnw spring-boot:run`. Alternatively, you can build the JAR file with `./mvnw clean package` and then run the JAR file, as follows:

java -jar target/gs-messaging-stomp-websocket-0.0.1-SNAPSHOT.jar

Logging output is displayed. The service should be up and running within a few seconds.

## Test the service

Now that the service is running, point your browser at [http://localhost:8080](http://localhost:8080) and click the **Connect** button.

Upon opening a connection, you are asked for your name. Enter your name and click **Send**. Your name is sent to the server as a JSON message over STOMP. After a one-second simulated delay, the server sends a message back with a “Hello” greeting that is displayed on the page. At this point, you can send another name or you can click the **Disconnect** button to close the connection.

## Summary

Congratulations! You have just developed a STOMP-based messaging service with Spring.

## See Also

The following guides may also be helpful:

-   [StompJS client library docs](https://stomp-js.github.io/)
    
-   [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
    
-   [Building an Application with Spring Boot](https://spring.io/guides/gs/spring-boot/)
    

Want to write a new guide or contribute to an existing one? Check out our [contribution guidelines](https://github.com/spring-guides/getting-started-guides/wiki).

All guides are released with an ASLv2 license for the code, and an [Attribution, NoDerivatives creative commons license](https://creativecommons.org/licenses/by-nd/3.0/) for the writing.

## Get the Code

[Go To Repo](https://github.com/spring-guides/gs-messaging-stomp-websocket)