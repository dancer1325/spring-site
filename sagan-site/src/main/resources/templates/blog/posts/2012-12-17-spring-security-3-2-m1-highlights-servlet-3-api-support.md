---
title: Spring Security 3.2 M1 Highlights, Servlet 3 API Support
source: https://spring.io/blog/2012/12/17/spring-security-3-2-m1-highlights-servlet-3-api-support
scraped: 2026-02-24T08:11:44.315Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Winch |  December 17, 2012 | 1 Comment
---

# Spring Security 3.2 M1 Highlights, Servlet 3 API Support

_Engineering | Rob Winch |  December 17, 2012 | 1 Comment_

Last week I [announced the release of Spring Security 3.2 M1](http://www.springsource.org/node/3766) that contains improved Servlet 3 support. In this post, I will introduce some of the more exciting features found in the 3.2 M1 release. Specifically, we will take a look at the following new Spring Security features:

-   [Concurrency Support](#concurrency)
-   [Servlet 3 API Integration](#servlet3-api)
-   [Servlet 3 Async Support](#servlet3-async)
-   [Spring MVC Async Integration](#springmvc-async)

### Concurrency Support

You might ask "What is concurrency support doing in a release that has a Servlet 3 focused theme?" The reason is that the concurrency support provides a foundation for all the other features found in this release. While the concurrency support is used by the Servlet 3 integration, it can also serve as building blocks to support concurrency and Spring Security in any application. Let's take a look at Spring Security's concurrency support now.

#### DelegatingSecurityContextRunnable

One of the most fundamental building blocks within Spring Security's concurrency support is the `DelegatingSecurityContextRunnable`. It wraps a delegate `Runnable` in order to initialize the `SecurityContextHolder` with a specified `SecurityContext` for the delegate. It then invokes the delegate `Runnable` ensuring to clear the `SecurityContextHolder` afterwards. The `DelegatingSecurityContextRunnable` looks something like this:

```java
Copypublic void run() {
  try {
    SecurityContextHolder.setContext(securityContext);
    delegate.run();
  } finally {
    SecurityContextHolder.clearContext();
  }
}
```

While very simple, it makes it seamless to transfer the `SecurityContext` from one `Thread` to another. This is important since, in most cases, the `SecurityContextHolder` acts on a per `Thread` basis. For example, you might have used Spring Security's [<global-method-security> support](http://static.springsource.org/spring-security/site/docs/3.2.x/reference/ns-config.html#ns-global-method) to secure one of your services. You can now easily transfer the `SecurityContext` of the current `Thread` to the `Thread` that invokes the secured service. An example of how you might do this can be found below:

```java
Copy
Runnable originalRunnable = new Runnable() {
  public void run() {
    // invoke secured service
  }
};

SecurityContext context = SecurityContextHolder.getContext();
DelegatingSecurityContextRunnable wrappedRunnable =
    new DelegatingSecurityContextRunnable(originalRunnable, context);

new Thread(wrappedRunnable).start();
```

The code above performs the following steps:

-   Creates a `Runnable` that will be invoking our secured service. Notice that it is not aware of Spring Security
-   Obtains the `SecurityContext` that we wish to use from the `SecurityContextHolder` and initializes the `DelegatingSecurityContextRunnable`
-   Use the `DelegatingSecurityContextRunnable` to create a `Thread`
-   Start the `Thread` we created

Since it is quite common to create a `DelegatingSecurityContextRunnable` with the `SecurityContext` from the `SecurityContextHolder` there is a shortcut constructor for it. The following code is the same as the code above:

```java
Copy
Runnable originalRunnable = new Runnable() {
  public void run() {
    // invoke secured service
  }
};

DelegatingSecurityContextRunnable wrappedRunnable =
    new DelegatingSecurityContextRunnable(originalRunnable);

new Thread(wrappedRunnable).start();
```

The code we have is simple to use, but it still requires knowledge that we are using Spring Security. In the next section we will take a look at how we can utilize `DelegatingSecurityContextExecutor` to hide the fact that we are using Spring Security.

#### DelegatingSecurityContextExecutor

In the previous section, we found that it was easy to use the `DelegatingSecurityContextRunnable`, but it was not ideal since we had to be aware of Spring Security in order to use it. Let's take a look at how `DelegatingSecurityContextExecutor` can shield our code from any knowledge that we are using Spring Security.

The design of `DelegatingSecurityContextExecutor` is very similar to that of `DelegatingSecurityContextRunnable` except it accepts a delegate [Executor](http://docs.oracle.com/javase/6/docs/api/java/util/concurrent/Executor.html) instead of a delegate `Runnable`. You can see an example of how it might be used below:

```java
Copy
SecurityContext context = SecurityContextHolder.createEmptyContext();
Authentication authentication = 
    new UsernamePasswordAuthenticationToken("user","doesnotmatter", AuthorityUtils.createAuthorityList("ROLE_USER"));
context.setAuthentication(authentication);

SimpleAsyncTaskExecutor delegateExecutor =
    new SimpleAsyncTaskExecutor();
DelegatingSecurityContextExecutor executor =
    new DelegatingSecurityContextExecutor(delegateExecutor, context);

Runnable originalRunnable = new Runnable() {
  public void run() {
    // invoke secured service
  }
};

executor.execute(originalRunnable);
```

The code performs the following steps:

-   Creates the `SecurityContext` to be used for our `DelegatingSecurityContextExecutor`. Note that in this example we simply create the `SecurityContext` by hand. However, it does not matter where or how we get the `SecurityContext` (i.e. we could obtain it from the `SecurityContextHolder` if we wanted).
-   Creates a delegateExecutor that is in charge of executing submitted `Runnable`s
-   Finally we create a `DelegatingSecurityContextExecutor` which is in charge of wrapping any `Runnable` that is passed into the execute method with a `DelegatingSecurityContextRunnable`. It then passes the wrapped `Runnable` to the delegateExecutor. In this instance, the same `SecurityContext` will be used for every `Runnable` submitted to our `DelegatingSecurityContextExecutor`. This is nice if we are running background tasks that need to be run by a user with elevated privileges.

At this point you may be asking yourself "How does this shield my code of any knowledge of Spring Security?" Instead of creating the `SecurityContext` and the `DelegatingSecurityContextExecutor` in our own code, we can inject an already initialized instance of `DelegatingSecurityContextExecutor`.

```java
Copy
@Autowired
private Executor executor; // becomes an instance of our DelegatingSecurityContextExecutor

public void submitRunnable() {
  Runnable originalRunnable = new Runnable() {
    public void run() {
      // invoke secured service
    }
  };
  executor.execute(originalRunnable);    
}
```

Now our code is unaware that the `SecurityContext` is being propagated to the `Thread`, then the originalRunnable is executed, and then the SecurityContextHolder is cleared out. In this example, the same user is being used to execute each `Thread`. What if we wanted to use the user from `SecurityContextHolder` at the time we invoked `executor.execute(Runnable)` (i.e. the currently logged in user) to process originalRunnable? This can be done by removing the `SecurityContext` argument from our `DelegatingSecurityContextExecutor` constructor. For example:

```java
Copy
SimpleAsyncTaskExecutor delegateExecutor = new SimpleAsyncTaskExecutor();
DelegatingSecurityContextExecutor executor =
    new DelegatingSecurityContextExecutor(delegateExecutor);
```

Now anytime `executor.execute(Runnable)` is executed the `SecurityContext` is first obtained by the `SecurityContextHolder` and then that `SecurityContext` is used to create our `DelegatingSecurityContextRunnable`. This means that we are executing our `Runnable` with the same user that was used to invoke the `executor.execute(Runnable)` code.

#### Spring Security Concurrency Classes

Refer to the Javadoc for additional integrations with both the Java concurrent APIs and the Spring Task abstractions. They are quite self explanatory once you understand the previous code.

-   [DelegatingSecurityContextCallable](http://static.springsource.org/spring-security/site/docs/3.2.x/apidocs/org/springframework/security/concurrent/DelegatingSecurityContextCallable.html)
-   [DelegatingSecurityContextExecutor](http://static.springsource.org/spring-security/site/docs/3.2.x/apidocs/org/springframework/security/concurrent/DelegatingSecurityContextExecutor.html)
-   [DelegatingSecurityContextExecutorService](http://static.springsource.org/spring-security/site/docs/3.2.x/apidocs/org/springframework/security/concurrent/DelegatingSecurityContextScheduledExecutorService.html)
-   [DelegatingSecurityContextRunnable](http://static.springsource.org/spring-security/site/docs/3.2.x/apidocs/org/springframework/security/concurrent/DelegatingSecurityContextRunnable.html)
-   [DelegatingSecurityContextScheduledExecutorService](http://static.springsource.org/spring-security/site/docs/3.2.x/apidocs/org/springframework/security/concurrent/DelegatingSecurityContextScheduledExecutorService.html)
-   [DelegatingSecurityContextSchedulingTaskExecutor](http://static.springsource.org/spring-security/site/docs/3.2.x/apidocs/org/springframework/security/scheduling/DelegatingSecurityContextSchedulingTaskExecutor.html)
-   [DelegatingSecurityContextAsyncTaskExecutor](http://static.springsource.org/spring-security/site/docs/3.2.x/apidocs/org/springframework/security/task/DelegatingSecurityContextAsyncTaskExecutor.html)
[](http://static.springsource.org/spring-security/site/docs/3.2.x/apidocs/org/springframework/security/task/DelegatingSecurityContextAsyncTaskExecutor.html)-   [](http://static.springsource.org/spring-security/site/docs/3.2.x/apidocs/org/springframework/security/task/DelegatingSecurityContextAsyncTaskExecutor.html)[DelegatingSecurityContextTaskExecutor](http://static.springsource.org/spring-security/site/docs/3.2.x/apidocs/org/springframework/security/task/DelegatingSecurityContextTaskExecutor.html)

### Servlet 3 API Integration

Spring Security has supported Servlet API integration for quite some time. However, it wasn't until 3.2 M1 that it supported the new methods added in Servlet 3. In this section we will discuss each of the methods that Spring Security integrates with. If you want to see this in action, you can import Spring Security into Spring Tool Suite using the Gradle Plugin and run [servletapi sample application](https://github.com/SpringSource/spring-security/tree/master/samples/servletapi).

#### HttpServletRequest.authenticate(HttpServletRequest,HttpServletResponse)

Spring Security now integrates with [HttpServletRequest.authenticate(HttpServletRequest,HttpServletResponse)](http://docs.oracle.com/javaee/6/api/javax/servlet/http/HttpServletRequest.html#authenticate%28javax.servlet.http.HttpServletResponse%29). In short, we can use this method to ensure that a user is authenticated. If they are not authenticated, the configured [AuthenticationEntryPoint](static.springsource.org/spring-security/site/docs/3.1.x/reference/technical-overview.html#tech-intro-auth-entry-point) will be used to request the user to authenticate (i.e. redirect to the login page).

#### HttpServletRequest.login(String,String)

Spring Security now integrates with [HttpServletRequest.login(String,String)](http://docs.oracle.com/javaee/6/api/javax/servlet/http/HttpServletRequest.html#login%28java.lang.String,%20java.lang.String%29). User's can utilize this method to authenticate a username and password with Spring Security. If authentication fails, a `ServletException` that wraps the original Spring Security `AuthenticationException` will be thrown. This means if you allow the `ServletException` to propagate Spring Security's `ExceptionTranslationFilter` will handle it for you. Alternatively, you can catch the `ServletException` and handle it yourself.

#### HttpServletRequest.logout()

Spring Security now integrates with [HttpServletRequest.logout()](http://docs.oracle.com/javaee/6/api/javax/servlet/http/HttpServletRequest.html#logout%28%29) by invoking the configured `LogoutHandler` implementations. Typically this means that the `SecurityContextHolder` will be cleared out, the `HttpSession` will be invalidated, any "Remember Me" authentication will be cleaned up, etc. However, the configured `LogoutHandler` implementations will vary depending on your Spring Security configuration. It is important to note that after `HttpServletRequest.logout()` has been invoked, you are still in charge of writing a response out. Typically this would involve a redirect to the welcome page.

#### AsyncContext.start(Runnable)

The [AsynchContext.start(Runnable)](http://docs.oracle.com/javaee/6/api/javax/servlet/AsyncContext.html#start%28java.lang.Runnable%29) method that ensures your credentials will be propagated to the new `Thread`. Using Spring Security's newly added concurrency support, Spring Security overrides the `AsyncContext.start(Runnable)` to ensure that the current `SecurityContext` is used when processing the `Runnable`.

### Servlet 3 Async Support

Spring Security now supports Servlet 3, Async requests. So how do you use it?

The first step is to ensure you have updated your web.xml to use the 3.0 schema as shown below:

```xml
Copy
<web-app xmlns="http://java.sun.com/xml/ns/javaee"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
  version="3.0">

</web-app>
```

Next you need to ensure that your springSecurityFilterChain is setup for processing asynchronous requests.

```xml
Copy
<filter>
  <filter-name>springSecurityFilterChain</filter-name>
  <filter-class>
    org.springframework.web.filter.DelegatingFilterProxy
  </filter-class>
  <async-supported>true</async-supported>
</filter>
<filter-mapping>
  <filter-name>springSecurityFilterChain</filter-name>
  <url-pattern>/*</url-pattern>
  <dispatcher>REQUEST</dispatcher>
  <dispatcher>ASYNC</dispatcher>
</filter-mapping>
```

That's it! Now Spring Security will ensure that your `SecurityContext` is propagated on asynchronous requests too.

So what has changed? Internal refactoring within Spring Security will ensure that your `SecurityContext` is no longer cleared out when a response was committed on another `Thread`, resulting in a user who appeared to be logged out. Additionally, you can use the Spring Security concurrency support and Spring Security's `AsyncContext.start(Runnable)` integration to assist you in processing Servlet requests.

### Spring MVC Async Integration

\[callout title=Associating SecurityContext to Callable's\] More technically speaking, Spring Security integrates with [WebAsyncManager](http://static.springsource.org/spring/docs/current/javadoc-api/org/springframework/web/context/request/async/WebAsyncManager.html). The `SecurityContext` that is used to process the `Callable` is the `SecurityContext` that exists on the `SecurityContextHolder` at the time startCallableProcessing is invoked. \[/callout\]

As [Rossen](http://blog.springsource.org/author/rstoyanchev/) demonstrated in a previous blog post, Spring Web MVC 3.2 has [excellent Servlet 3 Async Support](http://blog.springsource.org/2012/05/06/spring-mvc-3-2-preview-introducing-servlet-3-async-support/). With no additional configuration, Spring Security will automatically setup the `SecurityContext` to the `Thread` that executes a `Callable` returned by your controllers. For example, the following method will automatically have its `Callable` executed with the `SecurityContext` that was available when the `Callable` was created:

```java
Copy
@RequestMapping(method=RequestMethod.POST)
public Callable<String> processUpload(final MultipartFile file) {
 
  return new Callable<String>() {
    public Object call() throws Exception {
      // ...
      return "someView";
    }
  };
}
```

There is no automatic integration with a `DeferredResult` that is returned by controllers. This is because `DeferredResult` is processed by the users and thus there is no way of automatically integrating with it. However, you can still use [Concurrency Support](#concurrency) to provide transparent integration with Spring Security.

### Feedback Please

I hope this gives you a better understanding of the changes that are available in Spring Security 3.2. M1 and gets you excited for the next milestone. As a member of the community I encourage you to try out the new milestone and report any bugs/enhancements in [JIRA](https://jira.springsource.org/browse/SEC). This feedback is a simple, yet very important way to give back to the community!