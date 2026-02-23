---
title: From Spring Native to Spring Boot 3
source: https://spring.io/blog/2023/02/23/from-spring-native-to-spring-boot-3
scraped: 2026-02-23T10:09:32.583Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Sébastien Deleuze |  February 23, 2023 | 2 Comments
---

# From Spring Native to Spring Boot 3

_Engineering | Sébastien Deleuze |  February 23, 2023 | 2 Comments_

Today, we are finishing to transition the Spring support for building native executables from the experimental [Spring Native](https://github.com/spring-attic/spring-native) project to the official [Spring Boot GraalVM native image support](https://docs.spring.io/spring-boot/docs/current/reference/html/native-image.html).

In practice, that means we are archiving the Spring Native GitHub repository and moving it to the [https://github.com/spring-attic](https://github.com/spring-attic) organization. There will be no new release of Spring Native (based on Spring Boot 2.x) and we are encouraging all Spring Boot users to migrate to Spring Boot 3.x to leverage its official native support.

## [](#springone)SpringOne

If you missed [SpringOne](https://springone.io/) keynote, be aware that the recording of the section dedicated to Spring Boot 3 native support is available in 2 parts.

[Part 1](https://youtube.com/watch?v=4qaMKTPTQU8&feature=shares&t=1524) with Thomas Wuerthinger, the GraalVM project lead, about the win-win collaboration between Spring and GraalVM teams. [![SpringOne keynote with Thomas](https://static.spring.io/blog/contentful/20240923/main-stage-thomas.jpg)](https://youtube.com/watch?v=4qaMKTPTQU8&feature=shares&t=1524)

And [part 2](https://youtube.com/watch?v=4qaMKTPTQU8&feature=shares&t=2194) with Sandra Ahlgrimm, Senior Cloud Advocate at Microsoft, is about running Spring applications in a scale to zero fashion on Azure. [![SpringOne keynote with Sandra](https://static.spring.io/blog/contentful/20240923/main-stage-homepage.jpg)](https://youtube.com/watch?v=4qaMKTPTQU8&feature=shares&t=2194)

You can also watch the [From Spring Native to Spring Boot 3](https://www.youtube.com/watch?v=tS61BMYdOPU) breakout session [Moritz Halbritter](https://spring.io/team/mhalbritter) and I presented.

## [](#lets-celebrate)Let's celebrate!

The goal of each Spring experimental project is to reach the General Availability stage, and that's what Spring Native did with Spring Boot 3 native support. We were not sure to succeed given the level of quality expected from the Spring portfolio and the technical challenges we had to solve. But we did it!

So let's use this opportunity to celebrate this achievement with the Spring community and the Spring team which have been collaborating closely to make native a first class compilation target for Spring applications after 3237 commits, 330 pull requests and 2800 GitHub stars. This would have not been possible with all the useful feedback we got.

I would like to send a special thank you to [Andy Clement](https://spring.io/team/aclement) who contributed most of the project initially, and to [Stéphane Nicoll](https://spring.io/team/snicoll) and [Brian Clozel](https://spring.io/team/bclozel) who where instrumental in making native officially supported in Spring Boot 3.

But let's also celebrate the fact that we now have the Gradle and Maven [Native Build Tools](https://github.com/graalvm/native-build-tools) plugins in order to provide support out of the box [for various open source JVM libraries](https://www.graalvm.org/native-image/libraries-and-frameworks/). So far Spring has been the most prolific contributor but we see an increasing number of other contributors in pull-requests coming to the [GraalVM metadata reachability repository](https://github.com/oracle/graalvm-reachability-metadata).

[![Libraries and Frameworks Tested with Native Image](https://static.spring.io/blog/contentful/20240923/native-libraries.png)](https://www.graalvm.org/native-image/libraries-and-frameworks/)

And the best part of it is that Spring Boot 3 does not require any GraalVM substitution to patch Spring or JVM libraries. The code you run is the code of your open source library, which means better security, better debuggability and better maintainability.

Let's not forget all the energy we have put in introducing an extensive integration testing infrastructure that has materialized via the [spring-aot-smoke-tests](https://github.com/spring-projects/spring-aot-smoke-tests) project that allow to track the status of the AOT and native support for a wide range of use cases. [![AOT smoke tests CI](https://static.spring.io/blog/contentful/20240923/Concourse.png)](https://ci.spring.io/teams/spring-aot-smoke-tests/pipelines/spring-aot-smoke-tests-1.0.x)

## [](#the-journey-continue)The journey continue

Thanks to its Ahead-of-Time transformation engine, the quality of the native support provided by Spring Boot 3 is already significantly better than with Spring Native, but is obviously not perfect so we are continuing to increase the scope of the support in each Spring Boot patch releases with improvements in the various projects of the Spring portfolio. And we are excited to be able to benefits from upcoming GraalVM native image compiler and tooling improvements.

Cheers!