---
title: Spring Social Facebook 2.0.0.RC1 Released
source: https://spring.io/blog/2015/04/07/spring-social-facebook-2-0-0-rc1-released
scraped: 2026-02-23T21:07:51.360Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Craig Walls |  April 07, 2015 | 1 Comment
---

# Spring Social Facebook 2.0.0.RC1 Released

_Releases | Craig Walls |  April 07, 2015 | 1 Comment_

Dear Spring Community,

I'm pleased to announce the release of [Spring Social Facebook](http://projects.spring.io/spring-social-facebook/) 2.0.0.RC1. This release candidate brings Spring Social Facebook's API binding to target version 2.3 of Facebook's Graph API.

View the release notes [here](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10607&version=14864).

Be aware that due to many breaking changes in Facebook's Graph API between v1.0 and v2.0, plus additional changes up through v2.3, there are some necessary breaking changes in this version of Spring Social Facebook. Also, because of the large number of breaking changes already imposed upon Spring Social Facebook by changes in the Graph API, we decided to take this opportunity to rename a few types to be more consistent with Facebook's terminology. (For example, the FacebookProfile class is now named User to be consistent with Facebook's documentation.)

Facebook will be dropping support for Graph API v1.0 on April 30th. It is advised that you start using Spring Social Facebook 2.0.0.RC1 immediately in anticipation of Spring Social Facebook 2.0.0.RELEASE, planned for next week.

Although this release went through a very thorough testing process, including both automated and manual tests against the actual Facebook Graph API, it's very possible that something was missed. If you run into any problems, please [file a bug](http://jira.spring.io/browse/SOCIALFB) to let us know so that it can be fixed before 2.0.0.RELEASE.