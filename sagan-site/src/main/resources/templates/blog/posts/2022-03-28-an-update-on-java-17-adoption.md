---
title: An update on Java 17+ adoption
source: https://spring.io/blog/2022/03/28/an-update-on-java-17-adoption
scraped: 2026-02-23T12:46:19.819Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Juergen Hoeller |  March 28, 2022 | 15 Comments
---

# An update on Java 17+ adoption

_Engineering | Juergen Hoeller |  March 28, 2022 | 15 Comments_

As a follow-up to [my blog post from last year's SpringOne](https://spring.io/blog/2021/09/02/a-java-17-and-jakarta-ee-9-baseline-for-spring-framework-6), it is time for an update on our Java 17+ baseline efforts!

We established the new baseline on our main branches, with a few milestones out already. The feedback has been very positive, not only in terms of framework improvements but also in terms of the motivation for a *Java upgrade at the application level*. Of course, it does not end with JDK 17 LTS: JDK 18 is an immediate option already, JDK 19 will be the current release when we go final later this year, with JDK 20 to be in early access by then - and JDK 21 LTS on the horizon already...

On a related note, the recent [JRebel 2022 Java Developer Productivity Report](https://www.jrebel.com/resources/java-developer-productivity-report-2022) included some interesting numbers on JDK 17: *62% of the participants indicated a plan for a JDK 17 upgrade within the next 12 months* - specifically, 37% within 6 months, and another 25% within 6-12 months. This is exactly the state of the industry that we are working towards: Spring Framework 6 and Spring Boot 3 will be released on a Java 17+ baseline in late 2022, *ready for adoption in a JDK 17 LTS ecosystem*.

On the other end of the spectrum, *JDK 8 reaches its end of premier support* with Oracle and other vendors in March 2022 now, moving into its extended support phase which lasts up until 2026 (or 2030 with some vendors). This is a perfect opportunity for considering an upgrade from JDK 8, ideally right away to JDK 17 as the current Long-Term Support release! For a start, we recommend *moving Spring Framework 5.3 based applications to JDK 17*, then migrating to Spring Framework 6 from there.

In the wider Spring ecosystem, our foundational projects are ready for Java 17 but some choose to stay on a JDK 8+ baseline for the time being, e.g. Reactor and Micrometer. This allows for *continuity on the side of integrators*, shipping common drivers etc for broad consumption across different stacks. At the same time, Spring Framework 6 is empowered to provide *a rich Java 17+ experience for upgraded applications*, seamlessly integrating with foundational infrastructure on lower baselines.

Rest assured, if Spring Framework 6 won't be an option for you for a further while, *Spring Framework 5.3.x is set up for extended open source support* until 2024, with commercial support up until 2026. Whether on JDK 8 or 11 or 17 LTS, the current generation of Spring remains available to you for an extended period. And whenever you are ready to upgrade, as long as you have moved up to JDK 17+ in the meantime, Spring Framework 6 and Spring Boot 3 will be there for you!