---
title: Spring Android 1.0.0.M2 Released
source: https://spring.io/blog/2011/02/09/spring-android-1-0-0-m2-released
scraped: 2026-02-24T08:47:15.266Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Roy Clarkson |  February 09, 2011 | 0 Comments
---

# Spring Android 1.0.0.M2 Released

_Releases | Roy Clarkson |  February 09, 2011 | 0 Comments_

Dear Spring Community,

We are pleased to announce that the second milestone release of the [Spring Android](http://www.springsource.org/spring-android) project is now available!

Spring Android supports usage of the Spring Framework in a Android environment. The 1.0.0.M2 release focuses on extending the use of RestTemplate in native Android applications:

-   We now use the HttpComponents HttpClient 4 by default for all REST calls, which is a native HTTP client on the Android platform. This replaces the use of the Commons HttpClient 3 from the first milestone.
-   We have added Object-to-XML marshaling support through the use of the Simple XML serialization library. Simple has a small footprint and is compatible with Android.
-   RSS and Atom Feeds are now supported through the Android Rome Feed Reader. Android Rome is a port of the popular Rome library that is compatible with Android.
-   Integration with the Jackson JSON Processor continues to provide first-class Object-to-JSON marshaling support.

Spring Android is available for [download](http://www.springsource.com/download/community?project=Spring for Android). If you are utilizing Maven with your Android project, simply add the following dependency:

<dependency>
    <groupId>org.springframework.android</groupId>
    <artifactId>spring-android-rest-template</artifactId>
    <version>1.0.0.M2</version>
</dependency>

<repository>
    <id>org.springframework.maven.milestone</id>
    <name>Spring Maven Milestone Repository</name>
    <url>http://maven.springframework.org/milestone</url>
</repository>

In addition to the [reference guide](http://static.springsource.org/spring-android/docs/1.0.x/reference/html), Roy Clarkson has authored two blog posts to help you get started developing Android applications:

-   [Spring Android and Maven (Part 1)](http://blog.springsource.com/2010/12/17/spring-android-and-maven-part-1/)
-   [Spring Android and Maven (Part 2)](http://blog.springsource.com/2011/02/09/spring-android-and-maven-part-2/)

A sample app with a README is available at github.com/SpringSource/spring-android-samples: `git clone git://github.com/SpringSource/spring-android-samples.git`

Work continues on the next Spring Android milestone, where we will we be integrating OAuth support for Android applications. If you're building native Android applications, we invite you to [collaborate](http://forum.springsource.org/forumdisplay.php?f=85) with us on the Spring Android project.