---
title: Reactor Bismuth-SR5 is out!
source: https://spring.io/blog/2018/01/30/reactor-bismuth-sr5-is-out
scraped: 2026-02-23T16:10:14.175Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Stephane Maldini |  January 30, 2018 | 1 Comment
---

# Reactor Bismuth-SR5 is out!

_Engineering | Stephane Maldini |  January 30, 2018 | 1 Comment_

Improvements, new features, and fixes have landed in a Maven Central mirror near you under `Bismuth-SR5` [Bill Of Material](https://github.com/reactor/reactor). This version is now used by [Spring Framework 5.0.3](https://spring.io/blog/2018/01/23/spring-framework-5-0-3-and-4-3-14-available-now) and the upcoming `Spring Boot 2.0.RC1`! Our site [projectreactor.io](http://projectreactor.io) has been updated with the latest versions.

# [](#reactor-core-313)Reactor-Core 3.1.3

[release notes](https://github.com/reactor/reactor-core/releases/tag/v3.1.3.RELEASE)

A quality update including more than a dozen fixes and just a couple new features: new `Flux#delaySequence` and `Signal#getContext` access to the current flow `Context`.

`reactor-test` also welcomed new features including `Context` verification facilities and a `StepVerifier#toString` implementation.

We are now working on `3.1.4.RELEASE`. Have a look at our [issues backlog](http://github.com/reactor/reactor-core/issues).

# [](#reactor-addons-314)Reactor Addons 3.1.4

[release notes](https://github.com/reactor/reactor-addons/releases/tag/v3.1.4.RELEASE)

In this release, we improved our `Retry` and `Repeat` facilities timing handling. We are also featuring our first new advanced caching helpers for `Flux` and `Mono` . They will allow easy storage implementation choices as well as providing the expected behavior for consuming subscribers.

Below is a quick snippet using an arbitrary hash-map that demonstrates an upstream flow is only subscribed once regardless of the multiple verifications:

```
CopyMap<String, List> data = new HashMap<>();

Flux<Integer> cached = CacheFlux.lookup(data, "foo", Integer.class)
		     .onCacheMissResume(Flux.just(1, 2, 3).log());

StepVerifier.create(cached)
             .expectNext(1, 2, 3)
             .verifyComplete();
//prints 1, 2, 3

StepVerifier.create(cached)
             .expectNext(1, 2, 3)
             .verifyComplete();
//prints nothing
```

We are now working on `3.1.5.RELEASE`, and our community is invited to submit ideas for more extensions or operators. We already have another fantastic PR in progress from Oleg Dokuka about [IO extensions for Flux](https://github.com/reactor/reactor-addons/pull/141)

# [](#reactor-netty-073)Reactor Netty 0.7.3

[release notes](https://github.com/reactor/reactor-netty/releases/tag/v0.7.3.RELEASE)

A recommended update that fixes a race condition when publishing the stream body from a different thread than one of Netty's own threads. We now also support `KQueue` as an alternative to `Epoll`. Also `HttpClient` has been updated to emit an error on premature HTTP response completion.

We are now working on the `0.7.4.RELEASE` and the following `0.8.0`. Keep in mind the next major version will bring important API changes and for that reason we strongly recommend to use an adapting layer instead of exposing the `reactor-netty` API directly. Or simply use `Spring Framework` which does exactly that on both the client and server sides.

# [](#extra-stuff)Extra Stuff

Last month, we had a chance to speak at SpringOne Platform. You can view [the slides online](https://speakerdeck.com/smaldini/springoneplatform-2017-reactor-now-and-tomorrow) and watch [the video replay](https://www.youtube.com/watch?v=zls8ZLry68M).