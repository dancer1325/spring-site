---
title: SpringSource (and other top vendors) leading the OSGi charge
source: https://spring.io/blog/2008/09/17/springsource-and-other-top-vendors-leading-the-osgi-charge
scraped: 2026-02-24T09:14:42.322Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Adrian Colyer |  September 17, 2008 | 0 Comments
---

# SpringSource (and other top vendors) leading the OSGi charge

_Engineering | Adrian Colyer |  September 17, 2008 | 0 Comments_

In a [press release](http://www.osgi.org/wiki/uploads/News/2008_09_16_worldwide_market.pdf "View the full press release") made available by the OSGi Alliance yesterday, several leading vendors including SpringSource, IBM, Oracle, RedHat, Sun, SAP, ProSyst, and Paremus joined forces in their support of OSGi as the foundation for next generation server platforms.

To highlight some of the key points:

Craig Hayman, VP IBM WebSphere said

> \[IBM\] has been shipping WebSphere Application Server built on OSGi since 2006. As a result, IBM clients benefit from a modular platform built with proven components and the ability to automatically use only the components required by their application.

Steven G. Harris, SVP of Development at Oracle said

> Oracle WebLogic Server is a great example of the customer benefits of modularization, with its reduced footprint, improved startup time, and flexible configuration options. OSGi technology provides the standards based foundation...

Sacha Labourey, VP of Engineering for RedHat's middleware business said

> Running OSGi technology in JBoss Enterprise Middleware Solutions enables our customers to deliver safer services and applications in a more dynamic runtime environment.

Tom Kincaid, Executive Director of Application Platforms at Sun Microsystems said

> Sun has seen strong demand for OSGi technology within the GlassFish community. The GlassFish community will be able to take advantage of the modularity and dynamic extensibility implemented via an OSGi-technology based microkernel in the upcoming GlassFish v3 Prelude Release.

What all of the vendors quoted in the release have in common, including SpringSource, is that they build their server platforms on top of OSGi. This has the potential to deliver a set of benefits to users of those platforms including more modular server structures with the ability to run in a smaller footprint and to dynamically alter server characteristics and capabilities.

You need to look a bit harder at the various vendor offerings to determine to what extent they have been able to realize those benefits for you as a user. At SpringSource you could say we were "lucky" in this respect. We had the good fortune to be able to design the SpringSource dm Server (part of the SpringSource Application Platform) from the ground up on OSGi, with no legacy to be concerned with. This has enabled us to exploit OSGi to the full. Other vendors have had to retrofit OSGi into large existing code bases. I know from first hand experience how difficult it is to retrospectively try and modularize a large existing code base. If you do manage to modularize it, making it behave well in a dynamic environment is even harder (even Eclipse struggles to pull off that latter requirement, often requiring restarts after updates).Â  A characteristic you tend to see in products where OSGi has been retrofitted are a small number of large bundles (very coarse grained modularity) and limited dynamic support for managing modules at runtime.

Vendors such as SpringSource, Paremus, and ProSyst go one crucial step further. Building a server platform on OSGi can only get you so far. What if you actually want to take advantage of OSGi for building your own applications? For this you need an OSGi technology-based programming and deployment model. This is where the true frontier for next generation server platforms is - not in making things easier for the server vendor to build their platform, but in making things easier for the application developer to build and deploy their applications onto that platform.

The SpringSource dm Server supports traditional war files, OSGi bundles, and applications consisting of several bundles (modules) working together, with a gradual migration path from a war file allowing you to incrementally take advantage of OSGi.

Here are some key questions to ask your vendor when considering OSGi:

-   You say your server is built on OSGi, but how modular is it really under the covers? Is it a few very large bundles or have you been able to fully architect your platform to take advantage of OSGi?
-   To what extent are the dynamic capabilities of OSGi to add, remove, and update modules at runtime reflected in your server platform? Can I add and remove server capabilities or subsystems easily?
-   Can I deploy my own applications as OSGi bundles? Do you have management and administration tools to accompany this?
-   Do you offer a standards-based OSGi programming model? (This is a tough one, SpringSource uses Spring Dynamic Modules as the programming model, and is working to standardize this in release 4.2 of the OSGi Service Platform through RFC 124. This will form the cornerstone of the standards-based OSGi programming model for SpringSource dm Server.)
-   I need to use existing enterprise libraries in my application - how are they supported under OSGi on your platform? (Without special support, things like load-time weaving required by ORM vendors may not work correctly).
-   Do you package all of your own offerings as OSGi bundles that I can easily deploy? (The Spring Framework for example is OSGi-ready out of the box).
-   Where can I obtain OSGi-ready versions of commonly used third-party libraries to deploy to your platform? (SpringSource makes available the [SpringSource Enterprise Bundle Repository](http://www.springsource.com/repository "Enterprise Bundle Repository home page") for this purpose).

I think it's very safe to say that OSGi is here to stay. Welcome to the future, enjoy the ride!