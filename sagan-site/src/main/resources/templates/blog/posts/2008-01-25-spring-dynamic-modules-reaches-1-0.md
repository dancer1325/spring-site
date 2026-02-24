---
title: Spring Dynamic Modules reaches 1.0!
source: https://spring.io/blog/2008/01/25/spring-dynamic-modules-reaches-1-0
scraped: 2026-02-24T09:21:10.881Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Adrian Colyer |  January 25, 2008 | 0 Comments
---

# Spring Dynamic Modules reaches 1.0!

_Engineering | Adrian Colyer |  January 25, 2008 | 0 Comments_

Well, it took a lot longer than we initially anticipated, but I'm really pleased to say that the Spring Dynamic Modules project reached its 1.0 milestone today. When I first posted on this topic back in September of 2006 ("[Spring OSGi support gaining momentum](http://blog.springsource.com/main/2006/09/07/spring-osgi-support-gaining-momentum/ "Spring OSGi support gaining momentum")") the initial specification was just an attachment to an issue against the Spring Framework, and connections to the wider OSGi community were only just beginning to be formed.

Fast forward eighteen months, and [Spring Dynamic Modules](http://www.springframework.org/osgi "Spring Dynamic Modules project page") has become a full-fledged project in the Spring portfolio with committers from SpringSource, BEA, and Oracle. Both BEA and Oracle are using Spring Dynamic Modules to build their own OSGi-based products (see for example "[WebLogic Event Server - why we used Spring](http://dev2dev.bea.com/blog/andypiper/archive/2007/08/weblogic_event.html "WebLogic Event Server - why we used Spring")"), and the Spring Dynamic Modules discussion group has almost 1000 members. The OSGi Alliance itself has formed an [Enterprise Expert Group](http://www2.osgi.org/EEG/HomePage "OSGi Alliance Enterprise Expert Group"), and SpringSource is an active member.

Whenever we speak about OSGi and Spring Dynamic Modules at conferences, the level of interest is very high. So what's all the fuss about?

The OSGi Service Platform is a proven lightweight runtime that offers a "dynamic module system for Java". It's been used in everything from embedded devices, automotive and telco applications, to the foundation for substantial enterprise middleware products from the likes of IBM, BEA, and Oracle. Spring Dynamic Modules is focused on enabling you to *exploit the OSGi Service Platform in the construction of your own enterprise applications*. Applications built using Spring Dynamic Modules and running on the OSGi Service Platform are comprised of a set of peer Spring application contexts (one per OSGi bundle) interacting via the OSGi Service Registry. It's a service-oriented architecture, but entirely local within your VM, using regular Java references to access services. The benefits for applications constructed this way include:

-   Strong modularity: the internals of each module are kept private, and only the packages and beans (services) that you choose to export outside of the module are publicly available to other modules.
-   Dynamic module life cycle: you can install, uninstall, start, stop, and update each module (application context) independently using standard OSGi Service Platform life cycle facilities. Spring Dynamic Modules provides smart management of service references that cross module boundaries so that you can keep working with a constant reference even when the module providing that service is updated in place.
-   Support for versioning of modules. It's possible to deploy multiple versions of the same Java packages (and hence libraries) concurrently. The OSGi platform takes care of binding users of those libraries to the appropriate version, and of ensuring that you only see services that implement version-compatible interfaces.
-   Operational insight into the installed modules, the services and packages that they import and export, and how the modules are wired together at runtime.

The ability to update a module in-situ while other modules remain up and running can be a real productivity boost during development.

With the 1.0 release we've got a solid solution for module life cycle and service integration. When it comes to using existing (not written to run on OSGi) enterprise libraries on the OSGi Service Platform there are still traps for the unwary relating to class and resource loading and visibility. We believe we've sorted all of these issues for Spring itself in the recently released Spring Framework 2.5. The focus of the next release of Spring Dynamic Modules will be on providing pragmatic solutions for other commonly used enterprise libraries to make it much easier to write Spring-powered web applications that run on OSGi.