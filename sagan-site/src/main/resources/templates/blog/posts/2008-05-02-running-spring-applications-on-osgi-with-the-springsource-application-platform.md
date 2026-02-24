---
title: Running Spring Applications on OSGi with the SpringSource Application Platform
source: https://spring.io/blog/2008/05/02/running-spring-applications-on-osgi-with-the-springsource-application-platform
scraped: 2026-02-24T09:17:56.470Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Harrop |  May 02, 2008 | 0 Comments
---

# Running Spring Applications on OSGi with the SpringSource Application Platform

_Engineering | Rob Harrop |  May 02, 2008 | 0 Comments_

A lot of people have been asking what exactly the SpringSource Application Platform does for Spring applications to make them run well under OSGi, over and above what you can get out of the box with OSGi and Spring Dynamic Modules. Adrian’s post yesterday highlighted some of the general issues, now lets look at a few of the details.

The three most challenging aspects of running Spring applications on OSGi are:

-   Load-time weaving
-   Classpath scanning
-   Thread context classloader management

The remaining, but less interesting, issues include: JSP support, TLD scanning, annotation matching and resource lookups. Overall, there was a decent-sized set of issues that needed to be solved to make applications deploy smoothly.

## Load-time weaving

Load-time weaving was one of the most problematic features to support in a robust manner. At the basic level, it requires hooking into the Equinox ClassLoader so that standard ClassFileTransformers can be attached and used during the defineClass calls. On top of this, many uses of LTW require access to a throwaway ClassLoader that can be used to inspect types to decide what needs to happen during the weave, without affecting the real ClassLoader.

This base level of support was actually reasonably simple to achieve. The difficulty comes in when weaving is driven by classes in one bundle, but classes in another bundle need to be woven. This is pretty common in enterprise applications where one bundle contains domain entities and another contains types that use a JPA EntityManager. The Platform takes care of this complexity by ensuring that all bundles in an application can be woven with the appropriate ClassFileTransformers.

When you start propagating weaving across to other bundles, you really need to know when to stop. If you simply apply weaving to all bundles, then applications will interfere with each other. The Platform prevents this from happening by explicitly scoping weaving so that it applies only to modules in the application.

Another issue with LTW is that it complicates refresh. When a bundle is refreshed, OSGi will refresh all the bundles that depend on it. This means that, in the example I gave above, refreshing the domain bundle will cause the EntityManager bundle to be refreshed. However, refreshing the EntityManager **does not** refresh the domain bundle, meaning that weaving is possibly out of sync. The Platform handles this by propagating refresh to other bundles that are affected by weaving.

## Classpath scanning

With classpath scanning, the main issue is that Equinox doesn’t expose standard jar: and file: resources. The Platform puts an adapter in the middle so that libraries see the resource protocols that they expect. This has a nice side-effect of making a **lot** of third-party libraries work - it’s not just a fix for classpath scanning.

## Thread context classloader management

Many third-party libraries use the thread context ClassLoader to access application types and resources. Each bundle in OSGi has it’s own ClassLoader, so therefore, only one bundle can be exposed as the thread context ClassLoader at any time. This means that if a third-party library needs to see types that are distributed across multiple bundles, it isn’t going to work as expected.

The Platform fixes this by creating a ClassLoader that imports all the exported packages of every module in your application. This ClassLoader is then exposed as the thread context ClassLoader, enabling third-party libraries to see all the exported types in your application.

This is just a small cross-section of the issues that are addressed by the Platform but hopefully it gives you an idea of what the Platform means for Spring Framework users.