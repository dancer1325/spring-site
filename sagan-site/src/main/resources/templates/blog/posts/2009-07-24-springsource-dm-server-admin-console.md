---
title: SpringSource dm Server Admin Console
source: https://spring.io/blog/2009/07/24/springsource-dm-server-admin-console
scraped: 2026-02-24T09:05:32.113Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Christopher Frost |  July 24, 2009 | 0 Comments
---

# SpringSource dm Server Admin Console

_Engineering | Christopher Frost |  July 24, 2009 | 0 Comments_

### New Features

A set of updates to the SpringSource dm Server Admin Console are available in the [nightly](http://www.springsource.com/download/community?project=SpringSource%20dm%20Server&nightly=yes) builds. This also shows the use of [Plans](http://blog.springsource.com/2009/04/02/announcing-dm-server-20-m1/) and the [RFC66 Web container](http://blog.springsource.com/2009/05/27/introduction-to-the-osgi-web-container/). There are two new features available, the first lets you look at any service dumps that the dm Server system may have produced and the second lets you explore the state of bundles within OSGi.

A dump may contain many dump items such as stack traces, thread dumps, depending on the initial cause. Dump items are available for viewing in the Admin Console, simply select the dump of interest on the left and then the dump item on the right and it will be displayed.

\[caption id="attachment\_2519" align="aligncenter" width="785" caption="View of the 'summary' item for a dump."\]![View of the 'summary' item for a dump.](http://blog.springsource.com/wp-content/uploads/2009/07/picture-1.png "Viewing a dump item")\[/caption\]

There are some dump items that are not in plain text. One such item is a zip of the OSGi resolve state at the time of the dump. The state viewer can also be used to explore the state of the OSGi system when the dump occurred. Viewing the state lets you navigate round the bundles and their various imported/exported packages.

It can also be used to view the Live state of a running instance. The Live view provides additional information that is not present in an OSGi state dump including whether or not bundles are powered by Spring and the state of the bundle within OSGi.

\[caption id="attachment\_2529" align="aligncenter" width="749" caption="View of some bundles with information on Fragments/Hosts, Spring contexts and state."\]![View of some bundles with information on Fragments/Hosts, Spring contexts and state.](http://blog.springsource.com/wp-content/uploads/2009/07/picture-11.png "Bundles overview")\[/caption\]

### Coming Soon & Any Requests...

The Admin Console is in active development and the state viewer is currently being improved to make diagnosing resolution problems easier and to display more information on the services of any bundles and the beans of any Spring-powered bundles. We have discussed other future features such as a repository viewer so you can see what is available in the various configured repositories and the chain they form. Also, a Config Admin viewer to see the contents of the servers configuration.

We would really like to hear of anything else you would like to see, what would make your OSGi life easier. Please post a comment or discuss it on the [forums](http://forum.springsource.org/forumdisplay.php?f=53), or just raise a [JIRA](https://issuetracker.springsource.com/browse/DMS) and we'll have a look. If you want to know when new features are available in the nightly build, instead of waiting for the next milestone release and blog, you can follow me on [Twitter](http://twitter.com/cgfrost).