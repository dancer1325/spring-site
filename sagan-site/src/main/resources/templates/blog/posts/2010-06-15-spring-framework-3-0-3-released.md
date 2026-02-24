---
title: Spring Framework 3.0.3 released
source: https://spring.io/blog/2010/06/15/spring-framework-3-0-3-released
scraped: 2026-02-24T08:56:49.481Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Juergen Hoeller |  June 15, 2010 | 0 Comments
---

# Spring Framework 3.0.3 released

_Engineering | Juergen Hoeller |  June 15, 2010 | 0 Comments_

After several weeks of fine-tuning and community feedback, Spring Framework 3.0.3 is now available. This release fixes more than a hundred minor issues reported against Spring 3.0.2, in particular in the JSP tag library and in Portlet session handling, as well as in ConversionService details. Once again, this release catches up with recent third-party releases: OpenJPA 2.0 final, Hibernate 3.5.2, and JBoss 6.0.0 M3, all of which are fully supported in combination with Spring 3 now.

Note that, in the meantime, all major persistence providers have released GA versions with JPA 2.0 support, even including a JPA 2.0 feature pack for WebSphere 7. This clearly suggests that JPA 2.0 is about to become mainstream... A good time to give it a try if you haven't done so already! Of course, Spring 3 is happy to work with a server-provided JPA 2.0 EntityManagerFactory (e.g. in a WebSphere environment), while also being able to bring the full power of embedded JPA 2.0 to Tomcat and standalone environments. (At the same time, Spring 3 will automatically adapt to a JPA 1.0 provider as well if that is what it encounters at runtime, e.g. on a Java EE 5 server.)

Finally, please note that we are not providing a dependencies download anymore, due to legal implications with the multitude of licenses there. The recommended way of obtaining third-party libraries for use with Spring is Maven/Ivy; you could also download third-party distributions of your choice (e.g. Hibernate 3.5.2) and take the jars from there. Note that there is no reason to upgrade third-party libraries unless you want to: The simplest solution is to keep using the versions that you know and trust.

Enjoy!