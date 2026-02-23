---
title: This Week in Spring - August 4th, 2015
source: https://spring.io/blog/2015/08/04/this-week-in-spring-august-4th-2015
scraped: 2026-02-23T19:45:35.593Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  August 04, 2015 | 0 Comments
---

# This Week in Spring - August 4th, 2015

_Engineering | Josh Long |  August 04, 2015 | 0 Comments_

Welcome to another installment of *This Week in Spring*! This week I'm in Washington D.C., delivering some cloud-native realtalk at the Agile 2015 conference with my pal [Andrew Clay Shafer](http://twitter.com/littleidea) then it's off to Denver, CO, again to speak to customers! If you're in either area, say hi!

We're fast approaching SpringOne2GX 2015! Things are getting exciting around here as the team delivers more and more amazing bits! The weeks to come, leading into SpringOne2GX, are my favorite time of the year. Watch this space for new releases aplenty!

-   The biggest announcement, this week, of course, is [**the General availability of Spring framework 4.2**](https://spring.io/blog/2015/07/31/spring-framework-4-2-goes-ga)! Get the bits while they're hot! This is a game changer release, packed with new features! I'll wait while you go read the new features list..
-   ..Welcome back! Have you upgraded your applications already to Spring framework 4.2? Good! Next up on the list: Spring framework lead Juergen Hoeller's followup post [looking forward to the next feature release of Spring Framework, 4.3](https://spring.io/blog/2015/08/03/coming-up-in-2016-spring-framework-4-3-5-0)
-   Spring Session (and Spring Security!) lead Rob Winch [just announced Spring Session 1.0.2](https://spring.io/blog/2015/08/03/spring-session-1-0-2-released). This release is a bug-fix release and paves the way for work to begin on Spring Session 1.1. As such, it's a recommended and easy upgrade.
-   Spring Statemachine lead Janne Valkealahti [just announced Spring Statemachine 1.0.0 M3](https://spring.io/blog/2015/08/04/spring-statemachine-1-0-0-m3-released), packed with new features including distributed state machine, persisting, state machine context, relaxed use of enums as states and events, programmatic instantiation of state machines, and much more.
-   I did a blog last week on forklifting applications from legacy [environments to a modern cloud platform like Cloud Foundry](http://blog.pivotal.io/pivotal-cloud-foundry/features/the-forklifted-application). The post is about how to shoehorn applications into your shiny new platform.
-   Spring for Apache Hadoop lead Thomas Risberg just announced [Spring for Apache Hadoop 2.3 M1](https://spring.io/blog/2015/08/04/spring-for-apache-hadoop-2-3-milestone-1-released). This release adds Hadoop 2.7.1 as the default release, adds support for HDP 2.3 and CDH 5.4.4 releases, includes bug fixes, and better support for Spring Boot as well as Hive 1.x and HiveServer 2.
-   Spring Data lead Oliver Gierke [just announced the first release candidate of Spring Data Gosling](https://spring.io/blog/2015/08/04/first-release-candidate-of-spring-data-release-train-gosling-available) which includes QueryDSL integration for Spring Data REST and Spring MVC, Spring framework 4.2 and Spring Boot 1.3 integration, the `RepositoryRestConfigurer` for easier configuration, and a slew of updated module versions.
-   I liked our own James Watters' post [on *the Cloud Native Journey*](http://blog.pivotal.io/pivotal-cloud-foundry/features/mapping-the-cloud-native-journey).
-   Scott Frederick just announced that [the Spring Cloud Connectors 1.2.0](https://spring.io/blog/2015/07/29/spring-cloud-connectors-1-2-0-released) are now available! Spring Cloud connectors take advantage of the indirection afforded by dependency injection to instantiate and define beans that act as clients to common backing services exposed in a cloud environment, like Cloud Foundry, usually through some context like environment variables. This release includes a few key bugfixes and new support for lots of things, including IBM DB2 and Microsoft SQL Server relational databases.
-   I can't exactly read this Japanese language slide deck on [using Spring and Swagger but it seemed interesting](https://speakerdeck.com/bati11/spring-boot-to-swagger-number-shibui-gu-java). I'd recommend people consult [Spring REST Docs](http://projects.spring.io/spring-restdocs/) before jumping into Swagger, however.