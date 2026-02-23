---
title: Spring REST Docs 2.0.0.RC1
source: https://spring.io/blog/2017/10/30/spring-rest-docs-2-0-0-rc1
scraped: 2026-02-23T16:17:17.548Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Andy Wilkinson |  October 30, 2017 | 0 Comments
---

# Spring REST Docs 2.0.0.RC1

_Releases | Andy Wilkinson |  October 30, 2017 | 0 Comments_

On behalf of everyone who contributed, it's my pleasure to announce that Spring REST Docs 2.0.0.RC1 has been released and is available from [https://repo.spring.io/milestone/](https://repo.spring.io/milestone/).

# [](#whats-new)What's new?

Spring REST Docs 2.0 is the latest generation of the project and requires Spring Framework 5.0 and Java 8.

The main highlight of the 2.0 release is support for using Spring WebFlux's `WebTestClient` to document an API. `WebTestClient` can be used for lightweight testing and documentation of APIs implemented using WebFlux Fn and WebFlux's annotation-based programming model. It can also be used to document any API that's accessible via HTTP, something that was previously only possible when using REST Docs' REST Assured support.

For more information about the new `WebTestClient` support and the other changes in 2.0, please refer to the [release notes](https://github.com/spring-projects/spring-restdocs/wiki/Spring-REST-Docs-2.0-Release-Notes).

# [](#whats-next)What's next?

We're hoping to publish a release in a few weeks' time. Please take the release candidate for a spin and [let us know](https://github.com/spring-projects/spring-restdocs/issues/new) if you find any problems or if you have a suggestion for some last-minute improvements.

[Project Page](https://projects.spring.io/spring-restdocs/) | [GitHub](https://github.com/spring-projects/spring-restdocs) | [Issues](https://github.com/spring-projects/spring-restdocs/issues) | [Documentation](https://docs.spring.io/spring-restdocs/docs/2.0.0.RC1/reference/html5/) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-restdocs) | [Gitter](https://gitter.im/spring-projects/spring-restdocs)