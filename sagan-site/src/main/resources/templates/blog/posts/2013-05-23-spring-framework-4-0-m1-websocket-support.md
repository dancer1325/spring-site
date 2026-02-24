---
title: Spring Framework 4.0 M1: WebSocket Support
source: https://spring.io/blog/2013/05/23/spring-framework-4-0-m1-websocket-support
scraped: 2026-02-24T08:04:58.512Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rossen Stoyanchev |  May 23, 2013 | 11 Comments
---

# Spring Framework 4.0 M1: WebSocket Support

_Engineering | Rossen Stoyanchev |  May 23, 2013 | 11 Comments_

As you may have seen, the first milestone of Spring Framework 4.0 was [already announced](http://blog.springsource.org/2013/05/21/spring-framework-4-0-m1-3-2-3-available/) and with it we've released early WebSocket support. Why WebSocket matters? It enables efficient, two-way communication over the web that is essential in applications where messages need to be exchanged between client (typically browser) and server at high frequency and with low latency. Common examples include trading, games, collaboration, data visualization, and others but the range of scenarios and use cases will grow over time.

WebSocket is a very broad subject! You can watch our [“Intro to WebSocket”](http://www.infoq.com/presentations/Introduction-WebSocket) on InfoQ from SpringOne 2012 for a more thorough introduction. To put it simply being able to use a WebSocket is only the start. You'll need a fallback strategy for browsers that don't support it yet (e.g. IE < 10) and for network proxies that preclude its use. Furthermore, programming to a socket is very, very low level. Most applications will benefit from a higher level programming model. This is also acknowledged in the WebSocket protocol through a mechanism that enables the use of a “sub-protocol” (i.e. a higher level protocol) much like today we all use HTTP, not a raw TCP socket. Example sub-protocols include [STOMP](http://stomp.github.io/), [WAMP](http://wamp.ws/), and many others.

Keep in mind that this is an early release. It focuses on fundamentals including JSR-356 support and fallback options for use within browsers. There is no sub-protocol support yet. That is the goal of the next milestone release.

**Java API for WebSocket (JSR-356)**

The Java API for WebSocket was recently finalized and is part of Java EE 7. It defines two kinds of endpoints -- sub-classes of `Endpoint` as well as annotated endpoints, i.e. `@ClientEndpoint` and `@ServerEndpoint`. A proper introduction is beyond the scope of this post. I will only mention the minimum needed to understand how to configure and use endpoints in a Spring application.

There are two ways to deploy server endpoints in JSR-356 -- through a Servlet container scan (Servlet 3.0 feature) and programmatically at startup. For the Servlet container scan, the spec requires annotated endpoints to have a default constructor. Endpoint sub-classes however cannot be deployed automatically. Instead the Servlet container scan detects `ServerApplicationConfig` types that in turn are expected to supply `Server/ClientEndpointConfig` for every `Endpoint`.

Before you try to make sense of all this, what you probably want to know is how it relates to your Spring application. The M1 release provides full support for initializing both kinds of endpoints through Spring including proper constructor dependency injection as well as per-connection and singleton endpoint lifecycle. Furthermore, you should be able to turn off the Servlet container scan, which is rather heavyweight and scans all classes including 3rd party dependencies.

*Show me the code!*

To initialize an annotated endpoint with Spring, simply configure a `SpringConfigurator` in the type-level annotation:

```java
Copy
import javax.websocket.server.ServerEndpoint;
import org.springframework.web.socket.server.endpoint.SpringConfigurator;

@ServerEndpoint(value = "/echo", configurator = SpringConfigurator.class)
public class EchoEndpoint {

  private final EchoService echoService;

  @Autowired
  public EchoEndpoint(EchoService echoService) {
    this.echoService = echoService;
  }

  @OnMessage
  public void handleMessage(Session session, String message) {
    // ...
  }

}
```

The above code does assume that `SpringContextLoaderListener` is used to load Spring configuration but that is typically the case in web applications. Apart from that nothing further is required. The Servlet container scan finds the annotated endpoint and `SpringConfigurator` initializes a new instance per WebSocket session, which is also the default lifecycle defined in the spec.

If you want to use a single instance or want to turn off the Servlet container scan, declare `EchoEndpoint` as a Spring bean and also add a (one time!) bean declaration for `ServerEndpointExporter`. The example below uses [Spring’s Java Configuration](http://static.springsource.org/spring/docs/current/javadoc-api/org/springframework/context/annotation/Configuration.html) but you could also add equivalent declarations to XML-based configuration:

```java
Copy
import org.springframework.web.socket.server.endpoint.ServerEndpointExporter;

@Configuration
public class EndpointConfig {

  @Bean
  public EchoEndpoint echoEndpoint() {
    return new EchoEndpoint(echoService());
  }

  @Bean
  public EchoService echoService() {
    // ...
  }

  @Bean
  public ServerEndpointExporter endpointExporter() {
    return new ServerEndpointExporter();
  }

}
```

Endpoint sub-classes can be deployed via `EndpointRegistration` along with a (one time!) declaration of `ServerEndpointExporter`:

```java
Copy
import org.springframework.web.socket.server.endpoint.ServerEndpointExporter;
import org.springframework.web.socket.server.endpoint.ServerEndpointRegistration;

@Configuration
public class EndpointConfig {

  @Bean
  public EndpointRegistration echoEndpoint() {
    return new EndpointRegistration("/echo", EchoEndpoint.class);
  }

  @Bean
  public ServerEndpointExporter endpointExporter() {
    return new ServerEndpointExporter();
  }

  // ..

}
```

`EndpointRegistration` also has a constructor accepting an endpoint instance. This allows you to choose between having a new instance per WebSocket session or a single instance serving all sessions.

*What about the client side?*

JSR-356 provides the following API for connecting to servers:

```java
Copy
WebSocketContainer container = ContainerProvider.getWebSocketContainer();
container.connectToServer(EchoEndpoint.class, new URI("ws:localhost:8080/webapp/echo"));
```

This is simple enough but it would be nice if we could also make it declarative. A common use case is -- whenever the web application starts, it should automatically connect to a remote endpoint, start processing messages and stop when the application shuts down.

You can do that with a connection manager as shown below where the WebSocket connection is established and closed when the Spring ApplicationContext is refreshed or closed respectively:

```java
Copy
import org.springframework.web.socket.client.endpoint.AnnotatedEndpointConnectionManager;

@Configuration
public class EndpointConfig {

  // For Endpoint sub-classes use EndpointConnectionManager instead

  @Bean
  public AnnotatedEndpointConnectionManager connectionManager() {
    return new AnnotatedEndpointConnectionManager(echoEndpoint(), "ws://localhost:8080/webapp/echo");
  }

  @Bean
  public EchoEndpoint echoEndpoint() {
    // ...
  }

}
```

You can also use the `autoStartup` property to enable/disable automatic connection. If disabled, you can manually invoke `start()` and `stop()`.

This concludes the JSR-356 support overview.

**Spring WebSocket API**

In addition to JSR-356 support, this release provides the beginnings of a Spring WebSocket API which leads to some obvious questions.

Why our own API? We use it internally as the basis for higher-level services such as SockJS. It allows us to plug additional Java WebSocket implementations and add additional features where possible. JSR-356 for example does not provide a way to initiate a WebSocket handshake from an existing Servlet, which we found very useful when adding SockJS support. Furthermore although Jetty does not yet provide JSR-356 support, we were able to plug the (all new) Jetty 9 WebSocket API and include Jetty 9 support in this release. We may stick to using the Jetty 9 API directly going forward since it provides a richer set of WebSocket configuration and processing options and is likely to be updated much more often than the Java API for WebSocket.

Why type-based only (i.e. no annotations)? The Spring WebSocket API targets framework use primarily. Applications can use it of course but we believe programming to a socket is too low level for most applications to organize their logic and provide robust message handling. To better appreciate this point, consider that if an application exposes a single WebSocket connection (as it should in most cases) it would have to deal with all application message types from a single class. Even with annotations that doesn't scale to the complexity of real-world applications. Imagine REST without the nouns (URLs) and the verbs (HTTP methods), just a raw socket. This is why sub-protocol support and a higher level programming model are pretty essential and that's where we're more likely to have annotations.

Hopefully that takes care of the “why” questions. Now let’s see some code.

The central interface in the Spring WebSocket API is `WebSocketHandler`. Below is an implementation of it for processing text messages where the base class has empty methods except for rejecting binary messages by closing the session with status 1003 (not acceptable) as defined in the protocol:

```java
Copy
import org.springframework.web.socket.adapter.TextWebSocketHandlerAdapter;

public class EchoHandler extends TextWebSocketHandlerAdapter {

  @Override
  public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    session.sendMessage(message);
  }

}
```

Note that `handleTextMessage` allows Exception propagation. This is different from JSR-356, which doesn't. If an Exception (or Throwable) escapes the method, the session is automatically closed with status 1011 (server error). That means you can choose to deal with the exception, if there is anything meaningful to do about it, or otherwise let it be dealt with in a default manner. Default exception handling is provided through a `WebSocketHandlerDecorator` mechanism. It can be extended and/or replaced. These are just a couple of examples of what having our own API enables us to do.

A `WebSocketHandler` handler can be plugged into Spring MVC via `WebSocketHttpRequestHandler`:

```java
Copy
import org.springframework.web.socket.server.support.WebSocketHttpRequestHandler;

@Configuration
public class WebConfig {

  @Bean
  public SimpleUrlHandlerMapping handlerMapping() {

    Map<String, Object> urlMap = new HashMap<String, Object>();
    urlMap.put("/echo", new WebSocketHttpRequestHandler(new EchoHandler()));

    SimpleUrlHandlerMapping hm = new SimpleUrlHandlerMapping();
    hm.setUrlMap(urlMap);
    return hm;
  }

}
```

**SockJS Fallback Options**

SockJS is a browser JavaScript library that provides a WebSocket-like programming model and a range of browser-specific transports that can be used if WebSocket is not supported in the browser, or [network issues](http://www.infoq.com/articles/Web-Sockets-Proxy-Servers) preclude its use. We are pleased to announce SockJS support in this release. For more details on SockJS and the various transport options, visit the [sockjs-client](https://github.com/sockjs/sockjs-client) project page.

To enable SockJS support, simply declare a `SockJsService`, map it to some URL, and provide a `WebSocketHandler` for handling incoming messages. Note that the `WebSocketHandler` is the same handler discussed above. In other words when using SockJS, the programming model remains the same but the underlying transport may change to HTTP streaming, long polling, or something else as necessary.

```java
Copy
import org.springframework.web.socket.sockjs.SockJsService;
// ...

@Configuration
public class WebConfig {

  @Bean
  public SimpleUrlHandlerMapping handlerMapping() {

    SockJsService sockJsService = new DefaultSockJsService(taskScheduler());

    Map<String, Object> urlMap = new HashMap<String, Object>();
    urlMap.put("/echo/**", new SockJsHttpRequestHandler(sockJsService, new EchoHandler()));

    SimpleUrlHandlerMapping hm = new SimpleUrlHandlerMapping();
    hm.setUrlMap(urlMap);
    return hm;
  }

  @Bean
  public ThreadPoolTaskScheduler taskScheduler() {
    ThreadPoolTaskScheduler taskScheduler = new ThreadPoolTaskScheduler();
    taskScheduler.setThreadNamePrefix("SockJS-");
    return taskScheduler;
  }

}
```

In case you're wondering the task scheduler above is used for various SockJS-related tasks such as sending periodic heartbeat messages on HTTP streaming requests (to prevent proxies from thinking the connection is stale), removing expired SockJS sessions, etc.

**In Closing**

A project with samples and instructions can be [found on Github](https://github.com/rstoyanchev/spring-websocket-test). It includes examples of configuring JSR-356 endpoints, Spring WebSocketHandler, as well as a SockJS service. For all examples I recommend using the Network tab of Google Chrome's developer tools in order to watch WebSocket and HTTP traffic, observe errors, etc.

If you have feedback or comments we'd love to hear it!