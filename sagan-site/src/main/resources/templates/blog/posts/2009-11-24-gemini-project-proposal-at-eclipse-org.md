---
title: Gemini project proposal at Eclipse.org
source: https://spring.io/blog/2009/11/24/gemini-project-proposal-at-eclipse-org
scraped: 2026-02-24T09:02:02.948Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Adrian Colyer |  November 24, 2009 | 0 Comments
---

# Gemini project proposal at Eclipse.org

_Engineering | Adrian Colyer |  November 24, 2009 | 0 Comments_

This week the [Gemini project proposal](http://eclipse.org/proposals/gemini/ "Enterprise Modules Project (Gemini) Proposal") was unveiled at Eclipse.org. Gemini is part of the Eclipse RT (runtime) project which is "designed to foster, promote and house runtime efforts in Eclipse, on the basis of the Equinox framework and OSGi" ([Eclipse RT mission statement](http://www.eclipse.org/rt/ "Eclipse RT project home page")). Gemini itself is an umbrella project bringing together a collection of modules designed for *enterprise* application development. SpringSource and Oracle are the first two companies providing committers to the project, and several other companies have expressed interest in joining too.

The initial projects being contributed to Gemini represent the fruits of our combined labour in the OSGi Alliance Enterprise Expert group. Now that work in that group is picking up pace, we wanted somewhere to pool together our collective reference implementations of the specification components in order to make it easier for you to find all of the relevant pieces. In addition, Gemini provides a way for you to have influence on the evolution of enterprise OSGi by participation in the projects.  SpringSource will be contributing two initial projects:

-   **Gemini Web Container** - the OSGi Web Container (RFC 66) reference implementation, which is currently housed in the SpringSource git repository. Rob Harrop described the [web container RI in a previous post on this blog](http://blog.springsource.com/2009/05/27/introduction-to-the-osgi-web-container/ "Introduction to the OSGi Web Container"). We use the Web Container inside of SpringSource dm Server, but it has been carefully designed to be usable as a standalone entity. The move to its own project at Eclipse.org will make it much easier for you to add standards-based web application deployment to your OSGi Service Platform.
-   **Gemini Blueprint Service** - this is a big deal! Those of you who have been following developments in the OSGi world will know that since we started the [Spring Dynamic Modules project](http://www.springsource.org/osgi "Spring Dynamic Modules home page") almost 4 years ago (then called Spring OSGi) it has grown into a very popular foundation for enterprise application development on the OSGi Service Platform. Through the OSGi Alliance Enterprise Expert Group, we worked to create a standard based on the Spring Dynamic Modules programming model, and this was released as part of the OSGi R4.2 Compendium Specification as the "Blueprint Service". Spring Dynamic Modules v2 is the Reference Implementation for the Blueprint Service specification. We're still working through the details, but the Spring Dynamic Modules v2 codebase will be moving to Eclipse.org as the Gemini Blueprint Service project, where it will continue to be developed alongside the other enterprise projects and will track the evolution of the Blueprint Specification in future OSGi Alliance updates.

Both of these projects will be dual-licensed under both the EPL and the Apache License.

In addition to the two reference implementations contributed by SpringSource, Oracle will be contributing the reference implementation projects for the following RFCs currently being developed by the Enterprise Expert Group:

-   RFC 98 - transactions
-   RFC 122 - database access
-   RFC 139 - JMX integration
-   RFC 142 - JNDI integration
-   RFC 143 - JPA integration
-   RFC 146 - JCA Connector integration

That's a whole lot of enterprise OSGi reference implementations gathered in one place, and of course co-located with the reference implementation for the OSGi Service Platform itself, Equinox.

The [Gemini community forum](http://www.eclipse.org/forums/index.php?t=thread&frm_id=153&S=f24c757f3b4f75d223bf59aad88061b0 "Eclipse Community Forums - Gemini Project") is now available, and there you'll find an [FAQ](http://www.eclipse.org/forums/index.php?t=msg&th=158265&start=0&S=f24c757f3b4f75d223bf59aad88061b0 "Gemini FAQ") posted by Mike Keith covering some of the most common questions you may have.