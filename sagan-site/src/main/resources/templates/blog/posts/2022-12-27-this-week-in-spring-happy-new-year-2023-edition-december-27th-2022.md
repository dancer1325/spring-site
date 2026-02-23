---
title: This Week in Spring  - Happy New Year 2023 edition - December 27th, 2022
source: https://spring.io/blog/2022/12/27/this-week-in-spring-happy-new-year-2023-edition-december-27th-2022
scraped: 2026-02-23T10:19:40.306Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  December 27, 2022 | 0 Comments
---

# This Week in Spring  - Happy New Year 2023 edition - December 27th, 2022

_Engineering | Josh Long |  December 27, 2022 | 0 Comments_

Hi, Spring fans! Welcome to another installment of *This Week in Spring*! It's 27 December as I write this and - being honest - I couldn't be happier. It's raining outside. I'm in a warm cozy office. Good music is playing. People are asleep in my home. I can hear the raindrops and wind outside the window. I'm at peace as I code. And code I have. I've been updating my blog, and a half dozen little side projects, to the new Spring Boot 3. This has given me a chance to do a little, shall we say, *Spring cleaning*, and also update my Github Actions to the latest and greatest. I'm pleasantly surprised by how many builds I've switched over to 3.0 and then used the AOT engine to build a GraalVM native image and it *just worked*!

How were or are your holidays going? My family and I had a lovely Christmas, which we don't take for granted how hard the world seems to be these days. We're all making our new years resolutions and preparing for the exciting new year ahead, too. When next we talk, it'll be 202*3*! So, let me say in advance: happy new year!! Today's the 27th, but by the 30th here in California it'll start being 2023 for some people in other parts of the world. It's crazy how fast time flies! And that's also true with roundups! I just wrote last week's, and here we are writing another! There's always a lot to cover so let's dive right into it!

-   [Spring Boot 2.7.7 available now](https://spring.io/blog/2022/12/22/spring-boot-2-7-7-available-now)
-   [Spring Boot 3.0.1 available now](https://spring.io/blog/2022/12/22/spring-boot-3-0-1-available-now)
-   [Spring Boot: Integration Tests For REST APIs with Testcontainers, WebFlux and MonogoDb](https://medium.com/@ranawaka.y/spring-boot-integration-tests-for-rest-apis-with-testcontainers-webflux-and-monogodb-a47c0edb5de9)
-   [Spring Modulith 0.2 released](https://spring.io/blog/2022/12/23/spring-modulith-0-2-released)
-   [A Bootiful Podcast: Field CTO and Chief Evangelist at Gradle Justin Reock](https://spring.io/blog/2022/12/22/a-bootiful-podcast-field-cto-and-chief-evangelist-at-gradle-justin-reock)
-   I built a [A Github Action to export your project's Java version as a variable](https://joshlong.com/jl/blogpost/github-action-export-java-version.html). Just use it from your Github Actions (Maven only, at the moment) project and it'll export the version of Java as an environment variable or as a step output, either of which you can then use in the `setup-java` Github Action.
-   [Using Micrometer to trace your Spring Boot app](https://springbootlearning.medium.com/using-micrometer-to-trace-your-spring-boot-app-1fe6ff9982ae)
-   This is an absolutely brilliant blog using Spring Integration and JDBC to [use PostgresQL as a message bus](https://www.javaadvent.com/2022/12/using-postgres-as-a-message-queue.html)
-   [What Are the New Features of Spring Boot 3?](https://medium.com/javarevisited/what-are-the-new-features-of-springboot3-6ddba9af664)
-   I also wrote down the steps I follow to build a [modern Github Actions in the world of Spring Boot 3](https://joshlong.com/jl/blogpost/a-bootiful-spring-boot-3-github-action.html), since I was doing so many upgrades and needed a standardized recipe. While this works just fine with Apache Maven, I'm starting to think it might be time for me to learn Gradle, so that I can have an easier time doing things consistently across a project. Stay tuned.
-   [Run Multiple Commands in Docker Run](https://feeds.feedblitz.com/~/722698246/0/baeldung~Run-Multiple-Commands-in-Docker-Run)
-   [The GraalVM github action is now verified! Are you using it?](https://twitter.com/fniephaus/status/1606035104525979648?s=12&t=10xxqn4LGIkv50DCH8shQg)
-   [Why Picnic picked Java. Picking a tech stack for your startup… | by Sander Mak | Dec, 2022 | Picnic Engineering](https://blog.picnic.nl/why-picnic-picked-java-e53fafe0df1b)
-   [Blog: Kubernetes 1.26: Pod Scheduling Readiness](https://kubernetes.io/blog/2022/12/26/pod-scheduling-readiness-alpha/)
-   [Blog: Kubernetes 1.26: Support for Passing Pod fsGroup to CSI Drivers At Mount Time](https://kubernetes.io/blog/2022/12/23/kubernetes-12-06-fsgroup-on-mount/)
-   [Blog: Kubernetes v1.26: CPUManager goes GA](https://kubernetes.io/blog/2022/12/27/cpumanager-ga/)
-   [Blog: Kubernetes v1.26: GA Support for Kubelet Credential Providers](https://kubernetes.io/blog/2022/12/22/kubelet-credential-providers/)