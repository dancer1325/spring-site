---
title: Spring Framework 4.2 RC3 released / GA on July 30
source: https://spring.io/blog/2015/07/15/spring-framework-4-2-rc3-released-ga-on-july-30
scraped: 2026-02-23T19:46:54.971Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  July 15, 2015 | 8 Comments
---

# Spring Framework 4.2 RC3 released / GA on July 30

_Releases | Juergen Hoeller |  July 15, 2015 | 8 Comments_

Dear Spring community,

Spring Framework 4.2 is not going GA today quite yet, but it's almost there: RC3 is available from [repo.spring.io](http://repo.spring.io) now, as a last release candidate before we reach [GA](https://jira.spring.io/browse/SPR/fixforversion/15244) on the 30th of July. This release includes [50 fixes and improvements](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10000&version=14954) over RC2, waiting for you to try them!

We decided to do another release candidate for several reasons: e.g. our continued wait for [Jackson](https://github.com/FasterXML/jackson) 2.6 final and [Hibernate ORM](http://hibernate.org/orm/) 5.0 final but also our recent build upgrade to [Gradle](http://gradle.org/) 2.5 and some last-minute refinements within our 4.2 web story (based on RC1/RC2 feedback).

I'm pleased to announce that this is in fact the first release of Spring which builds fine not only on JDK 8 but also on [current JDK 9 snapshots](https://jdk9.java.net/download/)! Our master build script is capable of running in both environments, so simply update your JAVA\_HOME and trigger the framework build...

**Note that Spring Framework 4.2 is runtime-compatible with Java 6, 7, 8 (including the upcoming 8u60) and early 9 (JDK 9 build 72) at this point, using the very same standard framework jars. However, for executing the framework build, you'll have to use JDK 8 or 9.**

Next stop: 4.2 GA on July 30, 2015! The countdown has started already...

Cheers, Juergen