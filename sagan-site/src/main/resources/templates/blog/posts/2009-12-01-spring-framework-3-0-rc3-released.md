---
title: Spring Framework 3.0 RC3 released
source: https://spring.io/blog/2009/12/01/spring-framework-3-0-rc3-released
scraped: 2026-02-24T09:01:58.494Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Juergen Hoeller |  December 01, 2009 | 0 Comments
---

# Spring Framework 3.0 RC3 released

_Engineering | Juergen Hoeller |  December 01, 2009 | 0 Comments_

We decided to publish a further Spring 3.0 release candidate before going GA: Get it from the [download page](http://www.springsource.com/download), do a round of thorough testing, and let us know how it works for you. **Spring 3.0 is now waiting for your integration test feedback** and will eventually go GA in mid December.

This release candidate comes with several enhancements: e.g. **extended functionality in the new <mvc:\*> namespace**, and a further **revision of startup/shutdown behavior** (affecting message listeners and scheduled tasks). Feel free to give those features an early try! We are also keen to learn about **upgrade experiences with existing Spring 2.5 applications** since we expect many of your applications to selectively adopt 3.0 features... while keeping the majority of the code in its 2.5 shape for the time being.

**Compatibility with third-party frameworks** and libraries is an important goal as well. Most of your existing libraries should keep working without even requiring an upgrade. We are however raising the bar in terms of the required version in several cases: For example, **Spring 3.0 requires Hibernate 3.2 or above now, with explicit support for Hibernate 3.3 and also for Hibernate 3.5 beta already.** For a further example, Spring 3.0 requires Tiles 2.1 now, with no support for Tiles 2.0 anymore. We generally recommend using the latest production version of such third-party libraries but as in the case of Hibernate, we keep supporting older versions that remain commonly used.

On the occasion, since there has been confusion about this before: The Spring 3.0 codebase is entirely based on Java SE 5 (JDK 1.5) and Java 5 language features now, but at the same time, **Spring 3.0 is fully compatible with J2EE 1.4 servers as well as Java EE 5 servers and provides early support for Java EE 6 already.** In particular, you may run Spring 3.0 based applications on the likes of Tomcat 5.5 and WebSphere 6.1, with the full Spring 3.0 feature set available on those established J2EE 1.4 generation platforms (which fortunately run on JDK 1.5 underneath). You might even add a brand-new JPA 2.0 provider to that combo... Make the best of what you got.

Finally, building on Spring 3.0 and on this release candidate in particular, we got a whole series of project releases coming: for example, new major versions of **Grails, ROO, dm Server, Spring Security, Spring Batch, and Spring Integration.** Watch this space!