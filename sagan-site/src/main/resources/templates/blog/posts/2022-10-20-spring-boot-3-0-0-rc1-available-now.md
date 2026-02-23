---
title: Spring Boot 3.0.0-RC1 available now
source: https://spring.io/blog/2022/10/20/spring-boot-3-0-0-rc1-available-now
scraped: 2026-02-23T10:36:26.840Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Phil Webb |  October 20, 2022 | 25 Comments
---

# Spring Boot 3.0.0-RC1 available now

_Releases | Phil Webb |  October 20, 2022 | 25 Comments_

On behalf of the team and everyone who has contributed, I'm happy to announce that Spring Boot `3.0.0-RC1` has been released and is now available from [https://repo.spring.io/milestone](https://repo.spring.io/milestone).

This release includes [135 enhancements, documentation improvements, dependency upgrades, and bug fixes](https://github.com/spring-projects/spring-boot/releases/tag/v3.0.0-RC1).

This is our first release candidate for Spring Boot 3.0, which we expect to release November 24, 2022. We are not expecting any more features to be added at this point, and we will only be making API changes if we find issues.

This release is the culmination of 11 months of work and is the first release to fully realize the themes that we set out to deliver in Spring Boot 3.0. Most notably, this release builds on the multi-year R&D effort that started with the experimental Spring Native project to provide support for GraalVM native images.

You can now convert your Spring Boot applications to native executables using the standard Spring Boot Maven or Gradle plugins without needing any special configuration.

This release also provides a [new section in the reference documentation](https://docs.spring.io/spring-boot/docs/3.0.0-RC1/reference/html/native-image.html#native-image) that explains the [concepts behind ahead-of-time processing](https://docs.spring.io/spring-boot/docs/3.0.0-RC1/reference/html/native-image.html#native-image.introducing-graalvm-native-images.understanding-aot-processing) and how you can [get started generating your first GraalVM native image](https://docs.spring.io/spring-boot/docs/3.0.0-RC1/reference/html/native-image.html#native-image.developing-your-first-application).

In addition to GraalVM native image support, this release also completes our migration to JakartaEE 9 and our baseline upgrade to Java 17.

Other notable new features in this release include:

-   More Flexible Auto-configuration for Spring Data JDBC
-   Auto-Configuration for Prometheus Exemplars
-   Log4j2 Enhancements include profile support and Environment property lookup

Please see the [release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0.0-RC1-Release-Notes) for more details and upgrade instructions.

Thanks to all those who have contributed with issue reports and pull requests.

### [](#how-can-you-help)How can you help?

If you're interested in helping out, check out the ["ideal for contribution" tag](https://github.com/spring-projects/spring-boot/labels/status%3A%20ideal-for-contribution) in the issue repository. If you have general questions, please ask on [stackoverflow.com](https://stackoverflow.com) using the [`spring-boot` tag](https://stackoverflow.com/tags/spring-boot) or chat with the community on [Gitter](https://gitter.im/spring-projects/spring-boot).

[Project Page](https://spring.io/projects/spring-boot/) | [GitHub](https://github.com/spring-projects/spring-boot) | [Issues](https://github.com/spring-projects/spring-boot/issues) | [Documentation](https://docs.spring.io/spring-boot/docs/3.0.0-RC1/reference/html) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-boot) | [Gitter](https://gitter.im/spring-projects/spring-boot)