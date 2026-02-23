---
title: This Week in Spring - December 20, 2016
source: https://spring.io/blog/2016/12/20/this-week-in-spring-december-20-2016
scraped: 2026-02-23T18:53:49.753Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  December 20, 2016 | 3 Comments
---

# This Week in Spring - December 20, 2016

_Engineering | Josh Long |  December 20, 2016 | 3 Comments_

Welcome to another installment of *This Week in Spring*! This week I'm in the winter wonderland of Toronto, Canada, hanging out with the amazing Pivotal Labs Toronto office and working with some of the largest financial institutions in all of Canada as they transition to Spring Cloud and to Pivotal Cloud Foundry. I love seeing seemingly large, lumbering companies run at startup speeds and crave it.

This week is the week of Christmas for some in the world, followed shortly by the western western new year. If you celebrate either (or both) of them, then, on behalf of the Spring team, let me wish you the happiest of holidays! I, for one, can't believe we're now less than two weeks away from 2017 (and with it, the beginning of the 7th year writing *This Week in Spring*!)

Thankfully, there's a lot to be seen so let's get to it.

-   Spring ninja Greg Turnquist has announced that [Spring Cloud Spinnaker 1.0.0.M2 has been released](https://spring.io/blog/2016/12/19/spring-cloud-spinnaker-1-0-0-m2)!
-   All around great guy and Spring Session and Spring Security lead [Rob Winch has just announced Spring Session 1.3.0](https://spring.io/blog/2016/12/16/spring-session-1-3-0-released)
-   Spring IO Platform lead and Spring (and Spring Boot) ninja Andy Wilkinson has just announced [the newly rewritten and streamlined Gradle dependency management plugin 1.0.0.RC1](https://spring.io/blog/2016/12/16/dependency-management-plugin-1-0-0-rc1)
-   Spring Statemachine lead Janne Valkealahti has just announced [Spring Statemachine 1.2.0](https://spring.io/blog/2016/12/15/spring-statemachine-1-2-0-released), which supports UML submachines, state do actions, and so much more
-   Rajini Sivaram has just announced [the first milestone of the Reactor Kafka module](https://spring.io/blog/2016/12/15/reactor-kafka-1-0-0-m1-released)
-   last week, continuing the *Spring Tips* series, I looked at how to demystify what's happening behind the scenes when [Spring Boot's auto-configuration kicks in](https://spring.io/blog/2016/12/14/spring-tips-demystifying-bootiful-magic). Watch this video to code with confidence! Then check out Stéphane Nicoll and Brian Clozel for some additional Spring Boot magic in their S1P 2016 replay, [10 Ways to Get Super Productive with Spring Boot](https://spring.io/blog/2016/12/20/springone-platform-2016-replay-10-ways-to-get-super-productive-with-spring-boot)
-   Big week for SpringOne Platform 2016 replays - starting with a Simon Ritter JDK daily double! First, it's [JDK 9 Modularity with Jigsaw](https://spring.io/blog/2016/12/20/springone-platform-2016-replay-project-jigsaw-in-jdk-9-modularity-comes-to-java) and then a talk on [Lessons leanrt with JDK 8 Lambdas and Streams](https://spring.io/blog/2016/12/20/springone-platform-2016-replay-jdk-8-lessons-learnt-with-lambdas-and-streams).
-   Stephane Nicoll and Yann Cebron from JetBrains live code their way through [40 Tips and Tricks for IntelliJ IDEA](https://spring.io/blog/2016/12/20/springone-platform-2016-replay-40-tips-tricks-for-spring-in-intellij-idea) in this SpringOne Platform 2016 replay.
-   James Weaver gives a gentle introduction to Machine Learning in [Machine Learning Exposed!](https://spring.io/blog/2016/12/20/springone-platform-2016-replay-machine-learning-exposed) with lots of Cloud Foundry and Spring demos.
-   Sebastian Deleluze shows us how he was [Developing a Geospatial Webservice with Kotlin and Spring Boot](https://spring.io/blog/2016/12/20/springone-platform-2016-replay-developing-a-geospatial-webservice-with-kotlin-and-spring-boot) in this S1P 2016 replay.
-   GitLab has an interesting post on how to [continuously deploy a Spring Boot application a cloud platform (which could as easily be Cloud Foundry)](https://about.gitlab.com/2016/12/14/continuous-delivery-of-a-spring-boot-application-with-gitlab-ci-and-kubernetes/)
-   last week I had the pleasure of doing a presentation with my buddy and [JFrog's very own Baruch](Http://twitter.com/jbaruch) and as part of that talk we designed a continuous delivery pipeline using Spring and JFrog Artifactory and Bintray which ulimately trigged a webhook automatically transitioning a Cloud Foundry application from a staging URL to a production URL (on the hypothetical acceptance of the story). That code, to switch the URL, was deployed on Pivotal Web Services (which is a Cloud Foundry deployment) and used the newly minted Reactor-powered Cloud Foundry Java client. I think it's a *super* cool API, and worth some investigation. Here's [the code, for your reference](https://github.com/joshlong/cf-promoter/blob/master/src/main/java/com/example/PromoterApplication.java)
-   This is an interesting look [at how Spring manages application contexts](https://www.javacodegeeks.com/2016/12/spring-boot-application-context-hierarchy.html)
-   the future of the web is HTTPS, with HTTP all but requiring it effectively. Browser vendors are pushing for this as well. What's your SSL strategy look like? [I thought this post on InfoQ was interesting](https://www.infoq.com/news/2016/12/google-pushing-https?utm_source=infoq&utm_medium=popular_widget&utm_campaign=popular_content_list&utm_content=homepage). Remember, Spring Boot makes it dead simple to specify SSL keys and Cloud Foundry makes it even easier to securely terminate HTTPS at the platform router level instead of per node.
-   if you're looking for something to feed your mind this holiday, may I humbly suggest you check [out the Spring Tips videos](https://www.youtube.com/playlist?list=PLgGXSWYM2FpPw8rV0tZoMiJYSCiLhPnOc) I've been doing recently?