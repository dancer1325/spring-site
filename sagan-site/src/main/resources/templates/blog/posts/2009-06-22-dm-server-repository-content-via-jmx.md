---
title: dm Server Repository Content via JMX
source: https://spring.io/blog/2009/06/22/dm-server-repository-content-via-jmx
scraped: 2026-02-24T09:06:37.023Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Hale |  June 22, 2009 | 0 Comments
---

# dm Server Repository Content via JMX

_Engineering | Ben Hale |  June 22, 2009 | 0 Comments_

In the [dm Server 2.0.0.M1 release](http://blog.springsource.com/2009/04/02/announcing-dm-server-20-m1/) we added support for shared repositories. As a followup to this new functionality, we've added support for browsing those repositories via JMX.

Connecting to a running dm Server instance with a JMX client now shows you a Repository group. Under this group, each configured repository (with the exception of chained repositories) has a bean that returns synopses of all of the artifacts contained inside. The bean also exposes a method for returning the entire, detailed ArtifactDescriptor for a given bean based on it's type, name, and version.

![JMX Repository Browsing](http://blog.springsource.com/wp-content/uploads/2009/05/picture-1.png "JMX Repository Browsing")

Obviously, something like JConsole is mostly useful for displaying small targeted amounts of data.  For larger datasets, the AMS team is currently working on visualization that is a bit easier on the eyes.