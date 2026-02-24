---
title: Spring for Android 1.0.0.RC1 Released
source: https://spring.io/blog/2012/03/05/spring-for-android-1-0-0-rc1-released
scraped: 2026-02-24T08:25:32.951Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Roy Clarkson |  March 05, 2012 | 0 Comments
---

# Spring for Android 1.0.0.RC1 Released

_Releases | Roy Clarkson |  March 05, 2012 | 0 Comments_

Dear Spring Community,

We are pleased to announce that the first release candidate of the [Spring for Android](http://www.springsource.org/spring-android) project is now available!

Spring for Android supports usage of the Spring Framework in a Android environment. The 1.0.0.RC1 release focuses on updating support for the latest Spring Social release in native Android applications, as well as providing enhancements to Rest Template. This includes:

-   Support for Spring Social 1.0.2.RELEASE, and Spring Security 3.1.0.RELEASE through the [Spring for Android Auth](http://static.springsource.org/spring-android/docs/1.0.x/reference/html/auth.html) module, which includes a SQLite datastore for persisting OAuth API connections.
-   Updated RestTemplate support, now at the level of Spring Framework 3.1.0.RELEASE.
-   Added support for Basic Authentication.
-   Added AssetResource for accessing static resources stored in the assets directory of an Android project.
-   Removed automatic loading of GsonHttpMessageConverter due to incompatibilities with preinstalled versions of Gson on some devices.
-   Improved gzip support in RestTemplate.
-   Now defaulting to standard J2SE facilities (HttpURLConnection) in Gingerbread and newer, as recommended by Google.
-   Disabled connection reuse on Eclair and older versions when using HttpURLConnection, because of a defect in connection pooling on those versions of Android.
-   Added several additional bug fixes and improvements.

Spring for Android is supported in Android version 2.1 (API Level 7) and higher.

To get the software, [download](http://www.springsource.com/download/community?project=Spring for Android&version=1.0.0.RC1) the release distribution, or simply add the [maven artifacts](http://static.springsource.org/spring-android/docs/1.0.x/reference/html/spring-android-maven.html) to your project. To see the features live, check out the [spring-android-showcase](https://github.com/SpringSource/spring-android-samples) (updated for 1.0.0.RC1).