---
title: This Year in Spring - December 28th, 2021
source: https://spring.io/blog/2021/12/28/this-year-in-spring-december-28th-2021
scraped: 2026-02-23T12:58:44.165Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  December 28, 2021 | 1 Comment
---

# This Year in Spring - December 28th, 2021

_Engineering | Josh Long |  December 28, 2021 | 1 Comment_

Hi, Spring fans! How're you doin'? I'm fresh off a fantastic holiday spent with family in Los Angeles, California. Later today, the girls and I will drive home to San Francisco, California. I've enjoyed my visits with people here in Los Angeles, especially since it's our first actual visit to Los Angeles before the pandemic.

And now, (can you believe it?), we're staring down the new year. As always, I will do my yearly *This Year in Spring* roundup, so stay tuned for that below, after our weekly roundup. So, without further ado, here's the last *This Week in Spring* recap of 2021.

-   [A Bootiful Podcast: HBase and Cassandra cofounder and Yugabyte CTO Karthik Ranganathan](https://spring.io/blog/2021/12/23/a-bootiful-podcast-hbase-and-cassandra-cofounder-and-yugabyte-cto-karthik-ranganathan)
-   [Migrating a Spring Boot application to Java 17 – the hard way: Day 2](https://blog.codecentric.de/en/2021/12/migrating-spring-boot-java-17-day-2/?hss_channel=tw-16497594)
-   [Spring Boot 2.5.8 available now](https://spring.io/blog/2021/12/21/spring-boot-2-5-8-available-now)
-   [Spring Boot 2.6.2 available now](https://spring.io/blog/2021/12/21/spring-boot-2-6-2-available-now)
-   [Spring Cloud Square 0.4.0 has been released](https://spring.io/blog/2021/12/22/spring-cloud-square-0-4-0-has-been-released)
-   [Spring Integration 5.5.7 Available](https://spring.io/blog/2021/12/21/spring-integration-5-5-7-available)
-   [Spring Native 0.11.1 available now](https://spring.io/blog/2021/12/22/spring-native-0-11-1-available-now)
-   [Spring Tips: @Controllers: Wrap Up](https://spring.io/blog/2021/12/22/spring-tips-controllers-wrap-up)
-   [Announcing Testcontainers Cloud: Integration Testing has never been easier](https://www.atomicjar.com/2021/11/announcing-testcontainers-cloud/)
-   [Blog: Kubernetes-in-Kubernetes and the WEDOS PXE bootable server farm](https://kubernetes.io/blog/2021/12/22/kubernetes-in-kubernetes-and-pxe-bootable-server-farm/)

And now, let's look at some of the most significant events of 2021, in my view.

## [](#spring-native-and-graalvm)Spring Native and GraalVM

You've probably grown weary of me talking about Spring Native, but I can't help myself: it's awesome! GraalVM is a drop-in replacement for OpenJDK that includes an extra tool called `native-image`, which you can add after installing the GraalVM distribution. The `native-image` tool is an ahead-of-time (AOT) compiler that turns your `.class` files into architecture-specific machine code. It's a native image. Which means you lose the benefits of portability. Which isn't great. But, and there is a big *but*, here: the resulting binary is self-contained, takes minimal RAM at runtime, and starts up at 10x or more the speed of the equivalent JRE-bound application. A self-contained binary is a great thing because it means you can package it into a tiny operating system footprint, ideal for distribution in a Docker image. It takes minimal RAM (or, more specifically, *RSS*), requiring very little memory at runtime. This is also ideal for distribution in a Docker image and on a container orchestrator like Kubernetes because it means that you can deploy many times more instances of the application with the same resources that would've been required to run the application on the JRE. And, finally, it starts up *fast*. Real fast. My Spring Boot applications routinely startup anywhere from 20-75ms, depending on what the application does. For example, you can imagine how useful this would be in a serverless context. There are some other benefits to using GraalVM as well. Did you know that you could use GraalVM to turn your application into a linked library? Like a `.dll`, `.dylib`, or `.so`? That means you could link other applications to the functionality offered by your Spring Boot code. Check out this most recent [*Spring Tips* (@SpringTipsLive)](https://twitter.com/SpringTipsLive) video I did [introducing Spring Native 0.11.x](https://www.youtube.com/watch?v=DVo5vmk5Cuw&t=2268s). You can get started right now by going to the [Spring Initializr (start.spring.io)](https://start.spring.io) and choosing `Spring Native`.

## [](#spring-graphql)Spring GraphQL

In 2012, Facebook tried to figure out how to walk the microservices walk when building their clients. There's a natural tension there: clients want all the related data in one fell swoop, while the services want to be separate and modular. So, how could both sides get what they wanted? They created GraphQL to provide a way to query an API and get as much or as little of the data as requested. You could build the API in terms of a graph of services, but the client needn't know that. They didn't have to care about the network calls required to resolve payload requests of a given shape. That was all hidden behind the API. Facebook open-sourced GraphQL in 2015, and that work has gone on to become quite popular in various communities, not least of all the Java community. The community needed a slick integration for Spring users, and so we - the Spring team - reached out to the GraphQL Java project to see if we could collaborate on an integration. GraphQL Java is the basis of the Spring GraphQL project. It's a lightning-fast integration for GraphQL that now powers the likes of Twitter.com. It's fast and battle-tested. Spring GraphQL builds upon that solid foundation to provide a conversational component model for Spring developers that will feel natural to developers who have used Spring's support for building MVC, REST, RSocket, and WebSocket-based controllers.

I did a [Spring Tips](https://twitter.com/springtipslive) video that [introduces Spring GraphQL here](https://www.youtube.com/watch?v=kVSYVhmvNCI&list=PLgGXSWYM2FpPw8rV0tZoMiJYSCiLhPnOc&index=11).

## [](#java-17)Java 17

This year, Oracle and the Java community released Java 17, the next long-term supported version of Java. It is *awesome*. It is also the latest long-term support release of Java, which means that if you're conservative and wish to hew to the stable, well-supported versions of Java, this is the release for you. If you want the latest and greatest, this is also the right release for you (until Java 18 arrives). I *love* Java 17. And, now that GraalVM supports Java 17, there's no reason for it not to be your main release, no matter what OpenJDK distribution you're targeting. Java 8 is an inexcusably old and irrelevant version of Java. There's no excuse to be using it today for any reason whatsoever except that perhaps you want to study the antiquities. Based on the version number, Java 17 is more than twice as good as Java 8.

Here's a list of my favorite features since Java 8.

-   `records` are a great way to describe types that are nothing more than the state in those types. These are analogous to `case` classes in Scala and `data` classes in Kotlin. They can reduce reams of boilerplate code to just a single line.
-   `var` and auto type-inference.
-   multi-line `String's (hooray! I can't believe this is finally in Java!) so you can give the tedious `String\` concatenation of yesteryear a rest.
-   sealed-types are a way to constrain the subclasses of a given type, which is particularly useful when you want to switch over all the permutations of a type hierarchy exhaustively.
-   `private` methods in interfaces. This builds upon the support for `default` methods introduced in Java 8
-   The diamond operator for anonymous inner classes. The diamond operator arrived in Java 7 but only recently started to work for anonymous inner classes.
-   Much smarter error messages. For example, you can get an intuitive error when you cause a `NullPointerException`.

The out-of-the-box OpenJDK Java 17 distribution ships with an ARM and Apple M1-compatible port that is screamingly fast. It's just a better distribution in every way. Thanks, Oracle and community!

## [](#azure-spring-cloud)Azure Spring Cloud

This platform-as-a-service offering jointly developed by the Spring team and Microsoft is growing like a weed, constantly being improved and hardened to do the work of delivering Spring Boot-applications to production as easily as can be. And 2021 was no different. This year saw the integration [of managed virtual networks and autoscale](https://spring.io/blog/2021/03/18/an-azure-spring-cloud-update-managed-virtual-network-and-autoscale-are-now-generally-available-in-azure-spring-cloud), [improved monitoring](https://spring.io/blog/2021/01/21/bootiful-application-monitoring-with-azure-spring-cloud), [easy deployments](https://spring.io/blog/2021/05/13/automate-spring-boot-application-deployments-to-azure), [Dynatrace integration](https://spring.io/blog/2021/09/01/monitor-spring-boot-applications-end-to-end-using-dynatrace-in-azure-spring-cloud), [outbound public IPs, a Visual Studio Code integration, and full APM capabilities](https://spring.io/blog/2021/01/25/what-s-new-in-azure-spring-cloud-after-ga), and so much more. There are, of course, tons [of references out there](https://spring.io/blog/2021/03/11/deploy-spring-boot-applications-by-leveraging-enterprise-best-practices-azure-spring-cloud-reference-architecture), too.

## [](#the-client-side)The Client Side

Spring provides unmatched protocols to complement client-side developers who want to talk to services, supporting things like WebSockets, [HTTP](https://spring.io/blog/2021/10/27/spring-tips-controllers-pt-1-the-c-in-model-2-mvc), [REST](https://spring.io/blog/2021/11/03/spring-tips-controllers-give-http-a-rest), [OAuth](https://spring.io/guides/tutorials/spring-boot-oauth2/), [RSocket](https://www.youtube.com/watch?v=cEjU6-WOb3Q&t=238s), and [GraphQL](https://www.youtube.com/watch?v=kVSYVhmvNCI). But the opportunities for integration are getting better by the day. For example, I loved this recent post by the good Dr. Dave Syer introducing [some of the possibilities for integation](https://spring.io/blog/2021/12/17/client-side-development-with-spring-boot-applications). In this blog, the good Dr. looks at things like Webjars, HTMX, Hotwired, and more.

## [](#buildpacks)Buildpacks

[Buildpacks](https://buildpacks.io) get better and better every day! Buildpacks are a CNCF specification that provide a way to take applications and containerize them. Don't want to write a `Dockerfile`? Me either! 90% of the time, they're repetitive and add nothing to the world except wasteful redundancies. It's not like nobody has figured out how to containerize a Java application before! So, buildpacks let you take an application artifact, be it a `.jar`, or a `.war`, or a .NET assembly or a Ruby on Rails application or a Node.js application or... whatever!... and turn it into a Docker image that you can then `docker tag` and `docker push` to the container registry of your choice. (May I recommend VMware Harbor?) Buildpacks do this using builders, of which there are a whole ecosystem's worth to choose from. [The Paketo project](https://paketo.io/) provides a ton of out-of-the-box builders. Buildpacks are fantastic in themselves, but I love that you can talk to the buildpacks API in different incarnations. Spring Boot provides out-of-the-box support for buldpacks through its Maven and Gradle plugins: `mvn spring-boot:build-image`, and you're off to the containerized races! If you don't want to set that all up for every build pipeline, consider using [KPack](https://buildpacks.io/docs/tools/kpack/), a Kubernetes operator that runs in-cluster and applies builders to artifacts whenever it perceives an update. You don't have to leak the security credentials for your cluster into your CI pipeline, and you don't have to re-build that container publication pipeline for each new module. Life is better all around! There's also a buildpack to build Spring Native-powered GraalVM images, too! Simply go to the [Spring Initializr (start.spring.io)](https://start.spring.io) and build a new project with `Spring Native` as a dependency. It'll automatically retool the buildpacks support for native images.