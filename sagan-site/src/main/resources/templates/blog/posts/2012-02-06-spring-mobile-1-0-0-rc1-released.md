---
title: Spring Mobile 1.0.0.RC1 Released
source: https://spring.io/blog/2012/02/06/spring-mobile-1-0-0-rc1-released
scraped: 2026-02-24T08:27:13.496Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Roy Clarkson |  February 06, 2012 | 0 Comments
---

# Spring Mobile 1.0.0.RC1 Released

_Releases | Roy Clarkson |  February 06, 2012 | 0 Comments_

Dear Spring Community,

We are pleased to announce that the first release candidate of the [Spring Mobile](http://www.springsource.org/spring-mobile) project is now available!

**Spring Mobile provides extensions to Spring MVC that aid in the development of cross-platform mobile web applications.** The 1.0.0.RC1 release ships a general facility for user site preference management that can be used independently or in conjunction with the mobile site switcher. See the [changelog](http://static.springsource.org/spring-mobile/docs/1.0.0.RC1/changelog.txt) and [reference manual](http://static.springsource.org/spring-mobile/docs/1.0.0.RC1/reference/html/) for all the info.

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
    &lt;version&gt;1.0.0.RC1&lt;/version&gt;
&lt;/dependency&gt;
```

Get sample apps over at [github.com/SpringSource/spring-mobile-samples](https://github.com/SpringSource/spring-mobile-samples) | `git clone git://github.com/SpringSource/spring-mobile-samples.git`

This release marks our fifth iteration with early adopters in the community using Spring Mobile in their [own applications](http://devnexus.com/). If you are building a mobile web app, we encourage you try out 1.0.0.RC1 and [collaborate](http://forum.springsource.org/forumdisplay.php?f=85) with us on the next iteration of the project.