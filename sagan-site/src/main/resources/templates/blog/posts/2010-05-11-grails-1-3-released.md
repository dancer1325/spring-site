---
title: Grails 1.3 Released
source: https://spring.io/blog/2010/05/11/grails-1-3-released
scraped: 2026-02-24T08:57:59.672Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Graeme Rocher |  May 11, 2010 | 0 Comments
---

# Grails 1.3 Released

_Engineering | Graeme Rocher |  May 11, 2010 | 0 Comments_

I'm pleased to announce the immediate availability of [Grails 1.3](http://grails.org/Download)! Followers of Grails releases will recall that it has not been long since the last major release of Grails (Grails 1.2 was released in December), but given the need to get the latest and greatest version of Groovy in the hands of developers, Grails 1.3 can be seen as the [Groovy 1.7 release](http://docs.codehaus.org/display/GROOVY/Groovy+1.7+release+notes?showComments=true). The Groovy team did a fantastic job in bringing all sorts of excellent new additions to the Groovy language such as annonymous inner/nested classes, an AST builder and [power asserts](http://hamletdarcy.blogspot.com/2009/05/new-power-assertions-in-groovy.html) (my personal favourite), all of which are now available in your Grails application.

Other than all the goodness of Groovy 1.7 there are a number of significant new features that further advance the Grails platform, including:

-   JUnit 4 support
-   [Maven repository support](http://grails.org/doc/1.3.x/guide/3.%20Configuration.html#3.7.8%20Deploying%20to%20a%20Maven%20Repository) for Grails plugins
-   [Declarative plugin dependencies](http://grails.org/doc/1.3.x/guide/3.%20Configuration.html#3.7.9%20Plugin%20Dependencies)
-   [Dirty checking](http://grails.org/doc/1.3.x/guide/5.%20Object%20Relational%20Mapping%20\(GORM\).html#5.3.6%20Modification%20Checking) in GORM
-   [Chaining of named criteria](http://grails.org/doc/1.3.x/ref/Domain%20Classes/namedQueries.html)
-   Application wide Sitemesh layouts

There will be follow-up articles describing all of these features in more details over the coming days/weeks. For now you can refer to the following links for more information on the release:

-   [Release Notes](http://www.grails.org/1.3+Release+Notes)
-   [Download](http://grails.org/Download)
-   [Documentation](http://grails.org/doc/1.3.0/)

With Grails 1.3 out we will be continuing to distribute maintenance releases of the 1.2.x and 1.3.x branches of Grails, in conjunction with developing major new plugins. The first of these has already come to fruition with the release of the [Spring Security Core](http://burtbeckwith.github.com/grails-spring-security-core/docs/manual/index.html) plugin for Grails, a new modular plugin built on Spring Security with pluggable authentication layers for [Open ID](http://burtbeckwith.github.com/grails-spring-security-openid/docs/manual/index.html), OAuth etc.

Users of Grails can anticipate exciting new plugin releases in the areas of persistence (NoSQL), cloud, performance monitoring and messaging in the coming months. Speaking of plugins Grails now has a total of [408 (and counting) plugins](http://grails.org/plugin/category/all), and a growing ecosystem that we are very conscious of nurturing. The plugin website infrastructure around the website is targeted for improvements that will continue to allow the community to thrive.

Beyond plugins, we will also be formally starting the planning process for Grails 2.0, which will be a major new revision of the framework focusing on plugin runtime modularity, database reverse engineering/migration and build time / usability improvements. More details to follow soon.

In the meantime, enjoy the release and thanks to all those who contributed to the release process.

PS If you want to hear from me personally talking about what is new in Grails 1.3 make sure you attend my talk on "What's new in Grails 1.3" at the [S2G Forum in London](http://www.springsource.com/events/s2gforum-5-13-2010-london?__utma=1.2008078275.1256893671.1273064328.1273136670.22&__utmb=1.1.10.1273580022&__utmc=1&__utmx=-&__utmz=1.1273064328.21.20.utmcsr=google|utmccn=\(organic\)|utmcmd=organic|utmctr=instrumenting%20URLClassLoader&__utmv=-&__utmk=226428954).