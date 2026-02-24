---
title: Spring 3 on a Java EE 6 server
source: https://spring.io/blog/2010/10/20/spring-3-on-a-java-ee-6-server
scraped: 2026-02-24T08:52:25.574Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Juergen Hoeller |  October 20, 2010 | 0 Comments
---

# Spring 3 on a Java EE 6 server

_Engineering | Juergen Hoeller |  October 20, 2010 | 0 Comments_

Spring on Java EE 6 - a viable combination? Can you easily continue to use Spring when you have a Java EE 6 server to deploy to? At this year's edition of the [SpringOne conference](http://www.springone.com) which kicked off just a few hours ago, I'll once again be presenting a session on Spring and EE 6: now with a focus on GlassFish 3 as an actually available (and at this point, still the only available) EE 6 server for production environments. As a sneak preview, here are four key considerations taken from that presentation...

### 1\. A Java EE 6 server like GlassFish 3 is a fine runtime environment for Spring 3

GlassFish 3 provides a lot of out-of-the-box middleware: Servlet 3.0, JSF 2.0, JPA 2.0, as well as traditional EE services such as JTA and JMS - all ideally suited for use in Spring-based applications. GlassFish also bundles a JSR-303 validation provider, the JSR-330 API, the JSR-250 common annotations: key APIs for use with Spring 3.0 as well. With such a combination, the overlap of Spring as a framework and the server as a middleware platform is minimal: basically just the EJB and CDI component models (constituting about 5% of the GlassFish 3 codebase only) which Spring provides an alternative programming model for, while integrating with the very same platform services underneath.

### 2\. Choosing Spring is a completely natural thing to do even on a Java EE 6 server

On GlassFish 3, a lot of developers will continue to choose e.g. Wicket or GWT over JSF, Hibernate over EclipseLink, as well as Spring over EJB/CDI. Those decisions will be driven by style considerations as well as architectural requirements, and not least of it all by portability concerns. All of those frameworks have to be deployed along with the application since they are not a core part of the server, but that is hardly going to be a decisive factor. FWIW, they are even in the same ballpark in terms of "weight": Compare the size of the Hibernate 3.6 jars with those of Spring 3.0 (~4 MB).

### 3\. Are you willing to constrain your target environments to Java EE 6 servers?

Only GlassFish 3 is available as a final version today. JBoss 6 is still in milestone 5; WebSphere 8 is in early beta. Spring 3, on the other hand, runs on Tomcat 5, 6 and 7, as well as on J2EE 1.4 servers such as WebSphere 6.1, as well as on Java EE 5 servers such as WebSphere 7. And if an EE 6 server happens to be around in production, then Spring 3 is a "Good Citizen" and will be using as much EE 6 server functionality as possible. Beyond that, Spring 3 based applications can be deployed onto cloud platforms such as Google App Engine and VMforce...

### 4\. The world is evolving beyond Java EE 6 and, foreseeably, also beyond Java EE 7

See clouds, see NoSQL, see distributed caches... The Java EE 6 specs capture the state of the art in early 2009 - and so does Spring 3.0. However, since the release of EE 6, alternative trends moved to the front row. Spring 3.1/3.2 will be evolving towards that direction in the course of 2011: Brand-new programming model features will be available for immediate use on existing deployment platforms (be it e.g. Tomcat 6 or WebSphere 7, with no need to go through a server upgrade). With this inherent agility, Spring will continue to be years ahead of the slow Java EE cycle.