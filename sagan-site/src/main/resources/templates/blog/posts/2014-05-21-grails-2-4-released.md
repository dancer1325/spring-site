---
title: Grails 2.4 Released
source: https://spring.io/blog/2014/05/21/grails-2-4-released
scraped: 2026-02-23T22:31:43.619Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Graeme Rocher |  May 21, 2014 | 22 Comments
---

# Grails 2.4 Released

_Releases | Graeme Rocher |  May 21, 2014 | 22 Comments_

Today we are pleased to announce the release of [Grails 2.4](https://grails.org/2.4.0+Release+Notes). This is the final release in the 2.x line of releases and includes a number of significant updates.

Most importantly Grails 2.4.x ships with key pieces of the [Spring IO platform](https://spring.io/platform), including [Groovy 2.3](http://spring.io/blog/2014/05/07/groovy-2-3-released) and [Spring 4.0.5](http://spring.io/blog/2014/05/20/spring-framework-4-0-5-3-2-9-released-next-stop-4-1).

## [](#release-highlights)Release Highlights

In addition to the inclusion of the latest versions of Spring and Groovy there are a number of key new features in this release, including:

-   **Standalone GORM & GSP** - Yes, [GORM for Hibernate 4](http://spring.io/guides/gs/accessing-data-gorm/) and [GORM for MongoDB](http://spring.io/guides/gs/accessing-data-gorm-mongodb/) can both be used outside of Grails in a Spring Boot application or Groovy script.
-   **Static Compilation** - Using extensions to Groovy's static compilation features, it is now possible to statically compile many interactions with the Grails framework, including dynamic finders.
-   **Asset Pipeline Plugin** - Grails 2.4 replaces the previous Resources plugin with the new [Asset Pipeline](http://grails.org/plugin/asset-pipeline) plugin for managing static assets (CSS, JavaScript etc.).
-   **GORM Subqueries** - GORM has been enhanced, with extensive support for correlated subqueries.
-   **New Maven Plugin** - The [Maven plugin](https://github.com/grails/grails-maven) has been rewritten to use Aether for dependency resolution and now works with multiple versions of Grails.

There is a more [comprehensive guide to all the new features](http://grails.org/doc/2.4.x/guide/introduction.html#whatsNew24) available on the Grails website.

## [](#grails-30)Grails 3.0

The focus of our work now shifts to Grails 3.0, which will be a reimagination of the framework you know and love.

Grails 3.0 will be based on [Spring Boot](http://projects.spring.io/spring-boot/), feature advanced [Gradle](http://gradle.org) support and the ability to build a range of application types from Micro services to traditional web applications.

We would love to hear your feedback on the release. To report issues head [over to JIRA](http://jira.grails.org/browse/GRAILS) and to join the discussion checkout our new [Google Group](https://groups.google.com/forum/#!forum/grails-dev-discuss) or [post questions on Stack Overflow](http://stackoverflow.com/tags/grails).

Cheers, Graeme