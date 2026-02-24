---
title: Proxies in OSGi
source: https://spring.io/blog/2009/04/14/proxies-in-osgi
scraped: 2026-02-24T09:09:07.265Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Hale |  April 14, 2009 | 0 Comments
---

# Proxies in OSGi

_Engineering | Ben Hale |  April 14, 2009 | 0 Comments_

Over the past couple of months, we've had a number of customers report issues to us regarding `ClassNotFoundException`s and proxies in dm Server. The issue actually has to do with type visibility in OSGi and is [explained very well](http://www.osgi.org/blog/2008/08/classy-solutions-to-tricky-proxies.html) by Peter Kriens over at the OSGi Alliance Blog. Please take a look at his post if you are seeing classloading issues when using proxies in dm Server or any other OSGi runtime.