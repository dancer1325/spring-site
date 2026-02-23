---
title: Spring REST Docs 1.0.0.RC1
source: https://spring.io/blog/2015/09/08/spring-rest-docs-1-0-0-rc1
scraped: 2026-02-23T19:43:18.219Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Andy Wilkinson |  September 08, 2015 | 0 Comments
---

# Spring REST Docs 1.0.0.RC1

_Engineering | Andy Wilkinson |  September 08, 2015 | 0 Comments_

I'm delighted to announce that [Spring REST Docs](https://github.com/spring-projects/spring-restdocs) 1.0.0.RC1 has been released and is available from our [milestone repository](https://repo.spring.io/milestone).

If you'd like to see some examples of what can be produced with Spring REST Docs, please take a look at the [sample documentation](http://docs.spring.io/spring-restdocs/docs/1.0.0.BUILD-SNAPSHOT/samples/restful-notes/).

## [](#whats-new)What's new

-   Support for [documenting path parameters](http://docs.spring.io/spring-restdocs/docs/1.0.0.RC1/reference/html5/#documenting-your-api-path-parameters)
-   Support for documenting multipart requests
-   Support for [documenting constraints declared using the Bean Validation API](http://docs.spring.io/spring-restdocs/docs/1.0.0.RC1/reference/html5/#documenting-your-api-constraints)
-   Improved extensibility
-   Improved configurability, including [template-based snippet rendering that allows you to take complete control over the generated snippets](http://docs.spring.io/spring-restdocs/docs/1.0.0.RC1/reference/html5/#documenting-your-api-customizing)

## [](#getting-started)Getting started

To get started with Spring REST Docs, please refer to the [getting started section](http://docs.spring.io/spring-restdocs/docs/1.0.0.RC1/reference/html5/#getting-started) of the [reference documentation](http://docs.spring.io/spring-restdocs/docs/1.0.0.RC1/reference/html5/).

## [](#upgrading)Upgrading

If you're upgrading to Spring REST Docs from 1.0.0.M1, you'll need to change your dependency from `spring-restdocs` to `spring-restdocs-mockmvc`.

## [](#schedule)Schedule

Spring REST Docs 1.0.0.RELEASE is planned for early October. Please grab the RC and [let us know](https://github.com/spring-projects/spring-restdocs/issues) about any problems you encounter.

## [](#springone-2015)SpringOne 2015

I'll be talking about [documenting RESTful APIs](https://2015.event.springone2gx.com/schedule/sessions/documenting_restful_apis.html), including some live coding with Spring REST Docs, at this year's [SpringOne](http://springone2gx.com) in Washington, DC. I'd love to see you there.