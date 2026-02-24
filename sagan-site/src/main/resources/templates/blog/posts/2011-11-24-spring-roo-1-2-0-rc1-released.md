---
title: Spring Roo 1.2.0.RC1 released
source: https://spring.io/blog/2011/11/24/spring-roo-1-2-0-rc1-released
scraped: 2026-02-24T08:32:00.487Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Alan Stewart |  November 24, 2011 | 0 Comments
---

# Spring Roo 1.2.0.RC1 released

_Engineering | Alan Stewart |  November 24, 2011 | 0 Comments_

The Spring Roo team is delighted to announce the availability of 1.2.0 Release Candidate 1. The Roo 1.2.0.RC1 release follows on from M1 and includes two exciting new features:

-   **Multi-module Maven project support**. This is the Roo community's most popular and most voted for feature ([ROO-120](https://jira.springsource.org/browse/ROO-120)). You can now create projects with a parent POM and as many project modules as you wish. For example, you can put your domain model in one module and separate out your UI code such as MVC or GWT, into their own modules.  Full documentation on this feature will be available in the general availability release of Roo 1.2.0 later this year.
-   **JSF 2.0/PrimeFaces 3.** The second most popular community feature and most asked for feature in the recent Roo survey - JSF 2.0/PrimeFaces support ([ROO-516](https://jira.springsource.org/browse/ROO-516)). You can now scaffold high-quality JSF applications utilizing the stunning components from the [PrimeFaces](http://www.primefaces.org) 3.0 component library. Full round-tripping of code, switching between JSF 2.0 implementations (Oracle Mojarra or Apache MyFaces), and PrimeFaces theme selection via a Roo command are supported.

We have also enhanced our Roo annotations to give you more flexibility over the way you configure your persistence layer:

-   No need to have the "Active Record"-pattern persistence code in your domain objects any longer. The new **@RooJpaEntity** annotation ensures only the @Entity, @Id, and @Version fields and methods are created and maintained by Roo, with no CRUD methods. Classes annotated with @RooJpaEntity are intended to be used with Roo's JPA repository and service layering features.
-   The old **@RooEntity** annotation has been renamed to **@RooJpaActiveRecord** and is still the default when creating entities and will introduce the same CRUD methods as before.
-   Use RC1 in existing Roo projects? - easy, simply rename your @RooEntity annotations to @RooJpaActiveRecord and use the organize imports feature in STS or Eclipse to resolve the imports.

Please remember this is a release candidate release, so you should keep using Roo 1.1.5 for production projects. However, we encourage you to test this new release as we want to get 1.2.0.RELEASE to you as soon as possible.

We hope you enjoy this new release. Please share your experiences via the [community forum](http://forum.springsource.org/forumdisplay.php?67-Roo), follow [@SpringRoo](http://twitter.com/#!/SpringRoo) for the latest news, or use #springroo in your tweets

**Alan Stewart, Project Lead - Spring Roo**