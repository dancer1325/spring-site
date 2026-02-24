---
title: Grails 1.1.1 released with Google AppEngine support
source: https://spring.io/blog/2009/05/14/grails-1-1-1-released-with-google-appengine-support
scraped: 2026-02-24T09:08:02.558Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Graeme Rocher |  May 14, 2009 | 0 Comments
---

# Grails 1.1.1 released with Google AppEngine support

_Engineering | Graeme Rocher |  May 14, 2009 | 0 Comments_

Today we are pleased to announce the availability of [Grails 1.1.1](http://grails.org/Download) which whilst providing many incremental improvements over Grails 1.1 also introduces official support for [Google AppEngine](http://appengine.google.com).

Groovy itself has [been running on AppEngine](http://blog.springsource.com/2009/04/07/write-your-google-app-engine-applications-in-groovy/) since its launch, but we had to make a few tweaks here and there in Grails to make Grails applications run on AppEngine.

Included in this is the introduction of an [AppEngine plugin](http://grails.org/plugin/app-engine) which replaces Hibernate with JDO (and soon JPA) for persistence in order to take advantage of Google's DataStore API. The AppEngine plugin also integrates the AppEngine development environment with Grails so that you can run your Grails application locally inside the AppEngine container whilst still benefiting from hot reloading support.

## Getting Started

As with many things in Grails the ease of use is something best demonstrated visually, hence we have prepared a screencast demonstrating creating a Grails application and deploying to Google AppEngine using the AppEngine plugin. Simply click on the image below to start the [screencast](http://grails.org/dist/screencasts/grails-appengine-screencast.mov):

[![Grails AppEngine Screencast](http://blog.springsource.com/wp-content/uploads/2009/05/screencast-appengine-intro.jpg "Grails AppEngine Screencast")](http://grails.org/dist/screencasts/grails-appengine-screencast.mov "Grails AppEngine Screencast")

For even more information there are detailed step-by-step instructions on how to create and deploy a Grails application to Google AppEngine on the [AppEngine plugin page](http://grails.org/plugin/app-engine).

## The Future

The Grails and AppEngine combination is already the most productive combination you can use to deploy Java applications to AppEngine, but we are not finished yet. We are [hard at work](http://svn.codehaus.org/grails-plugins/grails-gorm-jpa/trunk/test/integration/org/grails/jpa/BasicPersistenceMethodsTests.groovy) on building GORM-like abstractions over JPA and JDO in order to bring productivity enhancements to the AppEngine DataStore API and users of JPA/JDO in general.

Luckily since Groovy produces valid Java bytecode we are able to take advantage of all of the AppEngine features and tools such as the DataNucleus Enhancer. The ultimate goal is to make Grails the primary environment for building applications targeting the AppEngine Java SDK and a real viable alternative from a productivity standpoint to the Python SDK.  What we have introduced today is a great step in that direction.

## Resources

-   Google AppEngine - [http://appengine.google.com](http://appengine.google.com)
-   Grails 1.1.1 - [http://grails.org/Download](http://grails.org/Download)
-   Grails AppEngine Plugin - [http://grails.org/plugin/app-engine](http://grails.org/plugin/app-engine)
-   Grails Documentation - [http://grails.org/doc/1.1.x](http://grails.org/doc/1.1.x)