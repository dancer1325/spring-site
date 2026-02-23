---
title: Preparing for Spring Boot 3.0
source: https://spring.io/blog/2022/05/24/preparing-for-spring-boot-3-0
scraped: 2026-02-23T10:39:33.179Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Phil Webb |  May 24, 2022 | 71 Comments
---

# Preparing for Spring Boot 3.0

_Engineering | Phil Webb |  May 24, 2022 | 71 Comments_

Spring Boot 2.0 was the first release in the 2.x line and was published on Feburary 28th 2018. We’ve just released Spring Boot 2.7 which means that, so far, we’ve been maintaining the 2.x line for just over 4 years. In total we’ve published 95 distinct releases over that timeframe!

The entire Spring team, and many in our community of contributors, are now preparing for the next generation of Spring. We are planning to release Spring Boot 3.0 in November 2022. This next major revision will be based on Spring Framework 6.0 and will require Java 17 or above. It will also be the first version of Spring Boot that makes use of Jakarta EE 9 APIs (`jakarta.*`) instead of EE 8 (`javax.*`).

The next six months offer an ideal opportunity to prepare your own projects for this major release. In this blog post we’ll cover some of the things that you can do *today* to make any future migration as painless as possible.

## [](#upgrade-to-java-17)[](#upgrade-to-java-17)Upgrade to Java 17

Spring Boot 3.0 will require Java 17, but you don’t need to wait until that release to upgrade to the latest LTS Java version. Any recent Spring Boot 2.x release will work really well with Java 17. You can also make use of Java 17 features (such as records) in your own codebases.

We highly recommend that you upgrade your JDK today if at all possible.

## [](#upgrade-to-the-latest-spring-boot-27x)[](#upgrade-to-the-latest-spring-boot-2-7-x)Upgrade to the Latest Spring Boot 2.7.x

If you’re currently using an older version of Spring Boot 2.x, we highly recommend that you upgrade to Spring Boot 2.7. When Spring Boot 3.0 is released we will be providing a migration guide, but it will assume that you’re migrating from Spring Boot 2.7 and not an earlier version.

Upgrading instructions are always provided in our release notes. For example, if you are upgrading from Spring Boot 2.6 to Spring Boot 2.7, you can follow [this section](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.7-Release-Notes#upgrading-from-spring-boot-26).

If you’re upgrading from Spring Boot 2.5 or earlier, we don’t recommend skipping releases. It’s often easier to upgrade in steps (e.g. 2.5 → 2.6 → 2.7) rather than trying to upgrade directly from 2.5 → 2.7.

## [](#check-for-calls-to-deprecated-code)[](#check-for-calls-to-deprecated-code)Check for Calls to Deprecated Code

As Spring Boot evolves we will often deprecate methods or classes and provide replacements. We typically provide a 12 month overlap, after which deprecated code is removed. You can find details [of this policy on our wiki](https://github.com/spring-projects/spring-boot/wiki/Deprecations).

Spring Boot 3.0 will remove all deprecated code, so we recommend that you check your existing code is not relying on any deprecated methods. It’s worth considering using the `-Werror` Java compiler option to fail your build if deprecation warnings are reported.

## [](#migrate-from-legacy-applicationproperties-and-applicationyaml-processing)[](#migrate-from-legacy-application-properties-and-application-yaml-processing)Migrate from Legacy application.properties and application.yaml Processing

Spring Boot 2.4 changed the way that `application.properties` and `application.yaml` files were loaded. Most users didn’t notice the change, but a few projects may have set the `spring.config.use-legacy-processing` property to `true` to restore the old behavior.

The legacy processing support will not be coming to Spring Boot 3.0 so you should check that your project doesn’t set `spring.config.use-legacy-processing`.

## [](#use-spring-mvcs-pathpatternparser)[](#use-spring-mvcs-pathpatternparser)Use Spring MVC’s PathPatternParser

Spring MVC offers two ways to parse patterns. As of Spring Boot 2.6, the `PathPatternParser` is used by default.

Some applications may have manually switched back to the `AntPathMatcher` implementation by setting the `spring.mvc.pathmatch.matching-strategy` property. Although this will continue to work in Spring Boot 3.0, we recommend using the `PathPatternParser` if at all possible since it provides better performance.

## [](#check-if-third-party-projects-have-jakarta-ee-9-compatible-releases)[](#check-if-third-party-projects-have-jakarta-ee-9-compatible-releases)Check if Third-party Projects Have Jakarta EE 9 Compatible Releases

Jakarta EE 9 a new top-level `jakarta` package, replacing EE 8’s `javax` top-level package. For example, the Servlet specification in Jakarta EE 8 uses a `javax.servlet` package but this has changed to `jakarta.servlet` in EE 9.

Generally speaking, it’s not possible to mix Java EE and Jakarta EE APIs in the same project. You need to ensure that your own code, as well as all third-party libraries are using `jakarta.*` package imports.

The good news is that most well-maintained libraries are producing Jakarta EE 9 compatible variants. For example Hibernate, Thymeleaf, Tomcat, Jetty and Undertow have all done so already.

We recommend that you take some time to check that any third-party libraries that you use that integrate with Jakarta EE and check that they have EE 9 compatible variants. The most common problems we’ve found are with projects that import Servlet APIs.

## [](#check-if-third-party-projects-have-updated-spring-compatible-releases)[](#check-if-third-party-projects-have-updated-spring-compatible-releases)Check if Third-party Projects have Updated Spring Compatible Releases

Spring Framework 6.0 will not be binary compatible with the previous generation. If you are making use of third-party jars that offer Spring integration, you should check that they are planning Spring Framework 6 compatible releases.

## [](#try-the-spring-boot-milestones)[](#try-the-spring-boot-milestones)Try the Spring Boot Milestones

Although we don’t recommend it for production, you can try Spring Boot 3.0 milestones today to see how hard it will be to migrate your project. Trying the milestones on a branch of your code is a great way to preempt any potential problems. They are available from [https://repo.spring.io/milestone](https://repo.spring.io/milestone). Creating a project on [https://start.spring.io](https://start.spring.io) and selecting the latest 3.0 milestone will include the necessary repositories in the build configuration.

If you’re attempting to upgrade an existing 2.7.x Spring Boot application to the latest 3.0.0 milestone, you might also want to take a look at the [Spring Boot Migrator](https://github.com/spring-projects-experimental/spring-boot-migrator) project. This experimental project aims to automate many migration tasks, including upgrades. It’s built using [OpenRewrite](https://github.com/openrewrite/rewrite) and is Apache 2.0 licensed.

We’re always interested in feedback and we’re very happy when bugs get identified before we release the GA version.

You can raise issues at [github.com/spring-projects/spring-boot/issues](https://github.com/spring-projects/spring-boot/issues) (make sure you tell us the version of Spring Boot that you’re using).

## [](#consider-commercial-support)[](#consider-commercial-support)Consider Commercial Support

Spring Boot 2.7 is the last planned release in the 2.x line. We’ve extended our open source support for this release by an additional 6 months until November 2023.

In addition, commercial support for Spring Boot 2.7 has also been extended and is available until February 2025.

You can find project support details at [spring.io/projects/spring-boot](https://spring.io/projects/spring-boot#support). Details of commercial support can be found at [tanzu.vmware.com/spring-runtime](https://tanzu.vmware.com/spring-runtime).

Any release triggered by a commercial support request will always be published as open source so commercial customers also help the open source community.