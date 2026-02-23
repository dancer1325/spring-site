---
title: Spring Framework 7.0.0-M8 available now
source: https://spring.io/blog/2025/08/14/spring-framework-7-0-0-M8-available-now
scraped: 2026-02-23T07:33:34.812Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  August 14, 2025 | 0 Comments
---

# Spring Framework 7.0.0-M8 available now

_Releases | Brian Clozel |  August 14, 2025 | 0 Comments_

On behalf of the team and everyone who has contributed, I am pleased to announce a new milestone for the next Spring Framework generation. We have compiled all the upgrade information, new features and deprecations on the [Spring Framework 7.0 release notes](https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-7.0-Release-Notes) preview page.

## [](#api-versioning-updates)API Versioning updates

This is another feature-rich milestone for the API Versioning support. There are quite a few refinements around the configuration model and how we ensure that the API Versioning setup is valid. We also now support inserting API Version information in Media Types on the client side. We are receiving lots of good feedback, keep it coming!

You can see the updated documentation in the [API Versioning for MVC](https://docs.spring.io/spring-framework/reference/7.0-SNAPSHOT/web/webmvc-versioning.html) section.

## [](#resttestclient)RestTestClient

This is a popular enhancement request coming from the community: providing a non-reactive variant for `WebTestClient`. Developers like the way `WebTestClient` can test live servers and mock setups, with a fluent API and nice assertions.

This is now done with the new `RestTestClient`; you can bind it to a live server, an MVC `@Controller` or the application context. See the new [`RestTestClient` documentation section](https://docs.spring.io/spring-framework/reference/7.0-SNAPSHOT/testing/resttestclient.html#page-title) for more.

## [](#httpserviceclient)`@HttpServiceClient`

The interface client support is expanding with the new `@HttpServiceClient` annotation. Annotated interfaces are excluded from `@ImportHttpServices` scans, so there is no overlap with scans for client interfaces when pointed at the same package. This feature allows for more flexible setups and opens the door for better integration in Spring Boot.

See the [interface clients configuration section](https://docs.spring.io/spring-framework/reference/7.0-SNAPSHOT/integration/rest-clients.html#rest-http-interface-group-config) in the documentation.

## [](#pathpattern-matching-improved)`PathPattern` matching improved

As of Spring Framework 7.0, the legacy `AntPathMatcher` variant for matching HTTP request mappings is being deprecated. We started this migration back in 5.0, introducing the `PathPattern` option, then making it the default.

Community members reached out and shared that there was one last missing feature that was preventing their upgrade: the ability to match many path segments at the beginning of the path (think, `"/**/pages/index.html"`). This is now supported, and we described more thoroughly [the allowed patterns in the reference documentation](https://docs.spring.io/spring-framework/reference/7.0-SNAPSHOT/web/webmvc/mvc-controller/ann-requestmapping.html#mvc-ann-requestmapping-uri-templates).

## [](#and-much-more)And much more!

There are plenty of other changes. As usual, you can check [the detailed changelog](https://github.com/spring-projects/spring-framework/releases/tag/v7.0.0-M7) for more details.

7.0.0-M8 is now available from [https://repo.spring.io](https://repo.spring.io) and [Maven Central](https://spring.io/blog/2025/01/21/milestones-to-central).

[Project Page](https://spring.io/projects/spring-framework/) | [GitHub](https://github.com/spring-projects/spring-framework) | [Issues](https://github.com/spring-projects/spring-framework/issues) | [Documentation](https://docs.spring.io/spring-framework/reference/)