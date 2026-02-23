---
title: Spring HATEOAS 1.0 M1 released
source: https://spring.io/blog/2019/03/05/spring-hateoas-1-0-m1-released
scraped: 2026-02-23T14:38:00.435Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Greg L. Turnquist |  March 05, 2019 | 7 Comments
---

# Spring HATEOAS 1.0 M1 released

_Releases | Greg L. Turnquist |  March 05, 2019 | 7 Comments_

Dear Spring community, we’re proud to announce the first milestone of Spring HATEOAS 1.0. Spring HATEOAS has been in development for almost seven years now. What started as tiny extension to Spring MVC became the foundation for Spring Data REST later on and has served as a fundamental building block for hypermedia based APIs in Spring MVC applications.

We received a lot of input for more advanced features from the community and eventually decided that it was time to integrate those into the library. Also, we gained a significant amount of experience using the library in the wild and thought we should take the chance to reflect those learnings in a 1.0 release.

Here’s the summary:

-   General overhaul in package design and domain model language.
    
-   Upgrade to Java 8 and Spring Framework 5.1 as baseline.
    
-   Advanced hypermedia support through affordances API (HAL-FORMS, Collection+JSON, UBER).
    
-   Hypermedia support SPI to plug custom media type implementations.
    
-   `LinkBuilder` implementation for Spring WebFlux.
    
-   Completely overhauled [reference documentation](https://docs.spring.io/spring-hateoas/docs/1.0.0.M1/reference/html/).
    

Let’s have a detailed look at some of those features.

## [](#overhaul-of-packaging-and-types)[](#overhaul)Overhaul of packaging and types

Before releasing 1.0, we took the chance to re-evaluate the package structure as well as the terminology we expose in our domain types. That led to quite a few significant changes compared to our 0.x releases.

The most fundamental change is the fact that Spring HATEOAS doesn’t create resources. That’s what Spring MVC/Spring WebFlux does. We create vendor neutral [representations of hypermedia](https://docs.spring.io/spring-hateoas/docs/1.0.0.M1/reference/html/#migrate-to-1.0.changes.representation-models). So we renamed those core types:

-   `ResourceSupport` is now `RepresentationModel`
    
-   `Resource<T>` is now `EntityModel<T>`
    
-   `Resources<T>` is now `CollectionModel<T>`
    
-   `PagedResources<T>` is now `PagedModel<T>`
    

As a side effect, `ResourceAssembler` is now `RepresentationModelAssembler` and its methods are now `toModel(…​)` and `toCollection(…​)`. There are similar changes throughout the code base reflecting this change.

Many APIs are centered on the concept of `List<Link>` including `RepresentationModel.getLinks()`. Instead of a Java list, we now return `Links` which has been significantly enhanced to make it easier to combine, extract, and merge links. The core abstractions `LinkBuilder`, `EntityLinks`, `RelProvider`, `LinkDiscoverer` have been grouped into `server` and `client` packages respectively.

Sound overwhelming? We’ve got you covered. We [wrote a script](https://github.com/spring-projects/spring-hateoas/blob/master/etc/migrate-to-1.0.sh) that will migrate most of your code to the new types and import statements on a best effort basis. It may not cover everything, but should vastly ease migration.

## [](#spring-webflux-support)[](#webflux)Spring WebFlux support

One of the most critical features in this release is support for Spring WebFlux and Reactive programming. This includes:

-   Building links reactively.
    
-   Serving hypermedia to WebFlux endpoints.
    
-   Support for WebFlux’s `WebClient` to consume hypermedia.
    

Spring HATEOAS comes with `WebFluxLinkBuilder` so you can reactively build links. It will automatically pick up the base URI hosted by the server and merged it with the path to your endpoint.

Example 1. Reactively create links and affordances

```
Copyimport static org.springframework.hateoas.server.reactive.WebFluxLinkBuilder.*;

@GetMapping("/employees")
public Mono<CollectionModel<EntityModel<Employee>>> all() {

  var controller = methodOn(WebFluxEmployeeController.class);

  return Flux.fromIterable(EMPLOYEES.keySet())
    .flatMap(id -> findOne(id))
    .collectList()
    .flatMap(resources -> linkTo(controller.all()).withSelfRel() (1)
      .andAffordance(controller.newEmployee(null)) (2)
      .andAffordance(controller.search(null, null))
      .toMono() (3)
      .map(selfLink -> new CollectionModel<>(resources, selfLink)));
}
```

1.  Link to a WebFlux endpoint that has Reactor types.
    
2.  Add affordances in a domain-friendly way (read more on that below).
    
3.  Hand back a `Mono` so you can do any extra Reactor operations.
    

Assuming this controller were hosted at [http://example.com](http://example.com), expect a hypermedia document with links to [http://example.com/employees](http://example.com/employees) to be served up.

In addition to building links reactively, your WebFlux endpoints will now render hypermedia when you return a [`RepresentationModel`](#overhaul)\-based type, whether or not it’s wrapped in a Reactor type.

## [](#affordances)[](#affordances)Affordances

Something we have been developing over the past two years are [Affordances](https://docs.spring.io/spring-hateoas/docs/1.0.0.M1/reference/html/#fundamentals.affordances). We got valuable input by [@dschulten](https://github.com/dschulten) from Escalon and the team around [@anderruiz](https://github.com/anderruiz) at HDIV Security on how to gather metadata to render more advanced media types that describe resource interaction in much more detail than the already supported HAL. You saw a snippet of that metadata gathering API in the WebFlux endpoint up above.

By linking related operations together, it’s possible to generate affordance-aware media types like HAL-FORMS (shown below):

Example 2. HAL-FORMS example output generated from the affordance API

```
Copy{
  "firstName" : "Frodo",
  "lastName" : "Baggins",
  "role" : "ring bearer",
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/employees/1"
    }
  },
  "_templates" : {
    "default" : {
      "title" : null,
      "method" : "put",
      "contentType" : "",
      "properties" : [ {
        "name" : "firstName",
        "required" : true
      }, {
        "name" : "lastName",
        "required" : true
      }, {
        "name" : "role",
        "required" : true
      } ]
    },
    "partiallyUpdateEmployee" : {
      "title" : null,
      "method" : "patch",
      "contentType" : "",
      "properties" : [ {
        "name" : "firstName",
        "required" : false
      }, {
        "name" : "lastName",
        "required" : false
      }, {
        "name" : "role",
        "required" : false
      } ]
    }
  }
}
```

This affordance-aware media type provides all the information you need to perform updates to this resource.

## [](#new-media-types)[](#mediatypes)New media types

Speaking of HAL-FORMs, we’ve added *several* new media types:

-   [HAL-FORMS](https://docs.spring.io/spring-hateoas/docs/1.0.0.M1/reference/html/#mediatypes.hal-forms)
    
-   [Collection+JSON](https://docs.spring.io/spring-hateoas/docs/1.0.0.M1/reference/html/#mediatypes.collection-json)
    
-   [UBER](https://docs.spring.io/spring-hateoas/docs/1.0.0.M1/reference/html/#mediatypes.uber)
    

But why stop there? While we are planning to support other media types, it shouldn’t stop you from creating your own. We’ve introduce a new SPI that lets you write [your own custom media type](https://docs.spring.io/spring-hateoas/docs/1.0.0.M1/reference/html/#mediatypes.custom) and register it with Spring HATEOAS so you can use it with Spring MVC, `RestTemplate` beans, Spring WebFlux, and `WebClient` beans.

## [](#updated-and-enhanced-documentation)[](#ref-docs)Updated and enhanced documentation

Not sure if you’ve noticed, but the Spring team has been upgrading all of its documentation. We have too! We have also started to [clean up and overhaul the content](https://docs.spring.io/spring-hateoas/docs/1.0.0.M1/reference/html/), so be sure to take a tour. We’re going to tweak more of this in the upcoming milestones. Anything missing? Let us know! With over [80 closed issues](https://docs.spring.io/spring-hateoas/docs/1.0.0.M1/changelog.txt), be sure to check things out. And let us know what you think!

## [](#spring-data-rest)[](#spring-data-rest)Spring Data REST

One cannot discuss Spring HATEOAS without mentioning Spring Data REST.

All of these changes coming with Spring HATEOAS are being picked up and adapted to in Spring Data REST’s latest snapshot releases. The overall plan is for Spring Data - Release train **Moore** to upgrade to Spring HATEOAS 1.0. That means things like affordances and new media types will become a part of Spring Data REST.

## [](#spring-framework-51-support)[](#spring-framework-5-1-support)Spring Framework 5.1 support

Spring HATEOAS 1.0 is now based upon Spring Framework 5.1. This means that things like **Forwarded** header handling is delegated to Spring Framework to manage. If you’re proxy server in front of your application is sending proper headers, and your Spring HATEOAS powered API is suddenly NOT rewriting URIs, you need to configure header handling.

If you are using Spring Boot, this is all you need:

server.use-forward-headers=true

If you are NOT using Spring Boot, then you must configure something like this:

```
Copy@Bean
public FilterRegistrationBean<ForwardedHeaderFilter> forwardedHeaderFilter() {

  var filter = new FilterRegistrationBean<>();
  filter.setFilter(new ForwardedFilter());

  return filter;
}
```

For more details check out [Spring Framework’s Forwarded header filter](https://docs.spring.io/spring/docs/5.1.5.RELEASE/spring-framework-reference/web.html#filters-forwarded-headers).

Check out the project links below.

Links: [Project Page](http://spring.io/projects/spring-hateoas) | [GitHub](https://github.com/spring-projects/spring-hateoas) | [Issues](https://github.com/spring-projects/spring-hateoas/issues)

Being a milestone release, you’ll find the artifacts at [https://repo.spring.io/libs-milestone](https://repo.spring.io/libs-milestone).