---
title: SpringSource dm Server 1.0 RC2 Released
source: https://spring.io/blog/2008/09/11/springsource-dm-server-1-0-rc2-released
scraped: 2026-02-24T09:14:46.987Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Harrop |  September 11, 2008 | 0 Comments
---

# SpringSource dm Server 1.0 RC2 Released

_Engineering | Rob Harrop |  September 11, 2008 | 0 Comments_

I'm happy to announce the availability of RC2 of the **SpringSource dm Server**, previously known as the SpringSource Application Platform. This release is feature complete and barring any serious issues will become 1.0 GA in two weeks time.

This release fixes a few critical bugs, upgrades to Tomcat 6.0.18 and updates all code, documentation and supporting materials to reflect the new name.

Due to the renaming of the product, PlatformOsgiBundleXmlWebApplicationContext has been renamed to ServerOsgiBundleXmlWebApplicationContext and moved from the com.springsource.platform.web.dm package to the com.springsource.server.web.dm package. Thus, if you are setting the contextClass for Spring MVC's ContextLoaderListener or DispatcherServlet in web.xml in a Shared Services WAR, be sure to change the fully qualified path to com.springsource.server.web.dm.ServerOsgiBundleXmlWebApplicationContext.

The renaming of PlatformOsgiBundleXmlWebApplicationContext also impacts programmatic access to a Web Module's or Shared Services WAR's BundleContext: the constant used to retrieve the BundleContext from the ServletContext is now ServerOsgiBundleXmlWebApplicationContext.BUNDLE\_CONTEXT\_ATTRIBUTE.

The name of the manifest header denoting personality-specific types has changed from Platform-ModuleType to Module-Type. Thus, in order for existing web modules to continue to function, you will need to update META-INF/MANIFEST.MF in your web module and replace Platform-ModuleType: Web with Module-Type: Web.

Please note that the web applications in all sample applications (i.e., Pet Clinic, Form Tags, and Spring Travel) have been updated to reflect these changes.

MBeans which were previously published under com.springsource.platform are now published under com.springsource.server.

Downloads, samples and documentation can be found at: [](http://www.springsource.com/beta/dmserver)[http://www.springsource.com/beta/dmserver](http://www.springsource.com/beta/dmserver).