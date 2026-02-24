---
title: SpringSource tc Server 6.0.20.A Now Available
source: https://spring.io/blog/2009/07/29/springsource-tc-server-6-0-20-a-now-available
scraped: 2026-02-24T09:05:21.425Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Jim Jagielski |  July 29, 2009 | 0 Comments
---

# SpringSource tc Server 6.0.20.A Now Available

_Engineering | Jim Jagielski |  July 29, 2009 | 0 Comments_

In April of this year, SpringSource made generally available our first release of [tc Server](http://www.springsource.com/products/tcserver), version 6.0.19.A. The product has been a **huge success**, in part due to being based on the tried and true [Apache Tomcat](http://tomcat.apache.org) base which many, many people (and more and more all the time) are using every day. As outlined in an earlier [blog post](http://blog.springsource.com/2009/04/28/springsource-tc-server-the-logical-next-step/) when we introduced 6.0.19.A, we've extended that tried and true core with extensions that make it easier to use and provide key production oriented extensions to Tomcat. And we've surrounded that solid base with the enterprise, production class management and monitoring capabilities of the SpringSource management products.

### Keeping up with Apache Tomcat

We continue to focus on the regular maintenance our customers require. A top priority requirement for our customers is close tracking of the Apache Tomcat releases upon which tc Server is based. Apache Tomcat was released at the end of May and after thorough testing by the community, as well as extended production level testing within SpringSource, we are now making generally available tc Server version 6.0.20.A.

### Some new bells and whistles

We didn't stop there. Some improvements and extensions to tc Server are being introduced with this release as well. For a more complete description go to the [New and Changed Features](http://static.springsource.com/projects/tc-server/6.0/getstart/getstart-single.html#cgsnewfeatures) section of the online documentation.

-   tc Server versioning and migration - The instance scripts enabling you to create and manage tc Server instances (CATALINA\_BASE) from a single installed tc Server binary (CATALINA\_HOME) have been extended to allow you to have multiple versions of tc Server installed (e.g., 6.0.19.A and 6.0.20.A) and to easily swap a particular application instance among any installed instances. Remember that unlike other application server containers, tc Server has a small enough disk footprint that maintaining multiple installed instances is not a problem at all.
-   Encrypted passwords in server.xml, context.xml and web.xml - Added the ability to store, and process encrypted passwords in configuration files.
-   Data source allowing use of Oracle proxy authentication feature.
-   Creation of \*nix boot.rc file templates at instance creation for easier integration of instances into system startup.
-   tc Server Application Server only download for customers interested in installing only the application server. This download is considerably smaller than the full stack.

### Supported Platforms

Everything we supported for 6.0.19.A (see [supported platforms](http://static.springsource.com/projects/tc-server/6.0/getstart/rgssupplat.html)) is also supported for 6.0.20.A at GA. In addition, we have our QA team ready to certify and support new platforms based on direct customer feedback from the 6.0.19.A release.

### Futures

We're already planning the next maintenance update (tentatively called 6.0.20.B, but that could change if there is an Apache Tomcat release in the interim), the next one will include bug fixes and a few minor improvements to the central administration server as well. Further down the road we're planning to introduce significant features around server and application provisioning and rollback, among other things. We'd love to hear your input on what you'd like to see, either in comments here or on the [tc Server forum groups](http://forum.springsource.org/forumdisplay.php?f=62).