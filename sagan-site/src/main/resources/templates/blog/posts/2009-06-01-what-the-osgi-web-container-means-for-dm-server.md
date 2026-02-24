---
title: What the OSGi Web Container means for dm Server
source: https://spring.io/blog/2009/06/01/what-the-osgi-web-container-means-for-dm-server
scraped: 2026-02-24T09:07:34.049Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Harrop |  June 01, 2009 | 0 Comments
---

# What the OSGi Web Container means for dm Server

_Engineering | Rob Harrop |  June 01, 2009 | 0 Comments_

Following my [previous entry](http://blog.springsource.com/2009/05/27/introduction-to-the-osgi-web-container/) many people have been asking about the impact that the move to the OSGi Web Container will have on dm Server. The most common questions being asked are:

-   What is being added?
-   What is staying the same?
-   What is changing?
-   How do I keep up to date?

I'll address each of these questions independently. If you have any more questions, please feel free to comment.

### What is being added?

Integrating with the Web Container RI will give dm Server access to all the features of the OSGi Web Container standard. This includes a standard model for how WARs are handled, support for the webbundle URL scheme and support for the Web Container extender.

I'm exploring some nice value-added features for the RI including dynamic configuration using ConfigAdmin, a comprehensive MBean interface to introspect deployed web bundles and EventAdmin integration to monitor lifecycle events. All of these features will be added to dm Server as well as to the RI.

### What is staying the same?

You'll be pleased to know that much of what you have learnt about web applications in dm Server remains the same.

#### Using the dm Server deployer

In addition to support for webbundle URLs, WAR files can still be deployed using the dm Server deployer. All paths into the deployer are supported including the pickup directory, deployer MBean and Admin Console.

When deploying using the dm Server deployer, WAR file dependencies will be automatically installed from the bundles available in the configured repository chain.

#### WAR deployment patterns

All the WAR types mentioned in the [Programmer's Guide](http://static.springsource.com/projects/dm-server/1.0.x/programmer-guide/html/ch04.html#architecture-wars) remain - in fact they are part of the Web Container standard.

#### System package imports

WARs deployed using dm Server will auto-import all the configured system packages even if this feature doesn't make it into the standard. If deploying using a webbundle URL you can trigger system package import using a URL parameter. I'm hopeful that the spec will include some standard behaviour in this area

### What is changing?

We are aiming to keep the most features the same in dm Server, but the move to the Web Container does necessitate some changes. At the same time, we're taking advantage of the code rework to integrate some of the more popular feature requests we see from our users.

#### Web modules are being removed

The biggest change is the removal of [web modules](http://static.springsource.com/projects/dm-server/1.0.x/programmer-guide/html/ch04.html#architecture-web-modules). Our preference is to support standards-based approaches, and now that we've been able to work with the OSGi Alliance to create a standards-based approach to web applications on OSGi, we are moving to it in preference to a dm Server-specific solution.

For those of you who are using web modules today, I'm really interested to hear what features you like the most and would be sad to lose. There is no reason why important web modules features cannot be reworked on top of Web Container web bundles.

#### Switch to Tomcat config format

In the 1.0.x line, the Tomcat instance embedded in dm Server is configured using the JSON configuration file format. Many of our users have requested that we switch back to using Tomcat's XML format. The Web Container RI uses the standard Tomcat format and when dm Server switches to the Web Container it will switch configuration file formats as well.

I'm still finalizing the exact details of where the configuration files will be stored. I'm hoping to be able to parameterize the Tomcat configuration file with placeholders that can be populated from ConfigAdmin

### How do I keep up to date?

The easiest way to stay abreast of the progress is to track the SVN repos for the Web Container and for dm Server Web. You can access these repos at the URLs below:

-   OSGi Web Container - [https://anonsvn.springsource.org/svn/dm-server-osgi-web-container/trunk](https://anonsvn.springsource.org/svn/dm-server-osgi-web-container/trunk)
-   dm Server Web - [https://anonsvn.springsource.org/svn/dm-server-web/main-branches/jersey](https://anonsvn.springsource.org/svn/dm-server-web/main-branches/jersey)

I'll be blogging here regularly and you can follow progress on Twitter with [#osgi](http://search.twitter.com/search?q=%23osgi) and [#dmserver](http://search.twitter.com/search?q=%23dmserver).