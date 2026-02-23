---
title: This Week in Spring - June 6th, 2023
source: https://spring.io/blog/2023/06/06/this-week-in-spring-june-6th-2023
scraped: 2026-02-23T09:46:40.122Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  June 06, 2023 | 1 Comment
---

# This Week in Spring - June 6th, 2023

_Engineering | Josh Long |  June 06, 2023 | 1 Comment_

Hi, Spring fans! Welcome to another installment of *This Week in Spring*! And what an insane week it's been! Long story short, I've spent 10-12 hours a day over the last five days migrating a dozen differnet applications and services from one GKE cluster to another, taking the time to update things as much as possible. In the case of at least one Vue.js application, this meant some major reworking of the codebase. It's also meant rewriting lots of Github Actions with the new best-practices and patterns, which I confess has been painful.

Once everything's fully migrated (soon, I hope!), I think a next step will be to see what I can do to simplify things in a consistent way across all the services. This means:

-   building a new Kubernetes CRD and controller to encapsulate the YAML I find myself repeating across all my services. It's tedious and error-prone and could be boiled down to a few lines in one YAML file for 90% of my workloads!
-   building a new Github Action that does a lot of the Kubernetes connectivity so I don't have to copy-and-paste the same four error-prone actions across each Github Actions workflow.
-   Moving everything to Gradle and packaging up things - like my version management and common required dependencies - in a shared plugin which in turn furnishes required plugins, dependencies, and delegates to Spring Boot 3.1 and the like. 3.1's a great place to be for these applications already, it'd just be nice to know that when it comes time to move to 3.2, or whatever, I can make the change in one place and everywhere else benefits.
-   As part of the work, I've decided I wanted to start eliminating some of the crufty, bespoke authentication mechanisms in my various web applications. I've stood up an instance of the Spring Authorization Server. (Hurray!) By the way, if you want to see *the* easiest and coolest demo of how to get an OAuth client, an OAuth resource server, an OAuth Authorization Server, all from scratch on start.spring.io, do check [out this video that Steve Reisenberg](https://www.youtube.com/watch?v=7zm3mxaAFWk) and I put together recently! It's insane how easy it is to get everything working, and the actual [production code](https://github.com/developer-advocacy/joshlong-authorization-api) I'm going to take to my production environment is only slightly more complex)

Anyway, all of that is temporarily on hold as I am in Dallas, Texas at the moment meeting some customers and enjoying the warm weather. But we do have a *ton* of stuff to look at this week, and I've got a customer to visit, so let's get this underway!

-   [A Bootiful Podcast: Spring Boot team member Moritz Halbritter (@m\_halbritter)](https://spring.io/blog/2023/06/02/a-bootiful-podcast-spring-boot-team-member-moritz-halbritter-m_halbritter)
-   [Spring Boot Properties Prefix Must Be in Canonical Form](https://feeds.feedblitz.com/~/743713742/0/baeldung~Spring-Boot-Properties-Prefix-Must-Be-in-Canonical-Form)
-   [Dimas Adriyanto Setyawan has a nice blog looking at the new Docker Compose support in Spring Boot 3.1](https://medium.com/@dimas.setyawan/spring-boot-3-1-%EF%B8%8F-docker-compose-28a6a53af657)
-   Jetbrains [Getting Started with Spring Boot and Kotlin](https://kotlinlang.org/docs/jvm-get-started-spring-boot.html) page has been nicely updated
-   With a title like this, how could you *not* read?? [How to use ChatGPT/OpenAI APIs from Oracle Backend for Spring Boot/Parse.](https://medium.com/@corradodebari/how-to-use-chatgpt-openai-apis-from-oracle-backend-for-spring-boot-parse-5fcc0ffa4bcd)
-   [The Difference Between findById and getById in Spring Data](https://feeds.feedblitz.com/~/743612807/0/baeldung~The-Difference-Between-findById-and-getById-in-Spring-Data)
-   I'll [be speaking in Sydney, Australia](https://connect.tanzu.vmware.com/Bootiful_Spring_Boot_3x_au.html) . Come out and join me?
-   I'll be [speaking in Taipei](https://webcommwebinar.kktix.cc/events/0616). Come out and join me?
-   [Thomas Schuehly just released v0.5.4 of Spring ViewComponent](https://twitter.com/tschuehly/status/1665810099812683778?s=12&t=n-UflcIbnx1lage-TBk0Cg)
-   I love this: a deep-ish \[review of some of the various Spring `ApplicationEvent`s\](Spring Boot’s Application Events): nice job, Truong Bui!
-   Interesting: [how to locally test GCP Firestore and Spring](https://medium.com/@claudiorauso/local-testing-spring-gcp-firestore-57f2ffc49c1e)