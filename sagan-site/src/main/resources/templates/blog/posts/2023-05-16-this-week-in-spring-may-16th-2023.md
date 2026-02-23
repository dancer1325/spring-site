---
title: This Week in Spring - May 16th 2023
source: https://spring.io/blog/2023/05/16/this-week-in-spring-may-16th-2023
scraped: 2026-02-23T09:50:25.731Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  May 16, 2023 | 1 Comment
---

# This Week in Spring - May 16th 2023

_Engineering | Josh Long |  May 16, 2023 | 1 Comment_

My friends, [Spring Boot 3.1 is nearly upon us](https://calendar.spring.io)! It drops on 18 May, in just a few short days! There are a ton of amazing features in this new release and I hope you're already trying it out ([you know where](https://start.spring.io)). Here are some of my favorite features:

-   **Built in Docker Compose support** - Have a `docker-compose.yml` in your project root? Add `spring-boot-docker-compose` as `developmentOnly` scope in Gradle or `optinal` in Maven and Spring Boot will automatically run it for you on startup and shut it down on application shutdown. [Here's an example](https://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/htmlsingle/#features.docker-compose)
-   **Built in Testcontainers support** - You know Spring Boot has first class support for Testcontainers in our unit testing framework. Perhaps you've used the `@DynamicPropertySource` mechanism to configure the environment based on Testcontainer containers? - but this new release makes things even better. Define a test-code only `main(String [])` method and then forward it to your production code `main(String [] args)` methods. You can point that test-code only main class to new `@Configuration` classes, which may in turn have Testcontainer connections defined. Run that test-code only `main` method and Spring Boot will start that Testcontainer for you during development. You can use Devtools to fast reload code changes. You can use Devtools' `@RestartScope` to keep the container open across reloads, too! Now you've got the ultimate in `git clone` and run-able code! Here's [an example](https://github.com/spring-tips/development-containers-with-docker-compose-and-testcontainers/blob/main/src/test/java/com/example/demo/TestDemoApplication.java).
-   **Unified SSL support across the framework** - Spring Boot supports SSL in all the various configured integrations where it is available, but the support for SSL was inconsistent. In the new version of Spring Boot 3.1, there is a new type called `SslBundle` that describes the common keys and certificates in a unified way that you can then plugin to various HTTP servers, clients, data access technologies, etc. Here are the docs where [you can learn even more](https://t.co/D1ttvQyFgp)

Alright, friends, we've got a lot to look at this week so let's dive right into it!

-   [Spring Data 2023.0 goes GA](https://spring.io/blog/2023/05/12/spring-data-2023-0-goes-ga)
-   [Spring Data Service Release 2022.0.6 & 2021.2.12 released](https://spring.io/blog/2023/05/12/spring-data-service-release-2022-0-6-and-2021-2-12-released)
-   [Spring LDAP 3.1.0 released](https://spring.io/blog/2023/05/15/spring-ldap-3-1-0-released)
-   [A Bootiful Podcast: James Ward, Kotlin Product Manager at Google](https://spring.io/blog/2023/05/11/a-bootiful-podcast-james-ward-kotlin-product-manager-at-google)
-   [RabbitMQ Is Boring, and I Love It](https://thenewstack.io/rabbitmq-is-boring-and-i-love-it/)
-   [the Spring Cloud AWS 3.0.1 release is out and it's packed with amazing stuff](https://github.com/awspring/spring-cloud-aws/releases/tag/v3.0.1)
-   This is a reasoned and well thought out article over on Baeldung that, while not strictly related to Spring, is worth a read: [should we create an interface for only one implementation?](https://feeds.feedblitz.com/~/740696312/0/baeldung~Should-We-Create-an-Interface-for-Only-One-Implementation)
-   Spring Cloud lead Spencer Gibb in with some cool news: [If you've wanted to use Spring Cloud Gateway, but are unable to use webflux, watch this pull request for an MVC/Servlet compatible gateway. It's one of the highest voted enhancement requests!](https://twitter.com/spencerbgibb/status/1656125739865972739?s=12&t=n-UflcIbnx1lage-TBk0Cg)