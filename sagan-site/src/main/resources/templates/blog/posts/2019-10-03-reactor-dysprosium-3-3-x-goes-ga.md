---
title: Reactor Dysprosium (3.3.x) goes GA
source: https://spring.io/blog/2019/10/03/reactor-dysprosium-3-3-x-goes-ga
scraped: 2026-02-23T14:34:29.672Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Stephane Maldini |  October 03, 2019 | 0 Comments
---

# Reactor Dysprosium (3.3.x) goes GA

_Engineering | Stephane Maldini |  October 03, 2019 | 0 Comments_

Hello Reactor community,

On behalf of the Reactor team and its heroic new contributors, I am delighted to announce that Reactor Dysprosium can now be found on your preferred Maven repositories, like [this one](https://repo.spring.io).

It is the fourth release train since Reactor Core 3.x and it includes `Reactor Core 3.3`, `Reactor Netty 0.9` and a newcomer, `Reactor Pool 0.1`. Check out the major change logs and release notes:

-   [reactor-core 3.3.0.RELEASE](https://github.com/reactor/reactor-core/releases/tag/v3.3.0.RELEASE)
-   [reactor-netty 0.9.0.RELEASE](https://github.com/reactor/reactor-netty/releases/tag/v0.9.0.RELEASE)
-   [reactor-pool 0.1.0.RELEASE](https://github.com/reactor/reactor-pool/releases/tag/v0.1.0.RELEASE)

Reactor Dysprosium modules still require JDK 8 or higher. They come with many performance improvements and we even have identified more areas to focus on the next patches and major releases. Please join me in giving a warm welcome to a new module to the family, Reactor Pool. It is the generic embeddable reactive object pool you were waiting for. It is used by Reactor Netty and we plan to build more features on top of it. As with Reactor Netty, we haven't qualified a major "1.x" release as we expect tweaks before considering it API stable.

Be sure to try out the new Metrics support and [documentation](https://projectreactor.io/docs/netty/release/reference/index.html) that have been introduced to Reactor Netty.

Alongside the release train we also introduce `Blockhound`, [check its first 1.0.0.RELEASE](https://github.com/reactor/BlockHound/releases/tag/1.0.0.RELEASE). It's a small util aimed at finding out if you are throwing a blocking wrench in your nice non blocking flow, whether it's Reactor or any other non blocking library.

Finally, we have ended support for Bismuth with the release of `Dysprosium`. We encourage our users to update to the latest and greatest. We are still supporting `Californium` release train, which matches *Spring Boot 2.1.x* and *Spring Framework 5.1.x*.

See you at [SpringOne in Austin](https://springoneplatform.io) for those of you coming by.

Stephane

[Project Page](https://http://projectreactor.io) | [GitHub](https://github.com/reactor) | [Documentation](https://projectreactor.io/docs) | [Stack Overflow](https://stackoverflow.com/questions/tagged/project-reactor) | [Gitter](https://gitter.im/reactor/reactor)