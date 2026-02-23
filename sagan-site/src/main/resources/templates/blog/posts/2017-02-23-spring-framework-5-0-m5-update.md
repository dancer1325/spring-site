---
title: Spring Framework 5.0 M5 Update
source: https://spring.io/blog/2017/02/23/spring-framework-5-0-m5-update
scraped: 2026-02-23T16:32:54.655Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rossen Stoyanchev |  February 23, 2017 | 22 Comments
---

# Spring Framework 5.0 M5 Update

_Engineering | Rossen Stoyanchev |  February 23, 2017 | 22 Comments_

An update on the 5th and last milestone of Spring Framework 5.0...

# [](#spring-mvc-and-spring-webflux)Spring MVC and Spring WebFlux

The name \*Spring MVC\* is both well known and widely used but it may surprise a few there is no actual project or independent distribution with that name. Rather it is a module within the Spring Framework distribution called \`spring-webmvc\`. Here is another trivia question. Did you know that the top-level package in the module does not feature "mvc"? Rather it is called \`org.springframework.web.servlet\`. Practically speaking those are details that we don't have to remember. What matters is that we have a short and memorable name to refer to \*Spring's Servlet stack based\* web framework.

*Spring's reactive stack* web framework, new in 5.0, is fully reactive and non-blocking. It is suitable for event-loop style processing with a small number of threads. It is supported on Servlet containers (Tomcat, Jetty, Servlet 3.1+) but also non-Servlet runtimes (Netty, Undertow) since the common foundation for this stack is not the Servlet API but a non-blocking alternative built on Reactive Streams and the [Reactor](http://projectreactor.io/) project. In case you're wondering, isn't Servlet 3.1 capable of non-blocking I/O? Yes it is and we support running on Servlet 3.1 containers but the rest of the Servlet API is imperative style and can not be used in a reactive, non-blocking stack.

So far we've lacked a dedicated name for the reactive web stack which supports both the Spring MVC annotations (i.e. `@Controller`, `@RequestMapping`) and a new functional programming model, making it a challenge to discuss and clearly contrast programming models and stacks. In our milestone 5, the `spring-web-reactive` module was renamed to `spring-webflux` - drawing inspiration, and brevity, from the [Flux reactive type](https://spring.io/blog/2016/04/19/understanding-reactive-types) at the core of the Spring Web Reactive APIs, with our lower-level reactive HTTP abstractions living in the common `spring-web` module. So we now have the `spring-webmvc` and the `spring-webflux` modules side by side that we'll refer to as *Spring (Web)MVC* and *Spring WebFlux*. In case you're wondering: the top-level package in the new module is `org.springframework.web.reactive`.

Now for some other key updates in this space...

# [](#webclient)WebClient

The \`WebClient\` is a reactive, non-blocking alternative to the \`RestTemplate\` adding value for both \*reactive\* and to \*Servlet-stack\* applications. It makes it effortless to deal with asynchronous and streaming scenarios.

In M5 we've made substantial improvements eliminating the need for static imports to specify request details and perform an exchange:

```java
CopyWebClient webClient = WebClient.create();

Mono<Person> person = webClient.get()
        .uri("http://localhost:8080/persons/42")
        .accept(MediaType.APPLICATION_JSON)
        .exchange()
        .then(response -> response.bodyToMono(Person.class));
```

If all requests have a comon base URL it can be pre-configured once:

```java
CopyWebClient webClient = WebClient.create("http://localhost:8080");

Mono<Person> person = webClient.get()
        .uri("/persons/{id}", 42)
        .accept(MediaType.APPLICATION_JSON)
        .exchange()
        .then(response -> response.bodyToMono(Person.class));
```

It is also possible to gain programmatic control with a `UriBuilder`:

```java
CopyMono<Person> person = webClient.get()
        .uri(builder -> builder.path("/persons/{id}").build("42"))
        .accept(MediaType.APPLICATION_JSON)
        .exchange()
        .then(response -> response.bodyToMono(Person.class));
```

# [](#webtestclient)WebTestClient

The new \`WebTestClient\` in the \`spring-test\` module forms the basis of the Spring WebFlux integration testing support. It wraps a \`WebClient\` and exposes an API for integration testing. Similar to \`MockMvc\` from Spring MVC Test, the new test client does not need an actual, running server and can bind directly to WebFlux server infrastructure using a mock request and response: \`\`\`\`java WebTestClient client = WebTestClient .bindToController(new PersonController()) .build();

client.get().uri("/persons/42") .exchange() .expectStatus().isOk() .expectHeader().contentType(MediaType.APPLICATION\_JSON\_UTF8) .expectBody(Person.class).value().isEqualTo(new Person("John"));

`````
Copy
The new test client however can also run against a live server:
````java
WebTestClient client = WebTestClient
        .bindToServer().baseUrl("http://localhost:8080")
        .build();

// Same test case...
`````

Streaming is also easy to test possibly using a Reactor `StepVerifier`:

```java
CopyFluxExchangeResult<Person> result = client.get().uri("/persons")
        .accept(TEXT_EVENT_STREAM)
        .exchange()
        .expectStatus().isOk()
        .expectHeader().contentType(TEXT_EVENT_STREAM)
        .expectBody(Person.class)
        .returnResult();

StepVerifier.create(result.getResponseBody())
        .expectNext(new Person("Jane"), new Person("Jason"))
        .expectNextCount(3)
        .consumeNextWith(p -> assertEquals("John", p.getName()))
        .thenCancel()
        .verify();
```

# [](#path-pattern-parser)Path Pattern Parser

The M5 release adds a new \`PathPatternParser\` alternative to the \`AntPathMatcher\` that enables use of a more efficient parsed pattern representation of request mappings and supports a very handy \`"{\*foo}" \` URI variable syntax to capture any number of segments at the end of a pattern.

As a first step, a new `ParsingPathMatcher` implementation already allows the new `PathPatternParser` to be easily plugged into Spring MVC and Spring WebFlux mappings. As a next step towards RC1 the goal is to have a registry of patterns to match against a parsed representation of the request path.

# [](#server-sent-events-and-json-streaming)Server-Sent Events and JSON Streaming

Support for streaming is easy with Spring WebFlux: \`\`\`\`java @GetMapping(path = "/persons", produces = "text/event-stream") Flux getPersons() { return this.repository.getPersons(); } \`\`\`\` The above will stream data to a browser formatted as Server-Sent Events (SSE): \`\`\`\` data: {"name":"Jane"} data: {"name":"John"} ... \`\`\`\`

However what should be done for:

```java
Copy@GetMapping("/persons")
Flux<Person> getPersons() {
    return this.repository.getPersons();
}
```

We could stream individual JSON objects but that would not be a valid JSON document as a whole and a browser client has no way to consume a stream other than using Server-Sent Events or WebSocket.

By default `Flux<Person>` will produce a JSON array:

```
Copy[{"name":"Jane"},{"name":"John"},...]
```

Non-browser clients such as the `WebClient` can request request content type `application/stream+json` and the response will be a stream of JSON objects similar to Server-Sent Events but without the extra formatting:

```
Copy{"name":"Jane"}
{"name":"John"}
...
```

# [](#in-conclusion)In Conclusion

I'd like to thank everyone who has given Spring Framework 5.0 a try and provided feedback, especially around the new reactive features. Please continue to do that. As always even small comments can prove incredibly valuable as they make us revisit design choices from a different perspective.

If you're reading this from [DevNexus](https://devnexus.com/s/index) this week don't miss the opportunity to [see the amazing Josh Long](https://devnexus.com/s/devnexus2017/presentations/17213) live code a reactive, web application and also the [Reactor 3 talk](https://devnexus.com/s/devnexus2017/presentations/17153) by Simon Baslé, a core member of the Reactor team.