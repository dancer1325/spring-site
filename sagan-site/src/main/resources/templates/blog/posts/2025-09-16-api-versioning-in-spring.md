---
title: API Versioning in Spring
source: https://spring.io/blog/2025/09/16/api-versioning-in-spring
scraped: 2026-02-22T22:09:41.530Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rossen Stoyanchev |  September 16, 2025 | 5 Comments
---

# API Versioning in Spring

_Engineering | Rossen Stoyanchev |  September 16, 2025 | 5 Comments_

In this 2nd blog post of the [Road to GA](https://spring.io/blog/2025/09/02/road_to_ga_introduction) series highlighting major features within the Spring portfolio for [the next major versions to be released in November](https://spring.io/blog/2024/10/01/from-spring-framework-6-2-to-7-0), I’m going to focus on the upcoming API Versioning support in Spring Framework 7.

# [](#introduction)Introduction

API versioning is a challenging topic. Most articles list various ways to do it, but offer no advice. When advice is offered, it ranges widely. For example, Roy Fielding [advises against it](https://www.infoq.com/articles/roy-fielding-on-versioning/). It is a common and widely used practice, and yet there is no standard or agreement on how to or whether to do it.

Furthermore, different applications have different needs that depend on the business domain, company dynamics, point of evolution, and more, making it necessary to consider how published advice applies to your own specific situation.

All of this coupled with the fact that it’s not too hard to express the various ways (path, header, media type, etc.) through `@RequestMapping` annotations, has practically meant no official support in Spring, until now. What changed?

As is often the case with new features, they begin with a user request, in [this case stating](https://github.com/spring-projects/spring-framework/issues/33599) that while implementing API Versioning in a Spring application is possible, it in fact requires a lot of work. Looking back on the subtasks of the [umbrella issue](https://github.com/spring-projects/spring-framework/issues/34565) this was indeed a valid point. The amount of feedback and interest we’ve seen since in this topic further demonstrates a clear need.

It is not the goal of this blog post to talk further about API versioning practices. For a longer introduction to the topic, you can [check my talk](https://www.youtube.com/watch?v=ZA-MzWpKvtQ) at the [Spring I/O](https://springio.net/) conference earlier this year.

Generally the goal with this feature is to provide the building blocks necessary for what is a very common practice and need.

# [](#server-handling)Server Handling

At the core of server-side handling is the `ApiVersionStrategy`, a key contract with knowledge of all application preferences for API versioning. It can resolve, parse, and validate request versions; it knows about the range of supported versions; and it can help to send deprecation hints in the response.

You configure it through the [MVC config](https://docs.spring.io/spring-framework/reference/7.0-SNAPSHOT/web/webmvc/mvc-config/api-version.html) or the [WebFlux config](https://docs.spring.io/spring-framework/reference/7.0-SNAPSHOT/web/webflux/config.html#webflux-config-api-version). For example:

```java
Copy@Configuration
public class WebConfiguration implements WebMvcConfigurer {

	@Override
	public void configureApiVersioning(ApiVersionConfigurer configurer) {
		configurer.useRequestHeader("API-Version");
	}
}
```

For Spring Boot applications, [there are equivalent properties](https://docs.spring.io/spring-boot/4.0-SNAPSHOT/reference/web/servlet.html#web.servlet.spring-mvc.api-versioning) for the same. For example:

```properties
Copyspring.mvc.apiversion.use.header=API-Version
```

Once configured, this is then available to support API versioning in request handling.

For [annotated controllers](https://docs.spring.io/spring-framework/reference/7.0-SNAPSHOT/web/webmvc/mvc-controller/ann-requestmapping.html#mvc-ann-requestmapping-version), you can use the new `version` attribute of the `@RequestMapping` annotation and its specialized forms such as `@GetMapping`:

```java
Copy@RestController
public class AccountController {

	@GetMapping(path = "/account/{id}", version = "1.1") 
	public Account getAccount() {
	}
}
```

For [functional endpoints](https://docs.spring.io/spring-framework/reference/7.0-SNAPSHOT/web/webmvc-functional.html#api-version), you can use the `version` request predicate:

```java
CopyRouterFunction<ServerResponse> route = RouterFunctions.route()
	.GET("/hello-world", version("1.2"),
		request -> ServerResponse.ok().body("Hello World")).build();

```

If the API version is in a request header, query param, or media type, there is nothing further to do in the mappings.

If the API version is in the path, it must be declared as a URI variable (with any name), for example, "/api/{version}". Typically, this is best configured externally as a common path prefix for all handlers through the [Path Matching options](https://docs.spring.io/spring-framework/reference/7.0-SNAPSHOT/web/webmvc/mvc-config/path-matching.html), so that it does not need to be repeated in every mapping.

By default, the request version is parsed into a semantic version with major, minor, and patch values where minor and patch values are set to 0 if not present. This is important in order to be able to compare versions. The parser can be customized or replaced if you want to use a date or any other format.

In the mappings, a version can be a fixed version, such as “1.2”, or a baseline version, such as “1.2+”. The baseline version is useful in scenarios where change is applied incrementally to selected endpoints, removing the need to create additional controller methods for endpoints that haven’t changed.

For example, given supported versions of “1.2” and “1.3”, a controller method with version “1.2+” supports both versions. This allows the controller method to continue working in version 1.3 and with other future versions until there is a need for a new controller method in a higher version.

An important aspect of versioning is to provide deprecation hints to clients. You can configure a deprecation handler to do that. The built-in handler can set "Deprecation", "Sunset", and "Link" headers based on [RFC 9745](https://datatracker.ietf.org/doc/rfc9745/) and [RFC 8594](https://datatracker.ietf.org/doc/html/rfc8594).

# [](#client-support)Client Support

From a client perspective you may need to perform requests with an API version. For this, there is an `ApiVersionInserter` that determines how to insert a version into the request once, and subsequently when you make requests, you only need to specify the version value.

For example, in `RestClient` and `WebClient` you can set an inserter:

```java
CopyRestClient client = RestClient.builder()
		.baseUrl("http://localhost:8080")
		.apiVersionInserter(ApiVersionInserter.useHeader("API-Version"))
		.build();
```

For Spring Boot applications, [there are equivalent properties](https://docs.spring.io/spring-boot/4.0-SNAPSHOT/reference/io/rest-client.html#io.rest-client.apiversioning). For example:

```properties
Copyspring.http.client.restclient.apiversion.insert.header=API-Version
```

And then perform requests as follows:

```java
CopyAccount account = client.get().uri("/accounts/1")
		.apiVersion(1.1)
		.retrieve()
		.body(Account.class);
```

HTTP interface clients support API versioning through the new `version` attribute of the `@HttpExchange` annotation and its specialized forms such as `@GetExchange`, etc. For example:

```java
Copy@HttpExchange("/accounts")
public interface AccountService {

	@GetExchange(url = "/{id}", version = "1.1")
	Account getAccount(@PathVariable int id);

}
```

# [](#testing)Testing

As you might expect, API versioning is also of interest for use in testing, for examle with `RestTestClient` (new in 7.0) and `WebTestClient`.

Both are actual clients, analogous to `RestClient` and `WebClient`, and therefore need to be configured with a client-side `ApiVersionInserter` to prepare requests accordingly. They also configure the server side, but this depends on the chosen setup as follows:

-   [Standalone setup](https://docs.spring.io/spring-framework/reference/7.0-SNAPSHOT/testing/resttestclient.html#resttestclient-controller-config) -- an `ApiVersionStrategy` must be provided.
-   [ApplicationContext setup](https://docs.spring.io/spring-framework/reference/7.0-SNAPSHOT/testing/resttestclient.html#resttestclient-context-config) -- the context has the application API versioning config so nothing to do.
-   [Live server setup](https://docs.spring.io/spring-framework/reference/7.0-SNAPSHOT/testing/resttestclient.html#resttestclient-server-config) -- the server runs and is configured independent of the test client.

API versioning support is also available when testing directly with MockMvc, without a test client. You can configure an `ApiVersionInserter` to initialize `MockHttpServletRequest`, and an `ApiVersionStrategy` when using the standalone setup.

If you’d like to see some of the above in Spring Boot test scenarios, check out [the tests](https://github.com/rstoyanchev/springio25-versioning/tree/main/src/test/java/versioning) in this sample project.

# [](#summary)Summary

In this blog post we took a brief tour of the upcoming API Versioning support in Spring Framework 7.

For further details, please review relevant sections of the [reference docs](https://docs.spring.io/spring-framework/reference/7.0-SNAPSHOT/web/webmvc-versioning.html). You can also experiment with this [sample project](https://github.com/rstoyanchev/springio25-versioning).

If you have API versioning requirements, please have a look and reach out here or through our [issue tracker](https://github.com/spring-projects/spring-framework/issues) if needed.