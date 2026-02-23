---
title: Spring Framework 5.0 M2 released
source: https://spring.io/blog/2016/09/21/spring-framework-5-0-m2-released
scraped: 2026-02-23T19:03:17.170Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  September 21, 2016 | 5 Comments
---

# Spring Framework 5.0 M2 released

_Releases | Juergen Hoeller |  September 21, 2016 | 5 Comments_

Dear Spring community,

It is my pleasure to announce that the second Spring Framework 5.0 milestone is available now: Check [http://projects.spring.io/spring-framework/](http://projects.spring.io/spring-framework/) for how to obtain it from our milestone repository, and keep your feedback coming!

This release introduces a functional web endpoint variant, based on the same foundation as our reactive `@Controller` model (introduced in 5.0 M1). Stay tuned for [Arjen's dedicated blog post](https://spring.io/blog/2016/09/22/new-in-spring-5-functional-web-framework), coming up tomorrow! Here's a teaser...

```java
CopyRouterFunction<String> route =
    route(GET("/hello-world"),
        request -> Response.ok().body(fromObject("Hello World")));
```

On our mission towards Java 9, this is also our first framework version to allow for building on JDK 9 out of the box, including the entire test suite. We run on JDK 8 by default but you may simply switch `JAVA_HOME` to a JDK 9 installation instead.

Cheers, Juergen