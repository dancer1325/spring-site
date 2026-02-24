---
title: Deploying WARs to the OSGi Web Container is now even easier
source: https://spring.io/blog/2009/06/16/deploying-wars-to-the-osgi-web-container-is-now-even-easier
scraped: 2026-02-24T09:06:51.906Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Andy Wilkinson |  June 16, 2009 | 1 Comment
---

# Deploying WARs to the OSGi Web Container is now even easier

_Engineering | Andy Wilkinson |  June 16, 2009 | 1 Comment_

As Rob mentioned in his [introduction to the OSGi Web Container](http://blog.springsource.com/2009/05/27/introduction-to-the-osgi-web-container/), dm Server automatically imports system packages into Web bundles. This has proved very useful, especially when deploying existing WAR files into an OSGi environment. I've recently spent some time moving this functionality from dm Server's Web subsystem into the OSGi Web Container RI. This blog describes the new functionality, and how to make use of it.

### Enabling import of the system packages

There are two ways in which you can instruct the RI to import all of the exported system packages.

When you install a Web bundle, you can now use the SpringSource-SystemPackages URL parameter to automatically import all of the system bundle's exports. For example:

```code
Copyinstall webbundle:file:mywar.war?SpringSource-SystemPackages=import
```

Alternatively, if you'd prefer not to have to remember to specify the parameter each time you install the WAR file, you can enable this functionality by adding the SpringSource-SystemPackages header to your WAR's manifest:

```code
CopySpringSource-SystemPackages: import
```

### Which packages are imported?

The RI will generate an import for every package that's exported by the system bundle, unless the WAR file already imports the package, or contains the package in WEB-INF/classes or within a Jar in WEB-INF/lib. If the WAR file already imports or contains the package, the system bundle's export is ignored, and any existing import is left untouched. In the case where a new import is generated, it is generated with a version range that precisely encompasses the version(s) exported from the system bundle.

### Trying it out

Firstly, build and launch the RI as Rob previously [described](http://blog.springsource.com/2009/05/27/introduction-to-the-osgi-web-container/), with the exception that, if you've used a previous version of the RI, you should start PAX runner with the clean option to ensure that it uses the newly-built RI bundles rather than those in its cache:

```code
Copypax-run --clean --platform=equinox --snapshot runner.bundles
```

Previously, to successfully use the formtags WAR, it was necessary to import a handful of packages using the Import-Package URL parameter:

```code
Copyinstall webbundle:file:formtags.war?Import-Package=org.xml.sax,org.xml.sax.helpers,javax.xml.parsers,org.w3c.dom
```

This is a little cumbersome as you need to know which packages to import. Instead, you can now use the SpringSource-SystemPackages URL parameter:

```code
Copyosgi> install webbundle:file:formtags.war?SpringSource-SystemPackages=import
Bundle id is 43
```

Without there having been the need to list specific packages to import when the formtags Web bundle was installed, it should now start successfully:

```code
Copyosgi> start 43
```

### What's next?

We've been working on a prototype for truly modular OSGi Web applications and we're getting tantalisingly close to having something to show you. It'll be in the form of a new component for dm Server, running on top of the OSGi Web container that dm Server now embeds in place of its previous web support. All being well it should be ready by the end of the week. Watch this space!