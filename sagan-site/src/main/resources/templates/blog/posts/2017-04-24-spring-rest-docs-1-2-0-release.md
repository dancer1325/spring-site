---
title: Spring REST Docs 1.2.0.RELEASE
source: https://spring.io/blog/2017/04/24/spring-rest-docs-1-2-0-release
scraped: 2026-02-23T16:33:44.666Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Andy Wilkinson |  April 24, 2017 | 0 Comments
---

# Spring REST Docs 1.2.0.RELEASE

_Releases | Andy Wilkinson |  April 24, 2017 | 0 Comments_

On behalf of everyone who contributed, it's my pleasure to announce that Spring REST Docs 1.2.0.RELEASE has been released. It is available fromMaven Central, JCenter and our [release repository](https://repo.spring.io/libs-release).

# [](#whats-new)What's new?

A complete overview of what's new in 1.2 can be found in the [release notes](https://github.com/spring-projects/spring-restdocs/wiki/Spring-REST-Docs-1.2-Release-Notes). The following are some of the highlights.

## [](#improved-asciidoctor-integration)Improved Asciidoctor integration

REST Docs now has a new module, `spring-restdocs-asciidoctor`, that makes it easier to use the generated snippets in your documentation. A [new macro](http://docs.spring.io/spring-restdocs/docs/1.2.0.RELEASE/reference/html5/#working-with-asciidoctor-including-snippets-operation) means that you can import multiple snippets for the same operation in a single line. [This update to the samples](https://github.com/spring-projects/spring-restdocs/commit/58bf231c8a422ece52dc6a9af007c543b009e522) shows the benefit of adopting the macro.

## [](#better-support-for-documenting-large-and-complex-payloads)Better support for documenting large and complex payloads

To help to make your documentation easier to consume, the documentation of large and complex payloads can now be split up. Subsections of the payloads can be documented individually allowing your documentation to guide your users through the pieces that matter.

## [](#snippets-for-request-and-response-bodies)Snippets for request and response bodies

Snippets that document the body of a request or response are now included in the default snippets. You can also use these snippets explicitly to document a subsection of a large or complex body.

## [](#using-spring-rest-docs-12-with-spring-boot-15)Using Spring REST Docs 1.2 with Spring Boot 1.5

By default, Spring Boot 1.5 uses Spring REST Docs 1.1. To use 1.2, override the version configured in Boot’s dependency management in your `pom.xml`:

```
Copy<properties>
    <spring-restdocs.version>1.2.0.RELEASE</spring-restdocs.version>
</properties>
```

Or `build.gradle`:

```
Copyext['spring-restdocs.version']=1.2.0.RELEASE
```

# [](#whats-next)What's next?

The project's main focus will now move to Spring REST Docs 2.0. While 1.2 is compatible with the forthcoming Spring Framework 5, 2.0 will require both it and Java 8. This should allow REST Docs to provide support for documenting APIs using `WebTestClient` and to also take advantage of Java 8 language features.

[GitHub](https://github.com/spring-projects/spring-restdocs) | [Issues](https://github.com/spring-projects/spring-restdocs/issues) | [Documentation](http://docs.spring.io/spring-restdocs/docs/1.2.0.RELEASE) | [Twitter](https://twitter.com/springrestdocs) | [Gitter](https://gitter.im/spring-projects/spring-restdocs) | [Stack Overflow](https://stackoverflow.com/tags/spring-restdocs)