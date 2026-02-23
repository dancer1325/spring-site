---
title: HTTP Service Client Enhancements
source: https://spring.io/blog/2025/09/23/http-service-client-enhancements
scraped: 2026-02-22T22:09:47.311Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rossen Stoyanchev |  September 23, 2025 | 5 Comments
---

# HTTP Service Client Enhancements

_Engineering | Rossen Stoyanchev |  September 23, 2025 | 5 Comments_

In this 3rd blog post of the [Road to GA](https://spring.io/blog/2025/09/02/road_to_ga_introduction) series that’s highlighting major features within the Spring portfolio for [the next major versions to be released in November](https://spring.io/blog/2024/10/01/from-spring-framework-6-2-to-7-0) we’ll have a look at new features for HTTP service clients, which are a collaborative effort across several Spring projects.

# [](#introduction)Introduction

Spring Framework 6 introduced the ability to define an HTTP service through a Java interface with `@HttpExchange`\-annotated methods. For example:

```java
Copypublic interface MilestoneService {

    @GetExchange("/repos/{org}/{repo}/milestones")
    List<Milestone> getMilestones(@PathVariable String org, @PathVariable String repo);

}
```

On the client side, you can have a proxy generated from the interface to perform HTTP requests as follows:

```java
Copy// Initialize HTTP client
RestClient restClient = RestClient.create("https://api.github.com");

// Create factory for client proxies
HttpServiceProxyFactory proxyFactory = HttpServiceProxyFactory.builder()
        .exchangeAdapter(RestClientAdapter.create(restClient))
        .build();

// Create client proxy
MilestoneService client = proxyFactory.createClient(MilestoneService.class);

// Use proxy for HTTP requests
List<Milestone> milestones = client.getMilestones(“spring-projects”, “spring-framework”);
```

On the server side, an `@Controller` class can implement the same interface to handle requests, if the HTTP service is yours.

HTTP service client support is powerful, expressive, and easy to use. It allows one team to own the knowledge of how a REST API works, what parts are relevant to a client application, what input and output types to create, what endpoint method signatures are needed, what javadoc to have, and so on. The resulting Java API guides developers and is ready to use.

These patterns, long used with Spring Cloud OpenFeign, have become available to all Spring Framework 6+ applications to use with `RestClient`, `RestTemplate`, or `WebClient`. The HTTP service client support went through plenty of feedback-driven evolution in the 6.x timeline, but one major challenge remained.

# [](#configuration-overhead)Configuration Overhead

It’s trivial to create an `HttpServiceProxyFactory`, and use it to create a client proxy, or two, or three, but as the number grows, this becomes repetitive and cumbersome especially since client proxies are typically declared as Spring beans. Consider for example:

```java
Copy@Bean
MilestoneService milestoneService(HttpServiceProxyFactory factory) {
    return factory.createClient(MilestoneService.class);
}

@Bean
ReleaseService releaseService(HttpServiceProxyFactory factory) {
    return factory.createClient(ReleaseService.class);
}

// More client beans

@Bean
HttpServiceProxyFactory proxyFactory(RestClient.Builder clientBuilder) {
    RestClient client = clientBuilder.baseUrl("https://api.github.com").build();
    return HttpServiceProxyFactory.builderFor(RestClientAdapter.create(client)).build();
}
```

REST APIs expose many fine-grained endpoints. The GitHub API has tens, if not hundreds, and while you certainly don’t need all, it’s easy to end up with at least a dozen or more depending on the actual need.

Furthermore, it’s common to integrate with multiple REST APIs, which means even more interfaces as well as higher complexity to configure underlying HTTP clients.

# [](#http-service-registry)HTTP Service Registry

To address this challenge, [Spring Framework 7](https://docs.spring.io/spring-framework/reference/7.0-SNAPSHOT/integration/rest-clients.html#rest-http-service-client-group-config) introduces an additional registry layer over the `HttpServiceProxyFactory` that provides the following:

-   configuration model to register HTTP interfaces and initialize HTTP client infrastructure
-   transparent creation and registration of client proxies as Spring beans
-   access to all client proxies via `HttpServiceProxyRegistry`

In the configuration model, HTTP services are organized by group where a group is just a set of HTTP services that share the same HTTP client configuration, and the resulting client instance.

Currently, there are two ways to declare HTTP services.

## [](#declarative-registration)Declarative Registration

One way to declare the HTTP service groups is through the `@ImportHttpServices` annotation (new in Spring Framework 7).

You can use it to manually list HTTP services by group:

```java
Copy@ImportHttpServices(group = "github", types = {MilestoneService.class, … })
@ImportHttpServices(group = "stackoverflow", types = {QuestionService.class, … })
@Configuration
public class DemoConfig {
}
```

Or have them detected under a base package:

```java
Copy@ImportHttpServices(group = "github", basePackages = “"client.github")
@ImportHttpServices(group = "stackoverflow", basePackages = “client.stackoverflow”)
@Configuration
public class DemoConfig {
}
```

An HTTP service group is configured with `RestClient` by default, but you can switch to `WebClient` through the `clientType` attribute of the annotation.

## [](#programmatic-registration)Programmatic Registration

If you need more control over filtering or other registration logic, you can also declare HTTP services programmatically in two steps.

First, create a registrar that declares the HTTP service groups:

```java
Copypublic class CustomHttpServiceRegistrar extends AbstractHttpServiceRegistrar { 

    @Override
    protected void registerHttpServices(GroupRegistry registry, AnnotationMetadata metadata) {
        registry.forGroup("github").detectInBasePackages(“client.github);
        // more registrations…
    }
}
```

And then import the registrar:

```java
Copy@Configuration
@Import(CustomHttpServiceRegistrar.class) 
public class ClientConfig {
}
```

Note that both the declarative and the programmatic registration rely on [ImportBeanDefinitionRegistrar](https://docs.spring.io/spring-framework/docs/7.0.0-SNAPSHOT/javadoc-api/org/springframework/context/annotation/ImportBeanDefinitionRegistrar.html), which hooks in very early in the Spring configuration lifecycle, at the bean definition level. This makes client proxy beans available for dependency injection and helps to avoid lifecycle issues.

## [](#http-client-initialization)HTTP Client Initialization

Once HTTP services groups have been declared, what remains is to configure the HTTP client for each group. You can use an `HttpServiceGroupConfigurer` bean method for that. For example:

```java
Copy@Bean
RestClientHttpServiceGroupConfigurer groupConfigurer() {
    return groups -> {

        groups.filterByName("github").forEachClient((_, builder) ->
                builder.baseUrl("https://api.github.com"));

        groups.filterByName("stackoverflow").forEachClient((_, builder) ->
                builder.baseUrl("https://api.stackexchange.com?site=stackoverflow"));
    };
}
```

You can have as many HTTP service group configurers as necessary, and those can be application or framework owned.

For example, [Spring Boot 4.0](https://docs.spring.io/spring-boot/4.0-SNAPSHOT/reference/io/rest-client.html#io.rest-client.httpservice.importing) transparently applies initialization of the HTTP client builder for each group through its `RestClient` and `WebClient` auto configuration. Furthermore, it also provides support for HTTP client properties by group:

```
Copy# Global, applies to all groups
spring.http.client.service.read-timeout=2s

# GitHub group
spring.http.client.service.group.github.base-url=https://api.github.com

# Stackoverflow group
spring.http.client.service.group.stackoverflow.base-url=https://api.stackexchange.com
```

Spring Cloud 2025.1 provides transparent support for [load-balancing](https://docs.spring.io/spring-cloud-commons/reference/5.0-SNAPSHOT/spring-cloud-commons/loadbalancer.html#_loadbalancer_integration_for_spring_interface_clients_autoconfiguration) and [circuit-breaking](https://docs.spring.io/spring-cloud-commons/reference/5.0-SNAPSHOT/spring-cloud-circuitbreaker.html#interface-clients) for HTTP service groups.

Spring Security 7.0 provides [OAuth support](https://docs.spring.io/spring-security/reference/7.0-SNAPSHOT/features/integrations/rest/http-interface.html#configuration-restclient) for HTTP service groups that detects a `@ClientRegistrationId` annotation on `@HttpExchange` methods. Additional authentication support is under consideration with [spring-security#17940](https://github.com/spring-projects/spring-security/issues/17940).

# [](#summary)Summary

The new HTTP service registry lets applications declare HTTP services and configure underlying client infrastructure while the framework does the rest. It is also an extensible mechanism for powerful, out-of-the-box HTTP client initialization features.

We know there is a wide range of scenarios and perspectives on this topic, and also a long history of prior experience with OpenFeign. At the same time when we bring a capability into the Spring Framework it is an opportunity to revisit it with a fresh perspective, and provide something more minimal and widely useful. We need you to give what we have come up with a try, and let us know how it works in your concrete scenarios.

Samples:

-   [GitHub and StackOverflow clients](https://github.com/rstoyanchev/springio25-service-registry)
-   [Spring Cloud](https://github.com/OlgaMaciaszek/interface-clients-springio-2025-demo)