---
title: Spring Framework 3.2 M2 Released
source: https://spring.io/blog/2012/09/12/spring-framework-3-2-m2-released
scraped: 2026-02-24T08:17:15.209Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Chris Beams |  September 12, 2012 | 0 Comments
---

# Spring Framework 3.2 M2 Released

_Releases | Chris Beams |  September 12, 2012 | 0 Comments_

The second milestone release toward Spring Framework 3.2 is now available from the [SpringSource repository](http://repo.springsource.org). If you're not already familiar, see our [quick tutorial](https://github.com/SpringSource/spring-framework/wiki/Downloading-Spring-artifacts#wiki-resolving-spring-artifacts) on resolving these artifacts via Maven. The complete [distribution zip](http://www.springsource.com/download/community?project=Spring%20Framework&version=3.2.0.M2) is available as usual from the SpringSource community download site.

Be sure to catch up on the [changes in 3.2 M1](http://www.springsource.org/node/3563) if you haven't already.

Highlights from 3.2 M2 include:

-   Asynchronous @Controller method support now complete ([blog post](http://blog.springsource.org/2012/05/10/spring-mvc-3-2-preview-making-a-controller-method-asynchronous/))
-   Many additional [Spring MVC improvements](https://jira.springsource.org/secure/IssueNavigator.jspa?reset=true&jqlQuery=project+%3D+SPR+AND+fixVersion+%3D+12702+AND+component+%3D+Web), including plenty of REST support, e.g. [content negotiation](https://jira.springsource.org/browse/SPR-8410#).
-   Spring TestContext [improvements](https://jira.springsource.org/secure/IssueNavigator.jspa?reset=true&jqlQuery=project+%3D+SPR+AND+fixVersion+%3D+12702+AND+component+%3D+Test)
-   Spring Expression Language (SpEL) [improvements and fixes](https://jira.springsource.org/secure/IssueNavigator.jspa?reset=true&jqlQuery=project+%3D+SPR+AND+fixVersion+%3D+12702+AND+component+%3D+%27Core%3ASpel%27)
-   Overall, [45 bugs](https://jira.springsource.org/secure/IssueNavigator.jspa?reset=true&jqlQuery=project+%3D+SPR+AND+fixVersion+%3D+12702+and+issuetype+%3D+bug) fixed, [11 new features](https://jira.springsource.org/secure/IssueNavigator.jspa?reset=true&jqlQuery=project+%3D+SPR+AND+fixVersion+%3D+12702+and+issuetype+%3D+%22New+Feature%22) and [58 improvements](https://jira.springsource.org/secure/IssueNavigator.jspa?reset=true&jqlQuery=project+%3D+SPR+AND+fixVersion+%3D+12702+and+issuetype+%3D+%22Improvement%22) implemented.

A major area of focus for 3.2 is [ensuring that Spring Framework runs flawlessly on JDK7](https://jira.springsource.org/browse/SPR-9715). M2 artifacts have been built, tested and [published against JDK7](http://repo.springsource.org/libs-milestone-local/org/springframework/spring-core/3.2.0.M2/spring-core-3.2.0.M2.jar!/META-INF/MANIFEST.MF) and we continue to test JDK6 compatibility in [nightly builds](https://build.springsource.org/browse/SPR) as well. We encourage all Spring users on JDK7 to give M2 a spin in your development and test environments and provide as much feedback as possible prior to 3.2 GA. Thanks!

Users of [@Configuration classes](http://static.springsource.org/spring-framework/docs/3.2.0.M2/api/org/springframework/context/annotation/Configuration.html) and Spring's support for subclass proxies (proxy-target-class=true), please take note: *it is now no longer necessary to add CGLIB as an explicit dependency* to work with these features. As of 3.2 M2, we have upgraded to the new CGLIB 3.0. We repackage all net.sf.cglib classes to org.springframework.cglib and inline them directly within the spring-core JAR. This means that all @Configuration and subclass proxying functionality works out of the box in M2, and means no potential for CGLIB conflicts with other projects. Likewise, we have upgraded to the new ASM 4.0, which we continue to repackage and inline as we have done for quite some time now. Note however that *we've eliminated the dedicated spring-asm jar in M2* in favor of including org.springframework.asm classes directly in spring-core. Both of these upgrades are good news for JDK7 users writing Spring components in dynamic JVM languages, as these new versions of CGLIB and ASM properly handle the new invokedynamic bytecode instruction introduced in JDK7.

Enjoy!

[Download](http://www.springsource.com/download/community?project=Spring%20Framework&version=3.2.0.M2) | [Documentation](http://static.springsource.org/spring-framework/docs/3.2.0.M2/reference) | [Javadoc API](http://static.springsource.org/spring-framework/docs/3.2.0.M2/api/) | [Change Log](http://static.springsource.org/spring-framework/docs/3.2.0.M2/changelog.txt) | [JIRA](http://jira.springframework.org/browse/SPR) | [Forum](http://forum.springsource.org/forumdisplay.php?f=21) | [Stack Overflow](http://stackoverflow.com/questions/tagged/spring)