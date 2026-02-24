---
title: Spring Social Facebook 2.0.0.M1 Released
source: https://spring.io/blog/2014/07/03/spring-social-facebook-2-0-0-m1-released
scraped: 2026-02-23T22:22:27.701Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Craig Walls |  July 03, 2014 | 7 Comments
---

# Spring Social Facebook 2.0.0.M1 Released

_Releases | Craig Walls |  July 03, 2014 | 7 Comments_

Dear Spring Community,

I'm pleased to announce the first milestone release of Spring Social Facebook 2.0.0. The primary focus of this release was to update the API binding to target version 2.0 of Facebook's Graph API.

Note that due to breaking changes in Facebook's Graph API, there were necessarily some breaking changes in this version of Spring Social Facebook. Fortunately, however, Facebook has promised a two-year stability guarantee for all versions of their API, so such breaking changes should be able to be handled more gracefully going forward.

Facebook is requiring all applications registered after April 30, 2014 to use v2.0 of the Graph API (older applications are allowed to use either v1.0 or v2.0 until April 30, 2015). Therefore, if you are building a new Facebook-enabled application with Spring Social, you'll likely want to look at this release, as there are some operations in Spring Social Facebook 1.1.x's API binding that will not work.

Although each method in the API binding was tested directly against Facebook Graph API v2.0, it's very possible that something was overlooked. I invite the Spring Social community to try out this release and provide feedback in the form of [improvement and bug issues](https://jira.spring.io/browse/SOCIALFB).