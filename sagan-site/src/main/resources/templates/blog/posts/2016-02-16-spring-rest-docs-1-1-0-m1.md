---
title: Spring REST Docs 1.1.0.M1
source: https://spring.io/blog/2016/02/16/spring-rest-docs-1-1-0-m1
scraped: 2026-02-23T19:18:06.737Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Andy Wilkinson |  February 16, 2016 | 0 Comments
---

# Spring REST Docs 1.1.0.M1

_Releases | Andy Wilkinson |  February 16, 2016 | 0 Comments_

It's my pleasure to announce that the first milestone of Spring REST Docs 1.1 has been released. 1.1.0.M1 is available from [https://repo.spring.io/milestone/](https://repo.spring.io/milestone/).

# [](#whats-new)What's new?

## [](#rest-assured)REST Assured

As an alternative to the lightweight server-less documentation generation offered by Spring Framework's `MockMvc`, you can now use [REST Assured](http://rest-assured.io) to test and document your RESTful services. This opens up Spring REST Docs to all four corners of the JVM and beyond, allowing you to document anything that you can access via HTTP.

## [](#markdown)Markdown

Support has been added for generating Markdown snippets. On its own, Markdown isn't as capable as Asciidoctor, but can work very well when combined with existing documentation toolchains such as [Slate](https://github.com/tripit/slate).

## [](#testng)TestNG

In addition to the existing support for using JUnit, you can now use Spring REST Docs with [TestNG](http://testng.org).

# [](#whats-next)What's next?

We're hoping to publish a release candidate in around two months' time with a release to follow shortly after that. Please refer to the [issue tracker](https://github.com/spring-projects/spring-restdocs/issues) for details of what's planned and to add any enhancement ideas of your own.

Thank you for the feedback and suggestions that have shaped 1.1.0 thus far. Please try out the first milestone and let us know what you think.