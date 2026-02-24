---
title: OSGi Development Tools in STS 2.0
source: https://spring.io/blog/2009/03/05/osgi-development-tools-in-sts-2-0
scraped: 2026-02-24T09:10:33.596Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Christian Dupuis |  March 05, 2009 | 0 Comments
---

# OSGi Development Tools in STS 2.0

_Engineering | Christian Dupuis |  March 05, 2009 | 0 Comments_

Yesterday we published a final release candidate build of the upcoming SpringSource Tool Suite version 2.0. The RC build is available for Windows, Mac OS X and Linux from the [STS product page](http://www.springsource.com/products/suite/sts).

STS 2.0 is equipped with new productivity tools for developing Spring applications, like Quick Fixes, as-you-type validation and correction, project and bean creation wizards as well as a Visual Spring Configuration Editor and more. Stay tuned for more information on these new features.

Additionally STS 2.0 comes with tools for OSGi-based application development that experienced as well as new adopters of OSGi might find interesting. I'd like to use this blog to briefly introduce those features.

## Existing Tools

To recap let's start with an overview of what OSGi development tools have been available since the launch of the [SpringSource dm Server](http://www.springsource.com/products/suite/dmserver) with STS and the open-source dm Server Tools:

-   dm Server Integration: STS provides integration for dm Server into Eclipse WTP that lets you manage the life-cycle of integrated dm Server instances (start/stop/debug) as well as to deploy OSGi bundles, PARs and traditional JEE WARs. The dm Server integration also transparently handles refresh and update operations of deployed artifacts if code has been changed by the user.
-   Project Wizards: To create OSGi bundle and PAR projects STS provides two project wizards that automatically set up the project structure and all the required Eclipse meta data. For traditional WARs the WTP Dynamic Web Project wizard can still be used.
-   Manifest Editing and Validation: STS provides content assist, hyperlinking and validation for MANIFEST.MF files to make the task of managing OSGi meta data as easy as possible. Common problems can be automatically resolved by using the integrated Quick Fixes (e.g. download missing dependency or correct version range).
-   Classpath Management: STS will pick up the OSGi dependency meta data from the MANIFEST.MF and create a classpath container with correct visibility rules applied. The dependencies are being resolved against the local dm Server bundle and library repository. Test-only dependencies can be added to a file called TEST.MF in the META-INF folder of the test source folder.
-   Repository Browser: STS integrates the SpringSource Enterprise Bundle Repository to provide integrated access to the available enterprise libraries. This makes it really easy to download and install a third-party dependency bundles.

[![Repository Browser](http://blog.springsource.com/wp-content/uploads/2009/03/repository-browser-thumb1.png "Repository Browser")](http://blog.springsource.com/wp-content/uploads/2009/03/repository-browser1.png "Repository Browser")

## New in STS 2.0

STS 2.0 provides new tools to analyze bundles and visualize their dependencies based on Import-/Export-Package relationships and Service consumption. The accessible information is similar to what users commonly get in textual form from the admin shell of an OSGi runtime, e.g. the Equinox Console. But the benefit of these new tools is that you get relevant information integrated in your development environment and have visual tools at hand to navigate and check your bundle meta data and wiring; there is no need to leave the IDE to open up a telnet session.

The following screenshot (click to enlarge) shows the Bundle Overview page of the Server Editor. This page lists all installed bundles and provides access to the bundle's meta data in form of the MANIFEST as well as all wiring information accessible from the OSGi runtime. Dedicated sections show exported and imported packages and their respective consumers and providers as well as registered OSGi services including their properties and their consumers.

[![Bundle Overview](http://blog.springsource.com/wp-content/uploads/2009/03/bundle-overview-thumb.png "Bundle Overview")](http://blog.springsource.com/wp-content/uploads/2009/03/bundle-overview.png "Bundle Overview")

The displayed information is retrieved from the running dm Server and therefore immediately reflects changes if bundles are installed, stopped or updated. Navigating the dependencies of a particular bundle in the Bundle Overview or the Equinox Console for that matter can get quite cumbersome as both do not visualize the entire dependency graph. So in order to analyze wiring problems the user needs to iterate from one bundle to the next.

The new Bundle Dependency Graph makes this task very easy by allowing you to visually navigate the dependency graph. The Graph can show package or service dependencies. Additionally the maximum depth of dependencies displayed in the graph may be changed.

I would recommend to try this out yourself as it is much more fun to see the Graph in action as you can imagine from a static screenshot.

[![Bundle Dependency Graph](http://blog.springsource.com/wp-content/uploads/2009/03/dependency-graph-thumb.png "Bundle Dependency Graph")](http://blog.springsource.com/wp-content/uploads/2009/03/dependency-graph.png "Bundle Dependency Graph")

Last but not least some users like to stay in the environment they are used to. This is why we also integrated a textual console into STS. The Server Console (see below) supports the very same commands as the Equinox console but provides command completion and command history on top.

[![Server Console](http://blog.springsource.com/wp-content/uploads/2009/03/server-console-thumb.png "Server Console")](http://blog.springsource.com/wp-content/uploads/2009/03/server-console.png "Server Console")

## Conclusion

The highlighted features are not the only additions to STS 2.0 but should provide an insight of what STS has to offer for OSGi development. We will publish more information covering other feature areas as we get closer to GA later this month.

Nevertheless this is the right time to give the STS 2.0 RC a try with your Spring or OSGi project and let us know what you think. Please report any issue you may find in the product's [JIRA](https://jira.springsource.com/browse/TOOLS) or the [community forums](http://forum.springframework.org/forumdisplay.php?f=32).