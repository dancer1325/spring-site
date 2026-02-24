---
title: Configuration Properties Screencast
source: https://spring.io/blog/2009/09/11/configuration-properties-screencast
scraped: 2026-02-24T09:04:09.529Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Steve Powell |  September 11, 2009 | 0 Comments
---

# Configuration Properties Screencast

_Engineering | Steve Powell |  September 11, 2009 | 0 Comments_

In Rob's [dm Server Roadmap blog entry](http://blog.springsource.com/2009/04/01/springsource-dm-server-roadmap/ "dm Server Roadmap blog entry"), last April, we introduced two new artefact types: “*plan*” and “*configuration file*”.

Here is a short screencast demonstrating *configuration file*s, in particular we show how to reference them from a *plan*.

First, a small web application picks up properties from a configuration properties file—deployed separately from the application. Second, the application and the properties are placed in the repository and a **plan** is constructed and deployed which installs and starts both the web application and its properties in one step.

#### Configuration Properties (5:59)

-   [QuickTime Screencast](http://s3.springsource.org.s3.amazonaws.com/DMS/config-properties-large.mov) (42.9 MB)

#### Source Code

The repository configuration-properties in the samples project contains all the code shown in the demonstration.

Git - [git://git.springsource.org/dm-server-samples/configuration-properties.git](git://git.springsource.org/dm-server-samples/configuration-properties.git)