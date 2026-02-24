---
title: Early Access: SpringSource Tool Suite for Eclipse Juno (4.2)
source: https://spring.io/blog/2012/03/14/early-access-springsource-tool-suite-for-eclipse-juno-4-2
scraped: 2026-02-24T08:25:01.240Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Martin Lippert |  March 14, 2012 | 0 Comments
---

# Early Access: SpringSource Tool Suite for Eclipse Juno (4.2)

_Engineering | Martin Lippert |  March 14, 2012 | 0 Comments_

Wanna use the SpringSource Tool Suite on the latest Eclipse Juno (4.2) milestone builds? Here you go: ![:-)](http://blog.springsource.org/wp-includes/images/smilies/icon_smile.gif)

### How to install

-   Download and install the latest: [Eclipse Juno JEE milestone build](http://www.eclipse.org/downloads/index-developer.php)
-   Download the [bookmarks.xml](http://dist.springsource.com/snapshot/TOOLS/composite/e4.2/bookmarks.xml) and import that to your list of update sites (Preferences -> Install/Update -> Available Update Sites -> Import).
-   Go to "Install New Software" and select SpringSource Tool Suite for Eclipse 4.2: [http://dist.springsource.com/snapshot/TOOLS/nightly/e4.2](http://dist.springsource.com/snapshot/TOOLS/nightly/e4.2).
-   Select the components you would like to use and install.
-   Restart and use STS on Eclipse 4.2.

The necessary dependencies for STS are all available from the composite update site: [http://dist.springsource.com/snapshot/TOOLS/composite/e4.2](http://dist.springsource.com/snapshot/TOOLS/composite/e4.2), if you wanna add something manually.

### Managing update sites yourself

Here are the individual update sites from which you can install STS, AJDT and Groovy-Eclipse for Juno (4.2):

-   [http://dist.springsource.com/snapshot/TOOLS/nightly/e4.2](http://dist.springsource.com/snapshot/TOOLS/nightly/e4.2)
-   [http://dist.springsource.org/snapshot/GRECLIPSE/e4.2/](http://dist.springsource.org/snapshot/GRECLIPSE/e4.2/)
-   [http://download.eclipse.org/tools/ajdt/37/dev/update/](http://download.eclipse.org/tools/ajdt/37/dev/update/)

### Known limitations

Since the Eclipse Juno distribution is based on the Eclipse 4.x stream, you will notice quite some changes on the UI when starting the latest Eclipse Juno builds. And we haven't yet adapted to all changes, therefore the Maven support of STS (for example) is not yet working. If you observe anything else, please let us know.

### Feedback

This is an early access version of STS that is continually updated by our CI servers. If you observe problems running STS on top of your Eclipse Juno (4.2) M5 (or later) installation, please let us know and report issues to: [https://issuetracker.springsource.com/browse/STS](https://issuetracker.springsource.com/browse/STS). Since we are planning towards a distribution on top of Eclipse Juno for STS 3.0, we would be very happy to hear your opinion about that and gather feedback as early as possible.

### Outlook

We are planning towards an STS 3.0 release right after the Eclipse Juno release in July 2012, providing ready-to-go-distributions of STS based on Eclipse Juno.