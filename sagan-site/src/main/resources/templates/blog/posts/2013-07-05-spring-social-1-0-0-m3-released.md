---
title: Spring Social 1.0.0.M3 Released (07/2013)
source: https://spring.io/blog/2013/07/05/spring-social-1-0-0-m3-released
scraped: 2026-02-24T08:02:37.037Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Craig Walls |  July 05, 2013 | 0 Comments
---

# Spring Social 1.0.0.M3 Released (07/2013)

_Releases | Craig Walls |  July 05, 2013 | 0 Comments_

Dear Spring Community,

I'm happy to announce the 1.1.0.M3 release of Spring Social, Spring Social Facebook, and Spring Social Twitter. At the same time, I'm also pleased to include Spring Social LinkedIn 1.0.0.RC2 along with these releases.

Spring Social is an extension of the Spring Framework that enables you to connect your Java applications to Software-as-a-Service (SaaS) providers such as Facebook and Twitter.

In these four releases, you'll find several improvements and new features, including:

-   New ReconnectFilter to automatically handle invalid/expired connections and attempt to reestablish a new connection.
-   Support for OAuth 2's 'state' parameter to prevent CSRF attacks.
-   Support for non-standard, provider-specific parameters during provider sign-in.
-   Several API updates in the API bindings for Facebook, Twitter, and LinkedIn.
-   Initial support for Twitter's streaming API.
-   Support for application-only Twitter authorization.

In addition, several bugs were fixed. See the changelog ([Core](http://static.springsource.org/spring-social/docs/1.1.x/changelog.txt)|[Facebook](http://static.springsource.org/spring-social-facebook/docs/1.1.x/changelog.txt)|[Twitter](http://static.springsource.org/spring-social-twitter/docs/1.1.x/changelog.txt)|[LinkedIn](http://static.springsource.org/spring-social-linkedin/docs/1.0.x/changelog.txt)) for details.

To get the software, download the release distribution ([Core](http://www.springsource.org/download/community?project=Spring%2520Social&version=1.1.0.M3)|[Facebook](http://www.springsource.org/download/community?project=Spring%2520Social%2520Facebook&version=1.1.0.M3)|[Twitter](http://www.springsource.org/download/community?project=Spring%2520Social%2520Twitter&version=1.1.0.M3)|[LinkedIn](http://www.springsource.org/download/community?project=Spring%2520Social%2520LinkedIn&version=1.0.0.RC2)) or change the dependencies in your build file to reference version 1.1.0.M3 (or 1.0.0.RC2 for Spring Social LinkedIn).

These releases represent a step toward a Spring Social 1.1.0 release later this year. We have planned one more milestone release of Spring Social, Spring Social Facebook, and Spring Social Twitter that will include a few more small improvements and features.

We invite you to discuss this release as well as the continuing work toward Spring Social 1.1.0 in the [Spring Social Forum](http://forum.springsource.org/forumdisplay.php?82-Social) and to report any bugs or improvements in the [Spring Social issue tracker](https://jira.springsource.org/browse/SOCIAL).