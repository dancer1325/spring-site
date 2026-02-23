---
title: Spring HATEOAS 1.3 M2 released
source: https://spring.io/blog/2021/02/19/spring-hateoas-1-3-m2-released
scraped: 2026-02-23T13:31:17.442Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  February 19, 2021 | 0 Comments
---

# Spring HATEOAS 1.3 M2 released

_Releases | Oliver Drotbohm |  February 19, 2021 | 0 Comments_

For all users building hypermedia based API, I’d like to announce that we shipped Spring HATEOAS 1.3 M2. We ship two major themes with the release:

-   Revised support for [HAL-FORMS](https://rwcbook.github.io/hal-forms/) and most of the [additional property attributes](https://rwcbook.github.io/hal-forms/#additional-property-attributes) derived from types or JSR-303 annotations. For details checkout the [revamped section of the references docs](https://docs.spring.io/spring-hateoas/docs/1.3.0-M2/reference/html/#mediatypes.hal-forms.metadata) or a more complete [example](https://docs.spring.io/spring-hateoas/docs/1.3.0-M2/reference/html/#mediatypes.hal-forms.example).
    
-   We significantly revamped the way we register the media type conversion within the WebMVC infrastructure. This is a response to challenges in selecting the best media type to render in certain `Accept` header [edge conditions](https://github.com/spring-projects/spring-framework/issues/26212). This change should be a non-issue but it would be great if you could test the new setup for a spin and [report any glitches](https://github.com/spring-projects/spring-hateoas/issues) you potentially encounter.
    

To use Spring HATEOAS 1.3 M2 with Spring Boot 2.5 M2, simply set the `spring-hateoas.version` property of your project’s build to `1.3.0-M2`. We’ve also shipped bugfix releases for the [1.2](https://github.com/spring-projects/spring-hateoas/releases/tag/1.2.4) and [1.1](https://github.com/spring-projects/spring-hateoas/releases/tag/1.1.4) branches that have been also already included in the corresponding Spring Boot maintenance branches.

[Project Page](https://spring.io/projects/spring-hateoas/) | [GitHub](https://github.com/spring-projects/spring-hateoas) | [Issues](https://github.com/spring-projects/spring-hateoas/issues) | [Documentation](https://docs.spring.io/spring-hateoas/docs/1.3.0-M2/reference/html/) | [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-hateoas) | [Gitter](https://gitter.im/spring-projects/spring-hateoas)