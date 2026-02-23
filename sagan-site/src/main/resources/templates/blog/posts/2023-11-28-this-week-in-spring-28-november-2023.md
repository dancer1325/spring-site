---
title: This Week in Spring - 28 November, 2023
source: https://spring.io/blog/2023/11/28/this-week-in-spring-28-november-2023
scraped: 2026-02-23T09:04:56.310Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  November 28, 2023 | 0 Comments
---

# This Week in Spring - 28 November, 2023

_Engineering | Josh Long |  November 28, 2023 | 0 Comments_

Hi, Spring fans! I hope everyone who celebrated Thanksgiving had a wonderful time. Did you indulge in too much turkey? Anyway, let's jump into this week's edition of This Week in Spring—a particularly special one for a couple of reasons. First, it's our first issue after the launch of Spring Boot 3.2 last Thursday. Second, it's my inaugural post as a member of the Broadcom family. Exciting times!

Spring Boot 3.2: A Game Changer

Spring Boot 3.2 is nothing short of revolutionary. I've delved into its myriad features in an in-depth video, which you can watch here. This release includes:

-   reactive cache/scheduled abstraction
-   virtual threads (project Loom)
-   CRaC
-   improved GraalVM native image support
-   Spring for Apache Pulsar support
-   the new Spring Framework 6.1 `RestClient` and `JdbcClient`
-   reloadable SSL
-   Java 21
-   observability
-   `spring.main.keep-alive=true`
-   Docker for Neo4J, ActiveMQ, etc.
-   dependencies updates (of course)
-   `TransactionalExecutionListener`

For those eager to try, head over to [start.spring.io](https://start.spring.io). Detailed release notes can be found for [Spring Boot](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.2.0-Release-Notes) and [Spring Framework](https://github.com/spring-projects/spring-framework/wiki/What's-New-in-Spring-Framework-6.x).

## [](#community-buzz)Community Buzz

The response has been overwhelmingly positive. Paul Bakker from Netflix mentioned [on Twitter](https://twitter.com/pbakker/status/1727878011415101680?s=61&t=bexYo9XrNeYDjSplPXjULw) that Netflix is gearing up to roll out Spring Boot 3.2 this week. Similarly, Michael Simmons tweeted about [his seamless upgrade](https://twitter.com/rotnroll666/status/1728430718328406162?s=12&t=n-UflcIbnx1lage-TBk0Cg) experience with a decade-old Spring Boot project.

## [](#more-from-the-spring-sphere)More From the Spring Sphere

There's a plethora of other exciting Spring-related updates and articles from the past week. Let's dive into those:

-   [CVE-2023-34053, CVE-2023-34055: Spring Framework and Spring Boot vulnerabilities](https://spring.io/blog/2023/11/27/cve-2023-34053-cve-2023-34055-spring-framework-and-spring-boot)
-   [Clean Architecture with Spring Boot: A good idea?](https://medium.com/@viniciusromualdobusiness/clean-architecture-with-spring-boot-a-good-idea-d6f97e450130)
-   [Michael Simons (@rotnroll666) on X](https://twitter.com/rotnroll666/status/1728430718328406162?s=12&t=n-UflcIbnx1lage-TBk0Cg)
-   [Spring Boot 2.7.18 available now](https://spring.io/blog/2023/11/23/spring-boot-2-7-18-available-now)
-   [Spring Integration 6.2 goes GA!](https://spring.io/blog/2023/11/22/spring-integration-6-2-goes-ga)
-   [Spring Shell 2.1.15, 3.0.10, 3.1.6 and 3.2.0-RC1 are now available](https://spring.io/blog/2023/11/28/spring-shell-2-1-15-3-0-10-3-1-6-and-3-2-0-rc1-are-now-available)
-   [Spring Tips: Spring Boot 3.2](https://spring.io/blog/2023/11/23/spring-tips-spring-boot-3-2)
-   [Spring Vault 3.1 available](https://spring.io/blog/2023/11/24/spring-vault-3-1-available)
-   [Spring for Apache Pulsar 1.0.0 goes GA](https://spring.io/blog/2023/11/21/spring-for-apache-pulsar-1-0-0-goes-ga)
-   [They finally got rid of Spring Boot 2.7 and with it Java 8 and Java 11 on the Spring Initializr !!](https://twitter.com/snicoll/status/1727692571340591107?s=12&t=n-UflcIbnx1lage-TBk0Cg). This is an important point friends: support for creakingly old versions of Spring Boot 2.7 and earlier is now done. If you want extended support, you should talk to us. Or, *much better*, just upgrade to 3.2. I bet you'll love it.
-   [VMWare tweeted: We are excited to announce the completion of Broadcom's acquisition of VMware, marking another important step forward in our efforts to build the world?s leading infrastructure technology company.](https://x.com/vmwaretanzu/status/1727334654695321929?s=12&t=n-UflcIbnx1lage-TBk0Cg)
-   [the `jonatan-ivanov/teahouse` sample application to demonstrate Observability concepts has been updated](https://github.com/jonatan-ivanov/teahouse)
-   [our websites are a little different. Notice it? At the very bottom, it says *Copyright 2005-2023 Broadcom*. Yah, you guessed it! VMware, the company that's been the home to a lot of the Spring team for years, was acquired! We're at Broadcom now. :)](https://spring.io/)
-   [A Pinecone Spring Boot Starter](https://honnuanand.medium.com/a-pinecone-spring-boot-starter-ff828f8ac5ab)
-   [A Spring Cloud Starter for AWS Bedrock](https://honnuanand.medium.com/a-spring-cloud-starter-for-aws-bedrock-7de1cbc81d93)
-   [Blog: Spotlight on SIG Testing](https://kubernetes.io/blog/2023/11/24/sig-testing-spotlight-2023/)

That's it for this week! Stay tuned for more updates next time, and as always, happy coding!