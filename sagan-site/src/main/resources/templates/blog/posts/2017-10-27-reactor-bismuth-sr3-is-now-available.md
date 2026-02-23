---
title: Reactor Bismuth-SR3 is now available
source: https://spring.io/blog/2017/10/27/reactor-bismuth-sr3-is-now-available
scraped: 2026-02-23T16:17:32.708Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Stephane Maldini |  October 27, 2017 | 0 Comments
---

# Reactor Bismuth-SR3 is now available

_Releases | Stephane Maldini |  October 27, 2017 | 0 Comments_

A shipment of fixes and goodies has arrived and it is brought to you by the new `Bismuth-SR3` [Bill Of Material](https://github.com/reactor/reactor). This version is now used by [Spring Framework 5.0.1](https://spring.io/blog/2017/10/24/spring-framework-5-0-1-available-now) ! Our site [projectreactor.io](http://projectreactor.io) reflects those latest updates.

# [](#reactor-core-311)Reactor-Core 3.1.1

[release notes](https://github.com/reactor/reactor-core/releases/tag/v3.1.1.RELEASE)

A quality update including more than 20 fixes and just a couple new features: Kotlin extensions for Reactor conversion from `Publisher` and the `Flux#limitRequest` operator alternative to `Flux#take` with an explicit upper limit to the produced demand.

We are now working on `3.1.2.RELEASE`. Have a look at our [issues backlog](http://github.com/reactor/reactor-core/issues) for a more detailed scope.

# [](#reactor-addons-312)Reactor Addons 3.1.2

[release notes](https://github.com/reactor/reactor-addons/releases/tag/v3.1.2.RELEASE)

We now have official `Kotlin` extensions for some of our extra operators and we will continue adding some in the future. This version highlight is the addition of [Retry](https://github.com/reactor/reactor-addons/blob/v3.1.2.RELEASE/reactor-extra/src/main/kotlin/reactor/retry/RetryExtensions.kt), [Repeat](https://github.com/reactor/reactor-addons/blob/master/reactor-extra/src/main/kotlin/reactor/retry/RepeatExtensions.kt) and [Mathematic extensions](https://github.com/reactor/reactor-addons/blob/master/reactor-extra/src/main/kotlin/reactor/math/MathFluxExtensions.kt). We are quite excited by the possibilities offered with the kotlin extensions and we encourage our kotlin users to try `reactor-extra` !

Take a glimpse at some of those convenient extensions :

```
Copydata class User(val age: Int,val name: String)

val userList = listOf(User(18, "bob"),  User(80, "grandpa"), User(1, "baby"))

users.toFlux()
     .retryExponentialBackoff(4, Duration.ofMillis(100))
     .max { a, b -> b.age - a.age }
     .map { it.name }
     .test()
     .expectNext("baby")
     .verifyComplete()
```

We are now working on `3.1.3.RELEASE`, and our community is invited to submit ideas for more extensions or operators. We already see a certain interest into traceability, circuit breaker and routing and will evaluate how to scope those features in the coming weeks.

# [](#reactor-netty-071)Reactor Netty 0.7.1

[release notes](https://github.com/reactor/reactor-netty/releases/tag/v0.7.1.RELEASE)

A recommended update that fixes lifecycle issues that could stall our connection pool in specific situations. Also our `HttpServer` now correctly deals with HEAD request and matching response content-length. We [identified and fixed a regression in Netty SSL handling](https://github.com/netty/netty/pull/7309), it affects versions ranging from 4.1.14 to 4.1.16. Please monitor the next 4.1.17 Netty version if your application depends on stream large payloads over SSL.

We are now working on `0.7.2.RELEASE` and the following `0.8.0`. We still have on-going investigations and we are processing a wave of new feedbacks thanks to the final Spring Framework release popularity. `0.8` aims to build on this maturity and delivers a major API quality improvement.

# [](#what-happened-to-sr1-and--sr2)What happened to SR1 and SR2?!

Unfortunately we suffered twice from a POM generation issue, while these versions exist in Maven Central, they both present a defect with the definition for `reactor-extra`. Please refrain from using the `Bismuth-SR1` and `Bismuth-SR2` BOMs as well as `reactor-extra:3.1.1.RELEASE`. Fingers crossed the next version should be `Bismuth-SR4` prior to Spring Framework `5.0.2`.

# [](#see-you-soon-)See you soon ?

If you are interested in all the new bits and our next plans, the full team will be at [Spring One Platform](https://springoneplatform.io) and a [dedicated session is planned](https://springoneplatform.io/sessions/project-reactor-now-and-tomorrow). In addition, Reactive programming with Reactor will be covered by most of the Spring tracks !