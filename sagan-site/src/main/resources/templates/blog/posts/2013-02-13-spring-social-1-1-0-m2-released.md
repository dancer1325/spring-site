---
title: Spring Social 1.1.0.M2 Released
source: https://spring.io/blog/2013/02/13/spring-social-1-1-0-m2-released
scraped: 2026-02-24T08:09:32.573Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Craig Walls |  February 13, 2013 | 0 Comments
---

# Spring Social 1.1.0.M2 Released

_Releases | Craig Walls |  February 13, 2013 | 0 Comments_

Dear Spring Community,

We are pleased to announce the second milestone release of [Spring Social](http://www.springsource.org/spring-social) 1.1.0!

> **Spring Social is an extension of the Spring Framework that enables you to connect your Java applications to Software-as-a-Service (SaaS) providers such as Facebook and Twitter.**

Along with Spring Social 1.1.0, we are also releasing second milestones for Spring Social Facebook 1.1.0 and Spring Social Twitter 1.1.0.

The main theme of milestone 2 is tighter integration with [Spring Security](http://static.springsource.org/spring-security/site/), including a new [SocialAuthenticationFilter](http://static.springsource.org/spring-social/docs/1.1.x/api/org/springframework/social/security/SocialAuthenticationFilter.html) to achieve sign-in-with-provider capability directly within the Spring Security filter chain.

In addition to Spring Security integration, these milestone releases also include:

-   Support for non-standard parameters in the OAuth authorization flows.
-   Interceptor capability in ProviderSignInController's flow to allow for custom behavior in authentication flow.
-   Sign-in capability for Facebook Canvas applications, including a new [spring-social-canvas](https://github.com/SpringSource/spring-social-samples/tree/master/spring-social-canvas) sample to showcase the use of [CanvasSignInController](http://static.springsource.org/spring-social-facebook/docs/1.1.x/api/org/springframework/social/facebook/web/CanvasSignInController.html).
-   Support for paging in the Facebook API binding with "since" and "until" parameters.
-   Advanced search capabilities in the Twitter API binding.
-   Support for ticker symbol pseudo-entity in Twitter statuses.

These milestone releases also contain several smaller improvements and bug fixes.

To get the software, download the release distribution ([Core](http://www.springsource.org/download/community?project=Spring%2520Social&version=1.1.0.M2) | [Facebook](http://www.springsource.com/download/community?project=Spring%20Social%20Facebook&version=1.1.0.M2) | [Twitter](http://www.springsource.com/download/community?project=Spring%20Social%20Twitter&version=1.1.0.M2)).

As always, the Spring Social community has been awesome at providing feedback and contributing pull requests to make this release possible. Significant contributions in this release came from Stefan Fussenegger, who contributed much of the Spring Security integration code and Yuan Ji who provided feedback and refactoring help in that same set of code. Also, it seems that the Spring Social community has taken a keen interest in using Spring Social to build Facebook Canvas apps, which led to the creation of CanvasSignInController.

If you'd like to follow along or contribute, we encourage you to participate in the [Spring Social Forum](http://forum.springsource.org/forumdisplay.php?82-Social), [report bugs or suggest enhancements](https://jira.springsource.org/browse/SOCIAL), or to [fork the code](https://github.com/SpringSource/spring-social) and contribute back via pull requests.