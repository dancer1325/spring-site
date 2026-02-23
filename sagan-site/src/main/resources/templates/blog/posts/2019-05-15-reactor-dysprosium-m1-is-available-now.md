---
title: Reactor Dysprosium-M1 is Available Now
source: https://spring.io/blog/2019/05/15/reactor-dysprosium-m1-is-available-now
scraped: 2026-02-23T14:48:07.291Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Stephane Maldini |  May 15, 2019 | 0 Comments
---

# Reactor Dysprosium-M1 is Available Now

_Releases | Stephane Maldini |  May 15, 2019 | 0 Comments_

The 4th Generation of Reactor is arriving. On behalf of the team we want to thank all our community for the tremendous feedback. Over the last year we have grown our reactive line-up significantly including [R2DBC](https://r2dbc.io) and [BlockHound](https://github.com/reactor/BlockHound). Our adoption in the java ecosystem looks phenomenal and we are collaborating with major corps including Microsoft and Google. We have more than doubled our regular [Gitter](https://gitter.im/reactor/reactor) audience with some awesome -you guessed it- *reactive* discussions happening every day. Finally, [Sergei Egorov](https://twitter.com/bsideup) has joined the core team and we have no plans to stop expanding!

`Dysprosium-M1` is available on [our milestone repository](http://repo.spring.io/milestone/). It is paving the way for more changes in the work. It's worth noting that 2 features are being deprecated, and evaluated for removal at the end of the milestone phase :

-   `EventLoopProcessor` => `TopicProcessor`, `WorkQueueProcessor` and `WaitStrategy` : The processors have been moved to [reactor-extra](https://github.com/reactor/reactor-addons) for optional use. They require the availability of `Unsafe`, making them rather niche given modern JVM restrictions. Not only they can be found elsewhere but they can also be replaced by equivalent constructs like `EmitterProcessor` with `publishOn` and `ParallelFlux` with `runOn`.
    
-   `Kotlin` extensions are being given a [dedicated space](https://github.com/reactor/reactor-kotlin-extensions) for further experimentation. With the latest developments around `coroutines` and `inlining`, we are excited to evaluate how we can leverage Kotlin to provide a smoother developer experience. One of the goals we have set to this experiment is to provide a dedicated API that will enable writing custom producers and operators with the conciseness of Kotlin.
    

Even with these changes we do not anticipate major pains for our community, but we'd like to have your opinion.

Change logs and release notes:

-   [reactor-core 3.3.0.M1](https://github.com/reactor/reactor-core/releases/tag/v3.3.0.M1)
-   [reactor-netty 0.9.0.M1](https://github.com/reactor/reactor-netty/releases/tag/v0.9.0.M1)
-   [reactor-addons 3.3.0.M1](https://github.com/reactor/reactor-addons/releases/tag/v3.3.0.M1)
-   [BlockHound 1.0.0.M3](https://github.com/reactor/BlockHound/releases/tag/1.0.0.M3)

# [](#runtime-performances)Runtime performances

We are working hard at improving the overall experience for our users and upgrading our runtime efficiency across the board:

-   `reactor-netty 0.9.0.M1/0.8.8` has seen a 40% throughput improvement for request/reply (HTTP) scenarios and at least 20% increase for streaming scenarios. More importantly, memory management has been tightened to control some reported memory issues and the number of required `flush` operations has been dramatically reduced (3x less) which is a welcome news for CPU use.
-   For `reactor-core 3.3.0` , we are looking at progressively moving debugging interceptors outside of the critical path using an [agent based approach](https://github.com/reactor/reactor-tools).

# [](#bismuth-eol)Bismuth EOL

Anticipating the coming `Dysprosium-RELEASE`, our *reactor-core 3.1.x* and *reactor-netty 0.7.x* lines will not receive further patches. We encourage our users to update to `Californium` releases trains, which match *Spring Boot 2.1.x* and *Spring Framework 5.1.x*.

If you already are using *Spring Boot 2.2.x* and *Spring Framework 5.2.x*, you will be required to use `Dysprosium` including *reactor-core 3.3.x* and *reactor-netty 0.9.x*.

#Trivia What is `Dysprosium` ? Well its a chemical element starting with the 4th letter of the latin alphabet. It also means "*hard to get*" because it took quite a few attempts to isolate it. So, mark my words, everything should be ok with `Dysprosium`.

Again, we appreciate your valuable input, please join us on [Gitter](https://gitter.im/reactor/reactor) and share your question, story or both! Meanwhile, we are sailing towards a second milestone early June.

[Project Page](https://http://projectreactor.io) | [GitHub](https://github.com/reactor) | [Documentation](https://projectreactor.io/docs) | [Stack Overflow](https://stackoverflow.com/questions/tagged/project-reactor) | [Gitter](https://gitter.im/reactor/reactor)