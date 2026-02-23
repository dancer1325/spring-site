---
title: Spring Modulith 1.1 GA and 1.0.3 released
source: https://spring.io/blog/2023/11/24/spring-modulith-1-1-ga-and-1-0-3-released
scraped: 2026-02-23T09:05:26.658Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  November 24, 2023 | 0 Comments
---

# Spring Modulith 1.1 GA and 1.0.3 released

_Releases | Oliver Drotbohm |  November 24, 2023 | 0 Comments_

On behalf of the community I am delighted to announce the general availability of Spring Modulith 1.1 and the 1.0.3 bugfix release. This rather short stint after our 1.0 GA release in just three months ago brings us back in sync with the Spring Boot release train which we are going to follow going forward. We still managed to package up quite a few great new features, most notably:

-   Support for event externalization into AMQP, Kafka, JMS, AWS SNS and SQS (the latter two contributed by [Maciej Walkowiak](https://github.com/maciejwalkowiak)) [#248](https://github.com/spring-projects/spring-modulith/issues/248) [#344](https://github.com/spring-projects/spring-modulith/issues/344)
-   API to deal with completed and incompleted event publications [#294](https://github.com/spring-projects/spring-modulith/issues/294)
-   Strengthened relationship constraints for code residing in the application root [#317](https://github.com/spring-projects/spring-modulith/issues/317)
-   A [`Now`](https://docs.spring.io/spring-modulith/docs/current/api/org/springframework/modulith/moments/support/Now.html) interface extracted from `Moments` and additional methods to access today (`LocalDate`) and the current point in time as `Instant`.
-   `@ApplicationModuleListener` moved into the [`events` package](https://docs.spring.io/spring-modulith/docs/current/api/org/springframework/modulith/events/ApplicationModuleListener.html) (in the `…-events-api` artifact) [#322](https://github.com/spring-projects/spring-modulith/issues/322)
-   Support for the actuators in native images [#376](https://github.com/spring-projects/spring-modulith/issues/376), [#375](https://github.com/spring-projects/spring-modulith/issues/375)
-   A Neo4j implementation of the Event Publication Repository (contributed by [Gerrit Meier](https://github.com/meistermeier)) [#301](https://github.com/spring-projects/spring-modulith/pull/301)
-   New, Antora based [reference documentation](https://docs.spring.io/spring-modulith/reference/) (contributed by [Rob Winch](https://github.com/rwinch)) [#285](https://github.com/spring-projects/spring-modulith/issues/285)
-   Kotlin and Gradle variants for code and configuration samples in the reference documentation (contributed by [Devashish Bhattacharjee](https://github.com/devashishb-arkin))

Spring Modulith 1.1 is built against Spring Boot 3.2 and Framework 6.1 but remains generally compatible with 3.1 / 6.0 to ease upgrading. 1.0.3 primarily contains bug fixes and a couple of improvements that made sense to back port, such as the native image improvements.