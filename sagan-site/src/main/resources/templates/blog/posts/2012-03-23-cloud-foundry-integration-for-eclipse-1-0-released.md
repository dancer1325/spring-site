---
title: Cloud Foundry Integration for Eclipse 1.0 released
source: https://spring.io/blog/2012/03/23/cloud-foundry-integration-for-eclipse-1-0-released
scraped: 2026-02-24T08:24:38.447Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Martin Lippert |  March 23, 2012 | 0 Comments
---

# Cloud Foundry Integration for Eclipse 1.0 released

_News | Martin Lippert |  March 23, 2012 | 0 Comments_

I am happy to announce the first release of the Cloud Foundry Integration for Eclipse 1.0.

This release features:

-   deploying, updating, starting, stopping apps directly from your workspace
-   supports Java/Web, Java/Spring, Groovy/Grails and Scala/Lift apps
-   service creating and binding (directly at deploy time or later)
-   instance scaling and statistics
-   remote file browsing directly integrated
-   full debugging support for Micro Cloud Foundry
-   improved incremental update performance
-   integrated into Eclipse and STS

And, last but not least, the project is now open-source under the EPL and available from GitHub: [](https://github.com/SpringSource/eclipse-integration-cloudfoundry)[https://github.com/SpringSource/eclipse-integration-cloudfoundry](https://github.com/SpringSource/eclipse-integration-cloudfoundry)

You can install it into STS (2.9.0 or higher required) using the STS Dashboard or directly into a plain Eclipse JEE package (Indigo recommended) using the Eclipse Marketplace.

**Attention:** if you have a previous version of the Cloud Foundry tooling installed (the old milestone or nightly builds, having the old STS version 2.7.0 on them), please uninstall them before installing the new release. Since we moved to GitHub, this is a new and separate project and would be installed in addition to the old stuff that you have. So please uninstall the old feature before.

More detailed user documentation will follow shortly on [](http://start.cloudfoundry.com/)[http://start.cloudfoundry.com/](http://start.cloudfoundry.com/). Stay tuned!