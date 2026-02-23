---
title: Spring REST Docs 1.1.0.RC1
source: https://spring.io/blog/2016/04/28/spring-rest-docs-1-1-0-rc1
scraped: 2026-02-23T19:17:19.326Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Andy Wilkinson |  April 28, 2016 | 3 Comments
---

# Spring REST Docs 1.1.0.RC1

_Engineering | Andy Wilkinson |  April 28, 2016 | 3 Comments_

Following [1.1.0.M1](https://spring.io/blog/2016/02/16/spring-rest-docs-1-1-0-m1), it's my pleasure to announce that Spring REST Docs 1.1.0.RC1 has been released and is available from [https://repo.spring.io/milestone/](https://repo.spring.io/milestone/).

# [](#whats-new)What's new?

## [](#httpie-request-snippet)HTTPie request snippet

A new [HTTPie](http://httpie.org) request snippet has been introduced. Similar to the existing curl request snippet, the new snippet contains the HTTPie command for a request. My thanks to [Raman Gupta](https://github.com/rocketraman) who contributed this new feature.

## [](#reusable-snippets)Reusable snippets

Snippets can now be created once with some common configuration and then [reused](http://docs.spring.io/spring-restdocs/docs/1.1.0.RC1/reference/html5/#documenting-your-api-reusing-snippets). This reduces repetition when documenting common parts on an API, such as `self` links.

## [](#relaxed-snippets)Relaxed snippets

By default, Spring REST Docs will cause your tests to fail if you've neglected to document something or if you've attempted to document something that doesn't exist. This is great for detailed API documentation, but can be restrictive when documenting a scenario where you want to focus on a specific part of a request or response. Rather than having to explicitly ignore everything that you don't want to document, you can now use relaxed snippets for documenting links, request and response fields, and request and path parameters.

# [](#whats-next)What's next?

We're hoping to publish a release in a few weeks' time. Please take the release candidate for a spin and [let us know](https://github.com/spring-projects/spring-restdocs/issues/new) if you find any problems or if you have a suggestion for some last-minute improvements.

If you'd like to learn more about Spring REST Docs and test-driven documentation, I'll be speaking about it in May at the [Spring/IO conference](http://www.springio.net/) in Barcelona. I'd love to see you there.