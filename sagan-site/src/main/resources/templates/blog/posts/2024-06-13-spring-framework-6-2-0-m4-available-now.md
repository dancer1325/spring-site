---
title: Spring Framework 6.2.0-M4 available now
source: https://spring.io/blog/2024/06/13/spring-framework-6-2-0-m4-available-now
scraped: 2026-02-23T08:28:58.599Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  June 13, 2024 | 0 Comments
---

# Spring Framework 6.2.0-M4 available now

_Releases | Brian Clozel |  June 13, 2024 | 0 Comments_

We are happy to announce the availability of the fourth milestone of Spring Framework 6.2. We shipped quite a few features since our [last M3 release](https://spring.io/blog/2024/05/22/spring-framework-6-2-0-m3-available-now).

Spring Framework 6.2.0-M4 is available from [repo.spring.io/milestone](https://repo.spring.io/milestone) now, check out the [detailed release notes for this version](https://github.com/spring-projects/spring-framework/releases/tag/v6.2.0-M4).

## [](#core-and-testing)Core and Testing

[The `Task` and `ScheduledTask` types now expose metadata about their execution](https://github.com/spring-projects/spring-framework/issues/24560): last execution time and outcome, next scheduled execution time...

We also made further refinements for the new `@TestBean` and `@MockitoBean` support. You can [read our reference documentation](https://docs.spring.io/spring-framework/reference/6.2/testing/annotations/integration-spring/annotation-testbean.html#page-title) to see this feature in action.

## [](#web-and-messaging)Web and Messaging

`@ExceptionHandler` methods are now more flexible as [they support content negotiation during the error handling phase](https://github.com/spring-projects/spring-framework/issues/31936). This means that you can tailor error handling depending on the content type requested by the HTTP client.

Here's a code snippet showing this feature in action:

```
Copy@ExceptionHandler(produces = "application/json")
public ResponseEntity<ErrorMessage> handleJson(IllegalArgumentException exc) {
	return ResponseEntity.badRequest().body(new ErrorMessage(exc.getMessage(), 42));
}

@ExceptionHandler(produces = "text/html")
public String handle(IllegalArgumentException exc, Model model) {
	model.addAttribute("error", new ErrorMessage(exc.getMessage(), 42));
	return "errorView";
}
```

Here, automated clients will get a JSON response, while browsers will display an HTML error page with custom messages.

The community requested the following enhancements - and they're now available!

-   [`RestClient` now supports request attributes](https://github.com/spring-projects/spring-framework/issues/32027) - a popular request from the community.
-   [Codecs and converters now officially support Protobuf 4.x](https://github.com/spring-projects/spring-framework/issues/33011), raising our baseline to Protobuf 3.29.
-   [The new CHIPS feature being deployed by browser](https://developer.mozilla.org/en-US/docs/Web/Privacy/Privacy_sandbox/Partitioned_cookies) vendors require changes in applications using third-party cookies. Reactive web servers (except Undertow) now [support Partitioned cookies](https://github.com/spring-projects/spring-framework/issues/31454).
-   We have introduced [data binding support from HTTP request headers](https://github.com/spring-projects/spring-framework/issues/32676), to `@ModelAttribute` controller method arguments.

## [](#62-features-recap)6.2 features recap

Check out our [What's New page](https://github.com/spring-projects/spring-framework/wiki/What's-New-in-Spring-Framework-6.x#whats-new-in-version-62) for details about the new features available at this point.