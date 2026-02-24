---
title: Spring OSGi support gaining momentum
source: https://spring.io/blog/2006/09/07/spring-osgi-support-gaining-momentum
scraped: 2026-02-24T09:34:59.734Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Adrian Colyer |  September 07, 2006 | 0 Comments
---

# Spring OSGi support gaining momentum

_Engineering | Adrian Colyer |  September 07, 2006 | 0 Comments_

It started out as a small thing. Just a hunch of mine that Spring and OSGi should sit together very well. The idea was that by enabling Spring applications to be deployed in an OSGi runtime, we could bring better modularity, versioning, runtime deployment and update capabilities to Spring applications. It's a project I never really advertised; I just started experimenting, talking to a few people, and writing some early prototype code.

It turns out that a *lot* of people seem to be interested in Spring and OSGi. We have a collaboration ongoing with representatives from BEA, Oracle, IBM, Eclipse, the OSGi Alliance, and several others to build a shared model of how Spring support for OSGi should look, and how we can make it easy to build enterprise applications on the OSGi runtime. The most recent version of the specification is attached to [Spring JIRA issue 1802](http://opensource.atlassian.com/projects/spring/browse/SPR-1802). Here's a [direct link to the specification text](http://opensource.atlassian.com/projects/spring/secure/attachment/11934/spring_and_osgi-64.html). I ran a workshop in London a couple of weeks ago where we got several of the key players together and made some excellent progress. Peter Kriens (OSGi Technical Director) has a write-up [here](http://www.osgi.org/blog/2006/08/osgi-and-spring_29.html).

The OSGi Alliance itself is placing a big emphasis on the enterprise for the R5 release, and there's an initial [workshop on the topic](http://www.osgi.org/news_events/osgi_workshop_091106.asp) scheduled for Monday of next week (Sept. 11th). It looks like some of the Spring-OSGi work can be taken forward through the OSGi standardisation process, which is certainly something I'd be keen to see happen. If you're interested in participating in the discussion, we have a [Spring and OSGi google group](http://groups.google.com/group/spring-osgi/) that you can join. We'll have an early release of the software out that you can try as soon as possible, and the plan is to release a final version alongside or as part of Spring 2.1.

You didn't think the innovation was going to stop with Spring 2.0 did you? ;)