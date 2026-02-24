---
title: Bundlor 1.0.0.RC1 Available
source: https://spring.io/blog/2009/12/23/bundlor-1-0-0-rc1-available
scraped: 2026-02-24T09:00:45.710Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Hale |  December 23, 2009 | 0 Comments
---

# Bundlor 1.0.0.RC1 Available

_Engineering | Ben Hale |  December 23, 2009 | 0 Comments_

I'm very excited to announce that Bundlor 1.0.0.RC1 is [now available](http://www.springsource.org/bundlor). There have been [numerous changes](https://issuetracker.springsource.com/secure/RunPortlet.jspa?portletKey=com.pyxis.greenhopper.jira:greenhopper-releasenotes&projectid=10051&fields=,summary&versionId=10486&includeSubs=false) to Bundlor since the M6 release including additions to detection and warning criteria as well as improvements to the ANT and Maven configurations.

This milestone marks feature-complete status for the 1.0.0 release. Baring any major issues, this candidate will be released as 1.0.0.RELEASE shortly.

## Detection and Warning Criteria

Bundlor now detects Java types in the following locations:

-   [Java Types](http://static.springsource.org/s2-bundlor/1.0.x/user-guide/html/ch07.html#detecting.java)
-   [Spring Context Files](http://static.springsource.org/s2-bundlor/1.0.x/user-guide/html/ch07s02.html)
-   [Blueprint Service Configuration Files](http://static.springsource.org/s2-bundlor/1.0.x/user-guide/html/ch07s03.html)
-   [Web Application Files](http://static.springsource.org/s2-bundlor/1.0.x/user-guide/html/ch07s04.html)
-   [Contained JARs](http://static.springsource.org/s2-bundlor/1.0.x/user-guide/html/ch07s05.html)
-   [JPA Configuration Files](http://static.springsource.org/s2-bundlor/1.0.x/user-guide/html/ch07s06.html)
-   [Hibernate Configuration Files](http://static.springsource.org/s2-bundlor/1.0.x/user-guide/html/ch07s07.html)
-   [JSP Files](http://static.springsource.org/s2-bundlor/1.0.x/user-guide/html/ch07s08.html)
-   [Log4J Configuration Files](http://static.springsource.org/s2-bundlor/1.0.x/user-guide/html/ch07s09.html)
-   [Static Resources](http://static.springsource.org/s2-bundlor/1.0.x/user-guide/html/ch07s10.html)

Bundlor also scans the its generated manifest for the following issues and generates warnings based on them:

-   [Unlikely Import Version Ranges](http://static.springsource.org/s2-bundlor/1.0.x/user-guide/html/ch08.html#warning.importversionrange)
-   [Importing of Exported Packages](http://static.springsource.org/s2-bundlor/1.0.x/user-guide/html/ch08s02.html)
-   [Manifest from Signed JAR](http://static.springsource.org/s2-bundlor/1.0.x/user-guide/html/ch08s03.html)
-   [Imports Unversioned](http://static.springsource.org/s2-bundlor/1.0.x/user-guide/html/ch08s04.html)
-   [Exports Unvesioned](http://static.springsource.org/s2-bundlor/1.0.x/user-guide/html/ch08s05.html)
-   [Missing Bundle-SymbolicName](http://static.springsource.org/s2-bundlor/1.0.x/user-guide/html/ch08s06.html)
-   [Missing Manifest-Version](http://static.springsource.org/s2-bundlor/1.0.x/user-guide/html/ch08s07.html)

## Standardized and Simplified Configuration

One of the most glaringly bad parts of Bundlor up until the RC1 release was the inconsistency of features and configuration across the various front ends (command-line, ANT, Maven). RC1 has unfortunately had to change the configuration parameters of all of these but the end result is consistency and in many cases simplification of Bundlor's configuration.

Please see the Bundlor documentation for the configuration options for your particular front end.

-   [Maven](http://static.springsource.org/s2-bundlor/1.0.x/user-guide/html/ch04s03.html)
-   [ANT](http://static.springsource.org/s2-bundlor/1.0.x/user-guide/html/ch04s02.html)
-   [Command Line](http://static.springsource.org/s2-bundlor/1.0.x/user-guide/html/ch04.html#usage.command.line)

## Road Map

As stated before, this candidate marks feature-complete status for the 1.0.0 release. I intended to do the final release early in the new year if there are no major issues. I am always on the lookout for new detection and warning criteria so please use the [Bundlor JIRA](https://issuetracker.springsource.com/browse/BNDLR) to open new or vote on existing issues.