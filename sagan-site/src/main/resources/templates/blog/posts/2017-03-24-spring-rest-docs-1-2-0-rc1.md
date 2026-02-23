---
title: Spring REST Docs 1.2.0.RC1
source: https://spring.io/blog/2017/03/24/spring-rest-docs-1-2-0-rc1
scraped: 2026-02-23T16:35:57.041Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Andy Wilkinson |  March 24, 2017 | 0 Comments
---

# Spring REST Docs 1.2.0.RC1

_Releases | Andy Wilkinson |  March 24, 2017 | 0 Comments_

On behalf of everyone who contributed, it's my pleasure to announce that Spring REST Docs 1.2.0.RC1 has been released and is available from [https://repo.spring.io/milestone/](https://repo.spring.io/milestone/).

# [](#whats-new)What's new?

A complete overview of what's new in 1.2 can be found in the [release notes](https://github.com/spring-projects/spring-restdocs/wiki/Spring-REST-Docs-1.2-Release-Notes). The following are some of the highlights.

## [](#improved-asciidoctor-integration)Improved Asciidoctor integration

REST Docs now has a new module, `spring-restdocs-asciidoctor`, that makes it easier to use the generated snippets in your documentation. A [new macro](http://docs.spring.io/spring-restdocs/docs/1.2.0.RC1/reference/html5/#working-with-asciidoctor-including-snippets-operation) means that you can import multiple snippets for the same operation in a single line. [This update to the samples](https://github.com/spring-projects/spring-restdocs/commit/58bf231c8a422ece52dc6a9af007c543b009e522) shows the benefit of adopting the macro.

## [](#better-support-for-documenting-large-and-complex-payloads)Better support for documenting large and complex payloads

To help to make your documentation easier to consume, the documentation of large and complex payloads can now be split up. Subsections of the payloads can be documented individually allowing your documentation to guide your users through the pieces that matter.

## [](#snippets-for-request-and-response-bodies)Snippets for request and response bodies

Snippets that document the body of a request or response are now included in the default snippets. You can also use these snippets explicitly to document a subsection of a large or complex body.

# [](#whats-next)What's next?

We're hoping to publish a release in a few weeks' time. Please take the release candidate for a spin and [let us know](https://github.com/spring-projects/spring-restdocs/issues/new) if you find any problems or if you have a suggestion for some last-minute improvements.