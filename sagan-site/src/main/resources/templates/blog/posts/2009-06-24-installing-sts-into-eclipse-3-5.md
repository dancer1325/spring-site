---
title: Installing STS into Eclipse 3.5
source: https://spring.io/blog/2009/06/24/installing-sts-into-eclipse-3-5
scraped: 2026-02-24T09:06:14.421Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Christian Dupuis |  June 24, 2009 | 0 Comments
---

# Installing STS into Eclipse 3.5

_Engineering | Christian Dupuis |  June 24, 2009 | 0 Comments_

Today marks a big day for Eclipse and for everybody involved with the Eclipse ecosystem: Congratulations to the Eclipse folks for releasing Eclipse 3.5 aka Galileo. You can read more about the release at [](http://www.eclipse.org/galileo/)[http://www.eclipse.org/galileo/](http://www.eclipse.org/galileo/). I encourage everybody to download Eclipse 3.5 today and try it out.

Since SpringSource is strongly committed to Eclipse and we are building our SpringSource Tool Suite on top of the Eclipse technology stack, I'm excited to report that STS can be installed and used with 3.5. Here are some instructions to get started:

**Update: The instructions in this post are outdated and might not work for you. Please refer to the STS [Installation Instructions](http://dist.springsource.com/release/STS/doc/STS-installation_instructions.pdf) for up-to-date information on how to install STS from an update site.**

1.  Download and install the "Eclipse IDE for Java EE Developers" package
2.  Disable all pre-configured update sites on the "Install/Update -> Available Software Sites" page from the Eclipse preferences
3.  Import the [linked update site bookmark file](http://dist.springsource.com/snapshot/TOOLS/sts-update-sites.xml) into your Eclipse. This will configure all the nightly snapshot update sites for STS you'll need. Use the "Import..." button on the "Install/Update -> Available Software Sites" page from the Eclipse preferences
4.  Install all features from the update site labeled "AJDT" and restart
5.  Install at least the Jira Connector feature from the update site labeled "Mylyn Extras" and restart
6.  Install all features from the update site labeled "Spring IDE Update Site" and restart
7.  Install all features from the update site labeled "SpringSource dm Server Tools Update Site" and restart
8.  Install all features from the update site labeled "SpringSource Tool Suite Update Site" and restart
9.  Enjoy STS in Eclipse 3.5

I hope that you find these steps helpful. If you encounter any installation problems following the instructions feel free to raise a [JIRA](https://issuetracker.springsource.com/browse/STS).

We'll release STS 2.1.0.RC1 based on Eclipse 3.4 and 3.5 very soon. So stay tuned. Oh, before I forget: STS is free!