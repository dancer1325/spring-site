---
title: Spring MVC 3.2 Preview: Making a Controller Method Asynchronous
source: https://spring.io/blog/2012/05/10/spring-mvc-3-2-preview-making-a-controller-method-asynchronous
scraped: 2026-02-24T08:22:32.856Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rossen Stoyanchev |  May 10, 2012 | 6 Comments
---

# Spring MVC 3.2 Preview: Making a Controller Method Asynchronous

_Engineering | Rossen Stoyanchev |  May 10, 2012 | 6 Comments_

***Last updated on November 5th, 2012 (Spring MVC 3.2 RC1)***

In [previous](http://blog.springsource.org/2012/05/06/spring-mvc-3-2-preview-introducing-servlet-3-async-support/) [posts](http://blog.springsource.org/2012/05/08/spring-mvc-3-2-preview-techniques-for-real-time-updates/) I introduced the Servlet 3 based async capability in Spring MVC 3.2 and discussed techniques for real-time updates. In this post I'll go into more technical details and discuss how asynchronous processing fits into the Spring MVC request lifecycle.

As a quick reminder, you can make *any* existing controller method asynchronous by changing it to return a [Callable](http://docs.oracle.com/javase/6/docs/api/java/util/concurrent/Callable.html). For example a controller method that returns a view name, can return `Callable<String>` instead. An `@ResponseBody` that returns an object called `Person` can return `Callable<Person>` instead. And the same is true for *any* other controller return value type.

A central idea is that all of what you already know about how a controller method works remains unchanged as much as possible except that the remaining processing will occur in another thread. When it comes to asynchronous execution it's important to keep things simple. As you'll see even with this seemingly simple programming model change, there is quite a bit to consider.

The [spring-mvc-showcase](https://github.com/SpringSource/spring-mvc-showcase) has been updated for Spring MVC 3.2. Have a look at [CallableController](https://github.com/SpringSource/spring-mvc-showcase/blob/master/src/main/java/org/springframework/samples/mvc/async/CallableController.java#L13). Method annotations like `@ResponseBody` and `@ResponseStatus` apply to the return value from the `Callable` as well, as you might expect. Exceptions raised from a `Callable` are handled as if they were raised by the controller, in this case with an `@ExceptionHandler` method. And so on.

If you execute one of the `CallableController` methods through the "Async Requests" tab in the browser, you should see output similar to the one below:

```code
Copy08:25:15 [http-bio-8080-exec-10] DispatcherServlet - DispatcherServlet with name 'appServlet' processing GET request for [...]
08:25:15 [http-bio-8080-exec-10] RequestMappingHandlerMapping - Looking up handler method for path /async/callable/view
08:25:15 [http-bio-8080-exec-10] RequestMappingHandlerMapping - Returning handler method [...]
08:25:15 [http-bio-8080-exec-10] WebAsyncManager - Concurrent handling starting for GET [...]
08:25:15 [http-bio-8080-exec-10] DispatcherServlet - Leaving response open for concurrent processing
08:25:17 [MvcAsync1] WebAsyncManager - Concurrent result value [views/html]
08:25:17 [MvcAsync1] WebAsyncManager - Dispatching request to resume processing
08:25:17 [http-bio-8080-exec-6] DispatcherServlet - DispatcherServlet with name 'appServlet' resumed processing GET request for [...]
08:25:17 [http-bio-8080-exec-6] RequestMappingHandlerMapping - Looking up handler method for path /async/callable/view
08:25:17 [http-bio-8080-exec-6] RequestMappingHandlerMapping - Returning handler method [...]
08:25:17 [http-bio-8080-exec-6] RequestMappingHandlerAdapter - Found concurrent result value [views/html]
08:25:17 [http-bio-8080-exec-6] DispatcherServlet - Rendering view [...] in DispatcherServlet with name 'appServlet'
08:25:17 [http-bio-8080-exec-6] JstlView - Added model object 'fruit' of type [java.lang.String]
08:25:17 [http-bio-8080-exec-6] JstlView - Added model object 'foo' of type [java.lang.String]
08:25:17 [http-bio-8080-exec-6] JstlView - Forwarding to resource [/WEB-INF/views/views/html.jsp]
08:25:17 [http-bio-8080-exec-6] DispatcherServlet - Successfully completed request
```

Notice how the initial Servlet container thread exits quickly after logging a message that concurrent handling has started. That's because the controller method returned a `Callable`. A second thread -- managed by Spring MVC through an `AsyncTaskExecutor` -- invokes the `Callable` to produce a value, in this case a String-based view name, and then the request is [dispatched back](http://docs.oracle.com/javaee/6/api/javax/servlet/AsyncContext.html#dispatch\(\)) to the Servlet container. Finally, in a third Servlet container thread (the dispatch), processing is completed by rendering the selected view. If you look at the timestamps you'll notice a 2 second, simulated delay between when the initial thread exits and the `Callable` is ready.

*Note:* if you are not familiar with the Servlet 3 async API, an async dispatch is similar to forwarding except a forward occurs in the same thread while a dispatch is used from an application thread to resume processing in a servlet container thread.

**TaskExecutor Configuration**

By default Spring MVC uses a [SimpleAsyncTaskExecutor](http://static.springsource.org/spring/docs/3.1.x/javadoc-api/org/springframework/core/task/SimpleAsyncTaskExecutor.html) to execute `Callable` instances returned by controller methods. For production you must replace it with an `AsyncTaskExecutor` implementation configured appropriately for your environment. The MVC Java config and the MVC namespace both provide options to configure an `AsyncTaskExecutor` and async request processing in general. You can also configure the `RequestMappingHandlerAdapter` directly.

**Timeout Value**

If an async request does not complete processing within a certain amount of time, the Servlet container raises a timeout event and if not handled, the response is completed. You can configure the timeout value through the MVC Java config and the MVC namespace, or directly on the `RequestMappingHandlerAdapter`. If not configured, the timeout value will depend on the underlying Servlet container. On Tomcat it is 10 seconds and it starts after the initial Servlet container thread exits all the way out.

**MvcAsyncTask**

What if you want to customize the timeout value or the task executor for a specific controller method? For such occasions, you can [wrap the Callable in an instance of MvcAsyncTask](https://github.com/SpringSource/spring-mvc-showcase/blob/master/src/main/java/org/springframework/samples/mvc/async/CallableController.java#L64). The constructor of `MvcAsyncTask` accepts a timeout value and a task executor. Furthermore, it provides `onTimeout` and `onCompletion` methods that allow you to register for "timeout" and "completion" callbacks. Like "finally" in a try-catch block, "completion" always takes place when an async request completes. The "timeout" callback occurs prior to "completion" and can select an alternative value to use to complete processing as well as notify the `Callable` to stop processing.

The following is the sequence of events in a timeout scenario:

1.  Controller method returns a `Callable` wrapped in an `MvcAsyncTask`
2.  Spring MVC begins execution of the `Callable` in a separate thread
3.  The Servlet container thread exits (and the timeout period begins)
4.  `MvcAsyncTask` is notified of a callback
5.  The callback code selects an alternative value and notifies the `Callable` to cancel processing
6.  The request is dispatched back to the container to complete processing with the alternate value

To fully understand the above scenario consider the threads involved -- the initial Servlet container thread where request processing begins, the Spring MVC managed thread where the `Callable` executes, the Servlet container thread in which the timeout event is raised, and the Servlet container thread processing the final async dispatch.

**Exceptions**

When an Exception is raised by a `Callable`, it is handled through the `HandlerExceptionResolver` mechanism just like exceptions raised by any other controller method. The more detailed explanation is that the exception is caught and saved, and the request is dispatched to the Servlet container where processing resumes and the `HandlerExceptionResolver` chain invoked. This also means that `@ExceptionHandler` methods will be invoked as usual.

**Handler Interception**

The `preHandle` method of a `HandlerInterceptor` is invoked as usual from the initial Servlet container thread. If the controller returns a `Callable` and async processing starts, there is neither a result nor is the request complete. Therefore `postHandle` and `afterCompletion` are not invoked in the initial Servlet container thread. Instead interceptors can implement `AsyncHandlerInterceptor`, a sub-interface, and the `afterConcurrentHandlingStarted` method. After the `Callable` is done and the request dispatched to the Servlet container, all methods of the `HandlerInterceptor` are invoked in the dispatched thread.

**Servlet Filters**

All Spring Framework Servlet filter implementations have been modified as necessary to work in asynchronous request processing. As for any other filters, some will work -- typically those that do pre-processing, and others will need to be modified -- typically those that do post-processing at the end of a request. Such filters will need to recognize when the initial Servlet container thread is being exited, making way for another thread to continue processing, and when they are invoked as part of an asynchronous dispatch to complete processing.

The `OpenSessionInViewFilter` and `OpenEntityManagerInViewFilter` have been updated to work transparently over the span the entire async request. However, if using `@Transactional` directly on a controller method, the transaction will complete as soon as the controller method returns and will not extend to the execution of the `Callable`. If the `Callable` needs to do transactional work it should delegate to a bean with `@Transactional` methods.

The [next post](https://spring.io/blog/2012/05/14/spring-mvc-3-2-preview-adding-long-polling-to-an-existing-web-application) explores the use of `DeferredResult` for async processing by modifying an existing sample from the Spring AMQP project that reacts to AMQP messages and sends updates to the browser.