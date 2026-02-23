---
title: This Year in Spring - 2020 Edition
source: https://spring.io/blog/2020/12/31/this-year-in-spring-2020-edition
scraped: 2026-02-23T13:36:05.810Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  December 31, 2020 | 1 Comment
---

# This Year in Spring - 2020 Edition

_Engineering | Josh Long |  December 31, 2020 | 1 Comment_

Hi, Spring fans!

You know what I did? I goofed, people. I accidentally [released *This Week in Spring*](https://spring.io/blog/2020/12/29/this-week-in-spring-december-29th-2020) on this the last week of December, the last month of the year! And I shouldn't have. I should *not* have done that. Usually, you see, I turn the final installment of *This Week in Spring* for a given year into the aptly named *This Year in Spring*, a celebration of the big tentpole themes that have defined the year (well, from my perspective, anyway). Then I include the usual *This Week in Spring* roundup inline. I forgot to do that first part, so I am publishing this as a separate post. Hey, *it's tradition*.

Ah, 2020. The year that just keeps on giving. This was the year of Tiger King. If you'd told me in 2019 that in 2020 I'd be glued to my couch watching the adventures of a Tiger trainer on Netflix, afraid of my delivery groceries, and that I'd be eager to get on a plane for the first time in ten months, I would've laughed off of my chair!

This year, 2020, started off fabulous. 2020 is the Spring team's first year (or so) back in the fold after VMware acquired Pivotal. Some of you might know that the Spring team was at VMware for a few years before we spun out in 2013 to form Pivotal. And now we're back. You'd *think* that would be disruptive, but it simply wasn't. Pivotal and VMware are cut from the same help-customers-get-to-production cloth. We hit the ground running and have continued to deliver big things and deliver often.

This excitement was most palpable in the epic [SpringOne 2020](https://springone.io/2020/speakers) (virtual) event this year, which drew around 40,000 people from all walks of life, creeds, countries, and continents. It was such sweet nectar, and I'll never forget it.

It helps that the Spring team has always been pretty geographically distributed. I, for example, have technically been a work-from-home employee since 2010. While this year was extra stressful and just plain *extra* for *plenty* of reasons, having to figure out a work-from-home routine simply wasn't one of them for a lot of us.

It's December 30th, 2020, as I write this, one year since the pandemic news started trickling into the west. I don't be mean to be *that* guy, but I've lost family from COVID-19 this year. I've got friends that spent time on a ventilator this year. I know people who've lost family and friends, too. It's been an absolute horror show for so many people worldwide. And yet, somehow, I've been privileged enough to continue writing blogs about software. That's because of you, dear community. While I have always been very grateful for you, I am especially so this year. It's a privilege to work for you.

The pandemic has spread like wildfire (some things should *not* be open source!), and it has drowned out so much other, sometimes more positive, news. In that spirit, I'd like to review some of the highlights - some tentpole themes - from the year that was 2020.

## [](#kubernetes)Kubernetes

You may have heard of [VMware Tanzu](https://tanzu.vmware.com/tanzu). You may have heard that the Spring team is part of Tanzu. Did you also know that two of the three founders of Kubernetes are also part of Tanzu? Did you know that VMware is the [third-largest contributor to Kubernetes](https://k8s.devstats.cncf.io/d/9/companies-table?orgId=1&var-period_name=Last%20decade&var-metric=contributions)? We are cuckoo for Kubernetes!

Tanzu Kubernetes Grid is our extra awesome Kubernetes distribution that works on-prem or on public infrastructure. Harbor is an enterprise-grade container registry. [Tanzu Mission Control](https://tanzu.vmware.com/mission-control) provides multi-cluster Kubernetes management across clouds. VMware is also a significant contributor to [Carvell](https://carvel.dev/), which provides a set of reliable, single-purpose, composable tools that aid in your application building, configuration, and deployment to Kubernetes. We've got [the Tanzu Build Service](https://tanzu.vmware.com/build-service), which automates container creation, management, and governance at enterprise scale. I'm sure I'm missing a zillion other things.

We've even retrofitted [Cloud Foundry](http://cloudfoundry.org), our platform-as-a-service offering, to work on top of Kubernetes. Same silky-smooth developer-centric workflow taste with whole-fat Kubernetes container orchestration.

![](https://pbs.twimg.com/media/EqhnSM7U0AAhnYO?format=jpg&name=4096x4096)

There's been a *ton* of work in recent years to make Java and Spring even more relevant in containerized cloud infrastructure like Kubernetes.

This year, Spring Boot introduced built-in support for buildpacks through the CNCF Paketo buildpacks project. Got a Spring Boot project using 2.3 or later? Try this out: `mvn spring-boot:build-image` (there's a Gradle equivalent, too), and you'll have a containerized application in about a minute. You can then `docker tag` and `docker push` that containerized application to your Kubernetes cluster of choice. Or, really, to anything that supports OCI/Docker images.

Spring Boot itself can now draw configuration from *config trees*. A config tree is the directory of configuration you get when you mount a Kubernetes `ConfigMap` as a volume in Kubernetes. It's yet another kind of configuration source, like classpath configuration (`application.properties`, `application.yaml`, etc.), environment variables, files (`file://${user.home}/config/my-config.properties`) and so on.

Spring Boot's Actuator module can expose endpoints to serve as Kubernetes liveness and readiness probes. The readiness probe tells Kubernetes whether a just-launched service is ready to be put into rotation. The liveness probe tells Kubernetes whether the service is still alive. If the service, for whatever reason, should fall sick, it'll be taken out of the rotation.

The question the application faces then is: should Kubernetes destroy the application immediately, or should it wait a configured interval to allow in-flight transactions to finish? This behavior is configurable in Kubernetes. Spring Boot supports draining off any inflight transactions and rejecting any new requests with a new feature we call graceful shutdowns.

Spring Boot and the ecosystem around it, including Spring Cloud for Kubernetes, are the best ways to build software designed for a cloud-native Kubernetes environment, and things are only improving every day. We've only really just gotten started, though, so stay tuned!

## [](#reactive-programming)Reactive Programming

Reactive programming is a programming paradigm that delivers three benefits: resource efficiency, consistency and composability of data APIs, and robustness. It delivers better resource efficiency by making it trivial to write code that does a good job of freeing up otherwise idle threads for reuse. It delivers consistency because it gives us one abstraction, one way to think disparate streams of data. Got data coming in as a Java 8 `Stream<T>`? A `Collection<T>`? A `CompletableFuture<T>`? A single value or an array? No problem. Reactive programming gives us a way to describe data flow pipelines in terms of all these APIs in a consistent fashion.

There's a slight uphill battle in learning the reactive types. Still, amortized over all the possible applications of those types across the ecosystem, I think you'll find that you will be able to *forget* a lot of other abstractions and APIs. The Spring ecosystem has (modestly) supported reactive programming since 2011, but the real leap forward came in 2017 when we introduced reactive programming support in Spring Framework 5. Since then, reactive programming has permeated every aspect of the Spring ecosystem. I don't remember the last time I've reached for something in the reactive world, only to be told that it was still under development. It certainly hasn't happened in 2020!

Everything I could want is here and generally available. Transactions, SQL data access, messaging and integration, reactive client-side load-balancing, retries, rate-limiting, API gateways, NoSQL data access, HTTP, WebSocket, RPC, metrics, distributed tracing, observability: *all* of it (and everything else I can think of) *just work*, now, out of the box. The future is non-blocking, and Spring, as it's designed today, will be right there with you at the forefront. I wrote and released a book about [this stuff](http://ReactiveSpring.io), so please believe me when I say it's extra dope. Reactive programming is a powerful way to make our services behave (and scale!) better in the cloud.

## [](#native-images-with-graalvm)Native Images with GraalVM

Native images are here to stay, and they are *awesome*. It all seemed so simple. What if we took Java's legendary just-in-time compiler (HotSpot) used it to compile the whole application, ahead of time, proactively? It seems absurdly simple. This process - of converting source into native code - is simply called *compilation* in numerous other languages. The indirection introduced by the compilation into bytecode has forced us to adopt a new term for that new straight-pass journey: *ahead-of-time-compilation* (AOT). Oooh. Ahhhh.

Simple. Except, it turns out that it's not. Because once compiled to a native image, the application doesn't have the same runtime as it would've had were it running in a JVM. Once compiled to a native image, the runtime won't be able to do some of the more dynamic party tricks that we've come to expect from the JVM. Want to load a class into a classloader? Use CGlib proxies? Do reflection on a class without *a priori* runtime awareness? Load a resource (say, a `banner.txt` file) from the class loader? All of that goes out the window in this wacky but wonderful world of GraalVM AOT compilation.

The Spring GraalVM project can help you here. It's got support for identifying all the places where a Spring application may want to do these sorts of things and provides help in registering anything you might do that needs configuration. The project is growing by leaps and bounds, and the goal is that by Spring Boot 3 and Spring Framework 6, all of this will just be built-in and working out of the box.

GraalVM returns manifold increases in startup speed and a significantly reduced memory footprint in return for all this incidental complexity. This makes GraalVM a (much) better bin-packer, especially in containerized cloud environments, where resource consumption costs. I can't wait to see what the future holds for Project Leydon, too!

## [](#rsocket)RSocket

RSocket is a binary protocol that makes message exchange between microservices a breeze. It reifies the reactive streams concepts for the network, supporting backpressure over the wire. I love RSocket. Its got new support built into Spring Framework and Spring Boot themselves, of course, and there's also Spring Security support and Spring Batch support.

RSocket is the first project we, along with Alibaba, Facebook, and Lightbend, collectively donated to the nascent Reactive Foundation. It's a better HTTP 2 or gRPC right now, and that alone should pique your curiosity, but I'm equally excited about the future. One of the most exciting prospects is the new RSocket broker on which the Soring team and others have worked. This broker could obviate some of the use cases for service registries like Netflix Eureka, message buses like RabbitMQ. The RSocket JVM client uses Reactor, which gives it superpowers: easy retries, error handling, back pressure, etc.

Organizations like Facebook and Alibaba are already using it at scale, and Spring makes it easier than ever. I can't wait to see what people build with RSocket in the weeks, months, and years to come.

## [](#java-and-kotlin)Java and Kotlin

The last thing I've been very excited about is the deep integration with the latest versions of Java and Kotlin in the latest versions of Spring. Spring Boot releases every six months, lining up nicely with the Java release cadence. Using Spring Boot with Java 15 is a *dream*. I did a video on Java 14 that looked at a ton of the new features in that release, including a ton of *preview* features. But you don't even need to look at all that. Just look at the stuff that's included out of the box in Java 15! Multiline text strings and `var` alone make life considerably more manageable. The new versions of Java are excellent, and let's not even talk about all the under-the-hood stuff from the last several generations that make Java faster, more robust, more container-friendly, more secure, etc.

I'm using one of those new-fangled Apple Silicon M1 MacBook Pros and am using the Microsoft OpenJDK port support ARM chips. It is *fast*. Most of my applications start in around 0.8 seconds! Remember, these chips were announced just a few months ago! The idea that Microsoft/Azul Systems have already got a working port of OpenJDK out there is a testament to the ecosystem's vibrancy. Java is the name of fantastic technology and an even more fantastic community, and I love Java.

Kotlin is another high point for me this year. I was made a Kotlin Google Developer Expert earlier this year, so I may be biased. Kotlin has this concept of coroutines. A coroutine in Kotlin is one language keyword that allows you to tag a particular piece of code as performing an asynchronous thing whose thread the runtime can reschedule. It's effortless. Spring builds on this mechanism, integrating reactive programming through coroutines. So, you get the best of both worlds there: easy, imperative-style programming that benefits from the non-blocking nature of reactive code. Anywhere Spring supports reactive APIs, Spring and Kotlin now support coroutines.

## [](#heres-to-the-year-ahead)Here's to the Year Ahead

My friends, I hope you're persuaded as to the opportunity that 2020 represents. I look forward to talking with you all in the year ahead. And who knows, maybe, science and logistics permitting, we'll even see each other. (Three cheers for doctors!) It's going to be a fun one, indeed. I hope you are all taking care of yourself, keeping socially distant, wearing masks, etc., and I am sure that I can speak on behalf of the entire Spring team when I wish you and yours a very *Happy New Year*!

![](https://pbs.twimg.com/media/EqhjmSKVQAIdKuJ?format=jpg&name=medium)

(You would *not* believe how hard it is to find socially distant stock photos!)