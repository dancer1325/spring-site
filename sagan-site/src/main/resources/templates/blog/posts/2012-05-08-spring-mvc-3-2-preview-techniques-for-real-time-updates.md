---
title: Spring MVC 3.2 Preview: Techniques for Real-time Updates
source: https://spring.io/blog/2012/05/08/spring-mvc-3-2-preview-techniques-for-real-time-updates
scraped: 2026-02-24T08:22:42.100Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rossen Stoyanchev |  May 08, 2012 | 2 Comments
---

# Spring MVC 3.2 Preview: Techniques for Real-time Updates

_Engineering | Rossen Stoyanchev |  May 08, 2012 | 2 Comments_

***Last updated on November 5th, 2012 (Spring MVC 3.2 RC1)***

In my last post I [introduced](https://spring.io/blog/2012/05/07/spring-mvc-3-2-preview-introducing-servlet-3-async-support/) the new Servlet 3 based, async support in Spring MVC 3.2 and talked about long-running requests. A second very important motivation for async processing is the need for browsers to receive real-time updates. Examples include chatting in a browser, stock quotes, status updates, live sports results, and others. To be sure not all examples are equally delay-sensitive but all of them share a similar need.

In standard HTTP request-response semantics a browser initiates a request and the server sends a response, which means the server can't send new information until it has a request from the browser. Several approaches have evolved including *traditional polling*, *long polling*, and *HTTP streaming* and most recently we have the *WebSocket* protocol.

**Traditional Polling**

The browser keeps sending requests to check for new information and the server responds immediately each time. This fits scenarios where polling can be done at reasonably sparse intervals. For example a mail client can check for new messages every 10 minutes. It's simple and it works. However, the approach becomes inefficient when new information must be shown as soon as possible in which case polling must be very frequent.

**Long Polling**

The browser keeps sending requests but the server doesn't respond until it has new information to send. From a client perspective this is identical to traditional polling. From a server perspective this is very similar to a long-running request and can be scaled using the technique discussed in Part 1.

How long can the response remain open? Browsers are set to time out after 5 minutes and network intermediaries such as proxies can time out even sooner. So even if no new information arrives, a long polling request should complete regularly to allow the browser to send a new request. This [IETF document](http://tools.ietf.org/html/rfc6202) recommends using a timeout value between 30 and 120 seconds but the actual value to use will likely depend on how much control you have over network intermediaries that separate the browser from server.

Long polling can dramatically reduce the number of requests required to receive information updates with low latency, especially where new information becomes available at irregular intervals. However, the more frequent the updates are the closer it gets to traditional polling.

**HTTP Streaming**

The browser sends a request to the server and the server responds when it has information to send. However, unlike long polling, the server keeps the response open and continues to send more updates as they arrive. The approach removes the need for polling but is also a more significant departure from typical HTTP request-response semantics. For example the client and server need to agree how to interpret the response stream so that the client will know where one update ends and another begins. Furthermore, network intermediaries can cache the response stream which thwarts the intent of the approach. This is why long polling is more commonly used today.

**WebSocket Protocol**

The browser sends an HTTP request to the server to switch to the WebSocket protocol and the server responds by confirming the upgrade. Thereafter browser and server can send data frames in both directions over a TCP socket.

The WebSocket protocol was designed to replace the need for polling and is specifically suited for scenarios where messages need to be exchanged between browser and server at a high frequency. The initial handshake over HTTP ensures WebSocket requests can go through firewalls. However, there are also significant challenges since a majority of deployed browsers do not support WebSockets and there are [further issues](http://www.infoq.com/articles/Web-Sockets-Proxy-Servers) with getting through network intermediaries.

WebSockets revolves around the two way exchange of text or binary messages. It leads to a significantly different approach from a RESTful, HTTP-based architecture. In fact there is a need for some another protocol on top of WebSockets, e.g. XMPP, AMQP, STOMP, or other and which one(s) will become predominant remains to be seen.

The [WebSocket protocol](http://tools.ietf.org/html/rfc6455) is already standardized by the IETF while the [WebSocket API](http://www.w3.org/TR/websockets) is in the final stages of being standardized by W3C. A number of Java implementations have become available including servlet containers like Jetty and Tomcat. The Servlet 3.1 spec will likely support the initial WebSocket upgrade request while a separate [JSR-356](http://jcp.org/en/jsr/detail?id=356) will define a Java-based WebSocket API.

Coming back to Spring MVC 3.2, the Servlet 3 async feature can be used for long-running requests and also for HTTP streaming, techniques Filip Hanik [referred to](http://www.tomcatexpert.com/blog/2012/04/24/websockets-tomcat-7) as "the server version of client AJAX calls". As for WebSockets, there is no support yet in Spring 3.2 but it will most likely be included in Spring 3.3. You can watch [SPR-9356](https://jira.springsource.org/browse/SPR-9356) for progress updates.

[The next post](http://blog.springsource.org/2012/05/10/spring-mvc-3-2-preview-making-a-controller-method-asynchronous/) turns to sample code and explains in more detail the new Spring MVC 3.2 feature.