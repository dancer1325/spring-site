---
title: SpringSource dm Server 2.0.2 is released today.
source: https://spring.io/blog/2010/05/27/springsource-dm-server-2-0-2-is-released-today
scraped: 2026-02-24T08:57:22.250Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Christopher Frost |  May 27, 2010 | 0 Comments
---

# SpringSource dm Server 2.0.2 is released today.

_Engineering | Christopher Frost |  May 27, 2010 | 0 Comments_

The release fixes a few bugs, release notes available from [JIRA](https://issuetracker.springsource.com/secure/ReleaseNote.jspa?projectId=10054&version=10632). This release can be downloaded from the project [page](http://www.springsource.org/dmserver) on SpringSource.org.

-   The kernel startup hard timeout limit has been increased to allow dm Server to run on slower machines.
-   Documented a restriction in the OSGi web container, Tomcat <context> elements are not supported.
-   Fix to the ServiceScoper class to close all input streams.
-   Added support to tolerate File.list returning null occasionally, this manifested as the pickup directory wiping itself occasionally for seemingly no reason.
-   Usage of @Configurable with ServerOsgiBundleXmlWebApplicationContext now works.

The project is being donated to the Eclipse Foundation as Virgo. We aim to ship a baseline release of Virgo in due course which will be functionally equivalent to dm Server 2.0. See the Virgo [website](http://www.eclipse.org/virgo/) for further information. Along with dm Server SpringSource will offer commercial support for Virgo.