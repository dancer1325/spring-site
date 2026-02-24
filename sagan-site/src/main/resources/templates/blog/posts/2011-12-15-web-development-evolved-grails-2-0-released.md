---
title: Web Development Evolved: Grails 2.0 Released!
source: https://spring.io/blog/2011/12/15/web-development-evolved-grails-2-0-released
scraped: 2026-02-24T08:30:05.393Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Graeme Rocher |  December 15, 2011 | 0 Comments
---

# Web Development Evolved: Grails 2.0 Released!

_Engineering | Graeme Rocher |  December 15, 2011 | 0 Comments_

After nearly a year in development, we are extremely excited to announce the [GA release of Grails 2.0](http://grails.org/2.0.0+Release+Notes) - the second major revision of the web framework that is changing the face of web development on the JVM.

This release brings a greatly enhanced user experience. Everything from the command line, to the test reports, to the UIs that Grails generates for you have been rethought and reinvented. Some of the exciting features available in Grails 2.0 include:

-   A new console UI incorporating tab completion and coloured output
-   A better and more reliable reloading mechanism, resulting in far fewer server restarts
-   Enhanced error reporting and problem diagnosis
-   The latest and greatest libraries: Groovy 1.8, Spring 3.1, Hibernate 3.6 and Servlet 3.0
-   A powerful framework for static resources (CSS, Javascript, etc.)
-   New APIs for link generation and page rendering
-   New GORM features: detached criteria, Where queries, multiple data sources, and more
-   Standard plugins for database migrations and reverse engineering
-   New unit testing API with full GORM emulation
-   … plus hundreds of smaller improvements

All of these new features are covered in great detail in the [“What’s new in Grails 2.0?”](http://grails.org/doc/2.0.x/guide/introduction.html#whatsNew) section of the user guide. Also be sure to check out the [Grails 2.0 webinar](http://www.youtube.com/watch?v=IHUPLOnUF4g) and the “Countdown to Grails 2.0” blog series by Peter Ledbrook:

-   [User Experience](http://blog.springsource.org/2011/12/14/countdown-to-grails-2-0-user-experience/)
-   [GORM](http://blog.springsource.org/2011/12/05/countdown-to-grails-2-0-persistence/)
-   [Database Migrations](http://blog.springsource.org/2011/08/17/countdown-to-grails-2-0-database-migrations/)
-   [Unit Testing](http://blog.springsource.org/2011/06/07/countdown-to-grails-1-4-unit-testing/)
-   [Static Resources](http://blog.springsource.org/2011/06/30/countdown-to-grails-2-0-static-resources/)

As well as all of these new features, during the development of Grails 2.0 the Grails team has fixed over [900 issues](http://jira.grails.org/secure/IssueNavigator.jspa?mode=hide&requestId=10440) and continued to evolve the [plugin ecosystem](http://grails.org/plugins) around Grails.

During the course of the development of Grails 2.0 the [source code](https://github.com/grails/grails-core) has evolved in a number of significant ways. We modularized the source code by shifting to [Gradle](http://gradle.org) as a build tool; we now use [Artifactory](http://www.jfrog.com/products.php) for repository management; [Spock](http://spockframework.org) has become our defacto testing tool; and we rewrote the internals to take advantage of Groovy AST transformations. Grails is significantly better off with all these changes and users will see the benefit in Grails 2.0.

In addition to the release of Grails 2.0, we have a number of other exciting announcements to make starting with the Cloud.

### Grails 2.0 in the Cloud

For those following the Cloud space (and who isn’t!) you’ll be pleased to know that Grails 2.0 is already Cloud ready. [Cloud Foundry](http://cloudfoundry.com) - the open PaaS by VMware - [supports Grails 2.0 out of the box](http://blog.cloudfoundry.com/post/14179883461/cloud-foundry-ready-for-spring-3-1-and-grails-2-0) and we have already been working towards [migrating the Grails website to cloudfoundry.com](http://grails-website.cloudfoundry.com/)!

Checkout this excellent blog post by Peter Ledbrook on [One-step deployment with Grails and Cloud Foundry](http://blog.springsource.org/2011/04/12/one-step-deployment-with-grails-and-cloud-foundry/), which shows how to get started with Cloud Foundry Deployment using the [Cloud Foundry plugin](http://grails.org/plugin/cloud-foundry) for Grails.

The Heroku guys have also [announced Grails support](http://blog.heroku.com/archives/2011/12/15/grails/) - enabling the continuous deployment of Grails apps to [Heroku’s cloud platform](http://heroku.com). Grails applications can be deployed with a simple “git push” which triggers a complete build and deployment workflow.

To get started with Grails on Heroku, follow this [Grails quick start guide](http://devcenter.heroku.com/articles/grails). Grails deployment to Heroku is currently in public beta.

Cloud will continue to be a huge theme in 2012 with the emergence of more Cloud platforms that support Grails, many of which will be based on Open Source Cloud Foundry.

### Grails 2.0 in Your IDE

For Eclipse users, SpringSource Tool Suite (STS) version 2.9.0.M1 (available December 2011) provides the best support for Grails 2.0. STS version 2.8.1 provides much of the basic support for those not ready to rely on a milestone release. STS releases are available here: [http://www.springsource.com/downloads/sts](http://www.springsource.com/downloads/sts)

The most recent New and Noteworthy for STS is available here: [](http://download.springsource.com/release/STS/doc/STS-new_and_noteworthy.pdf)[http://download.springsource.com/release/STS/doc/STS-new\_and\_noteworthy.pdf](http://download.springsource.com/release/STS/doc/STS-new_and_noteworthy.pdf) It describes all the latest enhancements for Groovy and Grails development.

The support forum for any issues with STS you might have is here: [](http://forum.springsource.org/forumdisplay.php?32-SpringSource-Tool-Suite)[http://forum.springsource.org/forumdisplay.php?32-SpringSource-Tool-Suite](http://forum.springsource.org/forumdisplay.php?32-SpringSource-Tool-Suite)

For [Intellij IDEA](http://jetbrains.com/idea) users, [JetBrains](http://jetbrains.com) have been busy working on the development of Intellij IDEA 11 which was released last week. Intellij IDEA 11 contains a bunch of [new features to support Grails 2.0](http://www.jetbrains.com/idea/whatsnew/index.html?fromIndex#Frameworks%20Support) so make sure you upgrade before getting started with Grails 2.0 and Intellij IDEA.

### Grails 2.0 and NoSQL

Grails 2.0 is the first release of Grails that truly abstracts the GORM layer so that new implementations of GORM can be used.

With the release of Grails 2.0 we are also pleased to announce the release of a number of Grails 2.0 compatible plugins for NoSQL data stores:

-   [GORM for MongoDB 1.0 RC3](http://springsource.github.com/grails-data-mapping/mongo/index.html)
-   [GORM for Redis 1.0 M8](http://springsource.github.com/grails-data-mapping/redis/index.html)
-   [GORM for Riak 1.0 M4](http://springsource.github.com/grails-data-mapping/riak/index.html)

The MongoDB plugin is at final release candidate stage and is based on the excellent [Spring Data MongoDB project](http://www.springsource.org/spring-data/mongodb) which is also available in RC form.

In addition, we have put together a [developer guide](http://springsource.github.com/grails-data-mapping/) on how to go about building an implementation of GORM for folks who wish to participate in the project.

Grails users can look forward to more exciting NoSQL announcements in 2012 with upcoming  future releases of GORM for [Neo4j](http://springsource.github.com/grails-data-mapping/neo4j/manual/index.html), [Amazon SimpleDB](http://springsource.github.com/grails-data-mapping/simpledb/manual/index.html) and Cassandra in the works.

### Acknowledgements

Beyond the hard work of the Grails team at SpringSource I wish to extend a special thanks to our awesome external contributors. In no particular order:

-   [Lari Hotari](https://github.com/lhotari) - for his tireless work optimizing Grails performance that has resulted in significant performance gains for Grails 2.0 over 1.3.x
-   [Marc “Grails Rocks” Palmer](http://grailsrocks.com/) - for his dedication to the development of the simply outstanding resources plugin, which is bundled with Grails 2.0, that allows the management of static resources (bundling, caching, gzipping, deferred loading etc.) without the pain
-   [Rob Fletcher](https://github.com/robfletcher) - for the awesome update to HTML5 in Grails 2.0’s default scaffolding templates
-   [Luke Daley](https://github.com/alkemist) - for continuing to contribute to making Grails’ existing build system and dependency management as good as it can be prior to our eventual migration to Gradle.
-   [Stephane Maldini](https://github.com/smaldini) - for making a significant contribution to the work to migrate Grails configuration model from runtime metaprogramming to AST transformation-based approach.
-   … and last, but not least, all those who have submitted Github pull requests during the course of the development of Grails 2.0

Also a special thanks to the [JFrog](http://www.jfrog.com/) team for providing us with a hosted Artifactory Online instance to manage Grails’ dependencies and to the [Gradleware](http://gradleware.com/) team for making the migration of our Ant build system to [Gradle](http://gradle.org/) completely pain-free. Gradle has significantly streamlined our build process without sacrificing any flexibility and I would recommend it to any project that requires modularization.

### Useful Links

-   Changelog: [See JIRA](http://jira.grails.org/secure/IssueNavigator.jspa?mode=hide&requestId=10440)
-   Documentation: [http://grails.org/doc/2.0.x](http://grails.org/doc/2.0.x)
-   Download: [http://grails.org/Download](http://grails.org/Download)
-   What’s new?: [http://grails.org/doc/2.0.x/guide/introduction.html#whatsNew](http://grails.org/doc/2.0.x/guide/introduction.html#whatsNew)