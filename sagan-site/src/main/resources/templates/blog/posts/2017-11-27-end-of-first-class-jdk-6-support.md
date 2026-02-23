---
title: End of first-class JDK 6 support
source: https://spring.io/blog/2017/11/27/end-of-first-class-jdk-6-support
scraped: 2026-02-23T16:14:13.065Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Juergen Hoeller |  November 27, 2017 | 0 Comments
---

# End of first-class JDK 6 support

_Engineering | Juergen Hoeller |  November 27, 2017 | 0 Comments_

It is about time: The official end of of commercial JDK 6 support is coming up soon, with [Oracle](http://www.oracle.com/technetwork/java/eol-135779.html) declaring December 2018 and [IBM](https://developer.ibm.com/wasdev/docs/end-java-se-6-go/) declaring April 2018 as the end of their extended support.

From a Spring perspective, we take the opportunity to deemphasize JDK 6 support on our end. We'll keep tolerating a JDK 6 runtime in the entire Spring Framework 4.3.x line for all further maintenance releases. However, we won't make compromises for JDK 6 anymore, asking you to upgrade to JDK 7+ for fixes that we'd have to work around specifically for JDK 6 on our end.

*Even for JDK 7, we expect a recent patch release to be in use, as provided by Oracle, IBM and Red Hat within their server platforms. If available, consider a straight upgrade to JDK 8!*

With JDK 9 having arrived, our JDK support range doesn't shrink: Spring Framework 4.3.10+ effectively provides first-class support for JDK 7 and 8 and runtime tolerance for JDK 6 and 9.

As a reminder: Spring Framework 5.0 requires JDK 8+ and introduces first-class support for JDK 9, with timely tracking of the pending JDK 10 and 11 releases in the upcoming Spring Framework 5.1 and 5.2 releases next year. We strongly recommend an upgrade to Spring Framework 5.0+ for any use of JDK 9+, in particular in new project development efforts.

*On a related note, [start.spring.io](http://start.spring.io/) does not provide JDK 6 options anymore. At the same time, it features JDK 9 project options now, aligned with Spring Boot 2.0 on Spring Framework 5.0.*