---
title: Spring MVC 3.2 Preview: Chat Sample
source: https://spring.io/blog/2012/05/16/spring-mvc-3-2-preview-chat-sample
scraped: 2026-02-24T08:22:10.203Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rossen Stoyanchev |  May 16, 2012 | 3 Comments
---

# Spring MVC 3.2 Preview: Chat Sample

_Engineering | Rossen Stoyanchev |  May 16, 2012 | 3 Comments_

***Last updated on November 5th, 2012 (Spring MVC 3.2 RC1)***

[In](http://blog.springsource.org/2012/05/06/spring-mvc-3-2-preview-introducing-servlet-3-async-support/) [previous](http://blog.springsource.org/2012/05/08/spring-mvc-3-2-preview-techniques-for-real-time-updates/) [blog](http://blog.springsource.org/2012/05/10/spring-mvc-3-2-preview-making-a-controller-method-asynchronous/) [posts](http://blog.springsource.org/2012/05/13/spring-mvc-3-2-preview-adding-long-polling-to-an-existing-web-application/) I introduced the Servlet 3 based async capability in Spring MVC 3.2 and used the [spring-mvc-showcase](https://github.com/springsource/spring-mvc-showcase) and the Spring AMQP [stocks sample](https://github.com/SpringSource/spring-amqp-samples/tree/spring-mvc-async/stocks) to demonstrate it. This post presents a chat sample where the external events are not AMQP messages but rather HTTP POST requests with chat messages. In the second part of the post, I'll switch to a distributed chat where the events are [Redis](http://redis.io) notifications.

Chat is not a common requirement for web applications. However it is a good example of a requirement that can only be met with real-time notifications. It is more sensitive to time delays than email or status alerts and it is not that uncommon to chat in a browser with a friend, or with a colleague during a webinar, or with a live person on a shopping site. You can imagine other types of online collaboration.

**The Sample**

The [spring-mvc-chat](https://github.com/rstoyanchev/spring-mvc-chat) sample is available on Github. Although not the focus of this blog post, the client side uses [Thymeleaf](http://www.thymeleaf.org), [knockout.js](http://knockoutjs.com), and jQuery. Thymeleaf is an excellent alternative to JSPs that enables clean HTML templates with support for previews allowing a designer to double-click an HTML template and view it unlike a JSP that requires a Servlet container. `knockout.js` is a client-side MVC framework that's very handy for attaching behavior to HTML elements. To get an idea about it quickly, follow one of its excellent [tutorials](http://learn.knockoutjs.com/). jQuery is used for DOM scripting and Ajax requests.

**ChatController**

The [ChatController](https://github.com/rstoyanchev/spring-mvc-chat/blob/master/src/main/java/org/springframework/samples/async/chat/ChatController.java) exposes operations to get and post chat message. Here is the method to get messages:

```java
Copy
@RequestMapping(method=RequestMethod.GET)
@ResponseBody
public DeferredResult<List<String>> getMessages(@RequestParam int messageIndex) {

  final DeferredResult<List<String>> deferredResult = new DeferredResult<List<String>>(null, Collections.emptyList());
  this.chatRequests.put(deferredResult, messageIndex);

  deferredResult.onCompletion(new Runnable() {
    @Override
    public void run() {
      chatRequests.remove(deferredResult);
    }
  });

  List<String> messages = this.chatRepository.getMessages(messageIndex);
  if (!messages.isEmpty()) {
    deferredResult.setResult(messages);
  }

  return deferredResult;
}
```

A new `DeferredResult` is created and saved in a Map from where it will be removed by the registered `onCompletion` callback when the async request completes. Then the method checks for new messages using an in-memory `ChatRepository`. If new messages are found, the `DeferredResult` is set immediately. Otherwise it will be set later, when a new message arrives.

Below is the method that saves chat messages and updates all saved `DeferredResult` instances:

```java
Copy
@RequestMapping(method=RequestMethod.POST)
@ResponseBody
public void postMessage(@RequestParam String message) {

  this.chatRepository.addMessage(message);

  // Update all chat requests as part of the POST request
  // See Redis branch for a more sophisticated, non-blocking approach

  for (Entry<DeferredResult<List<String>>, Integer> entry : this.chatRequests.entrySet()) {
    List<String> messages = this.chatRepository.getMessages(entry.getValue());
    entry.getKey().setResult(messages);
  }
}
```

**A Distributed Chat**

The above chat sample uses simple, in-memory persistence and works only when deployed to a single server. The [redis branch](https://github.com/rstoyanchev/spring-mvc-chat/tree/redis) uses a Redis-backed `ChatRepository`. [Redis](http://redis.io) is a simple key-value store that is easy to use in Java with the help of the [Spring Redis](http://www.springsource.org/spring-data/redis) project.

The `RedisChatRepository` uses the Spring Redis `RedisTemplate` to look up and save chat messages. Feel free to [take a look](https://github.com/rstoyanchev/spring-mvc-chat/blob/redis/src/main/java/org/springframework/samples/async/chat/RedisChatRepository.java#L27) at the code.

The controller method that saves new chat messages is now a single line:

```java
Copy
@RequestMapping(method=RequestMethod.POST)
@ResponseBody
public void postMessage(@RequestParam String message) {
  this.chatRepository.addMessage(message);
}
```

Receiving new messages is also very simple. It involves implementing the Spring Redis `MessageListener` interface, which can be done directly in the controller:

```java
Copy
@Controller
@RequestMapping("/mvc/chat")
public class ChatController implements MessageListener {

  // ...

  public void onMessage(Message message, byte[] pattern) {
    for (Entry<DeferredResult<List<String>>, Integer> entry : this.chatRequests.entrySet()) {
      List<String> messages = this.chatRepository.getMessages(entry.getValue());
      entry.getKey().setResult(messages);
    }
  }

}
```

The Redist version of the chat will work in a cluster. A message can be posted on any server and all other servers will receive Redis notifications. The Spring Redis project makes it really simple to receive those notifications in message-driven POJO style.

Chat messages can be posted from non-Java, Redis clients too. For example, connect with the Redis command-line shell, type the below commands, and the chat messages will be deliverd to all subscribed servers and connected browsers:

```code
Copyredis 127.0.0.1:6379> RPUSH chat:archive "hello from the redis cli"
redis 127.0.0.1:6379> PUBLISH chat "a new chat message is available"
```

This concludes the blog posts covering the Spring MVC 3.2, Servlet 3 based, async support. Thanks for reading!