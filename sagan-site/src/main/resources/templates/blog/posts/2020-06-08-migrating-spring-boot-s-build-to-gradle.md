---
title: Migrating Spring Boot\'s Build to Gradle
source: https://spring.io/blog/2020/06/08/migrating-spring-boot-s-build-to-gradle
scraped: 2026-02-23T13:58:26.432Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Andy Wilkinson |  June 08, 2020 | 19 Comments
---

# Migrating Spring Boot's Build to Gradle

_Engineering | Andy Wilkinson |  June 08, 2020 | 19 Comments_

We made a fairly significant change to Spring Boot in 2.3.0.M1. It was the first release of the project to be built with Gradle rather than Maven. A [thread on Twitter](https://twitter.com/phillip_webb/status/1222943872205983744) about the migration had a number of people asking why we switched and the benefits, if any, that we’d seen. This blog post aims to answer those questions.

Each project in the Spring portfolio is run in a fairly autonomous manner. We strive for consistency where our users will see it most – API design, for example – but choose the tools that best meet the needs of the project for things that are less visible. One example of this is the build system. A change to the build system affects those that contribute to the project but, if we get things right, it has no effect on users. This has led to a mixture of Maven- and Gradle-based builds. For example, Spring Framework has been built with Gradle since 3.2.0.M1 in 2012, whereas Spring Boot began a year later and Spring Cloud shortly after that, both with Maven-based builds. Unlike Spring Boot, Spring Cloud has no plans to switch as Maven continues to meet their needs. In short, if you take only one thing from this blog post it’s that you should choose whatever tool best meets your project’s needs.

## [](#why-did-we-switch)Why Did We Switch?

The Spring Boot team’s primary reason for considering a switch to Gradle was to reduce the time that it takes to build the project. We were becoming frustrated with the length of the feedback loop when making and testing changes. The time spent waiting for builds to complete was adding to the time taken to fix bugs and implement new features. We’d seen the benefits of Gradle’s incremental and parallel builds in other Spring projects and of [Gradle's build cache in a third-party project](https://twitter.com/ankinson/status/1152850155537862657). We hoped we could get similar benefits in Spring Boot’s build.

We’d tried in the past to make use of Maven’s support for parallel builds. Our attempts failed due to the complexity of Spring Boot’s build, particularly its use of the Invoker Plugin. We worked around this on CI by splitting the build into four pieces. The main core of the project was built first and then three independent pieces were built in parallel. This arrangement helped but CI builds still took an hour or more. Furthermore, as the split structure was specific to CI builds, it didn’t make developers’ local builds any faster.

Gradle has an extensive model of the structure of a build, understanding the inputs and outputs of every task and their interdependencies. The promise of this modelling is that it allows tasks to be run in parallel while also being incremental, cached, or avoided altogether. In other words, Gradle aims to minimise the amount of work that is necessary to build any given change and to perform the work that is necessary in parallel. If we had persevered and extensively restructured Spring Boot’s build, building in parallel may have been possible with Maven. And, if we’d used [Gradle Enterprise](https://gradle.com/enterprise)’s Maven support, we could have enjoyed the benefits of build caching and avoidance as well. However, to fully enjoy the benefits of all four, we felt that we would have to try switching to Gradle.

## [](#how-did-we-switch)How Did We Switch?

One criticism of Gradle that we’d seen was that it led to builds that were harder to maintain and understand than their Maven-based equivalent. Gradle’s flexibility allowed things to be done in subtly different ways even across modules in the same build. We needed to avoid this if the switch was to be successful. Having shipped four Spring Boot 2.3 milestones, its release candidate and its final release with Gradle, it looks like we have succeeded. We haven’t seen any major build problems in the core team or from any of our other contributors.

A key feature of Spring Boot is convention over configuration and we applied this approach to the build too. Following the advice to [avoid having imperative logic in `build.gradle` files](https://docs.gradle.org/current/userguide/organizing_gradle_projects.html#sec:build_sources), we wrote several small plugins that can be found in the project’s [`buildSrc`](https://github.com/spring-projects/spring-boot/tree/d4c7315369e7e9dce6eb1c77e5f23d1e670247c8/buildSrc). For example, we have a [starter plugin](https://github.com/spring-projects/spring-boot/blob/676ff423dd11b85ddffd72dc866ca2fe08faea1e/buildSrc/src/main/java/org/springframework/boot/build/starters/StarterPlugin.java) that is applied to every Spring Boot starter module, ensuring that they’re all configured, built, and published consistently. We also have a [conventions plugin](https://github.com/spring-projects/spring-boot/blob/d4c7315369e7e9dce6eb1c77e5f23d1e670247c8/buildSrc/src/main/java/org/springframework/boot/build/ConventionsPlugin.java) that reacts to other plugins being applied and configures things like source code encoding, the use of the JUnit Platform, and compiling with `-parameters`.

This approach has led to `build.gradle` files that are almost completely declarative. Even though we wrote a number of plugins to apply our conventions and to plug gaps in the Gradle ecosystem, the [commit that migrated to Gradle](https://github.com/spring-projects/spring-boot/commit/ce99db19028b54886ae99c1fd916e613a982b65f#diff-c197962302397baf3a4cc36463dce5ea) removed almost 9500 lines from the code base.

## [](#was-the-switch-beneficial)Was the Switch Beneficial?

In terms of reducing the project’s build time, migrating the build to Gradle has undoubtedly been a success. As noted above, a full Maven-based build was taking an hour or more, both on CI and on developers’ own machines. Over the last four weeks, the mean successful build time with Gradle has been 9 minutes 22 seconds, as shown in the following screenshot:

![](https://static.spring.io/blog/wilkinsona/20200608/build-time.png "Build performance graph from Gradle Enterprise")

We publish snapshots from our JDK 8 CI build. Focusing on those, [it has succeeded 183 times in the past 4 weeks](https://static.spring.io/blog/wilkinsona/20200608/ci-succeeded-183-times-overview.png) with a [mean build time of 19 minutes 37 seconds](https://static.spring.io/blog/wilkinsona/20200608/ci-succeeded-183-times-build-time.png). Looking at successful local builds, we can see that there have been [273 successful builds in the past 4 weeks](https://static.spring.io/blog/wilkinsona/20200608/local-succeeded-273-times-overview.png) with a [mean build time of 2 minutes 30 seconds](https://static.spring.io/blog/wilkinsona/20200608/local-succeeded-273-times-build-time.png).

Another benefit that had attracted us to Gradle was the experience that [I had enjoyed](https://twitter.com/ankinson/status/1152850155537862657) when contributing to Testcontainers. We wanted Spring Boot’s contributors to be able to clone and build the project as quickly as possible as well. Thanks to the remote build cache, a clean checkout can be [built in 3 minutes](https://static.spring.io/blog/wilkinsona/20200608/clean-checkout-built-in-3-minutes.png). This includes the time spent to download a large number of dependencies.

If you’re interested in more details about the build’s performance, there is lots more data available on our public [Gradle Enterprise instance](https://ge.spring.io/).

Beyond the performance improvements, we’ve also started looking at some of the other data that’s available. For example, we’ve been aware for a while that we have a number of flaky tests. The build fails more often than we’d like because of them and we can now see that reflected in the [Tests dashboard](https://ge.spring.io/scans/tests?failures.failureClassification=non_verification&list.size=50&list.sortColumn=startTime&list.sortOrder=desc&search.buildToolType=gradle&search.buildToolType=maven&search.relativeStartTime=P7D&search.rootProjectName=spring-boot-build&search.timeZoneId=Europe/Zurich&tests.sortField=FAILED&tests.unstableOnly=true&trends.section=overview&trends.timeResolution=day). We’ve started using Gradle's flaky test mitigation to identify [any flaky tests occurring on CI](https://ge.spring.io/scans/tests?failures.failureClassification=non_verification&list.size=50&list.sortColumn=startTime&list.sortOrder=desc&search.buildToolType=gradle&search.buildToolType=maven&search.relativeStartTime=P7D&search.rootProjectName=spring-boot-build&search.tags=CI&search.timeZoneId=Europe/Zurich&tests.sortField=FLAKY&tests.unstableOnly=true&trends.section=overview&trends.timeResolution=day) and to help us understand if we’ve successfully resolved or worked around the problems.

## [](#conclusion)Conclusion

We're really pleased with how the migration went and the decrease in build times that we have seen. CI builds are now taking roughly 20 minutes on average, 3-4 times faster than before. Local builds are taking an average of 2 minutes 30 seconds, which is 20-30 times faster than before.

I’d like to take this opportunity to thank the Gradle team for their help during the migration and for generously providing us with a Gradle Enterprise license to use with our open source projects. We’re already using it with Spring Framework, Spring Security, and Spring Boot, with other teams planning to start making use of it for their Gradle- and Maven-based builds.

I’d also like to thank the maintainers of various third-party plugins that we’re using. They’ve made suggested changes and merged pull requests to improve support for incremental builds and caching. Without them, we would not have been able to achieve the reduction in build times that we have seen.

If you’re considering a migration from Maven to Gradle, I hope that knowing a bit more about the Spring Boot team’s experience is useful. If you’re a happy Maven user, please continue using and supporting the tool that’s working well for you.