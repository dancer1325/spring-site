---
title: URL Matching with PathPattern in Spring MVC
source: https://spring.io/blog/2020/06/30/url-matching-with-pathpattern-in-spring-mvc
scraped: 2026-02-23T13:55:43.172Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rossen Stoyanchev |  June 30, 2020 | 1 Comment
---

# URL Matching with PathPattern in Spring MVC

_Engineering | Rossen Stoyanchev |  June 30, 2020 | 1 Comment_

The recent Spring Framework 5.3 M1 release [announcement](https://spring.io/blog/2020/06/25/first-spring-framework-5-3-milestone-released) mentions "Spring MVC comes with `PathPattern` parsing for efficient URL matching". This post expands on that with more context and detail.

## [](#overview)Overview

In Spring applications `AntPathMatcher` is used to identify classpath, file system, remote, and other resources in Spring configuration. It has also been used in Spring MVC to match URL paths. Over time the use of patterns in web applications grew in number and syntax with `AntPathMatcher` evolving to meet those needs but some pain points remain without a solution:

1.  In web applications, patterns need to be matched many times per request and therefore any gains in performance and efficiency matter. However `String` pattern matching limits what can be achieved.
    
2.  Choosing the most specific pattern among several that match a request has proven challenging over the years with no simple ways to make it more predictable without impacting other cases.
    
3.  Matching a `String` path to a `String` pattern makes it difficult to avoid URI encoding issues. For example should the incoming path be decoded first and then matched? That allows for patterns themselves to be declared without encoded characters, but what if the request path contains `%2F` or `%3B` which are `/` and `;` respectively? Once decoded those alter the structure of the path making it harder to match reliably. We could leave the request path encoded via `UrlPathHelper#urlDecode` but then we can't use a prefix Servlet mapping because the servletPath itself is decoded, and our patterns would need to be encoded too.
    
4.  Path parameters presents a similar challenge. They can be removed before matching but what if we want to extract them via `@MatrixVariable`? We can leave them in the path with `UrlPathHelper#removeSemicolonContent` but now patterns must take into account path parameters.
    

## [](#pathpattern)PathPattern

The introduction of Spring WebFlux in Spring Framework 5.0 was a good opportunity to re-think all this and to create an alternative. That lead to the creation of the parsed `PathPattern` matched against the parsed `PathContainer` representing the URL path.

Patterns are parsed on startup and re-used at runtime for efficient URL matching. How much more efficient? It's hard to give numbers without a concrete use case but our [jmh benchmark](https://github.com/spring-projects/spring-framework/blob/master/spring-web/src/jmh/java/org/springframework/web/util/pattern/PathMatchingBenchmark.java) shows 6-8 times the throughput and 30-40% reduction in allocation rate. You can tailor the benchmark to get numbers that are more accurate for your application.

`PathPattern` is compatible with `AntPathMatcher` syntax except for the following:

1.  Support for additional syntax to match and capture 0 or more path segments at the end, e.g. `"/foo/{*spring}"`. This is useful as a catch-all pattern in REST APIs with access to the captured path segments through a `@PathVariable`.
    
2.  Support for `"**"` for multi-segment matching is only allowed at the end of a pattern. This helps to eliminate most causes of ambiguity when choosing the closest match for a given request.
    

`PathContainer` helps to address the remaining issues. For example it never decodes the full path but rather breaks it down and decodes path segments individually, also removing path parameters, with the resulting decoded and normalized values matched one at a time. Therefore encoded `"/"` and `";"` cannot alter the structure of the path, and path parameters can still be kept available. That means there is no need to configure how the request path is parsed and there are no trade-offs to consider.

## [](#spring-mvc-and-pathpattern)Spring MVC and PathPattern

Starting in Spring Framework 5.3 the use of `PathPattern` is supported in Spring MVC with all `HandlerMapping` implementations exposing a property to set a `PathPatternParser` as an alternative to using `AntPathMatcher`. The easiest way to enable this is to configure a `PathPatternParser` in the [path matching](https://docs.spring.io/spring/docs/5.3.0-M1/spring-framework-reference/web.html#mvc-config-path-matching) options of the MVC config.

In turn if the `DispatcherServlet` detects any `HandlerMapping` with parsed patterns enabled, it parses the URL path at runtime and makes it available under a well-known request attribute. The same can also be done earlier with `ServletRequestPathFilter` in which case the `DispatcherServlet` will refrain from parsing it again.

## [](#mixed-use-of-pathpattern-and-antpathmatcher)Mixed use of PathPattern and AntPathMatcher

In some cases it's possible to have one `HandlerMapping` enabled with parsed patterns and another using `AntPathMatcher`. For example a 3rd party library could register its own `HandlerMapping` bean with parsed patterns not enabled. While each `HandlerMapping` does its own matching independently, other components like interceptors need to be able to support and use either a parsed `RequestPath` with `PathPattern` or a String `lookupPath` with `AntPathMatcher` depending on which one is available.

This is why as of 5.3 such components make use of `ServletRequestPathUtils` to check which is available and use either `PathPattern` or `AntPathMatcher` accordingly. For the most part applications don't need to worry about this and the pattern syntax is largely the same so it should work just the same.

## [](#suffix-pattern-matching)Suffix Pattern Matching

On a related note, in 5.3 the use of suffix pattern matching along with other options for content negotiation via path extensions in Spring MVC has been turned off by default. Over the years this has proven to be problematic in many ways. This is why when using `PathPatternParser` this isn't even supported. Even if using `AntPathMatcher` in 5.3 you'll need to re-enable those options if you want to continue to use them.

In conclusion, going forward we expect Spring MVC applications to switch to using `PathPattern` instead of `AntPathMatcher` to take advantage of efficiency gains, improved syntax, and a more predictable way of dealing with URL path issues. Please give M1 a try with your own application, maybe run it through a benchmark, and let us know of any feedback.