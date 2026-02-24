---
title: dm Server project moves to Eclipse.org
source: https://spring.io/blog/2010/01/12/dm-server-project-moves-to-eclipse-org
scraped: 2026-02-24T09:00:23.107Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Adrian Colyer |  January 12, 2010 | 0 Comments
---

# dm Server project moves to Eclipse.org

_Engineering | Adrian Colyer |  January 12, 2010 | 0 Comments_

Today we will be releasing version 2.0 of the dm server. This represents a major milestone for the project, and for enterprise application development with OSGi in general. I’m delighted to now be able to reveal the next step in the dm Server journey: we have submitted a proposal at Eclipse.org to continue development of the dm Server as part of the [Eclipse RT](http://www.eclipse.org/rt/) top-level project. The Eclipse nickname for the project is Virgo.

Quick links:

-   [Virgo proposal document](http://www.eclipse.org/proposals/virgo/) at Eclipse.org
-   [Virgo community forum](http://eclipse.org/forums/eclipse.virgo)

### What does this mean for users of dm Server?

The move to Eclipse.org has a number of practical implications for users of dm Server:

-   Project hosting, home pages, forums, and downloads will all be moved to Eclipse.org infrastructure
-   The license will change from the current (largely) GPL license, to the Eclipse Public License ([EPL](http://www.eclipse.org/legal/epl-v10.html))
-   It will be much easier for other organizations and community members to get involved in the ongoing development of Virgo

The combination of the license change and community hosting at Eclipse.org opens the codebase to a much broader set of users and developers.

The follow-on release of dm Server will be developed and released from Eclipse.org.

### Why is SpringSource making this change?

The dm Server represents a significant amount of intellectual property (IP) and has been in full-time development for over 2 years. Why would SpringSource move this project to Eclipse.org?

We set out with a vision to make modular application development a reality for enterprise developers. Over the last 3 – 4 years we have spoken with many end users and customers struggling with issues relating to modularity, and we know that there is a genuine need for pragmatic solutions. We frequently hear questions such as:

-   I have a large number of components managed by Spring, how can I best structure my Spring configuration to make this more manageable?
-   How can I best organize a large (where definition of “large” can vary considerably) development team to efficiently work together on larger projects?
-   How can I minimize/isolate the impact of change within a given area of my codebase?
-   How can I minimize the impact of change when deploying updates to an application in production?

*The dm Server today provides a state of the art server platform for modular enterprise application development based on OSGi* and the [Spring Dynamic Modules](http://www.springsource.org/osgi) (now standardized as the [OSGi Blueprint Service](http://blog.springsource.com/2009/10/08/drawing-spring-into-the-blueprint/)) programming model.  Enterprise OSGi, and the dm Server, have made huge advances. And yet it is fair to say that adoption of OSGi for enterprise application development does not come without a cost. Like many new technologies, an initial investment has to be made that will pay back over time.  Hal Hildebrand captured the current situation quite nicely in his recent [blog post on the OSGi Value Proposition](http://www.tensegrity.hellblazer.com/2009/10/all-we-need-to-do-is-take-these-lies-and-make-them-true-somehow.html).

There is a great deal of interest and innovation around enterprise OSGi and the dm Server.  This interest is strongest amongst early adopters, and projects with requirements that match closely the dynamically modular nature of the OSGi Service Platform. *For a mainstream development team though, who just want to build an enterprise application as quickly as possible, and with as little hassle as possible, the costs currently associated with adopting enterprise OSGi can outweigh the short-term benefits*. This situation needs to be addressed before enterprise OSGi can become the de-facto approach for *mainstream enterprise* *application* development.  Please note that I’m talking about enterprise application development here; if you’re writing infrastructure software and need to create a “stackless stack” ([Kirk Knoerschild](http://techdistrict.kirkk.com/2009/12/30/back-to-the-future/), [James Governor](http://www.redmonk.com/jgovernor/2008/02/05/osgi-and-the-rise-of-the-stackless-stack-just-in-time/)) then OSGi is already the de-facto approach, and fully supported by the dm Server and the associated dm kernel sub-project.

At SpringSource we know that open source development and community involvement can play a huge role in evolving simple, pragmatic solutions that enable a technology to bridge from early adopter to mainstream usage. We know because it is a path we have successfully taken many times. In creating the Virgo project at Eclipse.org, we seek to accelerate the journey of the dm Server and of enterprise OSGi along this path.

### Why Eclipse.org?

The dm Server builds on, and tightly integrates with, Eclipse Equinox – the reference implementation of the OSGi Service Platform. In addition, the recently proposed [Gemini project](http://blog.springsource.com/2009/11/24/gemini-project-proposal-at-eclipse-org/) at Eclipse.org will host reference implementations of many of the key enterprise OSGi specifications supported by Virgo – including the SpringSource led Gemini Web Container and Gemini Blueprint Service projects. The dm Server development tools are also all Eclipse-based. As an Eclipse RT project, Virgo will benefit from close collaboration with the OSGi community at Eclipse.org, the ability for multiple parties to contribute to it’s ongoing development, and feedback from the Eclipse user base to help shape future direction.

From the Eclipse.org perspective, the number one strategic goal for the Eclipse Foundation as listed in the recent Executive Director Report presentation to members ([](http://www.eclipse.org/membership/slides09q4.pdf)[http://www.eclipse.org/membership/slides09q4.pdf](http://www.eclipse.org/membership/slides09q4.pdf)) is to “*Establish Eclipse runtime technology as a leading open source runtime platform*.” The creation of the Virgo project at Eclipse.org is a major step towards accomplishing that goal.

### Where can I find out more?

The [Virgo proposal document](http://www.eclipse.org/proposals/virgo/) itself is the best information source for finding out the details of the contribution, how it relates to existing Eclipse.org projects, and what is happening to the associated development tools. The Virgo [community forum](http://eclipse.org/forums/eclipse.virgo) provides an opportunity for contribution and interaction.