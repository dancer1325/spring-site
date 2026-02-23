---
title: Spring HATEOAS 1.1.1.RELEASE is out!
source: https://spring.io/blog/2020/07/30/spring-hateoas-1-1-1-release-is-out
scraped: 2026-02-23T13:53:33.275Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Greg L. Turnquist |  July 30, 2020 | 1 Comment
---

# Spring HATEOAS 1.1.1.RELEASE is out!

_Releases | Greg L. Turnquist |  July 30, 2020 | 1 Comment_

Dear Spring community,

Spring HATEOAS `1.1.1.RELEASE` is out, the first patched release of the latest stable line, supporting Spring Boot 2.3.

Among many things, you’ll find:

-   We are now listing community-led efforts to implement other media types. [JSON:API](https://docs.spring.io/spring-hateoas/docs/1.1.1.RELEASE/reference/html/#mediatypes.community.json:api) and [Siren](https://docs.spring.io/spring-hateoas/docs/1.1.1.RELEASE/reference/html/#mediatypes.community.siren) are the latest. You want to add another media type? Just [check out the details](https://docs.spring.io/spring-hateoas/docs/1.1.1.RELEASE/reference/html/#mediatypes.custom).
    
-   `VndErrors` is a media type for reporting, well, errors. And it has had a sneaky bug that crept in that we’ve now patched. "logref" values are no longer confined to integers. It’s important to also note that the `VndErrors` spec is showing no signs of life, hence we’ve deprecated its support. If you’re starting a new hypermedia-driven project, our recommendation is to use [RFC-7807’s `application/problem+json` format](https://docs.spring.io/spring-hateoas/docs/1.1.1.RELEASE/reference/html/#mediatypes.http-problem) instead. The API is more elegant and more importantly, under active development. And we’ve made some fixes based on community feedback.
    
-   We are continuing to fix memory usage issues as more people crank out hypermedia links in more intense environments.
    
-   Spring HATEOS has de-lomboked the source code. This effort has been applied to the latest 1.2 and this version of 1.1 as well. (Versions predating 1.1 aren’t getting backports except in very special situations.)
    

You can enjoy these changes immediately if you are using Spring Boot 2.3 or higher. Simply adjust `spring-hateoas.version` in your build file to `1.1.1.RELEASE` and give it a spin.

Check out the [complete changelog on Github](https://github.com/spring-projects/spring-hateoas/milestone/51?closed=1).

Spring HATEOAS as a project has had a lot of new updates as it gets more usage in the field. Plato’s famous saying, "Necessity is the mother of invention" rings true as community usage increase, exposing new ways to simplify link creation and management.

Be sure to stay tuned by monitoring out [Gitter channel](https://gitter.im/spring-projects/spring-hateoas) and [following us on Twitter](https://twitter.com/springhateoas).

Cheers!