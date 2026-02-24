---
title: Upgrading Maven integration for SpringSource Tool Suite 2.8.0
source: https://spring.io/blog/2011/10/18/upgrading-maven-integration-for-springsource-tool-suite-2-8-0
scraped: 2026-02-24T08:33:53.857Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Andrew Eisenberg |  October 18, 2011 | 4 Comments
---

# Upgrading Maven integration for SpringSource Tool Suite 2.8.0

_Engineering | Andrew Eisenberg |  October 18, 2011 | 4 Comments_

**UPDATE, Nov 23:** We have released STS 2.8.1, that fixes many of the install/uninstall of m2eclipse issues that people were having. [Read the release announcement.](http://forum.springsource.org/showthread.php?118523-STS-2.8.1-released) Now, it is possible to upgrade/downgrade m2eclipse easily. STS 2.8.1 fully supports both versions of m2eclipse.

Today, we released version 2.8.0 of the [SpringSource Tool Suite.](http://www.springsource.com/developer/sts) Along with an update to Eclipse Indigo SR1 (which brings you full IDE support for Java7), we also updated the Maven integration from the old and unmaintained [m2eclipse](http://m2eclipse.sonatype.org/) versions 0.12.x to the latest version [m2e](http://eclipse.org/m2e/) 1.0 – which is now shipping as part of the Eclipse release train. The STS 2.8.0 packages come with m2e 1.0 and several compatible add-ons (project configurators) pre-installed. We have also implemented a migration assistant that helps the upgrading your existing projects to the new m2e version. This migration assistant will convert the classpath, builder and project nature of all legacy Maven projects to be m2e 1.0 compatible. It will **not** update old launch configurations or project/workspace settings. These will need to be migrated by hand.

Unfortunately, upgrading an existing STS 2.7.x (or older) installation requires some extra work. First, follow the instructions on the "Update Site Installation" section of the [Installation Instructions document](http://dist.springsource.com/release/STS/doc/STS-installation_instructions.pdf). After updating to 2.8.0, the m2e migration assistant will be invoked even if you have not upgraded to m2e v1.0 yet. It is best to hold off on migrating until after upgrading to m2e v1.0. No long term damage will occur to your projects, but they will not be able to be built until you complete the upgrade process described below.

**Uninstall the existing m2e 0.xx components**

1.  Start your STS (preferably with an empty workspace to avoid confusion with existing projects that use m2eclipse 0.12.x).

```
Copy<li>Go to the "About" dialog and click on "Installation Details".</li>

<li>In the 'Installed Software' list that opens, select the <code>org.maven.ide.eclipse.*</code> and the <code>org.sonatype.*</code> entries.  More specifically, there should be five:
```

-   "Maven Integration for AJDT (Optional)": id=org.maven.ide.eclipse.ajdt.feature.feature.group
-   "Maven Integration for Eclipse (Required)": id=org.maven.ide.eclipse.feature.feature.group
-   "Maven Integration for WTP (Optional)": id=org.maven.ide.eclipse.wtp.feature.feature.group
-   "Project configurators for commonly used maven projects (temporary)": id=org.maven.ide.eclipse.temporary.mojos.feature.feature.group
-   "Tycho Project Configurators": id=org.sonatype.tycho.m2e.feature.feature.group
\[caption id="attachment\_10091" align="aligncenter" width="871" caption="Maven features to uninstall"\][![](http://blog.springsource.com/wp-content/uploads/2011/10/maven-uninstall2.png "maven-uninstall")](http://blog.springsource.com/wp-content/uploads/2011/10/maven-uninstall2.png)\[/caption\]-   Press "Uninstall"
-   Restart STS (again, preferably with the empty workspace)

**Install the new m2e components** Now we will install the new m2e 1.0 support from the Extension install including a number of add-ons that are compatible with that m2e version. We recommend installing from the dashboard instead of installing directly from the update site since installing from the dashboard will automatically install many commonly used project configurators (so that you won't have to do that yourself later).

1.  Open the Dashboard and select the Extensions tab.
2.  Select the m2e 1.0.100 composite install and press "install" \[caption id="attachment\_10094" align="aligncenter" width="797" caption="Installing Maven from the dashboard"\][![](http://blog.springsource.com/wp-content/uploads/2011/10/maven-install1.png "maven-install")](http://blog.springsource.com/wp-content/uploads/2011/10/maven-install1.png)\[/caption\]
3.  Restart STS

**Uh oh...my projects no longer build** After restarting STS, you may see that some of your maven projects no longer build and that they have errors in the pom.xml files like this: Plugin execution not covered by lifecycle configuration

Do not panic. Starting with version 1.0, m2e has become significantly more strict as to how maven plugins can be run inside of Eclipse/STS. In order for a maven plugin to be run as part of a project build or configure inside of Eclipse/STS, there must be an associated Eclipse plugin (called a project configurator) that manages the execution of the Maven plugin.

There is an easy fix for this. Go to Preferences -> Maven -> Discovery and click "*Open Catalog*". This will allow you to browse all available m2e project configurators. Look for the configurators that apply to the errors that you are seeing and install them.

If you are still seeing problems or have any questions at all, please comment on this blog or at the [STS forums](http://forum.springsource.org/forumdisplay.php?32-SpringSource-Tool-Suite). We will be happy to help.

**EDIT (October 21)**

Thanks for all the feedback everyone. I have gathered some FAQs and put into a forum post here: [http://forum.springsource.org/showthread.php?116189-STS-2.8.0-and-m2e-FAQ](http://forum.springsource.org/showthread.php?116189-STS-2.8.0-and-m2e-FAQ)

Also, we are looking at how to improve STS's maven support in the future, and we are [gathering feedback from users](http://forum.springsource.org/showthread.php?116188-Are-you-in-m2e-upgrade-hell-Feedback-sought). Please comment.