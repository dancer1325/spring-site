---
title: Spring Social 1.1.0.RC1 Released
source: https://spring.io/blog/2014/03/11/spring-social-1-1-0-rc1-released
scraped: 2026-02-24T07:38:22.660Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Craig Walls |  March 11, 2014 | 0 Comments
---

# Spring Social 1.1.0.RC1 Released

_Releases | Craig Walls |  March 11, 2014 | 0 Comments_

Dear Spring Community,

I'm happy to announce the availability of Spring Social 1.1.0.RC1 as well as Spring Social Facebook 1.1.0.RC1, and Spring Social Twitter 1.1.0.RC1. These release candidates are the first step toward a GA release coming soon. They include several improvements, bug fixes, and a few new features, including:

-   New Thymeleaf 3 and 4 dialects to match Spring Social's JSP tag library.
-   A generic connection factory for quick configuration of an API for which there is no formal connection factory support. Provides a RestOperations as the API binding.
-   Optimized use of RestTemplate in API bindings when using Spring 3.2+.
-   A new streamlined and more flexible Java configuration option.
-   SecurityConfigurerAdapter for enabling provider-based authentication with Spring Security's Java configuration.
-   A pluggable session-abstraction.
-   Support for Facebook's built-in OpenGraph actions in the API binding.
-   Capture otherwise unbound data from provider API in a Map<String, Object> in both the Facebook and Twitter API bindings.
-   Add a new TwitterTemplate constructor that only requires client credentials. It uses those to obtain a client access token.

See the change logs ([Core](https://jira.spring.io/browse/SOCIAL-423?jql=project%20%3D%20SOCIAL%20AND%20fixVersion%20%3D%201.1.0.RC1%20AND%20status%20%3D%20Resolved%20ORDER%20BY%20priority%20DESC)|[Facebook](https://jira.spring.io/browse/SOCIALFB-98?jql=project%20%3D%20SOCIALFB%20AND%20fixVersion%20%3D%201.1.0.RC1%20AND%20status%20%3D%20Resolved%20ORDER%20BY%20priority%20DESC)|[Twitter](https://jira.spring.io/browse/SOCIALTW-71?jql=project%20%3D%20SOCIALTW%20AND%20fixVersion%20%3D%201.1.0.RC1%20AND%20status%20%3D%20Resolved%20ORDER%20BY%20priority%20DESC)) for details of each project's release.

In addition, Spring Social LinkedIn 1.0.0.RC4 was released to synchronize with Spring Social 1.1.0.RC1.

We're aiming to release Spring Social 1.1.0 GA soon. If you find any issues with these 1.1.0.RC1 releases, please let us know in the issue tracker ([Core](https://jira.spring.io/browse/SOCIAL)|[Facebook](https://jira.spring.io/browse/SOCIALFB)|[Twitter](https://jira.spring.io/browse/SOCIALTW)|[LinkedIn](https://jira.spring.io/browse/SOCIALLI)) so that we can resolve them in time for the GA release.