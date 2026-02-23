---
title: This Week in Spring - September 19th, 2023 (Java 21 Edition)
source: https://spring.io/blog/2023/09/19/this-week-in-spring-september-19th-2023-java-21-edition
scraped: 2026-02-23T09:23:13.026Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  September 19, 2023 | 1 Comment
---

# This Week in Spring - September 19th, 2023 (Java 21 Edition)

_Engineering | Josh Long |  September 19, 2023 | 1 Comment_

Hi, Spring fans! Welcome to another installment of *This Week in Spring* - **Java 21 edition**!

The big news, indeed, the *biggest* news, is that Java 21 is now available here! You should use [SDKMAN](https://sdkman.io) to install it, like this: `sdk install java 21-graalce  && sdk default java 21-graalce`. This install givews you both the new Java 21 OpenJDK distribution and the new GraalVM native image support for Java 21. It works just fine with existing versions of Spring Boot, but the real payoff will be with Spring Boot 3.2, where you'll be able to plug in virtual threads with nary but a flick of a property: `spring.threads.virtual.enabled=true`. Spring Boot 3.2 drops in November. Get ready!

-   Did I mention that Java 21 is available? if not, I also put out a [*Spring Tips*](https://www.youtube.com/watch?v=8VJ_dSdV3pY&list=PLgGXSWYM2FpPw8rV0tZoMiJYSCiLhPnOc&index=1) video for you to watch looking at a ton of te new features!
-   [Spring Boot: Exception Handling Best Practices](https://medium.com/@mailto.dipmazumder/spring-boot-exception-handling-best-practices-e8ebe97e8ce)
-   [Spring Data 2023.0.4, 2022.0.10, and 2021.2.16 released](https://spring.io/blog/2023/09/15/spring-data-2023-0-4-2022-0-10-and-2021-2-16-released)
-   [Spring Data 2023.1.0-M3 released](https://spring.io/blog/2023/09/15/spring-data-2023-1-0-m3-released)
-   [Spring Framework 5.3.30 and 6.0.12 available now](https://spring.io/blog/2023/09/14/spring-framework-5-3-30-and-6-0-12-available-now)
-   [Spring Tools 4.20.0 released](https://spring.io/blog/2023/09/13/spring-tools-4-20-0-released)
-   [Spring for Apache Pulsar 1.0.0-M2 available now](https://spring.io/blog/2023/09/18/spring-for-apache-pulsar-1-0-0-m2-available-now)
-   [Spring for GraphQL 1.0.5, 1.1.6, 1.2.3 released](https://spring.io/blog/2023/09/19/spring-for-graphql-1-0-5-1-1-6-1-2-3-released)
-   [Maciej Walkowiak shares another great thing](https://twitter.com/maciejwalkowiak/status/1702038479071273117): the fabulous asynchronouss testing library, Awaitility, is going to be included in `spring-boot-starter-test`. Hurray!
-   [OpenRewrite: Automatic Code Refactoring and More - Part 2](https://foojay.io/today/openrewrite-automatic-code-refactoring-and-maintenance-part-2/)
-   [Piotr Mińkowski has a great point](https://twitter.com/piotr_minkowski/status/1701958545850126773): If you are looking for a gRPC and Spring Boot integration \[you can use that starter\]([https://github.com/LogNet/grpc-spring-boot-starter](https://github.com/LogNet/grpc-spring-boot-starter). In comparison to more popular `net.devh:grpc-spring-boot-starter` - it is more often released and has support for Spring Boot v3.
-   [Spring Test lead Sam Brannen](https://twitter.com/sam_brannen/status/1702039543665307843) shares that Spring Framework 6.1 M5 introduces `@ContextCustomizerFactories` to register a `ContextCustomizerFactory`, superseding `@ContextConfiguration(initializers)` when you need access to the test class. Nice!
-   [the good and the great Dr. David Syer has an interesting project here that looks at aggregating OpenAPI schema, here spring-projects-experimental/spring-openapi-aggregator](https://github.com/spring-projects-experimental/spring-openapi-aggregator)
-   Speaking of the good and great Dr. Syer, he and I are [doing a keynote at this year's SpringOne in Singapore](https://www.vmware.com/explore/sg/springone.html?src=ps_tnjzm6avhm6i4&cid=701Hr000001hoxKIAQ), and we'll be speaking at the local [Java User Group](https://www.meetup.com/singajug/events/295962725/) there, too.
-   -   [Blog: Comparing Local Kubernetes Development Tools: Telepresence, Gefyra, and mirrord](https://kubernetes.io/blog/2023/09/12/local-k8s-development-tools/)
-   [Blog: User Namespaces: Now Supports Running Stateful Pods in Alpha!](https://kubernetes.io/blog/2023/09/13/userns-alpha/)