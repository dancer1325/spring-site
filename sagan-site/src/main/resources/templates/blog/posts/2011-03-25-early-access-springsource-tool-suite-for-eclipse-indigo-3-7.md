---
title: Early Access: SpringSource Tool Suite for Eclipse Indigo (3.7)
source: https://spring.io/blog/2011/03/25/early-access-springsource-tool-suite-for-eclipse-indigo-3-7
scraped: 2026-02-24T08:44:15.720Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Martin Lippert |  March 25, 2011 | 0 Comments
---

# Early Access: SpringSource Tool Suite for Eclipse Indigo (3.7)

_Engineering | Martin Lippert |  March 25, 2011 | 0 Comments_

The Eclipse Indigo (3.7) M6a packages are available for download from Eclipse since a few days, so its time for us to allow you to use the SpringSource Tool Suite (STS) on top of that milestone version. :-)

Its just an early access version of STS, but we managed to get all the pieces together for Eclipse 3.7: An AJDT version for Eclipse 3.7, a Groovy-Eclipse version that runs of 3.7 and the SpringSource Tool Suite itself, of course, containing Spring IDE, Grails tooling and all the other nice features you know from STS - all now also running on top of the latest Eclipse Indigo milestones.

### How to install

-   Download and install [Eclipse Indigo (3.7) M6a for Java EE Developers](http://www.eclipse.org/downloads/index-developer.php).
-   Download the [bookmarks.xml](view-source:http://dist.springsource.com/snapshot/TOOLS/composite/e3.7/bookmarks.xml) and import that to your list of update sites (Preferences -> Install/Update -> Available Update Sites -> Import).
-   Go to "Install New Software" and select SpringSource Tool Suite for Eclipse 3.7: [http://dist.springsource.com/snapshot/TOOLS/nightly/e3.7](http://dist.springsource.com/snapshot/TOOLS/nightly/e3.7).
-   Select the components you would like to use and install.
-   Restart and use STS on Eclipse 3.7.

The necessary dependencies for STS are all available from the composite update site: [http://dist.springsource.com/snapshot/TOOLS/composite/e3.7](http://dist.springsource.com/snapshot/TOOLS/composite/e3.7), if you wanna add something manually.

We also included the installation instructions for 3.7 in the "Installing from the Nightly Snapshot Update Site" section of the [installation instructions for STS](http://download.springsource.com/release/STS/doc/STS-installation_instructions.pdf).

### Manual Installation

Here are the individual update sites from which you can install STS, AJDT and Groovy-Eclipse for Indigo (3.7):

-   [http://dist.springsource.com/snapshot/TOOLS/nightly/e3.7](http://dist.springsource.com/snapshot/TOOLS/nightly/e3.7)
-   [http://dist.codehaus.org/groovy/distributions/greclipse/snapshot/e3.7/](http://dist.codehaus.org/groovy/distributions/greclipse/snapshot/e3.7/)
-   [http://download.eclipse.org/tools/ajdt/37/dev/update](http://download.eclipse.org/tools/ajdt/37/dev/update)

[](http://dist.codehaus.org/groovy/distributions/greclipse/snapshot/e3.7/)

### Feedback

This is an early access version of STS that is continually updated. If you observe problems running STS on top of your Eclipse Indigo (3.7) M6a (or later) installation, please let us know and report issues to: [https://issuetracker.springsource.com/browse/STS](https://issuetracker.springsource.com/browse/STS).

Enjoy!