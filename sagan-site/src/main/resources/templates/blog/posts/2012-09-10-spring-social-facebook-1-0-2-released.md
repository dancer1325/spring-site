---
title: Spring Social Facebook 1.0.2 Released
source: https://spring.io/blog/2012/09/10/spring-social-facebook-1-0-2-released
scraped: 2026-02-24T08:17:24.364Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Craig Walls |  September 10, 2012 | 0 Comments
---

# Spring Social Facebook 1.0.2 Released

_Releases | Craig Walls |  September 10, 2012 | 0 Comments_

Dear Spring Community,

We are pleased to announce the release of [Spring Social Facebook](http://www.springsource.org/spring-social) 1.0.2!

This release primarily adjusts Spring Social Facebook's API binding to some recent and upcoming changes in the Facebook Graph API. Specifically:

-   The "picture" field of many objects in the Facebook's Graph API is changing from a simple string containing the URL to an object with additional information about the picture. Spring Social Facebook's API binding has been changed to handle either form and return the URL string.
-   The "likes" field of the Graph API's Comment object has been renamed to "like\_count". Spring Social Facebook's API binding has been changed to bind to the new "like\_count" field.
-   The picture property of Page, Post, and Video has been deprecated. While it will still return the URL string for a picture in 1.0.2, this property will be replaced in Spring Social Facebook 1.1.0 with one that returns an object with more complete metadata about the picture.
-   The position property of the Photo object has been deprecated, as this property will no longer be populated by the Facebook Graph API. This property will be removed in Spring Social Facebook 1.1.0.

To get the software, download the [release distribution](http://www.springsource.com/download/community?project=Spring%20Social%20Facebook&version=1.0.2.RELEASE) or simply add/update the maven artifacts to your project:

<dependency>  
    <groupId>org.springframework.social</groupId>  
    <artifactId>spring-social-facebook</artifactId>  
    <version>1.0.2.RELEASE</version>  
</dependency>

We are continuing to monitor any changes that Facebook may apply in their graph API and if an adjustment in Spring Social Facebook's API binding is required, will release followup maintenance releases with those adjustments. We are also looking ahead to the 1.1.0 release of Spring Social, Spring Social Twitter, and Spring Social Facebook with some exciting new features in the coming months. We invite you to participate in the discussion in the [Spring Social forum](http://forum.springsource.org/forumdisplay.php?82-Social), in the issue tracker ([Core](https://jira.springsource.org/browse/SOCIAL)|[Facebook](https://jira.springsource.org/browse/SOCIALFB)|[Twitter](https://jira.springsource.org/browse/SOCIALTW)), or at GitHub ([Core](https://github.com/SpringSource/spring-social)|[Facebook](https://github.com/SpringSource/spring-social-facebook)|[Twitter](https://github.com/SpringSource/spring-social-twitter)).