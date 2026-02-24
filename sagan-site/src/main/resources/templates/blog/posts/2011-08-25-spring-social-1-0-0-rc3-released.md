---
title: Spring Social 1.0.0.RC3 Released
source: https://spring.io/blog/2011/08/25/spring-social-1-0-0-rc3-released
scraped: 2026-02-24T08:35:58.328Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Craig Walls |  August 25, 2011 | 0 Comments
---

# Spring Social 1.0.0.RC3 Released

_Releases | Craig Walls |  August 25, 2011 | 0 Comments_

Dear Spring Community,

We are pleased to announce the 1.0.0.RC3 release of [Spring Social](http://www.springsource.org/spring-social), including the 1.0.0.RC3 releases of Spring Social Facebook and Spring Social Twitter. Spring Social lets you connect your Java applications to Software-as-a-Service (SaaS) providers such as Facebook and Twitter.

This release includes fixes for bugs reported since 1.0.0.RC2, as well as a few improvements:

-   ConnectInterceptor implementations can now add parameters to the authorization URL.
-   Twitter TimelineOperations.updateStatus() improvements:
    -   Photos can now be uploaded along with a status update.
    -   TimelineOperations.updateStatus() now returns a Tweet object for the newly posted tweet.
    -   A status can now be posted as being a reply to an existing status.
-   The set of sample applications has been updated, including two new examples: One to demonstrate a popup-based connection flow and another to demonstrate using Spring Social within a Facebook Canvas application.

See the change logs for more information on what's new in this release ([Core](http://static.springsource.org/spring-social/docs/1.0.0.RC3/changelog.txt) | [Facebook](http://static.springsource.org/spring-social-facebook/docs/1.0.0.RC3/changelog.txt) | [Twitter](http://static.springsource.org/spring-social-twitter/docs/1.0.0.RC3/changelog.txt))

To get the software, download the release distribution ([Core](http://www.springsource.com/download/community?project=Spring%20Social&version=1.0.0.RC3) | [Facebook](http://www.springsource.com/download/community?project=Spring%20Social%20Facebook&version=1.0.0.RC3) | [Twitter](http://www.springsource.com/download/community?project=Spring%20Social%20Twitter&version=1.0.0.RC3)) or simply add the [maven artifacts](http://static.springsource.org/spring-social/docs/1.0.0.RC3/reference/html/overview.html#overview-howtoget) to your project. To see it live, run through the [quickstart](https://github.com/SpringSource/spring-social/wiki/Quick-Start) and spin up the [showcase app](https://github.com/SpringSource/spring-social-samples) (updated for 1.0.0.RC3). Supplement as you go with information from the [reference manual](http://static.springsource.org/spring-social/docs/1.0.0.RC3/reference/html/).

Spring Social requires Spring Framework 3.0.5 or > to run. We recommend [Spring 3.1](http://blog.springsource.com/2011/06/09/spring-framework-3-1-m2-released/) for new applications to take advantage of the latest advances in the core framework. See the reference manual for a full description of dependencies.

We expect this to be the last release candidate for Spring Social 1.0.0 and anticipate a Spring Social 1.0.0 GA release very soon. For that reason, we urge you to try out this release candidate and give us feedback in the [forum](http://forum.springsource.org/forumdisplay.php?82-Social) or, if you have any suggestions or find any bugs, post them in the [issue tracker](https://jira.springsource.org/browse/SOCIAL).

We hope you enjoy using Spring Social!