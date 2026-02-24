---
title: Spring Android 1.0.0.M4 Released
source: https://spring.io/blog/2011/07/21/spring-android-1-0-0-m4-released
scraped: 2026-02-24T08:38:06.486Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Roy Clarkson |  July 21, 2011 | 0 Comments
---

# Spring Android 1.0.0.M4 Released

_Releases | Roy Clarkson |  July 21, 2011 | 0 Comments_

Dear Spring Community,

We are pleased to announce that the fourth milestone release of the [Spring Android](http://www.springsource.org/spring-android) project is now available!

Spring Android supports usage of the Spring Framework in a Android environment. The 1.0.0.M4 release focuses on updating support for the latest Spring Social release in native Android applications, as well as providing enhancements to Rest Template. This includes:

-   Support for Spring Social 1.0.0.RC1, and Spring Security 3.1.0.RC2 through the [Spring Android Auth](http://static.springsource.org/spring-android/docs/1.0.x/reference/html/auth.html) module, which includes a SQLite datastore for persisting OAuth API connections.
-   Updated RestTemplate (client) support, now at the level of Spring Framework 3.1.0.M2.
-   Added gzip compression support in RestTemplate
-   Added support for Google's Gson JSON parsing library. The Gson library is smaller than Jackson, however Jackson has faster performance.

Spring Android is supported in Android version 2.1 (API Level 7) and higher.

To get the software, [download](http://www.springsource.com/download/community?project=Spring for Android&version=1.0.0.M4) the release distribution, or simply add the [maven artifacts](http://static.springsource.org/spring-android/docs/1.0.x/reference/html/spring-android-maven.html) to your project. To see the features live, check out the [spring-android-showcase](https://github.com/SpringSource/spring-android-samples) (updated for 1.0.0.M4).

In addition to the [reference guide](http://static.springsource.org/spring-android/docs/1.0.x/reference/html), Roy Clarkson has authored two blog posts to help you get started developing Android applications:

-   [Spring Android and Maven (Part 1)](http://blog.springsource.com/2010/12/17/spring-android-and-maven-part-1/)
-   [Spring Android and Maven (Part 2)](http://blog.springsource.com/2011/02/09/spring-android-and-maven-part-2/)

If you're building native Android applications, we invite you to [collaborate](http://forum.springsource.org/forumdisplay.php?f=85) with us on the Spring Android project!