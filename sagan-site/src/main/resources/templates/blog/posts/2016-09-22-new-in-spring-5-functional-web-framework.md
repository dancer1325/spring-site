---
title: New in Spring 5: Functional Web Framework
source: https://spring.io/blog/2016/09/22/new-in-spring-5-functional-web-framework
scraped: 2026-02-23T19:03:01.971Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Arjen Poutsma |  September 22, 2016 | 60 Comments
---

# New in Spring 5: Functional Web Framework

_Engineering | Arjen Poutsma |  September 22, 2016 | 60 Comments_

As mentioned yesterday in [Juergen's blog post](https://spring.io/blog/2016/09/21/spring-framework-5-0-m2-released), the second milestone of Spring Framework 5.0 introduced a new functional web framework. In this post, I will give more information about the framework.

Keep in mind the functional web framework is built on the same reactive foundation that we provided in M1 and on which we also support annotation-based (i.e. `@Controller`, `@RequestMapping`) request handling, see the [M1 blog post](https://spring.io/blog/2016/07/28/reactive-programming-with-spring-5-0-m1) for more on that.

# [](#example)Example

We start with some excerpts from our [sample application](https://github.com/poutsma/web-function-sample). Below is a reactive repository that exposes `Person` objects. It is quite similar to a traditional, non-reactive repository, except that it returns `Flux<Person>` where you would return a `List<Person>` traditionally, and `Mono<Person>` where you would return a `Person`. `Mono<Void>` is used as a completion signal: to indicate when the save has been completed. For more information on these Reactor types, refer to [Dave's blog post](https://spring.io/blog/2016/06/13/notes-on-reactive-programming-part-ii-writing-some-code).

```java
Copypublic interface PersonRepository {
  Mono<Person> getPerson(int id);
  Flux<Person> allPeople();
  Mono<Void> savePerson(Mono<Person> person);
}
```

Here is how we expose that repository with the new functional web framework:

```java
CopyRouterFunction<?> route = route(GET("/person/{id}"),
  request -> {
    Mono<Person> person = Mono.justOrEmpty(request.pathVariable("id"))
      .map(Integer::valueOf)
      .then(repository::getPerson);
    return Response.ok().body(fromPublisher(person, Person.class));
  })
  .and(route(GET("/person"),
    request -> {
      Flux<Person> people = repository.allPeople();
      return Response.ok().body(fromPublisher(people, Person.class));
    }))
  .and(route(POST("/person"),
    request -> {
      Mono<Person> person = request.body(toMono(Person.class));
      return Response.ok().build(repository.savePerson(person));
    }));
```

And here is how we would run it, for instance in Reactor Netty:

```java
CopyHttpHandler httpHandler = RouterFunctions.toHttpHandler(route);
ReactorHttpHandlerAdapter adapter =
  new ReactorHttpHandlerAdapter(httpHandler);
HttpServer server = HttpServer.create("localhost", 8080);
server.startAndAwait(adapter);
```

The final thing to do is to give it a try:

```sh
Copy$ curl 'http://localhost:8080/person/1'
{"name":"John Doe","age":42}
```

There is a lot to cover here, so let's dig in deeper!

# [](#key-components)Key Components

I will explain the framework by going over its key components: `HandlerFunction`, `RouterFunction`, and `FilterFunction`. These three interfaces, and all other types described in this post, can be found in the [`org.springframework.web.reactive.function`](http://docs.spring.io/spring/docs/5.0.0.M2/javadoc-api/org/springframework/web/reactive/function/package-summary.html) package.

## [](#handlerfunction)HandlerFunction

The starting point of this new framework is the **`HandlerFunction<T>`**, which is essentially a `Function<Request, Response<T>>`, where `Request` and `Response` are newly-defined, immutable interfaces that offer a JDK-8 friendly DSL to the underlying HTTP messages. There is a convenient builder for building `Response` instances, quite similar to the one found in `ResponseEntity`. The annotation counterpart to `HandlerFunction` would be a method with`@RequestMapping`.

Here is an example of a simple "Hello World" handler function, that returns a response with a 200 status and a body based on a String:

```java
CopyHandlerFunction<String> helloWorld =
  request -> Response.ok().body(fromObject("Hello World"));
```

As we saw in the example above, handler functions are fully reactive by building on top of Reactor: they accept `Flux`, `Mono`, or any other [Reactive Streams](http://www.reactive-streams.org) `Publisher` as response type.

It is important to note that `HandlerFunction` itself is side-effect free, because it *returns* the response, as opposed to taking it as a parameter (cf. `Servlet.service(ServletRequest,ServletResponse)`, which essentially is a `BiConsumer<ServletRequest,ServletResponse>`). Side-effect free functions have many benefits: they are easier to [test, compose, and optimize](http://programmers.stackexchange.com/questions/15269/why-are-side-effects-considered-evil-in-functional-programming).

## [](#routerfunction)RouterFunction

Incoming requests are routed to handler functions with a **`RouterFunction<T>`** (i.e. `Function<Request, Optional<HandlerFunction<T>>`). A router function evaluates to a handler function if it matches; otherwise it returns an empty result. The `RouterFunction` has a similar purpose as a `@RequestMapping` annotation. However, there is an important distinction: with the annotation your route is limited to what can be expressed through the annotation values, and the processing of those is not trivial to override; with router functions the processing code is right in front of you: you can override or replace it quite easily.

Here is an example of a router function with an inlined handler function. It does look a bit verbose, but do not worry about that: we will find ways to make it shorter below.

```java
CopyRouterFunction<String> helloWorldRoute = 
  request -> {
    if (request.path().equals("/hello-world")) {
      return Optional.of(r -> Response.ok().body(fromObject("Hello World")));
    } else {
      return Optional.empty();
    }
  };
```

Typically, you do not write complete router functions, but rather (statically) import `RouterFunctions.route()`, which allows you to create a `RouterFunction` using a `RequestPredicate` (i.e. `Predicate<Request>`) and a `HandlerFunction`. If the predicate applies, the handler function is returned; otherwise an empty result. Using `route`, we can rewrite the above to the following:

```java
CopyRouterFunction<String> helloWorldRoute =
  RouterFunctions.route(request -> request.path().equals("/hello-world"),
    request -> Response.ok().body(fromObject("Hello World")));
```

You can (statically) import `RequestPredicates.*` to get access to commonly used predicates, such matching based on path, HTTP method, content-type, etc. With it, we can make our `helloWorldRoute` even simpler:

```java
CopyRouterFunction<String> helloWorldRoute =
  RouterFunctions.route(RequestPredicates.path("/hello-world"),
    request -> Response.ok().body(fromObject("Hello World")));
```

### [](#composing-functions)Composing Functions

Two router functions can be composed into a new router function that routes to either handler function: if the first function does not match, the second is evaluated. You can compose two router functions by calling `RouterFunction.and()`, like so:

```java
CopyRouterFunction<?> route =
  route(path("/hello-world"),
    request -> Response.ok().body(fromObject("Hello World")))
  .and(route(path("/the-answer"),
    request -> Response.ok().body(fromObject("42"))));
```

The above will respond with "Hello World" if the path matches `/hello-world`, and "42" if it matches `/the-answer`. If neither match, an empty `Optional` is returned. Note that the composed router functions are evaluated in order, so it makes sense to put specific functions before generic ones.

You can also compose request predicates, by calling `and` or `or`. These work as expected: for `and` the resulting predicate matches if *both* given predicates match, `or` matches if *either* predicate does. For instance:

```java
CopyRouterFunction<?> route =
  route(method(HttpMethod.GET).and(path("/hello-world")), 
    request -> Response.ok().body(fromObject("Hello World")))
  .and(route(method(HttpMethod.GET).and(path("/the-answer")), 
    request -> Response.ok().body(fromObject("42"))));
```

In fact, most of the predicates found in `RequestPredicates` are compositions! For instance, `RequestPredicates.GET(String)` is a composition of `RequestPredicates.method(HttpMethod)` and `RequestPredicates.path(String)`. So we can rewrite the above to:

```java
CopyRouterFunction<?> route =
  route(GET("/hello-world"),
    request -> Response.ok().body(fromObject("Hello World")))
  .and(route(GET("/the-answer"),
    request -> Response.ok().body(fromObject(42))));
```

### [](#method-references)Method References

As an aside: so far we have written all handler functions as inline lambda's. While this is fine for demo's and short examples, it does have the tendency to get "messy", as you are mixing two concerns: request routing and request handling. So let's see if we can make things cleaner. First we create a class that contains the handling code:

```java
Copyclass DemoHandler {
  public Response<String> helloWorld(Request request) {
    return Response.ok().body(fromObject("Hello World"));
  }
  public Response<String> theAnswer(Request request) {
    return Response.ok().body(fromObject("42"));
  }
}
```

Note that both methods have a signature that is compatible with a handler function. This allows us to use [method references](https://docs.oracle.com/javase/tutorial/java/javaOO/methodreferences.html):

```java
CopyDemoHandler handler = new DemoHandler(); // or obtain via DI
RouterFunction<?> route =
  route(GET("/hello-world"), handler::helloWorld)
  .and(route(GET("/the-answer"), handler::theAnswer));
```

## [](#filterfunction)FilterFunction

Routes mapped by a router function can be filtered by calling `RouterFunction.filter(FilterFunction<T, R>)`, where `FilterFunction<T,R>` is essentially a `BiFunction<Request, HandlerFunction<T>, Response<R>>`. The handler function parameter represents the next item in the chain: this is typically a `HandlerFunction`, but can also be another `FilterFunction` if multiple filters are applied. Let's add a logging filter to our route:

```java
CopyRouterFunction<?> route =
  route(GET("/hello-world"), handler::helloWorld)
  .and(route(GET("/the-answer"), handler::theAnswer))
  .filter((request, next) -> {
    System.out.println("Before handler invocation: " + request.path());
    Response<?> response = next.handle(request);
    Object body = response.body();
    System.out.println("After handler invocation: " + body);
    return response;
  });
```

Note that invoking the next handler is optional. This is useful in security or caching scenarios (eg. invoke `next `only if the user has sufficient rights).

Because `route` is an unbounded router function, we do not know what type of response the next handler is going to return. This is why we end up with a `Response<?>` in our filter, and with an `Object` response body. In our handler class, both methods return a `Response<String>`, so it should be possible to have a `String` response body. We can accomplish this by using `RouterFunction.andSame()` instead of `and()`. This composition method requires the parameter router function to be of the same type. For example, we can make all responses upper case:

```java
CopyRouterFunction<String> route =
  route(GET("/hello-world"), handler::helloWorld)
  .andSame(route(GET("/the-answer"), handler::theAnswer))
  .filter((request, next) -> {
    Response<String> response = next.handle(request);
    String newBody = response.body().toUpperCase();
    return Response.from(response).body(fromObject(newBody));
  });
```

With annotations, similar functionality can be achieved using `@ControllerAdvice` and/or a `ServletFilter`.

## [](#running-a-server)Running a Server

All this is well and good, but there is one piece missing: how can we actually run these functions in a HTTP server? The answer, unsurprisingly, comes by calling another function. You can convert a router function into a `HttpHandler` by using `RouterFunctions.toHttpHandler()`. The `HttpHandler` is a reactive abstraction that was introduced in Spring 5.0 M1: it allows you to run on a wide variety of reactive runtimes: Reactor Netty, RxNetty, Servlet 3.1+, and Undertow. In the example, we already showed what running a `route` in Reactor Netty looks like. For Tomcat it looks like this:

```java
CopyHttpHandler httpHandler = RouterFunctions.toHttpHandler(route);
HttpServlet servlet = new ServletHttpHandlerAdapter(httpHandler);
Tomcat server = new Tomcat();
Context rootContext = server.addContext("",
  System.getProperty("java.io.tmpdir"));
Tomcat.addServlet(rootContext, "servlet", servlet);
rootContext.addServletMapping("/", "servlet");
tomcatServer.start();
```

One thing to note is that the above does not rely on a Spring application context. Just like `JdbcTemplate` and other Spring utility classes, using a application context is optional: you can wire up your handler and router functions in a context, but it is not required. Also note that you can also convert a router function into a `HandlerMapping`, so that it can run in a `DispatcherHandler` (possibly side-by-side with reactive `@Controllers`).

# [](#conclusion)Conclusion

This ends the introduction to Spring's new functional style web framework. Let me conclude by giving a short summary:

-   Handler functions handle request by returning a response,
-   Router functions route to handler functions, and can be composed with other router functions,
-   Router functions can be filtered by filter functions,
-   Router functions can be run in a reactive web runtime.

To give you a more complete picture, I have created a simple sample project that uses the functional web framework. You can find the project [on GitHub](https://github.com/poutsma/web-function-sample).

Let us know what you think!