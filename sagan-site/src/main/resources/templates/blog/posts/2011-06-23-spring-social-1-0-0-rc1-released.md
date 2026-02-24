---
title: Spring Social 1.0.0.RC1 Released
source: https://spring.io/blog/2011/06/23/spring-social-1-0-0-rc1-released
scraped: 2026-02-24T08:39:35.635Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Craig Walls |  June 23, 2011 | 0 Comments
---

# Spring Social 1.0.0.RC1 Released

_Releases | Craig Walls |  June 23, 2011 | 0 Comments_

Dear Spring Community,

We are pleased to announce that the first release candidate of the [Spring Social](http://www.springframework.org/spring-social) project is now available!

**The Spring Social project allows you to connect your Java applications to Software-as-a-Service (SaaS) providers such as Facebook and Twitter.**

This release includes:

-   Additions to the Facebook API binding such as photo and video upload, Facebook page support, and Facebook search.
-   Expansion of the Twitter API binding to include mobile notifications, blocking, and geo location operations.
-   Implicit sign up support enabling automatic sign up of a user from a connection.
-   A new [quickstart](https://github.com/SpringSource/spring-social/wiki/Quick-Start) showing how to get up and running quickly.
-   Numerous bug fixes and other improvements based on user feedback (see the [changelog](http://static.springsource.org/spring-social/docs/1.0.0.RC1/changelog.txt) for details).

Also, with this release we have extracted the provider modules (Twitter, Facebook, etc) into their own projects so they can progress at a separate schedule from the main Spring Social project. Coinciding with the release of Spring Social 1.0.0.RC1, Spring Social Twitter and Facebook 1.0.0.RC1 are also now available.

To get the software, download the release distribution ([Core](http://www.springsource.com/download/community?project=Spring%20Social&version=1.0.0.RC1) | [Facebook](http://www.springsource.com/download/community?project=Spring%20Social%20Facebook&version=1.0.0.RC1) | [Twitter](http://www.springsource.com/download/community?project=Spring%20Social%20Twitter&version=1.0.0.RC1)) or simply add the [maven artifacts](http://static.springsource.org/spring-social/docs/1.0.0.RC1/reference/html/overview.html#overview-howtoget) to your project. To see it live, run through the [quickstart](https://github.com/SpringSource/spring-social/wiki/Quick-Start) and spin up the [showcase app](https://github.com/SpringSource/spring-social-samples) (recently updated for 1.0.0.RC1). Supplement as you go with information from the [reference manual](http://static.springsource.org/spring-social/docs/1.0.0.RC1/reference/html/).

Spring Social requires Spring Framework 3.0.5 or > to run. We recommend [Spring 3.1](http://blog.springsource.com/2011/06/09/spring-framework-3-1-m2-released/) for new applications to take advantage of the latest advances in the core framework. See the reference manual for a full description of dependencies.

It is awesome to see the community interest in extending Spring Social to work with numerous SaaS providers. Check out [Matt Wright](http://twitter.com/#!/mattupstate)'s work on [Instagram](https://github.com/mattupstate/spring-social-instagram) and [Foursquare](https://github.com/mattupstate/spring-social-foursquare) and [Morten Andersen-Gott](http://twitter.com/#!/mortenag)'s [Yammer extension](https://github.com/magott/spring-social-yammer/). Work on [LinkedIn](https://github.com/SpringSource/spring-social-linkedin), [Github](https://github.com/SpringSource/spring-social-github), [TripIt](https://github.com/SpringSource/spring-social-tripit), and [Gowalla](https://github.com/SpringSource/spring-social-gowalla) has also started. We're committed to working with the community to build an ecosystem of quality Spring Social extensions. If you're integrating a SaaS API into your application, consider contributing to the Spring Social project. Have a look at our [guide to extending Spring Social](http://static.springsource.org/spring-social/docs/1.0.0.RC1/reference/html/implementing.html) and discuss with the development team at our [forum](http://forum.springsource.org/forumdisplay.php?f=82).

As we push toward a GA release, we would like to hear you think of the RC1 release. Participate in the [forum](http://forum.springsource.org/forumdisplay.php?82-Social) or, if you have any suggestions or find any bugs, post them in the [issue tracker](https://jira.springsource.org/browse/SOCIAL). We hope you enjoy using Spring Social!