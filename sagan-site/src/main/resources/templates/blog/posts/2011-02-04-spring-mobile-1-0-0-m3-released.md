---
title: Spring Mobile 1.0.0.M3 Released
source: https://spring.io/blog/2011/02/04/spring-mobile-1-0-0-m3-released
scraped: 2026-02-24T08:47:34.748Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Keith Donald |  February 04, 2011 | 0 Comments
---

# Spring Mobile 1.0.0.M3 Released

_Releases | Keith Donald |  February 04, 2011 | 0 Comments_

Dear Spring Community,

We are pleased to announce that the third milestone release of the [Spring Mobile](http://www.springsource.org/spring-mobile) project is now available!

**Spring Mobile provides extensions to Spring MVC that aid in the development of cross-platform mobile web applications.** The 1.0.0.M3 release ships a general facility for user site preference management that can be used independently or in conjunction with the mobile site switcher. See the [changelog](http://static.springsource.org/spring-mobile/docs/1.0.0.M3/changelog.txt) and [reference manual](http://static.springsource.org/spring-mobile/docs/1.0.0.M3/reference/html/) for all the info.

[Download](http://www.springsource.com/download/community?project=Spring%20Mobile) the release distribution or pull the artifacts from Maven using the following:

    <repository>
        <id>org.springframework.maven.milestone</id>
        <name>Spring Maven Milestone Repository</name>
        <url>http://maven.springframework.org/milestone</url>
    </repository>

```
Copy&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.mobile&lt;/groupId&gt;
    &lt;artifactId&gt;spring-mobile-device&lt;/artifactId&gt;
    &lt;version&gt;1.0.0.M3&lt;/version&gt;
&lt;/dependency&gt;
```

Get sample apps over at [github.com/SpringSource/spring-mobile-samples](https://github.com/SpringSource/spring-mobile-samples) | `git clone git://github.com/SpringSource/spring-mobile-samples.git`

This release marks our third iteration with [early adopters](http://hillert.blogspot.com/2011/01/spring-mobile-jquery-mobile-and.html) in the community using Spring Mobile in their [own applications](http://devnexus.com/). If you are building a mobile web app, we encourage you try out 1.0.0.M3 and [collaborate](http://forum.springsource.org/forumdisplay.php?f=85) with us on the next iteration of the project.