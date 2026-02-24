---
title: Bundlor Adds Support for the Blueprint Service
source: https://spring.io/blog/2009/09/26/bundlor-adds-support-for-the-blueprint-service
scraped: 2026-02-24T09:03:51.610Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Hale |  September 26, 2009 | 0 Comments
---

# Bundlor Adds Support for the Blueprint Service

_Engineering | Ben Hale |  September 26, 2009 | 0 Comments_

I'm pleased to announce that beginning with its newly released 1.0.0.M6 version, [Bundlor](http://www.springsource.org/bundlor) now supports OSGi Blueprint Service files.

As with the support for Spring-DM contexts, Bundlor scans for Blueprint Service configuration files in both the default location (OSGI-INF/blueprint/\*.xml) and in locations specified with the custom Bundle-Blueprint manifest header. When these files are found, they are scanned for class and interface names and the packages for those types are added to the OSGi manifest that Bundlor creates.

For information about Bundlor and to download this latest milestone, please visit the [Bundlor project page](http://www.springsource.org/bundlor).