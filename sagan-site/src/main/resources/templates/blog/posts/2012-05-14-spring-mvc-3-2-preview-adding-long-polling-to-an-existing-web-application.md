---
title: Spring MVC 3.2 Preview: Adding Long Polling to an Existing Web Application
source: https://spring.io/blog/2012/05/14/spring-mvc-3-2-preview-adding-long-polling-to-an-existing-web-application
scraped: 2026-02-24T08:22:19.362Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rossen Stoyanchev |  May 14, 2012 | 3 Comments
---

# Spring MVC 3.2 Preview: Adding Long Polling to an Existing Web Application

_Engineering | Rossen Stoyanchev |  May 14, 2012 | 3 Comments_

***Last updated on November 5th, 2012 (Spring MVC 3.2 RC1)***

In my [last post](http://blog.springsource.org/2012/05/10/spring-mvc-3-2-preview-making-a-controller-method-asynchronous/) I discussed how to make a Spring MVC controller method asynchronous by returning a [Callable](http://docs.oracle.com/javase/6/docs/api/java/util/concurrent/Callable.html) which is then invoked in a separate thread by Spring MVC.

But what if async processing depended on receiving some external event in a thread not known to Spring MVC -- e.g. receiving a JMS message, an AMQP message, a Redis pub-sub notification, a Spring Integration event, and so on? I'll explore this scenario by modifying an existing sample from the [Spring AMQP](http://www.springsource.org/spring-amqp) project.

**The Sample**

Spring AMQP has a [stock trading sample](https://github.com/SpringSource/spring-amqp-samples) where a `QuoteController` sends trade execution messages via Spring AMQP's [RabbitTemplate](http://static.springsource.org/spring-amqp/docs/1.0.x/apidocs/org/springframework/amqp/rabbit/core/RabbitTemplate.html) and receives trade confirmation and price quote messages via Spring AMQP's RabbitMQ [listener container](http://static.springsource.org/spring-amqp/reference/html/#d0e377) in message-driven POJO style.

In the browser, the sample uses polling to display price quotes. For trades, the initial request submits the trade and a confirmation id is returned that is then used to poll for the final confirmation. I've updated the sample to take advantage of the Spring 3.2 Servlet 3 async support. The [master](https://github.com/SpringSource/spring-amqp-samples/tree/master/stocks) branch has the code before and the [spring-mvc-async](https://github.com/SpringSource/spring-amqp-samples/tree/spring-mvc-async) branch has the code after the change. The images below show the effect on the frequency of price quote requests (using the Chrome developer tools):

[![](http://blog.springsource.org/wp-content/uploads/2012/04/quotes-traditional-poll1.png "Traditional polling")](http://blog.springsource.org/wp-content/uploads/2012/04/quotes-traditional-poll1.png)

*Before the change: traditional polling*

[![](http://blog.springsource.org/wp-content/uploads/2012/04/quotes-long-poll1.png "Long polling")](http://blog.springsource.org/wp-content/uploads/2012/04/quotes-long-poll1.png)

*After the change: long poll*

As you can see with regular polling new requests are sent very frequently (milliseconds apart) while with long polling, requests can be 5, 10, 20, or more seconds apart -- a significant reduction in the total number of requests without the loss of latency, i.e. the amount of time before a new price quote appears in the browser.

**Getting Quotes**

So what changes were required? From a client perspective traditional polling and long polling are indistinguishable so the HTML and JavaScript did not change. From a server perspective requests must be held up until new quotes arrive. This is how the controller processes a request for quotes:

```java
Copy

// Class field
private Map<String, DeferredResult> suspendedTradeRequests = new ConcurrentHashMap<String, DeferredResult>();

...

@RequestMapping("/quotes")
@ResponseBody
public DeferredResult<List<Quote>> quotes(@RequestParam(required = false) Long timestamp) {

  final DeferredResult<List<Quote>> result = new DeferredResult<List<Quote>>(null, Collections.emptyList());
  this.quoteRequests.put(result, timestamp);

  result.onCompletion(new Runnable() {
    public void run() {
      quoteRequests.remove(result);
    }
  });

  List<Quote> list = getLatestQuotes(timestamp);
  if (!list.isEmpty()) {
    result.setResult(list);
  }

  return result;
}
```

In the example above the controller method prepares and returns a [DeferredResult](http://static.springsource.org/spring/docs/3.2.0.BUILD-SNAPSHOT/api/org/springframework/web/context/request/async/DeferredResult.html), which it can set immediately, if quotes are already available, or later when new quotes are received via RabbitMQ. The `DeferredResult` is saved in a Map from where it will be removed when the async request completes by the registered `onCompletion` callback.

And here is the controller method that updates saved `DeferredResult` instances when new quotes are received:

```java
Copy

// Invoked in Spring AMQP's RabbitMQ listener container thread

public void handleQuote(Quote message) {
  // ...
  for (Entry<DeferredResult<List<Quote>>, Long> entry : this.quoteRequests.entrySet()) {
    List<Quote> newQuotes = getLatestQuotes(entry.getValue());
    entry.getKey().setResult(newQuotes);
  }
  // ...
}
```

When new quotes arrive, the above method updates each saved `DeferredResult` with the latest quotes. Since the `DeferredResult` was originally created in an `@ResponseBody` method, the quotes are written to the body of the response as JSON.

**Timeouts**

What if the async request associated with a `DeferredResult` times out? From a browser perspective each request should bring quotes and if a timeout is reached, 0 quotes should be returned.

You may have noticed in the sample code above that the `DeferredResult` was created with two constructor arguments. The first is the timeout value to use and the second is the default result to use if a timeout occurs, in this case an empty list.

**Executing Trades**

The changes required for trade executions follow a similar pattern. Instead of sending one request to execute the trade and then polling for the confirmation, a single request submits the trade and then holds for the confirmation.

The [next and last post](http://blog.springsource.org/2012/05/16/spring-mvc-3-2-preview-chat-sample/) introduces a persistent chat sample.