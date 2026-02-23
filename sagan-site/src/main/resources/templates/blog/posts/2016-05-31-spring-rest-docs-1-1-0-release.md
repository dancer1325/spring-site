---
title: Spring REST Docs 1.1.0.RELEASE
source: https://spring.io/blog/2016/05/31/spring-rest-docs-1-1-0-release
scraped: 2026-02-23T19:14:57.418Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Andy Wilkinson |  May 31, 2016 | 0 Comments
---

# Spring REST Docs 1.1.0.RELEASE

_Releases | Andy Wilkinson |  May 31, 2016 | 0 Comments_

It's my pleasure to announce the release of Spring REST Docs 1.1.0.RELEASE which is now available for Maven Central, JCenter and our [release repository](https://repo.spring.io/libs-release).

# [](#highlights)Highlights

## [](#rest-assured)REST Assured

As an alternative to the lightweight server-less documentation generation offered by Spring Framework's `MockMvc`, you can now use [REST Assured](http://rest-assured.io) to test and document your RESTful services. This opens up Spring REST Docs to all four corners of the JVM and beyond, allowing you to document anything that you can access via HTTP.

The [samples](https://github.com/spring-projects/spring-restdocs/tree/v1.1.0.RELEASE/samples) now include [an app](https://github.com/spring-projects/spring-restdocs/tree/v1.1.0.RELEASE/samples/rest-notes-grails) that is documented using REST Docs, built using Grails, and tested using Spock. A third-party sample that uses REST Docs to document an API implemented using Ratpack is also [available](https://github.com/ratpack/example-books). My thanks to [Jenn Strater](https://github.com/jlstrater) who wrote both samples.

## [](#markdown)Markdown

Support has been added for generating Markdown snippets. On its own, Markdown isn't as capable as Asciidoctor, but can work very well when combined with existing documentation toolchains such as [Slate](https://github.com/tripit/slate).

## [](#testng)TestNG

In addition to the existing support for using JUnit, you can now use Spring REST Docs with [TestNG](http://testng.org).

## [](#reusable-snippets)Reusable snippets

Snippets can now be created once with some common configuration and then [reused](http://docs.spring.io/spring-restdocs/docs/1.1.0.RELEASE/reference/html5/#documenting-your-api-reusing-snippets). This reduces repetition when documenting common parts on an API, such as `self` links. My thanks to [Marcel Overdijk](https://github.com/marceloverdijk) whose feedback and pull requests have significantly improved this new feature.

## [](#relaxed-snippets)Relaxed snippets

By default, Spring REST Docs will cause your tests to fail if you've neglected to document something or if you've attempted to document something that doesn't exist. This is great for detailed API documentation, but can be restrictive when documenting a scenario where you want to focus on a specific part of a request or response. Rather than having to explicitly ignore everything that you don't want to document, you can now use relaxed snippets for documenting links, request and response fields, and request and path parameters.

# [](#using-spring-rest-docs-11-with-spring-boot-13)Using Spring REST Docs 1.1 with Spring Boot 1.3

By default, Spring Boot 1.3 uses Spring REST Docs 1.0. To use 1.1, you should override the version configured in Boot's dependency management in your pom.xml or build.gradle:

pom.xml:

```xml
Copy<properties>
    <spring-restdocs.version>1.1.0.RELEASE</spring-restdocs.version>
</properties>
```

build.gradle:

```groovy
Copyext['spring-restdocs.version']=1.1.0.RELEASE
```

# [](#thank-you)Thank you

Thank you to everyone who has contributed to Spring REST Docs and helped to shape the 1.1 release. I'm looking forward to your feedback here, [on GitHub](https://github.com/spring-projects/spring-restdocs/issues), [Stack Overflow](https://stackoverflow.com/tags/spring-restdocs), and [Twitter](https://twitter.com/ankinson).

[Project Page](http://projects.spring.io/spring-restdocs) | [GitHub](https://github.com/spring-projects/spring-restdocs) | [Issues](https://github.com/spring-projects/spring-restdocs/issues) | [Documentation](http://docs.spring.io/spring-restdocs/docs/1.1.0.RELEASE/)