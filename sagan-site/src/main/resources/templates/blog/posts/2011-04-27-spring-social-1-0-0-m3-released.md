---
title: Spring Social 1.0.0.M3 Released
source: https://spring.io/blog/2011/04/27/spring-social-1-0-0-m3-released
scraped: 2026-02-24T08:42:13.556Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Craig Walls |  April 27, 2011 | 0 Comments
---

# Spring Social 1.0.0.M3 Released

_Releases | Craig Walls |  April 27, 2011 | 0 Comments_

Dear Spring Community,

We are pleased to announce that the third milestone release of the [Spring Social](http://www.springframework.org/spring-social) project is now available!

The Spring Social project allows you to integrate APIs exposed by Software-as-a-Service (SaaS) providers such as Facebook and Twitter into your applications.

This is a big release for us. Some of the most exciting highlights of the 1.0.0.M3 release include:

-   One of the most complete [Java bindings to Facebook's Graph API](http://static.springsource.org/spring-social/docs/1.0.0.M3/api/org/springframework/social/facebook/api/FacebookApi.html) available, including operations for working with users, friends, feeds, user interests and likes, events, invitations, albums, photos, videos, groups, and checkins with Facebook Places.
-   A greatly expanded [Java binding to Twitter's REST API](http://static.springsource.org/spring-social/docs/1.0.0.M3/api/org/springframework/social/twitter/api/TwitterApi.html), including operations for working with timelines, users, saved searches, trends, lists, favorites, direct messages, friends, and followers.
-   A new [provider signin controller](http://static.springsource.org/spring-social/docs/1.0.0.M3/reference/html/signin.html) enabling a user to sign into an application using his or her SaaS provider account such as a Facebook or Twitter account.
-   Enhanced extensibility, which includes a walkthrough of how to extend Spring Social to [add support for new service providers](http://static.springsource.org/spring-social/docs/1.0.0.M3/reference/html/implementing.html).

Of particular note, many of the enhancements in this release were driven by community feedback. It's great to see folks already extending Spring Social to work with new SaaS providers. For instance, [Matt Wright](http://twitter.com/#!/mattupstate) has been working on a [Java binding](https://github.com/mattupstate/spring-social) to the [Instagram API](http://instagram.com).

We're committed to working with the community to create an ecosystem of quality API bindings. If you're integrating a SaaS API into your application, consider contributing your API binding to the Spring Social project. Have a look at our [guide to extending Spring Social](http://static.springsource.org/spring-social/docs/1.0.0.M3/reference/html/implementing.html) and discuss with the development team at our [forum](http://forum.springsource.org/forumdisplay.php?f=82).

See the [changelog](http://static.springsource.org/spring-social/docs/1.0.0.M3/changelog.txt) and [reference guide](http://static.springsource.org/spring-social/docs/1.0.0.M3/reference/html/) for more information on this release.

To get the software, [download](http://www.springsource.com/download/community?project=Spring%20Social&version=1.0.0.M3) the release distribution, or simply add the [maven artifacts](http://static.springsource.org/spring-social/docs/1.0.0.M3/reference/html/overview.html#overview-howtoget) to your project. To see the features live, check out the [showcase app](https://github.com/SpringSource/spring-social-samples) (updated for 1.0.0.M3):  
`git clone git://github.com/SpringSource/spring-social-samples.git`