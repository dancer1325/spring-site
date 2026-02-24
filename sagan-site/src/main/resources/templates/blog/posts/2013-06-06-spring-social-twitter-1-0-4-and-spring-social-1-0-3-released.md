---
title: Spring Social Twitter 1.0.4 and Spring Social 1.0.3 Released
source: https://spring.io/blog/2013/06/06/spring-social-twitter-1-0-4-and-spring-social-1-0-3-released
scraped: 2026-02-24T08:04:23.734Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Craig Walls |  June 06, 2013 | 0 Comments
---

# Spring Social Twitter 1.0.4 and Spring Social 1.0.3 Released

_Releases | Craig Walls |  June 06, 2013 | 0 Comments_

Dear Spring Community,

I'm happy to announce the release of Spring Social Twitter 1.0.4.RELEASE and Spring Social 1.0.3.RELEASE.

Spring Social is an extension of the Spring Framework that enables you to connect your Java applications to Software-as-a-Service (SaaS) providers such as Facebook and Twitter.

Spring Social Twitter 1.0.4.RELEASE is being made available in anticipation of the retirement of Twitter API v1.0. Although Spring Social Twitter has supported the v1.1 of the Twitter API since 1.0.3.RELEASE, it required user authorization for all operations. Twitter has since started supporting application authorization (e.g., OAuth 2 Client Credentials Grant) for resources that do not strictly need user authorization (such as search). Spring Social Twitter 1.0.4.RELEASE now offers a new constructor for TwitterTemplate that accepts an application access token for accessing resources that allow application authorization.

In addition, a few minor bugs in the Twitter API binding have been addressed.

In support of the changes in Spring Social Twitter 1.0.4.RELEASE, Spring Social 1.0.3.RELEASE offers a new authenticateClient() method in OAuth2Operations to enable an application to obtain an application access token. This application token can be used to construct a TwitterTemplate through the new constructor.

To get the software, download the release distribution:

-   [Spring Social Twitter 1.0.4.RELEASE](http://www.springsource.org/download/community?project=Spring%2520Social%2520Twitter&version=1.0.4.RELEASE)
-   [Spring Social 1.0.3.RELEASE](http://www.springsource.org/download/community?project=Spring%2520Social&version=1.0.3.RELEASE)

We invite you to discuss these releases as well as the continuing work toward Spring Social 1.1.0 in the [Spring Social Forum](http://forum.springsource.org/forumdisplay.php?82-Social) and to report any bugs or improvements in issue tracking ([Core](https://jira.springsource.org/browse/SOCIAL) | [Twitter](https://jira.springsource.org/browse/SOCIALTW)).