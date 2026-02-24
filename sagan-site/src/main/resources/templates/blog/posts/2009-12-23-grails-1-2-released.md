---
title: Grails 1.2 Released
source: https://spring.io/blog/2009/12/23/grails-1-2-released
scraped: 2026-02-24T09:00:54.523Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Graeme Rocher |  December 23, 2009 | 0 Comments
---

# Grails 1.2 Released

_Engineering | Graeme Rocher |  December 23, 2009 | 0 Comments_

Continuing the release train, today we are excited to announce the general availability of [Grails](http://grails.org) 1.2 final. Representing the most stable and performant Grails release yet, Grails 1.2 is a significant new release of the premier dynamic language framework for the JVM.

As well as featuring all of the goodness of [Spring 3](http://blog.springsource.com/2009/12/16/spring-framework-3-0-goes-ga/), this release has a number of significant new features for Grails users:

-   **Dependency Resolution DSL**: Based on Ivy, Grails users now have [full control over JAR dependencies](http://grails.org/doc/latest/guide/3.%20Configuration.html#3.7%20Dependency%20Resolution) including those inherited from the framework and any installed plugins.
-   **Better Spring Integration**: As well as supporting component scanning, Grails now allows you to implement controllers as regular MVC @Controller instances.
-   **Named Query Support**: It is now possible to [define named, reusable criteria queries in GORM](http://grails.org/doc/latest/ref/Domain%20Classes/namedQueries.html) that can be combined with regular dynamic finders making querying a lot more DRY
-   **Improved Performance & Memory Consumption**: The performance of Grails' view layer (GSP) has been significantly improved resulting in up to 2-3 times throughput. We've also improved Grails' memory consumption and the need for additional PermGen by implementing precompilation of GSP views.
-   **Named URL Mappings**: It is now possible to [name an individual URL mapping](http://grails.org/doc/latest/guide/6.%20The%20Web%20Layer.html#6.4.9%20Named%20URL%20Mappings) which allows you to create more explicit and expressive links inside GSPs
-   **Refactored Testing Infrastructure**: Grails' testing infrastructure is now completely pluggable to new providers. The default JUnit provider is still present, but new testing providers can be implemented that can be run in specific phases (such as 'unit', 'integration' and 'functional' phases). There is already a [Spock plugin](http://grails.org/plugin/spock) that takes advantage of this new infrastructure, allowing BDD style testing.
-   **Pluggable Web Containers**: Grails now allows different development time containers to be installed and plugins for both Tomcat and Jetty are available.

In addition to these headliners there are literally hundreds of bug fixes and small improvements some of which are described in much more detail in the [release notes](http://www.grails.org/1.2+Release+Notes). Grails 1.2 can be downloaded from the Grails site at the [usual place](http://grails.org/Download).

As well as the continued, significant contributions to the release from the community, one of the most enjoyable aspect about this release has been the active collaboration amongst the Spring, Tomcat, SpringSource Tool Suite, Groovy and Grails teams at SpringSource. Having all that knowledge under one roof has helped at every stage of the project life cycle.

Thanks to everyone involved, happy holidays / new year and enjoy the release!