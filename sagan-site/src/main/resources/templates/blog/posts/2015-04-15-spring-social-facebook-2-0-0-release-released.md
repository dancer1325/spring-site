---
title: Spring Social Facebook 2.0.0.RELEASE Released
source: https://spring.io/blog/2015/04/15/spring-social-facebook-2-0-0-release-released
scraped: 2026-02-23T21:06:38.924Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Craig Walls |  April 15, 2015 | 9 Comments
---

# Spring Social Facebook 2.0.0.RELEASE Released

_Releases | Craig Walls |  April 15, 2015 | 9 Comments_

Dear Spring Community,

I'm happy to announce the release of [Spring Social Facebook](http://projects.spring.io/spring-social-facebook/) 2.0.0.RELEASE. This release completes the overhaul of Spring Social Facebook to target version 2.3 of Facebook's Graph API.Facebook will be turning off version 1.0 of their Graph API on April 30th, so it is highly recommended that you upgrade to Spring Social Facebook 2.0.0.RELEASE as soon as possible.

As has been mentioned in last week's release candidate and in milestone releases prior to that, Facebook's Graph API introduced several breaking changes which resulted in many breaking changes between Spring Social Facebook 1.1.x and Spring Social Facebook 2.0.0. Also, even some operations that still work do not work as they did previously. For example, it is no longer possible to fetch a list of *all* of a users's Facebook friends; you can only fetch a list of their friends who have also authorized your application with Facebook.

Moreover, although Spring Social Facebook covers much of what's available in the Graph API, the use of many of Facebook's endpoints will require review and approval from Facebook. See [Facebook's Review Guidelines](https://developers.facebook.com/docs/apps/review/) for details on what you must do to get approval from Facebook.

I'd like to thank the many members of the Spring Social community for helping test this release and for submitting bug reports and pull requests to keep it moving forward. As with any large development effort, it's possible that something was overlooked. If you see anything out of sorts, please [file an issue](https://jira.spring.io/browse/SOCIALFB) and let us know. And, as always, we welcome [pull requests](https://github.com/spring-projects/spring-social-facebook/pulls). If you see an opportunity to fix or improve Spring Social, please go for it and send us a pull request.