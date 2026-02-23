---
title: The state of HTTP clients in Spring
source: https://spring.io/blog/2025/09/30/the-state-of-http-clients-in-spring
scraped: 2026-02-23T07:28:31.544Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Brian Clozel |  September 30, 2025 | 2 Comments
---

# The state of HTTP clients in Spring

_Engineering | Brian Clozel |  September 30, 2025 | 2 Comments_

This is a new blog post in the [Road to GA series](https://spring.io/blog/2025/09/02/road_to_ga_introduction), this time exploring the new capabilities of our HTTP clients. This is also a good time to reflect on the state of HTTP clients in Spring, so we will use this opportunity to explain an important announcement: we are officially deprecating `RestTemplate`.

## [](#upcoming-restclient-features)Upcoming RestClient features

RestClient has been introduced in Spring Framework 6.1 and evolved in the 6.x line. In the upcoming 7.0 major version we are keeping up the pace with a round of new features.

### [](#api-versioning)API Versioning

Spring `@Controller` now supports the [API Versioning concept to better implement different generations of your REST API within a single application](https://spring.io/blog/2025/09/16/api-versioning-in-spring). This feature is also supported on the client side, by using an `ApiVersionInserter`. You can, for example, insert the API version information in a custom HTTP request header. This can be configured when building the client:

```java
CopyRestClient customClient = RestClient.builder()
  .baseUrl("https://spring.io/api")
  .defaultVersion("1.2")
  .apiVersionInserter(ApiVersionInserter.fromHeader("API-Version").build())
  .build();
```

Spring supports inserting and parsing API versions from HTTP headers, media types, requests paths, query params, or any custom implementation.

### [](#httpmessageconverters)HttpMessageConverters

We revisited how message converters are configured in Spring applications. `HttpMessageConverters` brings a dedicated API and greatly simplifies custom arrangements to replace existing converters, or add custom ones. Here, we will auto-detect message converters from the classpath and only override the one for JSON support with a custom Jackson `JsonMapper`:

```java
CopyJsonMapper jsonMapper = JsonMapper.builder()
  .findAndAddModules()
  .enable(SerializationFeature.INDENT_OUTPUT)
  .defaultDateFormat(new SimpleDateFormat("yyyy-MM-dd"))
  .build();

RestClient restClient = RestClient.builder()
  .configureMessageConverters(client -> {
    client.registerDefaults().withJsonConverter(new JacksonJsonHttpMessageConverter(jsonMapper));
  })
  .baseUrl("https://spring.io/api")
  .build();
```

Spring Boot previously filled that need with its own `HttpMessageConverters` type; the new Framework variant aims to replace it in Spring Boot applications. On the WebFlux side, Spring Framework already shipped a reactive equivalent for codecs, the `CodecConfigurer`.

### [](#http-interface-groups)Http Interface Groups

When applications need to configure many [Http Interface Clients](https://docs.spring.io/spring-framework/reference/integration/rest-clients.html#rest-http-interface), their setup can be quite repetitive and hard to organize. This new release brings the concept of groups: a powerful way to declare and configure many clients at once and let them share the same `RestClient` when it makes sense.

Here, we define a “stackexchange” group for querying both StackOverflow and ServerFault APIs. The other group, “github”, will share the same HTTP client for all interfaces defined in the same base package.

```java
Copy@Configuration
@ImportHttpServices(group = "stackexchange", types = {StackOverflowClient.class, ServerFaultClient.class})
@ImportHttpServices(group = "github", basePackageClasses = GitHubProjects.class)
public class ClientConfig {

}
```

You can learn more about this feature in the ["HTTP Service Client Enhancements" blog post](https://spring.io/blog/2025/09/23/http-service-client-enhancements).

### [](#resttestclient)RestTestClient

Spring Framework 7.0 will ship the [`RestTestClient`](https://docs.spring.io/spring-framework/reference/7.0/testing/resttestclient.html), a new client for testing server applications. `RestTestClient` can perform integration tests against live servers, which means they exercise the entire networking stack and message conversion. RestTestClient can also test a single controller or router function with mock requests and responses, like MockMvc. Both live server tests and mock-based tests use the same API for performing exchanges and assertions.

This was a popular request from the community, since `WebTestClient` was filling that space in the reactive stack and there was no `RestClient` variant.

This new feature brings more value than Spring Boot’s `TestRestTemplate` and can be seen as a replacement, which is why [the team is considering deprecating it](https://github.com/spring-projects/spring-boot/issues/46632).

### [](#new-spring-boot-starters)New Spring Boot Starters

The community raised concerns on several occasions regarding how HTTP clients are packaged in Spring artifacts. `RestClient` and `RestTemplate` live in “org.springframework:spring-web”, while `WebClient` lives in “org.springframework:spring-webflux”. None of those is shipped in a separate, dedicated client artifact.

This packaging structure has made it harder for Spring Boot to understand the intent of developers. Should the application start a web server, auto-configure an HTTP client, or both? This problem is now solved by one of the major features in the upcoming Spring Boot release: the [entire Spring Boot codebase has been modularized and auto-configurations are split into separate artifacts](https://github.com/spring-projects/spring-boot/issues/46071).

With Spring Boot 4.0, applications can now use the “org.springframework.boot:spring-boot-starter-webclient” or “org.springframework.boot:spring-boot-starter-restclient” to express the need for an HTTP client.

### [](#and-more)And more!

We have made many other smaller refinements, like [built-in buffering support](https://github.com/spring-projects/spring-framework/issues/33785), the support for [Jackson hints on the client side](https://github.com/spring-projects/spring-framework/issues/34924) or [Spring Security support for Http Interface Clients](https://github.com/spring-projects/spring-framework/issues/34699).

## [](#limitations-of-resttemplate)Limitations of RestTemplate

If your application is using `RestTemplate`, you will quickly notice that most of the new features mentioned above are not available for `RestTemplate`. In this section, we will explain why we could not implement those features for `RestTemplate`.

`RestTemplate` was released with Spring Framework 3.0, more than 15 years ago, and a lot has happened since in the Java ecosystem.

Our motivation behind `RestTemplate` and all other Spring HTTP clients has remained the same over the years: providing the community with a high level HTTP client that integrates well with Spring libraries. Message body conversion, error handling, interception mechanism, and security are all features that you can use with a familiar Spring programming model. Many HTTP client libraries are supported, but we do not expose low-level HTTP interactions or specific configuration: you choose to use the one that fits your requirements, but this shouldn’t change the overall developer experience.

This approach worked well for many years for `RestTemplate`, but we found some limitations to this model.

The “template-style” API works well for a limited scope but can be challenging when new features are added. This is a common pattern in Spring Framework, starting with `JdbcTemplate` and `JmsTemplate` which predate the HTTP client. With this pattern, the method namespace gets quickly crowded when the scope expands, and using method overloading for variants adds to the problem. The [`RestTemplate` Javadocs](https://docs.spring.io/spring-framework/docs/6.2.x/javadoc-api/org/springframework/web/client/RestTemplate.html) show lots of overloaded methods, and so does the IDE auto-completion. Any time new functionality is introduced, the developer experience might suffer. For example, introducing API Versioning support now in `RestTemplate` would have required new constructors and added confusion to the Java API. As a result, we could not ship this feature for `RestTemplate`.

Asynchronous calls were supported with the `AsyncRestTemplate` variant, but this approach also had some problems. Because of the “template-style” API, method overloading was an even bigger problem there. Spring’s `ListenableFuture` was a necessary choice at the time, but we were limited by its ability to compose concurrent calls and efficiently manage the underlying HTTP resources. Of course, the Java Platform offers better alternatives these days.

Streaming HTTP protocols, like “Server Sent Events”, also gained in popularity. This use case was even more challenging for `RestTemplate`, as the typical approach was to receive and convert the entire response at once, and then close it; whereas, streaming needs to keep the response alive for the entire duration of the stream and perform message conversion item per item.

While `RestTemplate` has limitations, it is very popular in the Spring community. Unfortunately, the template-style API reached its limits and required a complete overhaul. The Spring team got a chance to address this in Spring Framework 5 with a new HTTP client, that we named `WebClient`.

## [](#webclient-and-the-reactive-space)WebClient and the Reactive space

While working on Spring Framework 4.x maintenance, we heard the call from a significant share of the Java and Spring communities: there was a growing need for asynchronous, non-blocking web stacks that support keeping latency in check. New web frameworks appeared, many of them using functional-style programming for composing asynchronous operations. Reactive streams became an industry standard, and protocols like RSocket were born. Despite the learning curve many teams chose this approach to overcome the limitations of traditional Java asynchronous primitives and thread pools.

In Spring Framework 5.0, the Spring team introduced a complete reactive stack based on Reactive Streams and Reactor. From the very beginning, we made sure to communicate clearly that the traditional Servlet stack would not go away and that teams should only consider this approach if they face significant runtime challenges. Managing latency and composing asynchronous operations were key, whereas optimal performance was never the main goal.

On the HTTP client side, this was an opportunity for the team to revisit previous decisions and apply what we learned from the past.

Instead of a “template-style” API, we chose a [fluent API](https://poutsma-principles.com/blog/2025/06/03/fluent-apis-overview/) for our new HTTP client, `WebClient`. This was the first of a new series of fluent clients, with `JdbcClient` and `JmsClient` to follow later. A fluent API significantly reduces the number of methods on any given type. The auto-completion experience in IDEs is much more focused, because each method in the fluent chain only reflects the available options at that point, instead of presenting all possible options at once.

Asynchronous, non-blocking infrastructure is a built-in Reactor feature. Streaming data is also a natural concept in Reactive Streams. But streaming requests and responses changes the dynamics at the message conversion level. Instead of considering the stream of data as a whole, we need to parse and write data as byte buffers. This is also coupled with a `DataBuffer` contract (instead of `byte[]`) that can pool and reuse buffers for better memory efficiency.

`WebClient` then appeared as a good alternative to `RestTemplate`. The extension points and API style are modern. If high concurrency or streaming HTTP calls are important features for the application, `WebClient` is a viable solution. We didn’t expect entire applications to be rewritten in WebFlux just for this reason. This is why we made sure that Spring MVC controllers would [naturally handle reactive types](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-ann-async.html#mvc-ann-async-reactive-types) as traditional asynchronous calls. Of course, applications could also call `block()` to return to the synchronous world, if necessary.

At that point, we declared `RestTemplate` as “feature complete”: because of its limitations, we could not promise new features there. We deprecated `AsyncRestTemplate` at that time, given the superiority of `WebClient` for such needs: its asynchronous and non-blocking support, and ability to compose operations and streaming pipelines were far more advanced. Overall, `WebClient` was a better alternative all-around and at the time we hoped the community would eventually converge on a single solution.

## [](#introducing-restclient)Introducing RestClient

With the new Java 17 baseline in Spring Framework 6.0 and Virtual Threads support scheduled for Java 21, we saw an opportunity for a new take on `RestTemplate`. We used what we learned with `WebClient` to solve the “template-style” limitations with a modern, fluent API. We chose to reuse the existing HTTP infrastructure from `RestTemplate` and locate this new client in the same package. This makes the transition easier, because you can create a `RestClient` instance using an existing `RestTemplate`. We also published a [dedicated migration guide](https://docs.spring.io/spring-framework/reference/integration/rest-clients.html#_migrating_from_resttemplate_to_restclient) to assist developers in that process.

In retrospect, choosing to keep an imperative, blocking-style API was a good choice: [Structured Concurrency](https://openjdk.org/jeps/505) unlocks asynchronous composition for `RestClient` without additional changes. We are still unsure about the streaming use case (more on that later).

In the last few releases, we saw rapid adoption of `RestClient` in the community, but we still didn’t revisit our maintenance stance on `RestTemplate`, up until this point.

## [](#the-future-of-http-clients-in-spring)The future of HTTP clients in Spring

By now, there is a significant gap between `RestTemplate` and `RestClient` that we cannot close due to limitations of template-style API. Keeping the `RestTemplate` around puts part of our community at a disadvantage. We now think it is time to reconsider our HTTP client arrangement, and here’s our current plan.

1.  Spring Framework 7.0 (November 2025): announce our intent to deprecate `RestTemplate` in this blog post, our upgrade guides, and reference documentation.
2.  Spring Framework 7.1 (provisional date, November 2026): formally “`@Deprecate`” the client and mark it for removal.
3.  Spring Framework 8.0 (date to be determined): remove `RestTemplate` entirely

Assuming our current pace of releases, this would leave OSS support for `RestTemplate` until at least 2029. We strongly believe that updating applications to use `RestClient` (and the same underlying infrastructure) is the best long term solution. If your team maintains custom request factories or client interceptors, those can be reused with `RestClient`. Applications can be upgraded iteratively, initially wrapping existing `RestTemplate` instances with `RestClient` and then reworking the shared configuration.

This new arrangement leaves us with `RestClient` for the traditional stack and `WebClient` for the reactive variant, both actively maintained by the team. The decision process is much easier: you can pick `RestClient` for most cases, or choose `WebClient` if you need Reactive APIs or streaming capabilities.

Now, back to the streaming use case. We are still exploring our options for proper streaming support in `RestClient`. There is no clear path for streaming support in the Java Platform right now, one that would naturally fit with Virtual Threads and Structured Concurrency. We are in touch with the Java Platform team and the broader industry.

We are getting close to the Spring Framework 7.0 and Spring Boot 4.0 release dates. Can you take the latest milestone versions for a spin with one of your applications? It is still time to improve the upgrade experience and make your job easier in the near future. As always, your opinion matters - don’t hesitate to share your experience with the Spring HTTP clients here in the comments!