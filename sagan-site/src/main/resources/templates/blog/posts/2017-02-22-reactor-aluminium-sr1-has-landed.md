---
title: Reactor Aluminium-SR1 has landed
source: https://spring.io/blog/2017/02/22/reactor-aluminium-sr1-has-landed
scraped: 2026-02-23T18:36:45.455Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Stephane Maldini |  February 22, 2017 | 1 Comment
---

# Reactor Aluminium-SR1 has landed

_Releases | Stephane Maldini |  February 22, 2017 | 1 Comment_

A batch update of releases has arrived and it is brought to you with the new `Aluminium-SR1` [Bill Of Material](https://github.com/reactor/reactor). Just in time for [Spring Framework M5](https://spring.io/blog/2017/02/23/spring-framework-5-0-m5-released) !

# [](#reactor-core-305)Reactor-Core 3.0.5

[release notes](https://github.com/reactor/reactor-core/releases/tag/v3.0.5.RELEASE)

An important quality update with new features including predicated-based windows and the `checkpoint` operator, fixes, test coverage and for the first time in 3.0.x line, a [draft reference guide](http://projectreactor.io/docs/core/release/reference/docs/index.html).

We are now working on `3.0.6.RELEASE` which is going to be our last major 3.0 content update before `3.1.0.RELEASE`. We encourage our Spring Community to just follow deprecated instructions if they hit any of the `@Deprecated` API, thus simply preparing for a quick, painless, upgrade when time comes. Have a look at our [issues backlog](http://github.com/reactor/reactor-core/issues) for a more detailed scope.

# [](#reactor-addons-305)Reactor Addons 3.0.5

[release notes](https://github.com/reactor/reactor-addons/releases/tag/v3.0.5.RELEASE)

Improvements have been made to `reactor-test` to support dropped data/exception testing via post verification assertions. Addons being tightly coupled to reactor-core, we always synchronize with its releases and scope isolated stories in between.

We are now working on `3.0.6.RELEASE`. We will include at least one new add-on (*reactor-math*) and continue polishing test support. Additional on-going research is also spent on having a public operator TCK that would offer contributors or other library developers a sane way to stress their implementation in the face of many sequencing/optimization scenarios.

# [](#reactor-netty-061)Reactor Netty 0.6.1

[release notes](https://github.com/reactor/reactor-netty/releases/tag/v0.6.1.RELEASE)

A recommended update that fixes most of the issues faced since the introduction of *client connection pooling* mode in `0.6.0.RELEASE` which is enabled by default . New features include `NettyContext` pipeline operators and proxy support in connection pools.

We are now working on `0.6.2.RELEASE`. Numerous improvements are planned in the SPI and a focus on quality will certainly bring its lot of fixes as well. Our goal is to cover and review use cases given the continuous feedbacks we receive for instance from the [Cloud Foundry Java Client](https://github.com/cloudfoundry/cf-java-client) and [Spring Framework](https://github.com/spring-projects/spring-framework) teams.

# [](#site-updates)Site updates

prod: [http://projectreactor.io](http://projectreactor.io) snapshot: [http://next.projectreactor.io](http://next.projectreactor.io)

In the past weeks we faced several documentation hosting issues and we envision to migrate documentation content to a more dedicated host. Still the site has welcome some fixes and polishes including a new [learn](http://projectreactor.io/learn) section and a [new project list](http://projectreactor.io/docs) styling that works on mobile. It also exposes the new [Reactor Core guide](http://projectreactor.io/docs/core/release/reference/docs/index.html). Many thanks to [Damien Vitrac](https://twitter.com/oodamien) for the style contributions !