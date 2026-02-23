---
title: Spring Social End of Life Announcement
source: https://spring.io/blog/2018/07/03/spring-social-end-of-life-announcement
scraped: 2026-02-23T15:19:50.870Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Craig Walls |  July 03, 2018 | 7 Comments
---

# Spring Social End of Life Announcement

_Engineering | Craig Walls |  July 03, 2018 | 7 Comments_

Today it is with an optimistic look to the future that I am announcing the end of life for Spring Social, a project that I have had the pleasure to work with over the past eight years.

With the release of Spring Security 5, much of the functionality offered by Spring Social’s connection framework—which I consider the most valuable piece of Spring Social—is now part of Spring Security. In fact, I shared how to use Spring Security’s new support for client-side OAuth2 in a [blog article](https://spring.io/blog/2018/03/06/using-spring-security-5-to-integrate-with-oauth-2-secured-services-such-as-facebook-and-github) from back in March. And as Spring Security continues to evolve its client-side OAuth support, Spring Social’s connection framework will continue to become more unnecessary. It simply no longer makes sense to have Spring’s OAuth story spread across so many projects—it’s time for a single cohesive OAuth story for Spring developers.

But what about Spring Social’s API bindings?

## [](#the-unwieldy-api-binding)[](#the-unwieldy-api-binding)The unwieldy API binding

This end of life announcement also covers Spring Social’s API bindings, including the API bindings for Facebook, Twitter, and LinkedIn.

Spring Social’s API bindings were originally intended to be little more than a showcase of how one might use the connection produced by the connection framework. But then they grew and took on a life of their own.

While the API bindings are generally useful for applications that need to interact with the APIs that they serve, they are rather bulky, complex, and unwieldy for practical use. To that point, the Facebook API binding offers roughly 180 distinct operations, even though it’d be rare to find an application that requires more than a half-dozen of those operations.

It has also proven difficult to keep the API bindings in sync with the APIs that they serve. As APIs (such as Facebook’s Graph API) continue to evolve, Spring Social’s API bindings need to be revisited (and in some cases completely rewritten with breaking changes) to maintain compatibility with their respective APIs. Considering the aforementioned size of the API bindings, this requires an enormous development and testing effort—for something that was originally intended as merely an example of how API bindings could be written.

Finally, now that Spring Framework 5 has unleashed a reactive programming model on Spring developers, there has been a demand for reactive counterparts to Spring Social’s API bindings. While this is certainly possible and understandably desirable, it would require an effort that is proportional to the size of the existing API bindings and that essentially duplicates most of the operations offered in the non-reactive API bindings. This would effectively double the size of the API bindings, making the maintenance of such bindings that much more challenging.

Instead, may I suggest that application developers write their own API binding implementations? In doing so, you’ll be able to work with an API binding that is more focused to the needs of your application and that is easier to maintain than the behemoth API bindings offered by Spring Social. Moreover, if you wish to apply reactive types in your API binding, you are welcome to do so. I suggested an approach to this in the article I published in March.

## [](#sunsetting-spring-social)[](#sunsetting-spring-social)Sunsetting Spring Social

Spring Social isn’t going away immediately. I intend to continue working on minor bug fixes and releasing maintenance releases as needed. But unless there is a significant and compelling requirement to do so, there are no plans for any further GA releases of Spring Social.

Spring Social (and the aforementioned Spring Social API binding modules) will continue to be supported for 12 months from today, with the support period ending on July 3, 2019.

I sincerely thank everyone who has worked with and contributed to Spring Social over the past 8 years. It has been a fun project to work on and it is with a small amount of sadness that I am announcing its eventual demise. Be assured that it wasn’t a decision made lightly. But I encourage you to check out Spring Security 5’s client-side OAuth support and continue to work with us through suggestions and pull requests to help write this new chapter in Spring’s OAuth story.