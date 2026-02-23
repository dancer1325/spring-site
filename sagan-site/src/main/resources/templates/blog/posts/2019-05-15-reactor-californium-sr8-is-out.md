---
title: Reactor Californium-SR8 is out
source: https://spring.io/blog/2019/05/15/reactor-californium-sr8-is-out
scraped: 2026-02-23T14:48:11.659Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Stephane Maldini |  May 15, 2019 | 0 Comments
---

# Reactor Californium-SR8 is out

_Releases | Stephane Maldini |  May 15, 2019 | 0 Comments_

The 8th Service Release for Californium is out. Beyond fixing its share of issues, it is shipping with a turbo-charged `reactor-netty` -thanks to changes backported- from our new [Dysprosium-M1 release](https://spring.io/blog/2019/05/15/reactor-dysprosium-m1-is-available-now).

The release is available on your preferred maven central repository.

Change logs and release notes:

-   [reactor-core 3.2.9.RELEASE](https://github.com/reactor/reactor-core/releases/tag/v3.2.9.RELEASE)
-   [reactor-netty 0.8.8.RELEASE](https://github.com/reactor/reactor-netty/releases/tag/v0.8.8.RELEASE)

Note that the release overrides `Californium-SR7` which has shipped with an unwelcome regression in `reactor-netty 0.8.7`.

# [](#bismuth-eol)Bismuth EOL

Anticipating the coming `Dysprosium-RELEASE`, our *reactor-core 3.1.x* and *reactor-netty 0.7.x* lines will not receive further patches. We encourage our users to update to `Californium` releases trains, which match *Spring Boot 2.1.x* and *Spring Framework 5.1.x*.

If you already are using *Spring Boot 2.2.x* and *Spring Framework 5.2.x*, you will be required to use `Dysprosium` including *reactor-core 3.3.x* and *reactor-netty 0.9.x*.

[Project Page](https://http://projectreactor.io) | [GitHub](https://github.com/reactor) | [Documentation](https://projectreactor.io/docs) | [Stack Overflow](https://stackoverflow.com/questions/tagged/project-reactor) | [Gitter](https://gitter.im/reactor/reactor)