---
title: Spring Roo 2.0.0.M1 refactors addons, structures for collaboration
source: https://spring.io/blog/2015/07/20/spring-roo-2-0-0-m1-refactors-addons-structures-for-collaboration
scraped: 2026-02-23T19:46:50.589Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Pieter Humphrey |  July 20, 2015 | 4 Comments
---

# Spring Roo 2.0.0.M1 refactors addons, structures for collaboration

_Releases | Pieter Humphrey |  July 20, 2015 | 4 Comments_

On behalf on the Spring Roo team at [DISID Corporation](http://www.disid.com/en/), I am pleased to announce that Spring Roo 2.0.0.M1 has been released!

This first release of Spring Roo 2.0 is a large refactoring of Spring Roo project. We have moved Roo to be a smaller and easier to maintain project:

-   The OSGi container has been upgraded to OSGi R5.
-   Spring Roo has defined its runtime. The Roo runtime contains everything that is needed to execute addons and it doesn't contain any addon. By not containing any addons it is easier to keep the Roo runtime more stable and backward compatible.
-   Today, Spring Roo is centered in Spring technologies - so addons like GWT and JSF have been moved to their own projects in order to be maintained by the Roo community.
-   The [user guide](http://docs.spring.io/spring-roo/docs/2.0.0.M1/reference/html/) has been migrated to ASCIIdoc.

If your organization would like to contribute to the Roo project by maintaining these addons please contact: springroo at disid.com. To learn more take a look at the [Spring Roo Community addons](https://github.com/spring-projects/spring-roo-community-addons) source code.

This release also improves extensibility and increases potential for collaboration around the Spring Roo project:

-   The [Roo Marketplace](http://projects.spring.io/spring-roo/marketplace) has been created as a place to share, to find and keep track on third party addons
-   Roo provides a new way to package and distribute a set of addons together: the "Roo Addon Suite". Roo Addon Suite is based on OSGi R5 Subsystems that provides a really convenient deployment model, without compromising the modularity of Roo.

As always, new version of Spring Roo, includes some bug fixes and improvements reported by the community.

For full details on the changes made in the new Spring Roo version, please refer to the [Spring Roo 2.0.0.M1 Release Notes](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10340&version=14835)

Thanks to all of our awesome users who came up with useful bug reports and suggestions. Currently we are working on Spring Roo 2.0.0.M2 that will include the following improvements:

-   Update code generation to use latest versions: Spring framework 4, move from Spring framework dependencies to Spring IO Platform
-   User Managed POM \[[ROO-3465](https://jira.spring.io/browse/ROO-3465)\], \[[ROO-3478](https://jira.spring.io/browse/ROO-3478)\]
-   First version of the new Web UI \[[ROO-3629](https://jira.spring.io/browse/ROO-3629)\]

Additionally [Spring Tool Suite](http://spring.io/tools) (STS) team is working in releasing the STS 3.7.0 which will include the Spring IDE Roo Support for Roo 2.0.0. If you want to install the updated Roo components before, you would do it manually via the Spring IDE nightly update site.

For more specific information about Spring Roo project please see the [Project Page](http://projects.spring.io/spring-roo/) | [GitHub](https://github.com/spring-projects/spring-roo)

As always, you'll also find Roo on Twitter - either follow [@SpringRoo](https://www.twitter.com/springroo) or just include #SpringRoo in your tweets.

Stay tuned to Spring Roo news!