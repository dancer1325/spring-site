---
title: Spring Framework 4.0 M2: WebSocket Messaging Architectures
source: https://spring.io/blog/2013/07/24/spring-framework-4-0-m2-websocket-messaging-architectures
scraped: 2026-02-24T08:01:33.582Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rossen Stoyanchev |  July 24, 2013 | 0 Comments
---

# Spring Framework 4.0 M2: WebSocket Messaging Architectures

_Engineering | Rossen Stoyanchev |  July 24, 2013 | 0 Comments_

As I [wrote previously](http://blog.springsource.org/2013/05/22/spring-framework-4-0-m1-websocket-support), a WebSocket API is only the starting point for WebSocket-style messaging applications. Many practical challenges remain. As one Tomcat mailing list user [mused recently](http://markmail.org/message/j2k2dtmbu4p2zgqd):

> it does seem to me that websockets is still not really "production-ready", (I am not talking about the Tomcat implementation per se, but more generally) ... native websockets capability in IE is only available since IE-10 and that solutions which allow this to work in lower IE versions are a bit "iffy" (relying on a diversion through Adobe's FlashPlayer e.g.). (Most of our customers are largish corporations, which are not going to update their browsers, nor open special ports in their firewalls, just to please us).

The first milestone of Spring Framework 4.0 provided server-side support for [SockJS](http://sockjs.org), the best and the most comprehensive WebSocket browser fallback options. You will need fallback options in browsers that don't support WebSocket and in situations where network proxies [prevent its use](http://www.infoq.com/articles/Web-Sockets-Proxy-Servers). Simply put SockJS enables you to build WebSocket applications today and rely on transparent fallback options when necessary.

Even with fallback options, bigger challenges remain. A socket is a very low-level abstraction and the vast majority of web applications today do not program to sockets. This is why the WebSocket protocol defines a sub-protocol mechanism that essentially enables, and encourages, the use of higher-level protocols over WebSocket, much like we use HTTP over TCP.

The second milestone of Spring Framework 4.0 enables the use of higher-level messaging protocols over WebSocket. To demonstrate this we've put together a sample application.

**Stock Portfolio Sample** The Stock Portfolio sample application, [available on Github](https://github.com/rstoyanchev/spring-websocket-portfolio), loads a user's portfolio positions, allows buying and selling shares, consumes price quotes, and displays position updates. It is a reasonably simple application. Yet it handles a number of common tasks that are likely to come up in browser-based messaging applications.

[![Snapshot of Stock Portfolio Application](http://blog.springsource.org/wp-content/uploads/2013/07/m2-stock-portfolio-application.png "Snapshot of Stock Portfolio Application")](http://blog.springsource.org/wp-content/uploads/2013/07/m2-stock-portfolio-application.png)

So how do we put together an application like that? From HTTP and REST we are used to relying on URLs along with HTTP verbs to express what needs to be done. Here we have a socket and lots of messages. How do you tell who a message is for and what the message means?

[![Browser and Server exchange messages but what's in the message?](http://blog.springsource.org/wp-content/uploads/2013/07/m2-message-format.png "Browser and Server exchange messages but what's in the message?")](http://blog.springsource.org/wp-content/uploads/2013/07/m2-message-format.png)

Browser and server must agree on a common message format before such semantics can be expressed. Several protocols exist that can help. We chose [STOMP](http://stomp.github.io/stomp-specification-1.2.html#Overview) for this milestone due to its simplicity and [wide support](http://stomp.github.io/implementations.html).

**Simple/Streaming Text-Oriented Messaging Protocol (STOMP)**

[STOMP](http://stomp.github.io/stomp-specification-1.2.html#Overview) is a messaging protocol created with simplicity in mind. It is based on frames modelled on HTTP. A frame consists of a command, optional headers, and optional body.

For example the Stock Portfolio application needs to receive stock quotes, so the client sends a `SUBSCRIBE` frame where the `destination` header indicates what the client wants to subscribe to:

```javascript
CopySUBSCRIBE  
id:sub-1  
destination:/topic/price.stock.*  
```

As stock quotes become available, the server sends a `MESSAGE` frame with a matching destination and subscription id as well as a content-type header and a body:

```javascript
CopyMESSAGE  
subscription:sub-1  
message-id:wm2si1tj-4  
content-type: application/json  
destination:/topic/stocks.PRICE.STOCK.NASDAQ.EMC  

{\"ticker\":\"EMC\",\"price\":24.19}  
```

To do all that in the browser we use [stomp.js](https://github.com/jmesnil/stomp-websocket/) and the [SockJS client](http://github.com/sockjs/sockjs-client):

```javascript
Copy
var socket = new SockJS('/spring-websocket-portfolio/portfolio');
var client = Stomp.over(socket);

var onConnect = function() {
  client.subscribe("/topic/price.stock.*", function(message) {
      // process quote
  });
};
client.connect('guest', 'guest', onConnect);
```

This is a huge gain already!! We have a standard message format and client-side support.

Now we can move one to the server side.

**Message-Broker Solution** One server-side option is a pure message-broker solution where messages are sent directly to a traditional message broker like RabbitMQ, ActiveMQ, etc. Most, if not all brokers, support STOMP over TCP but increasingly they support it over WebSocket too while RabbitMQ goes further and also supports SockJS. Our architecture would look like this:

[![Browser sends STOMP messages to broker, application connects to broker via AMQP or JMS](http://blog.springsource.org/wp-content/uploads/2013/07/me-broker-solution.png "Browser sends STOMP messages to broker, application connects to broker via AMQP or JMS")](http://blog.springsource.org/wp-content/uploads/2013/07/me-broker-solution.png)

This is a robust and scalable solution but arguably not the best fit for the problem at hand. Message brokers have typically been used within the enterprise. Exposing them directly over the web isn't ideal.

If we've learned anything from REST it is that we don't want to expose details about the internals of our system like the database or the domain model.

Furthermore, as a Java developer you want to apply security, validation, and add application logic. In a message-broker solution the application server sits behind the message broker, which is a significant departure from what most web application developer are used to.

This is why a library such as [socket.io](http://socket.io/) is popular. It is simple and it targets the needs of web applications. On other hand we must not ignore the capabilities of message brokers to handle messages, they are really good at it and messaging is a hard problem. We need the best of both.

**Application and Message-Broker Solution** Another approach is to make the application handle incoming messages and serve as intermediary between web clients and the message broker. Messages from clients can flow to the broker through the application and reversely messages from the broker can flow back to clients through the application. This gives the application a chance to examine the incoming [message type](http://stomp.github.io/stomp-specification-1.2.html#Client_Frames) and "destination" header and decide whether to handle the message or pass it on to the broker.

[![Browser sends messages to application that in turn sends messages to a message broker](http://blog.springsource.org/wp-content/uploads/2013/07/m2-app-server-broker.png "Browser sends messages to application that in turn sends messages to a message broker")](http://blog.springsource.org/wp-content/uploads/2013/07/m2-app-server-broker.png)

This is the approach we've chosen. To illustrate better here are some scenarios.

Load portfolio positions

-   Client requests portfolio positions
-   The application handles the request by loading and returning the data to the subscription
-   The message broker is not involved in this interaction

Subscribe for stock quotes

-   Client sends subscription request for stock quotes
-   The application passes the message to the message broker
-   The message broker propagates the message to all subscribed clients

Receive stock quotes

-   QuoteService sends stock quote message to the message broker
-   The message broker propagates the message to all subscribed clients

Execute a trade

-   Client sends trade request
-   The application handles it, submits the trade for execution through the `TradeService`
-   *The message broker is not involved in this interaction*

Receive position update

-   Trade service sends a position update message to a queue on the message broker
-   The message broker sends the position update to the client
-   *Sending messages to a specific user is covered in more detail further below*

Strictly speaking the use of a message broker is optional. We provide an out-of-the-box "simple" alternative for getting-started. However the use of a message broker is recommended for scalability and for deployments with multiple application servers.

**Code Snippets** Let's see some examples of client and server-side code.

This is [portfolio.js](https://github.com/rstoyanchev/spring-websocket-portfolio/blob/master/src/main/webapp/assets/js/portfolio.js) requesting portfolio positions:

```javascript
CopystompClient.subscribe("/app/positions", function(message) {
  self.portfolio().loadPositions(JSON.parse(message.body));
});
```

On the server side [PortfolioController](https://github.com/rstoyanchev/spring-websocket-portfolio/blob/master/src/main/java/org/springframework/samples/portfolio/web/PortfolioController.java) detects the request and returns portfolio positions demonstrating a request-reply interaction that is very common in web applications. Since we use Spring Security to protect HTTP requests, including the one leading to the WebSocket handshake, the `principal` method argument below is taken from the user principal Spring Security set on the HttpServletRequest.

```java
Copy@Controller
public class PortfolioController {

  // ...

  @SubscribeEvent("/app/positions")
  public List<PortfolioPosition> getPortfolios(Principal principal) {
    String user = principal.getName();
    Portfolio portfolio = this.portfolioService.findPortfolio(user);
    return portfolio.getPositions();
  }
}
```

This is `portfolio.js` sending a trade request:

```javascript
CopystompClient.send("/app/trade", {}, JSON.stringify(trade));
```

On the server side `PortfolioController` sends the trade for execution:

```java
Copy@Controller
public class PortfolioController {

  // ...

  @MessageMapping(value="/app/trade")
  public void executeTrade(Trade trade, Principal principal) {
    trade.setUsername(principal.getName());
    this.tradeService.executeTrade(trade);
  }
}
```

`PortfolioController` can also handle unexpected exceptions by sending a message to the user.

```java
Copy@Controller
public class PortfolioController {

  // ...

  @MessageExceptionHandler
  @ReplyToUser(value="/queue/errors")
  public String handleException(Throwable exception) {
    return exception.getMessage();
  }
}
```

What about sending messages from within the application to subscribed clients? This is how the `QuoteService` sends quotes:

```java
Copy@Service
public class QuoteService {

  private final MessageSendingOperations<String> messagingTemplate;

  @Scheduled(fixedDelay=1000)
  public void sendQuotes() {
    for (Quote quote : this.quoteGenerator.generateQuotes()) {
      String destination = "/topic/price.stock." + quote.getTicker();
      this.messagingTemplate.convertAndSend(destination, quote);
    }
  }
}
```

And this is how the `TradeService` sends position updates after a trade is executed:

```java
Copy@Service
public class TradeService {

  // ...

  @Scheduled(fixedDelay=1500)
  public void sendTradeNotifications() {
    for (TradeResult tr : this.tradeResults) {
      String queue = "/queue/position-updates";
      this.messagingTemplate.convertAndSendToUser(tr.user, queue, tr.position);
    }
  }
}
```

And just in case you're wondering... yes `PortfolioController` can also contain Spring MVC methods (e.g. `@RequestMapping`) as suggested [in this ticket](https://jira.springsource.org/browse/SPR-9356?focusedCommentId=88191&page=com.atlassian.jira.plugin.system.issuetabpanels:comment-tabpanel#comment-88191) by a developer who previously built an online game application:

> Yes, having \[message\] mappings and spring mvc mappings consolidated would be nice. There is no reason why they can't be unified.

And just like the QuoteService and TradeService, Spring MVC controller methods can publish messages too.

**Messaging Support For Spring Applications** For a long time [Spring Integration](http://www.springsource.org/spring-integration) has provided first-class abstractions for the well-known [Enterprise Integration patterns](http://www.eaipatterns.com/) as well as lightweight messagings. While working on this milestone we realized the latter was exactly what we needed to build on.

As a result I'm pleased to announce we've moved a selection of Spring Integration types to the Spring Framework into a new module predictably called [spring-messaging](https://github.com/SpringSource/spring-framework/tree/master/spring-messaging/src/main/java/org/springframework/messaging). Besides core abstractions such as `Message`, `MessageChannel`, `MessageHandler`, and others, the new module contains all the annotations and classes to support the new features described in this post.

With that in mind we can now look at a diagram of the internal architecture of the Stock Portfolio application:

[![Diagram of internal architecture with message broker](http://blog.springsource.org/wp-content/uploads/2013/07/m2-internal-architecture.png "Diagram of internal architecture with message broker")](http://blog.springsource.org/wp-content/uploads/2013/07/m2-internal-architecture.png)

`StompWebSocketHandler` puts incoming client messages on the "dispatch" message channel. There are 3 subscribers to this channel. The first one delegates to annotated methods, the second relays messages to a STOMP message broker, while the third one handles messages to individual users by transforming the destination into a unique queue name to which the client is subscribed (more detail to come).

By default the application runs with a "simple" message broker provided as a getting-started option. As explained in the sample [README/a>, you can alternate between the "simple" and a full-featured message broker by activating and de-activating profiles.](https://github.com/rstoyanchev/spring-websocket-portfolio)

[](https://github.com/rstoyanchev/spring-websocket-portfolio)

[](https://github.com/rstoyanchev/spring-websocket-portfolio)[![Diagram of internal architecture with simple broker](http://blog.springsource.org/wp-content/uploads/2013/07/m2-simple-broker.png "Diagram of internal architecture with simple broker")](http://blog.springsource.org/wp-content/uploads/2013/07/m2-simple-broker.png)

Another possible configuration change is to switch from [Executor](http://docs.oracle.com/javase/7/docs/api/java/util/concurrent/Executor.html) to [Reactor](https://github.com/reactor/reactor)\-based implementations of MessageChannel for message passing. The Reactor project that recently released a [first milestone](http://blog.springsource.org/2013/07/18/reactor-1-0-0-m1-a-foundation-for-asynchronous-fast-data-applications-on-the-jvm/) is also used to manage TCP connections between the application and the message broker.

You can see the [full application configuration](https://github.com/rstoyanchev/spring-websocket-portfolio/blob/master/src/main/java/org/springframework/samples/portfolio/config) that also includes the new [Spring Security Java configuration](http://blog.springsource.org/2013/07/11/spring-security-java-config-preview-readability/). You might also be interested in the [improved STS support](http://blog.springsource.org/2013/07/18/javaconfig-support-in-the-spring-tool-suite/) for Java configuration.

**Sending Messages To a Single User** It is easy to see how messages can be broadcast to multiple subscribed clients, just publish a message to a topic. It is more difficult to see how to send a message to a specific user. For example you may catch an exception and would like to send an error message. Or you may have received a trade confirmation and would like to send it to the user.

In traditional messaging applications it is common to create a temporary queue and set a "reply-to" header on any message to which a reply is expected. This works but feels rather cumbersome in web applications. The client must remember to set the necessary header on all applicable messages and the server application may need to keep track and pass this around. Sometimes such information may simply not be readily available, e.g. while handling an HTTP POST as an alternative to passing messages.

To support this requirement, we send a unique queue suffix to every connected client. The suffix can then be appended to create unique queue names.

```javascript
Copyclient.connect('guest', 'guest', function(frame) {

  var suffix = frame.headers['queue-suffix'];

  client.subscribe("/queue/error" + suffix, function(msg) {
    // handle error
  });

  client.subscribe("/queue/position-updates" + suffix, function(msg) {
    // handle position update
  });

});
```

Then on the server-side an `@MessageExceptionHandler` method (or any message-handling method) can add an `@ReplyToUser` annotation to send the return value as a message.

```java
Copy@MessageExceptionHandler
@ReplyToUser(value="/queue/errors")
public String handleException(Throwable exception) {
  // ...
}
```

All other classes, like the TradeService, can use a messaging template to achieve the same.

```java
CopyString user = "fabrice";
String queue = "/queue/position-updates";
this.messagingTemplate.convertAndSendToUser(user, queue, position);
```

In both cases internally we locate the user queue suffix (through the configured [UserQueueSuffixResolver](https://github.com/SpringSource/spring-framework/blob/master/spring-messaging/src/main/java/org/springframework/messaging/simp/handler/UserQueueSuffixResolver.java)) in order to reconstruct the correct queue name. At the moment there is only one simple resolver implementation. However, it would be easy to add a [Redis](http://redis.io/) implementation that would support the same feature regardless of whether the user is connected to this or another application server.

**Conclusion** Hopefully this has been a useful introduction of the new functionality. Rather than making the post longer, I encourage you to [check the sample](https://github.com/rstoyanchev/spring-websocket-portfolio) and consider what it means for applications you write or intend to write. It is a perfect time for feedback as we work towards a release candidate in early September.

To use Spring Framework 4.0.0.M2 add the [](http://repo.springsource.org/libs-milestone)[http://repo.springsource.org/libs-milestone](http://repo.springsource.org/libs-milestone) or the [](http://repo.springsource.org/milestone)[http://repo.springsource.org/milestone](http://repo.springsource.org/milestone) repositories to your configuration. The former includes transient dependencies as explained in our [Repository FAQ](https://github.com/SpringSource/spring-framework/wiki/SpringSource-repository-FAQ).

## [](#springone-2gx-2013-is-around-the-corner)SpringOne 2GX 2013 is around the corner

Book your place at [SpringOne in Santa Clara](http://www.springone2gx.com/conference/santa_clara/2013/09/home) soon. It's simply the best opportunity to find out first hand all that's going on and to provide direct feedback. Expect a number of significant new announcements this year. Check recent blog posts to see what I mean and there is more to come!