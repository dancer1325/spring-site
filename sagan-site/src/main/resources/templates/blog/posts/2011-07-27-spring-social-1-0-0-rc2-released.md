---
title: Spring Social 1.0.0.RC2 Released
source: https://spring.io/blog/2011/07/27/spring-social-1-0-0-rc2-released
scraped: 2026-02-24T08:37:44.428Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Craig Walls |  July 27, 2011 | 0 Comments
---

# Spring Social 1.0.0.RC2 Released

_Releases | Craig Walls |  July 27, 2011 | 0 Comments_

Dear Spring Community,

We are pleased to announce the release of [Spring Social](http://www.springsource.org/spring-social) 1.0.0.RC2. Spring Social lets you connect your Java applications to Software-as-a-Service (SaaS) providers such as Facebook and Twitter.

This announcement is for the Spring Social core project as well as the Spring Social Facebook and Spring Social Twitter projects which are also seeing their 1.0.0.RC2 releases today.

This release includes fixes for bugs reported since 1.0.0.RC1, as well as a few improvements:

-   The Twitter and Facebook clients now support paging for API operations that can return paged results.
-   ProviderSignInController now handles the scenario where the user denies authorization.
-   The exceptional case where multiple local users are matched during a provider sign in attempt is now handled.
-   The set of sample applications has been updated.

See the change logs for more information on what's new in this release ([Core](http://static.springsource.org/spring-social/docs/1.0.0.RC2/changelog.txt) | [Facebook](http://static.springsource.org/spring-social-facebook/docs/1.0.0.RC2/changelog.txt) | [Twitter](http://static.springsource.org/spring-social-twitter/docs/1.0.0.RC2/changelog.txt))

To get the software, download the release distribution ([Core](http://www.springsource.com/download/community?project=Spring%20Social&version=1.0.0.RC2) | [Facebook](http://www.springsource.com/download/community?project=Spring%20Social%20Facebook&version=1.0.0.RC2) | [Twitter](http://www.springsource.com/download/community?project=Spring%20Social%20Twitter&version=1.0.0.RC2)) or simply add the [maven artifacts](http://static.springsource.org/spring-social/docs/1.0.0.RC2/reference/html/overview.html#overview-howtoget) to your project. To see it live, run through the [quickstart](https://github.com/SpringSource/spring-social/wiki/Quick-Start) and spin up the [showcase app](https://github.com/SpringSource/spring-social-samples) (updated for 1.0.0.RC2). Supplement as you go with information from the [reference manual](http://static.springsource.org/spring-social/docs/1.0.0.RC2/reference/html/).

Spring Social requires Spring Framework 3.0.5 or > to run. We recommend [Spring 3.1](http://blog.springsource.com/2011/06/09/spring-framework-3-1-m2-released/) for new applications to take advantage of the latest advances in the core framework. See the reference manual for a full description of dependencies.

Many thanks to the community for helping us shake out and resolve issues in RC1. As we move toward the GA release, we appreciate the community involvement and are eager to hear your thoughts on this RC2 release. Participate in the [forum](http://forum.springsource.org/forumdisplay.php?82-Social) or, if you have any suggestions or find any bugs, post them in the [issue tracker](https://jira.springsource.org/browse/SOCIAL).

We hope you enjoy using Spring Social!