---
title: Spring Data REST 1.0.0.M2 Released
source: https://spring.io/blog/2012/05/16/spring-data-rest-1-0-0-m2-released
scraped: 2026-02-24T08:22:05.866Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Jon Brisbin |  May 16, 2012 | 0 Comments
---

# Spring Data REST 1.0.0.M2 Released

_Releases | Jon Brisbin |  May 16, 2012 | 0 Comments_

Hot on the heels of the [1.1.0 GA release of Spring Data JPA](http://www.springsource.org/node/3552), I'm pleased to announce the milestone 2 release of Spring Data REST. Besides many bug fixes, this M2 release includes a major update of functionality for the Spring Data REST exporter.

New functionality includes:

-   Query method support - Spring Data REST 1.0.0.M2 includes support for invoking query methods of Repository interfaces. Results are returned as links to top-level resources.
-   Comprehensive validation support - In addition to JSR-303 validation, the Spring Data REST exporter recognizes Spring Validator beans declared in your ApplicationContext to provide rich validation support. Your Validator beans can do anything--even look up other data to verify the integrity of an object graph.
-   ApplicationEvent handling - The exporter's validation support is built on top of the Spring ApplicationEvent mechanism. ApplicationEvents are emitted before and after each save or delete, allowing your code to tie into these lifecycle events and trigger other actions.
-   Annotation-based URL configuration - There is a new annotation: `@RestResource` you can place on a Repository interface or on a Repository's query methods to influence both the URL under which the resource is exported and the "rel" attribute associated with the links generated to point to that resource.

[Starter Web Application](https://github.com/springsource/spring-data-rest-webmvc) | [Wiki](https://github.com/SpringSource/spring-data-rest/wiki/) | [Release Notes](https://jira.springsource.org/secure/ReleaseNote.jspa?projectId=10901&version=12844)

To learn more about the project, visit the Spring Data REST [homepage](http://www.springsource.org/spring-data/rest), or visit [the Github repository](https://github.com/SpringSource/spring-data-rest) to download the source.