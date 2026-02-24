---
title: dm Server 2.0.0 released
source: https://spring.io/blog/2010/01/12/dm-server-2-0-0-released
scraped: 2026-02-24T09:00:27.591Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Andy Wilkinson |  January 12, 2010 | 0 Comments
---

# dm Server 2.0.0 released

_Engineering | Andy Wilkinson |  January 12, 2010 | 0 Comments_

As [Adrian](http://blog.springsource.com/2010/01/12/dm-server-project-moves-to-eclipse-org/) mentioned, today is the day for dm Server 2.0 and I'm delighted to announce that dm Server 2.0 is now [available](http://dist.springframework.org/release/DMS/springsource-dm-server-2.0.0.RELEASE.zip). Thank you for all of the feedback that we've had during the development of 2.0, it's helped to shape it into what we believe is a big step forward for enterprise OSGi. We're now looking forward to the next steps on the journey at Eclipse.org.

There's a lot of great stuff in the 2.0 release. Here's a brief overview:

-   **[dm Shell](http://static.springsource.org/s2-dmserver/2.0.x/user-guide/htmlsingle/user-guide.html#dmshell)** - we've added a brand new shell in 2.0, that's available both in-process and remotely over ssh. It provides extensive support for managing a dm Server instance and its deployed artifacts.
-   **[Admin console](http://static.springsource.org/s2-dmserver/2.0.x/user-guide/htmlsingle/user-guide.html#admin-console)** - the admin console has been extensively overhauled in 2.0. It provides, among other things, support for managing and deploying artifacts, examining diagnostic dumps, and examining the bundle wiring both in the live system, and at the time of a resolution failure.
-   **[Plans](http://static.springsource.org/s2-dmserver/2.0.x/programmer-guide/htmlsingle/programmer-guide.html#architecture-plans)** - dm Server 2.0 introduces support for plans which are powerful alternative to 1.0's PARs for deploying modular applications. A plan can be used to reference all of the artifacts that comprise your application, optionally making the application atomic to tie the child artifact lifecycles together, and scoped to isolate the application from other applications deployed in the same dm Server instance.
-   **[Provisioning](http://static.springsource.org/s2-dmserver/2.0.x/user-guide/htmlsingle/user-guide.html#repository)** - dm Server's always had excellent provisioning support and in 2.0 it's got even better. In addition to the automatic provisioning of bundles based on the needs of the installed applications that was available in 1.0, dm Server 2.0 provides support for provisioning plans, PARs, and configuration from both local and remote repositories.
-   **[Web support](http://static.springsource.org/s2-dmserver/2.0.x/user-guide/htmlsingle/user-guide.html#configuring-tomcat)** - dm Server 2.0 builds upon 1.0's Web support and embeds the Tomcat-based reference implementation for the OSGi Web Container specification, allowing users to deploy vanilla WAR files with all their dependencies in WEB-INF/lib, and Web Application Bundles that import their dependencies via OSGi manifest metadata. The web container is configurable using the standard Tomcat server.xml.
-   **[User region](http://static.springsource.org/s2-dmserver/2.0.x/user-guide/htmlsingle/user-guide.html#user-region-overview)** - dm Server 2.0 introduces a user region which isolates the dm Kernel from user-installed applications. Among other things, this simplifies administration as it allows users to focus on user application artifacts and their dependencies without having to deal with those of the kernel as well.
-   **[Spring 3.0](http://blog.springsource.com/2009/12/16/spring-framework-3-0-goes-ga)** - like many others, we've been tracking the Spring 3.0 milestones and release candidates, and dm Server 2.0 now packages Spring 3.0 final. If you'd prefer to use dm Server 2.0 with a different version of Spring, it can easily be configured to do so.
-   **[Hot deployment](http://static.springsource.org/s2-dmserver/2.0.x/user-guide/htmlsingle/user-guide.html#deployment-deploying)** - in addition to support for deployment via the admin console, artifacts can also be deployed to dm Server by copying them into the pickup directory, either in archive or exploded form.
-   **[Running as a service](http://static.springsource.org/s2-dmserver/2.0.x/user-guide/htmlsingle/user-guide.html#d0e759)** - dm Server can now be run as a Windows service or as a Unix background process.
-   **[Logging](http://static.springsource.org/s2-dmserver/2.0.x/user-guide/htmlsingle/user-guide.html#serviceability)** - as in 1.0, dm Server's logging support is available via SLF4J. In 2.0, the backend has been replaced with [LogBack](http://logback.qos.ch/), making it extensively [configurable](http://logback.qos.ch/manual/configuration.html) by modifying dm Server's config/serviceability.xml file with a rich set of appenders available out of the box.
-   **[Equinox 3.5](http://www.eclipse.org/equinox/)** - dm Server 2.0 embeds Equinox 3.5, the reference implementation of [OSGi 4.2](http://www.osgi.org/Specifications/HomePage).