---
title: Spring HATEOAS brings you new ways to configure clients
source: https://spring.io/blog/2020/04/22/spring-hateoas-brings-you-new-ways-to-configure-clients
scraped: 2026-02-23T14:04:04.172Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Greg L. Turnquist |  April 22, 2020 | 6 Comments
---

# Spring HATEOAS brings you new ways to configure clients

_Engineering | Greg L. Turnquist |  April 22, 2020 | 6 Comments_

Dear Spring community,

With Spring HATEOAS’s recent `1.1.0.M3` release, we bring you a new way to configure clients!

The first step in building hypermedia-based services may be configuring your server, which Spring HATEOAS has provided for a long time through its `@EnableHypermediaSupport()`.

The next major step is building a client that can parse that hypermedia output. This has always been available, but it required you to know some of the deepest innards of the Spring Framework.

Until today.

With the latest version of Spring HATEOAS, it has been made *much* easier to configure `RestTemplate`, `WebClient`, or `WebTestClient` instances.

## [](#configuring-resttemplate)[](#configuring-resttemplate)Configuring `RestTemplate`

Spring HATEOAS now creates a bean called the `HypermediaRestTemplateConfigurer`. Grab it and you can apply it to any `RestTemplate` instance you have.

```
Copy@Bean
RestTemplate restTemplate(HypermediaRestTemplateConfigurer configurer) {
  return configurer.registerHypermediaTypes(new RestTemplate());
}
```

This example shows that after creating a `RestTemplate` instance, you can pipe it into that `HypermediaRestTemplateConfigurer` via its `registerHypermediaTypes`. In this context, it gets registered as a bean in the user’s application.

If you’re using Spring Boot (as you should!), there is an even better way.

```
Copy@Bean
RestTemplateCustomizer restTemplateCustomizer(
                                   HypermediaRestTemplateConfigurer configurer) {
    return restTemplate -> {
        configurer.registerHypermediaTypes(restTemplate);
    };
}
```

This bean will get picked up and applied to Spring Boot’s autoconfigured `RestTemplateBuilder`. Anytime you need a `RestTemplate`, you simply inject `RestTemplateBuilder`, apply any final adjustments (credentials, cache settings, etc.) and invoke `build()`. This gives you a concrete `RestTemplate` with hypermedia support applied.

Important

Spring Boot has long moved past the concept of having a single `RestTemplate` bean registered in the application context. Instead it supports the customizer-based approach. However, Spring HATEOAS will *still* automatically configure a `RestTemplate` if you register it as a bean.

Either way, Spring HATEOAS makes it super simple to register hypermedia support with your `RestTemplate`.

## [](#configuring-webclient-instances)[](#configuring-webclient-instances)Configuring `WebClient` instances

If you’re building reactive applications using Spring WebFlux, you’re probably itching to use `WebClient`, Spring’s newest client that has reactive built in. To wire it for hypermedia, you’ll want to get a hold of Spring HATEOAS’s `HypermediaWebClientConfigurer`.

```
Copy@Bean
WebClient.Builder webClientBuilder(HypermediaWebClientConfigurer configurer) {
  return configurer.registerHypermediaTypes(WebClient.builder());
}
```

This bean will grab the `HypermediaWebClientConfigurer` and apply it to the the `WebClient.Builder` created via it’s static helper method (`builder()`), returning a `WebClient.Builder`.

Remember how Boot has that `RestTemplateBuilder`? `WebClient` already has something just like that in the Spring Framework.

And if you want to configure things in Spring Boot, this is how you do that:

```
Copy@Bean
WebClientCustomizer webClientCustomizer(HypermediaWebClientConfigurer configurer) {
    return webClientBuilder -> {
        configurer.registerHypermediaTypes(webClientBuilder);
    };
}
```

Spring Boot autoconfigures a `WebClient.Builder`. And it applies any `WebClientCustomizer` beans, makingg it super easy to add hypermedia support. To use it, just inject that `WebClient.Builder` into your app, apply any extra settings (credentials, etc.) , and hit `build()` to get a `WebClient` instance.

This even has support for `WebTestClient`, but this post is already long enough. Go and [chew on the reference docs](https://docs.spring.io/spring-hateoas/docs/1.1.0.BUILD-SNAPSHOT/reference/html/#client.web-test-client) if you are eager to include hypermedia-based unit testing in your application as well.

Cheers!