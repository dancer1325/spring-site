---
title: New in Spring 6.1: RestClient
source: https://spring.io/blog/2023/07/13/new-in-spring-6-1-restclient
scraped: 2026-02-23T08:56:50.817Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Arjen Poutsma |  July 13, 2023 | 49 Comments
---

# New in Spring 6.1: RestClient

_Engineering | Arjen Poutsma |  July 13, 2023 | 49 Comments_

Spring Framework 6.1 M2 introduces the `RestClient`, a new synchronous HTTP client. As the name suggests, `RestClient` offers the fluent API of `WebClient` with the infrastructure of `RestTemplate`.

Fourteen years ago, when `RestTemplate` was introduced in Spring Framework 3.0, we quickly discovered that exposing every capability of HTTP in a template-like class resulted in too many overloaded methods. In Spring Framework 5, we therefore used a fluent API for the reactive `WebClient`. With `RestClient` we are introducing a HTTP client that offers an API similar to `WebClient`, and that uses the message converters, request factories, interceptors, and other underlying components of `RestTemplate`.

## [](#creating-a-restclient)Creating a `RestClient`

You can create a `RestClient` using one of the static `create` methods. You can also use `RestClient::builder` to get a builder with further options, such as specifying the HTTP client to use, setting a default URL, path variables, and headers, or registering interceptors and initializers.

Using `RestClient::create(RestTemplate)`, you can initialize a `RestClient` with the configuration of an existing `RestTemplate`.

## [](#retrieve)Retrieve

Let's create a `RestClient`, use it to set up a basic `GET` request, and retrieve the contents of a site as string using `retrieve`:

```java
CopyRestClient restClient = RestClient.create();

String result = restClient.get()
  .uri("https://example.com")
  .retrieve()
  .body(String.class);
System.out.println(result);
```

If you're interested in the response status code and headers, and not just the contents, you can use `toEntity` to get a `ResponseEntity`:

```java
CopyResponseEntity<String> result = restClient.get()
  .uri("https://example.com")
  .retrieve()
  .toEntity(String.class);

System.out.println("Response status: " + result.getStatusCode());
System.out.println("Response headers: " + result.getHeaders());
System.out.println("Contents: " + result.getBody());
```

`RestClient` can also convert JSON to objects, using Jackson under the hood. In fact, it can convert all types that `RestTemplate` supports, as it uses the same [message converters](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-config/message-converters.html). Note the usage of uri variables, and that the `Accept` header is set to JSON.

```java
Copyint id = ...
Pet pet = restClient.get()
  .uri("https://petclinic.example.com/pets/{id}", id)
  .accept(APPLICATION_JSON)
  .retrieve()
  .body(Pet.class);
```

### [](#post)POST

Doing a `POST` request is just as simple, like so:

```java
CopyPet pet = ...
ResponseEntity<Void> response = restClient.post()
  .uri("https://petclinic.example.com/pets/new")
  .contentType(APPLICATION_JSON)
  .body(pet)
  .retrieve()
  .toBodilessEntity();
```

### [](#error-handling)Error handling

By default, `RestClient` throws a subclass of `RestClientException` when receiving a 4xx or 5xx status code. This behavior can be overriden using status handlers, like so:

```java
CopyString result = restClient.get()
  .uri("https://example.com/this-url-does-not-exist")
  .retrieve()
  .onStatus(HttpStatusCode::is4xxClientError, (request, response) -> {
      throw new MyCustomRuntimeException(response.getStatusCode(), response.getHeaders())
  })
  .body(String.class);
```

## [](#exchange)Exchange

The `RestClient` offers the `exchange` method for more advanced scenarios, as it provides access to the underlying HTTP request and response. The previously mentioned status handlers are *not* applied when you use `exchange`, because the exchange function already provides access to the full response, allowing you to perform any error handling necessary:

```java
CopyPet result = restClient.get()
  .uri("https://petclinic.example.com/pets/{id}", id)
  .accept(APPLICATION_JSON)
  .exchange((request, response) -> {
    if (response.getStatusCode().is4xxClientError()) {
      throw new MyCustomRuntimeException(response.getStatusCode(), response.getHeaders());
    }
    else {
      Pet pet = convertResponse(response);
      return pet;
    }
  });
```

## [](#support-for-restclient)Support for `RestClient`

The `RestClient` is just one of the [many features](https://github.com/spring-projects/spring-framework/wiki/What's-New-in-Spring-Framework-6.x#whats-new-in-version-61) that Spring Framework 6.1 offers. Various components already support `RestClient`: you can test its usage through the [`MockRestServiceServer`](https://docs.spring.io/spring-framework/reference/testing/spring-mvc-test-client.html), or use it as the backend for [`@HttpExchange` interfaces](https://docs.spring.io/spring-framework/reference/integration/rest-clients.html#rest-http-interface).

Additionally, [Spring Boot 3.2 M1](https://github.com/spring-projects/spring-boot/milestone/304) will include support for the `RestClient`.