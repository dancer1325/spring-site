---
title: Spring Framework 4.1 -- Spring MVC Improvements
source: https://spring.io/blog/2014/07/28/spring-framework-4-1-spring-mvc-improvements
scraped: 2026-02-23T22:18:52.797Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rossen Stoyanchev |  July 28, 2014 | 5 Comments
---

# Spring Framework 4.1 -- Spring MVC Improvements

_Engineering | Rossen Stoyanchev |  July 28, 2014 | 5 Comments_

Recently Juergen Hoeller [announced the availability](https://spring.io/blog/2014/07/21/spring-framework-4-1-release-candidate-available) of the first of two 4.1 release candidates. Brian Clozel followed up with a post on the [static web resources handling](https://spring.io/blog/2014/07/24/spring-framework-4-1-handling-static-web-resources) enhancements. Previously Stephane Nicoll blogged about [cache](https://spring.io/blog/2014/06/16/further-cache-improvements-in-spring-4-1) and [JMS](https://spring.io/blog/2014/04/30/spring-4-1-s-upcoming-jms-improvements) related improvements. The goal of this post is to summarize Spring MVC improvements.

The JDK 1.8 `java.util.Optional` is now supported for `@RequestParam`, `@RequestHeader` and `@MatrixVariable` controller method arguments while `ListenableFuture` is supported as a return value alternative to `DeferredResult` where an underlying service (or perhaps a call to `AsyncRestTemplate`) already returns ListenableFuture.

Jackson's `@JsonView` is supported directly on `@ResponseBody` and `ResponseEntity` controller methods for serializing different amounts of detail for the same POJO, e.g. summary vs detail page. This is also supported with `View`\-based rendering by adding the serialization view type as a model attribute under a special key.

[JSONP](http://en.wikipedia.org/wiki/JSONP) is now supported with Jackson. For response body methods declare an `@ControllerAdvice` as shown below. For `View`\-based rendering simply configure the JSONP query parameter name(s) on `MappingJackson2JsonView`.

```java
Copy@ControllerAdvice
private static class JsonpAdvice extends AbstractJsonpResponseBodyAdvice {

    public JsonpAdvice() {
        super("callback");
    }

}
```

Note that `@ControllerAdvice` was introduced in 3.2 for `@ExceptionHandler`, `@ModelAttribute`, and `@InitBinder` methods shared across all or a subset of controllers. `ResponseEntityExceptionHandler` is one example for global exception handling by writing error details to the body of the response. In 4.1 an `@ControllerAdvice` can also implement `ResponseBodyAdvice` in which case it will be called after the controller method returns but before the response is written and therefore committed. This has a number of useful applications with @JsonView the JSONP already serving as two examples built on it.

Two new `HttpMessageConverter` types:

-   [Gson](http://code.google.com/p/google-gson/) -- lighter footprint

than Jackson; has already been in use in Spring Android.

-   [Google Protocol Buffers](https://developers.google.com/protocol-buffers/)

(just missed RC1 but already in master for 4.1 RC2) -- efficient and effective as an inter-service communication data protocol within an enterprise but can also be exposed as JSON and XML for browsers. This comes through a contribution from [Alex Antonov](http://www.slideshare.net/mokeefe/javaone-2009-ts5276-restful-protocol-buffers).

`MvcUriComponentsBuilder` was introduced in 4.0 as a way of building links to controller methods through controller method invocation (similar to mock testing). In 4.1 views such as JSPs can also build links to controllers by referring to their mappings by name. A default name is assigned to every @RequestMapping. For example `FooController` with method `handleFoo` is assigned "FC#handleFoo" by default but the naming strategy is customizable and can be also be set explicitly through the new `name` attribute on `@RequestMapping`. A new `mvcUrl` Spring JSP tag makes this easy to use in JSP pages. The same can be done for any other view technology.

The familiar `ResponseEntity` now has a builder-style API that guides controller methods towards the preparation of server-side responses, e.g. `ResponseEntity.ok()`. For the client side there is a new `RequestEntity` also offering a builder-style API that guides towards the preparation of client-side HTTP requests.

MVC Java config and XML namespace:

-   View resolver configuration -- if you've had to configure view resolution with

content negotiation you'll likely appreciate this one. See the [updated documentation](http://docs.spring.io/spring-framework/docs/4.1.0.RC1//spring-framework-reference/html/mvc.html#mvc-config-view-resolvers).

-   Enhanced "view controllers" -- in addition to mapping URLs directly to view names

without the need for controller logic, view controllers now have built-in support for redirecting and setting the response status. An application can use this to configure redirect URLs, render 404 responses with a view, send "no content" responses, etc. Some use cases [listed here](https://jira.spring.io/browse/SPR-11543?focusedCommentId=100308&page=com.atlassian.jira.plugin.system.issuetabpanels:comment-tabpanel#comment-100308).

-   Path matching -- tese frequently used customizations are now built-in

and have also been backported to 4.0. See the [updated documentation](http://docs.spring.io/spring-framework/docs/4.1.0.RC1//spring-framework-reference/html/mvc.html#mvc-config-path-matching).

Speaking of view resolution in 4.1 we've added support for view rendering through [Groovy markup templates](http://beta.groovy-lang.org/docs/groovy-2.3.2/html/documentation/markup-template-engine.html) available in Groovy 2.3. If you've been waiting for DRY markup, along the lines of HAML (Ruby on Rails), this one is for you.

Spring MVC Test related:

-   JSON responses can be asserted with

[JSON Assert](https://github.com/skyscreamer/JSONassert) as an extra option to using JSONPath much like it has been possible to do for XML with XMLUnit.

-   MockMvcBuilder "recipies" can now be created with the help of `MockMvcConfigurer`.

This was added to make it easy to apply Spring Security setup but can be used to encapsulate common setup for any 3rd party framework or within a project.

-   `MockRestServiceServer` now supports the `AsyncRestTemplate` for client-side testing.

The [Spring MVC Test HtmlUnit](https://github.com/spring-projects/spring-test-mvc-htmlunit) extension (separate project) has also been progressing steadily with an M1 milestone. If this is of interest do check out the project's home page.

Spring Frawork 4.1 is just around the corner (end of August) and so is [SpringOne 2GX 2014](http://springone2gx.com/) in early September in Dallas, TX. Take a close look at these improvements to see if they meet your needs or if they need further improvement. Do come to this year's SpringOne where we have a great lineup for the Web and JavaScript track.